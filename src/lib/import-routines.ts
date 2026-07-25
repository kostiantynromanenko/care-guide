import type { Payload } from "payload";

/**
 * Seeds the 5 editorial "Routines" (docs/SITE_STRUCTURE.md §5) — schedule
 * -based guides (morning/evening/minimal/weekly/hair recovery) that
 * deliberately reference the same real products already imported by
 * `src/lib/import-hillary-catalog.ts`, rather than a separate catalog.
 * Idempotent (upserts by slug), shared by the local script
 * (`scripts/seed-routines.ts`) and the protected production endpoint
 * (`src/app/(payload)/api/seed-routines/route.ts`).
 */

interface RoutineStepMapping {
  number: number;
  title: string;
  description: string;
  productSlug?: string;
}

interface RoutineMapping {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  area: "face" | "hair";
  steps: RoutineStepMapping[];
  usageNotes: string[];
  relatedCollectionSlugs: string[];
}

const ROUTINES: RoutineMapping[] = [
  {
    slug: "morning-basic",
    title: "Базова ранкова рутина",
    summary: "Три кроки, які готують шкіру обличчя до дня: очищення, зволоження, захист від сонця.",
    tags: ["Ранок", "3 кроки", "Обличчя"],
    area: "face",
    steps: [
      {
        number: 1,
        title: "Очищення",
        description: "М'яко очистити шкіру після сну, не пересушуючи її.",
        productSlug: "gentle-cleanser",
      },
      {
        number: 2,
        title: "Зволоження",
        description: "Нанести легку сироватку з гіалуроновою кислотою для зволоження.",
        productSlug: "hydrating-serum",
      },
      {
        number: 3,
        title: "Захист",
        description: "Завершити доглядом із SPF — головний крок ранкової рутини.",
        productSlug: "light-spf-fluid",
      },
    ],
    usageNotes: [
      "SPF — це не опційний крок: наносьте його щоранку, навіть у похмуру погоду.",
      "Якщо шкіра схильна до тьмяного тону, замініть крок зволоження на сироватку з вітаміном С.",
    ],
    relatedCollectionSlugs: ["basic-dry-skin", "vitamin-c-glow", "oil-control-combination-skin"],
  },
  {
    slug: "evening-basic",
    title: "Базова вечірня рутина",
    summary: "Зняти макіяж і засоби за день, м'яко очистити шкіру та завершити доглядом без SPF.",
    tags: ["Вечір", "3 кроки", "Обличчя"],
    area: "face",
    steps: [
      {
        number: 1,
        title: "Очищення",
        description: "Очистити шкіру від макіяжу, себуму та часток бруду за день.",
        productSlug: "gentle-cleanser",
      },
      {
        number: 2,
        title: "Зволоження",
        description: "Нанести сироватку, поки шкіра ще трохи волога після очищення.",
        productSlug: "hydrating-serum",
      },
      {
        number: 3,
        title: "Завершення",
        description: "Завершити кремом, який підтримує комфорт шкіри протягом ночі.",
        productSlug: "basic-cream",
      },
    ],
    usageNotes: [
      "Якщо наносили макіяж чи сонцезахисний засіб, спочатку зніміть їх гідрофільною олією.",
      "Активні засоби (як вітамін С) краще вводити по одному, а не всі одразу.",
    ],
    relatedCollectionSlugs: ["basic-dry-skin", "calm-sensitive-skin", "oil-control-combination-skin"],
  },
  {
    slug: "minimal-three-step",
    title: "Мінімальна триступенева рутина",
    summary: "Найпростіший каркас догляду для тих, хто тільки починає або не хоче ускладнювати рутину.",
    tags: ["Мінімум", "3 кроки", "Для початківців"],
    area: "face",
    steps: [
      {
        number: 1,
        title: "Очищення",
        description: "Один м'який засіб для очищення, підходящий щодня.",
        productSlug: "gentle-cleanser",
      },
      {
        number: 2,
        title: "Зволоження",
        description: "Один засіб для зволоження — цього достатньо для базової підтримки шкіри.",
        productSlug: "hydrating-serum",
      },
      {
        number: 3,
        title: "Завершення й захист",
        description: "Вранці — з SPF, ввечері — звичайний крем.",
        productSlug: "light-spf-fluid",
      },
    ],
    usageNotes: [
      "Це каркас, а не обмеження — додавайте засоби поступово, коли зрозумієте, чого не вистачає.",
      "Не потрібно одразу купувати весь набір: почніть з очищення і зволоження.",
    ],
    relatedCollectionSlugs: ["minimal-daily-care", "basic-dry-skin"],
  },
  {
    slug: "weekly-deep-care",
    title: "Щотижневий додатковий догляд",
    summary: "Один-два кроки понад щоденну рутину для глибшого очищення пор раз-двічі на тиждень.",
    tags: ["Щотижня", "1-2 кроки", "Догляд за порами"],
    area: "face",
    steps: [
      {
        number: 1,
        title: "Глибоке очищення",
        description: "Ензимна пудра розчиняє надлишок себуму та злущені клітини глибше, ніж щоденне очищення.",
        productSlug: "enzyme-powder-oily",
      },
      {
        number: 2,
        title: "Контроль жирності",
        description: "Завершити засобом, який підтримує контроль жирного блиску до наступного тижня.",
        productSlug: "oil-control-set",
      },
    ],
    usageNotes: [
      "1–2 рази на тиждень — не частіше: надмірне очищення може подразнити шкіру.",
      "Використовуйте після щоденного очищення, а не замість нього.",
    ],
    relatedCollectionSlugs: ["oil-control-combination-skin", "vitamin-c-glow"],
  },
  {
    slug: "hair-recovery",
    title: "Відновлення волосся",
    summary: "Живлення перед миттям і маска раз-двічі на тиждень для сухого й пошкодженого волосся.",
    tags: ["Волосся", "2 кроки", "Відновлення"],
    area: "hair",
    steps: [
      {
        number: 1,
        title: "Живлення перед миттям",
        description: "Нанести олію на кінчики волосся за 20–30 хвилин до миття для додаткової м'якості.",
        productSlug: "nourishing-hair-oil",
      },
      {
        number: 2,
        title: "Маска",
        description: "Використовувати маску з протеїнами пшениці 1–2 рази на тиждень для глибокого живлення.",
        productSlug: "recovery-hair-mask",
      },
    ],
    usageNotes: ["Маску тримайте стільки, скільки вказано на упаковці — довше не означає ефективніше."],
    relatedCollectionSlugs: ["dry-hair-recovery"],
  },
];

