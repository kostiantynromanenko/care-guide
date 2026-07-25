# Design Brief

## Design objective

Create a clean mobile-first website that makes cosmetic selection feel easy.

The design should guide the user from a need to a recommendation without looking like a traditional product catalog.

## Core visual direction

Preferred qualities:

- editorial beauty aesthetic;
- warm and clean;
- spacious layouts;
- soft visual hierarchy;
- clear content cards;
- large readable typography;
- subtle rounded corners;
- restrained shadows;
- natural product and texture imagery;
- calm motion.

Avoid:

- copying Hillary's visual identity;
- excessive pink;
- generic marketplace layouts;
- dense grids;
- large discount badges;
- aggressive gradients;
- overly luxurious black-and-gold styling;
- overly playful teenage styling;
- dashboard-like UI.

## Suggested base palette

The agent may propose alternatives, but should begin around:

- warm white background;
- soft beige or sand surfaces;
- muted sage, terracotta, dusty rose, or lavender accent;
- dark neutral text;
- low-contrast borders.

Do not finalize the palette without approval.

## Generated imagery style (approved 2026-07-25)

For hero art and thematic section imagery (e.g. need/concern illustrations),
use this style consistently rather than re-deriving it each time:

- soft watercolor/gouache illustration — painterly brushwork with visible
  paper-grain texture, not photographic realism, not flat vector icons;
- one clear, simple iconic subject per image (e.g. a droplet, a leaf, a
  petal, a citrus slice) rather than an abstract-only composition, except
  for full-bleed backgrounds like the hero where soft abstract color-field
  blobs are appropriate;
- strictly pink tones — pale near-white blush through to a deeper dusty
  rose, with no competing hues (no peach, lavender, purple, gold, blue);
  a subject's own natural color (e.g. a leaf's green, a citrus's
  orange-pink) is fine as a small accent against the pink backdrop;
- generous soft/light space left where text or a headline will sit, so
  contrast stays reliable without adding an overlay panel;
- no text, no people/faces, no product bottles, no glitter, no harsh
  photographic shadows.

This intentionally supersedes "avoid excessive pink" above for this
specific generated-imagery use case (approved directly by the client after
trying multi-color and single-photo-realistic alternatives) — the rest of
the UI (surfaces, text, borders) should still avoid leaning on pink as
its dominant color.

When adding new generated images (new need/concern, new hero variant,
etc.), always save them under a new versioned filename (e.g. `-v5`,
`-v6`) rather than overwriting an existing file at the same path — the
Next.js image optimizer and browsers cache by URL, so reusing a filename
after changing the image content will often keep serving the old bytes.

## Typography

Use a clear sans-serif for body text.

A restrained editorial serif may be proposed for selected headings, but it must not reduce readability or feel overly decorative.

Do not finalize font pairing without approval.

## Important components

Design variants should include:

- header;
- hero;
- need-selection cards;
- routine cards;
- collection cards;
- product recommendation cards;
- article cards;
- routine stepper;
- questionnaire preview;
- affiliate CTA;
- informational notice;
- footer.

## Product cards

A product card is not a shopping card.

It should show:

- image;
- product name;
- role in the routine;
- brief explanation;
- compatibility tags;
- link to official website.

It should not show:

- add to cart;
- quantity selector;
- checkout action;
- fake inventory;
- fixed price unless the source is reliably synchronized.

Recommended CTA wording:

- Купити на офіційному сайті (approved 2026-07-25 — more direct than "Переглянути,"
  still unambiguous that the purchase happens on the seller's site, not this one)
- Переглянути на офіційному сайті
- Дізнатися актуальну ціну
- Перейти до товару

## Responsive priority

Design mobile first.

Expected traffic is primarily mobile.

The desktop version should expand the same information architecture rather than introduce a completely different experience.

## Accessibility baseline

- sufficient text contrast;
- visible keyboard focus;
- buttons at least comfortably tappable;
- semantic heading hierarchy;
- no information communicated by color alone;
- reduced-motion friendly interactions;
- clear external-link behavior.
