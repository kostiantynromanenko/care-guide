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

export interface Collection {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  image: string;
}

export interface RoutineStep {
  number: number;
  title: string;
  description: string;
}

export interface Product {
  title: string;
  role: string;
  description: string;
  tags: string[];
  image: string;
}

export interface Article {
  title: string;
  slug: string;
  excerpt: string;
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
