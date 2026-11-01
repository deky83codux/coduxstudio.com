"use client";
import { useEffect, useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { T } from "../../theme";
import { EASE_OUT } from "./hooks";

function mix(a, b, t) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(",")})`;
}

export function RotatingWord({ words, reduced }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    setI(0);
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2800);
    return () => clearInterval(id);
  }, [words]);
  const word = words[i];
  return (
    <span
      aria-hidden="true"
      style={{ display: "block", position: "relative", minHeight: "1.1em" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={word}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reduced ? 0 : 0.035 } },
            exit: { transition: { staggerChildren: reduced ? 0 : 0.02 } },
          }}
        >
          {Array.from(word).map((ch, k, arr) => (
            <m.span
              key={k}
              style={{
                display: "inline-block",
                whiteSpace: "pre",
                // per-letter colour instead of background-clip:text, which
                // Chrome drops when a filter animates on the same element
                color: mix(
                  T.accentLight,
                  T.green,
                  arr.length > 1 ? k / (arr.length - 1) : 0,
                ),
              }}
              variants={
                reduced
                  ? {
                      hidden: { opacity: 0 },
                      show: { opacity: 1 },
                      exit: { opacity: 0 },
                    }
                  : {
                      hidden: { opacity: 0, y: "0.5em", filter: "blur(8px)" },
                      show: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.5, ease: EASE_OUT },
                      },
                      exit: {
                        opacity: 0,
                        y: "-0.4em",
                        filter: "blur(6px)",
                        transition: { duration: 0.25, ease: "easeIn" },
                      },
                    }
              }
            >
              {ch}
            </m.span>
          ))}
        </m.span>
      </AnimatePresence>
    </span>
  );
}
