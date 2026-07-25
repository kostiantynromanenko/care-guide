import { Section } from "@/components/layout/Section";
import { NeedCard } from "@/components/cards/NeedCard";
import { getAllNeeds } from "@/lib/collections";

export async function NeedsSection() {
  const needs = await getAllNeeds();

  return (
    <Section aria-labelledby="needs-heading">
      <h2 id="needs-heading" className="text-xl sm:text-2xl font-bold mb-7">
        З чим працюємо
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {needs.map((need) => (
          <NeedCard key={need.slug} need={need} />
        ))}
      </div>
    </Section>
  );
}
