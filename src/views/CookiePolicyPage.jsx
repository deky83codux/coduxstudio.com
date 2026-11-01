"use client";
import { PageHero } from "../components/PageHero";
import { Seo } from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { T } from "../theme";
import { useApp } from "../context/AppContext";

const COPY = {
  en: {
    tag: "Legal",
    title: "Cookie Policy",
    updated: "Last updated: May 2026",
    sections: [
      {
        title: "1. What Are Cookies",
        body: `Cookies are small text files placed on your device when you visit a website. They allow the website to recognise your device on subsequent visits and remember certain information about your preferences or actions.`,
      },
      {
        title: "2. How We Use Cookies",
        body: `Codux Studio (https://coduxstudio.com) uses cookies to:\n\n• Ensure the website functions correctly.\n• Understand how visitors interact with our content through aggregated, anonymised analytics.\n• Remember language and display preferences.\n• Measure the effectiveness of our pages.`,
      },
      {
        title: "3. Types of Cookies We Use",
        body: `Strictly Necessary Cookies\nThese cookies are essential for the website to function. They do not collect any personally identifiable information and cannot be disabled.\n\nAnalytics / Performance Cookies\nWe use Google Analytics to collect anonymised information about how visitors use our website (pages visited, time spent, referral source). This helps us improve the site. No personally identifiable information is collected.\n\nFunctional Cookies\nThese cookies remember your preferences (such as language selection) to provide a more personalised experience.\n\nThird-Party Cookies\nSome pages may include content or links from third-party services (e.g. embedded maps or social sharing buttons) that may set their own cookies. We do not control these cookies.`,
      },
      {
        title: "4. Cookie Duration",
        body: `Session cookies — expire when you close your browser.\nPersistent cookies — remain on your device for a set period or until you delete them. Our analytics cookies persist for up to 13 months.`,
      },
      {
        title: "5. Managing Cookies",
        body: `You can control and manage cookies through your browser settings. Most browsers allow you to:\n\n• View cookies that have been set.\n• Block cookies from specific or all websites.\n• Delete all cookies when you close the browser.\n\nPlease note that disabling certain cookies may affect the functionality of our website.\n\nFor guidance on managing cookies in your browser:\n• Chrome: chrome://settings/cookies\n• Firefox: about:preferences#privacy\n• Safari: Preferences → Privacy\n• Edge: edge://settings/privacy`,
      },
      {
        title: "6. Google Analytics",
        body: `We use Google Analytics with IP anonymisation enabled. Google Analytics collects aggregated data about website usage. You can opt out of Google Analytics tracking across all websites by installing the Google Analytics Opt-out Browser Add-on available at https://tools.google.com/dlpage/gaoptout.`,
      },
      {
        title: "7. Changes to This Policy",
        body: `We may update this Cookie Policy periodically. The date at the top of this page indicates the last revision. Continued use of our website after any changes constitutes your acceptance.`,
      },
      {
        title: "8. Contact",
        body: `For questions about our use of cookies, please contact:\n\nCodux Studio\nBelgrade, Serbia\ninfo@coduxstudio.com`,
      },
    ],
  },
  sr: {
    tag: "Pravno",
    title: "Politika kolačića",
    updated: "Poslednje ažuriranje: maj 2026.",
    sections: [
      {
        title: "1. Šta su kolačići",
        body: `Kolačići su male tekstualne datoteke koje se postavljaju na vaš uređaj kada posetite veb sajt. Omogućavaju sajtu da prepozna vaš uređaj pri narednim posetama i zapamti određene informacije o vašim preferencijama ili radnjama.`,
      },
      {
        title: "2. Kako koristimo kolačiće",
        body: `Codux Studio (https://coduxstudio.com) koristi kolačiće radi:\n\n• Ispravnog funkcionisanja sajta.\n• Razumevanja načina na koji posetioci koriste naš sadržaj putem zbirne, anonimizovane analitike.\n• Pamćenja jezičkih i podešavanja prikaza.\n• Merenja efikasnosti naših stranica.`,
      },
      {
        title: "3. Vrste kolačića koje koristimo",
        body: `Neophodni kolačići\nOvi kolačići su ključni za funkcionisanje sajta. Ne prikupljaju lične identifikacione podatke i ne mogu se onemogućiti.\n\nAnalitički / kolačići za performanse\nKoristimo Google Analytics za prikupljanje anonimizovanih informacija o tome kako posetioci koriste naš sajt (posećene stranice, provedeno vreme, izvor posete). Ovo nam pomaže da unapredimo sajt. Ne prikupljaju se lični identifikacioni podaci.\n\nFunkcionalni kolačići\nOvi kolačići pamte vaše preferencije (kao što je odabir jezika) radi personalizovanijeg iskustva.\n\nKolačići trećih strana\nNeke stranice mogu sadržati sadržaj ili linkove ka uslugama trećih strana (npr. ugrađene mape ili dugmad za deljenje na društvenim mrežama) koji mogu postavljati sopstvene kolačiće. Mi ne kontrolišemo te kolačiće.`,
      },
      {
        title: "4. Trajanje kolačića",
        body: `Sesijski kolačići — ističu kada zatvorite pregledač.\nTrajni kolačići — ostaju na vašem uređaju određeni period ili dok ih ne izbrišete. Naši analitički kolačići traju do 13 meseci.`,
      },
      {
        title: "5. Upravljanje kolačićima",
        body: `Možete kontrolisati kolačiće i upravljati njima putem podešavanja pregledača. Većina pregledača vam omogućava da:\n\n• Pregledate postavljene kolačiće.\n• Blokirate kolačiće sa određenih ili svih sajtova.\n• Izbrišete sve kolačiće kada zatvorite pregledač.\n\nNapominjemo da onemogućavanje određenih kolačića može uticati na funkcionalnost našeg sajta.\n\nUputstvo za upravljanje kolačićima u pregledaču:\n• Chrome: chrome://settings/cookies\n• Firefox: about:preferences#privacy\n• Safari: Podešavanja → Privatnost\n• Edge: edge://settings/privacy`,
      },
      {
        title: "6. Google Analytics",
        body: `Koristimo Google Analytics sa omogućenom anonimizacijom IP adresa. Google Analytics prikuplja zbirne podatke o korišćenju sajta. Možete se odjaviti iz praćenja putem Google Analytics na svim sajtovima instaliranjem Google Analytics dodatka za odjavu dostupnog na https://tools.google.com/dlpage/gaoptout.`,
      },
      {
        title: "7. Izmene ove politike",
        body: `Ovu Politiku kolačića možemo povremeno ažurirati. Datum na vrhu ove stranice ukazuje na poslednju reviziju. Nastavak korišćenja našeg sajta nakon izmena podrazumeva vaše prihvatanje.`,
      },
      {
        title: "8. Kontakt",
        body: `Za pitanja o našem korišćenju kolačića, kontaktirajte nas:\n\nCodux Studio\nBeograd, Srbija\ninfo@coduxstudio.com`,
      },
    ],
  },
};

