"use client";
import { PageHero } from "../components/PageHero";
import { PackagesDetail } from "../components/PackagesDetail";
import { Seo } from "../components/Seo";
import { T } from "../theme";
import { useApp } from "../context/AppContext";

const COPY = {
  en: {
    title: "Packages: Websites, Web Apps, AI, Design & Marketing",
    desc: "Five ways to work with us — a custom WordPress site, a web application, an AI readiness audit, a design system or a marketing strategy. Every project gets a fixed quote after a free consultation.",
  },
  sr: {
    title: "Paketi: sajtovi, web aplikacije, AI, dizajn i marketing",
    desc: "Pet načina saradnje — custom WordPress sajt, web aplikacija, AI audit, dizajn sistem ili marketing strategija. Svaki projekat dobija fiksnu ponudu posle besplatne konsultacije.",
  },
};

export function PackagesPage() {
  const { t, lang, openQuote } = useApp();
  const copy = COPY[lang];
  return (
    <>
      <Seo
        title={`${copy.title} — Codux Studio`}
        description={copy.desc}
        path="/packages"
        lang={lang}
      />
      <PageHero
        tag={t.packages.tag}
        title={copy.title}
        desc={copy.desc}
        color={T.green}
      />
      <PackagesDetail t={t} onQuote={openQuote} />
    </>
  );
}
