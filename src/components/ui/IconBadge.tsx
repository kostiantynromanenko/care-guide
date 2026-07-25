import type { ReactNode } from "react";

type IconBadgeTone = "rose" | "peach" | "lavender";

const toneClasses: Record<IconBadgeTone, string> = {
  rose: "bg-rose-tint/25 text-cta-strong",
  peach: "bg-peach-tint/30 text-cta-strong",
  lavender: "bg-lavender-tint/30 text-cta-strong",
};

/**
 * Circular icon badge shared by NeedCard, HowItWorksSection, RoutineCard and
 * ArticleCard — one consistent "icon in a soft tinted circle" motif instead
 * of a different treatment per card type (design-system skill: reuse
 * variants rather than inventing a new style per component).
 */
export function IconBadge({
  children,
  tone = "rose",
  size = "md",
  className = "",
}: {
  children: ReactNode;
  tone?: IconBadgeTone;
  size?: "sm" | "md";
  className?: string;
}) {
  const sizeClasses = size === "sm" ? "w-9 h-9 [&>svg]:w-4 [&>svg]:h-4" : "w-11 h-11 [&>svg]:w-5 [&>svg]:h-5";
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full shrink-0 ${sizeClasses} ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
