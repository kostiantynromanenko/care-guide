import { getPayload } from "payload";
import config from "@payload-config";

import { importArticles } from "@/lib/import-articles";

/**
 * Local dev entry point for seeding the 2 remaining educational articles —
 * see `src/lib/import-articles.ts` for the actual content (shared with the
 * production endpoint at `src/app/(payload)/api/seed-articles/route.ts`).
 */
const run = async () => {
  const payload = await getPayload({ config });
  const summary = await importArticles(payload);
  console.log("Articles seed complete:", summary);
  process.exit(0);
};

try {
  await run();
} catch (error) {
  console.error(error);
  process.exit(1);
}
