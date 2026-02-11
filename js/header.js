function injectHeader(){
    const header = document.querySelector('header');
    header.innerHTML = `
        <div class="logo-section">
            <img src="./images/logo.jpg" alt="DIRA Logo">
            <span class="logo-text">DIRA</span>
        </div>
        <button class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <nav id="navMenu">
            <a href="index.html">HOME</a>
            <a href="about.html">ABOUT</a>
            <a href="services.html">SOLUTIONS</a>
            <a href="contact.html">CONTACTS</a>
            <a href="portfolio.html">GALLERY</a>
            <div class="dropdown">
                <button class="dropdown-toggle">
                    ECO-LINK <span class="dropdown-arrow">▼</span>
                </button>
                <ul class="dropdown-content">
                    <div class="dropdown-section">Internal Projects</div>
                    <li><a href="training.html">DHUB</a></li>
                    <li><a href="https://diratechfest.netlify.app/">Tech Fest</a></li>
                    <div class="dropdown-section">Client Work</div>
                    <li><a href="portfolio.html">View All Projects</a></li>
                </ul>
            </div>
        </nav>
    `
}

function injectFooter(){
    const footer = document.querySelector('footer');
    footer.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>About Us</h3>
                    <p>Providing innovative tech solutions to help businesses thrive in the digital era.</p>
                </div>
                
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Connect With Us</h3>
                    <div class="social-links">
                        <a href="https://www.facebook.com/share/1RapbDFC99/?mibextid=wwXIfr" aria-label="Facebook" class="social-icon" title="Facebook">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.3v-2.9h2.3V9.4c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .08 2 .08v2.2h-1.1c-1.1 0-1.4.66-1.4 1.3v1.6h2.4l-.4 2.9h-2v7A10 10 0 0 0 22 12z" stroke="currentColor" stroke-width="0.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                        <a href="https://X.com/@diradigitalera" aria-label="Twitter" class="social-icon" title="Twitter">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1s-1.82.99-2.83 1.28A4.5 4.5 0 0 0 12 6.47V7a10.66 10.66 0 0 1-7.72-3.9s-4 8 5 11.5c-2.5.69-5 0-6.5-1.73 0 0 5.2 3.5 10.5 3.5A11 11 0 0 0 23 3z" stroke="currentColor" stroke-width="0.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                        <a href="https://linkedin.com/company/dira-digital-era/" aria-label="LinkedIn" class="social-icon" title="LinkedIn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4V6h4v2" stroke="currentColor" stroke-width="0.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                                <rect x="2" y="6" width="4" height="12" rx="1" stroke="currentColor" stroke-width="0.8" fill="none"/>
                                <circle cx="4" cy="4" r="1.6" stroke="currentColor" stroke-width="0.8" fill="none"/>
                            </svg>
                        </a>
                        <a href="https://instagram.com/@digital_era_dira" aria-label="Instagram" class="social-icon" title="Instagram">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="0.8" fill="none"/>
                                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="0.8" fill="none"/>
                                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2026 DIRA- Birth of the Digital Era- All rights reserved.</p>
            </div>
        </div>
    `
}

injectHeader();
injectFooter();
// Toggle hamburger menu
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    if (navMenu) navMenu.classList.toggle('active');
    if (hamburger) hamburger.classList.toggle('active');
    header.style.height = "fit-content";
}

// Toggle dropdown menu
function toggleDropdown(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropdown = e.currentTarget.closest('.dropdown');
    if (dropdown) {
        const content = dropdown.querySelector('.dropdown-content');
        if (content) {
            content.classList.toggle('active');
        }
    }
}

// Close menus when clicking outside header
document.addEventListener('click', function(event) {
    const header = document.querySelector('header');
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.hamburger');
    
    if (header && !header.contains(event.target)) {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
        // Close dropdown content
        document.querySelectorAll('.dropdown-content').forEach(content => {
            content.classList.remove('active');
        });
    }
});

// Set active nav link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Wire up hamburger button
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
    
    // Hamburger button click
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    // Use a delegated click handler for dropdown toggles so we can
    // enable onclick behavior only for mobile view while keeping
    // hover behavior for desktop.
    function delegatedDropdownHandler(e) {
        const toggle = e.target.closest('.dropdown-toggle');
        if (!toggle) return;
        // Only handle clicks on mobile/tablet widths
        if (window.matchMedia('(max-width: 768px)').matches) {
            e.preventDefault();
            e.stopPropagation();
            const dropdown = toggle.closest('.dropdown');
            if (dropdown) {
                const content = dropdown.querySelector('.dropdown-content');
                if (content) content.classList.toggle('active');
                // mark dropdown for styling (arrow rotation)
                dropdown.classList.toggle('open');
            }
        }
    }

    // Attach delegated handler once
    document.removeEventListener('click', delegatedDropdownHandler);
    document.addEventListener('click', delegatedDropdownHandler);
});

// Re-check active link on every navigation
window.addEventListener('hashchange', setActiveNavLink);
 