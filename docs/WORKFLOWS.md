# Workflows

## Existing Project Mode

이 프로젝트는 기존 `README.md`와 `prd.md`가 강한 운영 원본이다. 새 표준 문서는 기존 원본을 대체하지 않고 AI가 빠르게 맥락을 찾는 지도 역할을 한다.

작업 전 확인 순서:

1. `README.md`
2. `AGENTS.md`
3. `prd.md`
4. 관련 `docs/*`
5. 실제 수정 대상 파일

## Landing Page Workflow

1. `docs/PRD.md`와 `prd.md`에서 URL/추적 의도를 확인한다.
2. 루트 `/`와 `/interview`가 같은 화면을 보여야 하는지 확인한다.
3. CTA id나 외부 링크를 건드리면 `analytics.js` 이벤트 바인딩을 함께 확인한다.
4. CSS/JS/analytics를 수정하면 `index.html`과 `privacy.html`의 버전 쿼리를 확인한다.
5. 모바일 가로 스크롤과 CTA 노출을 확인한다.
6. check 명령을 실행한다.

## UI Workflow

1. 브랜드 톤은 `docs/DESIGN.md`와 `prd.md`를 확인한다.
2. 히어로, CTA, 첫 단추 인터뷰, FAQ의 카피 역할을 구분한다.
3. 레이아웃 변경은 모바일 폭에서 먼저 깨지는지 확인한다.
4. `style.css` 수정 시 `index.html`의 `style.css?v=`를 갱신한다.
5. `script.js` 수정 시 `index.html`의 `script.js?v=`를 갱신한다.
6. `analytics.js` 수정 시 `index.html`과 `privacy.html`의 `analytics.js?v=`를 갱신한다.

## Analytics Workflow

1. GA4 측정 ID는 `analytics.js`의 `GA_MEASUREMENT_ID`에서 확인한다.
2. `landing_type`이 `/`, `/interview`, 기타 경로에서 의도대로 나뉘는지 확인한다.
3. CTA id를 바꾸면 `click_cta_primary`, `click_kakao_openchat` 바인딩을 함께 확인한다.
4. Meta Pixel은 `/interview`, `/interview/`에서만 실행되어야 한다.
5. 광고 경로 카카오 CTA 클릭은 Meta `Lead`로 전송되는지 확인한다.

## Deployment Surface Workflow

1. Vercel 배포 표면을 확인한다.
2. 운영 문서와 로컬 도구가 배포되지 않도록 `.vercelignore`를 확인한다.
3. `README.md`, `AGENTS.md`, `docs/`, `prd.md`, `.claude/`, `dev-server.mjs`는 배포 제외를 유지한다.
4. `/interview` rewrite를 바꾸면 `vercel.json`, `prd.md`, `docs/TRD.md`, `docs/DECISIONS.md`를 함께 갱신한다.

## Bugfix Workflow

1. 재현 조건과 기대 동작을 고정한다.
2. 발생 경로가 `/`, `/interview`, `privacy.html` 중 어디인지 분리한다.
3. 브라우저 콘솔, DOM, 이벤트 바인딩, 네트워크 요청을 순서대로 본다.
4. 한 번에 하나의 가설만 검증한다.
5. 최소 수정 후 같은 조건으로 재검증한다.
6. check 명령을 실행한다.

## Refactor Workflow

1. 리팩터링 의도와 보존해야 할 동작을 한 문장으로 고정한다.
2. `/`와 `/interview` 동작, CTA 이벤트, Pixel 경로 조건을 보존한다.
3. 작은 단위로 변경한다.
4. 캐시 버스팅 버전과 문서 갱신 필요를 확인한다.
5. check 명령을 실행한다.

## Code Review Workflow

리뷰는 스타일보다 위험을 먼저 본다.

1. `/`와 `/interview` 추적 분리가 깨졌는지 확인한다.
2. CTA id, 외부 링크, GA4/Meta 이벤트 회귀를 확인한다.
3. 모바일 가로 스크롤과 CTA 노출 회귀를 확인한다.
4. 캐시 버스팅 버전 누락을 확인한다.
5. 운영 문서와 로컬 도구가 배포 표면에 노출되는지 확인한다.
6. 테스트/check 누락을 확인한다.
7. 문서와 실제 코드 상태가 어긋나는지 확인한다.

## Debugging Workflow

1. 문제를 한 문장으로 정의한다.
2. 실제 결과, 기대 결과, 발생 경로를 분리한다.
3. 콘솔 오류, 이벤트 발송, 경로 조건, 캐시 버전을 확인한다.
4. 가능한 원인 가설을 2-3개로 좁힌다.
5. 한 번에 하나의 원인만 수정한다.
6. 같은 조건으로 재검증한다.
7. 반복될 문제는 `README.md`, `prd.md`, 관련 `docs/*`에 반영한다.

## Commit Safety Review

1. 변경된 파일과 의도를 요약한다.
2. 범위 밖 수정이 없는지 확인한다.
3. URL/추적/CTA 정책이 유지됐는지 확인한다.
4. 배포 제외 규칙이 유지됐는지 확인한다.
5. 문서 갱신 필요 여부를 확인한다.
6. check 명령을 실행한다.
7. 실패한 검증이나 남은 위험을 보고한다.

## Documentation Freshness Review

- 제품 목표, URL 전략, 비목표 변경: `docs/PRD.md`, `prd.md`
- 브랜드/카피/디자인 변경: `docs/DESIGN.md`, `prd.md`
- 기술 구조, Vercel, check 변경: `docs/TRD.md`, `README.md`
- 추적 정책 변경: `prd.md`, `docs/TRD.md`, `docs/DECISIONS.md`
- 배포 제외 변경: `.vercelignore`, `docs/TRD.md`, `docs/DECISIONS.md`
- 주요 결정 변경: `docs/DECISIONS.md`
