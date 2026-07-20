/* =============================================
   오로라의소리 — analytics.js
   운영 환경 GA4 페이지뷰 추적 + 주요 클릭 이벤트
   ============================================= */

// ▼▼▼ GA4 측정 ID를 여기에 입력하세요 (예: G-ABCDE12345)
var GA_MEASUREMENT_ID = 'G-YQJ3DC2SQN';
// ▲▲▲

var PRODUCTION_TRACKING_HOSTS = ['www.aurorasound.kr', 'aurorasound.kr'];

function isProductionTrackingHost() {
  return PRODUCTION_TRACKING_HOSTS.indexOf(window.location.hostname) !== -1;
}

(function initGA() {
  if (!isProductionTrackingHost()) return;
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') return;

  // gtag dataLayer 초기화 (gtag.js보다 먼저 정의해야 config가 큐에 쌓임)
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);

  // gtag 스크립트 비동기 로드
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(s);
})();


/* ── 랜딩/UTM 컨텍스트 ─────────────────────── */
function getLandingContext() {
  var path = window.location.pathname;
  var landingType = 'other';

  if (path === '/' || path === '/index.html') {
    landingType = 'organic_root';
  } else if (path === '/interview' || path === '/interview/') {
    landingType = 'paid_interview';
  }

  return {
    landing_type: landingType,
    landing_path: path
  };
}

function getUtmParams() {
  var search = new URLSearchParams(window.location.search);
  return {
    utm_source: search.get('utm_source') || '',
    utm_medium: search.get('utm_medium') || '',
    utm_campaign: search.get('utm_campaign') || '',
    utm_content: search.get('utm_content') || '',
    utm_term: search.get('utm_term') || ''
  };
}

function trackingParams(params) {
  return Object.assign({}, getLandingContext(), getUtmParams(), params || {});
}


/* ── 이벤트 헬퍼 ───────────────────────────── */
function gaTrack(eventName, params) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, trackingParams(params));
}

function metaTrackContactClick(params) {
  if (!isProductionTrackingHost()) return;
  if (getLandingContext().landing_type !== 'paid_interview') return;
  if (typeof window.fbq !== 'function') return;
  window.fbq('track', 'Contact', trackingParams(Object.assign({
    contact_method: 'kakao_openchat'
  }, params || {})));
}


/* ── 클릭 이벤트 바인딩
   (이 스크립트는 </body> 직전에 로드되므로 DOM이 이미 준비된 상태)
   ──────────────────────────────────────────── */
(function bindClickEvents() {

  // ID로 요소를 찾아 클릭 이벤트를 등록하는 헬퍼
  function on(id, fn) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('click', fn);
  }

  function trackKakaoClick(id) {
    gaTrack('click_kakao_openchat', { button_id: id });
    metaTrackContactClick({ button_id: id });
  }

  function trackPrimaryCta(id) {
    gaTrack('click_cta_primary', { button_id: id });
    gaTrack('click_kakao_openchat', { button_id: id });
    metaTrackContactClick({ button_id: id });
  }

  /* ── 카카오 오픈채팅 (단순 링크용: 네비, 플로팅, 푸터) ── */
  ['nav-cta-btn', 'kakao-float-btn', 'footer-kakao-link'].forEach(function (id) {
    on(id, function () {
      trackKakaoClick(id);
    });
  });

  /* ── CTA 버튼 (카카오 오픈채팅 + CTA 이벤트 동시 발송) ── */
  ['hero-cta-btn', 'interview-cta-btn', 'final-cta-btn'].forEach(function (id) {
    on(id, function () {
      trackPrimaryCta(id);
    });
  });

  /* ── 이메일 ── */
  on('footer-email-link', function () {
    gaTrack('click_email');
  });

  /* ── 네이버 블로그 ── */
  on('footer-blog-link', function () {
    gaTrack('click_blog');
  });

  /* ── 워드프레스 블로그 ── */
  ['hero-wordpress-blog-link', 'footer-wordpress-blog-link'].forEach(function (id) {
    on(id, function () {
      gaTrack('click_wordpress_blog', { button_id: id });
    });
  });

  /* ── 인스타그램 ── */
  on('footer-insta-link', function () {
    gaTrack('click_instagram');
  });

  /* ── 유튜브 ── */
  on('footer-youtube-link', function () {
    gaTrack('click_youtube');
  });

})();
