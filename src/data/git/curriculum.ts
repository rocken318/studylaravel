// =====================================================================
// 「初めてのGit — 壊しても戻せる安心」カリキュラム集約とヘルパー
// =====================================================================

import type { Day, Lesson } from "@/types";
import { gitDay0 } from "./day0";
import { gitDay1 } from "./day1";
import { gitDay2 } from "./day2";
import { gitDay3 } from "./day3";

export const gitCurriculum: Day[] = [gitDay0, gitDay1, gitDay2, gitDay3];

export interface GitFlatLesson {
  day: Day;
  lesson: Lesson;
  order: number;
}

export const gitAllLessons: GitFlatLesson[] = (() => {
  const list: GitFlatLesson[] = [];
  let order = 0;
  for (const day of gitCurriculum) {
    for (const lesson of day.lessons) {
      list.push({ day, lesson, order: order++ });
    }
  }
  return list;
})();

export const gitTotalLessonCount = gitAllLessons.length;

export function getGitDay(daySlug: string): Day | undefined {
  return gitCurriculum.find((d) => d.slug === daySlug);
}

export function getGitLesson(
  daySlug: string,
  lessonSlug: string
): { day: Day; lesson: Lesson } | undefined {
  const day = getGitDay(daySlug);
  if (!day) return undefined;
  const lesson = day.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return undefined;
  return { day, lesson };
}

export function getGitAdjacentLessons(lessonId: string): {
  prev?: GitFlatLesson;
  next?: GitFlatLesson;
} {
  const idx = gitAllLessons.findIndex((f) => f.lesson.id === lessonId);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? gitAllLessons[idx - 1] : undefined,
    next: idx < gitAllLessons.length - 1 ? gitAllLessons[idx + 1] : undefined,
  };
}
