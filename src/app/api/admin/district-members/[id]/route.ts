import { NextRequest, NextResponse } from "next/server";
import { assertAdminKey } from "@/lib/server/admin-auth";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/server/supabase";
import { isMemberId, validateMemberPatch } from "@/lib/district-members/schema";
import { ADMIN_MEMBER_COLUMNS, MEMBERS_TABLE } from "@/lib/district-members/types";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

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

function badId() {
  return NextResponse.json(
    { error: "Invalid id", messageOr: "ଅବୈଧ ସଦସ୍ୟ ଆଇଡି।", code: "BAD_ID" },
    { status: 400 },
  );
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const auth = assertAdminKey(req);
  if (!auth.ok) return auth.response;
  if (!isSupabaseAdminConfigured()) return notConfigured();

  const { id } = await ctx.params;
  if (!id || !isMemberId(id)) return badId();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON", messageOr: "ଅବୈଧ ତଥ୍ୟ ପଠାଯାଇଛି।" },
      { status: 400 },
    );
  }

  const parsed = validateMemberPatch(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { error: parsed.messageEn, messageOr: parsed.messageOr, code: "VALIDATION" },
      { status: 400 },
    );
  }

  const patch: Record<string, unknown> = {};
  const v = parsed.value;
  if (v.full_name) patch.full_name = v.full_name;
  if (v.slug) patch.slug = v.slug;
  if ("designation" in v) patch.designation = v.designation;
  if ("village" in v) patch.village = v.village;
  if ("block" in v) patch.block = v.block;
  if ("area" in v) patch.area = v.area;
  if ("bio" in v) patch.bio = v.bio;
  if ("category" in v) patch.category = v.category;
  if (typeof v.display_order === "number") patch.display_order = v.display_order;
  if (typeof v.is_published === "boolean") patch.is_published = v.is_published;
  if (typeof v.is_archived === "boolean") patch.is_archived = v.is_archived;

  if (Object.keys(patch).length === 0) {
    return NextResponse.json(
      { error: "No changes", messageOr: "କୌଣସି ପରିବର୍ତ୍ତନ ନାହିଁ।" },
      { status: 400 },
    );
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from(MEMBERS_TABLE)
      .update(patch)
      .eq("id", id)
      .select(ADMIN_MEMBER_COLUMNS)
      .maybeSingle();

    if (error) {
      console.error("[api/admin/district-members/id] patch failed:", error.message);
      return NextResponse.json(
        {
          error: "Could not update member",
          messageOr: "ସଦସ୍ୟ ତଥ୍ୟ ଅଦ୍ୟତନ କରାଯାଇପାରିଲା ନାହିଁ।",
          code: "WRITE_FAILED",
        },
        { status: 502 },
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Not found", messageOr: "ସଦସ୍ୟ ମିଳିଲା ନାହିଁ।", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    return NextResponse.json({ item: data });
  } catch (err) {
    console.error(
      "[api/admin/district-members/id] unexpected:",
      err instanceof Error ? err.message : "unknown",
    );
    return NextResponse.json(
      {
        error: "Could not update member",
        messageOr: "ସଦସ୍ୟ ତଥ୍ୟ ଅଦ୍ୟତନ କରାଯାଇପାରିଲା ନାହିଁ।",
        code: "WRITE_FAILED",
      },
      { status: 502 },
    );
  }
}

/** Soft-archive (preferred over hard delete). */
export async function DELETE(req: NextRequest, ctx: Ctx) {
  const auth = assertAdminKey(req);
  if (!auth.ok) return auth.response;
  if (!isSupabaseAdminConfigured()) return notConfigured();

  const { id } = await ctx.params;
  if (!id || !isMemberId(id)) return badId();

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from(MEMBERS_TABLE)
      .update({ is_archived: true, is_published: false })
      .eq("id", id)
      .select(ADMIN_MEMBER_COLUMNS)
      .maybeSingle();

    if (error) {
      console.error("[api/admin/district-members/id] archive failed:", error.message);
      return NextResponse.json(
        {
          error: "Could not archive member",
          messageOr: "ସଦସ୍ୟଙ୍କୁ ସଂରକ୍ଷଣାଗାରକୁ ନେଇହେଲା ନାହିଁ।",
          code: "WRITE_FAILED",
        },
        { status: 502 },
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Not found", messageOr: "ସଦସ୍ୟ ମିଳିଲା ନାହିଁ।", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    return NextResponse.json({ item: data, archived: true });
  } catch (err) {
    console.error(
      "[api/admin/district-members/id] archive unexpected:",
      err instanceof Error ? err.message : "unknown",
    );
    return NextResponse.json(
      {
        error: "Could not archive member",
        messageOr: "ସଦସ୍ୟଙ୍କୁ ସଂରକ୍ଷଣାଗାରକୁ ନେଇହେଲା ନାହିଁ।",
        code: "WRITE_FAILED",
      },
      { status: 502 },
    );
  }
}
