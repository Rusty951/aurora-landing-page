## 2026-10-02 문의·기본 서체 후속 수정 — 최종 검수

final result: passed (이번 변경 범위)

사용자 요청은 문의 안내 삭제, 문의 화살표 삭제, 중앙 정렬, 작은 안내 확대와 기본 한글 서체 개선이다. 이전 실크/색상/영문 강조/작품/추적 계약을 유지한다. 기준 소스38edae9. 모든 신규 작업본·검수 자료는 먼저 ~/Desktop/aurora-contact-type-2026-10-02에 저장했다.

### 현재 실행에서 확인한 화면

독립 Chrome에서1440×1000,390×844,320×568 CSS viewport를 촬영하고 직접 열어 비교했다. 이번 실행의 before/after/final PNG만 사용했다. 모바일 비교판 comparison-contact.png는 원래390×844 캡처 두 개를820×900 캔버스에 그대로 배치한다. 영어 강조 글자와 배경색은 유지되며 안내 크기·행간·중앙 버튼이 분명히 달라진다.

- 실제 한글 glyph: actual-korean-font.json에서 AstaSans-Regular/Medium 확인. 기본 DM Sans와 Instrument Serif 유지, 공개 HTML42개 동일 font URL.
- 안내: PC 초대24px/첫 메시지22px, 모바일 모두20px, 함께 일하는 방법18px, 설명17px. 안내 삭제 및 ARIA 참조 정리.
- CTA: 화살표 제거·중앙 정렬. 모바일 CTA64px 높이, 헤더44px 높이. 글자 중심의 수평 오차0px·수직 오차0.35px 이하(측정값은 텍스트 range 기준).
- 320/390px 문의·갤러리 overflow false,320px 분야 버튼45×44px. 새 글꼴로 상세 설명의 제품 단어가 중간에 나뉘는 것을 확인해 keep-all로 보완했다.
- 반복 검수에서 모바일 상단 문의가11px로 남은 것을 발견해13px로 수정하고 final-320-contact/gallery 및 final-mobile-contact에서 재확인했다.
- 포트폴리오 헤더 문의 클릭이 홈페이지#contact로 연결됨. 함께 일하는 방법 실제 마우스/Enter 펼치기·접기 확인. Kakao 실제 외부 발송은 수행하지 않았다.
- /interview의 ad-mode와 소셜 숨김, 로컬 GA/Meta 요청0을 확인했다. 기존 추적 ID·URL·스크립트 동일함을 독립 코드 검토로 확인했다.

### 전체 디자인의 엄격한 판정

1. 첫 화면: 양호. 무드와 대비는 일관되지만 추상적인 영문 문구·그래픽이 고유한 작업 증거보다 강하다.
2. 대표 작업: 양호. 세로 작품과 여백이 안정적이며 자체 시안임을 표시한다. 샘플의 설득력은 교체·보완 단계의 과제다.
3. 목록: 양호. 종류/분야와 이미지 중심 탐색이 명확하다. 출처 캡션과 반복 확대 표시는 기능적이나 시각적 개성은 약하다.
4. 상세: 양호. 설명과 이미지 흐름은 읽힌다. 향후 기획 목표·선택 이유를 구체화할 가치가 있다.
5. 서비스: 보통. 첫 화면·문의에 비해 인상과 글자 위계가 일반적이다.
6. 문의/진행 안내: 양호. 이번 요청 항목을 충족한다. 펼침 표시+는 기능을 위해 유지했다.
7. 하단: 보완 여지. 연락처·소셜은 명확하나 영문 Disclaimer가 모바일에서 큰 비중을 차지한다. 사용자가 승인한 안내 문구는 보존했다.

이는 고객 실험이나 전체 WCAG 인증이 아니다. 실제 휴대폰·Safari/Firefox·스크린리더 전체 검수는 수행하지 않았다. 웹사이트 샘플6개 내부는 이번 수정 대상이 아니다. 이번 변경 범위에서 확인된 차단 결함은 없으며 위의 미학·콘텐츠 개선 여지는 별도 남긴다.

### 검사와 자료

npm run check 및 git diff --check 통과. 기존 홈페이지·포트폴리오40개·필터·시리즈·키보드·추적 검사 유지. 초기 비교판의 file:// 이동을 포함한 세션에 URL이 식별되지 않은 Other/ERR_CACHE_MISS1건이 있었으나 이후 최종 HTTP 검수에서는 새 오류0건이었다. 이 이벤트를 임의로 사이트 실패나 성공의 근거로 분류하지 않는다.

근거: ~/Desktop/aurora-contact-type-2026-10-02/qa/final-*-measurements.json, actual-korean-font.json, final-contact-navigation.json, final-process-keyboard.json, final-ad-mode.json, final-*.png. 전체 화면 평가는 같은 폴더의 after-desktop/mobile-*에 근거한다. 배포 상태·운영 응답 검증은 Desktop RELEASE 기록을 따른다.

## 2026-10-02 엄격한 디자인 검토 반영 — 최종 로컬 검수

final result: passed

### 범위와 시각 기준

사용자가 전체 수정을 승인한 기존 오로라 사이트의 디자인 검토를 반영했다. 새 사이트나 새 브랜드 방향은 만들지 않았다. 기준 소스는 수정 전 `ce25895`, `~/Desktop/오로라_디자인검토_2026-10-02/findings.json` 및 같은 폴더의 운영 화면 캡처다. 수정 전후 자체 캡처와 측정은 `~/Desktop/aurora-design-fixes-2026-10-02/qa/`에 보관한다.

Chrome의 독립 임시 프로필에서 `http://localhost:4174/`, `/interview`, `/work`, `/work/veil`, `/work/aurora-carousel-ai`를 열었다. CSS viewport/PNG 크기는 PC 1440×1000, 모바일 390×844, 작은 화면 320×568이며 deviceScaleFactor는 1이다. 변경 전후 같은 상태를 나란히 보여주는 `comparison-hero.png`, `comparison-selected.png`, `comparison-viewer.png`는 820×900 캔버스 안에 원래 390×844 이미지를 축소 없이 배치한 비교다. 해당 비교 파일을 직접 열어 판정했다. 실크 애니메이션 프레임은 시간에 따라 달라지므로 픽셀 일치 대상이 아니다.

### 수정과 비교 결과

