## 2026-10-04 공통 서체 등록과 선택적 강조

기존 공식 원본 WOFF 두 파일의 font-face를 rebrand/fonts.css?v=1로 옮기고 홈 및 46개 포트폴리오 HTML이 한 번씩 로드한다. 등록 파일의 --ko-heading은 Arita Buri와 Asta Sans 대체 경로다. 공통 --sans 및 --serif와 기존 직접 서체 선언은 보존하며 선택한 큰 한글 제목에만 부리 600과 font-synthesis: none을 적용한다. 서비스와 작품 카드 h2/h3 및 동적 확대 제목은 기존 서체를 따른다. 법적 안내 문서와 별도 데모는 변경하지 않는다.

FAQ 질문 PC 20px 및 모바일 17px, 답변 PC 16px 및 모바일 15px, 답변 행간 1.8이다. 원본 두 파일 총 2,858,088바이트를 그대로 사용하며 변환과 서브셋 및 신규 preload는 없다. 공통 CSS v43, app.js v9, audio.js v3, 포트폴리오 CSS v23 및 work.js v12를 사용한다. check-site에서 중첩 상세를 포함한 47개 소비자의 서체 등록 의존성과 WOFF 헤더를 검사한다. 추적 설정과 JavaScript, 이미지 및 원본 샘플은 변경하지 않는다.

## 2026-10-04 FAQ 아리따 웹폰트

공식 AMOREPACIFIC Creatives의 font.css가 연결하는 Arita-buri-SB.woff 및 Arita-dodeum-M.woff 원본을 rebrand/assets/fonts에 보관한다. 글자 형태, 포맷과 문자 집합을 수정하지 않는다. 부리 파일은 1,154,312바이트, 돋움 파일은 1,703,776바이트이며 FAQ에서 쓰일 때만 CSS 폰트 로딩으로 요청한다. 별도 preload나 외부 폰트 CDN 요청을 추가하지 않는다. 공식 배포 경로, 저작권과 재배포 조건은 같은 디렉터리의 ARITA-LICENSE.txt에 보존한다.

실제 파일의 usWeightClass에 맞춰 부리 SemiBold를 600, 돋움 Medium을 400에 연결한다. Medium은 해당 공식 WOFF의 이름이며 임의 합성 500을 적용하지 않는다. font-display: swap과 Asta Sans 대체 경로, font-synthesis: none을 사용한다. FAQ 질문은 PC 22px 및 모바일 18px, 답변은 기존 17px 및 16px다. 전역 서체 토큰과 JavaScript 및 추적 설정은 변경하지 않는다. 홈의 CSS 주소는 v42이며 로컬 서버에 font/woff MIME을 추가한다.

## 2026-10-04 작은 볼륨의 기본 음악

app.js v9는 audio.js v3을 로드한다. AuroraScore의 master gain 목표는 0.018이며 기존 0.32의 5.625%, 약 25dB 낮은 신호 진폭이다. 페이드인의 시간 상수 0.65초를 유지한다. 시작 시 AudioContext가 running이면 음악을 예약하고 suspended이면 resume을 대기하지 않아 버튼을 막지 않는다. 첫 trusted click 또는 keydown에서 재시도하며 재생 버튼 자체의 입력과 합성 이벤트는 기본 시작 처리에서 제외한다. 시작 요청과 enabled 상태를 분리해 중복 resume 완료가 타이머를 복제하거나 stop 이후 음악을 되살리지 않게 한다.

sessionStorage의 aurora-sound는 사용자가 직접 켜기 또는 끄기를 선택했을 때만 갱신한다. 저장소가 막혀도 기본 시작과 조작을 유지하며 poster 모드는 자동 시작하지 않는다. 대기 및 실제 재생, 오류와 busy 상태를 기존 두 버튼에 동기화한다. visibility와 pagehide에서 재생을 멈추고 복귀 및 bfcache 복원에서는 현재 선택을 따른다. 시작 중 화면 복귀는 대기 완료 후 재시도한다. 관련 엔진과 제어기 검사는 작은 출력, 허용 및 차단된 기본 시작, 첫 실제 입력, 명시적 끄기와 저장소 예외, 숨김 중 취소와 중복 타이머를 포함한다. 문의와 분석 설정은 변경하지 않는다.

