(() => {
  const section = document.getElementById('work-websites');
  if (!section || typeof window.matchMedia !== 'function' || typeof IntersectionObserver !== 'function') return;
  const cards = [...section.querySelectorAll('.work-card')];
  if (!cards.length || typeof cards[0].animate !== 'function') return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 701px)');
  const seen = new Set();
  const animations = new Map();
  const drift = new Map();
  let observer;
  let active = false;
  let frame = 0;

  const resetDrift = card => {
    drift.delete(card);
    card.style.removeProperty('--work-drift');
  };
  const cancelAnimations = () => {
    animations.forEach(animation => animation.cancel());
    animations.clear();
  };
  const update = () => {
    frame = 0;
    if (!active || section.hidden || document.hidden) return;
    cards.forEach((card, index) => {
      if (!desktop.matches || card.contains(document.activeElement)) {
        resetDrift(card);
        return;
      }
      if (animations.has(card)) return;
      const rect = card.getBoundingClientRect();
      if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;
      // Subtract the previous translation so repeated frames do not feed back.
      const center = rect.top - (drift.get(card) || 0) + rect.height / 2;
      const progress = Math.max(-1, Math.min(1, (center - window.innerHeight / 2) / window.innerHeight));
      const amount = progress * (index % 2 ? 18 : 10);
      drift.set(card, amount);
      card.style.setProperty('--work-drift', `${amount.toFixed(2)}px`);
    });
  };
  const schedule = () => {
    if (active && !section.hidden && !document.hidden && !frame) frame = window.requestAnimationFrame(update);
  };
  const reveal = card => {
    if (seen.has(card)) return;
    seen.add(card);
    observer.unobserve(card);
    if (card.contains(document.activeElement)) return;
    const animation = card.animate([
      {opacity:0.45, transform:desktop.matches ? 'perspective(1000px) translateY(24px) rotateX(5deg) scale(.985)' : 'translateY(12px)'},
      {opacity:1, transform:desktop.matches ? 'perspective(1000px) translateY(0) rotateX(0) scale(1)' : 'translateY(0)'}
    ], {
      duration:desktop.matches ? 650 : 480,
      delay:desktop.matches && cards.indexOf(card) % 2 ? 70 : 0,
      easing:'cubic-bezier(.22,1,.36,1)'
    });
    animations.set(card, animation);
    animation.finished.then(() => {
      if (animations.get(card) === animation) animations.delete(card);
      schedule();
    }).catch(() => { /* Cancellation restores the normal, visible card. */ });
  };
  const configure = () => {
    active = false;
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    observer?.disconnect();
    cancelAnimations();
    cards.forEach(resetDrift);
    section.classList.remove('work-motion-active');
    if (reduced.matches) return;
    active = true;
    section.classList.add('work-motion-active');
    observer = new IntersectionObserver(entries => {
      if (!active || reduced.matches || section.hidden) return;
      entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target); });
      schedule();
    }, {threshold:0.08, rootMargin:'0px 0px -24px 0px'});
    cards.forEach(card => { if (!seen.has(card)) observer.observe(card); });
    schedule();
  };
  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', schedule, {passive:true});
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimations();
    else schedule();
  });
  section.addEventListener('focusin', event => {
    const card = event.target.closest('.work-card');
    if (!card) return;
    animations.get(card)?.cancel();
    animations.delete(card);
    resetDrift(card);
  });
  section.addEventListener('focusout', schedule);
  reduced.addEventListener('change', configure);
  desktop.addEventListener('change', () => {
    cancelAnimations();
    cards.forEach(resetDrift);
    schedule();
  });
  configure();
})();
