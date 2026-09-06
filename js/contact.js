// ==========================================================
// EmailJS Form Handler
// ==========================================================

let emailJSInitialized = false;

function initializeEmailJS() {
    try {
        if (typeof emailjs !== 'undefined') {
            emailjs.init("MoJiTEo61wDfp46UC");
            emailJSInitialized = true;
            console.log('EmailJS initialized successfully');
        }
    } catch (error) {
        console.error('EmailJS initialization failed:', error);
        emailJSInitialized = false;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEmailJS();
    initSocialGallery();
});

// DOM Elements
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const spinner = document.getElementById('spinner');
const successNotification = document.getElementById('successNotification');
const errorNotification = document.getElementById('errorNotification');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!emailJSInitialized) {
            showNotification(errorNotification, 'Email service is not ready. Please try again in a moment.');
            return;
        }
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        const date = new Date().toLocaleString();
        
        hideNotifications();
        
        if (!name || !email || !subject || !message) {
            showNotification(errorNotification, 'Please fill in all required fields.');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification(errorNotification, 'Please enter a valid email address.');
            return;
        }
        
        setLoadingState(true);
        
        try {
            console.log('Sending email with data:', { name, email, phone, subject, message, date });
            
            const response = await emailjs.send(
                'service_dps558e',
                'template_tyhafh1',
                {
                    name: name,
                    email: email,
                    phone: phone || 'Not provided',
                    subject: subject,
                    message: message,
                    date: date
                }
            );
            
            console.log('EmailJS response:', response);
            showNotification(successNotification, 'Thank you for your message! We will get back to you soon.');
            this.reset();
            
        } catch (error) {
            console.error('EmailJS error details:', error);
            
            let errorMessage = 'There was an error sending your message. Please try again.';
            if (error.status === 400) {
                errorMessage = 'Invalid request. Please check your input and try again.';
            } else if (error.status === 401) {
                errorMessage = 'Authentication failed. Please contact support.';
            } else if (error.status === 402) {
                errorMessage = 'Email quota exceeded. Please try again later.';
            } else if (error.status === 404) {
                errorMessage = 'Email service not found. Please contact support.';
            } else if (error.status >= 500) {
                errorMessage = 'Server error. Please try again later.';
            }
            
            showNotification(errorNotification, errorMessage);
        } finally {
            setLoadingState(false);
        }
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function setLoadingState(isLoading) {
    if (!submitBtn) return;
    if (isLoading) {
        submitBtn.disabled = true;
        if (spinner) spinner.style.display = 'block';
        const label = submitBtn.querySelector('span:last-child');
        if (label) label.textContent = 'Sending...';
    } else {
        submitBtn.disabled = false;
        if (spinner) spinner.style.display = 'none';
        const label = submitBtn.querySelector('span:last-child');
        if (label) label.textContent = 'Send Message';
    }
}

