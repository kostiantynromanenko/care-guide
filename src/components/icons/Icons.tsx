import type { SVGProps } from "react";

/**
 * Small hand-picked line-icon set (approved 2026-07-25 — see the visual
 * richness report). Deliberately a handful of inline SVGs rather than a new
 * dependency (e.g. lucide-react): keeps the bundle light and avoids an
 * unapproved-dependency question. All icons are purely decorative and paired
 * with visible text, so they're `aria-hidden` — the parent is responsible for
 * the accessible label.
 *
 * Style: 24x24 viewBox, stroke-based, rounded caps/joins, no fill — reads as
 * a soft editorial line-icon rather than a bold app icon, matching the
 * approved Variant 5 "restrained shadows / soft visual hierarchy" direction.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function DropletIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5c3 3.6 5.5 6.94 5.5 10a5.5 5.5 0 1 1-11 0c0-3.06 2.5-6.4 5.5-10Z" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 19c8 0 13-5 13-13V5h-1C10 5 5 10 5 18v1" />
      <path d="M6 19c1-4 3.5-7.5 7-9.5" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 19 6v5c0 5-3 8.5-7 9.5-4-1-7-4.5-7-9.5V6l7-2.5Z" />
      <path d="m9.2 12 1.9 1.9 3.7-3.9" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5c.5 3 2.3 4.8 5.3 5.3-3 .5-4.8 2.3-5.3 5.3-.5-3-2.3-4.8-5.3-5.3 3-.5 4.8-2.3 5.3-5.3Z" />
      <path d="M18.5 15.5c.25 1.3 1 2.05 2.3 2.3-1.3.25-2.05 1-2.3 2.3-.25-1.3-1-2.05-2.3-2.3 1.3-.25 2.05-1 2.3-2.3Z" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  );
}

export function JarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 4h8v2.2c1.2.5 2 1.7 2 3.1V18a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9.3c0-1.4.8-2.6 2-3.1V4Z" />
      <path d="M6.5 12h11" />
    </svg>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.5 9.5-1.6 4.4-4.4 1.6 1.6-4.4 4.4-1.6Z" />
    </svg>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3.5 8 4.2-8 4.2-8-4.2 8-4.2Z" />
      <path d="m4 12 8 4.2 8-4.2" />
      <path d="m4 16 8 4.2 8-4.2" />
    </svg>
  );
}

export function FlaskIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10 3.5h4M10.5 3.5v5.3L6.3 16a2 2 0 0 0 1.7 3h8a2 2 0 0 0 1.7-3l-4.2-7.2V3.5" />
      <path d="M8.3 14.5h7.4" />
    </svg>
  );
}

/**
 * Replaced the earlier abstract face/hair silhouettes (`FaceMarkIcon`/
 * `HairMarkIcon`) — at 20px they read as an ambiguous blob rather than
 * "face" or "hair" (feedback 2026-07-25). These are more literal and
 * immediately legible at small sizes: a blossom for face routines, a comb
 * for hair routines.
 */
export function BlossomIcon(props: IconProps) {
  const petal =
    "M12 12c-1.6-1-2.4-2.6-2.4-4.6 0-1.6.9-2.9 2.4-3.4 1.5.5 2.4 1.8 2.4 3.4 0 2-.8 3.6-2.4 4.6Z";
  return (
    <svg {...base} {...props}>
      <path d={petal} />
      <path d={petal} transform="rotate(90 12 12)" />
      <path d={petal} transform="rotate(180 12 12)" />
      <path d={petal} transform="rotate(270 12 12)" />
      <circle cx="12" cy="12" r="1.3" />
    </svg>
  );
}

export function CombIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6h17" />
      <path d="M5.5 6v9M8.5 6v9M11.5 6v9M14.5 6v9M17.5 6v9M20.5 6v6" />
    </svg>
  );
}
