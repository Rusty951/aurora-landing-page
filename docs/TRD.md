# TRD

## 2026-09-30 운영 교체

사용자가 현재 v4의 커밋·GitHub 푸시·기존 홈페이지 교체를 명시적으로 요청했다. 페이지는 승인한 실크 첫 화면, AI 제작 자체 콘셉트 3개, 짧은 역할 소개, 문의의 네 구역으로 운영한다. 상품 구분·적합성 대화·첫 메시지 안내는 유지하고 상세 진행 설명은 접었다.

운영 진입점은 `index.html`, 시각 자산·모듈은 `rebrand/`에 둔다. 비교용 `rebrand/index.html`만 배포에서 제외하며 `/rebrand`는 운영 루트로 이동한다. SEO·Organization·기존 1200×630 OG·법적 페이지·`/interview` 정책을 유지한다. GA4·Meta의 호스트/경로 조건과 이벤트 의미를 바꾸지 않으며 단일 문의 CTA는 `final-cta-btn` 추적 ID를 사용한다. 이전 위치별 CTA 건수와 새 페이지 합계를 구분한다.

v4 검증은 `npm run check`와 `design-qa.md` 최신 항목을 따른다. 아래 r2 상세는 역사적 기준이며 화면 수·카카오 진입점 수·AVIF 히어로·기존 스타일 로딩은 위 v4 구조로 대체한다.


Status: `v4 RELEASE READY / PUBLIC REPLACEMENT AUTHORIZED`

## 기술 스택

- HTML, CSS, vanilla JavaScript
- 로컬 서버: Node.js `dev-server.mjs`
- 호스팅: Vercel 정적 배포
- 분석: GA4, Meta Pixel
- 빌드 스텝 없음

## 실행 구조

- `index.html`: `/`, `/interview` 공통 r2 랜딩
- `style.css?v=19`: 다크 편집형 디자인, 반응형, `/interview` 보조 채널 숨김
- `script.js?v=6`: 고정 헤더 스크롤 상태만 담당
- `analytics.js?v=7`: 운영 호스트 GA4, `engaged_10s`, 외부 링크, 광고 경로 Meta `Contact`
- `assets/aurora-wave-bg.avif`: 히어로·최종 CTA의 우선 배경
- `assets/aurora-wave-bg.png`: fallback 배경
- `assets/aurora-og.png`: 1200×630 r2 PNG 공유 이미지
- `scripts/og-card.html`: 배포 제외 OG 렌더 원본
- `vercel.json`: `trailingSlash: false`, `/interview` rewrite
- `scripts/check-site.mjs`: 구조·r2 의미·추적·자산 계약 검사

`script.js`와 `analytics.js`의 의미를 바꾸지 않았으므로 캐시 버전을 유지했다. 시각 코드가 바뀐 `style.css`만 v19로 올렸다.

## 경로 정책

- `/interview`는 `index.html`로 rewrite한다.
- `trailingSlash: false`로 `/interview/`를 `/interview`에 308 정규화한다.
- 루트 상대 자산 경로를 사용해 두 랜딩 경로에서 동일하게 로드한다.
- canonical과 sitemap에는 `/`만 둔다.
- localhost 서버는 `/interview/` 정규화를 재현하지 않으므로 preview와 production에서 308·query 유지 여부를 별도 확인한다.

## HTML·카피 계약

정적 검사는 다음 r2 의미를 고정한다.

- `리브랜딩 실행 파트너`
- `리브랜딩 실행 프로젝트`
- `월간 브랜드 마케팅`
- `적합성 대화`
- `리브랜딩 / 월간 / 기타`

아래 V2·보류 문구가 돌아오면 실패한다.

- 검증 전 경력 `국내 포털 콘텐츠 매니저 출신`
- 인테리어·치킨 프랜차이즈·병원 타사 사례
- `마케팅 상담하기`
- 무료 우선순위·직접 실행 결과물을 암시하던 V2 문장

## 분석 계약

### 환경

GA4와 Meta Pixel은 `www.aurorasound.kr`, `aurorasound.kr`에서만 실행한다. localhost와 Vercel preview는 데이터를 보내지 않는다.

### HTML 원본

- 추적 요소: 고유 `id` + `data-track`
- 카카오 링크: 승인된 URL + `data-cta-location`
- 주요 CTA: `data-primary-cta="true"`
- `analytics.js`는 `[data-track]` 이벤트 위임 하나만 사용한다.
- CTA ID를 유지해 `button_id` 보고 연속성을 보존한다.

### 이벤트 의미

- 주요 카카오 클릭: GA4 `click_cta_primary` + `click_kakao_openchat`
- 일반 카카오 클릭: GA4 `click_kakao_openchat`
- 광고 경로의 모든 카카오 클릭: Meta `Contact`
- `Contact`: 카카오 외부 링크 클릭. 실제 문의나 `Lead`가 아님
- Meta PageView: 광고 경로 문서 로드당 한 번
- `engaged_10s`: 보이는 탭 누적 10초, 경로별 세션당 한 번

카카오 클릭 이벤트는 `리브랜딩 / 월간 / 기타`를 자동 수집하지 않는다. 문의 유형과 실제 전환 단계는 대화·영업 기록에서 분리한다.

## 배포 표면

공개:

- `index.html`, legal HTML
- `style.css`, `script.js`, `analytics.js`
- `assets/`, favicon
- `robots.txt`, `sitemap.xml`
- `vercel.json`

제외:

