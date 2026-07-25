import type {
  Article as PayloadArticle,
  Collection as PayloadCollection,
  Media,
  Need as PayloadNeed,
  Product as PayloadProduct,
  Routine as PayloadRoutine,
} from "@/payload-types";
import type {
  Article,
  ArticleBlock,
  Collection,
  Need,
  Product,
  Routine,
  RoutineSequence,
  SequenceStep,
} from "@/types/content";

/**
 * Converts Payload's generated document shapes into the existing
 * `src/types/content.ts` view-model shapes, so presentational components
 * (already design-approved) don't need to change at all for Wave B.
 */

/**
 * Resolves an `upload` relationship field into a plain `{ image, imageAlt }`
 * pair. Requires the relation to already be populated (Payload's Local API
 * defaults to depth 2, which covers this) — falls back to empty strings for
 * unset fields or an unpopulated ID reference, which `CollectionCard`/
 * `ProductCard` treat as "no image" and render a decorative placeholder.
 */
function toImage(image: number | Media | null | undefined): {
  image: string;
  imageAlt: string;
} {
  if (image && typeof image === "object" && image.url) {
    return { image: image.url, imageAlt: image.alt };
  }
  return { image: "", imageAlt: "" };
}

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
    ...toImage(doc.image),
    sourceUrl: doc.sourceUrl ?? undefined,
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
    ...toImage(doc.image),
    area: doc.area,
    routineSize: doc.routineSize,
    sequences: toSequences(doc.sequences),
    recommendedProductSlugs: toSlugs(doc.recommendedProducts),
    usageNotes: doc.usageNotes ?? [],
    relatedCollectionSlugs: toSlugs(doc.relatedCollections),
  };
}

function toSteps(steps: PayloadRoutine["steps"]): SequenceStep[] {
  return (steps ?? []).map((step) => ({
    number: step.number,
    title: step.title,
    description: step.description,
    productSlug:
      step.product && typeof step.product === "object" ? step.product.slug : undefined,
  }));
}

export function toRoutine(doc: PayloadRoutine): Routine {
  return {
    title: doc.title,
    slug: doc.slug,
    summary: doc.summary,
    tags: doc.tags ?? [],
    area: doc.area,
    steps: toSteps(doc.steps),
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
