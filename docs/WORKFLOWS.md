# 홈페이지 V1 작업과 배포

## 원본

로컬 Documents/Projects/aurora-landing-page와 GitHub main 하나로 관리한다. README.md, AGENTS.md, prd.md와 직접 영향을 받는 docs를 읽고 현재 git status를 확인한다. 변경 전 사용자 의도와 기존 승인 범위를 재사용한다. 이전 시안이나 폐기한 브리프를 현재 승인으로 읽지 않는다.

## 수정과 검수

요청한 범위의 소스와 직접 소비자에서 시작한다. 카피 변경은 최신 사용자 원문 및 Voice와 aurora-copy-writing을 따른다. 자산과 출처, 법적 안내와 문의 목적지, 광고 및 오가닉 수집 경계를 유지한다. 공개 파일이 바뀌면 해당 캐시 주소를 갱신한다.

npm run check와 git diff --check를 실행하고 변화에 맞는 PC 1440px, 모바일 390px 및 좁은 320px의 실제 화면과 주요 조작을 확인한다. 유효한 기존 검수는 재사용하며 단순한 관리 문서 수정에 불필요한 화면 재설계를 하지 않는다. 검수 기준과 결과는 design-qa.md의 현재 항목을 갱신한다.

## 공개와 보관

대표가 승인한 범위에서 main에 commit 및 push하고 Vercel Production 완료와 실제 운영 URL 및 소스 응답을 확인한다. 이후 Drive의 aurora-landing-page-v1.zip 같은 파일 ID를 갱신한다. ZIP은 현재 Git 추적 파일만 포함하며 .git, .env와 도구 상태는 제외한다. 로컬 ZIP과 Drive에서 다시 읽은 ZIP의 SHA256 및 크기를 비교해 같은 바이트인지 확인한다.

Obsidian의 A01 website.md에는 로컬 원본, GitHub main, 운영 주소와 Drive 현재 소스 링크만 유지한다. 과거 버전의 폴더나 ZIP, 단계별 캡처를 새 보관 위치에 누적하지 않는다. 변경 이력은 Git으로 추적한다.
