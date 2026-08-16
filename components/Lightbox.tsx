"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxItem {
  image: string;
  alt: string;
  title?: string;
  caption?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  /** Index de l'élément affiché, ou `null` si la visionneuse est fermée. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const SWIPE_THRESHOLD = 48;

export function Lightbox({ items, index, onClose, onIndexChange }: LightboxProps) {
  const isOpen = index !== null;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [announce, setAnnounce] = useState("");

  const goTo = useCallback(
    (direction: 1 | -1) => {
      if (index === null || items.length === 0) return;
      const next = (index + direction + items.length) % items.length;
      onIndexChange(next);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") goTo(1);
      if (event.key === "ArrowLeft") goTo(-1);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, goTo, onClose]);

  useEffect(() => {
    if (index === null) return;
    setAnnounce(`Image ${index + 1} sur ${items.length}`);
  }, [index, items.length]);

  if (index === null) return null;

  const current = items[index];
  if (!current) return null;

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStartX.current;
    const end = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (start === null || end === undefined) return;
    const delta = end - start;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    goTo(delta < 0 ? 1 : -1);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visionneuse d'images"
      className="fixed inset-0 z-[100] flex flex-col bg-black/96 backdrop-blur-sm"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>

      {/* Clic hors de l'image : fermeture */}
      <button
        type="button"
        aria-label="Fermer la visionneuse"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <div className="relative z-10 flex items-center justify-between px-5 py-4 sm:px-8">
        <span className="font-sans text-xs tracking-[0.2em] text-white/50">
          {String(index + 1).padStart(2, "0")}
          <span className="mx-2 text-white/45">/</span>
          {String(items.length).padStart(2, "0")}
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer la visionneuse"
          className="flex size-11 items-center justify-center rounded-card border border-white/15 text-white transition-colors hover:border-gold hover:text-gold"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="pointer-events-none relative z-10 flex flex-1 items-center justify-center px-3 pb-4 sm:px-16">
        <div className="pointer-events-auto relative h-full w-full max-w-6xl">
          <Image
            key={current.image}
            src={current.image}
            alt={current.alt}
            fill
            sizes="100vw"
            quality={85}
            className="object-contain"
          />
        </div>
      </div>

      {items.length > 1 ? (
        <>
          <button
            type="button"
            onClick={() => goTo(-1)}
            aria-label="Image précédente"
            className="absolute top-1/2 left-2 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-card border border-white/15 bg-black/40 text-white transition-colors hover:border-gold hover:text-gold sm:left-5"
          >
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(1)}
            aria-label="Image suivante"
            className="absolute top-1/2 right-2 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-card border border-white/15 bg-black/40 text-white transition-colors hover:border-gold hover:text-gold sm:right-5"
          >
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>
        </>
      ) : null}

      <div className="relative z-10 px-5 pb-7 text-center sm:px-8">
        {current.title ? (
          <p className="display text-lg text-white sm:text-xl">{current.title}</p>
        ) : null}
        {current.caption ? (
          <p className="mt-1.5 text-xs text-muted">{current.caption}</p>
        ) : null}
      </div>
    </div>
  );
}
