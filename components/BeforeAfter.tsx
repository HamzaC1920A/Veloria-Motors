"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { DemoNotice } from "./ui/DemoNotice";
import { beforeAfter } from "@/data/projects";

const clamp = (value: number) => Math.min(100, Math.max(0, value));

export function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  // Un seul jeu de handlers pour souris et tactile via les Pointer Events.
  useEffect(() => {
    if (!dragging) return;

    const onMove = (event: PointerEvent) => {
      event.preventDefault();
      updateFromClientX(event.clientX);
    };
    const stop = () => setDragging(false);

    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, [dragging, updateFromClientX]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const step = event.shiftKey ? 10 : 2;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((value) => clamp(value - step));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((value) => clamp(value + step));
    }
    if (event.key === "Home") setPosition(0);
    if (event.key === "End") setPosition(100);
  };

  return (
    <section className="relative border-t border-white/[0.06] bg-elevated py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Comparatif"
          title="Avant"
          titleAccent="Après"
          description="Déplacez le curseur pour comparer l'état du véhicule avant et après intervention."
        />

        <Reveal delay={0.12} y={40}>
          <div className="mx-auto mt-14 max-w-5xl lg:mt-16">
            <div
              ref={containerRef}
              onPointerDown={(event) => {
                setDragging(true);
                updateFromClientX(event.clientX);
              }}
              className="relative aspect-4/3 w-full touch-pan-y overflow-hidden border border-white/[0.08] select-none sm:aspect-16/10"
            >
              {/* Après — image de fond */}
              <Image
                src={beforeAfter.afterImage}
                alt={beforeAfter.afterAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
                draggable={false}
              />

              {/* Avant — révélée par le clip */}
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
              >
                <Image
                  src={beforeAfter.beforeImage}
                  alt={beforeAfter.beforeAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  draggable={false}
                />
              </div>

              <span className="pointer-events-none absolute top-4 left-4 border border-white/20 bg-black/65 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm">
                {beforeAfter.beforeLabel}
              </span>
              <span className="pointer-events-none absolute top-4 right-4 border border-gold/40 bg-black/65 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold backdrop-blur-sm">
                {beforeAfter.afterLabel}
              </span>

              {/* Barre de séparation */}
              <div
                className="pointer-events-none absolute inset-y-0 w-px bg-gold"
                style={{ left: `${position}%` }}
                aria-hidden="true"
              />

              {/* Poignée : accessible au clavier */}
              <button
                type="button"
                role="slider"
                aria-label="Comparer avant et après"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(position)}
                aria-valuetext={`${Math.round(position)} % de l'image « ${beforeAfter.beforeLabel} » visible`}
                onKeyDown={onKeyDown}
                onPointerDown={(event) => {
                  event.stopPropagation();
                  setDragging(true);
                }}
                style={{ left: `${position}%` }}
                className="absolute top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-gold bg-base text-gold shadow-[0_0_28px_-4px_rgba(201,162,39,0.75)] transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                <MoveHorizontal className="size-5" aria-hidden="true" />
              </button>
            </div>

            <p className="mt-5 text-center text-xs text-white/40">
              Glissez la poignée — ou utilisez les flèches du clavier.
            </p>

            <div className="mt-6 flex justify-center">
              <DemoNotice>
                Démonstration : les deux visuels proviennent d&apos;une même image
                libre de droits, volontairement altérée pour illustrer le principe.
              </DemoNotice>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
