import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

import { importNeeds } from "@/lib/import-needs";

/**
 * Production endpoint for importing Needs added after the initial demo seed
 * (see `src/lib/import-needs.ts`). Idempotent (upserts by slug), so it's
 * safe to call again later.
 */
export const maxDuration = 30;

export async function POST(request: Request) {
  const providedSecret = request.headers.get("x-seed-secret");
  const expectedSecret = process.env.PAYLOAD_SECRET;

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await getPayload({ config });

  try {
    const summary = await importNeeds(payload);
    return NextResponse.json({ ok: true, ...summary });
  } catch (error) {
    payload.logger.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Import failed" },
      { status: 500 }
    );
  }
}
