The overview slide: a line with one node per part, and each part's number and header beneath its node, nothing else. It replaces a bulleted agenda; the same line returns on each section opener (SlideSectionStop), stepping down at the current part.

**Words.** About 20, counted as the brand book's Slides · Voice says. The preview has 19: the title, five numerals and five part names. Numerals count, so keep part names to one or two words; with six parts, shorten the title.

Mount `D3I.SlidePlan` in a design canvas; for a Slides deck, `D3I.slideMarkup(D3I.SlidePlan, props)` returns the slide as one `<section>` with inline hex styles to paste. Its props are in `components/index.d.ts` and on its card; the values below are what it draws, for anyone writing a slide by hand.

Pass `heading`, the part names as `stops` (three to six, one or two words each) and `number`; `eyebrow` is optional and has no default, since the line says it is an overview.

- The title block: the eyebrow in `text-muted` caps, the title in the serif (Libre Caslon Condensed, provisional) at 420, 64px.
- The line: The line is an inline `<svg>` 1664px wide (the width between the margins), with one node at the centre of each part's column (1664 / the number of parts), 3px `blue`, straight, from the first node to the last. Every node is a 22px `blue` disc: the plan marks no part as current.
- Under each node, 12px below the line and centred: the two-digit number in the serif at 420, 48px, line height 1, in `blue`, then 8px below it the header in the serif at 420, 36px, line height 1.15, in `heading`. The section centres its content vertically with 64px between title block and line.