- 첫 화면: 실크·다크·라벤더와 기존 산세리프/세리프 이탤릭을 유지했다. 제작 분야를 더 크게 보이고 작업 보기 버튼을 명확히 했다. 글자 뒤의 어두운 처리를 강화하고 장식 영문 안내를 덜었다. `comparison-hero.png`, `after-desktop-hero.png`.
- 재생 버튼: hero/footer의 실제 흐름 안에 배치하여 대표 작업 캡션을 가리던 고정 컨트롤을 제거했다. 두 위치의 상태는 동기화된다. `comparison-selected.png`, `after-mobile-controls-v1.json`, `after-desktop-selected.png`.
- 서비스·문의·하단: 모바일 서비스 본문 16px, 제작 예시 15px, 범위 안내 14px. PC 문의 안내와 카카오 버튼을 같은 그룹으로 묶었다. Disclaimer는 영어로 유지하고 13px/1.85 줄 높이로 조정했다. `after-{desktop,mobile}-{services,contact,footer}.png`.
- 카드·탐색: 이미지 34개와 웹사이트 6개를 보존했다. 이미지 기본 목록은 선별 작업 16개와 펼치는 스케치 18개다. 분야 메뉴는 헤더 아래에 붙고 선택하면 목록 시작으로 이동한다. 390px에서 필터 영역 약106px, 헤더와 겹치지 않는다. 4:5를 유지하고 브랜드 2개/스케치 3개의 초점을 보완했다. 이미지 파일은 바꾸지 않았다. `after-desktop-brand.png`, `after-mobile-gallery.png`, `after-mobile-sketches.png`.
- 모바일 뷰어: 실제 이미지 표시 폭322px→390px. 원본 링크와 인스타8장 원문 읽기를 제공한다. 이전/다음·방향키·수평터치와 닫기 후 초점 복귀를 확인했다. `comparison-viewer.png`, `after-mobile-read-second.png`, `after-viewer-measurements.json`, `viewer-close-return.json`.
- 상세: 설명을 첫 이미지보다 먼저 제공한다. 36개 이동, 기존 시리즈4개는 설명 위치 유지. 반복되는 부제는 설명 영역에서 덜고 ‘작업 설명’으로 정리했다. `after-desktop-detail-final.png`, `after-mobile-detail.png`.

### 판정한 다섯 표면

서체/위계: 기존 폰트와 작은 작품 캡션을 유지하며 핵심 설명·액션만 강화했다. 잘림이나 부제 반복은 최종본에서 발견하지 않았다.
간격/구조: 컨트롤이 문서 흐름을 따르고 문의 안내와 버튼이 인접한다. 주요 화면의 가로 넘침은 없다.
색/상태: 기존 다크/라벤더 선택 상태와 키보드 초점을 유지했다. 동적 실크의 모든 프레임에 대한 WCAG 대비 인증을 수행한 것은 아니다.
이미지: 원본 파일, 글자와 중요한 피사체를 보존했다. 원본 보기/상세는 전체 비율이며 4:5 카드 크롭만 조정했다.
카피: 서비스·연락처·표기·추적 의미는 유지했다. 스케치 없는 분야에는 펼치기 안내를 표시하지 않는다. 인스타 읽기 텍스트는 현재 이미지의 원문이다. 고객 성과나 지표를 추가하지 않았다.

### 반복 검수에서 발견한 문제와 수정

1. [P2] 설명을 앞으로 이동하자 부제가 연속으로 반복됨. `after-desktop-detail.png`에서 발견, 36개를 작은 ‘작업 설명’ 제목으로 바꾸고 `after-desktop-detail-final.png`에서 재검수했다.
2. [P2] 320px에서 일부 필터 터치 폭이38px. 간격/패딩을 조정해 모두45×44px로 확보했다. `320-final-measurements.json`, `after-320-gallery-final.png`.
3. [P2] 브랜드/인스타/캐릭터에도 존재하지 않는 스케치 펼치기 안내가 제공됨. 실제 매칭 스케치가 있을 때만 안내하도록 수정하고 전 분야 회귀 검사를 추가했다.
4. [P2 예방] 음악 로딩 중 native disabled로 키보드 초점을 잃을 수 있어 ARIA busy와 실행 잠금으로 변경했다. 실제 Enter로 음악을 끄고 Tab이 움직임 버튼으로 이어짐을 확인했다. `audio-keyboard-final.json`, `controls-tab-focus.json`, `final-controls-keyboard-focus.png`.

최종 검수 범위에서 남은 P0/P1/P2 없음. 글자/피사체를 보존해야 하는 캐릭터·일부 복합 스케치의 여백은 의도적으로 유지했다. 샘플 교체와 대표작 설명 자체의 재작성은 이번 디자인 마감 범위 밖이다.

### 동작·자동 검사

- `npm run check`, `git diff --check` 통과. 홈페이지 계약·추적 격리·광고/오가닉 이벤트·CTA/UTM·컨트롤 동기화/중복 시작/오류 복구·40개 작업/필터/시리즈/수평터치/초점/대체 동작 검사.
- 실제 Chrome: 문의 앵커, 진행 안내 펼치기, 움직임 양쪽 동기화와 reduced motion, 음악 켜기/Enter로 끄기와 Tab 초점, 스케치 펼치기/분야 전환, 이미지 열기/다음/방향키/수평터치/Escape 복귀, 원문 갱신 확인.
- JS 비활성화 상태에서 선별 작업/웹사이트와 네이티브 스케치 펼치기가 접근 가능하다. `nojs-gallery.png`, `nojs-sketches.png`.
- `/interview`에서 포트폴리오/소셜3개 숨김과 이메일 유지, 로컬 GA/Meta 미실행 확인. `ad-mode-final.json`.
- 검수 세션의 페이지 콘솔 오류/경고·네트워크 실패 이벤트0건(`browser-events.json`).

실제 휴대폰·Safari/Firefox·스크린리더 전체 검수 및 고객 이해도/문의 효과 실험은 수행하지 않았다. 웹사이트 샘플6개의 내부 화면은 변경하지 않았다. 배포는 이 로컬 검수 뒤 진행하며 운영 응답과 배포 상태 증거는 Desktop 작업 폴더에 별도로 남긴다.

---

## 2026-10-02 — 첫 화면의 제작 분야 안내 강화

- 콘텐츠 검토 2번 수정 요청에 따라 첫 화면 설명을 “제품 이미지와 인스타 콘텐츠, 웹사이트를 만듭니다.”로 바꾸고 기존 작은 중복 안내를 통합했다. 기본 PC 23–30px, 모바일 18–20px로 표시하며 모바일의 작업 보기 링크는 설명 바로 아래에 둔다. 짧은 PC 화면은 설명 24px와 높이에 따른 영문 타이틀 크기로 여백을 확보한다.
- 실제 별도 Chrome에서 1440×1024, 768×1024, 390×844, 320×568, 1440×768 및 1366×720을 확인했다. 제작 분야가 두 줄로 표시되고 가로 넘침·텍스트 잘림이 없다. 1440×768 및 1366×720에서 설명과 하단 안내 사이 여백은 각각 53px 및 32px다. 광고 경로 /interview의 390px 화면도 동일하게 표시된다.
- 320px에서 실제 작업 보기 클릭 후 #approach로 이동했다. 기존 실크, 영문 타이틀, 밑줄 없는 링크, 카카오 CTA와 영문 Disclaimer를 보존했다. 공통 CSS v11을 홈·포트폴리오 HTML 42개에 적용했다.
- npm run check 및 git diff --check 통과. Chrome 오류·경고·요청 실패 0개. 기존 광고/오가닉 추적 격리와 40개 포트폴리오 작업 검사 통과.
- 수정 전/후 이미지, 측정 JSON, 원본/반영본과 해시: ~/Desktop/codex-output/aurora-hero-service-clarity-2026-10-02/. 운영 검증과 배포 결과는 같은 폴더의 보고서 및 배포 JSON에 기록한다.

## 2026-10-02 — 영문 Disclaimer

