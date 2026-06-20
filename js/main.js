/* =============================================
   TYPEWRITER
   ============================================= */
const roles = [
  'Cybersecurity Practitioner',
  'Systems & Network Engineer',
  'Data & Operations Analyst',
  'Java & Python Developer',
  'Vulnerability Assessor',
];

let roleIdx = 0;
let charIdx = 0;
let deleting = false;
const el = document.getElementById('typewriter');

function type() {
  if (!el) return;
  const current = roles[roleIdx];

  if (deleting) {
    el.textContent = current.substring(0, charIdx--);
  } else {
    el.textContent = current.substring(0, charIdx++);
  }

  let delay = deleting ? 40 : 80;

  if (!deleting && charIdx === current.length + 1) {
    delay = 2000;
    deleting = true;
  } else if (deleting && charIdx === 0) {
    deleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 800);
});


/* =============================================
   SCROLL REVEAL
   ============================================= */
const revealEls = document.querySelectorAll('[data-aos], .timeline__item, .project__card, .cert__card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly
      const siblings = Array.from(entry.target.parentElement.children);
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));


/* =============================================
   NAV — scroll shadow + mobile toggle
   ============================================= */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 20
    ? '0 4px 24px rgba(0,0,0,0.4)'
    : 'none';
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


/* =============================================
   ACTIVE NAV LINK on scroll
   ============================================= */
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.querySelectorAll('a').forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--white)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));
