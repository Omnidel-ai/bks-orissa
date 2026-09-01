import type { StateUnit } from "./types";

/** Scalable state registry — Odisha first; same pattern as BKS West Bengal. */
export const states: StateUnit[] = [
  {
    id: "odisha",
    slug: "odisha",
    officialName: "Odisha",
    name: {
      or: "ଓଡ଼ିଶା",
      en: "Odisha",
      hi: "ओडिशा",
    },
  },
];

export function getState(slug: string) {
  return states.find((s) => s.slug === slug);
}
