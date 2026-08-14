import { notFound } from "next/navigation";
import { jsCurriculum, getJsLesson } from "@/data/javascript/curriculum";
import { JsLessonView } from "@/components/JsLessonView";

export function generateStaticParams() {
  return jsCurriculum.flatMap((day) =>
    day.lessons.map((lesson) => ({ day: day.slug, lesson: lesson.slug }))
  );
}

export function generateMetadata({
  params,
}: {
  params: { day: string; lesson: string };
}) {
  const found = getJsLesson(params.day, params.lesson);
  if (!found) return { title: "初めてのJavaScript" };
  return {
    title: `${found.lesson.title} — 初めてのJavaScript`,
    description: found.lesson.summary,
  };
}

export default function JsLessonPage({
  params,
}: {
  params: { day: string; lesson: string };
}) {
  const found = getJsLesson(params.day, params.lesson);
  if (!found) notFound();
  return <JsLessonView day={found.day} lesson={found.lesson} />;
}
