"use client";
import { useEffect, useRef } from "react";
import { m, LazyMotion, domAnimation } from "motion/react";
import { Seo } from "../components/Seo";
import { StarField } from "../components/hero/StarField";
import { usePrefersReducedMotion } from "../components/hero/hooks";
import { T, SITE_URL } from "../theme";
import { useApp } from "../context/AppContext";
import { team } from "../data/team";
import { Dots } from "../components/Dots";

const EASE = [0.16, 1, 0.3, 1];
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.85, delay, ease: EASE },
});

const ORDER = [
  "dejan-pavlovic",
  "sonja-pavlovic",
  "milos-knezevic",
  "milisav-sapic",
  "nemanja-cacic",
  "dusan-jargic",
];
const CREW = ORDER.map((slug) => team.find((p) => p.slug === slug)).filter(
  Boolean,
);
const COLORS = [T.accent, T.orange, T.green, T.accentLight, "#fd79a8", T.green];
const VALUE_COLORS = [T.accentLight, T.green, T.orange, "#fd79a8"];

// Hero visual: the crew orbiting the studio core. Inner ring 2, outer ring 4.
function CrewOrbit() {
  const rings = [CREW.slice(0, 2), CREW.slice(2)];
  return (
    <div className="ab-orbit" aria-hidden="true">
      <div className="ab-core">CX</div>
      {rings.map((ring, r) => (
        <div key={r} className={`ab-ring ab-ring-${r}`}>
          {ring.map((p, i) => {
            // inner pair on the horizontal axis, outer four on the diagonals
            const angle = (360 / ring.length) * i + (r ? 45 : 0);
            const color = COLORS[CREW.indexOf(p)];
            return (
              <div
                key={p.slug}
                className="ab-sat"
                style={{ "--a": `${angle}deg` }}
              >
                <div className="ab-sat-inner" style={{ "--c": color }}>
                  <img src={p.img} alt="" loading="eager" draggable="false" />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Hero({ copy, stats, lang }) {
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
    <section className="aic-hero ab-hero">
      <canvas ref={canvas} className="aic-stars" aria-hidden="true" />
      <div className="aic-hero-grid">
        <div className="aic-hero-copy hero-in" style={{ "--y": "28px" }}>
          <div className="svx-label" style={{ color: T.green }}>
            {copy.tag}
          </div>
          <h1 className="aic-h1">{copy.title}</h1>
          <p className="aic-sub">{copy.desc}</p>
          <dl className="hero-stats" style={{ marginTop: 18 }}>
            {stats.map((s, i) => (
              <div key={i}>
                <dt style={{ fontSize: 13, color: T.textMuted }}>{s.l}</dt>
                <dd
                  style={{
                    fontFamily: T.fontDisplay,
                    fontSize: 30,
                    fontWeight: 600,
                    color: T.white,
                    marginTop: 4,
                  }}
                >
                  {s.n}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <m.div {...reveal(0.15)}>
          <CrewOrbit />
        </m.div>
      </div>
    </section>
  );
}

export function AboutPage() {
  const { t, lang } = useApp();
  const copy = t.about;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: copy.title,
    description: copy.desc,
    url: `${SITE_URL}/about`,
    mainEntity: {
      "@type": "Organization",
      name: "Codux Studio",
      url: SITE_URL,
      employee: team.map((p) => ({
        "@type": "Person",
        name: p.name,
        jobTitle: p.role[lang],
      })),
    },
  };
  // first sentence of the story is set larger, the rest as body text
  const [lead, ...rest] = copy.intro.split(/(?<=\.)\s/);

  return (
    <LazyMotion features={domAnimation}>
      <Seo
        title={`${copy.title} — Codux Studio`}
        description={copy.desc}
        path="/about"
        lang={lang}
        jsonLd={jsonLd}
      />
      {/* the inner-page Saturn would collide with the crew orbit */}
      <style>{".saturn-fixed{display:none!important}"}</style>

      <Hero copy={copy} stats={t.hero.stats} lang={lang} />

      {/* Story */}
      <section className="svx">
        <div className="svx-inner ab-story">
          <m.div {...reveal()}>
            <div className="svx-label" style={{ color: T.green }}>
              {copy.storyTag}
            </div>
          </m.div>
          <m.div {...reveal(0.1)}>
            <p className="ab-lead">{lead}</p>
            <p className="ab-body">{rest.join(" ")}</p>
          </m.div>
        </div>
      </section>

      {/* Values */}
      <section className="svx aic-process">
        <div className="svx-inner">
          <m.div className="svx-head" {...reveal()}>
            <div>
              <div className="svx-label" style={{ color: T.accentLight }}>
                {copy.valuesTag}
              </div>
              <h2 className="svx-title"><Dots>{copy.valuesTitle}</Dots></h2>
            </div>
          </m.div>
          <div className="ab-values">
            {copy.values.map((v, i) => (
              <m.article
                key={v.title}
                className="ab-value"
                style={{ "--c": VALUE_COLORS[i] }}
                {...reveal(i * 0.1)}
              >
                <span className="ab-value-dot" />
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </m.article>
            ))}
          </div>
        </div>
      </section>

      {/* Crew */}
      <section className="svx">
        <div className="svx-inner">
          <m.div className="svx-head" {...reveal()}>
            <div>
              <div className="svx-label" style={{ color: T.orange }}>
                {copy.galleryTag}
              </div>
              <h2 className="svx-title"><Dots>{copy.galleryTitle}</Dots></h2>
            </div>
            <p className="svx-intro">{copy.gallerySubtitle}</p>
          </m.div>
          <div className="ab-crew">
            {CREW.map((p, i) => (
              <m.figure
                key={p.slug}
                className="ab-member"
                style={{ "--c": COLORS[i] }}
                {...reveal((i % 3) * 0.08)}
              >
                <div className="ab-photo">
                  <img src={p.img} alt={p.name} loading="lazy" />
                </div>
                <figcaption>
                  <span className="ab-name">{p.name}</span>
                  <span className="ab-role">{p.role[lang]}</span>
                </figcaption>
              </m.figure>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
