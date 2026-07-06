# Prime Time Pressure Washing — Website

A Jekyll site for Prime Time Pressure Washing (owner: Sarha Nicholson), built in the
same visual style/architecture as the Chris Hirsh Missions and Learning Life sites —
fully mobile-responsive, GitHub Pages-ready.

## Running locally

```bash
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000

## Deploying on GitHub Pages

1. Create a new GitHub repo (e.g. `primetimepressurewashing`).
2. Push all these files to the `main` branch.
3. In the repo, go to **Settings → Pages**, and set the source to the `main`
   branch (root folder).
4. If you have a custom domain, add a `CNAME` file to the repo root containing
   just your domain (e.g. `primetimepressurewashing.com`) and update `url:` in
   `_config.yml` to match. Otherwise your site will be live at
   `https://YOUR-GITHUB-USERNAME.github.io/REPO-NAME/` — in that case also set
   `baseurl: "/REPO-NAME"` in `_config.yml`.

## Things to customize before going live

Search the project for these placeholders and replace them:

- **`_config.yml`** — `url`, `email`
- **`pages/payment.html`** — `REPLACE_WITH_PAYPAL_USERNAME`, `REPLACE_WITH_VENMO_USERNAME`,
  `REPLACE_WITH_CASHTAG` (your real PayPal.me, Venmo, and Cash App handles)
- **`pages/quote.html`** — `REPLACE_WITH_PHONE`, `REPLACE_WITH_EMAIL@example.com`,
  `YOUR_FORMSPREE_ID` (sign up free at formspree.io to make the contact form actually
  send you emails), `REPLACE_WITH_FACEBOOK`
- **`_includes/footer.html`** — `REPLACE_WITH_FACEBOOK`, `REPLACE_WITH_INSTAGRAM`
- **`pages/gallery.html`** — `REPLACE_WITH_YOUTUBE_VIDEO_ID`, `REPLACE_WITH_FACEBOOK_VIDEO_URL`,
  and the testimonial placeholders (swap in real customer reviews)

## Swapping in real photos

All images currently in `assets/images/` are placeholder graphics (labeled SVGs) so the
site works immediately and looks good in a browser. Replace them with real photos —
keep the same filenames, or update the `src` paths in the HTML if you rename them:

- `hero-pressure.svg` — homepage hero background (wide action shot works best)
- `about-owner.svg` — a photo of Sarha
- `gallery-lead.svg` — your best single before/after or job photo
- `before-driveway.svg` / `after-driveway.svg` (and the matching `-siding`,
  `-sidewalk`, `-deck` pairs) — real before/after photo pairs for each service
- `verse-banner.svg`, `og-card.svg`, `quote-block.svg` — background/social-share images
- `favicon.svg` — the small icon shown in browser tabs

Photos work best around these sizes (they'll auto-crop to fit, so exact pixel
dimensions aren't critical):
- Hero background: ~1800×1200
- Before/after photos: ~900×900 (square) or similar per photo
- About/owner photo: ~1000×1200 (portrait)

## Adding a blog or more pages

To add a new page, copy any file from `pages/`, change the `title` and `permalink`
in the front matter, and add a link to it in `_includes/nav.html` and
`_includes/mobile-nav.html`.

## Pricing shown on the site

The Services & Pricing page (`pages/services.html`) currently reflects:

- Trash can cleaning — $10 each
- Car / SUV wash — $40 each
- Sidewalk cleaning — $75 per 100 ft
- House siding — starting at $0.30/sq ft
- Concrete / patios — starting at $0.30/sq ft
- Driveways — custom quote (sized individually)

Update the numbers in `pages/services.html` any time your pricing changes.
