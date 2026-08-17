"use client";

import {
  deployChecklist,
  deployStageMeta,
  deployStageOrder,
  deployTotal,
  type DeployStage,
  type DeployItem,
} from "@/data/deployment-guide";

// ------------------------------------------------------------------
// 段階ごとの色(概観フロー・見出しバッジ)
// ------------------------------------------------------------------
const stageToneClass: Record<DeployStage, string> = {
  prepare: "border-base-border bg-base-bg text-ink-soft",
  build: "border-brand/40 bg-brand-bg text-brand",
  database: "border-accent/40 bg-accent-bg text-accent",
  optimize: "border-brand/40 bg-brand-bg text-brand",
  run: "border-good/40 bg-good-bg text-good",
  verify: "border-accent/50 bg-accent-bg text-accent",
};

// 見出しバッジ用(枠線なし)
const stageBadgeClass: Record<DeployStage, string> = {
  prepare: "bg-base-bg text-ink-soft",
  build: "bg-brand-bg text-brand",
  database: "bg-accent-bg text-accent",
  optimize: "bg-brand-bg text-brand",
  run: "bg-good-bg text-good",
  verify: "bg-accent-bg text-accent",
};

// 各段階に属する項目をまとめる
function itemsOf(stage: DeployStage): DeployItem[] {
  return deployChecklist.filter((it) => it.stage === stage);
}

