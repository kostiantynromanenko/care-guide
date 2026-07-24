import path from "node:path";
import type { Payload } from "payload";

import type { FeedOffer } from "@/lib/hillary-feed";

/**
 * Real HiLLARY catalog import, shared by the local dev script
 * (`scripts/import-hillary-catalog.ts`) and the protected production
 * endpoint (`src/app/(payload)/api/import-hillary-catalog/route.ts`) — see
 * `docs/PROJECT_CONTEXT.md` § Technical status ("Wave D") for the full
 * reasoning. Idempotent: re-running updates existing docs by slug instead of
 * duplicating them, so it's safe to schedule or re-trigger manually.
 *
 * Scope:
 * - Refreshes the 6 existing demo products with real HiLLARY SKUs (title,
 *   description, tags, real photo, sourceUrl/vendorCode/price/inStock).
 *   Existing collections (basic-dry-skin, minimal-daily-care,
 *   dry-hair-recovery) already reference these slugs, so they become real
 *   automatically without touching the collection docs.
 * - Adds 10 new real products + 3 new Collections to close the content gap
 *   for oiliness/sensitivity/dullness, which previously all fell back to the
 *   generic minimal-daily-care collection.
 * - Does NOT touch flows, navigation, or IA — see
 *   src/lib/assistant-demo-logic.ts / selection-demo-logic.ts for the
 *   separate small follow-up that points those needs at the new slugs.
 */

interface ProductMapping {
  slug: string;
  offerId: string;
  role: string;
  description: string;
  tags: string[];
}

interface CollectionMapping {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  area: "face" | "hair";
  routineSize: string;
  sequences: {
    label: string;
    steps: { number: number; title: string; description: string; productSlug: string }[];
  }[];
  recommendedProductSlugs: string[];
  usageNotes: string[];
  relatedCollectionSlugs: string[];
}

// Real HiLLARY SKUs mapped onto the 6 existing demo product slugs — the
// collections that reference these slugs (basic-dry-skin, minimal-daily-care,
// dry-hair-recovery) don't need any changes themselves.
const EXISTING_PRODUCT_UPDATES: ProductMapping[] = [
  {
    slug: "gentle-cleanser",
    offerId: "525",
    role: "Крок 1: очищення",
    description: "Очищення без відчуття стягнутості — зі скваланом та олією авокадо для сухої та чутливої шкіри.",
    tags: ["Суха шкіра", "Щодня"],
  },
  {
    slug: "hydrating-serum",
    offerId: "286",
    role: "Крок 2: зволоження",
    description: "Легка сироватка з гіалуроновою кислотою для додаткового зволоження шкіри.",
    tags: ["Зволоження", "Ранок/вечір"],
  },
  {
    slug: "basic-cream",
    offerId: "575",
    role: "Крок 3: завершення",
    description: "Крем зі скваланом та олією авокадо підтримує комфорт шкіри після попередніх етапів.",
    tags: ["Суха шкіра", "Комфорт"],
  },
  {
    slug: "light-spf-fluid",
    offerId: "758",
    role: "Крок 4: захист",
    description: "Завершує ранкову рутину, захищає шкіру від сонця та додатково зволожує.",
    tags: ["SPF", "Ранок"],
  },
  {
    slug: "nourishing-hair-oil",
    offerId: "279",
    role: "Живлення перед миттям",
    description: "Олія жожоба для нанесення на кінчики волосся перед миттям, для м’якості.",
    tags: ["Волосся", "Живлення"],
  },
  {
    slug: "recovery-hair-mask",
    offerId: "280",
    role: "Маска 1–2 рази на тиждень",
    description: "Маска з протеїнами пшениці для глибокого живлення сухого та пошкодженого волосся.",
    tags: ["Волосся", "Відновлення"],
  },
];

