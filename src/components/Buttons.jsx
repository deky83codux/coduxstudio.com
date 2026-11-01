"use client";
import { useState } from "react";
import { Link } from "@/lib/router";
import { T } from "../theme";

export function AnimButton({
  children,
  to,
  href,
  onClick,
  gradient,
  glow,
  style = {},
  disabled = false,
  type,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const isHover = hovered && !disabled;
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 36px",
    height: 54,
    lineHeight: 1,
    border: "1px solid transparent",
    borderRadius: 14,
    color: T.white,
    fontSize: 16,
    fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: "none",
    fontFamily: T.font,
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
    background:
      gradient || `linear-gradient(135deg, ${T.accent}, ${T.accentLight})`,
    boxShadow: isHover
      ? `0 8px 40px ${glow || T.accentGlow}`
      : `0 4px 20px ${glow || T.accentGlow}`,
    transform: isHover
      ? "translateY(-2px) scale(1.02)"
      : "translateY(0) scale(1)",
    transition: "all .3s cubic-bezier(.16,1,.3,1)",
    opacity: disabled ? 0.65 : 1,
    ...style,
  };
  const shimmer = (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: isHover ? "120%" : "-60%",
        width: "40%",
        height: "100%",
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,.15), transparent)",
        transition: "left .6s ease",
        pointerEvents: "none",
      }}
    />
  );
  const inner = (
    <>
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      {shimmer}
    </>
  );
  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };
  if (to) {
    return (
      <Link to={to} style={baseStyle} {...handlers} {...rest}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        style={baseStyle}
        {...handlers}
        {...rest}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      style={baseStyle}
      {...handlers}
      {...rest}
    >
      {inner}
    </button>
  );
}

export function GhostButton({
  children,
  to,
  href,
  onClick,
  style = {},
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 36px",
    height: 54,
    lineHeight: 1,
    boxSizing: "border-box",
    background: hovered ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.04)",
    border: `1px solid ${hovered ? T.accentLight : T.border}`,
    borderRadius: 14,
    color: hovered ? T.white : T.text,
    fontSize: 16,
    fontWeight: 500,
    textDecoration: "none",
    fontFamily: T.font,
    transform: hovered ? "translateY(-2px)" : "translateY(0)",
    transition: "all .3s ease",
    cursor: "pointer",
    ...style,
  };
  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };
  if (to) {
    return (
      <Link to={to} style={baseStyle} {...handlers} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        style={baseStyle}
        {...handlers}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ ...baseStyle, border: baseStyle.border }}
      {...handlers}
      {...rest}
    >
      {children}
    </button>
  );
}
