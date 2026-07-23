import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageStub } from "@/components/ui/PageStub";

export const metadata: Metadata = {
  title: "Корисне — Care Guide",
};

export default function ArticlesPage() {
  return (
    <>
      <Header />
      <PageStub title="Корисне" />
      <Footer />
    </>
  );
}
