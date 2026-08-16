import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { ButtonLink } from "./ui/Button";
import { APPOINTMENT_ANCHOR } from "@/data/navigation";

export function Intro() {
  return (
    <section
      id="a-propos"
      className="grain section section--lg relative overflow-hidden"
    >
      <div className="hairline absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="container-page relative grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-24">
        <div>
          {/* Section pivot : l'un des deux seuls accents dorés de la page. */}
          <SectionHeading
            eyebrow="À propos"
            title="L'excellence"
            titleAccent="automobile"
            align="left"
            size="lg"
          />

          <Reveal delay={0.21}>
            <div className="mt-8 space-y-5 text-[1rem] leading-relaxed text-muted sm:text-lg">
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

          <Reveal delay={0.28}>
            <div className="mt-10">
              <ButtonLink href={APPOINTMENT_ANCHOR} variant="outline" size="lg">
                Demander un rendez-vous
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.14} y={40}>
          <div className="relative">
            {/* Cadre doré décalé : détail premium discret */}
            <div
              className="absolute -inset-3 border border-gold/20 sm:-inset-5"
              aria-hidden="true"
            />
            <div className="relative aspect-4/5 overflow-hidden rounded-card sm:aspect-3/4 lg:aspect-4/5">
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
