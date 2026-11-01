"use client";
import { useEffect, useRef } from "react";
import { m, AnimatePresence, LazyMotion, domAnimation } from "motion/react";
import { AnimButton, GhostButton } from "./Buttons";
import { StarField } from "./hero/StarField";
import { usePrefersReducedMotion } from "./hero/hooks";
import { useContactForm } from "./contact/useContactForm";
import { Field, ServiceChips, Mail } from "./contact/parts";
import { Dots } from "./Dots";

const EASE = [0.16, 1, 0.3, 1];
const STEP_COLORS = ["#a29bfe", "#00cec9", "#fdcb6e"];

// "Get a quote" popup — a two-panel mission brief: star field + what happens
// next on the left, the form on the right. Hovering the send button speeds the
// stars up, sending kicks them into warp (same as the contact launch pad).
// `preset` = index of a service to preselect (set when opened from a package).
export function QuoteModal({ open, onClose, t, preset = null }) {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && <Dialog key="qm" t={t} onClose={onClose} preset={preset} />}
      </AnimatePresence>
    </LazyMotion>
  );
}

function Dialog({ t, onClose, preset }) {
  const q = t.modal;
  const f = t.contact.fields;
  const services = t.contact.services.slice(1);
  const { form, set, setForm, status, setStatus, submit } = useContactForm({
    subjectPrefix: "New quote request from",
    fromName: "Coduxstudio Quote Modal",
  });
  const canvas = useRef(null);
  const field = useRef(null);
  const firstInput = useRef(null);
  const reduced = usePrefersReducedMotion();

  // preselect the package the visitor came from
  useEffect(() => {
    if (preset != null && services[preset]) {
      setForm((s) => ({ ...s, services: [services[preset]] }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset]);

  // scroll lock, Esc to close, focus handling
  useEffect(() => {
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const id = setTimeout(() => firstInput.current?.focus({ preventScroll: true }), 350);
    return () => {
      clearTimeout(id);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow === "hidden" ? "unset" : prevOverflow;
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  useEffect(() => {
    const s = new StarField(canvas.current, { reduced, density: 0.9, maxWarp: 1.1 });
    field.current = s;
    const ro = new ResizeObserver(() => s.resize());
    ro.observe(canvas.current.parentElement);
    s.start();
    return () => {
      ro.disconnect();
      s.destroy();
    };
  }, [reduced]);

  const onSubmit = async (e) => {
    e.preventDefault();
    field.current?.setWarp(true);
    const ok = await submit();
    setTimeout(() => field.current?.setWarp(false), ok ? 900 : 0);
  };

  const boost = (v) => () => field.current?.setBoost(v);

  return (
    <m.div
      className="qm-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <m.div
        className="qm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="qm-title"
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <button type="button" className="qm-close" onClick={onClose} aria-label={q.close}>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {/* left: mission brief */}
        <aside className="qm-side">
          <canvas ref={canvas} className="qm-stars" aria-hidden="true" />
          <div className="qm-side-glow" aria-hidden="true" />
          <div className="qm-side-inner">
            <span className="qm-tag">
              <i aria-hidden="true" />
              {q.tag}
            </span>
            <h2 id="qm-title" className="qm-title">
              <Dots>{q.title}</Dots>
            </h2>
            <p className="qm-desc">{q.desc}</p>

            <div className="qm-steps">
              <span className="qm-steps-title">{q.stepsTitle}</span>
              <ol>
                {q.steps.map(([title, body], i) => (
                  <m.li
                    key={title}
                    style={{ "--c": STEP_COLORS[i] }}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.25 + i * 0.1 }}
                  >
                    <span className="qm-step-num">{i + 1}</span>
                    <div>
                      <strong>{title}</strong>
                      <span>{body}</span>
                    </div>
                  </m.li>
                ))}
              </ol>
            </div>

            <a href="mailto:info@coduxstudio.com" className="qm-mail">
              <Mail /> info@coduxstudio.com
            </a>
          </div>
        </aside>

        {/* right: form / success */}
        <div className="qm-main">
          <AnimatePresence mode="wait" initial={false}>
            {status === "success" ? (
              <m.div
                key="done"
                className="ct-done qm-done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="ct-done-icon">
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
                    <path d="M9 17.5l5.5 5.5L25.5 11" stroke="#0a0a0f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>{q.successTitle}</h3>
                <p>{q.successBody}</p>
                <GhostButton onClick={onClose}>{q.close}</GhostButton>
              </m.div>
            ) : (
              <m.form
                key="form"
                className="qm-form"
                onSubmit={onSubmit}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" hidden />
                <div className="ct-grid">
                  <Field label={f.name}>
                    <input
                      ref={firstInput}
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
                    <span className="ct-label">{q.serviceQ}</span>
                    <ServiceChips
                      services={services}
                      value={form.services}
                      onChange={set("services")}
                      name="quote-services"
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
                {status === "error" && (
                  <p className="ct-status error" role="alert">
                    {q.error}
                  </p>
                )}
                <span
                  className="qm-send"
                  onMouseEnter={boost(1)}
                  onMouseLeave={boost(0)}
                  onFocus={boost(1)}
                  onBlur={boost(0)}
                >
                  <AnimButton type="submit" disabled={status === "sending"}>
                    {status === "sending" ? q.sending : q.btn}
                  </AnimButton>
                </span>
              </m.form>
            )}
          </AnimatePresence>
        </div>
      </m.div>
    </m.div>
  );
}
