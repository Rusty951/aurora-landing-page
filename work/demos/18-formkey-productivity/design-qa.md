# Formkey 디자인 검수

검수일:2026-10-08. 메인1페이지v59.3,업무용생산성도구의가상브랜드포트폴리오다.

## 비교 대상과 조건

- source visual truth: 사용자에게제시되고선택된 `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/foreign-premium-references-20261008/03-raycast.jpg`.
- 현재원본의전체본문/390px/메뉴/Design탭은 `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/raycast-formkey-20261008/source/`에캡처했다.
- 구현: http://127.0.0.1:8786/18-formkey-productivity/?review=59.3
- 공통증거경로는 `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/raycast-formkey-20261008/`다.
- PC1280×720/모바일390×844,DPR1.각캡처픽셀은CSS뷰포트와동일해추가밀도정규화없음.320×844도별도로확인했다.
- 기본첫화면/메뉴닫힘을같은뷰포트로비교했다.원본의움직이는그래픽과독자생성이미지는같은애니메이션프레임이나픽셀일치로주장하지않는다.정적캡처및수동움직임일시정지상태로배치/타이포/색과계층을평가했다.
- 전체비교입력:final-PC-comparison.jpg(2560×720),final-mobile-comparison.jpg(780×844).같은이미지입력에원본과구현을나란히놓고직접열었다.
- 집중비교입력:final-PC-header-comparison.jpg/ final-mobile-header-comparison.jpg 및final-type-comparison.jpg(1440×260).헤더와작은UI글자,제목의글자형태와간격을직접보았다.본문은PC/모바일contact-sheet와중요개별캡처를함께열었다.

## 의도한 조정

기존정적포트폴리오의HTML/CSS/JS계약을사용한다.새로운Vite/호스팅runtime을만들지않았다.실제Raycast브랜드/로고/고객얼굴/성과수치/연동주장/다운로드/결제는적용하지않으며,Formkey문구와자체그래픽및동작하는제품UI로표현했다.원본의16k픽셀전체를복제하지않고소개/제품/단축키/분야별도구/메모와집중/반복작업/팀/FAQ/마무리로본문을편집했다.브랜드와콘텐츠길이,그래픽의굽은슬랫형태및한글설명은합의한포트폴리오용변화다.

## 비교와 수정 이력

1. 첫비교first-PC-comparison.jpg/first-mobile-comparison.jpg.
   - [P1] 모바일hero가약242px부터수직으로잘렸다.전역img max-width:100%와180%hero확대충돌을발견했다. hero-art max-width:none으로수정했다.
   - [P2] br를숨긴모바일설명의두문장사이에공백이없었다. br뒤공백을추가했다.
   - [P2] 실제hero버튼42px/메뉴40px/모달닫기30px이작았다.모바일주요버튼/닫기/메뉴를44px이상으로조정했다.
2. fixed-mobile-comparison.jpg에서그래픽의끊김과문장연결수정을확인했다.터치영역은실제메뉴/hero44px,320px모달닫기44px으로재확인했다.
3. 키보드및기능검수에서검색어와명령이름일치를우선하고입력후최상위항목이선택되게다듬었다.검색결과마지막항목도목록안에보이도록내부스크롤을연결했다.모바일Recent Files선택행381~425px이목록215~430px안에보이고scrollTop124.5로확인됐다.
4. 최종비교final-PC-comparison.jpg/final-mobile-comparison.jpg와집중비교를다시열었다.수정한P1/P2는해결됐고새로운P0/P1/P2는없었다.

## 필수 표면 평가