브라우저 정책 근거는 https://developer.chrome.com/blog/autoplay/ 의 Web Audio 절과 https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay 이다. 기기나 브라우저 설정을 우회하거나 변경하지 않는다. 다른 기기의 실제 출력 및 체감 음량은 별도 확인 대상이다.

## 2026-10-04 메인 FAQ 구현

index.html에 expertise 다음, contact 이전의 faq 구역과 네이티브 details 네 개를 넣는다. 기존 process ID는 첫 질문에 유지하고 문의 구역의 중복 설명을 제거한다. JavaScript가 없어도 질문 열기와 답변 읽기가 작동한다. 앱은 toggle 이후 문서 높이를 다시 측정해 스크롤 진행 표시를 갱신한다. CSS v41, app.js v8, contact.js v5다.

PC와 모바일에서 FAQ가 보이면 기존 고정 문의를 숨겨 질문과 답변을 가리지 않는다. 이미 키보드 초점이 있는 링크는 초점 이탈까지 보존한다. 기존 갤러리와 사진 상세, hero, 주 문의 및 dialog 상태를 재사용하고 관련 가림 방지 검사에 FAQ를 추가한다. 새 패키지와 외부 요청은 없으며 기존 추적과 URL 정책은 유지한다.

## 2026-10-04 웹사이트 유형 자리와 선택 상태

웹사이트 필터는 `website-signature`와 `website-essential`이다. 기존 `category=website` 진입은 Signature로 해석하며 Signature 버튼은 이 주소를 유지한다. Essential은 `category=website-essential`로 새로고침과 popstate에서 복원한다. 선택은 aria-pressed, 목록 제목 및 상태 안내에 반영하고 Photo와 Concepts의 버튼을 노출하지 않는다.

작품의 `data-website-tier`는 다음 리뉴얼 연결 시 지정한다. 이번에는 원본과 카탈로그 변경 없이 미지정 기존 여섯 카드를 첫 자리에 유지한다. 비어 있는 목록에서는 `work-website-empty`를 표시하며 작품이 연결되면 숨긴다. 실제 보이는 카드 순서에 따라 `data-website-column`을 지정하고 `work:filterchange` 이벤트에서 이전 이동을 초기화한다. 해당 열을 기준으로 기존 높낮이와 스크롤 모션을 유지한다. 정적 대체 목록과 prefers-reduced-motion은 보존한다.

스타일 v23과 갤러리 JavaScript v12는 46개 공개 포트폴리오 문서에서, 모션 v3은 목록에서 로드한다. `check-work.mjs`는 기존 주소 호환, 두 자리의 선택과 빈 상태, 새로고침, 앞으로 연결할 작품의 분리와 보이는 열의 리듬을 검증한다. 광고와 문의 및 추적 계약은 변경하지 않는다.

## 2026-10-03 1차 기준본의 기술 계약

운영 교체가 승인된 1차본은 현재 실크 renderer만 사용한다. rebrand/app.js v7은 silk.js v3을 로드하며 render=mesh로 이전 실험을 열지 않는다. 이전 rebrand/index.html과 루트 style.css, script.js, field.js 및 Three.js vendor와 캡처를 제거했다. package와 검사도 현재 운영 문서와 실크, 재생, 추적과 포트폴리오만 소비한다. 광고와 오가닉 조건, 정적 대체 이미지와 재생 상태, 공유 이미지 제작에 필요한 wave 자산은 유지한다.

공통 CSS v40, 목록과 상세 CSS v19, 문의와 목록 모션 v2를 유지한다. 홈페이지 화면은 2d320a7 기준에서 바뀌지 않는다. 아래 이전 후보와 운영 버전의 기술 기록은 과거 이력이며 현재 기준을 덮어쓰지 않는다.

## 2026-10-02 공통 CTA·footer CSS v15

42개 공개 HTML의 공통 스타일 캐시를v15로 갱신한다. footer-email-link를 footer-socials의 네 번째 링크로 이동하고 기존 ID·data-track=email·mailto를 보존한다. /interview에서 nav 전체를 숨기던 규칙은 SNS3개 개별 숨김으로 바꿔 이메일을 노출한다. 기존 check-contact에42개 footer 순서·접근성 이름·mailto·단일 이메일 검사를 추가한다. check-site는v15를 확인한다.

