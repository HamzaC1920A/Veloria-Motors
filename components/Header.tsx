"use client";

import { useCallback, useEffect, useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink } from "./ui/Button";
import { navigation, APPOINTMENT_ANCHOR } from "@/data/navigation";
import { siteConfig, links } from "@/config/site";
import { whatsappUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:h-20">
          <a
            href="#accueil"
            onClick={closeMenu}
            aria-label={`${siteConfig.siteName} — retour en haut de page`}
          >
            <Logo />
          </a>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group relative text-[13px] font-medium tracking-wide text-white/75 transition-colors hover:text-white"
                  >
                    {item.label}
                    <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
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
              className="flex size-11 items-center justify-center rounded-sm border border-white/10 text-white transition-colors hover:border-[#25a35a] hover:text-[#25a35a]"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              className="flex size-11 items-center justify-center rounded-sm border border-white/10 text-white transition-colors hover:border-gold hover:text-gold"
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
            {navigation.map((item) => (
              <li key={item.href} className="border-b border-white/[0.07]">
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className="display block py-5 text-3xl text-white/90 transition-colors hover:text-gold"
                >
                  {item.label}
                </a>
              </li>
            ))}
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
