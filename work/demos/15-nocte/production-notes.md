# NOCTE v12, canonical website portfolio source

2026-10-04. The user requested moving the completed NOCTE site into the existing website-portfolio project. Active source is now `15-nocte/` with v12 HTML, CSS, JavaScript, all 17 selected assets and their attribution records. The hub lists NOCTE as the seventh brand study, with 18 websites total: 15 fictional studies and 3 client concepts.

Local preview: http://127.0.0.1:8770/15-nocte/?v=12#garden . On 2026-10-04, the user requested deleting the obsolete Desktop production backup, including earlier candidates, raw downloads, baselines and historical inspection files. All current frontend and selected asset bytes were checked against the final v12 ZIP and retained unchanged. Historical `sources/`, `evidence/` paths and 4318 preview URLs below describe the removed working folder. The current source, attribution, licenses, selected perfume-image original and final delivery files remain. No external publication or upload is included.

Earlier entries below are historical records. The v12 landscape repair and its verification are recorded in design-qa.md.

# NOCTE v11, copy development and design intent

2026-10-04. User authorized the three priorities from the copywriting and content review. Keep the approved five-scene composition, selected perfume, English titles, motion, controls and music. The current viewpoint is a brief contact that lingers.

Bloom support: 지나칠 뻔한 꽃잎에 / 시선이 머뭅니다.
Touch support: 꽃에 닿는 건 잠깐, / 감각은 손끝에 남습니다.
About introduces the fictional concept and explains why the hand follows scroll and the bottle appears before its words. The meta description follows the revised story. Existing disclosure, scope and attribution stay in place.

Source baseline: sources/v10-baseline/. Evidence: matched 1280 x 720 Bloom, Touch and About pairs, 390 x 844 and 320 x 568 copy layout, plus compact About scrolling and focus return. CSS, JavaScript and all 17 packaged assets are unchanged; their previous verification is reused. Current preview uses ?v=11 and existing style/script keys 10.1. See design-qa.md for measured bounds and limits. No asset generation, upload or publication is included.

Earlier entries below are historical records.

# NOCTE v10, varied restrained text entrances

2026-10-04. User requested more varied and elegant text motion. Preserve the five fullscreen chapters, approved perfume, all wording, v9 film treatment and existing controls.

Title gestures are specified per scene: Garden rise, Bloom lateral glide, Touch a small scale/rise, Essence delayed baseline reveal, Echo a slow small scale opening. The second line follows the first, chapter labels lead and support/CTA details follow. Native scroll controls all transition poses and reversal. Direct chapter arrival adds a finite entrance after fonts load; interaction cancels it. Returning Garden is scroll-driven to avoid replaying an entrance after visible text. Existing reduced-motion behavior is retained.

The user's v9 Echo video was already playing during diagnosis. Current Garden, Bloom and Echo play, and Touch seeks with scroll. Essence continues to use the accepted still with CSS motion. No unobserved video failure is claimed fixed and no replacement film is generated.

Current proof: matched 1440 x 900 Essence source/implementation at y=2988, native entry states for each title gesture, forward/reverse bottle-and-copy staging, direct entrance, video pause/resume and responsive 390 x 844 and 320 x 568 states. All 17 packaged assets are unchanged. Evidence is in evidence/v10/ and source baseline is in sources/v9-baseline/, excluded from the delivery ZIP. Earlier functional checks are reused where unchanged; see design-qa.md for scope and limits.

Earlier entries below are historical records.

# NOCTE v9, film cohesion and a staged product reveal

2026-10-04. Current version: v9, CSS cache revision v9.1. The user authorized the proposed refinement after reviewing v8. Preserve the selected v6 bottle, the five chapters, existing copy, outlined buttons, cursor light and optional music.

- Shared art direction: neutral olive shadows, restrained saturation, warm ivory daylight and champagne control accents. Each stock clip has its own correction within the common palette. The product photograph is not graded or regenerated.
- Reduce scroll camera enlargement from a 12 percent range to 3.5 percent for the videos. Remove synthetic video blur and repeated 108 percent title-line slides. Garden-to-Bloom, Bloom-to-Touch and Essence-to-Echo use different transition intervals.
- Touch reaches its contact frame near story progress 2.14. Copy clears by 2.24, then the contact holds until 2.38. Reveal runs from 2.38 to 2.64, staying fully opaque. Bottle remains alone until copy begins at 2.79; copy completes at 2.95. Positions reverse with native scroll. The entire page remains 560svh.
- The accepted bottle settles into its existing composition before text arrives. Its ambient scale range is reduced from 2.5 to 1.2 percent. This is CSS motion of the same selected photograph.
- QA iteration: the first 320 x 568 Echo capture showed bright backlight weakening text separation. The final Echo grade lowers brightness from 0.83 to 0.72 and strengthens the mobile veil. Compared both captures at the same viewport. This is a visual judgement, not a measured contrast certification for every frame.
- Current native browser checks: five desktop scenes, forward and reverse sharp reveal, exact y=2988 reload restoration, 390 x 844 product and reveal, 320 x 568 product/Echo/header layout, 768 x 1024 product/navigation, video pause/resume, music on/off, About open/close with focus return, and both scene CTA destinations. Browser console is empty. Selected media and font integrity and unchanged checks are reused.
- Evidence and before/after comparison: evidence/v9/. Source baseline frontend remains in sources/v8-baseline/ and is excluded from the web ZIP. The comparison uses matched scene/viewport captures; moving footage and ambient image scale may have different frames. No claim of identical pixel samples is made.
- Limits remain: physical phone/browser coverage, native OS reduced motion, screen-reader use, 200 percent zoom, network throttling, independent Rendered Fonts identity, full-track listening and the loop seam were not exercised. No new asset generation, upload, publication, tracking or paid execution occurred.

