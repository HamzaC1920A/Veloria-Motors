"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { DemoNotice } from "./ui/DemoNotice";
import { Lightbox, type LightboxItem } from "./Lightbox";
import { gallery, galleryCategories, type GalleryCategory } from "@/data/gallery";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("Tous");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visibleItems = useMemo(
    () =>
      activeCategory === "Tous"
        ? gallery
        : gallery.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  const lightboxItems: LightboxItem[] = useMemo(
    () =>
      visibleItems.map((item) => ({
        image: item.image,
        alt: item.alt,
        title: item.category,
        caption: "Visuel de démonstration — à remplacer par vos photos.",
      })),
    [visibleItems],
  );

  const selectCategory = (category: GalleryCategory) => {
    setActiveCategory(category);
    setOpenIndex(null);
  };

  return (
    <section
      id="galerie"
      className="relative border-t border-white/[0.06] py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Galerie"
          title="Notre univers"
          titleAccent="en images"
          description="Véhicules, jantes, pneumatiques et travaux d'atelier."
        />

        {/* Filtres — défilement horizontal sur mobile */}
        <Reveal delay={0.1}>
          <div
            role="group"
            aria-label="Filtrer la galerie par catégorie"
            className="mt-12 -mx-5 flex gap-2.5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
          >
            {galleryCategories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => selectCategory(category)}
                  aria-pressed={isActive}
                  className={cn(
                    "h-11 shrink-0 border px-5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300",
                    isActive
                      ? "border-gold bg-gold text-black"
                      : "border-white/12 text-white/60 hover:border-gold/50 hover:text-white",
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {visibleItems.map((item, index) => (
            <Reveal as="li" key={item.id} delay={Math.min(index * 0.04, 0.3)} y={18}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`Agrandir l'image : ${item.alt}`}
                className="group relative block h-full w-full overflow-hidden border border-white/[0.08] transition-colors duration-500 hover:border-gold/40"
              >
                <div className="relative aspect-square">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    /* Même étalonnage que les réalisations, pour une galerie homogène. */
                    className="object-cover brightness-[0.88] saturate-[0.8] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08] group-hover:brightness-100 group-hover:saturate-100"
                  />
                  <div className="absolute inset-0 bg-base/25 transition-colors duration-500 group-hover:bg-base/55" />
                  <span
                    className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <span className="flex size-12 items-center justify-center rounded-full border border-gold/70 bg-black/40 text-gold backdrop-blur-sm">
                      <Plus className="size-5" />
                    </span>
                  </span>
                  <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/0 transition-colors duration-500 group-hover:text-white/80">
                    {item.category}
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <DemoNotice>
              Démonstration : images libres de droits servant à illustrer la mise en
              page. Elles seront remplacées par vos propres photos.
            </DemoNotice>
          </div>
        </Reveal>
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
