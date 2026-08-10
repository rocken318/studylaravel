"use client";

// =====================================================================
// 「AIに聞く」ボタン(無料・APIキー不要)
// 文脈に応じた質問文を生成し、クリップボードにコピーしたうえで
// ChatGPT / Claude を新タブで開く(質問を事前入力)。
// =====================================================================

import { useEffect, useRef, useState } from "react";
import {
  buildPrompt,
  buildAiUrl,
  aiProviderLabels,
  type AiPromptInput,
  type AiProvider,
} from "@/lib/aiPrompt";

export function AskAIButton({
  input,
  label = "AIに聞く",
  variant = "solid",
  size = "md",
}: {
  input: AiPromptInput;
  label?: string;
  variant?: "solid" | "ghost";
  size?: "sm" | "md";
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // 外側クリックで閉じる
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  const ask = async (provider: AiProvider) => {
    const prompt = buildPrompt(input);
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // クリップボード不可でも遷移は続ける
    }
    window.open(buildAiUrl(provider, prompt), "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const base =
    size === "sm"
      ? "gap-1 px-2.5 py-1 text-xs"
      : "gap-1.5 px-3.5 py-2 text-sm";
  const skin =
    variant === "solid"
      ? "border-accent bg-accent text-white hover:bg-accent/90"
      : "border-base-border bg-base-surface text-ink-soft hover:border-accent hover:text-accent";

  return (
    <div ref={wrapRef} className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center rounded-lg border font-medium transition-colors ${base} ${skin}`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span aria-hidden>✨</span>
        {label}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-1.5 w-52 animate-fade-in rounded-xl border border-base-border bg-base-surface p-1.5 shadow-lg"
        >
          <p className="px-2.5 py-1 text-xs text-ink-faint">
            質問をコピーして開く先を選択
          </p>
          {(["chatgpt", "claude"] as AiProvider[]).map((p) => (
            <button
              key={p}
              role="menuitem"
              onClick={() => ask(p)}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-ink-soft transition-colors hover:bg-base-bg"
            >
              <span aria-hidden>{p === "chatgpt" ? "🟢" : "🟣"}</span>
              {aiProviderLabels[p]} で開く
            </button>
          ))}
          <p className="px-2.5 pb-1 pt-1.5 text-[11px] leading-snug text-ink-faint">
            新しいタブで開き、質問文は自動で入力されます(コピー済み)。
          </p>
        </div>
      )}

      {copied && (
        <span className="pointer-events-none absolute -top-7 right-0 whitespace-nowrap rounded bg-ink px-2 py-1 text-xs text-white">
          質問をコピーしました
        </span>
      )}
    </div>
  );
}
