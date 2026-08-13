"use client";

import { useMemo, useState } from "react";
import { tsGlossary } from "@/data/typescript/glossary";
import {
  glossaryCategoryLabels,
  tsGlossaryCategoryOrder,
} from "@/lib/labels";
import { useGlossaryModal, findTerm } from "@/components/GlossaryModal";
import type { GlossaryCategory } from "@/types";

type Filter = GlossaryCategory | "all";

export function TsGlossary() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const { openTerm } = useGlossaryModal();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tsGlossary.filter((t) => {
      if (filter !== "all" && t.category !== filter) return false;
      if (!q) return true;
      return (
        t.term.toLowerCase().includes(q) ||
        (t.reading ?? "").toLowerCase().includes(q) ||
        t.meaning.toLowerCase().includes(q)
      );
    });
  }, [query, filter]);

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-6">
        <p className="mb-1 text-sm font-medium text-accent">TypeScript・React 用語集</p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          型とReactの用語を「読める・説明できる」状態にする
        </h1>
        <p className="mt-2 max-w-reading leading-relaxed text-ink-soft">
          レッスン本文中の用語をクリックしても、この解説が開きます。全{" "}
          {tsGlossary.length} 語。
        </p>
      </header>

      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="用語を検索(例: interface、useState、async)"
          className="w-full rounded-xl border border-base-border bg-base-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Chip
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label={`すべて (${tsGlossary.length})`}
        />
        {tsGlossaryCategoryOrder.map((cat) => {
          const count = tsGlossary.filter((t) => t.category === cat).length;
          return (
            <Chip
              key={cat}
              active={filter === cat}
              onClick={() => setFilter(cat)}
              label={`${glossaryCategoryLabels[cat]} (${count})`}
            />
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-base-border bg-base-surface p-8 text-center text-ink-soft">
          「{query}」に一致する用語は見つかりませんでした。
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((t) => (
            <article
              key={t.slug}
              className="rounded-2xl border border-base-border bg-base-surface p-5 shadow-sm"
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span className="rounded-full bg-brand-bg px-2 py-0.5 text-xs font-medium text-brand">
                  {glossaryCategoryLabels[t.category]}
                </span>
              </div>
              <h2 className="text-base font-bold text-ink">
                {t.term}
                {t.reading && (
                  <span className="ml-1.5 text-xs font-normal text-ink-faint">
                    {t.reading}
                  </span>
                )}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {t.meaning}
              </p>
              <div className="mt-3 rounded-lg border border-accent/30 bg-accent-bg p-3">
                <p className="mb-0.5 text-xs font-semibold text-accent">
                  💡 実務での使い方
                </p>
                <p className="text-xs leading-relaxed text-ink-soft">
                  {t.interviewExample}
                </p>
              </div>
              {t.related && t.related.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {t.related.map((r) => {
                    const rt = findTerm(r);
                    if (!rt) return null;
                    return (
                      <button
                        key={r}
                        onClick={() => openTerm(r)}
                        className="rounded-full border border-base-border px-2 py-0.5 text-xs text-ink-faint transition-colors hover:border-brand hover:text-brand"
                      >
                        {rt.term}
                      </button>
                    );
                  })}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        active
          ? "border-brand bg-brand text-white"
          : "border-base-border bg-base-surface text-ink-soft hover:border-brand"
      }`}
    >
      {label}
    </button>
  );
}
