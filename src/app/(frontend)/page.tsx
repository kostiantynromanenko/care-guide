import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { NeedsSection } from "@/components/sections/NeedsSection";
import { RoutinesSection } from "@/components/sections/RoutinesSection";
import { CollectionsSection } from "@/components/sections/CollectionsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ArticlesSection } from "@/components/sections/ArticlesSection";
import { NoticeSection } from "@/components/sections/NoticeSection";

/**
 * Homepage — approved direction: Variant 5 "Rose Gradient Wellness"
 * (see preview/variant-5-rose-gradient-wellness.html for the original mockup).
 */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorksSection />
        <NeedsSection />
        <RoutinesSection />
        <CollectionsSection />
        <ArticlesSection />
        <NoticeSection />
      </main>
      <Footer />
    </>
  );
}
