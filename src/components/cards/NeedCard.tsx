import Image from "next/image";
import { Card } from "@/components/ui/Card";
import type { Need } from "@/types/content";

const NEED_IMAGES: Record<string, string> = {
  dryness: "/need-dryness-v4.png",
  // Natural object colors (green leaf, orange citrus) on the shared soft
  // pink watercolor-wash background — that combination (not forcing every
  // object to pink) is the approved look.
  oiliness: "/need-oiliness-v4.png",
  sensitivity: "/need-sensitivity-v4.png",
  dullness: "/need-dullness-v4.png",
  // v3: v1/v2 read as a literal blemish close-up ("shocking") — replaced
  // with a calmer shield/protection motif.
  acne: "/need-acne-v3.png",
  "anti-aging": "/need-anti-aging-v3.png",
};

export function NeedCard({ need }: { need: Need }) {
  const image = NEED_IMAGES[need.slug];
  return (
    <Card className="overflow-hidden">
      {image ? (
        <div className="relative aspect-[4/3]">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div
          className="aspect-[4/3] bg-gradient-to-br from-peach-tint/40 to-rose-tint/40"
          role="img"
          aria-label={`Ілюстрація до потреби «${need.title}»`}
        />
      )}
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-sm mb-1">{need.title}</h3>
        <p className="text-xs text-ink/70">{need.description}</p>
      </div>
    </Card>
  );
}
