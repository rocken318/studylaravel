import { notFound } from "next/navigation";
import { curriculum, getLesson } from "@/data/curriculum";
import { LessonView } from "@/components/LessonView";

export function generateStaticParams() {
  return curriculum.flatMap((day) =>
    day.lessons.map((lesson) => ({ day: day.slug, lesson: lesson.slug }))
  );
}

export function generateMetadata({
  params,
}: {
  params: { day: string; lesson: string };
}) {
  const found = getLesson(params.day, params.lesson);
  if (!found) return { title: "初めてのLaravel" };
  return {
    title: `${found.lesson.title} — 初めてのLaravel`,
    description: found.lesson.summary,
  };
}

export default function LessonPage({
  params,
}: {
  params: { day: string; lesson: string };
}) {
  const found = getLesson(params.day, params.lesson);
  if (!found) notFound();
  return <LessonView day={found.day} lesson={found.lesson} />;
}
