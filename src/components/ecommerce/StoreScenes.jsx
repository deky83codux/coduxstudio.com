"use client";
// Animated scenes for the e-commerce page. Pure SVG; keyframes are the es-*
// and shared sv-* classes in app/globals.css.
import { T } from "../../theme";

const PANEL = "#12121a";
const LINE = "#2a2a3a";

// Storefront: a product drops into the cart, the badge ticks up, revenue grows.
export function StoreScene({ active }) {
  const products = [
    { x: 30, c: "rgba(0,206,201,.25)" },
    { x: 100, c: "rgba(162,155,254,.25)" },
    { x: 170, c: "rgba(253,203,110,.25)" },
  ];
  return (
    <svg
      viewBox="0 0 320 200"
      className={`sv-scene ${active ? "is-active" : ""}`}
      aria-hidden="true"
    >
      <rect
        x="16"
        y="14"
        width="232"
        height="172"
        rx="12"
        fill={PANEL}
        stroke={LINE}
      />
      <rect
        x="28"
        y="26"
        width="46"
        height="6"
        rx="3"
        fill={T.text}
        opacity=".8"
      />
      <rect x="180" y="24" width="56" height="10" rx="5" fill="#1c1c2a" />
      {products.map((p, i) => (
        <g key={i}>
          <rect x={p.x} y="46" width="62" height="64" rx="8" fill={p.c} />
          <rect
            x={p.x}
            y="116"
            width="44"
            height="5"
            rx="2.5"
            fill={T.text}
            opacity=".7"
          />
          <rect x={p.x} y="126" width="26" height="5" rx="2.5" fill={T.green} />
          <rect
            x={p.x}
            y="140"
            width="62"
            height="16"
            rx="8"
            fill={i === 1 ? T.green : "#23233a"}
            className={i === 1 ? "es-btn" : ""}
          />
        </g>
      ))}
      {/* product flying to the cart */}
      <rect
        className="es-fly"
        x="112"
        y="62"
        width="38"
        height="38"
        rx="7"
        fill="rgba(162,155,254,.55)"
      />
      {/* cart */}
      <g transform="translate(270 30)">
        <circle r="22" fill={PANEL} stroke={LINE} />
        <path
          d="M-10 -6h3l3 12h11l3-9h-15"
          fill="none"
          stroke={T.text}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="-2" cy="10" r="1.6" fill={T.text} />
        <circle cx="7" cy="10" r="1.6" fill={T.text} />
        <g className="es-badge">
          <circle cx="14" cy="-14" r="8" fill={T.orange} />
          <text
            x="14"
            y="-10.5"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#0a0a0f"
          >
            3
          </text>
        </g>
      </g>
      {/* revenue */}
      <rect
        x="258"
        y="70"
        width="52"
        height="116"
        rx="10"
        fill={PANEL}
        stroke={LINE}
      />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          className="sv-grow"
          style={{ animationDelay: `${0.3 + i * 0.15}s` }}
          x={268 + i * 9}
          y={170 - (20 + i * 18)}
          width="6"
          height={20 + i * 18}
          rx="3"
          fill={T.green}
          opacity={0.5 + i * 0.15}
        />
      ))}
      <rect x="268" y="80" width="30" height="5" rx="2.5" fill={T.textDim} />
    </svg>
  );
}

// Multi-language: one catalog, the product card switching languages.
export function GlobeScene({ active }) {
  const langs = ["EN", "SR", "DE", "IT"];
  return (
    <svg
      viewBox="0 0 320 200"
      className={`sv-scene ${active ? "is-active" : ""}`}
      aria-hidden="true"
    >
      <g transform="translate(92 100)">
        <circle
          r="62"
          fill="rgba(108,92,231,.12)"
          stroke={T.accentLight}
          strokeOpacity=".5"
        />
        <g
          className="es-spin"
          fill="none"
          stroke={T.accentLight}
          strokeOpacity=".35"
        >
          <ellipse rx="26" ry="62" />
          <ellipse rx="50" ry="62" />
          <line x1="-62" x2="62" />
          <ellipse rx="62" ry="24" />
        </g>
        {[
          [-30, -30],
          [24, -10],
          [-8, 30],
          [36, 34],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="4"
            fill={T.green}
            className="sv-pop"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </g>
      {/* connecting line */}
      <path
        d="M156 100 H184"
        stroke={LINE}
        strokeWidth="2"
        strokeDasharray="3 4"
      />
      {/* product card */}
      <rect
        x="186"
        y="34"
        width="118"
        height="132"
        rx="12"
        fill={PANEL}
        stroke={LINE}
      />
      <rect
        x="198"
        y="46"
        width="94"
        height="52"
        rx="8"
        fill="rgba(253,203,110,.18)"
      />
      <rect
        x="198"
        y="108"
        width="70"
        height="6"
        rx="3"
        fill={T.text}
        opacity=".75"
      />
      <rect x="198" y="120" width="52" height="5" rx="2.5" fill={T.textDim} />
      <rect x="198" y="140" width="40" height="14" rx="7" fill={T.accent} />
      {/* language pill cycling */}
      <rect
        x="252"
        y="138"
        width="40"
        height="18"
        rx="9"
        fill="#1c1c2a"
        stroke={T.accentLight}
        strokeOpacity=".6"
      />
      {langs.map((l, i) => (
        <text
          key={l}
          className="es-lang"
          style={{ animationDelay: `${i * 1.5}s` }}
          x="272"
          y="151"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#fff"
        >
          {l}
        </text>
      ))}
    </svg>
  );
}
