import type { Need } from "@/types/content";

/**
 * Deterministic, non-AI matching logic for the `/selection` questionnaire
 * (docs/SITE_STRUCTURE.md §2). Same spirit as the recommendation-helper
 * widget (`src/lib/assistant-demo-logic.ts`): a small static decision
 * table over content, not a real recommendation engine.
 */

export type SelectionArea = "face" | "hair";
export type SelectionRoutineSize = "minimal" | "full";

export interface SelectionAnswers {
  area: SelectionArea;
  concern?: string;
  routineSize?: SelectionRoutineSize;
  sensitive?: boolean;
}

export interface SelectionResult {
  collectionSlug: string;
  tip: string;
}

const SENSITIVITY_TIP =
  "Оскільки ви позначили чутливість — вводьте нові засоби по одному й перевіряйте реакцію шкіри.";

function buildTip(answers: SelectionAnswers, needs: Need[]): string {
  const parts: string[] = [];

  if (answers.concern) {
    const need = needs.find((item) => item.slug === answers.concern);
    if (need) parts.push(need.description);
  }

  if (answers.sensitive) {
    parts.push(SENSITIVITY_TIP);
  }

  return parts.join(" ");
}

export function getSelectionResult(answers: SelectionAnswers, needs: Need[]): SelectionResult {
  if (answers.area === "hair") {
    return {
      collectionSlug: "dry-hair-recovery",
      tip: buildTip(answers, needs) || "Маску використовуйте 1–2 рази на тиждень, а не щодня.",
    };
  }

  if (answers.routineSize === "minimal") {
    return {
      collectionSlug: "minimal-daily-care",
      tip: buildTip(answers, needs) || "Це базовий каркас — за потреби додайте засоби пізніше.",
    };
  }

  if (answers.concern === "dryness") {
    return { collectionSlug: "basic-dry-skin", tip: buildTip(answers, needs) };
  }

  if (answers.concern === "oiliness") {
    return { collectionSlug: "oil-control-combination-skin", tip: buildTip(answers, needs) };
  }

  if (answers.concern === "sensitivity") {
    return { collectionSlug: "calm-sensitive-skin", tip: buildTip(answers, needs) };
  }

  if (answers.concern === "dullness") {
    return { collectionSlug: "vitamin-c-glow", tip: buildTip(answers, needs) };
  }

  return {
    collectionSlug: "minimal-daily-care",
    tip: buildTip(answers, needs) || "Це базовий каркас — за потреби додайте засоби пізніше.",
  };
}
