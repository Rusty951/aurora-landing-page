# 오로라의소리 랜딩페이지

마케팅을 시작하려는데 첫 단추부터 막힌 사업자가 채널보다 먼저 첫 문장과 첫 실행 순서를 물어보게 만드는 **오로라의소리** 랜딩페이지입니다.

대표 URL은 `https://www.aurorasound.kr`이며, 광고 확인용 URL은 `https://www.aurorasound.kr/interview`입니다. 두 URL은 같은 랜딩을 보여주고, 경로와 UTM으로 광고/오가닉 유입만 구분합니다.

## 구조

```text
index.html       공통 랜딩페이지 (`/`, `/interview` 모두 서빙)
style.css        전체 스타일
script.js        UI 인터랙션
analytics.js     GA4 초기화 및 클릭 이벤트 추적
privacy.html     개인정보처리방침
vercel.json      /interview → index.html rewrite 설정
prd.md           제품 요구사항 및 운영 메모
dev-server.mjs   로컬 정적 서버
```

## 로컬 실행

이 프로젝트는 프레임워크와 빌드 도구가 없는 정적 사이트입니다.

```bash
npm run dev
```

브라우저에서 오가닉 경로 또는 광고 경로를 엽니다.

```text
http://localhost:4173/
http://localhost:4173/interview
```

`4173` 포트가 이미 사용 중이면 서버가 다음 포트로 자동 실행됩니다. 터미널에 출력되는 주소를 확인하세요.

포트를 바꾸려면 `PORT`를 지정합니다.

```bash
PORT=3000 npm run dev
```

## 배포

Vercel 프로젝트 `aurora-landing-page`에 연결되어 있으며, GitHub `main` 브랜치 push 후 자동 배포됩니다.

빌드 스텝은 없습니다. 정적 파일이 그대로 배포됩니다.

운영 문서와 로컬 도구는 [.vercelignore](.vercelignore)로 배포에서 제외합니다.

## 검증

커밋 전 아래 명령을 통과시킵니다.

```bash
rg --files -g '*.js' -g '*.mjs' -g '!node_modules' -g '!dist' -g '!build' -g '!coverage' -g '!.next' -g '!out' -g '!output' -g '!preview' -g '!.cache' | xargs -n1 node --check
```

## Context Map

- 제품 의도: `docs/PRD.md`, 원본 `prd.md`
- 디자인/카피 규칙: `docs/DESIGN.md`, 원본 `prd.md`
- 리뉴얼 기획: `docs/RENEWAL_BRIEF.md`
- 기술 구조와 위험 규칙: `docs/TRD.md`
- 작업 루틴과 리뷰/디버깅: `docs/WORKFLOWS.md`
- 주요 결정 기록: `docs/DECISIONS.md`
- AI 작업 규칙: `AGENTS.md`
- 운영 원본: `README.md`, `prd.md`
- 배포 표면: Vercel 정적 배포, `vercel.json`, `.vercelignore`

## URL / 유입 구분

- `https://www.aurorasound.kr`: 유튜브 고정댓글, 인스타그램, 스레드, 네이버 블로그, 명함, QR 등 모든 오가닉/대표 유입
- `https://www.aurorasound.kr/interview`: Meta 광고 등 광고 캠페인 유입 확인용

두 주소는 같은 랜딩을 보여줍니다. 향후 정식 홈페이지를 만들 때 루트 정보 구조와 CTA 흐름을 다시 정리합니다.

광고 URL에는 UTM을 붙입니다.

```text
https://www.aurorasound.kr/interview?utm_source=meta&utm_medium=paid_social&utm_campaign=...
```

## 추적 설정

GA4 측정 ID는 [analytics.js](analytics.js)의 `GA_MEASUREMENT_ID`에서 관리합니다.

CTA 이벤트에는 `landing_type`, `landing_path`, UTM 5종이 함께 전송됩니다.

Meta Pixel은 [index.html](index.html)에서 `/interview`, `/interview/` 경로에만 실행되며, 광고 경로의 카카오 CTA 클릭은 Meta `Lead`로 전송됩니다.

## 수정 시 체크리스트

- `style.css`를 수정하면 [index.html](index.html)의 `style.css?v=13` 버전을 올립니다.
- `script.js`를 수정하면 [index.html](index.html)의 `script.js?v=4` 버전을 올립니다.
- `analytics.js`를 수정하면 HTML의 `analytics.js?v=2` 버전을 올립니다.
- CTA 또는 외부 링크 id를 바꾸면 [analytics.js](analytics.js)의 이벤트 바인딩도 함께 확인합니다.
- 모바일 가로 스크롤 이슈가 재발하지 않는지 확인합니다.
- 운영 메모는 [prd.md](prd.md)에 반영합니다.
