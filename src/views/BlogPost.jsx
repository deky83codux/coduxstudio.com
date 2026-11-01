"use client";
import { useEffect, useState } from "react";
import { JsonLd } from "../components/Seo";
import { Link } from "@/lib/router";
import { AnimButton } from "../components/Buttons";
import { T, SITE_URL } from "../theme";
import { useApp } from "../context/AppContext";
import { localize } from "@/lib/i18n";
import { CATEGORY_COLORS, CATEGORY_LABELS, formatDate } from "@/lib/blogMeta";
import { PostCard } from "./BlogIndex";
import { ParticlesCanvas } from "../components/ParticlesCanvas";

const COPY = {
  en: {
    back: "All articles",
    read: "min read",
    updated: "Updated",
    toc: "On this page",
    ctaTitle: "Planning a project?",
    ctaBody: "Tell us what you're building — you'll get a clear plan and a fixed quote. The first consultation is free.",
    ctaBtn: "Get a quote",
    related: "Keep reading",
    home: "Home",
    blog: "Blog",
  },
  sr: {
    back: "Svi tekstovi",
    read: "min čitanja",
    updated: "Ažurirano",
    toc: "Na ovoj stranici",
    ctaTitle: "Planirate projekat?",
    ctaBody: "Recite nam šta pravite — dobićete jasan plan i fiksnu ponudu. Prva konsultacija je besplatna.",
    ctaBtn: "Zatražite ponudu",
    related: "Pročitajte još",
    home: "Početna",
    blog: "Blog",
  },
};

export function BlogPost({ post, related = [] }) {
  const { lang, openQuote } = useApp();
  const c = COPY[lang];
  const color = CATEGORY_COLORS[post.category] || T.accent;
  const url = `${SITE_URL}${localize(`/blog/${post.slug}`, lang)}`;
  const [activeId, setActiveId] = useState(post.toc[0]?.id);

  // highlight the section being read in the table of contents
  useEffect(() => {
    const heads = post.toc.map((h) => document.getElementById(h.id)).filter(Boolean);
    if (!heads.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActiveId(vis[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [post.toc]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated || post.date,
        inLanguage: lang === "sr" ? "sr-RS" : "en-US",
        mainEntityOfPage: url,
        url,
        image: `${SITE_URL}${post.image || "/og-image.jpg"}`,
        keywords: post.tags.join(", "),
        author: { "@type": "Organization", name: post.author, url: `${SITE_URL}/` },
        publisher: { "@id": `${SITE_URL}/#organization`, "@type": "Organization", name: "Codux Studio", logo: `${SITE_URL}/android-chrome-512x512.png` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: c.home, item: `${SITE_URL}${lang === "sr" ? "/sr" : "/"}` },
          { "@type": "ListItem", position: 2, name: c.blog, item: `${SITE_URL}${localize("/blog", lang)}` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      {/* same hero as the other inner pages: particles + Saturn, colour of the category */}
      {/* the left-aligned title would run into Saturn on narrower screens */}
      <style>{"@media (max-width:1360px){.saturn-fixed{display:none!important}}"}</style>
      <header className="bp-hero" style={{ "--c": color }}>
        <ParticlesCanvas />
        <div className="bp-hero-inner hero-in" style={{ "--y": "24px" }}>
          <Link to="/blog" className="bp-back">
            ← {c.back}
          </Link>
          <span className="bl-cat">{CATEGORY_LABELS[lang][post.category] || post.category}</span>
          <h1 className="bp-title">{post.title}</h1>
          <p className="bp-lead">{post.description}</p>
          <div className="bl-meta">
            <span>{post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
            {post.updated && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  {c.updated} <time dateTime={post.updated}>{formatDate(post.updated, lang)}</time>
                </span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>
              {post.readingMinutes} {c.read}
            </span>
          </div>
        </div>
      </header>

      <div className="bp-layout">
        <article className="bl-prose" style={{ "--c": color }} dangerouslySetInnerHTML={{ __html: post.html }} />
        <aside className="bp-aside">
          {post.toc.length > 1 && (
            <nav className="bp-toc" aria-label={c.toc}>
              <span>{c.toc}</span>
              <ol>
                {post.toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className={activeId === h.id ? "is-on" : ""} style={{ "--c": color }}>
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <div className="bp-cta">
            <strong>{c.ctaTitle}</strong>
            <p>{c.ctaBody}</p>
            <AnimButton onClick={() => openQuote()} style={{ width: "100%", justifyContent: "center" }}>
              {c.ctaBtn}
            </AnimButton>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="bl-wrap bp-related">
          <h2 className="bp-related-title">{c.related}</h2>
          <div className="bl-grid">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} lang={lang} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
