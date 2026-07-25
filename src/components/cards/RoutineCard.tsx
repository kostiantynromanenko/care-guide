import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Routine } from "@/types/content";

/**
 * Header images (approved 2026-07-25), matching the NeedCard/Hero
 * watercolor-illustration style — replaces the earlier icon-in-circle
 * badge, which looked out of place once every other card type moved to
 * full imagery. Keyed by area since routines only vary between face/hair.
 */
const ROUTINE_IMAGES: Record<Routine["area"], string> = {
  face: "/routine-face-v1.png",
  hair: "/routine-hair-v1.png",
};

export function RoutineCard({ routine }: { routine: Routine }) {
  const image = ROUTINE_IMAGES[routine.area];
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
      ) : null}
      <div className="p-4 sm:p-5">
        <ul className="flex flex-wrap gap-1.5 mb-3" aria-label="Теги плану">
          {routine.tags.map((tag) => (
            <li key={tag} className="text-[11px] rounded-full bg-white border border-black/5 px-2.5 py-1">
              {tag}
            </li>
          ))}
        </ul>
        <h3 className="font-semibold text-base mb-1.5">{routine.title}</h3>
        <p className="text-sm text-ink/70 mb-4">{routine.summary}</p>
        <Link
          href={`/routines/${routine.slug}`}
          className="text-sm font-semibold text-cta-strong hover:text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta rounded"
        >
          Переглянути план →
        </Link>
      </div>
    </Card>
  );
}
