# Cursor Agent Skills

This directory contains project-specific skills for the design and implementation agent.

## Available skills

1. `design-exploration` — propose differentiated visual directions before implementation.
2. `approval-workflow` — enforce explicit owner approval for major decisions.
3. `ui-implementation` — implement an approved design in Next.js and Tailwind.
4. `responsive-design` — maintain mobile-first responsive behavior.
5. `ukrainian-ux-writing` — keep all public copy natural and consistently Ukrainian.
6. `affiliate-compliance` — preserve the independent affiliate-site model.
7. `design-system` — create consistent tokens and reusable components.
8. `quality-review` — review approved work before the next stage.

## Recommended use order

For a new design task:

1. approval-workflow
2. design-exploration
3. Ukrainian UX writing
4. affiliate compliance
5. wait for approval
6. design system
7. UI implementation
8. responsive design
9. quality review

## Global rule

A skill never overrides the approval workflow.

When two skills conflict, choose the behavior that:

1. preserves explicit approval;
2. avoids scope expansion;
3. preserves Ukrainian public UI;
4. preserves affiliate compliance;
5. avoids unapproved technical changes.
