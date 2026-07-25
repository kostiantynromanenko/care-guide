import { getPayload } from "payload";
import config from "@payload-config";

import { importRoutines } from "@/lib/import-routines";

/**
 * Local dev entry point for seeding the editorial Routines content — see
 * `src/lib/import-routines.ts` for the actual data (shared with the
 * production endpoint at `src/app/(payload)/api/seed-routines/route.ts`).
 */
const run = async () => {
  const payload = await getPayload({ config });
  const summary = await importRoutines(payload);
  console.log("Routines seed complete:", summary);
  process.exit(0);
};

try {
  await run();
} catch (error) {
  console.error(error);
  process.exit(1);
}
