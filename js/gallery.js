/**
 * DIRA Visual Gallery
 * Image storage implemented via data arrays with visual story cards,
 * responsive lightbox, and keyboard navigation.
 */

// ==========================================
// 1. IMAGE STORAGE DATA ARRAY
// ==========================================
let galleryImages = [
    
];

const categoryStories = [
    {
        category: 'events',
        role: 'Community, sprints & events',
        title: 'Events & Tech Fest',
        affiliation: 'DIRA community programmes, innovation sprints and public technology moments',
        narrative: 'A visual record of the people, ideas and shared momentum behind DIRA community work and Tech Fest activities.',
        context: 'Explore the events, community outreach and innovation sprint moments documented by DIRA.'
    },
    {
        category: 'training',
        role: 'Training & team',
        title: 'Training & Team',
        affiliation: 'Skills development, engineering practice and the people building with DIRA',
        narrative: 'From software architecture to project delivery, these images follow the learning and collaboration that power DIRA work.',
        context: 'Explore the training, skills development and team practice images from DIRA.'
    },
    {
        category: 'production',
        role: 'Studio & media',
        title: 'Studio & Media',
        affiliation: 'Content production, visual identity and human-centred design at DIRA',
        narrative: 'A behind-the-scenes view of the studio, design thinking and visual systems that help DIRA communicate ideas clearly.',
        context: 'Explore studio sessions, design work and DIRA visual identity images.'
    },
    {
        category: 'platforms',
        role: 'Platforms & systems',
        title: 'Platforms & Systems',
        affiliation: 'Digital products, client platforms and the infrastructure behind them',
        narrative: 'These images trace the systems DIRA designs and delivers for institutions, businesses, communities and teams across Cameroon.',
        context: 'Explore product interfaces, platform work and technical infrastructure images.'
    }
];

// ==========================================
// 2. STATE & DOM REFERENCES
// ==========================================
let activeCategoryImages = [];

const visualStoryGallery = document.getElementById('visualStoryGallery');

// Category gallery modal elements
const galleryModal = document.getElementById('galleryModal');
const galleryModalTitle = document.getElementById('galleryModalTitle');
const galleryModalDescription = document.getElementById('galleryModalDescription');
const galleryModalCount = document.getElementById('galleryModalCount');
const galleryModalGrid = document.getElementById('galleryModalGrid');
const galleryModalClose = document.getElementById('galleryModalClose');

// ==========================================
// 3. VISUAL STORY RENDER FUNCTION
// ==========================================
function renderGallery() {
    if (!visualStoryGallery) return;

    // Build one visual story card for each category.
    visualStoryGallery.innerHTML = categoryStories.map((story, index) => {
        const categoryImages = galleryImages.filter(item => item.category === story.category);
        const coverImage = categoryImages[0];
        if (!coverImage) return '';

        return `
            <article class="interview-card" data-category="${story.category}" tabindex="0" role="button" aria-label="View ${escapeHtml(story.title)} photos">
                <div class="interview-photo">
                    <img src="${coverImage.src}" alt="${escapeHtml(story.title)}" loading="lazy">
                </div>
                <div class="interview-content">
                    <div class="interview-role">${escapeHtml(story.role)}</div>
                    <div class="interview-name">${escapeHtml(story.title)}</div>
                    <div class="interview-affil">${escapeHtml(story.affiliation)}</div>
                    <div class="interview-quote">
                        <p>"${escapeHtml(story.narrative)}"</p>
                    </div>
                    <div class="interview-context">${escapeHtml(story.context)} </div>
                    <div class="interview-button" aria-hidden="true">View all ${categoryImages.length} Photos &rarr;</div>
                </div>
            </article>
        `;
    }).join('');

    // Attach click and keyboard listeners to each visual story.
    const storyCards = visualStoryGallery.querySelectorAll('.interview-card');
    storyCards.forEach(card => {
        const category = card.dataset.category;
        card.addEventListener('click', () => openCategoryGallery(category));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCategoryGallery(category);
            }
        });
    });
}

// Utility to escape HTML to prevent XSS
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ==========================================
// 4. LIGHTBOX CONTROLLER
// ==========================================
function openCategoryGallery(category) {
    activeCategoryImages = galleryImages.filter(item => item.category === category);
    const story = categoryStories.find(item => item.category === category);
    if (!activeCategoryImages.length || !story || !galleryModal) return;

    galleryModalTitle.textContent = story.title;
    galleryModalDescription.textContent = story.affiliation;
    galleryModalCount.textContent = `${activeCategoryImages.length} ${activeCategoryImages.length === 1 ? 'image' : 'images'}`;
    galleryModalGrid.innerHTML = activeCategoryImages.map(item => `
        <a class="category-gallery-item" href="${item.src}" target="_blank" rel="noopener" aria-label="Open ${escapeHtml(item.title)}">
            <img src="${item.src}" alt="${escapeHtml(item.title)}" loading="lazy">
            <span>${escapeHtml(item.title)}</span>
        </a>
    `).join('');

    galleryModal.classList.add('is-active');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    if (!galleryModal) return;
    galleryModal.classList.remove('is-active');
    galleryModal.setAttribute('aria-hidden', 'true');
    galleryModalGrid.innerHTML = '';
    document.body.style.overflow = '';
}

