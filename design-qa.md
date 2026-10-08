## 2026-10-05 웹 샘플 정리 검수

현재 로컬 목록은 Signature의 NOCTE/SEAM2개, Essential의 일반4개다. 원본은 website-portfolio에 두고 sync:samples로 배포 사본을 만든다. Photo41장과 Concepts34개, 문의/분석은 유지했다. 폐기된 스튜디오와 이전 안과의 데모, 상세, 썸네일 및 라우트를 제거했다. 병원4개와 디자인플레아는 이 배포 사본에서 제외한다.

실제 브라우저에서 Signature2개, Essential4개와 각 링크/썸네일 일치를 확인했다. 초기 카드 교체에서 tier가 중복되고 링크가 잘못 묶이는 오류를 발견해 카드별로 다시 구성했다. 실제HTML의 단일tier, 카탈로그와 동일한썸네일 및 개별데모목적지를 검사에 추가하고 재확인했다. PC1440×1000과 모바일390×844에서 목록, 원본에서 동기화한 커튼과 SEAM의 로컬 연결을 확인했다. npm run check 및 diff 검사가 통과했다.

증거: /Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/34-샘플원본통합-20261005/ 의 aurora-signature-PC.jpg, aurora-essential-PC.jpg, aurora-essential-mobile.jpg 및 원본NOCTE/SEAM캡처. 공개 배포는 하지 않았다. 기존 아래 검수는 당시 기록이다.

# 홈페이지 V1 검수

현재 기준일은 2026-10-04다. 확정 화면의 구현 소스는 4c57b5d이며 운영 검수 기록 059b26d까지 반영됐다. 이번 단일 버전 정리는 화면 소스와 공개 자산을 유지하고 관리 위치 및 내부 문서만 통합한다.

## 검수된 현재 화면

PC 1440×1024에서 큰 한글 브랜드 제목의 아리따 부리와 기존 서비스명 및 작품 정보의 Asta Sans, U자 서비스 배치, 밝은 대표 작업과 브랜드 문구, Website 두 열 및 여섯 작품을 확인했다. Beyond의 보정된 Aurora Hero Sans 450과 Instrument Serif 강조 및 버튼의 Asta Sans가 유지된다.

FAQ 질문은 PC 20px, 답변은 16px 및 행간 1.8이다. 첫 질문 클릭과 Return 닫기, Space 다시 펼침을 확인했다. 모바일 390×844의 질문 17px 및 답변 15px, 기존 서비스명과 한 열, Photo의 영문 분류 및 제품 상세의 11장과 확대 닫기를 확인했다. 320×844의 질문 두 줄 및 98.39px 클릭 높이, 긴 한글 상세 제목과 하단 초대 제목의 의미 단위 줄바꿈 및 footer를 확인했다. FAQ가 보일 때 고정 문의는 숨겨지며 확인한 화면의 가로 넘침은 0이다.

구현 Preview 6835715861과 Production 6835728884가 성공했고 실제 Preview PC 및 모바일, 운영 PC 및 390px와 320px FAQ 및 모바일 포트폴리오를 확인했다. 공개 47개 HTML 및 광고 경로, 서체 등록과 공통 스타일, 폰트 및 고지, 동작 스크립트를 포함한 59개 응답이 소스와 바이트 단위로 일치했다. /interview#faq의 ad-mode 및 서체가 유지되고 console 경고와 오류는 없다. 두 원본 아리따 WOFF는 문서에서 사용하는 한글 403자를 모두 지원한다.

현재 화면 증거는 docs/qa의 서비스 PC, FAQ PC와 모바일 및 320px, 포트폴리오 모바일 이미지다. 각 glyph의 실제 Rendered Fonts 진단과 다른 실제 기기의 오디오 출력 및 OS 동작 줄이기 설정은 이번에 새로 수행하지 않았다. 선언 및 파일 응답, 화면 검수와 이 한계를 구분한다. 모션과 추적 및 음악의 유효한 이전 통과 검사는 재사용한다.

## 단일 원본 정리 검수