Earlier entries below are historical records.

# NOCTE v8, optional quiet music

2026-10-04. User requested adding suitable music quietly to the portfolio. Selected Reverie by Scott Buckley from the official CC BY 4.0 library, with linked attribution in About and an accompanying asset license note. The initial piano/ambient direction is a design judgement; the source describes piano, synth and strings. No separate wind layer, generated composition, paid service, upload or publication was used.

Official original retained in sources/sb-reverie.mp3. An initial urllib request returned HTTP 406; a normal public download with an audio Accept header and source-page referer succeeded. Web MP3 is 96 kbps, 44.1 kHz stereo, 223.672925 seconds, 2,684,910 bytes. Full FFmpeg decode passed. Original mean volume is -17.0 dB and peak -1.2 dB after web encoding. Browser Web Audio gain 0.16 attenuates the track, with 1.8-second fade-in and 0.65-second fade-out. This gain is inspected source behavior, not a physical loudness measurement.

Technical QA: passed. Fresh page starts with audio paused, autoplay false and music pressed false. User click starts actual playback at readyState 4; source time progresses from 0.41 to 32.44 seconds across Garden-to-Bloom navigation without reset. Off pauses at 33.18 seconds; on resumes at 33.63. Rapid off/on/off finishes paused at 72.33 seconds with no status error. Final browser warning/error log is empty. Node syntax and local reference checks pass.

Layout QA: passed for the changed header at the default 656 x 988 and compact 320 x 568 viewports. Compact logo ends at x=124.02, actions start at x=147.55 and end at x=297.60; music target is 48 x 44 px and document width stays 320. About displays track and license links; close restores opener focus. Source evidence/v7.2/garden-button.png and implementation evidence/v8/garden-music.png were inspected together at the same 656 x 988 size; music-control addition is the approved difference, video frames differ. Main typefaces, asset composition, spacing and scene copy remain established. Screenshots are in evidence/v8/.

Listening QA: pending. An encoded listening sample was prepared, but the tool reported audio input is unsupported. No full-track audition, physical speaker loudness or audible loop-seam pass is claimed. Native iOS/Android playback and actual hidden-tab recovery were not exercised. The preview allows the user to audition the stock selection. Playback is delivered as an optional control, off by default. Earlier QA below remains historical.

# NOCTE v7.3, champagne hover reflection

2026-10-04. User requested a luxurious glow on cursor hover. The two scene CTA buttons now use a champagne border glow, a cursor-positioned radial reflection and a single 1.25-second satin sweep. Pointer tracking is limited to one animation frame per movement update. Touch input is ignored; reduced motion disables tracking and the sweep. Keyboard focus retains its visible outline with a restrained static glow.

Verified actual pointer hover at the default 656 x 988 viewport: hover matched, reflection opacity reached approximately 0.96 during its entrance, warm border and box shadows were active, and cursor positions changed from 37.52 to 117.52 px horizontally. Button navigation still returned to Garden. The final stylesheet uses a fresh v7.3.1 cache key and prevents button text selection. Evidence: evidence/v7.3/echo-hover.png. Node syntax passes and final browser warning/error log is empty. Native reduced-motion preference and touch hardware were not exercised. Previous layout checks remain reusable because dimensions are unchanged.

# NOCTE v7.2, scene CTA buttons

2026-10-04. User requested turning the Garden and Echo links into buttons without underline rules. Added story-cta styling: 48 px height, rounded outline, translucent background, hover/pressed states and keyboard focus. Link text and navigation semantics remain unchanged. Clicked Echo return to Garden, then Garden CTA to Bloom and verified the resulting active chapters. Inspected both buttons at the default 656 x 988 viewport. At 320 x 568, Echo button is 149.02 x 48 px, its content ends at y=439.06 before the footer at y=480, and document width remains 320. Evidence: evidence/v7.2/. Earlier QA and delivery archives are preserved.

# NOCTE v7.1, decorative rules removed

2026-10-04. User requested removing unnecessary horizontal lines. Removed chapter underlines, the bottom progress rule, CTA underlines and About dividers through scoped CSS. Current chapter remains indicated through text color and aria-current. Existing motion and keyboard focus styles are unchanged. Verified live Bloom at the default 656 x 988 viewport, loaded style.css?v=7.1, hidden line elements, zero CTA/divider borders and About open/close. Evidence: evidence/v7.1/bloom-lines-removed.png. The prior v7 QA and comparison below remain historical records.

# NOCTE, Product Design audit repair

Active website version: v7, 2026-10-03. The user requested fixing every finding in the strict Product Design audit. This revision retains the accepted v6 perfume image, the existing five-scene fullscreen format and local typefaces. Earlier records below describe superseded versions; their historical pass labels are not the current design verdict.

## v7 changes and verification

