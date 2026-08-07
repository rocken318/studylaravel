"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getAllQuestions } from "@/data/curriculum";
import { useProgress } from "@/components/ProgressProvider";
import { RichText } from "@/components/RichText";
import type { ChoiceQuestion, FreeQuestion, Question, Day, Lesson } from "@/types";

interface WeakItem {
  question: Question;
  day: Day;
  lesson: Lesson;
}

export default function ReviewPage() {
  const { quiz, hydrated } = useProgress();

  const weak = useMemo<WeakItem[]>(() => {
    return getAllQuestions().filter(({ question }) => {
      const r = quiz[question.id];
      if (!r) return false;
      return r.correct === false || r.selfRating === "wrong";
    });
  }, [quiz]);

  return (
    <div className="mx-auto max-w-reading">
      <header className="mb-6">
        <p className="mb-1 text-sm font-medium text-accent">復習モード</p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          間違えた問題だけを解き直す
        </h1>
        <p className="mt-2 leading-relaxed text-ink-soft">
          理解度チェックで間違えた問題、記述式で「あやしい」と自己採点した問題が集まります。
          正解できれば、この一覧から消えていきます。
        </p>
      </header>

      {!hydrated ? (
        <p className="text-ink-faint">読み込み中…</p>
      ) : weak.length === 0 ? (
        <div className="rounded-2xl border border-good/30 bg-good-bg p-8 text-center">
          <p className="mb-2 text-lg font-bold text-good">
            復習が必要な問題はありません
          </p>
          <p className="mb-4 text-sm text-ink-soft">
            レッスンの理解度チェックに取り組むと、間違えた問題がここに集まります。
          </p>
          <Link
            href="/curriculum/day1"
            className="inline-block rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-soft"
          >
            Day 1 から始める
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-ink-faint">現在 {weak.length} 問</p>
          <div className="space-y-5">
            {weak.map((item) => (
              <ReviewCard key={item.question.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ReviewCard({ item }: { item: WeakItem }) {
  const { question, day, lesson } = item;
  return (
    <article className="rounded-2xl border border-base-border bg-base-surface p-5 shadow-sm">
      <p className="mb-2 text-xs text-ink-faint">
        Day {day.day}・{lesson.title}
      </p>
      <p className="mb-3 font-medium leading-relaxed text-ink">
        <RichText text={question.question} />
      </p>
      {question.type === "choice" ? (
        <ReviewChoice question={question} />
      ) : (
        <ReviewFree question={question} />
      )}
    </article>
  );
}

function ReviewChoice({ question }: { question: ChoiceQuestion }) {
  const { recordChoice } = useProgress();
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  const handle = (i: number) => {
    if (answered) return;
    setSelected(i);
    recordChoice(question.id, i, i === question.answerIndex);
  };

  return (
    <div>
      <div className="space-y-2">
        {question.choices.map((choice, i) => {
          const isCorrect = i === question.answerIndex;
          const isChosen = i === selected;
          let cls = "border-base-border bg-base-bg hover:border-brand";
          if (answered) {
            if (isCorrect) cls = "border-good bg-good-bg";
            else if (isChosen) cls = "border-bad bg-bad-bg";
            else cls = "border-base-border bg-base-bg opacity-60";
          }
          return (
            <button
              key={i}
              onClick={() => handle(i)}
              disabled={answered}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-sm transition-colors ${cls}`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-xs text-ink-faint">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-ink-soft">{choice}</span>
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="mt-3 animate-fade-in rounded-xl bg-base-bg p-4">
          <p
            className={`mb-1 text-sm font-semibold ${
              selected === question.answerIndex ? "text-good" : "text-bad"
            }`}
          >
            {selected === question.answerIndex
              ? "正解です。次の更新でこの一覧から外れます。"
              : "まだ不正解です。解説を読んでもう一度挑戦しましょう。"}
          </p>
          <p className="text-sm leading-relaxed text-ink-soft">
            <RichText text={question.explanation} />
          </p>
        </div>
      )}
    </div>
  );
}

function ReviewFree({ question }: { question: FreeQuestion }) {
  const { recordSelfRating } = useProgress();
  const [revealed, setRevealed] = useState(false);

  return (
    <div>
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-soft"
        >
          模範解答を見る
        </button>
      ) : (
        <div className="animate-fade-in space-y-3">
          <div className="rounded-xl border border-good/30 bg-good-bg p-4">
            <p className="mb-1 text-xs font-semibold text-good">模範解答</p>
            <p className="text-sm leading-relaxed text-ink-soft">
              <RichText text={question.modelAnswer} />
            </p>
          </div>
          <div className="rounded-xl border border-accent/30 bg-accent-bg p-4">
            <p className="mb-1 text-xs font-semibold text-accent">
              🎤 面接での言い換え例
            </p>
            <p className="text-sm leading-relaxed text-ink-soft">
              <RichText text={question.interviewPhrase} />
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-ink-faint">今回は説明できた?</span>
            <button
              onClick={() => recordSelfRating(question.id, "correct")}
              className="rounded-lg border border-base-border px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-good hover:text-good"
            >
              説明できた(一覧から外す)
            </button>
            <button
              onClick={() => recordSelfRating(question.id, "wrong")}
              className="rounded-lg border border-base-border px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-bad hover:text-bad"
            >
              まだあやしい
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
