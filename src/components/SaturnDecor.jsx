"use client";
import { useId } from "react";
import { T } from "../theme";

export function SaturnDecor({ style = {}, className = "" }) {
  const gradientId = `saturnBody-${useId()}`;
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        width: 340,
        height: 340,
        opacity: 0.16,
        pointerEvents: "none",
        zIndex: 1,
        animation: "planetFloat 9s ease-in-out infinite",
        ...style,
      }}
    >
      <svg
        viewBox="0 0 300 300"
        width="100%"
        height="100%"
        style={{ animation: "planetSpin 90s linear infinite" }}
      >
        <defs>
          <radialGradient id={gradientId} cx="35%" cy="32%" r="70%">
            <stop offset="0%" stopColor={T.accentLight} />
            <stop offset="45%" stopColor={T.orange} />
            <stop offset="100%" stopColor="#3a2410" />
          </radialGradient>
        </defs>
        <ellipse
          cx="150"
          cy="150"
          rx="132"
          ry="34"
          fill="none"
          stroke={T.accentLight}
          strokeWidth="2"
          opacity="0.4"
          transform="rotate(-18 150 150)"
        />
        <circle cx="150" cy="150" r="66" fill={`url(#${gradientId})`} />
        <path
          d="M18 150 A132 34 0 0 0 282 150"
          fill="none"
          stroke={T.accentLight}
          strokeWidth="3"
          opacity="0.7"
          transform="rotate(-18 150 150)"
        />
      </svg>
    </div>
  );
}
