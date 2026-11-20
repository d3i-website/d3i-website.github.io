The slide that opens a part of a talk: the part's number at `slide-numeral` size in the serif, its claim in one sentence, and a line across the bottom with one node per part, so the audience sees where the talk is.

**Words.** Slides are not read (brand book, Slides · Voice): about 20 words on the slide, the footer row not counted, enough to cue the presenter; the argument is spoken and lives in the speaker notes. The preview has 19: the title, the numeral, a seven-word sentence and five part names. `part` repeats what the numeral says and is off in the preview; `sentence` is a cue of a few words, not the part's argument.

Mount `D3I.SlideSectionStop` in a design canvas; for a Slides deck, `D3I.slideMarkup(D3I.SlideSectionStop, props)` returns the slide as one `<section>` with inline hex styles to paste. Its props are in `components/index.d.ts` and on its card; the values below are what it draws, for anyone writing a slide by hand.

Pass `heading` ("The method"), `stepNumber` ("02"), `sentence` (about seven words; optional), every part's name as `stops`, `current` (this part's index) and `number`. `part` ("Part II") is an optional eyebrow.

- The title block: the eyebrow in `text-muted` caps, the title in the serif (Libre Caslon Condensed, provisional) at 420, 64px, as on every content slide.
- Middle row (`flex: 1`, so it centres between title and line): the number in the serif at 420, 200px, line height 0.9, in `blue`, in a 300px column, 48px from the sentence in the serif at 420, 48px, line height 1.18, in `heading`.
- The line, 32px below: The line is an inline `<svg>` 1664px wide (the width between the margins), with one node at the centre of each part's column (1664 / the number of parts), 3px `blue`. It steps down at the current part as the band's edge steps: the parts behind sit on the upper level, the parts ahead 40px lower, and the step is a curve 140px wide centred on the current node (a rounded corner, a slope, a rounded corner), drawn through it. Nodes: passed = 22px `blue` disc on the upper level; current = 30px `coral` disc halfway down the step; ahead = 20px `surface` disc in a 3px `blue` ring on the lower level. The line starts at the first node and ends at the last.
- Labels 12px under the line, centred under their nodes, Nunito Sans 700 at 24px: passed in `heading`, current in `heading` at 800, ahead in `text-muted`. Coral is the node, never the text.
- Section openers take the next slide number like any other slide.
