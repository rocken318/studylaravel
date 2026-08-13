"use client";

import { useMemo, useState } from "react";
import { webCheatsheet } from "@/data/web/cheatsheet";

export function WebCheatsheet() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<"all" | "html" | "css">("all");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return webCheatsheet
      .filter((g) => kind === "all" || g.kind === kind)
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (it) =>
            !q ||
            it.name.toLowerCase().includes(q) ||
            it.desc.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [query, kind]);

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-6">
        <p className="mb-1 text-sm font-medium text-accent">HTML/CSS 早見表</p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          迷ったら引く、タグ・プロパティ早見表
        </h1>
        <p className="mt-2 max-w-reading leading-relaxed text-ink-soft">
          暗記する必要はありません。「これ何だっけ」を素早く引くためのリファレンスです。
          AIが出したコードに知らないタグ・プロパティがあったら、ここで意味を確かめましょう。
        </p>
      </header>

      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="検索(例: flex、margin、input、見出し)"
          className="w-full rounded-xl border border-base-border bg-base-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {(
          [
            ["all", "すべて"],
            ["html", "HTML"],
            ["css", "CSS"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              kind === k
                ? "border-brand bg-brand text-white"
                : "border-base-border bg-base-surface text-ink-soft hover:border-brand"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {groups.length === 0 ? (
        <p className="rounded-2xl border border-base-border bg-base-surface p-8 text-center text-ink-soft">
          「{query}」に一致する項目は見つかりませんでした。
        </p>
      ) : (
        <div className="space-y-6">
          {groups.map((g) => (
            <section key={g.title}>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-bold text-white ${
                    g.kind === "html" ? "bg-accent" : "bg-brand"
                  }`}
                >
                  {g.kind.toUpperCase()}
                </span>
                <h2 className="text-sm font-bold text-ink">{g.title}</h2>
              </div>
              <div className="overflow-hidden rounded-2xl border border-base-border bg-base-surface">
                {g.items.map((it, i) => (
                  <div
                    key={it.name}
                    className={`flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:gap-4 ${
                      i > 0 ? "border-t border-base-border" : ""
                    }`}
                  >
                    <code className="shrink-0 font-mono text-xs font-bold text-brand sm:w-56">
                      {it.name}
                    </code>
                    <div className="min-w-0">
                      <p className="text-sm text-ink-soft">{it.desc}</p>
                      {it.example && (
                        <code className="mt-1 block break-all font-mono text-xs text-ink-faint">
                          {it.example}
                        </code>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
