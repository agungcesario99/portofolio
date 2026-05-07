/* =========================================================
   Agung Cesario — Portfolio JS
   - Theme toggle (persisted)
   - Mobile menu
   - Sticky-nav state + active section (scroll spy)
   - Reveal-on-scroll
   - Animated skill bars
   - Contact form (mailto fallback) with validation
   ========================================================= */
(() => {
  'use strict';

  // ---------- Year ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Theme ----------
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'ac-theme';

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const stored = localStorage.getItem(STORAGE_KEY);
  const initial = stored || (prefersDark.matches ? 'dark' : 'light');
  root.setAttribute('data-theme', initial);

  themeBtn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  prefersDark.addEventListener?.('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });

  // ---------- Mobile menu ----------
  const menuBtn = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  const closeMenu = () => {
    navLinks?.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
    menuBtn?.setAttribute('aria-label', 'Open menu');
  };

  menuBtn?.addEventListener('click', () => {
    const open = navLinks?.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(!!open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // ---------- Sticky nav state ----------
  const navEl = document.getElementById('nav');
  const onScroll = () => {
    if (!navEl) return;
    navEl.classList.toggle('scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- Scroll spy (active link) ----------
  const linkMap = new Map();
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(a => {
    const id = a.getAttribute('href').slice(1);
    if (id) linkMap.set(id, a);
  });

  const sections = [...linkMap.keys()]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          linkMap.forEach(a => a.classList.remove('active'));
          linkMap.get(entry.target.id)?.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(s => spy.observe(s));
  }

  // ---------- Reveal-on-scroll ----------
  const revealTargets = document.querySelectorAll(
    '.section, .hero-text, .hero-card, .t-item, .skill-card, .project, .edu-card, .contact-form, .contact-info'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const revealer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(el => revealer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('visible'));
  }

  // ---------- Skill bars ----------
  const bars = document.querySelectorAll('.skill-list i[data-level]');
  bars.forEach(b => b.style.setProperty('--w', `${Math.max(0, Math.min(100, +b.dataset.level || 0))}%`));

  if ('IntersectionObserver' in window) {
    const barObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(b => barObs.observe(b));
  } else {
    bars.forEach(b => b.classList.add('in-view'));
  }

  // ---------- Contact form (mailto fallback) ----------
  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!note) return;

    const fields = ['cf-name', 'cf-email', 'cf-subject', 'cf-message'].map(id => document.getElementById(id));
    let valid = true;

    fields.forEach(f => {
      if (!f) return;
      const empty = !f.value.trim();
      const badEmail = f.type === 'email' && !EMAIL_RE.test(f.value.trim());
      const invalid = empty || badEmail;
      f.classList.toggle('invalid', invalid);
      if (invalid) valid = false;
    });

    if (!valid) {
      note.textContent = 'Please fill in all fields with a valid email.';
      note.className = 'form-note error';
      return;
    }

    const [name, email, subject, message] = fields.map(f => f.value.trim());
    const body = `Hi Agung,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A— ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
    const href = `mailto:agungcesario99@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    note.textContent = 'Opening your email client…';
    note.className = 'form-note success';
    window.location.href = href;
    form.reset();
  });

  form?.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('invalid'));
  });

  // ---------- Flip card (projects) ----------
  document.querySelectorAll('.project-flip').forEach(card => {
    const flip = () => {
      const flipped = card.classList.toggle('is-flipped');
      card.setAttribute('aria-pressed', String(flipped));
    };
    card.addEventListener('click', flip);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flip();
      }
    });
  });
})();
