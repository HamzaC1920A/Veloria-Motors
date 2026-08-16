import type { LucideIcon } from "lucide-react";
import { ShieldCheck, Layers, CalendarCheck, MessageCircle } from "lucide-react";

export interface Highlight {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

/**
 * Aucun chiffre, aucune certification, aucune ancienneté :
 * uniquement des engagements de service, vérifiables et non inventés.
 */
export const highlights: Highlight[] = [
  {
    id: "service",
    title: "Service professionnel",
    description:
      "Chaque véhicule est pris en charge avec méthode et rigueur, quel que soit le type d'intervention.",
    icon: ShieldCheck,
  },
  {
    id: "solutions",
    title: "Solutions adaptées",
    description:
      "Nous étudions votre besoin et vous proposons une réponse cohérente avec votre véhicule et votre usage.",
    icon: Layers,
  },
  {
    id: "rendez-vous",
    title: "Prise de rendez-vous",
    description:
      "Un formulaire simple pour décrire votre demande et convenir d'un créneau sans échange inutile.",
    icon: CalendarCheck,
  },
  {
    id: "contact",
    title: "Contact direct",
    description:
      "Téléphone ou WhatsApp : vous joignez directement l'équipe, sans intermédiaire.",
    icon: MessageCircle,
  },
];
