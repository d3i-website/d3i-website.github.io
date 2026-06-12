# CMS maintainer notes

Internal reference for the developer(s) maintaining the D3I Jekyll CMS.

## Architecture

- **CMS engine**: Sveltia CMS (static JS bundle from CDN).
- **Auth**: per-user GitHub fine-grained Personal Access Tokens (PATs). Each editor pastes their own token into Sveltia's "Sign in with Access Token" field on first use; Sveltia caches it in browser localStorage. No OAuth proxy is in the path.
- **Backend**: the GitHub repo itself. Every edit is a git commit attributed to the PAT-owner's GitHub user.
- **Branch model**: **CMS edits commit to `cms-staging`, not `main`.** `admin/config.yml` has `backend.branch: cms-staging`. Editors' Saves accumulate as small commits on `cms-staging`; publishing is the manager-triggered "Publish CMS edits" workflow (squash-merges `cms-staging` → `main`), started either from the **Publish Changes** button in the CMS header or from the Actions tab — see "Publish flow" below.
- **Why not editorial workflow**: Sveltia's `publish_mode: editorial_workflow` is unimplemented (per their docs, planned for 1.0). The `cms-staging` branch model achieves the same goals (clean main history, batched email cost, review opportunity before publication) at the branch level instead of per-document.
- **Admin URL**: https://d3i-website.github.io/admin/ (served by GitHub Pages from `admin/index.html`).

## Branch-sync discipline

The `cms-staging` branch must stay in sync with `main` to avoid merge conflicts and stale-baseline editing.

**This is automated**: `.github/workflows/reset-cms-staging.yml` force-resets `cms-staging` to `main` on every push to `main` — after publication squash-merges and after direct edits alike. No manual step needed.

**Implication — unpublished CMS edits are wiped by pushes to main.** Because every push to main resets cms-staging, editor work that is saved but not yet published is lost when anything else lands on main. Encourage editors to publish in reasonably short batches, and before merging an unrelated PR to main, glance at https://github.com/d3i-website/d3i-website.github.io/compare/main...cms-staging to confirm nothing unpublished is sitting there.

**Manual fallback** (if the workflow is ever disabled or fails): `git push -f origin main:cms-staging`.

**Avoid editing CMS-managed files directly on main.** When possible, route content changes through the CMS (commits to cms-staging, then publish). Reserve direct main edits for non-CMS files (layouts, scripts, configs).

## Publish flow (skip_ci + repository_dispatch)

`admin/config.yml` sets `backend.skip_ci: true`. This does two things:

- **It surfaces a "Publish Changes" button in the CMS header.** Clicking it fires a `repository_dispatch` event of type `sveltia-cms-publish` against the default branch, which `.github/workflows/publish-cms-edits.yml` lists as a trigger alongside `workflow_dispatch`. So the manager publishes from inside the CMS; the Actions-tab "Run workflow" path remains as a fallback. Publishing stays fully manual either way — saves never auto-publish.
- **Save commits to `cms-staging` get a `[skip ci]` message prefix** (deletions are exempted by Sveltia, by design). This is harmless here: no workflow builds off `cms-staging` pushes, and the publication squash-merge to `main` is performed with `GITHUB_TOKEN`, which never fires push-triggered workflows regardless of commit message — the publish workflow already compensates by dispatching the staging deploy and the branch reset explicitly. **Caveat**: if you ever merge `cms-staging` into `main` by hand (web UI or local), the squash commit body may inherit a `[skip ci]` line from a constituent commit and silently suppress push-triggered workflows (`deploy-staging`, `reset-cms-staging`); check for it before merging manually.

## CMS appearance & entry-list views

How the admin look-and-feel is configured (all in `admin/config.yml` unless noted):

