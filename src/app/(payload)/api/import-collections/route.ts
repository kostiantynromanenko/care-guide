import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

import { importCollections } from "@/lib/import-collections";

/**
 * Production endpoint for importing all real HiLLARY-backed collections
 * (see `src/lib/import-collections.ts`). Idempotent (upserts by slug), so
 * it's safe to call again later. Run `/api/import-products` first —
 * collections reference products by slug.
 */
export const maxDuration = 60;

export async function POST(request: Request) {
  const providedSecret = request.headers.get("x-seed-secret");
  const expectedSecret = process.env.PAYLOAD_SECRET;

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await getPayload({ config });

  try {
    const summary = await importCollections(payload);
    return NextResponse.json({ ok: true, ...summary });
  } catch (error) {
    payload.logger.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Import failed" },
      { status: 500 }
    );
  }
}
