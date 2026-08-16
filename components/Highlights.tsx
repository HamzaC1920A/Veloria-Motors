import Image from "next/image";
import { Reveal } from "./ui/Reveal";
import { highlights } from "@/data/highlights";

/**
 * Bandeau de réassurance. Volontairement sans titre de section : aucun intitulé
 * n'existe pour ce bloc dans les contenus fournis, et il n'en a pas été inventé.
 * C'est le traitement — densité resserrée, filets d'encadrement, séparateurs
 * verticaux — qui lui donne son statut de bandeau plutôt que de section à part
 * entière, et lève l'ambiguïté qu'il avait entre deux sections denses.
 */
export function Highlights() {
  return (
    <section className="section section--sm relative overflow-hidden">
      {/* Visuel d'atelier très assombri : sert de texture, pas d'illustration */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/workshop.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-base/92" />
        <div className="absolute inset-0 bg-gradient-to-b from-base via-transparent to-base" />
      </div>

      <div className="hairline absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="hairline absolute inset-x-0 bottom-0" aria-hidden="true" />

      <div className="container-page relative">
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal
                as="li"
                key={item.id}
                delay={Math.min(index * 0.07, 0.35)}
                className="lg:border-l lg:border-white/[0.10] lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
              >
                <Icon
                  className="size-7 text-gold"
                  aria-hidden="true"
                  strokeWidth={1.4}
                />
                <h3 className="display mt-5 text-step-1 text-white">
                  {item.title}
                </h3>
                <p className="mt-3.5 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
