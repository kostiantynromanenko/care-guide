# Quality Review Skill

## Purpose

Use this skill after each approved implementation step.

## Review areas

### Approval compliance

- Was only approved scope implemented?
- Were any major decisions introduced silently?
- Does the result match the approved option?

### Visual consistency

- tokens are used consistently;
- cards follow the same system;
- button hierarchy is clear;
- typography is coherent;
- spacing is intentional.

### Responsive behavior

- 360px to 1440px reviewed;
- no horizontal overflow;
- Ukrainian text wraps correctly;
- mobile navigation works;
- images crop correctly.

### Accessibility

- semantic HTML;
- heading hierarchy;
- keyboard navigation;
- visible focus;
- contrast;
- alt text;
- labels;
- reduced motion;
- tap target size.

### Technical quality

- no TypeScript errors;
- no console errors;
- no dead imports;
- no duplicated demo data;
- no dead links;
- no unapproved dependencies;
- server/client component boundaries are reasonable.

### Language

- Ukrainian public UI;
- no accidental English;
- natural wording;
- consistent terminology;
- Ukrainian metadata and validation.

### Affiliate compliance

- no cart or checkout;
- external CTA is clear;
- disclosure is present where required;
- no official-site imitation;
- no unsupported claims.

## Required report format

```text
## Пройдено

- ...

## Знайдені проблеми

- ...

## Запропоновані виправлення

- ...

## Потребує approval

- ...
```

## Fixing behavior

- Fix small bugs and accessibility issues inside the approved design.
- Do not fix major design issues by silently redesigning.
- Present major corrections for approval first.

## Completion condition

The implementation is ready for the next approval only when critical errors are resolved or clearly reported.
