// Must match the mobile menu breakpoint in style/header.css (max-width: 1100px)
const NAV_COLLAPSE_QUERY = '(max-width: 1100px)';

function injectHeader(){
    const header = document.querySelector('header');
    header.innerHTML = `
        <div class="logo-section">
            <img src="./images/logo.jpg" alt="DIRA logo">
            <span class="logo-text">DIRA</span>
        </div>
        <button class="hamburger" aria-label="Toggle navigation" aria-controls="navMenu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <nav id="navMenu">
            <div class="nav-wrapper">
                <a href="index.html">HOME</a>
                <a href="services.html">SERVICES</a>
                <a href="portfolio.html">PORTFOLIO</a>
                <a href="gallery.html">GALLERY</a>
                <a href="articles.html">ARTICLES</a>
                <a href="training.html">TRAINING</a>
                <a href="about.html">ABOUT</a>
                <a href="contact.html">CONTACT</a>
                <div class="dropdown">
                    <button class="dropdown-toggle">
                        DIRA GROUP <span class="dropdown-arrow">&#9660;</span>
                    </button>
                    <ul class="dropdown-content">
                        <div class="dropdown-section">Our Ventures</div>
                        <li><a href="group.html">DIRA Group Overview</a></li>
                        <li><a href="https://dhubcmr.netlify.app/" target="_blank">DHUB</a></li>
                        <li><a href="https://dirafoundation.netlify.app" target="_blank">DIRA Foundation</a></li>
                        <li><a href="https://diratechfest.netlify.app/" target="_blank">DIRA Tech Fest</a></li>
                        <div class="dropdown-section">Production &amp; Disclosures</div>
                        <li><a href="content-studio.html">DIRA Content Studio</a></li>
                        <li><a href="reports.html">Reports &amp; Publications</a></li>
                    </ul>
                </div>
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
                    <h3>DIRA</h3>
                    <p>Building Africa's digital infrastructure, from Cameroon.</p>
                    <p class="footer-legal">
                        DIRA SAS<br>
                        AWICUL Building, Commercial Avenue<br>
                        Bamenda, Northwest Region, Cameroon<br>
                        RC.Bda.2026.B.000339
                    </p>
                </div>

                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="portfolio.html">Portfolio</a></li>
                        <li><a href="gallery.html">Gallery</a></li>
                        <li><a href="articles.html">Articles &amp; Insights</a></li>
                        <li><a href="reports.html">Reports &amp; Publications</a></li>
                        <li><a href="training.html">Training</a></li>
                        <li><a href="group.html">DIRA Group</a></li>
                        <li><a href="content-studio.html">Content Studio</a></li>
                        <li><a href="contact.html">Contact</a></li>
                        <li><a href="terms of service.html">Terms of Service</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Contact</h3>
                    <p><a href="mailto:info@diracmr.com" class="footer-contact-link">info@diracmr.com</a></p>
                    <p><a href="tel:+237682366472" class="footer-contact-link">+237 682 366 472</a></p>
                    <div class="social-links" style="margin-top:1rem;">
                        <a href="https://www.facebook.com/profile.php?id=61583966202064" aria-label="Facebook" target="_blank" class="social-icon" title="Facebook">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/digital_era_dira/" aria-label="Instagram" class="social-icon" target="_blank" title="Instagram">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </a>
                        <a href="https://www.tiktok.com/@digital.era.dira" aria-label="TikTok" class="social-icon" target="_blank" title="TikTok">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.28 6.28 0 0 0 3.1 15.6a6.28 6.28 0 0 0 6.28 6.28 6.28 6.28 0 0 0 6.28-6.28V8.85a8.23 8.23 0 0 0 3.93 1.34V6.69z"/>
                            </svg>
                        </a>
                        <a href="https://whatsapp.com/channel/0029VaDIRAOfficial" aria-label="WhatsApp Channel" class="social-icon" target="_blank" title="WhatsApp Channel">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.3-.776.979-.951 1.18-.175.2-.35.226-.651.075-.3-.15-1.267-.467-2.414-1.49-1.2-1.07-2.01-2.39-2.247-2.793-.238-.403-.025-.62.126-.77.135-.135.3-.35.45-.526.15-.175.2-.3.3-.5.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-1.026-2.232-.341-.586-.688-.507-.946-.52-.244-.012-.524-.015-.805-.015-.28 0-.734.105-1.118.526-.384.42-1.468 1.435-1.468 3.5 0 2.065 1.503 4.06 1.713 4.34.21.28 2.96 4.52 7.17 6.34 1 .43 1.78.69 2.39.88.99.31 1.89.27 2.6.16.79-.12 2.42-.99 2.76-1.95.34-.95.34-1.77.24-1.95-.1-.17-.3-.27-.6-.42zM12.04 21.94h-.01c-1.8 0-3.56-.48-5.11-1.39l-.37-.22-3.8 1 1.02-3.7-.24-.38a9.88 9.88 0 0 1-1.52-5.26c0-5.46 4.45-9.91 9.92-9.91 2.65 0 5.14 1.03 7.01 2.9 1.87 1.87 2.9 4.36 2.9 7.01 0 5.46-4.44 9.95-9.8 9.95zM12.04 0C5.46 0 .1 5.36.1 11.95c0 2.11.55 4.17 1.6 5.99L0 24l6.23-1.63a11.9 11.9 0 0 0 5.81 1.51h.01c6.58 0 11.94-5.36 11.94-11.95 0-3.19-1.24-6.19-3.5-8.45C18.23 1.23 15.23 0 12.04 0z"/>
                            </svg>
                        </a>
                        <a href="https://x.com/diradigitalera" aria-label="X" class="social-icon" target="_blank" title="X">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/company/dira-digital-era/" aria-label="LinkedIn" class="social-icon" target="_blank" title="LinkedIn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.86 0 1.56-.7 1.56-1.56s-.7-1.56-1.56-1.56a1.56 1.56 0 0 0-1.56 1.56c0 .86.7 1.56 1.56 1.56m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/@DIRA_DIGITAL_ERA" aria-label="YouTube" class="social-icon" target="_blank" title="YouTube">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2026 DIRA. All rights reserved. DIRA SAS, AWICUL Building, Commercial Avenue, Bamenda, Northwest Region, Cameroon RC.Bda.2026.B.000339 | <a href="mailto:info@diracmr.com" style="color:inherit;">info@diracmr.com</a> | <a href="tel:+237682366472" style="color:inherit;">+237 682 366 472</a></p>
            </div>
        </div>
    `
}

