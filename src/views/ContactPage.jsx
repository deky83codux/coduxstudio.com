"use client";
import { PageHero } from "../components/PageHero";
import { Contact } from "../components/Contact";
import { Seo } from "../components/Seo";
import { T, SITE_URL } from "../theme";
import { useApp } from "../context/AppContext";

const COPY = {
  en: {
    title: "Contact Codux Studio",
    desc: "Have a project in mind? Send us a brief and we'll get back to you within 24 hours. The first consultation is free.",
  },
  sr: {
    title: "Kontakt — Codux Studio",
    desc: "Imate projekat u planu? Pošaljite nam kratak opis i javljamo se u roku od 24h. Prva konsultacija je besplatna.",
  },
};

export function ContactPage() {
  const { t, lang } = useApp();
  const copy = COPY[lang];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: copy.title,
    url: `${SITE_URL}/contact`,
    description: copy.desc,
    mainEntity: {
      "@type": "Organization",
      name: "Codux Studio",
      email: "info@coduxstudio.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Belgrade",
        addressCountry: "RS",
      },
    },
  };
  return (
    <>
      <Seo
        title={`${copy.title}`}
        description={copy.desc}
        path="/contact"
        lang={lang}
        jsonLd={jsonLd}
      />
      <PageHero
        tag={t.contact.tag}
        title={copy.title}
        desc={copy.desc}
        color={T.accent}
      />
      <Contact t={t} head={false} />
    </>
  );
}
