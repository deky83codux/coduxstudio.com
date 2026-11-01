"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { translations } from "../translations";
import { localize, stripLocale } from "../lib/i18n";

const AppContext = createContext(null);

// The language comes from the URL (root = en, /sr = sr), so every language
// version is a real, indexable page. Switching language navigates to the
// same page in the other locale.
export function AppProvider({ lang = "en", children }) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  // index into t.contact.services (without "Select...") to preselect, or null
  const [quotePreset, setQuotePreset] = useState(null);
  const router = useRouter();
  const pathname = usePathname() || "/";
  const setLang = useCallback(
    (next) => {
      if (next === lang) return;
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      // Prefer the page's own hreflang alternate (a blog post may exist in one
      // language only); otherwise the same path in the other locale.
      const alt = document.querySelector(`link[rel="alternate"][hreflang="${next}"]`);
      let target = alt ? new URL(alt.href).pathname : null;
      if (!target) {
        const bare = stripLocale(pathname);
        target = localize(bare.startsWith("/blog/") ? "/blog" : bare, next);
      }
      router.push(target + hash);
    },
    [lang, pathname, router],
  );
  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: translations[lang],
      quoteOpen,
      quotePreset,
      // openQuote() from a button, or openQuote(i) from package i
      openQuote: (preset) => {
        setQuotePreset(typeof preset === "number" ? preset : null);
        setQuoteOpen(true);
      },
      closeQuote: () => setQuoteOpen(false),
    }),
    [lang, setLang, quoteOpen, quotePreset],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
