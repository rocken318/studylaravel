// =====================================================================
// 「初めてのReact — UIを組み立てる」カリキュラム集約とヘルパー
// =====================================================================

import type { Day, Lesson } from "@/types";
import { reactDay0 } from "./day0";
import { reactDay1 } from "./day1";
import { reactDay2 } from "./day2";
import { reactDay3 } from "./day3";
import { reactDay4 } from "./day4";
import { reactDay5 } from "./day5";
import { reactDay6 } from "./day6";

export const reactCurriculum: Day[] = [
  reactDay0,
  reactDay1,
  reactDay2,
  reactDay3,
  reactDay4,
  reactDay5,
  reactDay6,
];

export interface ReactFlatLesson {
  day: Day;
  lesson: Lesson;
  order: number;
}

export const reactAllLessons: ReactFlatLesson[] = (() => {
  const list: ReactFlatLesson[] = [];
  let order = 0;
  for (const day of reactCurriculum) {
    for (const lesson of day.lessons) {
      list.push({ day, lesson, order: order++ });
    }
  }
  return list;
})();

export const reactTotalLessonCount = reactAllLessons.length;

export function getReactDay(daySlug: string): Day | undefined {
  return reactCurriculum.find((d) => d.slug === daySlug);
}

export function getReactLesson(
  daySlug: string,
  lessonSlug: string
): { day: Day; lesson: Lesson } | undefined {
  const day = getReactDay(daySlug);
  if (!day) return undefined;
  const lesson = day.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return undefined;
  return { day, lesson };
}

export function getReactAdjacentLessons(lessonId: string): {
  prev?: ReactFlatLesson;
  next?: ReactFlatLesson;
} {
  const idx = reactAllLessons.findIndex((f) => f.lesson.id === lessonId);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? reactAllLessons[idx - 1] : undefined,
    next:
      idx < reactAllLessons.length - 1 ? reactAllLessons[idx + 1] : undefined,
  };
}
