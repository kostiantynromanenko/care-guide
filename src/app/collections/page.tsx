import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageStub } from "@/components/ui/PageStub";

export const metadata: Metadata = {
  title: "Добірки — Care Guide",
};

export default function CollectionsPage() {
  return (
    <>
      <Header />
      <PageStub title="Добірки" />
      <Footer />
    </>
  );
}
