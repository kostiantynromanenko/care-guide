/**
 * Abstract four-petal blossom mark — evokes gentle, botanical care without
 * literally illustrating a flower or product bottle. Petals sit at the four
 * cardinal directions (not a 3-fold pinwheel) so the mark is symmetric on
 * both axes and sits visually centered next to text. Built from the
 * approved Variant 5 ("Rose Gradient Wellness") palette tokens so it stays
 * in sync with any future palette adjustment.
 */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="Логотип Care Guide"
    >
      <g transform="rotate(0 20 20)">
        <path
          d="M20,20 C14,17.5 13,10 20,6 C27,10 26,17.5 20,20 Z"
          fill="var(--color-cta)"
          opacity="0.9"
        />
      </g>
      <g transform="rotate(90 20 20)">
        <path
          d="M20,20 C14,17.5 13,10 20,6 C27,10 26,17.5 20,20 Z"
          fill="var(--color-peach-tint)"
          opacity="0.9"
        />
      </g>
      <g transform="rotate(180 20 20)">
        <path
          d="M20,20 C14,17.5 13,10 20,6 C27,10 26,17.5 20,20 Z"
          fill="var(--color-lavender-tint)"
          opacity="0.9"
        />
      </g>
      <g transform="rotate(270 20 20)">
        <path
          d="M20,20 C14,17.5 13,10 20,6 C27,10 26,17.5 20,20 Z"
          fill="var(--color-rose-tint)"
          opacity="0.9"
        />
      </g>
      <circle cx="20" cy="20" r="3.5" fill="var(--color-cta-strong)" />
    </svg>
  );
}
