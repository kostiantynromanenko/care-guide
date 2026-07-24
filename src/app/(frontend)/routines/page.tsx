import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageStub } from "@/components/ui/PageStub";

export const metadata: Metadata = {
  title: "Схеми — Care Guide",
};

export default function RoutinesPage() {
  return (
    <>
      <Header />
      <PageStub title="Схеми" />
      <Footer />
    </>
  );
}
