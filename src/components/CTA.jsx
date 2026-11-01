"use client";
import { useRef } from "react";
import { m, LazyMotion, domAnimation } from "motion/react";
import { T } from "../theme";
import { AnimButton, GhostButton } from "./Buttons";
import { useApp } from "../context/AppContext";
import { Dots } from "./Dots";

const EASE = [0.16, 1, 0.3, 1];
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.85, delay, ease: EASE },
});

// "Ready to launch" banner above the footer on inner pages. The space video
// stays as the backdrop; hovering the main button speeds it up (same idea as
// the warp on the hero and contact form).
export function CTA({ t }) {
  const { openQuote } = useApp();
  const video = useRef(null);
  const c = t.cta;
  const speed = (rate) => () => {
    if (video.current) video.current.playbackRate = rate;
  };
  return (
    <LazyMotion features={domAnimation}>
      <section className="cta">
        <video
          ref={video}
          className="cta-video"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        >
          <source src="/dev-space.mp4" type="video/mp4" />
        </video>
        <div className="cta-shade" aria-hidden="true" />
        <div className="cta-inner">
          <m.div className="cta-copy" {...reveal()}>
            <div className="svx-label" style={{ color: T.green }}>
              {c.tag}
            </div>
            <h2 className="cta-title"><Dots>{c.title}</Dots></h2>
            <p className="cta-desc">{c.desc}</p>
          </m.div>
          <m.div className="cta-side" {...reveal(0.12)}>
            <ul className="cta-points">
              {c.points.map((p) => (
                <li key={p}>
                  <span />
                  {p}
                </li>
              ))}
            </ul>
            <div className="cta-actions">
              <span
                className="cta-main"
                onMouseEnter={speed(2.5)}
                onMouseLeave={speed(1)}
                onFocus={speed(2.5)}
                onBlur={speed(1)}
              >
                <AnimButton to="/contact">{c.btn}</AnimButton>
              </span>
              <GhostButton onClick={openQuote}>{c.btn2}</GhostButton>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
