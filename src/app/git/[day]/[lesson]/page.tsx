import { notFound } from "next/navigation";
import { gitCurriculum, getGitLesson } from "@/data/git/curriculum";
import { GitLessonView } from "@/components/GitLessonView";

export function generateStaticParams() {
  return gitCurriculum.flatMap((day) =>
    day.lessons.map((lesson) => ({ day: day.slug, lesson: lesson.slug }))
  );
}

export function generateMetadata({
  params,
}: {
  params: { day: string; lesson: string };
}) {
  const found = getGitLesson(params.day, params.lesson);
  if (!found) return { title: "初めてのGit" };
  return {
    title: `${found.lesson.title} — 初めてのGit`,
    description: found.lesson.summary,
  };
}

export default function GitLessonPage({
  params,
}: {
  params: { day: string; lesson: string };
}) {
  const found = getGitLesson(params.day, params.lesson);
  if (!found) notFound();
  return <GitLessonView day={found.day} lesson={found.lesson} />;
}
