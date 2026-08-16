import { Phone, MessageCircle, MapPin, Clock, Mail, Facebook } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { ButtonLink } from "./ui/Button";
import { DemoNotice } from "./ui/DemoNotice";
import { siteConfig, links, isTodo } from "@/config/site";
import { whatsappUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";
import { APPOINTMENT_ANCHOR } from "@/data/navigation";

const TODO_LABEL = "À compléter";

export function Contact() {
  const addressKnown = !isTodo(siteConfig.address);
  const mapsQuery = isTodo(siteConfig.mapsQuery)
    ? null
    : encodeURIComponent(siteConfig.mapsQuery);

  return (
    <section id="contact" className="section relative">
      <div className="hairline absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="container-page">
        <SectionHeading
          eyebrow="Contact"
          title="Nous"
          titleAccent="contacter"
          accent="plain"
          size="md"
          description="Une question, un devis, un besoin précis ? Nous vous répondons directement."
        />

        <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <ul className="space-y-px overflow-hidden rounded-card border border-white/[0.08] bg-white/[0.08]">
              {/* Téléphone — les deux numéros confirmés */}
              <li className="flex items-start gap-5 bg-base p-7 sm:p-8">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-card border border-gold/25 bg-gold/[0.06] text-gold">
                  <Phone className="size-5" aria-hidden="true" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60">
                    Téléphone
                  </span>
                  <a
                    href={links.tel}
                    className="display mt-2 block text-xl text-white transition-colors hover:text-gold sm:text-2xl"
                    aria-label={`Appeler le ${siteConfig.phoneDisplay}`}
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                  <a
                    href={links.telSecondary}
                    className="display mt-1 block text-xl text-white transition-colors hover:text-gold sm:text-2xl"
                    aria-label={`Appeler le ${siteConfig.phoneSecondaryDisplay}`}
                  >
                    {siteConfig.phoneSecondaryDisplay}
                  </a>
                </span>
              </li>

              {/* WhatsApp */}
              <li className="bg-base">
                <a
                  href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  /* Ligne de liste : pas d'élévation (elle est encadrée), mais
                     le même état au focus clavier qu'au survol. */
                  className="group flex items-start gap-5 p-7 transition-colors hover:bg-elevated focus-visible:bg-elevated sm:p-8"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-card border border-gold/25 bg-gold/[0.06] text-gold transition-colors group-hover:border-gold/60 group-focus-visible:border-gold/60">
                    <MessageCircle
                      className="size-5"
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                  </span>
                  <span>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60">
                      WhatsApp
                    </span>
                    <span className="display mt-2 block text-xl text-white transition-colors group-hover:text-gold group-focus-visible:text-gold sm:text-2xl">
                      Contacter notre équipe
                    </span>
                  </span>
                </a>
              </li>

              {/* Adresse — information confirmée */}
              <li className="flex items-start gap-5 bg-base p-7 sm:p-8">
                <span
                  className={
                    addressKnown
                      ? "flex size-12 shrink-0 items-center justify-center border border-gold/25 bg-gold/[0.06] text-gold"
                      : "flex size-12 shrink-0 items-center justify-center rounded-card border border-white/12 text-white/55"
                  }
                >
                  <MapPin className="size-5" aria-hidden="true" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60">
                    Adresse
                  </span>
                  <span
                    className={
                      addressKnown
                        ? "display mt-2 block text-xl text-white sm:text-2xl"
                        : "display mt-2 block text-xl text-white/60 sm:text-2xl"
                    }
                  >
                    {addressKnown ? siteConfig.address : TODO_LABEL}
                  </span>
                </span>
              </li>

              {/* Horaires — non confirmés */}
              <li className="flex items-start gap-5 bg-base p-7 sm:p-8">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-card border border-white/12 text-white/55">
                  <Clock className="size-5" aria-hidden="true" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60">
                    Horaires
                  </span>
                  <span className="display mt-2 block text-xl text-white/60 sm:text-2xl">
                    {isTodo(siteConfig.openingHours)
                      ? TODO_LABEL
                      : siteConfig.openingHours}
                  </span>
                </span>
              </li>

              {/* E-mail — non confirmé */}
              <li className="flex items-start gap-5 bg-base p-7 sm:p-8">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-card border border-white/12 text-white/55">
                  <Mail className="size-5" aria-hidden="true" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60">
                    E-mail
                  </span>
                  <span className="display mt-2 block text-xl text-white/60 sm:text-2xl">
                    {isTodo(siteConfig.email) ? TODO_LABEL : siteConfig.email}
                  </span>
                </span>
              </li>
            </ul>

            <div className="mt-6">
              <DemoNotice>
                Horaires et e-mail restent volontairement vides : ces informations
                seront renseignées avec vous, aucune donnée n&apos;a été inventée.
              </DemoNotice>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex h-full flex-col gap-6">
              {/* Emplacement carte : activé dès que l'adresse est connue */}
              <div className="card relative min-h-[300px] flex-1 overflow-hidden bg-surface">
                {mapsQuery ? (
                  <iframe
                    title="Localisation de l'atelier"
                    src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 size-full grayscale-[0.85] contrast-125"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-4 p-10 text-center">
                    <MapPin className="size-9 text-white/35" aria-hidden="true" />
                    <p className="display text-xl text-white/60">
                      Carte à activer
                    </p>
                    <p className="max-w-xs text-xs leading-relaxed text-muted">
                      L&apos;emplacement Google Maps est déjà intégré : il s&apos;affichera
                      automatiquement dès que l&apos;adresse exacte sera renseignée dans
                      la configuration du site.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={APPOINTMENT_ANCHOR} size="lg" className="flex-1">
                  Prendre rendez-vous
                </ButtonLink>
                <ButtonLink
                  href={siteConfig.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  <Facebook className="size-4" aria-hidden="true" />
                  Facebook
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
