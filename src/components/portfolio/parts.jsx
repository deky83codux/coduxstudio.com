"use client";
// Shared bits for the portfolio rail (home) and list (/portfolio).
export function Arrow({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.5 11.5l7-7M6 4.5h5.5V10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Browser chrome around a screenshot, so every project reads as a live site.
export function Browser({ src, alt, eager, imgStyle }) {
  return (
    <div className="pf-browser">
      <div className="pf-bar" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="pf-shot">
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          draggable="false"
          style={imgStyle}
        />
      </div>
    </div>
  );
}
