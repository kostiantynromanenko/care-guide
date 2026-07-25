import type { ReactNode } from "react";

/**
 * Shared homepage section wrapper. Introduced to fix the "every section
 * looks identical" flatness noted in the visual-richness/composition review
 * (2026-07-25): sections alternate between the plain background and a soft
 * full-bleed tint band (`tinted`), giving the page rhythm as you scroll
 * instead of one undifferentiated column, while keeping every section's
 * actual content/order exactly as approved in docs/SITE_STRUCTURE.md.
 */
export function Section({
  tinted = false,
  className = "",
  children,
  ...rest
}: {
  tinted?: boolean;
  className?: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={tinted ? "bg-section-tint" : undefined}>
      <section className={`max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16 ${className}`} {...rest}>
        {children}
      </section>
    </div>
  );
}
