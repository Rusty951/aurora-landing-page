# Workflows

## 작업 전

1. `README.md`, `AGENTS.md`, `prd.md`를 읽는다.
2. 작업 성격에 맞는 `docs/*`를 읽는다.
3. 카피 변경이면 최신 오로라 Voice와 사용자 직접 발언을 우선한다.
4. 현재 `git status`와 배포 경계를 확인한다.

## 랜딩 수정

1. 현재 Creative Brief 상태를 확인한다. `DRAFT`·`HELD`면 브리프 검토에서 멈추고 source·카피·디자인·OG를 수정하지 않는다.
2. `APPROVED` 브리프에서 문제·타깃·약속·CTA 중 무엇을 바꾸는지 고정한다.
3. `/`와 `/interview`가 같은 핵심 화면을 유지하는지 확인한다.
4. CTA는 `id`, `data-track`, `data-cta-location`, 필요 시 `data-primary-cta`를 함께 갱신한다.
5. 스타일·UI·추적 파일을 바꾸면 캐시 버전을 올린다.
6. `npm run check`를 실행한다.
7. 로컬 데스크톱과 390px 모바일을 캡처하고 육안 비교한다.

## 분석 수정

1. HTML `data-track` 계약을 단일 원본으로 유지한다.
2. GA4·Meta가 운영 호스트에서만 실행되는지 확인한다.
3. Meta `PageView`가 광고 경로에서 한 번만 전송되는지 확인한다.
4. 카카오 클릭 `Contact`와 실제 문의·`Lead`를 구분한다.
5. 루트·광고 경로·UTM 5종이 이벤트에 붙는지 확인한다.
6. localhost에서 네트워크 수집이 없는지 확인한다.

## UI QA

1. 1440px 데스크톱과 390×844 모바일을 확인한다.
2. 가로 스크롤, 텍스트 잘림, 배경 대비, 섹션 여백을 본다.
3. 헤더, 모든 CTA, 외부 링크, FAQ를 직접 작동시킨다.
4. 키보드 포커스와 터치 영역을 확인한다.
5. 레퍼런스와 구현을 하나의 비교 이미지로 본다.
6. P0·P1·P2 문제를 수정하고 `design-qa.md`에 결과를 기록한다.

## 배포

1. 기능 브랜치에서 로컬 검수를 완료한다.
2. 변경 파일, 검증 결과, 남은 위험을 보고한다.
3. 사용자의 명시적 공개 승인을 받는다.
4. 그 뒤에만 commit, push, production 배포를 진행한다.
5. 운영 `/`, `/interview`, `/interview/` 정규화와 실제 이벤트를 다시 확인한다.

## 문서 갱신

- 제품·CTA·URL: `prd.md`, `README.md`, `docs/PRD.md`
- 디자인·카피: `docs/DESIGN.md`
- 기술·추적·check: `docs/TRD.md`, `README.md`
- 반복 절차: `docs/WORKFLOWS.md`
- 공통 전제 변경: `docs/DECISIONS.md`
