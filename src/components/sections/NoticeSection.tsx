import { Notice } from "@/components/ui/Notice";
import { notices } from "@/data/demo-content";

export function NoticeSection() {
  return (
    <section
      className="max-w-6xl mx-auto px-5 sm:px-8 pb-14 sm:pb-16"
      aria-labelledby="notice-heading"
    >
      <h2 id="notice-heading" className="sr-only">
        Важлива інформація про сайт
      </h2>
      <Notice>
        <p>{notices.independent}</p>
        <p>{notices.affiliate}</p>
      </Notice>
    </section>
  );
}