function initializeTestimonialsCarousel() {
    const carousel = document.getElementById('testimonialsCarousel');
    if (!carousel) return;

    const viewport = carousel.querySelector('.testimonials-viewport');
    const track = carousel.querySelector('.testimonials-grid');
    const cards = Array.from(carousel.querySelectorAll('.testimonial-card'));
    const previousButton = carousel.querySelector('.testimonial-carousel-prev');
    const nextButton = carousel.querySelector('.testimonial-carousel-next');
    const dots = carousel.querySelector('.testimonial-carousel-dots');
    if (!viewport || !track || !cards.length || !dots) return;

    let activeIndex = 0;
    let touchStartX = 0;
    let autoplayInterval;

    cards.forEach((card, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'testimonial-carousel-dot';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Show testimonial ${index + 1}`);
        dot.addEventListener('click', () => showTestimonial(index));
        dots.appendChild(dot);
    });

    function showTestimonial(index) {
        activeIndex = (index + cards.length) % cards.length;
        track.style.transform = `translateX(-${activeIndex * 100}%)`;
        cards.forEach((card, cardIndex) => {
            card.setAttribute('aria-hidden', cardIndex === activeIndex ? 'false' : 'true');
        });
        dots.querySelectorAll('.testimonial-carousel-dot').forEach((dot, dotIndex) => {
            const isActive = dotIndex === activeIndex;
            dot.classList.toggle('is-active', isActive);
            dot.setAttribute('aria-selected', String(isActive));
        });
    }

    previousButton.addEventListener('click', () => showTestimonial(activeIndex - 1));
    nextButton.addEventListener('click', () => showTestimonial(activeIndex + 1));
    carousel.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') showTestimonial(activeIndex - 1);
        if (event.key === 'ArrowRight') showTestimonial(activeIndex + 1);
    });
    viewport.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });
    viewport.addEventListener('touchend', (event) => {
        const touchDistance = event.changedTouches[0].screenX - touchStartX;
        if (Math.abs(touchDistance) < 45) return;
        showTestimonial(activeIndex + (touchDistance < 0 ? 1 : -1));
    }, { passive: true });

    function startAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        autoplayInterval = setInterval(() => showTestimonial(activeIndex + 1), 3500);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', (event) => {
        if (!carousel.contains(event.relatedTarget)) startAutoplay();
    });

    showTestimonial(0);
    startAutoplay();
}

function initializeTestimonialToast() {
    const testimonialCards = Array.from(document.querySelectorAll('.testimonial-card'));
    if (!testimonialCards.length || document.getElementById('testimonialToast')) return;

    const toast = document.createElement('aside');
    toast.id = 'testimonialToast';
    toast.className = 'testimonial-toast';
    toast.setAttribute('aria-live', 'polite');
    toast.setAttribute('aria-hidden', 'true');
    toast.innerHTML = `
        <button class="testimonial-toast-close" type="button" aria-label="Dismiss testimonial">&times;</button>
        <div class="testimonial-toast-label">Client feedback</div>
        <blockquote class="testimonial-toast-quote"></blockquote>
        <div class="testimonial-toast-author"></div>
        <a class="testimonial-toast-cta" href="https://client-intake-form.diracmr.com" target="_blank" rel="noopener">
            Start a Project With Us Today <span aria-hidden="true">&rarr;</span>
        </a>
    `;
    document.body.appendChild(toast);

    const quote = toast.querySelector('.testimonial-toast-quote');
    const author = toast.querySelector('.testimonial-toast-author');
    const closeButton = toast.querySelector('.testimonial-toast-close');
    let testimonialIndex = 0;
    let showTimer;
    let hideTimer;

    function showToast() {
        const card = testimonialCards[testimonialIndex % testimonialCards.length];
        const cardQuote = card.querySelector('.testimonial-quote');
        const cardAuthor = card.querySelector('.testimonial-author-box h4');
        if (!cardQuote || !cardAuthor) return;

        quote.textContent = cardQuote.textContent.trim();
        author.textContent = cardAuthor.textContent.trim();
        testimonialIndex += 1;
        toast.classList.add('is-visible');
        toast.setAttribute('aria-hidden', 'false');
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => hideToast(true), 9000);
    }

    function hideToast(scheduleNext) {
        toast.classList.remove('is-visible');
        toast.setAttribute('aria-hidden', 'true');
        if (scheduleNext) scheduleToast(12000);
    }

    function scheduleToast(delay = 7000) {
        clearTimeout(showTimer);
        showTimer = setTimeout(() => {
            showToast();
        }, delay);
    }

    closeButton.addEventListener('click', () => {
        hideToast(false);
        scheduleToast(12000);
    });

    scheduleToast(2000);
}

// ==========================================
// 5. EVENT LISTENERS & INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    renderGallery();
    fetchUploadedGalleryImages();
    initializeTestimonialsCarousel();
    initializeTestimonialToast();

    // Category gallery modal controls
    if (galleryModalClose) galleryModalClose.addEventListener('click', closeGalleryModal);

    if (galleryModal) {
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal || e.target.classList.contains('gallery-modal-backdrop')) {
                closeGalleryModal();
            }
        });
    }

    // Escape closes the category gallery modal.
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && galleryModal && galleryModal.classList.contains('is-active')) {
            closeGalleryModal();
        }
    });
});
async function fetchUploadedGalleryImages() {
    try {
        const apiBase = window.DIRA_API_BASE || (window.location.protocol === 'file:' ? 'http://localhost:3000/api' : '/api');
        const response = await fetch(`${apiBase}/gallery`);
        if (response.ok) {
            const uploaded = await response.json();
            if (Array.isArray(uploaded) && uploaded.length > 0) {
                // Ensure uploaded images have unique ids and match structure
                galleryImages = [...uploaded, ...galleryImages];
                renderGallery();
            }
        }
    } catch (e) {
        // Graceful fallback to static images
    }
}
