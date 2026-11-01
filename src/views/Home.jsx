"use client";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { AIPromo } from "../components/AIPromo";
import { Packages } from "../components/Packages";
import { Portfolio } from "../components/Portfolio";
import { Contact } from "../components/Contact";
import { Seo } from "../components/Seo";
import { SITE_URL } from "../theme";
import { useApp } from "../context/AppContext";

export function Home() {
  const { t, lang, openQuote } = useApp();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Codux Studio",
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/android-chrome-512x512.png`,
        email: "info@coduxstudio.com",
        vatID: "115901203",
        identifier: { "@type": "PropertyValue", name: "MB", value: "68731640" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "info@coduxstudio.com",
          availableLanguage: ["English", "Serbian"],
        },
        description:
          "Web development, digital marketing and UI/UX design agency based in Belgrade, Serbia.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Belgrade",
          addressCountry: "RS",
        },
        areaServed: ["RS", "EU", "US"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Codux Studio",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: lang === "sr" ? "sr-RS" : "en-US",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        name: "Codux Studio",
        email: "info@coduxstudio.com",
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/og-image.jpg`,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Belgrade",
          addressCountry: "RS",
        },
        areaServed: ["RS", "EU", "US"],
      },
    ],
  };
  return (
    <>
      <Seo
        title="Codux Studio — Web Development, Digital Marketing & UI/UX Design Agency"
        description="Codux Studio — a web development and digital marketing agency building modern, fast, conversion-focused, and SEO-optimized websites and e-commerce platforms. Belgrade, Serbia."
        path="/"
        lang={lang}
        jsonLd={jsonLd}
      />
      <Hero t={t} />
      <Services t={t} />
      <Packages t={t} onQuote={openQuote} />
      <Portfolio t={t} lang={lang} />
      <AIPromo t={t} />
      <Contact t={t} />
    </>
  );
}