- **Fonts/typography:passed.** v59.3은 영문 제목을 Space Grotesk600으로 바꿨다. PC64px/1.08,390px35px,320px29px이며 두 줄을 유지한다. 제품 UI와 본문은 기존 Inter를 유지했다.한글은Pretendard로명시하고한글/영문/숫자를실제문구로보았다.제목의tracking과문구폭은Formkey의긴영문문구에맞춰조정했다.원본및구현의그림과CSS/로드상태를함께확인했다.브라우저RenderedFonts별도진단은수행하지않았으며,로드상태를그진단완료로주장하지않는다.원본서체바이너리/라이선스는assets/SOURCES.md를따른다.
- **Spacing/layout:passed.** 헤더PC좌우38px/위16px/높이76px,모바일좌우16px/59px와중앙제목구성이유지된다.1280/390/320에서가로넘침0이다.제품창은시연내용에따라높이를늘려입력과저장을가리지않는다.모바일카드의가로탐색과나머지본문의한열배치를확인했다.
- **Colors/tokens:passed.** 거의검은배경,회색보조글자와밝은주행동,붉은첫화면/푸른보조자산이이어진다.이름/문구/자산의차이를제외한주요계층과색역할을같은비교입력으로확인했다.전체WCAG인증이나모든픽셀의대비실측으로확대하지않는다.
- **Image quality/assets:passed.** 생성원본1672×941의내용편집없이WebP94로인코딩해로컬소비자로배치했다.모바일자산끊김수정후전체폭/크롭을확인했고최종본문모든img가complete/naturalWidth유효다.그래픽을CSS그림/도형/그라데이션으로대체하지않았다.제품창과단축키는실제로입력/선택이작동하는HTMLUI다.아이콘은Phosphor2.1.1MIT원본28개다.
- **Copy/content:passed.** 새로운Formkey소개와가상예시내용을사용한다.실제고객/성과/외부연동/앱배포를꾸며내지않는다.기능/문의의시연범위와비전송이화면에분명히표시된다.

## 실제 기능 검수

- 검색/빈결과/영문과한글검색/방향키/Enter,명령이름우선및최상위선택:passed.
- 메모입력/Save note/다른작업후메모유지,본문메모탭:passed.새로고침전까지만유지한다.
- 타이머25:00시작후23:17감소,Pause23:16유지,Reset25:00:passed.버튼초점이재렌더뒤에도유지된다.
- Control K열기/검색입력초점/Escape닫기/원래열었던버튼으로복귀:passed.
- 모바일메뉴열기/닫기/메뉴에서검색열기/Escape뒤메뉴버튼으로초점복귀:passed.
- Work/Create/Develop내용전환,ArrowRight로Develop선택및초점,카드에서Recent Files모달열기:passed.첫자동스크롤직후의포인터검수는상태가바뀌지않아현재위치가안정된화면에서다시눌러Create를확인했다.
- Snippet선택의문구변경및Copy버튼활성후성공상태:passed.사용자의기존클립보드를읽지않았고OS독립읽기검증으로확대하지않는다.
- 팀폼빈입력/이메일형식오류거부,정상입력뒤비전송완료/닫기/값초기화:passed. method=dialog로미처리기본외부전송도방지한다.
- FAQ의Enter열기/닫기:passed.브라우저rolehelper가summary를button으로찾지못해실제summaryDOM을기준으로검수했다.
- v59.2 Motion pause/그림animation:none/루트scroll-behavior:auto:passed. v59.3은 현재 프레임에 정지하는 animation-play-state:paused로 개선했다.실제OS동작줄이기설정변경은하지않았으며미디어쿼리와동작중지코드를확인했다.

## 최종 증거와 한계

