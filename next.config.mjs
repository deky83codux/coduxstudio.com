import { fileURLToPath } from "node:url";
import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site in `out/` — same hosting as before, no Node server needed.
  output: "export",
  trailingSlash: false,
  reactStrictMode: true,
  images: { unoptimized: true },
  // this folder is the project root (the Vite project one level up has its own lockfile)
  turbopack: { root: path.dirname(fileURLToPath(import.meta.url)) },
  experimental: {
    // one 404 page shared by both root layouts (en + /sr)
    globalNotFound: true,
  },
};

export default nextConfig;
