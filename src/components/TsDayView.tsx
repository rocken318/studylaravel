"use client";

import Link from "next/link";
import type { Day } from "@/types";
import { useProgress } from "./ProgressProvider";

export function TsDayView({ day }: { day: Day }) {
  const { isLessonComplete, hydrated } = useProgress();
  const doneCount = day.lessons.filter(
    (l) => hydrated && isLessonComplete(l.id)
  ).length;

  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mb-4 flex items-center gap-1.5 text-xs text-ink-faint">
        <Link href="/typescript" className="hover:text-brand">
          初めてのTypeScript
        </Link>
        <span>/</span>
        <span className="text-ink-soft">Day {day.day}</span>
      </nav>

      <header className="mb-8 rounded-2xl border border-base-border bg-base-surface p-6 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold text-accent">DAY {day.day}</span>
          <span className="text-xs text-ink-faint">
            {doneCount}/{day.lessons.length} 完了
          </span>
        </div>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">{day.title}</h1>
        <div className="mt-3 rounded-xl bg-brand-bg p-4">
          <p className="mb-1 text-xs font-semibold text-brand">
            🎯 このDayを終えるとできること
          </p>
          <p className="text-sm leading-relaxed text-ink-soft">{day.goal}</p>
        </div>
      </header>

      <ol className="space-y-3">
        {day.lessons.map((lesson, i) => {
          const done = hydrated && isLessonComplete(lesson.id);
          return (
            <li key={lesson.id}>
              <Link
                href={`/typescript/${day.slug}/${lesson.slug}`}
                className="group flex items-start gap-4 rounded-2xl border border-base-border bg-base-surface p-5 shadow-sm transition-colors hover:border-brand"
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    done ? "bg-good text-white" : "bg-brand-bg text-brand"
                  }`}
                >
                  {done ? "✓" : i + 1}
                </span>
                <div>
                  <p className="font-bold text-ink group-hover:text-brand">
                    {lesson.title}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">
                    {lesson.summary}
                  </p>
                  <p className="mt-1.5 text-xs text-ink-faint">
                    設問 {lesson.questions.length} 問
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
