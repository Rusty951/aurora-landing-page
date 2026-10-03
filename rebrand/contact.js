// Shared by the homepage and portfolio; the HTML link remains the destination source.
(() => {
  const link = document.getElementById('floating-cta-btn');
  if (!link) return;
  const hero = document.querySelector('.experience');
  const primary = document.getElementById('final-cta-btn') || document.querySelector('.work-cta-link');
  const header = document.querySelector('.header');
  const gallery = document.querySelector('.work-gallery');
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const headerBottom = header?.getBoundingClientRect().bottom || 0;
    const primaryRect = primary?.getBoundingClientRect();
    const primaryVisible = primaryRect && primaryRect.bottom > headerBottom && primaryRect.top < window.innerHeight;
    const heroVisible = hero && hero.getBoundingClientRect().bottom > headerBottom;
    const galleryRect = gallery?.getBoundingClientRect();
    const mobileGalleryVisible = window.innerWidth <= 700 && galleryRect && galleryRect.bottom > headerBottom && galleryRect.top < window.innerHeight;
    const modalOpen = Boolean(document.querySelector('dialog[open]'));
    // A scroll or layout shift must not remove the link while it has keyboard focus.
    const focused = document.activeElement === link;
    link.hidden = modalOpen || (!focused && Boolean(heroVisible || primaryVisible || mobileGalleryVisible));
  };
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(update);
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  link.addEventListener('blur', schedule);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(schedule);
    [hero, primary, gallery].filter(Boolean).forEach(element => observer.observe(element));
  }
  if ('MutationObserver' in window) {
    const observer = new MutationObserver(schedule);
    document.querySelectorAll('dialog').forEach(dialog => {
      observer.observe(dialog, { attributes: true, attributeFilter: ['open'] });
    });
  }
  update();
})();
