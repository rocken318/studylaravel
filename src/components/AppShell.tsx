"use client";

import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* デスクトップ: 固定サイドバー */}
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-base-border bg-base-surface lg:block print:hidden">
        <Sidebar />
      </aside>

      {/* モバイル: トップバー */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-base-border bg-base-surface/95 px-4 py-3 backdrop-blur lg:hidden print:hidden">
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="メニューを開く"
          className="rounded-lg p-1.5 text-ink-soft hover:bg-base-bg"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <span className="flex items-center gap-2 text-sm font-bold text-ink">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-accent text-xs text-white">
            L
          </span>
          Laravel Bootcamp
        </span>
        <span className="w-8" />
      </header>

      {/* モバイル: ドロワー */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[80vw] animate-fade-in bg-base-surface shadow-xl">
            <Sidebar onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* メインコンテンツ */}
      <main className="lg:pl-72 print:pl-0">
        <div className="mx-auto w-full px-5 py-8 md:px-10 md:py-12 print:px-0 print:py-0">
          {children}
        </div>
      </main>
    </div>
  );
}
