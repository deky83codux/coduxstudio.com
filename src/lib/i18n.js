// Locale helpers shared by server (metadata, sitemap) and client (links).
// English lives at the root ("/about"), Serbian under "/sr" ("/sr/about").
export const LOCALES = ["en", "sr"];
export const DEFAULT_LOCALE = "en";

/** "/about" + "sr" -> "/sr/about"; "/" + "sr" -> "/sr". Leaves external/hash links alone. */
export function localize(path, lang) {
  if (!path || typeof path !== "string" || !path.startsWith("/") || path.startsWith("//")) return path;
  if (lang !== "sr") return path;
  if (path === "/") return "/sr";
  if (path.startsWith("/#") || path.startsWith("/?")) return `/sr${path.slice(1)}`;
  return `/sr${path}`;
}

/** "/sr/about" -> "/about"; "/sr" -> "/". */
export function stripLocale(pathname = "/") {
  if (pathname === "/sr" || pathname === "/sr/") return "/";
  if (pathname.startsWith("/sr/")) return pathname.slice(3);
  return pathname || "/";
}

export function localeFromPath(pathname = "/") {
  return pathname === "/sr" || pathname.startsWith("/sr/") ? "sr" : "en";
}
