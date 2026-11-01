// Build-time SEO: per-page titles/descriptions plus canonical, hreflang
// alternates, Open Graph and Twitter tags for both languages.
import { SITE_URL } from "../theme";
import { translations } from "../translations";
import { getProjectBySlug } from "../data/projects";
import { localize } from "./i18n";

const legal = {
  privacy: {
    en: ["Privacy Policy", "Privacy Policy for Codux Studio — how we collect, use, and protect your personal data."],
    sr: ["Politika privatnosti", "Politika privatnosti Codux Studio — kako prikupljamo, koristimo i štitimo vaše lične podatke."],
  },
  cookies: {
    en: ["Cookie Policy", "Cookie Policy for Codux Studio — how we use cookies and how you can manage them."],
    sr: ["Politika kolačića", "Politika kolačića Codux Studio — kako koristimo kolačiće i kako njima možete upravljati."],
  },
  terms: {
    en: ["Terms and Conditions", "Terms and Conditions governing the use of Codux Studio's website and services."],
    sr: ["Uslovi korišćenja", "Uslovi korišćenja koji regulišu upotrebu sajta i usluga Codux Studio."],
  },
};

/** route key -> path + (lang) => [title, description] */
export const PAGES = {
  home: {
    path: "/",
    copy: {
      en: [
        "Codux Studio — Web Development, Marketing & UI/UX Design",
        "Belgrade web studio building fast, SEO-optimized websites, web apps, WooCommerce stores and AI automation for clients across Europe and the US.",
      ],
      sr: [
        "Codux Studio — izrada sajtova, digitalni marketing i dizajn",
        "Studio iz Beograda: brzi, SEO optimizovani sajtovi, web aplikacije, WooCommerce prodavnice i AI automatizacija za klijente iz Srbije, EU i SAD-a.",
      ],
    },
    absolute: true,
  },
  about: {
    path: "/about",
    copy: {
      en: [translations.en.about.title, "Meet the Belgrade team of developers, designers and strategists building fast websites, web apps and AI automation for clients in Europe and the US."],
      sr: [translations.sr.about.title, translations.sr.about.desc],
    },
  },
  services: {
    path: "/services",
    copy: {
      en: ["Web Development, Marketing & Design Services", "We deliver web development, digital marketing and UI/UX design — built end-to-end with the same team that designs, ships and maintains the result."],
      sr: ["Usluge: web development, marketing i dizajn", "Pružamo usluge web developmenta, digitalnog marketinga i UI/UX dizajna — sve od početka do kraja radi isti tim koji dizajnira, isporučuje i održava rešenje."],
    },
  },
  "ai-consulting": {
    path: "/ai-consulting",
    copy: {
      en: [translations.en.aiConsulting.title, "We design and deploy AI agents, automate repetitive workflows and streamline business processes — so your team spends less time on manual work."],
      sr: [translations.sr.aiConsulting.title, "Dizajniramo i uvodimo AI agente, automatizujemo ponavljajuće procese i unapređujemo poslovne tokove — manje ručnog rada, više vremena za rast."],
    },
  },
  packages: {
    path: "/packages",
    copy: {
      en: ["Packages: Web, Apps, AI, Design & Marketing", "Five ways to work with us: WordPress site, web app, AI readiness audit, design system or marketing strategy — fixed quote after a free consultation."],
      sr: ["Paketi: web, aplikacije, AI, dizajn i marketing", "Pet načina saradnje: WordPress sajt, web aplikacija, AI audit, dizajn sistem ili marketing strategija — fiksna ponuda posle besplatne konsultacije."],
    },
  },
  ecommerce: {
    path: "/ecommerce",
    copy: {
      en: [translations.en.ecommerce.title, "Modern online stores on ReadyCMS — products, inventory, orders and content managed from one place. Less time wrestling with tech, more time selling."],
      sr: [translations.sr.ecommerce.title, "Moderne online prodavnice na ReadyCMS-u — proizvodi, zalihe, porudžbine i sadržaj na jednom mestu. Manje muke sa tehnologijom, više prodaje."],
    },
  },
  portfolio: {
    path: "/portfolio",
    copy: {
      en: ["Portfolio: Selected Projects", "Selected work delivered for clients across engineering, logistics, hospitality, e-commerce and creative industries — each built end-to-end by our team."],
      sr: ["Portfolio: odabrani projekti", "Odabrani projekti za klijente iz inženjerstva, logistike, ugostiteljstva, e-commerce i kreativnih industrija — sve radi naš tim, od početka do kraja."],
    },
  },
  contact: {
    path: "/contact",
    copy: {
      en: ["Contact Codux Studio", "Have a project in mind? Send us a brief and we'll get back to you within 24 hours. The first consultation is free."],
      sr: ["Kontakt — Codux Studio", "Imate projekat u planu? Pošaljite nam kratak opis i javljamo se u roku od 24h. Prva konsultacija je besplatna."],
    },
    absolute: true,
  },
  blog: {
    path: "/blog",
    copy: {
      en: ["Blog: Web, AI & E-commerce Insights", "Practical guides on websites, web apps, e-commerce and AI automation — written by the Codux Studio team in Belgrade."],
      sr: ["Blog: saveti o webu, AI-ju i online prodaji", "Praktični vodiči o sajtovima, web aplikacijama, online prodaji i AI automatizaciji — piše tim Codux Studija iz Beograda."],
    },
  },
  "privacy-policy": { path: "/privacy-policy", copy: legal.privacy },
  "cookie-policy": { path: "/cookie-policy", copy: legal.cookies },
  terms: { path: "/terms", copy: legal.terms },
};

