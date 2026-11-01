"use client";
// Animated SVG scenes for the services cards. Pure SVG + CSS keyframes
// (see app/globals.css, sv-* classes); `active` speeds them up.
import { useId } from "react";
import { T } from "../../theme";

const PANEL = "#12121a";
const LINE = "#2a2a3a";

// --- Web development: a page assembling itself next to its code ---
export function WebScene({ active }) {
  const blocks = [
    { x: 34, y: 44, w: 54, h: 6, c: T.textDim },
    { x: 150, y: 44, w: 70, h: 6, c: T.textDim },
    { x: 34, y: 62, w: 128, h: 12, c: T.white },
    { x: 34, y: 80, w: 96, h: 6, c: T.textMuted },
    { x: 34, y: 94, w: 44, h: 13, c: T.accent, r: 6 },
    { x: 34, y: 120, w: 58, h: 36, c: "#1f1f2e", r: 6 },
    { x: 98, y: 120, w: 58, h: 36, c: "#1f1f2e", r: 6 },
    { x: 162, y: 120, w: 58, h: 36, c: "#1f1f2e", r: 6 },
  ];
  const code = [
    { w: 46, c: T.accentLight, i: 0 },
    { w: 78, c: T.green, i: 1 },
    { w: 60, c: T.text, i: 1 },
    { w: 88, c: T.orange, i: 2 },
    { w: 40, c: T.accentLight, i: 1 },
    { w: 30, c: T.accentLight, i: 0 },
  ];
  return (
    <svg viewBox="0 0 320 200" className={`sv-scene ${active ? "is-active" : ""}`} aria-hidden="true">
      <rect x="20" y="16" width="216" height="154" rx="12" fill={PANEL} stroke={LINE} />
      <line x1="20" y1="34" x2="236" y2="34" stroke={LINE} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={32 + i * 10} cy="25" r="3" fill={i === 0 ? "#ff6b6b" : i === 1 ? T.orange : T.green} opacity=".7" />
      ))}
      {blocks.map((b, i) => (
        <rect
          key={i}
          className="sv-build"
          style={{ animationDelay: `${i * 0.18}s` }}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx={b.r || 3}
          fill={b.c}
          opacity={b.c === T.white ? 0.9 : 1}
        />
      ))}
      <g className="sv-float">
        <rect x="168" y="92" width="134" height="96" rx="10" fill="#0c0c13" stroke={LINE} />
        <rect x="168" y="92" width="134" height="16" rx="10" fill="#15151f" />
        <text x="178" y="104" fill={T.textDim} fontSize="8" fontFamily="monospace">Hero.jsx</text>
        {code.map((l, i) => (
          <rect
            key={i}
            className="sv-type"
            style={{ animationDelay: `${0.4 + i * 0.22}s` }}
            x={180 + l.i * 10}
            y={116 + i * 11}
            width={l.w}
            height="5"
            rx="2.5"
            fill={l.c}
            opacity=".85"
          />
        ))}
        <rect className="sv-caret" x="182" y="181" width="2" height="7" fill={T.white} />
      </g>
    </svg>
  );
}

// --- UI/UX design: fanned screens, a pen path and a palette ---
export function DesignScene({ active }) {
  const cards = [
    { rot: -12, dx: -46, fill: "#181826" },
    { rot: 0, dx: 0, fill: "#1c1c2c" },
    { rot: 12, dx: 46, fill: "#181826" },
  ];
  return (
    <svg viewBox="0 0 320 200" className={`sv-scene ${active ? "is-active" : ""}`} aria-hidden="true">
      {cards.map((c, i) => (
        <g key={i} className={`sv-fan sv-fan-${i}`} style={{ "--rot": `${c.rot}deg`, "--dx": `${c.dx}px` }}>
          <rect x="112" y="30" width="96" height="140" rx="12" fill={c.fill} stroke={i === 1 ? T.green : LINE} strokeOpacity={i === 1 ? 0.6 : 1} />
          <rect x="122" y="42" width="76" height="44" rx="7" fill={i === 1 ? "rgba(0,206,201,.18)" : "#23233a"} />
          <rect x="122" y="94" width="54" height="6" rx="3" fill={T.text} opacity=".7" />
          <rect x="122" y="106" width="70" height="4" rx="2" fill={T.textDim} />
          <rect x="122" y="114" width="62" height="4" rx="2" fill={T.textDim} />
          <rect x="122" y="148" width="40" height="11" rx="5.5" fill={i === 1 ? T.green : "#2a2a3a"} />
        </g>
      ))}
      <path className="sv-draw" d="M28 168 C 70 90, 120 40, 160 58 S 260 140, 296 52" fill="none" stroke={T.green} strokeWidth="2" strokeLinecap="round" />
      {[[28, 168], [160, 58], [296, 52]].map(([x, y], i) => (
        <rect key={i} className="sv-pop" style={{ animationDelay: `${0.4 + i * 0.5}s` }} x={x - 4} y={y - 4} width="8" height="8" fill={PANEL} stroke={T.green} strokeWidth="1.5" />
      ))}
      <line x1="160" y1="58" x2="128" y2="44" stroke={T.green} strokeOpacity=".5" />
      <line x1="160" y1="58" x2="192" y2="72" stroke={T.green} strokeOpacity=".5" />
      {[T.accent, T.green, T.orange, T.accentLight].map((c, i) => (
        <circle key={i} className="sv-pop" style={{ animationDelay: `${1 + i * 0.12}s` }} cx={248 + i * 15} cy="180" r="6" fill={c} />
      ))}
    </svg>
  );
}

