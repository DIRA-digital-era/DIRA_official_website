/**
 * DIRA Website Newsletter Popup Integration
 * Powered by Resend and MongoDB Subscriber Intelligence
 *
 * Features:
 * - Checks localStorage for 'dira_newsletter_resend_subscribed'.
 * - Checks backend MongoDB for IP and Client ID to prevent popup for existing subscribers.
 * - Exponential backoff on dismissal: each exit progressively increases cooldown before next show.
 * - Captures IP address and client token on subscription.
 */

(function () {
    const STORAGE_KEY = 'dira_newsletter_resend_subscribed';
    const CLIENT_ID_KEY = 'dira_newsletter_client_id';
    const DISMISS_COUNT_KEY = 'dira_newsletter_dismiss_count';
    const NEXT_SHOW_KEY = 'dira_newsletter_next_show';
    
    const BASE_INTERVAL_MS = 2 * 60 * 1000; // 2 minutes initial cooldown
    const EXP_FACTOR = 2.5; // Exponential multiplier
    const MAX_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000; // Max 7 days
    
    const API_BASE = window.DIRA_API_BASE || (window.location.protocol === 'file:' ? 'http://localhost:3000/api' : '/api');
    let popupTimer = null;

    function getOrCreateClientId() {
        try {
            let id = localStorage.getItem(CLIENT_ID_KEY);
            if (!id) {
                id = 'dira_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
                localStorage.setItem(CLIENT_ID_KEY, id);
            }
            return id;
        } catch (e) {
            return 'dira_anonymous_' + Date.now();
        }
    }

    function isSubscribedLocal() {
        try {
            return localStorage.getItem(STORAGE_KEY) === 'true';
        } catch (error) {
            return false;
        }
    }

    function markAsSubscribed() {
        try {
            localStorage.setItem(STORAGE_KEY, 'true');
            localStorage.removeItem(DISMISS_COUNT_KEY);
            localStorage.removeItem(NEXT_SHOW_KEY);
        } catch (error) {}
        if (popupTimer) {
            clearTimeout(popupTimer);
            popupTimer = null;
        }
    }

    async function checkSubscriptionStatus() {
        if (isSubscribedLocal()) return true;

        const clientId = getOrCreateClientId();
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000);
            
            const res = await fetch(`${API_BASE}/newsletter/check?clientId=${encodeURIComponent(clientId)}`, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (res.ok) {
                const data = await res.json();
                if (data.subscribed) {
                    markAsSubscribed();
                    return true;
                }
            }
        } catch (err) {
            // Offline or server not reachable; continue with local storage check
        }
        return false;
    }

    function calculateNextBackoffDelay() {
        try {
            const count = parseInt(localStorage.getItem(DISMISS_COUNT_KEY) || '0', 10) + 1;
            localStorage.setItem(DISMISS_COUNT_KEY, count.toString());
            
            // Exponential formula: Base * (Factor ^ (count - 1))
            const delay = Math.min(BASE_INTERVAL_MS * Math.pow(EXP_FACTOR, count - 1), MAX_INTERVAL_MS);
            const nextShow = Date.now() + delay;
            localStorage.setItem(NEXT_SHOW_KEY, nextShow.toString());
            return delay;
        } catch (e) {
            return BASE_INTERVAL_MS;
        }
    }

    function getRemainingCooldown() {
        try {
            const nextShow = parseInt(localStorage.getItem(NEXT_SHOW_KEY) || '0', 10);
            if (!nextShow) return 0;
            const remaining = nextShow - Date.now();
            return remaining > 0 ? remaining : 0;
        } catch (e) {
            return 0;
        }
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
                        <p class="dira-newsletter-disclaimer">Actionable engineering &amp; enterprise strategy only. Unsubscribe anytime.</p>
                    </form>
                </div>

                <div id="diraNewsletterSuccess" class="dira-newsletter-success" style="display: none;">
                    <div class="dira-success-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                            <path d="M8 12l3 3 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
                inset: 0;
                z-index: 100000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 16px;
                background: rgba(11, 10, 38, 0.64);
                -webkit-backdrop-filter: blur(4px);
                backdrop-filter: blur(4px);
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
                font-family: var(--dira-font, 'Plus Jakarta Sans', system-ui, sans-serif);
            }
            .dira-newsletter-backdrop.is-active {
                opacity: 1;
                visibility: visible;
            }
            .dira-newsletter-card {
                position: relative;
                width: min(100%, 31rem);
                max-height: calc(100dvh - 32px);
                overflow-y: auto;
                padding: 40px 36px 32px;
                background: #FFFFFF;
                border: 1px solid rgba(99, 91, 255, 0.2);
                border-radius: 2rem;
                box-shadow: 0 20px 40px -8px rgba(99, 91, 255, 0.28);
                transform: translateY(16px) scale(0.98);
                transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
            }
            .dira-newsletter-backdrop.is-active .dira-newsletter-card {
                transform: translateY(0) scale(1);
            }
            .dira-newsletter-close {
                position: absolute;
                top: 16px;
                right: 16px;
                width: 40px;
                height: 40px;
                padding: 0;
                border: 1px solid rgba(99, 91, 255, 0.2);
                border-radius: 50%;
                background: #F0EEFF;
                color: #635BFF;
                font-size: 22px;
                line-height: 1;
                cursor: pointer;
                transition: background 0.2s ease;
            }
            .dira-newsletter-close:hover {
                background: #EAE5FF;
            }
            .dira-newsletter-close:focus-visible {
                outline: 2px solid #635BFF;
                outline-offset: 2px;
            }
            .dira-newsletter-badge {
                display: inline-block;
                margin-bottom: 16px;
                padding: 6px 14px;
                border-radius: 9999px;
                background: rgba(99, 91, 255, 0.08);
                color: #635BFF;
                font-size: 11px;
                line-height: 14px;
                font-weight: 700;
                letter-spacing: 0.06em;
            }
            .dira-newsletter-header h2 {
                margin: 0 0 12px;
                padding-right: 36px;
                color: #1A173B;
                font-size: 26px;
                line-height: 34px;
                font-weight: 800;
                letter-spacing: -0.02em;
            }
            .dira-newsletter-header p {
                margin: 0 0 24px;
                color: #464555;
                font-size: 15px;
                line-height: 24px;
            }
            .dira-input-group {
                display: flex;
                gap: 8px;
                padding: 6px;
                background: #F4F4FA;
                border: 1px solid rgba(99, 91, 255, 0.12);
                border-radius: 9999px;
            }
            .dira-input-group:focus-within {
                outline: 2px solid #635BFF;
                background: #FFFFFF;
            }
            .dira-input-group input {
                flex: 1 1 auto;
                min-width: 0;
                padding: 0 16px;
                border: 0;
                outline: 0;
                background: transparent;
                color: #1A173B;
                font-family: inherit;
                font-size: 16px;
            }
            .dira-input-group input:focus {
                outline: 0;
            }
            .dira-newsletter-submit {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                min-height: 46px;
                padding: 0 22px;
                border: 0;
                border-radius: 9999px;
                background: linear-gradient(135deg, #635BFF 0%, #7E42F5 100%);
                color: #FFFFFF;
                font-family: inherit;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: filter 0.2s ease, box-shadow 0.2s ease;
            }
            .dira-newsletter-submit:hover {
                filter: brightness(1.07);
                box-shadow: 0 8px 20px rgba(99, 91, 255, 0.35);
            }
            .dira-newsletter-submit:focus-visible {
                outline: 2px solid #1A173B;
                outline-offset: 2px;
            }
            .dira-newsletter-disclaimer {
                margin: 14px 0 0;
                color: #777587;
                font-size: 12px;
                line-height: 18px;
            }
            .dira-newsletter-error {
                margin: 10px 0 0;
                color: #BA1A1A;
                font-size: 13px;
                font-weight: 600;
            }
            .dira-newsletter-success {
                padding: 8px 0 4px;
                text-align: left;
            }
            .dira-success-icon {
                margin-bottom: 12px;
                color: #635BFF;
            }
            .dira-newsletter-success h3 {
                margin: 0 0 8px;
                color: #1A173B;
                font-size: 22px;
                line-height: 30px;
                font-weight: 800;
            }
            .dira-newsletter-success p {
                margin: 0;
                color: #464555;
                font-size: 15px;
                line-height: 24px;
            }
            @media (max-width: 580px) {
                .dira-newsletter-card {
                    padding: 32px 22px 24px;
                    border-radius: 1.5rem;
                }
                .dira-newsletter-header h2 {
                    font-size: 22px;
                    line-height: 30px;
                }
                .dira-input-group {
                    flex-direction: column;
                    padding: 8px;
                    border-radius: 1.25rem;
                }
                .dira-input-group input {
                    min-height: 46px;
                }
                .dira-newsletter-submit {
                    width: 100%;
                }
            }
            @media (prefers-reduced-motion: reduce) {
                .dira-newsletter-backdrop,
                .dira-newsletter-card {
                    transition: none;
                    transform: none;
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
                const clientId = getOrCreateClientId();

                if (email && email.includes('@')) {
                    const submitButton = form.querySelector('.dira-newsletter-submit');
                    submitButton.disabled = true;
                    submitButton.querySelector('span').textContent = 'Subscribing...';
                    try {
                        const response = await fetch(`${API_BASE}/newsletter/subscribe`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email, clientId })
                        });
                        const result = await response.json();
                        if (!response.ok) throw new Error(result.error || 'Subscription failed.');

                        markAsSubscribed();
                        const formContainer = document.getElementById('newsletter-form-container');
                        const successView = document.getElementById('diraNewsletterSuccess');
                        if (formContainer) formContainer.style.display = 'none';
                        if (successView) successView.style.display = 'block';
                        setTimeout(closeModalWithoutCooldown, 2200);
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
        if (isSubscribedLocal()) return;
        injectNewsletterModal();
        const modal = document.getElementById('dira-newsletter-modal');
        if (modal) {
            modal.classList.add('is-active');
            modal.setAttribute('aria-hidden', 'false');
        }
    }

    function closeModalWithoutCooldown() {
        const modal = document.getElementById('dira-newsletter-modal');
        if (modal) {
            modal.classList.remove('is-active');
            modal.setAttribute('aria-hidden', 'true');
        }
    }

    function hideModal() {
        closeModalWithoutCooldown();

        // Calculate exponential backoff and schedule next show
        if (!isSubscribedLocal()) {
            const nextDelay = calculateNextBackoffDelay();
            if (popupTimer) clearTimeout(popupTimer);
            popupTimer = setTimeout(async () => {
                const subscribed = await checkSubscriptionStatus();
                if (!subscribed) showModal();
            }, nextDelay);
        }
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
        // Only use localStorage for the initial check — no eager backend call.
        // The backend check runs later, just before the popup is about to show.
        if (isSubscribedLocal()) return;

        const remainingCooldown = getRemainingCooldown();
        if (remainingCooldown > 0) {
            // Respect existing exponential backoff timer
            popupTimer = setTimeout(async () => {
                const isSub = await checkSubscriptionStatus();
                if (!isSub) showModal();
            }, remainingCooldown);
        } else {
            // Initial appearance after 2.5 seconds
            popupTimer = setTimeout(async () => {
                const isSub = await checkSubscriptionStatus();
                if (!isSub) showModal();
            }, 2500);
        }
    });

    // Expose utility globally
    window.DiraNewsletter = {
        show: showModal,
        hide: hideModal,
        markSubscribed: markAsSubscribed,
        reset: () => {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(DISMISS_COUNT_KEY);
            localStorage.removeItem(NEXT_SHOW_KEY);
            showModal();
        },
    };
})();
