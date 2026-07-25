import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { RoutineCard } from "@/components/cards/RoutineCard";
import { getAllRoutines } from "@/lib/collections";

const HOMEPAGE_PREVIEW_COUNT = 3;

/**
 * "Featured routines" homepage section (docs/SITE_STRUCTURE.md §1) — mirrors
 * CollectionsSection/ArticlesSection's heading + "see all" link pattern for
 * visual consistency, with no extra CTA button (avoids stacking multiple
 * "Підібрати догляд"-style buttons on one page).
 *
 * Capped to 3 of the 5 real routines on the homepage (full list still lives
 * at /routines): with 5 items a 3-column grid leaves a dangling half-empty
 * row. A horizontal scroll-snap row on mobile keeps the section compact
 * instead of a tall single-column stack.
 */
export async function RoutinesSection() {
  const routines = (await getAllRoutines()).slice(0, HOMEPAGE_PREVIEW_COUNT);

  if (routines.length === 0) return null;

  return (
    <Section tinted aria-labelledby="routines-heading">
      <div className="flex items-center justify-between mb-7">
        <h2 id="routines-heading" className="text-xl sm:text-2xl font-bold">
          Плани догляду
        </h2>
        <Link
          href="/routines"
          className="text-sm font-semibold text-cta-strong hover:text-ink transition-colors rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
        >
          Усі плани →
        </Link>
      </div>
      <ul className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0">
        {routines.map((routine) => (
          <li key={routine.slug} className="snap-start shrink-0 w-[80%] sm:w-auto">
            <RoutineCard routine={routine} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
