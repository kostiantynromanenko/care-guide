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
