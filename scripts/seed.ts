import { getPayload } from "payload";
import config from "@payload-config";

import demoContent from "../demo/demo-content.json" with { type: "json" };

type DemoStep = {
  number: number;
  title: string;
  description: string;
  productSlug?: string;
};

type DemoSequence = {
  label: string;
  steps: DemoStep[];
};

type DemoCollection = {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  image: string;
  area: "face" | "hair";
  routineSize: string;
  sequences: DemoSequence[];
  recommendedProductSlugs: string[];
  usageNotes: string[];
  relatedCollectionSlugs: string[];
};

type DemoProduct = {
  title: string;
  slug: string;
  role: string;
  description: string;
  tags: string[];
  image: string;
};

type DemoArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

type DemoArticle = {
  title: string;
  slug: string;
  excerpt: string;
  body: DemoArticleBlock[];
  relatedCollectionSlugs: string[];
};

const run = async () => {
  const payload = await getPayload({ config });

  payload.logger.info("Seeding demo content into Postgres...");

  // 1. Needs (no dependencies)
  for (const need of demoContent.needs) {
    await payload.create({
      collection: "needs",
      data: need,
    });
  }
  payload.logger.info(`Created ${demoContent.needs.length} needs`);

  // 2. Products (no dependencies)
  const productSlugToId = new Map<string, number>();
  for (const product of demoContent.products as DemoProduct[]) {
    const created = await payload.create({
      collection: "products",
      data: {
        title: product.title,
        slug: product.slug,
        role: product.role,
        description: product.description,
        tags: product.tags,
      },
    });
    productSlugToId.set(product.slug, created.id);
  }
  payload.logger.info(`Created ${productSlugToId.size} products`);

  // 3. Collections — first pass without cross-references (self-relationships
  // and product relationships need every doc to already have an ID).
  const collectionSlugToId = new Map<string, number>();
  for (const collection of demoContent.collections as DemoCollection[]) {
    const created = await payload.create({
      collection: "collections",
      data: {
        title: collection.title,
        slug: collection.slug,
        description: collection.description,
        tags: collection.tags,
        area: collection.area,
        routineSize: collection.routineSize,
        sequences: collection.sequences.map((sequence) => ({
          label: sequence.label,
          steps: sequence.steps.map((step) => ({
            number: step.number,
            title: step.title,
            description: step.description,
            product: step.productSlug
              ? productSlugToId.get(step.productSlug)
              : undefined,
          })),
        })),
        usageNotes: collection.usageNotes,
      },
    });
    collectionSlugToId.set(collection.slug, created.id);
  }
  payload.logger.info(`Created ${collectionSlugToId.size} collections`);

  // 4. Collections — second pass to patch relationship fields that
  // reference other collections (including mutual references).
  for (const collection of demoContent.collections as DemoCollection[]) {
    const id = collectionSlugToId.get(collection.slug);
    if (!id) continue;

    const recommendedProducts = collection.recommendedProductSlugs
      .map((slug) => productSlugToId.get(slug))
      .filter((value): value is number => Boolean(value));

    const relatedCollections = collection.relatedCollectionSlugs
      .map((slug) => collectionSlugToId.get(slug))
      .filter((value): value is number => Boolean(value));

    await payload.update({
      collection: "collections",
      id,
      data: {
        recommendedProducts,
        relatedCollections,
      },
    });
  }
  payload.logger.info("Patched collection cross-references");

  // 5. Articles (reference collections)
  let articleCount = 0;
  for (const article of demoContent.articles as DemoArticle[]) {
    const relatedCollections = article.relatedCollectionSlugs
      .map((slug) => collectionSlugToId.get(slug))
      .filter((value): value is number => Boolean(value));

    await payload.create({
      collection: "articles",
      data: {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        body: article.body.map((block) => {
          if (block.type === "paragraph") {
            return { blockType: "paragraph" as const, text: block.text };
          }
          if (block.type === "heading") {
            return { blockType: "heading" as const, text: block.text };
          }
          return { blockType: "list" as const, items: block.items };
        }),
        relatedCollections,
      },
    });
    articleCount += 1;
  }
  payload.logger.info(`Created ${articleCount} articles`);

  // 6. Globals
  await payload.updateGlobal({
    slug: "site-settings",
    data: demoContent.site,
  });

  await payload.updateGlobal({
    slug: "notices",
    data: demoContent.notices,
  });

  await payload.updateGlobal({
    slug: "how-it-works",
    data: {
      steps: demoContent.routineSteps,
    },
  });
  payload.logger.info("Populated globals: site-settings, notices, how-it-works");

  payload.logger.info("Seed complete.");
  process.exit(0);
};

try {
  await run();
} catch (error) {
  console.error(error);
  process.exit(1);
}