- 공통 하단 제목을 Disclaimer로 바꾸고 기존 두 문단을 영어로 번역했다. 홈과 포트폴리오 41개 페이지에 같은 문구와 lang="en"을 적용했다. 기존 의미와 작업별 개별 고지를 보존한다.
- 실제 별도 Chrome에서 홈·포트폴리오 각각 1440×1024 및 390×844의 하단을 확인했다. 12px 크기와 구분선 없는 배치, 자연스러운 영문 줄바꿈을 확인했으며 가로 넘침이나 잘림이 없다.
- npm run check 및 git diff --check 통과. Chrome 오류·경고·요청 실패 0개. 기존 링크와 추적·스타일은 변경하지 않았다.
- 원본/번역본, 상태 JSON과 PC·모바일 캡처: ~/Desktop/codex-output/aurora-english-disclaimer-2026-10-02/. 배포 결과는 같은 폴더의 deployment.json, production-http-verification.json 및 REPORT.md에 기록한다.

## 2026-10-02 — 작업 링크·문의 버튼·저작권 표시

- 요청한 두 링크(작업 보기, 포트폴리오 전체 보기)의 밑줄을 제거했다. 최종 문의 버튼은 카카오톡 문의하기로 바꾸고, 홈과 포트폴리오 41개 페이지의 하단을 © 2026 오로라의소리. All rights reserved.로 통일했다. 공통 CSS v10을 적용했다.
- 실제 별도 Chrome에서 홈페이지 1440×1024 및 390×844의 첫 화면·작업 링크·문의·하단을 확인했다. 두 링크의 bottom border는 0px, text-decoration은 none이며 키보드 초점 테두리는 3px다. 가로 넘침과 변경 문구의 잘림이 없다.
- 작업 보기를 클릭해 #approach로 이동하고 포트폴리오 전체 보기를 클릭해 /work로 이동했다. 390px 포트폴리오 하단도 문구가 정상 표시되며 가로 넘침이 없다.
- 카카오 연결 URL과 data 속성은 보존했다. npm run check 및 git diff --check 통과. 기존 추적·광고/오가닉 격리, 40개 작업과 시리즈 검사 통과. Chrome 오류·경고·요청 실패 0개.
- 검수 이미지, 상태 JSON, 원본/변경본과 해시: ~/Desktop/codex-output/aurora-home-link-footer-polish-2026-10-02/. 공개 반영 상태는 같은 폴더의 deployment.json과 REPORT.md에 기록한다.

## 2026-10-02 — 하단 소셜 아이콘 3개

- 홈페이지, /work와 작업 상세 40개에 유튜브 → 페이스북 → 인스타그램 순서로 연결. 이메일 아래 흰색 22px 아이콘과 44×44px 링크 영역을 사용한다. 모바일에서는 왼쪽 정렬하고 구분선을 추가하지 않는다.
- 실제 임시 Chrome에서 홈·웹사이트 목록 1440×1024 및 390×844, 작업 상세 320×568을 캡처하고 확인했다. 모든 화면에서 가로 넘침 없이 아이콘과 이메일이 표시되며 링크 영역은 각각 44×44px다.
- 이메일에서 Tab 키로 유튜브, 페이스북, 인스타그램 순서로 이동하고 각 아이콘의 초점 테두리를 확인했다. 실제 마우스 클릭으로 각각 새 탭이 열렸다. YouTube 고정 Channel ID, Facebook 공식 페이지(aurorasound.branding으로 리다이렉트), Instagram aurorasound_branding 프로필로 연결됐다. YouTube의 현재 AFTERLOOK 채널명은 기존 승인된 이름 변경 대기 상태다.
- /interview의 세 소셜 링크가 숨겨지는 것을 확인했다. 로컬 분석 제공자 요청과 Chrome 오류·경고·실패 이벤트는 0개다.
- npm run check 및 git diff --check 통과: 기존 사이트·추적 계약, 40개 작업과 시리즈·필터·상세 동작 검사. YouTube는 기존 click_youtube에 연결하며 Facebook에 새 이벤트를 만들지 않는다.
- 검토 이미지와 측정 결과: ~/Desktop/codex-output/aurora-footer-socials-2026-10-02/. 커밋 이후 배포 상태는 같은 폴더의 보고서와 GitHub 배포 기록으로 확인한다.

# 2026-10-02 — 하단 작업물 이용 안내

final result: passed

대표 요청에 따라 홈페이지와 포트폴리오 footer에 “작업물 이용 안내” 두 문단을 넣었다. 자체 시안·AI 이미지·가상 사업체와 실제 고객 사례를 구분하고, 재사용 전 문의 및 외부 자료의 이용 조건을 알린다. 법령상 허용되는 이용은 제한하지 않는다. 공통 CSS v8을 홈 1개·포트폴리오 41개 HTML에 적용했다.

- 문구·근거: `/Users/bananabk/Desktop/codex-output/aurora-portfolio-notice-2026-10-02/NOTICE.md`, `SOURCES.md`. copywrite 및 한국어 문체 QA 기준을 적용했다. 기존 약관·개인정보처리방침은 변경하지 않았다.
- 목록 아래의 중복된 일반 고지는 footer로 통합했다. 개별 작업의 AI/가상 표시와 구체적인 고지는 유지한다. 모든 자료의 권리를 오로라에 귀속시키거나 면책 효력을 보장하지 않는다.
- 12px 제목과 두 문단을 여백으로 구분한다. 홈페이지 footer 상단의 기존 가로선과 불필요한 여백도 정리했다.
- 실제 Chrome: 홈페이지 PC 1440×1000·모바일 320×568, 포트폴리오 PC 1440×1000·모바일 390×844에서 가로 넘침 없음, 안내 영역 경계선 없음, 한 페이지당 안내 1개. 작은 모바일에서 음악 버튼과 안내문 겹침 없음·자동 재생 없음.
- 42개 HTML 모두 footer 내부에 같은 문구와 공통 CSS v8이 한 번씩 포함된 것을 확인했다. 단일 주요 카카오 CTA 및 기존 이메일·SNS 추적 ID를 보존했다.
- `npm run check`, `git diff --check` 통과. 기존 스타일 버전 검사만 v8로 맞췄다. 검수 중 JS exception·console error/warning·loading failure 0.
- Desktop 폴더에 적용 전 사본, 반영 파일, SHA-256 manifest, 실제 화면 및 상태 JSON을 보존한다. 공개 반영 후의 커밋·배포 상태와 운영 응답 비교는 `deployment.json`에 기록한다.

---

# 2026-10-02 — 포트폴리오 가로선 정리

final result: passed

웹사이트 목록의 가로선이 많다는 사용자 피드백에 따라 포트폴리오 목록·상세의 장식선을 제거했다. 선택 탭의 짧은 2px 밑줄, 필터·버튼 경계와 키보드 초점 표시는 유지한다. CSS v11을 목록과 40개 상세에 적용했으며 홈페이지 본문과 데모 내부에는 변경이 없다.

