document.addEventListener("DOMContentLoaded", () => {
  // Initialize GSAP plugins if available
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const staticBackground = document.body.hasAttribute('data-static-bg');
  if (typeof gsap !== 'undefined' && !reduceMotion && !staticBackground) {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    initBackgroundAnimation();
  }
  
  // Initialize other animations
  animategeneral();
  animateCards();
});

function initBackgroundAnimation() {
  // 1. Create container if missing
  let bg = document.querySelector('.animated-background');
  if (!bg) {
    bg = document.createElement('div');
    bg.classList.add('animated-background');
    document.body.prepend(bg);
  }

  // 2. Define Colors
  const colors = ["var(--dira-primary)", "var(--dira-secondary)", "var(--dira-inverse-primary)"];
  
  // Clear existing blobs to prevent duplicates on re-run
  bg.innerHTML = '';

  for(let i = 0; i < 3; i++) {
    const blob = document.createElement('div');
    blob.classList.add('blob');
    blob.style.background = colors[i];
    bg.appendChild(blob);

    // 3. Set Initial Random Position
    gsap.set(blob, {
      x: gsap.utils.random(0, window.innerWidth),
      y: gsap.utils.random(0, window.innerHeight),
      scale: gsap.utils.random(0.8, 1.5)
    });

    // 4. Animate Position (Floating)
    gsap.to(blob, {
      x: "random(0, " + window.innerWidth + ")",
      y: "random(0, " + window.innerHeight + ")",
      rotation: "random(-180, 180)",
      duration: gsap.utils.random(10, 20),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  // 5. Scroll Parallax Effect
  if (typeof ScrollTrigger !== 'undefined') {
      gsap.to(".blob", {
          yPercent: -25,
          ease: "none",
          scrollTrigger: {
              trigger: "body",
              start: "top top",
              end: "bottom bottom",
              scrub: 2
          }
      });
  }
}

// custom animation
function animategeneral(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px 80px 0px",
    threshold: 0.05
  });

  // Grab all elements with the 'reveal' class and track them
  const hiddenElements = document.querySelectorAll('.reveal');
  hiddenElements.forEach((el) => observer.observe(el));

}

function animateCards(){
// 1. Setup the "Engine" (The Observer)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add the active class to start the animation
        entry.target.classList.add('active');
        
        // Optional: stop watching once it has animated
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px 80px 0px",
    threshold: 0.05
  });

  // 2. Select the elements and apply the "Stagger"
  const hiddenElements = document.querySelectorAll('.reveal-card');

  hiddenElements.forEach((el, index) => {
    el.style.setProperty('--delay', `${(index % 3) * 320}ms`);
    
    // This line tells the observer to watch this specific element
    observer.observe(el);
  });
}