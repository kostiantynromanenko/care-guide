import type { Payload } from "payload";

/**
 * Single source of truth for `Need` docs added after the initial demo seed
 * (dryness/oiliness/sensitivity/dullness come from `demo/demo-content.json`
 * via `scripts/seed.ts`) — shared by `scripts/import-needs.ts` (local dev)
 * and the protected `/api/import-needs` endpoint (production).
 *
 * Kept intentionally small and separate from `import-collections.ts`: the
 * homepage `NeedsSection` grid is tuned for exactly 6 cards (2026-07-25
 * layout pass), so new collections don't automatically get a matching Need
 * — only add one here when it's meant to appear as its own homepage card
 * and `/selection` quiz option.
 *
 * Idempotent: re-running updates existing docs by slug instead of
 * duplicating them, so it's safe to re-trigger manually.
 */

interface NeedMapping {
  title: string;
  slug: string;
  description: string;
}

const NEEDS: NeedMapping[] = [
  {
    title: "Акне та висипання",
    slug: "acne",
    description: "Заспокоюємо запалення, контролюємо блиск і зменшуємо сліди постакне.",
  },
  {
    title: "Ознаки старіння",
    slug: "anti-aging",
    description: "Пружність і тонус шкіри — м'який щоденний догляд без агресивних процедур.",
  },
];

export interface ImportNeedsSummary {
  needsUpserted: number;
}

export async function importNeeds(payload: Payload): Promise<ImportNeedsSummary> {
  payload.logger.info(`Importing ${NEEDS.length} needs...`);

  let needsUpserted = 0;
  for (const need of NEEDS) {
    const existing = await payload.find({
      collection: "needs",
      where: { slug: { equals: need.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      await payload.update({ collection: "needs", id: existing.docs[0].id, data: need });
    } else {
      await payload.create({ collection: "needs", data: need });
    }
    needsUpserted += 1;
  }

  payload.logger.info("Needs import complete.");
  return { needsUpserted };
}
