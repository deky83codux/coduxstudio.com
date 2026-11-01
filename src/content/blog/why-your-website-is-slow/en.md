---
title: "Why your website is slow — and what it costs you"
description: "Core Web Vitals in plain language: what makes a site slow, how speed affects Google and conversions, and the fixes that make the biggest difference."
date: 2026-10-14
category: web
cover: speed
image: /blog/speed.jpg
tags: [performance, Core Web Vitals, SEO]
author: Codux Studio
---

A slow website rarely fails loudly. Nobody sends you an email saying "your homepage took six seconds, so I left". Visitors simply go back to Google and click the next result — and you never find out they were there.

Here's what actually makes sites slow, how Google measures it, and which fixes are worth your money.

## How Google measures speed: Core Web Vitals

Google looks at three numbers, collected from real Chrome users visiting your site:

| Metric | What it measures | Good |
|---|---|---|
| **LCP** — Largest Contentful Paint | How fast the main content (hero image or headline) appears | under 2.5 s |
| **INP** — Interaction to Next Paint | How quickly the page reacts when you tap or click | under 200 ms |
| **CLS** — Cumulative Layout Shift | How much the page jumps around while loading | under 0.1 |

These are part of Google's page experience signals. They won't push a weak page to the top — relevant, useful content still matters most — but between two similar pages, the faster one has the edge. And speed affects something even more direct: whether visitors stay long enough to contact you.

## The usual suspects

**1. Oversized images.** The most common problem we see. A 4000-pixel photo straight from the camera, shown at 600 pixels wide. Modern formats (WebP, AVIF) and correctly sized images often cut page weight in half on their own.

**2. Too many plugins and scripts.** Every slider, chat widget, tracking pixel and "just one more" plugin adds JavaScript the browser has to download and run before the page responds. Many sites carry scripts for features nobody uses anymore.

**3. Heavy page builders and themes.** Multipurpose themes load code for hundreds of layouts so they can sell to everyone. Your site uses five of them, but visitors download all of it.

**4. Slow hosting.** If the server takes a second just to start responding, no front-end optimisation can win that time back. Cheap shared hosting is often the bottleneck.

**5. Fonts and layout shifts.** Web fonts loaded from third parties, images without set dimensions and banners injected late make the page jump — that's your CLS.

## How to check your own site

1. Open [PageSpeed Insights](https://pagespeed.web.dev) and test your homepage and one important inner page, **on mobile**.
2. Look at the top section first — "Discover what your real users are experiencing". That's real-world data; the score below is a lab simulation.
3. In Google Search Console, the *Core Web Vitals* report shows which groups of pages fail and why.

Don't chase a perfect 100. Aim for all three metrics in the green for real users.

## Fixes that make the biggest difference

- **Compress and resize images**, serve WebP/AVIF, and lazy-load everything below the fold.
- **Remove what you don't use**: plugins, old tracking scripts, unused fonts and font weights.
- **Use caching and a CDN** so pages are served from close to the visitor.
- **Set image and video dimensions** so the layout doesn't shift.
- **Upgrade hosting** if server response time is the issue — it's often the cheapest big win.
- **Rebuild the front end** when the theme itself is the problem. A lean custom theme or a static framework like Next.js removes most of the weight at the source.

The last one sounds drastic, but sometimes it's the only fix that lasts. Optimising a heavy multipurpose theme is like putting a spoiler on a truck. We cover the trade-offs in [WordPress or a custom-built website](/blog/wordpress-vs-custom-website).

## When it's worth calling a developer

If your site fails Core Web Vitals on mobile, runs on a multipurpose theme with a page builder, and your team is afraid to update plugins — the problem isn't one setting. It's the foundation.

That's the kind of work we do in our [web development](/services#web-development) projects: a fast, clean front end, built to pass Core Web Vitals from day one. Want a quick second opinion on your site? [Send us the link](/contact) — the first consultation is free.
