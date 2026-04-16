/* =============================================
   오로라의소리 — analytics.js
   GA4 페이지뷰 추적 + 주요 클릭 이벤트
   ============================================= */

// ▼▼▼ GA4 측정 ID를 여기에 입력하세요 (예: G-ABCDE12345)
var GA_MEASUREMENT_ID = 'G-YQJ3DC2SQN';
// ▲▲▲

(function initGA() {
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


/* ── 클릭 이벤트 헬퍼 ───────────────────────── */
function gaTrack(eventName, params) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params || {});
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

  /* ── 카카오 오픈채팅 (단순 링크용: 네비, 플로팅, 푸터) ── */
  ['nav-cta-btn', 'kakao-float-btn', 'footer-kakao-link'].forEach(function (id) {
    on(id, function () {
      gaTrack('click_kakao_openchat', { button_id: id });
    });
  });

  /* ── CTA 버튼 (카카오 오픈채팅 + CTA 이벤트 동시 발송) ── */
  ['hero-cta-btn', 'interview-cta-btn', 'final-cta-btn'].forEach(function (id) {
    on(id, function () {
      gaTrack('click_cta_primary', { button_id: id });
      gaTrack('click_kakao_openchat', { button_id: id });
    });
  });

  /* ── 이메일 ── */
  on('footer-email-link', function () {
    gaTrack('click_email');
  });

  /* ── 브런치 (id 없음 — href로 탐색) ── */
  var brunchEl = document.querySelector('a[href*="brunch.co.kr"]');
  if (brunchEl) {
    brunchEl.addEventListener('click', function () {
      gaTrack('click_brunch');
    });
  }

  /* ── 네이버 블로그 ── */
  on('footer-blog-link', function () {
    gaTrack('click_blog');
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
