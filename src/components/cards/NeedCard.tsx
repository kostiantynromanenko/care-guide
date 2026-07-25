import Image from "next/image";
import { Card } from "@/components/ui/Card";
import type { Need } from "@/types/content";

/**
 * Generated abstract header images (approved 2026-07-25 — same soft
 * color-field style as the hero image, one thematic color mood per concern)
 * replaced the icon badges: the user liked the hero's look and asked for it
 * to carry through here. Falls back to a plain gradient placeholder for any
 * future need slug that isn't mapped yet.
 */
const NEED_IMAGES: Record<string, string> = {
  dryness: "/need-dryness.png",
  oiliness: "/need-oiliness.png",
  sensitivity: "/need-sensitivity.png",
  dullness: "/need-dullness.png",
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
            sizes="(min-width: 768px) 25vw, 50vw"
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
      <div className="p-4 sm:p-5">
        <h3 className="font-semibold text-sm sm:text-base mb-1.5">{need.title}</h3>
        <p className="text-xs sm:text-sm text-ink/70">{need.description}</p>
      </div>
    </Card>
  );
}
