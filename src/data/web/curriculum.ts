// =====================================================================
// 「初めてのHTML/CSS — Webページの土台」カリキュラム集約とヘルパー
// =====================================================================

import type { Day, Lesson } from "@/types";
import { webDay0 } from "./day0";
import { webDay1 } from "./day1";
import { webDay2 } from "./day2";
import { webDay3 } from "./day3";

export const webCurriculum: Day[] = [webDay0, webDay1, webDay2, webDay3];

export interface WebFlatLesson {
  day: Day;
  lesson: Lesson;
  order: number;
}

export const webAllLessons: WebFlatLesson[] = (() => {
  const list: WebFlatLesson[] = [];
  let order = 0;
  for (const day of webCurriculum) {
    for (const lesson of day.lessons) {
      list.push({ day, lesson, order: order++ });
    }
  }
  return list;
})();

export const webTotalLessonCount = webAllLessons.length;

export function getWebDay(daySlug: string): Day | undefined {
  return webCurriculum.find((d) => d.slug === daySlug);
}

export function getWebLesson(
  daySlug: string,
  lessonSlug: string
): { day: Day; lesson: Lesson } | undefined {
  const day = getWebDay(daySlug);
  if (!day) return undefined;
  const lesson = day.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return undefined;
  return { day, lesson };
}

export function getWebAdjacentLessons(lessonId: string): {
  prev?: WebFlatLesson;
  next?: WebFlatLesson;
} {
  const idx = webAllLessons.findIndex((f) => f.lesson.id === lessonId);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? webAllLessons[idx - 1] : undefined,
    next: idx < webAllLessons.length - 1 ? webAllLessons[idx + 1] : undefined,
  };
}
