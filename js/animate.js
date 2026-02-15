// try {
//   VANTA.HALO({
//     el: "body",
//     mouseControls: true,
//     touchControls: true,
//     gyroControls: false,
//     minHeight: 200.00,
//     minWidth: 200.00,
//     baseColor: 0x40421,
//     backgroundColor: 0xbabad3,
//     amplitudeFactor: 1.70,
//     xOffset: -0.04,
//     yOffset: 0.15,
//     size: 0.80
//   })
// } catch (error) {
//   console.log("Vanta animation failed to initialize", error);
// }

// custom animation
function animategeneral(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: Stop observing after it animates once
        // observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 // Triggers when 10% of the element is visible
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
    threshold: 0.1 // Trigger when 10% of the element is visible
  });

  // 2. Select the elements and apply the "Stagger"
  const hiddenElements = document.querySelectorAll('.reveal-card');

  hiddenElements.forEach((el, index) => {
    // This line calculates the delay (0ms, 200ms, 400ms, etc.)
    el.style.setProperty('--delay', `${index * 200}ms`);
    
    // This line tells the observer to watch this specific element
    observer.observe(el);
  });
}
animategeneral();
animateCards();