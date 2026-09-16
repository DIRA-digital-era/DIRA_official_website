/**
 * DIRA Visual Gallery
 * Image storage implemented via data arrays with visual story cards,
 * responsive lightbox, and keyboard navigation.
 */

// ==========================================
// 1. IMAGE STORAGE DATA ARRAY
// ==========================================
const galleryImages = [
    {
        id: 1,
        src: "./images/photos/dira-team-techfest-2026.jpg",
        title: "DIRA Tech Fest 2026 Innovation Sprint",
        category: "events",
        categoryLabel: "Events & Tech Fest",
        description: "Engineers, participants, and partner delegates during the 48-hour DIRA Tech Fest sprint in Bamenda.",
        aspect: "landscape"
    },
    {
        id: 2,
        src: "./images/photos/dira-technical-training.jpg",
        title: "DIRA Technical Training & Capacity Building",
        category: "training",
        categoryLabel: "Training & Team",
        description: "Hands-on software development and systems engineering masterclass at the DIRA Bamenda learning center.",
        aspect: "landscape"
    },
    {
        id: 3,
        src: "./images/photos/IMG_1544.jpg",
        title: "DIRA Content Studio Filming Session",
        category: "production",
        categoryLabel: "Studio & Media",
        description: "Behind-the-scenes recording session using studio-grade camera and lighting equipment at AWICUL Building.",
        aspect: "portrait"
    },
    {
        id: 4,
        src: "./images/photos/IMG_9933.jpg",
        title: "DIRA Audio-Visual Production Lab",
        category: "production",
        categoryLabel: "Studio & Media",
        description: "Multi-track audio podcast recording and commercial editing workstation at DIRA Content Studio.",
        aspect: "portrait"
    },
    {
        id: 5,
        src: "./images/Flyer - DIGITAL ERA – You Dream It, We Build It. You Name It, We Code It. (1).jpg",
        title: "You Dream It, We Build It",
        category: "events",
        categoryLabel: "Events & Tech Fest",
        description: "DIRA brand identity, engineering manifesto, and technical service spectrum in Cameroon.",
        aspect: "tall"
    },
    {
        id: 6,
        src: "./images/portfolio/agrichain0.png",
        title: "AgriChain Supply Management System",
        category: "platforms",
        categoryLabel: "Platforms & Work",
        description: "End-to-end digital platform for tracking agricultural logistics, farmer inventory, and produce distribution.",
        aspect: "landscape"
    },
    {
        id: 7,
        src: "./images/portfolio/foundation0.png",
        title: "DIRA Foundation Community Outreach",
        category: "events",
        categoryLabel: "Events & Tech Fest",
        description: "Philanthropic initiatives delivering digital literacy, educational tools, and technology access to local communities.",
        aspect: "landscape"
    },
    {
        id: 8,
        src: "./images/portfolio/medtechies0.png",
        title: "MedTechies Healthcare Information System",
        category: "platforms",
        categoryLabel: "Platforms & Work",
        description: "Hospital management and medical records portal engineered for verified clinics and healthcare providers.",
        aspect: "landscape"
    },
    {
        id: 9,
        src: "./images/portfolio/opendreams.png",
        title: "Open Dreams Academic & Scholar Portal",
        category: "platforms",
        categoryLabel: "Platforms & Work",
        description: "Student admissions, international scholarship tracking, and mentorship portal serving African scholars.",
        aspect: "landscape"
    },
    {
        id: 10,
        src: "./images/portfolio/youngboyz0.png",
        title: "Young Boyz FC Official Digital Platform",
        category: "platforms",
        categoryLabel: "Platforms & Work",
        description: "Club management platform featuring match day stats, player rosters, and youth academy enrollment.",
        aspect: "landscape"
    },
    {
        id: 11,
        src: "./images/portfolio/foundation1.png",
        title: "Youth Technology Literacy Workshop",
        category: "events",
        categoryLabel: "Events & Tech Fest",
        description: "DIRA Foundation interactive computing session teaching fundamental coding and digital problem solving.",
        aspect: "landscape"
    },
    {
        id: 12,
        src: "./images/portfolio/agrichain1.png",
        title: "AgriChain Farm Yield & Market Analytics",
        category: "platforms",
        categoryLabel: "Platforms & Work",
        description: "Data visualization interface displaying real-time pricing trends and harvest metrics across regional markets.",
        aspect: "landscape"
    },
    {
        id: 13,
        src: "./images/portfolio/medtechies1.png",
        title: "MedTechies Diagnostic & Records Workflow",
        category: "platforms",
        categoryLabel: "Platforms & Work",
        description: "Secure, role-based access interface for doctors, nurses, and laboratory administrators.",
        aspect: "landscape"
    },
    {
        id: 14,
        src: "./images/portfolio/opendreams1.png",
        title: "Open Dreams Application Tracking UI",
        category: "platforms",
        categoryLabel: "Platforms & Work",
        description: "Applicant verification and documentation upload pipeline for global university candidates.",
        aspect: "landscape"
    },
    {
        id: 15,
        src: "./images/portfolio/foundation2.png",
        title: "DIRA Foundation Community Skills Lab",
        category: "events",
        categoryLabel: "Events & Tech Fest",
        description: "Grassroots technology demonstration and mentorship program for emerging young innovators in Bamenda.",
        aspect: "landscape"
    },
    {
        id: 16,
        src: "./images/utils/development.jpg",
        title: "Full-Stack Software Architecture",
        category: "training",
        categoryLabel: "Training & Team",
        description: "Enterprise software development methodologies, clean code practices, and scalable backend services.",
        aspect: "square"
    },
    {
        id: 17,
        src: "./images/utils/uiux.jpg",
        title: "Human-Centered UI/UX Design",
        category: "production",
        categoryLabel: "Studio & Media",
        description: "Wireframing, high-fidelity prototypes, design tokens, and user research workflows at DIRA.",
        aspect: "square"
    },
    {
        id: 18,
        src: "./images/utils/cloud.jpg",
        title: "Cloud Infrastructure & DevOps",
        category: "platforms",
        categoryLabel: "Platforms & Work",
        description: "High-availability deployment configurations, automated CI/CD pipelines, and secure cloud management.",
        aspect: "square"
    },
    {
        id: 19,
        src: "./images/utils/security.jpg",
        title: "Cybersecurity & Data Integrity",
        category: "platforms",
        categoryLabel: "Platforms & Work",
        description: "Multi-factor authentication, end-to-end encryption, and rigorous vulnerability auditing for client systems.",
        aspect: "square"
    },
    {
        id: 20,
        src: "./images/utils/management.jpg",
        title: "Agile Project Delivery & Operations",
        category: "training",
        categoryLabel: "Training & Team",
        description: "Structured sprint cycles, milestone management, and SLA-backed maintenance protocols.",
        aspect: "square"
    },
    {
        id: 21,
        src: "./images/Innovative Logo DIRA – Digital Era.jpg",
        title: "DIRA Brand & Innovation Emblem",
        category: "production",
        categoryLabel: "Studio & Media",
        description: "Official visual branding and digital emblem of DIRA SAS (Digital Era).",
        aspect: "square"
    }
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
            <article class="interview-card reveal" data-category="${story.category}" tabindex="0" role="button" aria-label="View ${escapeHtml(story.title)} photos">
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
                    <div class="interview-context">${escapeHtml(story.context)} Click to view all ${categoryImages.length} images in this collection.</div>
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

    scheduleToast();
}

// ==========================================
// 5. EVENT LISTENERS & INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    renderGallery();
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