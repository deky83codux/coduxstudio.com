"use client";
// Blog post covers: the site's own animated illustrations (same style as the
// services / packages scenes) on a dark grid card — no stock photos, no planets.
// Pick one per post with `cover:` in the front matter; defaults by category.
// A real image can be used instead with `image: /blog/my-photo.jpg`.
import { T } from "../../theme";
import { WebScene, DesignScene, MarketingScene, AIScene } from "../services/ServiceScenes";
import { WPScene, AuditScene, AppScene, DesignSystemScene, StrategyScene } from "../packages/PackageScenes";
import { StoreScene, GlobeScene } from "../ecommerce/StoreScenes";

const PANEL = "#12121a";
const LINE = "#2a2a3a";

// Core Web Vitals: a speed gauge settling in the green + three metric bars
export function SpeedScene({ active }) {
  const rows = [
    { k: "LCP", v: "1.8s", w: 64 },
    { k: "INP", v: "90ms", w: 50 },
    { k: "CLS", v: "0.02", w: 36 },
  ];
  const arc = (from, to, r = 58) => {
    const p = (a) => [96 + r * Math.cos(a), 128 + r * Math.sin(a)];
    const [x1, y1] = p(Math.PI + from * Math.PI);
    const [x2, y2] = p(Math.PI + to * Math.PI);
    return `M${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
  };
  return (
    <svg viewBox="0 0 320 200" className={`sv-scene ${active ? "is-active" : ""}`} aria-hidden="true">
      <rect x="20" y="30" width="152" height="140" rx="14" fill={PANEL} stroke={LINE} />
      <path d={arc(0, 1)} fill="none" stroke="#1f1f2e" strokeWidth="12" strokeLinecap="round" />
      <path d={arc(0, 0.32)} fill="none" stroke="#ff7675" strokeWidth="12" strokeLinecap="round" opacity=".85" />
      <path d={arc(0.36, 0.62)} fill="none" stroke={T.orange} strokeWidth="12" opacity=".85" />
      <path d={arc(0.66, 1)} fill="none" stroke={T.green} strokeWidth="12" strokeLinecap="round" />
      <rect className="bc-needle" x="94.5" y="80" width="3" height="48" rx="1.5" fill={T.white} />
      <circle cx="96" cy="128" r="7" fill={T.white} />
      <circle cx="96" cy="128" r="3" fill={PANEL} />
      <text x="96" y="156" textAnchor="middle" fill={T.white} fontSize="15" fontWeight="700" fontFamily="'Clash Display', sans-serif">1.8s</text>

      <g className="sv-float">
        <rect x="186" y="44" width="118" height="116" rx="12" fill="#0c0c13" stroke={LINE} />
        {rows.map((r, i) => {
          const y = 68 + i * 32;
          return (
            <g key={r.k}>
              <text x="198" y={y} fill={T.textMuted} fontSize="8" fontWeight="600" fontFamily="monospace">{r.k}</text>
              <text x="292" y={y} textAnchor="end" fill={T.white} fontSize="8" fontFamily="monospace">{r.v}</text>
              <rect x="198" y={y + 6} width="94" height="5" rx="2.5" fill="#1f1f2e" />
              <rect className="sv-build" style={{ animationDelay: `${0.3 + i * 0.25}s` }} x="198" y={y + 6} width={r.w} height="5" rx="2.5" fill={T.green} />
              <circle className="sv-pop" style={{ animationDelay: `${0.6 + i * 0.25}s` }} cx="292" cy={y + 8.5} r="3.5" fill={T.green} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

const SCENES = {
  web: WebScene,
  wordpress: WPScene,
  app: AppScene,
  design: DesignScene,
  "design-system": DesignSystemScene,
  marketing: MarketingScene,
  strategy: StrategyScene,
  ai: AIScene,
  audit: AuditScene,
  store: StoreScene,
  globe: GlobeScene,
  speed: SpeedScene,
};
const BY_CATEGORY = { web: "web", design: "design", marketing: "marketing", ai: "ai", ecommerce: "store" };

export function PostCover({ post, active = false, big = false, color }) {
  if (post.image) {
    return (
      <div className={`bl-cover is-photo ${big ? "is-big" : ""}`} style={{ "--c": color }}>
        <img src={post.image} alt="" loading={big ? "eager" : "lazy"} decoding="async" />
      </div>
    );
  }
  const Scene = SCENES[post.cover] || SCENES[BY_CATEGORY[post.category]] || WebScene;
  return (
    <div className={`bl-cover ${big ? "is-big" : ""}`} style={{ "--c": color }} aria-hidden="true">
      <div className="bl-cover-scene">
        <Scene active={active} />
      </div>
    </div>
  );
}
