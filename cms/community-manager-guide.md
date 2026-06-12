# CMS guide for the D3I community manager

**URL to bookmark:** https://d3i-website.github.io/admin/

## First-time setup: generate your access token

The CMS uses a "personal access token" (PAT) from GitHub to identify you. You'll do this once. Danielle can walk you through it on a screen-share if helpful.

1. Sign in to GitHub at https://github.com/.
2. Click your avatar (top-right) → **Settings**.
3. In the left sidebar, scroll to the bottom: **Developer settings**.
4. **Personal access tokens** → **Fine-grained tokens** → **Generate new token**.
5. Fill in:
   - **Token name**: `D3I CMS` (anything memorable).
   - **Expiration**: 1 year (the maximum). You'll renew once a year — Danielle will remind you.
   - **Resource owner**: `d3i-website` (the GitHub organization that owns the repo).
   - **Repository access**: select **Only select repositories**, then add `d3i-website/d3i-website.github.io`.
   - **Permissions** (under "Repository permissions"):
     - **Contents**: Read and write
     - **Pull requests**: Read and write
     - (Metadata: Read-only is added automatically — leave it.)
     - Leave everything else untouched.
6. Click **Generate token**.
7. **Copy the token immediately.** It starts with `github_pat_` and you won't be able to see it again. Store it in your password manager (1Password, Bitwarden, Keychain, etc.).
8. If GitHub asks for organization approval (because the `d3i-website` org has approval rules): Danielle gets an email and can approve from her side. Wait for approval before continuing.

## Logging in

1. Open https://d3i-website.github.io/admin/ in Chrome or Firefox.
2. Click **Sign in with Access Token**.
3. Paste the token from your password manager.
4. Click **Sign in**.
5. You'll land on the CMS dashboard.

The browser remembers your token, so you only paste it once per browser. If you switch devices or clear your browser data, paste it again.

If login fails: most often, your token has the wrong permissions. Re-generate following the steps above and double-check the **Contents** and **Pull requests** rows are both set to "Read and write." If that doesn't fix it, email Danielle (danielle.mccool@gmail.com).

## The dashboard

The left sidebar puts your day-to-day work at the top, with the site-section editors below a separator:

- **Events** — create new event pages (symposia, courses, workshops, and more); edit existing ones. The list is grouped by year (like folders), newest first. Use the filter icon above the list to show only one event type. Each entry produces its own page on the site and is listed on `/community/events/`; the Courses and Symposia pages automatically show the entries of the matching type.
- **News** — create news items, newest first; switch to grid view to see image thumbnails. Each item appears on `/news/` and, while fresh (under ~3 months old), in the homepage "Latest news" strip.
- **News page** — the intro text and contact block of the `/news/` page itself.
- **Community** — page editors and data lists for `/community/` (the section landing page, Events page, Courses page + course materials, Symposia page, Networks, Newsletter).
- **About D3I** — page editors and data lists for `/about-d3i/` (the section landing page, Team, Advisory board, Funding, Partners, Impact and adoption).
- **Prepare a Study** — the section landing page and the Completed projects page with its data list.

Within each section, page editors are paired with their supporting data list (e.g. "Team page" sits next to "Team members"). Edit the page when you want to change the prose; edit the data list when you want to add, remove, or reorder items shown on the page. The Events, Courses, and Symposia pages are the exception: their intro prose is a page editor under Community, while the events listed on them come from the Events collection at the top of the sidebar.

Two extras worth knowing:

- **Every page editor has a "Highlight" field** — an optional yellow note box rendered at the top of that page, for time-sensitive things like deadlines or announcements. Tick the checkbox to use it, untick to remove it.
- **"View on Live Site"** — when editing an event or news item, the ⋯ menu (top right) opens that entry's page on the staging site, so you can see the published version next to your edits.

## Common tasks

### Add a team member

1. Dashboard → About D3I → Team members.
2. Click the **+** button on the Members list.
3. Fill in Name, Role / title, Group (dropdown), Photo (upload), and optional Profile URL.
4. Click **Save** at the top.

This stores your edit on the `cms-staging` branch — it's saved, but not yet visible on the site. Continue editing as much as you want; everything accumulates there. When you're ready for the public to see your changes, follow "Publishing your edits" below.

### Edit the Team page intro

1. Dashboard → About D3I → Team page.
2. Edit the **Intro prose** markdown field.
3. Click **Save**.

### Update a section landing page

The landing pages of Community, About D3I, and Prepare a Study (the pages with the big cards) are each the first entry in their section.

1. Dashboard → e.g. Community → **Community landing page**.
2. Edit the hero text, or open **Destination cards** to change the card texts, links, or their order (drag to reorder).
3. Click **Save**.

