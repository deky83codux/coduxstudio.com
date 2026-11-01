# Codux Studio — Next.js

Static Next.js (App Router) version of coduxstudio.com. Same design, components
and effects as the Vite site, but every page — in both languages — is
pre-rendered to real HTML with its own title, description, canonical, hreflang
and JSON-LD.

## Commands

```bash
yarn install
yarn dev      # http://localhost:3000
yarn build    # static site in ./out
yarn start    # serve ./out locally
```

## Deploy

Upload the **contents of `out/`** to the web root (same hosting as before).
`public/.htaccess` is copied into `out/` and handles clean URLs
(`/about` -> `about.html`), trailing-slash removal, HTTPS/non-www and the 404 page.

## URLs

| English          | Serbian             |
| ---------------- | ------------------- |
| `/`              | `/sr`               |
| `/about`         | `/sr/about`         |
| `/portfolio/:slug` | `/sr/portfolio/:slug` |
| … every page     | `/sr/…`             |

The EN/SR switch in the header navigates between the two URLs.
`/sitemap.xml` (both languages + hreflang) and `/robots.txt` are generated at build time.

## Structure

- `src/app/(en)/…` — English routes, root layout with `<html lang="en">`
- `src/app/(sr)/sr/…` — Serbian routes, root layout with `<html lang="sr">`
- `src/app/global-not-found.jsx` — 404 page
- `src/app/globals.css` — all global styles (was `GlobalStyles.jsx`)
- `src/lib/seo.js` — page titles/descriptions + metadata builder
- `src/lib/i18n.js` — `/sr` path helpers
- `src/lib/router.jsx` — `Link` / `NavLink` / `useLocation` on top of next/link (keeps links in the current language)
- `src/views/` — page components (same as `src/pages` in the Vite project)
- `src/components/`, `src/data/`, `src/translations.js` — unchanged from the Vite project

## Blog

Posts live in `src/content/blog/<slug>/en.md` and/or `sr.md` (a post can exist in one language only — hreflang is added only when both exist).

```md
---
title: "Post title"
description: "Up to ~155 characters — used for Google and social previews."
date: 2026-10-14
updated: 2026-11-02      # optional
category: web            # web | design | marketing | ai | ecommerce
tags: [WordPress, SEO]
author: Codux Studio
draft: true              # optional — hidden until removed
---

Text in Markdown. Use `## Heading` for sections (they form the table of contents).
Internal links like [packages](/packages) automatically point to /sr/... on Serbian posts.
```

Run `npm run build` — the post, the blog list, the sitemap and structured data update automatically.

## Case studies

Add an optional `caseStudy` object to a project in `src/data/projects.js` (format described at the top of that file) to show Challenge / What we did / Results / client quote on its portfolio page.
