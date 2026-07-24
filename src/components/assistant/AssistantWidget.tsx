"use client";

import { useState } from "react";
import Link from "next/link";
import { getSuggestedCollections } from "@/lib/assistant-demo-logic";
import type { Collection, Need } from "@/types/content";

const focusClasses =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta";

/**
 * Site-wide "recommendation helper" widget.
 *
 * This is a deterministic, demo-data-driven helper (see
 * src/lib/assistant-demo-logic.ts) — not a real AI assistant. Presented
 * as a separate, always-available entry point from the approved
 * homepage design (Variant 5 tokens), distinct from the `/selection`
 * questionnaire flow.
 */
type AssistantWidgetProps = {
  needs: Need[];
  collections: Collection[];
  medicalNotice: string;
};

export function AssistantWidget({ needs, collections, medicalNotice }: AssistantWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNeedSlug, setSelectedNeedSlug] = useState<string | null>(null);

  const suggestions = selectedNeedSlug
    ? getSuggestedCollections(selectedNeedSlug, collections)
    : [];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {isOpen && (
        <div
          role="dialog"
          aria-label="Помічник з підбору догляду"
          className="glass mb-3 w-[calc(100vw-2rem)] sm:w-80 max-h-[70vh] overflow-y-auto rounded-[20px] border border-white/50 shadow-lg p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-sm">Помічник з підбору догляду</h2>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Закрити помічника"
              className={`text-ink/70 hover:text-ink text-lg leading-none rounded p-2 -m-2 ${focusClasses}`}
            >
              ×
            </button>
          </div>

          {!selectedNeedSlug ? (
            <>
              <p className="text-sm text-ink/70 mb-4">
                Оберіть, що турбує найбільше — покажу підходящі добірки.
              </p>
              <div className="flex flex-wrap gap-2">
                {needs.map((need) => (
                  <button
                    key={need.slug}
                    type="button"
                    onClick={() => setSelectedNeedSlug(need.slug)}
                    className={`rounded-full border border-white/60 bg-white/50 hover:bg-white/80 text-sm px-3.5 py-2 transition-colors ${focusClasses}`}
                  >
                    {need.title}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-ink/70 mb-4">Ось добірки, які можуть підійти:</p>
              {suggestions.length > 0 ? (
                <ul className="space-y-3 mb-4">
                  {suggestions.map((collection) => (
                    <li
                      key={collection.slug}
                      className="rounded-2xl bg-white/60 border border-white/50 p-3.5"
                    >
                      <p className="font-semibold text-sm mb-1">{collection.title}</p>
                      <p className="text-xs text-ink/70 mb-2">{collection.description}</p>
                      <Link
                        href="/collections"
                        className={`text-xs font-semibold text-cta-strong hover:text-ink rounded ${focusClasses}`}
                      >
                        Переглянути добірку →
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-ink/70 mb-4">
                  Поки немає підходящої добірки в демо-даних для цієї потреби.
                </p>
              )}
              <button
                type="button"
                onClick={() => setSelectedNeedSlug(null)}
                className={`text-xs font-medium text-ink/70 hover:text-ink underline underline-offset-4 rounded ${focusClasses}`}
              >
                Почати знову
              </button>
            </>
          )}

          <p className="text-[11px] text-ink/75 leading-relaxed mt-4 pt-3 border-t border-white/50">
            {medicalNotice}
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className={`rounded-full bg-cta text-white text-sm font-semibold px-5 py-3 shadow-lg shadow-cta/40 hover:bg-cta-strong transition-colors ${focusClasses}`}
      >
        {isOpen ? "Закрити" : "Запитати"}
      </button>
    </div>
  );
}
