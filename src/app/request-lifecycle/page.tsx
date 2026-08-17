"use client";

import {
  lifecycleOverview,
  lifecycleSteps,
  type FlowTone,
  type LifecycleStep,
} from "@/data/request-lifecycle";

// ------------------------------------------------------------------
// 概観フロー: ノードの役割ごとの色
// ------------------------------------------------------------------
const flowToneClass: Record<FlowTone, string> = {
  browser: "border-accent/50 bg-accent-bg text-accent",
  boot: "border-base-border bg-base-surface text-ink",
  kernel: "border-brand/40 bg-brand-bg text-brand",
  middleware: "border-good/40 bg-good-bg text-good",
  route: "border-brand/40 bg-brand-bg text-brand",
  app: "border-accent/40 bg-accent-bg text-accent",
  response: "border-good/40 bg-good-bg text-good",
};

// ------------------------------------------------------------------
// ステップ詳細: フェーズタグの色
// ------------------------------------------------------------------
const phaseClass: Record<NonNullable<LifecycleStep["phase"]>, string> = {
  起動: "bg-base-bg text-ink-soft",
  往路: "bg-brand-bg text-brand",
  復路: "bg-good-bg text-good",
  終了: "bg-accent-bg text-accent",
};

export default function RequestLifecyclePage() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <p className="mb-1 text-sm font-medium text-accent">
          Laravel リクエストライフサイクル
        </p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          1本のリクエストが、Laravelの中をどう旅するか
        </h1>
        <p className="mt-2 max-w-reading leading-relaxed text-ink-soft">
          ブラウザで開いたページは、Laravelの中でいくつもの部品を順に通って
          「返事(レスポンス)」になります。ここではまず
          <strong className="text-ink">全体の流れをひと目で追える概観図</strong>
          を見て、続いて
          <strong className="text-ink">各ステップを1つずつ詳しく図解</strong>
          します。「どこで・何が・なぜ起きるか」をイメージできるようになりましょう。
        </p>
      </header>

      {/* ============================================================ */}
      {/* 1. 概観フロー図(一覧できる図) */}
      {/* ============================================================ */}
      <section className="mb-14">
        <h2 className="mb-1 flex items-center gap-2 text-xl font-bold text-ink">
          <span aria-hidden>🗺️</span>
          概観フロー図(まずは全体像)
        </h2>
        <p className="mb-5 text-sm text-ink-soft">
          ブラウザから入ったリクエストが、入口 → 起動 → カーネル → ミドルウェア →
          ルーティング → コントローラ → レスポンスと進み、復路のミドルウェアを通って
          ブラウザへ戻るまでを、矢印でつないだ図です。
        </p>

        {/* 凡例 */}
        <div className="mb-5 flex flex-wrap gap-2 text-xs text-ink-soft">
          <FlowLegend tone="browser" label="ブラウザ" />
          <FlowLegend tone="boot" label="起動・入口" />
          <FlowLegend tone="kernel" label="カーネル" />
          <FlowLegend tone="middleware" label="ミドルウェア" />
          <FlowLegend tone="route" label="ルーティング" />
          <FlowLegend tone="app" label="コントローラ" />
          <FlowLegend tone="response" label="レスポンス" />
        </div>

        <div className="rounded-2xl border border-base-border bg-base-surface p-4 shadow-sm sm:p-6">
          {/* flex-col(スマホ=縦フロー) → sm で flex-wrap の横フロー */}
          <ol className="flex flex-col items-stretch gap-0 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-y-2">
            {lifecycleOverview.map((node, i) => {
              const last = i === lifecycleOverview.length - 1;
              return (
                <li
                  key={node.label}
                  className="flex flex-col items-center sm:flex-row"
                >
                  <div
                    className={`flex min-h-[3.5rem] w-full flex-col items-center justify-center rounded-xl border px-3 py-2 text-center sm:w-40 ${
                      flowToneClass[node.tone]
                    }`}
                  >
                    <span className="text-sm font-bold leading-tight">
                      {node.label}
                    </span>
                    {node.sub && (
                      <span className="mt-0.5 font-mono text-[10px] leading-tight opacity-80">
                        {node.sub}
                      </span>
                    )}
                  </div>
                  {!last && (
                    <span
                      aria-hidden
                      className="my-1 text-ink-faint sm:my-0 sm:mx-1"
                    >
                      {/* スマホは下向き↓、PCは右向き→ */}
                      <span className="sm:hidden">↓</span>
                      <span className="hidden sm:inline">→</span>
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
        <p className="mt-3 text-xs text-ink-faint">
          ※ ミドルウェアは「往路(行き)」と「復路(帰り)」で2回登場します。行きで通った関所を、
          帰りは逆順に通り抜けてブラウザへ戻ります。
        </p>
      </section>

      {/* ============================================================ */}
      {/* 2. ステップ詳細(細かい図解 / 縦タイムライン) */}
      {/* ============================================================ */}
      <section>
        <h2 className="mb-1 flex items-center gap-2 text-xl font-bold text-ink">
          <span aria-hidden>🔬</span>
          ステップ詳細(1つずつ深掘り)
        </h2>
        <p className="mb-6 text-sm text-ink-soft">
          上の各ステップで「何が起きるか / なぜ必要か / 関係する主なファイル・クラス」を
          番号順にたどります。左の縦線と番号バッジが、上から下への時間の流れを表します。
        </p>

        {/* 縦タイムライン: 左に罫線、各ステップをカードで */}
        <ol className="relative space-y-5 border-l-2 border-base-border pl-6 sm:pl-8">
          {lifecycleSteps.map((step) => (
            <li key={step.no} className="relative">
              {/* 番号バッジ(罫線の上に重ねる) */}
              <span
                className="absolute -left-[2.35rem] flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-white shadow-sm sm:-left-[2.85rem]"
                aria-hidden
              >
                {step.no}
              </span>

              <article className="rounded-2xl border border-base-border bg-base-surface p-4 shadow-sm sm:p-5">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="flex items-center gap-2 text-base font-bold text-ink">
                    <span aria-hidden>{step.icon}</span>
                    {step.title}
                  </h3>
                  {step.phase && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        phaseClass[step.phase]
                      }`}
                    >
                      {step.phase}
                    </span>
                  )}
                </div>

                <p className="mb-1 text-xs font-semibold text-ink-faint">
                  何が起きるか
                </p>
                <p className="mb-3 text-sm leading-relaxed text-ink-soft">
                  {step.what}
                </p>

                <p className="mb-1 text-xs font-semibold text-brand">
                  なぜ必要か
                </p>
                <p className="mb-3 rounded-xl bg-brand-bg px-3 py-2 text-sm leading-relaxed text-ink-soft">
                  {step.why}
                </p>

                <p className="mb-1.5 text-xs font-semibold text-ink-faint">
                  関係する主なファイル・クラス
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {step.files.map((f) => (
                    <li
                      key={f}
                      className="rounded-md bg-base-bg px-2 py-1 font-mono text-[11px] leading-tight text-ink-soft"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-10 text-center text-xs text-ink-faint">
        部品どうしの位置関係は
        <a href="/laravel-map" className="text-brand underline hover:text-accent">
          全体マップ
        </a>
        の「MVCとリクエストの流れ」ツリーも参考になります。用語は
        <a href="/glossary" className="text-brand underline hover:text-accent">
          実務用語集
        </a>
        でも確認できます。
      </p>
    </div>
  );
}

// ------------------------------------------------------------------
// 概観フローの凡例1項目
// ------------------------------------------------------------------
function FlowLegend({ tone, label }: { tone: FlowTone; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-base-border bg-base-surface px-2 py-0.5">
      <span
        aria-hidden
        className={`h-2.5 w-2.5 rounded-full border ${flowToneClass[tone]}`}
      />
      {label}
    </span>
  );
}