- Replace the Touch-to-Essence transparent blend with an opaque right-to-left reveal. The contact scene approaches gently and remains underneath; the product stays sharp, and its title appears after the reveal passes the copy area. At the previously problematic desktop y=2808, Essence now has opacity 1, no blur, a completed clip and readable copy. At the reverse-scroll midpoint, the two scenes occupy separate areas without double exposure.
- Keep the About close button in a fixed dialog header while the body scrolls. At 320 x 568 with credits at the bottom, the close button remains at y=32–76 and can be clicked. Closing restores focus to About.
- Make the keyboard skip link focus the current scene heading. Enter focuses garden-title; the following Tab reaches the scene CTA and bypasses the header.
- Raise mobile chapter numbers from 9 to 13 px, support text to 14 px (13 px on compact screens), and About to 12 px. Add the current chapter name. Controls use visible text labels. Compact Essence and Echo were adjusted so their content remains above the footer.
- Strengthen the header's dark gradient for moving foliage. Remove the first scene's orange badge and use consistent chapter eyebrows. Keep the original large serif hierarchy.
- Carry one motif through the copy: garden, petal, touch, bottled memory and the remembered garden. Echo reuses Garden footage with a different crop and darker olive treatment. Remove the large closing watermark and move the fictional-study disclosure into the content at a readable size.
- A 768 x 1024 QA pass found a 4.25 px overlap between navigation and control hit areas after enlarging type. Narrower tablet chapter links and gaps resolved it. Final navigation ends at x=559 and controls begin at x=603.75.
- Visual comparison used v6 and v7 together at matched source viewport sizes and scene states. The mobile footer was also compared at native 390 px width. See design-qa.md and evidence/v7/comparison.html for the comparison record and screenshots.
- Current checks passed: JavaScript syntax, local asset references, selected PNG/WebP byte preservation, forward/reverse reveal, pause/resume, fixed dialog close, skip-link focus, mobile and tablet layout, exact y=2808 reload restoration, and an empty final console warning/error log. Existing unchanged media decoding and font license checks are reused.
- Limits: responsive browser viewports are not physical phone tests. Native OS reduced motion, assistive technology, 200% zoom, throttled networks, independent rendered font identity and audience outcomes were not newly verified. The portfolio remains a local fictional study with stock footage, a selected AI still and CSS/JavaScript motion. No new image/video generation, upload or publication occurred in v7.

## Superseded v6 history

# NOCTE, scroll story repair

Active website version: v6, 2026-10-03. The user requested fixing the three findings from the web-design, content and decision review: Touch-to-Essence pacing, scroll-location restoration, and concise portfolio contribution information. Retain the selected fragrance image v6, the five-scene narrative and existing typefaces.

## v6 criteria before implementation

- Replace the nine-second autonomous Touch playback with a three-second excerpt of the same source, driven by scroll progress. Contact must be visible by the Touch chapter's settled position and complete before the product reveal, without waiting for nine seconds. Keep the gesture readable at desktop 1440 x 900 and mobile 390 x 844.
- Give Touch-to-Essence a distinct full-viewport focus transition: the contact frame moves closer, then the selected product image pulls back from a closer view into its complete silhouette. Preserve the image's geometry and label. Reversing scroll must reverse the sequence without a blank frame. This is CSS motion of the selected still, not synthesized bottle footage.
- Natural scrolling must update the chapter hash without creating an entry for every frame. Reload should restore the saved story progress, while direct chapter links and Back/Forward retain meaningful destinations. Resizing during navigation must not strand the user in an intermediate chapter.
- Add a compact, truthful account of concept, design and interaction work to About. Keep third-party footage and AI-image attribution visible in the credits, with no invented client outcome or author identity.
- Reuse valid v5 layout and media checks; inspect changed behavior on desktop, mobile and the compact 320 x 568 product view. Check pause/resume, modal behavior, navigation, fresh console errors and media integrity. Native OS reduced-motion and actual audience impact are not assumed verified.

## v6 implementation and verification

- Touch now uses source seconds 14–17, extracted as seconds 6–9 of the preserved earlier web clip. The new H.264 file is 1440 x 760, 24 fps, three seconds, 1,456,470 bytes, silent, with a keyframe every four frames and faststart. Full FFmpeg decoding completed without errors. The poster is excerpt time 1.6 seconds. No new generation or external upload was used.
- Pass: the gesture follows scroll progress instead of autonomous playback. At story progress 1.8, the actual video frame time was about 0.60 seconds; at the Touch chapter position 2.0 it was about 1.90 seconds; before the product transition completed it reached 2.96 seconds. Reverse scrolling returned to earlier frames. These values were read through temporary DOM diagnostics, removed from the delivered source.
- Pass: pausing at frame 0.598 seconds retained the same frame after scrolling from story progress 1.8 to 2.148. Resuming advanced to about 2.72 seconds. The original selected bottle image remains unchanged.
- Pass: Touch-to-Essence now zooms and defocuses the contact frame, then pulls the selected bottle from a closer view into its full silhouette. Desktop 1440 x 900 and mobile 390 x 844 intermediate views remained filled. At desktop y=2808, Essence opacity was about 0.508 with parent scale 1.118, over the opaque Touch scene. The active chapter now follows this custom transition's midpoint. Evidence: evidence/v6-desktop-transition.jpg and evidence/v6-mobile-transition.jpg.
- Pass: native scrolling changed the hash from Touch to Essence and back. Reload at y=2808 restored exactly y=2808 and the Essence hash, preserving the transition midpoint. Clicking Garden reached y=0; browser Back restored the earlier y=2808 position and Forward returned to Garden. Clicking Essence and immediately resizing from desktop to 390 x 844 reached the complete Essence chapter at y=2911.5. A final desktop reload retained Essence.
- Pass: mobile Touch shows finger contact clear of its heading. Mobile Essence retains full cap and base, unobstructed label and copy above the controls. At 390 x 844, copy bounds remain y=540.16–727.69. At 320 x 568, copy bounds remain y=340.80–489.38, before controls at y=504, with document width 320. Evidence: evidence/v6-mobile-touch.jpg, evidence/v6-mobile-essence.jpg and evidence/v6-compact-essence.jpg.
- Pass: About now describes concept, design and development scope without attributing stock footage to the creator or inventing a real client. The fictional-study statement and visual credits remain readable. The dialog pauses scene media and the product image animation; Escape closes it and restores opener focus. The expanded credits can be reached by scrolling within the 320 x 568 dialog. Evidence: evidence/v6-mobile-about.jpg.
- Pass: final reload showed no console errors or warnings. JavaScript syntax, all 15 unique local frontend references, and the revised frontend/README/credits text check passed. Earlier unchanged font licensing, remaining stock encodings and tablet layout checks are reused. Diagnostic attributes were removed before final packaging.
- Unverified: native OS reduced-motion settings, actual touch-device decoder performance, hidden-page behavior through a real tab change, independent Rendered Fonts identity and audience response. Responsive checks used browser viewport sizes rather than physical phones. Reduced-motion code retains a contact still with scene transitions removed. These limits do not imply measured preference or conversion results.

