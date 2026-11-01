"use client";
import { PageHero } from "../components/PageHero";
import { Services } from "../components/Services";
import { Seo } from "../components/Seo";
import { T, SITE_URL } from "../theme";
import { useApp } from "../context/AppContext";

const COPY = {
  en: {
    title: "Web Development, Marketing & Design Services",
    desc: "We deliver web development, digital marketing and UI/UX design — built end-to-end with the same team that designs, ships and maintains the result.",
  },
  sr: {
    title: "Usluge: web development, marketing i dizajn",
    desc: "Pružamo usluge web developmenta, digitalnog marketinga i UI/UX dizajna — sve od početka do kraja radi isti tim koji dizajnira, isporučuje i održava rešenje.",
  },
};

export function ServicesPage() {
  const { t, lang } = useApp();
  const copy = COPY[lang];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.title,
    itemListElement: t.services.items.map((it, i) => ({
      "@type": "Service",
      position: i + 1,
      name: it.title,
      description: it.desc,
      provider: { "@type": "Organization", name: "Codux Studio" },
      areaServed: ["RS", "EU", "US"],
    })),
  };
  return (
    <>
      <Seo
        title={`${copy.title} — Codux Studio`}
        description={copy.desc}
        path="/services"
        lang={lang}
        jsonLd={jsonLd}
      />
      <PageHero
        tag={t.services.tag}
        title={copy.title}
        desc={copy.desc}
        color={T.accent}
      />
      <Services t={t} head={false} />
    </>
  );
}
