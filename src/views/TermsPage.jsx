"use client";
import { PageHero } from "../components/PageHero";
import { Seo } from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { T } from "../theme";
import { useApp } from "../context/AppContext";

const COPY = {
  en: {
    tag: "Legal",
    title: "Terms and Conditions",
    updated: "Last updated: May 2026",
    sections: [
      {
        title: "1. Introduction",
        body: `These Terms and Conditions ("Terms") govern your use of the Codux Studio website at https://coduxstudio.com and any services we provide. By accessing our website or engaging our services you agree to be bound by these Terms.\n\nCodux Studio is a web development and digital marketing agency based in Belgrade, Serbia. Contact: info@coduxstudio.com.`,
      },
      {
        title: "2. Services",
        body: `Codux Studio provides web development, UI/UX design, digital marketing, e-commerce solutions, and related digital services. The specific scope, deliverables, timeline, and pricing for any project are agreed upon in a separate written proposal or contract between Codux Studio and the client.`,
      },
      {
        title: "3. Intellectual Property",
        body: `All content on this website — including text, graphics, logos, images, and code — is the property of Codux Studio and is protected by applicable intellectual property laws.\n\nUpon full payment for a project, the client receives ownership of the custom deliverables created specifically for them. Codux Studio retains the right to display the work in its portfolio unless otherwise agreed in writing.\n\nAny third-party assets, frameworks, or open-source libraries used in projects remain subject to their respective licences.`,
      },
      {
        title: "4. Client Obligations",
        body: `The client agrees to:\n\n• Provide accurate and complete information required to carry out the project.\n• Respond to requests for feedback, content, or approvals within the agreed timeframe.\n• Ensure they hold all necessary rights for any materials, content, or assets provided to Codux Studio.\n• Pay invoices in accordance with the agreed payment schedule.`,
      },
      {
        title: "5. Payment Terms",
        body: `Payment terms are defined in the individual project agreement. Unless otherwise stated:\n\n• A deposit is required before project work commences.\n• Final deliverables are released upon receipt of full payment.\n• Invoices not paid within the agreed period may incur a late payment fee.\n\nAll prices are in EUR or RSD as stated in the proposal and are exclusive of VAT where applicable.`,
      },
      {
        title: "6. Limitation of Liability",
        body: `To the fullest extent permitted by law, Codux Studio shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our website or services, including loss of revenue, data, or business opportunities.\n\nOur total liability in connection with any project shall not exceed the total fees paid by the client for that specific project.`,
      },
      {
        title: "7. Warranties and Disclaimers",
        body: `We provide our services with reasonable skill and care. However, we do not warrant that:\n\n• The website will be uninterrupted or error-free at all times.\n• The information on this website is complete or current.\n\nWe reserve the right to modify, suspend, or discontinue any part of our website without notice.`,
      },
      {
        title: "8. Confidentiality",
        body: `Both parties agree to keep confidential any non-public information shared during the course of a project and not to disclose it to third parties without prior written consent, except as required by law.`,
      },
      {
        title: "9. Termination",
        body: `Either party may terminate a project agreement with written notice if the other party materially breaches these Terms and fails to remedy the breach within 14 days of notification. Work completed up to the termination date is payable by the client.`,
      },
      {
        title: "10. Governing Law",
        body: `These Terms are governed by the laws of the Republic of Serbia. Any disputes arising from or related to these Terms shall be subject to the exclusive jurisdiction of the courts of Belgrade, Serbia.`,
      },
      {
        title: "11. Changes to These Terms",
        body: `We may update these Terms from time to time. The date at the top of this page reflects the most recent revision. Continued use of our website after changes constitutes acceptance of the updated Terms.`,
      },
      {
        title: "12. Contact",
        body: `For any questions regarding these Terms and Conditions, please contact:\n\nCodux Studio\nBelgrade, Serbia\ninfo@coduxstudio.com`,
      },
    ],
  },
  sr: {
    tag: "Pravno",
    title: "Uslovi korišćenja",
    updated: "Poslednje ažuriranje: maj 2026.",
    sections: [
      {
        title: "1. Uvod",
        body: `Ovi Uslovi korišćenja („Uslovi") regulišu korišćenje veb sajta Codux Studio na adresi https://coduxstudio.com i svih usluga koje pružamo. Pristupanjem našem sajtu ili angažovanjem naših usluga prihvatate ove Uslove.\n\nCodux Studio je agencija za web razvoj i digitalni marketing sa sedištem u Beogradu, Srbija. Kontakt: info@coduxstudio.com.`,
      },
      {
        title: "2. Usluge",
        body: `Codux Studio pruža usluge web razvoja, UI/UX dizajna, digitalnog marketinga, e-commerce rešenja i srodnih digitalnih usluga. Konkretni obim, isporuke, rokovi i cene za svaki projekat dogovaraju se u posebnoj pisanoj ponudi ili ugovoru između Codux Studio i klijenta.`,
      },
      {
        title: "3. Intelektualna svojina",
        body: `Sav sadržaj na ovom sajtu — uključujući tekstove, grafike, logotipe, slike i kod — vlasništvo je Codux Studio i zaštićen je važećim zakonima o intelektualnoj svojini.\n\nNakon pune uplate za projekat, klijent stiče vlasništvo nad prilagođenim isporukama izrađenim specifično za njega. Codux Studio zadržava pravo prikazivanja rada u svom portfoliju, osim ako nije drugačije dogovoreno u pisanoj formi.\n\nSvi materijali, okviri ili biblioteke otvorenog koda korišćeni u projektima ostaju podložni odgovarajućim licencama.`,
      },
      {
        title: "4. Obaveze klijenta",
        body: `Klijent se obavezuje da:\n\n• Pruži tačne i potpune informacije potrebne za realizaciju projekta.\n• Odgovara na zahteve za povratne informacije, sadržaj ili odobrenja u dogovorenom roku.\n• Osigura da poseduje sva neophodna prava za materijale, sadržaj ili resurse koje dostavlja Codux Studio.\n• Plaća fakture u skladu sa dogovorenim planom plaćanja.`,
      },
      {
        title: "5. Uslovi plaćanja",
        body: `Uslovi plaćanja definisani su u individualnom projektnom sporazumu. Osim ako nije drugačije navedeno:\n\n• Pre početka rada na projektu potrebna je uplata depozita.\n• Finalne isporuke se predaju nakon primanja pune uplate.\n• Fakture koje nisu plaćene u dogovorenom roku mogu podleći naknadi za kašnjenje u plaćanju.\n\nSve cene su u EUR ili RSD kako je navedeno u ponudi i ne uključuju PDV gde je primenjivo.`,
      },
      {
        title: "6. Ograničenje odgovornosti",
        body: `U najvećoj meri dozvoljenoj zakonom, Codux Studio neće biti odgovoran za bilo kakve indirektne, slučajne, posebne ili posledične štete nastale korišćenjem našeg sajta ili usluga, uključujući gubitak prihoda, podataka ili poslovnih mogućnosti.\n\nUkupna odgovornost Codux Studio u vezi sa bilo kojim projektom neće premašiti ukupne naknade koje je klijent platio za taj specifični projekat.`,
      },
      {
        title: "7. Garancije i odricanja",
        body: `Naše usluge pružamo sa razumnom pažnjom i stručnošću. Međutim, ne garantujemo da:\n\n• Sajt će biti neprekidno dostupan i bez grešaka.\n• Informacije na ovom sajtu su potpune ili ažurne.\n\nZadržavamo pravo da izmenimo, suspendujemo ili ukinemo bilo koji deo našeg sajta bez prethodne najave.`,
      },
      {
        title: "8. Poverljivost",
        body: `Obe strane se slažu da čuvaju poverljivost svih nejavnih informacija podeljenih tokom realizacije projekta i da ih ne otkrivaju trećim stranama bez prethodnog pisanog pristanka, osim kada to zahteva zakon.`,
      },
      {
        title: "9. Raskid",
        body: `Svaka strana može raskinuti projektni sporazum pisanim obaveštenjem ukoliko druga strana materijalno krši ove Uslove i ne otkloni kršenje u roku od 14 dana od obaveštenja. Rad završen do datuma raskida klijent je dužan da plati.`,
      },
      {
        title: "10. Merodavno pravo",
        body: `Ovi Uslovi regulisani su zakonima Republike Srbije. Svi sporovi nastali iz ili u vezi sa ovim Uslovima biće u isključivoj nadležnosti sudova u Beogradu, Srbija.`,
      },
      {
        title: "11. Izmene ovih uslova",
        body: `Ove Uslove možemo povremeno ažurirati. Datum na vrhu ove stranice odražava najnoviju reviziju. Nastavak korišćenja našeg sajta nakon izmena podrazumeva prihvatanje ažuriranih Uslova.`,
      },
      {
        title: "12. Kontakt",
        body: `Za sva pitanja u vezi sa ovim Uslovima korišćenja, kontaktirajte nas:\n\nCodux Studio\nBeograd, Srbija\ninfo@coduxstudio.com`,
      },
    ],
  },
};

export function TermsPage() {
  const { lang } = useApp();
  const copy = COPY[lang];
  return (
    <>
      <Seo
        title={`${copy.title} — Codux Studio`}
        description={lang === "en"
          ? "Terms and Conditions governing the use of Codux Studio's website and services."
          : "Uslovi korišćenja koji regulišu upotrebu sajta i usluga Codux Studio."}
        path="/terms"
        lang={lang}
      />
      <PageHero tag={copy.tag} title={copy.title} desc={copy.updated} color={T.orange} />
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
