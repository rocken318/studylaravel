import { notFound } from "next/navigation";
import { pythonCurriculum, getPythonLesson } from "@/data/python/curriculum";
import { PythonLessonView } from "@/components/PythonLessonView";

export function generateStaticParams() {
  return pythonCurriculum.flatMap((day) =>
    day.lessons.map((lesson) => ({ day: day.slug, lesson: lesson.slug }))
  );
}

export function generateMetadata({
  params,
}: {
  params: { day: string; lesson: string };
}) {
  const found = getPythonLesson(params.day, params.lesson);
  if (!found) return { title: "初めてのPython" };
  return {
    title: `${found.lesson.title} — 初めてのPython`,
    description: found.lesson.summary,
  };
}

export default function PythonLessonPage({
  params,
}: {
  params: { day: string; lesson: string };
}) {
  const found = getPythonLesson(params.day, params.lesson);
  if (!found) notFound();
  return <PythonLessonView day={found.day} lesson={found.lesson} />;
}
