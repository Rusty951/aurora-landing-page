(() => {
  // Chapter hashes own restoration; browser pixel restoration can land in another
  // scene after the viewport height changes.
  history.scrollRestoration = 'manual';
  const body = document.body;
  const journey = document.querySelector('.journey');
  const stage = document.querySelector('.stage');
  const scenes = [...document.querySelectorAll('.scene')];
  const nav = [...document.querySelectorAll('.chapter-nav a')];
  const videos = scenes.map(s => s.querySelector('video'));
  const stills = scenes.map(s => s.querySelector('.product-visual'));
  const touchFilm = document.querySelector('[data-scroll-video]');
  const visuals = scenes.map(s => s.querySelector('video, .product-visual'));
  const media = scenes.map(s => s.querySelector('.media'));
  const copy = scenes.map(s => s.querySelector('.scene-content'));
  const titleLines = scenes.map(s => [...s.querySelectorAll('.title-line > span')]);
  const copyDetails = scenes.map(s => [...s.querySelectorAll('.eyebrow, .support, .story-cta, .chapter-word, .concept-note')]);
  const toggle = document.querySelector('.motion-toggle');
  const next = document.querySelector('.next-scene');
  const modal = document.querySelector('.story');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 700px)');
  let paused = reduced.matches;
  let active = -1;
  let visible = new Set();
  let mediaKey = '';
  let frame = 0;
  let modalOpener;
  let paintedProgress = null;
  let lastFrameTime = 0;
  let jumpToScroll = false;
  let navigationTarget = null;
  let introAnimations = [];
  let introRequest = 0;
  let initialArrival = true;
  const clamp = n => Math.min(1, Math.max(0, n));
  const ease = n => { const x = clamp(n); return x*x*(3-2*x); };
  const between = (n, start, end) => ease((n-start)/(end-start));
  // Each cut has its own rhythm. The bottle gets a contact, reveal, then words.
  const cuts = [
    {start:.42,end:.92,exit:.38,exitEnd:.64,enter:.60,enterEnd:.94},
    {start:.56,end:.81,exit:.42,exitEnd:.62,enter:.77,enterEnd:.97},
    {start:.38,end:.64,exit:.10,exitEnd:.24,enter:.79,enterEnd:.95},
    {start:.56,end:.96,exit:.42,exitEnd:.72,enter:.80,enterEnd:.99}
  ];
  const maxIndex = scenes.length - 1;
  body.classList.add('has-story','is-intro-pending');

  // One typographic gesture per chapter, with the italic line arriving later.
  // Scroll owns the poses; time-based entrances are reserved for a direct arrival.
  const textGestures = [
    {x:0,y:48,scale:1,stagger:.16,duration:1550},
    {x:24,y:0,scale:1,stagger:.20,duration:1400},
    {x:0,y:15,scale:.975,stagger:.14,duration:1500},
    {x:0,y:76,scale:1,stagger:.21,duration:1650},
    {x:0,y:5,scale:.975,stagger:.18,duration:1800}
  ];
  function titlePose(i, n, reveal) {
    const gesture = textGestures[i];
    const remaining = 1 - reveal;
    const x = gesture.x * (n ? 1.35 : 1) * remaining;
    const y = gesture.y * remaining;
    const scale = 1 - (1-gesture.scale)*remaining;
    return {opacity:String(reveal),transform:`translate3d(${x}px,${y}%,0) scale(${scale})`};
  }
  function paintCopy(i, arrival = 1, departure = 0) {
    copy[i].style.opacity = 1-departure;
    copy[i].style.translate = `0 ${-departure*6}px`;
    titleLines[i].forEach((line,n) => {
      const reveal = between(arrival,n*textGestures[i].stagger,n ? 1 : .82);
      Object.assign(line.style,titlePose(i,n,reveal));
    });
    copyDetails[i].forEach((element,n) => {
      const early = element.classList.contains('eyebrow');
      const reveal = between(arrival,early ? 0 : .40+Math.min(n,3)*.05,early ? .45 : 1);
      element.style.opacity = reveal;
      element.style.transform = `translateY(${(1-reveal)*(early ? 4 : 7)}px)`;
    });
  }
  function cancelIntro() {
    initialArrival = false;
    body.classList.remove('is-intro-pending');
    introRequest++;
    introAnimations.forEach(animation=>animation.cancel());
    introAnimations = [];
  }
  function syncTextAnimations() {
    introAnimations.forEach(animation=>{
      if (reduced.matches) animation.cancel();
      else if (paused || document.hidden || modal.open) animation.pause();
      else if (animation.playState === 'paused') animation.play();
    });
  }
  function enterDirectly(i) {
    cancelIntro();
    if (reduced.matches || paused) return;
    const request = introRequest;
    body.classList.add('is-intro-pending');
    document.fonts.ready.then(()=>{
      if (request !== introRequest) return;
      body.classList.remove('is-intro-pending');
      if (active !== i || Math.abs(paintedProgress-i) > .001 || reduced.matches || paused) return;
      const gesture = textGestures[i];
      titleLines[i].forEach((line,n)=>{
        introAnimations.push(line.animate([titlePose(i,n,0),titlePose(i,n,1)],{
          duration:gesture.duration,delay:80+n*180,easing:'cubic-bezier(.20,.65,.25,1)',fill:'backwards'
        }));
      });
      copyDetails[i].forEach((element,n)=>{
        const early = element.classList.contains('eyebrow');
        introAnimations.push(element.animate([
          {opacity:0,transform:`translateY(${early ? 4 : 7}px)`},
          {opacity:1,transform:'translateY(0)'}
        ],{duration:early ? 900 : 1100,delay:early ? 0 : 440+n*70,easing:'cubic-bezier(.20,.65,.25,1)',fill:'backwards'}));
      });
      syncTextAnimations();
    });
  }

  const music = document.querySelector('#background-music');
  const musicToggle = document.querySelector('.music-toggle');
  const musicStatus = document.querySelector('[data-music-status]');
  let musicEnabled = false;
  let musicContext;
  let musicGain;
  let musicRequest = 0;
  let musicStopTimer = 0;
  function musicButtonState() {
    musicToggle.setAttribute('aria-pressed',String(musicEnabled));
    musicToggle.setAttribute('aria-label',musicEnabled ? '배경 음악 끄기' : '배경 음악 켜기');
    musicToggle.textContent = musicEnabled ? '음악 끄기' : '음악 켜기';
  }
  function rampMusic(level,seconds) {
    if (!musicGain) { music.volume = level; return; }
    const now = musicContext.currentTime;
    musicGain.gain.cancelScheduledValues(now);
    musicGain.gain.setValueAtTime(musicGain.gain.value,now);
    musicGain.gain.linearRampToValueAtTime(level,now+seconds);
  }
  function stopMusic(immediate = false) {
    musicRequest++;
    clearTimeout(musicStopTimer);
    musicToggle.removeAttribute('aria-busy');
    rampMusic(0,immediate ? 0 : .65);
    if (immediate) music.pause();
    else musicStopTimer = setTimeout(()=>music.pause(),700);
  }
  async function startMusic() {
    const request = ++musicRequest;
    clearTimeout(musicStopTimer);
    musicToggle.setAttribute('aria-busy','true');
    try {
      if (!musicContext) {
        const AudioEngine = window.AudioContext || window.webkitAudioContext;
        if (AudioEngine) {
          musicContext = new AudioEngine();
          musicGain = musicContext.createGain();
          musicGain.gain.value = 0;
          musicContext.createMediaElementSource(music).connect(musicGain);
          musicGain.connect(musicContext.destination);
        } else music.volume = .16;
      }
      // Start both operations inside the user's click, including on Safari.
      await Promise.all([musicContext?.resume(),music.play()]);
      if (request !== musicRequest) return;
      musicToggle.removeAttribute('aria-busy');
      if (!musicEnabled || document.hidden) { stopMusic(true); return; }
      rampMusic(.16,1.8);
    } catch (error) {
      if (request !== musicRequest) return;
      musicEnabled = false;
      stopMusic(true);
      musicButtonState();
      musicStatus.textContent = '음악을 재생하지 못했습니다. 다시 눌러주세요.';
    }
  }
  musicToggle.addEventListener('click',()=>{
    musicEnabled = !musicEnabled;
    musicStatus.textContent = '';
    musicButtonState();
    if (musicEnabled) startMusic();
    else stopMusic();
  });
  document.addEventListener('visibilitychange',()=>{
    if (document.hidden) stopMusic(true);
    else if (musicEnabled) startMusic();
  });
  addEventListener('pagehide',()=>stopMusic(true));
  addEventListener('pageshow',()=>{if (musicEnabled && !document.hidden) startMusic();});

  function setSource() {
    for (const [i, v] of videos.entries()) {
      if (!v) continue;
      if (!v.dataset.mobile) {
        media[i].style.backgroundImage = `url("${v.poster}")`;
        continue;
      }
      const source = v.querySelector('source');
      const target = compact.matches ? v.dataset.mobile : v.dataset.desktop;
      const poster = compact.matches ? v.dataset.mobilePoster : v.dataset.desktopPoster;
      media[i].style.backgroundImage = `url("${poster}")`;
      if (source.getAttribute('src') === target) continue;
      source.src = target;
      v.poster = poster;
      v.load();
    }
    mediaKey = '';
    schedule();
  }
  function mediaState() {
    const key = [...visible].join(',') + ':' + paused + ':' + document.hidden + ':' + modal.open;
    if (mediaKey === key) return;
    mediaKey = key;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? '배경 움직임 재생' : '배경 움직임 일시 정지');
    toggle.querySelector('[data-motion-label]').textContent = compact.matches
      ? (paused ? '재생' : '정지') : (paused ? '움직임 재생' : '움직임 정지');
    syncTextAnimations();
    videos.forEach((v, i) => {
      const shouldPlay = visible.has(i) && !paused && !document.hidden && !modal.open;
      scenes[i].dataset.mediaState = shouldPlay ? 'running' : 'paused';
      if (!v) return;
      if (v.hasAttribute('data-scroll-video')) { v.pause(); return; }
      if (!shouldPlay) { v.pause(); return; }
      if (v.preload === 'none') { v.preload = 'auto'; v.load(); }
      if (v.ended) v.currentTime = 0;
      v.play().catch(error => {
        if (!visible.has(i) || error.name === 'AbortError') return;
        // A poster remains visible; the explicit control can retry browser autoplay.
        if (error.name === 'NotAllowedError') { paused = true; mediaKey = ''; mediaState(); }
      });
    });
  }
  function rememberLocation(progress) {
    if (navigationTarget !== null || active < 0) return;
    const chapter = scenes[active].id;
    const previous = history.state;
    if (previous?.nocteVersion === 7 && previous.nocteChapter === chapter &&
        Math.abs(previous.nocteProgress - progress) < .0001 && location.hash === `#${chapter}`) return;
    history.replaceState({...previous, nocteVersion:7, nocteChapter:chapter, nocteProgress:progress},'',`#${chapter}`);
  }
  function syncTouch() {
    if (!touchFilm || touchFilm.readyState < 1 || !visible.has(2) || document.hidden || modal.open) return;
    if (paused && !reduced.matches) return;
    const end = Math.max(0, touchFilm.duration - 1/24);
    const desired = reduced.matches ? end : between(paintedProgress,1.72,2.14) * end;
    if (!touchFilm.seeking && Math.abs(touchFilm.currentTime - desired) > 1/24 + .005) {
      touchFilm.currentTime = desired;
    }
  }
  function setActive(i) {
    if (active === i) return;
    active = i;
    body.dataset.theme = scenes[i].dataset.theme;
    scenes.forEach((s, n) => {
      s.classList.toggle('is-active', n === i);
      s.inert = n !== i;
      s.setAttribute('aria-hidden', String(n !== i));
    });
    nav.forEach((a,n) => n === i ? a.setAttribute('aria-current','location') : a.removeAttribute('aria-current'));
    document.querySelector('[data-current-count]').textContent = String(i+1).padStart(2,'0');
    document.querySelector('[data-current-name]').textContent = scenes[i].dataset.label;
    next.setAttribute('aria-label', i === maxIndex ? '처음 장면으로' : '다음 장면');
    next.firstElementChild.textContent = i === maxIndex ? '처음' : '다음';
    if (document.activeElement?.closest('.scene')?.inert) nav[i].focus({preventScroll:true});
    rememberLocation(paintedProgress);
  }
  function render(now = performance.now()) {
    frame = 0;
    const travel = journey.offsetHeight - stage.offsetHeight;
    const target = clamp((scrollY - journey.offsetTop) / Math.max(1, travel)) * maxIndex;
    if ((introAnimations.length || !initialArrival && body.classList.contains('is-intro-pending')) && Math.abs(target-active) > .002) cancelIntro();
    if (initialArrival && (reduced.matches || Math.abs(target-Math.round(target)) > .001)) cancelIntro();
    const elapsed = Math.min(64, Math.max(16, now - lastFrameTime));
    lastFrameTime = now;
    if (paintedProgress === null || reduced.matches || jumpToScroll) {
      paintedProgress = target;
      jumpToScroll = false;
    } else {
      paintedProgress += (target - paintedProgress) * (1 - Math.exp(-elapsed / 95));
      if (Math.abs(target - paintedProgress) < .0002) paintedProgress = target;
    }
    const base = Math.min(maxIndex, Math.floor(paintedProgress));
    const phase = paintedProgress - base;
    const cut = cuts[base] || cuts[3];
    const transition = between(phase,cut.start,cut.end);
    const selected = Math.min(maxIndex, base + (transition > .5 ? 1 : 0));
    setActive(selected);
    visible = new Set();
    scenes.forEach((s, i) => {
      s.style.zIndex = i+1;
      s.style.clipPath = 'none';
      const isCurrent = i === base;
      const isNext = i === base+1 && transition > 0;
      const initialScale = stills[i] ? 1.01 : 1.025;
      const scaleTravel = stills[i] ? .015 : .035;
      const panTravel = stills[i] ? 0 : .35;
      if (reduced.matches) {
        s.style.opacity = i === selected ? 1 : 0;
        media[i].style.transform = 'none';
        visuals[i].style.filter = 'none';
        paintCopy(i);
        if (i === selected) visible.add(i);
        return;
      }
      // The outgoing film stays opaque underneath, so the viewport never opens up.
      s.style.opacity = isCurrent ? 1 : isNext ? transition : 0;
      if (isCurrent) {
        const drift = ease(phase);
        media[i].style.transform = `translate3d(${-drift*panTravel}%, ${-drift*panTravel*.58}%, 0) scale(${initialScale + drift*scaleTravel})`;
        visuals[i].style.filter = 'none';
        const wordsOut = between(phase,cut.exit,cut.exitEnd);
        paintCopy(i,i === 0 ? 1-wordsOut : 1,wordsOut);
        visible.add(i);
      } else if (isNext) {
        media[i].style.transform = `translate3d(${(1-transition)*panTravel}%, ${(1-transition)*panTravel*.58}%, 0) scale(${initialScale + (1-transition)*scaleTravel})`;
        visuals[i].style.filter = 'none';
        paintCopy(i,clamp((phase-cut.enter)/(cut.enterEnd-cut.enter)));
        visible.add(i);
      }
      // An opaque reveal keeps the bottle crisp at every intermediate scroll position.
      if (base === 2 && i === 2) {
        const approach = between(phase,0,.38);
        media[i].style.transform = `scale(${1.025 + approach*.025})`;
        visuals[i].style.filter = 'none';
        paintCopy(i,1,between(phase,.10,.24));
      }
      if (base === 2 && i === 3 && isNext) {
        s.style.opacity = 1;
        s.style.clipPath = `inset(0 0 0 ${(1-transition)*100}%)`;
        const settle = between(phase,.38,.79);
        media[i].style.transform = `scale(${1.01 + (1-settle)*.035})`;
        visuals[i].style.filter = 'none';
        paintCopy(i,clamp((phase-.79)/(.95-.79)));
      }
    });
    document.querySelector('.progress span').style.width = `${paintedProgress/maxIndex*100}%`;
    mediaState();
    syncTouch();
    if (paintedProgress === target) {
      if (navigationTarget !== null && Math.abs(target-navigationTarget) < .001) navigationTarget = null;
      rememberLocation(target);
    }
    if (paintedProgress !== target) schedule();
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(render); }
  function go(i, historyMode = 'push') {
    const index = Math.max(0,Math.min(maxIndex,i));
    cancelIntro();
    if (historyMode === 'push') {
      rememberLocation(paintedProgress ?? 0);
      history.pushState({nocteVersion:7,nocteChapter:scenes[index].id,nocteProgress:index},'',`#${scenes[index].id}`);
    }
    moveTo(index, historyMode === 'restore');
  }
  function moveTo(progress, instant = false) {
    const travel = journey.offsetHeight - stage.offsetHeight;
    const top = journey.offsetTop + travel/maxIndex*progress;
    navigationTarget = progress;
    if (instant) jumpToScroll = true;
    window.scrollTo({top,behavior:reduced.matches || instant ? 'instant' : 'smooth'});
    schedule();
  }
  document.querySelector('.skip').addEventListener('click', event => {
    event.preventDefault();
    scenes[Math.max(0, active)].querySelector('.display').focus({preventScroll:true});
  });
  document.querySelectorAll('a[href^="#"]:not(.skip)').forEach(a => a.addEventListener('click', event => {
    const i = scenes.findIndex(s=>`#${s.id}` === a.getAttribute('href'));
    if (i < 0) return;
    event.preventDefault(); go(i);
  }));
  document.querySelectorAll('.story-cta').forEach(button => {
    let glowFrame = 0;
    let pointer;
    const followLight = event => {
      if (event.pointerType === 'touch' || reduced.matches) return;
      pointer = {x:event.clientX,y:event.clientY};
      if (glowFrame) return;
      glowFrame = requestAnimationFrame(() => {
        const bounds = button.getBoundingClientRect();
        button.style.setProperty('--glow-x', `${pointer.x-bounds.left}px`);
        button.style.setProperty('--glow-y', `${pointer.y-bounds.top}px`);
        glowFrame = 0;
      });
    };
    button.addEventListener('pointerenter',followLight);
    button.addEventListener('pointermove',followLight,{passive:true});
    button.addEventListener('pointerleave',()=>{
      cancelAnimationFrame(glowFrame);
      glowFrame = 0;
    });
  });
  next.addEventListener('click',()=>go(active === maxIndex ? 0 : active+1));
  toggle.addEventListener('click',()=>{paused=!paused;mediaKey='';mediaState();schedule();});
  addEventListener('scroll',schedule,{passive:true});
  for (const event of ['wheel','touchstart','pointerdown']) {
    addEventListener(event,()=>{navigationTarget=null;cancelIntro();},{passive:true});
  }
  addEventListener('resize',()=>{
    if (paintedProgress !== null) {
      moveTo(navigationTarget ?? paintedProgress,true);
    }
    schedule();
  },{passive:true});
  document.addEventListener('visibilitychange',()=>{mediaState();schedule();});
  compact.addEventListener('change',setSource);
  reduced.addEventListener('change',()=>{cancelIntro();paused=reduced.matches;mediaKey='';schedule();});
  function restoreHash() {
    if (!initialArrival) cancelIntro();
    const i = scenes.findIndex(s=>`#${s.id}`===location.hash);
    const saved = history.state;
    const hasPosition = saved?.nocteVersion === 7 && saved.nocteChapter === scenes[i]?.id &&
      Number.isFinite(saved.nocteProgress) && saved.nocteProgress >= 0 && saved.nocteProgress <= maxIndex;
    moveTo(hasPosition ? saved.nocteProgress : Math.max(0,i),true);
  }
  addEventListener('popstate',restoreHash);
  addEventListener('hashchange',restoreHash);
  addEventListener('keydown',event=>{
    if (modal.open || event.altKey || event.ctrlKey || event.metaKey || event.target.closest('input,textarea,select,[contenteditable=true]')) return;
    let target;
    if(event.key==='PageDown') target=Math.min(maxIndex,active+1);
    if(event.key==='PageUp') target=Math.max(0,active-1);
    if(event.key==='Home') target=0;
    if(event.key==='End') target=maxIndex;
    if(target !== undefined){event.preventDefault();go(target);}
    else if(['ArrowUp','ArrowDown',' '].includes(event.key)) navigationTarget=null;
  });
  document.querySelector('[data-open-story]').addEventListener('click',event=>{
    modalOpener=event.currentTarget; modal.showModal();
    modal.querySelector('.story-body').scrollTop=0; mediaState();
  });
  document.querySelector('.story-close').addEventListener('click',()=>modal.close());
  modal.addEventListener('click',event=>{if(event.target===modal){const r=modal.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)modal.close();}});
  modal.addEventListener('close',()=>{mediaKey='';mediaState();schedule();modalOpener?.focus();});
  for (const event of ['loadeddata','seeked']) touchFilm?.addEventListener(event,schedule);
  videos.filter(v => v?.dataset.start).forEach(v => {
    v.addEventListener('loadedmetadata', () => {
      v.currentTime = Math.min(Number(v.dataset.start), Math.max(0, v.duration-.1));
    }, {once:true});
  });
  setSource(); restoreHash(); render();
  // Restore first, then introduce a directly opened chapter once fonts are ready.
  addEventListener('pageshow',()=>{
    const introduce = initialArrival;
    restoreHash();
    requestAnimationFrame(()=>{
      if (introduce && initialArrival && Math.abs(paintedProgress-active) < .001) enterDirectly(active);
      else cancelIntro();
    });
  },{once:true});
  requestAnimationFrame(()=>{if(document.readyState !== 'complete') restoreHash();});
})();
