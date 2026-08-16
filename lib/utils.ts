/** Concatène des classes conditionnelles sans dépendance externe. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Formate un index en numéro de section : 1 → "01". */
export function pad2(index: number): string {
  return String(index).padStart(2, "0");
}
