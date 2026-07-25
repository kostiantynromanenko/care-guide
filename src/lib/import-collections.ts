import type { Payload } from "payload";

/**
 * Single source of truth for every real HiLLARY-backed collection this site
 * uses, across all content waves — shared by `scripts/import-collections.ts`
 * (local dev) and the protected `/api/import-collections` endpoint
 * (production). See `docs/PROJECT_CONTEXT.md` § Technical status.
 *
 * Replaces what used to be spread across three "wave" scripts
 * (`import-hillary-catalog.ts`, `import-expert-complexes.ts`,
 * `import-more-collections.ts`), each of which bundled its own collections
 * together with that wave's products. Now there's one list, one script, one
 * route — add a new collection mapping here and re-run this any time.
 *
 * Unlike products, this needs no feed access: every collection here only
 * references products by slug, and those must already exist (run
 * `src/lib/import-products.ts` first). The 3 original demo-seeded
 * collections (basic-dry-skin, minimal-daily-care, dry-hair-recovery, from
 * `demo/demo-content.json`) aren't listed here — they're part of the
 * one-time initial bootstrap (`scripts/seed.ts`), not this ongoing import.
 *
 * Idempotent: re-running updates existing docs by slug instead of
 * duplicating them, so it's safe to re-trigger manually.
 */

interface CollectionMapping {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  area: "face" | "hair" | "body";
  routineSize: string;
  sequences: {
    label: string;
    steps: { number: number; title: string; description: string; productSlug: string }[];
  }[];
  recommendedProductSlugs: string[];
  usageNotes: string[];
  relatedCollectionSlugs: string[];
}

interface EnrichmentMapping {
  collectionSlug: string;
  sequenceLabel: string;
  step: { number: number; title: string; description: string; productSlug: string };
}

