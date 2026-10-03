## 2026-10-02 라벤더 유리 버튼·중앙 문의·하단 아이콘

대표 요청으로 작업 보기의 화살표를 제거하고 작업 보기·본문 카카오 문의·플로팅 문의를 옅은 보라색 유리 질감으로 통일했다. Let’s talk, 초대 문구, 첫 메시지 안내, 문의 버튼과 함께 일하는 방법을 중앙 축으로 정렬한다. 펼친 방법 설명은 두 열/모바일 한 열로 왼쪽 정렬해 읽는다.

홈과 포트폴리오 42개 하단은 유튜브 → 페이스북 → 인스타그램 → 이메일 아이콘 순서다. 보이는 이메일 주소와 화살표를 봉투로 바꾸고 접근성 이름·mailto·기존 추적 ID를 유지한다. 모바일 영문 Disclaimer는 13px에서 11px/행간1.7로 줄이고 문구는 유지한다. 공통 CSS v15, 기존 JavaScript와 작품 자산은 유지한다.

버튼은 밝은 가장자리, 비대칭 반사광, 약한 보라색 그림자와 backdrop blur로 깊이를 표현한다. 글자는 어두운 자주색을 사용하며 hover에서도 유리 색을 유지한다. 버튼 양축 정렬·키보드 초점과 각 아이콘44px 터치 영역을 유지한다. 모바일 Disclaimer의 작아진 비중은 요청에 따른 의도이며 데스크톱은13px다.

## 2026-10-02 플로팅 문의 버튼

오른쪽 아래 밝은 알약형 버튼으로 기존 CTA 색·Asta Sans·중앙 정렬을 이어간다. 장식 화살표 없이 말풍선 아이콘과 카카오톡 문의를 표시한다. PC 높이54px/가장자리24px, 모바일 높이52px/가장자리16px와 safe area를 적용한다. 확대 dialog에서는 숨기며 닫으면 복원한다. footer 끝 여백과 scroll-padding-bottom을 확보해 마지막 링크를 고정 버튼 아래에 두지 않는다. 홈페이지 hero와 본문 문의 링크가 보일 때 중복 노출을 줄인다.

## 2026-10-02 문의 타이포그래피와 CTA 정렬

- Kakao 연결 안내 문장과 연결된 aria-describedby를 제거한다. 카카오톡 문의하기 버튼은 유지하며 홈페이지·포트폴리오의 프로젝트 문의에서 화살표를 제거한다. 두 버튼의 글자는 flex 양축 center와 중앙 텍스트로 정렬한다.
- 문의 초대24px/모바일20px, 첫 메시지 안내22px/모바일20px, 함께 일하는 방법18px, 펼친 설명17px/제목19px. 본문과 버튼의 대비·행간 및 기존 라벤더 색을 유지한다. 모바일 상단 문의는13px이며 터치 높이44px다.
- 한글 기본/제목은 Asta Sans, 영문 기본은 DM Sans, 이탤릭 강조는 Instrument Serif. 글자 폭 변경 후320/390px 줄바꿈을 확인했고 작업 설명은 keep-all로 단어가 중간에 끊기지 않게 한다. 4:5 작품과 작은 작품 캡션 원칙을 유지한다.
- Asta Sans는 Google Fonts 동적 서브셋으로 제공한다. 공식 설계·OFL 출처: https://github.com/42dot/Asta-Sans 및 https://github.com/google/fonts/tree/main/ofl/astasans . 시스템 폰트를 설치하거나 작업 이미지 내부 글자를 변경하지 않는다.

최종 판정은 운영 가능한 수정본이다. 엄격한 전체 검토에서 추상적인 첫 화면의 차별성, 서비스 구역의 상대적으로 평평한 위계, 모바일 영문 Disclaimer의 큰 비중은 추가 개선 여지로 남았다. 고객 이해도·문의 효과를 검증했다는 뜻은 아니다. 최신 화면·측정 근거는 design-qa.md 및 Desktop 검토 보고서를 따른다.

## 2026-10-02 엄격한 디자인 검토 반영

Status: `LOCAL QA PASSED / RELEASE CANDIDATE`

대표가 승인한 디자인 검토 항목을 기존 홈페이지에 적용했다. 실크·다크·라벤더 색과 산세리프/세리프 조합, 작은 작업 캡션, 총 40개 작업을 유지한다.

