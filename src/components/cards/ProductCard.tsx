import { Card } from "@/components/ui/Card";
import { DEMO_AFFILIATE_URL } from "@/lib/constants";
import type { Product } from "@/types/content";

/**
 * Renders a placeholder image block instead of `product.image` — no real
 * photography yet during the design-prototype phase.
 * The CTA always opens the (demo) official seller URL in a new tab, per
 * `.cursor/skills/affiliate-compliance/SKILL.md`: it must never look like a
 * checkout action on this site.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div
        className="aspect-[4/3] bg-gradient-to-br from-peach-tint/40 to-rose-tint/40 flex items-center justify-center text-ink/70 text-xs font-medium"
        role="img"
        aria-label={`Фото засобу «${product.title}»`}
      >
        Фото засобу
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[11px] font-semibold text-cta-strong mb-1.5">{product.role}</p>
        <h4 className="font-semibold text-sm mb-1.5">{product.title}</h4>
        <p className="text-xs text-ink/70 mb-4 flex-1">{product.description}</p>
        <a
          href={DEMO_AFFILIATE_URL}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="text-sm font-semibold text-cta-strong hover:text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta rounded"
        >
          Переглянути на офіційному сайті ↗
        </a>
      </div>
    </Card>
  );
}