### Add a new event (symposium, course, workshop, …)

1. Dashboard → Events.
2. Click **New Event**.
3. Pick the **Event type**: it controls where the event is listed. Every event appears on the Events page; type "Course" also appears on the Courses page, type "Symposium" also on the Symposia page.
4. Fill in Title, Start date, End date, Location, Summary, optional External URL and details/actions. For an event people should register for, add an action button (e.g. "Register" pointing at the registration link).
5. Write the full event page content in the **Full event page content** field. (For events whose primary page lives elsewhere, the External URL is enough — visitors land on this site's page first and can click through.)
6. Click **Save**.

### Add a news item

1. Dashboard → News.
2. Click **New News**.
3. Fill in Title, Date, and Summary; optionally upload an Image (with alt text).
4. Write the story in the body field — or, for news that lives elsewhere (e.g. an announcement on a partner site), fill in the **External URL** instead and leave the body empty; the news card then links straight there.
5. Click **Save**.

News items appear on the News page immediately after publication. The homepage "Latest news" strip shows the three most recent items and automatically drops anything older than about 3 months.

## How "Save" works

Every time you click **Save**, the CMS commits your edit to a behind-the-scenes branch called `cms-staging`. **The change is recorded but not yet visible on the live site.** This lets you make a series of edits in one sitting without each one immediately going live — useful for typo fixes, preview-and-revise cycles, or batches of related updates.

To make your accumulated edits visible to the public, use the **Publish Changes** button (see below).

## Publishing your edits

When you've finished a batch of edits and want them on the live site, click **Publish Changes** in the bar at the top of the CMS. That's it — the publish workflow test-builds the site with your edits, publishes them, and rebuilds the staging site (2-3 min in total). If the build fails, nothing is published; email Danielle.

If the button is ever missing or you want to watch the run, the same workflow can be started (and followed) from GitHub directly:

1. Open https://github.com/d3i-website/d3i-website.github.io/actions/workflows/publish-cms-edits.yml in your browser.
2. Click **Run workflow** (green button, top right of the list), then **Run workflow** again to confirm. Completed runs are listed on that same page — a red ✗ means the build failed and nothing was published; email Danielle with a link to it.

Want to double-check what's going out first? Open https://github.com/d3i-website/d3i-website.github.io/compare/main...cms-staging to see every edit made since the last publication, then run the workflow when satisfied. If anything looks wrong in that diff, **don't publish** — email Danielle and describe what's off. She can help identify the issue or revert problem edits before publishing.

After publishing, Danielle takes care of resetting `cms-staging` so the next session starts from a fresh baseline. If you ever come back and the compare view shows confusing "X commits ahead" with no real changes, that means the reset hasn't happened yet — email her to nudge.

## Is the site rebuilding?

After you publish (squash-merge the PR), the site takes about 1-2 minutes to rebuild.

- **Staging URL**: https://d3i-website.github.io/
- **Build status page**: https://github.com/d3i-website/d3i-website.github.io/actions

Green check = built successfully, your change is live on staging.
Red X = build failed. Email Danielle with a screenshot.

## Production (datadonation.eu)

After staging looks good, Danielle approves the production deployment to push your changes to datadonation.eu. The deploy workflow waits for her approval — until she clicks Approve in GitHub Actions, datadonation.eu shows the previous version. Tell her when you're ready.

## Three things to know

1. **Placeholders like `{{ site.phd_network_signup_url }}` or `{% include ... %}` are code.** You'll see them in some prose fields. Leave them exactly as-is — don't reformat or delete them.

2. **Some fields are hidden on purpose.** The CMS hides things like page URLs and layout names because changing them would break the site. If you think you need to change one, ask Danielle.

3. **Nothing is ever truly lost.** Every edit is tracked in git. If you accidentally delete something important, email Danielle — she can restore it.

## Renewing your token (once a year)

GitHub access tokens expire after a year. About a week before yours expires, you'll get an email from GitHub. To renew:

1. Go back to https://github.com/settings/tokens?type=beta.
2. Click your existing **D3I CMS** token.
3. Click **Regenerate token** and pick a new 1-year expiration.
4. Copy the new token and update it in your password manager (replacing the old one).
5. Open the CMS, log out, log back in with the new token.

If you forget to renew before the old one expires, the CMS will simply reject your login when you next visit. Generate a new token following the original "First-time setup" steps. Old tokens revoke automatically; nothing breaks on the site.

## When something breaks

Email Danielle: danielle.mccool@gmail.com

Include:
- What you were trying to do
- What happened instead
- A screenshot if possible

## Things this guide doesn't cover

For anything not listed here, see Sveltia CMS's own documentation: https://docs.sveltia.com/

Or ask Danielle.
