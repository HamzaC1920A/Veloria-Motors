import Image from "next/image";
import { Reveal } from "./ui/Reveal";
import { highlights } from "@/data/highlights";

export function Highlights() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-28">
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

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <ul className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal
                as="li"
                key={item.id}
                delay={Math.min(index * 0.09, 0.36)}
                className="relative"
              >
                <span
                  className="absolute -top-2 left-0 h-px w-12 bg-gold"
                  aria-hidden="true"
                />
                <Icon
                  className="size-7 text-gold"
                  aria-hidden="true"
                  strokeWidth={1.4}
                />
                <h3 className="display mt-5 text-xl text-white sm:text-2xl">
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
