import { isKnownDistrictId } from "@/lib/district-members/catalog";
import {
  LATIN_SCRIPT_MESSAGE_EN,
  LATIN_SCRIPT_MESSAGE_OR,
  isLatinScriptText,
} from "@/lib/district-members/latin-script";
import type { MemberWriteInput } from "@/lib/district-members/types";

export type ValidationResult =
  | { ok: true; value: MemberWriteInput }
  | { ok: false; messageOr: string; messageEn: string };

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isMemberId(id: string): boolean {
  return UUID_RE.test(id);
}

function asOptionalString(value: unknown): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function rejectClientPhotoPath(raw: Record<string, unknown>): ValidationResult | null {
  if ("photo_path" in raw) {
    return {
      ok: false,
      messageOr: "ଛବି ପଥ ସିଧାସଳଖ ପଠାଯାଇପାରିବ ନାହିଁ। ଛବି ଅପଲୋଡ୍ ବ୍ୟବହାର କରନ୍ତୁ।",
      messageEn: "photo_path cannot be set directly. Use the photo upload API.",
    };
  }
  return null;
}

function rejectNonLatin(
  labelEn: string,
  value: string | null | undefined,
): ValidationResult | null {
  if (value == null || value === "") return null;
  if (isLatinScriptText(value)) return null;
  return {
    ok: false,
    messageOr: `${labelEn}: ${LATIN_SCRIPT_MESSAGE_OR}`,
    messageEn: `${labelEn}: ${LATIN_SCRIPT_MESSAGE_EN}`,
  };
}

function slugifyName(name: string): string {
  const ascii = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  if (ascii) return ascii;
  return `member-${Date.now().toString(36)}`;
}

export function validateMemberCreate(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return {
      ok: false,
      messageOr: "ଅବୈଧ ତଥ୍ୟ ପଠାଯାଇଛି।",
      messageEn: "Invalid payload.",
    };
  }

  const raw = body as Record<string, unknown>;
  const photoReject = rejectClientPhotoPath(raw);
  if (photoReject) return photoReject;

  const district_id =
    typeof raw.district_id === "string" ? raw.district_id.trim() : "";
  if (!isKnownDistrictId(district_id)) {
    return {
      ok: false,
      messageOr: "ଜିଲ୍ଲା ଚୟନ ସଠିକ୍ ନୁହେଁ।",
      messageEn: "Unknown or unsupported district.",
    };
  }

  const full_name =
    typeof raw.full_name === "string" ? raw.full_name.trim() : "";
  if (!full_name) {
    return {
      ok: false,
      messageOr: "ନାମ ଲେଖନ୍ତୁ।",
      messageEn: "Name is required.",
    };
  }
  if (full_name.length > 120) {
    return {
      ok: false,
      messageOr: "ନାମ ବହୁତ ଲମ୍ବା।",
      messageEn: "Name is too long.",
    };
  }
  const nameScript = rejectNonLatin("Name", full_name);
  if (nameScript) return nameScript;

  const designation = asOptionalString(raw.designation) ?? null;
  const village = asOptionalString(raw.village) ?? null;
  const block = asOptionalString(raw.block) ?? null;
  const area = asOptionalString(raw.area) ?? null;
  const bio = asOptionalString(raw.bio) ?? null;
  const category = asOptionalString(raw.category) ?? null;

  for (const [label, val] of [
    ["Designation", designation],
    ["Village", village],
    ["Block", block],
    ["Area", area],
    ["Bio", bio],
    ["Category", category],
  ] as const) {
    const bad = rejectNonLatin(label, val);
    if (bad) return bad;
  }

  const slugRaw =
    typeof raw.slug === "string" && raw.slug.trim()
      ? raw.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-")
      : slugifyName(full_name);

  const display_order =
    typeof raw.display_order === "number" && Number.isFinite(raw.display_order)
      ? Math.round(raw.display_order)
      : 100;

  return {
    ok: true,
    value: {
      district_id,
      full_name,
      slug: slugRaw || slugifyName(full_name),
      designation,
      village,
      block,
      area,
      bio,
      category,
      display_order,
      is_published: Boolean(raw.is_published),
      is_archived: false,
    },
  };
}

export function validateMemberPatch(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return {
      ok: false,
      messageOr: "ଅବୈଧ ତଥ୍ୟ ପଠାଯାଇଛି।",
      messageEn: "Invalid payload.",
    };
  }

  const raw = body as Record<string, unknown>;
  const photoReject = rejectClientPhotoPath(raw);
  if (photoReject) return photoReject;

  const value: MemberWriteInput = {
    district_id: "",
    full_name: "",
  };

  if ("full_name" in raw) {
    const full_name =
      typeof raw.full_name === "string" ? raw.full_name.trim() : "";
    if (!full_name) {
      return {
        ok: false,
        messageOr: "ନାମ ଲେଖନ୍ତୁ।",
        messageEn: "Name is required.",
      };
    }
    const nameScript = rejectNonLatin("Name", full_name);
    if (nameScript) return nameScript;
    value.full_name = full_name;
  }

  if ("district_id" in raw) {
    const district_id =
      typeof raw.district_id === "string" ? raw.district_id.trim() : "";
    if (!isKnownDistrictId(district_id)) {
      return {
        ok: false,
        messageOr: "ଜିଲ୍ଲା ଚୟନ ସଠିକ୍ ନୁହେଁ।",
        messageEn: "Unknown or unsupported district.",
      };
    }
    value.district_id = district_id;
  }

  if ("slug" in raw && typeof raw.slug === "string" && raw.slug.trim()) {
    value.slug = raw.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  }

  const optionalFields = [
    ["designation", "Designation"],
    ["village", "Village"],
    ["block", "Block"],
    ["area", "Area"],
    ["category", "Category"],
  ] as const;

  for (const [key, label] of optionalFields) {
    if (key in raw) {
      const v = asOptionalString(raw[key]) ?? null;
      const bad = rejectNonLatin(label, v);
      if (bad) return bad;
      (value as Record<string, unknown>)[key] = v;
    }
  }

  if ("bio" in raw) {
    value.bio = asOptionalString(raw.bio) ?? null;
  }

  if (
    "display_order" in raw &&
    typeof raw.display_order === "number" &&
    Number.isFinite(raw.display_order)
  ) {
    value.display_order = Math.round(raw.display_order);
  }
  if ("is_published" in raw) value.is_published = Boolean(raw.is_published);
  if ("is_archived" in raw) value.is_archived = Boolean(raw.is_archived);

  return { ok: true, value };
}

export { slugifyName };
