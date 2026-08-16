# Veloria Motors — conventions

Design system **sombre uniquement**, d'un atelier automobile premium. Noir profond,
or par petites touches, typographie condensée en majuscules. Il n'existe pas de
thème clair : ne pas en inventer un.

## Aucun provider requis

Les composants se montent directement — pas de `ThemeProvider`, pas de contexte.
La seule condition est que `styles.css` soit chargé : il apporte les tokens, les
polices (Inter + Oswald, servies par Google Fonts) et les classes du système.

## Poser la surface sombre — obligatoire

`styles.css` met `background-color: var(--color-base)` sur `body`. Si votre écran
rend dans un conteneur qui impose son propre fond (carte, iframe, aperçu),
**posez la surface explicitement**, sinon les variantes `outline` et `ghost` — dont
le texte est blanc — deviennent invisibles :

```jsx
<div style={{ background: "var(--color-base)", color: "#fff", padding: 24 }}>
  <ButtonLink href="#rendez-vous" size="lg">Prendre rendez-vous</ButtonLink>
  <ButtonLink href="#services" variant="outline" size="lg">Découvrir nos services</ButtonLink>
</div>
```

## Styliser : tokens CSS, pas utilitaires Tailwind

⚠️ Le point le plus important. La feuille livrée est une compilation Tailwind
restreinte : elle ne contient **que** les utilitaires que les composants du DS
utilisent déjà. `grid-cols-3`, `flex-col`, la plupart des échelles d'espacement…
**ne s'y trouvent pas** et ne produiront rien.

Pour votre propre mise en page, utilisez des styles CSS classiques adossés aux
variables du système :

| Token | Usage |
|---|---|
| `--color-base` `#080808` | fond de page |
| `--color-elevated` `#111111` | bandes de section alternées |
| `--color-surface` `#171717` | cartes, panneaux, champs |
| `--color-line` `#242424` | bordures ; sinon `rgba(255,255,255,0.08)` |
| `--color-gold` `#C9A227` | accent principal, filets, icônes |
| `--color-gold-light` `#E2C45A` | survol de l'accent |
| `--color-muted` `#A3A3A3` | texte secondaire |
| `--font-display` (Oswald) | titres |
| `--font-sans` (Inter) | texte courant |

L'or s'emploie **avec parcimonie** : un accent, un filet, une icône. Jamais de
grands aplats dorés, jamais de dégradés multicolores.

## Classes du système

Utilisables telles quelles, elles sont dans la feuille livrée :

- `.display` — titre : Oswald, majuscules, `line-height: 0.95`
- `.eyebrow` — sur-titre doré, 11px, très interlettré
- `.text-gold-gradient` — dégradé doré sur du texte
- `.hairline` — filet doré dégradé de 1px (séparateur)
- `.glow-gold` — halo radial discret derrière une section
- `.grain` — grain léger via `::after` (le parent doit être `position: relative`)
- `.reveal` / `.rise` — apparitions ; `.reveal` ne masque que si `<html>` porte
  la classe `js`, et `prefers-reduced-motion` force l'état final.

## Où lire la vérité

`_ds/<dossier>/styles.css` et ses `@import` (dont `_ds_bundle.css`) contiennent
les tokens et toutes les classes réellement disponibles. Chaque composant a son
`components/general/<Nom>/<Nom>.prompt.md` et son `<Nom>.d.ts`.

## Exemple idiomatique

```jsx
<section style={{ background: "var(--color-elevated)", padding: "96px 20px" }}>
  <SectionHeading
    eyebrow="Nos prestations"
    title="Ce que nous"
    titleAccent="réalisons"
    description="Une prise en charge complète de votre véhicule."
  />
  <ul style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))",
               gap: 1, listStyle: "none", padding: 0, marginTop: 64 }}>
    {services.map((s, i) => (
      <Reveal as="li" key={s.id} delay={i * 0.07}>
        <article style={{ background: "var(--color-elevated)",
                          border: "1px solid rgba(255,255,255,0.08)", padding: 32 }}>
          <h3 className="display" style={{ fontSize: 24 }}>{s.title}</h3>
          <p style={{ color: "var(--color-muted)", fontSize: 14, marginTop: 16 }}>
            {s.description}
          </p>
        </article>
      </Reveal>
    ))}
  </ul>
</section>
```

Microcopie en **français**, professionnelle et sobre. Boutons à l'infinitif
(« Prendre rendez-vous », « Écrire sur WhatsApp »). Pas d'emoji dans l'interface.
