"use client";
import { useEffect, useRef, useState } from "react";

export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  style = {},
  className = "",
  instant = false,
}) {
  const [ref, visible] = useReveal();
  if (instant) {
    // above the fold: animate with CSS so it paints with the first frame
    return (
      <div
        className={`${className} hero-in`.trim()}
        style={{ "--d": `${delay}s`, "--y": "40px", ...style }}
      >
        {children}
      </div>
    );
  }
  const dirs = {
    up: "translateY(40px)",
    down: "translateY(-40px)",
    left: "translateX(40px)",
    right: "translateX(-40px)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0)" : dirs[direction],
        transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}s, transform .7s cubic-bezier(.16,1,.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
