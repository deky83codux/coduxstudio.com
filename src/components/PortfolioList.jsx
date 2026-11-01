"use client";
import { useState } from "react";
import { Link } from "@/lib/router";
import {
  m,
  AnimatePresence,
  LazyMotion,
  domAnimation,
  useMotionValue,
  useSpring,
} from "motion/react";
import { T } from "../theme";
import { projects } from "../data/projects";
import { Arrow, Browser } from "./portfolio/parts";

const EASE = [0.16, 1, 0.3, 1];
// each row gets its own accent on hover (same palette as the packages)
const ROW_COLORS = ["#6c5ce7", "#00cec9", "#a29bfe", "#fd79a8", "#fdcb6e"];

// /portfolio: large-type project list; a preview follows the cursor (desktop).
export function PortfolioList({ t, lang }) {
  const [hover, setHover] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };
  const cur = hover == null ? null : projects[hover];
  return (
    <LazyMotion features={domAnimation}>
      <section className="svx" id="portfolio">
        <div className="svx-inner">
          <div
            className="pfl-wrap"
            onPointerMove={onMove}
            onPointerLeave={() => setHover(null)}
          >
            <ul className="pfl-list">
              {projects.map((p, i) => (
                <m.li
                  key={p.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.6,
                    delay: (i % 4) * 0.05,
                    ease: EASE,
                  }}
                >
                  <Link
                    to={`/portfolio/${p.slug}`}
                    className={`pfl-row ${hover === i ? "is-on" : ""} ${hover != null && hover !== i ? "is-dim" : ""}`}
                    style={{ "--c": ROW_COLORS[i % ROW_COLORS.length] }}
                    onPointerEnter={() => setHover(i)}
                    onFocus={() => setHover(i)}
                  >
                    <span className="pfl-year">{p.year}</span>
                    <span className="pfl-title">{p.title}</span>
                    <span className="pfl-ind">{p.industry[lang]}</span>
                    <span className="pfl-tech">
                      {p.tech.slice(0, 3).join(", ")}
                    </span>
                    <span className="pfl-go" aria-hidden="true">
                      <Arrow />
                    </span>
                    <img
                      className="pfl-thumb"
                      src={p.img}
                      alt=""
                      loading="lazy"
                    />
                  </Link>
                </m.li>
              ))}
            </ul>
            {/* preview that follows the cursor (desktop only) */}
            <m.div
              className="pfl-float"
              style={{ x: sx, y: sy }}
              aria-hidden="true"
            >
              <AnimatePresence>
                {cur && (
                  <m.div
                    key={cur.slug}
                    className="pfl-float-inner"
                    initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <Browser src={cur.img} alt="" eager />
                    <div className="pfl-float-cap">
                      {t.portfolio.descs[cur.descIndex]}
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
