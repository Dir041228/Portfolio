// Fade-up animation — plays when elements scroll into view, resets when they scroll out
const fadeEls = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      // Make element visible
      e.target.classList.add('visible');
    } else {
      // Hide again so it animates next time it comes into view
      e.target.classList.remove('visible');
    }
  });
}, { threshold: 0.12 });

// Observe every fade-up element on the page
fadeEls.forEach(el => fadeObserver.observe(el));


// Animated stat counters — counts up from 0 every time About section is visible
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out — starts fast, slows down at the end
    const ease = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.round(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Watch the about section and trigger counters when it enters view
const aboutSection = document.querySelector('#about');
if (aboutSection) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        // Reset to 0 then count up again
        e.target.querySelectorAll('.stat-num[data-target]').forEach(el => {
          el.textContent = '0';
          animateCounter(el);
        });
      }
    });
  }, { threshold: 0.3 });
  statObserver.observe(aboutSection);
}