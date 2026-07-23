import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

/**
 * Shared style for informational/legal callouts (independent-site notice,
 * affiliate disclosure, medical disclaimer). Keeps visual treatment
 * consistent wherever a disclosure is required (docs/APPROVAL_WORKFLOW.md).
 */
export function Notice({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={`p-5 sm:p-6 text-sm text-ink/65 leading-relaxed space-y-1.5 ${className}`}>
      {children}
    </Card>
  );
}
