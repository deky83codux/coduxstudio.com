"use client";
import { useState } from "react";
import { Link } from "@/lib/router";
import { m, LazyMotion, domAnimation } from "motion/react";
import { T } from "../theme";
import { SCENES } from "./services/ServiceScenes";
import { Dots } from "./Dots";

const EASE = [0.16, 1, 0.3, 1];

// Per-card colour + destination; titles, descriptions, tags and link labels
// live in translations.js (t.services.items).
// anchor ids used by the header "Services" dropdown
const IDS = ["web-development", "ui-ux-design", "digital-marketing", "ai-automation"];

const META = [
  { color: T.accent, rgb: "108,92,231", link: "/packages" },
  { color: T.green, rgb: "0,206,201", link: "/portfolio" },
  { color: T.orange, rgb: "253,203,110", link: "/contact" },
  { color: T.accentLight, rgb: "162,155,254", link: "/ai-consulting" },
];

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceCard({ i, item, titleTag: Title = "h3" }) {
  const meta = META[i];
  const Scene = SCENES[i];
  const [active, setActive] = useState(false);
  // spotlight follows the cursor (CSS vars read by .svb-card::before)
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <m.article
      id={IDS[i]}
      className="svb-card"
      style={{
        "--c": meta.color,
        "--glow": `rgba(${meta.rgb},.16)`,
        "--tint": `rgba(${meta.rgb},.12)`,
      }}
      onPointerMove={onMove}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: (i % 2) * 0.12, ease: EASE }}
    >
      <div className="svb-visual">
        <Scene active={active} />
      </div>
      <div className="svb-body">
        <Title className="svb-title">{item.title}</Title>
        <p className="svb-desc">{item.desc}</p>
        <div className="svb-foot">
          <ul className="svx-tags">
            {item.tags.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <Link
            to={meta.link}
            className="svx-link"
            style={{ color: meta.color }}
          >
            {item.link}
            <Arrow />
          </Link>
        </div>
      </div>
    </m.article>
  );
}

// `head={false}` hides the section heading (used on /services, where the
// page hero already introduces the list).
export function Services({ t, head = true }) {
  const s = t.services;
  return (
    <LazyMotion features={domAnimation}>
      <section className="svx" id="services">
        <div className="svx-inner">
          {head && (
            <m.div
              className="svx-head"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <div>
                <div className="svx-label" style={{ color: T.accentLight }}>
                  {s.tag}
                </div>
                <h2 className="svx-title"><Dots>{s.title}</Dots></h2>
              </div>
              <p className="svx-intro">{s.intro}</p>
            </m.div>
          )}
          <div className="svb-grid">
            {s.items.map((item, i) => (
              <ServiceCard key={i} i={i} item={item} titleTag={head ? "h3" : "h2"} />
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
