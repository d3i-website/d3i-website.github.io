# Refactor Evaluation

## Scope

This evaluation covers the current state of the refactor in `Software` and `Community` after the first round of custom layouts, sidebar/nav unification, and archive/page restructuring.

## Overall Judgment

The refactor is directionally correct, but not yet fully coherent. The biggest improvement is that several pages are now content-driven and substantially less dependent on Minimal Mistakes page primitives. The biggest remaining weakness is that some of the complexity has moved from HTML into Liquid rather than disappearing altogether.

## Editor Experience

### Good

- Simple pages like `Getting started` are reasonably clean: front matter plus Markdown.
- Hub pages like `Community` are mostly declarative.
- Archive data lives in `_data`, which is a better editorial model than hand-maintained repeated page markup.

### Still Weak

- Compound pages like `Community Networks` require fairly technical front matter.
- Archive pages still require layout-specific front matter knowledge.
- Some migrated pages still contain raw HTML for structured content.

## Adding a New Page

### Better Than Before

- The project now has recognizable page types rather than one-off page construction.
- Navigation is centralized in `_data/navigation.yml`.
- Shared footer/header/sidebar behavior is mostly consistent.

### Still Too Knowledge-Heavy

- A maintainer still has to know which layout to choose from:
  - `hub-story`
  - `hub-directory`
  - `page`
  - `page-sections`
  - `page-archive-stacked`
  - `page-archive-sidebar`
- Compound pages still require understanding layout-specific front matter schemas.
- Some behavior still depends on naming conventions rather than fully explicit content contracts.

## Layout And Liquid Cleanliness

### Improved

- The site is much less dependent on Minimal Mistakes page-level layout conventions.
- Shared sidebar styling is now a real reusable primitive rather than a series of visual approximations.
- The archive split into separate layouts is much clearer than the previous variant/position branching model.

### Remaining Problems

- `page-sections` still dispatches components by string key.
- `About` remains outside the new system entirely.
- Some pages still use raw HTML instead of reusable content components.

## Main Findings

1. `page-sections` is still carrying too much implicit behavior.
   The include at `_includes/page-sections.html` still checks `section.component == 'institutions-grid'`. That is a layout/component coupling point and should be replaced by a clearer section contract.

2. The editor experience is uneven.
   Simple content pages are now reasonable. Compound pages are still maintainer-facing rather than editor-facing.

3. Archive pages are now cleaner, but the system still needs stronger conventions.
   Splitting stacked and sidebar archive pages into separate layouts is the right move. It removes the previous branching layout engine and makes the page contract easier to reason about.

4. The site is not yet consistently Markdown-first.
   `software/usage.md` still contains raw HTML blocks for the media grid and embedded iframe.

5. `About` is still structurally unrefactored.
   The old Pandoc-generated HTML pages in `about-the-project` remain a major outlier and should not be treated as compatible with the new architecture.

## Recommended Next Steps

1. Replace `section.component` string dispatch with explicit section subtypes or dedicated includes at the layout level.
2. Migrate `About` into the same content/layout system before expanding the current approach further.
3. Remove remaining raw HTML from migrated pages where the content pattern is repeatable.
4. Tighten the authoring rules for each page type and document the required front matter contracts.
5. Keep shared UI primitives truly shared:
   - sidebar panels
   - CTA links
   - archive cards
   - contact blocks

## Bottom Line

The refactor is substantially better than the pre-migration state, but it is not yet clean enough to hand off as a finished editorial foundation. It is close enough that another consolidation pass should pay off, but not close enough that adding more sections on the current contract would be prudent.
