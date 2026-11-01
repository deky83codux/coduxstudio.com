"use client";
import { useEffect, useRef, useState } from "react";
import { T } from "../theme";

const SIZE = 56;
const RADIUS = 24;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const LAUNCH_DURATION = 900;
const SPARK_INDICES = [0, 1, 2, 3, 4, 5];

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [launching, setLaunching] = useState(false);
  const [hovered, setHovered] = useState(false);
  const tickingRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const measure = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      setProgress(pct);
      setVisible(scrollTop > 480);
      tickingRef.current = false;
    };
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleClick = () => {
    if (launching) return;
    setLaunching(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    timeoutRef.current = setTimeout(() => setLaunching(false), LAUNCH_DURATION);
  };

  const dashOffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        width: SIZE,
        height: SIZE,
        borderRadius: "50%",
        border: "none",
        background: T.card,
        cursor: launching ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1500,
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : 16}px) scale(${visible ? (hovered ? 1.08 : 1) : 0.7})`,
        pointerEvents: visible ? "auto" : "none",
        transition:
          "opacity .35s ease, transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease",
        boxShadow: hovered
          ? `0 10px 34px rgba(0,0,0,.45), 0 0 26px ${T.accentGlow}`
          : `0 8px 26px rgba(0,0,0,.4), 0 0 0 1px ${T.border}`,
        overflow: "visible",
      }}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ position: "absolute", inset: 0 }}
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={T.border}
          strokeWidth="2"
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={T.accent}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          style={{
            transition: "stroke-dashoffset .1s linear",
            filter: launching ? `drop-shadow(0 0 6px ${T.accentGlow})` : "none",
          }}
        />
      </svg>

      <div
        style={{
          position: "relative",
          width: 22,
          height: 30,
          animation: launching
            ? "rocketLaunch .9s cubic-bezier(.55,0,.85,.15) forwards"
            : "rocketIdle 2.6s ease-in-out infinite",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -2,
            left: "50%",
            width: 7,
            height: hovered && !launching ? 13 : 9,
            transform: "translateX(-50%)",
            borderRadius: "0 0 7px 7px",
            background: `linear-gradient(180deg, ${T.orange}, ${T.accent}00)`,
            filter: "blur(1.2px)",
            transition: "height .25s ease",
            animation: launching
              ? "flameBurst .9s cubic-bezier(.4,0,.6,1) forwards"
              : "flameFlicker .5s ease-in-out infinite alternate",
          }}
        />

        <svg
          width="22"
          height="30"
          viewBox="0 0 22 30"
          fill="none"
          style={{ position: "relative", zIndex: 1 }}
        >
          <path
            d="M11 1.5c3.6 2.9 5.6 7.4 5.6 12 0 2.8-.7 5.3-2 7.4L11 23.5l-3.6-2.6c-1.3-2.1-2-4.6-2-7.4 0-4.6 2-9.1 5.6-12z"
            fill={T.card}
            stroke={T.accentLight}
            strokeWidth="1.5"
          />
          <circle
            cx="11"
            cy="11.5"
            r="2.4"
            fill={T.accent}
            opacity="0.55"
            stroke={T.accentLight}
            strokeWidth="1.1"
          />
          <path
            d="M6.4 18.5l-3 3.8M15.6 18.5l3 3.8"
            stroke={T.accentLight}
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>

        {launching &&
          SPARK_INDICES.map((i) => (
            <span
              key={i}
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: 2,
                left: "50%",
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: i % 2 === 0 ? T.accentLight : T.orange,
                animation: `sparkBurst${i} .7s ease-out forwards`,
              }}
            />
          ))}
      </div>
    </button>
  );
}
