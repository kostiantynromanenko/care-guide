import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Collection } from "@/types/content";

/**
 * Renders a placeholder image block instead of `collection.image`.
 * No real photography exists yet for the design-prototype phase
 * (see docs/APPROVAL_WORKFLOW.md — placeholder images are expected).
 */
export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Card className="overflow-hidden">
      <div
        className="aspect-[4/3] bg-gradient-to-br from-rose-100 to-purple-100 flex items-center justify-center text-ink/60 text-xs"
        role="img"
        aria-label={`Фото до добірки «${collection.title}»`}
      >
        Фото добірки
      </div>
      <div className="p-5">
        <ul className="flex flex-wrap gap-1.5 mb-3" aria-label="Теги добірки">
          {collection.tags.map((tag) => (
            <li key={tag} className="text-[11px] rounded-full bg-white/70 px-2.5 py-1">
              {tag}
            </li>
          ))}
        </ul>
        <h3 className="font-semibold text-base mb-1.5">{collection.title}</h3>
        <p className="text-sm text-ink/70 mb-4">{collection.description}</p>
        <Link
          href={`/collections/${collection.slug}`}
          className="text-sm font-semibold text-cta-strong hover:text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta rounded"
        >
          Переглянути добірку →
        </Link>
      </div>
    </Card>
  );
}
