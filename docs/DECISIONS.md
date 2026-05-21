# Decisions

## 2026-05-04: Project Operating Guide 적용

결정:

- `AGENTS.md`를 짧은 AI 작업 라우터로 추가한다.
- 기존 `README.md`와 `prd.md`는 운영 원본으로 유지한다.
- `docs/*`는 기존 원본을 대체하지 않고 AI가 빠르게 맥락을 찾는 지도 역할을 한다.
- 운영 문서와 로컬 도구가 Vercel 배포 표면에 노출되지 않도록 `.vercelignore`를 추가한다.

이유:

- 기존 작업트리에 수정 중인 파일이 많아 대량 이동이나 원본 덮어쓰기는 위험하다.
- 이 프로젝트는 정적 사이트라 저장소 루트 파일이 공개 배포 표면에 섞일 수 있다.
- `/`와 `/interview`가 같은 랜딩을 보여주되 추적 맥락만 분리하는 정책을 유지해야 한다.

검증:

- JS/MJS 파일은 `node --check` 기반 check 명령으로 검증한다.

## Decision Log Template

날짜:

결정:

이유:

영향 문서:

검증:
