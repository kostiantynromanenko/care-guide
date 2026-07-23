import Link from "next/link";

const footerLinks = [
  { href: "/collections", label: "Добірки" },
  { href: "/routines", label: "Схеми" },
  { href: "/articles", label: "Корисне" },
  { href: "/about", label: "Про проєкт" },
];

export function Footer() {
  return (
    <footer className="border-t border-black/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row justify-between gap-5 text-sm text-ink/55">
        <span className="font-bold text-ink">Care Guide</span>
        <nav aria-label="Навігація у футері" className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
