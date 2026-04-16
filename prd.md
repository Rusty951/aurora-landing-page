# 오로라의소리 랜딩페이지 PRD

## 프로젝트 개요

콘텐츠 방향 설계 · 채널 구조 컨설팅 서비스 오로라의소리의 랜딩페이지.  
브랜드 인터뷰 신청(카카오 오픈채팅)을 유도하는 단일 페이지 구성.

---

## URL / 배포

| 항목 | 값 |
|------|----|
| 운영 기준 URL | https://www.aurorasound.kr/interview |
| 루트 URL | https://www.aurorasound.kr/ |
| Vercel 프로젝트 | aurora-landing-page |
| GitHub 저장소 | https://github.com/Rusty951/aurora-landing-page |
| 배포 방식 | Vercel — git push → 자동 배포 (빌드 스텝 없음) |

> `/interview`는 `vercel.json` rewrite로 `index.html`을 서빙.  
> 루트 `/`는 나중에 별도 홈페이지로 교체 예정.

---

## 기술 스택

- 순수 HTML / CSS / JavaScript (프레임워크 없음)
- 빌드 도구 없음 — 파일 그대로 정적 서빙
- 폰트: Google Fonts (preconnect)
- 배포: Vercel

---

## 파일 구성

```
index.html       메인 랜딩페이지 (전체 섹션 포함)
style.css        전체 스타일 (v12)
script.js        UI 인터랙션 (오로라 캔버스, 아코디언, 스크롤, 플로팅 버튼 등)
analytics.js     GA4 초기화 + 클릭 이벤트 추적
privacy.html     개인정보처리방침
vercel.json      /interview 경로 rewrite 설정
```

---

## 페이지 섹션 구조

1. 고정 네비게이션 바 (헤더)
2. 플로팅 카카오톡 버튼
3. 히어로 — 오로라 캔버스 배경, 메인 카피, CTA 버튼 2개
4. 3칸 즉시 이해 카드 (채널 방향 정리 / 핵심 메시지 정리 / 확장 구조 설계)
5. 공감 섹션 — 문제 제시 + 원인 진단
6. 채널별 역할 — 블로그 / 유튜브 / 인스타그램 아코디언 카드
7. 서사 브릿지
8. 왜 오로라의소리인가
9. OSMU 콘텐츠 확장 다이어그램 (라인 드로잉 애니메이션)
10. 브랜드 인터뷰 섹션 + CTA
11. 고객 후기 3개
12. FAQ 아코디언 5개
13. 최종 CTA
14. 푸터 (채널 링크, 이메일, 개인정보처리방침)

---

## 주요 외부 링크

| 항목 | URL |
|------|-----|
| 카카오 오픈채팅 | https://open.kakao.com/o/sMBNyzpi |
| 브런치 | https://brunch.co.kr/@730c0631bb2f493 |
| 네이버 블로그 | https://blog.naver.com/aurorasound_ |
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
| `click_brunch` | `a[href*="brunch.co.kr"]` 선택자 |
| `click_blog` | footer-blog-link |
| `click_instagram` | footer-insta-link |
| `click_youtube` | footer-youtube-link |

- `page_view`는 페이지 로드 시 자동 발송 (`gtag('config', ...)`)
- UTM 파라미터 자동 파싱 (별도 코드 불필요)
- privacy.html에도 analytics.js 로드됨

---

## vercel.json 구성

```json
{
  "rewrites": [
    { "source": "/interview", "destination": "/index.html" }
  ]
}
```

나중에 루트 `/`를 홈페이지로 교체할 때는 아래처럼 확장:

```json
{
  "rewrites": [
    { "source": "/interview", "destination": "/index.html" }
  ],
  "routes": [
    { "src": "/", "dest": "/home.html" }
  ]
}
```

---

## 다음 단계 (미완료)

- [ ] Meta Pixel 연결 (광고 집행 전)
- [ ] GA4 `click_cta_primary` 전환 이벤트 마킹 (GA4 관리 → 이벤트 → 전환으로 표시)
- [ ] Google Search Console 연결
- [ ] 루트 `/` 홈페이지 별도 제작 및 연결
- [ ] Meta 광고 UTM 파라미터 규칙 정의

---

## 수정 시 주의사항

- CSS는 `style.css` 하나로 관리. 인라인 스타일은 `index.html` `<head>` 안 `<style>` 태그에 일부 존재 (`.quick-grid` 분기선).
- 모바일 가로 스크롤 이슈가 있었음 — `clip-path` 및 오프셋 수정으로 해결. 레이아웃 변경 시 모바일 재확인 필요.
- `script.js`에 캐시 버스팅 쿼리스트링 있음 (`?v=3`). 수정 후 버전 올려야 브라우저 캐시 무효화됨. `style.css`도 동일 (`?v=12`).
- GA4 측정 ID 변경 시 `analytics.js` 7번째 줄만 수정하면 됨.