export const STATIC_PATHS = Object.values(PAGES).map((p) => p.path);

function abs(path) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

const OG_DEFAULT = { url: "/og-image.jpg", width: 1200, height: 591 };

/** Trim to whole words, max `n` chars, ending cleanly. */
function clip(text, n = 155) {
  if (text.length <= n) return text;
  const cut = text.slice(0, n - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—–-]\s*$/, "")}…`;
}

export function buildMetadata({ lang, path, title, description, image, type = "website", languages = ["en", "sr"], article }) {
  const url = abs(localize(path, lang));
  const og = image || OG_DEFAULT;
  const img = og.url.startsWith("http") ? og.url : `${SITE_URL}${og.url}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      // only languages the page actually exists in
      languages:
        languages.length > 1
          ? { en: abs(path), sr: abs(localize(path, "sr")), "x-default": abs(path) }
          : {},
    },
    openGraph: {
      type,
      url,
      siteName: "Codux Studio",
      title,
      description,
      locale: lang === "sr" ? "sr_RS" : "en_US",
      alternateLocale: languages.length > 1 ? (lang === "sr" ? ["en_US"] : ["sr_RS"]) : [],
      ...(article || {}),
      images: [{ url: img, width: og.width, height: og.height, alt: og.alt || title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [img],
    },
  };
}

export function pageMetadata(key, lang) {
  const page = PAGES[key];
  const [t, description] = typeof page.copy === "function" ? page.copy(lang) : page.copy[lang];
  const title = page.absolute ? t : `${t} — Codux Studio`;
  return buildMetadata({ lang, path: page.path, title, description });
}

export function projectMetadata(slug, lang) {
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const label = lang === "sr" ? "Studija slučaja" : "Case Study";
  const long = project.long[lang] || project.long.en;
  return buildMetadata({
    lang,
    path: `/portfolio/${project.slug}`,
    title: `${project.title} — ${label} | Codux Studio`,
    description: clip(`${project.title}: ${long}`),
    image: { url: project.img, width: 800, height: 600, alt: project.title },
    type: "article",
  });
}

export function postMetadata(post) {
  return buildMetadata({
    lang: post.lang,
    path: `/blog/${post.slug}`,
    title: `${post.title} — Codux Studio`,
    description: post.description,
    type: "article",
    image: post.image ? { url: post.image, alt: post.title } : undefined,
    languages: post.languages,
    article: {
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author],
      tags: post.tags,
    },
  });
}
