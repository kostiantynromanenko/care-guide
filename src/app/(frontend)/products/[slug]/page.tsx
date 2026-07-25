import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Notice } from "@/components/ui/Notice";
import { RoutineCard } from "@/components/cards/RoutineCard";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { DEMO_AFFILIATE_URL } from "@/lib/constants";
import {
  getProductBySlug,
  getCollectionsByProductSlug,
  getRoutinesByProductSlug,
} from "@/lib/collections";
import { getNotices } from "@/lib/site-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: "Засіб не знайдено — Care Guide" };
  }
  return {
    title: `${product.title} — Care Guide`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [collections, routines, notices] = await Promise.all([
    getCollectionsByProductSlug(slug),
    getRoutinesByProductSlug(slug),
    getNotices(),
  ]);

  const href = product.sourceUrl || DEMO_AFFILIATE_URL;

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

          <div className="grid sm:grid-cols-[220px_1fr] gap-6 sm:gap-8 mt-6">
            {product.image ? (
              <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden bg-white">
                <Image
                  src={product.image}
                  alt={product.imageAlt || `Фото засобу «${product.title}»`}
                  fill
                  sizes="220px"
                  className="object-contain p-5"
                />
              </div>
            ) : (
              <div
                className="aspect-[4/3] rounded-[20px] bg-gradient-to-br from-peach-tint/40 to-rose-tint/40 flex items-center justify-center text-ink/70 text-xs font-medium"
                role="img"
                aria-label={`Фото засобу «${product.title}»`}
              >
                Фото засобу
              </div>
            )}

            <div>
              <p className="text-[11px] font-semibold text-cta-strong mb-1.5">{product.role}</p>
              <h1 className="text-xl sm:text-3xl font-bold mb-3">{product.title}</h1>
              <p className="text-ink/75 mb-4">{product.description}</p>

              {product.tags.length > 0 && (
                <ul className="flex flex-wrap gap-1.5 mb-5" aria-label="Теги засобу">
                  {product.tags.map((tag) => (
                    <li key={tag} className="text-[11px] rounded-full bg-white border border-black/5 px-2.5 py-1">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              <a
                href={href}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="inline-block rounded-full bg-cta text-white font-semibold shadow-md shadow-cta/30 hover:bg-cta-strong px-6 py-3 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
              >
                Купити на офіційному сайті ↗
              </a>
            </div>
          </div>
        </section>

        {(routines.length > 0 || collections.length > 0) && (
          <section
            className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-10"
            aria-labelledby="usage-heading"
          >
            <h2 id="usage-heading" className="text-xl sm:text-2xl font-bold mb-5">
              Де використовується
            </h2>
            <p className="text-sm text-ink/70 mb-6 max-w-2xl">
              Цей засіб входить до наступних планів і добірок — там показано, на якому кроці й у
              парі з чим його застосовувати.
            </p>

            {routines.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 mb-6">
                {routines.map((routine) => (
                  <RoutineCard key={routine.slug} routine={routine} />
                ))}
              </div>
            )}

            {collections.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {collections.map((collection) => (
                  <CollectionCard key={collection.slug} collection={collection} />
                ))}
              </div>
            )}
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