export interface RoutinesImportSummary {
  routinesUpserted: number;
  missingProducts: string[];
}

export async function importRoutines(payload: Payload): Promise<RoutinesImportSummary> {
  payload.logger.info("Seeding editorial routines...");

  const allProducts = await payload.find({ collection: "products", limit: 1000 });
  const productSlugToId = new Map(allProducts.docs.map((doc) => [doc.slug, doc.id]));

  const allCollections = await payload.find({ collection: "collections", limit: 1000 });
  const collectionSlugToId = new Map(allCollections.docs.map((doc) => [doc.slug, doc.id]));

  const missingProducts: string[] = [];
  let routinesUpserted = 0;

  for (const mapping of ROUTINES) {
    const steps = mapping.steps.map((step) => {
      const productId = step.productSlug ? productSlugToId.get(step.productSlug) : undefined;
      if (step.productSlug && !productId) {
        missingProducts.push(`${mapping.slug}:${step.productSlug}`);
      }
      return {
        number: step.number,
        title: step.title,
        description: step.description,
        ...(productId ? { product: productId } : {}),
      };
    });

    const relatedCollections = mapping.relatedCollectionSlugs
      .map((slug) => collectionSlugToId.get(slug))
      .filter((id): id is number => Boolean(id));

    const data = {
      title: mapping.title,
      summary: mapping.summary,
      tags: mapping.tags,
      area: mapping.area,
      steps,
      usageNotes: mapping.usageNotes,
      relatedCollections,
    };

    const existing = await payload.find({
      collection: "routines",
      where: { slug: { equals: mapping.slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      await payload.update({ collection: "routines", id: existing.docs[0].id, data });
    } else {
      await payload.create({ collection: "routines", data: { ...data, slug: mapping.slug } });
    }
    routinesUpserted += 1;
    payload.logger.info(`Upserted routine ${mapping.slug}`);
  }

  payload.logger.info(`Routines seed complete. ${missingProducts.length} missing product ref(s).`);
  return { routinesUpserted, missingProducts };
}
