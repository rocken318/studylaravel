import { notFound } from "next/navigation";
import { reactCurriculum, getReactLesson } from "@/data/react/curriculum";
import { ReactLessonView } from "@/components/ReactLessonView";

export function generateStaticParams() {
  return reactCurriculum.flatMap((day) =>
    day.lessons.map((lesson) => ({ day: day.slug, lesson: lesson.slug }))
  );
}

export function generateMetadata({
  params,
}: {
  params: { day: string; lesson: string };
}) {
  const found = getReactLesson(params.day, params.lesson);
  if (!found) return { title: "初めてのReact" };
  return {
    title: `${found.lesson.title} — 初めてのReact`,
    description: found.lesson.summary,
  };
}

export default function ReactLessonPage({
  params,
}: {
  params: { day: string; lesson: string };
}) {
  const found = getReactLesson(params.day, params.lesson);
  if (!found) notFound();
  return <ReactLessonView day={found.day} lesson={found.lesson} />;
}
