import Image from "next/image";
import type { CSSProperties } from "react";
import { Phone, ArrowRight, ChevronDown } from "lucide-react";
import { ButtonLink } from "./ui/Button";
import { siteConfig, links } from "@/config/site";
import { APPOINTMENT_ANCHOR } from "@/data/navigation";

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
        {/* Superpositions : lisibilité du texte sur mobile comme sur desktop */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-base via-base/75 to-base/20" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-base to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pt-28 pb-24 sm:px-8 lg:pt-32">
        <div className="max-w-3xl">
          <div className="rise flex items-center gap-4" style={delay(0.05)}>
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            <p className="eyebrow">{siteConfig.tagline}</p>
          </div>

          <h1
            className="rise display mt-7 text-[clamp(2.5rem,9vw,6.5rem)]"
            style={delay(0.15)}
          >
            Votre véhicule
            <br />
            <span className="text-gold-gradient">mérite le meilleur.</span>
          </h1>

          <p
            className="rise mt-8 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
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
          className="rise block text-white/35 transition-colors hover:text-gold"
          style={delay(0.7)}
        >
          <ChevronDown className="size-7 animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
