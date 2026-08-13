"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const course = pathname.startsWith("/basics") || pathname.startsWith("/vibe")
    ? { badge: "基", title: "バイブコーディングの土台", brandy: true }
    : pathname.startsWith("/typescript")
    ? { badge: "TS", title: "初めてのTypeScript", brandy: true }
    : pathname.startsWith("/python")
    ? { badge: "Py", title: "初めてのPython", brandy: true }
    : pathname.startsWith("/web")
    ? { badge: "Web", title: "初めてのHTML/CSS", brandy: true }
    : { badge: "L", title: "Laravel Bootcamp", brandy: false };
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  const closeDrawer = () => setDrawerOpen(false);

  // ドロワー: Escで閉じる・フォーカストラップ・開閉時のフォーカス管理
  useEffect(() => {
    if (!drawerOpen) return;

    // クリーンアップ時にフォーカスを戻す元要素を、この時点で確定させておく
    const openButton = openButtonRef.current;

    // 開いた瞬間、ドロワー内の最初のフォーカス可能要素へ移動
    const drawer = drawerRef.current;
    const focusables = drawer?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusables?.[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDrawer();
        return;
      }
      if (e.key === "Tab" && drawer) {
        const nodes = drawer.querySelectorAll<HTMLElement>(
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

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      // 閉じたらメニューボタンへフォーカスを戻す
      openButton?.focus();
    };
  }, [drawerOpen]);

  return (
    <div className="min-h-screen">
      {/* デスクトップ: 固定サイドバー */}
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-base-border bg-base-surface lg:block print:hidden">
        <Sidebar />
      </aside>

      {/* モバイル: トップバー */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-base-border bg-base-surface/95 px-4 py-3 backdrop-blur lg:hidden print:hidden">
        <button
          ref={openButtonRef}
          onClick={() => setDrawerOpen(true)}
          aria-label="メニューを開く"
          aria-expanded={drawerOpen}
          aria-controls="mobile-drawer"
          className="rounded-lg p-1.5 text-ink-soft hover:bg-base-bg"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <span className="flex items-center gap-2 text-sm font-bold text-ink">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded text-xs text-white ${
              course.brandy ? "bg-brand" : "bg-accent"
            }`}
          >
            {course.badge}
          </span>
          {course.title}
        </span>
        <span className="w-8" />
      </header>

      {/* モバイル: ドロワー */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={closeDrawer}
            aria-hidden="true"
          />
          <div
            ref={drawerRef}
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="ナビゲーションメニュー"
            className="absolute inset-y-0 left-0 flex w-72 max-w-[80vw] flex-col animate-fade-in bg-base-surface shadow-xl"
          >
            <div className="flex justify-end border-b border-base-border p-2">
              <button
                onClick={closeDrawer}
                aria-label="メニューを閉じる"
                className="rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-base-bg hover:text-ink"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="min-h-0 flex-1">
              <Sidebar onNavigate={closeDrawer} />
            </div>
          </div>
        </div>
      )}

      {/* メインコンテンツ */}
      <main id="main-content" className="lg:pl-72 print:pl-0">
        <div className="mx-auto w-full px-5 py-8 md:px-10 md:py-12 print:px-0 print:py-0">
          {children}
        </div>
      </main>
    </div>
  );
}