export function CookiePolicyPage() {
  const { lang } = useApp();
  const copy = COPY[lang];
  return (
    <>
      <Seo
        title={`${copy.title} — Codux Studio`}
        description={lang === "en"
          ? "Cookie Policy for Codux Studio — how we use cookies and how you can manage them."
          : "Politika kolačića Codux Studio — kako koristimo kolačiće i kako njima možete upravljati."}
        path="/cookie-policy"
        lang={lang}
      />
      <PageHero tag={copy.tag} title={copy.title} desc={copy.updated} color={T.green} />
      <LegalContent sections={copy.sections} />
    </>
  );
}

function LegalContent({ sections }) {
  return (
    <section style={{ padding: "60px 24px 100px", background: T.bg }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {sections.map((s, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div
              style={{
                marginBottom: 40,
                paddingBottom: 40,
                borderBottom: i < sections.length - 1 ? `1px solid ${T.border}` : "none",
              }}
            >
              <h2 style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 700, color: T.white, marginBottom: 14, marginTop: 0 }}>
                {s.title}
              </h2>
              {s.body.split("\n").map((line, j) =>
                line.trim() === "" ? (
                  <br key={j} />
                ) : (
                  <p key={j} style={{ color: T.textMuted, fontSize: 15, lineHeight: 1.8, margin: "0 0 6px" }}>
                    {line}
                  </p>
                )
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
