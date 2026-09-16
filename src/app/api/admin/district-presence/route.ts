import { NextRequest, NextResponse } from "next/server";
import { getDistrictCatalog } from "@/lib/district-members/catalog";
import {
  getDistrictsWithPresenceStatus,
  isDistrictStatus,
} from "@/lib/district-members/presence-status";
import { PRESENCE_TABLE } from "@/lib/district-members/types";
import { assertAdminKey } from "@/lib/server/admin-auth";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/server/supabase";

export const runtime = "nodejs";

function notConfigured() {
  return NextResponse.json(
    {
      error: "Database admin is not configured yet",
      code: "DB_NOT_CONFIGURED",
      messageOr:
        "ଡାଟାବେସ ଏପର୍ଯ୍ୟନ୍ତ ସଂଯୋଗ ହୋଇନାହିଁ। ମାଇଗ୍ରେସନ୍ ପ୍ରୟୋଗ ଓ ପରିବେଶ ଭେରିଏବଲ୍ ସେଟ୍ କରିବା ପରେ ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",
    },
    { status: 503 },
  );
}

/** Merged district catalog with Presence status (static + DB overrides + member Active). */
export async function GET(req: NextRequest) {
  const auth = assertAdminKey(req);
  if (!auth.ok) return auth.response;

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json({
      items: getDistrictCatalog().map((d) => ({
        district_id: d.id,
        officialName: d.officialName,
        name: d.name,
        status: d.status,
        source: "static" as const,
      })),
      dbConfigured: false,
    });
  }

  const merged = await getDistrictsWithPresenceStatus();
  return NextResponse.json({
    items: merged.map((d) => ({
      district_id: d.id,
      officialName: d.officialName,
      name: d.name,
      status: d.status,
      source: "merged" as const,
    })),
    dbConfigured: true,
  });
}

/** Explicit district Presence status (Active / Indicated / Upcoming). */
export async function PATCH(req: NextRequest) {
  const auth = assertAdminKey(req);
  if (!auth.ok) return auth.response;
  if (!isSupabaseAdminConfigured()) return notConfigured();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON", messageOr: "ଅବୈଧ ତଥ୍ୟ ପଠାଯାଇଛି।" },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Invalid payload", messageOr: "ଅବୈଧ ତଥ୍ୟ ପଠାଯାଇଛି।" },
      { status: 400 },
    );
  }

  const raw = body as Record<string, unknown>;
  const district_id =
    typeof raw.district_id === "string" ? raw.district_id.trim() : "";
  const status = typeof raw.status === "string" ? raw.status.trim() : "";

  const known = getDistrictCatalog().some((d) => d.id === district_id);
  if (!known || !isDistrictStatus(status)) {
    return NextResponse.json(
      {
        error: "Invalid district or status",
        messageOr: "ଜିଲ୍ଲା କିମ୍ବା ସ୍ଥିତି ସଠିକ୍ ନୁହେଁ।",
        code: "VALIDATION",
      },
      { status: 400 },
    );
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from(PRESENCE_TABLE)
      .upsert(
        {
          district_id,
          status,
          updated_at: new Date().toISOString(),
          updated_by: "admin",
        },
        { onConflict: "district_id" },
      )
      .select("district_id, status, updated_at")
      .single();

    if (error) {
      console.error("[api/admin/district-presence] upsert failed:", error.message);
      return NextResponse.json(
        {
          error: "Could not update district status",
          messageOr: "ଜିଲ୍ଲା ସ୍ଥିତି ଅଦ୍ୟତନ କରାଯାଇପାରିଲା ନାହିଁ।",
          code: "WRITE_FAILED",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ item: data });
  } catch (err) {
    console.error(
      "[api/admin/district-presence] unexpected:",
      err instanceof Error ? err.message : "unknown",
    );
    return NextResponse.json(
      {
        error: "Could not update district status",
        messageOr: "ଜିଲ୍ଲା ସ୍ଥିତି ଅଦ୍ୟତନ କରାଯାଇପାରିଲା ନାହିଁ।",
        code: "WRITE_FAILED",
      },
      { status: 502 },
    );
  }
}
