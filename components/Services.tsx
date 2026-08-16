import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { DemoNotice } from "./ui/DemoNotice";
import { ServiceCard } from "./ServiceCard";
import { services } from "@/data/services";

export function Services() {
  return (
    <section
      id="services"
      className="relative border-t border-white/[0.06] bg-elevated py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Nos prestations"
          title="Ce que nous"
          titleAccent="réalisons"
          description="Une prise en charge complète de votre véhicule, de l'entretien courant à la personnalisation."
        />

        <ul className="mt-16 grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal
              as="li"
              key={service.id}
              delay={Math.min(index * 0.07, 0.35)}
              className="bg-elevated"
            >
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <DemoNotice>
              Intitulés repris de votre page Facebook. Les descriptions sont
              provisoires et restent à valider avec vous.
            </DemoNotice>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
