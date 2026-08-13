import { notFound } from "next/navigation";
import { tsCurriculum, getTsLesson } from "@/data/typescript/curriculum";
import { TsLessonView } from "@/components/TsLessonView";

export function generateStaticParams() {
  return tsCurriculum.flatMap((day) =>
    day.lessons.map((lesson) => ({ day: day.slug, lesson: lesson.slug }))
  );
}

export function generateMetadata({
  params,
}: {
  params: { day: string; lesson: string };
}) {
  const found = getTsLesson(params.day, params.lesson);
  if (!found) return { title: "初めてのTypeScript" };
  return {
    title: `${found.lesson.title} — 初めてのTypeScript`,
    description: found.lesson.summary,
  };
}

export default function TsLessonPage({
  params,
}: {
  params: { day: string; lesson: string };
}) {
  const found = getTsLesson(params.day, params.lesson);
  if (!found) notFound();
  return <TsLessonView day={found.day} lesson={found.lesson} />;
}
