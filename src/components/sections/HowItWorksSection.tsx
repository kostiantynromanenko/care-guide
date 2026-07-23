import { Card } from "@/components/ui/Card";
import { routineSteps } from "@/data/demo-content";

export function HowItWorksSection() {
  return (
    <section
      className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16"
      aria-labelledby="how-it-works-heading"
    >
      <h2 id="how-it-works-heading" className="text-xl sm:text-2xl font-bold mb-7">
        Як це працює
      </h2>
      <ol className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {routineSteps.map((step) => (
          <li key={step.number}>
            <Card className="p-5 h-full">
              <span
                className="w-8 h-8 rounded-full bg-cta text-white text-xs font-bold flex items-center justify-center mb-3"
                aria-hidden="true"
              >
                {step.number}
              </span>
              <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
              <p className="text-xs text-ink/55">{step.description}</p>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  );
}
