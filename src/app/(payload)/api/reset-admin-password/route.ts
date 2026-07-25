import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Recovery endpoint for a locked-out /admin account.
 *
 * Why this exists: no email adapter is configured (docs/DEPLOYMENT.md — this
 * is a design prototype, not set up for transactional email), so Payload's
 * built-in "forgot password" flow has no way to actually deliver a reset
 * link in production. This mirrors the other protected seed/import routes:
 * guarded by the same shared PAYLOAD_SECRET header, no new env var needed.
 *
 * GET  — lists existing admin emails (so you can find the account if you
 *        also forgot which email you used).
 * POST — sets a new password for the given email. Payload's Local API
 *        hashes it the same way the login form would.
 *
 * Remove this route (or leave the secret guard in place) once you've
 * regained access — see docs/DEPLOYMENT.md conventions for the other
 * one-off protected routes.
 */
function checkSecret(request: Request): boolean {
  const providedSecret = request.headers.get("x-seed-secret");
  const expectedSecret = process.env.PAYLOAD_SECRET;
  return Boolean(expectedSecret) && providedSecret === expectedSecret;
}

export async function GET(request: Request) {
  if (!checkSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await getPayload({ config });
  const { docs } = await payload.find({ collection: "users", limit: 100 });
  return NextResponse.json({ ok: true, emails: docs.map((doc) => doc.email) });
}

export async function POST(request: Request) {
  if (!checkSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const email = body?.email;
  const newPassword = body?.newPassword;

  if (!email || !newPassword) {
    return NextResponse.json({ error: "email and newPassword are required" }, { status: 400 });
  }
  if (typeof newPassword !== "string" || newPassword.length < 8) {
    return NextResponse.json({ error: "newPassword must be at least 8 characters" }, { status: 400 });
  }

  const payload = await getPayload({ config });

  try {
    const { docs } = await payload.find({
      collection: "users",
      where: { email: { equals: email } },
      limit: 1,
    });

    if (docs.length === 0) {
      return NextResponse.json({ error: `No user found with email "${email}"` }, { status: 404 });
    }

    await payload.update({
      collection: "users",
      id: docs[0].id,
      data: { password: newPassword },
    });

    return NextResponse.json({ ok: true, email });
  } catch (error) {
    payload.logger.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Reset failed" },
      { status: 500 }
    );
  }
}
