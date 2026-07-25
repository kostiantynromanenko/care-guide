import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Notice } from "@/components/ui/Notice";
import { RoutineStepper } from "@/components/routine/RoutineStepper";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { getRoutineBySlug, getCollectionsBySlugs } from "@/lib/collections";
import { getNotices } from "@/lib/site-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const routine = await getRoutineBySlug(slug);
  if (!routine) {
    return { title: "Схему не знайдено — Care Guide" };
  }
  return {
    title: `${routine.title} — Care Guide`,
    description: routine.summary,
  };
}

export default async function RoutineDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const routine = await getRoutineBySlug(slug);

  if (!routine) {
    notFound();
  }

  const [relatedCollections, notices] = await Promise.all([
    getCollectionsBySlugs(routine.relatedCollectionSlugs),
    getNotices(),
  ]);

  return (
    <>
      <Header />
      <main>
        <section className="max-w-4xl mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-8">
          <Link
            href="/routines"
            className="text-sm font-medium text-ink/80 hover:text-cta-strong transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta rounded"
          >
            ← Усі схеми
          </Link>

          <ul className="flex flex-wrap gap-1.5 mt-5 mb-4" aria-label="Теги схеми">
            {routine.tags.map((tag) => (
              <li key={tag} className="text-[11px] rounded-full bg-white/70 px-2.5 py-1">
                {tag}
              </li>
            ))}
          </ul>

          <h1 className="text-2xl sm:text-4xl font-bold mb-3">{routine.title}</h1>
          <p className="text-ink/75 sm:text-lg max-w-2xl">{routine.summary}</p>
        </section>

        <section
          className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-10"
          aria-labelledby="routine-heading"
        >
          <h2 id="routine-heading" className="text-xl sm:text-2xl font-bold mb-6">
            Кроки
          </h2>
          <RoutineStepper sequence={{ label: routine.title, steps: routine.steps }} />
        </section>

        {routine.usageNotes.length > 0 && (
          <section
            className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-10"
            aria-labelledby="usage-heading"
          >
            <h2 id="usage-heading" className="text-xl sm:text-2xl font-bold mb-5">
              Нотатки з використання
            </h2>
            <ul className="space-y-2.5 text-sm text-ink/75 list-disc pl-5">
              {routine.usageNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
        )}

        {relatedCollections.length > 0 && (
          <section
            className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-10"
            aria-labelledby="related-heading"
          >
            <h2 id="related-heading" className="text-xl sm:text-2xl font-bold mb-2">
              Хочете точніший підбір?
            </h2>
            <p className="text-sm text-ink/70 mb-6">
              Ця схема — загальний орієнтир. Ці добірки враховують конкретний тип шкіри чи
              волосся:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {relatedCollections.map((related) => (
                <CollectionCard key={related.slug} collection={related} />
              ))}
            </div>
          </section>
        )}

        <section className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-10 pb-14 sm:pb-16">
          <Notice>
            <p>{notices.affiliate}</p>
            <p>{notices.medical}</p>
          </Notice>
        </section>
      </main>
      <Footer />
    </>
  );
}
