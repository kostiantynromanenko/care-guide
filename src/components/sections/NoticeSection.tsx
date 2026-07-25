import { Section } from "@/components/layout/Section";
import { Notice } from "@/components/ui/Notice";
import { getNotices } from "@/lib/site-content";

/**
 * Own top padding (was 0, relying solely on ArticlesSection's bottom
 * padding) — once ArticlesSection got a visible tinted background, that
 * same pixel gap read as an abrupt cutoff at the tint boundary rather than
 * breathing room (feedback 2026-07-25). Adding dedicated white space here
 * makes the tint-to-white transition feel intentional.
 */
export async function NoticeSection() {
  const notices = await getNotices();

  return (
    <Section aria-labelledby="notice-heading" className="!pt-8 sm:!pt-10 !pb-14 sm:!pb-16">
      <h2 id="notice-heading" className="sr-only">
        Важлива інформація про сайт
      </h2>
      <Notice>
        <p>{notices.independent}</p>
        <p>{notices.affiliate}</p>
      </Notice>
    </Section>
  );
}