function injectContact(){
    const contactSection = document.getElementById('contactSection');
    if(!contactSection) return 0;
    contactSection.innerHTML = `
        <div class="contact-info reveal">
            <h2>Get In Touch</h2>
            <p>Have questions or want to discuss a project? Our team is ready to help.</p>

            <div class="contact-details">
                <div class="contact-detail">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="12" cy="9" r="2.5" fill="currentColor"/>
                    </svg>
                    <div>
                        <h4>Address</h4>
                        <p>AWICUL Building, Commercial Avenue<br>Bamenda, Northwest Region, Cameroon</p>
                    </div>
                </div>

                <div class="contact-detail">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div>
                        <h4>Phone</h4>
                        <p><a href="tel:+237682366472" style="color:inherit;">+237 682 366 472</a></p>
                    </div>
                </div>

                <div class="contact-detail">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" stroke-width="1.8"/>
                        <path d="M2 7l10 7 10-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div>
                        <h4>Email</h4>
                        <p><a href="mailto:info@diracmr.com" style="color:inherit;">info@diracmr.com</a></p>
                    </div>
                </div>

                <div class="contact-detail">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
                        <path d="M12 7v5l3.5 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div>
                        <h4>Business Hours</h4>
                        <p>Monday to Friday: 8am - 8pm</p>
                        <p>Saturday and Sunday: 12pm - 7pm</p>
                    </div>
                </div>
            </div>

            <div class="social-links" style="display:flex; gap:12px; margin-top:1.5rem; flex-wrap:wrap;">
                <a href="https://www.facebook.com/profile.php?id=61583966202064" aria-label="Facebook" target="_blank" title="Facebook">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                </a>
                <a href="https://www.instagram.com/digital_era_dira/" aria-label="Instagram" target="_blank" title="Instagram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                </a>
                <a href="https://www.tiktok.com/@digital.era.dira" aria-label="TikTok" target="_blank" title="TikTok">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.28 6.28 0 0 0 3.1 15.6a6.28 6.28 0 0 0 6.28 6.28 6.28 6.28 0 0 0 6.28-6.28V8.85a8.23 8.23 0 0 0 3.93 1.34V6.69z"/>
                    </svg>
                </a>
                <a href="https://whatsapp.com/channel/0029VaDIRAOfficial" aria-label="WhatsApp Channel" target="_blank" title="WhatsApp Channel">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.3-.776.979-.951 1.18-.175.2-.35.226-.651.075-.3-.15-1.267-.467-2.414-1.49-1.2-1.07-2.01-2.39-2.247-2.793-.238-.403-.025-.62.126-.77.135-.135.3-.35.45-.526.15-.175.2-.3.3-.5.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-1.026-2.232-.341-.586-.688-.507-.946-.52-.244-.012-.524-.015-.805-.015-.28 0-.734.105-1.118.526-.384.42-1.468 1.435-1.468 3.5 0 2.065 1.503 4.06 1.713 4.34.21.28 2.96 4.52 7.17 6.34 1 .43 1.78.69 2.39.88.99.31 1.89.27 2.6.16.79-.12 2.42-.99 2.76-1.95.34-.95.34-1.77.24-1.95-.1-.17-.3-.27-.6-.42zM12.04 21.94h-.01c-1.8 0-3.56-.48-5.11-1.39l-.37-.22-3.8 1 1.02-3.7-.24-.38a9.88 9.88 0 0 1-1.52-5.26c0-5.46 4.45-9.91 9.92-9.91 2.65 0 5.14 1.03 7.01 2.9 1.87 1.87 2.9 4.36 2.9 7.01 0 5.46-4.44 9.95-9.8 9.95zM12.04 0C5.46 0 .1 5.36.1 11.95c0 2.11.55 4.17 1.6 5.99L0 24l6.23-1.63a11.9 11.9 0 0 0 5.81 1.51h.01c6.58 0 11.94-5.36 11.94-11.95 0-3.19-1.24-6.19-3.5-8.45C18.23 1.23 15.23 0 12.04 0z"/>
                    </svg>
                </a>
                <a href="https://x.com/diradigitalera" aria-label="X" target="_blank" title="X">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                </a>
                <a href="https://www.linkedin.com/company/dira-digital-era/" aria-label="LinkedIn" target="_blank" title="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.86 0 1.56-.7 1.56-1.56s-.7-1.56-1.56-1.56a1.56 1.56 0 0 0-1.56 1.56c0 .86.7 1.56 1.56 1.56m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
                    </svg>
                </a>
                <a href="https://www.youtube.com/@DIRA_DIGITAL_ERA" aria-label="YouTube" target="_blank" title="YouTube">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                </a>
            </div>

            <div class="map-container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d992.0657652633015!2d10.15028151037128!3d5.958451589604248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sAWICUL%20Building%2C%20Commercial%20Avenue%20Bamenda!5e0!3m2!1sen!2scm!4v1771256041620!5m2!1sen!2scm"
                    width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade" title="DIRA office location map"></iframe>
                <a target="_blank"
                    href="https://maps.google.com/?q=AWICUL+Building,+Commercial+Avenue,+Bamenda,+Cameroon">View
                    on Google Maps
                </a>
            </div>
        </div>

        <div class="contact-form">
            <h3>Send Us a Message</h3>
            <form id="contactForm">
                <div class="form-group">
                    <label for="name">Full Name *</label>
                    <input type="text" id="name" name="name" placeholder="Your Name" required>
                </div>

                <div class="form-group">
                    <label for="email">Email Address *</label>
                    <input type="email" id="email" name="email" placeholder="Your Email" required>
                </div>

                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" placeholder="Your Phone">
                </div>

                <div class="form-group">
                    <label for="subject">Subject *</label>
                    <select id="subject" name="subject" required>
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Services">Services</option>
                        <option value="Training Programs">Training Programs</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="message">Message *</label>
                    <textarea id="message" name="message" placeholder="Your Message" required></textarea>
                </div>

                <button type="submit" class="submit-btn" id="submitBtn">
                    <span class="spinner" id="spinner"></span>
                    <span>Send Message</span>
                </button>
            </form>
        </div>
    </div>

    <div class="notification success" id="successNotification">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:8px;">
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.2" fill="none"/>
            <path d="M7 12l3 3 7-7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Your message has been sent successfully!</span>
    </div>

    <div class="notification error" id="errorNotification">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:8px;">
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.2" fill="none"/>
            <path d="M12 8v5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="16.2" r="0.6" fill="currentColor" />
        </svg>
        <span>There was an error sending your message. Please try again.</span>
    </div>
    `
}

