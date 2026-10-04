# NOCTE v12, portfolio migration verification

2026-10-04. Current editable source is `/Users/bananabk/Documents/Projects/aurora-website-portfolio/15-nocte/`. The portfolio hub has 18 studies: 15 fictional sites and 3 client concepts. NOCTE is the seventh brand entry. Native clicks from the hub open `http://127.0.0.1:8770/15-nocte/?v=12#garden` on desktop and mobile.

The three frontend files and 17 selected asset files are byte-identical to the accepted `NOCTE-portfolio-v12.zip`. This migration changes the hub and documentation, without changing NOCTE's design, copy, motion, media or music. Source syntax and local HTML/CSS references pass; all 18 hub entries resolve locally. Git whitespace validation passes for the authored files. The three upstream font license files retain their original trailing whitespace to preserve exact asset bytes.

Fresh browser verification:

- 1280 x 720: the hub's NOCTE row, Garden and Essence were inspected from saved screenshots. Garden's movie has readyState 4, plays from the new nested asset URL and reports no media error. The perfume WebP loads from `/15-nocte/assets/nocte-essence-v6.webp` at its native width of 1672 pixels. The inspected hub and scenes have no horizontal document overflow.
- 390 x 844: the hub's NOCTE row fits within x=24 to x=366 and has a 108.594 px-high link area. Native entry opens Garden, with its movie playing from the nested path. Garden and Essence were inspected from saved screenshots, with no horizontal overflow. Bloom playback was also observed at readyState 4 from its nested asset URL, without a media error. The accepted bottle and copy remain visible. Music remains off by default and About is closed.
- Current desktop and mobile warning/error logs are empty. Temporary viewport overrides are reset after inspection.

Evidence: `/Users/bananabk/Desktop/codex-output/99_최종아님_삭제대기/website-portfolio-nocte-20261004/`, screenshots 01 through 06. Earlier v12 interaction and responsive checks below are reused because all runtime files and assets are unchanged. This migration does not add physical-device, accessibility, full-track listening or public-deployment verification.

On 2026-10-04, the user requested removing the obsolete production backup. The three current frontend files and 17 selected asset files were verified against the final v12 ZIP before deletion and remained unchanged afterwards. The old 4318 preview server was stopped. Historical `sources/`, `evidence/` paths and 4318 preview URLs below describe that removed working folder; they do not promise that all earlier raw files or screenshots remain locally available. Written QA history, the final ZIP and comparison report are retained. Current provenance and licenses are in `SOURCES.md` and `assets/`.

---

# NOCTE v12, landscape layout and accurate motion controls

Resolved the v11 final audit's P1 layout and pointer collision and P2 media-control wording. At landscape heights up to 600 px, content has a reserved vertical area between the header and navigation. Type and spacing respond to viewport height; a smaller treatment supports 320 px-high landscape screens. Footer navigation no longer crosses scene buttons. Landscape Essence restores the full-height image layer; the selected bottle remains visible with separate copy. The original desktop and portrait CSS remains intact; no accepted media file, scene copy, title motion, scroll timing or audio behavior was changed.

Desktop motion labels now read 움직임 정지 and 움직임 재생. The existing compact 정지 and 재생 labels, accessible background-movement labels and separate music control remain. Current preview: http://127.0.0.1:4318/?v=12#garden . CSS and JavaScript cache keys are 12. Source frontend and documentation are preserved in sources/v11-baseline/.

Fresh browser verification:

