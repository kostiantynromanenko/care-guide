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
  inStock: String(o["@_in_stock"]) === "true",
}));

const countByCategory = new Map();
for (const o of offers) {
  if (!o.categoryId) continue;
  countByCategory.set(o.categoryId, (countByCategory.get(o.categoryId) ?? 0) + 1);
}

function pathFor(catId) {
  const names = [];
  let cur = catById.get(catId);
  let guard = 0;
  while (cur && guard < 10) {
    names.unshift(cur.name);
    cur = cur.parentId ? catById.get(cur.parentId) : undefined;
    guard += 1;
  }
  return names.join(" > ");
}

const rows = [...countByCategory.entries()]
  .map(([id, count]) => ({ id, count, path: pathFor(id) }))
  .sort((a, b) => b.count - a.count);

const out = rows.map((r) => `${r.count}\t${r.id}\t${r.path}`).join("\n");
fs.writeFileSync(path.join(process.cwd(), ".cache", "category-report.txt"), out, "utf8");
console.log(`Total offers: ${offers.length}, total categories: ${categories.length}`);
console.log(`Wrote .cache/category-report.txt with ${rows.length} categories`);
