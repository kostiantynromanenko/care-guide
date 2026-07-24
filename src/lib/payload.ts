import { getPayload, type Payload } from "payload";
import config from "@payload-config";

let payloadPromise: Promise<Payload> | null = null;

/**
 * Returns a shared Payload Local API client. Payload internally memoizes
 * initialization per config, but caching the promise here avoids kicking off
 * redundant `getPayload()` calls within the same server process.
 */
export function getPayloadClient(): Promise<Payload> {
  if (!payloadPromise) {
    payloadPromise = getPayload({ config });
  }
  return payloadPromise;
}