- 첫 화면: 영문 제목의 상대적 비중을 줄이고 서비스 문장과 작업 보기 버튼을 강조했다. 배경 위에 스크림을 두고 장식용 영문 안내를 덜었다.
- 재생 설정: 화면에 고정하던 음악·움직임 컨트롤을 hero와 footer의 각 공간에 배치했다. 두 그룹의 텍스트·접근성 상태와 조작 결과를 동기화한다.
- 서비스·문의: 서비스 본문 16px, 제작 예시 15px, 범위 안내 14px를 기준으로 구분한다. PC에서도 첫 메시지 안내와 카카오 버튼을 가까이 묶고 Let’s talk의 비중을 줄였다. 영문 Disclaimer 문구는 보존하고 읽기 폭·줄 간격을 조정했다.
- 갤러리: 대표 시안 16개와 콘셉트 스케치 18개의 전시 비중을 나눴다. 스케치는 네이티브 `<details>`로 펼치며 실제 헤더 높이 아래에 붙는 분야 메뉴로 긴 목록에서 다시 탐색한다. 이미지 34개와 웹사이트 6개를 삭제하거나 새 작업으로 대체하지 않았다.
- 이미지 보기: 모바일 뷰어를 화면 폭으로 넓히고 원본 열기와 인스타 각 장의 내용 읽기를 제공한다. 핵심 설명은 36개 상세에서 이미지 위로 옮겼고, 이미 앞에 있던 인스타·캐릭터 4개의 구조는 유지한다.
- 프레이밍: aurora-in-print, aura-archive, bb-p-0010, bb-f-0189, bb-f-0283의 crop/contain을 작업에 맞게 조정했다. 4:5 틀과 원본 파일은 유지하며 중요 내용이 잘리는 작업은 전체 보기를 사용한다.

문의 URL·추적 의미, AI/자체 시안/가상 표기와 기존 문구 교정은 유지한다. 고객 이해도나 문의 효과의 향상을 검증한 것으로 표현하지 않는다. `npm run check`는 통과했다. Chrome PC·모바일·320px 화면과 주요 조작 검수를 통과했으며, 배포는 이 검수 후 진행한다. 최종 검수 및 배포 근거는 `design-qa.md`의 최신 항목에 기록한다.

아래 날짜별 기록은 각 변경 당시의 이력이며, 이번 수정의 상태와 구현 기준은 이 항목을 우선한다.

## 2026-10-02 포트폴리오 확정 문구 오류 교정

단일 이미지인 망고·수박 상세에서 여러 구도를 함께 보여준다는 문장을 삭제하고 AI 제작 안내는 유지했다. 포트폴리오 검색·공유 설명의 `캐릭터 작업을`, 빛결 본문의 `상담 준비를`, 버디 본문·검색·공유 설명의 `버디 운영팀장을`로 조사를 교정했다. 실제 표시되는 작업과 설명을 맞추는 문구 수정이며 작업물 구성과 디자인, 문의·추적 동작은 유지한다.

## 2026-10-02 첫 화면의 제작 분야 안내 강화

검토 제안 2번에 대한 대표의 수정 요청으로 첫 화면의 설명을 `제품 이미지와 인스타 콘텐츠, 웹사이트를 만듭니다.`로 바꾸고 데스크톱 23–30px, 모바일 18–20px로 강조했다. 기존 작은 중복 안내는 통합하고 작업 보기 링크를 데스크톱에서는 옆, 모바일에서는 바로 아래에 둔다. 실크와 영문 타이틀을 활용한 기존 화면 구성을 이어가며 공통 CSS v11을 적용한다.

## 2026-10-02 영문 Disclaimer

대표가 요청한 언어에 맞춰 공통 하단의 작업물 이용 안내 제목을 `Disclaimer`로, 두 문단을 영어로 교체했다. 자체 기획 시안·AI 이미지·가상 사업체와 실제 고객 사례를 구분하는 내용 및 자료 이용 조건은 보존한다. 홈과 포트폴리오 41개 페이지에 동일하게 적용하고 `lang="en"`을 지정했다.

## 2026-10-02 링크 밑줄·문의 버튼·저작권 표시

대표 요청에 따라 첫 화면의 `작업 보기`와 `포트폴리오 전체 보기` 링크 밑줄을 제거하고 최종 문의 버튼을 `카카오톡 문의하기`로 바꿨다. 홈페이지와 포트폴리오 41개 페이지의 하단 표기를 `© 2026 오로라의소리. All rights reserved.`로 맞췄다. 기존 카카오 연결 주소와 추적 속성은 유지하며 공통 CSS는 v10을 사용한다.

