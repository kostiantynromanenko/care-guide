import type { Payload } from "payload";

/**
 * Seeds the 2 remaining educational articles from the suggested-topics list
 * in docs/SITE_STRUCTURE.md §9 ("Для чого потрібен SPF", "Як вводити активні
 * компоненти") — the other 3 already exist via `scripts/seed.ts`/demo
 * content. Kept separate from that seed (rather than added to
 * `demo/demo-content.json`) so re-running it never touches the real
 * HiLLARY product/collection data imported in Wave D. Idempotent (upserts
 * by slug).
 */

type ArticleBlockMapping =
  | { blockType: "paragraph"; text: string }
  | { blockType: "heading"; text: string }
  | { blockType: "list"; items: string[] };

interface ArticleMapping {
  slug: string;
  title: string;
  excerpt: string;
  body: ArticleBlockMapping[];
  relatedCollectionSlugs: string[];
}

const ARTICLES: ArticleMapping[] = [
  {
    slug: "why-spf-matters",
    title: "Для чого потрібен SPF",
    excerpt: "Один крок, який найбільше впливає на стан шкіри в довгостроковій перспективі.",
    body: [
      {
        blockType: "paragraph",
        text: "Сонцезахисний засіб — це не сезонний крок і не щось потрібне лише на пляжі. Ультрафіолет впливає на шкіру щодня, навіть у похмуру погоду та взимку, і саме він — головна зовнішня причина передчасних змін шкіри й нерівного тону.",
      },
      { blockType: "heading", text: "Що дає щоденний SPF" },
      {
        blockType: "list",
        items: [
          "Знижує ризик нерівного тону та передчасних змін шкіри",
          "Підтримує результат інших засобів у рутині — зокрема сироваток з вітаміном С",
          "Захищає шкіру, яка вже чутлива через активні компоненти в догляді",
        ],
      },
      { blockType: "heading", text: "Коли наносити" },
      {
        blockType: "paragraph",
        text: "SPF — завершальний крок ранкової рутини, після зволожувального засобу. Наносьте його щоранку, незалежно від погоди чи пори року, і оновлюйте протягом дня, якщо довго перебуваєте на сонці.",
      },
    ],
    relatedCollectionSlugs: ["basic-dry-skin"],
  },
  {
    slug: "introducing-active-ingredients",
    title: "Як вводити активні компоненти",
    excerpt: "Просте правило для нових засобів із вітаміном С, кислотами чи ретинолом.",
    body: [
      {
        blockType: "paragraph",
        text: "Активні компоненти (наприклад, вітамін С чи кислоти) можуть відчутно покращити стан шкіри, але вони ж найчастіше спричиняють подразнення, якщо додати відразу кілька нових засобів одночасно.",
      },
      { blockType: "heading", text: "Головне правило" },
      {
        blockType: "list",
        items: [
          "Вводьте по одному новому засобу за раз",
          "Перевіряйте реакцію шкіри протягом кількох днів, перш ніж додавати наступний",
          "Починайте з нанесення через день, а не щодня",
          "За появи почервоніння чи стягнутості — зменшіть частоту або тимчасово припиніть використання",
        ],
      },
      { blockType: "heading", text: "Що варто пам'ятати" },
      {
        blockType: "paragraph",
        text: "Активні компоненти можуть підвищувати чутливість шкіри до сонця, тож вони особливо потребують щоденного SPF у парі. Це не привід відмовлятися від них — лише привід вводити їх поступово й уважно.",
      },
    ],
    relatedCollectionSlugs: ["vitamin-c-glow", "calm-sensitive-skin"],
  },
];

export interface ArticlesImportSummary {
  articlesUpserted: number;
}

export async function importArticles(payload: Payload): Promise<ArticlesImportSummary> {
  payload.logger.info("Seeding remaining educational articles...");

  const allCollections = await payload.find({ collection: "collections", limit: 1000 });
  const collectionSlugToId = new Map(allCollections.docs.map((doc) => [doc.slug, doc.id]));

  let articlesUpserted = 0;

  for (const mapping of ARTICLES) {
    const relatedCollections = mapping.relatedCollectionSlugs
      .map((slug) => collectionSlugToId.get(slug))
      .filter((id): id is number => Boolean(id));

    const data = {
      title: mapping.title,
      excerpt: mapping.excerpt,
      body: mapping.body,
      relatedCollections,
    };

    const existing = await payload.find({
      collection: "articles",
      where: { slug: { equals: mapping.slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      await payload.update({ collection: "articles", id: existing.docs[0].id, data });
    } else {
      await payload.create({ collection: "articles", data: { ...data, slug: mapping.slug } });
    }
    articlesUpserted += 1;
    payload.logger.info(`Upserted article ${mapping.slug}`);
  }

  payload.logger.info("Articles seed complete.");
  return { articlesUpserted };
}
