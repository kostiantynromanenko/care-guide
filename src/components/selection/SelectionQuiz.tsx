"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { ProductCard } from "@/components/cards/ProductCard";
import {
  getSelectionResult,
  type SelectionAnswers,
  type SelectionArea,
  type SelectionRoutineSize,
} from "@/lib/selection-demo-logic";
import { detectOsId } from "@/lib/user-agent";
import type { Collection, Need, Notices, Product } from "@/types/content";

type Step = "area" | "concern" | "routine" | "result";

const focusClasses =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta";

/**
 * Reuses the same pink watercolor-illustration set already painted for
 * RoutineCard/NeedCard, instead of a parallel set just for the quiz — same
 * subjects mean the visual language stays consistent between "answer this"
 * and "here's your plan".
 */
const AREA_IMAGES: Record<SelectionArea, string> = {
  face: "/routine-face-v1.png",
  hair: "/routine-hair-v1.png",
  body: "/quiz-area-body-v3.png",
};

const CONCERN_IMAGES: Record<string, string> = {
  dryness: "/need-dryness-v4.png",
  oiliness: "/need-oiliness-v4.png",
  sensitivity: "/need-sensitivity-v4.png",
  dullness: "/need-dullness-v4.png",
  acne: "/need-acne-v3.png",
  "anti-aging": "/need-anti-aging-v3.png",
};

const ROUTINE_SIZE_IMAGES: Record<SelectionRoutineSize, string> = {
  minimal: "/quiz-routine-minimal-v1.png",
  full: "/quiz-routine-full-v1.png",
};

/**
 * Hair and body concerns aren't backed by CMS `Need` docs (those are
 * face-only, shown on the homepage) — there are few enough options that
 * hardcoding them here, the same way routine-size already is, is simpler
 * than adding a CMS collection just for two areas' worth of quiz options.
 */
const HAIR_CONCERNS: { slug: string; label: string; image: string }[] = [
  { slug: "dry-hair", label: "Сухість та ламкість", image: "/quiz-hair-dry-v2.png" },
  { slug: "hair-loss", label: "Випадіння волосся", image: "/quiz-hair-loss-v1.png" },
  { slug: "hair-growth", label: "Повільний ріст", image: "/quiz-hair-growth-v2.png" },
];

const BODY_CONCERNS: { slug: string; label: string; image: string }[] = [
  { slug: "cellulite", label: "Пружність шкіри тіла", image: "/quiz-cellulite-v2.png" },
  { slug: "foot-care", label: "Сухі, потріскані п'яти", image: "/quiz-foot-care-v1.png" },
];

const CONCERN_HEADINGS: Record<SelectionArea, string> = {
  face: "Що турбує найбільше?",
  hair: "Що турбує волосся найбільше?",
  body: "Що турбує найбільше?",
};

/** Face concerns backed by ready HiLLARY bundles rather than an assembled routine — no "how many steps" question needed. */
const NO_ROUTINE_STEP_CONCERNS = new Set(["acne", "anti-aging"]);

