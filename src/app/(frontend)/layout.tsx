import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { AssistantWidget } from "@/components/assistant/AssistantWidget";
import { getAllCollections, getAllNeeds } from "@/lib/collections";
import { getNotices, getSiteSettings } from "@/lib/site-content";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
});

// Content is served from Payload/Postgres via the Local API, which doesn't
// participate in Next's fetch cache — force-dynamic ensures admin edits show
// up on the next request instead of only after a rebuild.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [needs, collections, notices] = await Promise.all([
    getAllNeeds(),
    getAllCollections(),
    getNotices(),
  ]);

  return (
    <html lang="uk">
      <body className={manrope.className}>
        {children}
        <AssistantWidget needs={needs} collections={collections} medicalNotice={notices.medical} />
      </body>
    </html>
  );
}
