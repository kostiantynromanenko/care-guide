import type { Payload } from "payload";

/**
 * One-time copy sharpening pass: rewrites the hero and collection
 * descriptions to lead with the outcome/benefit rather than a purely
 * descriptive "what it is" (which read as flat and didn't motivate a
 * click-through to the real purchase on hillary.ua), while staying within
 * `.cursor/skills/ukrainian-ux-writing/SKILL.md` and
 * `.cursor/skills/affiliate-compliance/SKILL.md` (no exaggerated/medical
 * claims, no fake urgency). Idempotent — safe to re-run.
 */

const SITE_SETTINGS_COPY = {
  tagline: "Знайдіть догляд, який підходить саме вам — за 2 хвилини",
  description: "Оберіть потребу — і одразу отримаєте перевірену добірку засобів та готовий план догляду.",
};

const COLLECTION_DESCRIPTIONS: Record<string, string> = {
  "basic-dry-skin": "Чотири прості кроки, які знімають відчуття стягнутості й повертають шкірі комфорт.",
  "minimal-daily-care": "Три засоби, які закривають основні потреби шкіри — без зайвих кроків і витрат часу.",
  "dry-hair-recovery": "Кроки для м'якшого волосся, яке легше розчісується — без складної рутини.",
  "oil-control-combination-skin": "Менше жирного блиску і чистіші пори — без пересушування шкіри.",
  "calm-sensitive-skin": "Заспокійте чутливу шкіру та зменшіть відчуття дискомфорту — м'якими перевіреними кроками.",
  "vitamin-c-glow": "Більш свіжий і рівний тон шкіри — чотири кроки з вітаміном С.",
};

export interface ConversionCopySummary {
  siteSettingsUpdated: boolean;
  collectionsUpdated: string[];
  collectionsMissing: string[];
}

export async function updateConversionCopy(payload: Payload): Promise<ConversionCopySummary> {
  payload.logger.info("Updating conversion-focused copy (hero + collection descriptions)...");

  await payload.updateGlobal({ slug: "site-settings", data: SITE_SETTINGS_COPY });

  const collectionsUpdated: string[] = [];
  const collectionsMissing: string[] = [];

  for (const [slug, description] of Object.entries(COLLECTION_DESCRIPTIONS)) {
    const existing = await payload.find({
      collection: "collections",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    if (existing.docs.length === 0) {
      collectionsMissing.push(slug);
      continue;
    }

    await payload.update({
      collection: "collections",
      id: existing.docs[0].id,
      data: { description },
    });
    collectionsUpdated.push(slug);
  }

  payload.logger.info(
    `Conversion copy update complete. ${collectionsUpdated.length} collection(s) updated.`
  );

  return { siteSettingsUpdated: true, collectionsUpdated, collectionsMissing };
}
