"use client";
// Animated scenes for the packages tabs — different from the services scenes.
// Pure SVG; keyframes are the pk-* and sv-* classes in app/globals.css.
import { T } from "../../theme";

const PANEL = "#12121a";
const LINE = "#2a2a3a";

// WordPress: block editor — a new block drops from the inserter into the page
export function WPScene({ active }) {
  return (
    <svg
      viewBox="0 0 320 200"
      className={`sv-scene ${active ? "is-active" : ""}`}
      aria-hidden="true"
    >
      <rect
        x="16"
        y="14"
        width="288"
        height="172"
        rx="12"
        fill={PANEL}
        stroke={LINE}
      />
      <rect x="16" y="14" width="288" height="22" rx="12" fill="#0f0f17" />
      <rect x="28" y="21" width="9" height="9" rx="2" fill={T.accent} />
      <rect x="46" y="23" width="40" height="5" rx="2.5" fill={T.textDim} />
      <rect x="250" y="20" width="44" height="11" rx="5.5" fill={T.accent} />
      {/* canvas */}
      <rect x="28" y="46" width="176" height="128" rx="6" fill="#16161f" />
      <rect
        x="40"
        y="56"
        width="110"
        height="9"
        rx="3"
        fill={T.white}
        opacity=".85"
      />
      <rect x="40" y="70" width="140" height="4" rx="2" fill={T.textDim} />
      <rect x="40" y="78" width="124" height="4" rx="2" fill={T.textDim} />
      <rect x="40" y="90" width="64" height="42" rx="5" fill="#23233a" />
      <rect x="110" y="90" width="64" height="42" rx="5" fill="#23233a" />
      {/* drop target + new block */}
      <rect
        className="pk-slot"
        x="40"
        y="140"
        width="152"
        height="26"
        rx="5"
        fill="none"
        stroke={T.accent}
        strokeDasharray="4 4"
      />
      <g className="pk-drop">
        <rect
          x="40"
          y="140"
          width="152"
          height="26"
          rx="5"
          fill="rgba(108,92,231,.22)"
          stroke={T.accent}
        />
        <rect x="50" y="149" width="52" height="8" rx="4" fill={T.accent} />
        <rect
          x="110"
          y="150"
          width="60"
          height="5"
          rx="2.5"
          fill={T.text}
          opacity=".6"
        />
      </g>
      {/* inserter */}
      <g className="pk-plus">
        <circle cx="216" cy="153" r="9" fill={T.accent} />
        <path
          d="M216 149v8M212 153h8"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>
      {/* settings sidebar */}
      <rect x="214" y="46" width="78" height="92" rx="6" fill="#16161f" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x="222"
            y={58 + i * 24}
            width="34"
            height="4"
            rx="2"
            fill={T.textDim}
          />
          <rect
            x="264"
            y={54 + i * 24}
            width="20"
            height="11"
            rx="5.5"
            fill={i === 1 ? "#2a2a3a" : "rgba(108,92,231,.5)"}
          />
          <circle
            className={i === 1 ? "pk-toggle" : ""}
            cx={i === 1 ? 270 : 278}
            cy={59.5 + i * 24}
            r="4"
            fill="#fff"
          />
        </g>
      ))}
    </svg>
  );
}

