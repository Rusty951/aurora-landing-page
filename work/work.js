(() => {
  const controls = document.querySelector('.work-controls');
  if (!controls) return;
  const filters = controls.querySelector('.work-filters');
  const videoFilters = controls.querySelector('.work-video-filters');
  const kindButtons = [...controls.querySelectorAll('.work-kinds button')];
  const cards = [...document.querySelectorAll('.work-card')];
  const count = document.getElementById('work-count');
  const title = document.getElementById('work-section-title');
  const hint = document.getElementById('work-hint');
  const sketches = document.getElementById('work-sketches');
  const curated = document.getElementById('work-curated');
  const websites = document.getElementById('work-websites');
  const videos = document.getElementById('work-videos');
  const videoGroups = [...document.querySelectorAll('.work-video-group')];
  const curatedCount = document.getElementById('work-curated-count');
  const sketchCount = document.getElementById('work-sketch-count');
  const gallery = document.getElementById('gallery');
  const labels = {images:'광고 이미지와 제품 비주얼', food:'푸드', product:'제품', brand:'브랜드', carousel:'인스타', character:'캐릭터', website:'웹사이트 샘플', videos:'영상', 'video-long':'롱폼 영상', 'video-short':'숏폼 영상'};
  const hasVideos = cards.some(card => card.dataset.category === 'video');
  let activeFilter = 'images';
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
  const visibleCards = () => cards.filter(card => !card.hidden && (card.dataset.collection !== 'sketch' || sketches.open));
  const updateCount = () => {
    const total = cards.filter(card => !card.hidden).length;
    const visible = visibleCards().length;
    count.textContent = `${activeFilter === 'website' ? '웹사이트' : activeFilter.startsWith('video') ? '영상' : '이미지'} ${total}개${visible < total ? ` / ${visible}개 표시, 스케치 ${total - visible}개 접힘` : ''}`;
  };
  sketches.addEventListener('toggle', updateCount);
  const applyFilter = (value) => {
    if (!Object.hasOwn(labels, value)) value = 'images';
    if (value.startsWith('video')) {
      if (!hasVideos) value = 'images';
      else if (value !== 'videos' && !cards.some(card => card.dataset.category === 'video' && card.dataset.format === value.slice(6))) value = 'videos';
    }
    activeFilter = value;
    const website = value === 'website';
    const video = value.startsWith('video');
    kindButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === (website ? 'website' : video ? 'videos' : 'images'))));
    [...filters.querySelectorAll('button')].forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === value)));
    if (videoFilters) {
      videoFilters.hidden = !video;
      [...videoFilters.querySelectorAll('button')].forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === value)));
    }
    filters.hidden = website || video;
    cards.forEach(card => {
      card.hidden = value === 'images' ? ['website', 'video'].includes(card.dataset.category)
        : video ? card.dataset.category !== 'video' || (value !== 'videos' && card.dataset.format !== value.slice(6))
        : card.dataset.category !== value;
    });
    sketches.open = false;
    const matchingSketches = cards.filter(card => !card.hidden && card.dataset.collection === 'sketch').length;
    sketches.hidden = matchingSketches === 0;
    curated.hidden = website || video;
    websites.hidden = !website;
    if (videos) videos.hidden = !video;
    videoGroups.forEach(group => { group.hidden = !video || (value !== 'videos' && group.dataset.videoFormat !== value.slice(6)); });
    curatedCount.textContent = cards.filter(card => !card.hidden && card.dataset.collection !== 'sketch').length;
    sketchCount.textContent = matchingSketches;
    updateCount();
    title.textContent = labels[value];
    hint.textContent = website ? '썸네일을 누르면 샘플 사이트가 새 탭으로 열립니다.' : video ? '썸네일을 누르면 유튜브 영상이 새 탭으로 열립니다.' : '이미지를 누르면 더 크게 볼 수 있습니다.' + (matchingSketches > 0 ? ' 콘셉트 스케치는 아래에서 펼쳐볼 수 있습니다.' : '');
    measureControls();
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
    window.scrollTo({top:gallery.getBoundingClientRect().top + window.scrollY - (header?.getBoundingClientRect().height || 92), behavior:'instant'});
  });
  const dialog = document.querySelector('.work-lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const image = document.getElementById('work-lightbox-image');
  const imageTitle = document.getElementById('work-lightbox-title');
  const badge = document.getElementById('work-lightbox-badge');
  const detail = document.getElementById('work-lightbox-detail');
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
  document.getElementById('work-grid').addEventListener('click', (event) => {
    const link = event.target.closest('a[data-full-image]');
    if (!link || event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!dialog.isConnected || dialog.open) return;
    const available = visibleCards().map(card => card.querySelector('a[data-full-image]')).filter(Boolean);
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
