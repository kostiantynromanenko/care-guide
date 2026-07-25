"use client";

import { useState } from "react";
import { CollectionCard } from "@/components/cards/CollectionCard";
import type { Collection, CollectionArea } from "@/types/content";

type AreaFilter = "all" | CollectionArea;

const filters: { id: AreaFilter; label: string }[] = [
  { id: "all", label: "Усі" },
  { id: "face", label: "Обличчя" },
  { id: "hair", label: "Волосся" },
  { id: "body", label: "Тіло" },
];

const focusClasses =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta";

/**
 * Client-side filter over the collection set. Only filters by area, since
 * that's the one dimension with enough real content to make filtering
 * meaningful (see docs/SITE_STRUCTURE.md §3 for the full list of possible
 * filters — skin type/concern/budget aren't wired up yet).
 */
export function CollectionsFilter({ collections }: { collections: Collection[] }) {
  const [area, setArea] = useState<AreaFilter>("all");

  const visible = collections.filter((collection) => area === "all" || collection.area === area);

  return (
    <div>
      <div className="flex flex-wrap gap-2.5 mb-8" role="group" aria-label="Фільтр за областю догляду">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            aria-pressed={area === filter.id}
            onClick={() => setArea(filter.id)}
            className={`rounded-full border text-sm px-4 py-2.5 transition-colors ${focusClasses} ${
              area === filter.id
                ? "bg-cta text-white border-cta"
                : "bg-white/60 border-white/60 hover:bg-white/85"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {visible.map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
      ) : (
        <p className="text-ink/70">Наразі немає добірок за цим фільтром.</p>
      )}
    </div>
  );
}
