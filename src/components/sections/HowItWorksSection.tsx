import { Section } from "@/components/layout/Section";
import { getHowItWorksSteps } from "@/lib/site-content";

/**
 * Deliberately NOT another "icon in a soft circle + title + description"
 * card grid — that reads as near-identical to NeedsSection. This is a solid
 * numbered stepper instead: bold filled circles on a visible connecting
 * line, which reads as "ordered process" at a glance rather than "another
 * grid of options". Heading size matches the other section headings.
 */
export async function HowItWorksSection() {
  const steps = await getHowItWorksSteps();

  return (
    <Section tinted aria-labelledby="how-it-works-heading" className="!py-10 sm:!py-12">
      <h2 id="how-it-works-heading" className="text-xl sm:text-2xl font-bold mb-8 text-center sm:text-left">
        Як це працює
      </h2>
      <ol className="relative flex gap-6 overflow-x-auto snap-x snap-mandatory pb-1 sm:grid sm:grid-cols-4 sm:gap-6 sm:overflow-visible">
        <div
          className="hidden sm:block absolute top-5 left-[12.5%] right-[12.5%] h-0.5 bg-cta/30"
          aria-hidden="true"
        />
        {steps.map((step) => (
          <li
            key={step.number}
            className="snap-start shrink-0 w-[62%] sm:w-auto flex flex-col items-center text-center"
          >
            <span
              className="relative z-10 w-10 h-10 rounded-full bg-cta text-white font-bold flex items-center justify-center shadow-sm shadow-cta/30 mb-3"
              aria-hidden="true"
            >
              {step.number}
            </span>
            <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
            <p className="text-xs text-ink/70">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
