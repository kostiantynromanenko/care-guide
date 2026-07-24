import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

import { fetchHillaryFeed } from "@/lib/hillary-feed";
import { importHillaryCatalog } from "@/lib/import-hillary-catalog";

/**
 * Production endpoint for the real HiLLARY catalog import (see
 * `src/lib/import-hillary-catalog.ts`) — mirrors the `/api/seed` route's
 * reasoning: this needs to run inside a deployed serverless function so it
 * can reach the production database, and reuses `PAYLOAD_SECRET` as a
 * shared secret rather than adding a new env var for a one-time/occasional
 * tool.
 *
 * Unlike `/api/seed`, this has no "already ran" guard — the import itself
 * is idempotent (upserts by slug), so it's safe to call again later to pull
 * a fresh snapshot of the feed (title/photo/price/stock changes).
 */
// Downloading + re-uploading 16 product photos sequentially can exceed
// Vercel's default serverless timeout; this raises the ceiling (Hobby caps
// at 60s regardless, Pro allows up to 300s).
export const maxDuration = 60;

export async function POST(request: Request) {
  const providedSecret = request.headers.get("x-seed-secret");
  const expectedSecret = process.env.PAYLOAD_SECRET;

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await getPayload({ config });

  try {
    const { offers } = await fetchHillaryFeed();
    const offerMap = new Map(offers.map((o) => [o.id, o]));
    const summary = await importHillaryCatalog(payload, offerMap);
    return NextResponse.json({ ok: true, ...summary });
  } catch (error) {
    payload.logger.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Import failed" },
      { status: 500 }
    );
  }
}