## Earlier website and image history

# NOCTE, selected perfume image integration

Active website version: v5, 2026-10-03. The user selected fragrance image v6 and requested using it for the existing website. The five-scene story remains Garden, Bloom, Touch, Essence and Echo.

## v5 criteria, before implementation

- Use the selected v6 bottle image in Essence. Preserve its actual geometry and lettering through CSS motion rather than synthesizing new bottle frames. Remove the old Blender bottle from active page media. Check the loaded source and rendered desktop and mobile screens.
- Keep every scene fullscreen and the existing native scroll transitions. Use a restrained scale range for the photograph so the cap and base remain visible at 1440 x 900, 390 x 844 and 320 x 568.
- On desktop, retain the bottle at right with text in the image's left negative space. On mobile, place the bottle above the heading, with no heading over the label and all copy above the footer controls. Blend the photographic background into the same fullscreen scene, without a framed card.
- Reuse Cormorant Garamond, Pretendard and Manrope and their existing license verification. Preserve the story copy. Verify its actual line breaks and clipping at the listed viewport sizes; independent Rendered Fonts identity remains unverified.
- The motion control must pause the new ambient image motion as well as video. Modal, hidden-page and reduced-motion handling must cover the still image. Verify pause/resume and modal interaction; retain native scroll navigation.
- Update media credits to describe the generated image and CSS motion accurately. Optimize a web copy without changing image composition; keep the selected PNG and prior versions.

Baseline: evidence/v5-before-essence.jpg, 1440 x 900, Essence chapter at rest. After evidence will use the same route and viewport, with the intentionally changed product asset.

## v5 verification

- Pass: the current page loads assets/nocte-essence-v6.webp and contains four stock videos plus one product image. The old Blender bottle is absent from active HTML. The 1672 x 941 PNG is preserved; the same composition was converted to a 97,128-byte WebP.
- Pass: desktop 1440 x 900 keeps all five scene containers exactly viewport-sized. Essence has complete cap and base, left-side text and an unobstructed label. Evidence: evidence/v5-desktop-essence.jpg. The photograph's ambient scale is 1 to 1.025 over 16 seconds per direction, with a restrained 1.02 to 1.055 scroll scale on its parent.
- Pass: mobile 390 x 844 places the bottle above the copy. Copy bounds are y=540.16 to 727.69, with footer controls starting at y=780. Compact 320 x 568 has copy bounds y=340.80 to 489.38, with controls starting at y=504. No horizontal or title-line overflow was observed. Evidence: evidence/v5-mobile-essence.jpg and evidence/v5-compact-essence.jpg.
- Pass: the additional 768 x 1024 tablet check exposed a title touching the bottle edge. A scoped font-size adjustment separates them; evidence/v5-tablet-essence.jpg records the corrected view.
- Pass: reverse native scrolling to y=2745 blends the full Touch scene with Essence at opacity 0.504658 and an image-parent scale of 1.03734. Forward scrolling returns to Essence. Evidence: evidence/v5-desktop-transition.jpg. Touch can remain on its final frame because its existing once-per-visit behavior is preserved.
- Pass: the motion control pauses all four videos and the image animation. Two separated observations retain the same paused image transform, matrix(1.0185, 0, 0, 1.0185, 0, 0). Resume advances the transform. The About dialog pauses media; Escape closes it, returns focus to the opener and resumes image motion.
- Pass: Garden and Bloom play when selected, the next button reaches Bloom, End reaches the playing Echo scene, and PageUp returns to Essence. The image animation pauses outside its visible chapter. Resizing and reloading retain the Essence chapter after manual hash-based restoration was added.
- Resolved during verification: the first reload reused cached unversioned v4 JavaScript and CSS, causing null-video errors. Versioned v5.1 source references now load, and the final fresh navigation produced no new console warnings or errors. The earlier cached-source errors remain in the browser's historical log.
- Pass: JavaScript syntax and 15 unique local references checked, and revised frontend/README/credits text contains no middle dot. Existing stock media and fonts are unchanged, so their earlier encoding and license checks are reused.
- Unverified: native OS reduced-motion settings, hidden-page behavior through an actual tab visibility change, and independent Rendered Fonts identity. Code paths cover reduced motion and page visibility, but these are not claimed as exercised UI tests. Audience preference and conversion outcomes are not inferred.

