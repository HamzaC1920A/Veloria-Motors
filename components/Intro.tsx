import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { ButtonLink } from "./ui/Button";
import { APPOINTMENT_ANCHOR } from "@/data/navigation";

export function Intro() {
  return (
    <section
      id="a-propos"
      className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32 lg:py-40"
    >
      <div className="glow-gold pointer-events-none absolute inset-x-0 top-0 h-80" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-24">
        <div>
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              <p className="eyebrow">À propos</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="display mt-6 text-4xl sm:text-5xl lg:text-[4.25rem]">
              L&apos;excellence
              <br />
              <span className="text-gold-gradient">automobile</span>
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="hairline mt-8 w-28" aria-hidden="true" />
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                Nous accompagnons les propriétaires de véhicules dans l&apos;entretien
                et la valorisation de leur voiture, en apportant à chaque demande une
                réponse adaptée plutôt qu&apos;une prestation standard.
              </p>
              <p>
                Hybride, électrique ou thermique, diagnostic avancé, réparation,
                entretien ou préparation : chaque intervention est préparée,
                expliquée et réalisée avec le même niveau d&apos;exigence, quel que
                soit le véhicule confié.
              </p>
              <p className="text-white/85">
                Décrivez-nous votre besoin, nous vous répondons directement.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-10">
              <ButtonLink href={APPOINTMENT_ANCHOR} variant="outline" size="lg">
                Demander un rendez-vous
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={40}>
          <div className="relative">
            {/* Cadre doré décalé : détail premium discret */}
            <div
              className="absolute -inset-3 border border-gold/20 sm:-inset-5"
              aria-hidden="true"
            />
            <div className="relative aspect-4/5 overflow-hidden sm:aspect-3/4 lg:aspect-4/5">
              <Image
                src="/images/intro.jpg"
                alt="Véhicule dans un atelier — visuel de démonstration"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base/85 via-transparent to-transparent" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
