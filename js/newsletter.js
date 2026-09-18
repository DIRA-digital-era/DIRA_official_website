/**
 * DIRA Website Newsletter Popup Integration
 * Powered by Resend through the site backend
 *
 * Behavior:
 * - Checks localStorage for 'dira_newsletter_subscribed'. If true, never displays again.
 * - On first page visit, displays after 3 seconds.
 * - If dismissed without subscribing, reappears every 2 minutes (120,000ms).
 * - Sends subscribers to the backend Resend integration.
 */

(function () {
    const STORAGE_KEY = 'dira_newsletter_subscribed';
    const REAPPEAR_INTERVAL_MS = 2 * 60 * 1000; // 2 minutes
    const API_BASE = window.DIRA_API_BASE || (window.location.protocol === 'file:' ? 'http://localhost:3000/api' : '/api');
    let popupTimer = null;

    function isSubscribed() {
        return localStorage.getItem(STORAGE_KEY) === 'true';
    }

    function markAsSubscribed() {
        localStorage.setItem(STORAGE_KEY, 'true');
        if (popupTimer) clearInterval(popupTimer);
    }

    function injectNewsletterModal() {
        if (document.getElementById('dira-newsletter-modal')) return;

        const modalHTML = `
        <div id="dira-newsletter-modal" class="dira-newsletter-backdrop" aria-hidden="true" role="dialog" aria-labelledby="newsletter-title">
            <div class="dira-newsletter-card">
                <button type="button" class="dira-newsletter-close" id="diraNewsletterClose" aria-label="Close newsletter popup">&times;</button>
                <div class="dira-newsletter-header">
                    <div class="dira-newsletter-badge">DIRA INSIGHTS</div>
                    <h2 id="newsletter-title">Stay Ahead in Tech &amp; Digital Innovation</h2>
                    <p>Get exclusive monthly insights on custom software, systems architecture, digital transformation, and tech events across Central Africa.</p>
                </div>

                <div id="newsletter-form-container">
                    <!-- Resend subscription form -->
                    <form id="diraNewsletterForm" class="dira-newsletter-form">
                        <div class="dira-input-group">
                            <input type="email" id="diraNewsletterEmail" name="email" placeholder="Enter your business email" required autocomplete="email">
                            <button type="submit" class="dira-newsletter-submit">
                                <span>Subscribe</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <p class="dira-newsletter-disclaimer">Zero spam. Actionable engineering &amp; enterprise strategy only. Unsubscribe anytime.</p>
                    </form>
                </div>

                <div id="diraNewsletterSuccess" class="dira-newsletter-success" style="display: none;">
                    <div class="dira-success-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="#00E6D6" stroke-width="2"/>
                            <path d="M8 12l3 3 6-6" stroke="#00E6D6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h3>Welcome to the Community!</h3>
                    <p>You have successfully subscribed to DIRA Insights.</p>
                </div>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Inject Styles
        const style = document.createElement('style');
        style.id = 'dira-newsletter-styles';
        style.textContent = `
            .dira-newsletter-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(15, 29, 54, 0.75);
                backdrop-filter: blur(6px);
                -webkit-backdrop-filter: blur(6px);
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.35s ease, visibility 0.35s ease;
            }
            .dira-newsletter-backdrop.is-active {
                opacity: 1;
                visibility: visible;
            }
            .dira-newsletter-card {
                background: #191d36;
                color: #ffffff;
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 16px;
                max-width: 520px;
                width: 100%;
                padding: 40px 35px;
                position: relative;
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
                transform: scale(0.92) translateY(20px);
                transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .dira-newsletter-backdrop.is-active .dira-newsletter-card {
                transform: scale(1) translateY(0);
            }
            .dira-newsletter-close {
                position: absolute;
                top: 16px;
                right: 20px;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: #ffffff;
                font-size: 26px;
                line-height: 1;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s ease, transform 0.2s ease;
            }
            .dira-newsletter-close:hover {
                background: rgba(255, 255, 255, 0.25);
                transform: rotate(90deg);
            }
            .dira-newsletter-badge {
                display: inline-block;
                background: rgba(0, 230, 214, 0.15);
                color: #00E6D6;
                font-size: 0.75rem;
                font-weight: 700;
                letter-spacing: 2px;
                text-transform: uppercase;
                padding: 4px 12px;
                border-radius: 20px;
                margin-bottom: 15px;
                border: 1px solid rgba(0, 230, 214, 0.3);
            }
            .dira-newsletter-header h2 {
                font-size: 1.6rem;
                font-weight: 700;
                color: #ffffff;
                line-height: 1.3;
                margin-bottom: 12px;
            }
            .dira-newsletter-header p {
                color: #b0c2de;
                font-size: 0.95rem;
                line-height: 1.6;
                margin-bottom: 25px;
            }
            .dira-input-group {
                display: flex;
                gap: 10px;
                margin-bottom: 12px;
            }
            .dira-input-group input {
                flex: 1;
                padding: 14px 16px;
                border-radius: 8px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                background: rgba(255, 255, 255, 0.07);
                color: #ffffff;
                font-size: 0.95rem;
                outline: none;
                transition: border-color 0.2s, background 0.2s;
            }
            .dira-input-group input:focus {
                border-color: #00E6D6;
                background: rgba(255, 255, 255, 0.12);
            }
            .dira-newsletter-submit {
                background: #00E6D6;
                color: #191d36;
                border: none;
                padding: 14px 22px;
                border-radius: 8px;
                font-weight: 700;
                font-size: 0.95rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: background 0.2s ease, transform 0.15s ease;
                white-space: nowrap;
            }
            .dira-newsletter-submit:hover {
                background: #4ef2e7;
                transform: translateY(-1px);
            }
            .dira-newsletter-disclaimer {
                font-size: 0.78rem;
                color: #889bb8;
                line-height: 1.4;
            }
            .dira-newsletter-error {
                margin-top: 10px;
                color: #ffb4ab;
                font-size: 0.82rem;
                line-height: 1.4;
            }
            .dira-newsletter-success {
                text-align: center;
                padding: 20px 0;
            }
            .dira-success-icon {
                margin-bottom: 15px;
            }
            .dira-newsletter-success h3 {
                color: #ffffff;
                font-size: 1.4rem;
                margin-bottom: 8px;
            }
            .dira-newsletter-success p {
                color: #a8c7e0;
                font-size: 0.95rem;
            }
            @media (max-width: 580px) {
                .dira-newsletter-card {
                    padding: 30px 20px;
                }
                .dira-input-group {
                    flex-direction: column;
                }
                .dira-newsletter-submit {
                    justify-content: center;
                }
            }
        `;
        document.head.appendChild(style);

        // Attach event listeners
        const modal = document.getElementById('dira-newsletter-modal');
        const closeBtn = document.getElementById('diraNewsletterClose');
        const form = document.getElementById('diraNewsletterForm');

        closeBtn.addEventListener('click', hideModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideModal();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('is-active')) {
                hideModal();
            }
        });

        if (form) {
            form.addEventListener('submit', async function (e) {
                e.preventDefault();
                const emailInput = document.getElementById('diraNewsletterEmail');
                const email = emailInput ? emailInput.value.trim() : '';

                if (email && email.includes('@')) {
                    const submitButton = form.querySelector('.dira-newsletter-submit');
                    submitButton.disabled = true;
                    submitButton.querySelector('span').textContent = 'Subscribing...';
                    try {
                        const response = await fetch(`${API_BASE}/newsletter/subscribe`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email })
                        });
                        const result = await response.json();
                        if (!response.ok) throw new Error(result.error || 'Subscription failed.');

                        markAsSubscribed();
                        const formContainer = document.getElementById('newsletter-form-container');
                        const successView = document.getElementById('diraNewsletterSuccess');
                        if (formContainer) formContainer.style.display = 'none';
                        if (successView) successView.style.display = 'block';
                        setTimeout(hideModal, 2500);
                    } catch (error) {
                        let message = form.querySelector('.dira-newsletter-error');
                        if (!message) {
                            message = document.createElement('p');
                            message.className = 'dira-newsletter-error';
                            form.appendChild(message);
                        }
                        message.textContent = error.message;
                        submitButton.disabled = false;
                        submitButton.querySelector('span').textContent = 'Subscribe';
                    }
                }
            });
        }
    }

    function showModal() {
        if (isSubscribed()) return;
        injectNewsletterModal();
        const modal = document.getElementById('dira-newsletter-modal');
        if (modal) {
            modal.classList.add('is-active');
            modal.setAttribute('aria-hidden', 'false');
        }
    }

    function hideModal() {
        const modal = document.getElementById('dira-newsletter-modal');
        if (modal) {
            modal.classList.remove('is-active');
            modal.setAttribute('aria-hidden', 'true');
        }

        // If not yet subscribed, schedule re-trigger every 2 minutes
        if (!isSubscribed() && !popupTimer) {
            popupTimer = setInterval(() => {
                if (!isSubscribed()) {
                    showModal();
                } else if (popupTimer) {
                    clearInterval(popupTimer);
                }
            }, REAPPEAR_INTERVAL_MS);
        }
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
        if (!isSubscribed()) {
            // First display after 3 seconds
            setTimeout(showModal, 3000);
        }
    });

    // Expose utility globally if needed
    window.DiraNewsletter = {
        show: showModal,
        hide: hideModal,
        markSubscribed: markAsSubscribed,
    };
})();
