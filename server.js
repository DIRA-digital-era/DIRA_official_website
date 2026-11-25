require('dotenv').config();

const path = require('path');
const fs = require('fs');
const fsp = fs.promises;
const https = require('https');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sanitizeHtml = require('sanitize-html');
const mongoose = require('mongoose');
const { v2: cloudinary } = require('cloudinary');
const { Article, CATEGORIES } = require('./models/Article');
const { Report, REPORT_TYPES } = require('./models/Report');
const { Subscriber, newUnsubscribeToken } = require('./models/Subscriber');
const { GalleryImage, GALLERY_CATEGORIES, CATEGORY_LABELS, ASPECT_RATIOS } = require('./models/GalleryImage');

const crypto = require('crypto');
const app = express();
const port = Number(process.env.PORT || 3000);
const publicRoot = __dirname;
const reportsDirectory = path.join(publicRoot, 'reports');
const isProduction = process.env.NODE_ENV === 'production' || process.env.NETLIFY === 'true';
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: Number(process.env.NETLIFY ? 4 : 8) * 1024 * 1024 },
  fileFilter: (request, file, callback) => {
    if (!/^image\/(jpeg|png|webp|gif)$/.test(file.mimetype)) {
      return callback(new Error(`Images must be JPEG, PNG, WEBP, or GIF files up to ${process.env.NETLIFY ? 4 : 8} MB.`));
    }
    callback(null, true);
  }
});
const reportUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: Number(process.env.NETLIFY ? 4 : 25) * 1024 * 1024 },
  fileFilter: (request, file, callback) => {
    if (file.mimetype !== 'application/pdf') return callback(new Error(`Reports must be PDF files up to ${process.env.NETLIFY ? 4 : 25} MB.`));
    callback(null, true);
  }
});

const allowedOrigins = [
  ...(process.env.CORS_ORIGIN || '').split(','),
  process.env.URL,
  process.env.DEPLOY_PRIME_URL,
  process.env.DEPLOY_URL
].filter(Boolean).map(origin => new URL(origin.trim()).origin);
app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      !isProduction ||
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) ||
      origin === 'null'
    ) {
      return callback(null, true);
    }
    callback(new Error('Origin is not allowed by CORS.'));
  }
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

function getClientIp(request) {
  const forwarded = request.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim().replace(/^::ffff:/, '');
  }
  const remote = request.socket?.remoteAddress || request.ip || '';
  return remote.replace(/^::ffff:/, '');
}

function toClient(article) {
  return article.toClientJSON ? article.toClientJSON() : article;
}

function parseTags(value) {
  if (Array.isArray(value)) return value.map(tag => String(tag).trim()).filter(Boolean);
  return String(value || '').split(',').map(tag => tag.trim()).filter(Boolean);
}

function resendRequest(pathname, payload, method = 'POST') {
  return new Promise((resolve, reject) => {
    const request = https.request({
      hostname: 'api.resend.com',
      family: 4,
      path: pathname,
      method,
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }, response => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', chunk => { body += chunk; });
      response.on('end', () => {
        let parsed;
        try { parsed = JSON.parse(body); } catch (error) { parsed = { message: body }; }
        resolve({ statusCode: response.statusCode || 500, body: parsed });
      });
    });
    request.on('error', reject);
    request.end(JSON.stringify(payload));
  });
}

function uploadImageToCloudinary(file, folder = 'dira/gallery') {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary is not configured. Add its credentials to .env.');
  }
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, resource_type: 'image' }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    stream.end(file.buffer);
  });
}

function uploadToCloudinary(file) {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary is not configured. Add its credentials to .env.');
  }
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: 'dira/articles', resource_type: 'image' }, (error, result) => {
      if (error) reject(error);
      else resolve(result.secure_url);
    });
    stream.end(file.buffer);
  });
}

async function saveReportLocally(file, slug) {
  await fsp.mkdir(reportsDirectory, { recursive: true });
  const safeSlug = slug.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '') || 'report';
  const filename = `${safeSlug}-${Date.now()}.pdf`;
  await fsp.writeFile(path.join(reportsDirectory, filename), file.buffer, { flag: 'wx' });
  return `/reports/${filename}`;
}

function uploadReportToCloudinary(file, slug) {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary is not configured. Add its credentials to the Netlify environment variables.');
  }
  const safeSlug = slug.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '') || 'report';
  const filename = `${safeSlug}-${Date.now()}.pdf`;
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({
      folder: 'dira/reports',
      public_id: filename,
      resource_type: 'raw'
    }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    stream.end(file.buffer);
  });
}

