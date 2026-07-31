/* 오로라의소리 — script.js v6 */

(function initStickyHeader() {
  var header = document.getElementById('site-nav');
  if (!header) return;

  function updateHeaderState() {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();
})();
