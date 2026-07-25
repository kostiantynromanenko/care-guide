import { getPayload } from "payload";
import config from "@payload-config";

import { importNeeds } from "@/lib/import-needs";

/**
 * Local dev entry point for importing Needs added after the initial demo
 * seed — see `src/lib/import-needs.ts` for the actual data (shared with the
 * production endpoint at `src/app/(payload)/api/import-needs/route.ts`).
 */
const run = async () => {
  const payload = await getPayload({ config });
  const summary = await importNeeds(payload);
  console.log("Import complete:", summary);
  process.exit(0);
};

try {
  await run();
} catch (error) {
  console.error(error);
  process.exit(1);
}
