/* =============================================
   오로라의소리 — script.js v3
   스크롤 페이드인 · 아코디언 · OSMU 라인 드로잉 · 고정 버튼
   ============================================= */

/* ── 0. 오로라 Canvas 배경 애니메이션 ──────── */
(function initAurora() {
  const canvas = document.getElementById('aurora-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* ── 별 파티클 ── */
  const STAR_COUNT = 90;
  const stars = Array.from({ length: STAR_COUNT }, () => ({
    x:     Math.random(),
    y:     Math.random(),
    r:     Math.random() * 1.1 + 0.2,
    alpha: Math.random() * 0.55 + 0.2,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.006 + 0.002,
  }));

  /* ── 오로라 레이어 (핑크→퍼플→블루) — spd: 한 주기 약 20~45초 ── */
  const layers = [
    { y: 0.45, amp: 0.13, freq: 0.0028, spd: 0.00000064, c1: [217, 70, 239], c2: [124, 58, 237] },
    { y: 0.38, amp: 0.10, freq: 0.0035, spd: 0.00000044, c1: [139, 92, 246], c2: [ 59, 80, 200] },
    { y: 0.55, amp: 0.08, freq: 0.0022, spd: 0.00000032, c1: [190, 80, 220], c2: [ 80, 50, 180] },
  ];

  function rgba(rgb, a) { return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`; }

  function drawLayer(layer, t) {
    const w = canvas.width, h = canvas.height;
    const baseY = h * layer.y;
    const amp   = h * layer.amp;

    ctx.beginPath();
    ctx.moveTo(0, h);

    for (let x = 0; x <= w; x += 5) {
      const y = baseY
        + Math.sin(x * layer.freq + t * layer.spd * 1000) * amp
        + Math.sin(x * layer.freq * 2.3 + t * layer.spd * 600 + 1.5) * amp * 0.35;
      ctx.lineTo(x, y);
    }

    ctx.lineTo(w, h);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, baseY - amp * 1.2, 0, baseY + amp * 2);
    grad.addColorStop(0,   rgba(layer.c1, 0.18));
    grad.addColorStop(0.5, rgba(layer.c2, 0.09));
    grad.addColorStop(1,   rgba(layer.c1, 0));
    ctx.fillStyle = grad;
    ctx.fill();
  }

  let raf;
  function animate(t) {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    /* 오로라 */
    layers.forEach(layer => drawLayer(layer, t));

    /* 별 */
    stars.forEach(s => {
      s.phase += s.speed;
      const a = s.alpha * (0.55 + 0.45 * Math.sin(s.phase));
      ctx.beginPath();
      ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(230,240,255,${a})`;
      ctx.fill();
    });

    raf = requestAnimationFrame(animate);
  }

  raf = requestAnimationFrame(animate);

  /* 페이지 숨겨지면 멈추고 다시 보이면 재시작 */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else raf = requestAnimationFrame(animate);
  });
})();

/* ── 1. 스크롤 페이드인 (stagger) ─────────── */
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
fadeEls.forEach((el) => fadeObserver.observe(el));


/* ── 2. 채널 아코디언 ───────────────────────── */
const channelCards = document.querySelectorAll('.channel-card');
channelCards.forEach((card) => {
  const btn = card.querySelector('.channel-card-header');
  btn.addEventListener('click', () => {
    const isOpen = card.classList.contains('open');
    // 모두 닫기
    channelCards.forEach((c) => {
      c.classList.remove('open');
      c.querySelector('.channel-card-header').setAttribute('aria-expanded', 'false');
    });
    // 클릭한 카드 토글
    if (!isOpen) {
      card.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});


/* ── 3. OSMU 라인 드로잉 ────────────────────── */
const osmuDiagram = document.getElementById('osmu-diagram');
const osmuConnector = document.getElementById('osmu-connector');
const osmuNodes = document.querySelectorAll('.osmu-channel-node');

if (osmuDiagram) {
  const osmuObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 중앙 연결선 먼저
          setTimeout(() => {
            osmuConnector?.classList.add('drawn');
          }, 300);
          // 가로 분기선 확장
          setTimeout(() => {
            document.querySelector('.osmu-channels')?.classList.add('drawn');
          }, 450);
          // 각 노드 향햐는 연결선 순차적으로
          osmuNodes.forEach((node, i) => {
            setTimeout(() => {
              node.classList.add('drawn');
            }, 600 + i * 120);
          });
          osmuObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  osmuObserver.observe(osmuDiagram);
}


/* ── 4. 네비게이션 바 스크롤 처리 ──────────── */
const siteNav = document.getElementById('site-nav');
if (siteNav) {
  const navScrollHandler = () => {
    if (window.scrollY > 20) {
      siteNav.classList.add('scrolled');
    } else {
      siteNav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', navScrollHandler, { passive: true });
  navScrollHandler(); // 초기 체크
}


/* ── 5. 고정 카카오 버튼 — 히어로 지나면 등장 */
const kakaoFloat = document.getElementById('kakao-float');
const hero = document.getElementById('hero');

if (kakaoFloat && hero) {
  const scrollHandler = () => {
    const heroBottom = hero.offsetTop + hero.offsetHeight * 0.6;
    if (window.scrollY > heroBottom) {
      kakaoFloat.classList.add('show');
    } else {
      kakaoFloat.classList.remove('show');
    }
  };
  window.addEventListener('scroll', scrollHandler, { passive: true });
  scrollHandler(); // 초기 체크
}


/* ── 5. FAQ 아코디언 ──────────────────────────── */
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const btn = item.querySelector('.faq-btn');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // 모두 닫기
    faqItems.forEach((i) => {
      i.classList.remove('open');
      i.querySelector('.faq-btn').setAttribute('aria-expanded', 'false');
    });
    // 클릭한 항목 토글
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});


/* ── 6. 호버 카드 리프트 (터치 디바이스 제외) ── */
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.quick-card, .review-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'border-color .25s, transform .2s cubic-bezier(.22,1,.36,1), box-shadow .25s';
    });
  });
}
