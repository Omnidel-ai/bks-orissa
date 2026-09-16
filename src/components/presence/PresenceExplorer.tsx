"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { District, PresenceStatus } from "@/content/presence";
import OdishaDistrictMap from "@/components/presence/OdishaDistrictMap";
import type { PublicMemberView } from "@/lib/district-members/types";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/useLocale";

function StatusBadge({ status, label }: { status: PresenceStatus; label: string }) {
  return <span className={`badge ${status}`}>{label}</span>;
}

function statusLabelFor(
  status: PresenceStatus,
  labels: { active: string; indicated: string; upcoming: string },
) {
  if (status === "active") return labels.active;
  if (status === "indicated") return labels.indicated;
  return labels.upcoming;
}

export default function PresenceExplorer({
  initialSlug,
  members: initialMembers,
  districts,
}: {
  initialSlug?: string;
  members?: PublicMemberView[];
  districts: District[];
}) {
  const [locale] = useLocale();
  const d = t(locale);
  const router = useRouter();
  const defaultSlug =
    initialSlug ||
    districts.find((x) => x.status === "active")?.slug ||
    districts[0]?.slug ||
    "khordha";
  const [selectedSlug, setSelectedSlug] = useState(defaultSlug);
  const [liveMembers, setLiveMembers] = useState<PublicMemberView[] | null>(
    initialMembers ?? null,
  );
  const [liveDistrictId, setLiveDistrictId] = useState<string | null>(
    initialSlug
      ? districts.find((x) => x.slug === initialSlug)?.id ?? null
      : null,
  );
  const [membersLoading, setMembersLoading] = useState(false);

  useEffect(() => {
    if (initialSlug) setSelectedSlug(initialSlug);
  }, [initialSlug]);

  useEffect(() => {
    if (initialMembers !== undefined && initialSlug) {
      setLiveMembers(initialMembers);
      setLiveDistrictId(
        districts.find((x) => x.slug === initialSlug)?.id ?? null,
      );
    }
  }, [initialMembers, initialSlug, districts]);

  const selectDistrict = (slug: string) => {
    setSelectedSlug(slug);
    router.replace(`/presence/odisha/${slug}`, { scroll: false });
  };

  const selected = useMemo(
    () =>
      districts.find((x) => x.slug === selectedSlug) ||
      districts.find((x) => x.status === "active") ||
      districts[0],
    [selectedSlug, districts],
  );

  useEffect(() => {
    if (!selected) return;
    if (initialSlug && selected.slug === initialSlug) {
      return;
    }

    let cancelled = false;
    setMembersLoading(true);
    (async () => {
      try {
        const res = await fetch(
          `/api/presence/district-members?district_id=${encodeURIComponent(selected.id)}`,
          { cache: "no-store" },
        );
        if (!res.ok) throw new Error("load failed");
        const body = (await res.json()) as { items?: PublicMemberView[] };
        if (cancelled) return;
        setLiveMembers(Array.isArray(body.items) ? body.items : []);
        setLiveDistrictId(selected.id);
      } catch {
        if (cancelled) return;
        setLiveMembers([]);
        setLiveDistrictId(selected.id);
      } finally {
        if (!cancelled) setMembersLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selected, initialSlug]);

  const team = useMemo(() => {
    if (!selected) return [];
    if (
      initialMembers !== undefined &&
      initialSlug &&
      selected.slug === initialSlug
    ) {
      return initialMembers;
    }
    if (liveDistrictId === selected.id && liveMembers) {
      return liveMembers;
    }
    return [];
  }, [selected, initialSlug, initialMembers, liveDistrictId, liveMembers]);

  if (!selected) return null;

  const statusLabels = {
    active: d.presence.active,
    indicated: d.presence.indicated,
    upcoming: d.presence.upcoming,
  };

  const statusLabel = statusLabelFor(selected.status, statusLabels);

  const prioritized = [...districts].sort((a, b) => {
    const rank = { active: 0, indicated: 1, upcoming: 2 } as const;
    return rank[a.status] - rank[b.status] || a.name.en.localeCompare(b.name.en);
  });

  const activeCount = districts.filter((x) => x.status === "active").length;

  return (
    <div className="presence-layout">
      <div className="presence-map-panel">
        <p className="presence-state-label">{d.presence.stateLabel}</p>
        <h2 style={{ marginTop: 0, fontFamily: "var(--font-display)", color: "var(--field-green)" }}>
          {d.presence.districtsLabel}
        </h2>
        <p className="map-cue">
          {d.presence.activeCount.replace("{n}", String(activeCount))}
        </p>

        <OdishaDistrictMap
          districts={districts}
          selectedSlug={selected.slug}
          onSelect={selectDistrict}
          locale={locale}
          statusLabels={statusLabels}
        />

        <p className="legend">
          <span className="l-active">{d.presence.active}</span>
          <span className="l-indicated">{d.presence.indicated}</span>
          <span className="l-upcoming">{d.presence.upcoming}</span>
        </p>
      </div>

      <div className="presence-team-panel">
        <h2 style={{ marginTop: 0, fontFamily: "var(--font-display)", color: "var(--field-green)" }}>
          {d.presence.teamTitle}
        </h2>
        <p style={{ color: "var(--ink-mute)", marginTop: 0 }}>{d.presence.selectDistrict}</p>

        <label className="presence-select-label" htmlFor="presence-district-select">
          {d.presence.selectDistrict}
        </label>
        <select
          id="presence-district-select"
          className="presence-select presence-select-always"
          value={selected.slug}
          onChange={(e) => selectDistrict(e.target.value)}
        >
          {prioritized.map((district) => (
            <option key={district.id} value={district.slug}>
              {district.name[locale]}
            </option>
          ))}
        </select>

        <div className="district-detail" style={{ marginTop: "1.25rem" }}>
          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "0.5rem" }}>
            <h3 style={{ margin: 0, fontFamily: "var(--font-display)", color: "var(--field-green)" }}>
              {selected.name[locale]}
            </h3>
            <StatusBadge status={selected.status} label={statusLabel} />
          </div>
          <p style={{ color: "var(--ink-soft)" }}>
            {selected.summary?.[locale] ||
              (selected.status === "indicated"
                ? d.presence.comingSoon
                : selected.status === "upcoming"
                  ? d.presence.upcomingNote
                  : d.presence.activeNote)}
          </p>
          <p style={{ color: "var(--ink-mute)", fontSize: "0.92rem" }}>
            {d.presence.memberCount.replace("{n}", String(team.length))}
          </p>

          <h4 style={{ fontFamily: "var(--font-display)", color: "var(--field-green)" }}>
            {d.presence.membersHeading}
          </h4>
          {membersLoading && team.length === 0 ? (
            <p className="note-block" role="status">
              …
            </p>
          ) : null}
          {team.length === 0 ? (
            <p className="note-block">{d.presence.noMembers}</p>
          ) : (
            <div className="member-grid">
              {team.map((m) => (
                <Link
                  key={m.id}
                  href={`/presence/odisha/${selected.slug}/${m.slug}`}
                  className="member-card"
                >
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={m.name}
                      width={72}
                      height={72}
                      className="member-card-photo"
                      unoptimized={m.photo.includes("supabase.co")}
                    />
                  ) : (
                    <span className="member-card-photo placeholder" aria-hidden>
                      {m.name.slice(0, 1)}
                    </span>
                  )}
                  <div className="member-card-copy">
                    <h3>{m.name}</h3>
                    <p className="member-card-blurb">
                      {m.designation || m.publicBackground?.[locale] || m.bio}
                    </p>
                    {m.village || m.block ? (
                      <p className="member-locality-compact">
                        {[m.village, m.block].filter(Boolean).join(" · ")}
                      </p>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
