"use client";
import { useEffect, useRef } from "react";
import { T } from "../theme";
import { AnimButton, GhostButton } from "../components/Buttons";
import { StarField } from "../components/hero/StarField";
import { usePrefersReducedMotion } from "../components/hero/hooks";
import { useApp } from "../context/AppContext";
import { Dots } from "../components/Dots";

const COPY = {
  en: {
    title: "This page drifted out of orbit.",
    desc: "The page you're looking for has moved or no longer exists. Head back to base, or have a look at what we've launched.",
    home: "Back to home",
    work: "See our work",
    meta: "Page not found",
  },
  sr: {
    title: "Ova stranica je izletela iz orbite.",
    desc: "Stranica koju tražite je premeštena ili više ne postoji. Vratite se u bazu ili pogledajte šta smo lansirali.",
    home: "Nazad na početnu",
    work: "Pogledajte radove",
    meta: "Stranica nije pronađena",
  },
};

// The "0" in 404 is a small ringed planet; the moon orbits it.
function Planet0() {
  return (
    <svg className="nf-planet" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <radialGradient id="nfBody" cx="34%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity=".35" />
          <stop offset="25%" stopColor={T.accentLight} />
          <stop offset="70%" stopColor={T.accent} />
          <stop offset="100%" stopColor="#1b1450" />
        </radialGradient>
      </defs>
      <ellipse
        cx="100"
        cy="100"
        rx="94"
        ry="24"
        fill="none"
        stroke={T.green}
        strokeOpacity=".35"
        strokeWidth="4"
        transform="rotate(-18 100 100)"
      />
      <circle cx="100" cy="100" r="56" fill="url(#nfBody)" />
      <path
        d="M6 100 A94 24 0 0 0 194 100"
        fill="none"
        stroke={T.green}
        strokeWidth="4"
        strokeLinecap="round"
        transform="rotate(-18 100 100)"
      />
      <g className="nf-moon">
        <circle cx="100" cy="14" r="7" fill={T.orange} />
      </g>
    </svg>
  );
}

export function NotFound() {
  const { lang } = useApp();
  const copy = COPY[lang] || COPY.en;
  const canvas = useRef(null);
  const field = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    document.title = `404 — ${copy.meta} | Codux Studio`;
    let robots = document.head.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    const prev = robots.getAttribute("content");
    robots.setAttribute("content", "noindex, nofollow");
    document.documentElement.setAttribute("data-seo-ready", "true");
    return () => {
      if (prev) robots.setAttribute("content", prev);
    };
  }, [copy.meta]);

  useEffect(() => {
    const s = new StarField(canvas.current, {
      reduced,
      density: 0.8,
      maxWarp: 0.9,
      transparent: true,
    });
    field.current = s;
    const ro = new ResizeObserver(() => s.resize());
    ro.observe(canvas.current.parentElement);
    s.start();
    const onMove = (e) =>
      s.setPointer(
        -((e.clientX / window.innerWidth) * 2 - 1),
        -((e.clientY / window.innerHeight) * 2 - 1),
      );
    if (!reduced)
      window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      s.destroy();
    };
  }, [reduced]);

  const warp = (on) => () => field.current?.setWarp(on);

  return (
    <section className="nf">
      {/* the inner-page Saturn would sit on top of the 404 planet */}
      <style>{".saturn-fixed{display:none!important}"}</style>
      <canvas ref={canvas} className="nf-stars" aria-hidden="true" />
      <div className="nf-inner">
        <div className="nf-code" aria-label="404">
          <span>4</span>
          <Planet0 />
          <span>4</span>
        </div>
        <h1 className="nf-title"><Dots>{copy.title}</Dots></h1>
        <p className="nf-desc">{copy.desc}</p>
        <div className="nf-actions">
          <span
            onMouseEnter={warp(true)}
            onMouseLeave={warp(false)}
            onFocus={warp(true)}
            onBlur={warp(false)}
            style={{ display: "inline-flex" }}
          >
            <AnimButton to="/">{copy.home}</AnimButton>
          </span>
          <GhostButton to="/portfolio">{copy.work}</GhostButton>
        </div>
      </div>
    </section>
  );
}
