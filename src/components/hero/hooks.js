import { useEffect, useState } from "react";

// prefers-reduced-motion, live
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener
      ? mq.addEventListener("change", on)
      : mq.addListener(on);
    return () =>
      mq.removeEventListener
        ? mq.removeEventListener("change", on)
        : mq.removeListener(on);
  }, []);
  return reduced;
}

// true while the element is on screen (used to pause render loops)
export function useOnScreen(ref, rootMargin = "0px") {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), {
      rootMargin,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return on;
}

// true while the tab is visible
export function usePageVisible() {
  const [vis, setVis] = useState(true);
  useEffect(() => {
    const on = () => setVis(document.visibilityState !== "hidden");
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);
  return vis;
}

export const EASE_OUT = [0.16, 1, 0.3, 1];
