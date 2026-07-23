import Link from "next/link";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { articles } from "@/data/demo-content";

export function ArticlesSection() {
  return (
    <section
      className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16"
      aria-labelledby="articles-heading"
    >
      <div className="flex items-center justify-between mb-7">
        <h2 id="articles-heading" className="text-xl sm:text-2xl font-bold">
          Корисне
        </h2>
        <Link href="/articles" className="text-sm font-semibold text-cta-strong hover:text-ink">
          Усі статті →
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
