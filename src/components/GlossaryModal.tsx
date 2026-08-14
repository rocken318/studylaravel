"use client";

// =====================================================================
// 本文中の [[slug]] 用語リンクをクリックしたときに解説を出すモーダル
// GlossaryModalProvider が全体を包み、TermLink から openTerm(slug) を呼ぶ
// =====================================================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { glossary } from "@/data/glossary";
import { pythonGlossary } from "@/data/python/glossary";
import { tsGlossary } from "@/data/typescript/glossary";
import { basicsGlossary } from "@/data/basics/glossary";
import { webGlossary } from "@/data/web/glossary";
import { jsGlossary } from "@/data/javascript/glossary";
import { reactGlossary } from "@/data/react/glossary";
import { gitGlossary } from "@/data/git/glossary";
import { sqlGlossary } from "@/data/sql/glossary";
import { glossaryCategoryLabels } from "@/lib/labels";
import { AskAIButton } from "./AskAIButton";
import type { GlossaryTerm } from "@/types";

// 全コースの用語を統合(slugは全体で一意)。[[slug]] はどの用語集からも解決される。
const termMap = new Map<string, GlossaryTerm>(
  [
    ...glossary,
    ...pythonGlossary,
    ...tsGlossary,
    ...basicsGlossary,
    ...webGlossary,
    ...jsGlossary,
    ...reactGlossary,
    ...gitGlossary,
    ...sqlGlossary,
  ].map((t) => [t.slug, t])
);

export function findTerm(slug: string): GlossaryTerm | undefined {
  return termMap.get(slug);
}

interface GlossaryModalContextValue {
  openTerm: (slug: string) => void;
}

const GlossaryModalContext = createContext<GlossaryModalContextValue | null>(null);

export function GlossaryModalProvider({ children }: { children: ReactNode }) {
  const [slug, setSlug] = useState<string | null>(null);

  const openTerm = useCallback((s: string) => setSlug(s), []);
  const close = useCallback(() => setSlug(null), []);

  const value = useMemo(() => ({ openTerm }), [openTerm]);
  const term = slug ? termMap.get(slug) : undefined;

  return (
    <GlossaryModalContext.Provider value={value}>
      {children}
      {term && (
        <GlossaryDialog term={term} onClose={close} onNavigate={setSlug} />
      )}
    </GlossaryModalContext.Provider>
  );
}

function GlossaryDialog({
  term,
  onClose,
  onNavigate,
}: {
  term: GlossaryTerm;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const headingId = useId();
  // モーダルを開く直前にフォーカスがあった要素(閉じたら戻す)
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // 開いた時に元要素を記録し、閉じたら復帰
  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    return () => {
      previouslyFocused.current?.focus?.();
    };
  }, []);

  // 開いた時に閉じるボタンへ初期フォーカス
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // ESCで閉じる・Tabでフォーカストラップ
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const nodes = dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="relative z-10 w-full max-w-lg animate-fade-in rounded-2xl border border-base-border bg-base-surface p-6 shadow-xl"
      >
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <span className="mb-1 inline-block rounded-full bg-brand-bg px-2.5 py-0.5 text-xs font-medium text-brand">
              {glossaryCategoryLabels[term.category]}
            </span>
            <h3 id={headingId} className="text-xl font-bold text-ink">
              {term.term}
              {term.reading && (
                <span className="ml-2 text-sm font-normal text-ink-faint">
                  {term.reading}
                </span>
              )}
            </h3>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="閉じる"
            className="rounded-lg p-1 text-ink-faint transition-colors hover:bg-base-bg hover:text-ink"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="mb-4 leading-relaxed text-ink-soft">{term.meaning}</p>

        <div className="rounded-xl border border-accent/30 bg-accent-bg p-4">
          <p className="mb-1 text-xs font-semibold text-accent">🎤 面接での使い方</p>
          <p className="text-sm leading-relaxed text-ink-soft">
            {term.interviewExample}
          </p>
        </div>

        <div className="mt-4 flex justify-end">
          <AskAIButton
            input={{
              kind: "glossary",
              term: term.term,
              meaning: term.meaning,
            }}
            label="この用語をAIに聞く"
            variant="ghost"
            size="sm"
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          {term.related && term.related.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {term.related.map((r) => {
                const rt = termMap.get(r);
                if (!rt) return null;
                return (
                  <button
                    key={r}
                    onClick={() => onNavigate(r)}
                    className="rounded-full border border-base-border px-2.5 py-1 text-xs text-ink-soft transition-colors hover:border-brand hover:text-brand"
                  >
                    {rt.term}
                  </button>
                );
              })}
            </div>
          ) : (
            <span />
          )}
          <Link
            href="/glossary"
            onClick={onClose}
            className="shrink-0 text-xs font-medium text-brand hover:underline"
          >
            用語集で見る →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function useGlossaryModal(): GlossaryModalContextValue {
  const ctx = useContext(GlossaryModalContext);
  if (!ctx) {
    return { openTerm: () => {} };
  }
  return ctx;
}
