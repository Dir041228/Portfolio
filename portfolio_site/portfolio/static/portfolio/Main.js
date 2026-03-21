// Typewriter effect for hero section
const words = ['IT Student', 'Django Developer', 'Python Learner', 'Web Developer'];
let wi = 0, ci = 0, deleting = false;

function type() {
  const word = words[wi];
  const el = document.getElementById('typewriter');
  if (!deleting) {
    el.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    el.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// Highlights the correct nav icon based on which section is visible
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.sidenav .nav-icon, .mobile-nav .nav-icon');

function updateNav() {
  let current = 'home';
  // Use smaller offset on mobile so detection is more accurate
  const offset = window.innerWidth <= 768 ? 80 : 200;
  const scrollBottom = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;

  // If user scrolled to the very bottom, highlight the last section
  if (scrollBottom >= pageHeight - 20) {
    current = sections[sections.length - 1].id;
  } else {
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - offset) current = s.id;
    });
  }

  // Toggle active class on matching nav icon
  document.querySelectorAll('.nav-icon').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', updateNav);

// Skill ring animation — fills the circle when skills section scrolls into view
const skillsSection = document.querySelector('#skills');
const circumference = 2 * Math.PI * 50; // r=50 circle circumference

// Instantly reset all rings to empty (no animation)
function resetRings() {
  document.querySelectorAll('.skill-ring-fill').forEach(ring => {
    ring.style.transition = 'none';
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference;
  });
}

// Animate rings filling up based on skill level
function animateRings() {
  document.querySelectorAll('.skill-ring-fill').forEach(ring => {
    const level = parseInt(ring.dataset.level, 10);
    const offset = circumference - (level / 100) * circumference;
    requestAnimationFrame(() => {
      ring.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)';
      ring.style.strokeDashoffset = offset;
    });
  });
}

// Replay ring animation every time skills section enters/exits view
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateRings();
    } else {
      resetRings();
    }
  });
}, { threshold: 0.3 });

if (skillsSection) skillObserver.observe(skillsSection);

// On page load: clear hash and smoothly scroll to top
window.addEventListener('load', () => {
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname);
  }

  const startY = window.scrollY;
  if (startY === 0) { updateNav(); return; }

  const duration = 600;
  const startTime = performance.now();

  function smoothScrollToTop(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, startY * (1 - ease));
    if (progress < 1) {
      requestAnimationFrame(smoothScrollToTop);
    } else {
      window.scrollTo(0, 0);
      updateNav();
    }
  }
  requestAnimationFrame(smoothScrollToTop);
});