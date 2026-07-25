import fs from "node:fs";
import path from "node:path";
import { XMLParser } from "fast-xml-parser";

const CACHE_PATH = path.join(process.cwd(), ".cache", "hillary-feed.xml");
const xml = fs.readFileSync(CACHE_PATH, "utf8");

function textOf(value) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(textOf).join("");
  if (typeof value === "object" && "#text" in value) return String(value["#text"] ?? "");
  return String(value);
}
function toArray(value) {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  cdataPropName: "#text",
  isArray: (name) => name === "category" || name === "offer" || name === "picture",
});
const doc = parser.parse(xml);
const shop = doc.yml_catalog.shop;

const categories = toArray(shop.categories?.category).map((c) => ({
  id: String(c["@_id"]),
  parentId: c["@_parentId"] !== undefined ? String(c["@_parentId"]) : undefined,
  name: textOf(c),
}));
const catById = new Map(categories.map((c) => [c.id, c]));

const offers = toArray(shop.offers?.offer).map((o) => ({
  id: String(o["@_id"]),
  categoryId: o.categoryId !== undefined ? String(o.categoryId) : undefined,
  name: textOf(o.name),
  price: o.price !== undefined ? Number(o.price) : undefined,
  vendorCode: o.vendorCode !== undefined ? String(o.vendorCode) : undefined,
  inStock: String(o["@_in_stock"]) === "true",
}));

const targetIds = process.argv.slice(2);
const lines = [];
for (const id of targetIds) {
  const cat = catById.get(id);
  lines.push(`\n=== Category ${id}: ${cat ? cat.name : "?"} ===`);
  const matching = offers.filter((o) => o.categoryId === id);
  for (const o of matching) {
    lines.push(`  [${o.id}] ${o.name} | ${o.price ?? "?"}₴ | ${o.inStock ? "in stock" : "OUT"} | vendorCode=${o.vendorCode ?? "-"}`);
  }
}

const out = lines.join("\n");
fs.writeFileSync(path.join(process.cwd(), ".cache", "offers-report.txt"), out, "utf8");
console.log(out.slice(0, 500));
console.log(`\n... wrote full report to .cache/offers-report.txt (${lines.length} lines)`);