// New real products, filling the oiliness/sensitivity/dullness content gap.
const NEW_PRODUCTS: ProductMapping[] = [
  {
    slug: "cleansing-oil-dry-sensitive",
    offerId: "501",
    role: "Крок 1: демакіяж",
    description: "Гідрофільна олія для делікатного видалення макіяжу перед основним очищенням.",
    tags: ["Чутлива шкіра", "Демакіяж"],
  },
  {
    slug: "soothing-toner-dry-sensitive",
    offerId: "700",
    role: "Крок 3: заспокоєння",
    description: "Тонік з алое знімає відчуття дискомфорту та готує шкіру до крему.",
    tags: ["Чутлива шкіра", "Заспокоєння"],
  },
  {
    slug: "cleansing-oil-oily",
    offerId: "500",
    role: "Крок 1: демакіяж",
    description: "Гідрофільна олія з таману та жожоба для видалення макіяжу без пересушування.",
    tags: ["Жирна шкіра", "Демакіяж"],
  },
  {
    slug: "cleansing-foam-oily",
    offerId: "523",
    role: "Крок 2: очищення",
    description: "Пінка для щоденного очищення жирної та комбінованої шкіри.",
    tags: ["Жирна шкіра", "Щодня"],
  },
  {
    slug: "enzyme-powder-oily",
    offerId: "1396",
    role: "1–2 рази на тиждень",
    description: "Ензимна пудра для глибшого очищення пор і вирівнювання рельєфу шкіри.",
    tags: ["Жирна шкіра", "Пори"],
  },
  {
    slug: "oil-control-set",
    offerId: "2221",
    role: "Крок 3: контроль жирності",
    description: "Набір сироватки та крем-гелю для контролю жирного блиску та видимості пор.",
    tags: ["Жирна шкіра", "Контроль жирності"],
  },
  {
    slug: "vitamin-c-cleanser",
    offerId: "1031",
    role: "Крок 1: очищення",
    description: "Гель для м’якого очищення з вітаміном С, який не пересушує шкіру.",
    tags: ["Тьмяний тон", "Vitamin C"],
  },
  {
    slug: "vitamin-c-toner",
    offerId: "1034",
    role: "Крок 2: тонізування",
    description: "Тонік з вітаміном С зволожує та готує шкіру до нанесення сироватки.",
    tags: ["Тьмяний тон", "Vitamin C"],
  },
  {
    slug: "vitamin-c-serum",
    offerId: "1035",
    role: "Крок 3: вирівнювання тону",
    description: "Сироватка зі стабілізованою формою вітаміну С для більш рівного та свіжого тону шкіри.",
    tags: ["Тьмяний тон", "Vitamin C"],
  },
  {
    slug: "vitamin-c-fluid",
    offerId: "1038",
    role: "Крок 4: завершення",
    description: "Легкий крем-флюїд з вітаміном С завершує догляд і підтримує захист шкіри протягом дня.",
    tags: ["Тьмяний тон", "Vitamin C"],
  },
];

