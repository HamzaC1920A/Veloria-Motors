import Image from "next/image";
import type { CSSProperties } from "react";
import { Phone, ArrowRight, ChevronDown } from "lucide-react";
import { ButtonLink } from "./ui/Button";
import { siteConfig, links } from "@/config/site";
import { APPOINTMENT_ANCHOR } from "@/data/navigation";
import { highlights } from "@/data/highlights";

/**
 * Le hero est un composant serveur : son apparition est gérée en CSS
 * (classe `.rise`), ce qui garantit un contenu lisible dès le premier rendu,
 * sans attendre le JavaScript. La préférence « animations réduites » est
 * prise en charge globalement dans globals.css.
 */
const delay = (seconds: number) => ({ "--rise-delay": `${seconds}s` }) as CSSProperties;

export function Hero() {
  return (
    <section
      id="accueil"
      className="grain relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Visuel de fond */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={82}
          className="object-cover object-center"
        />
        {/*
          Superpositions allégées : le voile global est volontairement plus
          léger qu'auparavant pour que la photo d'atelier reste lisible. Le
          contraste du texte est assuré par le dégradé directionnel, qui reste
          quasi opaque sous la colonne de gauche.
        */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-base via-base/80 to-base/10" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-base to-transparent" />
      </div>

      <div className="container-page relative z-10 pt-28 pb-24 lg:pt-32">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-20">
          <div className="max-w-3xl">
            <div className="rise flex items-center gap-4" style={delay(0.05)}>
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              <p className="eyebrow">{siteConfig.tagline}</p>
            </div>

            <h1 className="rise display mt-7 text-step-5" style={delay(0.15)}>
              Votre véhicule
              <br />
              <span className="text-gold-gradient">mérite le meilleur.</span>
            </h1>

            <p
              className="rise mt-8 max-w-xl text-[1rem] leading-relaxed text-white/80 sm:text-lg"
              style={delay(0.28)}
            >
              Des services automobiles professionnels, des solutions adaptées et une
              attention particulière portée à chaque véhicule.
            </p>

            <div
              className="rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              style={delay(0.4)}
            >
              <ButtonLink href={APPOINTMENT_ANCHOR} size="lg">
                Prendre rendez-vous
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="#services" variant="outline" size="lg">
                Découvrir nos services
              </ButtonLink>
            </div>

            <div className="rise mt-10" style={delay(0.5)}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                Appelez-nous
              </p>
              <a
                href={links.tel}
                className="display group mt-3 inline-flex items-center gap-3 text-2xl text-white transition-colors hover:text-gold sm:text-3xl"
                aria-label={`Appeler le ${siteConfig.phoneDisplay}`}
              >
                <Phone
                  className="size-5 text-gold transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>

          {/*
            Rappel compact des engagements, repris tels quels de data/highlights.ts.
            Masqué aux technologies d'assistance : la même liste est présentée plus
            bas, avec ses descriptions, par la section Highlights — l'énoncer deux
            fois n'apporterait rien et alourdirait la lecture vocale.
            Masqué également sous `lg` pour ne pas repousser les CTA du hero mobile.
          */}
          <ul
            aria-hidden="true"
            className="rise hidden lg:block"
            style={delay(0.58)}
          >
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.id}
                  className="flex items-center gap-4 border-t border-white/[0.10] py-4 last:border-b"
                >
                  <Icon
                    className="size-5 shrink-0 text-gold"
                    strokeWidth={1.4}
                  />
                  <span className="display text-[1rem] text-white/90 [text-shadow:0_1px_14px_rgba(0,0,0,0.85)]">
                    {item.title}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/*
        Indicateur de défilement — masqué sur mobile pour laisser la place aux CTA.
        Le positionnement est porté par le parent : `.rise` remet `transform: none`
        en fin d'animation et écraserait le centrage horizontal.
      */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 lg:block">
        <a
          href="#a-propos"
          aria-label="Faire défiler vers la section suivante"
          className="rise block text-white/50 transition-colors hover:text-gold"
          style={delay(0.7)}
        >
          <ChevronDown className="size-7 animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
