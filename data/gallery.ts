export const galleryCategories = [
  "Tous",
  "Véhicules",
  "Jantes",
  "Pneus",
  "Intérieur",
  "Réalisations",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];
export type GalleryItemCategory = Exclude<GalleryCategory, "Tous">;

export interface GalleryItem {
  id: string;
  image: string;
  category: GalleryItemCategory;
  alt: string;
}

/**
 * ⚠️ DEMO — visuels de démonstration issus d'une banque d'images libre.
 * Ils ne représentent pas le travail réel de l'entreprise.
 * → Déposer les photos réelles dans /public/images/gallery/ puis mettre à jour
 *   ce fichier (le filtre se construit automatiquement à partir de `category`).
 */
export const galleryIsDemoPlaceholders = true;

export const gallery: GalleryItem[] = [
  {
    id: "veh-01",
    image: "/images/gallery/vehicule-01.jpg",
    category: "Véhicules",
    alt: "Véhicule de sport vu de face — visuel de démonstration",
  },
  {
    id: "veh-02",
    image: "/images/gallery/vehicule-02.jpg",
    category: "Véhicules",
    alt: "Berline sportive au crépuscule — visuel de démonstration",
  },
  {
    id: "veh-03",
    image: "/images/gallery/vehicule-03.jpg",
    category: "Véhicules",
    alt: "Véhicule sur route boisée, feux allumés — visuel de démonstration",
  },
  {
    id: "jan-01",
    image: "/images/gallery/jante-01.jpg",
    category: "Jantes",
    alt: "Jante et flanc de véhicule en gros plan — visuel de démonstration",
  },
  {
    id: "jan-02",
    image: "/images/gallery/jante-02.jpg",
    category: "Jantes",
    alt: "Jantes de véhicule de sport — visuel de démonstration",
  },
  {
    id: "jan-03",
    image: "/images/gallery/jante-03.jpg",
    category: "Jantes",
    alt: "Coupé et ses jantes en vue trois-quarts — visuel de démonstration",
  },
  {
    id: "pne-01",
    image: "/images/gallery/pneu-01.jpg",
    category: "Pneus",
    alt: "Pneumatiques empilés en atelier — visuel de démonstration",
  },
  {
    id: "pne-02",
    image: "/images/gallery/pneu-02.jpg",
    category: "Pneus",
    alt: "Véhicule et ses pneumatiques sur terrain meuble — visuel de démonstration",
  },
  {
    id: "int-01",
    image: "/images/gallery/interieur-01.jpg",
    category: "Intérieur",
    alt: "Poste de conduite vu de l'intérieur — visuel de démonstration",
  },
  {
    id: "rea-01",
    image: "/images/gallery/atelier-01.jpg",
    category: "Réalisations",
    alt: "Intervention à la clé sur un moteur — visuel de démonstration",
  },
  {
    id: "rea-02",
    image: "/images/gallery/atelier-02.jpg",
    category: "Réalisations",
    alt: "Technicien intervenant sous le capot — visuel de démonstration",
  },
  {
    id: "rea-03",
    image: "/images/gallery/atelier-03.jpg",
    category: "Réalisations",
    alt: "Compartiment moteur en gros plan — visuel de démonstration",
  },
];
