import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";
import { getSiteSettings } from "@/lib/site-content";

const footerLinks = [
  { href: "/collections", label: "Добірки" },
  { href: "/routines", label: "Плани" },
  { href: "/articles", label: "Корисне" },
  { href: "/about", label: "Про проєкт" },
];

const focusClasses =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta";

export async function Footer() {
  const site = await getSiteSettings();

  return (
    <footer className="border-t border-black/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row justify-between gap-5 text-sm text-ink/70">
        <span className="flex items-center gap-2 font-bold text-ink">
          <LogoMark className="h-6 w-6 shrink-0" />
          {site.name}
        </span>
        <nav aria-label="Навігація у футері" className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-ink transition-colors rounded ${focusClasses}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
