import { notFound } from "next/navigation";
import { webCurriculum, getWebLesson } from "@/data/web/curriculum";
import { WebLessonView } from "@/components/WebLessonView";

export function generateStaticParams() {
  return webCurriculum.flatMap((day) =>
    day.lessons.map((lesson) => ({ day: day.slug, lesson: lesson.slug }))
  );
}

export function generateMetadata({
  params,
}: {
  params: { day: string; lesson: string };
}) {
  const found = getWebLesson(params.day, params.lesson);
  if (!found) return { title: "初めてのHTML/CSS" };
  return {
    title: `${found.lesson.title} — 初めてのHTML/CSS`,
    description: found.lesson.summary,
  };
}

export default function WebLessonPage({
  params,
}: {
  params: { day: string; lesson: string };
}) {
  const found = getWebLesson(params.day, params.lesson);
  if (!found) notFound();
  return <WebLessonView day={found.day} lesson={found.lesson} />;
}
