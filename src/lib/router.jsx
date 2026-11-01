"use client";
// Thin react-router-style API on top of next/link + next/navigation, so the
// components keep their `to=` props and every internal link stays in the
// visitor's language (/about vs /sr/about).
import { forwardRef } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "../context/AppContext";
import { localize, stripLocale } from "./i18n";

export const Link = forwardRef(function Link({ to, href, ...rest }, ref) {
  const { lang } = useApp();
  return <NextLink ref={ref} href={localize(to ?? href, lang)} {...rest} />;
});

/** Pathname without the locale prefix ("/sr/about" -> "/about"). */
export function useLocation() {
  return { pathname: stripLocale(usePathname() || "/") };
}

/** react-router NavLink: "/" matches exactly, other paths match their subtree. */
export function NavLink({ to, style, className, children, ...rest }) {
  const { pathname } = useLocation();
  const isActive = to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
  const arg = { isActive };
  return (
    <Link
      to={to}
      aria-current={isActive ? "page" : undefined}
      style={typeof style === "function" ? style(arg) : style}
      className={typeof className === "function" ? className(arg) : className}
      {...rest}
    >
      {typeof children === "function" ? children(arg) : children}
    </Link>
  );
}
