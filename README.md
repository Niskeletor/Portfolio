# Pablo Alejandro Nistal — Portfolio

Personal portfolio for Pablo Alejandro Nistal, DevOps Architect / SRE / Platform Engineer based in A Coruña, Spain.

[![Deploy](https://github.com/niskeletor/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/niskeletor/portfolio/actions/workflows/deploy.yml)

## Stack

- **Framework:** Astro 6
- **Styles:** Tailwind CSS 4
- **Content:** MDX + Astro Content Collections (Content Layer API)
- **i18n:** EN (default `/`) + ES (`/es/`)
- **Deploy:** Cloudflare Pages via GitHub Actions

## Local dev

```bash
npm install
npm run dev
# → http://localhost:4321
```

## Structure

- `/` — English (default)
- `/es/` — Spanish
- `/blog/` — Technical blog
- `/case-studies/` — Deep dives

## Adding content

**Blog post (EN):** `src/content/blog/en/<slug>.mdx`
**Blog post (ES):** `src/content/blog/es/<slug>.mdx`
**Case study (EN):** `src/content/case-studies/en/<slug>.mdx`

Set `draft: false` to publish.

## Deploy secrets (GitHub → Settings → Secrets)

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