- 844 x 390: all five scenes were inspected from saved screenshots. Echo replay's pointer center hits #garden and actually returns to Garden. Garden's pointer center hits #bloom and enters Bloom. Echo CTA ends at y=299.539, its fiction note ends at y=319.539, and the footer begins at y=334. Garden CTA ends at y=316.648. Bloom and Touch support end at y=296.445; Essence signature ends at y=317.445. Content no longer crosses footer controls.
- 568 x 320: all five scenes were inspected. Echo CTA ends at y=237.742 and its fiction note at y=254.539 before the footer at y=264. Its pointer center replay also returns to Garden. Garden CTA ends at y=247.961. Bloom, Touch and Essence support end at y=229.406. All measured scenes have no horizontal document overflow.
- 667 x 375: Echo note ends at y=304.539 before the footer at y=319; replay's pointer center resolves to #garden. No horizontal overflow.
- 390 x 844: Garden, Essence and Echo were inspected. Echo replay's pointer center returns to Garden. Essence support ends at y=735.891 before the footer at y=756. The landscape override is inactive.
- 320 x 568: Essence and Echo were inspected. Essence support ends at y=468.875 and Echo fiction note at y=456.057, before the footer at y=480. No horizontal overflow.
- 768 x 1024: Essence was inspected. Navigation ends at x=559 before motion/next controls start at x=603.75. The selected bottle remains visible with separate copy. The landscape override is inactive.
- 1280 x 720: Essence and Garden were inspected, with Home returning to Garden. Existing layouts remain; the landscape override is inactive. Motion stop sets the new replay label, pauses every ambient movie and pauses photo animation. Resume restores the stop label. Current-run warning/error logs are empty. Final viewport is reset, Garden is at scrollY=0, the dialog is closed and music is off.

Evidence is in evidence/v12/. The final Echo screenshot is 02-echo-landscape-final.jpg; 01-echo-landscape.jpg is an intermediate spacing iteration and is excluded from the delivery package. Measurements include intermediate entries; the comparison report uses settled final entries. The v11 final audit's unchanged keyboard, popup, music and scroll-motion checks are reused rather than represented as fresh v12 checks. All 17 packaged asset files are byte-identical to v11. Source syntax, local references, source diff and the final ZIP contents are checked.

Physical iOS/Android devices, native reduced-motion preferences, screen readers, 200 percent zoom, rendered-font identity, font glyph coverage, contrast across every moving frame, full-track listening and audible loop boundaries remain unverified. No upload or publication is included.

---

# NOCTE v11, a brief touch that lingers

final result: passed for the scoped copy and layout revision

2026-10-04. The requested revision follows the copywriting and content review. Bloom now describes a gaze resting on an easily missed petal. Touch distinguishes the brief contact from the sensation that remains. About states this fictional concept and explains two actual design decisions: scroll-linked hand movement and the bottle appearing before its words. The meta description follows the same story. Garden, Essence, Echo, all English titles, CTAs and credits are retained. No real product properties or audience results are claimed.

Source frontend is preserved in sources/v10-baseline/. Current preview: http://127.0.0.1:4318/?v=11#garden . CSS and JavaScript remain byte-identical to v10, using cache keys 10.1. All 17 packaged assets are unchanged. The paired Bloom, Touch and About screenshots in evidence/v11/ were viewed together at 1280 x 720. Bloom film frames differ; text, layout and the current About content were inspected directly.

Changed support copy stays on two lines. At 390 x 844, Bloom content ends at y=715.228 and Touch at y=714.006, before the footer at y=756. At 320 x 568, Bloom ends at y=469.765 and Touch at y=470.374, before the footer at y=480. Neither inspected width has horizontal overflow. About fits at 390 x 844. At 320 x 568 its body scrolls from 0 to 329.5 while the close button stays at y=32. Closing returns focus to About. Native chapter navigation and the updated DOM content were verified. Earlier motion, media, audio and accessibility checks are reused because their code, styles and assets did not change.

Local references, revised source diff and delivery ZIP integrity are checked. Physical phones and actual audience response remain unverified. Existing listening, native reduced-motion and assistive-technology limits remain as recorded below. No external publication is included.

Historical QA follows.

# NOCTE v10, chapter typography motion

final result: passed

2026-10-04. Scope: the requested variety and elegance of text entrances in the existing local five-scene portfolio. The selected photograph, story copy, fonts, layout and film grade remain the visual source. This verdict covers the inspected local states and interactions, not a device or accessibility certification.

## Source and visual comparison

