# Care Guide

Care Guide is an independent cosmetics guidance website. It helps a visitor go
from "I have this skin/hair concern" to a clear, curated collection or care
routine — without acting like an online store. The site doesn't take
payments, manage orders, or handle delivery; product links point out to the
official seller's website.

The public site is Ukrainian-first: all visitor-facing copy, navigation, and
metadata are in Ukrainian by default.

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- [Payload CMS](https://payloadcms.com/) 3, embedded directly in the Next.js app
- PostgreSQL (via Payload's Postgres adapter)
- [Tailwind CSS](https://tailwindcss.com/) v4

## Getting started

### Prerequisites

- Node.js 20+
- Docker (for a local PostgreSQL instance)

### Setup

```bash
npm install
cp .env.example .env.local   # then fill in PAYLOAD_SECRET with any long random string
docker compose up -d         # starts local Postgres on port 5433
npm run seed                 # loads demo content from demo/demo-content.json
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000), and the
Payload admin panel at [http://localhost:3000/admin](http://localhost:3000/admin).
See `docs/CLIENT_ADMIN_GUIDE.md` for admin login details and a walkthrough of
what's editable there.

### Available scripts

| Script                  | Description                                              |
| ------------------------ | --------------------------------------------------------- |
| `npm run dev`            | Start the Next.js dev server                              |
| `npm run build`          | Production build                                          |
| `npm run start`          | Run a production build locally                            |
| `npm run lint`           | Run ESLint                                                 |
| `npm run seed`           | Load `demo/demo-content.json` into Postgres via Payload    |
| `npm run generate:types` | Regenerate `src/payload-types.ts` from the Payload config  |

## Project structure

```text
payload.config.ts        # Payload CMS configuration (collections, globals, plugins)
docker-compose.yml        # Local PostgreSQL for development
scripts/seed.ts            # Seeds the database from demo/demo-content.json
demo/demo-content.json     # Source demo content (site copy, needs, collections, products, articles)
src/
├── app/
│   ├── (frontend)/         # The public site (pages, layout)
│   └── (payload)/          # Payload admin UI + REST/GraphQL API routes
├── collections/            # Payload collection configs (Needs, Products, Collections, Articles, Media, Users)
├── globals/                # Payload global configs (SiteSettings, Notices, HowItWorks)
├── components/             # UI components (layout, sections, cards, quiz, assistant, ui)
├── lib/                    # Data-fetching helpers, Payload client, mapping logic
└── types/                  # Shared content types
```

Public pages read content from Payload's Local API (through `src/lib/`)
rather than from `demo/demo-content.json` directly — the JSON file is only
used as the one-time seed source for local development.

## Deployment

The app deploys to Vercel with a managed Postgres database and Vercel Blob
for media uploads. See `docs/DEPLOYMENT.md` for the full setup procedure.

## Documentation

- `docs/PROJECT_CONTEXT.md` — product idea, business model, audience, tone, and current technical status
- `docs/DESIGN_BRIEF.md` — approved visual direction and design constraints
- `docs/SITE_STRUCTURE.md` — page inventory and navigation
- `docs/APPROVAL_WORKFLOW.md` — how design/scope decisions are proposed and approved on this project
- `docs/TECH_CONSTRAINTS.md` — stack, implementation rules, and CMS integration history
- `docs/DEPLOYMENT.md` — production hosting setup (Vercel + Postgres + Blob storage)
- `docs/CLIENT_ADMIN_GUIDE.md` — how to use the Payload admin panel to edit site content
- `docs/FIRST_DESIGN_TASK.md` — the original design-exploration brief (historical record)

## Language

Ukrainian is the default and only language of the public interface. English
is used solely for code, file names, and developer-facing comments — see
`docs/TECH_CONSTRAINTS.md` for the full language policy.
