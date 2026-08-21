"use client";

import { cheatsheet } from "@/data/cheatsheet";

export default function CheatsheetPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-3 print:mb-3">
        <div>
          <p className="mb-1 text-sm font-medium text-accent print:hidden">
            復習前チェックリスト
          </p>
          <h1 className="text-2xl font-bold text-ink md:text-3xl">
            要点を1枚にまとめた総復習シート
          </h1>
          <p className="mt-2 max-w-reading leading-relaxed text-ink-soft print:text-sm">
            各項目の「自分の言葉で説明するなら」を、口に出して言えるか確認しましょう。
            言葉に詰まったらその単元に戻る合図です。
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="shrink-0 rounded-lg border border-base-border px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-brand hover:text-brand print:hidden"
        >
          🖨 印刷 / PDF保存
        </button>
      </header>

      <div className="space-y-5 print:space-y-3">
        {cheatsheet.map((section) => (
          <section
            key={section.title}
            className="break-inside-avoid rounded-2xl border border-base-border bg-base-surface p-5 shadow-sm print:border print:shadow-none"
          >
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-ink">
              <span aria-hidden>{section.icon}</span>
              {section.title}
            </h2>
            <ul className="space-y-3">
              {section.points.map((p) => (
                <li
                  key={p.label}
                  className="break-inside-avoid border-l-2 border-brand/40 pl-3"
                >
                  <p className="text-sm font-semibold text-ink">{p.label}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">
                    {p.say}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-ink-faint print:hidden">
        深掘りしたい項目は、各Dayのレッスンと想定Q&A集で確認できます。
      </p>
    </div>
  );
}