const NEW_COLLECTIONS: CollectionMapping[] = [
  {
    title: "Догляд для жирної та комбінованої шкіри",
    slug: "oil-control-combination-skin",
    description: "Кроки для очищення й контролю жирного блиску без пересушування.",
    tags: ["Жирна шкіра", "Контроль жирності", "3-4 засоби"],
    area: "face",
    routineSize: "3 засоби · щодня + 1 щотижня",
    sequences: [
      {
        label: "Щодня",
        steps: [
          { number: 1, title: "Демакіяж", description: "Видалити макіяж і сонцезахисний засіб гідрофільною олією.", productSlug: "cleansing-oil-oily" },
          { number: 2, title: "Очищення", description: "М’яко очистити шкіру пінкою для жирної та комбінованої шкіри.", productSlug: "cleansing-foam-oily" },
          { number: 3, title: "Контроль жирності", description: "Нанести засіб для контролю жирного блиску та видимості пор.", productSlug: "oil-control-set" },
        ],
      },
      {
        label: "Щотижня",
        steps: [
          { number: 1, title: "Глибоке очищення", description: "1–2 рази на тиждень використати ензимну пудру для глибшого очищення пор.", productSlug: "enzyme-powder-oily" },
        ],
      },
    ],
    recommendedProductSlugs: ["cleansing-oil-oily", "cleansing-foam-oily", "oil-control-set", "enzyme-powder-oily"],
    usageNotes: [
      "Ензимну пудру використовуйте 1–2 рази на тиждень, а не щодня.",
      "Гідрофільну олію застосовуйте перед основним очищенням, якщо наносили макіяж чи сонцезахисний засіб.",
    ],
    relatedCollectionSlugs: ["minimal-daily-care"],
  },
  {
    title: "Догляд для чутливої шкіри",
    slug: "calm-sensitive-skin",
    description: "Делікатні кроки для очищення й заспокоєння чутливої шкіри.",
    tags: ["Чутлива шкіра", "Заспокоєння", "4 кроки"],
    area: "face",
    routineSize: "4 кроки · щодня",
    sequences: [
      {
        label: "Щодня",
        steps: [
          { number: 1, title: "Демакіяж", description: "Делікатно видалити макіяж гідрофільною олією.", productSlug: "cleansing-oil-dry-sensitive" },
          { number: 2, title: "Очищення", description: "М’яко очистити шкіру пінкою без відчуття стягнутості.", productSlug: "gentle-cleanser" },
          { number: 3, title: "Заспокоєння", description: "Нанести тонік з алое для заспокоєння шкіри.", productSlug: "soothing-toner-dry-sensitive" },
          { number: 4, title: "Завершення", description: "Завершити догляд кремом для підтримки комфорту.", productSlug: "basic-cream" },
        ],
      },
    ],
    recommendedProductSlugs: ["cleansing-oil-dry-sensitive", "gentle-cleanser", "soothing-toner-dry-sensitive", "basic-cream"],
    usageNotes: [
      "Вводьте нові засоби по одному й перевіряйте реакцію шкіри протягом кількох днів.",
      "Тонік наносьте одразу після очищення, доки шкіра ще трохи волога.",
    ],
    relatedCollectionSlugs: ["basic-dry-skin"],
  },
  {
    title: "Догляд для сяйва та рівного тону",
    slug: "vitamin-c-glow",
    description: "Кроки з вітаміном С для більш свіжого та рівного тону шкіри.",
    tags: ["Тьмяний тон", "Vitamin C", "4 кроки"],
    area: "face",
    routineSize: "4 кроки · щодня",
    sequences: [
      {
        label: "Щодня",
        steps: [
          { number: 1, title: "Очищення", description: "М’яко очистити шкіру гелем з вітаміном С.", productSlug: "vitamin-c-cleanser" },
          { number: 2, title: "Тонізування", description: "Нанести тонік з вітаміном С для додаткового зволоження.", productSlug: "vitamin-c-toner" },
          { number: 3, title: "Вирівнювання тону", description: "Використати сироватку з вітаміном С для більш рівного тону.", productSlug: "vitamin-c-serum" },
          { number: 4, title: "Завершення", description: "Завершити догляд легким крем-флюїдом.", productSlug: "vitamin-c-fluid" },
        ],
      },
    ],
    recommendedProductSlugs: ["vitamin-c-cleanser", "vitamin-c-toner", "vitamin-c-serum", "vitamin-c-fluid"],
    usageNotes: [
      "Засоби з вітаміном С можуть підвищувати чутливість до сонця — не забувайте про сонцезахисний засіб вранці.",
      "Сироватку наносьте після тоніка та перед кремом чи флюїдом.",
    ],
    relatedCollectionSlugs: ["basic-dry-skin"],
  },
];

async function downloadImage(
  url: string
): Promise<{ data: Buffer; mimetype: string; name: string; size: number }> {
  // Some hosts hotlink-protect against requests without a browser-like
  // User-Agent (fetch's default Node/undici UA can get 403'd from
  // datacenter IPs like Vercel's, even when it works fine from a home
  // connection during local testing).
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    },
  });
  if (!res.ok) throw new Error(`Failed to download image ${url}: ${res.status} ${res.statusText}`);
  const arrayBuffer = await res.arrayBuffer();
  const ext = path.extname(new URL(url).pathname) || ".jpg";
  const mimetype = ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg";
  const name = path.basename(new URL(url).pathname);
  const data = Buffer.from(arrayBuffer);
  return { data, mimetype, name, size: data.length };
}

export interface ImportSummary {
  productsUpserted: number;
  collectionsUpserted: number;
  imageFailures: { slug: string; error: string }[];
}