- 09-final-hero-PC.jpg,10-final-hero-mobile.jpg,11-hero-320.jpg.
- page-PC-01~13.jpg/page-mobile-01~13.jpg와final-PC-contact-sheet.jpg/final-mobile-contact-sheet.jpg에서전체본문을직접보았다.처음모바일캡처의스크롤표적이우측바영역에걸려본문전체를보지못한캡처는버리고왼쪽페이지여백을표적으로재촬영했다.
- 04-mobile-notes-dialog.jpg,05-mobile-menu.jpg,06-create-cards-PC.jpg,07-inline-notes-PC.jpg,08-team-complete-PC.jpg,12-team-320.jpg를직접열었다.320px문의모달은282×646px,전송시연버튼44px이viewport안에있다.
- 실제페이지console error/warn없음.탭정리로기존검수탭이사라진경우최신소스의새탭으로연결하고관련상태를재검수했다.자동화evaluate오류를앱오류나검수완료근거로혼동하지않는다.
- HTML단일h1/중복id/로컬자산경로/라이선스포함manifest/허브경로와node --check 및git diff --check:passed.
- 실제앱/OS제어/외부앱연동/계정/영구저장/결제/메일발송은이포트폴리오의범위가아니다. 실제모바일기기의IME/OS키보드와독립hover영상은검증하지않았다.남은P3는그래픽의각도/밝기를취향에맞춰추가조정할수있다는정도다.

최초추적추가후staged diff검사에서상위공식Inter라이선스의줄끝공백한곳과Phosphor라이선스CRLF가검출됐다.문구/조건을유지해공백/줄바꿈만정규화하고manifest를갱신했다.추가staged검사로확인하며UI바이트는바뀌지않았다.

## v59.3 모션과 서체 보완

- 사용자 요청: 첫 화면에서 느껴지는 모션과 좀 더 개성 있는 서체. 원본의 공간과 기본 레이아웃은 유지한다.
- 기존18초3.5%확대는 실제 동작했지만 정지 화면처럼 느껴졌다.16초 이동, 회전과 확대 루프로 바꾸고, 포인터 이동은 별도 부모 레이어로 분리해 같은 transform 속성 충돌을 피했다. 모바일 이동 거리는 PC보다 줄였다.
- 제목 두 줄과 설명, 버튼이850ms/800ms로 순서대로 등장한다. 텍스트는 이후 움직이지 않는다. 등장 완료를 별도 상태로 기록해 정지/재생 후에도 제목 등장 애니메이션이 반복되지 않음을 실제 확인했다. 첫 화면44px정지 버튼과 기존 푸터 버튼의 상태를 동기화했다. 페이지 비활성 또는 첫 화면이 화면 밖이면 배경 루프를 중단한다.
-1280×720,390×844,320×720에서 실제 화면과 제목을 확인했다. 가로 넘침0,320px두 줄 높이63.78px. Space Grotesk 공식 variable 바이너리136676 bytes와 OFL을 로컬 배포한다. 라이선스 본문을 보존하고 줄 끝 공백만 정규화했다.
- 첫 화면의 두 시점에서 transform 행렬이 달라지는 것과 실제 이미지 이동을 확인했다. PC-a/PC-b 캡처는 서로 다른 모션 프레임이다. 단일 정지 캡처로 모션 검증을 주장하지 않는다.
- 정지 버튼을 누른 직후와 다음 호출에서 transform 행렬이 정확히 유지되고 animationPlayState가 paused이며 푸터 상태도 true임을 확인했다. 재생 후 모바일scrollY1688에서 hero.ambient-paused와 paused를 확인했다.
- 제품 시연 버튼이 dialog를 열고 검색창에 초점을 주며 Escape로 닫히는 것, 모바일 메뉴 열기와 Escape닫기를 재검수했다. 기존 제품 기능은 이번 수정 대상이 아니다. 실제 브라우저 error/warn0.
- OS 움직임 줄이기 설정은 실제 변경하지 않았다. 해당 미디어쿼리에서 등장 효과와 배경 모션을 제거하고 정적 이미지, 가독성을 유지하는 코드 경로를 확인했다.
- 증거: /Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/formkey-motion-type-20261008/의01-motion-PC-a.jpg,02-motion-PC-b.jpg,04-hero-320.jpg,05-final-hero-mobile.jpg,06-final-hero-PC.jpg.03-hero-mobile.jpg는 등장 중 캡처여서 최종 가독성 판단에 사용하지 않는다.

final result: passed
