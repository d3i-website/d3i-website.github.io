# Session Handoff Notes — 2026-04-12

> Notes for the next session picking up the greenfield site rewrite.

## What exists

### Two repos

- **`~/src/d3i-website.github.io`** — the original site, on branch
  `foundation-refactor` (10 commits ahead of main). This was our first
  attempt at the refactor: SCSS split, data files, new layouts extending
  minimal-mistakes' `single.html`. Functional but architecturally
  compromised — content pages inherit MM's opinions and we fight them
  with specificity overrides.

- **`~/src/new-site`** — the greenfield rewrite (6 commits on main).
  Started from `~/src/gpt-website` (a parallel GPT-built implementation
  of the same site), removed minimal-mistakes entirely, applied our
  design improvements. This is the active working copy going forward.

### Architecture of new-site

**No minimal-mistakes dependency.** Removed the MM gem, all MM SCSS
(~5300 lines), and all MM layout inheritance. Replaced with:

- `_sass/_variables.scss` + `_sass/_reset.scss` — own design tokens and
  modern CSS reset
- `_layouts/site-shell.html` — clean root layout with own header, subnav
  slot, main content area, footer
- All visible HTML is ours — no theme includes to fight

**Layouts (5 active + 2 legacy):**

| Layout | Extends | Used by | Status |
|---|---|---|---|
| `hub-journey` | `site-shell` | Software hub (1) | Working |
| `hub-directory` | `site-shell` | Community hub, About D3I hub (2) | Working |
| `page` | `site-shell` | 20 content pages | Working |
| `page-archive-stacked` | `site-shell` | Courses, Symposia (2) | Working |
| `page-archive-sidebar` | `site-shell` | Newsletter (1) | Working |
| `page-sections` | `site-shell` | Network (1) | Working |
| `splash` | `default` | Homepage (1) | Legacy, needs replacement |

**SCSS (9 partials):**

| File | Lines | What changes it |
|---|---|---|
| `_variables.scss` | 24 | Design tokens |
| `_reset.scss` | 90 | CSS reset |
| `_site.scss` | ~170 | Site-wide: fonts, shell, action links, figures |
| `_nav.scss` | ~220 | Header, main nav, subnav, footer |
| `_hub.scss` | ~600 | Hub journey + directory |
| `_pages.scss` | ~500 | Content page grid, sidebar, prose, archive, page-sections |
| `_postit.scss` | ~85 | Post-it callout |
| `_contact-cta.scss` | ~120 | Contact CTA (renamed `.contact-cta*` classes) |
| `_data-sections.scss` | ~65 | Institution grid |

Principle: split by reason for change. `_variables.scss` and `_reset.scss`
replace what MM provided. The other 7 are the concern-based partials we
established.

**Data files:** team.yml, advisors.yml, partners.yml, funding.yml,
courses.yml, newsletters.yml, institutions.yml, symposia.yml (data) +
`_symposia/` collection (3 events with detail pages).

**Config:** contact_email/contact_subject defaults, team_groups ordering,
symposia collection config. Plugins: jekyll-seo-tag, jekyll-sitemap,
jekyll-redirect-from only.

**Includes (custom):**

| Include | Purpose |
|---|---|
| `site-header.html` | Custom header with main nav |
| `site-footer.html` | Custom footer with logos |
| `section-subnav.html` | Hub subnav strip |
| `section-nav.html` | Left sidebar navigation |
| `content-page-intro.html` | Title + hero + excerpt for content pages |
| `contact-cta.html` | Contact CTA (renamed classes, config defaults) |
| `postit.html` | Cream callout (cross-layout) |
| `data-section.html` | Dispatcher for data-driven sections |
| `data-sections/*.html` | 5 renderers (people-grid, link-list, info-list, funding-list, institution-grid) |
| `archive-card.html` | Reusable archive item card |
| `page-sections.html` | Interleaved prose + data sections |
| `hero-aside.html` | Small floated hero (from our redesign, may not be used by gpt layouts) |
| `toc.html` | Table of contents (copied from MM gem) |
| `figure` | Simplified figure include (no popup) |
| `head.html` | Minimal head: charset, viewport, seo tag, stylesheet |
| `scripts.html` | Footer script loader |

**Empty stubs** (for MM layouts still in use by homepage/404):
sidebar.html, breadcrumbs.html, page__hero.html, page__hero_video.html,
page__meta.html, page__taxonomy.html, page__date.html,
post_pagination.html, social-share.html, comments.html,
archive-single.html.

## What works

- Software hub and all inner pages
- Community hub, all inner pages, and all archive pages (newsletter,
  courses, symposia with collection)
- About D3I hub and all inner pages (team, advisory board, funding,
  partners, impact and adoption) with data-driven content and URL
  redirects
