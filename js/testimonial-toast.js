(function () {
  'use strict';

  const TOAST_STATE_KEY = 'dira_testimonial_toast_state_v1';
  const INITIAL_DELAY_MS = 15000;
  const FIRST_BACKOFF_MS = 2 * 60 * 1000;
  const MAX_BACKOFF_MS = 30 * 60 * 1000;

  function readToastState() {
    try {
      const savedState = JSON.parse(localStorage.getItem(TOAST_STATE_KEY) || 'null');
      if (
        savedState &&
        Number.isInteger(savedState.shows) &&
        Number.isFinite(savedState.nextAt)
      ) {
        return savedState;
      }
    } catch {
      // Storage can be unavailable in restricted browsing contexts.
    }
    return { shows: 0, nextAt: 0 };
  }

  function saveToastState(state) {
    try {
      localStorage.setItem(TOAST_STATE_KEY, JSON.stringify(state));
    } catch {
      // Keep the toast functional for this page even when storage is unavailable.
    }
  }

  function readTestimonials(sourceDocument, baseUrl) {
    return Array.from(sourceDocument.querySelectorAll('#testimonialsCarousel .testimonial-card')).map(card => {
      const imageEl = card.querySelector('img');
      const imagePath = imageEl?.getAttribute('src');
      return {
        quote: card.querySelector('.testimonial-quote, .testimonial-text')?.textContent.trim(),
        author: card.querySelector('.testimonial-author-box h4, .testimonial-author h4, .testimonial-author strong')?.textContent.trim() || card.querySelector('.testimonial-author')?.textContent.trim(),
        image: imagePath ? new URL(imagePath, baseUrl).href : '',
        alt: imageEl?.getAttribute('alt') || 'DIRA testimonial image'
      };
    }).filter(testimonial => testimonial.quote && testimonial.author);
  }

  async function getTestimonials() {
    const pageTestimonials = readTestimonials(document, document.baseURI);
    if (pageTestimonials.length) return pageTestimonials;

    const galleryUrl = new URL('./gallery', document.baseURI);
    try {
      const response = await fetch(galleryUrl, { cache: 'no-store' });
      if (!response.ok) return [];

      const galleryDocument = new DOMParser().parseFromString(await response.text(), 'text/html');
      return readTestimonials(galleryDocument, galleryUrl.href);
    } catch {
      return [];
    }
  }

  async function initializeTestimonialToast() {
    const existingToast = document.getElementById('testimonialToast');
    existingToast?.remove();
    const testimonials = await getTestimonials();
    if (!testimonials.length) return;

    if (!document.querySelector('link[data-testimonial-toast-style]')) {
      const stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = './style/testimonial-toast.css';
      stylesheet.dataset.testimonialToastStyle = 'true';
      document.head.appendChild(stylesheet);
    }

    const toast = document.createElement('aside');
    toast.id = 'testimonialToast';
    toast.className = 'testimonial-toast';
    toast.setAttribute('aria-live', 'polite');
    toast.setAttribute('aria-hidden', 'true');
    toast.innerHTML = `
      <button class="testimonial-toast-close" type="button" aria-label="Dismiss testimonial">&times;</button>
      <div class="testimonial-toast-body">
        <div class="testimonial-toast-media">
          <img class="testimonial-toast-image" src="" alt="" />
        </div>
        <div class="testimonial-toast-content">
          <div class="testimonial-toast-label">Client feedback</div>
          <blockquote class="testimonial-toast-quote"></blockquote>
          <div class="testimonial-toast-author"></div>
          <a class="testimonial-toast-cta" href="https://client-intake-form.diracmr.com" target="_blank" rel="noopener">
            Start a Project With Us Today <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>`;
    document.body.appendChild(toast);

    const image = toast.querySelector('.testimonial-toast-image');
    const quote = toast.querySelector('.testimonial-toast-quote');
    const author = toast.querySelector('.testimonial-toast-author');
    const closeButton = toast.querySelector('.testimonial-toast-close');
    let testimonialIndex = 0;
    const toastState = readToastState();
    let showTimer;
    let hideTimer;

    function scheduleToast(delay) {
      clearTimeout(showTimer);
      showTimer = setTimeout(showToast, delay);
    }

    function hideToast() {
      if (toast.contains(document.activeElement)) return;
      toast.classList.remove('is-visible');
      toast.setAttribute('aria-hidden', 'true');
      scheduleToast(Math.max(INITIAL_DELAY_MS, toastState.nextAt - Date.now()));
    }

    function requestHide() {
      if (toast.contains(document.activeElement)) {
        const hideAfterFocusLeaves = event => {
          if (!toast.contains(event.relatedTarget)) {
            toast.removeEventListener('focusout', hideAfterFocusLeaves);
            hideToast();
          }
        };
        toast.addEventListener('focusout', hideAfterFocusLeaves);
        return;
      }
      hideToast();
    }

    function showToast() {
      if (toastState.nextAt > Date.now()) {
        scheduleToast(toastState.nextAt - Date.now());
        return;
      }

      const testimonial = testimonials[testimonialIndex % testimonials.length];
      quote.textContent = testimonial.quote;
      author.textContent = testimonial.author;
      image.src = testimonial.image;
      image.alt = testimonial.alt;
      testimonialIndex += 1;
      toastState.shows += 1;
      const backoff = Math.min(
        FIRST_BACKOFF_MS * (2 ** Math.min(toastState.shows - 1, 20)),
        MAX_BACKOFF_MS
      );
      toastState.nextAt = Date.now() + backoff;
      saveToastState(toastState);
      toast.classList.add('is-visible');
      toast.setAttribute('aria-hidden', 'false');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(requestHide, 8000);
    }

    closeButton.addEventListener('click', () => {
      closeButton.blur();
      hideToast();
    });
    scheduleToast(Math.max(INITIAL_DELAY_MS, toastState.nextAt - Date.now()));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeTestimonialToast);
  else initializeTestimonialToast();
})();
