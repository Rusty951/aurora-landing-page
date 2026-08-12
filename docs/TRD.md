# TRD

Status: `r2 LOCAL RELEASE CANDIDATE / PRODUCTION V2 / PUBLIC DEPLOYMENT APPROVED — RELEASE IN PROGRESS`

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
