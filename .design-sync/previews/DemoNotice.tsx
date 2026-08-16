import { DemoNotice } from "gloria-motors-demo";

/*
 * Mentions réellement affichées sur le site, sous les sections dont le
 * contenu n'est pas encore confirmé par le client.
 */

/* Design system sombre : la surface de la marque est posée explicitement. */
const frame: React.CSSProperties = {
  padding: "32px 24px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "12px",
  background: "var(--color-base)",
  color: "#fff",
};

export const Default = () => (
  <div style={frame}>
    <DemoNotice>
      Intitulés repris de votre page Facebook. Les descriptions sont provisoires
      et restent à valider avec vous.
    </DemoNotice>
  </div>
);

export const LongerText = () => (
  <div style={{ ...frame, maxWidth: "560px" }}>
    <DemoNotice>
      Emplacements prévus pour vos photos. Les visuels affichés sont des images
      de démonstration et ne représentent pas votre travail réel.
    </DemoNotice>
  </div>
);

export const Stacked = () => (
  <div style={frame}>
    <DemoNotice>
      Horaires et e-mail restent volontairement vides : ces informations seront
      renseignées avec vous.
    </DemoNotice>
    <DemoNotice>Aucune donnée n&apos;a été inventée.</DemoNotice>
  </div>
);
