import Link from "next/link";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { getAllCollections } from "@/lib/collections";

export async function CollectionsSection() {
  const collections = await getAllCollections();

  return (
    <section
      className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16"
      aria-labelledby="collections-heading"
    >
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
    </section>
  );
}
