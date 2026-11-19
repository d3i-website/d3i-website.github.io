Markdown content as the site renders it: Nunito Sans text in `text`, a serif second heading (the serif is provisional), a sans third heading, running-text links (see Link), a blue-ruled italic blockquote, sky-framed code blocks, plain ruled tables, and definition lists with a faint coral rule.

Pass rendered Markdown as `html` (or the elements as children); the component wraps it in `.prose`, which caps the column at `content-width`, sets the text in `text` and removes the first child's top margin. Everything inside is element styling from the stylesheet; no further classes are needed. A picture with a caption is a Figure among the children.

The reset zeroes every margin and paragraphs carry only padding, so the prose gives headings, lists and code blocks their space back:

- `h2` is the serif at 420, 1.6875rem, with 2.25rem above and 0.15rem below. `h3` is Nunito Sans 700, 1.75rem above and 0.1rem below. `h4` is Nunito Sans. Headings are `heading`.
- `p` is `body` with 0.5em padding top and bottom.
- `ul` and `ol` have 0.4rem above and 0.9rem below, and 0.3rem between items.
- `a` is the running-text link: the text's colour at 700, with a dotted `sky` underline that turns solid on hover.
- `blockquote` is italic in `nav-text` behind a 3px `blue` left rule, padded 0.75rem by 1.25rem, 1.5rem above and below.
- `code` is `code` (the `mono` stack at 0.875em) on `surface-tint`, 0.15em by 0.35em. `pre` is a white block with a 1px `sky` border, padded 1rem, scrolling sideways, 0.6rem above and 0.9rem below.
- `table` is full width, cells 0.5rem by 0.75rem with a `border-soft` bottom rule, left-aligned, no outer frame.
- `dt` is Nunito Sans 800 in `ink`; `dd` is `nav-text`, 0.9rem in from a 2px rule of `coral` at 18%.
- `hr` is a `border-soft` rule with 2rem above and below.
