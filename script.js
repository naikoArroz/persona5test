// TODDYNO — Phantom Archive / scripts
// Edite os textos em index.html e as cores no começo de style.css.

document.body.classList.add('loading');

const loader = document.getElementById('loader');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const loaderMessage = document.getElementById('loaderMessage');
const loadingMessages = [
  'LOADING USER DATA...',
  'SYNCHRONIZING FILES...',
  'ACCESSING THE METAVERSE...',
  'PREPARING THE HEIST...',
  'ACCESS GRANTED.'
];

let progress = 0;
let lastMessage = -1;
const timer = window.setInterval(() => {
  progress = Math.min(100, progress + Math.random() * 9 + 4);
  progressFill.style.width = `${progress}%`;
  progressText.textContent = `${String(Math.floor(progress)).padStart(2, '0')}%`;

  const index = Math.min(loadingMessages.length - 1, Math.floor(progress / 22));
  if (index !== lastMessage) {
    lastMessage = index;
    loaderMessage.textContent = loadingMessages[index];
  }

  if (progress >= 100) {
    window.clearInterval(timer);
    window.setTimeout(() => {
      loader.classList.add('is-done');
      document.body.classList.remove('loading');
      window.setTimeout(() => loader.remove(), 600);
    }, 250);
  }
}, 100);

// Navegação responsiva.
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.querySelector('b').textContent = open ? '✕' : '☰';
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.querySelector('b').textContent = '☰';
  });
});

// Entradas animadas ao rolar a página.
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add('visible'));
}

// Modal dos itens da galeria.
const modal = document.getElementById('artModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');

document.querySelectorAll('.art-tile').forEach(tile => {
  tile.addEventListener('click', () => {
    modalTitle.textContent = tile.dataset.title || 'ART FILE';
    modalDescription.textContent = tile.dataset.description || '';
    if (typeof modal.showModal === 'function') modal.showModal();
    else window.alert(`${modalTitle.textContent}\n${modalDescription.textContent}`);
  });
});

document.getElementById('modalClose').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  if (event.target === modal) modal.close();
});

document.getElementById('year').textContent = new Date().getFullYear();

// Respeita a preferência de movimento reduzido e evita esperar o loading inteiro.
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.clearInterval(timer);
  progressFill.style.width = '100%';
  progressText.textContent = '100%';
  loaderMessage.textContent = 'ACCESS GRANTED.';
  window.setTimeout(() => {
    loader.classList.add('is-done');
    document.body.classList.remove('loading');
    window.setTimeout(() => loader.remove(), 100);
  }, 150);
}
