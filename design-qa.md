# Design QA — Landing r2 Release Candidate

Status: `LOCAL PASS / P0·P1·P2 0 / PRODUCTION NOT YET TESTED`

## 검수 대상

- 브랜치: `codex/landing-rebrand-r2`
- 제품 기준: 승인된 `creative-brief-r2.md`
- 로컬 URL: `http://localhost:4173/`, `http://localhost:4173/interview`
- 화면: 1440×1024, 390×844, 320×568
- 캡처: `/Users/bananabk/Desktop/codex-output/aurora-landing-revamp/qa-r2/`

2026-08-12 대표가 exact final 공개 배포를 승인했다. 운영 `https://www.aurorasound.kr/`는 production 검증이 끝나기 전까지 V2로 기록하며, 이 문서의 현재 r2 visual pass는 로컬 release candidate에 적용한다.

## 선택한 방향

V2의 차콜·보라·Pretendard·큰 제목·얇은 구분선·기존 파동 자산을 유지하고, 메시지·상품 비교·근거 구조를 r2로 교체했다.

- 유지: 실제 파동 AVIF/PNG, 1240px 컨테이너, sticky header, 네이티브 FAQ, focus·reduced-motion·tracking 구조
- 수정: 변화 시점 중심 히어로, 리브랜딩 60% / 월간 40% 상품 비교, 승인형 진행 순서, 책임·제외 경계, 적합·비적합
- 폐기: 검증 전 대표 경력, 타사 사례 3건, `마케팅 상담하기`, 무료 우선순위 제공으로 읽히던 FAQ
- 새 생성 이미지: 없음

## 첫 화면 측정

### 1440×1024

- H1: 92px, 약 3줄, 높이 280.1px
- hero: top 76px, bottom 약 929.8px
- hero CTA: 58px, bottom 약 749px
- 문의 유형 안내 bottom: 약 790.8px
- horizontal overflow: 0

### 390×844

- H1: 약 46px, 높이 191.4px
- header CTA: `적합성 대화`, 44px, right 368px
- hero CTA: 56px, bottom 약 640.5px
- 문의 유형 안내 bottom: 약 700.7px
- hero bottom: 약 845px
- horizontal overflow: 0

### 320×568

- H1: 33px, 높이 약 101px
- header CTA: `적합성 대화`, 44px, right 298px
- hero CTA: 48px, bottom 약 436.4px
- 문의 유형 안내 bottom: 약 481.4px
- hero bottom: 약 569px
- horizontal overflow: 0

세 화면 모두 변화 시점·역할·다음 행동과 문의 유형 안내가 첫 화면 안에 남는다.

### 720×512 재흐름 확인

- H1: 54px
- header CTA: 50px, right 약 691.2px
- horizontal overflow: 0
- 짧은 화면에서 hero CTA는 다음 스크롤 구간으로 내려가지만 본문 순서와 조작 가능성을 유지한다.

## 핵심 캡처

- `root-1440-hero.png`
- `root-390-hero.png`
- `root-320-hero.png`
- `desktop-offers-anchor.png`
- `desktop-process-title.png`
- `desktop-page-end.png`
- `interview-390-hero.png`
- `interview-390-faq-open.png`
- `root-720-hero.jpg`
- `root-720-responsibility.jpg`
- `root-390-final-cta.jpg`
- `aurora-og-r2.png`

## 시각 판단

### 정보 위계

- 첫 화면의 보라 강조는 `고객에게 보이는 것`에만 집중된다.
- 리브랜딩 상품은 상단 보라 rule과 넓은 열로 주력 입구임을 표시한다.
- 월간 상품은 같은 톤 안에서 작은 열로 분리돼 자동 포함으로 읽히지 않는다.
- 진행 순서는 6열 카드가 아니라 sticky 제목과 세로 목록으로 읽기 폭을 보존한다.
- 책임·제외·비적합 구역은 위험색 없이 선과 표면 차이로 구분한다.