주 CTA와 floating의 분석 구분, 유료/오가닉/preview 경계, 포트폴리오 analytics 미로드, JavaScript 및 Vercel 설정은 그대로다. 새 외부 요청·패키지는 추가하지 않는다. 유리 효과 미지원 환경에 기본 배경색을 제공한다.

## 2026-10-02 공통 플로팅 문의

42개 운영 HTML에 정적 anchor와 defer contact.js?v=1을 넣고 공통CSS를v14로 갱신한다. 스크립트는 rAF로 스크롤/resize 변경을 합치고 IntersectionObserver·dialog open MutationObserver로 상태를 보완한다. hidden은 display:none으로 확실히 숨기며 초점이 있는 링크는 blur까지 유지한다. observer 미지원 시 스크롤/resize 기본 동작과 native dialog CSS 숨김을 제공한다. JS 미실행 시 기존 본문·헤더 문의 동선이 남는다.

플로팅은 data-track=kakao, cta_location=floating, primary=false다. 기존 analytics 위임으로 홈/광고 클릭은 click_kakao_openchat에 구분되어 기록되고 click_cta_primary는 final만 유지한다. Meta Contact는 운영 광고 경로의 outbound_click이며 Lead를 추가하지 않는다. 기존대로 포트폴리오41개는 analytics.js를 로드하지 않아 새 data 속성만으로 수집이 시작되지 않는다. 이번 UI 추가로 수집 경계를 확장하지 않았다.

check-contact.mjs는42개 삽입 계약, hero·final·work-cta 진입/이탈, modal 복원, 포커스 보존, observer fallback을 검증한다. check-tracking은 final/floating 각각의 이벤트 수·위치·primary 값과 기존 운영/preview 경계를 확인한다.

## 2026-10-02 문의·서체 후속 변경

기본 한글 CDN을 Pretendard에서 기존 Google Fonts 연결의 Asta Sans300–800 가변 서체로 변경했다. DM Sans/Instrument Serif는 보존한다. 공통 CSS v13·포트폴리오 CSS v14, 공개 HTML42개 폰트 설정이 동일하다. check-site의 폐기된 연결 안내 문구 요구와 공통CSS 버전 기대값을 갱신했다. CTA의 href/id/data 속성과 JavaScript·광고/오가닉 수집 경계는 변경하지 않는다. DOM 폰트 체크뿐 아니라 Chrome CSS.getPlatformFontsForNode에서 실제 한글 glyph의 AstaSans Regular/Medium 사용을 확인했다.

## 2026-10-02 디자인 검토 반영 구현

Status: `LOCAL QA PASSED / RELEASE CANDIDATE`

정적 HTML/CSS/JavaScript 구조와 `/`·`/interview`·`/work` 경로를 유지한다. 빌드 단계나 CMS를 추가하지 않는다. 캐시는 `rebrand/style.css?v=12`, `rebrand/app.js?v=6`, `work/style.css?v=13`, `work/work.js?v=9`다.

- 홈페이지 재생 버튼 두 그룹은 같은 상태 함수와 입력 처리를 사용한다. 고정 배치와 contact 교차 감지 재배치를 제거했다. 비동기 음악 시작 중 중복 호출을 막고 실패 후 재시도할 수 있다.
- 포트폴리오는 대표 시안 16개/스케치 18개/웹사이트 6개의 HTML 구간으로 구성한다. 스케치는 네이티브 `<details>`로 열며 펼침 상태를 표시 수와 뷰어 탐색 대상에 반영한다. JavaScript 없이도 작업 링크와 스케치 펼치기를 사용할 수 있다.
- `ResizeObserver`와 resize 측정으로 실제 헤더·탐색 메뉴 높이를 CSS 변수에 전달한다. 분야 변경 시 `category` query, 선택 상태와 현재 구간 위치를 맞춘다.
- 모바일 dialog는 화면 폭을 사용한다. 원본 열기는 현재 이미지 주소를 따라가며 인스타 `slides[].text`를 `textContent`로 표시한다. 상세에도 같은 8장 문장을 HTML로 제공한다.
- 상세 40개에서 핵심 설명이 이미지보다 먼저 나온다. 36개 설명 블록을 옮기고 기존 인스타·캐릭터 4개의 앞쪽 설명 구조를 유지했다. 프레이밍 변경은 CSS 및 카탈로그 메타데이터이며 이미지 자산 파일은 보존한다.
- 검사에는 양쪽 재생 설정 동기화·reduced motion·중복 시작 방지·실패 재시도, 갤러리 구간·필터·장수·스케치 펼침에 따른 뷰어 범위와 내용 읽기를 포함한다. GA4/Meta 호스트·경로 조건, 외부 클릭 의미와 CTA 속성은 유지한다.

