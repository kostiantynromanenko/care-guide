import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CollectionsFilter } from "@/components/collections/CollectionsFilter";
import { getAllCollections } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Добірки — Care Guide",
  description: "Готові добірки догляду для обличчя та волосся — без зайвої складності.",
};

export default async function CollectionsPage() {
  const collections = await getAllCollections();

  return (
    <>
      <Header />
      <main>
        <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-16 sm:pb-20">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Добірки</h1>
          <p className="text-ink/70 mb-8 max-w-xl">
            Готові рішення, а не окремі товари — оберіть добірку за областю догляду.
          </p>
          <CollectionsFilter collections={collections} />
        </section>
      </main>
      <Footer />
    </>
  );
}
