# 오로라의소리 랜딩페이지

Status: `LIVE r2 / PRODUCTION VERIFIED`

> 승인된 `creative-brief-r2.md`를 반영한 r2는 2026-08-12 release commit `d96151e842d2fb3a3573ead56bebf1ea1b6ff371`로 `main`에 공개됐다. Vercel production Ready, 운영 경로·화면·자산·추적 계약 검증을 통과했으며 `https://www.aurorasound.kr/`의 현재 운영 버전은 r2다.

사업이 바뀌는 순간 고객에게 무엇으로 보일지 정하고, 첫 콘텐츠와 우선 접점에 적용하는 `리브랜딩 실행 파트너` 랜딩페이지다.

- 대표 URL: `https://www.aurorasound.kr/`
- 광고 URL: `https://www.aurorasound.kr/interview`
- 주력 상품: `리브랜딩 실행 프로젝트`
- 별도 반복 상품: `월간 브랜드 마케팅`
- 주요 CTA: `적합성 대화 요청하기`
- 연결: `https://open.kakao.com/o/sMBNyzpi`
- 문의 첫 줄: `리브랜딩 / 월간 / 기타`

카카오 링크 자체가 문의 유형을 자동 분류하지는 않는다. 페이지의 첫 메시지 안내로 방문자가 유형을 직접 적게 하고, 실제 대화·적합 문의·제안·계약은 클릭 이벤트와 별도로 기록한다.

## 페이지 흐름

1. 사업 변화 시점과 오로라의 역할
2. 리브랜딩이 필요한 실제 상태
3. 콘텐츠 중심 역할과 로고·UI·공간·경영 컨설팅 경계
4. 리브랜딩 실행 프로젝트와 월간 브랜드 마케팅 분리
5. 적합성 대화부터 인계·종료까지의 승인형 진행 순서
6. 대표·AI·전문 파트너의 책임 구조와 제외 업무
7. 적합·비적합 조건
8. FAQ와 20~30분 적합성 대화 CTA

공개 승인된 C001 자체 사례·성과·후기·경력 문구가 아직 없으므로 타 클라이언트 사례, 검증 전 경력, 가상 성과를 증거로 쓰지 않는다. 첫 배포 후보는 진행 순서·책임 구조·제외 경계만 확인 가능한 운영 기준으로 제시한다.

## 로컬 실행

```bash
npm run dev
```

- 대표/오가닉: `http://localhost:4173/`
- 광고 랜딩: `http://localhost:4173/interview`

## 검사

```bash
npm run check
git diff --check
```

정적 검사는 HTML 구조, r2 필수·금지 카피, CTA·카카오 URL·추적 계약, SEO 메타, CSS 캐시 버전, reduced motion, AVIF 우선 자산, Meta 이벤트 의미, OG 1200×630 PNG와 Vercel 경로 정책을 확인한다.

로컬 시각 검수 기준은 다음과 같다.

- `/`, `/interview`: 1440×1024, 390×844, 320×568
- 가로 넘침 0
- 한 개 H1, 네이티브 FAQ, 44px 이상 주요 조작 영역
- `/interview` 비필수 채널 숨김
- localhost GA4·Meta 미실행과 콘솔 오류 0
- 캡처: `~/Desktop/codex-output/aurora-landing-revamp/qa-r2/`

## 파일 구조

- `index.html`: `/`, `/interview` 공통 랜딩과 SEO·Meta Pixel 원본
- `style.css`: r2 다크 편집형 디자인과 반응형
- `script.js`: 고정 헤더 상태
- `analytics.js`: 운영 호스트 GA4와 광고 경로 Meta 이벤트
- `assets/aurora-wave-bg.avif`: 히어로·최종 CTA 배경
- `assets/aurora-og.png`: r2 1200×630 공유 이미지
- `scripts/og-card.html`: 배포 제외 OG 렌더 원본
- `scripts/check-site.mjs`: 정적 계약 검사
- `vercel.json`: `/interview` rewrite와 trailing slash 정책

## 배포

Vercel 프로젝트 `aurora-landing-page`가 GitHub `main` push 뒤 자동 배포한다. 빌드 스텝은 없다.

1. 기능 브랜치에서 로컬 검수를 완료한다.
2. 정확한 변경 파일·검증 결과·남은 위험을 사용자에게 제시한다.
3. 명시적 공개 승인을 받는다.
4. 그 뒤에만 commit·branch push·preview 검수·`main` push를 진행한다.
5. 운영 `/`, `/interview`, `/interview/` 정규화, 배포 표면과 실제 이벤트를 다시 검증한다.

force push는 사용하지 않는다. 실패하면 이전 Vercel production 재승격 또는 새 revert commit으로 복구한다.

## URL과 추적

- GA4는 운영 호스트에서만 실행한다.
- Meta Pixel `PageView`는 운영 호스트의 `/interview`에서만 한 번 실행한다.
- 광고 경로의 카카오 외부 링크 클릭은 Meta `Contact`로 기록한다. 실제 문의나 `Lead`가 아니다.
- 주요 카카오 CTA는 GA4 `click_cta_primary`와 `click_kakao_openchat`을 함께 보낸다.
- 이벤트에는 `landing_type`, `landing_path`, UTM 5종, `button_id`, `cta_location`, `is_primary_cta`가 붙는다.
- `script.js?v=6`, `analytics.js?v=7`의 의미는 바꾸지 않았고 `style.css`만 `v=19`로 올렸다.

## 공개 표면

`.vercelignore`는 `README.md`, `AGENTS.md`, `CLAUDE.md`, `docs/`, `prd.md`, `dev-server.mjs`, `scripts/`, `design-qa.md`를 배포에서 제외한다. production 배포 후 이 경로들이 404인지 다시 확인한다.
