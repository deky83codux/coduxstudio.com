"use client";
import { useEffect, useRef, useState } from "react";
import { m, LazyMotion, domAnimation, useInView, AnimatePresence } from "motion/react";
import { T } from "../theme";
import { AnimButton } from "./Buttons";
import { usePrefersReducedMotion } from "./hero/hooks";

const EASE = [0.16, 1, 0.3, 1];
const STEP_MS = 1300;
const HOLD_MS = 2600;

function Tick() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flex: "none" }}>
      <circle cx="9" cy="9" r="9" fill={T.green} fillOpacity=".16" />
      <path d="M5.5 9.2l2.3 2.3 4.7-5" stroke={T.green} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Typing() {
  return (
    <span className="aip-typing" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

// A small "agent at work" console: steps appear one by one, then it loops.
export function AgentConsole({ p }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-80px" });
  const reduced = usePrefersReducedMotion();
  const total = p.log.length;
  const [step, setStep] = useState(reduced ? total : 0);

  useEffect(() => {
    if (reduced) {
      setStep(total);
      return;
    }
    if (!inView) return;
    const id = setTimeout(
      () => setStep((s) => (s >= total ? 0 : s + 1)),
      step >= total ? HOLD_MS : STEP_MS,
    );
    return () => clearTimeout(id);
  }, [step, inView, reduced, total]);

  const done = step >= total;
  return (
    <div ref={ref} className="aip-console" aria-hidden="true">
      <div className="aip-console-head">
        <span className="aip-avatar">{p.avatar || "AI"}</span>
        <span style={{ fontWeight: 600, color: T.white }}>{p.agent}</span>
        <span className="aip-live">
          <span />
          {p.live}
        </span>
      </div>
      <ol className="aip-log">
        {p.log.map((line, i) => {
          // every row is always rendered (no layout shift); future rows stay hidden
          const shown = i <= step;
          const working = i === step && !done;
          return (
            <m.li
              key={i}
              initial={false}
              animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: shown ? 0.45 : 0.2, ease: EASE }}
              className={i === 0 ? "is-input" : ""}
            >
              {working ? <span className="aip-spin" /> : <Tick />}
              <span>{line}</span>
              {working && <Typing />}
            </m.li>
          );
        })}
      </ol>
      <div className="aip-foot">
        <div className="aip-bar">
          <m.span
            animate={{ scaleX: Math.min(step, total) / total }}
            transition={{ duration: 0.6, ease: EASE }}
          />
        </div>
        <AnimatePresence>
          {done && (
            <m.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {p.done}
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function AIPromo({ t }) {
  const p = t.aiPromo;
  return (
    <LazyMotion features={domAnimation}>
      <section className="aip">
        <m.div
          className="aip-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="aip-aurora" aria-hidden="true" />
          <div className="aip-copy">
            <div className="svx-label" style={{ color: T.accentLight }}>
              {p.tag}
            </div>
            <h2 className="aip-title">{p.title}</h2>
            <p className="aip-desc">{p.desc}</p>
            <ul className="svx-tags">
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div style={{ marginTop: 10 }}>
              <AnimButton to="/ai-consulting">{p.cta}</AnimButton>
            </div>
          </div>
          <AgentConsole p={p} />
        </m.div>
      </section>
    </LazyMotion>
  );
}