`npm run check`는 통과했다. Chrome PC·모바일·320px 화면과 주요 조작 검수를 통과했으며, 배포는 이 검수 후 진행한다. 최종 검수 및 배포 근거는 `design-qa.md`의 최신 항목에 기록한다.

아래 날짜별 기록은 각 변경 당시의 이력이며, 이번 수정의 상태와 구현 기준은 이 항목을 우선한다.

## 2026-10-02 하단 소셜 채널

홈페이지와 포트폴리오 목록·상세 40개의 하단 이메일 아래에 유튜브 → 페이스북 → 인스타그램 아이콘을 연결했다. 흰색 22px 아이콘과 44px 클릭 영역을 사용하며 장식 구분선은 추가하지 않는다. 모바일에서도 같은 순서를 유지한다. 기존 Instagram 텍스트 링크는 아이콘으로 통합한다.

공식 YouTube 고정 Channel ID, Facebook 페이지 ID와 Instagram 주소를 사용한다. 홈페이지의 Instagram·이메일 추적 ID와 카카오 이벤트 의미를 유지하고 YouTube는 기존 click_youtube 이벤트에 연결한다. Facebook에 새 분석 이벤트를 만들지 않는다. 광고 경로 /interview에서는 세 소셜 링크를 숨긴다. 공통 CSS v9 및 포트폴리오 CSS v12를 적용한다.

## 2026-10-02 포트폴리오 공개 배포 완료

Status: `LIVE / PRODUCTION VERIFIED`

사용자의 커밋·푸시·배포 요청에 따라 홈페이지 개선과 이미지 34개·웹사이트 샘플 6개, 총 40개 작업을 기존 사이트의 `/work`에 공개했다. 네이버 소유확인, 공식 SNS 4개와 새 리본 A 파비콘을 통합했고, AI/자체 시안/가상 사업체 표기를 유지한다. 실제 고객 사례나 성과 수치를 추가하지 않았다.

기능 브랜치 Preview 확인 뒤 `main`에 fast-forward push했다. 최초 구현 커밋 `4371a1b95bf87d1289a74e563211ae7b954482c1`의 Production 배포 `6802783124`, 공개 샘플 출처 링크·상태 문구 보완 커밋 `01288edad37bfb17fe0a421376cc58c7767e76e8`의 Production 배포 `6802884202`가 성공했다. `https://www.aurorasound.kr/`, `/interview`, `/work` 및 40개 작업 상세를 포함한 60개 응답이 로컬 소스와 일치했다. 자산 189개가 정상 응답하며 내부 문서 16개는 404, 정규화 redirect 3개도 통과했다. 실제 Chrome에서 PC·모바일 화면과 문의 이동, 필터·인스타 넘기기를 확인했다. 상세 증거는 `design-qa.md` 최신 항목을 따른다.

아래 “로컬 작업본”, “배포 미포함”, “실제 화면 검수 미수행”은 각 변경 당시의 이력이다. 현재 운영 상태는 이 항목과 최신 검수 결과를 따른다.

## 2026-10-03 바나나블랙 이식의 기술 계약

카탈로그는 기존 40개와 바나나블랙 다섯 모음, 총 45개다. 다섯 모음의 `slides`는 전체 이미지 41장과 설명, 크기를 보관한다. 공개 JSON에는 로컬 원본 경로를 넣지 않는다. 내부 출처 JSON은 원본과 변환 파일의 SHA256을 연결하고 배포에서 제외한다.

이미지는 자체 WebP이며 외부 Supabase와 독립적으로 제공한다. 상세 HTML에 모든 사진과 직접 링크를 넣어 JavaScript가 없어도 볼 수 있다. 같은 확대 코드를 목록과 상세에서 공유하며 상세는 사진 링크에서 전체 순서를 구성한다. CSS v22, work.js v11, contact.js v3을 사용한다. 고정 문의는 모바일 목록과 사진 상세, 주 문의, 이미지 확대에서 중복을 줄인다.

