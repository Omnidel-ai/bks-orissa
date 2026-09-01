import type { District } from "./types";

/**
 * Empty until verified Odisha district names are supplied.
 * Do not invent representatives or district status.
 */
export const districts: District[] = [];

export function getDistrict(slug: string) {
  return districts.find((d) => d.slug === slug);
}
