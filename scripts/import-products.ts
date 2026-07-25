import fs from "node:fs";
import path from "node:path";
import { getPayload } from "payload";
import config from "@payload-config";

import { fetchHillaryFeed, parseHillaryFeed, type FeedOffer } from "@/lib/hillary-feed";
import { importProducts } from "@/lib/import-products";

/**
 * Local dev entry point for importing all real HiLLARY products — see
 * `src/lib/import-products.ts` for the actual data (shared with the
 * production endpoint at `src/app/(payload)/api/import-products/route.ts`).
 * Uses a local `.cache/hillary-feed.xml` copy when present, to avoid
 * re-downloading the ~10MB feed on every run during curation.
 */

const CACHE_PATH = path.join(process.cwd(), ".cache", "hillary-feed.xml");

async function loadOffers(): Promise<Map<string, FeedOffer>> {
  if (fs.existsSync(CACHE_PATH)) {
    console.log("Using cached feed:", CACHE_PATH);
    const xml = fs.readFileSync(CACHE_PATH, "utf8");
    const { offers } = parseHillaryFeed(xml);
    return new Map(offers.map((o) => [o.id, o]));
  }
  console.log("Downloading feed...");
  const { offers } = await fetchHillaryFeed();
  return new Map(offers.map((o) => [o.id, o]));
}

const run = async () => {
  const payload = await getPayload({ config });
  const offers = await loadOffers();
  const summary = await importProducts(payload, offers);
  console.log("Import complete:", summary);
  process.exit(0);
};

try {
  await run();
} catch (error) {
  console.error(error);
  process.exit(1);
}
