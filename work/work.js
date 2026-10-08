(() => {
  const controls = document.querySelector('.work-controls');
  const cards = [...document.querySelectorAll('.work-card')];
  const sketches = document.getElementById('work-sketches');
  const visibleCards = () => cards.filter(card => !card.hidden && (card.dataset.collection !== 'sketch' || sketches?.open));
  if (controls) {
  const filterGroups = [...controls.querySelectorAll('.work-filters')];
  const kindButtons = [...controls.querySelectorAll('.work-kinds button')];
  const count = document.getElementById('work-count');
  const title = document.getElementById('work-section-title');
  const hint = document.getElementById('work-hint');
  const photography = document.getElementById('work-photography');
  const curated = document.getElementById('work-curated');
  const websites = document.getElementById('work-websites');
  const websiteTitle = document.getElementById('work-websites-title');
  const curatedCount = document.getElementById('work-curated-count');
  const sketchCount = document.getElementById('work-sketch-count');
  const gallery = document.getElementById('gallery');
  const labels = {photography:'Photo', 'photo-product':'Product', 'photo-food':'Food', 'photo-dessert':'Dessert', 'photo-space':'Space', 'photo-portrait':'Portrait', images:'Concepts', food:'Food', product:'Product', brand:'Brand', carousel:'Instagram', character:'Character', website:'Website'};
  const legacyWebsiteFilters = new Set(['website-signature', 'website-essential']);
  let activeFilter = 'website';
  const isPhotography = value => value === 'photography' || value.startsWith('photo-');
  const isWebsite = value => value === 'website';
  const kindOf = value => isWebsite(value) ? 'website' : isPhotography(value) ? 'photography' : 'images';
  controls.hidden = false;
  const header = document.querySelector('.header');
  const measureControls = () => {
    document.body.style.setProperty('--work-header-height', `${header?.getBoundingClientRect().height || 92}px`);
    document.body.style.setProperty('--work-controls-height', `${Math.ceil(controls.getBoundingClientRect().height)}px`);
  };
  measureControls();
  if (typeof ResizeObserver === 'function') {
    const observer = new ResizeObserver(measureControls);
    if (header) observer.observe(header);
    observer.observe(controls);
  }
  window.addEventListener('resize', measureControls);
  const updateCount = () => {
    const total = cards.filter(card => !card.hidden).length;
    const visible = visibleCards().length;
    if (isPhotography(activeFilter)) {
      const images = visibleCards().reduce((sum, card) => sum + Number(card.dataset.imageCount || 0), 0);
      count.textContent = `사진과 비주얼 ${total}개 모음, ${images}장`;
    } else {
      count.textContent = `${isWebsite(activeFilter) ? '웹사이트' : '이미지'} ${total}개${visible < total ? `, ${visible}개 표시, 스케치 ${total - visible}개 접힘` : ''}`;
    }
  };
  sketches.addEventListener('toggle', updateCount);
  const applyFilter = (value) => {
    if (legacyWebsiteFilters.has(value)) value = 'website';
    if (!Object.hasOwn(labels, value)) value = 'website';
    activeFilter = value;
    const website = isWebsite(value);
    const kind = kindOf(value);
    kindButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === kind)));
    filterGroups.forEach(group => {
      group.hidden = group.dataset.kind !== kind;
      [...group.querySelectorAll('button')].forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === value)));
    });
    cards.forEach(card => {
      const photo = card.dataset.collection === 'photography';
      card.hidden = website ? card.dataset.category !== 'website' : value === 'photography' ? !photo : value === 'images' ? photo || card.dataset.category === 'website' : card.dataset.category !== value;
    });
    const selectedWebsites = cards.filter(card => !card.hidden && card.dataset.category === 'website');
    selectedWebsites.forEach((card, index) => { card.dataset.websiteColumn = index % 2 ? 'right' : 'left'; });
    websiteTitle.textContent = website ? labels[value] + (selectedWebsites.length ? ` ${selectedWebsites.length}` : '') : '웹사이트 샘플';
    sketches.open = false;
    const matchingSketches = cards.filter(card => !card.hidden && card.dataset.collection === 'sketch').length;
    sketches.hidden = matchingSketches === 0;
    photography.hidden = kind !== 'photography';
    curated.hidden = kind !== 'images';
    websites.hidden = !website;
    curatedCount.textContent = cards.filter(card => !card.hidden && card.dataset.collection !== 'sketch').length;
    sketchCount.textContent = matchingSketches;
    updateCount();
    title.textContent = labels[value];
    hint.textContent = website ? (selectedWebsites.length ? '썸네일을 누르면 샘플 사이트가 새 탭으로 열립니다.' : '새로운 웹사이트를 준비하고 있습니다.') : isPhotography(value) ? '모음을 누르면 모든 이미지를 원래 비율로 크게 볼 수 있습니다.' : '이미지를 누르면 더 크게 볼 수 있습니다.' + (matchingSketches > 0 ? ' 콘셉트 스케치는 아래에서 펼쳐볼 수 있습니다.' : '');
    measureControls();
    window.dispatchEvent(new Event('work:filterchange'));
  };
  const restoreFilter = () => {
    const url = new URL(location.href);
    const value = url.searchParams.get('category') || 'website';
    applyFilter(value);
    if (legacyWebsiteFilters.has(value)) {
      url.searchParams.set('category', 'website');
      history.replaceState(null, '', url);
    }
  };
  restoreFilter();
  window.addEventListener('popstate', restoreFilter);
  controls.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button || !controls.contains(button)) return;
    applyFilter(button.dataset.filter);
    const url = new URL(location.href);
    url.searchParams.set('category', button.dataset.filter);
    history.replaceState(null, '', url);
    window.scrollTo({top:gallery.getBoundingClientRect().top + window.scrollY - (header?.getBoundingClientRect().height || 92), behavior:'instant'});
  });
  }
  const dialog = document.querySelector('.work-lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const image = document.getElementById('work-lightbox-image');
  const imageTitle = document.getElementById('work-lightbox-title');
  const badge = document.getElementById('work-lightbox-badge');
  const detail = document.getElementById('work-lightbox-detail');
  detail.hidden = !controls;
  const original = document.getElementById('work-lightbox-original');
  const transcript = document.getElementById('work-lightbox-transcript');
  const transcriptText = document.getElementById('work-lightbox-text');
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
    original.href = link.image;
    transcriptText.textContent = link.text || '';
    transcript.hidden = !link.text;
    if (!link.text) transcript.open = false;
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
  const grid = document.getElementById('work-grid') || document.querySelector('.photography-gallery');
  if (!grid) return;
  grid.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-full-image]');
    if (!link || event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!dialog.isConnected || dialog.open) return;
    const available = controls ? visibleCards().map(card => card.querySelector('a[data-full-image]')).filter(Boolean) : [...grid.querySelectorAll('a[data-full-image]')];
    if (!available.includes(link)) return;
    const fromLink = source => ({source, image:source.dataset.fullImage, alt:source.querySelector('img').alt, title:source.dataset.imageTitle, badge:source.dataset.imageBadge, href:source.href});
    let group = [];
    try { group = JSON.parse(link.dataset.slides || '[]'); } catch { /* Keep the normal image fallback. */ }
    if (!Array.isArray(group)) group = [];
    group = group.filter(slide => slide && typeof slide.image === 'string' && slide.image.startsWith('/work/assets/'));
    if (group.length) {
      items = group.map(slide => ({image:slide.image, alt:slide.alt || link.querySelector('img').alt, title:`${link.dataset.imageTitle} / ${slide.caption || ''}`, badge:link.dataset.imageBadge, href:link.href, text:typeof slide.text === 'string' ? slide.text : ''}));
      showImage(0);
    } else {
      items = available.map(fromLink);
      showImage(items.findIndex(item => item.source === link));
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
    original.removeAttribute('href');
    transcript.open = false;
    transcript.hidden = true;
    transcriptText.textContent = '';
    items = [];
    touchStart = null;
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
})();