- **Branding**: `app_title` (login screen + browser tab) and `logo: { src: ... }` (replaces the deprecated `logo_url`). There is no supported way to theme/CSS the Sveltia app UI itself; light/dark follows each user's OS or their in-CMS Settings choice.
- **Sidebar order**: collections are listed in manager-task order — Events and News (entry collections) first, then a top-level `- divider: true`, then the site-section file collections. Folder collections still cannot nest inside file collections, hence Events/News at top level.
- **Entry-list views (Events)**: `sortable_fields` with a `default` of date-descending; `view_groups` grouping by year (regex `\d{4}` on `date`, `default: year`) to mirror the Bloomreach year-folder mental model; `view_filters` presets per `event_type`. Users can override sort/group/filter per-session via the toolbar; the config only sets defaults.
- **Entry-list views (News)**: `thumbnail: image` (grid view shows the news image), date-descending default sort, optional year grouping (no default).
- **Preview pane**: `admin/index.html` registers `admin/preview.css` via `CMS.registerPreviewStyle()` so entry previews use site typography (self-contained `@font-face` for the self-hosted Nunito fonts plus tokens copied from `_sass/_variables.scss` — keep in sync by hand). Data-list file editors set `editor: { preview: false }` because a preview of a raw YAML list is noise.

## Why PATs instead of OAuth (background)

Sveltia recommends OAuth via Netlify's hosted provider for the most polished login UX, but Netlify's provider keys lookup by the admin's hostname — and our admin lives on `d3i-website.github.io`, not on the Netlify site that serves `datadonation.eu`. Cross-host topologies aren't supported. The official Sveltia path for our case is to deploy their `sveltia-cms-auth` Cloudflare Worker, but for a 1-month MVP eval, per-user PATs avoid setting up new infrastructure entirely. PATs preserve audit trail (each PR/commit is attributed to the actual editor) and add no third-party dependency beyond GitHub itself.

If the eval succeeds and login UX becomes a friction point worth solving, deploy `sveltia-cms-auth` on Cloudflare Workers (or a European equivalent — Scaleway Serverless Functions, Clever Cloud, Hetzner VPS). See "Future enhancements" below.

## Per-user PAT setup

Each editor (currently: Danielle + the community manager) holds their own fine-grained PAT.

**Required PAT permissions:**
- Repository access: only `d3i-website/d3i-website.github.io`
- Repository permissions:
  - Contents: Read and write
  - Pull requests: Read and write
  - Metadata: Read-only (auto-included)
- Expiration: 1 year (GitHub max)

