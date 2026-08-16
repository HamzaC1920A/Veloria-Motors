# Notes de synchronisation — Veloria Motors

## Nature du dépôt

- Ce dépôt est **un site Next.js, pas un design system**. Ce qui est synchronisé
  est un noyau extrait à la main : les 5 primitives de `components/ui/` + les
  tokens de `app/globals.css`.
- Les sections de page (`Hero`, `Services`, `Contact`, `Footer`…) sont exclues
  via `componentSrcMap: null` — elles sont couplées à `config/site.ts` et
  `data/*.ts` et n'ont pas d'API réutilisable.
- `Logo` est exclu : il importe `next/image`, qui ne fonctionne pas hors du
  runtime Next. Si un jour il doit être synchronisé, il faudra le découpler de
  `next/image` (balise `<img>`).

## Chaîne de build (aucune dépendance ajoutée au projet)

- Il n'y a **pas de build de librairie**. `package.json` est `private`, sans
  `main`/`exports`. Le convertisseur est ancré par `--entry ./.design-sync/entry.ts`,
  un barrel écrit à la main qui réexporte les 5 primitives.
  Sans `--entry`, le build meurt sur `node_modules/gloria-motors-demo/package.json`.
- `srcDir: "components"` est **obligatoire** : sans lui, l'heuristique choisit
  `lib/` (qui existe et ne contient que du `.ts`), et la découverte rend 0 fichier.
- Le CSS est compilé par le CLI Tailwind installé dans `.ds-sync/` (voir
  `cfg.buildCmd`). Rien n'est ajouté au `package.json` du site.
  **À relancer avant chaque re-sync** — la sortie est dans `.cache/` (gitignoré).

## Commande complète

```sh
node .ds-sync/node_modules/@tailwindcss/cli/dist/index.mjs \
  -i .design-sync/ds-input.css -o .design-sync/.cache/ds.css --minify
node .ds-sync/resync.mjs --config .design-sync/config.json \
  --node-modules ./node_modules --entry ./.design-sync/entry.ts \
  --out ./ds-bundle --remote .design-sync/.cache/remote-sync.json
```

## Décisions à connaître

- **Props écrites à la main.** Sans arbre `.d.ts`, l'extraction rend
  `[key: string]: unknown` pour tout. `cfg.dtsPropsFor` porte les vraies
  signatures, recopiées des sources. **À mettre à jour si l'API d'un composant
  change** — rien ne le détectera automatiquement.
- **Fond sombre dans les previews.** Les cartes rendent sur fond blanc ; les
  variantes `outline`/`ghost` (texte blanc) y étaient invisibles. Chaque preview
  pose donc `background: var(--color-base)`. Ne pas retirer.
- **Polices en distant.** `next/font/google` définit `--font-inter`/`--font-oswald`
  à l'exécution ; hors Next elles n'existent pas. `ds-input.css` les redéfinit via
  un `@import` Google Fonts → `[FONT_REMOTE]`, informatif, aucune action.
- **Playwright 1.59.0** correspond au Chromium déjà en cache (build 1217).
  Une autre version tenterait un téléchargement de ~200 Mo.
- `cfg.overrides.SectionHeading.cardMode = "column"` corrige un `[GRID_OVERFLOW]`
  sur la story `LeftAligned`.

## Known render warns

- `[FONT_REMOTE] "Inter", "Oswald", "Arial Narrow"` — attendu, voir ci-dessus.

## Risques de re-sync

- **`cfg.dtsPropsFor` peut se périmer en silence.** C'est une copie manuelle des
  interfaces de `components/ui/*.tsx`. Diffez-les avant de conclure que le
  contrat est bon.
- **Le CSS livré est une compilation Tailwind restreinte**, limitée aux classes
  employées par `components/ui`, `lib` et `.design-sync/previews`. Ajouter une
  classe utilitaire dans une preview sans relancer le CLI Tailwind produit une
  carte non stylée. C'est aussi pourquoi `conventions.md` dit à l'agent de
  design d'utiliser les variables CSS plutôt que des utilitaires arbitraires.
- **`.design-sync/entry.ts` doit suivre `components/ui/`** : un composant ajouté
  là n'apparaîtra pas tant qu'il n'est pas réexporté ici ET ajouté à
  `componentSrcMap`.
- Le site lui-même n'avait **pas** été modifié par la synchronisation initiale.
  Cette contrainte ne vaut plus : une passe UI/UX ultérieure a modifié le site
  **et** le noyau synchronisé. Ce qui a changé côté contrat :
  - `SectionHeading` gagne `size?: "md" | "lg"` (défaut `lg`) et
    `accent?: "gold" | "plain"` (défaut `gold`) ;
  - `DemoNotice` gagne `tone?: "gold" | "subtle"` (défaut `gold`) ;
  - `Button`/`ButtonLink` : aucune variante ni taille retirée, seulement le
    rayon `--radius-card`.
  `cfg.dtsPropsFor` a été mis à jour en conséquence. Les défauts sont
  rétrocompatibles : un consommateur existant n'a rien à changer.
- `app/globals.css` expose désormais des tokens supplémentaires — échelle
  typographique fluide (`--text-step-1..5`), rythme vertical
  (`--space-section-sm/md/lg`), rayon (`--radius-card`) — et les classes
  système `.container-page`, `.section`, `.card`, `.card-interactive`.
  Elles sont dans la feuille livrée : relancer `cfg.buildCmd` reste obligatoire.

## Piège connu : `--color-base` vs `text-base`

`--color-base` rend l'utilitaire Tailwind `text-base` **ambigu** : Tailwind le
résout en couleur (`#080808`) et non en taille de police. Un `sm:text-base`
produisait du texte noir sur fond noir dans le pied de page. Ne jamais écrire
`text-base` ni `sm:text-base` — utiliser `text-[1rem]`. Le nom du token fait
partie du contrat public (`conventions.md`) et n'est donc pas renommé.