// ── Admin auth ──────────────────────────────────────────────────────────────────
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || (isProduction ? '' : 'admin@diracmr.com');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || (isProduction ? '' : 'diraupload25');
const ADMIN_TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || (isProduction ? '' : crypto.randomBytes(32).toString('hex'));
// Token format: base64(payload).base64(signature)  — signed with HMAC-SHA256
function createAdminToken() {
  if (!ADMIN_TOKEN_SECRET) throw new Error('ADMIN_TOKEN_SECRET is not configured.');
  const payload = Buffer.from(JSON.stringify({ email: ADMIN_EMAIL, exp: Date.now() + 8 * 60 * 60 * 1000 })).toString('base64url');
  const sig = crypto.createHmac('sha256', ADMIN_TOKEN_SECRET).update(payload).digest('base64url');
  return payload + '.' + sig;
}
function verifyAdminToken(token) {
  if (!ADMIN_TOKEN_SECRET || !token || typeof token !== 'string') return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  const expected = crypto.createHmac('sha256', ADMIN_TOKEN_SECRET).update(payload).digest('base64url');
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return Date.now() < exp;
  } catch { return false; }
}
function requireAdmin(request, response, next) {
  const auth = request.headers['authorization'] || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : (request.query._t || '');
  if (!verifyAdminToken(token)) return response.status(401).json({ error: 'Authentication required.' });
  next();
}

app.post('/api/admin/login', (request, response) => {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_TOKEN_SECRET) {
    return response.status(503).json({ error: 'Admin authentication is not configured.' });
  }
  const email = String(request.body.email || '').trim().toLowerCase();
  const password = String(request.body.password || '');
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return response.status(401).json({ error: 'Invalid email or password.' });
  }
  response.json({ ok: true, token: createAdminToken() });
});

app.get('/api/admin/verify', (request, response) => {
  const auth = request.headers['authorization'] || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!verifyAdminToken(token)) return response.status(401).json({ error: 'Token is invalid or expired.' });
  response.json({ ok: true });
});

app.get('/api/health', (request, response) => {
  response.json({ ok: true, database: mongoose.connection.readyState === 1 });
});

function escapeEmailHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getSiteUrl() {
  return (process.env.SITE_URL || 'https://diracmr.com').replace(/\/+$/, '');
}

function getNewsletterFrom() {
  return process.env.NEWSLETTER_FROM_EMAIL || 'DIRA Insights <updates@newsletter.diracmr.com>';
}

function getUnsubscribeUrl(token) {
  return `${getSiteUrl()}/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`;
}

// RFC 8058 one-click unsubscribe headers (expected by Gmail and Yahoo for bulk mail)
function getUnsubscribeHeaders(unsubscribeUrl) {
  return {
    'List-Unsubscribe': `<${unsubscribeUrl}>`,
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
  };
}

