"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { DemoNotice } from "./ui/DemoNotice";
import { Lightbox, type LightboxItem } from "./Lightbox";
import { projects } from "@/data/projects";
import { pad2 } from "@/lib/utils";

const lightboxItems: LightboxItem[] = projects.map((project) => ({
  image: project.image,
  alt: `${project.title} — visuel de démonstration`,
  title: project.title,
  caption: "Visuel de démonstration — ne représente pas une réalisation réelle.",
}));

export function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="realisations" className="section relative">
      <div className="hairline absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="container-page">
        <SectionHeading
          eyebrow="Portfolio"
          title="Nos"
          titleAccent="réalisations"
          accent="plain"
          size="md"
          description="Découvrez quelques-unes de nos réalisations."
        />

        <Reveal delay={0.07}>
          <div className="mt-8 flex justify-center">
            <DemoNotice tone="subtle">
              Emplacements prévus pour vos photos. Les visuels affichés sont des
              images de démonstration et ne représentent pas votre travail réel.
            </DemoNotice>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal as="li" key={project.id} delay={Math.min(index * 0.07, 0.35)}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`Agrandir : ${project.title}`}
                className="card-interactive group block h-full w-full overflow-hidden rounded-card border border-white/[0.08] text-left"
              >
                <div className="relative aspect-4/3">
                  <Image
                    src={project.image}
                    alt={`${project.title} — visuel de démonstration`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    /* Léger étalonnage : unifie des photos aux températures très
                       différentes et garde la cohérence sombre/dorée du site. */
                    className="object-cover brightness-[0.88] saturate-[0.8] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:brightness-100 group-hover:saturate-100 group-focus-visible:scale-[1.06] group-focus-visible:brightness-100 group-focus-visible:saturate-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base via-base/25 to-transparent transition-opacity duration-500 group-hover:from-base/95" />
                </div>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-7">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                      {pad2(index + 1)} — {project.category}
                    </p>
                    <h3 className="display mt-2.5 text-step-2 text-white">
                      {project.title}
                    </h3>
                  </div>
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-card border border-white/20 text-white transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black group-focus-visible:border-gold group-focus-visible:bg-gold group-focus-visible:text-black"
                    aria-hidden="true"
                  >
                    <Maximize2 className="size-4" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <Lightbox
        items={lightboxItems}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </section>
  );
}
