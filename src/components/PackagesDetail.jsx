"use client";
import { useEffect, useRef, useState } from "react";
import { m, LazyMotion, domMax } from "motion/react";
import { T } from "../theme";
import { AnimButton } from "./Buttons";
import { PACKAGE_SCENES } from "./packages/PackageScenes";
import { Dots } from "./Dots";

const EASE = [0.16, 1, 0.3, 1];
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.85, delay, ease: EASE },
});

// Same colours as the tabs on the home page (Packages.jsx).
const META = [
  { color: T.accent, rgb: "108,92,231" },
  { color: T.green, rgb: "0,206,201" },
  { color: T.accentLight, rgb: "162,155,254" },
  { color: "#fd79a8", rgb: "253,121,168" },
  { color: T.orange, rgb: "253,203,110" },
];

const anchor = (i) => `package-${i + 1}`;

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

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const jump = (i) => (e) => {
  e.preventDefault();
  document
    .getElementById(anchor(i))
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Highlights the package section currently in view.
function useActiveSection(n) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const els = Array.from({ length: n }, (_, i) =>
      document.getElementById(anchor(i)),
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(els.indexOf(en.target));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [n]);
  return active;
}

function PackageSection({ p, i, c, onQuote }) {
  const meta = META[i];
  const Scene = PACKAGE_SCENES[i];
  return (
    <section
      id={anchor(i)}
      className={`pkd ${i % 2 ? "is-flip" : ""}`}
      style={{ "--c": meta.color, "--tint": `rgba(${meta.rgb},.16)` }}
    >
      <div className="pkd-top">
        <m.div className="pkd-copy" {...reveal()}>
          <span className="pkd-count">{String(i + 1).padStart(2, "0")}</span>
          <span
            className="pk-badge"
            style={{ color: meta.color, background: `rgba(${meta.rgb},.12)` }}
          >
            {p.badge}
          </span>
          <h2 className="pkd-title">{p.title}</h2>
          <p className="pkd-desc">{p.desc}</p>
          <p className="pk-best">
            <span>{c.bestFor}:</span> {p.bestFor}
          </p>
          <div>
            <AnimButton onClick={() => onQuote(i)}>{c.cta}</AnimButton>
          </div>
        </m.div>
        <m.div className="pkd-art" {...reveal(0.12)}>
          <Scene active />
        </m.div>
      </div>
      <div className="pkd-bottom">
        <m.div className="pkd-how" {...reveal()}>
          <div className="pk-sub">{c.howTitle}</div>
          <ol>
            {p.steps.map((s, k) => (
              <li key={s.title}>
                <span className="pkd-step">{k + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </m.div>
        <m.div className="pkd-feat" {...reveal(0.1)}>
          <div className="pk-sub">{c.included}</div>
          <ul className="pk-feat">
            {p.feat.map((f) => (
              <li key={f}>
                <Check color={meta.color} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </m.div>
      </div>
    </section>
  );
}

// /packages: the home-page tabs unpacked into a guide plus one full section
// per package, with a sticky jump nav that follows the scroll.
export function PackagesDetail({ t, onQuote }) {
  const c = t.packages;
  const active = useActiveSection(c.items.length);
  const navRef = useRef(null);
  // keep the active tab visible when the nav scrolls sideways (mobile)
  useEffect(() => {
    const nav = navRef.current;
    const tab = nav?.children[active];
    if (!nav || !tab || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({
      left: tab.offsetLeft - (nav.clientWidth - tab.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);
  return (
    <LazyMotion features={domMax}>
      {/* guide */}
      <section className="svx" style={{ paddingTop: 80 }}>
        <div className="svx-inner">
          <m.div className="svx-head" {...reveal()}>
            <div>
              <div className="svx-label" style={{ color: T.green }}>
                {c.guideTag}
              </div>
              <h2 className="svx-title"><Dots>{c.guideTitle}</Dots></h2>
            </div>
            <p className="svx-intro">{c.guideIntro}</p>
          </m.div>
          <ul className="pkd-guide">
            {c.guide.map((g, k) => (
              <m.li key={g} {...reveal(k * 0.06)}>
                <a
                  href={`#${anchor(k)}`}
                  onClick={jump(k)}
                  style={{ "--c": META[k].color }}
                >
                  <span className="pkd-guide-need">{g}</span>
                  <span className="pkd-guide-pkg">
                    <span
                      className="pks-dot"
                      style={{ background: META[k].color }}
                    />
                    {c.items[k].title}
                  </span>
                  <span className="pkd-guide-go">
                    <Arrow />
                  </span>
                </a>
              </m.li>
            ))}
          </ul>
        </div>
      </section>

      {/* nav lives inside the list, so it only sticks while packages are on screen */}
      <div className="pkd-list">
        <div className="pkd-nav-wrap">
          <nav ref={navRef} className="pks-tabs pkd-nav" aria-label={c.title}>
            {c.items.map((it, k) => (
              <a
                key={k}
                href={`#${anchor(k)}`}
                onClick={jump(k)}
                className="pks-tab"
                style={{ color: active === k ? T.white : T.textMuted }}
                aria-current={active === k ? "true" : undefined}
              >
                {active === k && (
                  <m.span
                    layoutId="pkd-pill"
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
              </a>
            ))}
          </nav>
        </div>
        {c.items.map((p, i) => (
          <PackageSection key={p.title} p={p} i={i} c={c} onQuote={onQuote} />
        ))}
      </div>
    </LazyMotion>
  );
}
