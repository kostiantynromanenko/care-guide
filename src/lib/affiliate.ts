/**
 * Wraps a real hillary.ua product URL in HiLLARY's partner-program tracking
 * link ("Deeplink"), so clicks/orders are attributed to this project's
 * affiliate account instead of linking straight to the untracked page.
 *
 * Format confirmed against a real link generated in the partner dashboard
 * (`drop.hillary.ua` → offer → Deeplink):
 *
 *   https://aff.hillary.ua/click?pid=<partner id>&offer_id=<offer>&path=<path on hillary.ua>
 *
 * See `.cursor/skills/affiliate-compliance/SKILL.md` for the program rules
 * this depends on (approved landing page, no brand keywords in SEO, etc).
 *
 * Falls back to the plain, untracked URL when `HILLARY_AFFILIATE_PID` isn't
 * configured (e.g. local dev without the secret set), so links still work —
 * just without attribution — before the env var is in place.
 */
const AFFILIATE_CLICK_URL = "https://aff.hillary.ua/click";
const AFFILIATE_OFFER_ID = process.env.HILLARY_AFFILIATE_OFFER_ID || "2";

export function getAffiliateUrl(sourceUrl: string | null | undefined): string | undefined {
  if (!sourceUrl) return sourceUrl ?? undefined;

  const pid = process.env.HILLARY_AFFILIATE_PID;
  if (!pid) return sourceUrl;

  try {
    const parsed = new URL(sourceUrl);
    // Only rewrite hillary.ua links — never send third-party/demo URLs
    // (like DEMO_AFFILIATE_URL's example.com placeholder) through the
    // tracking redirect.
    if (!parsed.hostname.endsWith("hillary.ua")) return sourceUrl;

    const path = parsed.pathname.replace(/^\//, "");
    // Build the query string by hand instead of via URLSearchParams: a real
    // link generated in the partner dashboard keeps "/" literal in `path`
    // (e.g. `path=category-slug/product-slug/`) rather than percent-encoding
    // it to %2F, so match that exactly in case their redirect handler does
    // simple string parsing instead of full URL-decoding.
    const encodedPath = encodeURIComponent(path).replace(/%2F/g, "/");
    const query = `pid=${encodeURIComponent(pid)}&offer_id=${encodeURIComponent(AFFILIATE_OFFER_ID)}&path=${encodedPath}`;
    return `${AFFILIATE_CLICK_URL}?${query}`;
  } catch {
    return sourceUrl;
  }
}
