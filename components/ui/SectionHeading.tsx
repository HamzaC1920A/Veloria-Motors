import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  /** Deuxième ligne du titre, mise en valeur en doré. */
  titleAccent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  description,
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
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">
          {title}
          {titleAccent ? (
            <>
              <br />
              <span className="text-gold-gradient">{titleAccent}</span>
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
        <Reveal delay={0.18}>
          <p className="mt-7 text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
