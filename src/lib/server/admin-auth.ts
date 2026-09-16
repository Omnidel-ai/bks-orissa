import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Odisha-only admin key gate for this repository.
 * Browser may hold the key in sessionStorage and send it as `x-admin-key`.
 * The expected value lives only in process.env.ODISHA_BKS_ADMIN_KEY.
 * Independent from Bengal's BKS_ADMIN_KEY — no cross-dependency.
 */

function keyMatches(provided: string, expected: string): boolean {
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export type AdminAuthResult =
  | { ok: true }
  | { ok: false; response: NextResponse };

export function assertAdminKey(req: NextRequest): AdminAuthResult {
  const expected = process.env.ODISHA_BKS_ADMIN_KEY;
  if (!expected) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Admin panel is not configured", code: "NOT_CONFIGURED" },
        { status: 500 },
      ),
    };
  }

  const provided = req.headers.get("x-admin-key") ?? "";
  if (!provided || !keyMatches(provided, expected)) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Unauthorized", code: "UNAUTHORIZED" },
        { status: 401 },
      ),
    };
  }

  return { ok: true };
}
