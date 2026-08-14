"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  jsCurriculum,
  jsAllLessons,
  jsTotalLessonCount,
} from "@/data/javascript/curriculum";
import { useProgress } from "./ProgressProvider";

export function JsHome() {
  const { completedLessons, hydrated } = useProgress();

  const completedCount = useMemo(
    () =>
      hydrated
        ? jsAllLessons.filter((f) => completedLessons[f.lesson.id]).length
        : 0,
    [completedLessons, hydrated]
  );
  const pct = Math.round((completedCount / jsTotalLessonCount) * 100);

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-8">
        <p className="mb-1 text-sm font-bold text-accent">初めての◯◯シリーズ</p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          初めてのJavaScript — Webページに命を吹き込む
        </h1>
        <p className="mt-3 leading-relaxed text-ink-soft">
          HTML(骨組み)・CSS(見た目)に「動き」を足すのがJavaScript。5日で、変数・条件・関数から、
          ブラウザを操作してデータを取得するところまで。
          <strong>実装はAIに任せても、読める・直せる・説明できる</strong>力を育てます。
          Reactへ進むための土台にもなります。登録不要・進捗はこのブラウザに保存されます。
        </p>
      </header>

      <div className="mb-8 rounded-2xl border border-base-border bg-base-surface p-5 shadow-sm">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-bold text-ink">学習の進捗</span>
          <span className="text-ink-faint">
            {completedCount}/{jsTotalLessonCount} レッスン
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
        {jsCurriculum.map((day) => {
          const doneInDay = hydrated
            ? day.lessons.filter((l) => completedLessons[l.id]).length
            : 0;
          return (
            <li key={day.slug}>
              <Link
                href={`/javascript/${day.slug}`}
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
