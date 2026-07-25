# Project Context

## Product idea

The website helps users choose cosmetics and build understandable care routines.

It is not an online store. It does not accept payments, manage orders, or provide delivery.

The main user flow is:

1. A visitor identifies a need.
2. The website shows a suitable collection, routine, or article.
3. The visitor reviews recommended products.
4. The visitor follows an affiliate link to the official seller's website.

## Business model

The website uses affiliate links to the official Hillary website.

The public website must not imitate the official Hillary store or create the impression that it is an official brand website.

The website should provide independent value through:

- curated collections;
- care routines;
- simple explanations;
- product usage guidance;
- educational articles;
- a lightweight care-selection questionnaire.

### Decision: redirect-out affiliate model, not a dropship "own shop" (confirmed)

HiLLARY's real affiliate program (see `drop.hillary.ua/instructions`, `hillary.ua/drop`) also
offers a dropship-style option: partners can run their own storefront (own site, marketplace
listing, or social media), take orders directly from customers, and manually re-enter each
order on Hillary's site using their own affiliate link, collecting the customer's payment
themselves when it's a prepaid order.

This was evaluated and explicitly **declined** for this project, in favor of staying with the
simple redirect-out model already built:

- HiLLARY pays the same commission (~30–35% per completed order) either way — partners must
  sell at Hillary's own listed price, no markup allowed — so the dropship option adds no
  revenue ceiling that the current model is missing.
- The dropship option requires permanent per-order manual labor (placing every order by hand
  on Hillary's site, collecting/holding customer payment, customer service, absorbing
  cancellation risk to the affiliate account) that doesn't scale with content and was never
  budgeted or scoped for this project.
- It would require rebuilding the site's core premise (no cart, no checkout, no payment
  collection, "not a conventional shop" — see Positioning below and `docs/DESIGN_BRIEF.md`),
  discarding work already built, deployed, and reviewed by the client.

A smaller middle-ground idea — an optional, opt-in "message us if you'd like help ordering"
contact button (Telegram/Instagram/WhatsApp) next to the affiliate CTA on select
products/collections — remains a plausible low-risk follow-up if the client wants to test
whether a personal touch improves conversion, but is **not implemented**: it still requires a
real contact channel/handle from the client, and is a separate decision from the core
business model above.

## Positioning

The project should feel like a useful beauty guidance service or editorial recommendation platform.

It should not feel like:

- a copied online shop;
- a marketplace;
- an official Hillary website;
- a personal influencer landing page;
- a medical consultation service.

## Audience

Primary audience:

- mobile users coming from Instagram, TikTok, recommendations, or search;
- people who want simple cosmetic guidance;
- users who do not want to study large product catalogs;
- users looking for routines by skin type, concern, or budget.

## Tone

The tone should be:

- calm;
- helpful;
- simple;
- non-aggressive;
- trustworthy;
- visually light.

Avoid:

- exaggerated promises;
- medical claims;
- manipulative urgency;
- excessive promotional language;
- fake scarcity;
- hard-sell banners.

## Language

The initial public interface should be Ukrainian.

All demo copy should be written in Ukrainian unless technical labels are internal.

## Primary language

Ukrainian is the primary and default language of the public website.

All user-facing content must be written in Ukrainian, including:

- navigation;
- headings;
- buttons;
- forms;
- validation messages;
- article content;
- collection descriptions;
- product explanations;
- affiliate notices;
- metadata and SEO copy;
- empty states and error messages.

English may be used only for internal technical identifiers, code, file names, and developer-facing comments.

Do not introduce an English-language public interface unless multilingual support is explicitly requested and approved.

## Technical status

Design direction (Variant 5 — Rose Gradient Wellness) is approved and implemented on the
public pages, which are now backed by Payload CMS content (see below) rather than static
local data.

CMS integration (see `docs/TECH_CONSTRAINTS.md`) has been introduced in waves:

- Wave A is done: Payload CMS + PostgreSQL run locally via Docker Compose, with collections
  and globals mirroring the demo content shape, seeded from `demo/demo-content.json`.
