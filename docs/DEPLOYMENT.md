# Production deployment (Vercel)

This documents the approved production hosting decision (see
`docs/PROJECT_CONTEXT.md` → "Technical status" and `docs/APPROVAL_WORKFLOW.md`
Level 1 decisions): the app deploys to **Vercel**, with a managed **Postgres**
database and **Vercel Blob** for media uploads (Payload's officially supported
path for running on serverless hosts).

Local development is unaffected — it keeps using the local Docker Compose
Postgres and local-disk media storage exactly as before. Nothing here changes
`npm run dev`.

## What you need before starting

- A GitHub (or GitLab/Bitbucket) account, to hold the repository Vercel builds
  from.
- A Vercel account (free tier is enough to start): https://vercel.com/signup
- Vercel's CLI, or just the dashboard — steps below cover the dashboard, since
  it's the simpler path for one-time setup.

## 1. Push the repository to GitHub

This project is currently a local-only git repo. Create an empty repository
on GitHub (no README/license, so it doesn't conflict with existing history),
then:

```bash
git remote add origin https://github.com/<your-account>/care-guide.git
git push -u origin master
```

## 2. Create the Vercel project

1. In the Vercel dashboard, click **Add New → Project**.
2. Import the GitHub repository you just pushed.
3. Framework preset should auto-detect as **Next.js** — leave build/output
   settings at their defaults.
4. Don't click Deploy yet — add the database and blob store first (next
   steps), so the first deploy already has the environment variables it
   needs.

## 3. Add a Postgres database

1. In the project, go to the **Storage** tab → **Create Database** → choose
   **Postgres** (Vercel's marketplace offers Neon and others; either works —
   Neon is the most common pairing and has a solid free tier).
2. Once created, Vercel automatically injects `DATABASE_URL` (plus a few
   related `POSTGRES_*`/`PG*` variables) as project environment variables.
   No manual step needed: `payload.config.ts` reads `DATABASE_URI` for local
   dev and automatically falls back to `DATABASE_URL` in production, so it
   picks this up as-is.
   (Note: these connection-string variables are created as **sensitive** —
   their values can't be viewed or copied from the dashboard afterwards,
   which is why the config falls back automatically instead of asking you to
   duplicate the value into `DATABASE_URI` by hand.)

## 4. Add Vercel Blob storage (for Media uploads)

1. Still in **Storage**, click **Create Database** → **Blob**.
2. Connect it to the project. Vercel automatically injects
   `BLOB_READ_WRITE_TOKEN` as an environment variable — no manual value
   needed. `payload.config.ts` already reads this and switches Media uploads
   from local disk to Vercel Blob automatically when it's present.

## 5. Set the remaining environment variables

In **Settings → Environment Variables**, add:

- `PAYLOAD_SECRET` — a long random string (e.g. generate with
  `openssl rand -base64 32`). This must stay the same across deploys, or
  existing sessions/tokens break.

`DATABASE_URL` and `BLOB_READ_WRITE_TOKEN` should already be present from
steps 3–4.

## 6. Deploy

Click **Deploy**. Vercel builds and deploys the app.

Payload's schema auto-sync (`push`) only runs when `NODE_ENV !== "production"`
— Vercel always sets `NODE_ENV=production`, so it never applies there. Instead,
`payload.config.ts` passes `prodMigrations: migrations` (from `src/migrations/`,
committed to the repo), which Payload runs automatically on its first
connection in production, creating all tables. **Whenever the schema changes**
(a collection/global/field is added, renamed, or removed), regenerate this
before deploying:

```bash
npx payload migrate:create <short-description>
```

This connects to your local dev database, diffs it against the current
Payload config, and writes a new file into `src/migrations/` (plus updates
`src/migrations/index.ts`) — commit both. Forgetting this step means
production's schema silently falls behind local dev.

## 7. Seed initial content

The production database starts empty. `DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`,
and `PAYLOAD_SECRET` are all created as **sensitive** environment variables
(Vercel's default for Production), which means their real values can never be
read back afterwards — not from the dashboard, `vercel env pull`, `vercel env
run`, or the API. So `npm run seed` cannot be pointed at the production
database from a local machine; there is no valid connection string to give it.

Instead, use the protected seeding endpoint at `/api/seed`
(`src/app/(payload)/api/seed/route.ts`), which runs the same seed logic
(`src/lib/seed-demo-content.ts`) inside a deployed serverless function, where
the real sensitive values are injected at runtime:

1. After the first successful deploy, trigger it once (replace the URL and
   secret):

   ```bash
   curl -X POST https://<your-project>.vercel.app/api/seed \
     -H "x-seed-secret: <the same value you set for PAYLOAD_SECRET>"
   ```

   It responds `{"ok": true, ...}` with counts on success. It refuses to run
   a second time (`409`) once the `needs` collection is non-empty, so it's
   safe to leave in place — but for extra hygiene you can remove the route
   file and redeploy once you've confirmed seeding worked.
2. Create the real production admin account by visiting
   `https://<your-project>.vercel.app/admin` — Payload shows a "create first
   user" form when the `users` collection is empty. Use a real email/password
   here; don't reuse the local dev credentials from
   `docs/CLIENT_ADMIN_GUIDE.md` (those are for `localhost` only).
3. Verify collections/articles/globals appear correctly in `/admin` and on
   the public site.

## 8. Give the client access

Once verified, share the production URL and an updated version of
`docs/CLIENT_ADMIN_GUIDE.md` (swap the `localhost:3000` references for the
real production URL) so the client can log into `/admin` from her own
device — the local-only limitation described in that guide no longer
applies once this deployment is live.

## Notes / things intentionally out of scope here

- **Migrations:** local dev still uses `push` mode (auto-sync on every save,
  no migration files needed there) since `NODE_ENV` is `development`.
  Production uses the committed `src/migrations/` + `prodMigrations` instead
  (see step 6) — these two modes are intentionally different per Payload's
  own recommended setup, not an inconsistency.
- **Custom domain:** not covered here; can be added later in Vercel's
  **Settings → Domains** whenever the client has one ready.
- **Staging environment:** not set up — Vercel's preview deployments (one per
  branch/PR) already give a lightweight staging equivalent if needed later.
