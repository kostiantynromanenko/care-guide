import { cache } from "react";
import { getPayloadClient } from "@/lib/payload";
import type { Notices, RoutineStep, SiteInfo } from "@/types/content";

export const getSiteSettings = cache(async (): Promise<SiteInfo> => {
  const payload = await getPayloadClient();
  const settings = await payload.findGlobal({ slug: "site-settings" });
  return {
    name: settings.name,
    tagline: settings.tagline,
    description: settings.description,
  };
});

export const getNotices = cache(async (): Promise<Notices> => {
  const payload = await getPayloadClient();
  const notices = await payload.findGlobal({ slug: "notices" });
  return {
    affiliate: notices.affiliate,
    independent: notices.independent,
    medical: notices.medical,
  };
});

export const getHowItWorksSteps = cache(async (): Promise<RoutineStep[]> => {
  const payload = await getPayloadClient();
  const howItWorks = await payload.findGlobal({ slug: "how-it-works" });
  return (howItWorks.steps ?? []).map((step) => ({
    number: step.number,
    title: step.title,
    description: step.description,
  }));
});
