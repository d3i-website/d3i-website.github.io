# Bringing the website in line

The live site (`_sass/_variables.scss`, `_sass/*.scss`, the homepage front matter) still uses the values this system replaced. When you edit the site, move each old value to the token below; `components/bundle.css` already does, so it is a working reference for every selector.

## Colour

| old (SCSS variable or literal) | token |
| --- | --- |
| `$accent-primary` #4272ef | `blue` |
| `$accent-secondary` #ff5e5e | `coral` |
| `$accent-tertiary` #ffcf60 | `yellow` |
| yellow text #e8b53c (homepage movement front matter) | `yellow-text` |
| `$text-color` #333, #444, #555a63, #4f5560, #50545d | `text` |
| `$muted-text-color` #6a6a6a | `text-muted` |
| heading #252a34 | `heading` |
| #fff, header at 96% | `surface` (the header is opaque) |
| #f5f7fb, #f6f8fc, #f8f9fb, #fafbfd, #fbfbfc, #f7f9fc, rgba(0,0,0,.02 and .035) | `surface-tint` |
| #f0f2f5, rgba(0,0,0,.05) | `surface-strong` |
| `$border-color` #e6e6e6, #e9ecf2, #e4e9f3, rgba(37,42,52,.04 to .12), rgba(0,0,0,.06 and .08), the coral dd rule | `border` |
| rgba(37,42,52,.15 and .18), #d8deea, #d4d7dd, the post-it link underline | `border-strong` |
| callout #f0f8ff, moon #f4f7fe, tint-blue #eef3fe, featured #fafcff | `blue-tint` |
| tint-coral #ffefef | `coral-tint` |
| post-it #fff6d6, tint-yellow #fdf4df | `yellow-tint` |
| post-it tape (yellow at 45%) | `yellow` at `opacity: .5` |
| road #c6d5fa, featured-card border rgba(66,114,239,.18) | `road` |
| `_data/usage.yml` country colours #4272EF, #FF5E5E, #F4A52B, #27B3A3, #8B5CF6 | `chart-1` to `chart-5`, unchanged |

## Type

Every font size moves to the nearest step of 12, 14, 16, 18, 22, 28, 36, 48, 72px:

| old sizes | new |
| --- | --- |
| 11, 11.5, 11.8, 12.5px | 12px (`eyebrow`) |
| 13, 13.1, 13.4, 13.6, 14, 14.4, 14.7, 15px | 14px (`small`, `label-small`) |
| 15.2, 15.7, 16, 16.3, 16.6, 17px | 16px (`body`, `label`) |
| 17.6, 18, 18.4, 19.2, 20px | 18px (`h4`, `lead`) |
| 22, 22.4, 24px | 22px (`h3`) |
| 25.6, 26, 27.2, 28.8, 30, 32px | 28px (`h2`) |
| 36, 38.4, 40px | 36px (`h1`) |
| 41.6 (homepage hero), 44, 48, 52, 60px | 48px (`display`) |
| 72px | 72px (`numeral`) |

Font families come from `var(--font-display)`, `var(--font-sans)` and `var(--font-mono)`; the Nunito stack with "Nunito Sans" as its first fallback becomes plain `var(--font-display)`.

## Shape and depth

- Radii: 1, 2, 4px and 0.25rem → `radius-sm`; 7px, 0.5rem, 0.55rem → `radius-md`; 0.75, 0.85, 0.9, 1rem and 16px → `radius-lg`; 22px → `radius-xl`; 6px dots and 999px → `radius-pill`; 50% → `radius-circle`.
- Shadows: card and usage-figure → `shadow-sm`; figure, figure-large and avatar → `shadow-md`; movement card, carousel arrow and post-it → `shadow-lg`.
- Breakpoints: 600px → `bp-sm`, 768px → `bp-md`, 900px → `bp-lg`; the four 1024px rules fold into 900px.
