import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageStub } from "@/components/ui/PageStub";

export const metadata: Metadata = {
  title: "Підібрати догляд — Care Guide",
};

export default function SelectionPage() {
  return (
    <>
      <Header />
      <PageStub title="Підібрати догляд" />
      <Footer />
    </>
  );
}
