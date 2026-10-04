# 오로라의소리 홈페이지 1차본

Status: `LIVE V1 / PRODUCTION VERIFIED`

2026-10-03 대표가 현재 로컬 홈페이지와 포트폴리오를 1차본으로 확정하고 운영 홈페이지 교체를 승인했다. 구현 커밋 bae5791831e468b26ee2debeaef91dfe7aac2025의 Preview 6826206013과 Production 6826220926이 성공했고 실제 운영 도메인의 75개 파일이 소스와 일치했다. 제거한 이전 파일 6개와 내부 문서 5개는 404다. PC와 모바일 메인 및 포트폴리오, 문의 이동과 안내 펼침을 확인했다. 화면 기준은 검수를 통과한 `2d320a7`이다. 이전 비교용 HTML, 이전 루트 CSS와 JavaScript, 메시 renderer와 Three.js 실험 자산을 현재 소스에서 제거한다. 변경 전 소스는 Git 이력에서 복구할 수 있다. 별도의 미커밋 프로젝트와 영상 개발 브랜치, 샘플 사이트 원본은 정리 대상이 아니다.

## 현재 구성

2026-10-03 바나나블랙 작업 41장 추가를 운영에 반영했다. 구현 `59dbd24`의 Preview와 Production이 성공했고 운영 파일 99개가 소스와 일치하며 PC와 모바일 사진 탐색을 확인했다. 홈페이지 1차 화면과 `v1.0.0` 태그는 보존한다.

- 운영 주소: `https://www.aurorasound.kr/`
- 광고 주소: `https://www.aurorasound.kr/interview`
- 포트폴리오: `/work`, 바나나블랙 사진과 비주얼 41장의 다섯 모음, 자체 시안 34개와 웹사이트 샘플 6개
- 사진 목록은 기본 화면이며 제품, 푸드, 디저트, 공간, 인물로 나눈다. PC 두 열과 모바일 한 열, 원래 비율의 전체 이미지 보기와 연속 확대를 지원한다.
- 웹사이트 목록: PC와 태블릿 두 열, 모바일 한 열, 1440×810 대표 썸네일
- 웹사이트 유형은 Signature와 Essential로 구분한다. 이번에는 자리만 준비하며 기존 여섯 샘플은 Signature의 첫 목록에 유지하고 Essential은 준비 중 안내를 표시한다. 리뉴얼 작품과 등급 확정은 이후 요청에서 연결한다.
- 메인: 진주빛 실크, 승인된 가로형 워드마크, 완만한 U자 서비스 배치, 라벤더 유리 버튼
- FAQ: 서비스와 문의 사이의 네 질문, 진행 방식과 제작 범위, 비용 및 일정 협의, 별도 월간 계약 안내
- 문의: `https://open.kakao.com/o/sMBNyzpi`, 이메일 `contact@aurorasound.kr`
- 대표가 직접 촬영한 사진과 자체 시안, AI 제작, 가상 사업체를 구분한다. 사진에 별도 제작 브랜드 표기를 붙이지 않으며 확인되지 않은 고객 사례나 성과를 추가하지 않는다.

## 실행과 검증

```bash
npm run dev
npm run check
git diff --check
```

로컬 미리보기는 `http://localhost:4173/`다. PC와 모바일의 실제 화면, 샘플 열기와 필터, 문의, 재생과 키보드 검수는 `design-qa.md`의 최신 기록을 따른다. 기존 통과 결과는 변경된 부분과 함께 재사용한다.

## 소스와 계약

- `index.html`: 홈과 광고 경로의 공통 문서, SEO와 광고 경로 Meta 초기화
- `rebrand/style.css?v=41`, `rebrand/app.js?v=8`: 1차 화면과 입력, 재생, 반응형 표시
- `rebrand/silk.js`, `audio.js`, `showcase.js`: 실크 효과, 선택 재생 음악과 상세 이미지 보기
- `work/index.html`, `work/style.css?v=23`, `work/work.js?v=12`, `work/motion.js?v=3`: 사진, 자체 시안과 웹사이트 목록, 분야, 이미지 확대와 웹사이트 스크롤 모션
- `work/catalog.json`, 작업별 HTML과 `work/assets/`: 45개 모음과 작업의 구성, 상세와 자산
- `work/assets/bananablack/`: 바나나블랙 Git 이력의 37장과 공개 촬영 소개 페이지의 4장을 최적화한 자체 파일. 외부 사진 저장소에 의존하지 않으며 원본 경로와 해시는 내부 출처 기록을 따른다.
- `work/demos/`: 홈페이지 안에 포함한 여섯 웹사이트 샘플. 원본 저장소는 `Rusty951/website-portfolio`이며 출처는 `docs/PORTFOLIO-SOURCES.json`을 따른다.
- `rebrand/contact.js?v=4`: 모바일 작품 목록과 사진 상세, 주 문의, 이미지 확대에서 고정 문의의 겹침 방지
- `analytics.js?v=8`: 광고와 오가닉을 구분하는 기존 추적 계약
- `assets/aurora-og.png`: 기존 1200×630 공유 이미지. 제작 원본이 사용하는 wave 자산은 함께 유지한다.

GA4와 Meta는 운영 호스트에서만 실행한다. Meta PageView는 `/interview`에서만 한 번 전송하며 카카오 클릭은 Contact의 outbound_click 단계다. 실제 문의나 Lead로 기록하지 않는다. UTM, 공식 소셜 채널과 네이버 인증, 승인 파비콘, 개인정보처리방침과 이용약관을 유지한다. 음악은 기본 꺼짐이며 정적 실크 대체 이미지, 움직임 정지와 시스템 동작 줄이기를 지원한다.

## 배포와 버전

GitHub `Rusty951/aurora-landing-page`의 기능 브랜치 검수 후 `main`에 일반 push하면 Vercel 프로젝트 `aurora-landing-page`가 자동 배포한다. 이번 공개 교체는 대표가 승인했으며 추가 결제나 호스팅 변경은 포함하지 않는다. force push로 이력을 지우지 않는다. 운영 `/`, `/interview`, `/work`와 핵심 자산의 응답 및 실제 PC와 모바일 표시를 확인한 뒤 1차 배포 완료로 기록한다.

1차 확정 태그는 `v1.0.0`을 사용한다. 이전 r2, v3, v4와 날짜별 시안은 현재 기준이 아니며 과거 Git 이력이다. 캐시 주소의 숫자는 파일 갱신용이므로 1차 버전명과 별개로 유지한다. 문제가 생기면 이전 production을 복원하거나 revert commit으로 되돌린다.
