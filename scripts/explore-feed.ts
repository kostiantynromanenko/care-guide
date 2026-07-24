import fs from "node:fs";
import path from "node:path";
import { parseHillaryFeed, HILLARY_FEED_URL } from "@/lib/hillary-feed";

/**
 * One-off exploration script (not part of the app): caches the feed to
 * .cache/hillary-feed.xml so repeated runs during matching/curation don't
 * re-download 10MB+ each time, then prints category names + keyword
 * search results to help pick real products for each need. Safe to
 * delete once curation is done.
 */
const CACHE_PATH = path.join(process.cwd(), ".cache", "hillary-feed.xml");

async function loadXml(): Promise<string> {
  if (fs.existsSync(CACHE_PATH)) {
    console.log("Using cached feed:", CACHE_PATH);
    return fs.readFileSync(CACHE_PATH, "utf8");
  }
  console.log("Downloading feed from", HILLARY_FEED_URL);
  const res = await fetch(HILLARY_FEED_URL);
  const xml = await res.text();
  fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
  fs.writeFileSync(CACHE_PATH, xml, "utf8");
  return xml;
}

async function run() {
  const xml = await loadXml();
  const { offers } = parseHillaryFeed(xml);

  const lines: string[] = [];

  // Name-only keyword search: leaf categories (skin/hair type) turned out
  // to be barely populated in this export, and full-description search was
  // too noisy (boilerplate marketing copy mentions "зволоження"/"сухість"
  // on almost every product). Product titles are short and specific, so
  // this is the more reliable signal.
  const keywordSets: Record<string, string[]> = {
    oiliness: ["жирної шкіри", "жирної та комбінованої", "жирного блиску", "зменшення пор", "себорег"],
    dryness: ["сухої шкіри", "суха шкіра", "сухої та"],
    sensitivity: ["чутливої шкіри", "чутлив", "делікатн"],
    dullness: ["сяйва", "сяйво", "тон обличчя", "пігментаці", "vitamin c", "вітаміном с", "рівний тон"],
    "dry-hair": ["сухого волосся", "відновлення волосся", "живлення волосся"],
    "oily-hair": ["жирного волосся"],
  };
  const priced = offers.filter((o) => (o.price ?? 0) > 0);

  for (const [need, keywords] of Object.entries(keywordSets)) {
    lines.push(`\n=== "${need}" — name contains any of [${keywords.join(" | ")}] ===`);
    const matches = priced.filter((o) => {
      const name = o.name.toLowerCase();
      return keywords.some((k) => name.includes(k));
    });
    lines.push(`${matches.length} matches:`);
    for (const m of matches.slice(0, 25)) {
      const plainDesc = m.descriptionHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      lines.push(
        `- [${m.id}] ${m.name} — ${m.price} UAH\n  url: ${m.url}\n  photo: ${m.pictures[0] ?? "(none)"}\n  desc: ${plainDesc.slice(0, 200)}`
      );
    }
  }

  const outPath = path.join(process.cwd(), "explore-output.txt");
  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log("Wrote", outPath);
}

await run();
process.exit(0);
