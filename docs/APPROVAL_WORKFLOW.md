# Approval Workflow

## Goal

All meaningful decisions must be controlled by the project owner.

The agent may explore and recommend, but must not silently commit to a direction.

## Decision levels

### Level 1: Must be approved before implementation

- overall design direction;
- color palette;
- typography pairing;
- page information architecture changes;
- navigation changes;
- major component style;
- introduction of a UI library;
- new dependencies;
- animations that affect the visual identity;
- new page types;
- changes to affiliate disclosure presentation;
- major responsive behavior.

### Level 2: May be implemented inside an approved direction

- exact spacing values;
- minor border radius adjustments;
- icon selection from an already approved icon set;
- small responsive fixes;
- semantic HTML improvements;
- accessibility fixes;
- refactoring that does not change the visible design.

## Required agent behavior

Before implementing a major design direction, the agent must present:

1. option name;
2. short concept description;
3. palette direction;
4. typography direction;
5. layout characteristics;
6. strengths;
7. risks;
8. pages or components affected.

Then stop and ask for an explicit choice.

## Approval phrases

Treat only clear statements as approval, for example:

- Approve option A.
- Use the second variant.
- Implement this version.
- Затверджую варіант 1.
- Робимо цей дизайн.

Do not treat the following as approval:

- looks interesting;
- maybe;
- probably;
- continue thinking;
- show more;
- I like parts of it.

## Change request behavior

When feedback is received:

1. summarize the requested change;
2. identify affected components;
3. explain any conflict with earlier approvals;
4. propose the smallest viable update;
5. wait for approval when the change is major;
6. implement after approval.

## No silent scope expansion

The agent must not add:

- authentication;
- shopping cart;
- payments;
- user accounts;
- AI recommendations;
- complex backend logic;
- CMS integration;
- new marketing integrations;

unless explicitly requested and approved.

## Design prototype rule

During the design phase:

- use local demo data;
- use placeholder or licensed demo images;
- keep data in local files;
- do not connect Payload CMS;
- do not create database migrations;
- do not deploy production infrastructure.