Source frontend preserved in sources/v9-baseline/. Implementation: http://127.0.0.1:4318/?v=10 with style.css?v=10.1 and app.js?v=10.1. The matched source and implementation images were opened together in one comparison input: evidence/v10/before-essence-entry.jpg and after-essence-entry.jpg, both 1440 x 900 at scrollY 2988. The product image may have a different ambient scale. Deliberately different line poses and opacity are the approved change. Static frames show appearance; native browser interaction verifies timing.

## Choreography

Garden rises from below. Bloom glides sideways, with a slightly longer travel on the italic line. Touch settles through a small scale and rise. Essence reveals two baselines after the bottle is fully visible. Echo opens with a slower, smaller scale change. Each title has a delayed second line; chapter labels lead, while support and CTA details follow. No synthetic text blur or character-by-character fragmentation is added.

Scroll determines each pose, including reverse movement. Direct chapter URLs receive a finite entrance after local fonts are ready. The initial text stays hidden until that entrance starts, preventing a late font load from flashing completed text before the animation. User interaction cancels that timed entrance, leaving scroll in control. Returning to Garden uses the reversed scroll poses, avoiding a second entrance after already visible text. Reduced-motion branches retain complete text and skip timed entrances; native OS reduced motion was not exercised.

## Five fidelity surfaces

- Typography: retained local type families, title sizes, italic styling and wrapping. Masks are intentionally visible during baseline entry; completed lines return to full opacity and neutral transforms. Rest states and native-width mobile captures were inspected. Independent rendered-font identity was not inspected.
- Layout: unchanged fullscreen stage and 560svh journey. At 390 x 844 Essence copy ends at 735.891 before the footer at 756. At 320 x 568 it ends at 468.875 before the footer at 480. No horizontal overflow in these inspected states.
- Color: retained v9 film grading, text colors and champagne accents.
- Imagery: all 17 packaged asset files are byte-identical to v9, including the accepted perfume, movies, audio, fonts and licenses. No image, film or font approximation replaces them.
- Content: story markup is unchanged apart from cache revisions. No new product, client, rights or outcome claim.

## Interaction evidence and limits

Desktop scroll entry states: Bloom at y=810, Touch at y=1966.5, Essence at y=2988 and Echo at y=4047. First and second lines show different opacity and travel. Essence reverse y=2808 has a complete bottle and zero text opacity; forward y=2988 returns the same title poses. Essence rest y=3105 and Echo rest y=4140 have full, neutral text. Touch seeking changes from 1.191093 seconds at y=1966.5 to 0.038364 at y=1804.5. Garden/Bloom/Echo movie playback was observed without media errors; Echo pause and resume behavior and chapter controls were checked. Initial direct entrance was observed from zero text opacity to completed lines.

The earlier video complaint was checked rather than assumed fixed: the user's v9 Echo video was already running, and the current native film playback works. Essence is the accepted photograph with CSS motion, as already disclosed in About. No video file is added to that scene.

JavaScript syntax, local references, unchanged assets and package integrity are verified. Unchanged v9 music, modal, skip-link, history, tablet geometry, media decoding and license checks are reused. Physical phones, native OS reduced motion, assistive technology, 200 percent zoom, throttled networks, independent rendered-font identity, full-track listening and audible loop boundary remain unverified. No upload or publication is included.

Historical QA follows.

# NOCTE v9, visual and motion QA

final result: passed

2026-10-04. Scope: the approved v8 refinement, including film color cohesion, varied cut timing and a distinct Touch-to-Essence reveal. Existing copy, fonts, fullpage structure and selected perfume are the source visual truth. The deliberate changes below are approved differences, not fidelity regressions. This result applies to the inspected local viewports and interactions.

## Source and implementation

Source frontend: sources/v8-baseline/index.html, style.css and app.js, preserved before edits. Source captures: evidence/v9/before-garden.png, before-bloom.png, before-essence.png and before-bottle-before-copy.png. Implementation: http://127.0.0.1:4318/?v=9 with style.css?v=9.1 and app.js?v=9.