기존 포트폴리오 검사에 41장과 다섯 모음, 해시, 정적 대체, 분류, 확대 순환을 추가했다. 문의 검사는 새 상세의 모바일 억제와 현재 47개 공개 문서의 링크 계약을 확인한다. 홈 디자인과 광고/오가닉 수집 계약은 유지한다.

# TRD

## 2026-10-02 연관채널 설정

홈의 Organization JSON-LD `sameAs`에 인스타그램, 유튜브, 스레드, 페이스북의 공식 주소를 연결한다. 인스타그램과 스레드는 현재 공개 프로필에서 확인한 `aurorasound_branding`을 사용하고, 페이스북은 공개 화면 주소를 사용한다. 폐기한 WordPress 블로그와 이전 네이버 회사 블로그는 목록에서 제외하며, 러스티의 개인 블로그를 회사 자체와 같은 정체성으로 선언하지 않는다. 폐기 도메인을 사용하는 logo 값도 제거한다. footer의 Instagram 주소를 현재 주소로 수정하며, 디자인과 클릭 추적은 유지한다. 기존 YouTube 주소는 열리지 않았다. 대표는 현재 @aurorasound_kr를 먼저 연결하고 채널명은 변경 제한이 풀린 뒤 직접 바꾸겠다고 확인했다. 공개 canonical에서 확인한 고정 Channel ID UCWKI1K2qTf8H1AMfu9pCC3A를 연결한다. 현재 채널명이 AFTERLOOK인 것은 변경 대기 상태이며 이번 작업에서 이름을 바꾸지 않는다. 네이버 연관채널 노출 여부와 시점은 수집 후 검색 엔진이 판단한다. 구현 커밋 `d7fe504a056be34173e9fdea76f063f6e082ed5d`의 Preview와 Production 배포 `6798946654`가 성공했고, 공개 홈과 `/interview` 응답이 소스와 일치하는 것을 확인했다.

## 2026-10-02 네이버 사이트 소유확인

대표 요청으로 `https://www.aurorasound.kr/`의 소유확인을 위한 네이버 meta 태그를 `index.html`의 head에 추가한다. HTML 태그 방식으로 인증하며, GitHub main 자동 배포 후 공개 응답에서 발급 값의 일치를 확인한다. 홈페이지 디자인, 본문, 추적, 라우팅 및 DNS는 이번 변경 범위에 포함하지 않는다. 구현 커밋 `1a106b89b67143892112175fc7ff32805acece57`의 운영 배포 `6798686776`이 성공했고 공개 홈 및 `/interview`의 응답이 소스와 일치한다. 대표의 보안문자 입력 후 네이버 사이트 목록에서 공식 주소가 확인된 사이트 링크로 표시되고 소유확인 안내가 사라진 것을 확인했다. 소유확인은 완료됐다. 네이버에 `https://www.aurorasound.kr/sitemap.xml`을 제출해 `26.10.02 10:17:20` 접수 기록을 확인했다. 검색 노출은 별도로 확인한다.

## 2026-09-30 운영 교체

사용자가 현재 v4의 커밋·GitHub 푸시·기존 홈페이지 교체를 명시적으로 요청했다. 페이지는 승인한 실크 첫 화면, AI 제작 자체 콘셉트 3개, 짧은 역할 소개, 문의의 네 구역으로 운영한다. 상품 구분·적합성 대화·첫 메시지 안내는 유지하고 상세 진행 설명은 접었다.

운영 진입점은 `index.html`, 시각 자산·모듈은 `rebrand/`에 둔다. 비교용 `rebrand/index.html`만 배포에서 제외하며 `/rebrand`는 운영 루트로 이동한다. SEO·Organization·기존 1200×630 OG·법적 페이지·`/interview` 정책을 유지한다. GA4·Meta의 호스트/경로 조건과 이벤트 의미를 바꾸지 않으며 단일 문의 CTA는 `final-cta-btn` 추적 ID를 사용한다. 이전 위치별 CTA 건수와 새 페이지 합계를 구분한다.

v4 검증은 `npm run check`와 `design-qa.md` 최신 항목을 따른다. 아래 r2 상세는 역사적 기준이며 화면 수·카카오 진입점 수·AVIF 히어로·기존 스타일 로딩은 위 v4 구조로 대체한다.


