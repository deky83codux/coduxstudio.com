"use client";
import { PageHero } from "../components/PageHero";
import { PortfolioList } from "../components/PortfolioList";
import { AIPromo } from "../components/AIPromo";
import { Seo } from "../components/Seo";
import { T, SITE_URL } from "../theme";
import { useApp } from "../context/AppContext";
import { projects } from "../data/projects";

const COPY = {
  en: {
    title: "Portfolio — Selected Projects",
    desc: "Selected work delivered for clients across engineering, logistics, hospitality, e-commerce and creative industries — each built end-to-end by our team.",
  },
  sr: {
    title: "Portfolio — Odabrani projekti",
    desc: "Odabrani projekti realizovani za klijente iz inženjerstva, logistike, ugostiteljstva, e-commerce i kreativnih industrija — sve radi naš tim, od početka do kraja.",
  },
};

export function PortfolioPage() {
  const { t, lang } = useApp();
  const copy = COPY[lang];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: copy.title,
    description: copy.desc,
    url: `${SITE_URL}/portfolio`,
    hasPart: projects.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      url: `${SITE_URL}/portfolio/${p.slug}`,
      image: `${SITE_URL}${p.img}`,
    })),
  };
  return (
    <>
      <Seo
        title={`${copy.title} — Codux Studio`}
        description={copy.desc}
        path="/portfolio"
        lang={lang}
        jsonLd={jsonLd}
      />
      <PageHero
        tag={t.portfolio.tag}
        title={copy.title}
        desc={copy.desc}
        color={T.orange}
      />
      <PortfolioList t={t} lang={lang} />
      <AIPromo t={t} />
    </>
  );
}
