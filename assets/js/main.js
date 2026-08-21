const navMenuBtn = document.getElementById('navMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

function closeMobileMenu() {
  if (!navMenuBtn || !mobileMenu) return;
  navMenuBtn.classList.remove('is-open');
  mobileMenu.classList.remove('is-open');
  navMenuBtn.setAttribute('aria-expanded', 'false');
  navMenuBtn.setAttribute('aria-label', 'Ouvrir le menu');
}

if (navMenuBtn && mobileMenu) {
  navMenuBtn.addEventListener('click', () => {
    const willOpen = !mobileMenu.classList.contains('is-open');
    mobileMenu.classList.toggle('is-open', willOpen);
    navMenuBtn.classList.toggle('is-open', willOpen);
    navMenuBtn.setAttribute('aria-expanded', String(willOpen));
    navMenuBtn.setAttribute('aria-label', willOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) closeMobileMenu();
  });
}

function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.borderBottomColor = window.scrollY > 20 ? 'var(--border)' : 'transparent';
  nav.style.background = window.scrollY > 20 ? 'rgba(246,243,237,0.96)' : 'rgba(246,243,237,0.88)';
});

const revealTargets = document.querySelectorAll(
  '.pillar-card, .service-card, .why-benefit, .about-photo-block, .about-content, .portfolio-card, .portfolio-card-empty, .testi-card, .faq-item, .growth-card, .growth-step, .visibility-card, .method-card, .mission-card, .blog-card'
);

revealTargets.forEach((el, index) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      if (entry.target.classList.contains('growth-card')) {
        document.querySelectorAll('.growth-main-line, .growth-area, .growth-point').forEach((el, i) => {
          el.classList.add('animate');
          if (el.classList.contains('growth-point')) el.style.animationDelay = `${0.7 + i * 0.12}s`;
        });
      }
    }
  });
}, { threshold: 0.14 });

revealTargets.forEach(el => observer.observe(el));

function animateNumbers() {
  document.querySelectorAll('.dash-metric-value').forEach(value => {
    const original = value.childNodes[0].nodeValue.trim();
    const number = parseInt(original.replace(/\D/g, ''), 10);
    if (!number || value.dataset.animated) return;
    value.dataset.animated = 'true';
    const suffix = value.innerHTML.replace(value.childNodes[0].nodeValue, '');
    let current = 0;
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      current = Math.floor(number * (1 - Math.pow(1 - progress, 3)));
      const formatted = current.toLocaleString('fr-FR').replace(/\s/g, ' ');
      value.innerHTML = formatted + ' ' + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

const dashboardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) animateNumbers();
  });
}, { threshold: 0.4 });

const dashboard = document.querySelector('.dashboard-card');
if (dashboard) dashboardObserver.observe(dashboard);