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
 * The program also supports up to 8 free-form "sub" tracking params
 * (sub1..sub8, "same logic as Google Ads" per the client) surfaced later in
 * the partner dashboard's conversion stats — used here to record which page
 * type and which collection/product sent the click, so performance can be
 * compared per-surface instead of only in aggregate. `os_id` is a separate
 * free-form field for the visitor's OS (see `src/lib/user-agent.ts`) — note
 * this one doesn't show up in the dashboard's Statistics UI (per this
 * tracking platform's own docs), only via their API, but is included for
 * completeness/future use.
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

/** The click's page/surface type — the `sub1` tracking dimension. */
export type AffiliateSourcePage = "collection" | "quiz-result" | "product-detail";

export interface AffiliateTracking {
  /** Which page/surface the click originated from. */
  page: AffiliateSourcePage;
  /** The collection slug shown on that page, when there is one. */
  collectionSlug?: string;
  /** The product being linked to. */
  productSlug?: string;
  /** Coarse visitor OS, from `detectOsId()` in `src/lib/user-agent.ts`. */
  osId?: string;
}

export function getAffiliateUrl(
  sourceUrl: string | null | undefined,
  tracking?: AffiliateTracking
): string | undefined {
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

    const params = [`pid=${encodeURIComponent(pid)}`, `offer_id=${encodeURIComponent(AFFILIATE_OFFER_ID)}`];
    if (tracking?.osId) params.push(`os_id=${encodeURIComponent(tracking.osId)}`);
    if (tracking?.page) params.push(`sub1=${encodeURIComponent(tracking.page)}`);
    if (tracking?.collectionSlug) params.push(`sub2=${encodeURIComponent(tracking.collectionSlug)}`);
    if (tracking?.productSlug) params.push(`sub3=${encodeURIComponent(tracking.productSlug)}`);
    params.push(`path=${encodedPath}`);

    return `${AFFILIATE_CLICK_URL}?${params.join("&")}`;
  } catch {
    return sourceUrl;
  }
}
