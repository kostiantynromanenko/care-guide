import { getPayload } from "payload";
import config from "@payload-config";

import { seedDemoContent } from "../src/lib/seed-demo-content";

const run = async () => {
  const payload = await getPayload({ config });
  await seedDemoContent(payload);
  process.exit(0);
};

try {
  await run();
} catch (error) {
  console.error(error);
  process.exit(1);
}
