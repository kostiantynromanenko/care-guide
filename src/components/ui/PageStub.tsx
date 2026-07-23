/**
 * Minimal placeholder for pages that are part of the approved site
 * structure (docs/SITE_STRUCTURE.md) but not yet designed/implemented.
 * Exists only so header/footer navigation never leads to a dead link.
 * Replace with the real page once its design direction is approved
 * (see docs/FIRST_DESIGN_TASK.md, Phase 3).
 */
export function PageStub({ title }: { title: string }) {
  return (
    <main className="max-w-2xl mx-auto px-5 sm:px-8 py-24 sm:py-32 text-center">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">{title}</h1>
      <p className="text-ink/70">
        Ця сторінка ще в розробці. Дизайн і вміст з&apos;являться на наступному
        етапі проєкту.
      </p>
    </main>
  );
}
