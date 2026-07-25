import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getAllNeeds } from "@/lib/collections";
import { getSiteSettings } from "@/lib/site-content";

/**
 * `hero-abstract-banner-v6.png` — generated abstract artwork (approved
 * 2026-07-25). Earlier versions mixed the three brand accent tints (rose,
 * peach, lavender), inherited from the original `.gradient-hero` CSS —
 * simplified here to pink shades only (pale blush to deeper dusty rose),
 * per explicit feedback to drop the multi-color mix. No people/faces
 * /products, per the design brief.
 */
export async function Hero() {
  const [site, needs] = await Promise.all([getSiteSettings(), getAllNeeds()]);

  return (
    <section className="relative overflow-hidden">
      <Image
        src="/hero-abstract-banner-v6.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg)]"
        aria-hidden="true"
      />
      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-14 sm:pb-20 text-center">
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
          className="flex flex-wrap gap-3 justify-center"
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
