// Blog: markdown files in src/content/blog/<slug>/<lang>.md, read at build time.
// A post can exist in one or both languages; hreflang is only added when both exist.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";
import { localize } from "./i18n";

const DIR = path.join(process.cwd(), "src", "content", "blog");
const WPM = 220;

const ENTITIES = { "&quot;": '"', "&#39;": "'", "&amp;": "&", "&lt;": "<", "&gt;": ">" };
const decode = (t) => t.replace(/&(quot|#39|amp|lt|gt);/g, (m) => ENTITIES[m]);

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "dj")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function render(md, lang) {
  const toc = [];
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const plain = decode(text.replace(/<[^>]+>/g, ""));
        const id = slugify(plain);
        if (depth === 2) toc.push({ id, text: plain });
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const internal = href.startsWith("/");
        const url = internal ? localize(href, lang) : href;
        const attrs = internal ? "" : ' target="_blank" rel="noopener noreferrer"';
        return `<a href="${url}"${title ? ` title="${title}"` : ""}${attrs}>${text}</a>`;
      },
    },
  });
  return { html: marked.parse(md), toc };
}

function readFile(slug, lang) {
  const file = path.join(DIR, slug, `${lang}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  if (data.draft) return null;
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    lang,
    title: data.title,
    description: data.description,
    date: new Date(data.date).toISOString().slice(0, 10),
    updated: data.updated ? new Date(data.updated).toISOString().slice(0, 10) : null,
    category: data.category || "web",
    categoryLabel: data.categoryLabel || data.category || "",
    cover: data.cover || null,
    image: data.image || null,
    tags: data.tags || [],
    author: data.author || "Codux Studio",
    readingMinutes: Math.max(1, Math.round(words / WPM)),
    content,
  };
}

const slugs = () =>
  fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((d) => fs.statSync(path.join(DIR, d)).isDirectory()) : [];

/** Post summaries for one language, newest first (no body). */
export function getPosts(lang) {
  return slugs()
    .map((s) => readFile(s, lang))
    .filter(Boolean)
    .map(({ content, ...meta }) => meta)
    .sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : a.date < b.date ? 1 : -1));
}

/** Full post with rendered HTML + table of contents. */
export function getPost(slug, lang) {
  const post = readFile(slug, lang);
  if (!post) return null;
  const { html, toc } = render(post.content, lang);
  const { content, ...meta } = post;
  return { ...meta, html, toc, languages: availableLanguages(slug) };
}

export function availableLanguages(slug) {
  return ["en", "sr"].filter((l) => fs.existsSync(path.join(DIR, slug, `${l}.md`)) && readFile(slug, l));
}

export function getSlugs(lang) {
  return getPosts(lang).map((p) => p.slug);
}
