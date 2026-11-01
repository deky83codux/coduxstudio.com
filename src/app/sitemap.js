import { SITE_URL } from "@/theme";
import { projects } from "@/data/projects";
import { STATIC_PATHS } from "@/lib/seo";
import { localize } from "@/lib/i18n";
import { getPosts, availableLanguages } from "@/lib/blog";

export const dynamic = "force-static";

const abs = (p) => (p === "/" ? SITE_URL : `${SITE_URL}${p}`);

export default function sitemap() {
  const paths = [...STATIC_PATHS, ...projects.map((p) => `/portfolio/${p.slug}`)];
  const now = new Date();
  const posts = [...new Set([...getPosts("en"), ...getPosts("sr")].map((p) => p.slug))].flatMap((slug) => {
    const langs = availableLanguages(slug);
    const path = `/blog/${slug}`;
    const languages = Object.fromEntries(langs.map((l) => [l, abs(localize(path, l))]));
    return langs.map((l) => {
      const post = getPosts(l).find((p) => p.slug === slug);
      return {
        url: languages[l],
        lastModified: new Date(post.updated || post.date),
        changeFrequency: "yearly",
        priority: 0.7,
        alternates: langs.length > 1 ? { languages } : undefined,
      };
    });
  });
  return [...pages(paths, now), ...posts];
}

function pages(paths, now) {
  return paths.flatMap((path) => {
    const languages = { en: abs(path), sr: abs(localize(path, "sr")) };
    const priority = path === "/" ? 1 : path.startsWith("/portfolio/") ? 0.6 : 0.8;
    return ["en", "sr"].map((lang) => ({
      url: languages[lang],
      lastModified: now,
      changeFrequency: "monthly",
      priority,
      alternates: { languages },
    }));
  });
}
