import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "gold" | "subtle";

interface DemoNoticeProps {
  children: string;
  /**
   * `gold` = mention mise en avant. `subtle` = mention neutre, à utiliser
   * quand plusieurs sections d'affilée en portent une : l'or reste alors
   * réservé aux accents de marque et ne se banalise pas.
   */
  tone?: Tone;
  className?: string;
}

const tones: Record<Tone, string> = {
  gold: "border-gold/20 bg-gold/[0.06] text-gold-light/90",
  subtle: "border-white/[0.10] bg-surface text-muted",
};

/**
 * Bandeau signalant explicitement un contenu de démonstration.
 * Indispensable pour ne jamais laisser croire qu'un visuel ou une donnée
 * provient réellement de l'entreprise.
 */
export function DemoNotice({ children, tone = "gold", className }: DemoNoticeProps) {
  return (
    <p
      className={cn(
        "inline-flex items-start gap-2.5 rounded-card border",
        "px-4 py-2.5 text-xs leading-relaxed",
        tones[tone],
        className,
      )}
    >
      <Info className="mt-px size-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
