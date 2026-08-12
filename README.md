# 오로라의소리 랜딩페이지

Status: `CURRENT LIVE V2 / 2026-08-12 REBRAND REVAMP HELD / NO PRODUCTION`

> 아래 내용은 현재 운영 중인 V2를 설명한다. 준비했던 `리브랜딩 실행 파트너` 개편은 2026-08-12 대표 결정으로 `HELD`됐으며 실제 제작하지 않는다. source·카피·OG·제품 문서와 운영 배포는 현재 상태를 유지한다. 재개에는 새 명시 요청과 당시 기준으로 다시 검토한 별도 `APPROVED` 브리프가 필요하다.

이미 마케팅을 하고 있지만 채널과 방향이 흩어진 사업을 위해, 지금 필요한 콘텐츠의 우선순위를 정하고 제작·운영까지 맡는 오로라의소리 랜딩페이지입니다.

- 대표 URL: `https://www.aurorasound.kr/`
- 광고 URL: `https://www.aurorasound.kr/interview`
- 상담 CTA: `마케팅 상담하기`

두 URL은 같은 랜딩을 보여줍니다. 루트는 대표·오가닉 유입, `/interview`는 광고 유입으로 분석 맥락만 구분합니다. `/interview/`는 Vercel에서 `/interview`로 정규화합니다.

## 구조

```text
index.html          공통 랜딩페이지
style.css           반응형 디자인
script.js           헤더 스크롤 상태
analytics.js        GA4·Meta Pixel 이벤트
assets/             히어로·공유 이미지
privacy.html        개인정보처리방침
terms.html          서비스 이용약관
robots.txt          크롤링 정책
sitemap.xml         대표 URL 사이트맵
vercel.json         경로 정규화와 /interview rewrite
scripts/check-site.mjs  정적 계약 검사
dev-server.mjs      로컬 정적 서버
```

## 로컬 실행

```bash
npm run dev
```

기본 주소는 아래와 같습니다. `4173`이 사용 중이면 다음 포트를 자동으로 찾습니다.

```text
http://localhost:4173/
http://localhost:4173/interview
```

## 검증

```bash
npm run check
```

검사는 HTML 구조, CTA·추적 계약, Meta 이벤트 의미, 필수 이미지 크기, Vercel 경로 정책과 JS 문법을 확인합니다. UI 변경은 데스크톱과 모바일에서 `/`, `/interview`를 모두 직접 확인합니다.

## 배포

Vercel 프로젝트 `aurora-landing-page`가 GitHub `main` 브랜치 push 후 자동 배포합니다. 빌드 스텝은 없습니다. 운영 문서와 로컬 검수 파일은 `.vercelignore`로 제외합니다.

브랜치·로컬 미리보기에서 검수하기 전에는 `main`에 push하지 않습니다.

## URL과 추적

- GA4는 운영 호스트에서만 실행합니다.
- Meta Pixel `PageView`는 운영 호스트의 `/interview`에서만 한 번 실행합니다.
- 광고 경로의 카카오 외부 링크 클릭은 Meta `Contact`로 기록합니다. 이것은 실제 문의나 `Lead`가 아닙니다.
- 모든 추적 링크는 HTML의 `data-track`을 원본으로 사용합니다.
- 주요 카카오 CTA는 GA4 `click_cta_primary`와 `click_kakao_openchat`을 함께 보냅니다.
- 모든 클릭 이벤트에 `landing_type`, `landing_path`, UTM 5종, `button_id`, `cta_location`, `is_primary_cta`를 붙입니다.
- `engaged_10s`는 보이는 탭의 누적 열람 10초를 경로별 세션당 한 번 기록합니다.

광고 URL 예시:

```text
https://www.aurorasound.kr/interview?utm_source=meta&utm_medium=paid_social&utm_campaign=...
```

## 수정 체크리스트

- 스타일 변경 시 `style.css?v=`를 올립니다.
- UI 스크립트 변경 시 `script.js?v=`를 올립니다.
- 추적 변경 시 모든 HTML의 `analytics.js?v=`를 올립니다.
- CTA는 고유 `id`, `data-track`, 카카오 링크의 `data-cta-location`을 유지합니다.
- 실제 문의가 확인되지 않는 클라이언트 이벤트에 Meta `Lead`를 쓰지 않습니다.
- 모바일 390px에서 가로 스크롤, 잘린 제목, CTA 터치 영역을 확인합니다.
- 구조·정책 변경은 `prd.md`, 관련 `docs/*`, `docs/DECISIONS.md`에 반영합니다.
- 마지막에 `npm run check`를 실행합니다.

## Context Map

- 제품 원본: `prd.md`
- 디자인·카피: `docs/DESIGN.md`
- 기술·추적: `docs/TRD.md`
- 작업 절차: `docs/WORKFLOWS.md`
- 이번 리뉴얼 기준: `docs/RENEWAL_BRIEF.md`
- 주요 결정: `docs/DECISIONS.md`
- AI 작업 규칙: `AGENTS.md`
