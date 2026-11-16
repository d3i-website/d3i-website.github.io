The overview slide: the road with one numbered stop per part and the part headers beneath, nothing else. It replaces a bulleted agenda; the same road returns on each section opener (SlideSectionStop) with the current stop highlighted.

Mount `D3I.SlidePlan` in a design canvas; for a Slides deck, `D3I.slideMarkup(D3I.SlidePlan, props)` returns the slide as one `<section>` with inline hex styles to paste. Its props are in `components/index.d.ts` and on its card; the values below are what it draws, for anyone writing a slide by hand.

Pass `heading`, the part names as `stops` (three to six, one to three words each) and `number`; `eyebrow` defaults to "Overview".

- The road is `road` at `radius-lg` with 16px vertical padding. Stops are 80px discs: `blue` with the two-digit number in `slide-item` at 900 in `on-accent`, the last `coral` with its number in `heading`: the destination. Segments are 6px dashed `blue`; the outermost two are dashed in `surface` so the line starts and ends at a stop.
- Headers: `slide-subheading`, centred, under their stops. The section centres its content vertically with 64px between title block and road.
