import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { articles } from "@/data/demo-content";

export const metadata: Metadata = {
  title: "Корисне — Care Guide",
  description: "Прості пояснення про догляд: типи шкіри, порядок нанесення засобів та мінімальні рутини.",
};

export default function ArticlesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-16 sm:pb-20">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Корисне</h1>
          <p className="text-ink/60 mb-8 max-w-xl">
            Прості пояснення, які допомагають краще орієнтуватися в догляді.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
