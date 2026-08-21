"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  curriculum,
  allLessons,
  totalLessonCount,
  getAllQuestions,
} from "@/data/curriculum";
import { interviewQuestions } from "@/data/interview";
import { interviewCategoryLabels } from "@/lib/labels";
import { useProgress } from "@/components/ProgressProvider";
import { AskAIButton } from "@/components/AskAIButton";

/** studyDates(YYYY-MM-DD)から、今日または昨日を起点とする連続学習日数を数える */
function computeStreak(dates: string[]): number {
  if (dates.length === 0) return 0;
  const set = new Set(dates);
  const d = new Date();
  // 今日やっていなければ、昨日を起点にする(今日はまだこれからかもしれない)
  const fmt = (x: Date) =>
    `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(
      x.getDate()
    ).padStart(2, "0")}`;
  if (!set.has(fmt(d))) {
    d.setDate(d.getDate() - 1);
    if (!set.has(fmt(d))) return 0;
  }
  let streak = 0;
  while (set.has(fmt(d))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

export default function DashboardPage() {
  const {
    completedLessons,
    quiz,
    interview,
    interviewMastered,
    studyDates,
    hydrated,
    isLessonComplete,
  } = useProgress();

  const completedCount = useMemo(
    () => allLessons.filter((f) => completedLessons[f.lesson.id]).length,
    [completedLessons]
  );
  const percent =
    totalLessonCount === 0
      ? 0
      : Math.round((completedCount / totalLessonCount) * 100);

  const nextLesson = useMemo(
    () => allLessons.find((f) => !completedLessons[f.lesson.id]),
    [completedLessons]
  );

  const weakQuestions = useMemo(() => {
    const all = getAllQuestions();
    return all.filter(({ question }) => {
      const r = quiz[question.id];
      if (!r) return false;
      return r.correct === false || r.selfRating === "wrong";
    });
  }, [quiz]);

  // クイズ正答率(回答済みのうち、正解/説明できた の割合)
  const quizStats = useMemo(() => {
    const entries = Object.values(quiz).filter((r) => r.answered);
    const correct = entries.filter(
      (r) => r.correct === true || r.selfRating === "correct"
    ).length;
    return { answered: entries.length, correct };
  }, [quiz]);

  const masteredCount = useMemo(
    () => Object.values(interviewMastered).filter(Boolean).length,
    [interviewMastered]
  );
  const answeredInterview = useMemo(
    () => Object.values(interview).filter((t) => t.trim().length > 0).length,
    [interview]
  );

  const streak = useMemo(
    () => (hydrated ? computeStreak(studyDates) : 0),
    [studyDates, hydrated]
  );

  // 今日の一問(日付でシードして安定。ハイドレーション後にだけ確定させる)
  const [dailyIndex, setDailyIndex] = useState<number | null>(null);
  useEffect(() => {
    const d = new Date();
    // YYYYMMDD を連結した整数をシードにする(月末の桁溢れが無く日ごとに均等)
    const seed =
      d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    setDailyIndex(seed % interviewQuestions.length);
  }, []);
  const daily = dailyIndex === null ? null : interviewQuestions[dailyIndex];

  const quizRate =
    quizStats.answered === 0
      ? 0
      : Math.round((quizStats.correct / quizStats.answered) * 100);

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <p className="mb-1 text-sm font-medium text-accent">初めてのLaravel</p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          7日間で「設計を説明できる」状態になる
        </h1>
        <p className="mt-2 max-w-reading leading-relaxed text-ink-soft">
          ゴールはコードを速く書くことではなく、「なぜその設計にするのか」を自分の言葉で説明できること。
          まずは Day 0 でLaravelのコードを読む土台のPHPから始められます。
        </p>
      </header>

      {/* サマリー: 進捗・ストリーク・正答率など */}
      <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard
          label="全体の進捗"
          value={`${hydrated ? percent : 0}%`}
          sub={`${hydrated ? completedCount : 0}/${totalLessonCount} レッスン`}
        />
        <StatCard
          label="連続学習"
          value={`${streak}`}
          unit="日"
          sub={streak > 0 ? "この調子で継続を" : "今日から始めよう"}
          accent
        />
        <StatCard
          label="クイズ正答率"
          value={hydrated && quizStats.answered > 0 ? `${quizRate}%` : "—"}
          sub={`${hydrated ? quizStats.answered : 0} 問回答`}
        />
        <StatCard
          label="Q&Aカード"
          value={`${hydrated ? masteredCount : 0}`}
          unit="枚"
          sub={`覚えた / 記述${hydrated ? answeredInterview : 0}件`}
        />
      </section>

      {/* 進捗バー */}
      <section className="mb-6 rounded-2xl border border-base-border bg-base-surface p-6 shadow-sm">
        <div className="mb-3 flex items-end justify-between">
          <p className="text-sm text-ink-faint">カリキュラム全体</p>
          <p className="text-sm text-ink-soft">
            残り {totalLessonCount - (hydrated ? completedCount : 0)} レッスン
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
              全レッスン完了です。想定Q&Aと復習モードで仕上げましょう。
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
                {weakQuestions.slice(0, 3).map(({ question, lesson }) => (
                  <li
                    key={question.id}
                    className="flex gap-1.5 text-sm leading-snug text-ink-soft"
                  >
                    <span aria-hidden className="shrink-0">・</span>
                    <span className="line-clamp-2">
                      {lesson.title}: {question.question}
                    </span>
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

      {/* 今日の一問 */}
      <section className="mt-6 rounded-2xl border border-accent/30 bg-accent-bg p-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-accent">🎯 今日の一問</h2>
          {daily && (
            <span className="rounded-full bg-base-surface px-2.5 py-0.5 text-xs text-ink-soft">
              {interviewCategoryLabels[daily.category]}
            </span>
          )}
        </div>
        {daily ? (
          <>
            <p className="mb-4 text-lg font-bold leading-relaxed text-ink">
              {daily.question}
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/interview"
                className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-soft"
              >
                模範解答を見る →
              </Link>
              <AskAIButton
                input={{
                  kind: "interview",
                  question: daily.question,
                  category: interviewCategoryLabels[daily.category],
                }}
                label="AIと練習する"
                variant="ghost"
              />
            </div>
          </>
        ) : (
          // ハイドレーション前のチラつき防止用スケルトン
          <div aria-hidden="true" className="animate-pulse">
            <div className="mb-4 h-6 w-4/5 rounded bg-base-surface/70" />
            <div className="mb-4 h-6 w-2/3 rounded bg-base-surface/70" />
            <div className="flex flex-wrap gap-2">
              <div className="h-9 w-32 rounded-lg bg-base-surface/70" />
              <div className="h-9 w-28 rounded-lg bg-base-surface/70" />
            </div>
          </div>
        )}
      </section>

      {/* Day一覧(Day別進捗) */}
      <section className="mt-6">
        <h2 className="mb-3 text-lg font-bold text-ink">学習ロードマップ</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {curriculum.map((day) => {
            const doneInDay = day.lessons.filter((l) =>
              hydrated ? isLessonComplete(l.id) : false
            ).length;
            const dayPct = Math.round((doneInDay / day.lessons.length) * 100);
            return (
              <Link
                key={day.slug}
                href={`/curriculum/${day.slug}`}
                className="group rounded-2xl border border-base-border bg-base-surface p-5 shadow-sm transition-colors hover:border-brand"
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-bold text-accent">
                    {day.day === 0 ? "DAY 0(準備)" : `DAY ${day.day}`}
                  </span>
                  <span className="text-xs text-ink-faint">
                    {doneInDay}/{day.lessons.length}
                  </span>
                </div>
                <p className="font-bold text-ink group-hover:text-brand">
                  {day.title}
                </p>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                  {day.goal}
                </p>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-base-bg">
                  <div
                    className="h-full rounded-full bg-brand transition-all"
                    style={{ width: `${hydrated ? dayPct : 0}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  unit,
  sub,
  accent,
}: {
  label: string;
  value: string;
  unit?: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 shadow-sm ${
        accent
          ? "border-accent/30 bg-accent-bg"
          : "border-base-border bg-base-surface"
      }`}
    >
      <p className="text-xs text-ink-faint">{label}</p>
      <p className="mt-1 text-2xl font-bold text-ink">
        {value}
        {unit && (
          <span className="ml-0.5 text-sm font-normal text-ink-faint">
            {unit}
          </span>
        )}
      </p>
      {sub && <p className="mt-0.5 text-xs text-ink-faint">{sub}</p>}
    </div>
  );
}
