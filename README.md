# 오로라의소리 홈페이지 V1

화면 기준일: 2026-10-04, 운영 안내 갱신일: 2026-10-08, 한국 시간. 대표가 확정한 화면을 첫 번째 버전으로 관리한다.

## 관리 위치

- Mac Studio 코드 원본: `/Users/bananabk/Documents/Projects/aurora-landing-page`
- MacBook 코드 원본: `/Users/bananabk/Documents/Projects/aurora-landing-page` (사용자 전달 보고서, 2026-10-05 17:29:41 KST). 경로와 당시 `main`의 clean 상태는 보고서 근거이며 MacBook을 직접 조회한 결과는 아니다.
- GitHub 원본: https://github.com/Rusty951/aurora-landing-page/tree/main
- 운영 홈페이지: https://www.aurorasound.kr/
- 광고 경로: https://www.aurorasound.kr/interview
- 포트폴리오: https://www.aurorasound.kr/work
- Drive 현재 소스: https://drive.google.com/file/d/1f3THlpASI_WeAXs2vCmHys85Ob8N64BJ/view
- Drive 홈페이지 폴더: https://drive.google.com/drive/folders/1r6FRYHs6Cx9_s2UEn76IF8JGVkwNQFVU
- Obsidian 안내: `30_ENTITIES/A01_오로라의소리/website.md`

작업과 공유는 GitHub `main` 하나로 관리한다. 기기 간 적용 전에는 HEAD, 미커밋 변경, 미푸시 커밋과 stash를 확인해 고유 작업부터 보존한다. Drive에는 같은 소스의 aurora-landing-page-v1.zip 하나를 갱신한다. Obsidian에는 소스를 복제하지 않고 현재 원본의 위치와 운영 방법만 기록한다. 과거 비교본과 단계별 설명서는 현행 운영 기준에 포함하지 않는다. 이 구분은 보존 중인 원본, 브랜치와 stash의 추가 삭제 승인이 아니다. Git 변경 이력은 복구와 변경 추적용이며 별도의 운영 버전이 아니다.

## 현재 화면

진주빛 실크 첫 화면, 가로형 aurora sound 워드마크, Selected work, U자 서비스 소개, FAQ와 문의로 이어진다. 첫 화면은 기존 리브랜딩 실행 파트너와 큰 Beyond, 웹사이트와 콘텐츠 및 사진과 영상 소개, 프로젝트 문의 버튼과 작은 포트폴리오 보기 링크 구성이다. 서비스 안내는 웹사이트, 콘텐츠, 사진 및 영상과 월간 운영을 설명하며, 하단 첫 상담 안내를 보완했다. 큰 한글 제목은 아리따 부리, 메뉴와 버튼 및 작품 정보는 DM Sans와 Asta Sans다. FAQ 질문은 PC 20px 및 모바일 17px, 답변은 16px 및 15px다. 작은 볼륨의 배경 음악과 재생 설정, 은은한 유리 표면 및 기존 모션을 사용한다.

포트폴리오는 Photo 41장 다섯 모음, Concepts 34개, Website 7개다. Photo의 분야는 Product, Food, Dessert, Space, Portrait다. Website는 일곱 작업을 한 목록으로 보여준다. NOCTE, 서래커튼, 스위치조명, 수집노트, SEAM HOTEL, 법률사무소 서안과 Banana Black 순서다. 분야와 가상 샘플 또는 보관본 여부를 카드에 표시한다. 분류는 Website, Concepts, Photo 순이며 /work 첫 진입은 Website다. PC 두 열과 모바일 한 열을 사용한다. 샘플 원본은 ../aurora-website-portfolio이며 npm run sync:samples로 work/demos의 배포용 사본을 갱신한다. 직접 사본을 수정하지 않는다. 한 샘플만 반영할 때는 `npm run sync:samples -- --route=13-chaon-law`처럼 정본 폴더를 지정하며, 선택하지 않은 사본과 기존 공유 자산은 유지한다. 일반4개는 정본0c5beb9의 서래커튼 v55.1, 수집노트 v56.1, 스위치조명 v57.2, 서안 v58.2를 적용했다.

## 실행과 검증

```sh
npm run dev
npm run check
git diff --check
```

로컬 주소는 http://localhost:4173/다. 페이지와 공개용 연결 자산은 Git 추적 파일로 관리하며 외부 사진 목록 서비스에 의존하지 않는다. 샘플 소스 원본은 별도 Portfolio 저장소이고 `work/demos`는 배포 사본이다. 촬영 원본과 제작 미디어, 권리 및 출처 자료는 각 원래 보관 위치에 유지한다. 코드 적용만으로 Drive ZIP, Obsidian 안내와 실제 배포가 갱신되지는 않는다. 정적 파일의 배포는 GitHub main 변경을 Vercel이 받아 진행한다.

공개 승인된 변경은 검수 후 main에 commit 및 push하고 Vercel Production 성공과 실제 운영 화면을 확인한다. Drive ZIP과 Obsidian 안내를 같은 기준으로 갱신한다. 이미지, 폰트 및 외부 출처의 이용 조건과 광고 및 오가닉 추적 경계를 유지한다.

## 문서 지도

- 제품과 화면 범위: [prd.md](prd.md)
- 디자인 기준: [docs/DESIGN.md](docs/DESIGN.md)
- 기술과 추적 계약: [docs/TRD.md](docs/TRD.md)
- 포트폴리오와 출처: [docs/PORTFOLIO.md](docs/PORTFOLIO.md)
- 작업과 배포: [docs/WORKFLOWS.md](docs/WORKFLOWS.md)
- 실제 검수: [design-qa.md](design-qa.md)
- 기준 결정: [docs/DECISIONS.md](docs/DECISIONS.md)
