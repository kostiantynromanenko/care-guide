import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Notice } from "@/components/ui/Notice";
import { ArticleBody } from "@/components/articles/ArticleBody";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { articles, notices } from "@/data/demo-content";
import { getArticleBySlug, getCollectionsBySlugs } from "@/lib/collections";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: "Статтю не знайдено — Care Guide" };
  }
  return {
    title: `${article.title} — Care Guide`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedCollections = getCollectionsBySlugs(article.relatedCollectionSlugs);

  return (
    <>
      <Header />
      <main>
        <article className="max-w-2xl mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-8">
          <Link
            href="/articles"
            className="text-sm text-ink/55 hover:text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta rounded"
          >
            ← Усі статті
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold mt-5 mb-3">{article.title}</h1>
          <p className="text-ink/60 mb-8">{article.excerpt}</p>

          <ArticleBody blocks={article.body} />
        </article>

        {relatedCollections.length > 0 && (
          <section
            className="max-w-2xl mx-auto px-5 sm:px-8 py-8 sm:py-10"
            aria-labelledby="related-collections-heading"
          >
            <h2 id="related-collections-heading" className="text-xl sm:text-2xl font-bold mb-6">
              Пов&apos;язані добірки
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {relatedCollections.map((collection) => (
                <CollectionCard key={collection.slug} collection={collection} />
              ))}
            </div>
          </section>
        )}

        <section className="max-w-2xl mx-auto px-5 sm:px-8 py-8 sm:py-10 pb-14 sm:pb-16">
          <Notice>
            <p>{notices.medical}</p>
          </Notice>
        </section>
      </main>
      <Footer />
    </>
  );
}