로컬 원본을 Documents/Projects/aurora-landing-page로 통합했다. 이전 홈페이지 사본과 단계별 자료 53개는 macOS 휴지통으로 옮겼다. 사진 및 폰트 출처와 라이선스, 독립 샘플 원본과 별도의 연구 프로젝트를 보존했다. 운영 소스 및 설정 파일 398개의 SHA256이 확정 화면과 동일하다. npm run check와 git diff --check를 통과했고 새 원본의 4173 서버에서 PC 1440px FAQ 질문 20px 및 가로 넘침 0, 모바일 390px Website 한 열과 샘플 링크를 확인했다. Obsidian A01 website.md 및 README와 links의 참조를 확인했다. GitHub의 과거 작업 브랜치 31개를 정리했고 main 하나로 관리한다. 정리 커밋 2c935f1의 Production 6835929557이 성공했고 실제 운영의 14개 응답을 비교해 소스와 같은 바이트임을 확인했다. 여기에는 광고 경로와 제품 상세, 여섯 샘플 사이트 및 두 아리따 폰트가 포함된다. Drive 홈페이지 폴더의 현재 ZIP 한 개를 확인했으며 업로드한 424개 추적 파일 ZIP과 Drive에서 다시 읽은 ZIP의 SHA256 및 크기가 동일했다. 현재 ZIP 파일 ID는 1f3THlpASI_WeAXs2vCmHys85Ob8N64BJ이며 이후 같은 ID를 갱신한다. 최종 검수 문서의 변경도 같은 main에 반영하고 ZIP의 문서 바이트를 갱신한다.

## 2026-10-05 Signature 추가

Banana Black 보관 홈페이지를 Signature에 연결했다. 사용자 요청에 따라 목록 썸네일도 PC 첫 화면 캡처로 맞췄다. 상세 페이지는 PC와 모바일 첫 화면을 사용한다. 실제 브랜드 보관본으로 표시하며 문의 비전송과 사진41장 로컬 연결을 확인했다. 390px 목록의 사진 로딩과 가로 넘침, 배포용 중첩 경로의 사진 페이지를 확인했다. npm run check를 통과했다.

SEAM은 보존된 최신 flow-journey.html을 배포용 기본 진입점으로 연결했다. PC와 모바일 첫 화면 캡처를 갱신했으며 이전 3D 원본 파일은 수정하지 않았다. 바나나블랙 썸네일은 요청한 첫 화면으로 교체했다.

## 서안 마감본 v58.2 연결 검수, 2026-10-08

사용자가 완료한 서안을 오로라의소리 홈페이지에 업데이트하도록 요청했다. 정본 Rusty951/aurora-website-portfolio의0c5beb9에서 서안만 소비자 소유 동기화 명령으로 반영했다. `--route=13-chaon-law` 선택 옵션을 추가했으며 기본 전체 동기화의 공개 경로와 보관본 처리 방식은 유지했다. 다른 데모/공유 파일1506개의 변경 전 해시와 갱신 후 해시가 같음을 확인했다. 잘못된 route는 파일 변경 전에 거부한다.

인자 검사 중 잘못된 node -e 실행이 전체 기본 동기화를 실행한 것을 배포 전에 발견했다. 그 실행으로 바뀐15파일은 시작 시 clean이던HEAD의 검증된 바이트로 복구하고, 추가된71개의 파생 사본만 제거했다. 원본 포트폴리오, 원격 배포, 사용자 원본과 stash는 변경하지 않았다. 이후 같은1506파일 해시가 일치하고 서안의 본문/모든 자산은 정본과 같으며, HTML에는 공개 경로를 위한 base만 추가된 것을 확인했다.

새 캡처는 `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/aurora-seoan-update-20261008/`에 있다. 실제 소비자 데모1440×810과390×844를01-demo-PC-1440.jpg/02-demo-mobile.jpg로 캡처해 WebP로 인코딩했으며 콘텐츠 픽셀 편집은 없다. 썸네일만 같은 비율960×540으로 축소했다. 작업 상세/목록/OG 이미지의 서안 주소에만58.2 캐시를 적용했다. 기존 운영 public path는 유지한다.

로컬 목록의 Essential4개, 서안 카드의 새 이미지와 상세 링크를 실제로 확인했다.04-gallery-PC.jpg와08-gallery-mobile-final.jpg를 열었고, 서안 카드 클릭으로 새 탭이 /work/demos/13-chaon-law/에서 실제 최신 seum58.css?v=58.2와 폰트 loaded 상태로 열리는 것을 확인했다. 상세는05-detail-mobile.jpg/06-detail-screens-mobile.jpg에서 새 PC/모바일 이미지가1440×810/390×844로 로드됐다. 모바일390px과 상세320px의 가로 넘침0, 현재 탭 console error/warn 없음. 데모의 메뉴→상담 안내 이동과 상대 CSS/아이콘 경로도 오류 없이 동작했다.

