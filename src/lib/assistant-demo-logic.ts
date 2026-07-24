import type { Collection } from "@/types/content";

/**
 * Deterministic, non-AI mapping used by the demo "recommendation helper"
 * widget. This is intentionally simple static logic, not a real
 * recommendation engine — see the "Future considerations" section in
 * docs/PROJECT_CONTEXT.md for why a real AI-powered assistant is tracked
 * as a separate, not-yet-approved decision.
 *
 * Demo content currently only has three collections, mostly dry-skin
 * oriented, so needs without a close thematic match fall back to the
 * most general/minimal collection rather than an invented one.
 */
const NEED_TO_COLLECTION_SLUGS: Record<string, string[]> = {
  dryness: ["basic-dry-skin", "dry-hair-recovery"],
  oiliness: ["minimal-daily-care"],
  sensitivity: ["minimal-daily-care"],
  dullness: ["minimal-daily-care"],
};

export function getSuggestedCollections(
  needSlug: string,
  collections: Collection[]
): Collection[] {
  const slugs = NEED_TO_COLLECTION_SLUGS[needSlug] ?? [];
  return slugs
    .map((slug) => collections.find((collection) => collection.slug === slug))
    .filter((collection): collection is Collection => Boolean(collection));
}
