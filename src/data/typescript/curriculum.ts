// =====================================================================
// 「初めてのTypeScript — AIプロダクトを作る」カリキュラム集約とヘルパー
// =====================================================================

import type { Day, Lesson } from "@/types";
import { tsDay0 } from "./day0";
import { tsDay1 } from "./day1";
import { tsDay2 } from "./day2";
import { tsDay3 } from "./day3";
import { tsDay4 } from "./day4";
import { tsDay5 } from "./day5";
import { tsDay6 } from "./day6";
import { tsDay7 } from "./day7";

export const tsCurriculum: Day[] = [
  tsDay0,
  tsDay1,
  tsDay2,
  tsDay3,
  tsDay4,
  tsDay5,
  tsDay6,
  tsDay7,
];

export interface TsFlatLesson {
  day: Day;
  lesson: Lesson;
  order: number;
}

export const tsAllLessons: TsFlatLesson[] = (() => {
  const list: TsFlatLesson[] = [];
  let order = 0;
  for (const day of tsCurriculum) {
    for (const lesson of day.lessons) {
      list.push({ day, lesson, order: order++ });
    }
  }
  return list;
})();

export const tsTotalLessonCount = tsAllLessons.length;

export function getTsDay(daySlug: string): Day | undefined {
  return tsCurriculum.find((d) => d.slug === daySlug);
}

export function getTsLesson(
  daySlug: string,
  lessonSlug: string
): { day: Day; lesson: Lesson } | undefined {
  const day = getTsDay(daySlug);
  if (!day) return undefined;
  const lesson = day.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return undefined;
  return { day, lesson };
}

export function getTsAdjacentLessons(lessonId: string): {
  prev?: TsFlatLesson;
  next?: TsFlatLesson;
} {
  const idx = tsAllLessons.findIndex((f) => f.lesson.id === lessonId);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? tsAllLessons[idx - 1] : undefined,
    next: idx < tsAllLessons.length - 1 ? tsAllLessons[idx + 1] : undefined,
  };
}
