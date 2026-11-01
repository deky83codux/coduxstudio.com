"use client";
import { PageHero } from "../components/PageHero";
import { Seo } from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { T } from "../theme";
import { useApp } from "../context/AppContext";

const COPY = {
  en: {
    tag: "Legal",
    title: "Privacy Policy",
    updated: "Last updated: May 2026",
    sections: [
      {
        title: "1. Who We Are",
        body: `Codux Studio ("we", "us", or "our") is a web development and digital marketing agency registered in Belgrade, Serbia. Our website is located at https://coduxstudio.com and we can be reached at info@coduxstudio.com.\n\nThis Privacy Policy explains how we collect, use, and protect your personal data when you visit our website or contact us.`,
      },
      {
        title: "2. Data We Collect",
        body: `We may collect the following personal data:\n\n• Contact information you voluntarily submit (name, email address, phone number, company name) when using our contact or quote request form.\n• Technical data such as IP address, browser type, operating system, referring URLs, and pages visited — collected automatically via cookies and analytics tools.\n• Communication data — the content of messages you send us.`,
      },
      {
        title: "3. How We Use Your Data",
        body: `We use your data to:\n\n• Respond to your enquiries and deliver the services you request.\n• Send you relevant information about our services, where you have consented.\n• Improve our website and user experience through aggregated analytics.\n• Comply with legal obligations.\n\nWe never sell, rent, or trade your personal data to third parties.`,
      },
      {
        title: "4. Legal Basis for Processing",
        body: `We process your personal data on the following legal bases:\n\n• Consent — when you fill in a contact or quote form.\n• Legitimate interests — to improve our website and service quality.\n• Legal obligation — when required by applicable law.`,
      },
      {
        title: "5. Data Retention",
        body: `We retain your personal data only as long as necessary to fulfil the purposes for which it was collected, or as required by law. Contact enquiries are kept for up to 3 years unless a longer period is required.`,
      },
      {
        title: "6. Cookies",
        body: `We use cookies and similar tracking technologies. Please refer to our Cookie Policy for full details on the types of cookies we use and how you can manage them.`,
      },
      {
        title: "7. Third-Party Services",
        body: `We may share data with trusted third parties solely to operate our services:\n\n• Google Analytics — website analytics (anonymised)\n• Email service providers — to respond to your enquiries\n\nAll third parties are required to process data in accordance with applicable data protection laws.`,
      },
      {
        title: "8. Your Rights",
        body: `Under applicable data protection legislation you have the right to:\n\n• Access the personal data we hold about you.\n• Request correction of inaccurate data.\n• Request erasure of your data.\n• Object to or restrict processing.\n• Withdraw consent at any time.\n\nTo exercise any of these rights, contact us at info@coduxstudio.com.`,
      },
      {
        title: "9. Data Security",
        body: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or destruction. However, no internet transmission is completely secure and we cannot guarantee absolute security.`,
      },
      {
        title: "10. Changes to This Policy",
        body: `We may update this Privacy Policy from time to time. The date at the top of this page indicates when it was last revised. Continued use of our website after changes constitutes acceptance of the updated policy.`,
      },
      {
        title: "11. Contact",
        body: `For any questions or concerns regarding this Privacy Policy, please contact:\n\nCodux Studio\nBelgrade, Serbia\ninfo@coduxstudio.com`,
      },
    ],
  },
  sr: {
    tag: "Pravno",
    title: "Politika privatnosti",
    updated: "Poslednje ažuriranje: maj 2026.",
    sections: [
      {
        title: "1. Ko smo mi",
        body: `Codux Studio („mi", „nas" ili „naš") je agencija za web razvoj i digitalni marketing sa sedištem u Beogradu, Srbija. Naš sajt se nalazi na https://coduxstudio.com, a možete nas kontaktirati putem info@coduxstudio.com.\n\nOva Politika privatnosti objašnjava kako prikupljamo, koristimo i štitimo vaše lične podatke kada posetite naš sajt ili nas kontaktirate.`,
      },
      {
        title: "2. Podaci koje prikupljamo",
        body: `Možemo prikupljati sledeće lične podatke:\n\n• Kontakt informacije koje dobrovoljno unosite (ime, adresa e-pošte, broj telefona, naziv kompanije) putem kontakt formulara ili zahteva za ponudu.\n• Tehničke podatke kao što su IP adresa, vrsta pregledača, operativni sistem, URL-ovi preusmeravanja i posećene stranice — prikupljene automatski putem kolačića i alata za analitiku.\n• Podatke o komunikaciji — sadržaj poruka koje nam šaljete.`,
      },
      {
        title: "3. Kako koristimo vaše podatke",
        body: `Vaše podatke koristimo za:\n\n• Odgovaranje na vaše upite i pružanje usluga koje tražite.\n• Slanje relevantnih informacija o našim uslugama, uz vašu saglasnost.\n• Poboljšanje našeg sajta i korisničkog iskustva putem zbirne analitike.\n• Poštovanje zakonskih obaveza.\n\nNikada ne prodajemo, iznajmljujemo niti prepuštamo vaše lične podatke trećim stranama.`,
      },
      {
        title: "4. Pravni osnov obrade",
        body: `Vaše lične podatke obrađujemo na sledećim pravnim osnovama:\n\n• Pristanak — kada popunite kontakt formular ili formular za ponudu.\n• Legitimni interesi — radi poboljšanja kvaliteta sajta i usluga.\n• Zakonska obaveza — kada to zahteva važeće pravo.`,
      },
      {
        title: "5. Čuvanje podataka",
        body: `Vaše lične podatke čuvamo samo onoliko dugo koliko je neophodno za svrhe zbog kojih su prikupljeni, ili koliko zakon zahteva. Kontakt upiti se čuvaju do 3 godine, osim ako nije potreban duži period.`,
      },
      {
        title: "6. Kolačići",
        body: `Koristimo kolačiće i slične tehnologije praćenja. Molimo vas da pogledate našu Politiku kolačića za potpune informacije o vrstama kolačića koje koristimo i kako njima možete upravljati.`,
      },
      {
        title: "7. Usluge trećih strana",
        body: `Podatke možemo deliti sa pouzdanim trećim stranama isključivo radi funkcionisanja naših usluga:\n\n• Google Analytics — analitika sajta (anonimizirano)\n• Pružaoci usluga e-pošte — radi odgovaranja na vaše upite\n\nOd svih trećih strana se zahteva da obrađuju podatke u skladu sa važećim zakonima o zaštiti podataka.`,
      },
      {
        title: "8. Vaša prava",
        body: `Prema važećim propisima o zaštiti podataka imate pravo da:\n\n• Pristupite ličnim podacima koje čuvamo o vama.\n• Zatražite ispravku netačnih podataka.\n• Zatražite brisanje vaših podataka.\n• Prigovorite obradi ili je ograničite.\n• Opozovete pristanak u bilo kom trenutku.\n\nZa ostvarivanje bilo kog od ovih prava kontaktirajte nas na info@coduxstudio.com.`,
      },
      {
        title: "9. Bezbednost podataka",
        body: `Primenjujemo odgovarajuće tehničke i organizacione mere za zaštitu vaših ličnih podataka od neovlašćenog pristupa, gubitka ili uništenja. Međutim, nijedan prenos putem interneta nije potpuno siguran i ne možemo garantovati apsolutnu bezbednost.`,
      },
      {
        title: "10. Izmene ove politike",
        body: `S vremena na vreme možemo ažurirati ovu Politiku privatnosti. Datum na vrhu ove stranice ukazuje na to kada je poslednji put revidirana. Nastavak korišćenja našeg sajta nakon izmena podrazumeva prihvatanje ažurirane politike.`,
      },
      {
        title: "11. Kontakt",
        body: `Za sva pitanja ili nedoumice u vezi sa ovom Politikom privatnosti, kontaktirajte nas:\n\nCodux Studio\nBeograd, Srbija\ninfo@coduxstudio.com`,
      },
    ],
  },
};

export function PrivacyPolicyPage() {
  const { lang } = useApp();
  const copy = COPY[lang];
  return (
    <>
      <Seo
        title={`${copy.title} — Codux Studio`}
        description={lang === "en"
          ? "Privacy Policy for Codux Studio — how we collect, use, and protect your personal data."
          : "Politika privatnosti Codux Studio — kako prikupljamo, koristimo i štitimo vaše lične podatke."}
        path="/privacy-policy"
        lang={lang}
      />
      <PageHero tag={copy.tag} title={copy.title} desc={copy.updated} color={T.accent} />
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
