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

You'll see a left sidebar listing everything you can edit:

- **Team** — add, edit, or remove people on the Team page.
- **Institutional Network**, **Advisory Board**, **Funding**, **Partners**, **Courses**, **Completed projects**, **Newsletters**, **Past events (external)** — structured data shown on each matching site page.
- **Pages** — the intro prose and structured content for About → Team, About → Impact and adoption, and Community → Networks.
- **Symposia (D3I-hosted)** — create new symposium event pages; edit existing ones.
- **Navigation** — rename and reorder items in the site menu.

## Common tasks

### Add a team member

1. Dashboard → Team → Team members.
2. Click the **+** button on the Members list.
3. Fill in Name, Role / title, Group (dropdown), Photo (upload), and optional Profile URL.
4. Click **Save** at the top.

This stores your edit on the `cms-staging` branch — it's saved, but not yet visible on the site. Continue editing as much as you want; everything accumulates there. When you're ready for the public to see your changes, follow "Publishing your edits" below.

### Edit the Team page intro

1. Dashboard → Pages → About → Team.
2. Edit the **Intro prose** markdown field.
3. Click **Save**.

### Add a new symposium

1. Dashboard → Symposia (D3I-hosted).
2. Click **New Symposium**.
3. Fill in Title, Start date, End date, Location, Summary, optional External URL and details/actions.
4. Write the full event page content in the **Full event page content** field.
5. Click **Save**.

## How "Save" works

Every time you click **Save**, the CMS commits your edit to a behind-the-scenes branch called `cms-staging`. **The change is recorded but not yet visible on the live site.** This lets you make a series of edits in one sitting without each one immediately going live — useful for typo fixes, preview-and-revise cycles, or batches of related updates.

The CMS doesn't have a separate "Publish" button. To make your accumulated edits visible to the public, you do the publishing step on GitHub (see below).

## Publishing your edits

When you've finished a batch of edits and want them on the live site:

1. Open https://github.com/d3i-website/d3i-website.github.io/compare/main...cms-staging in your browser.
2. You'll see a list of every edit you (or anyone else editing the CMS) has made since the last publication. Scan it to confirm everything looks right.
3. Click **Create pull request**. Add a brief title (e.g., "Update Team page and add March symposium") and click Create.
4. On the new PR page, click **Squash and merge**. Confirm.
5. Done. The site will rebuild automatically (1-2 min). The cumulative batch lands on `main` as a single clean commit.

If anything looks wrong in the diff, **don't merge** — email Danielle and describe what's off. She can help identify the issue or revert problem edits before publishing.

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
