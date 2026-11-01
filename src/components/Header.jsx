"use client";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "@/lib/router";
import { T } from "../theme";
import { AnimButton } from "./Buttons";

export function Header({ onQuote, t, currentLang, onLangChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
  }, [mobileOpen]);
  const closeMobile = () => setMobileOpen(false);
  const { pathname } = useLocation();
  useEffect(() => setMobileOpen(false), [pathname]);
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const mn = t.menu;
  // order in the bar; "services" renders the dropdown
  const navItems = [
    { key: "services" },
    { label: mn.packages, path: "/packages" },
    { label: mn.portfolio, path: "/portfolio" },
    { label: mn.blog, path: "/blog" },
    { label: mn.about, path: "/about" },
    { label: mn.contact, path: "/contact" },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2000,
          padding: "0 40px",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background:
            scrolled || mobileOpen ? "rgba(10,10,15,.92)" : "transparent",
          backdropFilter: scrolled || mobileOpen ? "blur(16px)" : "none",
          borderBottom:
            scrolled || mobileOpen
              ? `1px solid ${T.border}`
              : "1px solid transparent",
          transition: "all .4s ease",
        }}
      >
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
          <img src="/codux-logo-dark.png" alt="Codux Studio" width={150} height={36} style={{ height: 36, width: "auto" }} />
        </Link>
        <nav
          className="desktop-nav"
          style={{ display: "flex", gap: 22, alignItems: "center" }}
        >
          {navItems.map((item, i) =>
            item.key === "services" ? (
              <ServicesMenu key={i} mn={mn} />
            ) : (
              <HeaderLink key={i} to={item.path}>
                {item.label}
              </HeaderLink>
            ),
          )}
          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.05)",
              borderRadius: 8,
              padding: 2,
              border: `1px solid ${T.border}`,
            }}
          >
            {["en", "sr"].map((l) => (
              <button
                key={l}
                onClick={() => onLangChange(l)}
                style={{
                  padding: "4px 8px",
                  background: currentLang === l ? T.accent : "transparent",
                  border: "none",
                  borderRadius: 6,
                  color: T.white,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                  textTransform: "uppercase",
                  transition: "background .2s",
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <AnimButton
            onClick={onQuote}
            style={{ padding: "10px 22px", fontSize: 14, height: 40 }}
          >
            {t.quoteBtn}
          </AnimButton>
        </nav>
        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 10,
            position: "relative",
            width: 40,
            height: 40,
            zIndex: 2100,
          }}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {[0, 1, 2].map((n) => (
            <div
              key={n}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 24,
                height: 2,
                background: T.white,
                transition: ".3s",
                opacity: n === 1 && mobileOpen ? 0 : 1,
                transform:
                  n === 0
                    ? mobileOpen
                      ? "translate(-50%,-50%) rotate(45deg)"
                      : "translate(-50%,-10px)"
                    : n === 1
                      ? "translate(-50%,-50%)"
                      : mobileOpen
                        ? "translate(-50%,-50%) rotate(-45deg)"
                        : "translate(-50%,8px)",
              }}
            />
          ))}
        </button>
      </header>
      {/* Mobile menu: full-screen panel revealed as a circle growing from the
          burger button; links slide in one after another. */}
      <div className={`mn ${mobileOpen ? "is-open" : ""}`} aria-hidden={!mobileOpen} inert={!mobileOpen}>
        <div className="mn-bg" aria-hidden="true" />
        <nav className="mn-nav" aria-label="Menu">
          <ol>
            {navItems.map((item, i) => (
              <li key={i} style={{ "--i": i }}>
                {item.key === "services" ? (
                  <MobileServices n={i + 1} mn={mn} onNavigate={closeMobile} pathname={pathname} />
                ) : (
                  <Link
                    to={item.path}
                    onClick={closeMobile}
                    className={`mn-link ${pathname === item.path || pathname.startsWith(`${item.path}/`) ? "is-active" : ""}`}
                  >
                    <span className="mn-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mn-label">{item.label}</span>
                    <span className="mn-arrow" aria-hidden="true">→</span>
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="mn-foot" style={{ "--i": navItems.length }}>
          <div className="mn-lang" role="group" aria-label="Language">
            {["en", "sr"].map((l) => (
              <button
                key={l}
                type="button"
                className={currentLang === l ? "is-on" : ""}
                onClick={() => {
                  onLangChange(l);
                  closeMobile();
                }}
              >
                {l === "en" ? "English" : "Srpski"}
              </button>
            ))}
          </div>
          <AnimButton
            onClick={() => {
              onQuote();
              closeMobile();
            }}
            style={{ width: "100%", justifyContent: "center", padding: "15px 24px", fontSize: 15, height: "auto" }}
          >
            {t.quoteBtn}
          </AnimButton>
          <a href="mailto:info@coduxstudio.com" className="mn-mail">info@coduxstudio.com</a>
        </div>
      </div>
    </>
  );
}

function HeaderLink({ to, children }) {
  const [hov, setHov] = useState(false);
  return (
    <NavLink
      to={to}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={({ isActive }) => ({
        color: hov || isActive ? T.white : T.textMuted,
        textDecoration: "none",
        fontSize: 14,
        fontWeight: 500,
        fontFamily: T.font,
        transition: "color .2s",
        position: "relative",
      })}
    >
      {({ isActive }) => (
        <>
          {children}
          <span
            style={{
              position: "absolute",
              bottom: -4,
              left: 0,
              width: hov || isActive ? "100%" : "0%",
              height: 2,
              background: T.accent,
              borderRadius: 1,
              transition: "width .3s ease",
            }}
          />
        </>
      )}
    </NavLink>
  );
}

const SERVICE_PATHS = ["/services", "/ai-consulting", "/ecommerce"];

function Chevron({ open }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      aria-hidden="true"
      style={{ transition: "transform .3s", transform: open ? "rotate(180deg)" : "none" }}
    >
      <path d="M1.5 3.5L5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Desktop "Services" dropdown: opens on hover or click, closes on Esc /
// click outside / leaving it; links to every service page for crawlers too.
function ServicesMenu({ mn }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const wrap = useRef(null);
  const timer = useRef(null);
  const active = SERVICE_PATHS.includes(pathname);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onDown = (e) => !wrap.current?.contains(e.target) && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const enter = () => {
    clearTimeout(timer.current);
    setOpen(true);
  };
  const leave = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 160);
  };

  return (
    <div ref={wrap} className={`nv-dd ${open ? "is-open" : ""}`} onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        className={`nv-trigger ${active || open ? "is-active" : ""}`}
        aria-expanded={open}
        aria-controls="nv-services"
        onClick={() => setOpen((v) => !v)}
      >
        {mn.services} <Chevron open={open} />
        <span className="nv-underline" style={{ width: active ? "100%" : undefined }} />
      </button>
      <div id="nv-services" className="nv-panel" hidden={!open}>
        <ul>
          {mn.servicesItems.map((it) => (
            <li key={it.path}>
              <Link to={it.path} className="nv-item" style={{ "--c": it.color }} onClick={() => setOpen(false)}>
                <span className="nv-ico" aria-hidden="true">
                  <i />
                </span>
                <span>
                  <strong>{it.label}</strong>
                  <small>{it.desc}</small>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileServices({ n, mn, onNavigate, pathname }) {
  const [open, setOpen] = useState(false);
  const active = SERVICE_PATHS.includes(pathname);
  return (
    <div className={`mn-sv ${open ? "is-open" : ""}`}>
      <button type="button" className={`mn-link ${active ? "is-active" : ""}`} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span className="mn-num">{String(n).padStart(2, "0")}</span>
        <span className="mn-label">{mn.services}</span>
        <span className="mn-plus" aria-hidden="true" />
      </button>
      <div className="mn-sub">
        <div>
          {mn.servicesItems.map((it) => (
            <Link key={it.path} to={it.path} onClick={onNavigate} style={{ "--c": it.color }} tabIndex={open ? 0 : -1}>
              <i aria-hidden="true" />
              <span>
                <strong>{it.label}</strong>
                <small>{it.desc}</small>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