// Toggle hamburger menu
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    if (navMenu) navMenu.classList.toggle('active');
    if (hamburger) {
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active') ? 'true' : 'false');
    }
    header.style.height = "fit-content";
}

// Close menus when clicking outside header
document.addEventListener('click', function(event) {
    const header = document.querySelector('header');
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.hamburger');

    if (header && !header.contains(event.target)) {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
        document.querySelectorAll('.dropdown-content').forEach(content => {
            content.classList.remove('active');
        });
    }
});

// Set active nav link based on current page
function setActiveNavLink() {
    let currentPage = decodeURIComponent(window.location.pathname.split('/').pop() || 'index.html');
    // Detail pages highlight the section they belong to
    if (currentPage.indexOf('project-') === 0) currentPage = 'portfolio.html';
    if (currentPage === 'article.html') currentPage = 'articles.html';
    const navLinks = document.querySelectorAll('header nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Highlight the dropdown toggle when one of its pages is open
    document.querySelectorAll('header nav .dropdown').forEach(dd => {
        const toggle = dd.querySelector('.dropdown-toggle');
        if (toggle) toggle.classList.toggle('active', !!dd.querySelector('a.active'));
    });
}

// Wire up hamburger button
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();

    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    function delegatedDropdownHandler(e) {
        const toggle = e.target.closest('.dropdown-toggle');
        if (!toggle) return;
        if (window.matchMedia(NAV_COLLAPSE_QUERY).matches) {
            e.preventDefault();
            e.stopPropagation();
            const dropdown = toggle.closest('.dropdown');
            if (dropdown) {
                const content = dropdown.querySelector('.dropdown-content');
                if (content) content.classList.toggle('active');
                dropdown.classList.toggle('open');
            }
        }
    }

    document.removeEventListener('click', delegatedDropdownHandler);
    document.addEventListener('click', delegatedDropdownHandler);
});

window.addEventListener('hashchange', setActiveNavLink);

injectHeader();
injectFooter();
injectContact();