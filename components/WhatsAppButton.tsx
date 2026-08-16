"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/** Le bouton apparaît une fois le hero dépassé, pour ne pas le surcharger. */
const REVEAL_OFFSET = 320;

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > REVEAL_OFFSET);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactez-nous sur WhatsApp"
      title="Contactez-nous sur WhatsApp"
      className={cn(
        "group fixed right-4 bottom-4 z-40 flex items-center gap-3 rounded-full bg-[#1f8f4e] text-white sm:right-6 sm:bottom-6",
        "size-14 justify-center shadow-[0_16px_40px_-12px_rgba(31,143,78,0.8)] sm:size-auto sm:justify-start sm:px-6 sm:py-4",
        "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#25a35a] hover:shadow-[0_20px_50px_-10px_rgba(37,163,90,0.9)]",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <MessageCircle className="size-6 shrink-0 sm:size-5" aria-hidden="true" />
      <span className="hidden text-[11px] font-semibold uppercase tracking-[0.16em] sm:inline">
        Écrire sur WhatsApp
      </span>

      {/* Info-bulle desktop */}
      <span
        role="tooltip"
        className="pointer-events-none absolute right-full bottom-1/2 mr-3 hidden translate-y-1/2 rounded-card border border-white/10 bg-base px-3 py-2 text-[11px] whitespace-nowrap text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block"
      >
        Contactez-nous sur WhatsApp
      </span>
    </a>
  );
}
