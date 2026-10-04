/* Presentation only. The existing scroll renderer owns the camera and navigation. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-letter-reveal]').forEach(line => {
    const chars = [...line.textContent];
    line.textContent = '';
    chars.forEach((char, i) => {
      const glyph = document.createElement('span');
      glyph.className = 'type-glyph';
      glyph.textContent = char === ' ' ? '\u00a0' : char;
      glyph.style.setProperty('--glyph', i);
      line.append(glyph);
    });
  });
  document.querySelectorAll('.light-button').forEach(button => {
    button.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' || reduced.matches) return;
      const rect = button.getBoundingClientRect();
      button.style.setProperty('--shine-x', `${event.clientX - rect.left}px`);
      button.style.setProperty('--shine-y', `${event.clientY - rect.top}px`);
    }, { passive: true });
  });
  const music = document.querySelector('#background-music');
  const toggle = document.querySelector('#music-toggle');
  const status = document.querySelector('#music-status');
  let enabled = true;
  let context;
  let gain;
  let request = 0;
  let stopTimer;
  const level = .045;
  function musicState(state) {
    toggle.dataset.state = state;
    toggle.setAttribute('aria-pressed', String(enabled));
    const waiting = enabled && (state === 'waiting' || state === 'suspended');
    const loading = enabled && state === 'loading';
    const label = waiting ? '음악 대기' : loading ? '음악 준비' : enabled ? '음악 끄기' : '음악 켜기';
    toggle.setAttribute('aria-label', waiting ? '자동 음악 시작 끄기' : loading ? '음악 시작 취소' : enabled ? '배경 음악 끄기' : '배경 음악 켜기');
    toggle.querySelector('[data-music-label]').textContent = label;
    toggle.title = waiting ? '첫 클릭이나 터치 후 음악이 시작됩니다. 눌러서 끌 수 있습니다.' : label;
    if (waiting) toggle.removeAttribute('aria-busy');
  }
  function fade(value, seconds) {
    if (!gain) { music.volume = value; return; }
    const now = context.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(value, now + seconds);
  }
  function stop(immediate = false) {
    request++;
    clearTimeout(stopTimer);
    toggle.removeAttribute('aria-busy');
    fade(0, immediate ? 0 : .7);
    if (immediate) music.pause();
    else stopTimer = setTimeout(() => music.pause(), 750);
    musicState(enabled ? 'suspended' : 'off');
  }
  async function start() {
    const current = ++request;
    clearTimeout(stopTimer);
    toggle.setAttribute('aria-busy', 'true');
    musicState('loading');
    try {
      if (!context) {
        const AudioEngine = window.AudioContext || window.webkitAudioContext;
        if (AudioEngine) {
          context = new AudioEngine();
          gain = context.createGain();
          gain.gain.value = 0;
          context.createMediaElementSource(music).connect(gain);
          gain.connect(context.destination);
        } else music.volume = level;
      }
      // Try on entry. If the browser requires activation, a real click/tap/key retries.
      // resume() may stay pending until activation, so keep that state retryable.
      if (context && context.state !== 'running') musicState('waiting');
      await Promise.all([context?.resume(), music.play()]);
      if (current !== request) return;
      toggle.removeAttribute('aria-busy');
      if (!enabled || document.hidden) { stop(true); return; }
      fade(level, 2.8);
      musicState('playing');
    } catch (error) {
      if (current !== request) return;
      if (error.name === 'NotAllowedError') {
        stop(true);
        musicState('waiting');
        return;
      }
      enabled = false;
      stop(true);
      status.textContent = '음악을 불러오지 못했습니다. 다시 눌러주세요.';
    }
  }
  toggle.addEventListener('click', () => {
    enabled = !enabled;
    status.textContent = '';
    if (enabled) start();
    else stop();
  });
  function unlockMusic(event) {
    if (!event.isTrusted || !enabled || document.hidden) return;
    if (event.target.closest?.('#music-toggle')) return;
    if (event.type === 'keydown' && (event.repeat || event.metaKey || event.ctrlKey || event.altKey)) return;
    if (toggle.dataset.state === 'waiting' || toggle.dataset.state === 'suspended') start();
  }
  document.addEventListener('pointerup', unlockMusic, { passive: true });
  document.addEventListener('keydown', unlockMusic);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(true);
    else if (enabled) start();
  });
  addEventListener('pagehide', () => stop(true));
  addEventListener('pageshow', event => { if (event.persisted && enabled && !document.hidden) start(); });
  musicState('waiting');
  if (!document.hidden) start();

  const dialog = document.querySelector('#room-dialog');
  const observed = [...dialog.querySelectorAll('figure, .detail-interlude')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-seen');
        observer.unobserve(entry.target);
      }
    }), { root: dialog, threshold: .10 });
    observed.forEach(item => { item.classList.add('will-reveal'); observer.observe(item); });
  }
})();
