# TRD

## 기술 스택

- Frontend: HTML, CSS, vanilla JavaScript
- Local server: Node.js `dev-server.mjs`
- Hosting: Vercel static deployment
- Analytics: GA4, Meta Pixel
- Build: 없음

## 실행 구조

- `index.html`이 루트 `/`와 광고 경로 `/interview`의 공통 랜딩이다.
- `vercel.json`이 `/interview`를 `index.html`로 rewrite한다.
- `index.html`의 인라인 경로 분기가 `/interview`에서 `html.ad-mode`를 적용하고, `style.css`가 브런치 보조 CTA와 푸터 채널 링크를 숨긴다.
- `script.js`는 UI 인터랙션을 담당한다.
- `analytics.js`는 GA4 이벤트와 광고 경로의 Meta Lead 전송을 담당한다.
- `privacy.html`과 `terms.html`도 `analytics.js`를 로드한다.
- CSS/JS/analytics 파일은 HTML에서 쿼리스트링 버전으로 캐시 무효화한다.

## 운영 원본

- `README.md`: 프로젝트 구조, 실행, 배포, 수정 체크리스트
- `prd.md`: 제품 요구사항, URL/추적/운영 메모
- `vercel.json`: `/interview` rewrite
- `.vercelignore`: 운영 문서 배포 제외

## 배포 표면

- Vercel 정적 배포
- 공개 페이지: `index.html`, `privacy.html`, `terms.html`, `robots.txt`, `sitemap.xml`, `style.css`, `script.js`, `analytics.js`
- 운영 문서와 로컬 도구는 배포 제외: `README.md`, `AGENTS.md`, `docs/`, `prd.md`, `.claude/`, `dev-server.mjs`

## AI 운영 원칙

- 컨텍스트 원칙: 반복 설명은 문서로 고정하고, 새 작업은 `README.md`, `docs/*`, `prd.md`를 먼저 읽고 시작한다.
- 토큰 원칙: 긴 배경 설명 대신 Context Map의 원본 문서를 참조한다.
- 하네스 원칙: 변경은 작게 쪼개고, 커밋 전 단일 check 명령을 통과시킨다.
- 추적 원칙: CTA id, GA4 이벤트, Meta Pixel 경로 조건을 함께 본다.
- 캐시 원칙: CSS/JS/analytics 변경 시 HTML의 버전 쿼리를 함께 갱신한다.
- 배포 표면 원칙: 운영 문서와 로컬 도구가 Vercel 배포 표면에 노출되지 않게 한다.
- 안전 원칙: 광고/분석 ID, 외부 링크, rewrite 정책은 명시 승인 없이 바꾸지 않는다.

## 위험 작업 규칙

- 즉시 가능: 문서 보강, 오탈자 수정, 작은 CSS/JS 수정, 명확한 링크 불일치 수정.
- 보고 후 진행: 섹션 구조 변경, CTA 문구 변경, 이벤트 바인딩 변경, Vercel 설정 보강.
- 승인 전 금지: GA4 측정 ID 변경, Meta Pixel ID 변경, 카카오 오픈채팅 URL 변경, `/interview` rewrite 변경, 광고/오가닉 추적 정책 변경.
- 승인 전 금지: 운영 문서, 로컬 도구, 내부 설정을 공개 배포 표면에 노출하는 변경.

## SEO 기본 파일

- `index.html`: 대표 URL canonical, Open Graph, Twitter card, Organization 구조화 데이터
- `robots.txt`: 전체 크롤링 허용 및 `https://www.aurorasound.kr/sitemap.xml` 안내
- `sitemap.xml`: 색인 대상 대표 URL을 명시한다. `privacy.html`과 `terms.html`은 `noindex`이므로 사이트맵에 넣지 않는다.

## Definition of Done

- 요청 범위 안에서만 변경했다.
- URL/추적/CTA 정책을 보존했다.
- CSS/JS/analytics 변경 시 캐시 버스팅 버전을 확인했다.
- 문서나 배포 표면이 바뀌면 관련 문서를 갱신했다.
- 커밋 전 check 명령을 통과시켰다.
- 실패한 검증, 남은 위험, 미해결 TODO를 보고했다.

## 검증 루틴

커밋 전 아래 명령을 통과시킨다.

```bash
rg --files -g '*.js' -g '*.mjs' -g '!node_modules' -g '!dist' -g '!build' -g '!coverage' -g '!.next' -g '!out' -g '!output' -g '!preview' -g '!.cache' | xargs -n1 node --check
```

UI/카피 변경은 로컬 서버에서 `/`와 `/interview`를 모두 확인한다.

## check 명령 탐색 기록

- `package.json`에 `dev`, `preview`만 있음
- 빌드 스텝 없음
- Node.js 문법 검사를 단일 check로 사용

## 문서 유지 규칙

- 제품 범위/URL 전략 변경: `docs/PRD.md`, `prd.md`, `README.md`
- 기술 구조/check 변경: `docs/TRD.md`, `README.md`
- 작업 루틴 변경: `docs/WORKFLOWS.md`
- 디자인/카피 방향 변경: `docs/DESIGN.md`, `prd.md`
- 배포 제외 규칙 변경: `.vercelignore`, `docs/TRD.md`, `docs/DECISIONS.md`
- 추적 정책 변경: `prd.md`, `docs/TRD.md`, `docs/DECISIONS.md`
