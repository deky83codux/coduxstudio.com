"use client";
import { useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation } from "motion/react";
import { T } from "../theme";
import { AnimButton, GhostButton } from "./Buttons";
import { StarField } from "./hero/StarField";
import { RotatingWord } from "./hero/RotatingWord";
import {
  usePrefersReducedMotion,
  useOnScreen,
  usePageVisible,
} from "./hero/hooks";

const srOnly = {
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
};

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

// Masked line reveal: the line slides up from behind its own baseline.
function Line({ children, delay, reduced, style }) {
  return (
    <span
      style={{
        display: "block",
        overflow: "hidden",
        paddingBottom: "0.08em",
        ...style,
      }}
    >
      <span className="hero-in-line" style={{ display: "block", "--d": `${delay}s` }}>
        {children}
      </span>
    </span>
  );
}

// Home hero: canvas star field behind everything, a lazy-loaded Three.js
// particle planet on the right, and a headline whose last word rotates.
// Hovering the primary CTA gives the stars a gentle push.
export function Hero({ t }) {
  const c = t.hero;
  const stats = c.stats;
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const starsRef = useRef(null);
  const fieldRef = useRef(null);
  const [ready, setReady] = useState(false);
  const reduced = usePrefersReducedMotion();
  const onScreen = useOnScreen(sectionRef);
  const visible = usePageVisible();

  // Load three.js only after first paint, on idle.
  useEffect(() => {
    if (!hasWebGL()) return;
    let cancelled = false;
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 200));
    const id = idle(() => {
      import("./hero/planetScene").then(({ createPlanetScene }) => {
        if (cancelled || !canvasRef.current) return;
        sceneRef.current = createPlanetScene(canvasRef.current, {
          reduced,
          mobile: window.innerWidth < 820,
          stars: false,
        });
        sceneRef.current.start();
        setReady(true);
      });
    });
    return () => {
      cancelled = true;
      if (window.cancelIdleCallback && typeof id === "number")
        window.cancelIdleCallback(id);
      sceneRef.current?.destroy();
      sceneRef.current = null;
      setReady(false);
    };
  }, [reduced]);

  // Star field (canvas 2D) starts immediately; it is the first thing to move.
  useEffect(() => {
    const narrowNow = window.innerWidth < 820;
    const f = new StarField(starsRef.current, {
      reduced,
      density: narrowNow ? 0.6 : 0.85,
      maxWarp: 0.38,
      transparent: true,
    });
    fieldRef.current = f;
    const ro = new ResizeObserver(() => f.resize());
    ro.observe(starsRef.current.parentElement);
    f.start();
    return () => {
      ro.disconnect();
      f.destroy();
      fieldRef.current = null;
    };
  }, [reduced]);

  // Pause both render loops off-screen or in a background tab.
  useEffect(() => {
    const run = onScreen && visible;
    [sceneRef.current, fieldRef.current].forEach(
      (x) => x && (run ? x.start() : x.stop()),
    );
  }, [onScreen, visible, ready]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      sceneRef.current?.setPointer(x, y);
      fieldRef.current?.setPointer(-x, -y);
    };
    const onScroll = () => {
      const h = sectionRef.current?.offsetHeight || window.innerHeight;
      const p = Math.min(window.scrollY / h, 1);
      sceneRef.current?.setScroll(p);
      fieldRef.current?.setBoost(p);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  const statColors = [T.accentLight, T.green, T.orange];

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={sectionRef}
        className="hero-home"
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          background: `radial-gradient(ellipse 70% 60% at 72% 45%, rgba(108,92,231,.22) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 10% 100%, rgba(0,206,201,.08) 0%, transparent 70%), ${T.bg}`,
        }}
      >
        <canvas
          ref={starsRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <div className="hero-stage" aria-hidden="true">
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              opacity: ready ? 1 : 0,
              transition: "opacity 1.2s ease",
            }}
          />
        </div>

        <div className="hero-copy">
          <h1
            style={{
              fontFamily: T.fontDisplay,
              fontSize: "clamp(44px, 6.2vw, 88px)",
              fontWeight: 700,
              color: T.white,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              margin: "0 0 28px",
              maxWidth: 860,
            }}
          >
            <Line
              delay={0.15}
              reduced={reduced}
              style={{ whiteSpace: "nowrap" }}
            >
              {c.lead}
            </Line>
            <span style={srOnly}>{c.words.join(", ")}</span>
            <span className="hero-in" style={{ display: "block", "--d": "0.35s", "--y": "24px" }}>
              <RotatingWord words={c.words} reduced={reduced} />
            </span>
          </h1>
          <p
            className="hero-in"
            style={{
              "--d": "0.55s",
              fontSize: 18,
              lineHeight: 1.7,
              color: T.textMuted,
              maxWidth: 520,
              margin: "0 0 40px",
            }}
          >
            {c.desc}
          </p>
          <div
            className="hero-in"
            style={{ "--d": "0.7s", display: "flex", gap: 14, flexWrap: "wrap" }}
          >
            <span
              style={{ display: "inline-flex" }}
              onMouseEnter={() => fieldRef.current?.setWarp(true)}
              onMouseLeave={() => fieldRef.current?.setWarp(false)}
              onFocus={() => fieldRef.current?.setWarp(true)}
              onBlur={() => fieldRef.current?.setWarp(false)}
            >
              <AnimButton to="/packages">{c.btn1}</AnimButton>
            </span>
            <GhostButton to="/portfolio">{c.btn2}</GhostButton>
          </div>
          <dl className="hero-stats hero-in" style={{ "--d": "1.1s", "--y": "0px" }}>
            {stats.map((s, i) => (
              <div key={i}>
                <dt
                  style={{
                    fontSize: 13,
                    color: T.textMuted,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: statColors[i],
                      boxShadow: `0 0 10px ${statColors[i]}`,
                    }}
                  />
                  {s.l}
                </dt>
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
      </section>
    </LazyMotion>
  );
}