## Previous website revision

# NOCTE, web design skill revision

Active version: v4, 2026-10-03. Apply aurora-web-guide to the existing five-scene fullscreen portfolio. The video order, footage, story copy and licensed local font families remain established inputs. This revision changes visual hierarchy and navigation within the authorized local prototype.

## v4 criteria, set before implementation

- Preserve edge-to-edge footage across all five scenes, without panels or page edges. Reference principle: realistic imagery carries the story. Check desktop 1440 x 900, mobile 390 x 844 and compact mobile 320 x 568.
- Make the first chapter a centered, larger two-line title, while later chapters keep text away from the flower, hand contact and bottle. Remove secondary decorative captions that compete with the story. This is a design hypothesis, not a measured user preference.
- Keep Cormorant Garamond for the expressive English title, Pretendard for Korean support and Manrope for controls. Reuse verified local distributions and licenses. Inspect real line breaks and clipping; independent Rendered Fonts identity remains unverified.
- Display chapter names in the desktop navigation. Keep compact numbered navigation on mobile with at least 36 x 44 px chapter targets and 44 x 44 px media/next controls. No content/control overlap or horizontal overflow at the tested widths.
- Add line-by-line text motion during scroll transitions. Keep native scrolling, continuous fullscreen imagery, reversible navigation, pause/resume, modal and direct chapter links working. Reduced motion disables the extra line transforms.
- Use explicit nonnegative scene layers and the existing poster as a media background fallback. Initial live observation showed absent video pixels despite ready/playing media; reload restored them. This is a resilience change, not proof of the original cause.

Baseline: evidence/v4-before-garden.jpg, 1440 x 900, garden at scrollY=0. Before/after match route, viewport and scroll state; moving video frames are not pixel-identical. Earlier media decoding and font license checks are reused because the assets are unchanged.

## v4 verification

- Pass: desktop 1440 x 900, all five media containers remain exactly viewport-sized. Garden uses the larger centered title; Bloom and Essence retain readable two-line headings beside the subject. Evidence: v4-desktop-garden.jpg, v4-desktop-bloom.jpg and v4-desktop-essence.jpg.
- Pass: native forward scroll to y=1755 blends Bloom at opacity 1 with Touch at 0.597271. Outgoing line transforms were -107.575% and -105.365%; incoming lines were 75.2909% and 84.5966%. The distinct line timings follow actual scrolling. Evidence: v4-desktop-transition.jpg. Chapter navigation also returned from Echo to Garden.
- Pass: mobile 390 x 844, Garden copy ends at y=614.76 with controls starting at y=780. Navigation targets are 36 x 44 and media/next controls are 44 x 44. The Touch subject remains visible above its heading. Evidence: v4-mobile-garden.jpg and v4-mobile-touch.jpg.
- Pass: compact 320 x 568 has no horizontal overflow, no overflowing title line, and all five content bounds remain above the y=504 controls boundary, including retained transition offsets. Numbered chapter navigation and right controls have a 13.61 px gap. Garden and Echo visually checked. Evidence: v4-compact-garden.jpg and v4-compact-echo.jpg.
- Pass: pause stopped every video; resume worked. About dialog paused videos; Escape closed it, returned focus to its opener and resumed the active film. Final browser error/warning log was empty. JavaScript syntax, local asset references and revised text character checks passed.
- Poster-backed explicit layers were exercised across the viewport changes and playback remained visible in the final screenshot. The original intermittent missing pixels were not reproduced, so its root cause remains unconfirmed.
- Existing fonts, licenses and video encodings are unchanged; prior checks are reused. Browser Rendered Fonts identity and native OS reduced-motion behavior remain unverified. Reduced-motion code removes the new line transforms. This review does not claim measured audience preference, conversion results or a complete accessibility audit.

## Fragrance image revision v6, simplified bottle structure, 2026-10-03

The user requested another iteration after the v5 review. This version changes the bottle structure: a smaller cylindrical matte black cap, smooth side walls, thinner amber glass and a flat ivory paper label without a metallic border. The dark amber palette, fictional NOCTE name and EAU DE MÉMOIRE label text are retained. It was generated afresh without the earlier bottle images as input to avoid preserving their decorative geometry.

- assets/product-study/nocte-studio-hero-v6.png: 1672 x 941, opaque landscape image. One built-in image-generation call.

Visual review checked legibility of both label lines, the smaller cap, removal of side grooves and gold outlines, a fully visible bottle and base, contact shadow and left-side space for website text. The softer reflections and simple molded form appear more photographic than v5; this is a subjective review, not measured audience preference or evidence of a real manufactured product. No user acceptance is inferred. The website media and web ZIP remain unchanged, and no video was generated. Earlier candidates and the tool original are preserved. Full prompts were not automatically saved.

## Fragrance image revision v5, photographic lighting study, 2026-10-03

The user rejected the v4 image as too AI-like. A single revised landscape image retains the architectural amber bottle but reduces the orange inner glow and replaces the blurred garden with an olive plaster wall, neutral window light and a stone surface. The v4 master was the only input reference.