npm run check와 diff 검사를 통과했다. 기존 capture assertion이47 캐시를 고정해 새 썸네일을 거부한 부분은 출처 기록의 sample_version을 기준으로 자기 이미지와 캐시 주소를 함께 확인하도록 보완했다. 다른 카드의 기존48/47 검사와 작품/사진/추적/음악/문의 목적지 및 공개 경로 검사는 유지했다. 실제 모델 동작과 전체 접근성 인증이 아니라 연결과 반영 범위의 검수다.

![갱신된 서안 목록 카드](</Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/aurora-seoan-update-20261008/04-gallery-PC.jpg>)

로컬 연결 검수 결과: passed. 운영 반영은 main 푸시와 Vercel Production 및 실제 응답 확인 뒤에 완료로 보고한다.

### 운영 반영 확인, 2026-10-08

코드 커밋 a0434e7의 GitHub Vercel 상태 success와 Production deployment6925055161 success를 확인했다. 실제 www.aurorasound.kr의 목록/상세/데모 HTML, 데모 CSS/JS, PC/썸네일/모바일 이미지 여덟 응답이 모두200이고 해당 로컬 파일과 SHA256이 일치했다. 운영 브라우저의 새 썸네일58.2, 상세 두 이미지 loaded, 샘플 seum58.css?v=58.2 및 폰트 loaded를 확인했다. 샘플의 포트폴리오 링크로 실제 /work?category=website-essential에 돌아오는 것도 확인했다.09-live-gallery-PC.jpg는 실제 운영 목록이다. 후속 운영 기록은 문서만 추가하며 배포용 파일은 이 검증의 바이트를 유지한다.

현재 추적 파일 전체 ZIP은195179388바이트로 커넥터의100MB 전달 상한을 넘어 첫 업로드는 action 전에 거부됐다. Google Drive Desktop의 기존 동기화 파일에 com.google.drivefs.item-id#S=1f3THlpASI_WeAXs2vCmHys85Ob8N64BJ가 붙어 같은 파일임을 확인했다. 새 파일/폴더나 공유 권한을 만들지 않고 기존 ZIP을 갱신하는 경로를 사용한다. 인증 정보와 .git/.claude/.vercel/node_modules는 ZIP에서 제외한다.

운영 홈페이지 반영 검수 결과: passed.

## 일반4개 전체 반영 범위 수정, 2026-10-08

사용자가 모두 반영되지 않은 것 같다고 지적했다. 직전 반영이 서안 하나로 좁혀졌던 것을 인정하고 앞서 작업한 일반4개 전체를 최신본으로 연결했다. 소비자 소유 선택 동기화 명령으로 서래커튼55.1, 수집노트56.1, 스위치조명57.2를 추가 반영했고 서안58.2를 그대로 유지했다. 정본0c5beb9의 네 디렉터리와 모든 파일이 같으며 HTML의 배포 base 추가만 차이임을 확인했다. 변경 대상 외 데모/공유 파일1471개의 해시는 같았다.

새 증거는 `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/aurora-essentials-update-20261008/`다. 각 데모의 실제1440×810/390×844 첫 화면을 curtain,magazine,lighting-PC/mobile.jpg로 캡처했고 latest-samples.jpg로 함께 열었다. 폰트 loaded, 해당 최신 CSS주소와 모바일 가로 넘침0을 확인했다. 캡처를 WebP로 인코딩해 공개 PC/모바일 상세와960×540 썸네일로 교체했다. 이미지 자체의 내용 편집이나 새 생성은 없다.

로컬 Essential 목록의 네 썸네일이 각각55.1/56.1/57.2/58.2로 로드됨을 확인했다. gallery-top-PC.jpg와 gallery-bottom-PC.jpg에서 두 줄의 최신 카드가 보이며, 세 상세 페이지의 PC/모바일 이미지도 로드됐다. 상세 모바일390px, 커튼 상세 및 목록320px 가로 넘침0을 확인했다. 샘플 전체의 기존 상세 검수는 원본에서 완료한 유효한 결과를 재사용하며 이번은 연결/배포 사본 검수다. npm run check와 diff 검사는 통과했다. 기존 출처와 문의/추적 및 Signature는 유지한다.

로컬 반영 검수: passed. 운영 배포 완료와 응답 일치는 main 푸시 후 실제 URL로 확인한다.

가져온 Bodoni Moda OFL 원문의 줄 끝 공백 한 곳이 staged diff 검사를 통과하지 못해, 소비자 동기화에서 해당 라이선스 텍스트의 줄 끝 공백만 정리한다. 저작권/라이선스 문구와 글꼴 바이너리는 바꾸지 않았다. 정본 파일과의 비교에는 이 공개용 공백 정리 한 곳을 명시적으로 반영하고 그 밖의 파일은 동일 바이트로 확인한다. 이전 커밋의 upstream 공백은 기능/이용조건 실패로 해석하지 않는다.

