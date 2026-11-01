---
title: "Zašto je vaš sajt spor i koliko vas to košta"
description: "Core Web Vitals jednostavnim jezikom: šta usporava sajt, kako brzina utiče na Google i upite, i koje popravke donose najveću razliku."
date: 2026-10-14
category: web
cover: speed
image: /blog/speed.jpg
tags: [brzina sajta, Core Web Vitals, SEO]
author: Codux Studio
---

Spor sajt retko pukne glasno. Niko vam neće poslati mejl „vaša početna se učitavala šest sekundi, pa sam odustao". Posetioci se jednostavno vrate na Google i kliknu sledeći rezultat — a vi nikada ne saznate da su bili tu.

Evo šta zaista usporava sajtove, kako Google to meri i koje popravke vrede vašeg novca.

## Kako Google meri brzinu: Core Web Vitals

Google prati tri broja, prikupljena od stvarnih korisnika Chrome-a koji posećuju vaš sajt:

| Metrika | Šta meri | Dobro |
|---|---|---|
| **LCP** — Largest Contentful Paint | Koliko brzo se pojavi glavni sadržaj (naslovna slika ili naslov) | ispod 2,5 s |
| **INP** — Interaction to Next Paint | Koliko brzo stranica reaguje na dodir ili klik | ispod 200 ms |
| **CLS** — Cumulative Layout Shift | Koliko stranica „skače" dok se učitava | ispod 0,1 |

Ovo je deo Google-ovih signala o iskustvu na stranici. Neće slabu stranicu izbaciti na vrh — relevantan i koristan sadržaj je i dalje najvažniji — ali između dve slične stranice, brža ima prednost. A brzina utiče i na nešto još direktnije: da li će posetilac ostati dovoljno dugo da vas kontaktira.

## Uobičajeni krivci

**1. Prevelike slike.** Najčešći problem koji viđamo. Fotografija od 4000 piksela direktno iz aparata, prikazana u širini od 600 piksela. Moderni formati (WebP, AVIF) i slike prave veličine često sami prepolove težinu stranice.

**2. Previše pluginova i skripti.** Svaki slajder, chat widget, piksel za praćenje i „još samo jedan" plugin dodaju JavaScript koji browser mora da preuzme i izvrši pre nego što stranica reaguje. Mnogi sajtovi nose skripte za funkcije koje više niko ne koristi.

**3. Teški page builderi i teme.** Univerzalne teme učitavaju kod za stotine rasporeda da bi mogle da se prodaju svima. Vaš sajt koristi pet, ali posetioci preuzimaju sve.

**4. Spor hosting.** Ako serveru treba sekunda samo da počne da odgovara, nikakva optimizacija front-enda ne može da vrati to vreme. Jeftin deljeni hosting je često usko grlo.

**5. Fontovi i pomeranje sadržaja.** Fontovi sa tuđih servera, slike bez zadatih dimenzija i baneri koji se ubace kasno teraju stranicu da skače — to je vaš CLS.

## Kako da proverite svoj sajt

1. Otvorite [PageSpeed Insights](https://pagespeed.web.dev) i testirajte početnu i jednu važnu unutrašnju stranicu, **na mobilnom**.
2. Prvo pogledajte gornji deo — „Discover what your real users are experiencing". To su podaci stvarnih korisnika; ocena ispod je laboratorijska simulacija.
3. U Google Search Console-u izveštaj *Core Web Vitals* pokazuje koje grupe stranica padaju i zašto.

Ne jurite savršenih 100. Cilj je da sve tri metrike budu zelene za stvarne korisnike.

## Popravke koje donose najveću razliku

- **Kompresujte i smanjite slike**, koristite WebP/AVIF i učitavajte sve ispod prvog ekrana tek kad zatreba (lazy loading).
- **Uklonite ono što ne koristite**: pluginove, stare skripte za praćenje, nekorišćene fontove i debljine fontova.
- **Uključite keširanje i CDN**, da se stranice isporučuju sa servera blizu posetioca.
- **Zadajte dimenzije slikama i videima**, da se raspored ne pomera.
- **Promenite hosting** ako je problem vreme odziva servera — često je to najjeftinija velika ušteda.
- **Napravite novi front-end** kada je problem sama tema. Lagana tema po meri ili statički framework kao Next.js uklanja većinu težine u startu.

Poslednje zvuči drastično, ali je ponekad jedina trajna popravka. Optimizovati tešku univerzalnu temu je kao staviti spojler na kamion. O tome više u tekstu [WordPress ili sajt po meri](/blog/wordpress-vs-custom-website).

## Kada vredi pozvati developera

Ako vaš sajt pada na Core Web Vitals na mobilnom, radi na univerzalnoj temi sa page builderom, a tim se plaši da ažurira pluginove — problem nije jedno podešavanje. Problem je osnova.

To je posao koji radimo u okviru [web developmenta](/services#web-development): brz, čist front-end koji prolazi Core Web Vitals od prvog dana. Želite brzo drugo mišljenje o svom sajtu? [Pošaljite nam link](/contact) — prva konsultacija je besplatna.
