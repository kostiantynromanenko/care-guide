"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { needs, notices } from "@/data/demo-content";
import { getCollectionBySlug } from "@/lib/collections";
import {
  getSelectionResult,
  type SelectionAnswers,
  type SelectionArea,
  type SelectionRoutineSize,
} from "@/lib/selection-demo-logic";

type Step = "area" | "concern" | "routine" | "result";

const focusClasses =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta";

function OptionChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`rounded-full border text-sm px-4 py-2.5 transition-colors ${focusClasses} ${
        selected
          ? "bg-cta text-white border-cta"
          : "bg-white/60 border-white/60 hover:bg-white/85"
      }`}
    >
      {label}
    </button>
  );
}

/**
 * Steps this run of the quiz will pass through, given current answers.
 * The hair path is intentionally shorter — there is only one demo hair
 * collection, so asking extra questions that wouldn't change the result
 * would be misleading (see src/lib/selection-demo-logic.ts).
 */
function getQuestionSteps(area: SelectionArea | undefined): Step[] {
  if (area === "hair") return ["area"];
  return ["area", "concern", "routine"];
}

export function SelectionQuiz() {
  const [step, setStep] = useState<Step>("area");
  const [answers, setAnswers] = useState<SelectionAnswers>({ area: "face" });
  const [areaChosen, setAreaChosen] = useState(false);

  const questionSteps = getQuestionSteps(areaChosen ? answers.area : undefined);
  const currentIndex = questionSteps.indexOf(step);

  function chooseArea(area: SelectionArea) {
    setAnswers({ area });
    setAreaChosen(true);
    setStep(area === "hair" ? "result" : "concern");
  }

  function chooseConcern(concern: string) {
    setAnswers((prev) => ({ ...prev, concern }));
    setStep("routine");
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
    const result = getSelectionResult(answers);
    const collection = getCollectionBySlug(result.collectionSlug);

    return (
      <div>
        <p className="text-sm text-ink/55 mb-6">Ваш результат</p>
        {collection ? (
          <Card className="p-6 sm:p-7 mb-6">
            <ul className="flex flex-wrap gap-1.5 mb-4" aria-label="Теги добірки">
              {collection.tags.map((tag) => (
                <li key={tag} className="text-[11px] rounded-full bg-white/70 px-2.5 py-1">
                  {tag}
                </li>
              ))}
            </ul>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">{collection.title}</h2>
            <p className="text-ink/65 mb-3">{collection.description}</p>
            <p className="text-sm font-semibold text-cta-strong mb-5">{collection.routineSize}</p>
            {result.tip && <p className="text-sm text-ink/60 mb-5">{result.tip}</p>}
            <Link
              href={`/collections/${collection.slug}`}
              className={`inline-block rounded-full bg-cta text-white font-semibold shadow-md shadow-cta/30 hover:bg-cta-strong px-7 py-3.5 text-sm sm:text-base transition-colors ${focusClasses}`}
            >
              Переглянути добірку
            </Link>
          </Card>
        ) : (
          <Card className="p-6 sm:p-7 mb-6">
            <p className="text-ink/65">
              Поки немає підходящої добірки в демо-даних для цієї комбінації відповідей.
            </p>
          </Card>
        )}

        <button
          type="button"
          onClick={reset}
          className={`text-sm font-medium text-ink/60 hover:text-ink underline underline-offset-4 rounded ${focusClasses}`}
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
      <p className="text-sm text-ink/55 mb-6">
        Крок {currentIndex + 1} з {questionSteps.length}
      </p>

      {step === "area" && (
        <>
          <h2 className="text-lg sm:text-xl font-semibold mb-5">З чим допомогти?</h2>
          <div className="flex flex-wrap gap-2.5">
            <OptionChip label="Догляд за обличчям" selected={false} onClick={() => chooseArea("face")} />
            <OptionChip label="Догляд за волоссям" selected={false} onClick={() => chooseArea("hair")} />
          </div>
        </>
      )}

      {step === "concern" && (
        <>
          <h2 className="text-lg sm:text-xl font-semibold mb-5">Що турбує найбільше?</h2>
          <div className="flex flex-wrap gap-2.5 mb-8">
            {needs.map((need) => (
              <OptionChip
                key={need.slug}
                label={need.title}
                selected={answers.concern === need.slug}
                onClick={() => chooseConcern(need.slug)}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={goBack}
            className={`text-sm font-medium text-ink/60 hover:text-ink underline underline-offset-4 rounded ${focusClasses}`}
          >
            ← Назад
          </button>
        </>
      )}

      {step === "routine" && (
        <>
          <h2 className="text-lg sm:text-xl font-semibold mb-5">Скільки кроків готові приділяти?</h2>
          <div className="flex flex-wrap gap-2.5 mb-5">
            <OptionChip
              label="Мінімум (3 кроки)"
              selected={answers.routineSize === "minimal"}
              onClick={() => chooseRoutineSize("minimal")}
            />
            <OptionChip
              label="Повна рутина (4 кроки, ранок і вечір)"
              selected={answers.routineSize === "full"}
              onClick={() => chooseRoutineSize("full")}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-ink/65 mb-8 cursor-pointer">
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
              className={`text-sm font-medium text-ink/60 hover:text-ink underline underline-offset-4 rounded ${focusClasses}`}
            >
              ← Назад
            </button>
          </div>
        </>
      )}
    </div>
  );
}
