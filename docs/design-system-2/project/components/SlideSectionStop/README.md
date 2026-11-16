The slide that opens a part of a talk: the part's number at `slide-numeral` size in coral, its claim in one sentence, and the road across the bottom with one stop per part, so the audience sees where the talk is.

Mount `D3I.SlideSectionStop` in a design canvas; for a Slides deck, `D3I.slideMarkup(D3I.SlideSectionStop, props)` returns the slide as one `<section>` with inline hex styles to paste. Its props are in `components/index.d.ts` and on its card; the values below are what it draws, for anyone writing a slide by hand.

Pass `part` ("Part II") as the eyebrow, `heading` ("The method"), `stepNumber` ("02"), `sentence` (about fifteen words), every part's name as `stops`, `current` (this part's index) and `number`.

- Middle row (`flex: 1`, so it centres between title and road): the number in `slide-numeral` (`coral`) in a 300px column, 48px from the sentence in `slide-heading` (`heading`).
- The road: `road`, `radius-lg`, 8px vertical padding. Stops: passed = 28px `blue` disc; current = 40px `coral` disc; ahead = 28px `surface` disc with a 4px `blue` ring. Labels under it in `slide-label`, centred: passed in `heading`, current in `coral` at 800, ahead in `text-muted`.
- Section openers take the next slide number like any other slide.
