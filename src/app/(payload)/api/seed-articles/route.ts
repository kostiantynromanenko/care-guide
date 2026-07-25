import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

import { importArticles } from "@/lib/import-articles";

/**
 * Production endpoint for seeding the 2 remaining educational articles (see
 * `src/lib/import-articles.ts`) — mirrors `/api/seed-routines`'s reasoning.
 * Idempotent (upserts by slug), safe to call again after editing the content.
 */
export async function POST(request: Request) {
  const providedSecret = request.headers.get("x-seed-secret");
  const expectedSecret = process.env.PAYLOAD_SECRET;

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await getPayload({ config });

  try {
    const summary = await importArticles(payload);
    return NextResponse.json({ ok: true, ...summary });
  } catch (error) {
    payload.logger.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Seed failed" },
      { status: 500 }
    );
  }
}
