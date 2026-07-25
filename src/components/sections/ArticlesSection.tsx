import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { getAllArticles } from "@/lib/collections";

const HOMEPAGE_PREVIEW_COUNT = 3;

/**
 * Capped to 3 of the 5 articles on the homepage (full list at /articles) —
 * same reasoning as RoutinesSection: avoids a dangling half-empty grid row
 * and keeps the section compact on mobile via horizontal scroll-snap.
 */
export async function ArticlesSection() {
  const articles = (await getAllArticles()).slice(0, HOMEPAGE_PREVIEW_COUNT);

  return (
    <Section tinted aria-labelledby="articles-heading">
      <div className="flex items-center justify-between mb-7">
        <h2 id="articles-heading" className="text-xl sm:text-2xl font-bold">
          Корисне
        </h2>
        <Link
          href="/articles"
          className="text-sm font-semibold text-cta-strong hover:text-ink transition-colors rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
        >
          Усі статті →
        </Link>
      </div>
      <ul className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0">
        {articles.map((article) => (
          <li key={article.slug} className="snap-start shrink-0 w-[80%] sm:w-auto">
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
