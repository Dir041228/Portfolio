// Typewriter effect
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

// Skill bar animation — trigger when skills section is visible
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.level + '%';
      });
      skillObserver.disconnect(); // only animate once
    }
  });
}, { threshold: 0.1 }); // lower threshold so it triggers sooner

const skillsSection = document.querySelector('#skills');
if (skillsSection) skillObserver.observe(skillsSection);

// Active nav on scroll — highlights both sidenav and bottomnav
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-icon');

function updateNav() {
  let current = 'home';
  sections.forEach(s => {
    const sectionTop = s.getBoundingClientRect().top;
    if (sectionTop <= window.innerHeight / 2) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', updateNav, { passive: true });

// On page load: smooth scroll to top, clear hash, then set correct nav
window.addEventListener('load', () => {
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname);
  }

  const startY = window.scrollY;

  if (startY === 0) {
    updateNav();
    return;
  }

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