# 홈페이지 V1 기술 계약

정적 HTML, CSS와 JavaScript를 Vercel에 배포한다. 별도 빌드 단계와 CMS를 추가하지 않는다. GitHub Rusty951/aurora-landing-page의 main을 배포 원본으로 사용한다. 로컬 개발은 dev-server.mjs와 4173 포트다.

## 문서와 경로

index.html은 홈과 /interview의 공통 문서다. vercel.json이 광고 경로, /work 목록과 각 상세 및 여덟 데모 경로를 연결한다. 이전 /rebrand 주소는 현재 홈으로 정규화되며 별도 비교 페이지를 제공하지 않는다. 개인정보 처리방침과 이용약관, robots.txt와 sitemap.xml, 공식 소셜 주소 및 인증 값을 보존한다.

홈과 포트폴리오 47개 문서는 rebrand/fonts.css?v=1을 한 번씩 로드한다. 공통 CSS v46, app.js v11, audio.js v4, silk.js v3, contact.js v6, 포트폴리오 CSS v24, work.js v14 및 motion.js v3을 사용한다. 캐시 숫자는 파일 갱신용이며 홈페이지 V1의 버전명과 별개다.

## 서체와 실크

홈페이지와 /interview의 문서 제목, OG 및 Twitter 제목은 대표가 승인한 "오로라의소리 | 브랜드의 방향을 정하고, 실행까지 함께합니다"로 맞춘다. OG 및 Twitter 이미지는 https://www.aurorasound.kr/assets/aurora-og-20261015.png 하나를 사용한다. PNG 1200×630, MIME 유형과 대체 설명을 HTML head에서 제공한다. 이전 /assets/aurora-og.png 요청은 같은 새 파일로 rewrite해 기존 주소의 접근을 유지한다. 브랜드 노트 목록의 기본 공유 이미지는 홈페이지 OG에서 가져오며 글별 대표 이미지는 유지한다. HTML 변경과 이미지 주소 변경만으로 외부 플랫폼의 기존 캐시 갱신 완료를 주장하지 않으며 실제 작성 화면에서 확인한다.

공통 --sans와 --serif 및 기존 직접 서체 선언을 보존한다. --ko-heading은 Arita Buri와 Asta Sans 대체 경로다. 선택한 한글 큰 제목과 FAQ 질문에 부리 600, FAQ 본문에 돋움 Medium 400을 적용한다. 공식 원본 WOFF 총 2,858,088바이트를 그대로 배포하며 변환, 서브셋 및 글자 수정은 하지 않는다. 원본과 출처 고지는 rebrand/assets/fonts에 있다. 기존 hero의 y 보정 파일과 unicode-range를 유지한다.

현재 silk renderer 및 WebGL 실패와 context loss의 정적 대체를 유지한다. 이전 메시 renderer와 실험 페이지는 제공하지 않는다. 동작 줄이기와 움직임 일시 정지를 현재 앱 상태로 처리한다.

## 음악과 문의

배경 음악은 AFTERLOOK의 `Close Looking`, 자산 `A02-BGM-003`이다. `/rebrand/assets/audio/close-looking.mp3?v=1`을 네이티브 audio로 스트리밍하고 Web Audio gain 0.22, 페이드인 시간 상수 0.65초 및 끄기 0.12초를 적용한다. 900ms 후 스트림을 멈추고 컨텍스트를 일시 정지하며 다시 켜면 같은 재생 위치에서 이어진다. 기존 합성 곡과 전환 효과음은 겹쳐 재생하지 않는다. 자동 재생이 차단되면 음원을 미리 받지 않고 실제 재생 시점에 로드한다. 네트워크 시작이 14초 안에 끝나지 않으면 버튼을 재시도 가능한 상태로 되돌린다. 브라우저가 허용하면 기본 켜짐으로 시작하고 차단되면 첫 trusted 입력에서 재시도한다. 실제 시작, 대기 및 오류 상태를 두 재생 설정에 동기화한다. sessionStorage aurora-sound는 사용자가 직접 조작한 경우에만 갱신하며 같은 탭의 명시적 끄기를 기억한다. visibility와 pagehide 및 bfcache 복원, 시작 중 취소와 중복 타이머를 보존한다.

