import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { DEMO_AFFILIATE_URL } from "@/lib/constants";
import { getAffiliateUrl, type AffiliateSourcePage } from "@/lib/affiliate";
import type { Product } from "@/types/content";

/**
 * Renders `product.image` (uploaded via the Payload admin) when present,
 * falling back to a decorative placeholder otherwise — a few demo products
 * still don't have a real photo.
 * The title links to the internal `/products/[slug]` page (usage context,
 * related routines/collections) — kept as a plain text-link on the existing
 * title rather than a new button, to avoid stacking extra CTAs on the card.
 * The primary CTA opens `product.sourceUrl` wrapped in HiLLARY's partner
 * tracking link (see `src/lib/affiliate.ts`) when known, falling back to the
 * generic demo URL otherwise. Always opens in a new tab per
 * `.cursor/skills/affiliate-compliance/SKILL.md`: it must never look like a
 * checkout action on this site.
 * `source` records which page/collection the card is rendered on (sub1/sub2
 * tracking params) and the visitor's OS (os_id — see `src/lib/user-agent.ts`)
 * so conversion performance can be compared per-surface.
 */
export function ProductCard({
  product,
  source,
}: {
  product: Product;
  source: { page: AffiliateSourcePage; collectionSlug?: string; osId?: string };
}) {
  const href =
    getAffiliateUrl(product.sourceUrl, {
      page: source.page,
      collectionSlug: source.collectionSlug,
      productSlug: product.slug,
      osId: source.osId,
    }) || DEMO_AFFILIATE_URL;
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      {product.image ? (
        <div className="relative aspect-[4/3] bg-white">
          <Image
            src={product.image}
            alt={product.imageAlt || `Фото засобу «${product.title}»`}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-contain p-5"
          />
        </div>
      ) : (
        <div
          className="aspect-[4/3] bg-gradient-to-br from-peach-tint/40 to-rose-tint/40 flex items-center justify-center text-ink/70 text-xs font-medium"
          role="img"
          aria-label={`Фото засобу «${product.title}»`}
        >
          Фото засобу
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[11px] font-semibold text-cta-strong mb-1.5">{product.role}</p>
        <h4 className="font-semibold text-sm mb-1.5">
          <Link
            href={`/products/${product.slug}`}
            className="hover:text-cta-strong transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta rounded"
          >
            {product.title}
          </Link>
        </h4>
        <p className="text-xs text-ink/70 mb-4 flex-1">{product.description}</p>
        <a
          href={href}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="text-sm font-semibold text-cta-strong hover:text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta rounded"
        >
          Купити на офіційному сайті ↗
        </a>
      </div>
    </Card>
  );
}