- 실제 Chrome 별도 프로필: 1440×1000 웹사이트 목록 전체 화면과 390×844 웹사이트/이미지 목록을 확인했다. 이전/이후 캡처는 `/Users/bananabk/Desktop/codex-output/aurora-portfolio-lines-2026-10-02`의 `before-*`, `after-*` 파일에 보존한다.
- header·메뉴 전체 너비·카드 작업 설명 6개·고지문·문의 링크·footer의 선 제거를 렌더링 스타일로 확인했다. 선택 탭 밑줄은 2px이다. 실제 탭 클릭 후 웹사이트 6개 ↔ 이미지 34개 표시를 확인했고 가로 넘침과 깨진 이미지는 0이다.
- VEIL 상세의 이미지 캡션 2개·이전/다음 작업 영역·footer 구분선 제거를 확인했다. 작품 파일, 내용과 JavaScript는 변경하지 않았다.
- `npm run check`, `git diff --check` 통과. 검수 중 JS exception, console error/warning 및 loading failure 0. 원본 변경 전 사본, 반영 파일과 SHA-256 manifest를 Desktop에 저장했다.
- 공개 반영 후의 커밋·배포 상태 및 운영 응답 비교는 같은 폴더의 `deployment.json`에 기록한다.

---

# 2026-10-02 — 포트폴리오 운영 배포 확인

final result: passed

사용자의 “일단 커밋 푸시 배포까지” 요청에 따라 홈페이지 디자인 개선과 포트폴리오를 기존 운영 사이트에 반영했다. 아래 과거 로컬 검수의 배포 미포함 상태를 대체한다.

## 배포 근거

- 저장소: `Rusty951/aurora-landing-page`, 운영 브랜치 `main`. 기존 원격 main의 네이버 소유확인·공식 SNS·리본 A 파비콘 변경을 병합하여 보존했다.
- Preview: `4371a1b95bf87d1289a74e563211ae7b954482c1`, GitHub deployment `6802697570`, success. Preview 인증 설정은 변경하지 않았다.
- 최초 Production: 동일 구현 커밋, deployment `6802783124`, success.
- 최종 공개 파일 기준: `01288edad37bfb17fe0a421376cc58c7767e76e8`, Production deployment `6802884202`, success. 후속 검수 기록 커밋은 공개 파일을 변경하지 않는다.
- 공개 주소: `https://www.aurorasound.kr/`, `https://www.aurorasound.kr/work`.
- 검수 폴더: `/Users/bananabk/Desktop/codex-output/aurora-portfolio-release-2026-10-02`. 배포 JSON, HTTP 검사 JSON, 화면 캡처와 상태별 JSON, 반영 전/후 사본 및 파일 해시 manifest를 보존한다.

## 배포 중 보완

- Vercel의 `trailingSlash:false` 환경에서 여섯 샘플의 상대경로가 상위 폴더로 해석되는 문제를 수정했다. HTML 13개와 모서리의 동적 이미지/상세 연결을 root-relative URL로 맞췄다. CSS 자체 상대경로는 유지했다.
- 차온 footer의 내부 `SOURCES.md` 링크는 배포 제외 파일로 연결되어 404였다. 기존 출처 기록의 공개 사진 페이지 2개로 교체했다. 내부 제작 기록은 계속 공개 배포에서 제외한다.
- “비공개”라는 샘플 상태 설명을 현재 공개 포트폴리오 상태에 맞췄다. 가상 사업체 및 실제 상담·예약 미제공 표기는 유지했다.

## 최종 확인

- `npm run check`, `git diff --check` 통과. 기존 추적 계약 3개, 40개 작업/필터/상세, 인스타 8장·캐릭터 장면, dialog 키보드·터치·초점 대체 및 canonical 샘플 문서 13개를 검사한다. 배포 제외 문서의 공개 링크도 검사에 포함했다.
- 운영 HTTP: 60개 페이지·데이터 응답이 소스와 바이트 단위로 일치, 자산 189개 정상 상태/MIME, 내부 문서 16개 404, redirect 3개 정상 및 query 보존. 모든 샘플 응답에서 `noindex, nofollow` 확인. 결과: `production-http-verification.json`, failed 0.
- 실제 Chrome: 홈페이지 PC 1440×1000, 포트폴리오/문의 모바일 390×844에서 가로 넘침·깨진 이미지 없음. 모서리 샘플의 canonical URL에서 CSS 규칙 156개 로딩 확인. 이전 로컬 768px/320px 검수와 화면 변경이 없음을 공개 응답 일치로 확인했다.
- 모바일 메뉴: 실제 프로젝트 문의 클릭 후 contact 구간 진입, 포트폴리오 링크 중심 hit target 일치 및 클릭 이동. 포트폴리오의 프로젝트 문의도 `/#contact`의 문의 영역으로 이동한다. 음악 자동 재생 없음.
- 포트폴리오: 이미지 34개/웹사이트 6개 필터, 인스타 원본 로딩 후 터치 1/8 → 2/8, Escape 닫기 및 시작 카드 초점 복귀 확인.
- 홈페이지에서 `gtag`가 정의되고 `fbq`는 미정의인 오가닉 분리, 네이버 meta 및 3개 추적 링크 ID 유지. 카카오 문의 클릭이나 실제 전환 이벤트는 전송하지 않았다.
- 브라우저 JS exception·콘솔 error/warning은 0. 첫 이미지 로딩 직후 빠르게 닫은 흐름에서 Image 요청 1개가 `net::ERR_ABORTED`, `canceled:true`로 기록됐다. 원본 로딩 후 재검증은 정상이며 HTTP 자산 실패는 0이다.

## 검수 범위

현재 배포 소스, 공개 응답, 대표 사용자 경로를 검증했다. 실제 휴대전화/Safari 및 샘플 내부 모든 화면의 전수 시각 검수, 실제 문의 전달·공개 전환율은 이번 배포 확인에 포함하지 않는다.

---

# 2026-10-02 — 전체 홈페이지 검토 수정

final result: passed

사용자의 “전부 다 고쳐줘” 승인에 따른 국소 개선이다. 아래 과거 검수 이력과 구별하여 이 항목을 현재 로컬 작업본의 결과로 사용한다. 운영 배포는 하지 않았다.

## 비교 기준과 구현

- 원래 검토: `/Users/bananabk/Desktop/codex-output/aurora-design-audit-2026-10-02/REPORT.md`, `audit.json` 및 실제 Chrome 화면 캡처.
- 구현: `/Users/bananabk/Documents/Projects/aurora-landing-page`의 `/`, `/interview`, `/work`와 대표 작업 상세. `/rebrand/index.html`은 제외된 과거 비교본이다.
- 새 증거: `/Users/bananabk/Desktop/codex-output/aurora-design-fixes-2026-10-02`. 수정 전/후를 같은 입력에서 비교한 캡처 쌍과 상태는 `REPORT.html`에 모았다. Desktop `before/`, `staged/`, `manifest.json`에 수정 전 사본 및 반영 파일 SHA-256을 보존한다.
- 실제 렌더링: Google Chrome 별도 임시 프로필. PC 1440×1000, 태블릿 768×1024, 모바일 390×844 및 320×568. 각 캡처명에 해당 화면/상태를 표시했다. 애니메이션이 있는 실크는 프레임 단위 픽셀 일치를 요구하지 않았다.

## 수정 결과

