"use client";
import { useMemo, useState } from "react";
import { PostCover } from "../components/blog/Covers";
import { PageHero } from "../components/PageHero";
import { Seo } from "../components/Seo";
import { Link } from "@/lib/router";
import { T, SITE_URL } from "../theme";
import { useApp } from "../context/AppContext";
import { CATEGORY_COLORS, CATEGORY_LABELS, formatDate } from "@/lib/blogMeta";

const COPY = {
  en: {
    tag: "Blog",
    title: "Notes from the launch pad",
    desc: "Practical guides on websites, web apps, e-commerce and AI automation — what we've learned building them for clients.",
    read: "min read",
    more: "Read article",
    empty: "No articles in this category yet.",
  },
  sr: {
    tag: "Blog",
    title: "Beleške sa lansirne rampe",
    desc: "Praktični vodiči o sajtovima, web aplikacijama, online prodaji i AI automatizaciji — ono što smo naučili praveći ih za klijente.",
    read: "min čitanja",
    more: "Pročitajte tekst",
    empty: "U ovoj kategoriji još nema tekstova.",
  },
};

export function PostCard({ post, lang, big = false }) {
  const c = COPY[lang];
  const color = CATEGORY_COLORS[post.category] || T.accent;
  const [hov, setHov] = useState(false);
  return (
    <article
      className={`bl-card ${big ? "is-big" : ""}`}
      style={{ "--c": color }}
      onPointerEnter={() => setHov(true)}
      onPointerLeave={() => setHov(false)}
    >
      <Link to={`/blog/${post.slug}`} className="bl-card-link">
        <PostCover post={post} active={hov} big={big} color={color} />
        <div className="bl-card-body">
          <span className="bl-cat">{CATEGORY_LABELS[lang][post.category] || post.category}</span>
          <h2 className="bl-card-title">{post.title}</h2>
          <p className="bl-card-desc">{post.description}</p>
          <div className="bl-meta">
            <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
            <span aria-hidden="true">·</span>
            <span>
              {post.readingMinutes} {c.read}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function BlogIndex({ posts }) {
  const { lang } = useApp();
  const c = COPY[lang];
  const [cat, setCat] = useState("all");
  const cats = useMemo(() => ["all", ...new Set(posts.map((p) => p.category))], [posts]);
  const list = cat === "all" ? posts : posts.filter((p) => p.category === cat);
  const [first, ...rest] = list;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Codux Studio — ${c.tag}`,
    url: `${SITE_URL}/blog`,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      datePublished: p.date,
      url: `${SITE_URL}${lang === "sr" ? "/sr" : ""}/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <Seo jsonLd={jsonLd} />
      <PageHero tag={c.tag} title={c.title} desc={c.desc} color={T.accentLight} />
      <section className="bl-wrap">
        {cats.length > 2 && (
          <div className="bl-filters" role="tablist">
            {cats.map((k) => (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={cat === k}
                className={`bl-filter ${cat === k ? "is-on" : ""}`}
                style={{ "--c": CATEGORY_COLORS[k] || T.accentLight }}
                onClick={() => setCat(k)}
              >
                {CATEGORY_LABELS[lang][k] || k}
              </button>
            ))}
          </div>
        )}
        {!first && <p className="bl-empty">{c.empty}</p>}
        {first && <PostCard post={first} lang={lang} big />}
        {rest.length > 0 && (
          <div className="bl-grid">
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} lang={lang} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
