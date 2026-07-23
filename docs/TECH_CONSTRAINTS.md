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

Payload CMS and PostgreSQL are deferred until design approval.

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
src/
├── app/
│   ├── page.tsx
│   ├── collections/
│   ├── selection/
│   ├── articles/
│   └── about/
├── components/
│   ├── layout/
│   ├── sections/
│   ├── cards/
│   ├── quiz/
│   └── ui/
├── data/
│   └── demo-content.ts
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
