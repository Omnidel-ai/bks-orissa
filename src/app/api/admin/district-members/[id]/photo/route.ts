import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { assertAdminKey } from "@/lib/server/admin-auth";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/server/supabase";
import { isMemberId } from "@/lib/district-members/schema";
import {
  ADMIN_MEMBER_COLUMNS,
  DISTRICT_MEMBER_STORAGE_BUCKET,
  MEMBERS_TABLE,
} from "@/lib/district-members/types";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

export async function POST(req: NextRequest, ctx: Ctx) {
  const auth = assertAdminKey(req);
  if (!auth.ok) return auth.response;

  if (!isSupabaseAdminConfigured()) {
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

  const { id } = await ctx.params;
  if (!id || !isMemberId(id)) {
    return NextResponse.json(
      { error: "Invalid id", messageOr: "ଅବୈଧ ସଦସ୍ୟ ଆଇଡି।", code: "BAD_ID" },
      { status: 400 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid form", messageOr: "ଛବି ପଠାଯାଇପାରିଲା ନାହିଁ।" },
      { status: 400 },
    );
  }

  const file = form.get("photo");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Photo required", messageOr: "ଗୋଟିଏ ଛବି ବାଛନ୍ତୁ।" },
      { status: 400 },
    );
  }

  if (file.size <= 0 || file.size > MAX_BYTES) {
    return NextResponse.json(
      {
        error: "Photo too large",
        messageOr: "ଛବିର ଆକାର ୫ ମେଗାବାଇଟ୍ ଭିତରେ ରଖନ୍ତୁ।",
      },
      { status: 400 },
    );
  }

  const ext = ALLOWED.get(file.type);
  if (!ext) {
    return NextResponse.json(
      {
        error: "Unsupported image type",
        messageOr: "କେବଳ JPG, PNG କିମ୍ବା WEBP ଛବି ବ୍ୟବହାର କରନ୍ତୁ।",
      },
      { status: 400 },
    );
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { data: existing, error: findError } = await supabase
      .from(MEMBERS_TABLE)
      .select("id, district_id")
      .eq("id", id)
      .maybeSingle();

    if (findError || !existing) {
      return NextResponse.json(
        { error: "Not found", messageOr: "ସଦସ୍ୟ ମିଳିଲା ନାହିଁ।", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    const objectPath = `${existing.district_id}/${id}-${randomUUID()}.${ext}`;
    const bytes = new Uint8Array(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(DISTRICT_MEMBER_STORAGE_BUCKET)
      .upload(objectPath, bytes, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error(
        "[api/admin/district-members/photo] upload failed:",
        uploadError.message,
      );
      return NextResponse.json(
        {
          error: "Could not upload photo",
          messageOr: "ଛବି ଅପଲୋଡ୍ କରାଯାଇପାରିଲା ନାହିଁ।",
          code: "UPLOAD_FAILED",
        },
        { status: 502 },
      );
    }

    const { data, error } = await supabase
      .from(MEMBERS_TABLE)
      .update({ photo_path: objectPath })
      .eq("id", id)
      .eq("district_id", existing.district_id)
      .select(ADMIN_MEMBER_COLUMNS)
      .single();

    if (error) {
      console.error(
        "[api/admin/district-members/photo] path update failed:",
        error.message,
      );
      return NextResponse.json(
        {
          error: "Could not save photo path",
          messageOr: "ଛବି ତଥ୍ୟ ସଂରକ୍ଷଣ କରାଯାଇପାରିଲା ନାହିଁ।",
          code: "WRITE_FAILED",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ item: data, photo_path: objectPath });
  } catch (err) {
    console.error(
      "[api/admin/district-members/photo] unexpected:",
      err instanceof Error ? err.message : "unknown",
    );
    return NextResponse.json(
      {
        error: "Could not upload photo",
        messageOr: "ଛବି ଅପଲୋଡ୍ କରାଯାଇପାରିଲା ନାହିଁ।",
        code: "UPLOAD_FAILED",
      },
      { status: 502 },
    );
  }
}
