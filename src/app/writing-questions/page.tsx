"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  getWritingGroups,
  type WritingCourseKey,
  type WritingItem,
} from "@/data/writingQuestions";
import { useProgress } from "@/components/ProgressProvider";
import { RichText } from "@/components/RichText";
import { AskAIButton } from "@/components/AskAIButton";

const groups = getWritingGroups();
const total = groups.reduce((s, g) => s + g.items.length, 0);

export default function WritingQuestionsPage() {
  // フィルタ: "all" or コースキー。初期は全コース横断。
  const [filter, setFilter] = useState<WritingCourseKey | "all">("all");
  // 通読モード: ON にすると模範解答をすべて開いた状態で一気に読める。
  const [readThrough, setReadThrough] = useState(false);

  const visibleGroups = useMemo(
    () => (filter === "all" ? groups : groups.filter((g) => g.key === filter)),
    [filter],
  );

  const visibleCount = useMemo(
    () => visibleGroups.reduce((s, g) => s + g.items.length, 0),
    [visibleGroups],
  );

  return (
    <div className="mx-auto max-w-reading">
      <header className="mb-6">
        <p className="mb-1 text-sm font-medium text-accent">記述式問題まとめ</p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          記述式問題を横断で復習する
        </h1>
        <p className="mt-2 leading-relaxed text-ink-soft">
          全コースの記述式(自分の言葉で説明する)設問を一か所に集めました。全{total}問。
          <strong className="text-ink">まず自分の言葉で答えを考えてから</strong>
          「模範解答を見る」で答え合わせをし、
          <strong className="text-ink">面接での言い換え例</strong>
          と<strong className="text-ink">採点の観点</strong>
          まで確認できます。「あやしい」と自己採点した問題は
          <Link href="/review" className="text-brand underline hover:text-accent">
            復習モード
          </Link>
          に集まります。
        </p>
      </header>

      {/* コース絞り込み + 通読モード切替 */}
      <div className="mb-6 space-y-3">
        <div className="thin-scroll flex gap-1.5 overflow-x-auto pb-1">
          <FilterPill
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label={`すべて (${total})`}
          />
          {groups.map((g) => (
            <FilterPill
              key={g.key}
              active={filter === g.key}
              onClick={() => setFilter(g.key)}
              label={`${g.label} (${g.items.length})`}
            />
          ))}
        </div>
        <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={readThrough}
            onChange={(e) => setReadThrough(e.target.checked)}
            className="h-4 w-4 accent-brand"
          />
          通読モード(模範解答をすべて開いて一気に読む)
        </label>
      </div>

      <p className="mb-4 text-sm text-ink-faint">
        表示中 {visibleCount} 問
      </p>

      <div className="space-y-8">
        {visibleGroups.map((g) => (
          <section key={g.key}>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-ink">
              <span
                className={`flex h-7 min-w-7 items-center justify-center rounded-lg px-1.5 text-xs font-bold ${g.badgeClass}`}
              >
                {g.badge}
              </span>
              {g.label}
              <span className="text-sm font-normal text-ink-faint">
                {g.items.length} 問
              </span>
            </h2>
            <div className="space-y-5">
              {g.items.map((item) => (
                <WritingCard
                  key={item.question.id}
                  item={item}
                  forceReveal={readThrough}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-ink-faint">
        間違えた・あやしい問題だけを解き直すなら
        <Link href="/review" className="text-brand underline hover:text-accent">
          復習モード
        </Link>
        、面接対策は
        <Link href="/interview" className="text-brand underline hover:text-accent">
          面接想定問答集
        </Link>
        もどうぞ。
      </p>
    </div>
  );
}

function FilterPill({
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
      className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
        active
          ? "bg-brand text-white"
          : "bg-base-bg text-ink-soft hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

function WritingCard({
  item,
  forceReveal,
}: {
  item: WritingItem;
  forceReveal: boolean;
}) {
  const { question } = item;
  const { quiz, hydrated, recordSelfRating } = useProgress();
  const saved = quiz[question.id];
  const [localRevealed, setLocalRevealed] = useState(false);
  // 通読モード(forceReveal)か、既に自己採点済み、または個別に開いた場合は開く。
  const revealed =
    forceReveal || localRevealed || (hydrated && saved?.answered === true);

  return (
    <article className="rounded-2xl border border-base-border bg-base-surface p-5 shadow-sm">
      <p className="mb-2 text-xs text-ink-faint">
        {item.courseLabel}・Day {item.dayNumber}
        <span className="mx-1">/</span>
        <Link
          href={item.lessonHref}
          className="text-ink-faint underline decoration-dotted hover:text-brand"
        >
          {item.lessonTitle}
        </Link>
      </p>
      <p className="mb-3 font-medium leading-relaxed text-ink">
        <RichText text={question.question} />
      </p>

      {!revealed ? (
        <>
          <p className="mb-2 text-xs text-ink-faint">
            記述式です。まず自分の言葉で答えを考えてから、模範解答を開いて自己採点してください。
          </p>
          <button
            onClick={() => setLocalRevealed(true)}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-soft"
          >
            模範解答を見る
          </button>
        </>
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
    </article>
  );
}
