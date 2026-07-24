import { XMLParser } from "fast-xml-parser";

/**
 * Public HiLLARY partner-program product feed (YML/Prom catalog format),
 * discovered via `drop.hillary.ua/instrument/vygruzky` — no partner login
 * required to fetch it. Updated daily by HiLLARY. See
 * `docs/PROJECT_CONTEXT.md` for the decision context around using this.
 *
 * This is the "HiLLARY Cosmetics only" variant (there are separate feeds
 * for the Gregory Mill and WiSHLiST brands, not used here).
 */
export const HILLARY_FEED_URL =
  "https://hillary.ua/content/export/019d094ee103debf52c00b6828d5c1b3.xml";

export interface FeedCategory {
  id: string;
  parentId?: string;
  name: string;
}

export interface FeedOffer {
  id: string;
  url: string;
  price?: number;
  oldPrice?: number;
  currency?: string;
  categoryId?: string;
  pictures: string[];
  vendorCode?: string;
  vendor?: string;
  name: string;
  descriptionHtml: string;
  inStock: boolean;
}

export interface FeedData {
  categories: FeedCategory[];
  offers: FeedOffer[];
}

/**
 * Strips CDATA text content. With `cdataPropName: "#text"`, fast-xml-parser
 * represents a CDATA-only element as a one-element array containing a
 * `{ "#text": "..." }` object (rather than a plain string), so this unwraps
 * both that shape and the plain-string case.
 */
function textOf(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return value.map(textOf).join("");
  }
  if (typeof value === "object" && "#text" in (value as Record<string, unknown>)) {
    return String((value as Record<string, unknown>)["#text"] ?? "");
  }
  return String(value);
}

function toArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

export async function fetchHillaryFeed(): Promise<FeedData> {
  const res = await fetch(HILLARY_FEED_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch HiLLARY feed: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();
  return parseHillaryFeed(xml);
}

export function parseHillaryFeed(xml: string): FeedData {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    cdataPropName: "#text",
    isArray: (name) => name === "category" || name === "offer" || name === "picture",
  });
  const doc = parser.parse(xml);
  const shop = doc?.yml_catalog?.shop;
  if (!shop) throw new Error("Unexpected feed shape: no yml_catalog.shop");

  const categories: FeedCategory[] = toArray(shop.categories?.category).map((c) => ({
    id: String(c["@_id"]),
    parentId: c["@_parentId"] !== undefined ? String(c["@_parentId"]) : undefined,
    name: textOf(c),
  }));

  const offers: FeedOffer[] = toArray(shop.offers?.offer).map((o) => ({
    id: String(o["@_id"]),
    url: textOf(o.url),
    price: o.price !== undefined ? Number(o.price) : undefined,
    oldPrice: o.oldprice !== undefined ? Number(o.oldprice) : undefined,
    currency: o.currencyId !== undefined ? String(o.currencyId) : undefined,
    categoryId: o.categoryId !== undefined ? String(o.categoryId) : undefined,
    pictures: toArray(o.picture).map((p) => textOf(p)),
    vendorCode: o.vendorCode !== undefined ? String(o.vendorCode) : undefined,
    vendor: o.vendor !== undefined ? String(o.vendor) : undefined,
    name: textOf(o.name),
    descriptionHtml: textOf(o.description),
    inStock: String(o["@_in_stock"]) === "true",
  }));

  return { categories, offers };
}
