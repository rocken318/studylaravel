"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  curriculum,
  allLessons,
  totalLessonCount,
  getAllQuestions,
} from "@/data/curriculum";
import { useProgress } from "@/components/ProgressProvider";

export default function DashboardPage() {
  const { completedLessons, quiz, hydrated, isLessonComplete } = useProgress();

  const completedCount = useMemo(
    () => allLessons.filter((f) => completedLessons[f.lesson.id]).length,
    [completedLessons]
  );
  const percent =
    totalLessonCount === 0
      ? 0
      : Math.round((completedCount / totalLessonCount) * 100);

  // 今日やるべきDay: 最初の未完了レッスンが属するDay
  const nextLesson = useMemo(
    () => allLessons.find((f) => !completedLessons[f.lesson.id]),
    [completedLessons]
  );

  // 苦手な問題: 4択を間違えた or 記述式で「あやしい」と自己採点したもの
  const weakQuestions = useMemo(() => {
    const all = getAllQuestions();
    return all.filter(({ question }) => {
      const r = quiz[question.id];
      if (!r) return false;
      return r.correct === false || r.selfRating === "wrong";
    });
  }, [quiz]);

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <p className="mb-1 text-sm font-medium text-accent">
          Laravel Bootcamp
        </p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          7日間で「設計を説明できる」状態になる
        </h1>
        <p className="mt-2 max-w-reading leading-relaxed text-ink-soft">
          このアプリのゴールは、コードを速く書けることではありません。
          「なぜその設計にするのか」を自分の言葉で説明できるようになることです。
          各レッスンとQ&Aには、そのまま面接で使える言い換え例を用意しています。
        </p>
      </header>

      {/* 全体進捗 */}
      <section className="mb-6 rounded-2xl border border-base-border bg-base-surface p-6 shadow-sm">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-sm text-ink-faint">全体の進捗</p>
            <p className="text-3xl font-bold text-ink">
              {percent}
              <span className="ml-0.5 text-lg font-normal text-ink-faint">%</span>
            </p>
          </div>
          <p className="text-sm text-ink-soft">
            {hydrated ? completedCount : 0} / {totalLessonCount} レッスン完了
          </p>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-base-bg">
          <div
            className="h-full rounded-full bg-brand transition-all duration-500"
            style={{ width: `${hydrated ? percent : 0}%` }}
          />
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 今日やるべきDay */}
        <section className="rounded-2xl border border-base-border bg-base-surface p-6 shadow-sm">
          <h2 className="mb-1 text-sm font-semibold text-ink-faint">
            今日やるべきこと
          </h2>
          {nextLesson ? (
            <>
              <p className="mb-1 text-lg font-bold text-ink">
                Day {nextLesson.day.day}・{nextLesson.lesson.title}
              </p>
              <p className="mb-4 text-sm leading-relaxed text-ink-soft">
                {nextLesson.lesson.summary}
              </p>
              <Link
                href={`/curriculum/${nextLesson.day.slug}/${nextLesson.lesson.slug}`}
                className="inline-flex items-center gap-1 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-soft"
              >
                続きから学ぶ →
              </Link>
            </>
          ) : (
            <p className="text-ink-soft">
              全レッスン完了です。面接想定問答集と復習モードで仕上げましょう。
            </p>
          )}
        </section>

        {/* 苦手な問題 */}
        <section className="rounded-2xl border border-base-border bg-base-surface p-6 shadow-sm">
          <h2 className="mb-1 text-sm font-semibold text-ink-faint">
            苦手な問題
          </h2>
          {weakQuestions.length > 0 ? (
            <>
              <p className="mb-3 text-lg font-bold text-ink">
                {weakQuestions.length} 問が要復習
              </p>
              <ul className="mb-4 space-y-1.5">
                {weakQuestions.slice(0, 3).map(({ question, day, lesson }) => (
                  <li
                    key={question.id}
                    className="truncate text-sm text-ink-soft"
                  >
                    ・{lesson.title}: {question.question}
                  </li>
                ))}
              </ul>
              <Link
                href="/review"
                className="inline-flex items-center gap-1 rounded-lg border border-brand px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand-bg"
              >
                復習モードで解き直す →
              </Link>
            </>
          ) : (
            <p className="text-sm leading-relaxed text-ink-soft">
              まだ苦手な問題はありません。レッスンの理解度チェックに答えると、
              間違えた問題がここに集まります。
            </p>
          )}
        </section>
      </div>

      {/* Day一覧 */}
      <section className="mt-6">
        <h2 className="mb-3 text-lg font-bold text-ink">7日間の全体像</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {curriculum.map((day) => {
            const doneInDay = day.lessons.filter((l) =>
              hydrated ? isLessonComplete(l.id) : false
            ).length;
            return (
              <Link
                key={day.slug}
                href={`/curriculum/${day.slug}`}
                className="group rounded-2xl border border-base-border bg-base-surface p-5 shadow-sm transition-colors hover:border-brand"
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-bold text-accent">
                    DAY {day.day}
                  </span>
                  <span className="text-xs text-ink-faint">
                    {doneInDay}/{day.lessons.length}
                  </span>
                </div>
                <p className="font-bold text-ink group-hover:text-brand">
                  {day.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {day.goal}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