function showNotification(notification, message) {
    if (!notification) return;
    if (message) {
        const span = notification.querySelector('span');
        if (span) span.textContent = message;
    }
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

function hideNotifications() {
    if (successNotification) successNotification.classList.remove('show');
    if (errorNotification) errorNotification.classList.remove('show');
}

setTimeout(() => {
    if (!emailJSInitialized) {
        console.log('Retrying EmailJS initialization...');
        initializeEmailJS();
    }
}, 2000);


// ==========================================================
// 4-Channel Social Feed Engine: WhatsApp, TikTok, Facebook, Instagram
// Simply takes in the link and automatically previews the post/channel
// ==========================================================

const socialFeedPosts = [
    {
        id: "post-whatsapp",
        platform: "whatsapp",
        platformName: "WhatsApp Channel",
        url: "https://whatsapp.com/channel/0029VaDIRAOfficial"
    },
    {
        id: "post-tiktok",
        platform: "tiktok",
        platformName: "TikTok",
        url: "https://www.tiktok.com/@digital.era.dira/video/7547699137915964728"
    },
    {
        id: "post-facebook",
        platform: "facebook",
        platformName: "Facebook",
        url: "https://www.facebook.com/profile.php?id=61583966202064"
    },
    {
        id: "post-instagram",
        platform: "instagram",
        platformName: "Instagram",
        url: "https://www.instagram.com/p/DTX8P_3jMvo/"
    }
];

// Helper: Extract platform-specific post identifier or preview data from URL
function parsePostUrl(post) {
    const url = post.url;
    let itemId = "";

    if (post.platform === "instagram") {
        const match = url.match(/\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/);
        if (match && match[1]) {
            itemId = match[1];
        }
    } else if (post.platform === "tiktok") {
        const match = url.match(/\/video\/(\d+)/);
        if (match && match[1]) {
            itemId = match[1];
        }
    } else if (post.platform === "whatsapp") {
        const match = url.match(/\/channel\/([A-Za-z0-9_-]+)/);
        if (match && match[1]) {
            itemId = match[1];
        }
    } else if (post.platform === "facebook") {
        itemId = url;
    }

    return {
        url: url,
        itemId: itemId,
        platform: post.platform,
        platformName: post.platformName
    };
}

// Return official SVG icon for each platform
function getPlatformSvg(platform) {
    switch (platform) {
        case 'whatsapp':
            return `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
        case 'tiktok':
            return `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8.5a4 4 0 0 0 4 4h1v-3a6 6 0 0 1-6-6v5.5z" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 8v8a4 4 0 0 0 4 4h1" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
        case 'facebook':
            return `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.3v-2.9h2.3V9.4c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .08 2 .08v2.2h-1.1c-1.1 0-1.4.66-1.4 1.3v1.6h2.4l-.4 2.9h-2v7A10 10 0 0 0 22 12z" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
        case 'instagram':
        default:
            return `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.4" fill="none"/>
                    <circle cx="12" cy="12" r="3.2" stroke="currentColor" stroke-width="1.4" fill="none"/>
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/>
                </svg>
            `;
    }
}

// Lazy Loading Embed Observer
let socialEmbedObserver = null;

function initSocialGallery() {
    const galleryGrid = document.getElementById('socialGalleryGrid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    
    socialEmbedObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                loadDynamicEmbed(card);
                observer.unobserve(card);
            }
        });
    }, {
        rootMargin: "250px 0px"
    });

    socialFeedPosts.forEach((post) => {
        const info = parsePostUrl(post);
        const card = document.createElement('article');
        card.className = 'social-feed-card';
        card.dataset.id = post.id;
        card.dataset.platform = info.platform;
        card.dataset.url = info.url;
        card.dataset.itemId = info.itemId;

        const platformSvg = getPlatformSvg(info.platform);

        card.innerHTML = `
            <div class="post-card-header">
                <div class="post-author-badge">
                    ${platformSvg}
                    <span>${info.platformName}</span>
                </div>
                <span class="post-platform-tag ${info.platform}">${info.platformName}</span>
            </div>

            <div class="post-media-wrap" id="mediaWrap-${post.id}">
                <!-- Immediate preview / fallback card derived purely from the link -->
                <div class="post-fallback-visual" onclick="openSocialLightbox('${post.id}')" title="Click to preview">
                    ${platformSvg}
                    <h4>${info.platformName}</h4>
                    <p style="font-family: monospace; font-size: 0.8rem; word-break: break-all; color: #94a3b8; max-width: 260px;">
                        ${info.url}
                    </p>
                    <span class="post-play-badge">
                        <span>Preview Post</span> &rarr;
                    </span>
                </div>

                <!-- Embed Target Container -->
                <div class="post-embed-container" id="embedContainer-${post.id}"></div>
            </div>

            <div class="post-card-actions">
                <button type="button" class="btn-lightbox-trigger" onclick="openSocialLightbox('${post.id}')">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Lightbox</span>
                </button>
                <a href="${info.url}" target="_blank" rel="noopener" class="btn-post-outlink" title="Open on ${info.platformName}">
                    <span>Open on ${info.platformName}</span> &rarr;
                </a>
            </div>
        `;

        galleryGrid.appendChild(card);
        socialEmbedObserver.observe(card);
    });
}

// Dynamically injects official preview from link
function loadDynamicEmbed(card) {
    const platform = card.dataset.platform;
    const url = card.dataset.url;
    const itemId = card.dataset.itemId;
    const id = card.dataset.id;
    const embedContainer = document.getElementById(`embedContainer-${id}`);
    if (!embedContainer) return;

    if (platform === 'instagram') {
        embedContainer.innerHTML = `
            <blockquote class="instagram-media" 
                data-instgrm-permalink="${url}" 
                data-instgrm-version="14" 
                style="width:100%; min-height:360px; border:0; border-radius:8px; margin:0 auto;">
            </blockquote>
        `;
        embedContainer.classList.add('loaded');
        loadInstagramScript();
        
    } else if (platform === 'tiktok') {
        embedContainer.innerHTML = `
            <blockquote class="tiktok-embed" cite="${url}" data-video-id="${itemId}" style="width:100%; max-width:325px; margin:0 auto;">
                <section>
                    <a target="_blank" href="${url}">TikTok Post</a>
                </section>
            </blockquote>
        `;
        embedContainer.classList.add('loaded');
        loadTikTokScript();

    } else if (platform === 'facebook') {
        embedContainer.innerHTML = `
            <iframe 
                src="https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(url)}&tabs=timeline&width=340&height=380&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true" 
                width="100%" 
                height="100%" 
                style="border:none; overflow:hidden;" 
                scrolling="no" 
                frameborder="0" 
                allowfullscreen="true" 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
            </iframe>
        `;
        embedContainer.classList.add('loaded');

    } else if (platform === 'whatsapp') {
        // WhatsApp Channel dedicated interactive card
        embedContainer.innerHTML = `
            <div style="padding: 2rem 1.5rem; text-align: center; background: linear-gradient(135deg, #075E54 0%, #128C7E 100%); color: #ffffff; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <div style="background: rgba(255,255,255,0.15); width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                    ${getPlatformSvg('whatsapp')}
                </div>
                <h4 style="font-size: 1.2rem; margin-bottom: 0.35rem; color: #ffffff;">WhatsApp Channel</h4>
                <p style="font-size: 0.85rem; color: #dcf8c6; margin-bottom: 1.25rem;">Live Broadcast Channel</p>
                <a href="${url}" target="_blank" rel="noopener" style="background: #25D366; color: #075E54; padding: 0.55rem 1.25rem; border-radius: 999px; text-decoration: none; font-weight: 700; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.4rem;">
                    <span>Join Channel</span> &rarr;
                </a>
            </div>
        `;
        embedContainer.classList.add('loaded');
    }
}

function loadInstagramScript() {
    if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = "https://www.instagram.com/embed.js";
        script.onload = () => {
            if (window.instgrm) window.instgrm.Embeds.process();
        };
        document.body.appendChild(script);
    } else if (window.instgrm) {
        window.instgrm.Embeds.process();
    }
}

function loadTikTokScript() {
    if (!document.querySelector('script[src*="tiktok.com/embed.js"]')) {
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = "https://www.tiktok.com/embed.js";
        document.body.appendChild(script);
    }
}


// ==========================================================
// Lightbox Controller
// ==========================================================

function openSocialLightbox(postId) {
    const post = socialFeedPosts.find(p => p.id === postId);
    if (!post) return;

    const info = parsePostUrl(post);
    const modal = document.getElementById('socialLightbox');
    const badge = document.getElementById('lightboxBadge');
    const title = document.getElementById('lightboxTitle');
    const caption = document.getElementById('lightboxCaption');
    const link = document.getElementById('lightboxLink');
    const mediaBox = document.getElementById('lightboxMedia');

    badge.textContent = info.platformName;
    badge.className = `lightbox-badge ${info.platform}`;
    
    title.textContent = info.platformName;
    caption.textContent = `Direct preview of post from: ${info.url}`;
    
    link.href = info.url;
    link.querySelector('span').textContent = `Open on ${info.platformName}`;

    mediaBox.innerHTML = `
        <div style="text-align:center; padding:2.5rem 1.5rem; color:#fff;">
            <div style="margin-bottom:1rem; display:flex; justify-content:center;">
                ${getPlatformSvg(info.platform)}
            </div>
            <h3 style="color:#00E6D6; margin-bottom:0.5rem; font-size:1.25rem;">${info.platformName}</h3>
            <p style="color:#cbd5e1; max-width:380px; margin:0 auto 1.5rem; font-size:0.85rem; word-break:break-all; font-family:monospace;">
                ${info.url}
            </p>
            <a href="${info.url}" target="_blank" rel="noopener" class="btn-lightbox-launch" style="background:#00E6D6; color:#0F3B5A;">
                <span>View on ${info.platformName}</span> &rarr;
            </a>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSocialLightbox() {
    const modal = document.getElementById('socialLightbox');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSocialLightbox();
    }
});