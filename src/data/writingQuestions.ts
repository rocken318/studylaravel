// =====================================================================
// 記述式問題まとめ用の横断アグリゲータ
// 全9コースのカリキュラムから type: "free" の設問だけを集め、
// 「どのコース・どのDay・どのレッスンの問題か」の文脈付きで一覧化する。
// /writing-questions ページで使う。
// =====================================================================

import type { Day, FreeQuestion } from "@/types";
import { curriculum } from "./curriculum";
import { basicsCurriculum } from "./basics/curriculum";
import { pythonCurriculum } from "./python/curriculum";
import { tsCurriculum } from "./typescript/curriculum";
import { webCurriculum } from "./web/curriculum";
import { jsCurriculum } from "./javascript/curriculum";
import { reactCurriculum } from "./react/curriculum";
import { gitCurriculum } from "./git/curriculum";
import { sqlCurriculum } from "./sql/curriculum";

/** コースの識別子。Sidebar の CourseKey と揃えている。 */
export type WritingCourseKey =
  | "basics"
  | "laravel"
  | "python"
  | "typescript"
  | "web"
  | "javascript"
  | "react"
  | "git"
  | "sql";

interface CourseSource {
  key: WritingCourseKey;
  label: string; // 表示名
  badge: string; // 短縮ロゴ
  /** バッジの配色クラス(Tailwindトークン) */
  badgeClass: string;
  days: Day[];
  /** レッスンへのリンクを組み立てる */
  lessonHref: (daySlug: string, lessonSlug: string) => string;
}

// Sidebar の courses 定義と同じ順序・同じ配色に合わせる。
const COURSE_SOURCES: CourseSource[] = [
  {
    key: "basics",
    label: "基礎",
    badge: "基",
    badgeClass: "bg-brand-bg text-brand",
    days: basicsCurriculum,
    lessonHref: (d, l) => `/basics/${d}/${l}`,
  },
  {
    key: "laravel",
    label: "Laravel",
    badge: "L",
    badgeClass: "bg-accent-bg text-accent",
    days: curriculum,
    lessonHref: (d, l) => `/curriculum/${d}/${l}`,
  },
  {
    key: "python",
    label: "Python",
    badge: "Py",
    badgeClass: "bg-brand-bg text-brand",
    days: pythonCurriculum,
    lessonHref: (d, l) => `/python/${d}/${l}`,
  },
  {
    key: "typescript",
    label: "TypeScript",
    badge: "TS",
    badgeClass: "bg-brand-bg text-brand",
    days: tsCurriculum,
    lessonHref: (d, l) => `/typescript/${d}/${l}`,
  },
  {
    key: "web",
    label: "HTML/CSS",
    badge: "Web",
    badgeClass: "bg-brand-bg text-brand",
    days: webCurriculum,
    lessonHref: (d, l) => `/web/${d}/${l}`,
  },
  {
    key: "javascript",
    label: "JavaScript",
    badge: "JS",
    badgeClass: "bg-brand-bg text-brand",
    days: jsCurriculum,
    lessonHref: (d, l) => `/javascript/${d}/${l}`,
  },
  {
    key: "react",
    label: "React",
    badge: "R",
    badgeClass: "bg-brand-bg text-brand",
    days: reactCurriculum,
    lessonHref: (d, l) => `/react/${d}/${l}`,
  },
  {
    key: "git",
    label: "Git",
    badge: "Git",
    badgeClass: "bg-brand-bg text-brand",
    days: gitCurriculum,
    lessonHref: (d, l) => `/git/${d}/${l}`,
  },
  {
    key: "sql",
    label: "SQL",
    badge: "SQL",
    badgeClass: "bg-brand-bg text-brand",
    days: sqlCurriculum,
    lessonHref: (d, l) => `/sql/${d}/${l}`,
  },
];

/** 1件の記述式問題に、出所(コース/Day/レッスン)の文脈を添えたもの */
export interface WritingItem {
  question: FreeQuestion;
  courseKey: WritingCourseKey;
  courseLabel: string;
  dayNumber: number;
  dayTitle: string;
  lessonTitle: string;
  lessonHref: string;
}

/** コース単位でまとめた記述式問題のグループ */
export interface WritingGroup {
  key: WritingCourseKey;
  label: string;
  badge: string;
  badgeClass: string;
  items: WritingItem[];
}

/** 全コース横断で、記述式問題をコース単位のグループにまとめて返す。 */
export function getWritingGroups(): WritingGroup[] {
  const groups: WritingGroup[] = [];
  for (const src of COURSE_SOURCES) {
    const items: WritingItem[] = [];
    for (const day of src.days) {
      for (const lesson of day.lessons) {
        for (const q of lesson.questions) {
          if (q.type !== "free") continue;
          items.push({
            question: q,
            courseKey: src.key,
            courseLabel: src.label,
            dayNumber: day.day,
            dayTitle: day.title,
            lessonTitle: lesson.title,
            lessonHref: src.lessonHref(day.slug, lesson.slug),
          });
        }
      }
    }
    if (items.length > 0) {
      groups.push({
        key: src.key,
        label: src.label,
        badge: src.badge,
        badgeClass: src.badgeClass,
        items,
      });
    }
  }
  return groups;
}

/** 記述式問題の総数(見出しやメタ表示に使う) */
export function getWritingTotal(): number {
  return getWritingGroups().reduce((sum, g) => sum + g.items.length, 0);
}
