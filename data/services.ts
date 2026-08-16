import type { LucideIcon } from "lucide-react";
import {
  Leaf,
  Zap,
  Fuel,
  ScanLine,
  Wrench,
  Gauge,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

/**
 * Prestations reprises de la communication Facebook de l'atelier.
 * Les intitulés sont confirmés ; les descriptions restent à valider.
 */
export const services: Service[] = [
  {
    id: "hybride",
    title: "Hybride",
    description:
      "Prise en charge des véhicules hybrides, de la batterie aux organes de traction, avec l'outillage adapté.",
    icon: Leaf,
  },
  {
    id: "electrique",
    title: "Électrique",
    description:
      "Interventions sur véhicules électriques, dans le respect des procédures propres aux systèmes haute tension.",
    icon: Zap,
  },
  {
    id: "thermique",
    title: "Thermique",
    description:
      "Motorisations essence et diesel : entretien courant, recherche de panne et remise en état.",
    icon: Fuel,
  },
  {
    id: "diagnostic-hv",
    title: "Diagnostic avancé & expertise HV",
    description:
      "Diagnostic complet et expertise haute tension pour identifier précisément l'origine d'une panne.",
    icon: ScanLine,
  },
  {
    id: "reparation-entretien",
    title: "Réparation & Entretien",
    description:
      "Réparation et entretien de votre véhicule, préparés et expliqués avant chaque intervention.",
    icon: Wrench,
  },
  {
    id: "performance-tuning",
    title: "Performance & Tuning",
    description:
      "Optimisation des performances et personnalisation, adaptées aux caractéristiques de votre véhicule.",
    icon: Gauge,
  },
];
