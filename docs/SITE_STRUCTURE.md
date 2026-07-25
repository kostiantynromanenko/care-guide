# Site Structure

## Primary navigation

- Головна
- Підібрати догляд
- Добірки
- Плани
- Корисне
- Про проєкт

Primary navigation action:

- Підібрати догляд

## Pages

### 1. Home `/`

Sections:

1. Header
2. Hero
3. How it works (compact strip — approved 2026-07-25 composition pass:
   moved up from position 5 since it's a short onboarding explainer, not
   another content catalog, so it reads better right after the hero)
4. Need selection
5. Featured routines (capped to 3 of 5, "see all" link to /routines)
6. Featured collections
7. Helpful articles (capped to 3 of 5, "see all" link to /articles)
8. Independent-site and affiliate notice
9. Footer

### 2. Care selector `/selection`

A short multi-step questionnaire.

Possible inputs:

- area: face, hair, body;
- skin or hair type;
- primary concern;
- sensitivity;
- preferred routine size;
- approximate budget.

The result should lead to one or more existing collections or routines.

For the design prototype, use deterministic demo results. Do not implement AI recommendations.

A recommendation bot has been raised as a possible future idea — see
"Future considerations" in `docs/PROJECT_CONTEXT.md`. It is not approved and
does not change this rule until it goes through its own approval process.

### 3. Collections `/collections`

A catalog of solutions, not a product catalog.

Filters may include:

- area;
- skin type;
- concern;
- routine size;
- time of use;
- budget.

### 4. Collection details `/collections/[slug]`

Sections:

1. title and summary;
2. suitable-for tags;
3. expected routine size;
4. morning steps;
5. evening steps;
6. recommended products;
7. usage notes;
8. related collections;
9. affiliate disclosure.

### 5. Routines `/routines`

Public-facing Ukrainian label: "Плани" / "Плани догляду" (changed from "Схеми"
on 2026-07-25 — user feedback: the word read as unclear/too abstract).

Routine examples:

- basic morning routine;
- basic evening routine;
- minimal three-step routine;
- weekly additional care;
- hair recovery routine.

### 6. Routine details `/routines/[slug]`

Use a visually clear sequence:

Step 1 → Step 2 → Step 3 → Step 4

Each step may reference one or more products.

### 7. Products `/products`

Optional in the first public navigation.

It may exist as an internal content route and as linked product detail pages.

It must not look like a full online shop.

### 8. Product details `/products/[slug]`

Sections:

- product image;
- simple explanation;
- role in a routine;
- suitable-for tags;
- usage;
- warnings;
- related routines;
- external affiliate CTA.

### 9. Articles `/articles`

Educational content.

Examples:

- Як визначити тип шкіри
- У якому порядку наносити засоби
- Як скласти мінімальний догляд
- Для чого потрібен SPF
- Як вводити активні компоненти

### 10. Article details `/articles/[slug]`

Should prioritize readability and internal links to useful collections.

### 11. About `/about`

Keep it project-centered, not personality-centered.

Explain:

- why the project exists;
- how recommendations are structured;
- that it is not an online store;
- that some links are affiliate links;
- that content is not medical advice.

### 12. Legal pages

- `/privacy`
- `/cookies`
- `/affiliate-disclosure`
- `/terms`

## MVP page set for the first design prototype

Create only:

- Home
- Collections list
- One collection detail
- Care selector
- One article detail
- About
- Shared header and footer

Do not design every possible page before the first direction is approved.
