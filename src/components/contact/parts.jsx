"use client";
import { T } from "../../theme";

// Same colours as the packages tabs, in the order of t.contact.services.
const SERVICE_COLORS = [
  "#6c5ce7",
  "#00cec9",
  "#a29bfe",
  "#fd79a8",
  "#fdcb6e",
  "#8888a0",
];

export function Field({ label, optional, children, wide }) {
  return (
    <label className={`ct-field ${wide ? "is-wide" : ""}`}>
      <span className="ct-label">
        {label}
        {optional && <em> ({optional})</em>}
      </span>
      {children}
    </label>
  );
}

// Service picker: chips that work as checkboxes (several can be selected).
export function ServiceChips({ services, value, onChange, name = "services" }) {
  const toggle = (svc) =>
    onChange(
      value.includes(svc) ? value.filter((x) => x !== svc) : [...value, svc],
    );
  return (
    <div className="ct-chips" role="group">
      {services.map((svc, i) => {
        const on = value.includes(svc);
        const c = SERVICE_COLORS[i] || T.textMuted;
        return (
          <label
            key={svc}
            className={`ct-chip ${on ? "is-on" : ""}`}
            style={{ "--c": c }}
          >
            <input
              type="checkbox"
              name={name}
              value={svc}
              checked={on}
              onChange={() => toggle(svc)}
            />
            <span className="ct-chip-dot" />
            {svc}
          </label>
        );
      })}
    </div>
  );
}

export function Mail() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="3.5"
        width="14"
        height="11"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M2.8 5l6.2 4.6L15.2 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
