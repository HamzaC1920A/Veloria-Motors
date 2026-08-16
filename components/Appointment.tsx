import { Phone, MessageCircle, Clock } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { ButtonLink } from "./ui/Button";
import { AppointmentForm } from "./AppointmentForm";
import { siteConfig, links, isTodo } from "@/config/site";
import { whatsappUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";

export function Appointment() {
  return (
    <section
      id="rendez-vous"
      className="relative overflow-hidden border-t border-white/[0.06] bg-elevated py-24 sm:py-32 lg:py-40"
    >
      <div
        className="glow-gold pointer-events-none absolute inset-x-0 top-0 h-96"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Rendez-vous"
          title="Prenez"
          titleAccent="rendez-vous"
          description="Renseignez votre demande en quelques secondes : elle nous parvient directement sur WhatsApp."
        />

        <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
          {/* Raccourcis de contact direct */}
          <Reveal>
            <div className="flex h-full flex-col gap-8 border border-white/[0.08] bg-surface p-8 sm:p-10">
              <div>
                <h3 className="display text-2xl text-white sm:text-3xl">
                  Vous préférez
                  <br />
                  <span className="text-gold-gradient">nous parler ?</span>
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-muted">
                  Appelez-nous ou écrivez-nous sur WhatsApp : nous répondons
                  directement, sans intermédiaire.
                </p>
              </div>

              <div className="space-y-3">
                <ButtonLink href={links.tel} size="lg" className="w-full">
                  <Phone className="size-4" aria-hidden="true" />
                  {siteConfig.phoneDisplay}
                </ButtonLink>
                <ButtonLink
                  href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  size="lg"
                  className="w-full"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Écrire sur WhatsApp
                </ButtonLink>
              </div>

              <div className="mt-auto flex items-start gap-3 border-t border-white/[0.08] pt-6">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <div className="text-sm">
                  <p className="font-medium text-white/85">Horaires</p>
                  <p className="mt-1 text-muted">
                    {isTodo(siteConfig.openingHours)
                      ? "À compléter"
                      : siteConfig.openingHours}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="border border-white/[0.08] bg-surface p-6 sm:p-10">
              <AppointmentForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
