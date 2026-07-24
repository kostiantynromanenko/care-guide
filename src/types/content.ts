/**
 * Types describing the shape of local demo content.
 * These mirror `demo/demo-content.json` and will later map onto
 * Payload CMS collections once the design direction is approved
 * and the CMS integration phase begins.
 */

export interface SiteInfo {
  name: string;
  tagline: string;
  description: string;
}

export interface Need {
  title: string;
  slug: string;
  description: string;
}

export interface RoutineStep {
  number: number;
  title: string;
  description: string;
}

/** A single step within a collection's routine sequence, optionally linked to a demo product. */
export interface SequenceStep {
  number: number;
  title: string;
  description: string;
  productSlug?: string;
}

/** A named group of steps, e.g. "Вранці" / "Ввечері", or a single "Кроки догляду" group. */
export interface RoutineSequence {
  label: string;
  steps: SequenceStep[];
}

export type CollectionArea = "face" | "hair";

export interface Collection {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  area: CollectionArea;
  routineSize: string;
  sequences: RoutineSequence[];
  recommendedProductSlugs: string[];
  usageNotes: string[];
  relatedCollectionSlugs: string[];
}

export interface Product {
  title: string;
  slug: string;
  role: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  /** Real hillary.ua product page, when known — see `DEMO_AFFILIATE_URL` fallback in ProductCard. */
  sourceUrl?: string;
}

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export interface Article {
  title: string;
  slug: string;
  excerpt: string;
  body: ArticleBlock[];
  relatedCollectionSlugs: string[];
}

export interface Notices {
  affiliate: string;
  independent: string;
  medical: string;
}

export interface DemoContent {
  site: SiteInfo;
  needs: Need[];
  collections: Collection[];
  routineSteps: RoutineStep[];
  products: Product[];
  articles: Article[];
  notices: Notices;
}
