import type { Collection } from "@/types/content";

/**
 * Deterministic, non-AI mapping used by the demo "recommendation helper"
 * widget. This is intentionally simple static logic, not a real
 * recommendation engine — see the "Future considerations" section in
 * docs/PROJECT_CONTEXT.md for why a real AI-powered assistant is tracked
 * as a separate, not-yet-approved decision.
 *
 * Each need now maps to a dedicated collection built from real HiLLARY
 * catalog data (see docs/PROJECT_CONTEXT.md — "work with real data").
 */
const NEED_TO_COLLECTION_SLUGS: Record<string, string[]> = {
  dryness: ["basic-dry-skin", "dry-hair-recovery"],
  oiliness: ["oil-control-combination-skin"],
  sensitivity: ["calm-sensitive-skin"],
  dullness: ["vitamin-c-glow"],
  acne: ["acne-breakouts-care"],
  "anti-aging": ["anti-aging-care"],
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
