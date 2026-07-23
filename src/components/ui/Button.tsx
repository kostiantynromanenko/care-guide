import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "ghost";

type ButtonProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "rounded-full bg-cta text-white font-semibold shadow-md shadow-cta/30 hover:bg-cta-strong px-7 py-3.5 text-sm sm:text-base",
  ghost:
    "text-ink/70 font-medium hover:text-ink underline decoration-cta/40 underline-offset-4 text-sm sm:text-base",
};

const focusClasses =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <Link
      className={`inline-block transition-colors ${variantClasses[variant]} ${focusClasses} ${className}`}
      {...props}
    />
  );
}
