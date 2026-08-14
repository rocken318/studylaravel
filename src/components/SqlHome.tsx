"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  sqlCurriculum,
  sqlAllLessons,
  sqlTotalLessonCount,
} from "@/data/sql/curriculum";
import { useProgress } from "./ProgressProvider";

export function SqlHome() {
  const { completedLessons, hydrated } = useProgress();

  const completedCount = useMemo(
    () =>
      hydrated
        ? sqlAllLessons.filter((f) => completedLessons[f.lesson.id]).length
        : 0,
    [completedLessons, hydrated]
  );
  const pct = Math.round((completedCount / sqlTotalLessonCount) * 100);

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-8">
        <p className="mb-1 text-sm font-bold text-accent">初めての◯◯シリーズ</p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          初めてのSQL — データと会話する
        </h1>
        <p className="mt-3 leading-relaxed text-ink-soft">
          4日で、データベースの考え方から、SELECT(取り出す)・集計とJOIN・書きかえと設計まで。
          <strong>ほぼ全てのサービスの裏側にいる「必須教養」</strong>を、たとえ多めでやさしく。
          全部書けなくても、AIが出したSQLを読めて・危ない操作に気づける状態を目指します。登録不要・進捗はこのブラウザに保存されます。
        </p>
      </header>

      <div className="mb-8 rounded-2xl border border-base-border bg-base-surface p-5 shadow-sm">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-bold text-ink">学習の進捗</span>
          <span className="text-ink-faint">
            {completedCount}/{sqlTotalLessonCount} レッスン
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-base-bg">
          <div
            className="h-full rounded-full bg-brand transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <ol className="space-y-3">
        {sqlCurriculum.map((day) => {
          const doneInDay = hydrated
            ? day.lessons.filter((l) => completedLessons[l.id]).length
            : 0;
          return (
            <li key={day.slug}>
              <Link
                href={`/sql/${day.slug}`}
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
