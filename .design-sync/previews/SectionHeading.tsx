import { SectionHeading } from "gloria-motors-demo";

/* En-têtes réels des sections Services, Réalisations et Contact du site. */

/* Design system sombre : la surface de la marque est posée explicitement. */
const frame: React.CSSProperties = {
  padding: "48px 24px",
  background: "var(--color-base)",
  color: "#fff",
};

export const Centered = () => (
  <div style={frame}>
    <SectionHeading
      eyebrow="Nos prestations"
      title="Ce que nous"
      titleAccent="réalisons"
      description="Une prise en charge complète de votre véhicule, de l'entretien courant à la personnalisation."
    />
  </div>
);

export const LeftAligned = () => (
  <div style={frame}>
    <SectionHeading
      align="left"
      eyebrow="Portfolio"
      title="Nos"
      titleAccent="réalisations"
      description="Découvrez quelques-unes de nos réalisations."
    />
  </div>
);

export const TitleOnly = () => (
  <div style={frame}>
    <SectionHeading eyebrow="Comparatif" title="Avant" titleAccent="Après" />
  </div>
);

export const SingleLineTitle = () => (
  <div style={frame}>
    <SectionHeading
      eyebrow="Contact"
      title="Nous contacter"
      description="Une question, un devis, un besoin précis ? Nous vous répondons directement."
    />
  </div>
);