function getNewsletterWelcomeHtml(email, unsubscribeUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to DIRA Insights</title>
</head>
<body style="margin:0;padding:0;background-color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#0f172a;padding:5px 5px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 35px rgba(0,0,0,0.3);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background:#191d36;padding:10px 10px;text-align:center;border-bottom:3px solid #2F80ED;">
              <div style="display:inline-block;padding:5px 5px;background:rgba(47,128,237,0.2);border:1px solid rgba(47,128,237,0.4);border-radius:20px;color:#00E6D6;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px;">
                DIRA INSIGHTS
              </div>
              <h1 style="color:#ffffff;margin:0;font-size:26px;font-weight:800;letter-spacing:-0.5px;line-height:1.2;">
                Welcome to the Community
              </h1>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding:15px 15px 15px;">
              <p style="font-size:16px;line-height:1.6;color:#334155;margin:0 0 20px;">
                Hello,
              </p>
              <p style="font-size:16px;line-height:1.6;color:#334155;margin:0 0 24px;">
                Thank you for subscribing to <strong>DIRA Insights</strong>. You are now successfully subscribed to our newsletter and will receive our curated engineering insights, research publications, and technological updates directly in your inbox.
              </p>

              <!-- Feature Highlights Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;margin:0 0 28px;">
                <tr>
                  <td style="padding:24px;">
                    <h3 style="margin:0 0 14px;font-size:15px;color:#191d36;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">
                      What to expect:
                    </h3>
                    
                    <div style="margin-bottom:12px;font-size:14.5px;line-height:1.5;color:#475569;">
                      <strong style="color:#191d36;">Technical Breakthroughs:</strong> In-depth articles on custom software, system architectures, and cloud automation.
                    </div>
                    
                    <div style="margin-bottom:12px;font-size:14.5px;line-height:1.5;color:#475569;">
                      <strong style="color:#191d36;">Industry Reports:</strong> Reports and publications from DIRA on technology and digital services in Central Africa.
                    </div>

                    <div style="margin:0;font-size:14.5px;line-height:1.5;color:#475569;">
                      <strong style="color:#191d36;">Early Announcements:</strong> Priority access to training sessions, tech workshops, and community events.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Call to Action -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding:10px 0 10px;">
                    <a href="https://diracmr.com/articles" target="_blank" style="display:inline-block;background-color:#2F80ED;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 32px;border-radius:8px;box-shadow:0 4px 14px rgba(47,128,237,0.35);">
                      Explore Latest Articles &rarr;
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:0 0 20px;">
                    <a href="${unsubscribeUrl}" target="_blank" style="display:inline-block;border:1px solid #fecaca;background-color:#fff1f2;color:#b91c1c;text-decoration:none;font-size:13px;font-weight:700;padding:11px 20px;border-radius:8px;">
                      Unsubscribe
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size:14px;line-height:1.6;color:#64748b;margin:0;border-top:1px solid #f1f5f9;padding-top:20px;">
                Have questions or topics you'd love us to cover? Reach out to our team at <a href="mailto:contact@diracmr.com" style="color:#2F80ED;text-decoration:none;">contact@diracmr.com</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc;padding:25px 40px;border-top:1px solid #e2e8f0;text-align:center;">
              
              <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.5;">
                You received this email because <strong>${escapeEmailHtml(email)}</strong> was subscribed to the DIRA newsletter.<br>
                You can unsubscribe at any time: <a href="${unsubscribeUrl}" style="color:#2F80ED;text-decoration:none;">Manage subscription</a><br>
                &copy; ${new Date().getFullYear()} DIRA. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendNewsletterConfirmationEmail(email, unsubscribeToken) {
  if (!process.env.RESEND_API_KEY) return null;
  const unsubscribeUrl = getUnsubscribeUrl(unsubscribeToken);
  const payload = {
    from: getNewsletterFrom(),
    to: [email],
    subject: "Welcome to DIRA Insights – You're Subscribed!",
    html: getNewsletterWelcomeHtml(email, unsubscribeUrl),
    text: `Welcome to DIRA Insights!\n\nThank you for subscribing to our newsletter. You are successfully subscribed and will receive our curated engineering insights, industry reports, and updates.\n\nExplore our latest articles: ${getSiteUrl()}/articles\n\nDIRA CMR - Digital Innovation & Research Alliance\n\nUnsubscribe: ${unsubscribeUrl}`,
    headers: getUnsubscribeHeaders(unsubscribeUrl)
  };

  try {
    const res = await resendRequest('/emails', payload);
    return res;
  } catch (err) {
    console.warn('Could not send newsletter confirmation email:', err.message);
    return null;
  }
}

app.post('/api/newsletter/subscribe', async (request, response, next) => {
  try {
    const email = String(request.body.email || '').trim().toLowerCase();
    const clientId = String(request.body.clientId || '').trim();
    const source = String(request.body.source || 'popup').trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) return response.status(400).json({ error: 'Enter a valid email address.' });
    if (!process.env.RESEND_API_KEY) {
      return response.status(503).json({ error: 'Newsletter service is not configured yet.' });
    }

    const details = { ip: getClientIp(request), userAgent: request.headers['user-agent'] || '' };
    if (clientId) details.clientId = clientId;

    // Save first. If the subscriber cannot be stored, they would never receive articles,
    // so report the failure instead of showing a false success.
    let subscriber;
    let isNew = false;
    try {
      subscriber = await Subscriber.findOne({ email });
      if (subscriber && subscriber.status === 'active') {
        // Already subscribed: refresh details only, no second welcome email.
        Object.assign(subscriber, details);
        if (!subscriber.unsubscribeToken) subscriber.unsubscribeToken = newUnsubscribeToken();
        await subscriber.save();
        return response.status(200).json({ ok: true, alreadySubscribed: true, emailSent: false });
      }
      if (subscriber) {
        // Previously unsubscribed: reactivate.
        Object.assign(subscriber, details, { status: 'active', subscribedAt: new Date(), unsubscribedAt: undefined, source });
        if (!subscriber.unsubscribeToken) subscriber.unsubscribeToken = newUnsubscribeToken();
        await subscriber.save();
      } else {
        subscriber = await Subscriber.create({ email, source, ...details });
      }
      isNew = true;
    } catch (dbErr) {
      if (dbErr.code === 11000) {
        // Two submissions raced; the other one created the record.
        return response.status(200).json({ ok: true, alreadySubscribed: true, emailSent: false });
      }
      console.error('Could not save subscriber to MongoDB:', dbErr.message);
      return response.status(500).json({ error: 'We could not save your subscription. Please try again in a moment.' });
    }

    if (process.env.RESEND_AUDIENCE_ID) {
      try {
        await resendRequest(`/audiences/${encodeURIComponent(process.env.RESEND_AUDIENCE_ID)}/contacts`, { email, unsubscribed: false });
      } catch (err) {
        console.warn('Could not add contact to Resend audience:', err.message);
      }
    }

    // Welcome email goes only to new or reactivated subscribers.
    let emailResult = null;
    if (isNew) {
      try {
        emailResult = await sendNewsletterConfirmationEmail(email, subscriber.unsubscribeToken);
      } catch (mailErr) {
        console.warn('Confirmation email dispatch warning:', mailErr.message);
      }
    }

    response.status(201).json({
      ok: true,
      alreadySubscribed: false,
      emailSent: !!(emailResult && emailResult.statusCode >= 200 && emailResult.statusCode < 300)
    });
  } catch (error) { next(error); }
});

