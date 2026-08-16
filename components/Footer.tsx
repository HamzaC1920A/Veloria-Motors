import { Phone, MessageCircle, Facebook, Instagram, ArrowUp } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink } from "./ui/Button";
import { navigation, APPOINTMENT_ANCHOR } from "@/data/navigation";
import { services } from "@/data/services";
import { siteConfig, links, isTodo } from "@/config/site";
import { whatsappUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";

const YEAR = 2026;

export function Footer() {
  const instagramAvailable = !isTodo(siteConfig.instagramUrl);

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-elevated">
      <div
        className="glow-gold pointer-events-none absolute inset-x-0 top-0 h-56"
        aria-hidden="true"
      />

      {/* Rappel final du CTA principal */}
      <div className="relative border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-7 px-5 py-14 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-16">
          <div>
            <h2 className="display text-3xl text-white sm:text-4xl lg:text-5xl">
              Un projet pour votre véhicule ?
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Prenez rendez-vous en quelques secondes.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href={APPOINTMENT_ANCHOR} size="lg">
              Prendre rendez-vous
            </ButtonLink>
            <ButtonLink
              href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Entreprise */}
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              Des services automobiles professionnels et une attention particulière
              portée à chaque véhicule.
            </p>
            <div className="mt-7 flex gap-2.5">
              <a
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Page Facebook"
                className="flex size-11 items-center justify-center border border-white/10 text-white/65 transition-colors hover:border-gold hover:text-gold"
              >
                <Facebook className="size-4.5" aria-hidden="true" />
              </a>
              {instagramAvailable ? (
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Compte Instagram"
                  className="flex size-11 items-center justify-center border border-white/10 text-white/65 transition-colors hover:border-gold hover:text-gold"
                >
                  <Instagram className="size-4.5" aria-hidden="true" />
                </a>
              ) : null}
              <a
                href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Écrire sur WhatsApp"
                className="flex size-11 items-center justify-center border border-white/10 text-white/65 transition-colors hover:border-[#25a35a] hover:text-[#25a35a]"
              >
                <MessageCircle className="size-4.5" aria-hidden="true" />
              </a>
              <a
                href={links.tel}
                aria-label={`Appeler le ${siteConfig.phoneDisplay}`}
                className="flex size-11 items-center justify-center border border-white/10 text-white/65 transition-colors hover:border-gold hover:text-gold"
              >
                <Phone className="size-4.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation du pied de page">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              Navigation
            </h3>
            <ul className="mt-6 space-y-3.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              Services
            </h3>
            <ul className="mt-6 space-y-3.5">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              Contact
            </h3>
            <ul className="mt-6 space-y-3.5 text-sm">
              <li>
                <a
                  href={links.tel}
                  className="text-muted transition-colors hover:text-white"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={links.telSecondary}
                  className="text-muted transition-colors hover:text-white"
                >
                  {siteConfig.phoneSecondaryDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li className="text-white/35">
                Adresse : {isTodo(siteConfig.address) ? "à compléter" : siteConfig.address}
              </li>
              <li className="text-white/35">
                Horaires :{" "}
                {isTodo(siteConfig.openingHours) ? "à compléter" : siteConfig.openingHours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/35">
            © {YEAR} {siteConfig.siteName}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-xs text-white/25">
              Version de démonstration — contenu non contractuel.
            </p>
            <a
              href="#accueil"
              aria-label="Revenir en haut de la page"
              className="flex size-10 items-center justify-center border border-white/10 text-white/50 transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowUp className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
