import { Card } from "@/components/ui/Card";
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
      <Card className="p-5 sm:p-6 text-sm text-ink/65 leading-relaxed space-y-1.5">
        <p>{notices.independent}</p>
        <p>{notices.affiliate}</p>
      </Card>
    </section>
  );
}