export default function DeploymentGuidePage() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <p className="mb-1 text-sm font-medium text-accent">
          Laravel 本番デプロイ手順チェックリスト
        </p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          本番公開までの手順を、順番どおりに1つずつ
        </h1>
        <p className="mt-2 max-w-reading leading-relaxed text-ink-soft">
          作ったLaravelアプリを、いよいよ本番のサーバーへ公開します。開発環境と本番環境では
          設定も注意点も違うため、
          <strong className="text-ink">抜け漏れなく順番どおりに進める</strong>
          ことが大切です。ここでは全体を
          <strong className="text-ink">
            「準備 → ビルド → DB → 最適化 → 稼働 → 確認」の6段階
          </strong>
          に分け、全 {deployTotal} 項目を
          <strong className="text-ink">「なぜ必要か」と「コマンド」</strong>
          付きのチェックリストにまとめました。上から順にチェックしていきましょう。
        </p>
      </header>

      {/* ============================================================ */}
      {/* 1. 概観フロー図(6段階の流れ) */}
      {/* ============================================================ */}
      <section className="mb-14">
        <h2 className="mb-1 flex items-center gap-2 text-xl font-bold text-ink">
          <span aria-hidden>🗺️</span>
          デプロイの全体像(6段階)
        </h2>
        <p className="mb-5 text-sm text-ink-soft">
          デプロイ作業は、下の6つの段階を順に進めます。まずはこの流れを頭に入れてから、
          各段階のチェック項目に進みましょう。
        </p>

        <div className="rounded-2xl border border-base-border bg-base-surface p-4 shadow-sm sm:p-6">
          {/* スマホ=縦フロー / sm以上=横フロー */}
          <ol className="flex flex-col items-stretch gap-0 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-y-2">
            {deployStageOrder.map((stage, i) => {
              const meta = deployStageMeta[stage];
              const last = i === deployStageOrder.length - 1;
              return (
                <li
                  key={stage}
                  className="flex flex-col items-center sm:flex-row"
                >
                  <div
                    className={`flex min-h-[3.75rem] w-full flex-col items-center justify-center rounded-xl border px-3 py-2 text-center sm:w-36 ${stageToneClass[stage]}`}
                  >
                    <span className="text-sm font-bold leading-tight">
                      <span aria-hidden className="mr-1">
                        {meta.icon}
                      </span>
                      {meta.title.replace(/(.*?)[((].*/, "$1")}
                    </span>
                    <span className="mt-0.5 text-[10px] font-semibold leading-tight opacity-80">
                      STEP {i + 1}
                    </span>
                  </div>
                  {!last && (
                    <span
                      aria-hidden
                      className="my-1 text-ink-faint sm:my-0 sm:mx-1"
                    >
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
          ※ 一度きりの作業(APP_KEY 生成など)と、デプロイのたびに毎回行う作業
          (依存の再インストール・キャッシュ作り直し等)が混ざっています。運用に慣れたら
          デプロイスクリプトにまとめると安全・確実です。
        </p>
      </section>

      {/* ============================================================ */}
      {/* 2. 段階ごとのチェックリスト */}
      {/* ============================================================ */}
      <section>
        <h2 className="mb-1 flex items-center gap-2 text-xl font-bold text-ink">
          <span aria-hidden>✅</span>
          段階別チェックリスト(なぜ / コマンド付き)
        </h2>
        <p className="mb-6 text-sm text-ink-soft">
          各項目に、□(チェックボックス)・
          <strong className="text-ink">なぜ必要か</strong>・
          <strong className="text-ink">実行するコマンド</strong>
          を添えています。コマンドは等幅ブロックで表示しているので、そのまま参考にできます。
        </p>

        <div className="space-y-10">
          {deployStageOrder.map((stage, si) => {
            const meta = deployStageMeta[stage];
            const items = itemsOf(stage);
            return (
              <div key={stage}>
                {/* 段階の見出し */}
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${stageBadgeClass[stage]}`}
                    aria-hidden
                  >
                    {si + 1}
                  </span>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                    <span aria-hidden>{meta.icon}</span>
                    {meta.title}
                  </h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${stageBadgeClass[stage]}`}
                  >
                    {items.length} 項目
                  </span>
                </div>
                <p className="mb-4 text-sm text-ink-soft">{meta.hint}</p>

                {/* 項目カード */}
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.title}>
                      <article className="rounded-2xl border border-base-border bg-base-surface p-4 shadow-sm sm:p-5">
                        {/* チェックボックス風の見出し */}
                        <div className="mb-2 flex items-start gap-3">
                          <span
                            aria-hidden
                            className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md border-2 border-base-border bg-base-bg text-xs font-bold text-good"
                          >
                            {/* 空のチェックボックス(印刷/確認用) */}
                          </span>
                          <h4 className="text-base font-bold leading-snug text-ink">
                            {item.title}
                          </h4>
                        </div>

                        {/* なぜ必要か */}
                        <p className="mb-1 text-xs font-semibold text-brand">
                          なぜ必要か
                        </p>
                        <p className="mb-3 rounded-xl bg-brand-bg px-3 py-2 text-sm leading-relaxed text-ink-soft">
                          {item.why}
                        </p>

                        {/* コマンド(等幅ブロック) */}
                        {item.commands && item.commands.length > 0 && (
                          <>
                            <p className="mb-1 text-xs font-semibold text-ink-faint">
                              コマンド / 設定
                            </p>
                            <pre className="mb-3 overflow-x-auto rounded-xl border border-base-border bg-ink px-3 py-2.5 font-mono text-[12.5px] leading-relaxed text-base-surface">
                              <code>{item.commands.join("\n")}</code>
                            </pre>
                          </>
                        )}

                        {/* 補足の注意 */}
                        {item.note && (
                          <p className="flex items-start gap-1.5 text-xs leading-relaxed text-ink-faint">
                            <span aria-hidden>💡</span>
                            <span>{item.note}</span>
                          </p>
                        )}
                      </article>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <p className="mt-10 text-center text-xs text-ink-faint">
        デプロイ後の運用や品質管理は
        <a
          href="/team-development"
          className="text-brand underline hover:text-accent"
        >
          チーム開発で大事なこと
        </a>
        も参考になります。リクエストの流れは
        <a
          href="/request-lifecycle"
          className="text-brand underline hover:text-accent"
        >
          リクエストライフサイクル
        </a>
        で確認できます。
      </p>
    </div>
  );
}
