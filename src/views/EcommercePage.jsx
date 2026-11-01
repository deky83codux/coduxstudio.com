"use client";
import { useEffect, useRef, useState } from "react";
import { m, LazyMotion, domAnimation } from "motion/react";
import { T, SITE_URL } from "../theme";
import { AnimButton, GhostButton } from "../components/Buttons";
import { Seo } from "../components/Seo";
import { AgentConsole } from "../components/AIPromo";
import { StarField } from "../components/hero/StarField";
import { usePrefersReducedMotion } from "../components/hero/hooks";
import { WPScene } from "../components/packages/PackageScenes";
import { StoreScene, GlobeScene } from "../components/ecommerce/StoreScenes";
import { useApp } from "../context/AppContext";
import { Dots } from "../components/Dots";

const READYCMS_URL = "https://www.readycms.io/en/cms-for-clients/";
const EASE = [0.16, 1, 0.3, 1];
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.85, delay, ease: EASE },
});

// Benefits bento (same order as t.ecommerce.benefits): three cards carry a
// live scene, three are type-only with orbit rings.
const CARD_META = [
  { scene: StoreScene, rgb: "0,206,201", color: T.green, span: 7, order: 0 },
  { scene: WPScene, rgb: "108,92,231", color: T.accent, span: 5, order: 1 },
  { scene: null, rgb: "253,203,110", color: T.orange, span: 5, order: 2 },
  {
    scene: GlobeScene,
    rgb: "162,155,254",
    color: T.accentLight,
    span: 7,
    order: 3,
  },
  { scene: null, rgb: "0,206,201", color: T.green, span: 6, order: 4 },
  { scene: null, rgb: "253,121,168", color: "#fd79a8", span: 6, order: 5 },
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

function Hero({ e, onQuote }) {
  const canvas = useRef(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const s = new StarField(canvas.current, {
      reduced,
      density: 0.7,
      transparent: true,
    });
    const ro = new ResizeObserver(() => s.resize());
    ro.observe(canvas.current.parentElement);
    const io = new IntersectionObserver(([x]) =>
      x.isIntersecting ? s.start() : s.stop(),
    );
    io.observe(canvas.current);
    const onMove = (ev) =>
      s.setPointer(
        -((ev.clientX / window.innerWidth) * 2 - 1),
        -((ev.clientY / window.innerHeight) * 2 - 1),
      );
    if (!reduced)
      window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      s.destroy();
    };
  }, [reduced]);
  return (
    <section className="aic-hero es-hero">
      <canvas ref={canvas} className="aic-stars" aria-hidden="true" />
      <div className="aic-hero-grid">
        <div className="aic-hero-copy hero-in" style={{ "--y": "28px" }}>
          <div className="svx-label" style={{ color: T.green }}>
            {e.tag}
          </div>
          <h1 className="aic-h1">{e.title}</h1>
          <p className="aic-sub">{e.subtitle}</p>
          <div className="aic-actions">
            <AnimButton onClick={onQuote}>{e.heroBtn}</AnimButton>
            <GhostButton href="#features">{e.heroBtn2}</GhostButton>
          </div>
        </div>
        <m.div {...reveal(0.15)}>
          <AgentConsole p={e.console} />
        </m.div>
      </div>
    </section>
  );
}

function BenefitCard({ b, i }) {
  const meta = CARD_META[i] || CARD_META[2];
  const Scene = meta.scene;
  const [active, setActive] = useState(false);
  const onMove = (ev) => {
    const r = ev.currentTarget.getBoundingClientRect();
    ev.currentTarget.style.setProperty("--mx", `${ev.clientX - r.left}px`);
    ev.currentTarget.style.setProperty("--my", `${ev.clientY - r.top}px`);
  };
  return (
    <m.article
      className={`svb-card aic-card ${Scene ? "" : "is-text"}`}
      style={{
        gridColumn: `span ${meta.span}`,
        order: meta.order,
        "--c": meta.color,
        "--glow": `rgba(${meta.rgb},.16)`,
        "--tint": `rgba(${meta.rgb},.12)`,
      }}
      onPointerMove={onMove}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      {...reveal((i % 2) * 0.1)}
    >
      {Scene && (
        <div className="svb-visual">
          <Scene active={active} />
        </div>
      )}
      <div className="svb-body">
        {!Scene && (
          <span
            className="aic-dot"
            style={{
              background: meta.color,
              boxShadow: `0 0 18px ${meta.color}`,
            }}
          />
        )}
        <h3 className="svb-title">{b.title}</h3>
        <p className="svb-desc">{b.desc}</p>
      </div>
    </m.article>
  );
}

export function EcommercePage() {
  const { t, lang, openQuote } = useApp();
  const e = t.ecommerce;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: e.title,
    serviceType: "E-commerce website development",
    provider: { "@type": "Organization", name: "Codux Studio" },
    description: e.subtitle,
    areaServed: ["RS", "EU", "US"],
    url: `${SITE_URL}/ecommerce`,
  };

  return (
    <LazyMotion features={domAnimation}>
      <Seo
        title={`${e.title} — Codux Studio`}
        description={e.subtitle}
        path="/ecommerce"
        lang={lang}
        jsonLd={jsonLd}
      />
      {/* the inner-page Saturn decor would collide with the store console */}
      <style>{".saturn-fixed{display:none!important}"}</style>

      <Hero e={e} onQuote={openQuote} />

      {/* Benefits */}
      <section className="svx">
        <div className="svx-inner">
          <m.div className="svx-head" {...reveal()}>
            <div>
              <div className="svx-label" style={{ color: T.green }}>
                {e.benefitsTag}
              </div>
              <h2 className="svx-title"><Dots>{e.benefitsTitle}</Dots></h2>
            </div>
            <p className="svx-intro">{e.whyTitle}</p>
          </m.div>
          <div className="svb-grid aic-grid">
            {e.benefits.map((b, i) => (
              <BenefitCard key={i} b={b} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Features + ReadyCMS */}
      <section className="svx aic-process" id="features">
        <div className="svx-inner aic-included">
          <m.div {...reveal()}>
            <div className="svx-label" style={{ color: T.orange }}>
              {e.featuresTag}
            </div>
            <h2 className="svx-title" style={{ marginBottom: 20 }}><Dots>{e.featuresTitle}</Dots></h2>
            <p
              className="svx-intro"
              style={{ maxWidth: 640, marginBottom: 32 }}
            >
              {e.whyDesc}
            </p>
            <ul className="pk-feat aic-feat">
              {e.features.map((f) => (
                <li key={f}>
                  <Check color={T.green} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </m.div>
          <m.aside className="aic-audit es-rc" {...reveal(0.15)}>
            <div className="aic-audit-scene">
              <StoreScene active />
            </div>
            <span
              className="pk-badge"
              style={{ color: T.green, background: "rgba(0,206,201,.12)" }}
            >
              {e.rcBadge}
            </span>
            <h3>{e.rcTitle}</h3>
            <p>{e.rcDesc}</p>
            <AnimButton onClick={openQuote} style={{ width: "100%" }}>
              {e.rcBtn}
            </AnimButton>
            <a
              href={READYCMS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="aic-audit-link"
            >
              {e.rcLink}
            </a>
          </m.aside>
        </div>
      </section>
    </LazyMotion>
  );
}
