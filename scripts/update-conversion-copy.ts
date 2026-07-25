import { getPayload } from "payload";
import config from "@payload-config";

import { updateConversionCopy } from "@/lib/update-conversion-copy";

/**
 * Local dev entry point for the conversion-copy update — see
 * `src/lib/update-conversion-copy.ts` for the actual text (shared with the
 * production endpoint at `src/app/(payload)/api/update-conversion-copy/route.ts`).
 */
const run = async () => {
  const payload = await getPayload({ config });
  const summary = await updateConversionCopy(payload);
  console.log("Conversion copy update complete:", summary);
  process.exit(0);
};

try {
  await run();
} catch (error) {
  console.error(error);
  process.exit(1);
}
