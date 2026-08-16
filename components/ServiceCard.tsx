import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";
import { pad2 } from "@/lib/utils";
import { whatsappUrl, serviceWhatsappMessage } from "@/lib/whatsapp";

interface ServiceCardProps {
  service: Service;
  index: number;
}

/** Ancre de la carte, utilisée par les liens « Services » du pied de page. */
export const serviceAnchorId = (serviceId: string) => `service-${serviceId}`;

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <a
      id={serviceAnchorId(service.id)}
      href={whatsappUrl(serviceWhatsappMessage(service.title))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${service.title} — nous écrire sur WhatsApp`}
      /* `card-interactive` porte l'élévation, la bordure dorée et le filet de
         pied — mêmes états au survol et au focus clavier, comme partout. */
      className="card-interactive group flex h-full flex-col overflow-hidden border border-white/[0.08] bg-elevated p-8 sm:p-9"
    >
      {/* Voile doré révélé au survol */}
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/[0.07] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden="true"
      />

      <span
        className="display pointer-events-none absolute top-5 right-6 text-5xl text-white/[0.05] transition-colors duration-500 group-hover:text-gold/20 group-focus-visible:text-gold/20"
        aria-hidden="true"
      >
        {pad2(index + 1)}
      </span>

      <span className="relative flex size-13 items-center justify-center rounded-card border border-gold/25 bg-gold/[0.06] transition-colors duration-500 group-hover:border-gold/60 group-focus-visible:border-gold/60">
        <Icon className="size-6 text-gold" aria-hidden="true" strokeWidth={1.5} />
      </span>

      <h3 className="display relative mt-7 text-step-2 text-white">{service.title}</h3>

      <p className="relative mt-4 flex-1 text-sm leading-relaxed text-muted">
        {service.description}
      </p>

      <span className="relative mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60 transition-colors duration-300 group-hover:text-gold group-focus-visible:text-gold">
        Nous contacter
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </span>
    </a>
  );
}