| 발견 | 수정 | 검증 |
| --- | --- | --- |
| P1 모바일 문의에서 포트폴리오 링크가 음악 버튼에 가림 | 문의 구간의 음악/움직임 버튼을 footer의 별도 흐름으로 배치. PC 하단 로고도 가리지 않음 | 390px 실제 클릭으로 `/work` 진입. 320px 링크 중심 hit target 일치, 음악 false 유지. `10`, `17`, `19`, `29` 캡처 |
| P2 어떤 제작물을 맡길 수 있는지 모호함 | 첫 화면에 제품 이미지/인스타 콘텐츠/웹사이트 안내와 작업 보기 추가 | 1440, 768, 390, 320px에서 줄바꿈/겹침 확인. 태블릿 실크 위 보조 문구 대비 보완 |
| P2 같은 실크 작업 3개의 긴 나열 | 제품/푸드/브랜드 자체 시안 3개로 구성하고 전체 포트폴리오 링크를 위로 이동 | PC 대표 작업 구간 2558px에서 1037px로 줄어듦. 768px와 모바일 확인. 기존 페이지 내 확대 유지 |
| P2 제작 범위와 문의 표현이 모호함 | 제작물 예시와 단건/월간 범위 안내. 프로젝트 문의하기, 필요한 작업/현재 상황/희망 시점, 카카오 목적지 명시 | 서비스/문의/접힌 안내 및 펼친 안내를 PC와 모바일에서 확인. 기존 단일 카카오 링크 및 추적 속성 유지 |
| P2 제품, 캐릭터, 웹 썸네일 잘림 | 4:5 프레임 안에 작업별 초점 또는 contain. 캐릭터 전체 글자 보존, 웹은 16:9 | 원본/기존 크롭 contact sheet 3개 검토 후 처리. `06`, `07`, `08`, `11`, `20` 확인 |
| P2 모바일 필터 고아 줄 | 3열 2행 | 390px와 320px. 320px 필터 높이 전부 44px, 가로 넘침 없음 |
| P2 인스타 용어 및 표지 낮은 대비 | 목록/상세/접근성 문구를 인스타로 통일. 밝은 글자를 차콜로 바꾼 AI 편집 사본 사용 | 수정 전후 390px 확대 1/8 비교. `13`, `15` 확인. Drive 및 기존 최적화 원본 보존 |

## 비교 기록: 다섯 영역

- 폰트: 기존 DM Sans, Instrument Serif, Pretendard 사용. 실크 제목과 작은 카드 설명을 유지했다. 새 한국어 제작물/문의 안내의 크기, 줄바꿈, 여백을 네 viewport에서 확인했다.
- 간격/배치: 큰 타이포와 여백의 구조를 유지하면서 대표 작업만 3열로 압축했다. 작은 화면의 한 열, 필터 두 줄, 하단 컨트롤 공간을 확인했다. 홈페이지 대표 이미지의 브랜드 시안은 전체 구성을 보존하는 여백을 의도적으로 유지했다.
- 색상: 기존 검정/연보라 UI 및 홈페이지의 기존 밝은 대표 작업 구간을 유지했다. 포트폴리오 배경은 검정이다. 인스타 표지의 글자 색 변경과 태블릿 안내 그림자는 가독성을 위한 승인된 수정이다.
- 이미지: VEIL 병, 캐릭터 이름, 웹사이트 좌우를 수정 전후 같은 크기의 캡처로 비교했다. 텍스트/여러 피사체가 있는 작업은 contain으로 원본 전체를 보존한다. AI 편집된 인스타 표지는 구도와 문구를 유지했으나 미세한 사진 차이는 있을 수 있으며 별도 사본으로 기록했다.
- 문구: 생성된 고객 사례나 성과 수치를 넣지 않았다. 자체 시안, AI, 가상 사업체 표기를 유지했다. 서비스/문의는 구체화하고 카카오 이동을 명시했다. 일부 기존 이미지 대체 텍스트의 잘못된 조사도 수정했다.

## 기능 검사와 증거

- `npm run check`, `git diff --check` 최종 통과. 홈페이지 3개 추적 링크, 21개 중복 없는 ID; 기존 광고/오가닉 VM 통합 검사 통과.
- 40개 카드/상세, 이미지 34개/웹사이트 6개, 필터 수, 8장 인스타/캐릭터 3장, 상세 정적 대체와 잘못된 메타데이터 대체 검사 통과.
- 실제 Chrome: 제품 방향키 1/15 → 2/15, 인스타 터치 1/8 → 2/8, Escape 닫기 및 시작 카드 초점 복귀 확인. 홈페이지 대표 작업도 모달 확대 및 Escape 복귀 확인.
- 실제 `/interview?utm_source=qa`에서 ad-mode, 포트폴리오 직접 진입 숨김, 단일 주요 CTA, 로컬 `gtag`/`fbq` undefined 확인. 외부 카카오 문의는 전송하지 않았다.
- `browser-events.json`: 캡처/상호작용 동안 기록한 JS exception, 콘솔 error/warning, 로딩 실패 0. 확인한 화면의 가로 넘침 0. 개별 확인 결과는 `*-check.json`에 저장했다.
- 액션과 상태: `mobile-320-contact-check.json`, `mobile-320-gallery-check.json`, `tablet-layout-check.json`, `home-viewer-check.json`, `home-viewer-focus-check.json`, `product-viewer-check.json`, `product-focus-check.json`, `paid-check.json`, `desktop-footer-check.json`.

## 인스타 표지 편집 내역

- built-in `image_gen` edit 사용. 작업용 PNG: `/Users/bananabk/Desktop/codex-output/aurora-design-fixes-2026-10-02/instagram-cover-readable.png`.
- 사용 자산: `work/assets/aurora-carousel-01-readable.webp`, `work/assets/aurora-carousel-01-readable-thumb.webp` (썸네일 45,586 bytes).
- 최종 프롬프트: `/Users/bananabk/Desktop/codex-output/aurora-design-fixes-2026-10-02/cover-edit-prompt.txt`와 `docs/PORTFOLIO-PROMPTS.json`의 `aurora-instagram-cover-readable` 항목. 요청은 기존 사진/구도/문구를 보존하며 글자색을 `#202832`로 바꾸는 것이다. 생성물 원본 경로와 SHA-256은 `docs/PORTFOLIO-SOURCES.json`에 기록했다.

## 검수 범위와 한계

검토에서 발견한 P1/P2 항목은 위 증거 범위에서 해결했다. 실제 휴대전화, Safari, 스크린리더 전체 순서, 브라우저 200% 확대, 장시간 GPU 성능이나 공개 전환율은 평가하지 않았다. 6개 데모 내부의 모든 흐름과 40개 상세의 모든 내용에 대한 전수 시각 감사는 포함하지 않는다. 공개 배포/커밋/push는 하지 않았다.

---

# Design QA — Landing r2 Release Candidate

Status: `LIVE r2 / PRODUCTION PASS / P0·P1·P2 0`

## 검수 대상

- 브랜치: `codex/landing-rebrand-r2`
- 제품 기준: 승인된 `creative-brief-r2.md`
- 로컬 URL: `http://localhost:4173/`, `http://localhost:4173/interview`
- 화면: 1440×1024, 390×844, 320×568
- 캡처: `/Users/bananabk/Desktop/codex-output/aurora-landing-revamp/qa-r2/`

2026-08-12 대표가 exact final 공개 배포를 승인했고 release commit `d96151e842d2fb3a3573ead56bebf1ea1b6ff371`를 `main`에 공개했다. 로컬·preview·운영 `https://www.aurorasound.kr/` 검증 결과를 이 문서에 함께 기록한다.

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