### 카피·근거

- `리브랜딩 실행 프로젝트`, `월간 브랜드 마케팅`, `적합성 대화`, `리브랜딩 / 월간 / 기타`가 노출된다.
- 타 클라이언트 사례와 검증 전 경력은 노출되지 않는다.
- 성과 수치·고객명·후기·가격·평균 기간을 임의로 만들지 않았다.
- 생성 시안을 실제 결과나 고객 성과로 제시하지 않는 경계를 명시한다.

### 자산

- 기존 파동은 CSS `image-set()`의 AVIF 우선·PNG fallback으로 로드된다.
- 새 OG는 r2 카피와 동일한 1200×630 PNG다.
- `scripts/og-card.html`은 렌더 원본이며 production 표면에서 제외된다.

## 기능·접근성

- 한 개 `<main>`, 한 개 H1
- 네이티브 `<details>/<summary>` 8개
- FAQ `두 상품은 어떻게 다른가요?` 클릭 뒤 open=true
- 열린 FAQ의 active element는 `SUMMARY`, 높이 78px
- 모든 primary CTA는 승인된 카카오 URL, `_blank`, `noopener noreferrer`, 고유 위치 metadata를 유지
- `/interview`에서 `ad-mode=true`, footer 비필수 채널 `display:none`
- root에서는 footer 채널 노출
- localhost에서 `window.gtag`, `window.fbq` 모두 undefined
- 브라우저 콘솔 error 0
- 중간 폭에서 sticky header `is-scrolled=true`와 가로 넘침 0
- 390px 최종 CTA와 첫 메시지 예시가 346px 폭 안에서 단일열로 표시
- `focus-visible`, skip link, reduced-motion 규칙 존재
- 핵심 본문은 정적 HTML이라 JS가 없어도 읽힌다.

## 자동 검사

```text
npm run check
Site contract check passed (10 tracked links, 21 unique ids).
git diff --check
PASS
```

검사는 r2 필수·금지 문구, SEO 메타, CSS v19, 카카오 URL, 추적 metadata, Meta PageView·Contact·Lead 금지, AVIF 자산, OG PNG·크기를 포함한다.

## 발견과 수정

### Pass 1

- 긴 헤더 CTA가 320px에서 과밀할 위험
  - 수정: 헤더만 `적합성 대화`로 축약하고 본문 CTA는 완전 문구 유지
- 320×568에서 긴 hero 설명이 CTA를 밀어낼 위험
  - 수정: 핵심 의미는 유지하고 형식 나열을 줄인 뒤 짧은 화면 breakpoint 조정
- V2 OG에 옛 H1·CTA 잔존
  - 수정: r2 OG 렌더 원본과 1200×630 PNG 교체
- 기존 정적 검사가 r2 의미를 확인하지 않음
  - 수정: 필수·금지 카피, SEO, CSS 버전, 카카오 URL을 검사 계약에 추가
- hash target이 sticky header 아래에 가려질 수 있음
  - 수정: section·final H2에 `scroll-margin-top:112px`
- 내부 루트 `CLAUDE.md`의 배포 표면 제외 누락
  - 수정: `.vercelignore`에 추가

### Pass 2

1440·390·320 화면, 두 상품, 진행 순서, 적합성, FAQ와 OG를 재검수했다. 로컬 기준에서 남은 P0·P1·P2는 없다.

## production에서만 남은 검증

- Vercel preview·production Ready와 source SHA
- `/interview/` 308 및 query 유지
- 내부 문서·OG 렌더 원본 404
- 운영 GA4·Meta PageView·Contact event payload
- 클라이언트 `Lead` 미전송

최종 변경본의 공개 승인을 받았으며 branch preview와 production에서 수행한다.

final result: `LOCAL PASS / PUBLIC DEPLOYMENT APPROVED / RELEASE IN PROGRESS`
