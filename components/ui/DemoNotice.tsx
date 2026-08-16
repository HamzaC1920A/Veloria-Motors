import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoNoticeProps {
  children: string;
  className?: string;
}

/**
 * Bandeau signalant explicitement un contenu de démonstration.
 * Indispensable pour ne jamais laisser croire qu'un visuel ou une donnée
 * provient réellement de l'entreprise.
 */
export function DemoNotice({ children, className }: DemoNoticeProps) {
  return (
    <p
      className={cn(
        "inline-flex items-start gap-2.5 rounded-sm border border-gold/20 bg-gold/[0.06]",
        "px-4 py-2.5 text-xs leading-relaxed text-gold-light/90",
        className,
      )}
    >
      <Info className="mt-px size-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
