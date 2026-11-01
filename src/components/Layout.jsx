"use client";
import { useLocation } from "@/lib/router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { QuoteModal } from "./QuoteModal";
import { BackToTop } from "./BackToTop";
import { CTA } from "./CTA";
import { SaturnDecor } from "./SaturnDecor";
import { useApp } from "../context/AppContext";
import { JsonLd } from "./Seo";
import { SITE_URL } from "../theme";
import { localize } from "../lib/i18n";
import { translations } from "../translations";
import { getProjectBySlug } from "../data/projects";

const LEGAL = {
  "/privacy-policy": { en: "Privacy Policy", sr: "Politika privatnosti" },
  "/cookie-policy": { en: "Cookie Policy", sr: "Politika kolačića" },
  "/terms": { en: "Terms and Conditions", sr: "Uslovi korišćenja" },
};

// BreadcrumbList structured data: Home > Section (> Project)
function breadcrumbs(pathname, lang, t) {
  if (pathname === "/") return null;
  const abs = (p) => {
    const l = localize(p, lang);
    return l === "/" ? `${SITE_URL}/` : `${SITE_URL}${l}`;
  };
  const navPaths = translations.en.navPaths;
  const [, first, slug] = pathname.split("/");
  if (first === "blog" && slug) return null; // blog posts emit their own trail
  const section = `/${first}`;
  const i = navPaths.indexOf(section);
  const sectionName = i >= 0 ? t.nav[i] : LEGAL[section]?.[lang];
  if (!sectionName) return null;
  const items = [
    { name: t.nav[0], url: abs("/") },
    { name: sectionName, url: abs(section) },
  ];
  const project = slug && getProjectBySlug(slug);
  if (project) items.push({ name: project.title, url: abs(pathname) });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, n) => ({
      "@type": "ListItem",
      position: n + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

const CTA_ROUTES = [
  "/about",
  "/services",
  "/ai-consulting",
  "/packages",
  "/ecommerce",
  "/portfolio",
  "/blog",
  "/privacy-policy",
  "/cookie-policy",
  "/terms",
];

export function Layout({ children, notFound = false }) {
  const { t, lang, setLang, openQuote, closeQuote, quoteOpen, quotePreset } = useApp();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  // "Ready to launch" banner above the footer on inner pages. Home and
  // /contact end with the contact form instead; 404 gets neither.
  const showCta =
    !notFound && CTA_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`));
  const crumbs = notFound ? null : breadcrumbs(pathname, lang, t);
  return (
    <>
      {crumbs && <JsonLd data={crumbs} />}
      {!isHome && (
        <SaturnDecor
          className="saturn-fixed"
          style={{ position: "absolute", top: 110, right: 60, zIndex: 5 }}
        />
      )}
      <Header
        t={t}
        currentLang={lang}
        onLangChange={setLang}
        onQuote={openQuote}
      />
      <main>{children}</main>
      {showCta && <CTA t={t} />}
      <Footer t={t} />
      <QuoteModal t={t} open={quoteOpen} preset={quotePreset} onClose={closeQuote} />
      <BackToTop />
    </>
  );
}
