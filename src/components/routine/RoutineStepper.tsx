import { Card } from "@/components/ui/Card";
import { getProductBySlug } from "@/lib/collections";
import type { RoutineSequence } from "@/types/content";

/**
 * Visualizes one labeled sequence of routine steps (e.g. "Вранці" / "Ввечері",
 * or a single "Кроки догляду" group for routines without an AM/PM split).
 * Numbered rose circles connected by a line on larger screens, stacked list
 * on mobile — reuses the same number-circle language as the homepage
 * "Як це працює" section for visual consistency.
 */
export function RoutineStepper({ sequence }: { sequence: RoutineSequence }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-cta-strong mb-4">{sequence.label}</h3>
      <ol className="flex flex-col sm:flex-row gap-4 sm:gap-3">
        {sequence.steps.map((step, index) => {
          const product = step.productSlug ? getProductBySlug(step.productSlug) : undefined;
          const isLast = index === sequence.steps.length - 1;

          return (
            <li key={step.number} className="flex-1 flex sm:flex-col gap-3 sm:gap-0">
              <div className="flex sm:hidden flex-col items-center">
                <span
                  className="w-8 h-8 rounded-full bg-cta text-white text-xs font-bold flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                {!isLast && <span className="flex-1 w-px bg-cta/25 my-1" aria-hidden="true" />}
              </div>

              <div className="hidden sm:flex items-center gap-2 mb-3">
                <span
                  className="w-8 h-8 rounded-full bg-cta text-white text-xs font-bold flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                {!isLast && <span className="flex-1 h-px bg-cta/25" aria-hidden="true" />}
              </div>

              <Card className="p-4 flex-1">
                <h4 className="text-sm font-semibold mb-1">{step.title}</h4>
                <p className="text-xs text-ink/60 mb-2">{step.description}</p>
                {product && (
                  <p className="text-[11px] text-ink/45">
                    Засіб: <span className="text-ink/65">{product.title}</span>
                  </p>
                )}
              </Card>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
