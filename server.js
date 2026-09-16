require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sanitizeHtml = require('sanitize-html');
const mongoose = require('mongoose');
const { v2: cloudinary } = require('cloudinary');
const { Article, CATEGORIES } = require('./models/Article');

const app = express();
const port = Number(process.env.PORT || 3000);
const publicRoot = __dirname;
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (request, file, callback) => {
    if (!/^image\/(jpeg|png|webp|gif)$/.test(file.mimetype)) {
      return callback(new Error('Images must be JPEG, PNG, WEBP, or GIF files up to 8 MB.'));
    }
    callback(null, true);
  }
});

const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map(origin => origin.trim()).filter(Boolean);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || (process.env.NODE_ENV !== 'production' && origin === 'null')) return callback(null, true);
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

function toClient(article) {
  return article.toClientJSON ? article.toClientJSON() : article;
}

function parseTags(value) {
  if (Array.isArray(value)) return value.map(tag => String(tag).trim()).filter(Boolean);
  return String(value || '').split(',').map(tag => tag.trim()).filter(Boolean);
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

app.get('/api/health', (request, response) => {
  response.json({ ok: true, database: mongoose.connection.readyState === 1 });
});

app.get('/api/articles', async (request, response, next) => {
  try {
    const filter = request.query.category && request.query.category !== 'All' ? { category: request.query.category } : {};
    const articles = await Article.find(filter).sort({ createdAt: -1 });
    response.json(articles.map(toClient));
  } catch (error) { next(error); }
});

app.get('/api/articles/:slug', async (request, response, next) => {
  try {
    const article = await Article.findOne({ slug: request.params.slug });
    if (!article) return response.status(404).json({ error: 'Article not found.' });
    response.json(toClient(article));
  } catch (error) { next(error); }
});

app.post('/api/articles', upload.single('image'), async (request, response, next) => {
  try {
    const { title, slug, category, author, date, readTime, excerpt, content } = request.body;
    if (!title || !slug || !date || !excerpt || !content || !CATEGORIES.includes(category)) {
      return response.status(400).json({ error: 'Title, slug, category, date, excerpt, and content are required.' });
    }
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
      content: sanitizeHtml(content, { allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']), allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ['src', 'alt', 'width', 'height'] } }),
      tags: parseTags(request.body.tags)
    });
    response.status(201).json(toClient(article));
  } catch (error) {
    if (error.code === 11000) return response.status(409).json({ error: 'An article with this slug already exists.' });
    next(error);
  }
});

app.delete('/api/articles/:id', async (request, response, next) => {
  try {
    const article = await Article.findById(request.params.id);
    if (!article) return response.status(404).json({ error: 'Article not found.' });
    await article.deleteOne();
    response.status(204).end();
  } catch (error) { next(error); }
});

app.use(express.static(publicRoot));
app.use((error, request, response, next) => {
  if (error instanceof multer.MulterError || error.message.includes('File too large')) return response.status(400).json({ error: 'Images must be JPEG, PNG, WEBP, or GIF files up to 8 MB.' });
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
