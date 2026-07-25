import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

import { fetchHillaryFeed } from "@/lib/hillary-feed";
import { importProducts } from "@/lib/import-products";

/**
 * Production endpoint for importing all real HiLLARY products (see
 * `src/lib/import-products.ts`). Idempotent (upserts by slug), so it's safe
 * to call again later to refresh titles/prices/photos from a newer feed
 * snapshot, or after adding a new product mapping.
 */
// The first production run of this route hit FUNCTION_INVOCATION_TIMEOUT at
// 60s while processing 45 products sequentially (each needing a hillary.ua
// photo download + Vercel Blob upload). `importProducts` now runs those
// concurrently, but this is bumped too as a safety margin — Vercel's Hobby
// plan allows up to 300s per function with Fluid compute.
export const maxDuration = 180;

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
    const summary = await importProducts(payload, offerMap);
    return NextResponse.json({ ok: true, ...summary });
  } catch (error) {
    payload.logger.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Import failed" },
      { status: 500 }
    );
  }
}
