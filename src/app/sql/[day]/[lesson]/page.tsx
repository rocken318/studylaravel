import { notFound } from "next/navigation";
import { sqlCurriculum, getSqlLesson } from "@/data/sql/curriculum";
import { SqlLessonView } from "@/components/SqlLessonView";

export function generateStaticParams() {
  return sqlCurriculum.flatMap((day) =>
    day.lessons.map((lesson) => ({ day: day.slug, lesson: lesson.slug }))
  );
}

export function generateMetadata({
  params,
}: {
  params: { day: string; lesson: string };
}) {
  const found = getSqlLesson(params.day, params.lesson);
  if (!found) return { title: "初めてのSQL" };
  return {
    title: `${found.lesson.title} — 初めてのSQL`,
    description: found.lesson.summary,
  };
}

export default function SqlLessonPage({
  params,
}: {
  params: { day: string; lesson: string };
}) {
  const found = getSqlLesson(params.day, params.lesson);
  if (!found) notFound();
  return <SqlLessonView day={found.day} lesson={found.lesson} />;
}
