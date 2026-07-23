import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { needs, site } from "@/data/demo-content";

export function Hero() {
  return (
    <section className="gradient-hero">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-14 sm:pb-20 text-center">
        <h1 className="text-[2.1rem] leading-tight sm:text-5xl font-bold mb-5">
          {site.tagline}
        </h1>
        <p className="text-sm sm:text-base text-ink/75 max-w-md mx-auto mb-9">
          {site.description}
        </p>
        <Button href="/selection" variant="primary" className="mb-10">
          Підібрати догляд
        </Button>

        <ul
          className="flex gap-3 overflow-x-auto pb-2 justify-center flex-wrap sm:flex-nowrap"
          aria-label="Швидкий вибір потреби"
        >
          {needs.map((need) => (
            <li key={need.slug}>
              <Link
                href="/selection"
                className="glass whitespace-nowrap rounded-full border border-white/50 text-sm px-4 py-2 hover:bg-white/70 transition-colors inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
              >
                {need.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