## 2026-10-02 하단 소셜 채널

홈페이지와 포트폴리오 목록·상세 40개의 하단 이메일 아래에 유튜브 → 페이스북 → 인스타그램 아이콘을 연결했다. 흰색 22px 아이콘과 44px 클릭 영역을 사용하며 장식 구분선은 추가하지 않는다. 모바일에서도 같은 순서를 유지한다. 기존 Instagram 텍스트 링크는 아이콘으로 통합한다.

공식 YouTube 고정 Channel ID, Facebook 페이지 ID와 Instagram 주소를 사용한다. 홈페이지의 Instagram·이메일 추적 ID와 카카오 이벤트 의미를 유지하고 YouTube는 기존 click_youtube 이벤트에 연결한다. Facebook에 새 분석 이벤트를 만들지 않는다. 광고 경로 /interview에서는 세 소셜 링크를 숨긴다. 공통 CSS v9 및 포트폴리오 CSS v12를 적용한다.

# Design

## 2026-10-02 승인된 리본 A 파비콘

대표가 홈페이지의 진주빛 실크를 참고한 A 시안에서 리본을 조금 얇게 다듬은 안을 승인하고 Drive 업로드와 실제 파비콘 적용을 요청했다. 승인 PNG 1254x1254를 그대로 사용하며 추가 조형 변경 없이 32, 96, 192, 512px PNG, 180px Apple Touch Icon, 16/32/48px ICO를 만든다. 16/32/48px 크기 검수에서 A 윤곽과 내부 여백을 확인했다. 원본은 Drive A01_오로라의소리/20_BRAND의 [승인 파비콘 원본](https://drive.google.com/file/d/1axrVb6YdM4jVYOGH-zInIXpXgHlUtmls/view)에 보관한다. 홈페이지, 광고 경로, 개인정보처리방침과 이용약관에 같은 아이콘을 적용한다. 날짜가 포함된 새 PNG 경로와 ICO query로 이전 아이콘 캐시와 구분한다. 기존 favicon.svg는 과거 자산으로 유지하되 현재 페이지에서 참조하지 않는다. 헤더 워드마크와 콘텐츠, 분석 설정은 변경하지 않는다.


Status: `LIVE r2 / PRODUCTION VISUAL QA PASS`

적용 완료: 구현 커밋 5925512afaf94247bae272a3ceb1f2ba5181c9e5의 Vercel Preview 6799461502와 Production 6799474940가 성공했다. Preview URL은 Vercel 로그인으로 이동해 익명 시각 검수는 하지 않았다. 운영 홈, /interview, privacy.html, terms.html과 ICO 및 PNG 5종은 200이며 응답 바이트가 소스와 일치한다. 인앱 실제 DOM의 icon 및 apple-touch-icon 주소와 공개 512px 아이콘을 확인했다. npm run check와 git diff 검사를 통과했다. 실제 적용 화면은 ~/Desktop/codex-output/01_최종산출물/오로라의소리_파비콘적용확인_2026-10-02.png에 있다. 이전 파비콘은 Git 이력과 기존 SVG에 보존한다.

Drive readback으로 브랜드 폴더의 [512px PNG](https://drive.google.com/file/d/1-8KI6eieXXmDiLG1NQdpJQy26O2i-qFx/view), [ICO](https://drive.google.com/file/d/1utTA_msNU3yMJv42bxq5UdlFIQp9Yslz/view)와 승인 원본의 이름, 크기, 저장 위치를 확인했다. 검색 결과 파비콘 반영 시점은 별도이며 이번에 검색 서비스 재제출을 수행하지 않았다.

## 방향

V2의 안정적인 다크 편집형 골격을 버리지 않고, 최신 포지션·두 상품·증거 경계에 맞춰 정보 구조와 카피를 전면 교체했다. 새 이미지를 생성하지 않고 기존 파동 자산을 히어로와 최종 CTA에만 재사용한다.

시각 목표는 `차분하지만 기준이 선명한 리브랜딩 실행 파트너`다. 화려한 대행사 쇼릴, 로고 스튜디오, 경영 컨설팅 사이트처럼 보이지 않게 한다.

## 첫 화면

- Eyebrow: `리브랜딩 실행 파트너`
- H1: `사업이 바뀌는 순간, 고객에게 보이는 것부터 바꿉니다`
- 설명: 변화 시점과 첫 콘텐츠·우선 접점 적용을 한 문장에 둔다.
- CTA: 본문 `적합성 대화 요청하기`, 좁은 헤더 `적합성 대화`
- 안내: 첫 메시지에 `리브랜딩 / 월간 / 기타` 중 하나를 적는다.
- 데스크톱 보조 정보: 새 매장·서비스 / 리뉴얼·이전·확장 / 가맹 전환·세대교체

첫 화면에서 변화 시점·역할·다음 행동이 동시에 보여야 한다. 320×568에서는 보조 정보 패널을 숨기고 CTA와 문의 유형 안내를 첫 화면 안에 남긴다.

## 시각 시스템

- 바탕: `#09090e` 중심 차콜
- 표면: `#14141e`, `#191924`, 제한된 보라 톤 표면
- 본문: `#f5f3f8`, 보조 `#cbc7d2`
- 강조: `#a276ff`, CTA `#8050e8`
- 카카오 작은 강조: `#fee500`
- 서체: Pretendard Variable 한 종류
- 컨테이너: 최대 1240px
- 데스크톱 헤더: 76px
- 모바일 헤더: 68px, 짧은 320×568은 62px
- 구분: 얇은 선, 넓은 여백, 번호형 편집 리듬

보라색 실면은 CTA와 주력 상품의 상단 규칙에 집중한다. 아이콘은 카카오 CTA 외에 사용하지 않아 업무 구조가 장식보다 문장으로 읽히게 한다.

## 섹션 구조

1. `Hero`: 왼쪽 대형 타이포, 오른쪽 실제 파동과 변화 시점 패널
2. `Moments`: 데스크톱 4열, 모바일 1열 번호 목록
3. `Role`: 왼쪽 제목, 오른쪽 주요·조건부·제외 경계
4. `Offers`: 리브랜딩 60%, 월간 40% 비대칭 비교
5. `Process`: 왼쪽 sticky 제목, 오른쪽 0~5 세로 흐름
6. `Responsibility`: 대표·AI·전문 파트너 책임과 기본 제외 업무
7. `Fit`: 적합 65%, 비적합 35%
8. `FAQ`: 네이티브 `<details>`
9. `Final CTA`: 파동 배경과 첫 메시지 작성 예시

타사 사례 카드와 검증 전 대표 경력 문구는 제거했다. 이를 시각적 빈칸으로 보충하지 않고 진행 순서·책임·경계를 실제 확인 가능한 정보로 보여준다.

## 반응형

### 1440×1024

- H1 최대 92px, 3줄
- 히어로 좌 1.65 / 우 0.55
- 변화 시점 4열
- 상품 1.15 / 0.85 비대칭
- 역할·진행·책임은 제목과 본문 2열

### 390×844

- H1 약 46px, 자연스러운 4줄
- 헤더 CTA를 `적합성 대화`로 축약
- 히어로 보조 패널 숨김
- 모든 비교 구조 단일열
- 본문 CTA 전체 폭

### 320×568

- H1 33px
- 짧은 화면 전용 간격과 48px CTA
- 헤더 아이콘을 숨기고 텍스트 CTA 유지
- 히어로 CTA bottom 약 436px, 유형 안내 bottom 약 481px

## 접근성과 상태

- 한 개 `<main>`과 한 개 H1
- 본문 바로가기 링크
- 네이티브 `<details>/<summary>`
- 44px 이상 주요 터치 영역
- 노란색 `focus-visible` 외곽선
- `prefers-reduced-motion`에서 전환과 스크롤 움직임 축소
- JS가 없어도 핵심 본문과 FAQ 구조가 남는다.
- `/interview`는 footer 비필수 채널 링크만 숨긴다.

## 자산

- 히어로·최종 CTA: `aurora-wave-bg.avif` 우선, PNG fallback
- OG: `assets/aurora-og.png`, 1200×630 PNG
- OG 렌더 원본: `scripts/og-card.html`, `.vercelignore`로 production 제외

## 검수 기준

- 화면 캡처: `~/Desktop/codex-output/aurora-landing-revamp/qa-r2/`
- 세부 결과: `../design-qa.md`
- P0·P1·P2 0건일 때만 공개 승인 요청
- 공개 승인 뒤 preview와 production에서 같은 화면·자산·정규화를 다시 확인

## 2026-09-29 — 리브랜딩 후보 v2 / 로컬 검토

사용자가 평가 후 실제 3D 핵심 장면의 제작을 요청했다. 기존 색·진주빛·서체 방향을 이어가며 `/rebrand/` 후보를 수정했다. 운영 r2의 디자인은 그대로다.

- 첫 화면은 읽을 수 있는 크기의 한국어 H1과 업무 설명을 중심으로 한다. DM Sans/Instrument Serif는 영문 조형 요소, Pretendard는 한국어를 담당한다.
- 실시간 조형물은 4개의 실제 리본 메시와 원근 카메라, 환경 조명을 사용한다. 이미지를 흔드는 초기 2.5D 방식은 제거했다.
- 약 3개 화면 길이의 자연 스크롤에서 닫힌 곡면 → 펼쳐진 리본 → 새로 정돈된 곡면을 보여준다. 커서는 공간과 곡면을, 클릭은 표면의 파동을 바꾼다. 장면 번호 버튼으로 직접 이동할 수도 있다.
- 같은 이미지가 반복되던 구역은 자체 브랜드 메시지·타이포 시안으로 대체했다. 선명함/온기/깊이 선택에 따라 문장·색·타이포가 함께 달라진다. 실제 고객 작업·성과로 표시하지 않는다.
- 서비스·과정·문의는 한국어 정보의 위계를 높였다. 음악·모션 컨트롤은 12px 글자, 46px 높이. 주요 본문은 모바일 14~15px 이상을 사용한다.
- 390px에서는 읽기 영역 아래에 조형물을 배치한다. 320×568처럼 높이가 짧은 화면에서는 부차적 영문과 보조 링크를 덜고 장면 버튼을 세로로 배치한다.
- 정적 대체 이미지는 v2 실시간 장면을 직접 캡처해 WebP로 인코딩했다. 화면을 막는 로딩/입장 버튼은 없다.
- 초기 ImageGen 이미지 `resonance.webp`는 원본을 보존하며 마지막 섹션의 흐린 배경 질감에 사용한다. 최초 프롬프트와 생성 이력은 이 작업 대화에 남아 있다.

검수 목표는 실제 3D·장면 전개·읽기 위계·반응형 동작이다. 레퍼런스 스튜디오와 동일한 제작 규모나 시장 성과를 주장하지 않는다.

## 2026-09-29 — v3: 첫 버전의 미감으로 복귀

v2를 본 사용자가 이전보다 별로라고 피드백했다. 규칙적인 금속 띠가 주인공이 되면서 원본의 섬세한 주름·비대칭 구도·큰 타이포가 약해진 점을 수정한다.

- 기본 첫 화면은 원본 실크 이미지와 `Beyond the ordinary.`의 큰 타이포로 복원한다. 한국어 역할 설명은 11~13px, 약속 문장은 14~19px로 보조한다.
- 세 화면 길이의 도입부를 기본 경로에서 제거한다. 한 화면을 본 뒤 브랜드 설명·적용 시안으로 자연스럽게 이동한다.
- 모션은 질감을 크게 비틀지 않는 작은 흐름, 커서 근처 굴절, 클릭 파동과 빛, 스크롤 확대에 집중한다.
- v2의 한국어 본문 위계, 고정 문의, 음악·모션 컨트롤, 자체 시안은 유지한다.
- 실제 3D 메시 소스는 개발용 `?render=mesh`에 보존한다. 기본 경로의 이미지 기반 효과를 실제 3D 조형이라고 주장하지 않는다.

## 2026-09-29 — 첫 화면 확인 후 다음 구성 방향

사용자는 v3의 첫 화면을 좋다고 확인했다. 현재의 실크 이미지·큰 타이포 첫 화면을 기준으로 유지한다. 본문은 글 비중을 줄이는 방향으로 레퍼런스를 다시 조사했으며, 제안 순서와 확인 범위는 `REFERENCE_SITES.md`의 최신 절을 따른다. 제안된 나머지 섹션 구성은 아직 채택된 최종 화면으로 기록하지 않는다.

## 2026-09-29 — v4: 첫 화면에 맞춘 자체 콘셉트 시각물

사용자가 기존 시각물을 준비하는 대신 사이트의 수준과 분위기에 맞게 만들어 넣도록 요청했다. 승인된 실크 첫 화면은 유지하고, 그 소재가 인쇄물·디지털 화면·클로즈업으로 이어지는 한 가족의 시각물을 만든다. 길던 설명 섹션을 3개 자체 콘셉트 쇼케이스와 짧은 소개·문의로 정리한다.

### 생성 범위와 출처

- Provider: 내장 ImageGen. 현재 도구 세션의 기본 서비스 모델을 사용했으며 별도 모델/계정 ID는 도구에서 노출하지 않는다. 외부 API 전환·크레딧 구매·공개 게시 없음.
- 사용자 권한: 현재 대화의 ‘사이트 수준에 맞게 만들어서 넣자’ 요청과 앞서 합의한 자체 프로젝트/콘셉트 시안 범위.
- 입력은 직접 생성했던 `rebrand/assets/resonance.webp` 1개를 소재·색 참고로 사용했다. 비공개 고객 자료·인물 identity 입력 없음.
- 입력 SHA-256: `451f499976fdf668ad4e3359be816378448c1066a06d5923089c7d1448d4ee38`.
- 총 범위: 3개 이미지 각 1회, 필요 시 같은 소재·조명·크롭 범위의 보정 1회로 최대 4회/4출력. 실제 실행 3회/3출력, 보정 0회. 세 이미지 모두 첫 검수에서 채택해 종료했다.
- 첫 화면 HTML 보존 SHA-256: `362756b0b8aa13e03019d19c71bb81e250b4fd7094f6360f7990686de60e6117`. 통합 후 동일함을 확인했다.

| 결과 | 파일 | 크기 | 용도 |
| --- | --- | --- | --- |
| Aurora, in print. | `rebrand/assets/showcase-identity.webp` | 1536×1024, 211,622 bytes | 큰 첫 쇼케이스, 브랜드 인쇄물 콘셉트 |
| Aura archive. | `rebrand/assets/showcase-digital.webp` | 1536×1024, 165,876 bytes | 디지털 화면 콘셉트 |
| Soft resonance. | `rebrand/assets/showcase-material.webp` | 1536×1024, 165,638 bytes | 빛과 소재의 비주얼 연구 |

원본 PNG는 tool-owned 생성 경로 `/Users/bananabk/.codex/generated_images/01a0ecc5-86ef-7c51-afa8-0b3465c20b8d/` 아래 각각 `exec-c6b69940-ffa0-473a-8d35-77dcbb24061a.png`, `exec-bcfea74b-81cd-4879-b25d-8fd37ed61778.png`, `exec-d13d8247-f3e0-4d70-8f59-1924e1ff8567.png`로 보존한다. 실사용 자산은 WebP 품질 86/87/86으로 인코딩했다.

### 최종 생성 프롬프트

모든 호출에 같은 원본 실크 이미지를 `referenced_image_paths`로 실제 첨부했으며, 배경 투명도는 false였다.

**Identity**

> Use case: product-mockup derived from the supplied reference. Image 1 is a MATERIAL AND PALETTE REFERENCE only, not a layout to reproduce. Create a new premium editorial photograph of a self-initiated brand identity study for Aurora Sound, a sophisticated creative studio. Landscape 1536 x 1024. One coherent physical still life, not a collage or moodboard. A thick pearl-white art book rests diagonally on an oversized matte charcoal portfolio folder on a warm light-grey plaster table. The book cover has a beautiful restrained embossed crop of iridescent folded silk, inspired by the reference's fine grooves and pearl-lilac-ice-blue reflections, like sculptural foil pressed into paper. Sophisticated extremely large black serif title 'AURORA' on the cover with tiny 'SOUND' underneath. A single small lilac business card tucked beside the book bears 'aurora sound' in refined black sans serif. One partially visible translucent vellum page adds depth. Three objects maximum. Printed objects appear professionally art-directed, real premium papers with subtle tactile grain, crisp typography, authentic embossing and foil. Camera elevated three-quarter angle, editorial fashion-book photography, huge soft north window light, long soft shadow, quiet luxurious composition, unexpected asymmetry, image fills the frame, generous but intentional negative space. Warm white paper occupies roughly half the frame, deep charcoal and soft lavender balance it. This must look like a world-class branding studio portfolio photograph. NO screens, NO website chrome, NO scattered random stationery, NO stock mockup template, NO lorem ipsum, NO registration symbol, NO other brands, NO watermark. The image is the finished asset itself, not a page design.

**Digital**

> Use case: product-mockup derived from supplied artwork. Image 1 is a material, lighting, and color reference only. Create a new art-directed digital design concept photograph for Aurora Sound's own studio exploration. Landscape 1536 x 1024. A single impossibly thin landscape glass display with a subtle dark metallic edge is standing at a gentle three-quarter angle on a low charcoal monolith in a dark violet architectural studio. The screen is the hero, taking 70 percent of the composition, with enough surrounding space to see the physical edge and contact shadow. On the display: an exceptionally sophisticated editorial website concept. Its off-white screen has the large precise black serif word 'AURA' at upper left, the small restrained text 'An archive of light.' beneath, and a single enormous luminous pearlescent sculptural folded-glass form occupying most of the right and lower screen. The sculpture is a new abstract crystalline silk shape, not a ring or donut, and inherits silver/lilac/ice-blue highlights from the reference. A very fine black typographic navigation at top right reads 'Collection   About'. The screen composition is elegant and spacious, no app dashboard, no cards, no fake tiny paragraphs. Outside the screen the setting stays nearly black, with subtle diffused pale-violet light from the display and one soft reflected streak on the plinth. Premium luxury-product photography, true-to-life glass reflections, slight atmospheric depth, cinematic clean focus, remarkable balance. A single screen, no phone, no keyboard, no desk clutter, no Apple or other manufacturer logo, no humans, no browser chrome, no watermark. Keep the display's contents sharp and visually plausible. This is a fictional self-initiated concept, not a client case study. Finished portfolio image only.

**Material**

> Use case: stylized-concept derived from supplied artwork. Image 1 is ONLY a reference for pearlescent optical-silk material and the restrained silver, pale lilac, ice blue, peach palette. Create a NEW finished visual art-direction study for the same sophisticated creative studio, matching its luxurious aesthetic while clearly different in composition. Landscape 1536 x 1024. Extreme macro photograph of a monumental, delicately folded translucent glass-and-silk membrane. Three broad organic folds sweep diagonally through the frame from bottom-left toward top-right, with exceptionally fine closely spaced striations. The frame is immersive and abstract, as though entering the material's landscape: luminous frosted pearl foreground, one clear glass edge with subtle prismatic dispersion, deep lavender shadow inside the fold, a small pool of inky charcoal negative space in the upper-left. Shallow but controlled depth of field, a restrained studio light makes the grooves and layered translucency visible. Tactile detail, fluid elegant shapes, exquisite soft highlights, fine analog grain, editorial beauty-campaign sophistication. NOT a ring, NOT a donut, NOT plastic, NOT a rainbow blob, NOT liquid chrome bubbles, NOT a recognizable flower or seashell, NO stars, NO text, NO logo, NO watermarks. Avoid blown out whites and oversaturated neon. This should feel like a sophisticated visual identity film still: a quiet, sensual, luxurious continuation of the reference, not a duplicate of its silhouette. Image only.

### 화면 적용

인쇄물을 큰 첫 장면으로, 디지털 화면과 소재 연구를 높이가 다른 두 장면으로 배치한다. 이미지를 선택하면 전체 이미지와 짧은 콘셉트 설명을 dialog로 보여준다. 본문은 이름·분야 라벨 중심으로 줄이고, 자체 콘셉트/AI 제작 표기를 유지한다. 문의·계약 범위는 접힌 설명으로 남긴다. 실제 고객 납품·인쇄·운영 실적으로 표현하지 않는다.

## 2026-10-03 — 가로형 영문 로고

승인된 Space Grotesk 600 기반 `절제된 끝선` 시안을 상단과 하단에 적용한다. 두 r의 끝선을 직접 조정한 동일한 SVG를 홈페이지와 포트폴리오의 공통 로고로 사용한다. 헤더 높이는 유지하며 모바일 로고 폭은 메뉴와 문의 버튼 사이 여유에 맞춰 줄인다. 홈페이지 하단은 더 큰 크기로 표시한다.

## 2026-10-03 — 상단 한글 이름 정렬

공통 헤더의 영문 설명을 제거하고 `오로라의소리`만 12px 회색 한 줄로 표시한다. 가로형 영문 로고와 간격은 24px이며 글자의 아래쪽을 시각적으로 맞춘다. 기존 작은 화면 숨김 규칙은 유지한다. 하단 설명은 이번 변경 범위에 포함하지 않는다. 공통 스타일 캐시는 v17이다.

## 2026-10-03 — 프로젝트 문의 유리 버튼

공통 헤더 문의 버튼은 14px 모서리와 진주빛 그라데이션 테두리, 기존 실크 이미지의 반사 질감을 사용한다. 흰색 문구와 화살표를 유지하며 호버할 때 빛이 한 번 지나간다. 작은 모바일에서는 화살표를 숨기는 기존 규칙을 유지한다. 모션 감소 설정에서는 빛 이동과 전환을 끈다. 링크 목적지와 추적 동작은 유지하고 스타일 캐시를 v18로 갱신한다.

## 2026-10-03 — 문의 버튼 2번 시안으로 교체

사용자가 선택한 https://uiverse.io/GreyD097/foolish-duck-89 를 기준으로 이중 크롬 테두리, 캡슐 형태, 사선 유리 반사를 적용한다. 팔레트는 은색과 연보라로 조정하고 작은 한글 문구는 흰색으로 유지한다. 이전 실크 이미지 배경은 제거했다. CSS 그라데이션으로만 표면을 그리며, 원본 MIT 고지는 `rebrand/assets/chrome-button-LICENSE.txt`에 보존한다. 공통 스타일 캐시는 v19다.

## 2026-10-03 — 기존 작업 보기 버튼과 통일

사용자 요청으로 상단 문의 버튼의 크롬 표현을 종료하고 기존 작업 보기 버튼과 동일한 연보라 그라데이션, 테두리, 그림자, 호버 CSS를 공유한다. 화살표는 제거하며 헤더에 맞춘 크기와 기존 링크 목적지를 유지한다. 스타일 캐시는 v20이다.

## 2026-10-03 — 상단 문의 버튼 존재감 보강

기존 연보라 유리 버튼을 바탕으로 상단 문의에 보라, 진주색, 옅은 파란색 그라데이션의 대비를 높였다. 이미 로드하는 Asta Sans 700과 좁은 자간으로 글자를 또렷하게 표시한다. 윗면 반사와 보라색 그림자, 호버 및 키보드 포커스의 1회 빛 이동을 추가한다. 모션 감소 설정에서는 빛 이동과 전환을 끈다. 스타일 캐시는 v21이다.

## 2026-10-03 — 상단 문의 버튼 비례 조정

승인된 검토안에 따라 701px 이상에서 문의 버튼 폭을 136px로 고정하고 Asta Sans 굵기를 600으로 조정한다. 모바일 폭은 콘텐츠와 기존 패딩으로 계산한다. 기존 그라데이션과 반사 효과를 재사용하며 스타일 캐시는 v22다.


## 2026-10-03 — 주요 버튼 시각 체계 통일

상단 문의 버튼의 보라, 진주색, 옅은 파란색 그라데이션과 Asta Sans 600을 작업 보기, 하단 카카오톡 문의하기, 고정 카카오톡 문의에 공통 적용한다. 윗면 반사, 호버 및 키보드 포커스의 1회 빛 이동, 누를 때의 음영도 공유한다. 각 위치의 크기와 고정 문의의 표시 조건, 링크와 추적 동작은 유지한다. 모션 감소 설정에서는 빛 이동과 전환을 끈다. 공통 스타일 캐시는 v23이다.


## 2026-10-03 — 주요 버튼 글자 크기 확대

승인된 조정에 따라 상단 프로젝트 문의는 15px, 작업 보기와 고정 카카오톡 문의는 16px, 하단 카카오톡 문의하기는 20px로 표시한다. 모바일에도 같은 크기를 적용한다. Asta Sans 600과 기존 그라데이션, 반사 효과를 유지하고 하단 문의의 세로 패딩은 17px로 조정해 버튼 높이 64px를 유지한다. 공통 스타일 캐시는 v24, 포트폴리오 스타일 캐시는 v15다.


## 2026-10-03 — 첫 화면 역할 설명 글자 확대

사용자가 지정한 `리브랜딩 실행 파트너` 문구를 데스크톱 14px에서 18px, 모바일 13px에서 16px로 키운다. 기존 굵기 500과 색상, 점 표시, 메인 제목과의 간격은 유지해 보조 설명의 위계를 지킨다. 문구 내용과 메인 제목, 본문은 변경하지 않는다. 공통 스타일 캐시는 v25다.
