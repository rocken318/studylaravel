"use client";

import {
  laravelTerms,
  laravelTermGroupLabels,
  laravelTermGroupOrder,
  laravelTrees,
  type LaravelTermGroup,
  type TreeNode,
  type TreeNodeKind,
} from "@/data/laravel-map";

// ------------------------------------------------------------------
// グループごとの色(用語カードのバッジ)
// ------------------------------------------------------------------
const groupBadgeClass: Record<LaravelTermGroup, string> = {
  core: "bg-accent-bg text-accent",
  request: "bg-brand-bg text-brand",
  db: "bg-good-bg text-good",
  view: "bg-brand-bg text-brand",
  infra: "bg-base-bg text-ink-soft",
};

// ------------------------------------------------------------------
// ツリーのノード種別ごとの見た目(アイコンと色)
// ------------------------------------------------------------------
const nodeMeta: Record<
  TreeNodeKind,
  { icon: string; labelClass: string }
> = {
  root: { icon: "🌐", labelClass: "font-bold text-accent" },
  class: { icon: "🧱", labelClass: "font-bold text-brand" },
  property: { icon: "🔹", labelClass: "font-medium text-ink" },
  method: { icon: "⚙️", labelClass: "font-medium text-ink" },
  dir: { icon: "📁", labelClass: "font-semibold text-ink" },
  file: { icon: "📄", labelClass: "text-ink-soft" },
  concept: { icon: "🔸", labelClass: "font-semibold text-ink" },
};

export default function LaravelMapPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <p className="mb-1 text-sm font-medium text-accent">Laravel 全体マップ</p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          重要単語と構造ツリーで、Laravelの全体像をつかむ
        </h1>
        <p className="mt-2 max-w-reading leading-relaxed text-ink-soft">
          Laravelには覚える言葉がたくさん出てきます。ここではまず
          <strong className="text-ink">重要単語を初心者向けの短い説明つきで一覧</strong>にし、
          続いて<strong className="text-ink">クラスやフォルダの階層をツリー図</strong>で見せます。
          細かい文法の前に「どんな部品が、どういう関係で並んでいるのか」を目でつかみましょう。
        </p>
      </header>

      {/* ============================================================ */}
      {/* 1. 重要単語一覧(用語集) */}
      {/* ============================================================ */}
      <section className="mb-12">
        <h2 className="mb-1 flex items-center gap-2 text-xl font-bold text-ink">
          <span aria-hidden>📚</span>
          重要単語一覧
        </h2>
        <p className="mb-5 text-sm text-ink-soft">
          Laravelでよく出てくる {laravelTerms.length} 語を、意味をかみくだいて説明します。
          色はざっくりした仲間分けです。
        </p>

        {laravelTermGroupOrder.map((group) => {
          const terms = laravelTerms.filter((t) => t.group === group);
          if (terms.length === 0) return null;
          return (
            <div key={group} className="mb-7">
              <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-ink">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${groupBadgeClass[group]}`}
                >
                  {laravelTermGroupLabels[group]}
                </span>
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {terms.map((t) => (
                  <article
                    key={t.term}
                    className="rounded-2xl border border-base-border bg-base-surface p-4 shadow-sm"
                  >
                    <div className="mb-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <h4 className="text-base font-bold text-ink">{t.term}</h4>
                      {t.en && (
                        <span className="font-mono text-xs text-ink-faint">
                          {t.en}
                        </span>
                      )}
                    </div>
                    <p className="mb-2 inline-block rounded-md bg-base-bg px-2 py-0.5 text-xs font-medium text-ink-soft">
                      {t.short}
                    </p>
                    <p className="text-sm leading-relaxed text-ink-soft">
                      {t.desc}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* ============================================================ */}
      {/* 2. 構造ツリー(階層図) */}
      {/* ============================================================ */}
      <section>
        <h2 className="mb-1 flex items-center gap-2 text-xl font-bold text-ink">
          <span aria-hidden>🌳</span>
          構造ツリー(階層図)
        </h2>
        <p className="mb-5 text-sm text-ink-soft">
          「クラスの下にプロパティやメソッドがぶら下がる」といった入れ子の関係を、
          木の枝のように表しました。インデントと縦線で、どれがどれの中にあるかが分かります。
        </p>

        <div className="mb-5 flex flex-wrap gap-3 text-xs text-ink-soft">
          <LegendItem kind="class" label="クラス" />
          <LegendItem kind="property" label="プロパティ" />
          <LegendItem kind="method" label="メソッド" />
          <LegendItem kind="dir" label="フォルダ" />
          <LegendItem kind="file" label="ファイル" />
          <LegendItem kind="concept" label="役割・概念" />
        </div>

        <div className="space-y-6">
          {laravelTrees.map((tree) => (
            <div
              key={tree.id}
              className="rounded-2xl border border-base-border bg-base-surface p-5 shadow-sm"
            >
              <h3 className="text-base font-bold text-ink">{tree.title}</h3>
              <p className="mb-4 mt-0.5 text-sm text-ink-soft">{tree.caption}</p>
              <div className="thin-scroll overflow-x-auto rounded-xl bg-base-bg p-4">
                <ul className="min-w-max font-mono text-sm">
                  <TreeBranch node={tree.root} isRoot />
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-ink-faint">
        もっと深く知りたい語は、各Dayのレッスンや
        <a href="/glossary" className="text-brand underline hover:text-accent">
          実務用語集
        </a>
        でも確認できます。
      </p>
    </div>
  );
}

// ------------------------------------------------------------------
// 凡例の1項目
// ------------------------------------------------------------------
function LegendItem({ kind, label }: { kind: TreeNodeKind; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-base-border bg-base-surface px-2 py-0.5">
      <span aria-hidden>{nodeMeta[kind].icon}</span>
      {label}
    </span>
  );
}

// ------------------------------------------------------------------
// ツリーの枝(再帰): インデント + 縦線でネストを表現する
// ------------------------------------------------------------------
function TreeBranch({
  node,
  isRoot = false,
}: {
  node: TreeNode;
  isRoot?: boolean;
}) {
  const meta = nodeMeta[node.kind];
  return (
    <li className={isRoot ? "" : "relative"}>
      <div className="flex items-baseline gap-1.5 py-0.5">
        <span aria-hidden className="shrink-0">
          {meta.icon}
        </span>
        <span className={`whitespace-nowrap ${meta.labelClass}`}>
          {node.label}
        </span>
        {node.note && (
          <span className="ml-1 whitespace-nowrap font-sans text-xs text-ink-faint">
            — {node.note}
          </span>
        )}
      </div>
      {node.children && node.children.length > 0 && (
        <ul className="ml-2.5 border-l border-base-border pl-4">
          {node.children.map((child, i) => (
            <TreeBranch key={i} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
