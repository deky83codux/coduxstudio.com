"use client";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/lib/router";
import {
  m,
  LazyMotion,
  domAnimation,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { T } from "../theme";
import { projects } from "../data/projects";
import { Arrow, Browser } from "./portfolio/parts";
import { Dots } from "./Dots";

const EASE = [0.16, 1, 0.3, 1];

// Home portfolio: vertical scroll drives a horizontal rail of projects, and
// the rail can also be dragged — dragging scrolls the page 1:1, so both stay
// in sync. On narrow screens it falls back to a native swipe row.
export function Portfolio({ t, lang }) {
  const c = t.portfolio;
  const outer = useRef(null);
  const track = useRef(null);
  const drag = useRef(null);
  const sticky = useRef(null);
  const [dist, setDist] = useState(0);
  const [stickH, setStickH] = useState(0);
  const [idx, setIdx] = useState(1);
  const [dragging, setDragging] = useState(false);
  const n = projects.length;

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 80));
      if (sticky.current) setStickH(sticky.current.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track.current);
    if (sticky.current) ro.observe(sticky.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: outer,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setIdx(Math.min(n, Math.floor(v * n) + 1)),
  );

  const desktop = () => window.matchMedia("(min-width: 961px)").matches;
  const onDown = (e) => {
    if (!desktop() || e.button !== 0) return;
    drag.current = { x: e.clientX, moved: 0 };
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    d.x = e.clientX;
    d.moved += Math.abs(dx);
    if (d.moved > 6 && !dragging) setDragging(true);
    // 1px of vertical scroll = 1px of horizontal travel on this rail
    window.scrollBy({ top: -dx, behavior: "instant" });
  };
  const onUp = () => {
    setTimeout(() => setDragging(false), 0);
    drag.current = null;
  };
  // a drag must not open the project under the cursor
  const onClickCapture = (e) => {
    if (dragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className="svx pfr" id="portfolio">
        <div className="svx-inner">
          <m.div
            className="svx-head"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div>
              <div className="svx-label" style={{ color: T.orange }}>
                {c.tag}
              </div>
              <h2 className="svx-title"><Dots>{c.title}</Dots></h2>
            </div>
            <p className="svx-intro">{c.intro}</p>
          </m.div>
        </div>
        {/* The pinned block is only as tall as the cards (no empty space on tall
            screens); it stays pinned for exactly `dist` px of scroll and sits
            vertically centred while pinned. */}
        <div
          ref={outer}
          className="pfr-outer"
          style={{ "--h": `${dist + stickH}px` }}
        >
          <div
            ref={sticky}
            className="pfr-sticky"
            style={{ top: `max(88px, calc(50vh - ${stickH / 2}px))` }}
          >
            <m.div
              ref={track}
              className={`pfr-track ${dragging ? "is-dragging" : ""}`}
              style={{ x }}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              onPointerLeave={onUp}
              onClickCapture={onClickCapture}
            >
              {projects.map((p) => (
                <Link
                  key={p.slug}
                  to={`/portfolio/${p.slug}`}
                  className="pfr-card"
                  draggable="false"
                >
                  <Browser src={p.img} alt={p.title} />
                  <div className="pfr-meta">
                    <div>
                      <div className="pfr-ind">
                        {p.industry[lang]}, {p.year}
                      </div>
                      <h3>{p.title}</h3>
                      <p>{c.descs[p.descIndex]}</p>
                    </div>
                    <span className="pf-go" aria-hidden="true">
                      <Arrow />
                    </span>
                  </div>
                </Link>
              ))}
              <Link
                to="/portfolio"
                className="pfr-card pfr-all"
                draggable="false"
              >
                <span className="pfr-all-count">{n}</span>
                <span className="pfr-all-label">{c.seeAll}</span>
                <span className="pf-go" aria-hidden="true">
                  <Arrow size={20} />
                </span>
              </Link>
            </m.div>
            <div className="pfr-progress">
              <span className="pfr-count">
                {String(idx).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
              <div className="pfr-bar">
                <m.span style={{ scaleX: scrollYProgress }} />
              </div>
              <span className="pfr-hint">{c.dragHint}</span>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
