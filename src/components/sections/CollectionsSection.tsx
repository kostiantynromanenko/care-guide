import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { getAllCollections } from "@/lib/collections";
import type { Collection } from "@/types/content";

const HOMEPAGE_FEATURED_COUNT = 6;

/**
 * With a large catalog of real collections, showing all of them on the
 * homepage makes the page too long — a random subset is featured instead
 * (the full set is always one click away via "Переглянути всі"). Re-rolled
 * on every request since pages already render dynamically
 * (`force-dynamic`), so each visit surfaces a different slice of the
 * catalog rather than always the same static set.
 */
function pickRandom<T>(items: T[], count: number): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export async function CollectionsSection() {
  const allCollections = await getAllCollections();
  const collections: Collection[] = pickRandom(allCollections, HOMEPAGE_FEATURED_COUNT);

  return (
    <Section aria-labelledby="collections-heading">
      <div className="flex items-center justify-between mb-7">
        <h2 id="collections-heading" className="text-xl sm:text-2xl font-bold">
          Добірки
        </h2>
        <Link
          href="/collections"
          className="text-sm font-semibold text-cta-strong hover:text-ink transition-colors rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
        >
          Переглянути всі →
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
        {collections.map((collection) => (
          <CollectionCard key={collection.slug} collection={collection} />
        ))}
      </div>
    </Section>
  );
}
