// =====================================================================
// 「初めてのPython — AI時代の第一歩」カリキュラム集約とヘルパー
// data/curriculum.ts(Laravel版)と同じ形。ヘルパーは Python コースに閉じる。
// =====================================================================

import type { Day, Lesson } from "@/types";
import { pythonDay0 } from "./day0";
import { pythonDay1 } from "./day1";
import { pythonDay2 } from "./day2";
import { pythonDay3 } from "./day3";
import { pythonDay4 } from "./day4";
import { pythonDay5 } from "./day5";
import { pythonDay6 } from "./day6";
import { pythonDay7 } from "./day7";

export const pythonCurriculum: Day[] = [
  pythonDay0,
  pythonDay1,
  pythonDay2,
  pythonDay3,
  pythonDay4,
  pythonDay5,
  pythonDay6,
  pythonDay7,
];

export interface PythonFlatLesson {
  day: Day;
  lesson: Lesson;
  order: number;
}

export const pythonAllLessons: PythonFlatLesson[] = (() => {
  const list: PythonFlatLesson[] = [];
  let order = 0;
  for (const day of pythonCurriculum) {
    for (const lesson of day.lessons) {
      list.push({ day, lesson, order: order++ });
    }
  }
  return list;
})();

export const pythonTotalLessonCount = pythonAllLessons.length;

export function getPythonDay(daySlug: string): Day | undefined {
  return pythonCurriculum.find((d) => d.slug === daySlug);
}

export function getPythonLesson(
  daySlug: string,
  lessonSlug: string
): { day: Day; lesson: Lesson } | undefined {
  const day = getPythonDay(daySlug);
  if (!day) return undefined;
  const lesson = day.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return undefined;
  return { day, lesson };
}

export function getPythonAdjacentLessons(lessonId: string): {
  prev?: PythonFlatLesson;
  next?: PythonFlatLesson;
} {
  const idx = pythonAllLessons.findIndex((f) => f.lesson.id === lessonId);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? pythonAllLessons[idx - 1] : undefined,
    next: idx < pythonAllLessons.length - 1 ? pythonAllLessons[idx + 1] : undefined,
  };
}
