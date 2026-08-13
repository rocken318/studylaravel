import { notFound } from "next/navigation";
import { basicsCurriculum, getBasicsLesson } from "@/data/basics/curriculum";
import { BasicsLessonView } from "@/components/BasicsLessonView";

export function generateStaticParams() {
  return basicsCurriculum.flatMap((day) =>
    day.lessons.map((lesson) => ({ day: day.slug, lesson: lesson.slug }))
  );
}

export function generateMetadata({
  params,
}: {
  params: { day: string; lesson: string };
}) {
  const found = getBasicsLesson(params.day, params.lesson);
  if (!found) return { title: "バイブコーディングの土台" };
  return {
    title: `${found.lesson.title} — バイブコーディングの土台`,
    description: found.lesson.summary,
  };
}

export default function BasicsLessonPage({
  params,
}: {
  params: { day: string; lesson: string };
}) {
  const found = getBasicsLesson(params.day, params.lesson);
  if (!found) notFound();
  return <BasicsLessonView day={found.day} lesson={found.lesson} />;
}
