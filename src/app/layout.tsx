import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { site } from "@/data/demo-content";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