**Onboarding a new editor:**
1. Walk them through PAT creation following the "First-time setup" section of `cms/community-manager-guide.md`.
2. If they're not yet a collaborator on the repo, add them via GitHub Settings → Collaborators.
3. If the org has fine-grained-PAT approval rules, an admin may need to approve their token request (you'll see an email).
4. Have them paste the token at https://d3i-website.github.io/admin/.

**Rotating a PAT:**
The editor regenerates from their own token settings page (Settings → Developer settings → Personal access tokens → Fine-grained tokens → click their token → Regenerate). They paste the new token into the CMS to log in. No action needed from maintainers.

**Revoking a PAT** (e.g., if a device is lost or an editor leaves):
- Editor: revokes from their own token settings.
- Org admin: also revokes via GitHub org settings → Personal access tokens → review & revoke.
- The CMS rejects the token on next API call; the editor pastes a new one or stops having access.

## Repo settings (required for CMS to work correctly)

At https://github.com/d3i-website/d3i-website.github.io/settings (General → Pull Requests):

- Squash-merging: **enabled**.
- Merge commits: **disabled**.
- Rebase merging: **disabled**.
- Default squash commit message: **"Pull request title"**.

If these drift, `main` will accumulate noisy multi-commit merges from CMS edits. The clean one-commit-per-publish history depends on squash being the only option.

## Adding a new collection

1. Choose the source: a data file (`files` collection) or a folder (`folder` collection).
2. Add a collection entry to `admin/config.yml` with fields matching the underlying data shape.
3. For data files that are bare YAML lists, wrap the list inside a field that matches the file's top-level key (or, for bare lists, use the filename-as-key convention — see existing entries for examples).
4. Commit, push, test via the CMS after rebuild.

Schema templates: see `admin/config.yml` for examples of `files` collections (one file at a time), `folder` collections (e.g., events), and hidden-field patterns.

## Adding a new data file to the CMS

Template for a list-of-records data file:

```yaml
  - name: <slug>
    label: "<Display name>"
    files:
      - file: _data/<filename>.yml
        name: <slug>
        label: "<Display name>"
        description: "<What this data drives on the site>"
        format: yml
        fields:
          - name: <slug>
            label: "<List label>"
            widget: list
            summary: "{{fields.<key>}}"
            fields:
              - { name: <field>, label: "<Label>", widget: string }
              # ... more fields
```

## Adding a new page to the CMS

For a page with known layout and frontmatter structure:

1. Identify which frontmatter keys the layout reads (title, sidebar, etc.).
2. Add an entry under the `pages` collection in `admin/config.yml`.
3. Use `widget: hidden` for all structural keys (layout, permalink, redirect_from, sidebar.nav, etc.).
4. Expose editable content (title, body, contact blocks) with appropriate widgets.

## Known CMS constraints

- **`auth_type: implicit` is rejected**: Sveltia rejects Decap's `auth_type: implicit` with a hard error. Do **not** add `auth_type`, `base_url`, or `auth_endpoint` under `backend:` unless you've deployed a real OAuth proxy (see Future enhancements). The current PAT-based auth requires no `backend:` keys beyond `name`, `repo`, `branch`.
- **GitHub OAuth App is dormant but kept**: the "datadonation.eu CMS" OAuth App registered in Task 03 is currently unused (we use PATs, not OAuth). It's left registered so a future OAuth-proxy deploy can reuse the same Client ID + Secret without re-registering. Callback URL is still set to `https://api.netlify.com/auth/done` from the original Netlify-OAuth attempt; this is stale and should be updated when/if you deploy the Worker.
- **Bare-YAML-list round-tripping**: some data files are bare lists (`- item: ...`). Sveltia may wrap them under a top-level key on write. If Jekyll stops reading a data file after a CMS edit, this is the likely cause. Fix: either reshape the data file to have a top-level wrapping key, or change the Sveltia collection schema.
- **Image format allow-list**: use Sveltia's `accept: "image/jpeg,image/png,..."` (mirrors HTML's `<input accept>`). Decap CMS's `file_types: [...]` is silently ignored — if you see it in the config, replace it.
- **Date widget**: Decap's `widget: date` is rejected by Sveltia with a hard error. Use `widget: datetime, type: date` for date-only fields (no time component). For datetime fields, use `widget: datetime` directly (no `type:` needed).
- **Slugified upload filenames**: not Sveltia's default. Verify the relevant Sveltia option (search the docs for filename/slugification settings) before relying on slugified names landing in `assets/images/`.
- **Cleared optional fields round-trip as `''`, not as a missing key**: when an editor empties an optional field (or never fills it), Sveltia writes `image: ''` / `external_url: ''` / `date_label: ''` to the frontmatter instead of omitting the key. Liquid treats `''` as truthy, so every template that gates rendering on an optional string field needs an explicit empty-string check (`{% if x and x != "" %}`), not a bare truthiness test. This has bitten three times (courses date_label, news images, news external links); see `_includes/news-card.html` and `_includes/archive-card.html` for the pattern.
- **Liquid 4 has no `blank` literal**: `{% if x != blank %}` parses without error but `blank` is just an undefined variable (nil), so the comparison silently always passes. Jekyll bundles Liquid 4 — use explicit `!= ""` checks (see previous bullet). Don't trust Shopify's Liquid docs here; they describe Liquid 5+.
- **Don't combine `slug` and `path` collection options**: in a `path` template, `{{slug}}` expands to the *full entry slug* (the already-rendered `slug:` pattern), not the slugified title. With `slug: "{{fields.date | date('YYYY-MM-DD')}}-{{slug}}"` and the same `path`, files get doubled dates (`2026-06-12-2026-06-12-title.md`). Set `slug` only; files then land as `<slug>.md` in the collection folder.
- **Navigation URL select options are hardcoded**: if site URLs change (new permalinks), the `options:` lists in the navigation collection need manual updating.
- **Local FSA-API mode**: enabled via the Account menu in the deployed admin (`http://localhost:4000/admin/` while running `bundle exec jekyll serve`). Chromium-only. Local mode does NOT exercise PAT auth, the "Publish CMS edits" workflow (neither the Publish Changes button's `repository_dispatch` nor the squash-merge), or the deploy pipeline — those all need the live admin against the deployed site.

## Future enhancements

### One-click login via OAuth proxy (when PAT friction becomes a problem)

If renewing PATs annually proves to be a stumbling block for editors — or if you want to onboard editors who don't have GitHub accounts at all — replace the per-user PAT model with a real OAuth proxy.

The official Sveltia recommendation is `sveltia-cms-auth`, a Cloudflare Workers script: https://github.com/sveltia/sveltia-cms-auth.

Rough plan:

1. Deploy `sveltia-cms-auth` to a serverless host. Options:
   - **Cloudflare Workers** (~10-15 min, free tier): Sveltia's officially supported path.
   - **Scaleway Serverless Functions** (~30 min, French/EU): closest CF Workers analogue, free tier.
   - **Clever Cloud** (~30 min, French/EU): PaaS, push from git. Wrap as Express server.
   - **Hetzner Cloud VPS** (~45 min, German/EU): €4/mo, run as systemd service.
2. Reuse the existing GitHub OAuth App (Client ID + Secret already exist from Task 03). Update its callback URL from `https://api.netlify.com/auth/done` (now stale) to `<your-worker-url>/callback`.
3. Set the Worker's env vars: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (encrypted), `ALLOWED_DOMAINS=d3i-website.github.io`.
4. Add `base_url: <your-worker-url>` to `admin/config.yml` under the `backend:` block.
5. Editors stop pasting PATs and click "Sign in with GitHub" instead. Their PATs continue to work in parallel until you remove them.

Estimated effort: 30 min if Cloudflare account exists; 1-2 hrs for an EU alternative or first-time-Cloudflare setup.

### Production hosting migration (Netlify → UvA / SURF)

When `datadonation.eu`'s production hosting moves off Netlify (planned, separate from CMS work), the OAuth proxy plan above is the same regardless of where production lands — the auth path is independent of the production deploy host as long as the admin stays on github.io.

## Quarterly janitor checklist

- [ ] Close stale `cms-staging` → `main` publication PRs that were opened but never merged (older than 14 days). These leave editor work in limbo; either publish or close.
- [ ] Audit `assets/images/` for orphan uploads (images not referenced by any `_data/*.yml`, `_pages/*.md`, or `_events/*.md`). List candidates with a `grep -r` over all content files; manually prune.
- [ ] Audit active editors and their PATs: any editors no longer involved should have their tokens revoked (org-side) and access removed from the repo collaborator list.
- [ ] Verify the `reset-cms-staging.yml` workflow is enabled and its recent runs are green (it keeps `cms-staging` in sync with `main` on every push). If it has been failing, reset manually: `git push -f origin main:cms-staging`.
- [ ] Verify repo settings haven't drifted from squash-merge-only configuration.

## Useful commands

- List open publication PRs: `gh pr list --state open --base main --head cms-staging`
- Find images not referenced in any content file:
  ```
  comm -23 \
    <(find assets/images -type f \( -name '*.jpg' -o -name '*.jpeg' -o -name '*.png' -o -name '*.svg' -o -name '*.webp' \) | sort) \
    <(grep -rho '/assets/images/[^ "'"'"')]*' _data _pages _events _config.yml | sort -u)
  ```
  (Lists image files that appear on disk but don't appear in any content file. Review before deleting.)

## Contact

Danielle McCool — DataDonation@uu.nl
