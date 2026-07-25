import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Notice } from "@/components/ui/Notice";
import { RoutineStepper } from "@/components/routine/RoutineStepper";
import { ProductCard } from "@/components/cards/ProductCard";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { getCollectionBySlug, getCollectionsBySlugs, getProductsBySlugs } from "@/lib/collections";
import { getNotices } from "@/lib/site-content";
import { detectOsId } from "@/lib/user-agent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) {
    return { title: "Добірку не знайдено — Care Guide" };
  }
  return {
    title: `${collection.title} — Care Guide`,
    description: collection.description,
  };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const [recommendedProducts, relatedCollections, notices] = await Promise.all([
    getProductsBySlugs(collection.recommendedProductSlugs),
    getCollectionsBySlugs(collection.relatedCollectionSlugs),
    getNotices(),
  ]);

  const osId = detectOsId((await headers()).get("user-agent"));

  return (
    <>
      <Header />
      <main>
        <section className="max-w-4xl mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-8">
          <Link
            href="/collections"
            className="text-sm font-medium text-ink/80 hover:text-cta-strong transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta rounded"
          >
            ← Усі добірки
          </Link>

          <ul className="flex flex-wrap gap-1.5 mt-5 mb-4" aria-label="Теги добірки">
            {collection.tags.map((tag) => (
              <li key={tag} className="text-[11px] rounded-full bg-white border border-black/5 px-2.5 py-1">
                {tag}
              </li>
            ))}
          </ul>

          <h1 className="text-2xl sm:text-4xl font-bold mb-3">{collection.title}</h1>
          <p className="text-ink/75 sm:text-lg mb-4 max-w-2xl">{collection.description}</p>
          <p className="text-sm font-semibold text-cta-strong">{collection.routineSize}</p>
        </section>

        {recommendedProducts.length > 0 && (
          <section
            className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-10"
            aria-labelledby="products-heading"
          >
            <h2 id="products-heading" className="text-xl sm:text-2xl font-bold mb-6">
              Рекомендовані засоби
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {recommendedProducts.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  source={{ page: "collection", collectionSlug: collection.slug, osId }}
                />
              ))}
            </div>
          </section>
        )}

        <section
          className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-10 space-y-10"
          aria-labelledby="routine-heading"
        >
          <h2 id="routine-heading" className="text-xl sm:text-2xl font-bold">
            Схема догляду
          </h2>
          {collection.sequences.map((sequence) => (
            <RoutineStepper key={sequence.label} sequence={sequence} />
          ))}
        </section>

        {collection.usageNotes.length > 0 && (
          <section
            className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-10"
            aria-labelledby="usage-heading"
          >
            <h2 id="usage-heading" className="text-xl sm:text-2xl font-bold mb-5">
              Нотатки з використання
            </h2>
            <ul className="space-y-2.5 text-sm text-ink/75 list-disc pl-5">
              {collection.usageNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
        )}

        {relatedCollections.length > 0 && (
          <section
            className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-10"
            aria-labelledby="related-heading"
          >
            <h2 id="related-heading" className="text-xl sm:text-2xl font-bold mb-6">
              Схожі добірки
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {relatedCollections.map((related) => (
                <CollectionCard key={related.slug} collection={related} />
              ))}
            </div>
          </section>
        )}

        <section className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-10 pb-14 sm:pb-16">
          <Notice>
            <p>{notices.affiliate}</p>
            <p>{notices.medical}</p>
          </Notice>
        </section>
      </main>
      <Footer />
    </>
  );
}
