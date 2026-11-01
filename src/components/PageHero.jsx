"use client";
import { T } from "../theme";
import { Reveal } from "./Reveal";
import { ParticlesCanvas } from "./ParticlesCanvas";

export function PageHero({ tag, title, desc, color = T.accent }) {
  return (
    <section
      style={{
        padding: "160px 24px 80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${color}40 0%, transparent 60%), ${T.bg}`,
      }}
    >
      <ParticlesCanvas />
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {tag && (
          <Reveal instant>
            <span
              style={{
                color,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {tag}
            </span>
          </Reveal>
        )}
        <Reveal instant delay={0.1}>
          <h1
            style={{
              fontFamily: T.fontDisplay,
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 800,
              color: T.white,
              lineHeight: 1.1,
              margin: "16px 0 20px",
              letterSpacing: "-1px",
            }}
          >
            {title}
          </h1>
        </Reveal>
        {desc && (
          <Reveal instant delay={0.2}>
            <p
              style={{
                color: T.textMuted,
                fontSize: 18,
                lineHeight: 1.7,
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              {desc}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
