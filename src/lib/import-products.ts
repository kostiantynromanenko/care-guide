import path from "node:path";
import type { Payload } from "payload";

import type { FeedOffer } from "@/lib/hillary-feed";

/**
 * Single source of truth for every real HiLLARY product this site uses,
 * across all content waves — shared by `scripts/import-products.ts` (local
 * dev) and the protected `/api/import-products` endpoint (production). See
 * `docs/PROJECT_CONTEXT.md` § Technical status.
 *
 * This replaces what used to be three separate, growing "wave" scripts
 * (`import-hillary-catalog.ts`, `import-expert-complexes.ts`,
 * `import-more-collections.ts`) — each added its own product list as new
 * content areas were curated, which meant re-running the *products* half of
 * an old wave script whenever anything needed a title/price/photo refresh.
 * Now there's one list, one script, one route: add a new product mapping
 * here and re-run this any time.
 *
 * Idempotent: re-running updates existing docs by slug instead of
 * duplicating them, so it's safe to schedule or re-trigger manually.
 *
 * Collections (which reference these products by slug) are a separate
 * content type — see `src/lib/import-collections.ts`.
 */

interface ProductMapping {
  slug: string;
  offerId: string;
  role: string;
  description: string;
  tags: string[];
}

// The first 6 real SKUs (Wave D) replaced the original 6 fictional demo
// products from `demo/demo-content.json` — the demo-seeded collections
// (basic-dry-skin, minimal-daily-care, dry-hair-recovery) already reference
// these exact slugs, so they became real automatically.
const PRODUCTS: ProductMapping[] = [
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
    description: "Олія жожоба для нанесення на кінчики волосся перед миттям, для м'якості.",
    tags: ["Волосся", "Живлення"],
  },
  {
    slug: "recovery-hair-mask",
    offerId: "280",
    role: "Маска 1–2 рази на тиждень",
    description: "Маска з протеїнами пшениці для глибокого живлення сухого та пошкодженого волосся.",
    tags: ["Волосся", "Відновлення"],
  },
  // Wave D — closed the oiliness/sensitivity/dullness content gap.
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
    description: "Гель для м'якого очищення з вітаміном С, який не пересушує шкіру.",
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
  // Wave E — real HiLLARY "Експертні комплекси" bundles: acne, anti-aging,
  // hair-loss, hair-growth, and the new "body" area (cellulite, foot care).
  {
    slug: "acne-day-spf-set",
    offerId: "2210",
    role: "Крок 1: денний захист",
    description: "Набір для контролю висипань та щоденного захисту SPF30 — заспокоює запалення і захищає від сонця.",
    tags: ["Акне", "SPF", "Вдень"],
  },
  {
    slug: "acne-night-barrier-set",
    offerId: "2036",
    role: "Крок 2: нічне відновлення",
    description: "Нічний набір для захисту бар'єру шкіри та боротьби з акне.",
    tags: ["Акне", "Вночі"],
  },
  {
    slug: "anti-aging-eye-set",
    offerId: "2189",
    role: "Крок 1: контур очей",
    description: "Набір для зменшення зморшок і темних кіл навколо очей.",
    tags: ["Антивіковий догляд", "Контур очей"],
  },
  {
    slug: "anti-aging-peptide-set",
    offerId: "2122",
    role: "Крок 2: пептидний догляд",
    description: "Комплекс пептидного омолодження для корекції зморшок.",
    tags: ["Антивіковий догляд", "Пептиди"],
  },
  {
    slug: "hair-loss-shampoo-set",
    offerId: "1078",
    role: "Крок 1: щоденне миття",
    description: "Шампунь та кондиціонер проти випадіння волосся Serenoa & PP.",
    tags: ["Волосся", "Проти випадіння"],
  },
  {
    slug: "hair-loss-complex",
    offerId: "740",
    role: "Крок 2: інтенсивний догляд",
    description: "Концентрований комплекс проти випадіння волосся.",
    tags: ["Волосся", "Проти випадіння"],
  },
  {
    slug: "hair-growth-shampoo-set",
    offerId: "1128",
    role: "Крок 1: щоденне миття",
    description: "Шампунь та кондиціонер для росту волосся Hop Cones & B5.",
    tags: ["Волосся", "Ріст волосся"],
  },
  {
    slug: "hair-growth-complex",
    offerId: "793",
    role: "Крок 2: стимуляція росту",
    description: "Концентрований комплекс для стимуляції росту волосся.",
    tags: ["Волосся", "Ріст волосся"],
  },
  {
    slug: "body-cellulite-express",
    offerId: "2205",
    role: "Крок 1: щоденний догляд",
    description: "Експрес-комплекс для антицелюлітного догляду за тілом.",
    tags: ["Тіло", "Антицелюліт"],
  },
  {
    slug: "body-cellulite-course",
    offerId: "2160",
    role: "Крок 2: інтенсивний курс",
    description: "Курс для моделювання тіла та боротьби з целюлітом.",
    tags: ["Тіло", "Антицелюліт"],
  },
  {
    slug: "foot-care-cream",
    offerId: "2136",
    role: "Крок 1: щоденний крем",
    description: "Відновлювальний крем для сухої та потрісканої шкіри ніг.",
    tags: ["Стопи", "Щодня"],
  },
  {
    slug: "foot-care-set",
    offerId: "1973",
    role: "Крок 2: інтенсивне відновлення",
    description: "Набір проти тріщин, сухості та запаху стоп.",
    tags: ["Стопи", "Відновлення"],
  },
  {
    slug: "oil-control-spf-complex",
    offerId: "2211",
    role: "Крок 4: себорегуляція та SPF",
    description: "Комплекс для очищення, себорегуляції та захисту шкіри SPF 30.",
    tags: ["Жирна шкіра", "SPF"],
  },
  {
    slug: "sensitive-eye-calm-set",
    offerId: "2188",
    role: "Додатково: контур очей",
    description: "Набір для заспокоєння шкіри та корекції темних кіл під очима.",
    tags: ["Чутлива шкіра", "Контур очей"],
  },
  {
    slug: "pigmentation-spf-complex",
    offerId: "2191",
    role: "Додатково: пігментація та SPF",
    description: "Комплекс для освітлення пігментації та захисту шкіри SPF.",
    tags: ["Тьмяний тон", "Пігментація", "SPF"],
  },
  // Wave F — post-acne pigmentation, firming/lifting, puffiness, pores, SPF, lips.
  {
    slug: "acne-marks-brightening-set",
    offerId: "1930",
    role: "Крок 1: освітлення слідів постакне",
    description: "Набір проти тьмяності та слідів постакне з освітлювальним ефектом.",
    tags: ["Акне", "Пігментація", "Постакне"],
  },
  {
    slug: "acne-pigmentation-control-kit",
    offerId: "2037",
    role: "Крок 2: контроль висипань і пігментації",
    description: "Комплекс проти висипань та пігментних плям після акне.",
    tags: ["Акне", "Пігментація"],
  },
  {
    slug: "firming-lifting-set",
    offerId: "2025",
    role: "Крок 1: ліфтинг та розгладження",
    description: "Набір для ліфтингу та розгладження шкіри обличчя.",
    tags: ["Антивіковий догляд", "Ліфтинг"],
  },
  {
    slug: "firming-barrier-complex",
    offerId: "2132",
    role: "Крок 2: підтримка бар'єру та відновлення",
    description: "Комплекс антивікового догляду для підтримки бар'єру шкіри та відновлення.",
    tags: ["Антивіковий догляд", "Відновлення"],
  },
  {
    slug: "anti-puffiness-lifting-kit",
    offerId: "2026",
    role: "Крок 1: проти набряків та ліфтинг",
    description: "Набір проти набряків та для ліфтингу шкіри обличчя.",
    tags: ["Набряки", "Ліфтинг"],
  },
  {
    slug: "anti-puffiness-microcirculation-complex",
    offerId: "2108",
    role: "Крок 2: мікроциркуляція та відновлення",
    description: "Комплекс для зменшення набряків та відновлення мікроциркуляції шкіри.",
    tags: ["Набряки", "Відновлення"],
  },
  {
    slug: "pore-minimizing-night-kit",
    offerId: "2035",
    role: "Крок 2: звуження пор вночі",
    description: "Набір для звуження пор та інтенсивного догляду вночі.",
    tags: ["Пори", "Вночі"],
  },
  {
    slug: "pore-oil-control-set",
    offerId: "2123",
    role: "Крок 1: контроль жирного блиску вдень",
    description: "Комплекс для контролю жирного блиску та звуження пор.",
    tags: ["Пори", "Жирна шкіра"],
  },
  {
    slug: "sun-protection-daily-spf30",
    offerId: "1431",
    role: "Щодня: захист SPF 30",
    description: "Сонцезахисна мінеральна пудра та крем для обличчя SPF 30+.",
    tags: ["SPF", "Щодня"],
  },
  {
    slug: "sun-protection-intensive-spf50",
    offerId: "1437",
    role: "Активне сонце: захист SPF 50",
    description: "Сонцезахисна мінеральна пудра та крем для обличчя SPF 50+ для посиленого захисту.",
    tags: ["SPF", "Інтенсивний захист"],
  },
  {
    slug: "lip-balm-argan-daily",
    offerId: "977",
    role: "Крок 1: щоденний захисний бальзам",
    description: "Захисний бальзам для губ з олією аргани для щоденного догляду.",
    tags: ["Губи", "Щодня"],
  },
  {
    slug: "lip-repair-hydration-set",
    offerId: "2042",
    role: "Крок 2: інтенсивне відновлення",
    description: "Набір проти тріщин та для зволоження губ.",
    tags: ["Губи", "Відновлення"],
  },
  {
    slug: "hair-volume-texture-protection-set",
    offerId: "2194",
    role: "Додатково: об'єм та захист",
    description: "Набір для об'єму, текстури та захисту волосся.",
    tags: ["Волосся", "Об'єм"],
  },
  {
    slug: "cellulite-seasonal-duo",
    offerId: "1109",
    role: "Додатково: сезонний догляд",
    description: "Антицелюлітний ліпосомальний гель та ліфтинг-гоммаж для сезонного догляду за тілом.",
    tags: ["Тіло", "Сезонний догляд"],
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

export interface ImportProductsSummary {
  productsUpserted: number;
  skippedOffers: string[];
  imageFailures: { slug: string; error: string }[];
}

/**
 * Runs `worker` over `items` with at most `concurrency` in flight at once.
 *
 * The per-product work here is dominated by network I/O (downloading a
 * product photo from hillary.ua, then uploading it to Vercel Blob) rather
 * than CPU, so processing the ~45 products fully sequentially could take
 * over a minute and blow past the serverless function's `maxDuration` —
 * that's exactly what happened on the first production run of this route.
 * Running a handful concurrently cuts wall-clock time roughly by the
 * concurrency factor while staying gentle on Payload's DB connection pool.
 */
async function mapWithConcurrency<T>(
  items: T[],
  concurrency: number,
  worker: (item: T, index: number) => Promise<void>
): Promise<void> {
  let cursor = 0;
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      await worker(items[index], index);
    }
  });
  await Promise.all(runners);
}

export async function importProducts(
  payload: Payload,
  offers: Map<string, FeedOffer>
): Promise<ImportProductsSummary> {
  payload.logger.info(`Importing ${PRODUCTS.length} products from ${offers.size} loaded offers...`);

  let productsUpserted = 0;
  const skippedOffers: string[] = [];
  const imageFailures: { slug: string; error: string }[] = [];

  await mapWithConcurrency(PRODUCTS, 8, async (mapping) => {
    const offer = offers.get(mapping.offerId);
    if (!offer) {
      payload.logger.warn(`Offer ${mapping.offerId} not found in feed, skipping ${mapping.slug}`);
      skippedOffers.push(mapping.offerId);
      return;
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
      // pre-existing image on a re-run.
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
      await payload.update({ collection: "products", id: existing.docs[0].id, data });
    } else {
      await payload.create({ collection: "products", data: { ...data, slug: mapping.slug } });
    }
    productsUpserted += 1;
    payload.logger.info(`Upserted product ${mapping.slug} <- offer ${mapping.offerId}`);
  });

  payload.logger.info(
    `Products import complete. ${skippedOffers.length} offer(s) missing from feed, ${imageFailures.length} image failure(s).`
  );
  return { productsUpserted, skippedOffers, imageFailures };
}
