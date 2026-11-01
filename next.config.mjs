import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
// Only true in local dev, where this folder sits next to the old Vite
// project's own lockfile — not in the deployed repo, which is just this
// project's contents at the repo root.
const hasMonorepoSibling = fs.existsSync(path.join(projectRoot, "..", "yarn.lock"));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site in `out/` — same hosting as before, no Node server needed.
  output: "export",
  trailingSlash: false,
  reactStrictMode: true,
  images: { unoptimized: true },
  // this folder is the project root (the Vite project one level up has its own lockfile)
  ...(hasMonorepoSibling ? { turbopack: { root: projectRoot } } : {}),
  experimental: {
    // one 404 page shared by both root layouts (en + /sr)
    globalNotFound: true,
    // Hostinger's build container spawns ~34 static-export workers (vs. ~7
    // locally) and the out/ directory is never written there, while the
    // same build always succeeds with fewer workers. Capping this is a
    // direct test of that concurrency theory.
    cpus: 2,
  },
};

export default nextConfig;
