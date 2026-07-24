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

## Medical and cosmetic claims

- Avoid diagnostic language.
- Avoid guarantees.
- Avoid claims of treatment or cure.
- Prefer usage guidance and cosmetic-purpose explanations.
- Flag uncertain claims.

## Approval boundary

Any new affiliate tracking behavior, redirect system, pricing display, official-brand visual element, or disclosure wording requires approval.
