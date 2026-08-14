"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Day } from "@/types";
import { curriculum } from "@/data/curriculum";
import { pythonCurriculum } from "@/data/python/curriculum";
import { tsCurriculum } from "@/data/typescript/curriculum";
import { basicsCurriculum } from "@/data/basics/curriculum";
import { webCurriculum } from "@/data/web/curriculum";
import { jsCurriculum } from "@/data/javascript/curriculum";
import { reactCurriculum } from "@/data/react/curriculum";
import { gitCurriculum } from "@/data/git/curriculum";
import { useProgress } from "./ProgressProvider";

type CourseKey =
  | "basics"
  | "laravel"
  | "python"
  | "typescript"
  | "web"
  | "javascript"
  | "react"
  | "git";

interface Course {
  key: CourseKey;
  label: string; // 切替ピルの表示
  home: string; // コースのトップ
  badge: string; // ロゴの短縮
  title: string;
  subtitle: string;
  badgeClass: string;
  days: Day[];
  dayHref: (slug: string) => string;
  lessonHref: (daySlug: string, lessonSlug: string) => string;
  nav: { href: string; label: string; icon: string }[];
}

const laravelNav = [
  { href: "/", label: "ダッシュボード", icon: "🏠" },
  { href: "/interview", label: "面接想定問答集", icon: "🎤" },
  { href: "/casestudy", label: "実例で読み解く", icon: "🔍" },
  { href: "/glossary", label: "実務用語集", icon: "📘" },
  { href: "/review", label: "復習モード", icon: "🔁" },
  { href: "/cheatsheet", label: "直前チェックリスト", icon: "📝" },
  { href: "/settings", label: "設定・バックアップ", icon: "⚙️" },
];

const courses: Record<CourseKey, Course> = {
  basics: {
    key: "basics",
    label: "基礎",
    home: "/basics",
    badge: "基",
    title: "バイブコーディングの土台",
    subtitle: "言語共通の基礎",
    badgeClass: "bg-brand",
    days: basicsCurriculum,
    dayHref: (s) => `/basics/${s}`,
    lessonHref: (d, l) => `/basics/${d}/${l}`,
    nav: [
      { href: "/vibe", label: "総論: 時代の基礎知識", icon: "🧭" },
      { href: "/ai-guide", label: "AIに任せる技術", icon: "🤝" },
      { href: "/errors", label: "エラー文おみくじ", icon: "🎋" },
      { href: "/languages", label: "コラム: 言語ずかん", icon: "📚" },
      { href: "/basics", label: "コースホーム", icon: "🏠" },
      { href: "/basics/glossary", label: "共通の基礎 用語集", icon: "📘" },
    ],
  },
  laravel: {
    key: "laravel",
    label: "Laravel",
    home: "/",
    badge: "L",
    title: "Laravel Bootcamp",
    subtitle: "7日間 面接対策",
    badgeClass: "bg-accent",
    days: curriculum,
    dayHref: (s) => `/curriculum/${s}`,
    lessonHref: (d, l) => `/curriculum/${d}/${l}`,
    nav: laravelNav,
  },
  python: {
    key: "python",
    label: "Python",
    home: "/python",
    badge: "Py",
    title: "初めてのPython",
    subtitle: "AI時代の第一歩",
    badgeClass: "bg-brand",
    days: pythonCurriculum,
    dayHref: (s) => `/python/${s}`,
    lessonHref: (d, l) => `/python/${d}/${l}`,
    nav: [
      { href: "/python", label: "コースホーム", icon: "🏠" },
      { href: "/python/glossary", label: "Python・AI用語集", icon: "📘" },
    ],
  },
  typescript: {
    key: "typescript",
    label: "TypeScript",
    home: "/typescript",
    badge: "TS",
    title: "初めてのTypeScript",
    subtitle: "AIプロダクトを作る",
    badgeClass: "bg-brand",
    days: tsCurriculum,
    dayHref: (s) => `/typescript/${s}`,
    lessonHref: (d, l) => `/typescript/${d}/${l}`,
    nav: [
      { href: "/typescript", label: "コースホーム", icon: "🏠" },
      { href: "/typescript/glossary", label: "TS・React用語集", icon: "📘" },
    ],
  },
  web: {
    key: "web",
    label: "HTML/CSS",
    home: "/web",
    badge: "Web",
    title: "初めてのHTML/CSS",
    subtitle: "Webページの土台",
    badgeClass: "bg-brand",
    days: webCurriculum,
    dayHref: (s) => `/web/${s}`,
    lessonHref: (d, l) => `/web/${d}/${l}`,
    nav: [
      { href: "/web", label: "コースホーム", icon: "🏠" },
      { href: "/web/cheatsheet", label: "HTML/CSS早見表", icon: "📝" },
      { href: "/web/glossary", label: "HTML/CSS用語集", icon: "📘" },
    ],
  },
  javascript: {
    key: "javascript",
    label: "JavaScript",
    home: "/javascript",
    badge: "JS",
    title: "初めてのJavaScript",
    subtitle: "Webページに命を吹き込む",
    badgeClass: "bg-brand",
    days: jsCurriculum,
    dayHref: (s) => `/javascript/${s}`,
    lessonHref: (d, l) => `/javascript/${d}/${l}`,
    nav: [
      { href: "/javascript", label: "コースホーム", icon: "🏠" },
      { href: "/javascript/glossary", label: "JavaScript用語集", icon: "📘" },
    ],
  },
  react: {
    key: "react",
    label: "React",
    home: "/react",
    badge: "R",
    title: "初めてのReact",
    subtitle: "UIを組み立てる",
    badgeClass: "bg-brand",
    days: reactCurriculum,
    dayHref: (s) => `/react/${s}`,
    lessonHref: (d, l) => `/react/${d}/${l}`,
    nav: [
      { href: "/react", label: "コースホーム", icon: "🏠" },
      { href: "/react/glossary", label: "React用語集", icon: "📘" },
    ],
  },
  git: {
    key: "git",
    label: "Git",
    home: "/git",
    badge: "Git",
    title: "初めてのGit",
    subtitle: "壊しても戻せる安心",
    badgeClass: "bg-brand",
    days: gitCurriculum,
    dayHref: (s) => `/git/${s}`,
    lessonHref: (d, l) => `/git/${d}/${l}`,
    nav: [
      { href: "/git", label: "コースホーム", icon: "🏠" },
      { href: "/terminal", label: "ターミナル練習ジム", icon: "🏋️" },
      { href: "/git/glossary", label: "Git用語集", icon: "📘" },
    ],
  },
};

