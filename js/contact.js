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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.3-.776.979-.951 1.18-.175.2-.35.226-.651.075-.3-.15-1.267-.467-2.414-1.49-1.2-1.07-2.01-2.39-2.247-2.793-.238-.403-.025-.62.126-.77.135-.135.3-.35.45-.526.15-.175.2-.3.3-.5.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-1.026-2.232-.341-.586-.688-.507-.946-.52-.244-.012-.524-.015-.805-.015-.28 0-.734.105-1.118.526-.384.42-1.468 1.435-1.468 3.5 0 2.065 1.503 4.06 1.713 4.34.21.28 2.96 4.52 7.17 6.34 1 .43 1.78.69 2.39.88.99.31 1.89.27 2.6.16.79-.12 2.42-.99 2.76-1.95.34-.95.34-1.77.24-1.95-.1-.17-.3-.27-.6-.42zM12.04 21.94h-.01c-1.8 0-3.56-.48-5.11-1.39l-.37-.22-3.8 1 1.02-3.7-.24-.38a9.88 9.88 0 0 1-1.52-5.26c0-5.46 4.45-9.91 9.92-9.91 2.65 0 5.14 1.03 7.01 2.9 1.87 1.87 2.9 4.36 2.9 7.01 0 5.46-4.44 9.95-9.8 9.95zM12.04 0C5.46 0 .1 5.36.1 11.95c0 2.11.55 4.17 1.6 5.99L0 24l6.23-1.63a11.9 11.9 0 0 0 5.81 1.51h.01c6.58 0 11.94-5.36 11.94-11.95 0-3.19-1.24-6.19-3.5-8.45C18.23 1.23 15.23 0 12.04 0z"/>
                </svg>
            `;
        case 'tiktok':
            return `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.28 6.28 0 0 0 3.1 15.6a6.28 6.28 0 0 0 6.28 6.28 6.28 6.28 0 0 0 6.28-6.28V8.85a8.23 8.23 0 0 0 3.93 1.34V6.69z"/>
                </svg>
            `;
        case 'facebook':
            return `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
            `;
        case 'youtube':
            return `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
            `;
        case 'linkedin':
            return `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.86 0 1.56-.7 1.56-1.56s-.7-1.56-1.56-1.56a1.56 1.56 0 0 0-1.56 1.56c0 .86.7 1.56 1.56 1.56m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
                </svg>
            `;
        case 'x':
        case 'twitter':
            return `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
            `;
        case 'instagram':
        default:
            return `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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
                    <p class="post-fallback-url">
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