# Formkey 자산 출처

## 참고한 화면

- https://www.raycast.com/ 메인,2026-10-08 직접 관찰 및PC/모바일/메뉴/분야별탭 캡처.
- 참고 범위는 타이포, 여백과 계층, 헤더/본문 구성 및 제품 UI의 표현이다. Raycast의 코드, 로고와 이미지 바이너리는 배포본에 포함하지 않는다.

## 자체 생성 이미지

내장 image_gen 도구를 사용했다. 두 원본1672×941 PNG는 도구의 generated_images 저장 위치에 보존되며, 실제 소비자는 hero-red.webp와glass-blue.webp다. PNG에서WebP로인코딩만했고내용을편집하지않았다.

### hero-red.webp

최종 프롬프트: Use case: stylized-concept. Original luxury technology website hero background, wide16:9. Four long thick diagonal vermilion-red extruded ribbons/slats floating in nearly-black space, rounded machined edges, subtle fine grain, matte red faces and midnight-blue undersides, controlled rim lighting. Upper25% black negative space and a dark readable center. Original abstract design, not the Raycast logo or any recognizable brand symbol. No words, UI, branding, icons or watermark.

### glass-blue.webp

최종 프롬프트: Use case: stylized-concept. Original premium dark technology supporting background, landscape16:9. Layered cobalt glass and translucent acrylic strips diagonally on the right, physical refraction and controlled cool highlights. Left45% nearly-black space for text/UI, black outer edges, quiet precise developer-tool aesthetic. No words, UI panels, logos, brand symbols, icons, diagrams or people.

## 서체

- InterVariable.ttf: Google Fonts 공식 배포 https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf . 원본876576바이트,변환하지않음. SIL OFL1.1 저작권/조건은 fonts/Inter-OFL.txt에 그대로 포함한다. https://raw.githubusercontent.com/google/fonts/main/ofl/inter/OFL.txt
- PretendardVariable.woff2: 상위 professional/fonts에서검증된공식원본을재사용. 원본출처는 https://github.com/orioncactus/pretendard . SIL OFL1.1은 fonts/LICENSE-PRETENDARD.txt에 보존한다. 파일수정/서브셋변환을하지않았다.

## 표준 UI 아이콘

@phosphor-icons/core2.1.1 공식npm배포 https://registry.npmjs.org/@phosphor-icons/core/-/core-2.1.1.tgz 에서regular아이콘28개만채택했다. SVG경로를직접그리거나수정하지않았고원본을로컬이미지로사용한다. MIT저작권/이용조건은 icons/LICENSE-PHOSPHOR.txt에포함한다. Formkey워드마크옆기호역시해당라이브러리의Command아이콘이다.

## 문구와 제품 UI

Formkey의소개/예시작업/메모/일정/문구와UI는이번포트폴리오를위해작성했다. 실제사용자나고객업무,성과,후기또는실제외부앱연결을나타내지않는다. 팀폼은외부로전송되지않는다.

## 재현 가능한 생성 요청 전문

내장 image_gen,transparent_background=false를사용했다.추가유료CLI/API경로는사용하지않았다.

### 붉은 그래픽 요청

Use case: stylized-concept. Generate an ORIGINAL luxury technology website hero BACKGROUND ONLY, wide landscape 16:9 composition. A sculptural assembly of four long thick diagonal vermilion-red extruded ribbons/slats, each tilted from upper left to lower right, floating in deep almost-black space. Rounded machined edges, subtle irregular fine grain, rich matte red faces, dark graphite and midnight blue undersides, controlled cinematic red rim lighting. Main abstract assembly spans center and lower half, with black negative space across the upper 25 percent and a relatively dark center so white website title text can be overlaid later. Premium precision 3D render, restrained bloom, realistic occlusion, sharp sculptural surfaces, fine film grain. Palette: #08090b background, #f04438/#d92f27 red, #111d32 navy shadow. Full composition fades naturally into nearly black at all outer edges. It must be an original abstract design, NOT the Raycast logo or any recognizable brand symbol. No words, letters, UI, interface panels, branding, icons, watermark, people, laptop or decorative random objects. Wide high resolution background intended for desktop AND center-cropped mobile website hero.

### 푸른 그래픽 요청

Use case: stylized-concept. Generate an ORIGINAL premium dark technology website supporting background, landscape 16:9. Sculptural layered cobalt-blue glass and translucent acrylic strips, with smooth beveled edges, arranged diagonally across the RIGHT half of the image on almost-black graphite. A precise macro studio render, deep blue internal reflections, soft controlled cool highlights, physical refraction, faint fine grain. Keep the LEFT 45 percent predominantly nearly black negative space for readable text/UI. Black outer edges so the image blends into #08090b page background. Luxury developer-tool aesthetic, quiet and exact, not a generic neon wallpaper. Palette cobalt #3167df, muted ice #68adff, midnight #0b1730, black #08090b. No words, UI panels, logos, brand symbols, icons, diagrams, particles, people or random objects. High resolution original asset for a product feature panel.

모든실제자산바이트의SHA256은manifest.json에보관한다.

라이선스텍스트는조건과저작권문구를유지하면서줄끝공백과Phosphor의CRLF만정규화했다.글꼴바이너리와SVG원본은변경하지않았다.

## v59.3 Display typography

- Space Grotesk variable font,300–700,136676 bytes. Official Google Fonts distribution: https://raw.githubusercontent.com/google/fonts/main/ofl/spacegrotesk/SpaceGrotesk%5Bwght%5D.ttf
- Copyright2020 The Space Grotesk Project Authors. SIL Open Font License1.1: https://raw.githubusercontent.com/google/fonts/main/ofl/spacegrotesk/OFL.txt
- Local font: fonts/SpaceGroteskVariable.ttf, unchanged binary. License: fonts/SpaceGrotesk-OFL.txt, trailing whitespace normalized only; wording preserved. Used for display headings and the wordmark; UI/body retain Inter and Pretendard.
- Hero motion transforms the existing hero-red.webp raster. It does not use new generated artwork, video, a3D renderer or an additional animation dependency.
