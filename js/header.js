function injectHeader(){
    const header = document.querySelector('header');
    header.innerHTML = `
        <div class="logo-section">
            <img src="./images/logo.jpg" alt="DIRA logo">
            <span class="logo-text">DIRA</span>
        </div>
        <button class="hamburger" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <nav id="navMenu">
            <div class="nav-wrapper">
                <a href="index.html">HOME</a>
                <a href="services.html">SERVICES</a>
                <a href="portfolio.html">PORTFOLIO</a>
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
                        <div class="dropdown-section">Production</div>
                        <li><a href="content-studio.html">DIRA Content Studio</a></li>
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
                    <p style="margin-top:0.75rem; font-size:0.8rem; color:#aaa;">
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
                        <li><a href="training.html">Training</a></li>
                        <li><a href="group.html">DIRA Group</a></li>
                        <li><a href="content-studio.html">Content Studio</a></li>
                        <li><a href="contact.html">Contact</a></li>
                        <li><a href="terms of service.html">Terms of Service</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Contact</h3>
                    <p><a href="mailto:diradigitalera@gmail.com" style="color:#ccc;">diradigitalera@gmail.com</a></p>
                    <p><a href="tel:+237682366472" style="color:#ccc;">+237 682 366 472</a></p>
                    <div class="social-links" style="margin-top:1rem;">
                        <a href="https://www.facebook.com/profile.php?id=61583966202064" aria-label="Facebook" target="_blank" class="social-icon" title="Facebook">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.3v-2.9h2.3V9.4c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .08 2 .08v2.2h-1.1c-1.1 0-1.4.66-1.4 1.3v1.6h2.4l-.4 2.9h-2v7A10 10 0 0 0 22 12z" stroke="currentColor" stroke-width="0.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                        <a href="https://x.com/diradigitalera" aria-label="X / Twitter" class="social-icon" target="_blank" title="X / Twitter">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1s-1.82.99-2.83 1.28A4.5 4.5 0 0 0 12 6.47V7a10.66 10.66 0 0 1-7.72-3.9s-4 8 5 11.5c-2.5.69-5 0-6.5-1.73 0 0 5.2 3.5 10.5 3.5A11 11 0 0 0 23 3z" stroke="currentColor" stroke-width="0.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/company/dira-digital-era/" aria-label="LinkedIn" class="social-icon" target="_blank" title="LinkedIn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4V6h4v2" stroke="currentColor" stroke-width="0.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                                <rect x="2" y="6" width="4" height="12" rx="1" stroke="currentColor" stroke-width="0.8" fill="none"/>
                                <circle cx="4" cy="4" r="1.6" stroke="currentColor" stroke-width="0.8" fill="none"/>
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/digital_era_dira/" aria-label="Instagram" class="social-icon" target="_blank" title="Instagram">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="0.8" fill="none"/>
                                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="0.8" fill="none"/>
                                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                            </svg>
                        </a>
                        <a href="https://www.tiktok.com/@digital.era.dira" aria-label="TikTok" class="social-icon" target="_blank" title="TikTok">
                            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="stroke: none;">
                                <path d="M8.45095 19.7926C8.60723 18.4987 9.1379 17.7743 10.1379 17.0317C11.5688 16.0259 13.3561 16.5948 13.3561 16.5948V13.2197C13.7907 13.2085 14.2254 13.2343 14.6551 13.2966V17.6401C14.6551 17.6401 12.8683 17.0712 11.4375 18.0775C10.438 18.8196 9.90623 19.5446 9.7505 20.8385C9.74562 21.5411 9.87747 22.4595 10.4847 23.2536C10.3345 23.1766 10.1815 23.0889 10.0256 22.9905C8.68807 22.0923 8.44444 20.7449 8.45095 19.7926ZM22.0352 6.97898C21.0509 5.90039 20.6786 4.81139 20.5441 4.04639H21.7823C21.7823 4.04639 21.5354 6.05224 23.3347 8.02482L23.3597 8.05134C22.8747 7.7463 22.43 7.38624 22.0352 6.97898ZM28 10.0369V14.293C28 14.293 26.42 14.2312 25.2507 13.9337C23.6179 13.5176 22.5685 12.8795 22.5685 12.8795C21.8436 12.4245 21.785 12.3928V21.1817C21.785 21.6711 21.651 22.8932 21.2424 23.9125C20.709 25.246 19.8859 26.1212 19.7345 26.3001C19.7345 26.3001 18.7334 27.4832 16.9672 28.28C15.3752 28.9987 13.9774 28.9805 13.5596 28.9987C13.5596 28.9987 11.1434 29.0944 8.96915 27.6814C8.49898 27.3699 8.06011 27.0172 7.6582 26.6277L7.66906 26.6355C9.84383 28.0485 12.2595 27.9528 12.2595 27.9528C12.6779 27.9346 14.0756 27.9528 15.6671 27.2341C17.4317 26.4374 18.4344 25.2543 18.4344 25.2543C18.5842 25.0754 19.4111 24.2001 19.9423 22.8662C20.3498 21.8474 20.4849 20.6247 20.4849 20.1354V11.3475C20.5435 11.3797 21.2679 11.8347 21.2679 11.8347C22.3179 12.4734 23.9506 12.8889 25.1204 13.1864C26.7 13.2483 26.7 13.2483V9.91314C27.2404 10.0343 27.7011 10.0671 28 10.0369Z" fill="currentColor"/>
                                <path d="M26.7009 9.91314V13.2472C26.7009 13.2472 25.1213 13.1853 23.9515 12.8879C22.3188 12.4718 21.2688 11.8337 21.2688 11.8337C21.2688 11.8337 20.5444 11.3787 20.4858 11.3464V20.1364C20.4858 20.6258 20.3518 21.8484 19.9432 22.8672C19.4098 24.2012 18.5867 25.0764 18.4353 25.2553C18.4353 25.2553 17.4337 26.4384 15.668 27.2352C14.0765 27.9539 12.6788 27.9357 12.2604 27.9539C12.2604 27.9539 9.84473 28.0496 7.66995 26.6366L7.6591 26.6288C7.42949 26.4064 7.21336 26.1717 7.01177 25.9257C6.31777 25.0795 5.89237 24.0789 5.78547 23.7934C5.61347 23.2937 5.25209 22.1022 5.30147 20.9482C5.38883 18.9122 6.10507 17.6625 6.29444 17.3494C6.79597 16.4957 7.44828 15.7318 8.22233 15.0919C8.90538 14.5396 9.6796 14.1002 10.5132 13.7917C11.4144 13.4295 12.3794 13.2353 13.3565 13.2197V16.5948C13.3565 16.5948 11.5691 16.028 10.1388 17.0317C9.13879 17.7743 8.60812 18.4987 8.45185 19.7926C8.44534 20.7449 8.68897 22.0923 10.0254 22.991C10.1813 23.0898 10.3343 23.1775 10.4845 23.2541C10.7179 23.5576 11.0021 23.8221 11.3255 24.0368C12.631 24.8632 13.7249 24.9209 15.1238 24.3842C16.0565 24.0254 16.7586 23.2167 17.0842 22.3206C17.2888 21.7611 17.2861 21.1978 17.2861 20.6154V4.04639H20.5417C20.6763 4.81139 21.0485 5.90039 22.0328 6.97898C22.4276 7.38624 22.8724 7.7463 23.3573 8.05134C23.5006 8.19955 24.2331 8.93231 25.1734 9.38216C25.6596 9.61469 26.1722 9.79285 26.7009 9.91314Z" fill="currentColor"/>
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/@DIRA_DIGITAL_ERA" aria-label="YouTube" class="social-icon" target="_blank" title="YouTube">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2026 DIRA. All rights reserved. DIRA SAS, AWICUL Building, Commercial Avenue, Bamenda, Northwest Region, Cameroon RC.Bda.2026.B.000339 | <a href="mailto:diradigitalera@gmail.com" style="color:inherit;">diradigitalera@gmail.com</a> | <a href="tel:+237682366472" style="color:inherit;">+237 682 366 472</a></p>
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
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="12" cy="9" r="2.2" fill="currentColor" />
                    </svg>
                    <div>
                        <h4>Address</h4>
                        <p>AWICUL Building, Commercial Avenue<br>Bamenda, Northwest Region, Cameroon</p>
                    </div>
                </div>

                <div class="contact-detail">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.97.37 1.91.73 2.79a2 2 0 0 1-.45 2.11L9.91 12.09a16 16 0 0 0 6 6l1.47-1.47a2 2 0 0 1 2.11-.45c.88.36 1.82.61 2.79.73A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div>
                        <h4>Phone</h4>
                        <p><a href="tel:+237682366472" style="color:inherit;">+237 682 366 472</a></p>
                    </div>
                </div>

                <div class="contact-detail">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.2" fill="none"/>
                        <path d="M3 7l9 6 9-6" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div>
                        <h4>Email</h4>
                        <p><a href="mailto:diradigitalera@gmail.com" style="color:inherit;">diradigitalera@gmail.com</a></p>
                    </div>
                </div>

                <div class="contact-detail">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.2" fill="none"/>
                        <path d="M12 7v6l4 2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    </svg>
                    <div>
                        <h4>Business Hours</h4>
                        <p>Monday to Friday: 8am - 8pm</p>
                        <p>Saturday and Sunday: 12pm - 7pm</p>
                    </div>
                </div>
            </div>

            <div class="social-links" style="display:flex;gap:12px;margin-top:1.5rem;">
                <a href="https://www.facebook.com/profile.php?id=61583966202064" aria-label="Facebook" target="_blank">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.3v-2.9h2.3V9.4c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .08 2 .08v2.2h-1.1c-1.1 0-1.4.66-1.4 1.3v1.6h2.4l-.4 2.9h-2v7A10 10 0 0 0 22 12z" stroke="currentColor" stroke-width="0.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
                <a href="https://www.instagram.com/digital_era_dira/" aria-label="Instagram" target="_blank">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="0.8" fill="none"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="0.8" fill="none"/>
                        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                </a>
                <a href="https://www.tiktok.com/@digital.era.dira" aria-label="TikTok" target="_blank">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 8.5a4 4 0 0 0 4 4h1v-3a6 6 0 0 1-6-6v5.5z" stroke="currentColor" stroke-width="0.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7 8v8a4 4 0 0 0 4 4h1" stroke="currentColor" stroke-width="0.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
                <a href="https://www.youtube.com/@DIRA_DIGITAL_ERA" aria-label="YouTube" target="_blank">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
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
    if (hamburger) hamburger.classList.toggle('active');
    header.style.height = "fit-content";
}

// Close menus when clicking outside header
document.addEventListener('click', function(event) {
    const header = document.querySelector('header');
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.hamburger');

    if (header && !header.contains(event.target)) {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
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

    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    function delegatedDropdownHandler(e) {
        const toggle = e.target.closest('.dropdown-toggle');
        if (!toggle) return;
        if (window.matchMedia('(max-width: 768px)').matches) {
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