- assets/product-study/nocte-studio-hero-v5.png: 1672 x 940. One built-in image-generation call. The image has an opaque background and quiet space on the left.

Visual review: both label lines remain readable, the entire cap and base are present, the cast shadow grounds the bottle, and the color treatment is less golden. Residual stylization remains in the crisp cap and glass edge reflections; this is a candidate lighting study, not a claim that the image is indistinguishable from a real photograph. No user acceptance is inferred. Website media and the existing ZIP are unchanged. Earlier image candidates and the tool original are preserved. No full prompt was automatically saved.

## Fragrance image revision v4, luxury reference direction, 2026-10-03

The user explicitly rejected the v3 design as insufficiently luxurious and requested references from luxury fragrance houses. This overrides the earlier preference inferred by the assistant for a minimal transparent flask. Official product pages and actual product photographs were inspected in the browser:

- CELINE Parade: https://www.celine.com/en-us/haute-parfumerie/fragrances/parade-eau-de-parfum-100ml-6PC1H0805.37TT.html . Observed substantial glass, disciplined vertical structure, black lacquer cap and structured pale label. The official description identifies Art Deco fluting and a faceted lacquer cap.
- TOM FORD Oud Wood: https://www.tomfordbeauty.com/products/oud-wood-eau-de-parfum . Observed dark glass, architectural mass and a strong contrasting front label. Its distinctive chess-like stopper was not adopted.

The reference product images were inspected read-only, not downloaded or passed to the image-generation tool. Their marks and product names do not appear on the NOCTE images. The new original direction uses a bevel-cut rectangular amber flacon, three broad shallow side channels, a rectangular lacquer cap and an ivory plaque with NOCTE and the established fictional EAU DE MÉMOIRE name.

- assets/product-study/nocte-bottle-master-v4.png: 1122 x 1402. New studio reference, replaces the rejected v3 design as the latest proposal.
- assets/product-study/nocte-garden-hero-v4.png: 1672 x 941. Same new bottle in garden-facing light, on the right, with dark space at left for the existing website text. This was generated using only the new NOCTE studio image as reference.

Visual review checked geometry and material continuity between images, the two-line wordmark, complete cap/base, controlled highlights, contact shadow and clear left title space. Two built-in image-generation calls were used. The images depict a fictional product concept, not a manufactured perfume. Typography is generated lettering, not verified font typesetting. Existing website source, video media and the web v4 ZIP remain unchanged. No Flow video generation, external publication or prompt auto-save occurred. Earlier proposed image versions are preserved.

## Fragrance image revision v3, 2026-10-03

The user requested another remake after the v2 review identified a bulky cap, squat body and milky-looking fluid. This revision prioritizes a taller flattened flask, a restrained low olive metal cap and optically clear fluid. The studio reference was regenerated without the earlier images to avoid carrying over the squat silhouette and opaque center. The website composition then used only that new reference.

- assets/product-study/nocte-bottle-master-v3.png: 1122 x 1402. Clear flask with rounded upper corners, low olive cap, small silver neck and direct NOCTE lettering. The studio background tone remains visible through the front.
- assets/product-study/nocte-garden-hero-v3.png: 1672 x 941. Same bottle on limestone with dark garden space at left for HTML text. The foliage and changing background brightness remain visible through the glass and liquid. Cap proportion, clear fluid, spelling, grounded base, complete silhouette and clear left title space were visually inspected. These address the two specific v2 material/proportion failures. Audience preference and commercial performance are not inferred.

Two built-in image-tool calls were used. No external input assets or CLI/API fallback. Earlier versions remain preserved. Lettering is generated, not independently verified font typesetting. These are fictional product concept assets, not evidence of a manufactured perfume. The existing website videos are unchanged; no Flow generation or publication was performed. Prompts were not automatically saved.

## Fragrance image revision v2, 2026-10-03

The user requested a redo after critique of the generic tall bottle, strong reflections and weak product/background separation. The revised design uses a low wide rounded flask, shallow side hollows, a low oval olive cap and direct NOCTE lettering without a paper label. Three built-in image-tool calls produced the redesigned studio reference, a garden composition, and a targeted material/reflection refinement of the garden composition. Existing v1 images remain preserved.

- assets/product-study/nocte-bottle-master-v2.png: 1122 x 1402, geometry and brand reference. The final cap surface and quieter reflection treatment should follow the selected hero below.
- assets/product-study/nocte-garden-hero-v2.png: 1672 x 941, selected revised website image. Quiet dark garden at left, illuminated bottle at right, simple stone support. The selected final removes the earlier leather-like cap texture and reduces reflected loop shapes on the glass. NOCTE spelling, full silhouette, contact with the stone and title space were visually checked.

This is fictional generated product imagery. The label is generated lettering, not verified font typesetting. The website and its existing video sources are unchanged. No video generation, external publication or prompt auto-save was performed.

## New fragrance image study, 2026-10-03

The user approved production of the proposed translucent olive bottle direction after image planning. Two images were generated using the built-in OpenAI image tool, with no CLI/API fallback and no stock or user-private reference uploads. The second image used the first newly generated image as its product reference. No Flow video generation was executed. These are fictional product concept images, not photographs of a manufactured perfume.

- assets/product-study/nocte-bottle-master-v1.png: 1122 x 1402 studio product reference. Softly rectangular translucent olive glass, champagne liquid, matte olive cap, narrow brass collar and an ivory NOCTE label.
- assets/product-study/nocte-garden-hero-v1.png: 1672 x 941 website composition. Same bottle on pale limestone in garden light, with the product on the right and quiet space on the left for HTML typography.

