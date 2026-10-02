(() => {
  const controls = document.querySelector('.work-controls');
  if (!controls) return;
  const filters = controls.querySelector('.work-filters');
  const kindButtons = [...controls.querySelectorAll('.work-kinds button')];
  const cards = [...document.querySelectorAll('.work-card')];
  const count = document.getElementById('work-count');
  const title = document.getElementById('work-section-title');
  const hint = document.getElementById('work-hint');
  const labels = {images:'광고 이미지와 제품 비주얼', food:'푸드', product:'제품', brand:'브랜드', carousel:'인스타', character:'캐릭터', website:'웹사이트 샘플'};
  controls.hidden = false;
  const applyFilter = (value) => {
    if (!Object.hasOwn(labels, value)) value = 'images';
    const website = value === 'website';
    kindButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === (website ? 'website' : 'images'))));
    [...filters.querySelectorAll('button')].forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === value)));
    filters.hidden = website;
    cards.forEach(card => { card.hidden = value === 'images' ? card.dataset.category === 'website' : card.dataset.category !== value; });
    const n = cards.filter(card => !card.hidden).length;
    count.textContent = `${website ? '웹사이트' : '이미지'} ${n}개`;
    title.textContent = labels[value];
    hint.textContent = website ? '썸네일을 누르면 샘플 사이트가 새 탭으로 열립니다.' : '이미지를 누르면 더 크게 볼 수 있습니다.';
  };
  const restoreFilter = () => applyFilter(new URL(location.href).searchParams.get('category') || 'images');
  restoreFilter();
  window.addEventListener('popstate', restoreFilter);
  controls.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button || !controls.contains(button)) return;
    applyFilter(button.dataset.filter);
    const url = new URL(location.href);
    if (button.dataset.filter === 'images') url.searchParams.delete('category');
    else url.searchParams.set('category', button.dataset.filter);
    history.replaceState(null, '', url);
  });
  const dialog = document.querySelector('.work-lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const image = document.getElementById('work-lightbox-image');
  const imageTitle = document.getElementById('work-lightbox-title');
  const badge = document.getElementById('work-lightbox-badge');
  const detail = document.getElementById('work-lightbox-detail');
  const previous = document.getElementById('work-lightbox-prev');
  const next = document.getElementById('work-lightbox-next');
  const position = document.getElementById('work-lightbox-position');
  let touchStart;
  image.addEventListener('touchstart', event => { touchStart = event.touches.length === 1 ? {x:event.touches[0].clientX,y:event.touches[0].clientY} : null; }, {passive:true});
  image.addEventListener('touchend', event => {
    if (!touchStart || !dialog.open || !items.length || event.changedTouches.length !== 1) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) showImage(current + (dx < 0 ? 1 : -1));
  }, {passive:true});
  image.addEventListener('touchcancel', () => { touchStart = null; }, {passive:true});
  let trigger;
  let items = [];
  let current = 0;
  const showImage = (index) => {
    current = (index + items.length) % items.length;
    const link = items[current];
    image.src = link.image;
    image.alt = link.alt;
    imageTitle.textContent = link.title;
    badge.textContent = link.badge;
    detail.href = link.href;
    position.textContent = `${current + 1} / ${items.length}`;
    previous.disabled = next.disabled = items.length < 2;
  };
  previous.addEventListener('click', () => { if (items.length) showImage(current - 1); });
  next.addEventListener('click', () => { if (items.length) showImage(current + 1); });
  dialog.addEventListener('keydown', (event) => {
    if (!dialog.open || !items.length || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  document.getElementById('work-grid').addEventListener('click', (event) => {
    const link = event.target.closest('a[data-full-image]');
    if (!link || event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!dialog.isConnected || dialog.open) return;
    const fromLink = source => ({source, image:source.dataset.fullImage, alt:source.querySelector('img').alt, title:source.dataset.imageTitle, badge:source.dataset.imageBadge, href:source.href});
    let group = [];
    try { group = JSON.parse(link.dataset.slides || '[]'); } catch { /* Keep the normal image fallback. */ }
    if (!Array.isArray(group)) group = [];
    group = group.filter(slide => slide && typeof slide.image === 'string' && slide.image.startsWith('/work/assets/'));
    if (group.length) {
      items = group.map(slide => ({image:slide.image, alt:slide.alt || link.querySelector('img').alt, title:`${link.dataset.imageTitle} / ${slide.caption || ''}`, badge:link.dataset.imageBadge, href:link.href}));
      showImage(0);
    } else {
      items = cards.filter(card => !card.hidden).map(card => card.querySelector('a[data-full-image]')).filter(Boolean).map(fromLink);
      const index = items.findIndex(item => item.source === link);
      if (index < 0) return;
      showImage(index);
    }
    dialog.showModal();
    trigger = link;
    document.body.classList.add('work-image-open');
    event.preventDefault();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('work-image-open');
    if (trigger?.isConnected) trigger.focus();
    image.removeAttribute('src');
    items = [];
    touchStart = null;
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
})();
