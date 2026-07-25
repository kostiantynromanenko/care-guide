import { getPayload } from "payload";
import config from "@payload-config";

import { importCollections } from "@/lib/import-collections";

/**
 * Local dev entry point for importing all real HiLLARY-backed collections —
 * see `src/lib/import-collections.ts` for the actual data (shared with the
 * production endpoint at `src/app/(payload)/api/import-collections/route.ts`).
 * Run `import-products.ts` first — collections reference products by slug.
 */
const run = async () => {
  const payload = await getPayload({ config });
  const summary = await importCollections(payload);
  console.log("Import complete:", summary);
  process.exit(0);
};

try {
  await run();
} catch (error) {
  console.error(error);
  process.exit(1);
}
