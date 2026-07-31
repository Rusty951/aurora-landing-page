# Design QA — Landing V2

- source visual truth path: `/Users/bananabk/Desktop/aurora-landing-v2/selected-direction.png`
- implementation desktop screenshot path: `/Users/bananabk/Desktop/aurora-landing-v2/qa/implementation-desktop-page.png`
- implementation mobile screenshot path: `/Users/bananabk/Desktop/aurora-landing-v2/qa/implementation-mobile.png`
- full-view comparison path: `/Users/bananabk/Desktop/aurora-landing-v2/qa/reference-vs-implementation.png`
- route and state: desktop `/` at page top; mobile `/interview` at page top; dark theme; FAQ interaction checked separately
- desktop CSS viewport: `1440 x 1024`
- mobile CSS viewports: `390 x 844`, `320 x 568`
- source pixels: `862 x 1824`
- desktop implementation pixels: `2520 x 3060` after browser-content crop
- mobile implementation pixels: `1000 x 2200` including the phone frame used by the local preview route
- density normalization: source and desktop implementation were both scaled to `1800px` height and placed in one `2332 x 1800` comparison image. The source is a long concept board rather than a fixed browser viewport, so layout intent and hierarchy were compared instead of claiming one-to-one pixel parity.

## Full-view comparison evidence

`reference-vs-implementation.png` shows the source and rendered implementation together. The implementation preserves the source direction: charcoal background, purple wave image, large white-and-purple display type, thin dividers, restrained surfaces, and solid purple consultation CTA. The real page intentionally gives the 1440px hero more scale than the compact concept board while preserving its three-line hierarchy and above-the-fold action.

The section order differs only where the product brief was refined after the visual concept: the implementation places concrete problem scenes before service scope. This is intentional content architecture, not visual drift.

## Focused region evidence

`implementation-mobile.png` was inspected as a focused hero comparison because mobile wrapping and CTA visibility are the highest-risk details. At `390 x 844`, the wordmark, header CTA, five-line headline, value sentence, primary CTA, and preparation note are visible without horizontal overflow. At `320 x 568`, measured DOM bounds place the hero CTA at `416–466px` and the note at `476–514px`, both inside the viewport.

Additional close-up crops were not needed because the page uses a single type family, one real generated background asset, and library icons; the readable hero and mobile captures expose the important typography, color, crop, button, and divider details.

## Required fidelity surfaces

- fonts and typography: Pretendard Variable is applied consistently. Display weight, tight tracking, large scale, and white/purple hierarchy match the source. No clipping or truncation was found at 1440, 390, or 320px.
- spacing and layout rhythm: hero, thin divider grids, two-column sections, and mobile single-column collapse preserve the source's editorial rhythm. No horizontal overflow was measured.
- colors and visual tokens: charcoal, muted gray, violet, and the small yellow Kakao accent remain consistent. White text and CTA contrast are visually clear.
- image quality and asset fidelity: the generated wave is used as a real image, not CSS art. AVIF is served first with PNG fallback. The source crop remains sharp and does not obscure the headline.
- copy and content: the page now sells priority-setting plus production and operation, not a diagnosis-only product. Company name and unverified performance numbers are not exposed.
- icons: Phosphor filled icons share one family and align with their labels. No inline or handcrafted SVG substitutes are used.
- states and interactions: sticky-header state, native FAQ open/focus state, root and advertising modes, all CTA destinations, and hidden ad-mode footer channels were checked.
- accessibility: one H1 and one main landmark, skip link, visible focus treatment, native details/summary, 44px or larger primary controls, reduced-motion rule, and restored list semantics are present.

## Comparison history

### Pass 1 — blocked

- earlier finding: declared Open Graph image was missing.
  - fix made: added a real `1200 x 630` PNG captured from the rendered hero.
  - post-fix evidence: `assets/aurora-og.png`; static contract check validates its format and dimensions.
- earlier finding: the hero PNG was `1.65MB` on mobile.
  - fix made: added a `40KB` AVIF and CSS `image-set()` with PNG fallback.
  - post-fix evidence: browser computed style resolves the AVIF source; static check caps it below 200KB.
- earlier finding: at `320 x 568`, the hero CTA extended below the first viewport.
  - fix made: added a short-viewport breakpoint reducing hero padding, type scale, gaps, and control height.
  - post-fix evidence: CTA bottom `466px`, note bottom `514px`, viewport bottom `568px`.
- earlier finding: three styled lists could lose list semantics in Safari/VoiceOver.
  - fix made: added explicit `role="list"` to the scope, process, and fit lists.
  - post-fix evidence: final HTML and passing static contract check.

### Pass 2 — passed

The revised browser capture was compared with the source in `reference-vs-implementation.png`. No actionable P0, P1, or P2 visual or interaction differences remain.

## Primary interactions tested

- all ten `[data-track]` links have the expected destination and tracking metadata
- first FAQ opens and keeps keyboard focus on `SUMMARY`
- `/interview` applies `ad-mode` and hides secondary footer channel links
- localhost leaves both `window.gtag` and `window.fbq` undefined
- console error log: empty

## Findings

No actionable P0, P1, or P2 findings remain.

## Follow-up polish

- [P3] Replace or supplement anonymized text cases with approved real work screens when the representative grants permission. This would improve proof strength but is not a mismatch with the selected visual target.
- [P3] Obtain a separate legal review for analytics consent behavior before treating the current policy as compliance advice.

final result: passed
