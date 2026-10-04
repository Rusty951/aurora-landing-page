# 홈페이지 V1 포트폴리오

현재 목록의 원본은 work/catalog.json이다. 공개 45개 카드에는 Photo의 다섯 모음, Concepts 34개와 Website 6개가 포함된다. 이미지 및 샘플 소스는 이 저장소의 work/assets 및 work/demos에 보관한다.

## Photo

대표가 직접 제작한 사진과 비주얼 41장을 Product 11장, Food 9장, Dessert 6장, Space 4장 및 Portrait 11장의 모음으로 제공한다. 촬영 확인, 파일 해시와 원본 식별은 docs/PORTFOLIO-SOURCES.json을 따른다. 별도 제작 브랜드 표기를 붙이지 않는다. 공개 목록과 확대 화면은 현재 운영한 41장을 유지하며 추가 원본을 자동 공개하지 않는다.

## Concepts

자체 제작과 AI 시안 34개다. AI 푸드 및 제품 비주얼, 브랜드 장면, 8장 인스타 캐러셀과 찰리, 페니 및 버디의 시리즈를 포함한다. 출처와 생성 정보는 docs/PORTFOLIO-SOURCES.json 및 docs/PORTFOLIO-PROMPTS.json을 보존한다. 시안과 촬영, 가상 사례를 구별하고 고객 납품이나 성과를 추정하지 않는다.

## Website

현재 샘플은 NOCTE, SEAM, 서래커튼, 수집노트, 스위치조명과 법률사무소 서안이다. 샘플 원본은 Rusty951/website-portfolio에서 가져온 독립 디자인이며 현재 홈페이지에서 쓰는 사본은 work/demos 안에 있다. 원본 저장소의 별도 리뉴얼은 이 홈페이지의 과거 버전이 아니다. 이후 대표가 요청하면 선정한 변경을 반영한다.

Signature와 Essential은 탐색 자리다. Signature는 별도 보존작2개, Essential은 일반 홈페이지4개다. PC 두 열과 모바일 한 열, 1440×810 대표 이미지 및 높낮이와 스크롤 모션을 사용한다. 공개된 데모는 가상 사업체의 시연이며 예약과 문의가 외부로 전송되지 않는다. 각 데모의 SOURCES.md와 README.md는 출처 기록으로 보관하되 운영 배포에서 제외한다.

## 이용 조건과 화면

원본 출처 JSON과 이미지 해시, 생성 정보, 폰트 및 스톡 라이선스 기록은 현재 자료의 일부다. 홈페이지 이전 시안을 정리하면서 함께 지우지 않는다. 공개 목록은 static fallback으로도 읽을 수 있으며 확대는 원래 이미지 비율, 닫기와 초점 복귀, 좌우와 방향키 및 터치 탐색을 지원한다. 운영 footer의 Disclaimer와 법적 문서 내용은 유지한다.

## 2026-10-05 샘플 관리 통합

샘플 원본은 ../website-portfolio 하나다. work/demos는 npm run sync:samples로 생성하는 배포용 사본이며 직접 수정하지 않는다. NOCTE와 SEAM의 원본은 변경하지 않는다. 병원4개와 디자인플레아 자료는 오로라 배포 사본에 포함하지 않는다. Photo41장 및 Concepts34개는 정리 대상이 아니다. 이번 작업은 로컬 정리이며 운영 배포는 별도다.
