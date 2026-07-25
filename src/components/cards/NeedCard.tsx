import Image from "next/image";
import { Card } from "@/components/ui/Card";
import type { Need } from "@/types/content";

/**
 * Generated header images (approved 2026-07-25) replaced the icon badges;
 * iterated from macro photography to a soft watercolor-illustration style
 * (matching the hero's painterly look) in a pink-only palette. Filenames
 * are versioned (`-v4`) rather than reused: overwriting a file at the same
 * path was not enough to bust the Next.js image optimizer / browser cache
 * during earlier iterations, so a fresh path is required whenever the
 * underlying image changes. Falls back to a plain gradient placeholder
 * for any future need slug that isn't mapped yet.
 */
const NEED_IMAGES: Record<string, string> = {
  dryness: "/need-dryness-v4.png",
  oiliness: "/need-oiliness-v4.png",
  sensitivity: "/need-sensitivity-v4.png",
  dullness: "/need-dullness-v4.png",
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
