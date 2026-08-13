// =====================================================================
// 「バイブコーディングの土台 — 言語共通のプログラミング基礎」集約とヘルパー
// =====================================================================

import type { Day, Lesson } from "@/types";
import { basicsDay0 } from "./day0";
import { basicsDay1 } from "./day1";
import { basicsDay2 } from "./day2";
import { basicsDay3 } from "./day3";
import { basicsDay4 } from "./day4";
import { basicsDay5 } from "./day5";
import { basicsDay6 } from "./day6";
import { basicsDay7 } from "./day7";

export const basicsCurriculum: Day[] = [
  basicsDay0,
  basicsDay1,
  basicsDay2,
  basicsDay3,
  basicsDay4,
  basicsDay5,
  basicsDay6,
  basicsDay7,
];

export interface BasicsFlatLesson {
  day: Day;
  lesson: Lesson;
  order: number;
}

export const basicsAllLessons: BasicsFlatLesson[] = (() => {
  const list: BasicsFlatLesson[] = [];
  let order = 0;
  for (const day of basicsCurriculum) {
    for (const lesson of day.lessons) {
      list.push({ day, lesson, order: order++ });
    }
  }
  return list;
})();

export const basicsTotalLessonCount = basicsAllLessons.length;

export function getBasicsDay(daySlug: string): Day | undefined {
  return basicsCurriculum.find((d) => d.slug === daySlug);
}

export function getBasicsLesson(
  daySlug: string,
  lessonSlug: string
): { day: Day; lesson: Lesson } | undefined {
  const day = getBasicsDay(daySlug);
  if (!day) return undefined;
  const lesson = day.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return undefined;
  return { day, lesson };
}

export function getBasicsAdjacentLessons(lessonId: string): {
  prev?: BasicsFlatLesson;
  next?: BasicsFlatLesson;
} {
  const idx = basicsAllLessons.findIndex((f) => f.lesson.id === lessonId);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? basicsAllLessons[idx - 1] : undefined,
    next: idx < basicsAllLessons.length - 1 ? basicsAllLessons[idx + 1] : undefined,
  };
}
