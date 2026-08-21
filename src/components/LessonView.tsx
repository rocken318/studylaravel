"use client";

import Link from "next/link";
import type { Day, Lesson } from "@/types";
import { ContentRenderer } from "./ContentRenderer";
import { QuizSection } from "./QuizBlock";
import { ExampleBox } from "./ExampleBox";
import { AskAIButton } from "./AskAIButton";
import { useProgress } from "./ProgressProvider";
import { getAdjacentLessons } from "@/data/curriculum";

export function LessonView({ day, lesson }: { day: Day; lesson: Lesson }) {
  const { isLessonComplete, toggleLessonComplete, hydrated } = useProgress();
  const done = hydrated && isLessonComplete(lesson.id);
  const { prev, next } = getAdjacentLessons(lesson.id);

  return (
    <article className="mx-auto max-w-reading">
      <nav className="mb-4 flex items-center gap-1.5 text-xs text-ink-faint">
        <Link href="/" className="hover:text-brand">
          ダッシュボード
        </Link>
        <span>/</span>
        <Link href={`/curriculum/${day.slug}`} className="hover:text-brand">
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

      <ExampleBox lessonId={lesson.id} />

      <ContentRenderer blocks={lesson.blocks} />

      {/* この単元をAIに深掘り */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-base-border bg-base-bg p-4">
        <p className="text-sm text-ink-soft">
          読んでも腑に落ちない所は、AIに噛み砕いてもらいましょう。
        </p>
        <AskAIButton
          input={{
            kind: "lesson",
            lessonTitle: lesson.title,
            dayTitle: `Day ${day.day}・${day.title}`,
          }}
          label="この単元をAIに聞く"
        />
      </div>

      <QuizSection questions={lesson.questions} />

      {/* 完了チェック */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => toggleLessonComplete(lesson.id)}
          className={`flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-medium transition-colors ${
            done
              ? "border-good bg-good-bg text-good"
              : "border-brand bg-brand text-white hover:bg-brand-soft"
          }`}
        >
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full border text-xs ${
              done ? "border-good bg-good text-white" : "border-white/60"
            }`}
          >
            ✓
          </span>
          {done ? "このレッスンは完了済み" : "このレッスンを完了にする"}
        </button>
      </div>

      {/* 前へ / 次へ */}
      <nav className="mt-10 grid gap-3 border-t border-base-border pt-6 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/curriculum/${prev.day.slug}/${prev.lesson.slug}`}
            className="rounded-xl border border-base-border p-4 transition-colors hover:border-brand"
          >
            <span className="text-xs text-ink-faint">← 前のレッスン</span>
            <p className="mt-0.5 text-sm font-medium text-ink">
              {prev.lesson.title}
            </p>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/curriculum/${next.day.slug}/${next.lesson.slug}`}
            className="rounded-xl border border-base-border p-4 text-right transition-colors hover:border-brand"
          >
            <span className="text-xs text-ink-faint">次のレッスン →</span>
            <p className="mt-0.5 text-sm font-medium text-ink">
              {next.lesson.title}
            </p>
          </Link>
        ) : (
          <Link
            href="/interview"
            className="rounded-xl border border-accent/40 bg-accent-bg p-4 text-right transition-colors hover:border-accent"
          >
            <span className="text-xs text-accent">全レッスン修了 →</span>
            <p className="mt-0.5 text-sm font-medium text-ink">
              想定Q&A集で仕上げる
            </p>
          </Link>
        )}
      </nav>
    </article>
  );
}
