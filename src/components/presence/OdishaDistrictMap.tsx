"use client";

import type { District, PresenceStatus } from "@/content/presence";
import {
  ODISHA_DISTRICT_PATHS,
  ODISHA_MAP_VIEWBOX,
} from "@/content/presence/odisha-map-paths";
import type { Locale } from "@/lib/i18n";

type Props = {
  districts: District[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
  locale: Locale;
  statusLabels: { active: string; indicated: string; upcoming: string };
};

function statusLabelFor(
  status: PresenceStatus,
  labels: Props["statusLabels"],
) {
  if (status === "active") return labels.active;
  if (status === "indicated") return labels.indicated;
  return labels.upcoming;
}

/**
 * Interactive Odisha district SVG — paths adapted from svgmap-odisha (ISC).
 * Status colours follow existing Presence `.wb-map` tokens.
 */
export default function OdishaDistrictMap({
  districts,
  selectedSlug,
  onSelect,
  locale,
  statusLabels,
}: Props) {
  const byId = new Map(districts.map((d) => [d.id, d]));

  return (
    <div className="odisha-map-wrap">
      <svg
        className="wb-map odisha-map"
        viewBox={ODISHA_MAP_VIEWBOX}
        role="img"
        aria-label="Odisha districts"
      >
        {Object.entries(ODISHA_DISTRICT_PATHS).map(([id, dPath]) => {
          const district = byId.get(id);
          if (!district) return null;
          const selected = district.slug === selectedSlug;
          const label = statusLabelFor(district.status, statusLabels);
          return (
            <path
              key={id}
              id={`odisha-district-${id}`}
              className={`district ${district.status}`}
              d={dPath}
              tabIndex={0}
              role="button"
              aria-label={`${district.name[locale]} — ${label}`}
              aria-selected={selected}
              onClick={() => onSelect(district.slug)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(district.slug);
                }
              }}
            >
              <title>{`${district.name[locale]} — ${label}`}</title>
            </path>
          );
        })}
      </svg>
    </div>
  );
}