| Comparison | Source / implementation captures | CSS viewport and pixels | State |
| --- | --- | --- | --- |
| Garden | before-garden.png / after-garden.png | 1440 x 900, both 1440 x 900 pixels | Garden at rest, movie frames differ |
| Bloom | before-bloom.png / after-bloom.png | 1440 x 900, both 1440 x 900 pixels | Bloom at rest, movie frames differ |
| Product rest | before-essence.png / after-essence.png | 1440 x 900, both 1440 x 900 pixels | Essence at rest, ambient image scale may differ |
| Product staging | before-bottle-before-copy.png / bottle-before-copy.png | 1440 x 900, both 1440 x 900 pixels | Exact scrollY 2808, intentionally delayed words in v9 |
| Echo iteration | echo-compact-initial.png / echo-compact-final.png | 320 x 568, both 320 x 568 pixels | Initial / final v9, movie frames differ |

An early Garden source capture taken during viewport reflow was rejected and replaced with a fresh 1440 x 900 capture after fonts loaded. Captured density is 1 pixel per CSS pixel. Each pair was opened together in the same comparison input. evidence/v9/comparison.html also renders the desktop pairs at the same scale. Product label and all small UI remain readable in the native source captures; the 390 px and 320 px phone captures were reviewed at native width, so additional focused crops were unnecessary. Static captures document appearance, while actual browser scroll checks verify timing.

## Five fidelity surfaces

- Fonts and typography: retained all local Cormorant, Manrope and Pretendard files and the established title sizes, hierarchy, wrapping and UI labels. No text is replaced with image approximations. The new motion keeps lines intact rather than sliding every title out of a mask. Independent Rendered Fonts identity remains unverified.
- Spacing and layout rhythm: page length stays 560svh with the same five full-viewport scenes. Desktop bottle and copy remain separate. At 390 x 844 product copy ends at y=735.891 before the footer at y=756. At 320 x 568 product copy ends at y=468.875 before the footer at y=480; Echo ends at y=456.057. No horizontal overflow. Tablet chapter navigation ends at x=559 before control hit bounds start at x=603.75.
- Colors and tokens: video sources now use a common neutral olive shadow with a warm highlight correction. The accepted product stays unfiltered. The final darker Echo grade improves separation from backlit foliage. This is visual assessment, not frame-by-frame numerical contrast analysis.
- Image quality and asset fidelity: the accepted PNG and WebP, movie bytes and local font files are retained. Bottle geometry, cap, label and original photographic composition stay intact. Reveal opacity is 1, clipping is spatial, and synthetic blur is removed. No video/photo asset is replaced by CSS drawings, SVG approximations or placeholders.
- Copy and content: all five story headings, Korean support, CTA text, scope disclosure, visual provenance and music credit are unchanged. No added claim about a real product, client or result.

## Findings and comparison history

- Resolved v8 refinement: repeated transition/title movements made scene rhythm too uniform. Boundary-specific intervals, smaller camera travel and quiet text fades replace the repeated masked line rolls. Seen in all desktop rest states and actual native chapter movement.
- Resolved v8 refinement: different green/brown video treatments weakened visual continuity. Shared shadow color and clip-specific saturation, warmth and light levels are an intentional correction. Garden/Bloom pairs were viewed together; moving footage is not a controlled identical-frame color test.
- Resolved v8 refinement: title entered while the bottle was still the reveal's main event. At y=2322, the contact frame is held with copy opacity 0 and product opacity 0. At y=2592, product opacity is 1 with a 53.2588 percent clip. At y=2808, bottle is fully revealed with copy opacity 0. At y=2988, copy opacity is 0.656587. Essence rest is fully legible. Reverse y=2592 retains the same crisp spatial reveal. Reload at y=2988 retains the position and copy state.
- QA-discovered P2 polish: initial compact Echo backlight weakened text separation. Deeper grade and mobile shade fixed the scoped issue. Evidence: echo-compact-initial.png and echo-compact-final.png, reviewed together. Movie frames differ, so no numerical contrast delta is claimed.

No actionable P0/P1/P2 finding remains in this scoped comparison. The identity refinement is shared lighting, warm accents and the contact/bottle/words cadence. It does not claim proprietary source footage or a new brand mark.

