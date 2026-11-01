// Shared (client-safe) blog constants.
export const CATEGORY_COLORS = {
  web: "#6c5ce7",
  design: "#00cec9",
  marketing: "#fdcb6e",
  ai: "#a29bfe",
  ecommerce: "#fd79a8",
};

export const CATEGORY_LABELS = {
  en: { all: "All", web: "Web development", design: "Design", marketing: "Marketing", ai: "AI & automation", ecommerce: "E-commerce" },
  sr: { all: "Sve", web: "Web development", design: "Dizajn", marketing: "Marketing", ai: "AI i automatizacija", ecommerce: "E-commerce" },
};

export function formatDate(iso, lang) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(lang === "sr" ? "sr-Latn-RS" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
