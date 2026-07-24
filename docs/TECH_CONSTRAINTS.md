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

Production Postgres hosting and deployment remain a separate Level 1 decision
(see `docs/APPROVAL_WORKFLOW.md`) and are not addressed by Waves A or B.

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
└── seed.ts                 # migrates demo/demo-content.json into Postgres (Wave A)
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

## Language requirements

- Ukrainian is the default and primary site language.
- Set the root document language to `uk`.
- All visible prototype content must be Ukrainian.
- All accessibility labels and validation messages must be Ukrainian.
- SEO titles and descriptions must be Ukrainian.
- Technical identifiers in code may remain English.
- Do not add a language switcher or multilingual routing without explicit approval.
