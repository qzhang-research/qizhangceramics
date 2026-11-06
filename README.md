# Qi Zhang · Ceramics

A plain HTML/CSS site, no build step. Hosted on GitHub Pages.

## Pages

- `index.html` home, two images that swap one at a time
- `work.html` artist statement, Sculptural and Functional grids, enlarged view
- `about.html` bio
- `contact.html` email, Instagram, studio

## Common edits

**Add or change a piece.** Put a square-ish photo in `images/thumbs/` (800 px) and a larger copy in `images/large/` (about 1600 px), then add an entry to `js/works.js`. Fill in `year`, `material` and `size`. Empty values are hidden.

**Change the home page images.** Put square images (about 1000 px) in `images/home/` and edit `HOME_IMAGES` at the bottom of `js/works.js`.

**Change text.** Edit the HTML file for that page.

## Publish on GitHub Pages

1. Create a repository (for example `qiscake.github.io`) and upload everything in this folder.
2. In the repository, open Settings → Pages, set Source to "Deploy from a branch", branch `main`, folder `/ (root)`.
3. The site appears at `https://<username>.github.io/` within a minute or two.

## Custom domain (later)

1. Buy the domain from a registrar (Cloudflare, Porkbun, Namecheap).
2. In Settings → Pages, enter the domain under Custom domain. GitHub adds a `CNAME` file.
3. At the registrar, add DNS records: four `A` records for the bare domain pointing to
   185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153,
   and a `CNAME` record for `www` pointing to `<username>.github.io`.
4. Once it resolves, tick "Enforce HTTPS".
5. Verify the domain in your GitHub account settings (Settings → Pages → Verified domains).
