/**
 * Source unique de vérité pour toutes les informations de l'entreprise.
 *
 * ⚠️ DEMO : les valeurs marquées `TODO_*` ne sont PAS confirmées par le client.
 * Elles sont volontairement laissées vides / explicites afin de ne rien inventer.
 * Il suffit de les remplacer ici pour mettre à jour l'ensemble du site.
 */

/** Marqueur des informations non confirmées par le client. */
export const TODO = "TODO" as const;

/** Numéros de téléphone confirmés (visibles sur la page Facebook). */
const PHONE_E164 = "+21629491524";
const PHONE_SECONDARY_E164 = "+21628041157";
/** Numéro WhatsApp, format international sans "+" — requis par l'API wa.me. */
const WHATSAPP_NUMBER = "21629491524";

export interface SiteConfig {
  siteName: string;
  /** Nom provisoire : à confirmer avec le propriétaire. */
  siteNameIsProvisional: boolean;
  tagline: string;
  description: string;
  /** Numéro principal affiché à l'écran. */
  phoneDisplay: string;
  /** Numéro principal pour les liens `tel:`. */
  phone: string;
  /** Second numéro affiché à l'écran. */
  phoneSecondaryDisplay: string;
  /** Second numéro pour les liens `tel:`. */
  phoneSecondary: string;
  /** Numéro pour les liens `wa.me` (sans "+"). */
  whatsapp: string;
  email: string | typeof TODO;
  address: string | typeof TODO;
  city: string | typeof TODO;
  /** Requête Google Maps, dérivée de l'adresse une fois celle-ci confirmée. */
  mapsQuery: string | typeof TODO;
  openingHours: string | typeof TODO;
  facebookUrl: string;
  instagramUrl: string | typeof TODO;
  /** URL canonique de production — à mettre à jour avant mise en ligne. */
  url: string;
}

export const siteConfig: SiteConfig = {
  siteName: "Veloria Motors By Moetez",
  siteNameIsProvisional: false,
  tagline: "Expertise automobile",
  description:
    "Découvrez nos services automobiles, nos réalisations et prenez rendez-vous facilement.",

  phoneDisplay: "+216 29 491 524",
  phone: PHONE_E164,
  phoneSecondaryDisplay: "+216 28 041 157",
  phoneSecondary: PHONE_SECONDARY_E164,
  whatsapp: WHATSAPP_NUMBER,

  address: "117 N, Rue Mosquée Erraoudha, Soukra – Ariana, Tunisie",
  city: "La Soukra",
  mapsQuery: "117 N, Rue Mosquée Erraoudha, La Soukra, Ariana, Tunisie",

  // --- Informations non confirmées ---------------------------------------
  email: TODO,
  openingHours: TODO,
  instagramUrl: TODO,
  // -----------------------------------------------------------------------

  facebookUrl: "https://www.facebook.com/",
  url: "https://veloria-motors.tn",
};

/** `true` si la valeur est un placeholder non confirmé. */
export const isTodo = (value: string): boolean => value === TODO;

export const links = {
  tel: `tel:${siteConfig.phone}`,
  telSecondary: `tel:${siteConfig.phoneSecondary}`,
  facebook: siteConfig.facebookUrl,
} as const;
