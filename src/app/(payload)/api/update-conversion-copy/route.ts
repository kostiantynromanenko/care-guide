import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

import { updateConversionCopy } from "@/lib/update-conversion-copy";

/**
 * Production endpoint for the conversion-copy update (see
 * `src/lib/update-conversion-copy.ts`) — mirrors the other `/api/seed-*`
 * routes' reasoning. Idempotent, safe to call again after editing the copy.
 */
export async function POST(request: Request) {
  const providedSecret = request.headers.get("x-seed-secret");
  const expectedSecret = process.env.PAYLOAD_SECRET;

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await getPayload({ config });

  try {
    const summary = await updateConversionCopy(payload);
    return NextResponse.json({ ok: true, ...summary });
  } catch (error) {
    payload.logger.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Update failed" },
      { status: 500 }
    );
  }
}
