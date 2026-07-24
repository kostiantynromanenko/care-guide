import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import type { Collection } from "@/types/content";

/**
 * Renders `collection.image` (uploaded via the Payload admin) when present,
 * falling back to a decorative placeholder otherwise — most demo collections
 * don't have a real photo yet during the design-prototype phase (see
 * docs/APPROVAL_WORKFLOW.md — placeholder images are expected until then).
 */
export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Card className="overflow-hidden">
      {collection.image ? (
        <div className="relative aspect-[4/3]">
          <Image
            src={collection.image}
            alt={collection.imageAlt || `Фото до добірки «${collection.title}»`}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div
          className="aspect-[4/3] bg-gradient-to-br from-rose-100 to-purple-100 flex items-center justify-center text-ink/70 text-xs font-medium"
          role="img"
          aria-label={`Фото до добірки «${collection.title}»`}
        >
          Фото добірки
        </div>
      )}
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
