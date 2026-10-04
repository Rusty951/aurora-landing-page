(() => {
  'use strict';
  const flowFilm = document.body.dataset.film === 'flow';
  const journeyFilm = document.body.dataset.film === 'flow-journey';
  const names = flowFilm ? ['room', 'light', 'threshold', 'terrace', 'horizon'] : ['arrival', 'courtyard', 'lobby', 'room', 'terrace'];
  const scrollLabel = journeyFilm ? '스크롤로 걷기' : '스크롤하며 둘러보기';
  const labels = flowFilm ? ['객실', '빛', '문턱', '테라스', '바다'] : ['접근로', '중정', '로비', '객실', '테라스'];
  const descriptions = journeyFilm ? ['중앙 접근로와 열린 목재 입구, 오른편 중정 나무', '밝은 석재 중정에서 이어지는 열린 호텔 입구', '짙은 목재 콘솔을 지나 객실 입구로 향하는 로비', '오른편 리넨 침대와 왼편 열린 바다 통로', '밝은 석재 테라스와 낮은 유리 난간, 바다와 해안'] : flowFilm ? ['햇빛이 드는 리넨 침대와 바다 쪽 전면 유리창', '객실의 침대와 유리창 위로 내려앉은 오후 햇빛', '객실에서 목재 테라스로 이어지는 열린 통로', '나무 데크와 두 개의 의자, 해안 풍경', '두 의자와 난간 너머로 펼쳐진 바다'] : ['석회빛 벽과 짙은 목재 입구를 가진 낮은 해안 호텔', '중정에서 목재 문틀 너머로 이어지는 호텔 입구', '낮은 리넨 소파와 석재 테이블을 둔 로비', '리넨 침대와 바다 쪽 테라스가 이어지는 객실', '목재 의자와 낮은 난간 너머로 바다를 바라보는 테라스'];
  const anchors = journeyFilm ? [0, .12, .45, .76, 1] : flowFilm ? [0, .20, .40, .72, 1] : [0, .27, .38, .67, 1];
  const boundaries = journeyFilm ? [.10, 8/26, 2/3, .85] : flowFilm ? [.12, .32, .58, .84] : [.20, .38, .58, .82];
  const track = document.querySelector('#scroll-track');
  const stage = document.querySelector('#stage');
  const canvas = document.querySelector('#film');
  const context = canvas.getContext('2d', { alpha: false });
  const copies = [...document.querySelectorAll('[data-scene]')];
  const chapterLinks = [...document.querySelectorAll('[data-chapter]')];
  const modeButton = document.querySelector('#mode');
  const continueButton = document.querySelector('#continue');
  const dialog = document.querySelector('#room-dialog');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const total = journeyFilm ? 576 : flowFilm ? 192 : 481;
  stage.dataset.frameCount = String(total);
  stage.dataset.source = journeyFilm ? "flow-full-journey" : flowFilm ? "flow-trial2" : "blender-journey";
  // Decode only a small moving window. 481 simultaneous full-size bitmaps
  // would consume more than a gigabyte on mobile.
  const decoded = new Map();
  const pending = new Map();
  const fallbackNames = journeyFilm ? ['flow-journey/poster', 'flow-journey/courtyard', 'flow-journey/lobby', 'flow-journey/room', 'flow-journey/terrace'] : flowFilm ? ['flow/poster', 'flow/light', 'flow/threshold', 'flow/terrace', 'flow/horizon'] : ['poster', 'courtyard', 'lobby', 'room', 'terrace'];
  let viewportW = 0, viewportH = 0;
  let target = 0, progress = 0, currentScene = -1, lastDrawn = -1;
  let wantedFrame = 0, raf = 0, generation = 0;
  let scenesOnly = reduced.matches, mediaFailed = false, roomTrigger = null;
  let lockedScroll = 0, userSelectedMode = false, requested = 0;

  const clamp = value => Math.max(0, Math.min(1, value));
  const frameFor = value => Math.round(clamp(value) * (total - 1));
  // Native scroll offsets round to pixels; tolerate that rounding at a chapter.
  const sceneFor = value => boundaries.reduce((index, boundary) => index + (value + .0002 >= boundary), 0);
  const mediaVersion = journeyFilm ? 'journey-1' : flowFilm ? 'flow-1' : '1';
  const frameURL = index => `assets/${journeyFilm ? "flow-journey/frames" : flowFilm ? "flow/frames" : "frames"}/${String(index).padStart(4, '0')}.webp?v=${mediaVersion}`;
  const range = () => Math.max(1, track.offsetHeight - innerHeight);
  const scrollTarget = () => clamp((scrollY - track.offsetTop) / range());

  async function loadFrame(index) {
    if (decoded.has(index)) {
      const bitmap = decoded.get(index); decoded.delete(index); decoded.set(index, bitmap);
      return bitmap;
    }
    if (pending.has(index)) return pending.get(index);
    const promise = (async () => {
      let response = await fetch(frameURL(index));
      // A staged render may have returned a cacheable 404 before export.
      // Revalidate failed responses before switching to the still-image mode.
      if (!response.ok) response = await fetch(frameURL(index), { cache: 'reload' });
      if (!response.ok) throw new Error(`Frame ${index}: HTTP ${response.status}`);
      const bitmap = await createImageBitmap(await response.blob());
      decoded.set(index, bitmap);
      while (decoded.size > (journeyFilm ? (innerWidth < 800 ? 6 : 12) : 18)) {
        const key = decoded.keys().next().value;
        // A wanted frame must remain available until its draw has completed.
        if (key === wantedFrame) { const item = decoded.get(key); decoded.delete(key); decoded.set(key, item); continue; }
        // An awaiting painter can still hold this bitmap after cache eviction.
        // Let its final reference be collected instead of closing it early.
        decoded.delete(key);
      }
      return bitmap;
    })();
    pending.set(index, promise);
    try { return await promise; } finally { pending.delete(index); }
  }

  function cover(bitmap) {
    const scale = Math.max(viewportW / bitmap.width, viewportH / bitmap.height);
    const width = bitmap.width * scale, height = bitmap.height * scale;
    // Keep the bed and terrace chair in the portrait crop. This reframing is
    // applied to the same physical source camera, without swapping spaces.
    let focus = .5;
    if (viewportW / viewportH < .8) {
      const points = journeyFilm ? [[0,.5],[.32,.5],[.45,1],[.54,.5],[.64,.5],[.72,.7],[.78,.72],[.833,.22],[.92,.5],[1,.5]] : flowFilm ? [[0,.28],[.35,.45],[.72,.48],[1,.45]] : [[0,.5],[.58,.5],[.67,.32],[.76,.5],[.85,.5],[1,.12]];
      const i = Math.max(0, points.findIndex((point, i) => i > 0 && progress <= point[0]) - 1);
      const a = points[i], b = points[i + 1];
      const t = clamp((progress - a[0]) / (b[0] - a[0]));
      focus = a[1] + (b[1] - a[1]) * t;
    }
    context.drawImage(bitmap, (viewportW - width) * focus, (viewportH - height) / 2, width, height);
  }

  async function paintFrame(index) {
    wantedFrame = index;
    const token = ++requested;
    if (index === lastDrawn) return;
    try {
      const bitmap = await loadFrame(index);
      if (token !== requested || index !== wantedFrame || scenesOnly || mediaFailed) return;
      cover(bitmap); lastDrawn = index;
      stage.dataset.frame = String(index);
      stage.classList.add('is-loaded');
      document.querySelector('#loading').hidden = true;
      // Adjacent frames prepare smooth movement and immediate reverse scrolling.
      const direction = index >= (Number(stage.dataset.previousFrame) || 0) ? 1 : -1;
      stage.dataset.previousFrame = String(index);
      for (const delta of [direction, -direction, direction * 2, direction * 3]) {
        const next = index + delta;
        if (next >= 0 && next < total && pending.size < (journeyFilm && innerWidth < 800 ? 4 : 7)) loadFrame(next).catch(() => {});
      }
    } catch (error) {
      if (token !== requested || index !== wantedFrame) return;
      console.warn('SEAM frame unavailable', index, error.message);
      mediaFailed = true;
      document.querySelector('#media-error').hidden = false;
      setMode(true, true);
    }
  }

  function setScene(index) {
    if (index === currentScene) return;
    currentScene = index;
    if (journeyFilm) {
      document.body.classList.toggle('is-ending', index === 4);
      continueButton.hidden = index === 4;
      document.querySelector('.header [data-room]').hidden = index === 4;
    }
    copies.forEach((copy, i) => {
      const active = i === index;
      copy.classList.toggle('is-current', active);
      copy.inert = !active;
      copy.setAttribute('aria-hidden', String(!active));
    });
    chapterLinks.forEach((link, i) => i === index ? link.setAttribute('aria-current', 'step') : link.removeAttribute('aria-current'));
    document.querySelector('#chapter-number').textContent = String(index + 1).padStart(2, '0');
    document.querySelector('#continue-label').textContent = scenesOnly ? (index === 4 ? '처음부터 둘러보기' : `다음, ${labels[index + 1]}`) : (index === 4 ? '처음부터 둘러보기' : scrollLabel);
    if (journeyFilm) document.querySelector('#continue-icon').src = `assets/icons/${index === 4 ? 'rotate-ccw' : 'arrow-down'}.svg`;
    else continueButton.querySelector('.down-arrow').textContent = index === 4 ? '↶' : '↓';
    const hash = `#${names[index]}`;
    if (location.hash !== hash) history.replaceState(null, '', hash);
    stage.dataset.scene = names[index];
    document.querySelector('.poster').alt = descriptions[index];
  }

  function paint() {
    raf = 0;
    const delta = target - progress;
    progress = Math.abs(delta) < .00015 ? target : progress + delta * .21;
    if (scenesOnly) progress = target;
    setScene(sceneFor(progress));
    document.querySelector('#progress-fill').style.transform = `scaleX(${progress})`;
    stage.dataset.progress = progress.toFixed(6);
    if (!scenesOnly) paintFrame(frameFor(progress));
    if (Math.abs(target - progress) > .00001) raf = requestAnimationFrame(paint);
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(paint); }
  function jump(index, smooth = true) {
    if (scenesOnly) {
      target = anchors[index]; progress = target;
      setScene(index); showStill(index); schedule();
    } else window.scrollTo({ top: track.offsetTop + anchors[index] * range(), behavior: smooth && !reduced.matches ? 'smooth' : 'instant' });
  }
  async function showStill(index) {
    const token = ++generation;
    const url = `assets/${fallbackNames[index]}.webp?v=${mediaVersion}${journeyFilm && index === 1 ? "-courtyard-2" : ""}`;
    if (!context || !('createImageBitmap' in window)) {
      const poster = document.querySelector('.poster');
      poster.src = url;
      poster.style.objectPosition = `${journeyFilm ? (index === 3 ? 70 : 50) : index === 4 ? 12 : index === 3 ? 32 : 50}% center`;
      stage.classList.remove('is-loaded');
      document.querySelector('#loading').hidden = true;
      return;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Poster unavailable');
      const image = await createImageBitmap(await response.blob());
      if (token === generation && scenesOnly) { cover(image); stage.classList.add('is-loaded'); stage.dataset.frame = String(frameFor(anchors[index])); document.querySelector('#loading').hidden = true; }
      image.close();
    } catch (_) { stage.classList.remove('is-loaded'); document.querySelector('#loading').hidden = true; }
  }
  function setMode(enabled, auto = false) {
    const preserve = Math.max(0, currentScene);
    scenesOnly = enabled;
    if (!enabled && mediaFailed && 'createImageBitmap' in window && context) {
      mediaFailed = false;
      document.querySelector('#media-error').hidden = true;
    }
    if (!auto) userSelectedMode = true;
    document.body.classList.toggle('scene-mode', enabled);
    updateModeLabel(enabled);
    modeButton.setAttribute('aria-pressed', String(enabled));
    // Switching modes retains the chapter. Scene mode intentionally uses
    // stationary images to honour reduced motion and slower connections.
    jump(preserve, false);
    lastDrawn = -1;
    document.querySelector('#continue-label').textContent = enabled ? (preserve === 4 ? '처음부터 둘러보기' : `다음, ${labels[preserve + 1]}`) : (preserve === 4 ? '처음부터 둘러보기' : scrollLabel);
  }
  function resize() {
    const dpi = Math.min(devicePixelRatio || 1, 1.5);
    viewportW = Math.round(stage.clientWidth * dpi);
    viewportH = Math.round(stage.clientHeight * dpi);
    canvas.width = viewportW; canvas.height = viewportH;
    lastDrawn = -1;
    if (scenesOnly) showStill(Math.max(0, currentScene));
    else { target = scrollTarget(); schedule(); }
  }

  window.addEventListener('scroll', () => { if (!scenesOnly && !dialog.open) { target = scrollTarget(); schedule(); } }, { passive: true });
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('hashchange', () => { const index = names.indexOf(location.hash.slice(1)); if (index >= 0) jump(index, false); });
  reduced.addEventListener('change', () => { if (!userSelectedMode) setMode(reduced.matches, true); });
  chapterLinks.forEach((link, index) => link.addEventListener('click', event => { event.preventDefault(); jump(index); }));
  document.querySelector('.wordmark').addEventListener('click', event => { event.preventDefault(); jump(0); });
  modeButton.addEventListener('click', () => setMode(!scenesOnly));
  continueButton.addEventListener('click', () => jump(currentScene === 4 ? 0 : currentScene + 1));
  document.querySelector('#restart').addEventListener('click', () => jump(0));
  document.addEventListener('keydown', event => {
    if (dialog.open || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target.closest('button,a,input,textarea,select')) return;
    if (scenesOnly && ['ArrowDown','PageDown',' ','ArrowUp','PageUp','Home','End'].includes(event.key)) {
      event.preventDefault();
      jump(event.key === 'Home' ? 0 : event.key === 'End' ? 4 : Math.max(0, Math.min(4, currentScene + (['ArrowUp','PageUp'].includes(event.key) ? -1 : 1))));
    }
  });
  document.querySelectorAll('[data-room]').forEach(button => button.addEventListener('click', () => {
    roomTrigger = button; lockedScroll = scrollY;
    document.body.style.top = `-${lockedScroll}px`; document.body.style.position = 'fixed'; document.body.style.width = '100%';
    dialog.showModal(); dialog.scrollTop = 0;
  }));
  const closeRoom = () => dialog.close();
  document.querySelector('.close-dialog').addEventListener('click', closeRoom);
  document.querySelector('.return-button').addEventListener('click', closeRoom);
  dialog.addEventListener('close', () => {
    document.body.style.position = ''; document.body.style.top = ''; document.body.style.width = '';
    window.scrollTo({ top: lockedScroll, behavior: 'instant' });
    roomTrigger?.focus({ preventScroll: true });
    if (!scenesOnly) { target = scrollTarget(); schedule(); }
  });
  if (!('createImageBitmap' in window) || !context) { mediaFailed = true; scenesOnly = true; modeButton.disabled = true; }
  document.body.classList.toggle('scene-mode', scenesOnly);
  function updateModeLabel(enabled) {
    const label = enabled ? '스크롤로 보기' : '장면으로 보기';
    if (journeyFilm) {
      modeButton.querySelector('[data-mode-label]').textContent = label;
      modeButton.querySelector('.mode-icon').src = `assets/icons/${enabled ? 'play' : 'pause'}.svg`;
      modeButton.title = label;
    } else modeButton.textContent = label;
  }
  updateModeLabel(scenesOnly);
  modeButton.setAttribute('aria-pressed', String(scenesOnly));
  const initial = Math.max(0, names.indexOf(location.hash.slice(1)));
  resize(); jump(initial, false);
  if (!scenesOnly) { target = scrollTarget(); progress = target; schedule(); }
})();
