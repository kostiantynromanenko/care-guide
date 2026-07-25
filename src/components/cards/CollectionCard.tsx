import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import type { Collection } from "@/types/content";

/**
 * Cover art priority: a dedicated `collection.image` (uploaded via the
 * Payload admin) first; otherwise a photo-mosaic built from the real product
 * photos already in `recommendedProductImages` (approved 2026-07-25 — no
 * collection has its own cover photo yet, but every product does); a plain
 * gradient placeholder only as the last resort.
 */
export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Card className="overflow-hidden">
      <CollectionCover collection={collection} />
      <div className="p-5">
        <ul className="flex flex-wrap gap-1.5 mb-3" aria-label="Теги добірки">
          {collection.tags.map((tag) => (
            <li key={tag} className="text-[11px] rounded-full bg-white border border-black/5 px-2.5 py-1">
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

function CollectionCover({ collection }: { collection: Collection }) {
  if (collection.image) {
    return (
      <div className="relative aspect-[4/3]">
        <Image
          src={collection.image}
          alt={collection.imageAlt || `Фото до добірки «${collection.title}»`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  const photos = collection.recommendedProductImages;
  const label = `Засоби з добірки «${collection.title}»`;

  if (photos.length >= 3) {
    return (
      <div className="relative aspect-[4/3] grid grid-cols-2 grid-rows-2 gap-0.5 bg-white" role="img" aria-label={label}>
        <div className="relative row-span-2">
          <Image src={photos[0].image} alt="" fill sizes="17vw" className="object-contain p-2" />
        </div>
        <div className="relative">
          <Image src={photos[1].image} alt="" fill sizes="17vw" className="object-contain p-2" />
        </div>
        <div className="relative">
          <Image src={photos[2].image} alt="" fill sizes="17vw" className="object-contain p-2" />
        </div>
      </div>
    );
  }

  if (photos.length === 2) {
    return (
      <div className="relative aspect-[4/3] grid grid-cols-2 gap-0.5 bg-white" role="img" aria-label={label}>
        <div className="relative">
          <Image src={photos[0].image} alt="" fill sizes="17vw" className="object-contain p-2" />
        </div>
        <div className="relative">
          <Image src={photos[1].image} alt="" fill sizes="17vw" className="object-contain p-2" />
        </div>
      </div>
    );
  }

  if (photos.length === 1) {
    return (
      <div className="relative aspect-[4/3] bg-white">
        <Image src={photos[0].image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-contain p-5" />
      </div>
    );
  }

  return (
    <div
      className="aspect-[4/3] bg-gradient-to-br from-rose-100 to-purple-100 flex items-center justify-center text-ink/70 text-xs font-medium"
      role="img"
      aria-label={`Фото до добірки «${collection.title}»`}
    >
      Фото добірки
    </div>
  );
}
