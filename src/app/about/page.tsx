import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageStub } from "@/components/ui/PageStub";

export const metadata: Metadata = {
  title: "Про проєкт — Care Guide",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <PageStub title="Про проєкт" />
      <Footer />
    </>
  );
}
