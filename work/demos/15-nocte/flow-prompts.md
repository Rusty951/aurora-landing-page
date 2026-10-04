> Archived planning note, 2026-10-03: the user selected image v6, `assets/product-study/nocte-studio-hero-v6.png`. The bottle descriptions below predate that selection and must be revised before any future generation. The current website uses the selected still image with CSS motion. No Flow generation or upload has been executed.

# NOCTE, five-scene Flow footage plan

2026-10-03. Active direction: 정원 → 꽃 → 손끝 → 한 병의 향 → 잔향.

현재 웹 시안은 사용권을 확인한 Pexels 실사 영상 네 편과 자체 제작한 향수병 3D 영상을 사용한다. 아래 프롬프트는 Flow 교체 촬영용이며 생성하거나 업로드하지 않았다. 이전의 검은 병 두 컷 반복 기획은 대체되었다.

## 공통 연출과 실행 조건

- Google Flow의 Frames to Video, Veo 3.1 Fast를 첫 검토 후보로 둔다. 16:9, 각 6초, 1개 출력씩 다섯 장면을 제안한다. 실제 선택 가능한 모델, 해상도, 장면당 크레딧은 로그인된 생성 화면에서 확인해야 한다.
- 아직 계정과 비용 한도가 지정되지 않았다. 제출 전 장면별 정확한 참조, 입력, 설정, 시도 횟수와 총 비용을 확인한다. 이 문서는 생성 승인이 아니다.
- 꽃은 흰 스토크와 연분홍 장미, 손은 얇은 아이보리 소매, 병은 기존 검은 NOCTE 병으로 통일한다. 같은 사람의 얼굴은 등장하지 않는다. 꽃이나 손이 병으로 변형되는 장면은 없다.
- 장면 간 화면 전환은 웹에서 구현한다. 각 소스는 한 번의 연속 촬영이며 영상 안에 텍스트, 로고, 컷, 그래픽 효과를 생성하지 않는다.
- 화면 문구는 HTML에 남긴다. 모바일에서는 핵심 행동이 중앙 폭 안에 들어오는지 별도 확인한다. 필요하면 모바일용 재구도를 추가 계획하며 가로 영상 크롭만으로 해결된다고 가정하지 않는다.
- Pexels 소스 프레임은 현재 자산으로 존재한다. Flow에 업로드하지 않았으며, 후속 제작 때 선택한 참조의 사용 조건과 업로드 범위를 다시 확인한다.
- 자연스러운 시작과 종료를 우선한다. 루프는 생성 성공을 보장하지 않으며, 손의 접촉 장면은 반복 대신 한 번 재생 후 정지하는 현재 웹 동작을 유지한다.

## 01, Garden

역할: 향이 나오기 전 감각의 출발점을 보여준다.
참조 후보: `assets/garden-poster.jpg`, 구도와 자연광의 기준. 현재 시안은 낮의 정원이다.
화면: 초록 잎 사이로 빛이 움직인다. 왼쪽 제목 자리, 오른쪽 잎의 세부.
검수: 식물 윤곽이 끓지 않고 빛과 잎만 천천히 움직일 것.

```text
One continuous, photorealistic editorial film shot in a quiet garden. Follow the attached frame for the arrangement of leaves, branches and light. Cool, deep green leaves with warm late-afternoon sunlight coming through. A light breeze moves a few leaves independently. The camera makes a restrained forward movement, with believable parallax between near leaves and distant foliage. Preserve the organic irregularity and botanical detail. Keep the left third calmer and shaded for a website headline added in HTML. Understated analog film color, fine texture, no fantasy glow. No people, no product, no text, no logos, no cuts, no transitions. No dialogue or music.
```

## 02, Bloom

역할: 정원의 넓은 풍경에서 한 송이의 순간으로 시선을 좁힌다.
참조 후보: `assets/bloom-poster.jpg`, 꽃 종류와 이슬의 기준.
화면: 같은 정원의 흰 꽃 접사. 화면 중앙의 꽃을 2~3초 동안 읽을 수 있어야 한다.
검수: 새 꽃이 갑자기 생기거나 꽃 종류가 바뀌지 않을 것. 풀화면 배경으로 사용하며 꽃은 왼쪽, 제목은 오른쪽에 배치한다.

```text
One continuous photorealistic macro shot of the white stock flowers and soft blush roses shown in the attached frame. Preserve the same petals, dew drops and soft garden background. Observe a single white bloom closely, with delicate movement from a barely perceptible breeze. Focus stays on the edge and dew of the central white petals. Soft warm daylight, creamy highlights, restrained green and blush tones. The camera is nearly still. A real botanical detail, not a flower opening time-lapse. No changing flower species, no new objects, no hands, no text, no logos, no cuts. No dialogue or music.
```

