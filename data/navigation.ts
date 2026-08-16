export interface NavItem {
  label: string;
  href: string;
}

/**
 * V1 : landing page unique, navigation par ancres.
 * Pour passer à des pages dédiées (/services, /realisations…), il suffit
 * de remplacer les `href` ici — aucun composant à modifier.
 */
export const navigation: NavItem[] = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Galerie", href: "#galerie" },
  { label: "À propos", href: "#a-propos" },
  { label: "Contact", href: "#contact" },
];

export const APPOINTMENT_ANCHOR = "#rendez-vous";
