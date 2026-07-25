/**
 * Coarse operating-system detection from a User-Agent string, used to
 * populate HiLLARY's affiliate tracking `os_id` param (see
 * `src/lib/affiliate.ts`). `os_id` is a free-form string field on their end
 * (not a fixed set of numeric codes), so any short, stable identifier works.
 *
 * Deliberately coarse (5 buckets + "other") — this is for aggregate
 * reporting in the partner dashboard, not device fingerprinting.
 */
export type OsId = "ios" | "android" | "windows" | "macos" | "linux" | "other";

export function detectOsId(userAgent: string | null | undefined): OsId {
  if (!userAgent) return "other";
  const ua = userAgent.toLowerCase();

  // Order matters: iOS/Android User-Agents also match looser Mac/Linux
  // patterns below, so the more specific mobile checks must run first.
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  if (/windows/.test(ua)) return "windows";
  if (/macintosh|mac os x/.test(ua)) return "macos";
  if (/linux/.test(ua)) return "linux";
  return "other";
}
