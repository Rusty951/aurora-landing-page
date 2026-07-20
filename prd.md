# 오로라의소리 랜딩페이지 PRD

## 프로젝트 개요

콘텐츠는 만들고 있는데 문의로 이어지지 않는 사업자가, 채널을 늘리기 전에 "고객을 멈추게 할 첫 문장"부터 물어보게 만드는 오로라의소리 랜딩페이지.
하나의 공통 랜딩을 운영하되, 루트는 오가닉/대표 유입으로, `/interview`는 광고 유입 확인용으로 구분한다. 정식 홈페이지를 별도로 만들 때까지 두 주소는 같은 화면을 보여준다.

---

## URL / 배포

| 항목 | 값 |
|------|----|
| 대표/오가닉 URL | https://www.aurorasound.kr/ |
| 광고 확인용 URL | https://www.aurorasound.kr/interview |
| Vercel 프로젝트 | aurora-landing-page |
| GitHub 저장소 | https://github.com/Rusty951/aurora-landing-page |
| 배포 방식 | Vercel — git push → 자동 배포 (빌드 스텝 없음) |

> 루트 `/`는 유튜브 고정댓글, 인스타그램, 스레드, 네이버 블로그, 명함 등 모든 대표/오가닉 유입용.
> `/interview`는 `vercel.json` rewrite로 같은 `index.html`을 서빙하되, 분석상 광고 유입으로 구분.
> 향후 정식 홈페이지 제작 시 루트 정보 구조와 CTA 흐름을 다시 정리.

---

## 기술 스택

- 순수 HTML / CSS / JavaScript (프레임워크 없음)
- 빌드 도구 없음 — 파일 그대로 정적 서빙
- 폰트: Google Fonts (preconnect)
- 배포: Vercel

---

## 파일 구성

```
index.html       공통 랜딩페이지 (`/`, `/interview` 모두 서빙)
style.css        전체 스타일 (v15)
script.js        UI 인터랙션 (오로라 캔버스, 아코디언, 스크롤, 플로팅 버튼 등)
analytics.js     GA4 초기화 + 클릭 이벤트 추적
favicon.svg      브라우저 탭 아이콘
privacy.html     개인정보처리방침
terms.html       서비스 이용약관
robots.txt       검색 엔진 크롤링 허용 및 sitemap.xml 위치 안내
sitemap.xml      대표 공개 URL 사이트맵
vercel.json      /interview 경로 rewrite 설정
```

---

## 페이지 섹션 구조

1. 고정 네비게이션 바 (헤더)
2. 플로팅 카카오톡 버튼
3. 히어로 — 오로라 캔버스 배경, 메인 카피, CTA 버튼
4. 첫 문장 시연 — 업종별 전/후 교정 카드 3개 + 실제 사례 카드 3개(인테리어: 문의 동선 부재→전문가 설명 콘텐츠→고가 문의 증가 / 치킨 프랜차이즈: 가맹 퍼널 재설계 / 병원: 의료진 언어→환자 언어, 결과 미확인이라 작업 사실만·의료광고 규제상 진료과목·효과 표기 금지) (`#first-line`, 실력 증명 섹션)
5. 3칸 즉시 이해 카드 (첫 문장 정리 / 첫 순서 정리 / 문의 연결 점검)
6. 공감 섹션 — 문제 제시 + 원인 진단
7. 채널별 역할 — 블로그 / 유튜브 / 인스타그램 아코디언 카드
8. 왜 오로라의소리인가 (+ "만드는 사람" 운영자 이력 카드 — 국내 1위 포털 콘텐츠 마케팅 매니저 출신, 사명·사진 비공개 방침, 네이버 AI 브리핑 누적 16만 회 인용 수치 2026-06 기준 표기)
9. 막힌 지점 진단 섹션 + CTA (진행 3단계: 두세 줄 전송 → 직접 만나서 진단(대면 우선 방침) → 진행·비용은 그다음 결정)
10. FAQ 아코디언 4개 (무료 진단 이유 포함)
11. 최종 CTA
12. 푸터 (채널 링크, 이메일, 개인정보처리방침)

### 현재 히어로 방향 (2026-07 메시지 개편)

- 윗줄(자기인식): `콘텐츠는 쌓이는데 문의는 없다면`
- 메인(가치 제안): `고객을 멈추게 할 첫 문장부터 잡습니다`
- 보조 설명: 공장식 비판 한 줄 + `어떤 문장인지, 바로 아래에서 보여드릴게요.` (시연 섹션으로 연결)
- CTA: `막힌 지점, 무료로 진단받기`
- 히어로 직후 첫 문장 시연 섹션(전/후 교정 3카드)이 실력 증명 역할 — 사례 주장 없이 "흔한 문장 → 이렇게 바꿉니다" 교정 시연 프레임
- 첫 3카드: 첫 문장 정리 / 첫 순서 정리 / 문의 연결 점검

---

## 주요 외부 링크

