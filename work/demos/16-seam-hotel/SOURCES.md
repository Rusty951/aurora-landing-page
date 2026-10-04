# 출처와 권리

## 공간과 미디어

SEAM이라는 가상 호텔의 콘셉트, 배치, 건축, 가구, 조명, 카메라와 화면 문구를 이번 요청에서 새로 제작했다. 실제 장소나 숙박 운영을 나타내지 않는다. 이름의 상표와 도메인 사용 가능성은 확인하지 않았다.

`tools/build_scene.py`에서 직접 만든 기하와 절차적 재질만 사용한다. 외부 모델, 사진, HDRI와 오디오를 가져오지 않았다. 모든 WebP와 `seam-journey.mp4`는 이 동일한 3D 장면의 렌더다. 사이트는 기본 무음이다.

Threads의 VIDENCE 참고 영상은 공간과 스크롤의 연속성을 관찰하는 참고로만 사용했다. 원본 영상, 등장인물, 그림과 코드를 이 사이트에 넣지 않았다. 원본 사이트의 구현 방식이나 코드를 재현했다고 주장하지 않는다.

## 글꼴

- MaruBuri Light: NAVER 제공. 기존 저장소의 원본 WOFF2 재사용. `assets/fonts/LICENSE-MARUBURI.txt` 포함. [공식 사용권 안내](https://help.naver.com/service/11029/contents/18088?lang=ko&osType=PC), [공식 웹폰트 CSS](https://hangeul.pstatic.net/hangeul_static/css/maru-buri.css).
- Pretendard Variable: orioncactus 제공. 기존 저장소의 WOFF2 재사용. SIL Open Font License 1.1. `assets/fonts/LICENSE-PRETENDARD.txt` 포함. [공식 라이선스](https://github.com/orioncactus/pretendard/blob/main/LICENSE).
- 영문 SEAM 표시는 시스템 Georgia 계열이다. Georgia 파일을 복사하거나 배포하지 않는다.

## 제작 도구

첫 3D 버전은 Blender 5.2.1 LTS, EEVEE로 만들었다. [공식 EEVEE 릴리스 기술 문서](https://developer.blender.org/docs/release_notes/5.2/eevee/). 출력 변환에는 Pillow, FFmpeg를 사용했다. 첫 3D 제작에는 유료 생성과 외부 자산 업로드가 없었으며 공개 배포도 수행하지 않았다.

## Flow 실사 시험 미디어

`flow.html`과 `assets/flow/`는 2026-10-04 사용자가 승인한 Google Flow 생성 시험의 두 번째 결과를 사용한다. 기존 자체 제작 3D 영상 중 객실에서 테라스로 이어지는 8초 MP4 한 개를 참조로 업로드했고, Rusty S. Moon 계정의 Google AI PLUS, Omni 1.1 Flash로 두 번 생성했다. 실제 차감은 총 20크레딧이었다. 웹 연결 작업에서는 추가 생성과 업로드를 하지 않았다.

- Flow 프로젝트: `5f315c23-1c60-4b47-b6e7-867e670774df`
- 두 번째 생성 asset: `aae71c65-a679-4b0e-9878-cce85c6d5512`
- 다운로드 원본 SHA-256: `f6249429991e154b8a69ec26468a91db8c1f1cbd840ebd02b41859b1424ed92b`
- `assets/flow/seam-room-terrace.mp4`: 원본 비디오 스트림을 재인코딩 없이 보존하고 오디오만 제외한 640×360, 24fps, 8초 시험본. SHA-256 `3d7935914a590919953d888f1fad3aadfde7ef7779b63dc2db290110994e5929`
- 192개 WebP와 다섯 정지 이미지는 위 MP4의 전체 프레임을 변환했다. 워터마크와 영상 테두리를 제거하지 않았다.

실제 호텔 촬영 영상이 아니다. AI가 의자 형태와 위치, 해안 배치와 카메라 진행 시간을 바꿨으며 3D 원본 공간을 정확하게 재현했다고 소개하지 않는다. 공개 배포는 수행하지 않았고, 이번 연결의 로컬 동작 검수는 영상의 최종 품질 승인이나 권리 보증을 대신하지 않는다.


## Flow 24초 전체 여정

`flow-journey.html`과 `assets/flow-journey/`는 같은 가상 호텔의 새 AI 사진형 동선이다. 3D 원본과 앞선 8초 시험은 별도 경로로 보존한다. 실제 호텔 촬영으로 소개하지 않는다. 외부 호텔 사진이나 모델을 사용하지 않았다.

2026-10-04 같은 Flow 프로젝트에서 Nano Banana Pro 텍스트 이미지와 무료 2K 업스케일로 시작 이미지를 만들었다. 실제 파일은 2752×1536, asset `6a347435-ed5f-44f5-8df8-6d7d648b43e0`이다. 영상은 Veo 3.1 Fast, Frames, 16:9, 720p, x1으로 생성하고 무료 1080p 후처리 결과를 다운로드했다. 원본 1080p 생성이 아니다. 선택한 구간의 마지막 720p 네이티브 프레임을 다음 첫 이미지로 직접 지정했다.

| 역할 | 실제 Flow asset | 사용한 소스 구간 |
|---|---|---|
| 접근로와 중정, 로비 진입 | `08cbb0a8-3a5c-42c4-a795-17b3523c7dbf` | 0-8초 |
| 로비 회전과 객실 문 앞 | `20dfc95f-dde4-4c0d-ba08-066d7f299a94` | 0-6초 |
| 열린 문을 통한 객실 진입 | `b5371086-8b72-48c6-be33-2f3aa767b2cf` | 0-6초 |
| 열린 문을 통한 석재 테라스 이동 | `537075a6-75da-44d4-873f-b77223cdf3bb` | 0-6초 |

실제 26초 동선을 전구간 균일 13/12 속도로 편집해 24초로 출력했다. AI가 4초 동작 완료를 이행하지 않아 필요한 이동을 모두 살린 무료 편집을 선택했다. 컷 전후의 카메라 위치를 이어 붙이며 디졸브, 정지 화면과 새로운 보간 영상을 사용하지 않는다. 세 연결 시간은 약 7.385초, 12.923초, 18.462초다. 각 원본의 오디오와 워터마크는 작업 폴더에 보존한다. 웹용 파일에서 오디오만 제외하고 워터마크를 제거하지 않았다.

`seam-full-journey.mp4`는 H264, 1920×1080, 24fps, 576프레임, 24.000초, 무음이다. SHA-256 `65040af1a5b198d05a9985749b5a13c9f249fb75f9ac59c86950bb201e797caa`. 1920×1080 WebP 576개와 다섯 정지 사진은 이 동일 MP4를 변환했다. MP4 30,911,787바이트, WebP 프레임 합 45,600,052바이트다.

이번 24초 제작의 실패와 보정을 포함한 실제 소비는 9회 180크레딧이다. 앞선 별도 시험 20을 포함한 SEAM 전체 누적은 200이다. 마지막 사용자 지시 후 추가 소비는 5회 100, 확인한 계정 잔액 50이다. 추가 결제나 구독 업그레이드는 하지 않았다. 생성 실패를 통과로 바꾸거나 작업 폴더 변경으로 비용을 초기화하지 않았다.

원본과 상세 검수 기록은 `~/Desktop/codex-output/99_최종아님_삭제대기/aurora-video-production/seam-flow-full-journey-20261004/production-notes.md`에 보존한다. 작은 목재, 리넨과 잎 표면의 AI 질감 흔들림은 남는다. 공개 배포와 실제 숙박 서비스 연결은 수행하지 않았다.

## SEAM 타이포그래피와 인터페이스 개편, 2026-10-04

시각 레퍼런스는 [The Largo 공식 홈페이지](https://thelargo.com/)다. 실제 첫 화면과 본문의 전폭 사진, 세리프 정체와 이탤릭, 넓은 여백과 간결한 행동 구성을 관찰했다. 이 원칙을 SEAM의 기존 영상과 다섯 장면에 적용했다. 레퍼런스의 브랜드, 사진, 문구, 수채화 또는 사이트 소스를 가져오지 않았다.

- **Bodoni Moda Regular와 Italic, 400**: Google Fonts 공식 v28 배포 TTF. 영문 제목, 워드마크와 장면 번호에 사용한다. 한글은 기존 MaruBuri Light 300과 Pretendard 배포본을 재사용한다. Bodoni Moda는 [공식 OFL 1.1](https://raw.githubusercontent.com/google/fonts/main/ofl/bodonimoda/OFL.txt)에 따라 무료 상업 웹 사용과 배포가 가능하며, 원본 고지를 `assets/fonts/BodoniModa-OFL.txt`에 포함했다. 실제 공급 URL과 파일 SHA-256은 `assets/fonts/BodoniModa-source.json`에 있다. 공식 파일을 수정하지 않았고 실제 Italic 파일을 따로 사용한다. 대체 서체는 영문 Georgia, 한글 serif와 sans-serif다.
- **Lucide 공식 SVG 6종**: arrow-up-right, arrow-down, rotate-ccw, pause, play, x. [공식 저장소](https://github.com/lucide-icons/lucide)에서 내려받아 원본 SVG 그대로 자체 호스팅한다. [ISC와 해당 Feather 파생 아이콘의 MIT 고지](https://github.com/lucide-icons/lucide/blob/main/LICENSE)를 `assets/icons/LUCIDE-LICENSE.txt`에 보존한다. 로컬 SVG를 CSS 필터로 표시하며 문자 기호로 아이콘을 흉내 내지 않는다.

추가 영상, 이미지 유료 생성과 외부 발행은 없었다. 기존 24초 MP4와 576개 사진 프레임의 바이트는 변경하지 않았다. 새 영문/한글 카피는 실제 화면의 열린 문, 중정, 리넨, 목재와 바다를 바탕으로 작성했으며 실재 호텔의 서비스, 예약, 객실 수, 가격 또는 후기를 만들지 않았다.


## 선택 재생 음악, 2026-10-04

Scott Buckley의 Reverie를 CC BY 4.0으로 사용한다. 공식 곡 페이지와 이용 안내를 현재 확인했고, 이 저장소의 NOCTE에 이미 보존한 공식 원본의 웹 인코딩을 SEAM assets/audio/로 복사했다. 전체 223.672925초, 44.1 kHz 스테레오 96 kbps MP3 2,684,910바이트다. 상세 출처와 변경 표시는 assets/audio/LICENSE.md에 있으며 화면의 객실 상세 하단에도 곡명, 작곡가, 라이선스 링크를 제공한다. 추가 생성, 구매, 업로드나 공개 발행은 하지 않았다.
