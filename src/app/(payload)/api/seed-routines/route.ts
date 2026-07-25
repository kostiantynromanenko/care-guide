import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

import { importRoutines } from "@/lib/import-routines";

/**
 * Production endpoint for seeding editorial Routines content (see
 * `src/lib/import-routines.ts`) — mirrors `/api/import-hillary-catalog`'s
 * reasoning: needs a deployed serverless function to reach the production
 * database, reuses `PAYLOAD_SECRET` as a shared secret. Idempotent
 * (upserts by slug), safe to call again after editing the mapping.
 */
export async function POST(request: Request) {
  const providedSecret = request.headers.get("x-seed-secret");
  const expectedSecret = process.env.PAYLOAD_SECRET;

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await getPayload({ config });

  try {
    const summary = await importRoutines(payload);
    return NextResponse.json({ ok: true, ...summary });
  } catch (error) {
    payload.logger.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Seed failed" },
      { status: 500 }
    );
  }
}
