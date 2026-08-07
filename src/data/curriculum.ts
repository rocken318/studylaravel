// =====================================================================
// 7日間カリキュラムの集約と、画面から使う検索ヘルパー
// =====================================================================

import type { Day, Lesson } from "@/types";
import { day1 } from "./days/day1";
import { day2 } from "./days/day2";
import { day3 } from "./days/day3";
import { day4 } from "./days/day4";
import { day5 } from "./days/day5";
import { day6 } from "./days/day6";
import { day7 } from "./days/day7";

export const curriculum: Day[] = [day1, day2, day3, day4, day5, day6, day7];

/** 全レッスンをフラットに並べた配列(前へ/次へ、進捗集計に使う) */
export interface FlatLesson {
  day: Day;
  lesson: Lesson;
  /** カリキュラム全体での通し番号(0始まり) */
  order: number;
}

export const allLessons: FlatLesson[] = (() => {
  const list: FlatLesson[] = [];
  let order = 0;
  for (const day of curriculum) {
    for (const lesson of day.lessons) {
      list.push({ day, lesson, order: order++ });
    }
  }
  return list;
})();

export const totalLessonCount = allLessons.length;

export function getDay(daySlug: string): Day | undefined {
  return curriculum.find((d) => d.slug === daySlug);
}

export function getLesson(
  daySlug: string,
  lessonSlug: string
): { day: Day; lesson: Lesson } | undefined {
  const day = getDay(daySlug);
  if (!day) return undefined;
  const lesson = day.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return undefined;
  return { day, lesson };
}

export function getAdjacentLessons(lessonId: string): {
  prev?: FlatLesson;
  next?: FlatLesson;
} {
  const idx = allLessons.findIndex((f) => f.lesson.id === lessonId);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? allLessons[idx - 1] : undefined,
    next: idx < allLessons.length - 1 ? allLessons[idx + 1] : undefined,
  };
}

/** 全設問(理解度チェック)をフラットに集める。復習モードで使う。 */
export function getAllQuestions() {
  return allLessons.flatMap(({ day, lesson }) =>
    lesson.questions.map((question) => ({ day, lesson, question }))
  );
}
