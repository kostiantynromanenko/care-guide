import { Section } from "@/components/layout/Section";
import { Notice } from "@/components/ui/Notice";
import { getNotices } from "@/lib/site-content";

/**
 * Own top padding, rather than relying solely on ArticlesSection's bottom
 * padding — ArticlesSection has a visible tinted background, so this
 * dedicated white space makes the tint-to-white transition feel
 * intentional instead of an abrupt cutoff at the tint boundary.
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
