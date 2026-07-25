# Affiliate Compliance Skill

## Purpose

Use this skill whenever the design or content relates to products, affiliate links, brand references, pricing, ordering, or disclosures.

## Product model

The website is an independent recommendation and guidance resource.

It does not:

- sell products directly;
- accept payment;
- manage orders;
- provide delivery;
- maintain a cart;
- act as the official Hillary website.

## Required behavior

- Product actions must clearly lead to the official seller website.
- Affiliate links must be disclosed.
- Current price and availability must be checked on the seller website.
- The design must not imitate the official Hillary store.
- The website name and domain must remain independent.
- Do not create fake stock, discounts, countdowns, or urgency.
- Do not claim that checkout happens on this website.
- Do not use real affiliate URLs unless supplied and approved.

## Recommended CTA wording

- `Купити на офіційному сайті` (approved 2026-07-25 — pairs a direct verb with an
  explicit location, so it stays compliant with "do not claim checkout happens on
  this website" while being more action-oriented than "Переглянути")
- `Переглянути на офіційному сайті`
- `Дізнатися актуальну ціну`
- `Перейти до товару`

## Required notices

The prototype should support notices equivalent to:

- this is an independent information resource;
- some links are affiliate links;
- ordering, payment, and delivery happen on the official seller website.

Final wording must be approved before production use.

## Brand rules

- Do not suggest official affiliation.
- Do not copy the official website's branding.
- Do not use Hillary as the project's own brand identity.
- Flag any brand name, logo, domain, ad, metadata, or SEO use that may require company approval.

## Confirmed HiLLARY partner-program rules (from `drop.hillary.ua/instructions`)

Verified directly against the program's own FAQ — treat these as hard constraints, not
guesses, once real affiliate integration is approved:

- Never use "hillary" (or "gregory mill" / "wishlist") in the site's domain name.
- Never use brand keywords in SEO `keywords` meta tags, page copy meant for SEO, or in paid
  search campaigns (including automated/"smart" Google Ads campaigns, which must explicitly
  exclude brand terms) — orders attributed to branded-keyword ads are not paid out.
- Custom landing/prelanding pages (which is what this whole site effectively is) are allowed,
  but require prior sign-off from a HiLLARY partner-program manager — separate from this
  project's own internal approval workflow. Flag this to the client before real affiliate
  links go live.
- If promoting via Instagram/TikTok: the account name must not contain the brand name, and
  must not copy the official profile photo.
- HiLLARY provides an automated product data feed (descriptions, photos, pricing, stock
  status) partners can import — a plausible future alternative to manual content entry in
  Payload once real integration is approved, instead of a compliance concern.
- The program also offers a dropship/"own shop" option (own storefront, manual order
  re-entry, no markup allowed — same commission either way). This was evaluated and declined
  for this project; see `docs/PROJECT_CONTEXT.md` → "Decision: redirect-out affiliate model,
  not a dropship 'own shop'" for the full reasoning. Do not build cart/checkout/payment-
  collection features based on this program detail without a fresh, separate approval.

### Confirmed partner-link mechanics (from `drop.hillary.ua/instructions` and `/link`)

- It's a CPA (cost-per-action) program: payout is a % (~30–35%) of each completed order placed
  through your link, not a flat click fee. Paid weekly, 1000₴ minimum payout, 5000₴+/week
  requires a registered business account (ФОП).
- Two link types, both generated from the partner dashboard (not documented as a public URL
  formula — needs an actual generated example to see the structure):
  - **ShortLink**: generated per "offer" (e.g. the HiLLARY cosmetics offer), points at the
    offer's site **homepage** only.
  - **Deeplink**: same tracking/attribution, but can target *any specific page* on the
    advertiser's site (a category or an individual product) — this is what per-product CTAs on
    this site need, not the homepage ShortLink.
- Optional `sub1`/`sub2`-style sub-account parameters can be attached when generating a link,
  for granular stats (e.g. per-collection or per-need attribution) — visible later in the
  dashboard's "Статистика" by sub-account.
- Generated links don't expire or need regenerating; generate once, reuse indefinitely.
- Orders placed through the link appear in the partner dashboard under
  "Статистика → Конверсії" within ~10 minutes; if a known order doesn't show up, contact the
  program manager with the order number.
- A promo-code alternative to link-based tracking also exists (customer enters a personal
  discount code at checkout) — mainly used for blogger/UGC collaborations, not relevant to
  this site's redirect-out CTA model.
- Practical implication for this codebase: real integration means replacing
  `Product.sourceUrl` (or wrapping it) with a Deeplink per product, not the homepage
  ShortLink — and that URL/ID material is a secret (treat like `PAYLOAD_SECRET`: env var, not
  committed to git), since it's tied to the client's real payout account.

## Medical and cosmetic claims

- Avoid diagnostic language.
- Avoid guarantees.
- Avoid claims of treatment or cure.
- Prefer usage guidance and cosmetic-purpose explanations.
- Flag uncertain claims.

## Approval boundary

Any new affiliate tracking behavior, redirect system, pricing display, official-brand visual element, or disclosure wording requires approval.