Both outputs were visually inspected for silhouette consistency, NOCTE spelling, complete cap/base, plausible support and lighting, and usable title space. Label lettering is generated in the image, not independently verified font typesetting. Both images have photographic backgrounds, not transparency. Existing website media and the v4 delivery bundle are unchanged; these assets are available for the next approved website/media revision. Full prompts were not automatically saved.

## Previous revision

# NOCTE, fullscreen motion revision

Active version: v3, 2026-10-03. The user likes the five-scene direction and asks for full-size imagery that moves between scenes. The scene order, footage and copy stay in place. This supersedes v2's cream-panel Bloom, split-layout Echo and geometric reveals.

## v3 criteria, set before implementation

- All five scene media surfaces cover the full viewport at 1440 x 900 and 390 x 844, including Bloom and Echo. No inset image frame or blank editorial panel remains.
- Scrolling keeps one fullscreen stage in place. During each transition, outgoing imagery continues to cover the stage while incoming imagery dissolves over it, without a black gap, white panel or moving page edge.
- Subtle camera scale and pan follow scroll position smoothly in both directions. Text leaves before the next heading arrives. Maintain readable type and the flower-hand contact in both aspect ratios.
- Preserve native scrolling, five chapter links, pause/resume, reduced-motion fallback, modal behavior and responsive source selection.
- Reuse the unchanged media decoding and font checks. Compare the altered layouts at the same desktop/mobile viewports and exercise actual scrolling, including an intermediate blend.

v3 baseline: evidence/v3-before-bloom.jpg, desktop 1440 x 900, chapter Bloom. The image panel measured 547.20 x 621 px before this revision. Existing v2 evidence covers the other scenes. No external upload, generation or publication is part of this revision.

## v3 verification

- Desktop 1440 x 900: all five media surfaces measured 1440 x 900 before intentional overscan transforms. Bloom changed from a 547.20 x 621 inset to the full viewport. No horizontal overflow. Bloom and Echo were visually inspected as full backgrounds with overlaid typography.
- Forward native scroll, y=1711: Bloom remained opaque beneath Touch at opacity 0.506729. Both scene bounds were x=0, y=0, width=1440, height=900, with clip-path none. Camera transforms were active, and the transition had no page edge or blank area. Saved in evidence/v3-desktop-transition.jpg.
- Reverse native scroll, y=3764.5: Essence remained opaque beneath Echo at opacity 0.47258. Pause stopped every video during that blend and the control resumed playback.
- Mobile 390 x 844: all five media surfaces measured 390 x 844. No horizontal overflow. Bloom's copy ended at y=701.39 above the controls at y=774. Its horizontal crop was adjusted for the fullscreen composition. The header has a light darkening gradient for contrast on bright footage.
- Browser error/warning log was empty after fullscreen desktop and mobile navigation.
- JavaScript syntax and local asset references passed. Existing videos and fonts are unchanged, so their earlier successful technical checks are reused. Native OS reduced-motion preference was not changed; its code path disables interpolation, transforms, blur and autoplay.
- This is a web motion revision using the same source footage. Fullscreen dissolves, camera scale and pan are CSS transforms driven by scroll, not newly generated camera movement inside the video.

## Previous implementation history

# NOCTE, five-scene story portfolio

Active version: v2, 2026-10-03. The user corrected the first version because its repeated dark bottle imagery missed the reference, then requested a story told by scrolling through 4–5 scenes. The active direction is five moments: garden → bloom → touch → essence → echo. Local implementation, copy and reversible editing reuse the existing authorization. No external publication or credit-bearing generation has taken place.

## Reference and narrative

Reference: VIDENCE recording at https://www.threads.com/@jjossuny_/post/DeAxlXFDEBV . The relevant principles are realistic botanical material, human contact, different palettes and compositions, sparse serif headlines and a shared symbol carried through the story. The reference footage itself is not reused.

1. Garden: wind and light among leaves establish where the imagined scent begins.
2. Bloom: a white flower fills a portrait window on a cream field, moving attention from place to detail.
3. Touch: an ivory-sleeved hand touches the flowers. This and Bloom use the same photographer's connected shoot. The title sits away from the contact point.
4. Essence: the previously created fictional bottle appears once as a symbolic container for the garden memory. This is not a claim about actual manufacturing or ingredients.
5. Echo: a curtain moves at an empty dusk window, ending with lingering atmosphere and a return to the garden.

The meaning is a symbolic brand story rather than evidence of a real product or actual production process. NOCTE remains a fictional portfolio concept.

## Implementation and media

The stage stays fullscreen while native scrolling drives the five scenes. Each chapter holds long enough to read; the next chapter appears through a horizontal opening, flower-centered iris, upward reveal or curtain-like wipe. The narrative is reversible when scrolling upward. Native scrolling is not locked and wheel events are not hijacked. Five direct chapter links, Home/End, PageUp/PageDown, video pause/resume, a working About dialog and final return link remain available.

The rail is 560svh. HTML retains selectable headings and Korean support. Inactive scenes are inert and aria-hidden; the active chapter has aria-current. Reduced motion replaces wipes with scene changes and starts videos paused. Ambient scenes repeat; the Touch clip plays once and stops instead of reversing the hand. Only currently visible videos play, and all stop behind the dialog or when the document is hidden.