- Prepare a study pages
- Data donation page
- Institution grid on network page
- Contact CTAs with config defaults
- Post-it callout on community hub
- Hub subnav on hub pages
- Left sidebar navigation on content pages
- Build completes in ~0.3 seconds

## What's known-broken or incomplete

### Visual polish needed

- **Large gaps between sections** on many pages — spacing wasn't tuned
  after removing MM's base styles. The reset provides minimal margins.
- **Archive cards and data-section renderers** are structurally correct
  but visually rough — archive-card styles exist in `_pages.scss` but
  need refinement. People-grid, funding-list, link-list, info-list
  renderers have HTML classes but only institution-grid has polished
  SCSS.
- **About D3I hub** uses the same hero illustration as Community
  (`undraw_newsletter-subscriber_plsr.svg`). Needs a new SVG from
  undraw.co.
- **Content page typography** — the `.prose` wrapper constrains width
  and handles definition lists, but paragraph spacing, heading margins,
  and list styles need review with the new reset.

### Unmigrated pages

- **Homepage** (`index.md`) — still uses `splash` layout which extends
  `default` via the old MM `splash.html`. The banner hero doesn't render
  (stub include). Needs its own layout or conversion to one of the new
  layouts.
- **404 page** — still on `default` layout. Minor.

### Old layouts to clean up

These can be deleted once homepage and 404 are migrated:
- `_layouts/default.html` (rewritten to use site-shell structure, but
  still serves as a shim for `splash.html`)
- `_layouts/splash.html` (MM-era, references stub includes)
- `_layouts/single.html` (MM-era, no longer used by any page)
- `_layouts/archive.html`, `archive-taxonomy.html`, `categories.html`,
  `category.html`, `collection.html`, `home.html`, `posts.html`,
  `search.html`, `tag.html`, `tags.html` — MM blog/archive layouts,
  unused
- `_layouts/compress.html` — MM HTML compression, unused
- All empty stub includes in `_includes/` (sidebar.html,
  breadcrumbs.html, page__hero.html, etc.)

### JS situation

- `site-main.min.js` (124KB) still loaded via `footer_scripts` config.
  Contains Gumshoe (scroll spy with hardcoded offset issue), 
  SmoothScroll, clipboard.js, and search. None of these are actively
  needed by the new architecture. Could be removed entirely or replaced
  with a minimal custom script if scroll spy or clipboard is wanted.

### CSS class naming

- `.section-cta` is the old name for action links. Could be renamed to
  `.action-link` as discussed. Pages still reference it in body
  content and Kramdown attribute syntax.
- `.section-page__hero` and `.section-figure` — old names kept from the
  original site. Renaming is optional cleanup.

### Content items

- Network page still has an inline-styled `<figure>` for the PhD
  network section illustration. Minor cleanup.
- Some pages have inline HTML for CTA links (`<p><a class="section-cta">`
  or Kramdown `{: .section-cta}`). The `actions:` frontmatter pattern
  from gpt-website could replace these but hasn't been applied to all
  pages.

## Design decisions made in this session

These are documented in the spec but worth restating:

1. **SCSS split by reason for change.** "Two things share a file when
   they always change together." 7 concern partials + 2 foundation
   partials.
2. **CTA is opt-in per page** via `contact:` frontmatter, explicit
   `{% include contact-cta.html %}` in each layout (not a global hook).
3. **Post-it is a cross-layout component** available on any page via
   `postit:` frontmatter.
4. **Data-section rendering via frontmatter** (`data_section: {type, data}`)
   for CMS readiness. Exception: network page uses a body include for
   mid-content data rendering.
5. **Archive source is explicit** — `archive_collection:` or
   `archive_data:` in page-archive frontmatter.
6. **No minimal-mistakes** — own reset, own variables, own layouts.
   MM's toc.html and figure include copied into project.

## Spec and plan documents

- `docs/superpowers/specs/2026-04-12-foundation-refactor-design.md` —
  the design spec (written for the d3i-website.github.io refactor, but
  the architecture applies to new-site with the improvements noted above)
- `docs/superpowers/plans/2026-04-12-foundation-refactor.md` — the
  implementation plan (written for d3i-website.github.io, partially
  superseded by the greenfield approach)
- `docs/superpowers/specs/2026-04-11-session-handoff-notes.md` — notes
  from the session before this one (PR A/community work)

## Next steps

1. **Visual polish pass** — tune spacing, paragraph margins, heading
   sizes in `_reset.scss` and `_pages.scss`. Review `.prose` with real
   content. Fix archive card styling.
2. **Homepage** — design and build a proper homepage layout or convert
   to an existing layout.
3. **About D3I hero** — select a new illustration from undraw.co.
4. **Clean up old layouts and stubs** — delete everything listed in
   "old layouts to clean up" above.
5. **JS cleanup** — evaluate whether `site-main.min.js` is needed.
   Remove or replace.
6. **Push to remote** — the new-site repo has no remote yet.
