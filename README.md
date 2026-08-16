# Veloria Motors By Moetez — Site vitrine (V1 de démonstration)

Démonstration commerciale destinée à être présentée au propriétaire de l'entreprise.
Landing page unique, sans base de données, entièrement statique.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## Stack

- **Next.js 15** (App Router) + **TypeScript strict**
- **Tailwind CSS v4** (tokens de design déclarés dans `app/globals.css`)
- **lucide-react** pour l'iconographie

Aucune bibliothèque d'animation n'est utilisée : les apparitions reposent sur
CSS + `IntersectionObserver`, ce qui garde le contenu lisible même si le
JavaScript est lent, bloqué ou désactivé (voir `components/ui/Reveal.tsx`).

## Structure

```
app/          layout (SEO, JSON-LD, fonts), page.tsx, robots.ts, sitemap.ts
components/   Header, Hero, Intro, Services, Highlights, Projects, BeforeAfter,
              Gallery, Lightbox, Appointment(+Form), Contact, Footer, WhatsAppButton
components/ui Button, SectionHeading, Reveal, DemoNotice
config/       site.ts   ← informations de l'entreprise (source unique)
data/         services.ts, projects.ts, gallery.ts, highlights.ts, navigation.ts
lib/          whatsapp.ts, utils.ts
public/images hero, intro, workshop, gallery/, projects/, services/
```

## ⚠️ Ce qui est réel et ce qui ne l'est pas

**Confirmé** (repris de la page Facebook) :

- le nom **Veloria Motors By Moetez** ;
- les numéros **+216 29 491 524** (principal, également utilisé pour WhatsApp)
  et **+216 28 041 157** ;
- l'adresse **117 N, Rue Mosquée Erraoudha, Soukra – Ariana, Tunisie** — la
  carte Google Maps est active ;
- les prestations : Hybride, Électrique, Thermique, Diagnostic avancé &
  expertise HV, Réparation & Entretien, Performance & Tuning (intitulés
  confirmés, descriptions provisoires) ;
- le logo officiel `public/images/logo.jpg`.

**Volontairement non renseigné** — rien n'a été inventé. Ces valeurs sont à
`TODO` dans `config/site.ts` et s'affichent « À compléter » sur le site :

| Donnée | Où la renseigner |
| --- | --- |
| Horaires | `siteConfig.openingHours` |
| E-mail | `siteConfig.email` |
| Instagram | `siteConfig.instagramUrl` — l'icône n'apparaît que si renseignée |
| URL Facebook exacte | `siteConfig.facebookUrl` |
| Domaine de production | `siteConfig.url` |

Ne figurent nulle part sur le site : avis clients, chiffres, certifications,
années d'expérience, nombre de clients, marques partenaires. Aucun de ces
éléments n'étant confirmé, ils ont été écartés plutôt qu'inventés.

**Logo** : fichier officiel `public/images/logo.jpg`, utilisé tel quel et sans
retouche. Le badge étant fourni sur fond blanc, `components/Logo.tsx` l'affiche
dans un masque circulaire (`rounded-full` + `overflow-hidden`) avec un léger
agrandissement pour évacuer le liseré blanc hors du masque. Le même fichier sert
de favicon via `metadata.icons` dans `app/layout.tsx`.

## ⚠️ Images

Toutes les photos sont des **visuels de démonstration** issus d'une banque
d'images libre de droits (Unsplash). Elles illustrent la mise en page et **ne
représentent pas le travail réel de l'entreprise** — c'est indiqué
explicitement sur le site (composant `DemoNotice`) dans les sections Services,
Réalisations, Avant/Après et Galerie.

Pour les remplacer :

1. déposer les photos réelles dans `public/images/gallery/` et
   `public/images/projects/` ;
2. mettre à jour `data/gallery.ts` et `data/projects.ts` (chemin + `alt`) ;
3. retirer les `<DemoNotice>` correspondantes et passer
   `galleryIsDemoPlaceholders` / `projectsAreDemoPlaceholders` à `false`.

Le comparatif Avant/Après utilise une même image, dont la version « avant » a
été volontairement dégradée. À remplacer par un vrai couple de photos
(`data/projects.ts` → `beforeAfter`).

La catégorie « Intérieur » de la galerie ne contient qu'un seul visuel : c'est
le créneau le plus évident à alimenter avec des photos réelles.

## Parcours de conversion

Facebook → site → Services / Réalisations → Rendez-vous → WhatsApp.

Le CTA « Prendre rendez-vous » est présent dans le header, le hero, la section
Rendez-vous, la section Contact et le pied de page. WhatsApp est accessible en
permanence (bouton flottant, header mobile, cartes de service, contact, footer).

Le formulaire de rendez-vous n'écrit dans aucune base : il valide les champs,
compose un message et ouvre WhatsApp pré-rempli (`lib/whatsapp.ts`).

## Évolutions prévues (non développées)

L'architecture est prête pour : pages dédiées `/services`, `/realisations`,
`/galerie`, `/rendez-vous`, `/contact` (il suffit de changer les `href` dans
`data/navigation.ts`), déclinaisons SEO « [Service] à [Ville] », puis
back-office (Supabase/PostgreSQL, authentification, gestion des services, de la
galerie et des rendez-vous, calendrier, notifications, CRM, statistiques).