Four public Pexels clips were downloaded and cut to 6, 6, 9 and 6 seconds. Existing 4-second bottle clips are reused. All web clips are local H.264 with no audio. Full source files stay in sources/ and are excluded from the delivery ZIP. Attribution and use details are in media-credits.md and the page's Film credits disclosure. The preview contains no Flow-generated material. flow-prompts.md now has the corresponding five-scene production prompts and unexecuted reference plan.

## Verification, v2

- New Garden, Bloom, Touch and Echo files fully decoded with ffmpeg, without errors. Existing bottle media passed the previous version's complete decode and is unchanged.
- Node syntax check passed. New copy and revised files contain no middle dot character.
- Desktop 1440 x 900: five scenes, document height 5040, width 1440, no horizontal overflow. Visual review includes each scene, with extra correction of the Touch headline away from the contact point and Echo's dark-panel logo contrast.
- Native reverse scroll from the ending produced a partially revealed Echo over Essence, verifying the scroll-driven clip path rather than only chapter link navigation.
- Pause stopped every video. Resume and About dialog open/close worked; Escape returned focus to the opener and resumed the current video. Direct scene hashes survive reload. PageDown from Touch was observed reaching Essence at y=3105 on the desktop viewport.
- Mobile 390 x 844: document width 390, height 4726; all five compositions visually checked. The Touch crop was corrected to 20% horizontal positioning, keeping the flower contact visible above the heading. Its copy bottom was 714.73 px, above the controls at 774 px. The dedicated hero-mobile.mp4 was confirmed loaded and playing. No horizontal overflow was observed. Browser error/warning log was empty. The final curtain overlay was strengthened for headline contrast.
- Complete technical decoding and sampled visual playback are distinct. No full normal-speed, frame-by-frame visual review is claimed. Native OS reduced-motion preference is not modified or asserted as exercised.

## Superseded v1 history

The following record describes the earlier three-scene study. Its concept is superseded by the five-scene direction above. Its unchanged original bottle media and font verification remain reusable.

# NOCTE, fullpage portfolio concept

2026-10-03. User request: plan and quickly build a short portfolio website with fullscreen video and motion. Local design, copy, 3D video rendering and implementation are authorized. No external publication or credit-bearing generation is authorized.

## Direction and baseline

Fictional fragrance house NOCTE. A scent as the light that remains after dusk. Three fullscreen chapters: arrival, the trace, the memory. Sparse English display type and short Korean supporting lines. No fabricated sales, testimonials, real client attribution or operating shop. Portfolio concept disclosure appears in the final chapter.

Reference: VIDENCE website recording in https://www.threads.com/@jjossuny_/post/DeAxlXFDEBV . Adopt a single recurring object, large cinematic media, short typography and chapter transitions. Original concept, geometry and copy are created for this study; no reference assets are copied.

Desktop baseline: 1440 x 900. Mobile baseline: 390 x 844. Three viewport-height scenes only. Native scrolling, chapter navigation, keyboard navigation and visible video pause control. Text stays selectable HTML. All media remains local. No essential copy overlaps fixed navigation or the scent bottle. No horizontal overflow. Reduced motion disables entrance animation and autoplay. Video has a poster and contains no audio.

Primary media: Blender 5.2.1 local 3D rendering, hero and detail shots, 1280 x 720, plus a dedicated mobile hero shot, 540 x 960. All three clips are 24 fps, 4-second H.264 loops with no audio. No paid generation attempts. Flow prompts supplied for a later optional cinematic footage pass. Flow generation has not been submitted.

Typography: Cormorant Garamond for English display, Manrope for controls, Pretendard for Korean support. Original official OFL distributions, locally hosted with license files. Display fallback Georgia; controls fallback system-ui; Korean fallback Apple SD Gothic Neo.

## Current state

Local first version completed. User review pending. No publication or permanent external storage performed.

## Verification

- All three video files fully decoded without ffmpeg errors. Desktop hero 351,324 bytes, detail 312,498 bytes, mobile hero 254,295 bytes. Metadata confirmed dimensions, H.264, 24 fps and 4 seconds.
- Browser at 1440 x 900: page height 2700, three scenes, no horizontal overflow. Active scene switches video playback; previous clips pause.
- Browser at 390 x 844: page height 2532, no horizontal overflow. `hero-mobile.mp4` actually selected and playing. All three mobile scenes visually inspected. Mobile detail crop adjusted to keep oversized bottle lettering out of the title area.
- Chapter links, story opening, Escape closing and focus return were performed. Pause control paused all videos and changed its label. Resume and keyboard scene navigation are checked in the same preview.
- A play-promise race discovered on hash reload was repaired: an inactive or interrupted clip cannot switch the whole site to paused. Hash reload at the second scene confirmed MOTION ON and detail playback.
- The initial local bottle-lettering parent transform was corrected before the supplied clips were encoded. Existing failed render frames were replaced only within this new task's own render directory.
- Font files load from the local source and visual typography was inspected. Independent browser Rendered Fonts identity was not available. Native reduced-motion preference was not changed or exercised; the CSS and media-query branch are present.
- Continuous motion was observed through browser playback state and sampled screenshots; full normal-speed frame-by-frame visual review is not claimed. The complete clips have passed technical decoding.
- QA evidence is in `evidence/`. The working source and local media remain here because code bundles belong in the non-final task directory.
