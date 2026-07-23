import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Article } from "@/types/content";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="p-5">
      <h3 className="font-semibold text-base mb-1.5">{article.title}</h3>
      <p className="text-sm text-ink/70 mb-4">{article.excerpt}</p>
      <Link
        href={`/articles/${article.slug}`}
        className="text-sm font-semibold text-cta hover:text-cta-strong transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta rounded"
      >
        Читати →
      </Link>
    </Card>
  );
}