// --- Digital marketing: growth bars with a trend line drawing over them ---
export function MarketingScene({ active }) {
  const hs = [34, 52, 46, 74, 92, 120];
  const pts = hs.map((h, i) => [52 + i * 44, 170 - h - 8]);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
  const gid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 320 200" className={`sv-scene ${active ? "is-active" : ""}`} aria-hidden="true">
      <defs>
        <linearGradient id={`b${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={T.orange} stopOpacity=".85" />
          <stop offset="100%" stopColor={T.orange} stopOpacity=".05" />
        </linearGradient>
      </defs>
      {[50, 90, 130, 170].map((y) => (
        <line key={y} x1="24" x2="300" y1={y} y2={y} stroke={LINE} strokeDasharray="2 4" />
      ))}
      {hs.map((h, i) => (
        <rect
          key={i}
          className="sv-grow"
          style={{ animationDelay: `${i * 0.12}s` }}
          x={41 + i * 44}
          y={170 - h}
          width="22"
          height={h}
          rx="5"
          fill={`url(#b${gid})`}
        />
      ))}
      <path className="sv-draw sv-draw-late" d={d} fill="none" stroke={T.white} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map(([x, y], i) => (
        <circle key={i} className="sv-pop" style={{ animationDelay: `${0.9 + i * 0.12}s` }} cx={x} cy={y} r="3.5" fill={T.bg} stroke={T.white} strokeWidth="1.5" />
      ))}
      <circle className="sv-ping" cx={pts[5][0]} cy={pts[5][1]} r="6" fill="none" stroke={T.orange} strokeWidth="1.5" />
      <path d={`M${pts[5][0] - 4} ${pts[5][1] - 16} l4 -6 l4 6`} fill="none" stroke={T.orange} strokeWidth="2" strokeLinecap="round" className="sv-pop" style={{ animationDelay: "1.6s" }} />
    </svg>
  );
}

// --- AI & automation: tools feeding signals into an agent core ---
export function AIScene({ active }) {
  const nodes = [
    [44, 46], [44, 154], [276, 46], [276, 154], [160, 18], [160, 182],
  ];
  const core = [160, 100];
  const paths = nodes.map(([x, y]) => `M${x} ${y} Q ${(x + core[0]) / 2} ${y < 100 ? y + 30 : y - 30} ${core[0]} ${core[1]}`);
  const gid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 320 200" className={`sv-scene ${active ? "is-active" : ""}`} aria-hidden="true">
      <defs>
        <radialGradient id={`c${gid}`} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor={T.accentLight} />
          <stop offset="60%" stopColor={T.accent} />
          <stop offset="100%" stopColor="#2a1f6b" />
        </radialGradient>
      </defs>
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={T.accentLight} strokeOpacity=".22" strokeWidth="1.2" strokeDasharray="3 4" />
      ))}
      {paths.map((d, i) => (
        <circle key={`p${i}`} r="3" fill={i % 2 ? T.green : T.accentLight}>
          <animateMotion dur={active ? "1.4s" : "2.6s"} begin={`${i * 0.35}s`} repeatCount="indefinite" path={d} />
        </circle>
      ))}
      {nodes.map(([x, y], i) => (
        <g key={`n${i}`}>
          <rect x={x - 14} y={y - 14} width="28" height="28" rx="8" fill="#16161f" stroke={LINE} />
          <rect x={x - 7} y={y - 5} width="14" height="3" rx="1.5" fill={i % 2 ? T.green : T.accentLight} opacity=".8" />
          <rect x={x - 7} y={y + 1} width="9" height="3" rx="1.5" fill={T.textDim} />
        </g>
      ))}
      <circle className="sv-ping sv-ping-slow" cx={core[0]} cy={core[1]} r="34" fill="none" stroke={T.accentLight} strokeWidth="1" />
      <rect x="128" y="68" width="64" height="64" rx="18" fill={`url(#c${gid})`} />
      <rect x="128" y="68" width="64" height="64" rx="18" fill="none" stroke="rgba(255,255,255,.25)" />
      <text x="160" y="108" textAnchor="middle" fill={T.white} fontSize="22" fontWeight="700" fontFamily="'Clash Display', sans-serif">AI</text>
    </svg>
  );
}

export const SCENES = [WebScene, DesignScene, MarketingScene, AIScene];
