import { collections, products } from "@/data/demo-content";
import type { Collection, Product } from "@/types/content";

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((collection) => collection.slug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is Product => Boolean(product));
}

export function getCollectionsBySlugs(slugs: string[]): Collection[] {
  return slugs
    .map((slug) => getCollectionBySlug(slug))
    .filter((collection): collection is Collection => Boolean(collection));
}