// AI audit: a process map gets scanned; steps that can be automated light up
export function AuditScene({ active }) {
  const steps = [
    [40, 60, false],
    [104, 60, true],
    [168, 60, false],
    [232, 60, true],
    [72, 128, true],
    [136, 128, false],
    [200, 128, true],
    [264, 128, false],
  ];
  return (
    <svg
      viewBox="0 0 320 200"
      className={`sv-scene ${active ? "is-active" : ""}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pkScan" x1="0" x2="1">
          <stop offset="0%" stopColor={T.accentLight} stopOpacity="0" />
          <stop offset="85%" stopColor={T.accentLight} stopOpacity=".28" />
          <stop offset="100%" stopColor={T.accentLight} stopOpacity=".9" />
        </linearGradient>
        <clipPath id="pkScanClip">
          <rect x="0" y="30" width="320" height="130" />
        </clipPath>
      </defs>
      <path
        d="M58 60 H86 M122 60 H150 M186 60 H214 M250 60 Q 290 60 290 94 Q 290 128 282 128 M246 128 H218 M182 128 H154 M118 128 H90 M54 128 Q 22 128 22 94 Q 22 60 22 60"
        fill="none"
        stroke={LINE}
        strokeWidth="1.5"
      />
      {steps.map(([x, y, auto], i) => (
        <g key={i}>
          <rect
            x={x - 18}
            y={y - 14}
            width="36"
            height="28"
            rx="7"
            fill="#16161f"
            stroke={LINE}
          />
          <rect
            x={x - 10}
            y={y - 4}
            width="20"
            height="4"
            rx="2"
            fill={T.textDim}
          />
          <rect
            x={x - 10}
            y={y + 3}
            width="13"
            height="3"
            rx="1.5"
            fill="#33334a"
          />
          {auto && (
            <g
              className="pk-flag"
              style={{ animationDelay: `${0.25 + (x / 300) * 1.6}s` }}
            >
              <rect
                x={x - 18}
                y={y - 14}
                width="36"
                height="28"
                rx="7"
                fill="rgba(162,155,254,.14)"
                stroke={T.accentLight}
              />
              <circle cx={x + 18} cy={y - 14} r="6" fill={T.green} />
              <path
                d={`M${x + 15.5} ${y - 14} l1.8 1.8 l3.2 -3.4`}
                stroke="#0a0a0f"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )}
        </g>
      ))}
      <g clipPath="url(#pkScanClip)">
        <rect
          className="pk-scan"
          x="0"
          y="34"
          width="36"
          height="120"
          fill="url(#pkScan)"
        />
      </g>
      {/* savings meter */}
      <rect x="40" y="170" width="240" height="8" rx="4" fill="#1c1c28" />
      <rect
        className="pk-meter"
        x="40"
        y="170"
        width="240"
        height="8"
        rx="4"
        fill={T.green}
      />
    </svg>
  );
}

// Web application: a CRM / project board with a deal moving through stages
export function AppScene({ active }) {
  const cols = [
    { x: 92, cards: [26, 18, 22], c: T.accentLight },
    { x: 160, cards: [22, 26], c: T.orange },
    { x: 228, cards: [18, 22, 18], c: T.green },
  ];
  return (
    <svg
      viewBox="0 0 320 200"
      className={`sv-scene ${active ? "is-active" : ""}`}
      aria-hidden="true"
    >
      <rect
        x="18"
        y="14"
        width="284"
        height="172"
        rx="12"
        fill="#12121a"
        stroke="#2a2a3a"
      />
      <rect x="18" y="14" width="62" height="172" rx="12" fill="#0f0f17" />
      <rect
        x="30"
        y="28"
        width="22"
        height="22"
        rx="7"
        fill={T.green}
        opacity=".85"
      />
      {[64, 82, 100, 118, 136].map((y, i) => (
        <rect
          key={y}
          x="30"
          y={y}
          width={i === 1 ? 38 : 30}
          height="6"
          rx="3"
          fill={i === 1 ? T.text : T.textDim}
          opacity={i === 1 ? 0.9 : 1}
        />
      ))}
      {cols.map((col) => (
        <g key={col.x}>
          <rect
            x={col.x}
            y="28"
            width="40"
            height="5"
            rx="2.5"
            fill={col.c}
            opacity=".8"
          />
          {col.cards.map((h, j) => {
            const y = 40 + col.cards.slice(0, j).reduce((a, b) => a + b + 6, 0);
            return (
              <g
                key={j}
                className="sv-build"
                style={{ animationDelay: `${(col.x / 68) * 0.3 + j * 0.2}s` }}
              >
                <rect
                  x={col.x}
                  y={y}
                  width="60"
                  height={h}
                  rx="5"
                  fill="#1c1c2a"
                  stroke="#2a2a3a"
                />
                <rect
                  x={col.x + 6}
                  y={y + 6}
                  width="30"
                  height="4"
                  rx="2"
                  fill={T.text}
                  opacity=".7"
                />
                {h > 20 && (
                  <rect
                    x={col.x + 6}
                    y={y + 14}
                    width="20"
                    height="3"
                    rx="1.5"
                    fill={T.textDim}
                  />
                )}
              </g>
            );
          })}
        </g>
      ))}
      {/* a deal card travelling across the pipeline */}
      <g className="pk-move">
        <rect
          x="92"
          y="122"
          width="60"
          height="22"
          rx="5"
          fill="rgba(0,206,201,.16)"
          stroke={T.green}
        />
        <rect x="98" y="128" width="26" height="4" rx="2" fill={T.green} />
        <circle cx="140" cy="133" r="5" fill={T.green} opacity=".8" />
      </g>
      <path
        className="sv-draw"
        d="M92 176 L120 168 L148 171 L176 160 L204 163 L232 152 L288 146"
        fill="none"
        stroke={T.accentLight}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Design system: tokens (colour, type, spacing) resolving into components
export function DesignSystemScene({ active }) {
  const sw = [T.accent, T.accentLight, T.green, T.orange, "#fd79a8"];
  return (
    <svg
      viewBox="0 0 320 200"
      className={`sv-scene ${active ? "is-active" : ""}`}
      aria-hidden="true"
    >
      {/* colour tokens */}
      {sw.map((c, i) => (
        <g
          key={i}
          className="pk-chip"
          style={{ animationDelay: `${i * 0.12}s` }}
        >
          <rect x={22 + i * 34} y="18" width="28" height="36" rx="7" fill={c} />
          <rect
            x={22 + i * 34}
            y="58"
            width="22"
            height="3"
            rx="1.5"
            fill={T.textDim}
          />
        </g>
      ))}
      {/* type scale */}
      <g
        fill={T.white}
        fontFamily="'Clash Display', sans-serif"
        fontWeight="600"
      >
        <text x="200" y="50" fontSize="34">
          Aa
        </text>
        <text x="254" y="50" fontSize="22" opacity=".7">
          Aa
        </text>
        <text x="288" y="50" fontSize="14" opacity=".45">
          Aa
        </text>
      </g>
      {/* spacing ruler */}
      <g stroke={T.textDim}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={i}
            x1={200 + [0, 4, 12, 24, 44, 76][i]}
            x2={200 + [0, 4, 12, 24, 44, 76][i]}
            y1="64"
            y2={i % 2 ? 70 : 74}
          />
        ))}
        <line x1="200" x2="296" y1="64" y2="64" />
      </g>
      {/* components built from the tokens */}
      <rect
        x="22"
        y="88"
        width="276"
        height="96"
        rx="12"
        fill={PANEL}
        stroke={LINE}
      />
      <g className="pk-comp" style={{ animationDelay: ".3s" }}>
        <rect x="38" y="104" width="78" height="26" rx="13" fill={T.accent} />
        <rect x="56" y="115" width="42" height="4" rx="2" fill="#fff" />
      </g>
      <g className="pk-comp" style={{ animationDelay: ".55s" }}>
        <rect
          x="128"
          y="104"
          width="78"
          height="26"
          rx="13"
          fill="none"
          stroke={T.accentLight}
        />
        <rect
          x="146"
          y="115"
          width="42"
          height="4"
          rx="2"
          fill={T.accentLight}
        />
      </g>
      <g className="pk-comp" style={{ animationDelay: ".8s" }}>
        <rect x="222" y="107" width="38" height="20" rx="10" fill={T.green} />
        <circle className="pk-knob" cx="250" cy="117" r="7" fill="#fff" />
      </g>
      <g className="pk-comp" style={{ animationDelay: "1.05s" }}>
        <rect
          x="38"
          y="144"
          width="168"
          height="26"
          rx="8"
          fill="#16161f"
          stroke={LINE}
        />
        <rect x="50" y="155" width="60" height="4" rx="2" fill={T.textDim} />
        <rect
          className="sv-caret"
          x="114"
          y="151"
          width="1.5"
          height="11"
          fill={T.accentLight}
        />
      </g>
      <g className="pk-comp" style={{ animationDelay: "1.3s" }}>
        <circle cx="236" cy="157" r="13" fill={T.orange} opacity=".85" />
        <circle cx="262" cy="157" r="13" fill={T.accentLight} opacity=".85" />
      </g>
    </svg>
  );
}

// Marketing strategy: audience flows through a funnel towards the goal
export function StrategyScene({ active }) {
  const dots = Array.from({ length: 14 }, (_, i) => i);
  const channels = [
    { x: 28, w: 40, c: T.orange },
    { x: 76, w: 52, c: T.accentLight },
    { x: 136, w: 44, c: T.green },
  ];
  return (
    <svg
      viewBox="0 0 320 200"
      className={`sv-scene ${active ? "is-active" : ""}`}
      aria-hidden="true"
    >
      {channels.map((ch, i) => (
        <g key={i}>
          <rect
            x={ch.x}
            y="14"
            width={ch.w}
            height="16"
            rx="8"
            fill="#16161f"
            stroke={ch.c}
            strokeOpacity=".7"
          />
          <rect
            x={ch.x + 8}
            y="20"
            width={ch.w - 16}
            height="4"
            rx="2"
            fill={ch.c}
            opacity=".8"
          />
        </g>
      ))}
      {/* funnel */}
      <path
        d="M24 44 H184 L134 112 V150 H74 V112 Z"
        fill="rgba(253,203,110,.06)"
        stroke={T.orange}
        strokeOpacity=".5"
      />
      {[66, 90].map((y) => (
        <line
          key={y}
          x1={24 + (y - 44) * 0.74}
          x2={184 - (y - 44) * 0.74}
          y1={y}
          y2={y}
          stroke={T.orange}
          strokeOpacity=".22"
          strokeDasharray="3 4"
        />
      ))}
      {dots.map((i) => {
        const x0 = 40 + ((i * 37) % 128);
        return (
          <circle
            key={i}
            className="pk-fall"
            r="3"
            fill={
              i % 3 === 0 ? T.orange : i % 3 === 1 ? T.accentLight : T.green
            }
            style={{
              "--x0": `${x0}px`,
              "--x1": `${96 + (i % 4) * 5}px`,
              animationDelay: `${i * 0.28}s`,
            }}
            cx="0"
            cy="0"
          />
        );
      })}
      {/* goal */}
      <g transform="translate(104 176)">
        <circle r="16" fill="none" stroke={T.orange} strokeOpacity=".4" />
        <circle r="9" fill="none" stroke={T.orange} strokeOpacity=".7" />
        <circle r="3.5" fill={T.orange} />
        <circle className="sv-ping" r="9" fill="none" stroke={T.orange} />
      </g>
      {/* roadmap */}
      <rect
        x="212"
        y="44"
        width="92"
        height="142"
        rx="10"
        fill={PANEL}
        stroke={LINE}
      />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle
            cx="228"
            cy={66 + i * 32}
            r="5"
            fill={i < 2 ? T.orange : "#2a2a3a"}
          />
          {i < 3 && (
            <line
              x1="228"
              x2="228"
              y1={71 + i * 32}
              y2={93 + i * 32}
              stroke={LINE}
              strokeWidth="1.5"
            />
          )}
          <rect
            x="242"
            y={62 + i * 32}
            width={[46, 36, 50, 30][i]}
            height="4"
            rx="2"
            fill={T.text}
            opacity=".7"
          />
          <rect
            x="242"
            y={70 + i * 32}
            width={[30, 40, 24, 36][i]}
            height="3"
            rx="1.5"
            fill={T.textDim}
          />
        </g>
      ))}
      <circle className="pk-step" cx="228" cy="130" r="5" fill={T.orange} />
    </svg>
  );
}

export const PACKAGE_SCENES = [
  WPScene,
  AppScene,
  AuditScene,
  DesignSystemScene,
  StrategyScene,
];