- Wave B is done: the public pages in `src/app/(frontend)/` now read from Payload's Local
  API instead of `src/data/demo-content.ts`, so edits made in `/admin` appear on the site on
  the next page load, with no rebuild or restart needed. Pages render dynamically
  (`force-dynamic`) to support this.
- Production hosting is live: Vercel (Next.js app) + a managed Postgres database + Vercel
  Blob for media uploads, seeded with the demo content. See `docs/DEPLOYMENT.md` for the full
  setup procedure. `payload.config.ts` includes the Vercel Blob storage plugin, which falls
  back to local disk storage automatically when `BLOB_READ_WRITE_TOKEN` is unset (i.e. in
  local dev, nothing changes). The client has reviewed it, and Vercel's Deployment Protection
  (Vercel Authentication) has since been turned off, so the production URL is now fully
  public — see `docs/CLIENT_ADMIN_GUIDE.md`.
- Real image uploads (Payload's `Media` collection) are wired into the frontend: collection/
  product cards render the uploaded photo via `next/image` when an editor attaches one, and
  fall back to the decorative placeholder otherwise.
- Real catalog data (from "work with real data" decision): `scripts/import-products.ts`
  imports real HiLLARY product data (title, real photo, real `hillary.ua` product URL,
  vendor code, price/stock — the latter two stored but not displayed, since the feed's
  price/availability isn't reliably fresh) via the public product feed
  (`src/lib/hillary-feed.ts`). It replaced the 6 fictional demo products with real SKUs
  (existing collections needed no changes, since they reference the same slugs), and added 3
  new collections + 10 new products to close the content gap for **oiliness**, **sensitivity**,
  and **dullness** — previously all three fell back to the generic `minimal-daily-care`
  collection in both the `/selection` quiz and the recommendation widget. Product CTAs now
  link to the real product page instead of the placeholder `example.com` URL — still not
  affiliate-tracked, since that requires the client's actual partner `ShortLink` credentials
  (a separate, not-yet-approved follow-up). The import is idempotent (safe to re-run) but is a
  manual/on-demand script, not a scheduled auto-sync.
- Content expansion, "expert complexes" ("Wave E"): per the client's direction to base new
  collections on HiLLARY's own ready-made "Експертні комплекси" bundles rather than inventing
  custom
  categories, this wave imports 12 more real bundle SKUs and adds 6 new collections — 2 face
  (**acne-breakouts-care**, **anti-aging-care**, backed by 2 new Needs: "Акне та висипання",
  "Ознаки старіння"), 2 hair (**hair-loss-control**, **hair-growth-boost**), and 2 in a new
  **body** `CollectionArea` (**anti-cellulite-care**, **foot-care-recovery** — Payload schema +
  migration updated to allow `body` on `Collections.area`). It also enriches 3 existing
  collections (oil-control-combination-skin, calm-sensitive-skin, vitamin-c-glow) with one
  extra bundle step each. The `/selection` quiz was reworked to support a third "Догляд за
  тілом" area and dedicated hair/body concern questions (hardcoded options, since those aren't
  backed by CMS `Need` docs) that route straight to a bundle collection, skipping the
  "how many steps" question that only applies to face routines assembled from individual
  products. Idempotent and re-runnable like the other import scripts.
- Content expansion, more collections ("Wave F"): mines HiLLARY expert-complex categories
  Wave E hadn't used yet — post-acne pigmentation, a second lifting/firming angle on
  anti-aging, puffiness/microcirculation, enlarged pores, SPF, and lip care — adding 14 more
  real products and 6 more collections (**acne-marks-pigmentation-care**,
  **firming-lifting-care**, **anti-puffiness-care**, **pore-care**, **sun-protection-care**,
  **lip-care**, all `area: "face"`), plus 2 enrichment steps on pre-existing collections
  (dry-hair-recovery, anti-cellulite-care). Brings the catalog to 18 collections / 45
  products. Deliberately adds no new Needs, since the homepage `NeedsSection` grid is tuned
  for exactly 6 cards — these 6 are catalog-only (reachable from `/collections` and the
  homepage's featured-collections rotation) rather than `/selection`-quiz options. Because the
  full catalog no longer fits comfortably on the homepage, `CollectionsSection` now shows a
  random 6 of all collections per page load instead of listing every one, with the complete
  set still one click away at `/collections`.
- Real affiliate tracking (2026-07-25): product CTAs (`ProductCard`, the product detail page)
  now wrap `product.sourceUrl` in HiLLARY's partner-program Deeplink format via
  `src/lib/affiliate.ts` — `https://aff.hillary.ua/click?pid=<partner id>&offer_id=<offer>&
  path=<hillary.ua path>` — instead of linking to the plain untracked page. The client
  confirmed the required landing-page sign-off from HiLLARY's partner-program manager is done.
  Controlled by the `HILLARY_AFFILIATE_PID` env var (unset in local dev → falls back to the
  plain URL, so nothing breaks before it's configured in Vercel). See
  `.cursor/skills/affiliate-compliance/SKILL.md` for the confirmed program mechanics this is
  based on.
- Content import scripts consolidated, one script per content type (2026-07-25): Waves D/E/F
  above each bundled a growing set of products together with that wave's own collections into
  its own script, which meant re-running an old wave's whole script just to refresh a product's
  photo. All product mappings across every wave now live in one file
  (`src/lib/import-products.ts`, `scripts/import-products.ts`,
  `/api/import-products`), all collection mappings + enrichments in another
  (`src/lib/import-collections.ts`, `scripts/import-collections.ts`, `/api/import-collections`),
  and the 2 extra Needs in a third (`src/lib/import-needs.ts`, `scripts/import-needs.ts`,
  `/api/import-needs`). This pass also fixed a bug it surfaced: the Wave E/F product lists never
  had the image-download step Wave D had, so 29 of 45 products had no real photo — the unified
  `import-products.ts` downloads a photo for every product now. Run products before collections
  (collections look up products by slug and expect them to already exist).

## Future considerations (not in current scope)

These are recorded owner ideas for later phases. They are **not approved for
implementation** and must go through the normal proposal-and-approval process
(see `docs/APPROVAL_WORKFLOW.md`) before any design or code work begins.

### Recommendation bot

Idea: a bot/assistant that helps a visitor get a personalized recommendation
(collection, routine, or product), existing as a separate interactive helper
alongside (not replacing) the `/selection` questionnaire flow.

Status update: a first, deterministic (non-AI) prototype version has been
approved and implemented as a site-wide floating widget
(`src/components/assistant/AssistantWidget.tsx`), backed by static demo-data
matching logic (`src/lib/assistant-demo-logic.ts`). It only maps a chosen
need to existing demo collections — there is no real recommendation engine,
no free-text input, and no AI/LLM involved.

A real AI-powered version remains explicitly out of scope and would still
directly conflict with two existing project rules unless separately
approved:

- `docs/SITE_STRUCTURE.md` — the care selector "should use deterministic demo
  results. Do not implement AI recommendations."
- `docs/APPROVAL_WORKFLOW.md` — "No silent scope expansion" lists "AI
  recommendations" as something that must not be added "unless explicitly
  requested and approved."

Before a real AI version can move forward, it needs its own dedicated
proposal covering (at minimum):

- a rule-based engine driven by richer CMS data vs. a conversational/
  LLM-based assistant;
- what data/backend it needs (this likely depends on the Payload CMS +
  PostgreSQL phase, since demo-only data is unlikely to be enough for real
  recommendations);
- any new dependency or third-party AI service it would introduce (requires
  approval per `docs/APPROVAL_WORKFLOW.md`);
- cost, privacy, and content-safety implications (avoiding medical claims,
  per the Tone section above).

This should be revisited as its own Level 1 decision, most likely
before/alongside the CMS integration phase — not during the current static
design prototype.