## production 검증 결과

- Vercel preview와 production이 release SHA `d96151e842d2fb3a3573ead56bebf1ea1b6ff371`로 Ready
- `/` 200, `/interview` 200, `/interview/` 308와 QA UTM query 유지
- 운영 `/`와 `/interview` HTML SHA-256가 승인본 `2c8d04288b0fb057598923819969c449b2ba4541ad240fb3e5a2f06dce4dd521`로 동일
- CSS v19, script v6, analytics v7, 1200×630 OG 해시가 승인 manifest와 동일
- 법적 문서·robots·sitemap 200, 내부 문서와 `scripts/og-card.html` 404
- preview 1440·390, production desktop·390에서 가로 넘침 0과 히어로·CTA 위계 유지
- 운영 root는 GA 로더 1·Meta 로더 0, `/interview`는 GA·Meta 로더 각 1과 PageView 초기화 1
- QA UTM의 hero CTA 실제 클릭이 승인된 카카오 오픈채팅으로 열렸고 콘솔 오류 0
- 클라이언트 `Lead` 호출 0, Meta `Contact=outbound_click`과 GA CTA 이벤트 계약 유지

final result: `LIVE r2 / PRODUCTION PASS / P0·P1·P2 0`

---

# 2026-09-29 — Immersive rebrand / local candidate

final result: passed

이 판정은 로컬 디자인 후보의 화면·기능 검수에 한정한다. production 교체 승인이나 레퍼런스 스튜디오와 동일한 3D 제작 수준을 뜻하지 않는다.

## 대상과 시각 기준

- 구현: `http://localhost:4173/rebrand/`, `codex/aurora-immersive-rebrand`.
- 방향: 사용자가 승인한 Lusion·Unseen·Active Theory 계열의 몰입감과 위임한 디자인 판단. 레퍼런스의 픽셀 복제 작업이 아니다.
- 직접 생성한 원본: `/Users/bananabk/.codex/generated_images/01a0ecc5-86ef-7c51-afa8-0b3465c20b8d/exec-3bfe893d-d4f4-40e6-b31b-a2279883cdee.png` (1536×1024).
- 구현 자산: `rebrand/assets/resonance.webp` (1536×1024, 184,464 bytes).
- 캡처 디렉터리: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/aurora-immersive-rebrand/`.
- `desktop-hero.png`: 1440×1024, CSS viewport 1440×1024, 정지 상태. `desktop-full.png`: 1440×6716 전체 페이지.
- `mobile-390.png`: CSS 390×844. `mobile-320.png`: CSS 320×568, 모션 정지 후 화면 크기 변경 회귀 검증.
- `art-to-page-comparison.png`: 원본 아트와 구현 첫 화면을 나란히 표시. 원본은 비율 보존 720×480 + 여백, 구현은 720×512로 50% 축소했다. 아트 재질·색·크롭 판단용이며 서로 다른 레이아웃의 픽셀 일치 검사는 아니다.
- 전체 비교와 함께 390/320의 제목·컨트롤, 데스크톱 서비스·진행·FAQ·문의 영역을 개별 확인했다.

## 수정 이력

- P2: 원본 이미지 평면의 경계가 검은 배경에서 보임 → 마스크로 가장자리를 부드럽게 연결. 데스크톱 최종 캡처에서 직사각형 경계가 사라짐.
- P2: 320px에서 제목이 불필요하게 세 줄로 재흐름 → 50px로 조정, 두 줄 유지 확인.
- P2: 320px 하단 소개 라벨과 고정 컨트롤 간섭 → hero footer 위치 조정 및 버튼 높이 44px. 최종 캡처에서 분리 확인.
- P1: 모션 정지 뒤 resize하면 canvas 초기화로 이미지가 지워짐 → 마지막 프레임을 보관하고 resize 직후 재렌더. 320→390→320 정지 상태에서 이미지 유지 확인.

## 다섯 시각 검수 항목

- 서체: DM Sans/Instrument Serif의 대비와 Pretendard 한국어 본문. 1440·390·320에서 제목 잘림과 가로 넘침 0.
- 간격: 어두운 비주얼 장면과 밝은 읽기 섹션을 교대한다. 본문은 두 열에서 모바일 한 열로 바뀌고 문의 CTA를 유지한다.
- 색: 차콜·진주빛 보라·오프화이트. 밝은 구역 본문은 중간 회색, 어두운 구역은 밝은 회색으로 구분한다. 작은 보조 라벨은 장식적 계층이다.
- 이미지: 직접 생성 원본의 주름·반사를 유지하고 WebP 압축 후 눈에 띄는 블록 손상 없음. 2.5D 이미지 굴절이며 실제 3D 모델 회전은 아님.
- 카피: 확인되지 않은 고객 사례·수치·등록상표를 넣지 않았다. 리브랜딩 프로젝트와 월간 운영, 첫 대화 범위를 구분했다.

## 기능 검증

- in-app Chromium 브라우저에서 WebGL ready, 원본 이미지 로드, 전체 섹션 렌더 확인.
- 음악 버튼 OFF→ON→OFF 상태와 aria 반영, 브라우저 오류 없음 확인. 오디오의 음색·믹스는 사람의 청취 피드백이 남는다.
- Ether→Bloom 선택과 pressed 상태 전환 확인.
- 서비스 상세 열기, FAQ 마우스 열기와 Enter 닫기 확인.
- 모션 ON/OFF와 정지 중 resize 확인. OS reduced-motion, WebGL 실패 정적 fallback, 탭 비활성 처리는 코드 검수했으며 실제 iOS·GPU 장애는 별도 실기 검수 대상.
- 문의 내부 앵커 이동 확인. 최종 카카오 URL과 target/rel 확인, 실제 메시지는 전송하지 않았다.
- 브라우저 콘솔 error/warn 0, 모든 내장 자산 및 내부 앵커 존재.
- `npm run check`: 기존 r2 계약 + 후보 격리·앵커·자산·문법 검사 통과.
- `git diff --check`: 통과.

## 배포 상태

기존 `index.html`, `style.css`, `script.js`, `analytics.js`, `vercel.json`은 변경하지 않았다. 후보는 noindex, 분석 미탑재, `.vercelignore` 배포 제외 상태다. 운영 교체 전 추적·메타·광고 경로 통합과 실제 모바일 기기 성능·음악 청취 검수가 필요하다.

---

# 2026-09-29 — 실제 3D 리브랜딩 후보 v2

final result: passed

이 판정은 이번 수정의 구체적인 구현·화면·동작 기준에 한정한다. 레퍼런스 스튜디오와 동급이라는 평가나 production 교체 승인을 의미하지 않는다.

## 변경 목표와 시각 기준

이전 Product Design 평가에서 지적한 이미지 반복, 장면 전개 부족, 한국어 정보 위계와 모바일 작은 컨트롤을 수정한다. 기존 진주빛·차콜·서체 방향은 유지하되, 실제 3D 구현으로 변경하는 것은 사용자가 명시적으로 요청했다.

- 이전 평가 근거: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/aurora-product-design-audit-20260929/`.
- v2 캡처: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/aurora-rebrand-3d/`.
- `desktop-01-possibility.png`, `desktop-02-direction.png`, `desktop-03-presence.png`: 1440×1024, 세 장면의 실제 실행 화면.
- `desktop-04-applications.png`: 깊이 선택 뒤 바뀐 메시지·타이포 시안.
- `mobile-390.png`, `mobile-320.png`: 각각 해당 CSS viewport의 실제 실행 화면. 두 경우 가로 넘침 0.
- `poster-desktop.png`, `poster-mobile.png`: UI를 제외하고 실제 3D 장면을 캡처한 정적 대체 이미지의 원본.

이번 작업은 기존 이미지의 픽셀 복제가 아니다. 실제 곡면·원근·조명과 세 장면의 전개가 새로운 시각 기준이며, 위 캡처와 실제 조작을 함께 확인했다.

## 시각 검수와 수정 이력

- 서체/정보 위계: 첫 화면과 서비스·과정·문의의 핵심 정보를 한국어로 올렸다. 사운드·모션 컨트롤은 8~9px에서 12px로, 조작 영역은 46px로 변경했다.
- 간격: 모바일 조형물이 설명을 가리던 문제를 발견해 크기·위치를 별도로 조정했다. 320×568에서는 영어 보조 문장·보조 링크를 생략하고 장면 버튼을 왼쪽 세로로 배치했다.
- 색/표면: 과도한 직접광과 단단한 반사를 줄였다. 겹치는 리본의 경계가 지저분해지지 않도록 같은 곡면의 분리된 4개 띠로 정돈했다.
- 이미지/그래픽: 라이브 장면에는 이미지 텍스처를 쓰지 않는다. browser canvas의 Three.js r186 및 실제 렌더 통계 153,600 triangles(데스크톱), 44,800 triangles(모바일 초기 로드)를 확인했다. 원본 이미지는 실패 대체가 아닌 배경 질감으로만 보존하고, 실패 대체는 새 3D 렌더 캡처를 쓴다.
- 카피/내용: 자체 리브랜딩 제안임을 표시했다. 없는 고객 작업·성과·등록상표·수치는 추가하지 않았다. 단건 리브랜딩과 월간 운영의 경계를 유지한다.
- 발견/수정: 중간 장면에서 리본이 설명을 가리던 문제 → 곡면의 수직 위치와 제목 높이를 조정했다. 시간이 흐를수록 리본이 계속 회전해 장면 구도가 바뀌던 문제 → 제한된 진동각으로 바꿨다.

## 실제 동작 검사

- 01/02/03 장면 버튼으로 이동하고 활성 장면의 내용과 형태가 함께 바뀌는 것을 확인했다.
- 커서 반응, 파동 버튼, 음악 OFF→ON→OFF와 안내 상태를 확인했다. 음악의 음색·믹스에 대한 청취 판정은 하지 않았다.
- 선명함/온기/깊이 선택으로 pressed 상태·설명·문구·타이포·색이 함께 바뀌는 것을 확인했다.
- 모션 정지 후 viewport 변경과 장면 이동 시 대표 프레임·읽을 내용이 유지됐다.
- FAQ 마우스 열기와 Enter 닫기, 상단 문의 앵커 이동을 확인했다. 카카오 URL·target·rel은 유지했고 외부 메시지는 보내지 않았다.
- 실제 브라우저 error/warn 0. 1440×1024·390×844·320×568에서 가로 넘침 0.
- `npm run check` 및 `git diff --check` 통과. 정적 계약 검사는 GPU 검증을 대신하지 않으며 위 브라우저 증거를 별도로 사용한다.
- Tailscale 주소의 후보 HTML·렌더러·정적 대체 자산 200 응답 확인. 기존 루트와 `/interview` 문서는 동일하며 원본 source의 diff 없음.

## 남은 검증 범위

실제 iOS/Android 기기, 저사양 GPU의 지속 프레임률·발열, 전체 스크린리더 검사와 음악 청취 검수는 수행하지 않았다. GPU 손실 복구와 WebGL 미지원 대체는 코드와 대체 자산 확인 범위이며 실기 장애 주입 검사는 아니다. 공개 교체에는 기존 분석·메타·광고 경로 계약의 이식과 별도의 사용자 공개 승인이 필요하다.

### v2 최종 원격 확인 및 비교

- Tailscale `http://100.111.129.29:4173/rebrand/?v=2`를 브라우저에서 직접 열었다. `scene ready`, `three-webgl2`, 가로 넘침 0, error/warn 0을 확인했다.
- `remote-hero-1280.png`는 1280×720 CSS viewport의 최종 원격 렌더다.
- `before-after.png`는 이전 평가의 1280×720 첫 화면과 현재 같은 크기의 화면을 각각 640×360으로 축소해 나란히 비교한 증거다. 영어 중심 제목을 한국어로 바꾸고 사진 같은 이미지 재질을 실제 금속 곡면으로 바꾼 차이는 이번 요청에 따른 의도적 변경이다.
- 공급자 번들 내 GLSL 문자열의 들여쓰기·줄 끝 공백을 재현 가능한 vendor 명령에서 정리한 후 `git diff --check`와 실제 원격 GPU 렌더를 다시 통과했다.

