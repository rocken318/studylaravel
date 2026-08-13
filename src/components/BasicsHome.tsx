"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  basicsCurriculum,
  basicsAllLessons,
  basicsTotalLessonCount,
} from "@/data/basics/curriculum";
import { useProgress } from "./ProgressProvider";

export function BasicsHome() {
  const { completedLessons, hydrated } = useProgress();

  const completedCount = useMemo(
    () =>
      hydrated
        ? basicsAllLessons.filter((f) => completedLessons[f.lesson.id]).length
        : 0,
    [completedLessons, hydrated]
  );
  const pct = Math.round((completedCount / basicsTotalLessonCount) * 100);

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-8">
        <p className="mb-1 text-sm font-bold text-accent">初めての◯◯シリーズ</p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          バイブコーディングの土台 — 言語共通の基礎
        </h1>
        <p className="mt-3 leading-relaxed text-ink-soft">
          言語に依存しない、プログラミングの共通の考え方を、たとえ多めでやさしく。
          AIにコードを任せる前提で、<strong>読める・直せる・説明できる</strong>力に振り切って学びます。
          登録不要・進捗はこのブラウザに保存されます。
        </p>
      </header>

      {/* この前に読む総論への導線 */}
      <Link
        href="/vibe"
        className="group mb-8 flex items-center gap-4 rounded-2xl border-l-4 border-brand bg-brand-bg p-5 transition-colors hover:bg-brand-bg/70"
      >
        <span aria-hidden className="text-2xl">🧭</span>
        <div className="min-w-0">
          <p className="text-xs font-bold text-brand">まず読む・総論（非エンジニア向け）</p>
          <p className="font-bold text-ink group-hover:text-brand">
            バイブコーディング時代の基礎知識
          </p>
          <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">
            プログラミングとは何か、AIで何が変わるか。図とたとえで分かる版つき。5分で読めます。
          </p>
        </div>
        <span aria-hidden className="ml-auto shrink-0 text-brand">→</span>
      </Link>

      {/* 進捗 */}
      <div className="mb-8 rounded-2xl border border-base-border bg-base-surface p-5 shadow-sm">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-bold text-ink">学習の進捗</span>
          <span className="text-ink-faint">
            {completedCount}/{basicsTotalLessonCount} レッスン
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-base-bg">
          <div
            className="h-full rounded-full bg-brand transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Day 一覧 */}
      <ol className="space-y-3">
        {basicsCurriculum.map((day) => {
          const doneInDay = hydrated
            ? day.lessons.filter((l) => completedLessons[l.id]).length
            : 0;
          return (
            <li key={day.slug}>
              <Link
                href={`/basics/${day.slug}`}
                className="group flex items-start gap-4 rounded-2xl border border-base-border bg-base-surface p-5 shadow-sm transition-colors hover:border-brand"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-bg text-sm font-bold text-brand">
                  {day.day}
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-ink group-hover:text-brand">
                    Day {day.day}・{day.title}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                    {day.goal}
                  </p>
                  <p className="mt-1.5 text-xs text-ink-faint">
                    {doneInDay}/{day.lessons.length} 完了
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