### 일반4개 운영 반영 확인

커밋8d152c2의 Vercel 배포 완료를 확인했고 실제 운영 목록, 네 상세, 네 데모 HTML 및 각 CSS/JS, PC/썸네일/모바일 이미지 총29개 응답이200이며 로컬 최신 파일과 SHA256이 일치했다. 실제 운영 목록에서55.1/56.1/57.2/58.2 썸네일 네 개가 모두 로드됐고, 목록 링크로 연 세 데모에서도 각 최신 스타일 주소와 폰트 loaded를 확인했다. 새1440×1300 운영 캡처 live-all-four-PC.jpg에는 네 카드와 이름이 함께 보인다. 임시 뷰포트는 확인 후 초기화했다.

검수 결과: 일반4개 전체 운영 반영 passed. Drive 백업은 같은 파일ID의 Google Drive Desktop 동기화 파일을 최종 추적 소스 ZIP으로 갱신한다. 로컬 ZIP과 동기화 사본의 SHA256 및 파일ID, 서버 메타데이터의 크기를 확인하며, 커넥터 원격 ZIP 읽기의 기존403 제한 때문에 원격 다운로드 바이트의 SHA256까지 검증했다고 주장하지 않는다.

## 웹사이트 목록 통합, 2026-10-08

사용자가 Signature와 Essential을 합치도록 확정했다. Website를 선택하면 전체7개를 표시하고 두 등급 버튼 및 카드의 tier 조건을 없앴다. 밝고 어두운 화면과 분야가 섞이도록 NOCTE, 서래커튼, 스위치조명, 수집노트, SEAM HOTEL, 법률사무소 서안, Banana Black으로 정적 목록과 카탈로그의 순서를 함께 맞췄다. 각 카드에는 분야와 가상 샘플 또는 보관본 여부를 표시한다. 일곱 데모의 디자인과 이미지, 문의 목적지 및 출처는 유지했다.

과거 category=website-signature/website-essential은7개 목록으로 연결하고 category=website로 주소를 정규화한다. 다른 query와 fragment는 보존한다. 샘플 목록으로 돌아오는 기본 경로도 통합 주소로 변경했고 소유 동기화 스크립트에도 반영했다. work.js13과style.css24 캐시를 목록/상세에 적용했으며 상세HTML의 다른 바이트는 기존HEAD와 같음을 확인했다.

실제PC1440×1000에서 통합 목록7개와 분야 설명을 확인했다. Photo5개 모음41장, Concepts34개와16개 표시 및18개 접힘, Website7개로 전환됐다. 모바일390×844의 과거Essential 링크와320×844의 과거Signature 링크가 모두 통합 주소와7개로 열리며 가로 넘침0, console error/warn 없음. 증거는 Desktop/codex-output/99_최종아님_삭제대기/aurora-website-merge-20261008/local-PC.jpg, local-mobile.jpg, local-320.jpg이며 직접 열어 확인했다. npm run check와 git diff --check 통과. 운영 반영은 main 푸시와 실제 공개 응답 확인 후 보고한다.

### 통합 목록 운영 확인

커밋28846c6의 Vercel success를 확인했다. 운영의 목록,work.js13,style.css24,카탈로그 및46개 상세 총50개 응답이200이며 로컬 최신 파일과 SHA256이 일치했다. 실제 기존Essential 공유 링크가 통합category=website로 정규화되고, 등급 버튼 없이 일곱 카드가 같은 순서로 표시된다. 스크롤해 일곱 썸네일의 loaded를 확인했다. 운영PC1440×1000과모바일390×844를 live-unified-PC.jpg/live-unified-mobile.jpg로 캡처해 직접 열었다. 모바일7개 표시와 가로 넘침0,console error/warn 없음. 뷰포트 초기화 및 운영 목록 탭 유지. 통합 목록 운영 검수passed. 후속 기록은 문서만 추가하며 검증한 공개 파일의 바이트는 유지한다.

같은Drive ZIP ID의 Desktop 동기화 파일을 최종 추적 소스 ZIP으로 갱신한다. 로컬ZIP과동기화사본의SHA256,파일ID와원격메타데이터 크기를 확인한다. 원격 ZIP 다운로드의 기존403 때문에 원격 바이트SHA256 검증 완료로 확대하지 않는다. Obsidian현재안내의 원본/운영/같은ZIP 링크는 유효하다.

## 포트폴리오 분야 순서 변경, 2026-10-08

