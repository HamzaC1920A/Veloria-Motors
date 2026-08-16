"use client";

import { useCallback, useEffect, useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink } from "./ui/Button";
import { navigation, APPOINTMENT_ANCHOR } from "@/data/navigation";
import { siteConfig, links } from "@/config/site";
import { whatsappUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/** Ancres suivies par l'indicateur de section active. */
const SECTION_IDS = navigation.map((item) => item.href.replace("#", ""));

const FIRST_SECTION_ID = SECTION_IDS[0] ?? "";

/** Ligne de référence sous le header, qui détermine la section « courante ». */
const ACTIVE_LINE_OFFSET = 120;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>(FIRST_SECTION_ID);

  /*
   * Un seul écouteur de défilement pour les trois indicateurs (fond du header,
   * barre de progression, section active), throttlé par requestAnimationFrame :
   * sur une landing de neuf sections, c'est le principal repère d'orientation.
   */
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const scrollY = window.scrollY;
      setScrolled(scrollY > 24);

      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, scrollY / scrollable) : 0);

      /*
       * Section active = la dernière DANS L'ORDRE DU DOCUMENT dont le haut a
       * franchi la ligne de référence. On compare les positions plutôt que
       * l'ordre du menu : « À propos » est cinquième dans la navigation mais
       * deuxième dans la page.
       */
      const line = scrollY + ACTIVE_LINE_OFFSET;
      let current = FIRST_SECTION_ID;
      let bestTop = Number.NEGATIVE_INFINITY;
      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (!element) continue;
        const top = element.getBoundingClientRect().top + scrollY;
        if (top <= line && top > bestTop) {
          bestTop = top;
          current = id;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Verrouille le défilement de la page tant que le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled || menuOpen
            ? "border-b border-white/10 bg-base/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        {/* Barre de progression de lecture — décorative, jamais annoncée. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-gold to-gold-light transition-opacity duration-500"
          style={{
            transform: `scaleX(${progress})`,
            opacity: scrolled ? 1 : 0,
          }}
        />

        <div className="container-page flex h-[68px] items-center justify-between lg:h-20">
          <a
            href="#accueil"
            onClick={closeMenu}
            aria-label={`${siteConfig.siteName} — retour en haut de page`}
          >
            <Logo />
          </a>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navigation.map((item) => {
                const isActive = item.href === `#${activeId}`;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "group relative text-[13px] font-medium tracking-wide transition-colors",
                        isActive ? "text-white" : "text-white/75 hover:text-white",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300",
                          isActive ? "w-full" : "w-0 group-hover:w-full",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={links.tel}
              className="flex items-center gap-2 text-[13px] font-medium text-white/75 transition-colors hover:text-gold"
              aria-label={`Appeler le ${siteConfig.phoneDisplay}`}
            >
              <Phone className="size-4" aria-hidden="true" />
              {siteConfig.phoneDisplay}
            </a>
            <ButtonLink href={APPOINTMENT_ANCHOR} size="sm">
              Prendre rendez-vous
            </ButtonLink>
          </div>

          {/* Actions mobile : WhatsApp toujours accessible + menu */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <a
              href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Écrire sur WhatsApp"
              className="flex size-11 items-center justify-center rounded-card border border-white/10 text-white transition-colors hover:border-[#25a35a] hover:text-[#25a35a]"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              className="flex size-11 items-center justify-center rounded-card border border-white/10 text-white transition-colors hover:border-gold hover:text-gold"
            >
              {menuOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Panneau de navigation mobile */}
      <div
        id="menu-mobile"
        hidden={!menuOpen}
        className={cn(
          "fixed inset-x-0 top-[68px] bottom-0 z-40 overflow-y-auto bg-base/97 backdrop-blur-xl lg:hidden",
        )}
      >
        <nav aria-label="Navigation mobile" className="px-5 pt-6 pb-10">
          <ul className="flex flex-col">
            {navigation.map((item) => {
              const isActive = item.href === `#${activeId}`;
              return (
                <li key={item.href} className="border-b border-white/[0.07]">
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "display flex items-center gap-3 py-5 text-3xl transition-colors hover:text-gold",
                      isActive ? "text-gold" : "text-white/90",
                    )}
                  >
                    {isActive ? (
                      <span className="h-px w-6 bg-gold" aria-hidden="true" />
                    ) : null}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-9 flex flex-col gap-3">
            <ButtonLink href={APPOINTMENT_ANCHOR} onClick={closeMenu} size="lg">
              Prendre rendez-vous
            </ButtonLink>
            <ButtonLink
              href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Écrire sur WhatsApp
            </ButtonLink>
            <ButtonLink href={links.tel} variant="outline" size="lg">
              <Phone className="size-4" aria-hidden="true" />
              {siteConfig.phoneDisplay}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </>
  );
}