function OptionCard({
  label,
  image,
  selected,
  onClick,
}: {
  label: string;
  image?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex flex-col overflow-hidden rounded-[20px] border text-left transition-all ${focusClasses} ${
        selected
          ? "border-cta ring-2 ring-cta/30 bg-white/70"
          : "border-white/60 bg-white/50 hover:border-cta/40 hover:bg-white/70"
      }`}
    >
      {image && (
        <div className="relative w-full aspect-[4/3]">
          <Image src={image} alt="" fill sizes="(min-width: 640px) 220px, 45vw" className="object-cover" />
        </div>
      )}
      <span className={`px-3.5 py-3 text-sm font-semibold ${selected ? "text-cta-strong" : "text-ink"}`}>
        {label}
      </span>
    </button>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-6">
      <div className="flex gap-1.5 mb-2.5" aria-hidden="true">
        {Array.from({ length: total }).map((_, index) => (
          <span
            key={index}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              index <= current ? "bg-cta" : "bg-black/10"
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-ink/60">
        Крок {current + 1} з {total}
      </p>
    </div>
  );
}

/**
 * Steps this run of the quiz will pass through, given current answers.
 * Hair and body concerns map directly onto a ready HiLLARY bundle, so
 * there's no "how many steps" question for them — only face concerns that
 * are still assembled from individual products (dryness/oiliness/
 * sensitivity/dullness) ask it (see src/lib/selection-demo-logic.ts).
 */
function getQuestionSteps(area: SelectionArea | undefined, concern: string | undefined): Step[] {
  if (area === "hair" || area === "body") return ["area", "concern"];
  if (concern && NO_ROUTINE_STEP_CONCERNS.has(concern)) return ["area", "concern"];
  return ["area", "concern", "routine"];
}

type SelectionQuizProps = {
  needs: Need[];
  notices: Notices;
  collections: Collection[];
  products: Product[];
};

export function SelectionQuiz({ needs, notices, collections, products }: SelectionQuizProps) {
  const [step, setStep] = useState<Step>("area");
  const [answers, setAnswers] = useState<SelectionAnswers>({ area: "face" });
  const [areaChosen, setAreaChosen] = useState(false);

  const questionSteps = getQuestionSteps(areaChosen ? answers.area : undefined, answers.concern);
  const currentIndex = questionSteps.indexOf(step);

  function chooseArea(area: SelectionArea) {
    setAnswers({ area });
    setAreaChosen(true);
    setStep("concern");
  }

  function chooseConcern(concern: string) {
    setAnswers((prev) => ({ ...prev, concern }));
    const skipsRoutineStep = answers.area !== "face" || NO_ROUTINE_STEP_CONCERNS.has(concern);
    setStep(skipsRoutineStep ? "result" : "routine");
  }

  function chooseRoutineSize(routineSize: SelectionRoutineSize) {
    setAnswers((prev) => ({ ...prev, routineSize }));
  }

  function toggleSensitive() {
    setAnswers((prev) => ({ ...prev, sensitive: !prev.sensitive }));
  }

  function showResult() {
    setStep("result");
  }

  function goBack() {
    if (step === "concern") setStep("area");
    else if (step === "routine") setStep("concern");
  }

  function reset() {
    setAnswers({ area: "face" });
    setAreaChosen(false);
    setStep("area");
  }

  if (step === "result") {
    const result = getSelectionResult(answers, needs);
    const collection = collections.find((item) => item.slug === result.collectionSlug);
    const topProducts = collection
      ? products.filter((product) => collection.recommendedProductSlugs.includes(product.slug)).slice(0, 3)
      : [];

    return (
      <div>
        <p className="text-sm text-ink/70 mb-6">Ваш результат</p>
        {collection ? (
          <Card className="p-6 sm:p-7 mb-6">
            <ul className="flex flex-wrap gap-1.5 mb-4" aria-label="Теги добірки">
              {collection.tags.map((tag) => (
                <li key={tag} className="text-[11px] rounded-full bg-white border border-black/5 px-2.5 py-1">
                  {tag}
                </li>
              ))}
            </ul>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">{collection.title}</h2>
            <p className="text-ink/75 mb-3">{collection.description}</p>
            <p className="text-sm font-semibold text-cta-strong mb-5">{collection.routineSize}</p>
            {result.tip && <p className="text-sm text-ink/70 mb-5">{result.tip}</p>}
            <Link
              href={`/collections/${collection.slug}`}
              className={`inline-block rounded-full bg-cta text-white font-semibold shadow-md shadow-cta/30 hover:bg-cta-strong px-7 py-3.5 text-sm sm:text-base transition-colors ${focusClasses}`}
            >
              Переглянути добірку
            </Link>
          </Card>
        ) : (
          <Card className="p-6 sm:p-7 mb-6">
            <p className="text-ink/75">
              Поки немає підходящої добірки в демо-даних для цієї комбінації відповідей.
            </p>
          </Card>
        )}

        {topProducts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-ink/70 mb-3">З чого почати</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {topProducts.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  source={{
                    page: "quiz-result",
                    collectionSlug: collection?.slug,
                    osId: typeof navigator !== "undefined" ? detectOsId(navigator.userAgent) : undefined,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={reset}
          className={`text-sm font-medium text-ink/70 hover:text-ink underline underline-offset-4 rounded ${focusClasses}`}
        >
          Пройти ще раз
        </button>

        <Notice className="mt-8">
          <p>{notices.independent}</p>
          <p>{notices.medical}</p>
        </Notice>
      </div>
    );
  }

  return (
    <div>
      <ProgressBar current={currentIndex} total={questionSteps.length} />

      {step === "area" && (
        <>
          <h2 className="text-lg sm:text-xl font-semibold mb-5">З чим допомогти?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            <OptionCard
              label="Догляд за обличчям"
              image={AREA_IMAGES.face}
              selected={false}
              onClick={() => chooseArea("face")}
            />
            <OptionCard
              label="Догляд за волоссям"
              image={AREA_IMAGES.hair}
              selected={false}
              onClick={() => chooseArea("hair")}
            />
            <OptionCard
              label="Догляд за тілом"
              image={AREA_IMAGES.body}
              selected={false}
              onClick={() => chooseArea("body")}
            />
          </div>
        </>
      )}

      {step === "concern" && (
        <>
          <h2 className="text-lg sm:text-xl font-semibold mb-5">{CONCERN_HEADINGS[answers.area]}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
            {answers.area === "face" &&
              needs.map((need) => (
                <OptionCard
                  key={need.slug}
                  label={need.title}
                  image={CONCERN_IMAGES[need.slug]}
                  selected={answers.concern === need.slug}
                  onClick={() => chooseConcern(need.slug)}
                />
              ))}
            {answers.area === "hair" &&
              HAIR_CONCERNS.map((concern) => (
                <OptionCard
                  key={concern.slug}
                  label={concern.label}
                  image={concern.image}
                  selected={answers.concern === concern.slug}
                  onClick={() => chooseConcern(concern.slug)}
                />
              ))}
            {answers.area === "body" &&
              BODY_CONCERNS.map((concern) => (
                <OptionCard
                  key={concern.slug}
                  label={concern.label}
                  image={concern.image}
                  selected={answers.concern === concern.slug}
                  onClick={() => chooseConcern(concern.slug)}
                />
              ))}
          </div>
          <button
            type="button"
            onClick={goBack}
            className={`text-sm font-medium text-ink/70 hover:text-ink underline underline-offset-4 rounded ${focusClasses}`}
          >
            ← Назад
          </button>
        </>
      )}

      {step === "routine" && (
        <>
          <h2 className="text-lg sm:text-xl font-semibold mb-5">Скільки кроків готові приділяти?</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5">
            <OptionCard
              label="Мінімум (3 кроки)"
              image={ROUTINE_SIZE_IMAGES.minimal}
              selected={answers.routineSize === "minimal"}
              onClick={() => chooseRoutineSize("minimal")}
            />
            <OptionCard
              label="Повна рутина (4 кроки, ранок і вечір)"
              image={ROUTINE_SIZE_IMAGES.full}
              selected={answers.routineSize === "full"}
              onClick={() => chooseRoutineSize("full")}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-ink/75 mb-8 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(answers.sensitive)}
              onChange={toggleSensitive}
              className="w-4 h-4 accent-[var(--color-cta)]"
            />
            У мене чутлива шкіра
          </label>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={showResult}
              disabled={!answers.routineSize}
              className={`rounded-full bg-cta text-white font-semibold shadow-md shadow-cta/30 hover:bg-cta-strong disabled:opacity-40 disabled:cursor-not-allowed px-6 py-2.5 text-sm transition-colors ${focusClasses}`}
            >
              Показати результат
            </button>
            <button
              type="button"
              onClick={goBack}
              className={`text-sm font-medium text-ink/70 hover:text-ink underline underline-offset-4 rounded ${focusClasses}`}
            >
              ← Назад
            </button>
          </div>
        </>
      )}
    </div>
  );
}
