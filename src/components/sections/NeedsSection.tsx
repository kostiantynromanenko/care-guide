import { Card } from "@/components/ui/Card";
import { needs } from "@/data/demo-content";

export function NeedsSection() {
  return (
    <section
      className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16"
      aria-labelledby="needs-heading"
    >
      <h2 id="needs-heading" className="text-xl sm:text-2xl font-bold mb-7">
        З чим працюємо
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {needs.map((need) => (
          <Card key={need.slug} className="p-5">
            <h3 className="font-semibold text-sm sm:text-base mb-1.5">{need.title}</h3>
            <p className="text-xs sm:text-sm text-ink/70">{need.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
