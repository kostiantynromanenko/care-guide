import rawDemoContent from "../../demo/demo-content.json";
import type { DemoContent } from "@/types/content";

/**
 * Single source of truth for design-phase content.
 * The underlying JSON lives at `demo/demo-content.json` so it stays
 * easy to review independently of the code, and easy to replace with
 * Payload CMS data later without changing consumers of this module.
 */
const demoContent = rawDemoContent as DemoContent;

export const site = demoContent.site;
export const needs = demoContent.needs;
export const collections = demoContent.collections;
export const routineSteps = demoContent.routineSteps;
export const products = demoContent.products;
export const articles = demoContent.articles;
export const notices = demoContent.notices;

export default demoContent;
