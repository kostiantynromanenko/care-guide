import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Routine } from "@/types/content";

/**
 * Header images matching the NeedCard/Hero watercolor-illustration style.
 * Partial because there are no body routines yet (body only has
 * collections so far — see docs/PROJECT_CONTEXT.md).
 */
const ROUTINE_IMAGES: Partial<Record<Routine["area"], string>> = {
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
