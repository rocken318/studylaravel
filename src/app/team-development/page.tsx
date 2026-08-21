"use client";

import {
  teamDevTable,
  teamDevCategoryLabels,
  teamDevCategoryHints,
  teamDevTotal,
  type TeamDevCategory,
} from "@/data/team-development";

// ------------------------------------------------------------------
// カテゴリごとの色(見出しバッジ)
// ------------------------------------------------------------------
const categoryBadgeClass: Record<TeamDevCategory, string> = {
  git: "bg-accent-bg text-accent",
  review: "bg-good-bg text-good",
  cicd: "bg-brand-bg text-brand",
  communication: "bg-base-bg text-ink-soft",
  environment: "bg-good-bg text-good",
};

export default function TeamDevelopmentPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <p className="mb-1 text-sm font-medium text-accent">
          チーム開発で大事なこと 一覧表
        </p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          複数人で開発するときの実践チェックリスト
        </h1>
        <p className="mt-2 max-w-reading leading-relaxed text-ink-soft">
          一人での開発と違い、チーム開発では「他の人と足並みをそろえる」工夫が欠かせません。
          そこで大事になるポイントを
          <strong className="text-ink">「項目」「なぜ大事か」「具体的にやること」</strong>
          の3列で {teamDevTotal} 項目、一覧表にまとめました。
          Laravel の学習で覚えたことを、実際のチーム開発でどう活かすかの
          <strong className="text-ink">実践チェックリスト</strong>
          として使ってください。
        </p>
      </header>

      {/* 使い方のヒント */}
      <div className="mb-8 rounded-2xl border border-base-border bg-base-surface p-4 text-sm leading-relaxed text-ink-soft shadow-sm">
        <p className="mb-1 font-semibold text-ink">📝 この表の見方</p>
        <ul className="list-disc space-y-0.5 pl-5">
          <li>
            <strong className="text-ink">なぜ大事か</strong>
            … そのルールがない場合に起きがちなトラブル。理由から理解すると身につきます。
          </li>
          <li>
            <strong className="text-ink">具体的にやること</strong>
            … 今日から実践できる行動のヒント。チームの状況に合わせて調整してください。
          </li>
        </ul>
      </div>

      {teamDevTable.map((group) => (
        <section key={group.category} className="mb-10">
          <h2 className="mb-1 flex flex-wrap items-center gap-2 text-xl font-bold text-ink">
            <span
              className={`rounded-full px-2.5 py-0.5 text-sm font-semibold ${
                categoryBadgeClass[group.category]
              }`}
            >
              {teamDevCategoryLabels[group.category]}
            </span>
            <span className="text-sm font-normal text-ink-faint">
              {group.rows.length} 項目
            </span>
          </h2>
          <p className="mb-4 text-sm text-ink-soft">
            {teamDevCategoryHints[group.category]}
          </p>

          {/* --- PC: 横並びのテーブル --- */}
          <div className="thin-scroll hidden overflow-x-auto rounded-2xl border border-base-border bg-base-surface shadow-sm md:block">
            <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-base-border bg-base-bg text-ink">
                  <th className="w-[26%] px-4 py-3 font-bold">項目</th>
                  <th className="w-[37%] px-4 py-3 font-bold">なぜ大事か</th>
                  <th className="w-[37%] px-4 py-3 font-bold">
                    具体的にやること
                  </th>
                </tr>
              </thead>
              <tbody>
                {group.rows.map((row, i) => (
                  <tr
                    key={row.item}
                    className={`align-top ${
                      i % 2 === 1 ? "bg-base-bg/40" : ""
                    } border-b border-base-border last:border-b-0`}
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 text-left font-semibold text-ink"
                    >
                      {row.item}
                    </th>
                    <td className="px-4 py-3 leading-relaxed text-ink-soft">
                      {row.why}
                    </td>
                    <td className="px-4 py-3 leading-relaxed text-ink-soft">
                      <span className="border-l-2 border-accent/40 pl-2.5">
                        {row.how}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- スマホ: 縦積みのカード --- */}
          <div className="space-y-3 md:hidden">
            {group.rows.map((row) => (
              <article
                key={row.item}
                className="rounded-2xl border border-base-border bg-base-surface p-4 shadow-sm"
              >
                <h3 className="mb-2 text-base font-bold leading-relaxed text-ink">
                  {row.item}
                </h3>
                <p className="mb-1 text-xs font-semibold text-ink-faint">
                  なぜ大事か
                </p>
                <p className="mb-3 text-sm leading-relaxed text-ink-soft">
                  {row.why}
                </p>
                <p className="mb-1 text-xs font-semibold text-accent">
                  具体的にやること
                </p>
                <p className="rounded-xl bg-accent-bg px-3 py-2 text-sm leading-relaxed text-ink-soft">
                  {row.how}
                </p>
              </article>
            ))}
          </div>
        </section>
      ))}

      <p className="mt-8 text-center text-xs text-ink-faint">
        Laravel 全体の地図は
        <a href="/laravel-map" className="text-brand underline hover:text-accent">
          全体マップ
        </a>
        、実務Q&Aは
        <a
          href="/laravel-interview"
          className="text-brand underline hover:text-accent"
        >
          実務Q&A 一覧表
        </a>
        、用語は
        <a href="/glossary" className="text-brand underline hover:text-accent">
          実務用語集
        </a>
        でも確認できます。
      </p>
    </div>
  );
}
