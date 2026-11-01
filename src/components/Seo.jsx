"use client";
// Title, description, canonical, hreflang and Open Graph tags are generated at
// build time by the Next.js Metadata API (src/lib/seo.js). This component only
// emits the page's JSON-LD structured data into the static HTML — with page
// URLs pointing at the current language version and `inLanguage` set.
import { useApp } from "../context/AppContext";
import { SITE_URL } from "../theme";
import { localize } from "../lib/i18n";

// entities that are the same in both languages keep their root URL
const GLOBAL_TYPES = new Set(["Organization", "WebSite", "ProfessionalService", "Person", "PostalAddress"]);

function localizeNode(node, lang) {
  if (!node || typeof node !== "object" || Array.isArray(node)) return node;
  const out = { ...node };
  const isPage = out["@type"] && !GLOBAL_TYPES.has(out["@type"]);
  if (isPage && typeof out.url === "string" && out.url.startsWith(SITE_URL)) {
    const path = out.url.slice(SITE_URL.length) || "/";
    const loc = localize(path, lang);
    out.url = loc === "/" ? `${SITE_URL}/` : `${SITE_URL}${loc}`;
  }
  if (isPage && !out.inLanguage) out.inLanguage = lang === "sr" ? "sr-RS" : "en-US";
  return out;
}

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function Seo({ jsonLd }) {
  const { lang } = useApp();
  if (!jsonLd) return null;
  const data = jsonLd["@graph"]
    ? { ...jsonLd, "@graph": jsonLd["@graph"].map((n) => localizeNode(n, lang)) }
    : localizeNode(jsonLd, lang);
  return <JsonLd data={data} />;
}
