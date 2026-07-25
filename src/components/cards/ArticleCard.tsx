import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Article } from "@/types/content";

/**
 * Header images matching the NeedCard/Hero watercolor-illustration style.
 * Keyed by slug; falls back to a plain gradient placeholder for any future
 * article that isn't mapped yet.
 */
const ARTICLE_IMAGES: Record<string, string> = {
  "how-to-identify-skin-type": "/article-skin-type-v1.png",
  "product-application-order": "/article-application-order-v1.png",
  "minimal-care-start": "/article-minimal-care-v1.png",
  "why-spf-matters": "/article-spf-v1.png",
  "introducing-active-ingredients": "/article-active-ingredients-v1.png",
};

export function ArticleCard({ article }: { article: Article }) {
  const image = ARTICLE_IMAGES[article.slug];
  return (
    <Card className="overflow-hidden">
      {image ? (
        <div className="relative aspect-[4/3]">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 80vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div
          className="aspect-[4/3] bg-gradient-to-br from-lavender-tint/40 to-rose-tint/40"
          role="img"
          aria-label={`Ілюстрація до статті «${article.title}»`}
        />
      )}
      <div className="p-4 sm:p-5">
        <h3 className="font-semibold text-base mb-1.5">{article.title}</h3>
        <p className="text-sm text-ink/70 mb-4">{article.excerpt}</p>
        <Link
          href={`/articles/${article.slug}`}
          className="text-sm font-semibold text-cta-strong hover:text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta rounded"
        >
          Читати →
        </Link>
      </div>
    </Card>
  );
}