## 03, Touch

역할: 바라보던 꽃이 사람의 감각과 연결된다.
참조 후보: `assets/touch-poster.jpg`, 꽃과 소매. 이 프레임의 접촉 전후 상태를 확인한 뒤 최종 시작 프레임을 고른다.
화면: 오른쪽 위에서 손이 들어와 흰 꽃잎에 한 번 닿고 천천히 물러난다.
검수: 손가락 형태, 실제 접촉, 꽃의 작은 반응, 손이 물러나는 순서를 확인한다. 가장 어려운 장면이므로 먼저 검토할 테스트 후보다.

```text
A single continuous live-action editorial close-up in the same garden as the attached reference. Keep the white stock flowers, blush roses and delicate ivory sleeve consistent. One adult hand gently enters from the upper right, pauses beside the central bloom, touches the edge of a petal once, then slowly withdraws. The petal responds with a small believable movement. Five natural fingers, consistent anatomy, no intersecting petals, no morphing. The hand and flower contact must remain clearly visible in the central area so the action can also survive a portrait crop. Calm soft daylight and warm skin. Fixed camera, no rapid focus changes, no face, no product, no text, no cuts. No dialogue or music.
```

## 04, Essence

역할: 사라질 정원의 감각을 한 병에 담는다는 브랜드의 상징적 결론.
참조: `assets/hero-poster.png`, 자체 제작한 병의 형태와 구도. 병은 오른쪽에 두고 왼쪽은 제목 자리로 남긴다.
검수: 병 실루엣, 뚜껑, 금속 띠 유지. 실제 제조나 성분의 증거로 설명하지 않는다.

```text
A continuous photorealistic fragrance still-life film based on the attached original product reference. Preserve the exact rectangular obsidian-black bottle, softly rounded shoulders, black cap and thin brass collar. Keep the bottle in the right half and quiet negative space on the left. A narrow warm amber reflection slowly passes across the glass, making the shape visible against a dark charcoal background. The camera moves forward only slightly. The bottle stays on its support, with stable geometry and plausible reflections. No flowers transforming into objects, no hands, no added lettering, no floating particles, no cuts. No dialogue or music.
```

## 05, Echo

역할: 물건과 사람이 사라진 뒤 공간에 남는 감각으로 끝낸다.
참조 후보: `assets/afterglow-poster.jpg`, 커튼의 투명도와 해 질 무렵의 빛. 최종 가로 구도 참조는 아직 없다.
화면: 비어 있는 창가의 얇은 커튼을 바람이 한 번 지나간다. 웹 최종 장면도 영상을 화면 끝까지 채우고 글자를 그 위에 배치한다. 데스크톱의 가로 크롭과 모바일의 세로 구도를 각각 확인한다.
검수: 갑자기 인물이나 병을 다시 등장시키지 않는다. 움직임 뒤 조용한 끝 구간을 확보한다.

```text
One continuous photorealistic shot of an empty room at dusk, with an open window and a fine ivory curtain. Use the attached reference for translucent fabric and warm light. A gentle breeze moves through the curtain once; the fabric slowly settles. Warm amber sunlight falls on the sill while the room remains calm and unoccupied. Natural weight and folds, soft shadows, fixed camera. Leave time at the end for the movement to become almost still. No people, no product, no text, no logos, no scene changes, no cuts. No dialogue or music.
```

## 웹 교체와 검수

대상: `assets/garden.mp4`, `bloom.mp4`, `touch.mp4`, `hero.mp4`, `afterglow.mp4`. 각 영상의 포스터도 함께 갱신한다. 모바일 향수병은 `hero-mobile.mp4`가 별도 선택된다. 소스 길이와 실제 사용 구간을 기록하고, 자연스러운 동작을 지킨 상태로 H.264, 무음, faststart로 인코딩한다.

각 장면의 행동과 전체 스크롤 흐름을 따로 검수한다. 꽃과 손의 종류 및 빛의 연속성, 5개 장면의 의미, 데스크톱과 모바일 구도, 실제 재생, 정지 버튼, 역방향 스크롤을 확인한다.

공식 참고: [Flow 모델과 기능](https://support.google.com/flow/answer/16352836?hl=en), [Flow 시작 및 워터마크 안내](https://support.google.com/flow/answer/16353333?hl=en). 국내 표시 워터마크 정책은 결과 검토에 포함한다.