---

# 2026-09-29 — v3 실크 미감 복원

final result: passed

사용자의 v2 시각 회귀 피드백을 반영한 국소 수정 검수다. 첫 버전의 원본 이미지와 큰 타이포를 기준으로 복원했으며, 기본 경로의 효과는 이미지 기반 WebGL이다. 실제 3D 메시 소스는 `?render=mesh` 개발 경로에 보존한다.

- 비교 기준: 이전 평가의 `01-desktop-hero.png`와 원본 `rebrand/assets/resonance.webp`.
- 새 증거: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/aurora-silk-refinement/desktop.png`, `mobile-390.png`.
- 데스크톱 1280×720에서 실크의 주름·비대칭 구도와 큰 타이포 복원 확인. 기본 hero 높이 720px이며 3개 화면 길이의 `.staged`는 적용하지 않는다.
- 390×844, 320×568에서 가로 넘침 0, 제목 두 줄 유지, 음악·모션 컨트롤과 다음 섹션 진입 유지.
- 모션 정지 후 viewport 변경에도 이미지 유지. 실제 원격 프리뷰에서 `webgl-silk`, `scene ready`, error/warn 0 확인.
- 음악·브랜드 적용 시안·본문·FAQ·문의 로직은 유지했다. 새 renderer는 작은 변위·빛·파동과 스크롤 확대만 담당한다.
- 이미지가 밝아지는 모바일 영역의 역할 설명에는 작은 어두운 text shadow를 추가했다.
- `npm run check`, `git diff --check` 통과. 기존 운영 파일 변경 없음. 실기 GPU·전체 접근성 인증·음악 청취 평가는 포함하지 않는다.

---

# 2026-09-29 — v4 콘셉트 시각물과 쇼케이스 통합

final result: passed

## 기준과 증거

- 사용자 요청: 승인한 첫 화면과 조화로운 시각물을 제작해 넣고, 레퍼런스처럼 글의 비중을 줄인다.
- 소스 시각 기준: `rebrand/assets/resonance.webp` 및 새로 생성한 `showcase-identity.webp`, `showcase-digital.webp`, `showcase-material.webp`. 첫 화면의 HTML SHA-256은 변경 전후 `362756b0b8aa13e03019d19c71bb81e250b4fd7094f6360f7990686de60e6117`로 동일하다.
- 현재 구현: `http://100.111.129.29:4173/rebrand/?v=4`.
- 캡처: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/aurora-showcase/desktop-full.png` (1440×5125, CSS viewport 1440×1024, 모션 정지 상태에서 전체 구성 확인). `showcase-section.png`는 해당 캡처에서 쇼케이스 구역만 비율을 유지해 축소한 검토용 이미지다.
- 비교: 원본 이미지의 소재·색·피사체·인쇄 문자와 실제 웹에서의 크롭을 확인했다. 피처는 16:10, 디지털은 4:3, 소재 연구는 4:5로 표시하고 상세 보기에서는 원본 전체를 보여준다. 소재 연구는 추상적인 확대 이미지라 세로 크롭을 허용했다.

## 확인한 결과

- 네 구역: 현재 첫 화면 → 3개 자체 콘셉트 쇼케이스 → 짧은 소개와 역할 3개 → 문의. 길던 소개·과정·FAQ는 통합·축소했다.
- 새 이미지 모두 1536×1024로 로드됨을 실제 DOM에서 확인. 세 WebP 합계 543,136 bytes.
- 폰트: 큰 이미지와 짧은 영어 제목, 한국어 분야·자체 시안 표시를 함께 배치했다. 모바일의 상세 설명·문의 안내를 읽을 수 있는 크기로 유지했다.
- 배치/색: 기존 진주빛·차콜·라일락을 종이, 화면, 소재로 연결했다. 인쇄물은 크게, 두 후속 장면은 높이를 달리해 배치했다. 포트폴리오처럼 보이더라도 실제 고객 납품으로 오인되지 않게 자체 콘셉트/AI 제작을 표시한다.
- 주요 인터랙션: 이미지 선택 → 상세 dialog → Escape/닫기 → 원래 링크로 포커스 복귀 확인. 닫기 뒤 body scroll lock 해제 확인. 모바일 상세 보기 확인.
- 390px·320px에서 가로 넘침 0. 좁은 화면에서 Let’s talk. 제목이 컨테이너를 넘던 문제는 유동 글자 크기로 수정했다.
- 320px 문의 CTA를 고정 음악 컨트롤이 가리던 문제는 해당 구역에서 컨트롤을 헤더로 이동해 수정했다. 첫 화면에서는 기존 위치다.
- 접힌 진행 안내를 클릭/Enter로 열고 닫은 뒤 크기를 변경할 때 contact의 `overflow:hidden`이 내부 scrollTop 220을 유지해 제목을 자르던 문제를 발견했다. `overflow:clip`으로 고쳐 같은 조작 후 scrollTop 0과 제목의 정상 위치를 확인했다.
- 최종 전체 캡처에서 인쇄물 제목·갤러리 캡션·문의 제목의 잘림 없음. 브라우저 error/warn 0.
- `npm run check`, `git diff --check` 통과. 운영 원본 index/style/script/analytics/vercel 파일 diff 없음.

## 한계

실제 모바일 기기의 발열·지속 프레임률, 전체 스크린리더 인증, 문의 전환율과 음악의 청취 품질은 별도 검증 범위다. 이미지는 자체 콘셉트이며 실제 인쇄물·고객 프로젝트·운영 성과를 증명하지 않는다. 공개 배포는 진행하지 않았다.

## 2026-09-30 마무리 확인

- `npm run check`, `git diff --check` 재확인 통과.
- 프리뷰 서버를 다시 실행하고 테일스케일 주소의 응답 200을 확인했다.
- 실제 브라우저에서 인쇄물 상세 보기 열기·닫기·원래 링크 포커스 복귀를 확인했다. 브라우저 error/warn 0.
- 최종 화면 증거: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/aurora-showcase/final-preview.png`.
- v4를 검토용 완성본으로 정리했다. 운영 사이트 교체·공개 배포는 포함하지 않았다.


