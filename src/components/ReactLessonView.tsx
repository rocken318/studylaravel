"use client";

import Link from "next/link";
import type { Day, Lesson } from "@/types";
import { ContentRenderer } from "./ContentRenderer";
import { QuizSection } from "./QuizBlock";
import { AskAIButton } from "./AskAIButton";
import { useProgress } from "./ProgressProvider";
import { getReactAdjacentLessons } from "@/data/react/curriculum";

const REACT_PREFACE =
  "私はJavaScriptの基礎を終えた初学者で、Reactの仕組みを学びながら、AIに手伝ってもらってUIを組み立てられるようになりたいです。";

export function ReactLessonView({ day, lesson }: { day: Day; lesson: Lesson }) {
  const { isLessonComplete, toggleLessonComplete, hydrated } = useProgress();
  const done = hydrated && isLessonComplete(lesson.id);
  const { prev, next } = getReactAdjacentLessons(lesson.id);

  return (
    <article className="mx-auto max-w-reading">
      <nav className="mb-4 flex items-center gap-1.5 text-xs text-ink-faint">
        <Link href="/react" className="hover:text-brand">
          初めてのReact
        </Link>
        <span>/</span>
        <Link href={`/react/${day.slug}`} className="hover:text-brand">
          Day {day.day}
        </Link>
        <span>/</span>
        <span className="text-ink-soft">{lesson.title}</span>
      </nav>

      <header className="mb-8">
        <p className="mb-1 text-sm font-medium text-accent">
          Day {day.day}・{day.title}
        </p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          {lesson.title}
        </h1>
        <p className="mt-2 leading-relaxed text-ink-soft">{lesson.summary}</p>
      </header>

      <ContentRenderer blocks={lesson.blocks} />

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-base-border bg-base-bg p-4">
        <p className="text-sm text-ink-soft">
          読んでも腑に落ちない所は、AIに噛み砕いてもらいましょう。
        </p>
        <AskAIButton
          input={{
            kind: "lesson",
            lessonTitle: lesson.title,
            dayTitle: `Day ${day.day}・${day.title}`,
            preface: REACT_PREFACE,
          }}
        />
      </div>

      <QuizSection questions={lesson.questions} />

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => toggleLessonComplete(lesson.id)}
          className={`rounded-full px-6 py-3 text-sm font-bold transition-colors ${
            done
              ? "bg-good text-white hover:bg-good/90"
              : "bg-brand text-white hover:bg-brand/90"
          }`}
        >
          {done ? "✓ このレッスンを完了済み" : "このレッスンを完了にする"}
        </button>
      </div>

      <nav className="mt-10 grid grid-cols-2 gap-3 border-t border-base-border pt-6">
        <div>
          {prev && (
            <Link
              href={`/react/${prev.day.slug}/${prev.lesson.slug}`}
              className="group block rounded-xl border border-base-border bg-base-surface p-4 transition-colors hover:border-brand"
            >
              <span className="text-xs text-ink-faint">← 前のレッスン</span>
              <p className="mt-0.5 text-sm font-bold text-ink group-hover:text-brand">
                {prev.lesson.title}
              </p>
            </Link>
          )}
        </div>
        <div>
          {next && (
            <Link
              href={`/react/${next.day.slug}/${next.lesson.slug}`}
              className="group block rounded-xl border border-base-border bg-base-surface p-4 text-right transition-colors hover:border-brand"
            >
              <span className="text-xs text-ink-faint">次のレッスン →</span>
              <p className="mt-0.5 text-sm font-bold text-ink group-hover:text-brand">
                {next.lesson.title}
              </p>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
