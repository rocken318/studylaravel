"use client";

import { useEffect, useMemo, useState } from "react";
import type { Question, ChoiceQuestion, FreeQuestion } from "@/types";
import { useProgress } from "./ProgressProvider";
import { RichText } from "./RichText";
import { AskAIButton } from "./AskAIButton";

// 選択肢の正解位置が偏る(元データは正解がほぼ常に2番目)問題を避けるため、
// 設問idをシードに選択肢の表示順を決定論的にシャッフルする。
// 同じ設問なら毎回同じ並び(再描画・リロードでもブレない)。正解判定・保存は
// 元インデックスで行うので、並び替えても正誤・進捗は不変。
function shuffledOrder(id: string, n: number): number[] {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const rand = () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

export function QuizSection({ questions }: { questions: Question[] }) {
  if (questions.length === 0) return null;
  return (
    <section className="mt-12 border-t border-base-border pt-8">
      <h2 className="mb-1 text-lg font-bold text-ink">理解度チェック</h2>
      <p className="mb-6 text-sm text-ink-faint">
        答えられれば、実務で説明できる状態に一歩近づきます。
      </p>
      <div className="space-y-6">
        {questions.map((q, i) => (
          <QuestionCard key={q.id} question={q} index={i} />
        ))}
      </div>
    </section>
  );
}

function QuestionCard({ question, index }: { question: Question; index: number }) {
  return (
    <div className="rounded-2xl border border-base-border bg-base-surface p-5 shadow-sm">
      <div className="mb-3 flex items-start gap-3">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
          Q{index + 1}
        </span>
        <p className="font-medium leading-relaxed text-ink">
          <RichText text={question.question} />
        </p>
      </div>
      <div className="pl-9">
        {question.type === "choice" ? (
          <ChoiceQuiz question={question} />
        ) : (
          <FreeQuiz question={question} />
        )}
      </div>
    </div>
  );
}

function ChoiceQuiz({ question }: { question: ChoiceQuestion }) {
  const { quiz, hydrated, recordChoice } = useProgress();
  const saved = quiz[question.id];
  // hydrated=false の初回マウント時は quiz={} なので saved を評価できない。
  // hydrated 後に localStorage 由来の保存値へ同期する。
  const [selected, setSelected] = useState<number | null>(null);
  // 表示順(元インデックスの並び)。設問ごとに固定。
  const order = useMemo(
    () => shuffledOrder(question.id, question.choices.length),
    [question.id, question.choices.length],
  );

  useEffect(() => {
    if (!hydrated) return;
    // 再挑戦中(ローカルで null に戻した後)に保存値で上書きしないよう、
    // hydrated 完了時点の保存状態を一度だけ反映する。
    setSelected(saved?.selectedIndex ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const answered = selected !== null;

  const handleSelect = (i: number) => {
    if (answered) return;
    setSelected(i);
    recordChoice(question.id, i, i === question.answerIndex);
  };

  const handleRetry = () => {
    // ローカルの選択のみリセットして解き直し可能にする。
    // localStorage の保存値(recordChoice の結果)はそのまま残し、
    // 再度選択されれば recordChoice で上書きされる。
    setSelected(null);
  };

  // hydrated 前はプレースホルダを表示して、復元前の空状態がちらつかないようにする
  if (!hydrated) {
    return (
      <div className="space-y-2">
        {question.choices.map((_, i) => (
          <div
            key={i}
            className="h-11 w-full animate-pulse rounded-xl border border-base-border bg-base-bg"
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-2">
        {order.map((orig, d) => {
          const choice = question.choices[orig];
          const isCorrect = orig === question.answerIndex;
          const isChosen = orig === selected;
          let cls =
            "border-base-border bg-base-bg hover:border-brand hover:bg-brand-bg";
          if (answered) {
            if (isCorrect) {
              cls = "border-good bg-good-bg";
            } else if (isChosen) {
              cls = "border-bad bg-bad-bg";
            } else {
              cls = "border-base-border bg-base-bg opacity-60";
            }
          }
          return (
            <button
              key={orig}
              onClick={() => handleSelect(orig)}
              disabled={answered}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${cls} ${
                answered ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs text-ink-faint">
                {String.fromCharCode(65 + d)}
              </span>
              <span className="text-ink-soft">{choice}</span>
              {answered && isCorrect && (
                <span className="ml-auto text-good" aria-label="正解">
                  ✓
                </span>
              )}
              {answered && isChosen && !isCorrect && (
                <span className="ml-auto text-bad" aria-label="不正解">
                  ✗
                </span>
              )}
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
            {selected === question.answerIndex ? "正解です" : "不正解"}
          </p>
          <p className="text-sm leading-relaxed text-ink-soft">
            <RichText text={question.explanation} />
          </p>
          <button
            onClick={handleRetry}
            className="mt-3 rounded-lg border border-base-border px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-brand hover:text-brand"
          >
            もう一度解く
          </button>
        </div>
      )}
    </div>
  );
}

function FreeQuiz({ question }: { question: FreeQuestion }) {
  const { quiz, hydrated, recordSelfRating } = useProgress();
  const saved = quiz[question.id];
  // hydrated 前は quiz={} のため saved を評価できない。hydrated 後に開閉状態を同期する。
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    if (saved?.answered) setRevealed(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  return (
    <div>
      <p className="mb-2 text-xs text-ink-faint">
        記述式です。まず自分の言葉で答えを考えてから、模範解答を開いて自己採点してください。
      </p>
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-soft"
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
              🎤 実務での言い換え例
            </p>
            <p className="text-sm leading-relaxed text-ink-soft">
              <RichText text={question.interviewPhrase} />
            </p>
          </div>
          {question.keywords && question.keywords.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-ink-faint">採点の観点:</span>
              {question.keywords.map((k) => (
                <span
                  key={k}
                  className="rounded-full bg-base-bg px-2.5 py-0.5 text-xs text-ink-soft"
                >
                  {k}
                </span>
              ))}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-ink-faint">自己採点:</span>
            <button
              onClick={() => recordSelfRating(question.id, "correct")}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                saved?.selfRating === "correct"
                  ? "border-good bg-good-bg text-good"
                  : "border-base-border text-ink-soft hover:border-good hover:text-good"
              }`}
            >
              説明できた
            </button>
            <button
              onClick={() => recordSelfRating(question.id, "wrong")}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                saved?.selfRating === "wrong"
                  ? "border-bad bg-bad-bg text-bad"
                  : "border-base-border text-ink-soft hover:border-bad hover:text-bad"
              }`}
            >
              あやしい(復習する)
            </button>
            <span className="ml-auto">
              <AskAIButton
                input={{
                  kind: "free",
                  question: question.question,
                  modelAnswer: question.modelAnswer,
                }}
                label="模範解答をAIと比べる"
                variant="ghost"
                size="sm"
              />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
