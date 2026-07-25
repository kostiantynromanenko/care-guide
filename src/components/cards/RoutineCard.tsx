import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BlossomIcon, CombIcon } from "@/components/icons/Icons";
import type { Routine } from "@/types/content";

export function RoutineCard({ routine }: { routine: Routine }) {
  const Icon = routine.area === "hair" ? CombIcon : BlossomIcon;
  return (
    <Card className="p-5">
      <IconBadge tone="peach" className="mb-3">
        <Icon />
      </IconBadge>
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
    </Card>
  );
}
