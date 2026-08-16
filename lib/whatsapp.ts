import { siteConfig } from "@/config/site";

const WA_BASE = "https://wa.me";

/** Construit une URL WhatsApp avec un message correctement encodé. */
export function whatsappUrl(message?: string): string {
  const base = `${WA_BASE}/${siteConfig.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Message par défaut du bouton flottant et des CTA génériques. */
export const DEFAULT_WHATSAPP_MESSAGE = `Bonjour ${siteConfig.siteName}, je vous contacte depuis votre site web.`;

/** Message utilisé quand le visiteur clique sur un service précis. */
export function serviceWhatsappMessage(service: string): string {
  return `Bonjour ${siteConfig.siteName}, je souhaite des informations concernant : ${service}.`;
}

export interface AppointmentPayload {
  name: string;
  phone: string;
  brand: string;
  model: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

/**
 * Compose la demande de rendez-vous envoyée sur WhatsApp.
 * Les champs facultatifs vides sont remplacés par un tiret pour garder
 * un message lisible côté atelier.
 */
export function appointmentMessage(data: AppointmentPayload): string {
  const fallback = (value: string) => (value.trim() === "" ? "—" : value.trim());
  const vehicle = [data.brand, data.model]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ");

  return [
    "Bonjour, je souhaite prendre rendez-vous.",
    "",
    `Nom : ${fallback(data.name)}`,
    `Téléphone : ${fallback(data.phone)}`,
    `Véhicule : ${vehicle === "" ? "—" : vehicle}`,
    `Service : ${fallback(data.service)}`,
    `Date souhaitée : ${fallback(data.date)}`,
    `Heure souhaitée : ${fallback(data.time)}`,
    "",
    "Message :",
    fallback(data.message),
  ].join("\n");
}
