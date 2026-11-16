An in-page contents list at the top of a long content page, generated from the headings. A soft panel, bold Nunito links.

Pass the page's headings as `items` (label, and the anchor as href). Pages opt in with `toc: true` in front matter; `title` defaults to "Contents".

- `.content-page__toc` is `surface-tint`, 1px `border`, `radius-lg`, padding `space-16`, capped at `content-width`.
- `.content-page__toc-title` is `label` at 800.
- The list has no bullets; items `space-8` apart; links are `label` in `text`, `coral` on hover, no underline. The site's generator emits the list as `ul.toc__menu`; add `content-page__toc-list` to it for these link styles (the component emits both).
