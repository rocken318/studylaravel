// =====================================================================
// 「初めてのSQL — データと会話する」カリキュラム集約とヘルパー
// =====================================================================

import type { Day, Lesson } from "@/types";
import { sqlDay0 } from "./day0";
import { sqlDay1 } from "./day1";
import { sqlDay2 } from "./day2";
import { sqlDay3 } from "./day3";

export const sqlCurriculum: Day[] = [sqlDay0, sqlDay1, sqlDay2, sqlDay3];

export interface SqlFlatLesson {
  day: Day;
  lesson: Lesson;
  order: number;
}

export const sqlAllLessons: SqlFlatLesson[] = (() => {
  const list: SqlFlatLesson[] = [];
  let order = 0;
  for (const day of sqlCurriculum) {
    for (const lesson of day.lessons) {
      list.push({ day, lesson, order: order++ });
    }
  }
  return list;
})();

export const sqlTotalLessonCount = sqlAllLessons.length;

export function getSqlDay(daySlug: string): Day | undefined {
  return sqlCurriculum.find((d) => d.slug === daySlug);
}

export function getSqlLesson(
  daySlug: string,
  lessonSlug: string
): { day: Day; lesson: Lesson } | undefined {
  const day = getSqlDay(daySlug);
  if (!day) return undefined;
  const lesson = day.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return undefined;
  return { day, lesson };
}

export function getSqlAdjacentLessons(lessonId: string): {
  prev?: SqlFlatLesson;
  next?: SqlFlatLesson;
} {
  const idx = sqlAllLessons.findIndex((f) => f.lesson.id === lessonId);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? sqlAllLessons[idx - 1] : undefined,
    next: idx < sqlAllLessons.length - 1 ? sqlAllLessons[idx + 1] : undefined,
  };
}
