"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** Décalage en secondes, pour créer un effet de cascade. */
  delay?: number;
  /** Distance de translation initiale, en pixels. */
  y?: number;
  className?: string;
  as?: "div" | "li" | "section";
}

/**
 * Apparition au scroll, en amélioration progressive :
 *
 * - sans JavaScript, la classe `.js` n'est jamais posée sur <html> et le
 *   contenu reste visible — rien ne disparaît jamais ;
 * - avec JavaScript, l'élément part masqué puis se révèle à l'entrée dans le
 *   viewport (IntersectionObserver) ;
 * - si l'utilisateur a demandé à réduire les animations, la feuille de style
 *   force l'état final : aucun mouvement, contenu immédiatement lisible.
 *
 * Aucune bibliothèque d'animation n'est nécessaire pour cet effet.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Navigateurs sans IntersectionObserver : on révèle immédiatement.
    if (typeof IntersectionObserver === "undefined") {
      element.classList.add("is-revealed");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", className)}
      style={
        {
          "--reveal-delay": `${delay}s`,
          "--reveal-y": `${y}px`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
