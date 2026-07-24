# Technical Constraints

## Fixed future stack

- Next.js
- Payload CMS
- PostgreSQL
- TypeScript
- Tailwind CSS

## Current design-prototype stack

Use:

- Next.js App Router;
- TypeScript;
- Tailwind CSS;
- local demo data;
- local images or placeholders;
- simple reusable components.

## CMS integration status

Design direction (Variant 5) is approved. CMS integration has been introduced in waves:

- **Wave A (done):** Payload CMS + PostgreSQL run locally (via Docker Compose) alongside the
  Next.js app. Collections/globals mirror `src/types/content.ts`, and `demo/demo-content.json`
  has been migrated into Postgres via `scripts/seed.ts` as a one-time seed. This is local-dev
  only — no production hosting has been set up.
- **Wave B (done):** the public pages/components in `src/app/(frontend)/` now fetch content via
  Payload's Local API (through `src/lib/collections.ts` and `src/lib/site-content.ts`, with
  `src/lib/payload-mappers.ts` translating Payload's generated types into the existing
  `src/types/content.ts` shapes) instead of importing `src/data/demo-content.ts` directly.
  The `(frontend)` route group renders dynamically (`export const dynamic = "force-dynamic"`)
  so admin edits are visible on the next request, with no rebuild or dev-server restart.
  `src/data/demo-content.ts` / `demo/demo-content.json` are no longer read by the running app;
  they remain in the repo only as the seed source for `scripts/seed.ts`.

- **Wave C (done):** production hosting. Vercel (Next.js app) + a managed Postgres database
  (via Vercel's Storage marketplace, e.g. Neon) + Vercel Blob for media uploads.
  `payload.config.ts` includes `@payloadcms/storage-vercel-blob`, which automatically falls
  back to local disk storage when `BLOB_READ_WRITE_TOKEN` is unset, so local dev is
  unaffected. Production uses committed migrations (`src/migrations/`, wired via
  `prodMigrations`) instead of local dev's `push` mode, since Payload only auto-syncs schema
  when `NODE_ENV !== "production"`. See `docs/DEPLOYMENT.md` for the full setup procedure.
  Deployment Protection has since been turned off, so production is publicly reachable.
- **Wave D (done):** real catalog data. `src/lib/hillary-feed.ts` fetches/parses HiLLARY's
  public YML product feed; `scripts/import-hillary-catalog.ts` maps selected real SKUs onto
  our `Products`/`Collections` slugs (idempotent, re-runnable) — see
  `docs/PROJECT_CONTEXT.md` § Technical status for the full reasoning. `Products` gained
  `sourceUrl`/`vendorCode`/`price`/`inStock` fields; only `sourceUrl` is currently used
  (as the real outbound CTA link), the rest are stored for future use since the feed's
  price/availability data isn't reliably fresh.

## Implementation rules

- Prefer server components by default.
- Use client components only for actual interaction.
- Keep components small and reusable.
- Keep content separate from presentation.
- Avoid premature abstractions.
- Avoid adding a component library without approval.
- Avoid adding state management libraries for simple local state.
- Avoid animation libraries unless approved.
- Keep the prototype easy to replace or extend.

## Suggested folders

```text
payload.config.ts          # Payload config (root, required by Payload)
docker-compose.yml          # local Postgres for Payload
scripts/
├── seed.ts                  # migrates demo/demo-content.json into Postgres (Wave A)
└── import-hillary-catalog.ts # imports real HiLLARY catalog data (Wave D)
src/
├── app/
│   ├── (frontend)/          # the public site — reads from Payload as of Wave B
│   │   ├── page.tsx
│   │   ├── collections/
│   │   ├── selection/
│   │   ├── articles/
│   │   └── about/
│   └── (payload)/           # Payload admin UI + REST/GraphQL API routes
│       ├── admin/
│       └── api/
├── collections/             # Payload collection configs (Needs, Products, Collections, Articles, Media, Users)
├── globals/                 # Payload global configs (SiteSettings, Notices, HowItWorks)
├── migrations/              # Production schema migrations (Wave C) — regenerate with `npx payload migrate:create`
├── components/
│   ├── layout/
│   ├── sections/
│   ├── cards/
│   ├── quiz/
│   └── ui/
├── data/
│   └── demo-content.ts      # legacy — no longer read by the app since Wave B
├── lib/
├── styles/
└── types/
```

## Quality requirements

- mobile-first;
- semantic HTML;
- accessible focus states;
- responsive from 360px upward;
- no horizontal overflow;
- reasonable image optimization;
- no TypeScript errors;
- no console errors;
- no dead navigation;
- no fake checkout behavior.

## Affiliate behavior in prototype

All external product CTAs should point to a placeholder URL constant.

Example:

```ts
export const DEMO_AFFILIATE_URL = "https://example.com/official-product";
```

Do not use real affiliate links in the prototype repository unless the owner explicitly supplies and approves them.

Exception (Wave D): products imported by `scripts/import-hillary-catalog.ts` link to their
real `hillary.ua` product page (`product.sourceUrl`) instead of the placeholder — this is a
real, working URL, but still **not** affiliate-tracked (no partner `ShortLink`), since that
requires the client's own affiliate credentials. `ProductCard` falls back to
`DEMO_AFFILIATE_URL` for any product without a `sourceUrl`.

## Language requirements

- Ukrainian is the default and primary site language.
- Set the root document language to `uk`.
- All visible prototype content must be Ukrainian.
- All accessibility labels and validation messages must be Ukrainian.
- SEO titles and descriptions must be Ukrainian.
- Technical identifiers in code may remain English.
- Do not add a language switcher or multilingual routing without explicit approval.
