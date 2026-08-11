"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { curriculum } from "@/data/curriculum";
import { useProgress } from "./ProgressProvider";

const navItems = [
  { href: "/", label: "ダッシュボード", icon: "🏠" },
  { href: "/interview", label: "面接想定問答集", icon: "🎤" },
  { href: "/casestudy", label: "実例で読み解く", icon: "🔍" },
  { href: "/glossary", label: "実務用語集", icon: "📘" },
  { href: "/review", label: "復習モード", icon: "🔁" },
  { href: "/cheatsheet", label: "直前チェックリスト", icon: "📝" },
  { href: "/settings", label: "設定・バックアップ", icon: "⚙️" },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { isLessonComplete, hydrated } = useProgress();

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-base-border px-5 py-5">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-lg font-bold text-white">
            L
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-ink">Laravel Bootcamp</p>
            <p className="text-xs text-ink-faint">7日間 面接対策</p>
          </div>
        </Link>
      </div>

      <nav className="thin-scroll flex-1 overflow-y-auto px-3 py-4">
        <ul className="mb-4 space-y-0.5">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-brand text-white"
                      : "text-ink-soft hover:bg-base-bg"
                  }`}
                >
                  <span aria-hidden>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">
          カリキュラム
        </p>
        <ul className="space-y-3">
          {curriculum.map((day) => {
            const dayActive = pathname.includes(`/curriculum/${day.slug}`);
            return (
              <li key={day.slug}>
                <Link
                  href={`/curriculum/${day.slug}`}
                  onClick={onNavigate}
                  className={`block rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                    dayActive ? "text-brand" : "text-ink hover:text-brand"
                  }`}
                >
                  Day {day.day}
                  <span className="ml-1.5 text-xs font-normal text-ink-faint">
                    {day.title}
                  </span>
                </Link>
                <ul className="mt-0.5 space-y-0.5 border-l border-base-border pl-3">
                  {day.lessons.map((lesson) => {
                    const href = `/curriculum/${day.slug}/${lesson.slug}`;
                    const active = pathname === href;
                    const done = hydrated && isLessonComplete(lesson.id);
                    return (
                      <li key={lesson.id}>
                        <Link
                          href={href}
                          onClick={onNavigate}
                          className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs transition-colors ${
                            active
                              ? "bg-brand-bg font-medium text-brand"
                              : "text-ink-soft hover:bg-base-bg"
                          }`}
                        >
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px] ${
                              done
                                ? "border-good bg-good text-white"
                                : "border-base-border text-transparent"
                            }`}
                          >
                            ✓
                          </span>
                          <span className="leading-snug">{lesson.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
