import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Size = "md" | "lg";
type Accent = "gold" | "plain";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  /** Deuxième ligne du titre. Voir `accent` pour son traitement. */
  titleAccent?: string;
  /**
   * Traitement de `titleAccent`. `gold` = dégradé doré, réservé aux sections
   * pivots ; `plain` = blanc. Une page ne devrait porter qu'un ou deux accents
   * dorés : au-delà, l'or cesse d'être un signal.
   */
  accent?: Accent;
  description?: string;
  /** Échelle du titre. `lg` pour une section pivot, `md` pour le rythme courant. */
  size?: Size;
  align?: "left" | "center";
  className?: string;
}

const titleSizes: Record<Size, string> = {
  md: "text-step-3",
  lg: "text-step-4",
};

export function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  accent = "gold",
  description,
  size = "lg",
  align = "center",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "max-w-3xl",
        centered ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      <Reveal>
        <div
          className={cn(
            "flex items-center gap-4",
            centered && "justify-center",
          )}
        >
          <span className="h-px w-10 bg-gold" aria-hidden="true" />
          <p className="eyebrow">{eyebrow}</p>
          {centered ? (
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
          ) : null}
        </div>
      </Reveal>

      <Reveal delay={0.07}>
        <h2 className={cn("display mt-5", titleSizes[size])}>
          {title}
          {titleAccent ? (
            <>
              <br />
              <span className={accent === "gold" ? "text-gold-gradient" : undefined}>
                {titleAccent}
              </span>
            </>
          ) : null}
        </h2>
      </Reveal>

      <Reveal delay={0.14}>
        <div
          className={cn("hairline mt-7 h-px w-24", centered && "mx-auto")}
          aria-hidden="true"
        />
      </Reveal>

      {description ? (
        <Reveal delay={0.21}>
          <p className="mt-7 text-[1rem] leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
