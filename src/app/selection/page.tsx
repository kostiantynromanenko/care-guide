import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SelectionQuiz } from "@/components/selection/SelectionQuiz";

export const metadata: Metadata = {
  title: "Підібрати догляд — Care Guide",
  description: "Кілька запитань — і ми покажемо добірку, яка підходить найкраще.",
};

export default function SelectionPage() {
  return (
    <>
      <Header />
      <main>
        <section className="max-w-2xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-16 sm:pb-20">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Підібрати догляд</h1>
          <p className="text-ink/60 mb-10">
            Кілька коротких запитань — і ми покажемо добірку, яка підходить найкраще.
          </p>
          <SelectionQuiz />
        </section>
      </main>
      <Footer />
    </>
  );
}
