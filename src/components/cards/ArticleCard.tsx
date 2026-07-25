import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { CompassIcon, FlaskIcon, LayersIcon, LeafIcon, SunIcon } from "@/components/icons/Icons";
import type { Article } from "@/types/content";

/**
 * Articles have no cover photo (a generic stock image would look off-brand —
 * see the visual-richness report, 2026-07-25), so each gets a small topic
 * icon instead. Keyed by slug; falls back to a generic compass for any
 * future article that isn't mapped yet.
 */
const ARTICLE_ICONS: Record<string, typeof CompassIcon> = {
  "how-to-identify-skin-type": CompassIcon,
  "product-application-order": LayersIcon,
  "minimal-care-start": LeafIcon,
  "why-spf-matters": SunIcon,
  "introducing-active-ingredients": FlaskIcon,
};

export function ArticleCard({ article }: { article: Article }) {
  const Icon = ARTICLE_ICONS[article.slug] ?? CompassIcon;
  return (
    <Card className="p-5">
      <IconBadge tone="lavender" className="mb-3">
        <Icon />
      </IconBadge>
      <h3 className="font-semibold text-base mb-1.5">{article.title}</h3>
      <p className="text-sm text-ink/70 mb-4">{article.excerpt}</p>
      <Link
        href={`/articles/${article.slug}`}
        className="text-sm font-semibold text-cta-strong hover:text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta rounded"
      >
        Читати →
      </Link>
    </Card>
  );
}
