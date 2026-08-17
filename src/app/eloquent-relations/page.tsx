"use client";

import {
  relationSections,
  nPlusOneNote,
  type BoxTone,
  type DiagramBox,
  type CodeBlock,
  type RelationSection,
} from "@/data/eloquent-relations";

// ------------------------------------------------------------------
// 箱(テーブル)の役割ごとの色トーン
// ------------------------------------------------------------------
const boxToneClass: Record<BoxTone, { border: string; head: string }> = {
  primary: {
    border: "border-brand/40",
    head: "bg-brand-bg text-brand",
  },
  related: {
    border: "border-accent/40",
    head: "bg-accent-bg text-accent",
  },
  pivot: {
    border: "border-good/40",
    head: "bg-good-bg text-good",
  },
};

export default function EloquentRelationsPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <p className="mb-1 text-sm font-medium text-accent">
          Eloquent リレーション図解
        </p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          テーブルのつながりを、図で一気につかむ
        </h1>
        <p className="mt-2 max-w-reading leading-relaxed text-ink-soft">
          Eloquentのリレーションは「どのテーブルが外部キーを持ち、どちらを指すか」が分かると一気にラクになります。
          ここでは各リレーションを
          <strong className="text-ink">関係の図(箱と矢印)</strong>・
          <strong className="text-ink">モデル定義コード</strong>・
          <strong className="text-ink">使い方コード</strong>・
          <strong className="text-ink">具体例</strong>
          の4点セットで解説します。最後に、必ずつまずく
          <strong className="text-ink">N+1問題と Eager Loading</strong>
          もまとめました。
        </p>
      </header>

      {/* 凡例 */}
      <div className="mb-8 flex flex-wrap gap-2 text-xs text-ink-soft">
        <BoxLegend tone="primary" label="主となるモデル(親)" />
        <BoxLegend tone="related" label="関連するモデル(子)" />
        <BoxLegend tone="pivot" label="中間テーブル / 中間モデル" />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-base-border bg-base-surface px-2 py-0.5">
          <span aria-hidden className="font-mono text-accent">
            🔑
          </span>
          外部キー(FK)
        </span>
      </div>

      {/* 目次 */}
      <nav
        aria-label="このページの目次"
        className="mb-10 rounded-2xl border border-base-border bg-base-surface p-4 shadow-sm"
      >
        <p className="mb-2 text-xs font-semibold text-ink-faint">目次</p>
        <ul className="flex flex-wrap gap-2 text-sm">
          {relationSections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="inline-flex items-center gap-1 rounded-full bg-base-bg px-3 py-1 text-ink-soft hover:bg-brand-bg hover:text-brand"
              >
                <span aria-hidden>{s.icon}</span>
                {s.title}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#n-plus-one"
              className="inline-flex items-center gap-1 rounded-full bg-accent-bg px-3 py-1 font-medium text-accent hover:opacity-80"
            >
              <span aria-hidden>⚠️</span>
              N+1問題
            </a>
          </li>
        </ul>
      </nav>

      {/* ============================================================ */}
      {/* 各リレーションのセクション */}
      {/* ============================================================ */}
      <div className="space-y-12">
        {relationSections.map((section) => (
          <RelationSectionView key={section.id} section={section} />
        ))}
      </div>

      {/* ============================================================ */}
      {/* N+1問題 と Eager Loading */}
      {/* ============================================================ */}
      <section
        id="n-plus-one"
        className="mt-14 scroll-mt-6 rounded-2xl border border-accent/40 bg-accent-bg/40 p-5 shadow-sm sm:p-6"
      >
        <h2 className="mb-1 flex items-center gap-2 text-xl font-bold text-ink">
          <span aria-hidden>⚠️</span>
          {nPlusOneNote.title}
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-ink-soft">
          {nPlusOneNote.intro}
        </p>

        <div className="mb-4 rounded-xl border border-base-border bg-base-surface p-4">
          <p className="mb-1 text-xs font-semibold text-ink-faint">
            何が問題か
          </p>
          <p className="text-sm leading-relaxed text-ink-soft">
            {nPlusOneNote.what}
          </p>
        </div>

        <div className="mb-5 rounded-xl border border-good/40 bg-good-bg p-4">
          <p className="mb-1 text-xs font-semibold text-good">解決策</p>
          <p className="text-sm leading-relaxed text-ink-soft">
            {nPlusOneNote.fix}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {nPlusOneNote.codes.map((c) => (
            <div
              key={c.caption}
              className={`rounded-xl border p-4 ${
                c.kind === "bad"
                  ? "border-bad/40 bg-bad-bg/40"
                  : "border-good/40 bg-good-bg/50"
              }`}
            >
              <p
                className={`mb-2 flex items-center gap-1.5 text-sm font-bold ${
                  c.kind === "bad" ? "text-bad" : "text-good"
                }`}
              >
                <span aria-hidden>{c.kind === "bad" ? "🚫" : "✅"}</span>
                {c.caption}
              </p>
              <CodePre code={c.code} />
              <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                {c.note}
              </p>
            </div>
          ))}
        </div>

        <ul className="mt-5 space-y-1.5">
          {nPlusOneNote.tips.map((tip) => (
            <li
              key={tip}
              className="flex gap-2 text-sm leading-relaxed text-ink-soft"
            >
              <span aria-hidden className="text-accent">
                💡
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-center text-xs text-ink-faint">
        モデルの中身は
        <a href="/laravel-map" className="text-brand underline hover:text-accent">
          全体マップ
        </a>
        の「Eloquentモデルクラスの中身」ツリーも参考になります。用語は
        <a href="/glossary" className="text-brand underline hover:text-accent">
          実務用語集
        </a>
        でも確認できます。
      </p>
    </div>
  );
}

// ==================================================================
// 1つのリレーションセクションの描画
// ==================================================================
function RelationSectionView({ section }: { section: RelationSection }) {
  return (
    <section id={section.id} className="scroll-mt-6">
      <h2 className="mb-1 flex items-center gap-2 text-xl font-bold text-ink">
        <span aria-hidden>{section.icon}</span>
        {section.title}
      </h2>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {section.methods.map((m) => (
          <span
            key={m}
            className="rounded-md bg-brand-bg px-2 py-0.5 font-mono text-xs font-semibold text-brand"
          >
            {m}()
          </span>
        ))}
      </div>
      <p className="mb-4 max-w-reading text-sm leading-relaxed text-ink-soft">
        {section.summary}
      </p>

      {/* いつ使うか / 外部キーの向き */}
      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-base-border bg-base-surface p-3.5 shadow-sm">
          <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-brand">
            <span aria-hidden>🕐</span>
            いつ使うか
          </p>
          <p className="text-sm leading-relaxed text-ink-soft">
            {section.whenToUse}
          </p>
        </div>
        <div className="rounded-xl border border-base-border bg-base-surface p-3.5 shadow-sm">
          <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-accent">
            <span aria-hidden>🔑</span>
            外部キーの向き
          </p>
          <p className="text-sm leading-relaxed text-ink-soft">
            {section.fkDirection}
          </p>
        </div>
      </div>

      {/* 関係の図 */}
      <div className="mb-5 rounded-2xl border border-base-border bg-base-surface p-4 shadow-sm sm:p-5">
        <p className="mb-4 text-xs font-semibold text-ink-faint">関係の図</p>
        <Diagram section={section} />
      </div>

      {/* モデル定義コード */}
      <CodeGroup
        heading="モデル定義コード"
        icon="🧱"
        blocks={section.modelCode}
      />

      {/* 使い方コード */}
      <CodeGroup heading="使い方コード" icon="⚡" blocks={section.usageCode} />

      {/* 具体例 */}
      <div className="rounded-xl border border-base-border bg-brand-bg/50 p-4">
        <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-brand">
          <span aria-hidden>📝</span>
          具体例
        </p>
        <p className="text-sm leading-relaxed text-ink-soft">
          {section.example}
        </p>
      </div>
    </section>
  );
}

// ==================================================================
// 関係の図: 箱を横(スマホ縦)に並べ、間に矢印+外部キーの説明
// ==================================================================
function Diagram({ section }: { section: RelationSection }) {
  const { boxes, arrows } = section.diagram;
  return (
    <div>
      {/* 箱の並び */}
      <div className="thin-scroll overflow-x-auto">
        <div className="flex min-w-max flex-col items-stretch gap-3 sm:flex-row sm:items-start">
          {boxes.map((box, i) => (
            <div key={box.table} className="flex flex-col sm:flex-row sm:items-center">
              <TableBox box={box} />
              {i < boxes.length - 1 && (
                <span
                  aria-hidden
                  className="my-1 flex items-center justify-center text-lg text-ink-faint sm:my-0 sm:mx-2"
                >
                  <span className="sm:hidden">↓</span>
                  <span className="hidden sm:inline">↔</span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 矢印(外部キーの向き)の説明 */}
      <ul className="mt-4 space-y-1.5">
        {arrows.map((a, i) => (
          <li
            key={i}
            className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-soft"
          >
            <span className="rounded-md bg-accent-bg px-1.5 py-0.5 font-mono text-accent">
              {a.from}
            </span>
            <span aria-hidden className="text-ink-faint">
              →
            </span>
            <span className="rounded-md bg-brand-bg px-1.5 py-0.5 font-mono text-brand">
              {a.to}
            </span>
            <span className="rounded-full bg-base-bg px-2 py-0.5 font-semibold text-ink-faint">
              {a.cardinality}
            </span>
            <span className="text-ink-soft">— {a.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ------------------------------------------------------------------
// 1つのテーブル箱(ヘッダ=テーブル/モデル名、下にカラム一覧)
// ------------------------------------------------------------------
function TableBox({ box }: { box: DiagramBox }) {
  const tone = boxToneClass[box.tone];
  return (
    <div
      className={`w-full overflow-hidden rounded-xl border ${tone.border} bg-base-surface sm:w-52`}
    >
      <div className={`px-3 py-1.5 ${tone.head}`}>
        <p className="font-mono text-sm font-bold leading-tight">{box.table}</p>
        <p className="font-mono text-[10px] leading-tight opacity-80">
          {box.model}
        </p>
      </div>
      <ul className="divide-y divide-base-border">
        {box.columns.map((col) => (
          <li
            key={col.name}
            className={`flex flex-wrap items-center gap-x-1.5 px-3 py-1 font-mono text-xs ${
              col.fk ? "bg-accent-bg/60" : ""
            }`}
          >
            {col.pk && (
              <span aria-hidden title="主キー" className="text-brand">
                🔑
              </span>
            )}
            {col.fk && (
              <span aria-hidden title="外部キー" className="text-accent">
                🔑
              </span>
            )}
            <span
              className={
                col.fk
                  ? "font-semibold text-accent"
                  : col.pk
                    ? "font-semibold text-ink"
                    : "text-ink-soft"
              }
            >
              {col.name}
            </span>
            {col.note && (
              <span className="text-[10px] text-ink-faint">{col.note}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ==================================================================
// コードブロックのグループ(モデル定義 / 使い方)
// ==================================================================
function CodeGroup({
  heading,
  icon,
  blocks,
}: {
  heading: string;
  icon: string;
  blocks: CodeBlock[];
}) {
  return (
    <div className="mb-5">
      <p className="mb-2 flex items-center gap-1.5 text-sm font-bold text-ink">
        <span aria-hidden>{icon}</span>
        {heading}
      </p>
      <div className="space-y-3">
        {blocks.map((b, i) => (
          <div key={i}>
            {b.caption && (
              <p className="mb-1 text-xs font-medium text-ink-faint">
                {b.caption}
              </p>
            )}
            <CodePre code={b.code} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 等幅コードブロック(暗色背景・横スクロール)
// ------------------------------------------------------------------
function CodePre({ code }: { code: string }) {
  return (
    <pre className="code-scroll overflow-x-auto rounded-xl bg-[#2b2b2b] p-3.5 text-xs leading-relaxed text-[#e7e2d9]">
      <code className="font-mono">{code}</code>
    </pre>
  );
}

// ------------------------------------------------------------------
// 図の凡例1項目
// ------------------------------------------------------------------
function BoxLegend({ tone, label }: { tone: BoxTone; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-base-border bg-base-surface px-2 py-0.5">
      <span
        aria-hidden
        className={`h-2.5 w-2.5 rounded-sm border ${boxToneClass[tone].border} ${boxToneClass[tone].head}`}
      />
      {label}
    </span>
  );
}