function activeCourseKey(pathname: string): CourseKey {
  if (pathname.startsWith("/basics")) return "basics";
  if (pathname.startsWith("/vibe")) return "basics";
  if (pathname.startsWith("/languages")) return "basics";
  if (pathname.startsWith("/ai-guide")) return "basics";
  if (pathname.startsWith("/errors")) return "basics";
  if (pathname.startsWith("/http")) return "basics";
  if (pathname.startsWith("/typescript")) return "typescript";
  if (pathname.startsWith("/python")) return "python";
  if (pathname.startsWith("/web")) return "web";
  if (pathname.startsWith("/javascript")) return "javascript";
  if (pathname.startsWith("/react")) return "react";
  if (pathname.startsWith("/git")) return "git";
  if (pathname.startsWith("/terminal")) return "git";
  return "laravel";
}

function CourseSwitcher({
  activeKey,
  onNavigate,
}: {
  activeKey: CourseKey;
  onNavigate?: () => void;
}) {
  const base =
    "shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-center text-xs font-bold transition-colors";
  return (
    <div className="thin-scroll flex gap-1 overflow-x-auto rounded-xl bg-base-bg p-1">
      {(Object.values(courses) as Course[]).map((c) => {
        const active = c.key === activeKey;
        return (
          <Link
            key={c.key}
            href={c.home}
            onClick={onNavigate}
            className={`${base} ${
              active
                ? c.key === "laravel"
                  ? "bg-accent text-white"
                  : "bg-brand text-white"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {c.label}
          </Link>
        );
      })}
    </div>
  );
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { isLessonComplete, hydrated } = useProgress();
  const key = activeCourseKey(pathname);
  const course = courses[key];

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-base-border px-5 py-5">
        <Link
          href={course.home}
          onClick={onNavigate}
          className="flex items-center gap-2"
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold text-white ${course.badgeClass}`}
          >
            {course.badge}
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-ink">{course.title}</p>
            <p className="text-xs text-ink-faint">{course.subtitle}</p>
          </div>
        </Link>
        <div className="mt-4">
          <CourseSwitcher activeKey={key} onNavigate={onNavigate} />
        </div>
        <a
          href="https://halvision.dev/ja/learn"
          className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-ink-faint transition-colors hover:text-brand"
        >
          ← 学習メディアトップ
        </a>
      </div>

      <nav className="thin-scroll flex-1 overflow-y-auto px-3 py-4">
        <ul className="mb-4 space-y-0.5">
          {course.nav.map((item) => {
            const active =
              item.href === "/" || item.href === course.home
                ? pathname === item.href
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
          {course.days.map((day) => {
            const dayActive = pathname.includes(course.dayHref(day.slug));
            return (
              <li key={day.slug}>
                <Link
                  href={course.dayHref(day.slug)}
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
                    const href = course.lessonHref(day.slug, lesson.slug);
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
