import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

import { seedDemoContent } from "@/lib/seed-demo-content";

/**
 * One-time production seeding endpoint.
 *
 * Why this exists: Vercel's Postgres/Blob-integration env vars (and
 * PAYLOAD_SECRET) are stored as "sensitive", meaning their real values can
 * never be read back locally (not via the dashboard, the CLI, or the API —
 * see docs/DEPLOYMENT.md). `npm run seed` therefore can't run against the
 * production database from a developer machine. Running the same seed logic
 * inside a deployed serverless function sidesteps that, since sensitive vars
 * ARE injected here at runtime.
 *
 * Guarded by:
 * 1. A shared-secret header (reuses PAYLOAD_SECRET, already private/
 *    server-only — no new env var needed for a one-time tool).
 * 2. An idempotency check: refuses to run if the `needs` collection already
 *    has any documents, so this can't accidentally double-seed.
 *
 * Remove this route (or leave the guard in place) once production has been
 * seeded — see docs/DEPLOYMENT.md § "Seed initial content".
 */
export async function POST(request: Request) {
  const providedSecret = request.headers.get("x-seed-secret");
  const expectedSecret = process.env.PAYLOAD_SECRET;

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await getPayload({ config });

  const existing = await payload.count({ collection: "needs" });
  if (existing.totalDocs > 0) {
    return NextResponse.json(
      { error: "Already seeded — `needs` collection is non-empty." },
      { status: 409 }
    );
  }

  try {
    const summary = await seedDemoContent(payload);
    return NextResponse.json({ ok: true, ...summary });
  } catch (error) {
    payload.logger.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Seed failed" },
      { status: 500 }
    );
  }
}
