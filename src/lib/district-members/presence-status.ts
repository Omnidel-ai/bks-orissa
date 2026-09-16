import "server-only";

import { districts, type District, type PresenceStatus } from "@/content/presence";
import { isKnownDistrictId } from "@/lib/district-members/catalog";
import { MEMBERS_TABLE, PRESENCE_TABLE } from "@/lib/district-members/types";
import {
  getSupabaseAnonClient,
  isSupabaseConfigured,
} from "@/lib/server/supabase";

const VALID: ReadonlySet<PresenceStatus> = new Set([
  "active",
  "indicated",
  "upcoming",
]);

export function isDistrictStatus(value: string): value is PresenceStatus {
  return VALID.has(value as PresenceStatus);
}

/**
 * Public Presence statuses for the explorer.
 *
 * Priority:
 * 1. Any district with ≥1 published, non-archived member → Active (green)
 * 2. Else `bks_odisha_district_presence` override when present
 * 3. Else static `districts.ts` default (upcoming)
 *
 * Member presence does not rewrite DB presence rows — visual only.
 */
export async function getDistrictsWithPresenceStatus(): Promise<District[]> {
  const base = districts.map((d) => ({ ...d }));
  if (!isSupabaseConfigured()) return base;

  try {
    const supabase = getSupabaseAnonClient();

    const [
      { data: presenceRows, error: presenceError },
      { data: memberRows, error: memberError },
    ] = await Promise.all([
      supabase.from(PRESENCE_TABLE).select("district_id, status").limit(50),
      supabase
        .from(MEMBERS_TABLE)
        .select("district_id")
        .eq("is_published", true)
        .eq("is_archived", false)
        .limit(500),
    ]);

    if (presenceError) {
      console.error(
        "[odisha-district-presence] status list failed:",
        presenceError.message,
      );
    }
    if (memberError) {
      console.error(
        "[odisha-district-presence] member districts failed:",
        memberError.message,
      );
    }

    const overrides = new Map<string, PresenceStatus>();
    for (const row of presenceRows ?? []) {
      if (
        row?.district_id &&
        isKnownDistrictId(row.district_id) &&
        isDistrictStatus(row.status)
      ) {
        overrides.set(row.district_id, row.status);
      }
    }

    const withPublishedMembers = new Set<string>();
    for (const row of memberRows ?? []) {
      if (row?.district_id && isKnownDistrictId(row.district_id)) {
        withPublishedMembers.add(row.district_id);
      }
    }

    return base.map((d) => {
      if (withPublishedMembers.has(d.id)) {
        return { ...d, status: "active" as const };
      }
      const status = overrides.get(d.id);
      return status ? { ...d, status } : d;
    });
  } catch (err) {
    console.error(
      "[odisha-district-presence] unexpected:",
      err instanceof Error ? err.message : "unknown",
    );
    return base;
  }
}
