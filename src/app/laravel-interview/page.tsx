"use client";

import {
  laravelInterviewTable,
  laravelInterviewCategoryLabels,
  laravelInterviewCategoryHints,
  laravelInterviewTotal,
  type LaravelInterviewCategory,
} from "@/data/laravel-interview";

// ------------------------------------------------------------------
// カテゴリごとの色(見出しバッジ)
// ------------------------------------------------------------------
const categoryBadgeClass: Record<LaravelInterviewCategory, string> = {
  basic: "bg-accent-bg text-accent",
  eloquent: "bg-good-bg text-good",
  design: "bg-brand-bg text-brand",
  practice: "bg-base-bg text-ink-soft",
};

export default function LaravelInterviewPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <p className="mb-1 text-sm font-medium text-accent">
          Laravel 面接突破 一覧表
        </p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          面接前に要点だけ復習できる、Q&Aチートシート
        </h1>
        <p className="mt-2 max-w-reading leading-relaxed text-ink-soft">
          採用面接でよく聞かれる Laravel の質問を、
          <strong className="text-ink">「質問」「回答のポイント」「面接での一言」</strong>
          の3列で {laravelInterviewTotal} 項目、一覧表にまとめました。
          じっくり深掘りしたいときは
          <a href="/interview" className="text-brand underline hover:text-accent">
            面接想定問答集
          </a>
          へ。ここは<strong className="text-ink">面接直前にサッと目を通す要点シート</strong>として使ってください。
        </p>
      </header>

      {/* 使い方のヒント */}
      <div className="mb-8 rounded-2xl border border-base-border bg-base-surface p-4 text-sm leading-relaxed text-ink-soft shadow-sm">
        <p className="mb-1 font-semibold text-ink">📝 この表の見方</p>
        <ul className="list-disc space-y-0.5 pl-5">
          <li>
            <strong className="text-ink">回答のポイント</strong>
            … 押さえるべきキーフレーズ・要点。丸暗記ではなく理解の軸に。
          </li>
          <li>
            <strong className="text-ink">面接での一言</strong>
            … そのまま口に出せる言い換え例。自分の言葉に直すとより自然です。
          </li>
        </ul>
      </div>

      {laravelInterviewTable.map((group) => (
        <section key={group.category} className="mb-10">
          <h2 className="mb-1 flex flex-wrap items-center gap-2 text-xl font-bold text-ink">
            <span
              className={`rounded-full px-2.5 py-0.5 text-sm font-semibold ${
                categoryBadgeClass[group.category]
              }`}
            >
              {laravelInterviewCategoryLabels[group.category]}
            </span>
            <span className="text-sm font-normal text-ink-faint">
              {group.rows.length} 問
            </span>
          </h2>
          <p className="mb-4 text-sm text-ink-soft">
            {laravelInterviewCategoryHints[group.category]}
          </p>

          {/* --- PC: 横並びのテーブル --- */}
          <div className="thin-scroll hidden overflow-x-auto rounded-2xl border border-base-border bg-base-surface shadow-sm md:block">
            <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-base-border bg-base-bg text-ink">
                  <th className="w-[26%] px-4 py-3 font-bold">質問</th>
                  <th className="w-[42%] px-4 py-3 font-bold">
                    回答のポイント
                  </th>
                  <th className="w-[32%] px-4 py-3 font-bold">
                    面接での一言
                  </th>
                </tr>
              </thead>
              <tbody>
                {group.rows.map((row, i) => (
                  <tr
                    key={row.question}
                    className={`align-top ${
                      i % 2 === 1 ? "bg-base-bg/40" : ""
                    } border-b border-base-border last:border-b-0`}
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 text-left font-semibold text-ink"
                    >
                      {row.question}
                    </th>
                    <td className="px-4 py-3 leading-relaxed text-ink-soft">
                      {row.point}
                    </td>
                    <td className="px-4 py-3 leading-relaxed text-ink-soft">
                      <span className="border-l-2 border-accent/40 pl-2.5 italic">
                        「{row.phrase}」
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
                key={row.question}
                className="rounded-2xl border border-base-border bg-base-surface p-4 shadow-sm"
              >
                <h3 className="mb-2 text-base font-bold leading-relaxed text-ink">
                  Q. {row.question}
                </h3>
                <p className="mb-1 text-xs font-semibold text-ink-faint">
                  回答のポイント
                </p>
                <p className="mb-3 text-sm leading-relaxed text-ink-soft">
                  {row.point}
                </p>
                <p className="mb-1 text-xs font-semibold text-accent">
                  面接での一言
                </p>
                <p className="rounded-xl bg-accent-bg px-3 py-2 text-sm leading-relaxed text-ink-soft">
                  「{row.phrase}」
                </p>
              </article>
            ))}
          </div>
        </section>
      ))}

      <p className="mt-8 text-center text-xs text-ink-faint">
        用語の意味をもっと詳しく知りたいときは
        <a href="/glossary" className="text-brand underline hover:text-accent">
          実務用語集
        </a>
        、全体像は
        <a
          href="/laravel-map"
          className="text-brand underline hover:text-accent"
        >
          全体マップ
        </a>
        でも確認できます。
      </p>
    </div>
  );
}
