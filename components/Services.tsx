import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { DemoNotice } from "./ui/DemoNotice";
import { ServiceCard } from "./ServiceCard";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="section relative bg-elevated">
      <div className="container-page">
        <SectionHeading
          eyebrow="Nos prestations"
          title="Ce que nous"
          titleAccent="réalisons"
          accent="plain"
          size="md"
          description="Une prise en charge complète de votre véhicule, de l'entretien courant à la personnalisation."
        />

        <ul className="mt-16 grid gap-px overflow-hidden rounded-card border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
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

        <Reveal delay={0.07}>
          <div className="mt-10 flex justify-center">
            <DemoNotice tone="subtle">
              Intitulés repris de votre page Facebook. Les descriptions sont
              provisoires et restent à valider avec vous.
            </DemoNotice>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
