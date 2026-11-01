"use client";
import { Link } from "@/lib/router";
import { T, SITE_URL } from "../theme";
import { Reveal } from "../components/Reveal";
import { AnimButton, GhostButton } from "../components/Buttons";
import { Seo } from "../components/Seo";
import { ParticlesCanvas } from "../components/ParticlesCanvas";
import { useApp } from "../context/AppContext";
import { getProjectBySlug, projects } from "../data/projects";
import { NotFound } from "./NotFound";

export function PortfolioItem({ slug }) {
  const project = getProjectBySlug(slug);
  const { t, lang } = useApp();

  if (!project) return <NotFound />;

  const shortDesc = t.portfolio.descs[project.descIndex];
  const longDesc = project.long[lang] || project.long.en;

  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: longDesc,
    url: `${SITE_URL}/portfolio/${project.slug}`,
    image: `${SITE_URL}${project.img}`,
    author: { "@type": "Organization", name: "Codux Studio" },
    datePublished: project.year,
  };

  return (
    <>
      <Seo
        title={`${project.title} — Case Study | Codux Studio`}
        description={`${project.title}: ${shortDesc}`}
        path={`/portfolio/${project.slug}`}
        image={project.img}
        type="article"
        lang={lang}
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section
        style={{
          padding: "140px 24px 60px",
          position: "relative",
          overflow: "hidden",
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${T.accentGlow} 0%, transparent 60%), ${T.bg}`,
        }}
      >
        <ParticlesCanvas />
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Reveal instant>
            <Link
              to="/portfolio"
              style={{
                color: T.textMuted,
                fontSize: 14,
                textDecoration: "none",
                display: "inline-block",
                marginBottom: 20,
              }}
            >
              {t.portfolio.back}
            </Link>
          </Reveal>
          <Reveal instant delay={0.05}>
            <span
              style={{
                color: T.accentLight,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {project.industry[lang]} · {project.year}
            </span>
          </Reveal>
          <Reveal instant delay={0.1}>
            <h1
              style={{
                fontFamily: T.fontDisplay,
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 800,
                color: T.white,
                margin: "12px 0 16px",
                lineHeight: 1.1,
                letterSpacing: "-1px",
              }}
            >
              {project.title}
            </h1>
          </Reveal>
          <Reveal instant delay={0.15}>
            <p
              style={{
                color: T.textMuted,
                fontSize: 18,
                lineHeight: 1.7,
                maxWidth: 720,
                margin: "0 0 28px",
              }}
            >
              {shortDesc}
            </p>
          </Reveal>
          <Reveal instant delay={0.2}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <AnimButton href={project.url} target="_blank" rel="noopener noreferrer">
                ↗ {t.portfolio.visit}
              </AnimButton>
              <GhostButton to="/portfolio">{t.portfolio.back}</GhostButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Image */}
      <section style={{ padding: "0 24px 60px", background: T.bg }}>
        <Reveal>
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              borderRadius: 24,
              overflow: "hidden",
              border: `1px solid ${T.border}`,
              boxShadow: `0 30px 80px rgba(0,0,0,.4), 0 0 60px ${T.accentGlow}`,
            }}
          >
            <img
              src={project.cover || project.img}
              alt={project.title}
              fetchPriority="high"
              style={{ width: "100%", display: "block" }}
            />
          </div>
        </Reveal>
      </section>

      {/* Body */}
      <section style={{ padding: "60px 24px 80px", background: T.bg }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
            gap: 48,
          }}
          className="contact-grid"
        >
          <Reveal>
            <div>
              <h2
                style={{
                  fontFamily: T.fontDisplay,
                  fontSize: 28,
                  color: T.white,
                  margin: "0 0 16px",
                }}
              >
                {t.portfolio.detailsTitle}
              </h2>
              {longDesc.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  style={{
                    color: T.text,
                    fontSize: 17,
                    lineHeight: 1.8,
                    margin: i === 0 ? 0 : "18px 0 0",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <aside
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderRadius: 20,
                padding: 28,
              }}
            >
              <DetailRow
                label={lang === "sr" ? "Klijent" : "Client"}
                value={project.title}
              />
              <DetailRow
                label={lang === "sr" ? "Industrija" : "Industry"}
                value={project.industry[lang]}
              />
              <DetailRow
                label={lang === "sr" ? "Naša uloga" : "Our role"}
                value={project.role[lang]}
              />
              <DetailRow
                label={lang === "sr" ? "Godina" : "Year"}
                value={project.year}
              />
              <div style={{ marginTop: 16 }}>
                <span
                  style={{
                    color: T.textDim,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {t.portfolio.techTitle}
                </span>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginTop: 10,
                  }}
                >
                  {project.tech.map((tech, j) => (
                    <span
                      key={j}
                      style={{
                        padding: "5px 12px",
                        borderRadius: 8,
                        fontSize: 12,
                        background: "rgba(108,92,231,.12)",
                        color: T.accentLight,
                        border: `1px solid rgba(108,92,231,.25)`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {project.caseStudy && <CaseStudy cs={project.caseStudy} lang={lang} />}

      {/* Gallery (only for projects that provide one) */}
      {project.gallery?.length > 0 && (
        <section style={{ padding: "20px 24px 80px", background: T.bg }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2
                style={{
                  fontFamily: T.fontDisplay,
                  fontSize: 28,
                  color: T.white,
                  margin: "0 0 28px",
                }}
              >
                {lang === "sr" ? "Pogled na projekat" : "Project gallery"}
              </h2>
            </Reveal>
            <div style={{ display: "grid", gap: 24 }}>
              {project.gallery.map((shot, i) => (
                <Reveal key={shot.src} delay={(i % 2) * 0.05}>
                  <figure
                    style={{
                      margin: 0,
                      borderRadius: 20,
                      overflow: "hidden",
                      border: `1px solid ${T.border}`,
                      boxShadow: "0 24px 60px rgba(0,0,0,.35)",
                    }}
                  >
                    <img
                      src={shot.src}
                      alt={shot.alt[lang] || shot.alt.en}
                      loading="lazy"
                      width={shot.width || 1440}
                      height={shot.height || 900}
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other projects */}
      <section style={{ padding: "60px 24px 100px", background: T.surface }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <h2
              style={{
                fontFamily: T.fontDisplay,
                fontSize: 28,
                color: T.white,
                margin: "0 0 28px",
                textAlign: "center",
              }}
            >
              {lang === "sr" ? "Drugi projekti" : "Other projects"}
            </h2>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {otherProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link
                  to={`/portfolio/${p.slug}`}
                  style={{
                    textDecoration: "none",
                    display: "block",
                    background: T.card,
                    border: `1px solid ${T.border}`,
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div style={{ padding: "16px 18px 20px" }}>
                    <h3
                      style={{
                        fontFamily: T.fontDisplay,
                        fontSize: 17,
                        color: T.white,
                        margin: "0 0 6px",
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        color: T.textMuted,
                        fontSize: 13,
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {t.portfolio.descs[p.descIndex]}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function DetailRow({ label, value }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          color: T.textDim,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 1,
          textTransform: "uppercase",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div style={{ color: T.text, fontSize: 15 }}>{value}</div>
    </div>
  );
}

const CS_COPY = {
  en: { challenge: "The challenge", solution: "What we did", results: "Results" },
  sr: { challenge: "Izazov", solution: "Šta smo uradili", results: "Rezultati" },
};
const CS_COLORS = ["#a29bfe", "#00cec9", "#fdcb6e", "#fd79a8"];

// Optional case-study block — rendered only for projects that define
// `caseStudy` in data/projects.js (challenge, solution, results, quote).
function CaseStudy({ cs, lang }) {
  const c = CS_COPY[lang];
  const pick = (v) => (v && typeof v === "object" ? v[lang] || v.en : v);
  return (
    <section className="cs">
      <div className="cs-inner">
        {cs.challenge && (
          <Reveal>
            <div className="cs-block">
              <span className="cs-num">01</span>
              <h2>{c.challenge}</h2>
              <p>{pick(cs.challenge)}</p>
            </div>
          </Reveal>
        )}
        {cs.solution && (
          <Reveal delay={0.05}>
            <div className="cs-block">
              <span className="cs-num">02</span>
              <h2>{c.solution}</h2>
              {Array.isArray(pick(cs.solution)) ? (
                <ul>
                  {pick(cs.solution).map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              ) : (
                <p>{pick(cs.solution)}</p>
              )}
            </div>
          </Reveal>
        )}
        {cs.results?.length > 0 && (
          <Reveal delay={0.1}>
            <div className="cs-block">
              <span className="cs-num">03</span>
              <h2>{c.results}</h2>
              <dl className="cs-results">
                {cs.results.map((r, i) => (
                  <div key={i} style={{ "--c": CS_COLORS[i % CS_COLORS.length] }}>
                    <dt>{pick(r.label)}</dt>
                    <dd>{r.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        )}
        {cs.quote && (
          <Reveal delay={0.1}>
            <figure className="cs-quote">
              <blockquote>“{pick(cs.quote.text)}”</blockquote>
              <figcaption>
                <strong>{cs.quote.author}</strong>
                {cs.quote.role && <span>{pick(cs.quote.role)}</span>}
              </figcaption>
            </figure>
          </Reveal>
        )}
      </div>
    </section>
  );
}
