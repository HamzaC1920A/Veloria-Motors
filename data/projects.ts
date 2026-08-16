export type ProjectCategory =
  | "Véhicules"
  | "Jantes"
  | "Pneus"
  | "Intérieur"
  | "Réalisations";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
}

/**
 * ⚠️ DEMO — IMPORTANT
 * Les visuels ci-dessous sont des IMAGES DE DÉMONSTRATION (banque d'images libre).
 * Ils illustrent uniquement la mise en page et NE représentent PAS
 * des réalisations réelles de l'entreprise.
 * → Remplacer chaque `image` par une photo réelle de l'atelier avant publication.
 */
export const projectsAreDemoPlaceholders = true;

export const projects: Project[] = [
  {
    id: "preparation-esthetique",
    title: "Préparation esthétique",
    category: "Réalisations",
    description: "Exemple de mise en page — visuel de démonstration.",
    image: "/images/projects/project-1.jpg",
  },
  {
    id: "finitions-exterieures",
    title: "Finitions extérieures",
    category: "Véhicules",
    description: "Exemple de mise en page — visuel de démonstration.",
    image: "/images/projects/project-2.jpg",
  },
  {
    id: "montage-jantes",
    title: "Montage de jantes",
    category: "Jantes",
    description: "Exemple de mise en page — visuel de démonstration.",
    image: "/images/projects/project-3.jpg",
  },
  {
    id: "nettoyage-complet",
    title: "Nettoyage complet",
    category: "Réalisations",
    description: "Exemple de mise en page — visuel de démonstration.",
    image: "/images/projects/project-4.jpg",
  },
  {
    id: "remise-en-etat",
    title: "Remise en état",
    category: "Réalisations",
    description: "Exemple de mise en page — visuel de démonstration.",
    image: "/images/projects/project-5.jpg",
  },
  {
    id: "controle-mise-au-point",
    title: "Contrôle & mise au point",
    category: "Véhicules",
    description: "Exemple de mise en page — visuel de démonstration.",
    image: "/images/projects/project-6.jpg",
  },
];

/**
 * Comparatif avant / après.
 * ⚠️ DEMO : les deux visuels proviennent d'une même image de banque d'images,
 * l'une ayant été volontairement altérée. Remplacer par un vrai couple de photos.
 */
export const beforeAfter = {
  title: "Rénovation esthétique",
  beforeImage: "/images/projects/before-after-before.jpg",
  afterImage: "/images/projects/before-after-after.jpg",
  beforeLabel: "Avant",
  afterLabel: "Après",
  beforeAlt: "Véhicule avant intervention — visuel de démonstration",
  afterAlt: "Véhicule après intervention — visuel de démonstration",
} as const;