const COLLECTIONS: CollectionMapping[] = [
  // Wave D — closed the oiliness/sensitivity/dullness content gap.
  {
    title: "Догляд для жирної та комбінованої шкіри",
    slug: "oil-control-combination-skin",
    description: "Менше жирного блиску і чистіші пори — без пересушування шкіри.",
    tags: ["Жирна шкіра", "Контроль жирності", "3-4 засоби"],
    area: "face",
    routineSize: "3 засоби · щодня + 1 щотижня",
    sequences: [
      {
        label: "Щодня",
        steps: [
          { number: 1, title: "Демакіяж", description: "Видалити макіяж і сонцезахисний засіб гідрофільною олією.", productSlug: "cleansing-oil-oily" },
          { number: 2, title: "Очищення", description: "М'яко очистити шкіру пінкою для жирної та комбінованої шкіри.", productSlug: "cleansing-foam-oily" },
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
    relatedCollectionSlugs: ["minimal-daily-care", "pore-care"],
  },
  {
    title: "Догляд для чутливої шкіри",
    slug: "calm-sensitive-skin",
    description: "Заспокійте чутливу шкіру та зменшіть відчуття дискомфорту — м'якими перевіреними кроками.",
    tags: ["Чутлива шкіра", "Заспокоєння", "4 кроки"],
    area: "face",
    routineSize: "4 кроки · щодня",
    sequences: [
      {
        label: "Щодня",
        steps: [
          { number: 1, title: "Демакіяж", description: "Делікатно видалити макіяж гідрофільною олією.", productSlug: "cleansing-oil-dry-sensitive" },
          { number: 2, title: "Очищення", description: "М'яко очистити шкіру пінкою без відчуття стягнутості.", productSlug: "gentle-cleanser" },
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
    relatedCollectionSlugs: ["basic-dry-skin", "anti-puffiness-care"],
  },
  {
    title: "Догляд для сяйва та рівного тону",
    slug: "vitamin-c-glow",
    description: "Більш свіжий і рівний тон шкіри — чотири кроки з вітаміном С.",
    tags: ["Тьмяний тон", "Vitamin C", "4 кроки"],
    area: "face",
    routineSize: "4 кроки · щодня",
    sequences: [
      {
        label: "Щодня",
        steps: [
          { number: 1, title: "Очищення", description: "М'яко очистити шкіру гелем з вітаміном С.", productSlug: "vitamin-c-cleanser" },
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
    relatedCollectionSlugs: ["basic-dry-skin", "sun-protection-care"],
  },
  // Wave E — real HiLLARY "Експертні комплекси" bundles.
  {
    title: "Догляд при акне та висипаннях",
    slug: "acne-breakouts-care",
    description: "Заспокійте запалення та зменшіть сліди постакне — денний захист і нічне відновлення.",
    tags: ["Акне", "Висипання", "2 набори"],
    area: "face",
    routineSize: "2 набори · день + ніч",
    sequences: [
      {
        label: "Щодня",
        steps: [
          { number: 1, title: "Вдень", description: "Очистіть шкіру та нанесіть засоби з SPF-захистом.", productSlug: "acne-day-spf-set" },
          { number: 2, title: "Ввечері", description: "Використайте нічний набір для відновлення бар'єру шкіри.", productSlug: "acne-night-barrier-set" },
        ],
      },
    ],
    recommendedProductSlugs: ["acne-day-spf-set", "acne-night-barrier-set"],
    usageNotes: [
      "Не поєднуйте одразу декілька активних засобів проти акне — вводьте по одному.",
      "SPF вдень обов'язковий навіть у похмуру погоду.",
    ],
    relatedCollectionSlugs: ["oil-control-combination-skin", "acne-marks-pigmentation-care"],
  },
  {
    title: "Антивіковий догляд",
    slug: "anti-aging-care",
    description: "Менше видимих зморшок і свіжіший погляд — м'який щоденний догляд без агресивних процедур.",
    tags: ["Антивіковий догляд", "Пептиди", "2 набори"],
    area: "face",
    routineSize: "2 набори · щодня",
    sequences: [
      {
        label: "Щодня",
        steps: [
          { number: 1, title: "Контур очей", description: "Нанесіть засіб проти зморшок і темних кіл навколо очей.", productSlug: "anti-aging-eye-set" },
          { number: 2, title: "Обличчя", description: "Використайте пептидний комплекс для пружності шкіри.", productSlug: "anti-aging-peptide-set" },
        ],
      },
    ],
    recommendedProductSlugs: ["anti-aging-eye-set", "anti-aging-peptide-set"],
    usageNotes: [
      "Такий догляд не замінює SPF — наносьте сонцезахисний засіб окремо вранці.",
      "Перші результати помітні за кілька тижнів регулярного використання.",
    ],
    relatedCollectionSlugs: ["vitamin-c-glow", "firming-lifting-care"],
  },
  {
    title: "Проти випадіння волосся",
    slug: "hair-loss-control",
    description: "Зміцніть волосся біля коріння — щоденне миття та концентрований курс проти випадіння.",
    tags: ["Волосся", "Проти випадіння", "2 засоби"],
    area: "hair",
    routineSize: "2 засоби · щодня + курс",
    sequences: [
      {
        label: "Щодня",
        steps: [
          { number: 1, title: "Миття", description: "Мийте голову шампунем та кондиціонером проти випадіння.", productSlug: "hair-loss-shampoo-set" },
          { number: 2, title: "Курс", description: "Наносьте концентрований комплекс за інструкцією курсом.", productSlug: "hair-loss-complex" },
        ],
      },
    ],
    recommendedProductSlugs: ["hair-loss-shampoo-set", "hair-loss-complex"],
    usageNotes: [
      "Курсові засоби працюють поступово — оцінюйте результат не раніше ніж за 2–3 місяці.",
      "У разі сильного випадіння волосся варто також звернутися до лікаря.",
    ],
    relatedCollectionSlugs: ["dry-hair-recovery"],
  },
  {
    title: "Стимуляція росту волосся",
    slug: "hair-growth-boost",
    description: "Підтримайте ріст волосся — щоденне миття та концентрована сироватка-стимулятор.",
    tags: ["Волосся", "Ріст волосся", "2 засоби"],
    area: "hair",
    routineSize: "2 засоби · щодня + курс",
    sequences: [
      {
        label: "Щодня",
        steps: [
          { number: 1, title: "Миття", description: "Мийте голову шампунем та кондиціонером для росту волосся.", productSlug: "hair-growth-shampoo-set" },
          { number: 2, title: "Курс", description: "Наносьте комплекс для стимуляції росту курсом.", productSlug: "hair-growth-complex" },
        ],
      },
    ],
    recommendedProductSlugs: ["hair-growth-shampoo-set", "hair-growth-complex"],
    usageNotes: [
      "Стимулюючі засоби наносьте на чисту шкіру голови масажними рухами.",
      "Ріст волосся залежить не тільки від косметики — важливі також харчування і сон.",
    ],
    relatedCollectionSlugs: ["dry-hair-recovery"],
  },
  {
    title: "Антицелюлітний догляд",
    slug: "anti-cellulite-care",
    description: "Пружніша та доглянутіша шкіра тіла — щоденний експрес-догляд і інтенсивний курс.",
    tags: ["Тіло", "Антицелюліт", "2 засоби"],
    area: "body",
    routineSize: "2 засоби · щодня + курс",
    sequences: [
      {
        label: "Щодня",
        steps: [
          { number: 1, title: "Експрес-догляд", description: "Наносьте експрес-комплекс під час душу масажними рухами.", productSlug: "body-cellulite-express" },
          { number: 2, title: "Курс", description: "Проходьте інтенсивний курс моделювання тіла за інструкцією.", productSlug: "body-cellulite-course" },
        ],
      },
    ],
    recommendedProductSlugs: ["body-cellulite-express", "body-cellulite-course"],
    usageNotes: [
      "Найкращий ефект — у поєднанні з регулярною фізичною активністю.",
      "Наносьте масажними рухами знизу вгору.",
    ],
    relatedCollectionSlugs: ["foot-care-recovery"],
  },
  {
    title: "Догляд за стопами",
    slug: "foot-care-recovery",
    description: "М'які п'яти без тріщин і сухості — простий щоденний крем і засіб для інтенсивного відновлення.",
    tags: ["Тіло", "Стопи", "2 засоби"],
    area: "body",
    routineSize: "2 засоби · щодня + за потреби",
    sequences: [
      {
        label: "Щодня",
        steps: [
          { number: 1, title: "Крем", description: "Наносьте зволожувальний крем на чисту суху шкіру стоп.", productSlug: "foot-care-cream" },
          { number: 2, title: "Інтенсивне відновлення", description: "За потреби додайте набір проти тріщин і сухості стоп.", productSlug: "foot-care-set" },
        ],
      },
    ],
    recommendedProductSlugs: ["foot-care-cream", "foot-care-set"],
    usageNotes: [
      "Найкраще наносити ввечері перед сном, за потреби — під бавовняні шкарпетки.",
      "При глибоких тріщинах, що не гояться, зверніться до дерматолога.",
    ],
    relatedCollectionSlugs: ["anti-cellulite-care"],
  },
  // Wave F — post-acne pigmentation, firming/lifting, puffiness, pores, SPF, lips.
  {
    title: "Догляд проти слідів постакне",
    slug: "acne-marks-pigmentation-care",
    description: "Освітліть сліди постакне та вирівняйте тон — курс проти пігментації після висипань.",
    tags: ["Акне", "Пігментація", "2 набори"],
    area: "face",
    routineSize: "2 набори · курс",
    sequences: [
      {
        label: "Курс",
        steps: [
          { number: 1, title: "Освітлення", description: "Наносьте набір проти тьмяності та слідів постакне.", productSlug: "acne-marks-brightening-set" },
          { number: 2, title: "Контроль", description: "Використайте комплекс контролю висипань і пігментації курсом.", productSlug: "acne-pigmentation-control-kit" },
        ],
      },
    ],
    recommendedProductSlugs: ["acne-marks-brightening-set", "acne-pigmentation-control-kit"],
    usageNotes: [
      "Результат щодо слідів постакне помітний поступово — оцінюйте за 4–6 тижнів.",
      "Вдень обов'язково додайте SPF-захист.",
    ],
    relatedCollectionSlugs: ["acne-breakouts-care", "vitamin-c-glow"],
  },
  {
    title: "Ліфтинг та пружність шкіри",
    slug: "firming-lifting-care",
    description: "Візуально підтягніть овал обличчя — ліфтинг-догляд з підтримкою бар'єру шкіри.",
    tags: ["Антивіковий догляд", "Ліфтинг", "2 набори"],
    area: "face",
    routineSize: "2 набори · щодня",
    sequences: [
      {
        label: "Щодня",
        steps: [
          { number: 1, title: "Ліфтинг", description: "Наносьте набір для ліфтингу та розгладження шкіри.", productSlug: "firming-lifting-set" },
          { number: 2, title: "Відновлення", description: "Завершіть комплексом для підтримки бар'єру шкіри.", productSlug: "firming-barrier-complex" },
        ],
      },
    ],
    recommendedProductSlugs: ["firming-lifting-set", "firming-barrier-complex"],
    usageNotes: [
      "Наносьте масажними рухами знизу вгору, за напрямком масажних ліній обличчя.",
      "Поєднуйте з SPF вдень для довготривалого ефекту.",
    ],
    relatedCollectionSlugs: ["anti-aging-care"],
  },
  {
    title: "Проти набряків та втоми шкіри",
    slug: "anti-puffiness-care",
    description: "Зніміть набряклість і поверніть свіжий вигляд — комплекс для мікроциркуляції та ліфтингу.",
    tags: ["Набряки", "Мікроциркуляція", "2 набори"],
    area: "face",
    routineSize: "2 набори · щодня",
    sequences: [
      {
        label: "Щодня",
        steps: [
          { number: 1, title: "Ліфтинг", description: "Наносьте набір проти набряків з ліфтинг-ефектом.", productSlug: "anti-puffiness-lifting-kit" },
          { number: 2, title: "Мікроциркуляція", description: "Завершіть комплексом для відновлення мікроциркуляції шкіри.", productSlug: "anti-puffiness-microcirculation-complex" },
        ],
      },
    ],
    recommendedProductSlugs: ["anti-puffiness-lifting-kit", "anti-puffiness-microcirculation-complex"],
    usageNotes: [
      "Найкраще наносити вранці легкими поплескуючими рухами навколо очей і контуру обличчя.",
      "Достатній сон і менше солі в раціоні також допомагають зменшити набряки.",
    ],
    relatedCollectionSlugs: ["calm-sensitive-skin", "anti-aging-care"],
  },
  {
    title: "Звуження пор",
    slug: "pore-care",
    description: "Зменште видимість пор і контролюйте жирний блиск — день і ніч.",
    tags: ["Пори", "Жирна шкіра", "2 набори"],
    area: "face",
    routineSize: "2 набори · день + ніч",
    sequences: [
      {
        label: "Щодня",
        steps: [
          { number: 1, title: "Вдень", description: "Контролюйте жирний блиск та звужуйте пори вдень.", productSlug: "pore-oil-control-set" },
          { number: 2, title: "Ввечері", description: "Використайте нічний набір для звуження пор.", productSlug: "pore-minimizing-night-kit" },
        ],
      },
    ],
    recommendedProductSlugs: ["pore-oil-control-set", "pore-minimizing-night-kit"],
    usageNotes: [
      "Не забувайте про м'яке очищення — забиті пори виглядають помітнішими.",
      "SPF вдень запобігає додатковому розширенню пор від сонця.",
    ],
    relatedCollectionSlugs: ["oil-control-combination-skin"],
  },
  {
    title: "Сонцезахист для обличчя",
    slug: "sun-protection-care",
    description: "Захистіть шкіру від сонця щодня — легкий захист і посилений варіант для активного сонця.",
    tags: ["SPF", "Сонцезахист", "2 рівні"],
    area: "face",
    routineSize: "2 рівні захисту · за потреби",
    sequences: [
      {
        label: "Захист",
        steps: [
          { number: 1, title: "Щодня", description: "Наносьте легкий захист SPF 30 в будні дні.", productSlug: "sun-protection-daily-spf30" },
          { number: 2, title: "Активне сонце", description: "Обирайте посилений захист SPF 50 для пляжу чи тривалого перебування на сонці.", productSlug: "sun-protection-intensive-spf50" },
        ],
      },
    ],
    recommendedProductSlugs: ["sun-protection-daily-spf30", "sun-protection-intensive-spf50"],
    usageNotes: [
      "Оновлюйте захист кожні 2 години активного перебування на сонці.",
      "SPF потрібен навіть у похмуру погоду та взимку.",
    ],
    relatedCollectionSlugs: ["vitamin-c-glow", "anti-aging-care"],
  },
  {
    title: "Догляд за губами",
    slug: "lip-care",
    description: "М'які, доглянуті губи без сухості — простий щоденний бальзам і засіб для відновлення.",
    tags: ["Губи", "2 засоби"],
    area: "face",
    routineSize: "2 засоби · щодня",
    sequences: [
      {
        label: "Щодня",
        steps: [
          { number: 1, title: "Захист", description: "Наносьте бальзам з олією аргани протягом дня.", productSlug: "lip-balm-argan-daily" },
          { number: 2, title: "Відновлення", description: "За потреби додайте набір проти тріщин і сухості губ.", productSlug: "lip-repair-hydration-set" },
        ],
      },
    ],
    recommendedProductSlugs: ["lip-balm-argan-daily", "lip-repair-hydration-set"],
    usageNotes: [
      "Наносьте бальзам перед виходом на холод чи сонце, а не тільки при відчутті сухості.",
      "Не облизуйте губи — це посилює сухість.",
    ],
    relatedCollectionSlugs: ["basic-dry-skin"],
  },
];

const ENRICHMENTS: EnrichmentMapping[] = [
  {
    collectionSlug: "oil-control-combination-skin",
    sequenceLabel: "Щодня",
    step: {
      number: 4,
      title: "SPF та себорегуляція",
      description: "Завершіть ранковий догляд комплексом для себорегуляції з SPF-захистом.",
      productSlug: "oil-control-spf-complex",
    },
  },
  {
    collectionSlug: "calm-sensitive-skin",
    sequenceLabel: "Щодня",
    step: {
      number: 5,
      title: "Контур очей",
      description: "Додатково нанесіть засіб для заспокоєння шкіри та зменшення темних кіл навколо очей.",
      productSlug: "sensitive-eye-calm-set",
    },
  },
  {
    collectionSlug: "vitamin-c-glow",
    sequenceLabel: "Щодня",
    step: {
      number: 5,
      title: "Пігментація та SPF",
      description: "Додатково використайте комплекс для освітлення пігментації із SPF-захистом.",
      productSlug: "pigmentation-spf-complex",
    },
  },
  {
    collectionSlug: "dry-hair-recovery",
    sequenceLabel: "Кроки догляду",
    step: {
      number: 5,
      title: "Додатково: об'єм та захист",
      description: "За бажанням додайте набір для об'єму, текстури та захисту волосся.",
      productSlug: "hair-volume-texture-protection-set",
    },
  },
  {
    collectionSlug: "anti-cellulite-care",
    sequenceLabel: "Щодня",
    step: {
      number: 3,
      title: "Сезонний догляд",
      description: "Додайте ліпосомальний гель та ліфтинг-гоммаж для сезонного інтенсиву.",
      productSlug: "cellulite-seasonal-duo",
    },
  },
];

export interface ImportCollectionsSummary {
  collectionsUpserted: number;
  collectionsEnriched: number;
  skippedProducts: string[];
}

export async function importCollections(payload: Payload): Promise<ImportCollectionsSummary> {
  payload.logger.info(`Importing ${COLLECTIONS.length} collections...`);

  const productSlugToId = new Map<string, number>();
  const allProductDocs = await payload.find({ collection: "products", limit: 1000 });
  for (const doc of allProductDocs.docs) {
    productSlugToId.set(doc.slug, doc.id);
  }

  const collectionSlugToId = new Map<string, number>();
  const existingCollections = await payload.find({ collection: "collections", limit: 1000 });
  for (const doc of existingCollections.docs) {
    collectionSlugToId.set(doc.slug, doc.id);
  }

  const skippedProducts: string[] = [];
  let collectionsUpserted = 0;
  for (const mapping of COLLECTIONS) {
    const sequences = mapping.sequences.map((sequence) => ({
      label: sequence.label,
      steps: sequence.steps.map((step) => {
        const productId = productSlugToId.get(step.productSlug);
        if (!productId) skippedProducts.push(step.productSlug);
        return {
          number: step.number,
          title: step.title,
          description: step.description,
          product: productId,
        };
      }),
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
      const created = await payload.create({ collection: "collections", data: { ...data, slug: mapping.slug } });
      collectionSlugToId.set(mapping.slug, created.id);
    }
    collectionsUpserted += 1;
    payload.logger.info(`Upserted collection ${mapping.slug}`);
  }

  // Second pass: relatedCollections may reference collections created above,
  // and may also point back at pre-existing (demo-seeded) collections.
  for (const mapping of COLLECTIONS) {
    const id = collectionSlugToId.get(mapping.slug);
    if (!id) continue;
    const relatedCollections = mapping.relatedCollectionSlugs
      .map((slug) => collectionSlugToId.get(slug))
      .filter((value): value is number => Boolean(value));
    await payload.update({ collection: "collections", id, data: { relatedCollections } });
  }

  let collectionsEnriched = 0;
  for (const enrichment of ENRICHMENTS) {
    const productId = productSlugToId.get(enrichment.step.productSlug);
    if (!productId) {
      skippedProducts.push(enrichment.step.productSlug);
      continue;
    }

    const existing = await payload.find({
      collection: "collections",
      where: { slug: { equals: enrichment.collectionSlug } },
      limit: 1,
    });
    if (existing.docs.length === 0) {
      payload.logger.warn(`Collection ${enrichment.collectionSlug} not found, skipping enrichment`);
      continue;
    }
    const doc = existing.docs[0];

    const currentSequences = (doc.sequences ?? []).map((sequence) => ({
      label: sequence.label,
      steps: (sequence.steps ?? []).map((step) => ({
        number: step.number,
        title: step.title,
        description: step.description,
        product: typeof step.product === "object" && step.product ? step.product.id : step.product,
      })),
    }));

    const targetSequence = currentSequences.find((sequence) => sequence.label === enrichment.sequenceLabel);
    const alreadyHasStep = targetSequence?.steps.some((step) => step.product === productId);

    if (targetSequence && !alreadyHasStep) {
      targetSequence.steps.push({
        number: enrichment.step.number,
        title: enrichment.step.title,
        description: enrichment.step.description,
        product: productId,
      });
    }

    const currentProductIds = (doc.recommendedProducts ?? []).map((product) =>
      typeof product === "object" && product ? product.id : product
    );
    const recommendedProducts = currentProductIds.includes(productId)
      ? currentProductIds
      : [...currentProductIds, productId];

    await payload.update({
      collection: "collections",
      id: doc.id,
      data: { sequences: currentSequences, recommendedProducts },
    });
    collectionsEnriched += 1;
    payload.logger.info(`Enriched collection ${enrichment.collectionSlug} with ${enrichment.step.productSlug}`);
  }

  payload.logger.info(
    `Collections import complete. ${skippedProducts.length} referenced product(s) missing.`
  );
  return { collectionsUpserted, collectionsEnriched, skippedProducts };
}
