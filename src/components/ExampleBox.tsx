"use client";

// レッスン上部に「例えるなら」を表示(該当レッスンにデータがある場合のみ)
import { lessonExamples } from "@/data/examples";

export function ExampleBox({ lessonId }: { lessonId: string }) {
  const ex = lessonExamples[lessonId];
  if (!ex) return null;

  return (
    <aside className="mb-8 rounded-2xl border border-accent/30 bg-accent-bg p-5">
      <p className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-accent">
        <span aria-hidden>🍱</span>
        例えるなら
      </p>
      <p className="leading-relaxed text-ink-soft">{ex.analogy}</p>
      {ex.adExample && (
        <div className="mt-3 border-t border-accent/20 pt-3">
          <p className="mb-0.5 text-xs font-semibold text-ink-faint">
            広告枠申込サイトなら
          </p>
          <p className="text-sm leading-relaxed text-ink-soft">
            {ex.adExample}
          </p>
        </div>
      )}
    </aside>
  );
}
