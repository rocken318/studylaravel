"use client";

import { useMemo, useState } from "react";
import { interviewQuestions } from "@/data/interview";
import {
  interviewCategoryLabels,
  interviewCategoryOrder,
} from "@/lib/labels";
import { useProgress } from "@/components/ProgressProvider";
import { useGlossaryModal, findTerm } from "@/components/GlossaryModal";
import type { InterviewQuestion, InterviewCategory } from "@/types";

type Filter = InterviewCategory | "all";
type Mode = "list" | "flash";

export default function InterviewPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [mode, setMode] = useState<Mode>("list");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? interviewQuestions
        : interviewQuestions.filter((q) => q.category === filter),
    [filter]
  );

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-6">
        <p className="mb-1 text-sm font-medium text-accent">面接想定問答集</p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          「なぜ差がつくのか」まで理解する
        </h1>
        <p className="mt-2 max-w-reading leading-relaxed text-ink-soft">
          同じ質問でも、答え方で評価は大きく変わります。NG回答と加点回答を見比べ、
          「どこで差がつくのか」を掴んでください。自分の言葉で書いた回答は自動で保存されます。
        </p>
      </header>

      {/* モード切替 */}
      <div className="mb-4 inline-flex rounded-xl border border-base-border bg-base-surface p-1">
        <button
          onClick={() => setMode("list")}
          className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
            mode === "list" ? "bg-brand text-white" : "text-ink-soft"
          }`}
        >
          一覧モード
        </button>
        <button
          onClick={() => setMode("flash")}
          className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
            mode === "flash" ? "bg-brand text-white" : "text-ink-soft"
          }`}
        >
          暗記モード
        </button>
      </div>

      {/* カテゴリフィルタ */}
      <div className="mb-6 flex flex-wrap gap-2">
        <FilterChip
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label={`すべて (${interviewQuestions.length})`}
        />
        {interviewCategoryOrder.map((cat) => {
          const count = interviewQuestions.filter(
            (q) => q.category === cat
          ).length;
          return (
            <FilterChip
              key={cat}
              active={filter === cat}
              onClick={() => setFilter(cat)}
              label={`${interviewCategoryLabels[cat]} (${count})`}
            />
          );
        })}
      </div>

      {mode === "list" ? (
        <div className="space-y-5">
          {filtered.map((q) => (
            <ListCard key={q.id} question={q} />
          ))}
        </div>
      ) : (
        <FlashDeck questions={filtered} />
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        active
          ? "border-brand bg-brand text-white"
          : "border-base-border bg-base-surface text-ink-soft hover:border-brand"
      }`}
    >
      {label}
    </button>
  );
}

function RelatedTerms({ slugs }: { slugs?: string[] }) {
  const { openTerm } = useGlossaryModal();
  if (!slugs || slugs.length === 0) return null;
  return (
    <div className="mt-3 flex flex-wrap items-center gap-1.5">
      <span className="text-xs text-ink-faint">関連用語:</span>
      {slugs.map((s) => {
        const t = findTerm(s);
        if (!t) return null;
        return (
          <button
            key={s}
            onClick={() => openTerm(s)}
            className="rounded-full border border-base-border px-2.5 py-0.5 text-xs text-ink-soft transition-colors hover:border-brand hover:text-brand"
          >
            {t.term}
          </button>
        );
      })}
    </div>
  );
}

function ListCard({ question }: { question: InterviewQuestion }) {
  const { interview, saveInterviewAnswer } = useProgress();
  const answer = interview[question.id] ?? "";

  return (
    <article className="rounded-2xl border border-base-border bg-base-surface p-6 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <span className="mt-0.5 rounded-full bg-brand-bg px-2.5 py-0.5 text-xs font-medium text-brand">
          {interviewCategoryLabels[question.category]}
        </span>
      </div>
      <h2 className="mb-4 text-lg font-bold leading-relaxed text-ink">
        {question.question}
      </h2>

      <div className="space-y-3">
        <div className="rounded-xl border border-bad/30 bg-bad-bg p-4">
          <p className="mb-1 text-xs font-semibold text-bad">✗ NG回答例</p>
          <p className="text-sm leading-relaxed text-ink-soft">
            {question.ngAnswer}
          </p>
        </div>
        <div className="rounded-xl border border-good/30 bg-good-bg p-4">
          <p className="mb-1 text-xs font-semibold text-good">
            ✓ 加点される回答例
          </p>
          <p className="text-sm leading-relaxed text-ink-soft">
            {question.goodAnswer}
          </p>
        </div>
        <div className="rounded-xl border border-brand/30 bg-brand-bg p-4">
          <p className="mb-1 text-xs font-semibold text-brand">
            🧭 なぜ差がつくのか
          </p>
          <p className="text-sm leading-relaxed text-ink-soft">
            {question.whyDiffers}
          </p>
        </div>
      </div>

      <RelatedTerms slugs={question.relatedTerms} />

      <div className="mt-5">
        <label className="mb-1.5 block text-xs font-semibold text-ink-faint">
          自分の言葉で答えてみる(自動保存)
        </label>
        <textarea
          value={answer}
          onChange={(e) => saveInterviewAnswer(question.id, e.target.value)}
          rows={3}
          placeholder="加点回答をそのまま覚えるのではなく、自分の経験や言葉に置き換えて書いてみましょう。"
          className="w-full resize-y rounded-xl border border-base-border bg-base-bg px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand"
        />
        {answer.trim().length > 0 && (
          <p className="mt-1 text-right text-xs text-good">保存済み</p>
        )}
      </div>
    </article>
  );
}

function FlashDeck({ questions }: { questions: InterviewQuestion[] }) {
  const { interviewMastered, toggleInterviewMastered } = useProgress();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  if (questions.length === 0) {
    return (
      <p className="rounded-2xl border border-base-border bg-base-surface p-8 text-center text-ink-soft">
        このカテゴリの質問はありません。
      </p>
    );
  }

  const safeIndex = Math.min(index, questions.length - 1);
  const q = questions[safeIndex];
  const mastered = Boolean(interviewMastered[q.id]);

  const go = (dir: 1 | -1) => {
    setRevealed(false);
    setIndex((prev) => {
      const n = prev + dir;
      if (n < 0) return questions.length - 1;
      if (n >= questions.length) return 0;
      return n;
    });
  };

  const masteredCount = questions.filter(
    (x) => interviewMastered[x.id]
  ).length;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm text-ink-faint">
        <span>
          {safeIndex + 1} / {questions.length} 枚
        </span>
        <span>覚えた: {masteredCount} 枚</span>
      </div>

      <div
        className="min-h-[18rem] cursor-pointer rounded-2xl border border-base-border bg-base-surface p-8 shadow-sm transition-colors hover:border-brand"
        onClick={() => setRevealed((r) => !r)}
      >
        <span className="mb-4 inline-block rounded-full bg-brand-bg px-2.5 py-0.5 text-xs font-medium text-brand">
          {interviewCategoryLabels[q.category]}
        </span>
        <h2 className="text-xl font-bold leading-relaxed text-ink">
          {q.question}
        </h2>

        {!revealed ? (
          <p className="mt-8 text-center text-sm text-ink-faint">
            カードをクリックすると加点回答が表示されます
          </p>
        ) : (
          <div className="mt-5 animate-fade-in space-y-3">
            <div className="rounded-xl border border-good/30 bg-good-bg p-4">
              <p className="mb-1 text-xs font-semibold text-good">
                ✓ 加点される回答例
              </p>
              <p className="text-sm leading-relaxed text-ink-soft">
                {q.goodAnswer}
              </p>
            </div>
            <div className="rounded-xl border border-brand/30 bg-brand-bg p-4">
              <p className="mb-1 text-xs font-semibold text-brand">
                🧭 なぜ差がつくのか
              </p>
              <p className="text-sm leading-relaxed text-ink-soft">
                {q.whyDiffers}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          onClick={() => go(-1)}
          className="rounded-lg border border-base-border px-4 py-2 text-sm text-ink-soft transition-colors hover:border-brand"
        >
          ← 前へ
        </button>
        <button
          onClick={() => toggleInterviewMastered(q.id)}
          className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
            mastered
              ? "border-good bg-good-bg text-good"
              : "border-base-border text-ink-soft hover:border-good hover:text-good"
          }`}
        >
          {mastered ? "✓ 覚えた" : "覚えたにする"}
        </button>
        <button
          onClick={() => go(1)}
          className="rounded-lg border border-base-border px-4 py-2 text-sm text-ink-soft transition-colors hover:border-brand"
        >
          次へ →
        </button>
      </div>
    </div>
  );
}
