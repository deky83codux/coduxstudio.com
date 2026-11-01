"use client";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/lib/router";
import { m, LazyMotion, domAnimation } from "motion/react";
import { T, SITE_URL } from "../theme";
import { AnimButton, GhostButton } from "../components/Buttons";
import { Seo } from "../components/Seo";
import { AgentConsole } from "../components/AIPromo";
import { StarField } from "../components/hero/StarField";
import { usePrefersReducedMotion } from "../components/hero/hooks";
import { AIScene } from "../components/services/ServiceScenes";
import { AuditScene, AppScene } from "../components/packages/PackageScenes";
import { useApp } from "../context/AppContext";
import { Dots } from "../components/Dots";

const EASE = [0.16, 1, 0.3, 1];
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.85, delay, ease: EASE },
});

// Benefits bento: three cards carry a live scene, three are type-only.
const CARD_META = [
  {
    scene: AIScene,
    rgb: "162,155,254",
    color: T.accentLight,
    span: 7,
    order: 0,
  },
  { scene: null, rgb: "108,92,231", color: T.accent, span: 5, order: 1 },
  { scene: AuditScene, rgb: "0,206,201", color: T.green, span: 7, order: 3 },
  { scene: null, rgb: "253,203,110", color: T.orange, span: 5, order: 2 },
  { scene: AppScene, rgb: "0,206,201", color: T.green, span: 7, order: 4 },
  { scene: null, rgb: "253,121,168", color: "#fd79a8", span: 5, order: 5 },
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

function Hero({ a, p, onQuote }) {
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
    const io = new IntersectionObserver(([e]) =>
      e.isIntersecting ? s.start() : s.stop(),
    );
    io.observe(canvas.current);
    const onMove = (e) =>
      s.setPointer(
        -((e.clientX / window.innerWidth) * 2 - 1),
        -((e.clientY / window.innerHeight) * 2 - 1),
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
    <section className="aic-hero">
      <canvas ref={canvas} className="aic-stars" aria-hidden="true" />
      <div className="aic-hero-grid">
        <div className="aic-hero-copy hero-in" style={{ "--y": "28px" }}>
          <div className="svx-label" style={{ color: T.accentLight }}>
            {a.tag}
          </div>
          <h1 className="aic-h1">{a.title}</h1>
          <p className="aic-sub">{a.subtitle}</p>
          <div className="aic-actions">
            <AnimButton onClick={onQuote}>{a.heroBtn}</AnimButton>
            <GhostButton href="#audit">{a.heroBtn2}</GhostButton>
          </div>
        </div>
        <m.div {...reveal(0.15)}>
          <AgentConsole p={p} />
        </m.div>
      </div>
    </section>
  );
}

function BenefitCard({ b, i }) {
  const meta = CARD_META[i] || CARD_META[1];
  const Scene = meta.scene;
  const [active, setActive] = useState(false);
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
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

export function AIConsultingPage() {
  const { t, lang, openQuote } = useApp();
  const a = t.aiConsulting;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: a.title,
    serviceType: "AI consulting and business process automation",
    provider: { "@type": "Organization", name: "Codux Studio" },
    description: a.subtitle,
    areaServed: ["RS", "EU", "US"],
    url: `${SITE_URL}/ai-consulting`,
  };

  return (
    <LazyMotion features={domAnimation}>
      <Seo
        title={`${a.title} — Codux Studio`}
        description={a.subtitle}
        path="/ai-consulting"
        lang={lang}
        jsonLd={jsonLd}
      />
      {/* the inner-page Saturn decor would collide with the agent console */}
      <style>{".saturn-fixed{display:none!important}"}</style>

      <Hero a={a} p={t.aiPromo} onQuote={openQuote} />

      {/* Benefits */}
      <section className="svx">
        <div className="svx-inner">
          <m.div className="svx-head" {...reveal()}>
            <div>
              <div className="svx-label" style={{ color: T.accentLight }}>
                {a.benefitsTag}
              </div>
              <h2 className="svx-title"><Dots>{a.benefitsTitle}</Dots></h2>
            </div>
            <p className="svx-intro">{a.whyDesc}</p>
          </m.div>
          <div className="svb-grid aic-grid">
            {a.benefits.map((b, i) => (
              <BenefitCard key={i} b={b} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="svx aic-process">
        <div className="svx-inner">
          <m.div className="svx-head" {...reveal()}>
            <div>
              <div className="svx-label" style={{ color: T.green }}>
                {a.processTag}
              </div>
              <h2 className="svx-title"><Dots>{a.processTitle}</Dots></h2>
            </div>
            <p className="svx-intro">{a.whyTitle}</p>
          </m.div>
          <ol className="aic-steps">
            <m.span
              className="aic-line"
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.6, ease: EASE }}
            />
            {a.process.map((s, i) => (
              <m.li key={s.title} {...reveal(0.2 + i * 0.15)}>
                <span className="aic-num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </m.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Included + audit */}
      <section className="svx" id="audit">
        <div className="svx-inner aic-included">
          <m.div {...reveal()}>
            <div className="svx-label" style={{ color: T.orange }}>
              {a.featuresTag}
            </div>
            <h2 className="svx-title" style={{ marginBottom: 32 }}><Dots>{a.featuresTitle}</Dots></h2>
            <ul className="pk-feat aic-feat">
              {a.features.map((f) => (
                <li key={f}>
                  <Check color={T.accentLight} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </m.div>
          <m.aside className="aic-audit" {...reveal(0.15)}>
            <div className="aic-audit-scene">
              <AuditScene active />
            </div>
            <span
              className="pk-badge"
              style={{
                color: T.accentLight,
                background: "rgba(162,155,254,.12)",
              }}
            >
              {a.auditBadge}
            </span>
            <h3>{a.auditTitle}</h3>
            <p>{a.auditDesc}</p>
            <AnimButton onClick={openQuote} style={{ width: "100%" }}>
              {a.auditBtn}
            </AnimButton>
            <Link to="/packages" className="aic-audit-link">
              {a.auditLink}
            </Link>
          </m.aside>
        </div>
      </section>
    </LazyMotion>
  );
}
