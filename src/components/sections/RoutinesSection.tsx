import Link from "next/link";
import { RoutineCard } from "@/components/cards/RoutineCard";
import { getAllRoutines } from "@/lib/collections";

/**
 * "Featured routines" homepage section (docs/SITE_STRUCTURE.md §1) — mirrors
 * CollectionsSection/ArticlesSection's heading + "see all" link pattern for
 * visual consistency, with no extra CTA button (avoids stacking multiple
 * "Підібрати догляд"-style buttons on one page).
 */
export async function RoutinesSection() {
  const routines = await getAllRoutines();

  if (routines.length === 0) return null;

  return (
    <section
      className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16"
      aria-labelledby="routines-heading"
    >
      <div className="flex items-center justify-between mb-7">
        <h2 id="routines-heading" className="text-xl sm:text-2xl font-bold">
          Схеми
        </h2>
        <Link
          href="/routines"
          className="text-sm font-semibold text-cta-strong hover:text-ink transition-colors rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
        >
          Усі схеми →
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
        {routines.map((routine) => (
          <RoutineCard key={routine.slug} routine={routine} />
        ))}
      </div>
    </section>
  );
}
