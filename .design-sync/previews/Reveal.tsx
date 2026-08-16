import { Reveal } from "gloria-motors-demo";

/*
 * Reveal est un conteneur : il n'a pas d'apparence propre, on l'observe donc
 * à travers ce qu'il enveloppe. Les compositions ci-dessous reprennent la
 * cascade utilisée par la grille de services et par la liste des atouts.
 */

/* Design system sombre : la surface de la marque est posée explicitement. */
const frame: React.CSSProperties = {
  padding: "32px 24px",
  background: "var(--color-base)",
  color: "#fff",
};

const card: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.08)",
  background: "var(--color-elevated)",
  padding: "24px",
};

export const Basic = () => (
  <div style={frame}>
    <Reveal>
      <div style={card}>
        <p className="eyebrow">Nos prestations</p>
        <h3 className="display" style={{ fontSize: "24px", marginTop: "10px" }}>
          Diagnostic avancé
        </h3>
        <p style={{ color: "var(--color-muted)", fontSize: "14px", marginTop: "12px" }}>
          Diagnostic complet et expertise haute tension pour identifier
          précisément l&apos;origine d&apos;une panne.
        </p>
      </div>
    </Reveal>
  </div>
);

export const StaggeredGrid = () => (
  <div style={frame}>
    <ul
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "12px",
        listStyle: "none",
        margin: 0,
        padding: 0,
      }}
    >
      {["Hybride", "Électrique", "Thermique"].map((title, i) => (
        <Reveal as="li" key={title} delay={i * 0.07}>
          <div style={card}>
            <span className="display" style={{ fontSize: "20px" }}>
              {title}
            </span>
          </div>
        </Reveal>
      ))}
    </ul>
  </div>
);

export const CustomOffset = () => (
  <div style={frame}>
    <Reveal y={48} delay={0.2}>
      <div style={{ ...card, borderColor: "rgba(201,162,39,0.4)" }}>
        <span className="display" style={{ fontSize: "20px" }}>
          Translation de 48px, décalée de 0,2 s
        </span>
      </div>
    </Reveal>
  </div>
);
