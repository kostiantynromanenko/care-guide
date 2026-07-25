import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Routine } from "@/types/content";

export function RoutineCard({ routine }: { routine: Routine }) {
  return (
    <Card className="p-5">
      <ul className="flex flex-wrap gap-1.5 mb-3" aria-label="Теги схеми">
        {routine.tags.map((tag) => (
          <li key={tag} className="text-[11px] rounded-full bg-white/70 px-2.5 py-1">
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
        Переглянути схему →
      </Link>
    </Card>
  );
}
