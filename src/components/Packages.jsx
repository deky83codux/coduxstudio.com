"use client";
import { useState } from "react";
import { m, AnimatePresence, LazyMotion, domMax } from "motion/react";
import { T } from "../theme";
import { AnimButton } from "./Buttons";
import { PACKAGE_SCENES } from "./packages/PackageScenes";
import { Dots } from "./Dots";

const EASE = [0.16, 1, 0.3, 1];

// Tab colour per package; all copy lives in translations.js (t.packages).
const META = [
  { color: T.accent, rgb: "108,92,231" },
  { color: T.green, rgb: "0,206,201" },
  { color: T.accentLight, rgb: "162,155,254" },
  { color: "#fd79a8", rgb: "253,121,168" },
  { color: T.orange, rgb: "253,203,110" },
];

function Check({ color }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      style={{ flex: "none", marginTop: 2 }}
    >
      <circle cx="9" cy="9" r="9" fill={color} fillOpacity=".16" />
      <path
        d="M5.5 9.2l2.3 2.3 4.7-5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// `head={false}` hides the section heading (used on /packages, where the
// page hero already introduces it).
export function Packages({ t, onQuote, head = true }) {
  const c = t.packages;
  const [i, setI] = useState(0);
  const meta = META[i];
  const p = c.items[i];
  const Scene = PACKAGE_SCENES[i];
  return (
    <LazyMotion features={domMax}>
      <section className="svx" id="packages">
        <div className="svx-inner">
          {head && (
            <m.div
              className="svx-head"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <div>
                <div className="svx-label" style={{ color: T.green }}>
                  {c.tag}
                </div>
                <h2 className="svx-title"><Dots>{c.title}</Dots></h2>
              </div>
              <p className="svx-intro">{c.intro}</p>
            </m.div>
          )}
          <div className="pks-tabs" role="tablist" aria-label={c.title}>
            {c.items.map((it, k) => (
              <button
                key={k}
                role="tab"
                aria-selected={i === k}
                className="pks-tab"
                onClick={(e) => {
                  setI(k);
                  e.currentTarget.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                  });
                }}
                style={{ color: i === k ? T.white : T.textMuted }}
              >
                {i === k && (
                  <m.span
                    layoutId="pks-pill"
                    className="pks-pill"
                    style={{
                      background: `rgba(${META[k].rgb},.18)`,
                      borderColor: META[k].color,
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span
                  className="pks-dot"
                  style={{ background: META[k].color }}
                />
                <span style={{ position: "relative" }}>{it.tab}</span>
              </button>
            ))}
          </div>
          <div
            className="pks-panel"
            style={{
              "--tint": `rgba(${meta.rgb},.16)`,
              borderColor: `rgba(${meta.rgb},.35)`,
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={i}
                className="pks-grid"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <div className="pks-main">
                  <span
                    className="pk-badge"
                    style={{
                      color: meta.color,
                      background: `rgba(${meta.rgb},.12)`,
                    }}
                  >
                    {p.badge}
                  </span>
                  <h3 className="pks-title">{p.title}</h3>
                  <p className="pks-desc">{p.desc}</p>
                  <p className="pk-best">
                    <span>{c.bestFor}:</span> {p.bestFor}
                  </p>
                  <div>
                    <AnimButton onClick={() => onQuote(i)}>{c.cta}</AnimButton>
                  </div>
                  <div className="pks-scene">
                    <Scene active />
                  </div>
                </div>
                <div className="pks-side">
                  <div className="pk-sub">{c.included}</div>
                  <ul className="pk-feat">
                    {p.feat.map((f) => (
                      <li key={f}>
                        <Check color={meta.color} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
