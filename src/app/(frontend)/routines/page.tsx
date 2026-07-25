import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RoutineCard } from "@/components/cards/RoutineCard";
import { getAllRoutines } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Схеми — Care Guide",
  description: "Готові схеми догляду за розкладом: ранок, вечір, мінімум і щотижневий догляд.",
};

export default async function RoutinesPage() {
  const routines = await getAllRoutines();

  return (
    <>
      <Header />
      <main>
        <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-16 sm:pb-20">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Схеми</h1>
          <p className="text-ink/70 mb-8 max-w-xl">
            Готові схеми за розкладом — ранкова, вечірня, мінімальна чи щотижнева. Кожна схема
            веде крок за кроком і посилається на добірку, якщо потрібен точніший підбір під ваш
            тип шкіри чи волосся.
          </p>
          {routines.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {routines.map((routine) => (
                <RoutineCard key={routine.slug} routine={routine} />
              ))}
            </div>
          ) : (
            <p className="text-ink/70">Наразі немає доступних схем.</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