| 항목 | URL |
|------|-----|
| 카카오 오픈채팅 | https://open.kakao.com/o/sMBNyzpi |
| 네이버 블로그 | https://blog.naver.com/aurorasound_ |
| 워드프레스 블로그 | https://blog.aurorasound.kr/ |
| 인스타그램 | https://www.instagram.com/aurorasound_marketing |
| 유튜브 | https://youtube.com/channel/UCyhfDPonJBfaKNIf9MDHavg |
| 이메일 | aurorasound2425@gmail.com |

---

## GA4 추적

| 항목 | 값 |
|------|----|
| 측정 ID | G-YQJ3DC2SQN |
| 설정 파일 | `analytics.js` 7번째 줄 `GA_MEASUREMENT_ID` |

### 추적 이벤트 목록

| 이벤트명 | 트리거 요소 (HTML id) |
|----------|----------------------|
| `click_kakao_openchat` | nav-cta-btn, kakao-float-btn, footer-kakao-link |
| `click_cta_primary` + `click_kakao_openchat` | hero-cta-btn, interview-cta-btn, final-cta-btn |
| `click_email` | footer-email-link |
| `click_blog` | footer-blog-link |
| `click_wordpress_blog` | hero-wordpress-blog-link, footer-wordpress-blog-link |
| `click_instagram` | footer-insta-link |
| `click_youtube` | footer-youtube-link |

- `page_view`는 페이지 로드 시 자동 발송 (`gtag('config', ...)`)
- 클릭 이벤트에는 `landing_type`, `landing_path`, UTM 5종 자동 포함
- `landing_type` 값: `organic_root`(`/`), `paid_interview`(`/interview`), `other`
- GA4와 Meta Pixel은 `www.aurorasound.kr`, `aurorasound.kr`에서만 실행되며 localhost 미리보기는 수집하지 않음
- privacy.html과 terms.html에도 analytics.js 로드됨

---

## vercel.json 구성

```json
{
  "rewrites": [
    { "source": "/interview", "destination": "/index.html" }
  ]
}
```

정식 홈페이지를 별도로 제작하기 전까지는 루트 `/`와 `/interview`가 같은 랜딩을 보여주고, 추적값만 분리한다.

---

## Meta Pixel 추적

| 항목 | 값 |
|------|----|
| Pixel ID | 3182617048583568 |
| 적용 범위 | `/interview`, `/interview/` 경로에서만 실행 |
| 설정 위치 | `index.html` `<head>` 상단 인라인 `<script>` |

- 운영 호스트와 `window.location.pathname`으로 분기 — localhost와 메인(`/`) 등 다른 페이지에는 픽셀 미실행
- `PageView` 이벤트: 페이지 로드 시 자동 발송
- 광고 경로(`/interview`) 카카오 CTA 클릭: `analytics.js`에서 Meta `Contact` 이벤트 발송. 실제 유효 문의와 단순 링크 클릭을 구분
- 광고 경로에서는 `html.ad-mode` 클래스(index.html head 인라인)로 히어로 WordPress 블로그 보조 CTA·푸터 채널 링크(블로그·인스타·유튜브)를 숨겨 이탈 경로 축소. 카카오·이메일·약관 링크는 유지
- noscript 대체 이미지(`img`) 도 동일 조건 블록 안에서 JS로 동적 삽입

---

## 다음 단계 (미완료)

- [x] Meta Pixel 연결 (운영 도메인의 /interview 경로 한정 적용 완료)
- [x] 공통 랜딩에서 대표 URL(`/`)과 광고 URL(`/interview`) 유입 추적 분리
- [x] GA4 `click_cta_primary` 주요 이벤트 표시 (세션당 1회, 기본값 없음, 2026-07-21)
- [x] GA4 이벤트 범위 맞춤 측정기준 `button_id`, `landing_type` 등록 (2026-07-21)
- [ ] Google Search Console 연결
- [ ] 향후 정식 홈페이지 제작 시 루트 정보 구조와 CTA 흐름 재정리
- [ ] Meta 광고 캠페인별 UTM 파라미터 세부 규칙 정의

---

## 수정 시 주의사항

- CSS는 `style.css` 하나로 관리. 인라인 스타일은 `index.html` `<head>` 안 `<style>` 태그에 일부 존재 (`.quick-grid` 분기선).
- 모바일 가로 스크롤 이슈가 있었음 — `clip-path` 및 오프셋 수정으로 해결. 레이아웃 변경 시 모바일 재확인 필요.
- `script.js`에 캐시 버스팅 쿼리스트링 있음 (`?v=5`). 수정 후 버전 올려야 브라우저 캐시 무효화됨. `style.css`도 동일 (`?v=15`).
- `analytics.js`에 캐시 버스팅 쿼리스트링 있음 (`?v=4`). 수정 후 버전 올려야 브라우저 캐시 무효화됨.
- GA4 측정 ID 변경 시 `analytics.js` 7번째 줄만 수정하면 됨.
