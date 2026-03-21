// Get the canvas element and drawing context
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fill the full viewport
function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', () => { resize(); });

const PARTICLE_COUNT = 90;

// Track mouse position for repulsion effect
const mouse = { x: null, y: null };
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

class Particle {
  constructor() { this.reset(true); }

  // Set random starting position, speed, size and color
  reset(initial = false) {
    this.x      = Math.random() * canvas.width;
    this.y      = initial ? Math.random() * canvas.height : canvas.height + 10;
    this.vx     = (Math.random() - 0.5) * 0.4;
    this.vy     = -(Math.random() * 0.5 + 0.2);
    this.radius = Math.random() * 1.8 + 0.5;
    this.alpha  = Math.random() * 0.5 + 0.15;
    this.color  = Math.random() > 0.5 ? '79,195,247' : '124,77,255';
  }

  update() {
    // Push particle away from mouse cursor
    if (mouse.x !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.vx += (dx / dist) * force * 0.3;
        this.vy += (dy / dist) * force * 0.3;
      }
    }

    // Slow down over time
    this.vx *= 0.98;
    this.vy *= 0.98;

    this.x += this.vx;
    this.y += this.vy;

    // Wrap left/right edges, reset when off the top
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < -10) this.reset();
  }

  // Draw the particle dot
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.fill();
  }
}

const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

// Draw lines between particles that are close to each other
function drawConnections() {
  const MAX_DIST = 130;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX_DIST) {
        // Closer particles get a more visible line
        const alpha = (1 - dist / MAX_DIST) * 0.18;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(79,195,247,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }
}

// Main animation loop — runs 60fps
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawConnections();
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();