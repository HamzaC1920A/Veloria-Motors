import { Button } from "gloria-motors-demo";

/* Libellés repris tels quels du site : formulaire de rendez-vous et CTA. */

/*
 * Ce design system est sombre par conception : les variantes `outline` et
 * `ghost` ont un texte blanc et disparaîtraient sur un fond clair. Chaque
 * preview pose donc explicitement la surface de la marque.
 */
const row: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "12px",
  padding: "24px",
  background: "var(--color-base)",
  color: "#fff",
};

export const Variants = () => (
  <div style={row}>
    <Button variant="gold">Prendre rendez-vous</Button>
    <Button variant="outline">Découvrir nos services</Button>
    <Button variant="whatsapp">Écrire sur WhatsApp</Button>
    <Button variant="ghost">Tout voir</Button>
  </div>
);

export const Sizes = () => (
  <div style={row}>
    <Button size="sm">Petit</Button>
    <Button size="md">Moyen</Button>
    <Button size="lg">Grand</Button>
  </div>
);

export const FullWidthSubmit = () => (
  <div style={{ ...row, display: "block", maxWidth: "420px" }}>
    <Button type="submit" size="lg" className="w-full">
      Envoyer ma demande
    </Button>
  </div>
);

export const Disabled = () => (
  <div style={row}>
    <Button disabled>Indisponible</Button>
    <Button variant="outline" disabled>
      Indisponible
    </Button>
  </div>
);