## Current functional checks and limits

Native chapter navigation, both scene CTA destinations, forward/reverse reveal, Touch seeking, video pause/resume, music on/off, About open/close and focus return, responsive header and exact reload restoration passed. Browser logs are empty. Node syntax, local references, preserved media/font bytes and ZIP integrity are checked during packaging. Reuse earlier unchanged skip-link, Back/Forward and media-decode checks.

Not exercised: physical iOS/Android devices, native OS reduced motion, assistive technologies, 200 percent zoom, throttled networks, independent rendered font identity, full-track listening and audible loop boundary. The earlier v8 audio review remains pending. No publication or upload is included.

Historical QA below is preserved for the earlier versions.

# v8 scoped follow-up

Music control layout and technical playback: passed. Listening review: pending, audio input is unsupported in this environment. See the current production-notes.md entry for exercised checks and limits. Existing v7 visual review below is preserved as the earlier scope.

# NOCTE v7, design QA

final result: passed

2026-10-03. Scope: all six findings in the v6 Product Design audit, including the two interaction defects, mobile readability, product transition, visual consistency and narrative closure. The verdict applies to the tested local prototype and the scoped comparison below. It is not an accessibility certification or evidence of audience preference.

## Reference and approved differences

Reference: the established v6 site and the audit screenshots in `../../nocte-product-design-audit-20261003/`. Source images preserve the user-selected bottle, fullscreen story and type families. The user then asked to fix all findings. Therefore the repaired transition, clearer controls, fixed modal header and revised closing garden are intentional differences from the source, not fidelity regressions.

Implementation: index.html, style.css and app.js, served at http://127.0.0.1:4318/?v=7 . Evidence: evidence/v7/. Source screenshots and new implementation screenshots were rendered together in evidence/v7/comparison.html and visually inspected in the same input. No separate mental comparison was used as the final gate.

| State | Reference capture | Implementation capture | Source viewport and condition |
| --- | --- | --- | --- |
| Product transition | 04a-touch-essence-transition.png | 04-transition-matched.png | 1440 x 900, scrollY 2808 |
| Garden | 01-garden-desktop.png | 01-garden-desktop.png | 1440 x 900, Garden at rest; video frames differ |
| Mobile Essence | 07-essence-mobile.png | 07-essence-mobile.png | 390 x 844, Essence at rest |
| About | 09-about-compact-scrolled.png | 09-about-compact-scrolled.png | 320 x 568, expanded credits scrolled to the bottom |
| Echo | 05-echo-desktop.png | 05-echo-desktop.png | 1440 x 900, Echo at rest; approved asset change |

The comparison board uses equal scaling for each source/implementation pair. A separate footer comparison displays the original 390 px-wide captures at 1:1 and shows the bottom 180 px through CSS cropping. Evidence files qa-transition-pair.png, qa-garden-pair.png, qa-mobile-pair.png, qa-modal-pair.png and qa-echo-pair.png capture the combined comparisons. The last includes the 1:1 footer pair. Review screenshots are not substituted for the actual interaction checks.

## Five fidelity surfaces

| Surface | Final assessment |
| --- | --- |
| Layout and spacing | Pass. Fullscreen stage and established desktop composition retained. Mobile bottle, title and controls are separate. The compact Essence copy ends at y=468.875 before the footer at y=480. Compact Echo ends at y=452.777. Fixed dialog header keeps the close control visible. Final tablet navigation/control hit areas are separated. |
| Typography and copy | Pass. Original Cormorant, Manrope and Pretendard files retained. Larger navigation and supporting copy read clearly at the tested widths without clipping. The story now connects petal, touch, bottle and garden. The final fictional-study note is readable within the scene content. Independent browser Rendered Fonts identity remains unverified. |
| Color and visual hierarchy | Pass. Darker header treatment improves the light logo's separation from moving foliage. The first eyebrow now follows later scenes. Natural footage and closing garden use a restrained olive treatment. This is visual assessment, not a measured contrast certification across every video frame. |
| Assets and composition | Pass. Selected v6 PNG and WebP are byte-identical to the prior delivery. Bottle proportions and label remain unobstructed. The new opaque reveal avoids the earlier hand/bottle double exposure. Echo intentionally reuses the opening garden. Three stock source files and existing licenses are reused; no new media was generated. |
| Motion and behavior | Pass. Forward and reverse scrolling produce a sharp spatial reveal. Skip focus, modal close, pause/resume, active scene names and reload restoration were exercised. Native scrolling and the five-scene structure remain intact. Untested environments are listed below. |