원본은 [A02 Drive의 03-close-looking.m4a](https://drive.google.com/file/d/1iF0LETl5UQkSe0zDkyi1HutUGA6YRJmf/view)이며 SHA256은 `f73cb24538fe5d7470bd910de6206100f88825cd8167ed5ab42128ad638c3025`다. 생성 당시 Suno Pro 연간 계정 기록은 A02의 `영상_배경음악_라이브러리.md`와 보관 명세에 있다. 2026-10-15 대표가 애프터룩 Drive 음악의 오로라 홈페이지 재사용을 요청했다. 이 사용 범위는 A01 홈페이지에 한정하며 타 고객 재사용 권한으로 확대하지 않는다. A02 원본과 영상 편성은 보존한다.

웹 파생본은 전체 약 179.57초, MP3 128kbps, 44.1kHz stereo, 2,874,395바이트다. 시작 0.6초, 끝 4초 페이드와 -18 LUFS 목표의 두 패스 정규화를 적용했으며 완성 파일 실측은 -18.4 LUFS, true peak -4.8dBFS다. gain 적용 뒤 계산상 약 -31.6 LUFS다. 파일 SHA256은 `302aa9df0e06d3b0532e5fdc9bf9053a28d9af35ab72900bbf793dc0a65eefb5`다. 전체 곡을 페이드로 끝낸 뒤 반복하며 끊김 없는 박자 루프로 설명하지 않는다. 92BPM 제작 지시에 맞춘 시각 효과의 주기는 실제 비트 분석 결과가 아니다. 실제 브라우저의 재생 진행과 무음 제어 및 디코딩 검사는 청취 취향이나 보컬 부재의 판정을 대신하지 않는다.

고정 문의는 IntersectionObserver와 dialog 및 스크롤 상태에 따라 표시한다. 초점이 있는 링크는 초점 이탈까지 보존한다. observer가 없어도 기본 스크롤 및 resize 대체를 제공한다. FAQ의 네이티브 details와 답변 펼침 이후 문서 높이 갱신을 유지한다.

## 분석 경계

GA4와 Meta는 운영 호스트에서만 실행한다. localhost, Tailscale와 Vercel Preview는 수집 대상이 아니다. Meta PageView는 운영 /interview에서 한 번만 전송된다. 카카오 외부 클릭 Contact는 실제 문의 Lead와 구분한다. HTML data-track, CTA ID와 위치 및 primary 속성, UTM과 최초 유입 맥락을 유지한다. 포트폴리오 문서는 analytics.js를 로드하지 않는다.

## 포트폴리오와 검사

work/catalog.json은 47개 모음 및 작품의 공개 목록이다. Photo 41장과 Concepts 34개 및 Website 8개를 관리한다. 정적 목록과 상세, 사진 확대, 캐러셀과 캐릭터 시리즈, 키보드 및 터치 탐색을 보존한다. 분류 순서는 Website, Concepts, Photo다. category를 지정하지 않은 /work도 여덟 웹사이트를 먼저 연다. Photo 선택은 category=photography로 주소에 남겨 새로고침 후 유지한다. category=website는 여덟 웹사이트의 통합 목록을 연다. 과거 website-signature와 website-essential 공유 주소도 같은 목록으로 열고 category=website로 정규화한다. 필터 상태는 주소, aria-pressed와 보이는 열 순서 및 스크롤 모션에 동기화한다.

npm run check는 사이트와 자산 및 경로, renderer와 음악, 추적, 필터와 시리즈, 사진 출처와 해시, 데모 내부 경로, 고정 문의의 가림 방지를 검사한다. git diff --check와 실제 viewport 검수를 병행한다. 내부 docs와 scripts, QA 및 개발 자료는 .vercelignore에서 배포 제외한다. ZIP에도 .git, .env, node_modules와 도구 상태를 넣지 않는다.

## 저널 로컬 구현

`journal/index.html`과 `journal/<slug>/index.html`은 Node 스크립트가 생성하는 정적 문서다. 외부 CMS나 런타임 의존성을 추가하지 않는다. 공유 스타일 뒤에 `journal/journal.css?v=5`을 로드하고 별도 본문 JavaScript는 사용하지 않는다. 목록과 글 상세에 광고나 오가닉 수집 스크립트를 추가하지 않았다.

`scripts/build-journal.mjs`는 승인된 사이트 원고 `journal/articles.json`과 기존 포트폴리오 목록을 읽는다. 표시 문구는 HTML escape하고 작업과 글의 연결을 확인한다. 홈페이지의 표시된 저널 구역과 기존 포트폴리오의 표시된 읽기 구역, 공통 메뉴를 갱신한다. 여러 번 실행해도 같은 결과를 유지한다. 공개 원고는 `index, follow`이며 페이지별 canonical과 OG를 제공한다. 목록과 글별 sitemap 및 Vercel rewrite를 중복 없이 생성한다. 내부 created 값은 발행일로 변환하지 않는다.

`scripts/check-journal.mjs`가 로컬 경로와 목차 대상, 양방향 포트폴리오 링크, 상담 목적지, 공개 상태, 검색 및 공유 정보와 기존 문서 메뉴 연결을 검사한다. Firebase 전환은 별도 요청에서 실제 경로 처리를 확인한다. 검색 허용만으로 실제 색인 완료를 주장하지 않는다.
