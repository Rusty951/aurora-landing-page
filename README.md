# 오로라의소리 홈페이지 V1

현재 기준일: 2026-10-04, 한국 시간. 대표가 확정한 이번 화면을 첫 번째 버전으로 관리한다.

## 관리 위치

- 로컬 작업 원본: `/Users/bananabk/Documents/Projects/aurora-landing-page`
- GitHub 원본: https://github.com/Rusty951/aurora-landing-page/tree/main
- 운영 홈페이지: https://www.aurorasound.kr/
- 광고 경로: https://www.aurorasound.kr/interview
- 포트폴리오: https://www.aurorasound.kr/work
- Drive 현재 소스: https://drive.google.com/drive/folders/1r6FRYHs6Cx9_s2UEn76IF8JGVkwNQFVU
- Obsidian 안내: `30_ENTITIES/A01_오로라의소리/website.md`

작업은 이 로컬 저장소와 GitHub main 하나로 관리한다. Drive에는 같은 소스의 aurora-landing-page-v1.zip 하나를 갱신한다. Obsidian에는 소스를 복제하지 않고 현재 원본의 위치와 운영 방법만 기록한다. 과거 비교본과 단계별 설명서는 현행 자료에 포함하지 않는다. Git 변경 이력은 복구와 변경 추적용이며 별도의 운영 버전이 아니다.

## 현재 화면

진주빛 실크 첫 화면, 가로형 aurora sound 워드마크, Selected work, U자 서비스 소개, FAQ와 문의로 이어진다. 큰 한글 제목은 아리따 부리, 메뉴와 버튼 및 작품 정보는 DM Sans와 Asta Sans다. FAQ 질문은 PC 20px 및 모바일 17px, 답변은 16px 및 15px다. 작은 볼륨의 배경 음악과 재생 설정, 은은한 유리 표면 및 기존 모션을 사용한다.

포트폴리오는 Photo 41장 다섯 모음, Concepts 34개, Website 6개다. Photo의 분야는 Product, Food, Dessert, Space, Portrait다. Website는 Signature와 Essential로 구분하며 기존 여섯 작품은 Signature, Essential은 준비 중이다. PC 두 열과 모바일 한 열을 사용한다. 썸네일의 샘플 사이트는 저장소의 work/demos 안에 포함된다.

## 실행과 검증

```sh
npm run dev
npm run check
git diff --check
```

로컬 주소는 http://localhost:4173/다. 페이지와 연결 자산의 원본은 저장소 안에 있으며 외부 사진 목록 서비스에 의존하지 않는다. 정적 파일의 배포는 GitHub main 변경을 Vercel이 받아 진행한다.

공개 승인된 변경은 검수 후 main에 commit 및 push하고 Vercel Production 성공과 실제 운영 화면을 확인한다. Drive ZIP과 Obsidian 안내를 같은 기준으로 갱신한다. 이미지, 폰트 및 외부 출처의 이용 조건과 광고 및 오가닉 추적 경계를 유지한다.

## 문서 지도

- 제품과 화면 범위: [prd.md](prd.md)
- 디자인 기준: [docs/DESIGN.md](docs/DESIGN.md)
- 기술과 추적 계약: [docs/TRD.md](docs/TRD.md)
- 포트폴리오와 출처: [docs/PORTFOLIO.md](docs/PORTFOLIO.md)
- 작업과 배포: [docs/WORKFLOWS.md](docs/WORKFLOWS.md)
- 실제 검수: [design-qa.md](design-qa.md)
- 기준 결정: [docs/DECISIONS.md](docs/DECISIONS.md)
