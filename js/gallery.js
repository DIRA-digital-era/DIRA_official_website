/**
 * DIRA Visual Gallery
 * Image storage implemented via data arrays with Pinterest-style Masonry layout,
 * real-time filtering, responsive lightbox, and keyboard navigation.
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

// ==========================================
// 2. STATE & DOM REFERENCES
// ==========================================
let currentFilter = 'all';
let filteredList = [...galleryImages];
let activeLightboxIndex = 0;

const galleryGrid = document.getElementById('masonryGrid');
const galleryCount = document.getElementById('galleryCount');
const filterButtons = document.querySelectorAll('.filter-pill');
const emptyState = document.getElementById('galleryEmptyState');

// Lightbox Elements
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCategory = document.getElementById('lightboxCategory');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxFullLink = document.getElementById('lightboxFullLink');

// ==========================================
// 3. MASONRY RENDER FUNCTION
// ==========================================
function renderGallery() {
    if (!galleryGrid) return;

    // Filter by category
    filteredList = galleryImages.filter(item => {
        return currentFilter === 'all' || item.category === currentFilter;
    });

    // Update Counter
    if (galleryCount) {
        galleryCount.textContent = `${filteredList.length} ${filteredList.length === 1 ? 'item' : 'items'}`;
    }

    // Handle Empty State
    if (filteredList.length === 0) {
        galleryGrid.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    } else {
        if (emptyState) emptyState.style.display = 'none';
    }

    // Build Pinterest Masonry Cards
    galleryGrid.innerHTML = filteredList.map((item, index) => {
        return `
            <article class="masonry-pin aspect-${item.aspect}" data-index="${index}" tabindex="0" role="button" aria-label="View photo: ${escapeHtml(item.title)}">
                <div class="pin-media-wrapper">
                    <img src="${item.src}" alt="${escapeHtml(item.title)}" loading="lazy" class="pin-img">
                    <div class="pin-overlay">
                        <div class="pin-overlay-top">
                            <span class="pin-badge ${item.category}">${escapeHtml(item.categoryLabel)}</span>
                            <button class="pin-action-btn" aria-label="Expand image" title="Expand">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <polyline points="9 21 3 21 3 15"></polyline>
                                    <line x1="21" y1="3" x2="14" y2="10"></line>
                                    <line x1="3" y1="21" x2="10" y2="14"></line>
                                </svg>
                            </button>
                        </div>
                        <div class="pin-overlay-bottom">
                            <h3 class="pin-overlay-title">${escapeHtml(item.title)}</h3>
                        </div>
                    </div>
                </div>
                <div class="pin-details">
                    <h3 class="pin-title">${escapeHtml(item.title)}</h3>
                    <p class="pin-desc">${escapeHtml(item.description)}</p>
                </div>
            </article>
        `;
    }).join('');

    // Attach Click and Keyboard Listeners to Pins
    const pinElements = galleryGrid.querySelectorAll('.masonry-pin');
    pinElements.forEach(pin => {
        const index = parseInt(pin.dataset.index, 10);
        pin.addEventListener('click', () => openLightbox(index));
        pin.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
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
function openLightbox(index) {
    if (!filteredList[index]) return;
    activeLightboxIndex = index;
    updateLightboxContent();

    if (lightboxModal) {
        lightboxModal.classList.add('is-active');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    if (lightboxModal) {
        lightboxModal.classList.remove('is-active');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

function updateLightboxContent() {
    const item = filteredList[activeLightboxIndex];
    if (!item) return;

    if (lightboxImg) {
        lightboxImg.classList.remove('loaded');
        lightboxImg.src = item.src;
        lightboxImg.alt = item.title;
        lightboxImg.onload = () => {
            lightboxImg.classList.add('loaded');
        };
    }

    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxCategory) {
        lightboxCategory.textContent = item.categoryLabel;
        lightboxCategory.className = `lightbox-category-badge ${item.category}`;
    }
    if (lightboxDescription) lightboxDescription.textContent = item.description;
    if (lightboxCounter) lightboxCounter.textContent = `${activeLightboxIndex + 1} of ${filteredList.length}`;
    if (lightboxFullLink) lightboxFullLink.href = item.src;
}

function nextLightbox() {
    if (filteredList.length === 0) return;
    activeLightboxIndex = (activeLightboxIndex + 1) % filteredList.length;
    updateLightboxContent();
}

function prevLightbox() {
    if (filteredList.length === 0) return;
    activeLightboxIndex = (activeLightboxIndex - 1 + filteredList.length) % filteredList.length;
    updateLightboxContent();
}

// ==========================================
// 5. EVENT LISTENERS & INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    renderGallery();

    // Category Filter Buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter || 'all';
            renderGallery();
        });
    });

    // Lightbox Controls
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightbox);

    // Click outside lightbox content to close
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal || e.target.classList.contains('lightbox-backdrop')) {
                closeLightbox();
            }
        });
    }

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal || !lightboxModal.classList.contains('is-active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextLightbox();
        } else if (e.key === 'ArrowLeft') {
            prevLightbox();
        }
    });

    // Mobile Swipe Support on Lightbox
    let touchStartX = 0;
    let touchEndX = 0;

    if (lightboxModal) {
        lightboxModal.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightboxModal.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            nextLightbox(); // Swiped left -> next
        }
        if (touchEndX > touchStartX + threshold) {
            prevLightbox(); // Swiped right -> prev
        }
    }
});