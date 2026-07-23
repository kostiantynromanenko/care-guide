# Cursor Design Pack

This package gives a Cursor AI agent enough context to create design variants for a cosmetics recommendation website.

## Project status

The technology choice is fixed:

- Next.js
- Payload CMS
- PostgreSQL
- TypeScript
- Tailwind CSS

The public website's primary and default language is Ukrainian.

The current task is **design prototyping only**. Use demo content and local mock data. Do not implement Payload CMS or PostgreSQL until the design direction is approved.

## Start here

1. Read `.cursor/rules/design-agent.mdc`.
2. Read `docs/PROJECT_CONTEXT.md`.
3. Read `docs/DESIGN_BRIEF.md`.
4. Read `docs/SITE_STRUCTURE.md`.
5. Read `docs/APPROVAL_WORKFLOW.md`.
6. Use the content from `demo/demo-content.json`.
7. Follow the task in `docs/FIRST_DESIGN_TASK.md`.

## Main principle

The agent must not make major product, structure, visual, or technical decisions silently.

It must:

1. propose options;
2. explain key differences;
3. wait for explicit approval;
4. implement only the approved option;
5. stop again before the next major decision.

Small implementation details may be resolved independently when they do not change the approved design.

## Agent skills

Project-specific Cursor skills are stored in `.cursor/skills/`.

Read `.cursor/skills/README.md` before starting design or implementation work.
