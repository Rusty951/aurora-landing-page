# TRD

## 기술 스택

- HTML, CSS, vanilla JavaScript
- 로컬 서버: Node.js `dev-server.mjs`
- 호스팅: Vercel 정적 배포
- 분석: GA4, Meta Pixel
- 빌드 스텝 없음

## 실행 구조

- `index.html`: `/`, `/interview` 공통 랜딩
- `style.css`: 디자인과 반응형, `/interview` 보조 채널 숨김
- `script.js`: 고정 헤더 스크롤 상태만 담당
- `analytics.js`: 운영 호스트 GA4, `engaged_10s`, 외부 링크, 광고 경로 Meta `Contact`
- `assets/aurora-wave-bg.png`: 히어로·최종 CTA 배경
- `assets/aurora-og.png`: 1200×630 공유 이미지
- `vercel.json`: `trailingSlash: false`, `/interview` rewrite
- `scripts/check-site.mjs`: 정적 계약 검사

## 경로 정책

- `/interview`는 `index.html`로 rewrite한다.
- `trailingSlash: false`로 `/interview/`를 `/interview`에 308 정규화한다.
- 루트 상대 자산 경로를 사용해 두 랜딩 경로에서 동일하게 로드한다.
- canonical과 sitemap에는 `/`만 둔다.

## 분석 계약

### 환경

GA4와 Meta Pixel은 `www.aurorasound.kr`, `aurorasound.kr`에서만 실행한다. localhost와 Vercel preview는 데이터를 보내지 않는다.

### HTML 원본

- 추적 요소: 고유 `id` + `data-track`
- 카카오 링크: `data-cta-location`
- 주요 CTA: `data-primary-cta="true"`
- `analytics.js`는 `[data-track]` 이벤트 위임 하나만 사용한다.

### 이벤트 의미

- 주요 카카오 클릭: GA4 `click_cta_primary` + `click_kakao_openchat`
- 일반 카카오 클릭: GA4 `click_kakao_openchat`
- 광고 경로의 모든 카카오 클릭: Meta `Contact`
- `Contact`: 카카오 외부 링크 클릭. 실제 문의나 `Lead`가 아님
- Meta PageView: 광고 경로 문서 로드당 한 번
- `engaged_10s`: 보이는 탭의 누적 10초, 경로별 세션당 한 번

`cta_location`을 GA4 보고서에서 사용하려면 이벤트 범위 맞춤 측정기준으로 등록한다.

## 배포 표면

공개: HTML, CSS, JS, 이미지, favicon, robots, sitemap, Vercel 설정.

제외: `README.md`, `AGENTS.md`, `docs/`, `prd.md`, `.claude/`, `dev-server.mjs`, `scripts/`, `design-qa.md`.

## 위험 경계

- GA4 ID, Meta Pixel ID, 카카오 URL 변경은 별도 승인 없이 하지 않는다.
- 실제 문의가 확인되지 않는 클라이언트 이벤트에 `Lead`를 사용하지 않는다.
- 운영 배포·main push는 사용자 승인 전 금지한다.
- 쿠키·동의 정책의 법적 적합성은 코드 검수와 별도의 법률 검토 대상이다.

## 검증

```bash
npm run check
```

추가 수동 확인:

- `/`, `/interview` 데스크톱과 390px 모바일
- 핵심 CTA 링크와 새 탭 동작
- FAQ 열기·닫기와 키보드 포커스
- 로컬 GA4·Meta 네트워크 요청 0건
- 콘솔 오류 0건
- 레퍼런스 시안과 구현 캡처 비교
