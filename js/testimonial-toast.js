(function () {
  'use strict';

  function getTestimonials() {
    const testimonials = Array.from(document.querySelectorAll('.testimonial-card')).map(card => {
      const imageEl = card.querySelector('img');
      return {
        quote: card.querySelector('.testimonial-quote, .testimonial-text')?.textContent.trim(),
        author: card.querySelector('.testimonial-author-box h4, .testimonial-author h4, .testimonial-author strong')?.textContent.trim() || card.querySelector('.testimonial-author')?.textContent.trim(),
        image: imageEl?.getAttribute('src') || '',
        alt: imageEl?.getAttribute('alt') || 'DIRA testimonial image'
      };
    }).filter(testimonial => testimonial.quote && testimonial.author);

    return testimonials.length ? testimonials : [
      {
        quote: 'DIRA delivered a resilient platform that consolidated our global alumni membership and digitized our verification process with flawless audit trails and zero downtime.',
        author: 'SHESA Connect',
        image: './images/photos/web/team-b.jpg',
        alt: 'DIRA team presentation'
      },
      {
        quote: 'Commended as one of the most promising and technically rigorous technology initiatives encountered in Bamenda.',
        author: 'Institutional Partner',
        image: './images/photos/web/team-a.jpg',
        alt: 'DIRA institutional engagement'
      },
      {
        quote: 'DIRA delivered practical technology that streamlined our community initiatives and eliminated manual tracking errors.',
        author: 'Community Platform Partner',
        image: './images/photos/web/hero-1.jpg',
        alt: 'DIRA community technology project'
      }
    ];
  }

  function initializeTestimonialToast() {
    const testimonials = getTestimonials();
    if (!testimonials.length || document.getElementById('testimonialToast')) return;

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
    let showTimer;
    let hideTimer;

    function scheduleToast(delay) {
      clearTimeout(showTimer);
      showTimer = setTimeout(showToast, delay);
    }

    function hideToast() {
      toast.classList.remove('is-visible');
      toast.setAttribute('aria-hidden', 'true');
      scheduleToast(12000);
    }

    function showToast() {
      const testimonial = testimonials[testimonialIndex % testimonials.length];
      quote.textContent = testimonial.quote;
      author.textContent = testimonial.author;
      image.src = testimonial.image;
      image.alt = testimonial.alt;
      testimonialIndex += 1;
      toast.classList.add('is-visible');
      toast.setAttribute('aria-hidden', 'false');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(hideToast, 9000);
    }

    closeButton.addEventListener('click', hideToast);
    scheduleToast(2000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeTestimonialToast);
  else initializeTestimonialToast();
})();
