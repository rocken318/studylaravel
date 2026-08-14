// =====================================================================
// 「初めてのJavaScript — Webページに命を吹き込む」カリキュラム集約
// =====================================================================

import type { Day, Lesson } from "@/types";
import { jsDay0 } from "./day0";
import { jsDay1 } from "./day1";
import { jsDay2 } from "./day2";
import { jsDay3 } from "./day3";
import { jsDay4 } from "./day4";

export const jsCurriculum: Day[] = [jsDay0, jsDay1, jsDay2, jsDay3, jsDay4];

export interface JsFlatLesson {
  day: Day;
  lesson: Lesson;
  order: number;
}

export const jsAllLessons: JsFlatLesson[] = (() => {
  const list: JsFlatLesson[] = [];
  let order = 0;
  for (const day of jsCurriculum) {
    for (const lesson of day.lessons) {
      list.push({ day, lesson, order: order++ });
    }
  }
  return list;
})();

export const jsTotalLessonCount = jsAllLessons.length;

export function getJsDay(daySlug: string): Day | undefined {
  return jsCurriculum.find((d) => d.slug === daySlug);
}

export function getJsLesson(
  daySlug: string,
  lessonSlug: string
): { day: Day; lesson: Lesson } | undefined {
  const day = getJsDay(daySlug);
  if (!day) return undefined;
  const lesson = day.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return undefined;
  return { day, lesson };
}

export function getJsAdjacentLessons(lessonId: string): {
  prev?: JsFlatLesson;
  next?: JsFlatLesson;
} {
  const idx = jsAllLessons.findIndex((f) => f.lesson.id === lessonId);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? jsAllLessons[idx - 1] : undefined,
    next: idx < jsAllLessons.length - 1 ? jsAllLessons[idx + 1] : undefined,
  };
}
