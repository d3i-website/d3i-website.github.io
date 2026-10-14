One step of a build: several slides that share a title and a slide number, each adding one row to the same frame, so the audience sees one idea at a time while the earlier ones stay in view, dimmed. A step rail across the top shows which step this is.

Mount `D3I.SlideBuild` in a design canvas; for a Slides deck, `D3I.slideMarkup(D3I.SlideBuild, props)` returns the slide as one `<section>` with inline hex styles to paste. Its props are in `components/index.d.ts` and on its card; the values below are what it draws, for anyone writing a slide by hand.

Pass `heading`, `eyebrow`, `steps` (the rail's names), `columns` (`left` for the plain column, `right` for the column being argued for), every `rows` entry (`label`, `left` and `right`, each a `title` and optional `text`; `tone: "coral"` for a row that makes a different kind of point) and, per slide, `shown`: how many rows that step shows. Give every step the same `number`.

- Every step has the same geometry: the same gaps and paddings, so a new row appears and nothing else moves.
- Earlier rows carry `opacity: 0.35`; the newest is in full colour. Rows are 24px apart vertically, divided by 1px `border`; the header row has 16px below it and the same rule.
- Headers are `slide-eyebrow`: the plain column in `text-muted`, the argued-for column in `blue`. Row labels are `slide-eyebrow` in `heading` (`coral` for a coral row).
- Cells: a `slide-item` line over a `slide-small` line in `text-muted`, 8px apart. The argued-for cell sits on `blue-tint` (`coral-tint` for a coral row), `radius-lg`, padding 16px 24px.
- The rail: per step a 3px line, a 24px stop and a 3px line over a `slide-label`. Passed: `blue`. Current: `coral` stop, label in `coral` at 800. Ahead: `surface` stop with a `road` ring, `road` lines, label in `text-muted`.