- `README.md`, `AGENTS.md`, `CLAUDE.md`
- `docs/`, `prd.md`
- `.claude/`, `dev-server.mjs`, `scripts/`, `design-qa.md`

preview와 production에서 제외 경로가 404인지 확인한다.

## 위험 경계

- GA4 ID, Meta Pixel ID, 카카오 URL과 이벤트 의미는 별도 승인 없이 바꾸지 않는다.
- 실제 문의가 확인되지 않는 클라이언트 이벤트에 `Lead`를 사용하지 않는다.
- 검증 전 경력·타 클라이언트 증거·생성 결과를 실제 성과로 추가하지 않는다.
- 최종 변경본과 대상이 확인된 명시적 공개 승인 전 commit·push·production 배포하지 않는다.
- 쿠키·동의 정책의 법적 적합성은 코드 검수와 별도의 법률 검토 대상이다.

## 로컬 검증

```bash
npm run check
git diff --check
```

추가 확인:

- `/`, `/interview`: 1440×1024, 390×844, 320×568
- 가로 넘침 0, 한 개 H1, 44px 이상 CTA
- FAQ open·summary focus
- `/interview` ad-mode와 footer 비필수 채널 숨김
- 모든 주요 CTA의 URL·새 탭·rel·tracking metadata
- localhost `window.gtag`, `window.fbq` 미정의
- 콘솔 오류 0
- OG 1200×630 PNG 육안 검수
- P0·P1·P2 0건

## production 검증

- `/` 200, `/interview` 200
- `/interview/` 308, query 유지
- 두 경로 응답 핵심 본문 동일
- CSS·OG·legal·robots·sitemap 200
- 내부 문서·렌더 원본 404
- Vercel Ready와 source SHA 일치
- `/`에서 GA4만, `/interview`에서 GA4 + Meta PageView 1회
- 카카오 CTA에서 승인된 GA·Meta 이벤트와 매개변수 확인
- 클라이언트 `Lead` 없음

## 2026-09-29 — 격리된 리브랜딩 후보 v2

`rebrand/`는 기존 정적 서버의 디렉터리 요청으로 실행하며 production 배포에서 제외한다. 루트·광고 랜딩과 분석 코드는 그대로다. 공개 교체 전 기존 분석·메타·광고 경로 계약을 이식해야 한다.

- Three.js 0.186.1을 package-lock으로 고정하고 `vendor/three.js`로 번들링했다. MIT 라이선스를 함께 둔다. `npm run vendor:three`는 재현 가능한 esbuild 0.25.10 명령이다.
- `field.js`: WebGL2 renderer, 4개의 indexed PlaneGeometry를 vertex shader에서 공간 곡면으로 계산한다. 데스크톱 153,600 triangles, 모바일 초기 로드 44,800 triangles. 라이브 조형물은 이미지 텍스처를 쓰지 않는다.
- 환경 맵은 자체 스튜디오 조명 장면에서 PMREM으로 계산한다. DPR 상한은 데스크톱 1.6, 모바일 초기 로드 1.15다. 화면 밖에서는 render를 생략하고 숨겨진 탭에서는 프레임 루프를 취소한다.
- `app.js`: 자연 스크롤 위치를 장면 진행률로 변환한다. 비활성 장면에는 inert/aria-hidden을 적용한다. 모션 정지 중에도 스크롤이나 장면 버튼으로 읽을 내용과 대표 프레임을 바꿀 수 있다.
- `audio.js`: 클릭 후 AudioContext 생성. 84 BPM의 시퀀스 기준 시각으로 pulse를 계산한다. 저역 통과 필터와 전환음을 장면에 연결한다. 외부 음원은 없다.
- `assets/sculpture-{desktop,mobile}.webp`: live scene을 캡처한 대체 이미지. WebGL 실패 시 남는다. `?poster=1`은 캡처용으로 UI와 자율 움직임을 감추는 개발 모드다.
- `scripts/check-rebrand.mjs`: 내부 앵커·자산·핵심 문구, noindex·배포 제외, 추적 미실행, vendor/라이선스·버전·장면 링크 계약을 검사한다. GPU 의미 검증은 실제 브라우저 검사로 별도 수행한다.
- 개발 서버 MIME에 AVIF·WOFF2를 추가했다. 서버 경로와 production rewrite는 바꾸지 않았다.

## 2026-09-29 — v3 기본 renderer 분리

기본 경로는 `silk.js`의 WebGL 이미지 효과를 동적 import한다. `?render=mesh`에서만 기존 `field.js`와 Three.js가 로드된다. 공통 `render(state)`/`resize()` 계약을 유지해 음악·입력·정지 상태를 재사용한다. 기본 경로에서는 `.staged`를 붙이지 않고 장면 0만 표시한다. 원본 `resonance.webp`가 정적 대체 이미지다. 버전 캐시는 CSS·app·silk v3를 사용한다.

## 2026-09-29 — v4 쇼케이스 통합

`showcase.js`가 3개 이미지의 상세 dialog와 제한된 호버 이동을 담당한다. 이미지 링크는 JS/dialog 미지원 시 원본 WebP로 동작한다. native dialog의 Escape·닫기 후 원래 링크로 포커스를 복원하며 backdrop 클릭도 지원한다. 모바일 문의 구간에서는 IntersectionObserver로 컨트롤을 헤더로 옮겨 문의 CTA와 겹치지 않게 한다. 사진의 크기를 미리 예약하고 lazy decoding/loading을 사용한다. 세 WebP 합계는 543,136 bytes다. 처음 승인한 hero HTML·silk renderer·운영 분석 경계는 유지한다.
