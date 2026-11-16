A member institution of the network: the institution's name, its affiliated researcher, and the department, in a bordered card. Cards tile in an auto-fit grid at 15rem.

Pass `institution`, `affiliate` (name and profile `href`) and `department`, and tile the cards in `InstitutionCard.Grid`. The component emits the `.institution-card` classes this preview shows; the repository's `data-sections/institution-grid.html` emits a parallel set of `.institution-grid__*` names that the stylesheet does not style.

- `.institution-grid` is `repeat(auto-fit, minmax(15rem, 1fr))` with a `space-16` gap, capped at `content-width`.
- `.institution-card` is `surface`, 1px `border`, `radius-lg`, padding `space-16`.
- `.institution-card__title` is `h4` at weight 700.
- `.institution-card__affiliate` is `body` in `text`; `.institution-card__department` the same in `text-muted`, `space-12` below. An optional `.institution-card__label` (`eyebrow` in `text-muted`) can head a field; the live include does not use it.
- Links in the card are `text` at 600 over a `border-strong` underline, turning `coral` on hover.