Status: `LIVE v4 / PRODUCTION VERIFIED`

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

## 2026-09-29 — 격리된 리브랜딩 후보 v2

`rebrand/`는 기존 정적 서버의 디렉터리 요청으로 실행하며 production 배포에서 제외한다. 루트·광고 랜딩과 분석 코드는 그대로다. 공개 교체 전 기존 분석·메타·광고 경로 계약을 이식해야 한다.

- Three.js 0.186.1을 package-lock으로 고정하고 `vendor/three.js`로 번들링했다. MIT 라이선스를 함께 둔다. `npm run vendor:three`는 재현 가능한 esbuild 0.25.10 명령이다.
- `field.js`: WebGL2 renderer, 4개의 indexed PlaneGeometry를 vertex shader에서 공간 곡면으로 계산한다. 데스크톱 153,600 triangles, 모바일 초기 로드 44,800 triangles. 라이브 조형물은 이미지 텍스처를 쓰지 않는다.
- 환경 맵은 자체 스튜디오 조명 장면에서 PMREM으로 계산한다. DPR 상한은 데스크톱 1.6, 모바일 초기 로드 1.15다. 화면 밖에서는 render를 생략하고 숨겨진 탭에서는 프레임 루프를 취소한다.
- `app.js`: 자연 스크롤 위치를 장면 진행률로 변환한다. 비활성 장면에는 inert/aria-hidden을 적용한다. 모션 정지 중에도 스크롤이나 장면 버튼으로 읽을 내용과 대표 프레임을 바꿀 수 있다.
- `audio.js`: 클릭 후 AudioContext 생성. 84 BPM의 시퀀스 기준 시각으로 pulse를 계산한다. 저역 통과 필터와 전환음을 장면에 연결한다. 외부 음원은 없다.
- `assets/sculpture-{desktop,mobile}.webp`: live scene을 캡처한 대체 이미지. WebGL 실패 시 남는다. `?poster=1`은 캡처용으로 UI와 자율 움직임을 감추는 개발 모드다.
- `scripts/check-rebrand.mjs`: 내부 앵커·자산·핵심 문구, noindex·배포 제외, 추적 미실행, vendor/라이선스·버전·장면 링크 계약을 검사한다. GPU 의미 검증은 실제 브라우저 검사로 별도 수행한다.
- 개발 서버 MIME에 AVIF·WOFF2를 추가했다. 서버 경로와 production rewrite는 바꾸지 않았다.

## 2026-09-29 — v3 기본 renderer 분리

기본 경로는 `silk.js`의 WebGL 이미지 효과를 동적 import한다. `?render=mesh`에서만 기존 `field.js`와 Three.js가 로드된다. 공통 `render(state)`/`resize()` 계약을 유지해 음악·입력·정지 상태를 재사용한다. 기본 경로에서는 `.staged`를 붙이지 않고 장면 0만 표시한다. 원본 `resonance.webp`가 정적 대체 이미지다. 버전 캐시는 CSS·app·silk v3를 사용한다.

## 2026-09-29 — v4 쇼케이스 통합

`showcase.js`가 3개 이미지의 상세 dialog와 제한된 호버 이동을 담당한다. 이미지 링크는 JS/dialog 미지원 시 원본 WebP로 동작한다. native dialog의 Escape·닫기 후 원래 링크로 포커스를 복원하며 backdrop 클릭도 지원한다. 모바일 문의 구간에서는 IntersectionObserver로 컨트롤을 헤더로 옮겨 문의 CTA와 겹치지 않게 한다. 사진의 크기를 미리 예약하고 lazy decoding/loading을 사용한다. 세 WebP 합계는 543,136 bytes다. 처음 승인한 hero HTML·silk renderer·운영 분석 경계는 유지한다.

## 2026-10-03 — 공통 워드마크 자산

`rebrand/assets/aurora-wordmark.svg`는 승인된 가로형 로고의 글자 윤곽이다. 외부 웹폰트 없이 렌더링하며 원본 글꼴 라이선스는 `aurora-wordmark-OFL.txt`에 보존한다. 공개 HTML 42개의 헤더와 푸터가 같은 자산을 참조한다. SVG 고유 비율을 예약하고 `/rebrand/style.css?v=16`으로 스타일 캐시를 갱신한다. 홈 링크 목적지와 접근성 이름을 유지한다.
