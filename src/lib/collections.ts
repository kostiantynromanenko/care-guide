import { cache } from "react";
import { getPayloadClient } from "@/lib/payload";
import { toArticle, toCollection, toNeed, toProduct, toRoutine } from "@/lib/payload-mappers";
import type { Article, Collection, Need, Product, Routine } from "@/types/content";

export const getAllNeeds = cache(async (): Promise<Need[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "needs", limit: 100, sort: "id" });
  return docs.map(toNeed);
});

export const getAllProducts = cache(async (): Promise<Product[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "products", limit: 100, sort: "id" });
  return docs.map(toProduct);
});

export const getAllCollections = cache(async (): Promise<Collection[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "collections", limit: 100, sort: "id" });
  return docs.map(toCollection);
});

export const getAllArticles = cache(async (): Promise<Article[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "articles", limit: 100, sort: "id" });
  return docs.map(toArticle);
});

export const getAllRoutines = cache(async (): Promise<Routine[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "routines", limit: 100, sort: "id" });
  return docs.map(toRoutine);
});

export const getRoutineBySlug = cache(async (slug: string): Promise<Routine | undefined> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "routines",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return docs[0] ? toRoutine(docs[0]) : undefined;
});

export async function getCollectionsByProductSlug(slug: string): Promise<Collection[]> {
  const collections = await getAllCollections();
  return collections.filter((collection) => collection.recommendedProductSlugs.includes(slug));
}

export async function getRoutinesByProductSlug(slug: string): Promise<Routine[]> {
  const routines = await getAllRoutines();
  return routines.filter((routine) => routine.steps.some((step) => step.productSlug === slug));
}

export const getCollectionBySlug = cache(
  async (slug: string): Promise<Collection | undefined> => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "collections",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    return docs[0] ? toCollection(docs[0]) : undefined;
  }
);

export const getProductBySlug = cache(async (slug: string): Promise<Product | undefined> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "products",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return docs[0] ? toProduct(docs[0]) : undefined;
});

export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
  if (slugs.length === 0) return [];
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "products",
    where: { slug: { in: slugs } },
    limit: slugs.length,
  });
  const bySlug = new Map(docs.map((doc) => [doc.slug, toProduct(doc)]));
  return slugs.map((slug) => bySlug.get(slug)).filter((product): product is Product => Boolean(product));
}

export async function getCollectionsBySlugs(slugs: string[]): Promise<Collection[]> {
  if (slugs.length === 0) return [];
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "collections",
    where: { slug: { in: slugs } },
    limit: slugs.length,
  });
  const bySlug = new Map(docs.map((doc) => [doc.slug, toCollection(doc)]));
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((collection): collection is Collection => Boolean(collection));
}

export const getArticleBySlug = cache(async (slug: string): Promise<Article | undefined> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "articles",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return docs[0] ? toArticle(docs[0]) : undefined;
});
