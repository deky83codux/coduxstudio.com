"use client";
import { Link } from "@/lib/router";
import { translations } from "../translations";

function Arrow({ size = 16 }) {
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

export function Footer({ t }) {
  const f = t.footer;
  const year = new Date().getFullYear();
  return (
    <footer className="ft">
      <div className="ft-inner">
        <div className="ft-top">
          <div className="ft-brand">
            <Link to="/" className="ft-logo">
              <img src="/codux-logo-dark.png" alt="Codux Studio" />
            </Link>
            <p className="ft-desc">{f.desc}</p>
            <span className="ft-mail-label">{f.mailLabel}</span>
            <a href="mailto:info@coduxstudio.com" className="ft-mail">
              info@coduxstudio.com
              <span className="ft-mail-go">
                <Arrow size={18} />
              </span>
            </a>
          </div>

          <nav className="ft-col" aria-label={f.links}>
            <h2>{f.links}</h2>
            <ul>
              {t.nav.map((label, i) => (
                <li key={label}>
                  <Link to={translations.en.navPaths[i]}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="ft-col" aria-label={f.legal}>
            <h2>{f.legal}</h2>
            <ul>
              <li>
                <Link to="/privacy-policy">{f.privacyPolicy}</Link>
              </li>
              <li>
                <Link to="/cookie-policy">{f.cookiePolicy}</Link>
              </li>
              <li>
                <Link to="/terms">{f.terms}</Link>
              </li>
            </ul>
          </nav>

          <div className="ft-col">
            <h2>{f.company}</h2>
            <dl className="ft-company">
              <div>
                <dt>Codux Studio</dt>
                <dd>{f.location}</dd>
              </div>
              <div>
                <dt>{f.regNumber}</dt>
                <dd>68731640</dd>
              </div>
              <div>
                <dt>{f.taxId}</dt>
                <dd>115901203</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="ft-bottom">
          <span>
            © {year} Codux Studio. {f.rights}
          </span>
          <span className="ft-made">{f.made}</span>
        </div>
      </div>

      {/* outlined wordmark; fills with the brand gradient on hover */}
      <div className="ft-mark" aria-hidden="true">
        CoduxStudio
      </div>
    </footer>
  );
}