export async function importHillaryCatalog(
  payload: Payload,
  offers: Map<string, FeedOffer>
): Promise<ImportSummary> {
  payload.logger.info(`Importing HiLLARY catalog from ${offers.size} loaded offers...`);

  const allMappings = [...EXISTING_PRODUCT_UPDATES, ...NEW_PRODUCTS];
  const productSlugToId = new Map<string, number>();
  let productsUpserted = 0;
  const imageFailures: { slug: string; error: string }[] = [];

  for (const mapping of allMappings) {
    const offer = offers.get(mapping.offerId);
    if (!offer) {
      payload.logger.warn(`Offer ${mapping.offerId} not found in feed, skipping ${mapping.slug}`);
      continue;
    }

    let mediaId: number | undefined;
    const pictureUrl = offer.pictures[0];
    if (pictureUrl) {
      try {
        const existingMedia = await payload.find({
          collection: "media",
          where: { alt: { equals: offer.name } },
          limit: 1,
        });
        if (existingMedia.docs.length > 0) {
          mediaId = existingMedia.docs[0].id;
        } else {
          const file = await downloadImage(pictureUrl);
          const created = await payload.create({
            collection: "media",
            data: { alt: offer.name },
            file,
          });
          mediaId = created.id;
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        payload.logger.warn(`Failed to fetch/upload image for ${mapping.slug}: ${message}`);
        imageFailures.push({ slug: mapping.slug, error: message });
      }
    }

    const data = {
      title: offer.name,
      role: mapping.role,
      description: mapping.description,
      tags: mapping.tags,
      // Omit `image` entirely when the download/upload failed, instead of
      // writing `undefined`/null — that would blank out a perfectly good
      // pre-existing image on a re-run (see docs/PROJECT_CONTEXT.md, Wave D).
      ...(mediaId ? { image: mediaId } : {}),
      sourceUrl: offer.url,
      vendorCode: offer.vendorCode,
      price: offer.price,
      inStock: offer.inStock,
    };

    const existing = await payload.find({
      collection: "products",
      where: { slug: { equals: mapping.slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      const updated = await payload.update({
        collection: "products",
        id: existing.docs[0].id,
        data,
      });
      productSlugToId.set(mapping.slug, updated.id);
    } else {
      const created = await payload.create({
        collection: "products",
        data: { ...data, slug: mapping.slug },
      });
      productSlugToId.set(mapping.slug, created.id);
    }
    productsUpserted += 1;
    payload.logger.info(`Upserted product ${mapping.slug} <- offer ${mapping.offerId}`);
  }

  // Collections need every referenced product to already exist, so resolve
  // slugs (including the 6 pre-existing ones just updated above) once here.
  const allProductDocs = await payload.find({ collection: "products", limit: 1000 });
  for (const doc of allProductDocs.docs) {
    productSlugToId.set(doc.slug, doc.id);
  }

  const collectionSlugToId = new Map<string, number>();
  const existingCollections = await payload.find({ collection: "collections", limit: 1000 });
  for (const doc of existingCollections.docs) {
    collectionSlugToId.set(doc.slug, doc.id);
  }

  let collectionsUpserted = 0;
  for (const mapping of NEW_COLLECTIONS) {
    const sequences = mapping.sequences.map((sequence) => ({
      label: sequence.label,
      steps: sequence.steps.map((step) => ({
        number: step.number,
        title: step.title,
        description: step.description,
        product: productSlugToId.get(step.productSlug),
      })),
    }));
    const recommendedProducts = mapping.recommendedProductSlugs
      .map((slug) => productSlugToId.get(slug))
      .filter((id): id is number => Boolean(id));

    const data = {
      title: mapping.title,
      description: mapping.description,
      tags: mapping.tags,
      area: mapping.area,
      routineSize: mapping.routineSize,
      sequences,
      recommendedProducts,
      usageNotes: mapping.usageNotes,
    };

    const existingId = collectionSlugToId.get(mapping.slug);
    if (existingId) {
      await payload.update({ collection: "collections", id: existingId, data });
    } else {
      const created = await payload.create({
        collection: "collections",
        data: { ...data, slug: mapping.slug },
      });
      collectionSlugToId.set(mapping.slug, created.id);
    }
    collectionsUpserted += 1;
    payload.logger.info(`Upserted collection ${mapping.slug}`);
  }

  // Second pass: relatedCollections (may reference collections created above).
  for (const mapping of NEW_COLLECTIONS) {
    const id = collectionSlugToId.get(mapping.slug);
    if (!id) continue;
    const relatedCollections = mapping.relatedCollectionSlugs
      .map((slug) => collectionSlugToId.get(slug))
      .filter((value): value is number => Boolean(value));
    await payload.update({
      collection: "collections",
      id,
      data: { relatedCollections },
    });
  }

  payload.logger.info(
    `HiLLARY catalog import complete. ${imageFailures.length} image failure(s).`
  );
  return { productsUpserted, collectionsUpserted, imageFailures };
}
