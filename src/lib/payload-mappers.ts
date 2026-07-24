import type {
  Article as PayloadArticle,
  Collection as PayloadCollection,
  Need as PayloadNeed,
  Product as PayloadProduct,
} from "@/payload-types";
import type {
  Article,
  ArticleBlock,
  Collection,
  Need,
  Product,
  RoutineSequence,
} from "@/types/content";

/**
 * Converts Payload's generated document shapes into the existing
 * `src/types/content.ts` view-model shapes, so presentational components
 * (already design-approved) don't need to change at all for Wave B.
 *
 * `CollectionCard`/`ProductCard` never resolve `.image` as a URL (they
 * render decorative placeholders regardless), so the `image` field below is
 * intentionally left as an empty string rather than resolving the Payload
 * Media relation.
 */

export function toNeed(doc: PayloadNeed): Need {
  return {
    title: doc.title,
    slug: doc.slug,
    description: doc.description,
  };
}

export function toProduct(doc: PayloadProduct): Product {
  return {
    title: doc.title,
    slug: doc.slug,
    role: doc.role,
    description: doc.description,
    tags: doc.tags ?? [],
    image: "",
  };
}

function toSequences(
  sequences: PayloadCollection["sequences"]
): RoutineSequence[] {
  return (sequences ?? []).map((sequence) => ({
    label: sequence.label,
    steps: (sequence.steps ?? []).map((step) => ({
      number: step.number,
      title: step.title,
      description: step.description,
      productSlug:
        step.product && typeof step.product === "object"
          ? step.product.slug
          : undefined,
    })),
  }));
}

function toSlugs(refs: (number | { slug: string })[] | null | undefined): string[] {
  return (refs ?? [])
    .filter((ref): ref is { slug: string } => typeof ref === "object" && ref !== null)
    .map((ref) => ref.slug);
}

export function toCollection(doc: PayloadCollection): Collection {
  return {
    title: doc.title,
    slug: doc.slug,
    description: doc.description,
    tags: doc.tags ?? [],
    image: "",
    area: doc.area,
    routineSize: doc.routineSize,
    sequences: toSequences(doc.sequences),
    recommendedProductSlugs: toSlugs(doc.recommendedProducts),
    usageNotes: doc.usageNotes ?? [],
    relatedCollectionSlugs: toSlugs(doc.relatedCollections),
  };
}

function toArticleBlock(block: PayloadArticle["body"][number]): ArticleBlock {
  if (block.blockType === "heading") {
    return { type: "heading", text: block.text };
  }
  if (block.blockType === "list") {
    return { type: "list", items: block.items };
  }
  return { type: "paragraph", text: block.text };
}

export function toArticle(doc: PayloadArticle): Article {
  return {
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    body: doc.body.map(toArticleBlock),
    relatedCollectionSlugs: toSlugs(doc.relatedCollections),
  };
}