# 2026-09-30 — v4 운영 교체 통합

- 승인: 사용자의 “커밋푸시하고 … 교체하자”를 현재 디자인의 GitHub·운영 교체 승인으로 적용했다.
- 운영 문서를 v4로 전환하고 기존 SEO·Organization·OG·광고 경로 Meta 초기화·analytics.js를 연결했다. 주요 문의는 기존 `final-cta-btn`, footer 외부 링크는 기존 ID·data-track을 유지한다.
- 로컬 루트: 실제 브라우저에서 승인한 첫 화면, canonical, 가로 넘침 0, 4개 추적 링크, GA4·Meta 미정의 확인. `/interview`에서 같은 본문과 비필수 footer 숨김 확인. error/warn 0.
- 추적 통합 검사: 로컬·Tailscale·Vercel preview 미실행, 운영 organic/paid·CTA·UTM·Contact 의미를 외부 전송 없는 VM에서 확인한다. 실제 문의 클릭으로 운영 데이터에 시험 전환을 만들지 않는다.
- 배포 결과는 아래 후속 확인에 기록한다.


## 운영 확인 결과

final result: passed

- 구현 커밋: `0ab4b0637c4413cda4bbe75777eadd4753f061e1`. GitHub `main` fast-forward push 완료. force push 없음.
- Vercel: 기능 브랜치 Preview `6744980181`, Production `6745006073` 모두 success. Preview 화면은 Vercel 로그인으로 보호돼 있어 화면 검수는 동일 소스의 로컬과 운영 도메인에서 수행했다.
- 운영 `/`, `/interview` 200 및 응답 HTML SHA-256과 로컬 구현 원본 일치. `/interview/?utm_source=release-check`는 query를 유지한 308. `/rebrand?v=4`, `/rebrand/index.html`는 루트로 308.
- 운영 CSS·app/silk/audio/showcase 모듈·실크와 3개 콘셉트 이미지·analytics·OG·legal·robots·sitemap 200, 올바른 MIME. README·AGENTS·docs·scripts·패키지 매니페스트·design-qa는 404.
- 실제 운영 브라우저에서 승인된 첫 화면, 쇼케이스, 큰 제목과 실크 렌더를 확인했다. canonical 유지, 데스크톱 가로 넘침 0, 콘솔 error/warn 0.
- 운영 root의 DOM에서 GA4 스크립트만, `/interview`의 DOM에서 GA4·Meta 스크립트 로드를 확인했다. 광고 경로의 footer Instagram은 숨김. 이벤트 횟수·CTA·UTM·Contact/Lead 구분은 VM 통합 검사로 확인했고 실제 카카오 전환 이벤트를 시험 발송하지 않았다.
- 390×844 운영 root에서 가로 넘침 0. 문의 화면에서 CTA는 top 489.7/bottom 562.7, 음악·모션 컨트롤은 top 19/bottom 63으로 겹치지 않았다. viewport는 검수 후 기본값으로 복원했다.
- 운영 캡처: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/aurora-showcase/production-home.png`, `production-mobile-contact.png`.
- 기존 r2 복구 기준: `6ef92d4f13707b579e9824135469949279c4cab6`. 실패 시 새 revert commit 또는 기존 Vercel production 재승격을 사용한다.
- 실제 모바일 기기의 장시간 GPU 성능과 측정 대시보드 수신 여부는 이번 확인에 포함하지 않는다.