## Findings and comparison history

1. Product double exposure: resolved. At 1440 x 900 and y=2808, product opacity is 1, clip inset is 0 and blur is absent; copy opacity is about 0.903. At y=2556, reverse scrolling leaves a roughly 50% opaque reveal with hand and bottle on separate sides. Mobile y=2397 similarly shows about 50% clipping. Evidence: 04-transition-matched.png, 04b-wipe-midpoint.png and 13-wipe-mobile.png.
2. Hidden modal close: resolved. At 320 x 568 and body scrollTop 305, close bounds are x=230–284 and y=32–76. Click closes the dialog and restores the opener focus. Evidence: 09-about-compact-scrolled.png.
3. Skip link: resolved. Enter on the skip link focuses H1#garden-title; the next Tab focuses the Garden scene CTA. Evidence: 10-skip-heading-focus.png.
4. Mobile readability: resolved. Chapter numbers increase from 9 to 13 px; About is 12 px; support is 14 px, or 13 px on compact layouts. A persistent scene name is visible. Existing adequate tap areas are retained. At 390 x 844 Essence content ends at y=735.891 and the footer begins at y=756. Evidence: 06-garden-mobile.png, 07-essence-mobile.png and 11-essence-compact.png.
5. Narrative and closing composition: resolved. Bloom becomes Petal by petal; Essence contains the garden left on the fingertips; Echo becomes The garden stays and returns to the same garden. The watermark is removed and the fictional-study note sits below the return link. Evidence: 02-bloom-desktop.png, 05-echo-desktop.png and 12-echo-compact.png.
6. Header contrast and orange badge: resolved through the stronger top gradient and consistent chapter styling. Evidence: 01-garden-desktop.png, 06-garden-mobile.png and qa-garden-pair.png.
7. QA-discovered tablet overlap: initial review at 768 x 1024 found navigation ending at x=600 and controls beginning at x=595.75. Scoped tablet widths and gaps fixed it: navigation now ends at x=559, controls begin at x=603.75. Evidence: 14-essence-tablet.png is the rejected state; 15-essence-tablet-final.png is the verified final state.

The final compact screenshots 11 and 12 precede the control-label shortening from two lines to single-word mobile labels; layout and content values remain valid. Final short labels are shown in 06, 07 and 13. An early incomplete compositor capture of Garden was rejected and replaced before comparison.

## Functional and technical checks

- Desktop 1440 x 900: all five scenes visually inspected, including matched transition and reverse-scroll midpoint. Final product rest state: 16-essence-desktop-final.png.
- Responsive viewports: 390 x 844, 320 x 568 and 768 x 1024. No horizontal overflow or copy/control overlap observed in the inspected states.
- Mobile pause changes the visible label to 재생 and the product animation state to paused; resume works.
- About remains usable at the bottom of its scroll area; closing returns focus. Skip focuses the current heading rather than the header logo.
- Reload at y=2808 retains exactly y=2808 and #essence. Existing unchanged Back/Forward and Touch-video seeking checks from v6 are reused.
- Final browser warning/error log is empty. Node syntax check passes. All 13 unique local frontend references exist. Revised frontend, README and credits contain no middle dot character.
- Existing stock-media decoding, font licensing and accepted-image verification are reused. No new runtime dependency was added.

No actionable P0, P1 or P2 issue remains from this scoped review. Physical iOS/Android playback, native OS reduced-motion preferences, screen readers, 200% zoom, network throttling, independent rendered font identity and audience response were not exercised. These remain verification limits, not claimed passes.