function getUnsubscribePageHtml(title, message, formHtml = '') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex">
  <title>${escapeEmailHtml(title)} | DIRA Insights</title>
</head>
<body style="margin:0;padding:40px 16px;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">
  <div style="max-width:480px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:36px 32px;text-align:center;">
    <div style="font-size:12px;font-weight:700;letter-spacing:1.5px;color:#2F80ED;margin-bottom:12px;">DIRA INSIGHTS</div>
    <h1 style="font-size:22px;margin:0 0 12px;color:#111827;">${escapeEmailHtml(title)}</h1>
    <p style="font-size:15px;line-height:1.6;color:#475569;margin:0 0 24px;">${message}</p>
    ${formHtml}
    <p style="margin:24px 0 0;font-size:13px;"><a href="${getSiteUrl()}" style="color:#2F80ED;text-decoration:none;">Back to diracmr.com</a></p>
  </div>
</body>
</html>`;
}

// GET shows a confirmation button, so link scanners that open URLs in emails
// cannot unsubscribe people by accident. POST performs the unsubscribe and also
// serves mail providers' one-click requests (RFC 8058).
app.get('/api/newsletter/unsubscribe', async (request, response, next) => {
  try {
    const token = String(request.query.token || '').trim();
    const subscriber = token ? await Subscriber.findOne({ unsubscribeToken: token }).lean() : null;
    response.set('Cache-Control', 'no-store');
    if (!subscriber) {
      return response.status(404).type('html').send(getUnsubscribePageHtml('Link not recognised', 'This unsubscribe link is invalid or has expired. If you keep receiving emails, write to <a href="mailto:contact@diracmr.com">contact@diracmr.com</a>.'));
    }
    if (subscriber.status === 'unsubscribed') {
      return response.type('html').send(getUnsubscribePageHtml('You are unsubscribed', `${escapeEmailHtml(subscriber.email)} will not receive further DIRA Insights emails.`));
    }
    const form = `<form method="post" action="?token=${encodeURIComponent(token)}"><button type="submit" style="background:#2F80ED;color:#ffffff;border:0;border-radius:8px;padding:12px 28px;font-size:15px;font-weight:600;cursor:pointer;">Unsubscribe</button></form>`;
    response.type('html').send(getUnsubscribePageHtml('Unsubscribe from DIRA Insights?', `${escapeEmailHtml(subscriber.email)} will stop receiving new article emails.`, form));
  } catch (error) { next(error); }
});

app.post('/api/newsletter/unsubscribe', async (request, response, next) => {
  try {
    const token = String(request.query.token || request.body.token || '').trim();
    const subscriber = token ? await Subscriber.findOne({ unsubscribeToken: token }) : null;
    response.set('Cache-Control', 'no-store');
    if (!subscriber) {
      return response.status(404).type('html').send(getUnsubscribePageHtml('Link not recognised', 'This unsubscribe link is invalid or has expired.'));
    }
    if (subscriber.status !== 'unsubscribed') {
      subscriber.status = 'unsubscribed';
      subscriber.unsubscribedAt = new Date();
      await subscriber.save();
      if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
        try {
          await resendRequest(`/audiences/${encodeURIComponent(process.env.RESEND_AUDIENCE_ID)}/contacts/${encodeURIComponent(subscriber.email)}`, { unsubscribed: true }, 'PATCH');
        } catch (err) {
          console.warn('Could not mark Resend contact as unsubscribed:', err.message);
        }
      }
    }
    response.type('html').send(getUnsubscribePageHtml('You are unsubscribed', `${escapeEmailHtml(subscriber.email)} will not receive further DIRA Insights emails. You can subscribe again at any time on diracmr.com.`));
  } catch (error) { next(error); }
});

app.get('/api/newsletter/check', async (request, response, next) => {
  try {
    // Match on this browser's client ID only. Matching on IP address hid the popup
    // for everyone sharing a network (an office, a campus) once one person subscribed.
    const clientId = String(request.query.clientId || '').trim();
    if (!clientId) return response.json({ subscribed: false });
    const existing = await Subscriber.findOne({ clientId, status: 'active' }).lean();
    response.json({ subscribed: !!existing, status: existing ? existing.status : null });
  } catch (error) { next(error); }
});

const PUBLISHED_FILTER = { status: { $ne: 'draft' } };

function isAdminRequest(request) {
  const auth = request.headers['authorization'] || '';
  return auth.startsWith('Bearer ') && verifyAdminToken(auth.slice(7));
}

app.get('/api/articles', async (request, response, next) => {
  try {
    // Drafts are only listed for a signed-in admin who asks for them (the content studio).
    const withDrafts = request.query.drafts === '1' && isAdminRequest(request);
    const filter = withDrafts ? {} : { ...PUBLISHED_FILTER };
    if (request.query.category && request.query.category !== 'All') filter.category = request.query.category;
    const articles = await Article.find(filter).sort({ createdAt: -1 });
    if (withDrafts) response.set('Cache-Control', 'no-store');
    response.json(articles.map(toClient));
  } catch (error) { next(error); }
});

app.get('/api/articles/:slug', async (request, response, next) => {
  try {
    const slug = String(request.params.slug || '').toLowerCase();
    let article = await Article.findOne({ slug, ...PUBLISHED_FILTER });
    // A link to an old slug still opens the article after the slug was edited.
    if (!article) article = await Article.findOne({ previousSlugs: slug, ...PUBLISHED_FILTER });
    // Admins can preview drafts.
    if (!article && isAdminRequest(request)) article = await Article.findOne({ slug });
    if (!article) return response.status(404).json({ error: 'Article not found.' });
    response.json(toClient(article));
  } catch (error) { next(error); }
});

function getNewArticleEmailHtml(article, articleUrl, imageUrl, siteUrl) {
  const category = escapeEmailHtml(article.category || 'Insights');
  const title = escapeEmailHtml(article.title || 'New Publication');
  const author = escapeEmailHtml(article.author || 'DIRA Team');
  const readTime = escapeEmailHtml(article.readTime || '4 min read');
  const date = escapeEmailHtml(article.date || 'Latest');
  const excerpt = escapeEmailHtml(article.excerpt || '');

  const imageBlock = imageUrl ? `
    <tr>
      <td style="padding:0;line-height:0;">
        <a href="${articleUrl}" target="_blank" style="text-decoration:none;display:block;">
          <img src="${imageUrl}" alt="${title}" style="width:100%;max-height:300px;object-fit:cover;display:block;border-bottom:1px solid #e2e8f0;" onerror="this.style.display='none'">
        </a>
      </td>
    </tr>
  ` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | DIRA Insights</title>
</head>
<body style="margin:0;padding:0;background-color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#0f172a;padding:40px 15px;">
    <tr>
      <td align="center">
        <!-- Card Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 35px rgba(0,0,0,0.3);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background:#191d36;padding:32px 36px;text-align:center;border-bottom:3px solid #2F80ED;">
              <div style="display:inline-block;padding:5px 14px;background:rgba(47,128,237,0.2);border:1px solid rgba(47,128,237,0.4);border-radius:20px;color:#00E6D6;font-size:11.5px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px;">
                NEW PUBLICATION &bull; ${category}
              </div>
              <h2 style="color:#ffffff;margin:0;font-size:22px;font-weight:800;letter-spacing:-0.4px;line-height:1.3;">
                DIRA Insights Just Published
              </h2>
            </td>
          </tr>

          <!-- Optional Cover Image -->
          ${imageBlock}

          <!-- Main Article Preview -->
          <tr>
            <td style="padding:36px 36px 28px;">
              <!-- Meta Row -->
              <div style="font-size:13px;color:#64748b;margin-bottom:12px;font-weight:500;">
                <span style="color:#2F80ED;font-weight:600;">By ${author}</span> &bull; ${readTime} &bull; ${date}
              </div>

              <!-- Article Title -->
              <h1 style="font-size:24px;line-height:1.35;color:#111827;font-weight:800;margin:0 0 16px;letter-spacing:-0.4px;">
                <a href="${articleUrl}" target="_blank" style="color:#111827;text-decoration:none;">
                  ${title}
                </a>
              </h1>

              <!-- Excerpt Box -->
              <div style="background-color:#f8fafc;border-left:4px solid #2F80ED;border-radius:0 10px 10px 0;padding:16px 20px;margin:0 0 28px;">
                <p style="font-size:15px;line-height:1.65;color:#334155;margin:0;">
                  ${excerpt}
                </p>
              </div>

              <!-- Call to Action Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding:10px 0 25px;">
                    <a href="${articleUrl}" target="_blank" style="display:inline-block;background-color:#2F80ED;color:#ffffff;text-decoration:none;font-size:15.5px;font-weight:700;padding:15px 36px;border-radius:8px;box-shadow:0 4px 14px rgba(47,128,237,0.35);letter-spacing:0.2px;">
                      Read Full Article &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size:13.5px;line-height:1.6;color:#64748b;margin:0;border-top:1px solid #f1f5f9;padding-top:20px;text-align:center;">
                Stay ahead with expert perspectives on digital architecture, systems engineering, and tech policy across Central Africa.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc;padding:24px 36px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;font-size:11.5px;color:#94a3b8;line-height:1.5;">
                You are receiving this update because {{RECIPIENT_EMAIL}} is subscribed to DIRA Insights.<br>
                <a href="{{UNSUBSCRIBE_URL}}" style="color:#64748b;text-decoration:underline;">Unsubscribe</a> &bull;
                Visit our website at <a href="${siteUrl}" style="color:#2F80ED;text-decoration:none;">${siteUrl.replace(/^https?:\/\//, '')}</a> &bull; &copy; ${new Date().getFullYear()} DIRA.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendNewArticleNotification(article) {
  if (!process.env.RESEND_API_KEY) return { total: 0, sent: 0, error: 'Newsletter service is not configured.' };

  try {
    const subscribers = await Subscriber.find({ status: 'active' }).select('email unsubscribeToken').lean();

    // Older records may predate unsubscribe tokens; give them one now.
    const missing = subscribers.filter(s => !s.unsubscribeToken);
    if (missing.length) {
      missing.forEach(s => { s.unsubscribeToken = newUnsubscribeToken(); });
      await Subscriber.bulkWrite(missing.map(s => ({
        updateOne: { filter: { _id: s._id }, update: { $set: { unsubscribeToken: s.unsubscribeToken } } }
      })));
    }

    // One email per address, even if duplicate records exist from before the unique index.
    const seen = new Set();
    const recipients = subscribers.filter(s => {
      if (!s.email || seen.has(s.email)) return false;
      seen.add(s.email);
      return true;
    });
    if (recipients.length === 0) {
      console.log('No active subscribers found in MongoDB to notify.');
      return { total: 0, sent: 0 };
    }
    console.log(`Sending new article notification for "${article.title}" to ${recipients.length} subscriber(s)...`);

    const from = getNewsletterFrom();
    const siteUrl = getSiteUrl();
    const articleUrl = `${siteUrl}/article?slug=${encodeURIComponent(article.slug)}`;

    let imageUrl = article.image || '';
    if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = `${siteUrl}/${imageUrl.replace(/^\.?\/+/, '')}`;
    }

    const htmlTemplate = getNewArticleEmailHtml(article, articleUrl, imageUrl, siteUrl);
    const textContent = `New Article from DIRA Insights\n\n${article.title}\nCategory: ${article.category}\nBy ${article.author} | ${article.readTime}\n\n${article.excerpt}\n\nRead the full article here:\n${articleUrl}\n\n---\nDIRA CMR - Digital Innovation & Research Alliance\n${siteUrl}`;
    const subject = `New on DIRA Insights: ${article.title}`;

    const BATCH_SIZE = 100;
    let sentCount = 0;

    for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
      const batch = recipients.slice(i, i + BATCH_SIZE);
      const batchPayload = batch.map(({ email, unsubscribeToken }) => {
        const unsubscribeUrl = getUnsubscribeUrl(unsubscribeToken);
        return {
          from,
          to: [email],
          subject,
          html: htmlTemplate
            .replace(/{{RECIPIENT_EMAIL}}/g, escapeEmailHtml(email))
            .replace(/{{UNSUBSCRIBE_URL}}/g, unsubscribeUrl),
          text: `${textContent}\n\nUnsubscribe: ${unsubscribeUrl}`,
          headers: getUnsubscribeHeaders(unsubscribeUrl)
        };
      });

      try {
        const batchRes = await resendRequest('/emails/batch', batchPayload);
        if (batchRes.statusCode >= 200 && batchRes.statusCode < 300) {
          sentCount += batch.length;
        } else {
          console.warn('Batch email warning:', batchRes.body);
        }
      } catch (batchErr) {
        console.error('Batch send error for chunk:', batchErr.message);
      }
    }

    console.log(`Article broadcast complete: ${sentCount}/${recipients.length} notification emails sent.`);
    return { total: recipients.length, sent: sentCount };
  } catch (err) {
    console.error('Failed to notify subscribers about new article:', err.message);
    return { total: 0, sent: 0, error: err.message };
  }
}

function cleanArticleContent(content) {
  return sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ['src', 'alt', 'width', 'height'] }
  });
}

function cleanSlug(value) {
  return String(value || '').toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function readSeoFields(body) {
  return {
    imageAlt: String(body.imageAlt || '').trim().slice(0, 200),
    seoTitle: String(body.seoTitle || '').trim().slice(0, 70),
    seoDescription: String(body.seoDescription || '').trim().slice(0, 170)
  };
}

// Subscribers are emailed once, at the moment an article is first published,
// unless the admin unticks "Email subscribers". Editing a live article never re-sends.
async function notifyIfFirstPublish(article, wantsNotify, justPublished) {
  if (!justPublished || article.status === 'draft' || article.notifiedAt || !wantsNotify) return null;
  const newsletter = await sendNewArticleNotification(article);
  if (newsletter && newsletter.sent > 0) {
    article.notifiedAt = new Date();
    await article.save();
  }
  return newsletter;
}

app.post('/api/articles', requireAdmin, upload.single('image'), async (request, response, next) => {
  try {
    const { title, category, author, date, readTime, excerpt, content } = request.body;
    const slug = cleanSlug(request.body.slug || title);
    if (!title || !slug || !date || !excerpt || !content || !CATEGORIES.includes(category)) {
      return response.status(400).json({ error: 'Title, slug, category, date, excerpt, and content are required.' });
    }
    if (await Article.exists({ previousSlugs: slug })) {
      return response.status(409).json({ error: 'This slug was used by another article before. Choose a different slug.' });
    }
    const status = request.body.status === 'draft' ? 'draft' : 'published';
    const image = request.file ? await uploadToCloudinary(request.file) : './images/photos/IMG_9933.jpg';
    const article = await Article.create({
      title,
      slug,
      category,
      author: author || 'DIRA Team',
      date,
      readTime: readTime || '4 min read',
      image,
      excerpt,
      content: cleanArticleContent(content),
      tags: parseTags(request.body.tags),
      ...readSeoFields(request.body),
      status,
      publishedAt: status === 'published' ? new Date() : undefined
    });

    // Send the newsletter before replying. On Netlify the function stops once it has
    // replied, so a background send after the response would be cut off.
    const newsletter = await notifyIfFirstPublish(article, request.body.notify !== 'false', status === 'published');
    response.status(201).json({ ...toClient(article), newsletter });
  } catch (error) {
    if (error.code === 11000) return response.status(409).json({ error: 'An article with this slug already exists.' });
    next(error);
  }
});

app.put('/api/articles/:id', requireAdmin, upload.single('image'), async (request, response, next) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) return response.status(404).json({ error: 'Article not found.' });
    const article = await Article.findById(request.params.id);
    if (!article) return response.status(404).json({ error: 'Article not found.' });

    const { title, category, author, date, readTime, excerpt, content } = request.body;
    const slug = cleanSlug(request.body.slug || article.slug);
    if (!title || !slug || !date || !excerpt || !content || !CATEGORIES.includes(category)) {
      return response.status(400).json({ error: 'Title, slug, category, date, excerpt, and content are required.' });
    }

    if (slug !== article.slug) {
      const taken = await Article.exists({ _id: { $ne: article._id }, $or: [{ slug }, { previousSlugs: slug }] });
      if (taken) return response.status(409).json({ error: 'Another article already uses this slug.' });
      if (article.status !== 'draft' && !article.previousSlugs.includes(article.slug)) {
        article.previousSlugs.push(article.slug);
      }
      article.previousSlugs = article.previousSlugs.filter(s => s !== slug);
      article.slug = slug;
    }

    Object.assign(article, {
      title,
      category,
      author: author || 'DIRA Team',
      date,
      readTime: readTime || article.readTime || '4 min read',
      excerpt,
      content: cleanArticleContent(content),
      tags: parseTags(request.body.tags),
      ...readSeoFields(request.body)
    });
    if (request.file) article.image = await uploadToCloudinary(request.file);

    const status = request.body.status === 'draft' ? 'draft' : 'published';
    const justPublished = status === 'published' && article.status === 'draft';
    if (justPublished) article.publishedAt = new Date();
    article.status = status;

    await article.save();
    const newsletter = await notifyIfFirstPublish(article, request.body.notify !== 'false', justPublished);
    response.json({ ...toClient(article), newsletter });
  } catch (error) {
    if (error.code === 11000) return response.status(409).json({ error: 'Another article already uses this slug.' });
    next(error);
  }
});

app.post('/api/articles/images', requireAdmin, upload.single('image'), async (request, response, next) => {
  try {
    if (!request.file) {
      return response.status(400).json({ error: `An image file (JPEG, PNG, WEBP, GIF up to ${process.env.NETLIFY ? 4 : 8} MB) is required.` });
    }
    const url = await uploadToCloudinary(request.file);
    response.status(201).json({ url });
  } catch (error) {
    next(error);
  }
});

app.delete('/api/articles/:id', requireAdmin, async (request, response, next) => {
  try {
    const article = await Article.findById(request.params.id);
    if (!article) return response.status(404).json({ error: 'Article not found.' });
    await article.deleteOne();
    response.status(204).end();
  } catch (error) { next(error); }
});

app.get('/api/reports', async (request, response, next) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    response.json(reports.map(toClient));
  } catch (error) { next(error); }
});

app.post('/api/reports', requireAdmin, reportUpload.single('document'), async (request, response, next) => {
  try {
    const { title, slug, type, year, summary } = request.body;
    if (!title || !slug || !year || !summary || !REPORT_TYPES.includes(type) || !request.file) {
      return response.status(400).json({ error: 'Title, slug, type, year, summary, and a PDF document are required.' });
    }
    const cloudinaryResult = process.env.NETLIFY
      ? await uploadReportToCloudinary(request.file, slug)
      : null;
    const documentUrl = cloudinaryResult ? cloudinaryResult.secure_url : await saveReportLocally(request.file, slug);
    const report = await Report.create({
      title,
      slug,
      type,
      year,
      summary,
      documentUrl,
      storage: cloudinaryResult ? 'cloudinary' : 'local',
      cloudinaryPublicId: cloudinaryResult ? cloudinaryResult.public_id : undefined,
      documentName: request.file.originalname,
      documentSize: request.file.size
    });
    response.status(201).json(toClient(report));
  } catch (error) {
    if (error.code === 11000) return response.status(409).json({ error: 'A report with this slug already exists.' });
    next(error);
  }
});

app.delete('/api/reports/:id', requireAdmin, async (request, response, next) => {
  try {
    const report = await Report.findById(request.params.id);
    if (!report) return response.status(404).json({ error: 'Report not found.' });
    if (report.storage === 'local' && report.documentUrl.startsWith('/reports/')) {
      const filename = path.basename(report.documentUrl);
      await fsp.unlink(path.join(reportsDirectory, filename)).catch(error => {
        if (error.code !== 'ENOENT') throw error;
      });
    }
    if (report.storage === 'cloudinary' && report.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(report.cloudinaryPublicId, { resource_type: 'raw' });
    }
    await report.deleteOne();
    response.status(204).end();
  } catch (error) { next(error); }
});

app.get('/api/gallery', async (request, response, next) => {
  try {
    const filter = request.query.category && request.query.category !== 'all' ? { category: request.query.category } : {};
    const images = await GalleryImage.find(filter).sort({ createdAt: -1 });
    response.json(images.map(toClient));
  } catch (error) { next(error); }
});

app.post('/api/gallery', requireAdmin, upload.single('image'), async (request, response, next) => {
  try {
    const { title, category, description, aspect } = request.body;
    if (!title || !category || !description || !GALLERY_CATEGORIES.includes(category)) {
      return response.status(400).json({ error: 'Title, category, and description are required.' });
    }
    if (!request.file) {
      return response.status(400).json({ error: `An image file (JPEG, PNG, WEBP, GIF up to ${process.env.NETLIFY ? 4 : 8} MB) is required.` });
    }
    const uploadResult = await uploadImageToCloudinary(request.file, 'dira/gallery');
    const image = await GalleryImage.create({
      title: title.trim(),
      category,
      categoryLabel: CATEGORY_LABELS[category] || category,
      description: description.trim(),
      src: uploadResult.secure_url,
      cloudinaryPublicId: uploadResult.public_id || null,
      aspect: ASPECT_RATIOS.includes(aspect) ? aspect : 'landscape'
    });
    response.status(201).json(toClient(image));
  } catch (error) { next(error); }
});

app.delete('/api/gallery/:id', requireAdmin, async (request, response, next) => {
  try {
    const image = await GalleryImage.findById(request.params.id);
    if (!image) return response.status(404).json({ error: 'Gallery image not found.' });
    if (image.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(image.cloudinaryPublicId);
      } catch (cloudErr) {
        console.warn('Could not delete from Cloudinary:', cloudErr.message);
      }
    }
    await image.deleteOne();
    response.status(204).end();
  } catch (error) { next(error); }
});

app.get('/sitemap.xml', async (request, response, next) => {
  try {
    const sitemapPath = process.env.SITEMAP_PATH || path.join(publicRoot, 'sitemap.xml');
    const [sitemap, articles] = await Promise.all([
      fsp.readFile(sitemapPath, 'utf8'),
      Article.find(PUBLISHED_FILTER, 'slug updatedAt').sort({ createdAt: -1 }).lean()
    ]);
    const closingTag = '</urlset>';
    const closingIndex = sitemap.lastIndexOf(closingTag);
    if (closingIndex === -1) throw new Error('The sitemap.xml file does not contain a closing urlset tag.');

    const articleUrls = articles.map(article => {
      const articleUrl = new URL('/article', 'https://diracmr.com');
      articleUrl.searchParams.set('slug', article.slug);
      const lastmod = new Date(article.updatedAt).toISOString().slice(0, 10);
      return `  <url><loc>${articleUrl.href}</loc><lastmod>${lastmod}</lastmod></url>`;
    }).join('\n');
    const dynamicUrls = articleUrls ? `\n${articleUrls}\n` : '\n';

    response.type('application/xml').send(
      `${sitemap.slice(0, closingIndex)}${dynamicUrls}${sitemap.slice(closingIndex)}`
    );
  } catch (error) { next(error); }
});

app.use(express.static(publicRoot, {
  setHeaders: (response, filePath) => {
    if (['gallery.js', 'testimonial-toast.js'].includes(path.basename(filePath))) {
      response.setHeader('Cache-Control', 'no-store');
    }
  }
}));
app.use((error, request, response, next) => {
  if (error instanceof multer.MulterError || error.message.includes('File too large') || error.message.includes('Reports must be PDF')) return response.status(400).json({ error: error.message.includes('Reports') ? error.message : 'Uploaded files exceed the allowed size.' });
  if (error.message.includes('Cloudinary is not configured')) return response.status(503).json({ error: error.message });
  console.error(error);
  response.status(500).json({ error: 'An unexpected server error occurred.' });
});

async function start() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is missing. Add it to .env.');
  await mongoose.connect(process.env.MONGODB_URI);
  await Article.collection.deleteMany({ isSeed: true });
  app.listen(port, () => console.log(`DIRA server running at http://localhost:${port}`));
}

if (require.main === module) start().catch(error => { console.error(error.message); process.exit(1); });

module.exports = app;