사용자 요청에 따라 Website, Concepts, Photo 순으로 분류와 정적 섹션/카탈로그를 함께 정렬했다. /work의 기본 진입은7개Website이며, 기존 category 링크는 해당분야로 연결한다. Photo를 선택하면 category=photography를 주소에 남겨 새로고침에서도 사진41장/5개모음을 유지한다. 카탈로그의46개항목은 내용변경 없이 순서만 변경했고 상세HTML의 변화는work.js14 캐시뿐임을 기존HEAD와 비교했다.

npm run check 및 diff 검사를 통과했다. PC1440×1000의 기본Website7개와 분류 순서, Concepts34개/16개표시/18개접힘 전환과 Photo5개모음41장의새로고침을 확인했다. 모바일390×844 및320×844의 같은순서와Website7개,가로넘침0 및console error/warn없음을 확인했다. 캡처는 Desktop/codex-output/99_최종아님_삭제대기/aurora-portfolio-order-20261008/local-PC.jpg,local-mobile.jpg,local-320.jpg를 직접 열어 검수했다. 기존문의/추적/작품및출처와일곱데모를 유지했다. 공개완료는 운영응답과화면을 확인한뒤 보고한다.

### 분야 순서 운영 확인

커밋1ea36cd의 Vercel 배포success와 운영/work의 Website, Concepts, Photo 순서 및 기본Website7개를 확인했다. 운영PC1440×1000 및390×844에서 전환과모바일가로넘침0을 확인하고 live-PC.jpg/live-mobile.jpg를 직접 열었다. 목록,work.js14,카탈로그 및46개상세 총49개운영응답의SHA256이로컬과일치했다. 후속문서기록은이공개바이트를유지한다. 최종추적소스ZIP은기존DriveID를갱신하고 로컬/동기화사본SHA256과원격크기를확인한다. 원격다운로드의기존403으로원격바이트SHA256까지확인했다고주장하지않는다.

## 외부 마케팅팀 역할과 상담 흐름 보완, 2026-10-08

사용자가 제안한 보완을 승인하고 제작 항목을 웹사이트, 콘텐츠, 사진 및 영상 순으로 지정했다. 한글 핵심 메시지와 외부 마케팅팀 역할을 앞세우고 Beyond는 같은 서체의 보조 브랜드 문구로 유지했다. 첫 상담 문의는 안내영역으로, 포트폴리오 보기는 기존목록으로 연결한다. 서비스의 방향 정리/제작과 적용/월간 운영, 자체시안 세작업의 의도와구현 설명, 대표의 확인된역할 및 상담내용과한시간이내 안내를 반영했다. 무료진단, 별도보고서와성과수치를 추가하지 않았다. 대표이름/경력/사업자정보는 대표가 나중에 추가하도록 답했으므로 이번범위에서보류했다. 등록상호로확인되지않은JSON legalName은제외하고 공식브랜드name은유지했다.

제목,description/OG/Twitter/Organization설명을같은범위로맞췄다. scripts/og-card.html의문구를수정하고 실제1200×630화면을02-og.jpg로촬영해열어확인한뒤assets/aurora-og.png로인코딩했다. 처음새탭에서뷰포트가적용되지않은공유/모바일캡처는기존검수탭에서실제innerWidth/Height를확인해다시촬영했다. 이전캡처를치수검증근거로사용하지않는다. 한국어이용안내는기존출처/이용조건을유지해번역했고,공통메뉴와공개이름표기를맞췄다. 일곱데모및작품자산,법적원본문서/문의목적지/광고와오가닉추적/음악및실크동작은유지한다.

로컬PC1440×900/1024와390×844 및320×844에서첫화면의한글/영문역할과버튼,문장줄바꿈및가로넘침0을확인했다.320px첫상담버튼이#contact로이동한뒤안내전체와원래카카오목적지가보였다.서비스PC와모바일,대표역할영역및세작업설명,VEIL확대/닫기를확인했다. /interview의ad-mode와포트폴리오보조링크숨김, /work의Website7개및한국어footer,console error/warn없음을확인했다. 공유소비자47문서는캐시/메뉴/안내/공개이름이외바이트가기존HEAD와같다. npm run check 및git diff --check통과.

증거는 Desktop/codex-output/99_최종아님_삭제대기/aurora-home-clarity-20261008/의01-local-home-PC.jpg,02-og.jpg,03-local-home-mobile.jpg,04-local-home-320.jpg,05-local-contact-320.jpg,06-local-services-PC.jpg,07-local-about-PC.jpg,08-local-work-PC.jpg,09-local-services-mobile.jpg이며모두직접열었다. 공개완료는배포와실제응답확인후보고한다.
