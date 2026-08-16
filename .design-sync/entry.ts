/**
 * Point d'entrée du design system synchronisé vers claude.ai/design.
 *
 * Il n'expose que les primitives réutilisables. Les sections de page
 * (Hero, Services, Contact…) sont volontairement absentes : elles sont
 * couplées à config/site.ts et data/*.ts et n'ont pas d'API réutilisable.
 * `Logo` est exclu car il dépend de `next/image`, qui ne fonctionne pas
 * hors du runtime Next.
 *
 * Ce fichier ne modifie pas le site : il se contente de réexporter.
 */
export { Button, ButtonLink } from "@/components/ui/Button";
export { SectionHeading } from "@/components/ui/SectionHeading";
export { Reveal } from "@/components/ui/Reveal";
export { DemoNotice } from "@/components/ui/DemoNotice";
