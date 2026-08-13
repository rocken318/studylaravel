"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  pythonCurriculum,
  pythonAllLessons,
  pythonTotalLessonCount,
} from "@/data/python/curriculum";
import { useProgress } from "./ProgressProvider";

export function PythonHome() {
  const { completedLessons, hydrated } = useProgress();

  const completedCount = useMemo(
    () =>
      hydrated
        ? pythonAllLessons.filter((f) => completedLessons[f.lesson.id]).length
        : 0,
    [completedLessons, hydrated]
  );
  const pct = Math.round((completedCount / pythonTotalLessonCount) * 100);

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-8">
        <p className="mb-1 text-sm font-bold text-accent">初めての◯◯シリーズ</p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          初めてのPython — AI時代の第一歩
        </h1>
        <p className="mt-3 leading-relaxed text-ink-soft">
          未経験でも7日で、Pythonの基礎を身につけ「AIを自分のコードから動かす」ところまで。
          実装はAIに任せられる前提で、<strong>読める・直せる・説明できる</strong>力に振り切って学びます。
          登録不要・進捗はこのブラウザに保存されます。
        </p>
      </header>

      {/* 進捗 */}
      <div className="mb-8 rounded-2xl border border-base-border bg-base-surface p-5 shadow-sm">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-bold text-ink">学習の進捗</span>
          <span className="text-ink-faint">
            {completedCount}/{pythonTotalLessonCount} レッスン
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
        {pythonCurriculum.map((day) => {
          const doneInDay = hydrated
            ? day.lessons.filter((l) => completedLessons[l.id]).length
            : 0;
          return (
            <li key={day.slug}>
              <Link
                href={`/python/${day.slug}`}
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
