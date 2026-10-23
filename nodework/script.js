(() => {
  'use strict';
  const conf = window.NODEWORK_SITE || {};
  const byId = (id) => document.getElementById(id);
  const versionEl = byId('version-label');
  if (conf.version && versionEl) versionEl.textContent = conf.version;
  if (conf.repositoryUrl && /^https:\/\/github\.com\//.test(conf.repositoryUrl)) {
    const repo = byId('repo-link');
    repo.href = conf.repositoryUrl;
  }
  if (conf.downloadUrl && /^https:\/\//.test(conf.downloadUrl)) {
    const button = byId('download-link');
    button.href = conf.downloadUrl;
    button.removeAttribute('aria-disabled');
    button.removeAttribute('tabindex');
    button.classList.remove('is-unavailable');
    button.setAttribute('rel','noopener noreferrer');
    button.textContent = '↓ Скачать NODEWORK';
    byId('release-status').textContent = 'Публичная альфа доступна. Спасибо, что помогаете развивать игру!';
  }
  const year = byId('copyright-year');
  if (year) year.textContent = String(new Date().getFullYear());

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = byId('main-nav');
  const setMenu = (open) => {
    nav.classList.toggle('is-open',open);
    menuToggle.setAttribute('aria-expanded',String(open));
    menuToggle.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');
  };
  menuToggle?.addEventListener('click',() => setMenu(!nav.classList.contains('is-open')));
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click',() => setMenu(false)));
  document.addEventListener('keydown',(event) => {
    if(event.key === 'Escape' && nav?.classList.contains('is-open')) setMenu(false);
  });

  const gallery = [
    { src:'assets/gameplay-industry.webp',title:'01 — Заводы и мастерские',alt:'Промышленная долина NODEWORK'},
    { src:'assets/gameplay-network.webp',title:'02 — Ноды и связи',alt:'Сеть производств и соединений'},
    { src:'assets/gameplay-market.webp',title:'03 — Рынок и спрос',alt:'Интерфейс рынка и спроса'},
    { src:'assets/gameplay-village.webp',title:'04 — Посёлок вокруг долины',alt:'Посёлок вокруг игровой карты'},
  ];
  const dialog = byId('lightbox');
  const lightboxImage = byId('lightbox-image');
  const lightboxTitle = byId('lightbox-title');
  let selected = 0;
  const showImage = (index) => {
    selected = (index + gallery.length) % gallery.length;
    const {src,title,alt} = gallery[selected];
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightboxTitle.textContent = title;
  };
  document.querySelectorAll('[data-gallery]').forEach((button) => button.addEventListener('click',() => {
    showImage(Number(button.dataset.gallery));
    if(typeof dialog.showModal === 'function') dialog.showModal();
  }));
  byId('close-lightbox')?.addEventListener('click',() => dialog.close());
  byId('prev-image')?.addEventListener('click',() => showImage(selected - 1));
  byId('next-image')?.addEventListener('click',() => showImage(selected + 1));
  dialog?.addEventListener('click',(event) => { if(event.target === dialog) dialog.close(); });
  dialog?.addEventListener('keydown',(event) => {
    if(event.key === 'ArrowLeft') {event.preventDefault();showImage(selected-1)}
    if(event.key === 'ArrowRight') {event.preventDefault();showImage(selected+1)}
  });

  // Lightweight scroll reveal; all content stays visible without JS or when reduced motion is preferred.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const targets = document.querySelectorAll('.feature-card, .journal-post, .gallery-photo');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {entry.target.classList.add('arrived');observer.unobserve(entry.target);}
      }
    }, {threshold:.08,rootMargin:'0px 0px 60px 0px'});
    targets.forEach((target) => {target.classList.add('will-arrive');observer.observe(target);});
  }
})();
