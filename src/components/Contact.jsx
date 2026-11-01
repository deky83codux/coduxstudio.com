"use client";
import { useEffect, useRef } from "react";
import { m, AnimatePresence, LazyMotion, domAnimation } from "motion/react";
import { T } from "../theme";
import { AnimButton, GhostButton } from "./Buttons";
import { StarField } from "./hero/StarField";
import { usePrefersReducedMotion } from "./hero/hooks";
import { useContactForm } from "./contact/useContactForm";
import { Field, ServiceChips, Mail } from "./contact/parts";
import { Dots } from "./Dots";

const EASE = [0.16, 1, 0.3, 1];

// Contact "launch pad": full-width section with the hero's star field behind a
// centred glass form; sending the message kicks the stars into warp.
// `head={false}` hides the heading (on /contact the page hero already has it).
export function Contact({ t, head = true }) {
  const c = t.contact;
  const { form, set, status, setStatus, submit } = useContactForm();
  const canvas = useRef(null);
  const field = useRef(null);
  const reduced = usePrefersReducedMotion();
  const f = t.contact.fields;
  const services = t.contact.services.slice(1);

  useEffect(() => {
    const s = new StarField(canvas.current, {
      reduced,
      density: 0.7,
      maxWarp: 1.1,
    });
    field.current = s;
    const ro = new ResizeObserver(() => s.resize());
    ro.observe(canvas.current.parentElement);
    const io = new IntersectionObserver(([e]) =>
      e.isIntersecting ? s.start() : s.stop(),
    );
    io.observe(canvas.current);
    return () => {
      ro.disconnect();
      io.disconnect();
      s.destroy();
    };
  }, [reduced]);

  const onSubmit = async (e) => {
    e.preventDefault();
    field.current?.setWarp(true);
    const ok = await submit();
    setTimeout(() => field.current?.setWarp(false), ok ? 900 : 0);
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className={`ct-pad ${head ? "" : "is-bare"}`} id="contact">
        <canvas ref={canvas} className="ct-stars" aria-hidden="true" />
        <div className="ct-pad-glow" aria-hidden="true" />
        <div className="ct-pad-inner">
          {head && (
            <div style={{ textAlign: "center" }}>
              <div
                className="svx-label"
                style={{ color: T.accentLight, justifyContent: "center" }}
              >
                {c.tag}
              </div>
              <h2 className="svx-title"><Dots>{c.title}</Dots></h2>
              <p
                className="svx-intro"
                style={{ margin: "14px auto 0", textAlign: "center" }}
              >
                {c.intro}
              </p>
            </div>
          )}
          <AnimatePresence mode="wait" initial={false}>
            {status === "success" ? (
              <m.div
                key="done"
                className="ct-glass ct-done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="ct-done-icon">
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 17.5l5.5 5.5L25.5 11"
                      stroke="#0a0a0f"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3>{c.successTitle}</h3>
                <p>{c.successBody}</p>
                <GhostButton onClick={() => setStatus("idle")}>
                  {c.again}
                </GhostButton>
              </m.div>
            ) : (
              <m.form
                key="form"
                className="ct-glass"
                onSubmit={onSubmit}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.4 }}
              >
                <div className="ct-grid">
                  <Field label={f.name}>
                    <input
                      className="ct-input"
                      required
                      value={form.name}
                      onChange={set("name")}
                      autoComplete="name"
                    />
                  </Field>
                  <Field label={f.email}>
                    <input
                      className="ct-input"
                      type="email"
                      required
                      value={form.email}
                      onChange={set("email")}
                      autoComplete="email"
                    />
                  </Field>
                  <div className="ct-field is-wide">
                    <span className="ct-label">{c.serviceQ}</span>
                    <ServiceChips
                      services={services}
                      value={form.services}
                      onChange={set("services")}
                      name="services"
                    />
                  </div>
                  <Field label={f.message} wide>
                    <textarea
                      className="ct-input"
                      rows={4}
                      required
                      placeholder={f.placeholder}
                      value={form.message}
                      onChange={set("message")}
                    />
                  </Field>
                </div>
                <div className="ct-launch-row">
                  <a href="mailto:info@coduxstudio.com" className="ct-mail">
                    <Mail /> info@coduxstudio.com
                  </a>
                  {/* hovering / focusing the button speeds the stars up;
                      sending kicks them into full warp */}
                  <span
                    className="ct-launch-btn"
                    onMouseEnter={() => field.current?.setBoost(1)}
                    onMouseLeave={() => field.current?.setBoost(0)}
                    onFocus={() => field.current?.setBoost(1)}
                    onBlur={() => field.current?.setBoost(0)}
                  >
                    <AnimButton type="submit" disabled={status === "sending"}>
                      {status === "sending" ? t.contact.sending : c.launch}
                    </AnimButton>
                  </span>
                </div>
                {status === "error" && (
                  <p className="ct-status error">{t.contact.error}</p>
                )}
              </m.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </LazyMotion>
  );
}
