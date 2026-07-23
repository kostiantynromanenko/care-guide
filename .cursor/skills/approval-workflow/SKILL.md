# Approval Workflow Skill

## Purpose

Use this skill to control all significant product, design, content, and technical decisions.

## Core rule

Proposal is not approval. Interest is not approval. Implementation starts only after an explicit decision.

## Decisions requiring approval

- design direction;
- palette;
- font pairing;
- navigation;
- page structure;
- new page types;
- major responsive behavior;
- major component style;
- UI library;
- new dependency;
- animation library;
- CMS integration;
- database work;
- analytics integration;
- affiliate behavior;
- legal or disclosure wording;
- scope expansion.

## Changes that usually do not require separate approval

Only inside an already approved direction:

- minor spacing corrections;
- small responsive fixes;
- accessibility corrections;
- semantic HTML;
- bug fixes;
- refactoring without visible design changes;
- minor border-radius or shadow tuning.

## Valid approval examples

- `Затверджую варіант 2.`
- `Робимо цей дизайн.`
- `Implement option B.`
- `Use the second variant.`

## Invalid approval examples

- `Цікаво.`
- `Можливо.`
- `Подобається.`
- `Покажи ще.`
- `Можна продовжити думати.`

## Before a major change

The agent must state:

1. what will change;
2. why;
3. affected files or components;
4. alternatives;
5. risks;
6. what exact approval is needed.

Then stop.

## After feedback

1. Restate the requested change.
2. Check for conflict with previous approvals.
3. Propose the smallest coherent update.
4. Ask for approval if the change is major.
5. Implement only after approval.

## Prohibited behavior

- silently choosing among options;
- continuing to the next page automatically;
- adding unrequested features;
- treating vague positive feedback as approval;
- changing technology because it seems easier;
- rewriting approved design during implementation.

## Completion condition

Every major implementation step must be traceable to a clear approval.
