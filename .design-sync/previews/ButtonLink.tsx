import { ButtonLink } from "gloria-motors-demo";

/* Compositions reprises du hero, du header et de la section Contact. */

/* Design system sombre : la surface de la marque est posée explicitement. */
const row: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "12px",
  padding: "24px",
  background: "var(--color-base)",
  color: "#fff",
};

export const HeroCallToAction = () => (
  <div style={row}>
    <ButtonLink href="#rendez-vous" size="lg">
      Prendre rendez-vous
    </ButtonLink>
    <ButtonLink href="#services" variant="outline" size="lg">
      Découvrir nos services
    </ButtonLink>
  </div>
);

export const WhatsApp = () => (
  <div style={row}>
    <ButtonLink
      href="https://wa.me/21629491524"
      target="_blank"
      rel="noopener noreferrer"
      variant="whatsapp"
      size="lg"
    >
      Écrire sur WhatsApp
    </ButtonLink>
  </div>
);

export const PhoneAndSocial = () => (
  <div style={row}>
    <ButtonLink href="tel:+21629491524" variant="outline">
      +216 29 491 524
    </ButtonLink>
    <ButtonLink href="https://www.facebook.com/" variant="ghost">
      Facebook
    </ButtonLink>
  </div>
);

export const HeaderCompact = () => (
  <div style={row}>
    <ButtonLink href="#rendez-vous" size="sm">
      Prendre rendez-vous
    </ButtonLink>
  </div>
);
