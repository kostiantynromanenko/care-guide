import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";
import { getSiteSettings } from "@/lib/site-content";

const navLinks = [
  { href: "/", label: "Головна" },
  { href: "/collections", label: "Добірки" },
  { href: "/routines", label: "Плани" },
  { href: "/articles", label: "Корисне" },
  { href: "/about", label: "Про проєкт" },
];

const focusClasses =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta rounded";

export async function Header() {
  const site = await getSiteSettings();

  return (
    <header className="glass sticky top-0 z-40 border-b border-white/40">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          className={`flex items-center gap-2 font-bold text-lg text-ink hover:text-cta-strong transition-colors ${focusClasses}`}
        >
          <LogoMark className="h-8 w-8 shrink-0" />
          {site.name}
        </Link>

        <nav
          aria-label="Основна навігація"
          className="hidden md:flex items-center gap-7 text-sm text-ink/70"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-ink transition-colors ${focusClasses}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/selection"
          className={`hidden sm:inline-block rounded-full bg-cta text-white text-sm font-semibold px-5 py-2.5 shadow-sm shadow-cta/30 hover:bg-cta-strong transition-colors ${focusClasses}`}
        >
          Підібрати догляд
        </Link>

        <details className="md:hidden relative">
          <summary
            className={`list-none w-11 h-11 flex flex-col items-center justify-center gap-1.5 cursor-pointer ${focusClasses}`}
            aria-label="Відкрити меню"
          >
            <span className="block w-5 h-[2px] rounded bg-ink" aria-hidden="true" />
            <span className="block w-5 h-[2px] rounded bg-ink" aria-hidden="true" />
            <span className="block w-5 h-[2px] rounded bg-ink" aria-hidden="true" />
          </summary>
          <nav
            aria-label="Мобільна навігація"
            className="absolute right-0 top-12 w-56 glass border border-white/50 rounded-2xl shadow-lg p-4 flex flex-col gap-1 text-sm"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-ink/80 hover:text-ink py-1.5 ${focusClasses}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/selection"
              className={`mt-2 rounded-full bg-cta text-white text-center font-semibold px-4 py-2.5 hover:bg-cta-strong transition-colors ${focusClasses}`}
            >
              Підібрати догляд
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
