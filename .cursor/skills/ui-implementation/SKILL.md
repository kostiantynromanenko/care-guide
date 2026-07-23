# UI Implementation Skill

## Purpose

Use this skill after a design direction has been explicitly approved.

## Fixed stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- local demo content during the design phase

Do not connect Payload CMS or PostgreSQL during design prototyping.

## Implementation principles

- Implement only the approved design.
- Prefer Server Components.
- Use Client Components only for actual interaction.
- Separate content from presentation.
- Keep components reusable but avoid premature abstraction.
- Use semantic HTML.
- Keep all user-facing copy in Ukrainian.
- Preserve accessibility.
- Avoid unapproved dependencies.
- Do not add a UI kit without approval.

## Suggested implementation order

1. shared tokens;
2. layout shell;
3. header;
4. approved page sections;
5. reusable cards;
6. responsive behavior;
7. interaction states;
8. accessibility review;
9. quality review.

## Required checks

- no TypeScript errors;
- no console errors;
- no dead navigation;
- no horizontal overflow;
- root document language is `uk`;
- responsive from 360px upward;
- no fake shopping actions;
- external CTA wording is clear;
- demo content is not embedded repeatedly across components.

## Change discipline

When implementation reveals a design conflict:

1. do not silently redesign;
2. explain the conflict;
3. propose options;
4. wait for approval.

## Completion report

After implementation provide:

- approved option implemented;
- files changed;
- components created;
- responsive behavior;
- assumptions;
- unresolved decisions;
- next approval needed.
