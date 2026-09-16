import { NextRequest, NextResponse } from "next/server";
import { assertAdminKey } from "@/lib/server/admin-auth";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/server/supabase";
import { isKnownDistrictId } from "@/lib/district-members/catalog";
import { validateMemberCreate } from "@/lib/district-members/schema";
import {
  ADMIN_MEMBER_COLUMNS,
  DEFAULT_DISTRICT_ID,
  MEMBERS_TABLE,
} from "@/lib/district-members/types";

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

export async function GET(req: NextRequest) {
  const auth = assertAdminKey(req);
  if (!auth.ok) return auth.response;
  if (!isSupabaseAdminConfigured()) return notConfigured();

  const districtId =
    req.nextUrl.searchParams.get("district_id") || DEFAULT_DISTRICT_ID;
  if (!isKnownDistrictId(districtId)) {
    return NextResponse.json(
      {
        error: "Unsupported district",
        code: "BAD_DISTRICT",
        messageOr: "ଜିଲ୍ଲା ଚୟନ ସଠିକ୍ ନୁହେଁ।",
      },
      { status: 400 },
    );
  }

  const q = (req.nextUrl.searchParams.get("q") || "").trim().toLowerCase();
  const status = req.nextUrl.searchParams.get("status") || "all";

  try {
    const supabase = getSupabaseAdminClient();
    let query = supabase
      .from(MEMBERS_TABLE)
      .select(ADMIN_MEMBER_COLUMNS)
      .eq("district_id", districtId)
      .eq("is_archived", false)
      .order("display_order", { ascending: true })
      .order("full_name", { ascending: true })
      .limit(500);

    if (status === "published") query = query.eq("is_published", true);
    if (status === "draft") query = query.eq("is_published", false);

    const { data, error } = await query;
    if (error) {
      console.error("[api/admin/district-members] list failed:", error.message);
      return NextResponse.json(
        { error: "Could not load members", code: "READ_FAILED" },
        { status: 502 },
      );
    }

    let items = data ?? [];
    if (q) {
      items = items.filter((row) => {
        const hay = [row.full_name, row.village, row.area, row.block, row.designation]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
    }

    const total = items.length;
    const published = items.filter((r) => r.is_published).length;
    const draft = total - published;

    return NextResponse.json({
      items,
      counts: { total, published, draft },
      district_id: districtId,
    });
  } catch (err) {
    console.error(
      "[api/admin/district-members] unexpected:",
      err instanceof Error ? err.message : "unknown",
    );
    return NextResponse.json(
      { error: "Could not load members", code: "READ_FAILED" },
      { status: 502 },
    );
  }
}

export async function POST(req: NextRequest) {
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

  const parsed = validateMemberCreate(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { error: parsed.messageEn, messageOr: parsed.messageOr, code: "VALIDATION" },
      { status: 400 },
    );
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from(MEMBERS_TABLE)
      .insert({
        ...parsed.value,
        photo_path: null,
      })
      .select(ADMIN_MEMBER_COLUMNS)
      .single();

    if (error) {
      console.error("[api/admin/district-members] create failed:", error.message);
      const conflict = error.code === "23505";
      return NextResponse.json(
        {
          error: conflict ? "Member slug already exists" : "Could not save member",
          messageOr: conflict
            ? "ଏହି ନାମ/ସ୍ଲଗ୍ ପୂର୍ବରୁ ଅଛି।"
            : "ସଦସ୍ୟ ତଥ୍ୟ ସଂରକ୍ଷଣ କରାଯାଇପାରିଲା ନାହିଁ।",
          code: conflict ? "CONFLICT" : "WRITE_FAILED",
        },
        { status: conflict ? 409 : 502 },
      );
    }

    return NextResponse.json({ item: data }, { status: 201 });
  } catch (err) {
    console.error(
      "[api/admin/district-members] create unexpected:",
      err instanceof Error ? err.message : "unknown",
    );
    return NextResponse.json(
      {
        error: "Could not save member",
        messageOr: "ସଦସ୍ୟ ତଥ୍ୟ ସଂରକ୍ଷଣ କରାଯାଇପାରିଲା ନାହିଁ।",
        code: "WRITE_FAILED",
      },
      { status: 502 },
    );
  }
}
