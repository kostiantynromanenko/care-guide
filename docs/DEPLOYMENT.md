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
2. Once created, Vercel automatically injects a `DATABASE_URL`-style
   connection string as a project environment variable.
3. Rename/duplicate it so Payload can read it: in **Settings → Environment
   Variables**, add `DATABASE_URI` with the same value as the generated
   Postgres connection string (Payload's config reads `DATABASE_URI`, not
   `DATABASE_URL` — see `payload.config.ts`).

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

`DATABASE_URI` and `BLOB_READ_WRITE_TOKEN` should already be present from
steps 3–4.

## 6. Deploy

Click **Deploy**. Vercel builds and deploys the app. The database starts
empty — Payload will create its schema automatically on first boot
(`push: true` behavior in dev; production migrations are covered below).

## 7. Seed initial content

The production database starts empty. To load the same demo content used
locally:

1. Pull the production env vars locally: `vercel env pull .env.production.local`
   (requires the Vercel CLI: `npx vercel login` then `npx vercel link` once).
2. Run the seed script against production:
   `npx dotenv -e .env.production.local -- npm run seed`
   (or temporarily copy `DATABASE_URI`/`PAYLOAD_SECRET` from
   `.env.production.local` into your shell environment and run `npm run seed`
   directly).
3. Verify at `https://<your-project>.vercel.app/admin` that content and the
   admin user exist, then log in and change the seeded admin password
   immediately (see `docs/CLIENT_ADMIN_GUIDE.md` for the seeded credentials —
   those are dev-only and must not stay in place in production).

## 8. Give the client access

Once verified, share the production URL and an updated version of
`docs/CLIENT_ADMIN_GUIDE.md` (swap the `localhost:3000` references for the
real production URL) so the client can log into `/admin` from her own
device — the local-only limitation described in that guide no longer
applies once this deployment is live.

## Notes / things intentionally out of scope here

- **Migrations:** Payload's Postgres adapter can run in `push` mode (auto-sync
  schema, used locally) or with explicit migration files. This guide assumes
  `push` mode for now, matching local dev. Moving to explicit migrations is a
  separate future improvement once the schema stabilizes — not required for
  first launch.
- **Custom domain:** not covered here; can be added later in Vercel's
  **Settings → Domains** whenever the client has one ready.
- **Staging environment:** not set up — Vercel's preview deployments (one per
  branch/PR) already give a lightweight staging equivalent if needed later.
