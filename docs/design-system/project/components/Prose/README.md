Markdown content as the site renders it: headings in Nunito, Nunito Sans paragraphs with padding instead of margins, blue links, a blue-ruled italic blockquote, code on the panel tint, plain ruled tables, and definition lists with a rule.

Pass rendered Markdown as `html` (or the elements as children); the component wraps it in `.prose`, which caps the column at `content-width` and removes the first child's top margin. Everything inside is element styling from the stylesheet; no further classes are needed.

- `h2`, `h3`, `h4` are the matching styles in `heading`; `p` is `body` with 0.5em padding top and bottom.
- `a` is `blue`, underlined with `text-decoration-skip-ink`.
- `blockquote` is `text-muted` italic behind a 3px `blue` left rule, padding `space-12` by `space-24`.
- `code` is `code` (the `mono` stack at 0.875em) on `surface-tint`, `radius-sm`; `pre` is the same tint at `space-16` padding, `radius-md`, scrolling sideways.
- `table` is full width, cells `space-8` by `space-12` with a `border` bottom rule, left-aligned, no outer frame.
- `dt` is `label` at 800 in `text`; `dd` is `text-muted`, indented behind a 2px `border` rule.
- `hr` is a `border` rule with `space-32` above and below.
