import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/** Logo officiel fourni par le client. Fichier utilisé tel quel, sans retouche. */
export const LOGO_SRC = "/images/logo.jpg";

interface LogoProps {
  className?: string;
  /** Masque le texte et ne conserve que l'écusson. */
  markOnly?: boolean;
}

/**
 * Logo officiel + rappel typographique du nom.
 *
 * Le fichier source est un badge circulaire sur fond blanc : le conteneur est
 * donc arrondi et masqué (`rounded-full` + `overflow-hidden`) pour n'afficher
 * que le disque noir et or, sans modifier l'image d'origine.
 */
export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span className="relative size-9 shrink-0 overflow-hidden rounded-full sm:size-10">
        <Image
          src={LOGO_SRC}
          alt={`${siteConfig.siteName} — logo`}
          fill
          sizes="40px"
          priority
          /* Léger agrandissement : évacue hors du masque le liseré blanc du
             fichier source. L'image d'origine n'est pas modifiée. */
          className="scale-[1.07] object-cover"
        />
      </span>

      {markOnly ? null : (
        <span className="flex flex-col leading-none">
          <span className="display text-lg text-white sm:text-xl">Veloria</span>
          <span className="mt-0.5 font-sans text-[9px] font-semibold uppercase tracking-[0.34em] text-gold sm:text-[10px]">
            Motors
          </span>
        </span>
      )}
    </span>
  );
}
