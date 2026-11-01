import Script from "next/script";
// Outfit is self-hosted (same origin, cached, no render-blocking 3rd-party CSS)
import "@fontsource/outfit/latin-300.css";
import "@fontsource/outfit/latin-ext-300.css";
import "@fontsource/outfit/latin-400.css";
import "@fontsource/outfit/latin-ext-400.css";
import "@fontsource/outfit/latin-500.css";
import "@fontsource/outfit/latin-ext-500.css";
import "@fontsource/outfit/latin-600.css";
import "@fontsource/outfit/latin-ext-600.css";
import "@fontsource/outfit/latin-700.css";
import "@fontsource/outfit/latin-ext-700.css";

import { AppProvider } from "@/context/AppContext";
import { Layout } from "@/components/Layout";

const GA_ID = "G-2GLTLJCLBB";

// Shared <html> for both root layouts: "/" (en) and "/sr" (sr). Separate root
// layouts let every page ship with the correct <html lang> in its static HTML.
export function RootShell({ lang, notFound = false, children }) {
  return (
    <html lang={lang} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
        />
      </head>
      <body>
        <AppProvider lang={lang}>
          <Layout notFound={notFound}>{children}</Layout>
        </AppProvider>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}

export const rootMetadata = {
  metadataBase: new URL("https://coduxstudio.com"),
  authors: [{ name: "Codux Studio" }],
  robots: { index: true, follow: true, "max-image-preview": "large" },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  formatDetection: { telephone: false },
};

export const rootViewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};
