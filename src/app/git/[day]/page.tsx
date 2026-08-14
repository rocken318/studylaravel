import { notFound } from "next/navigation";
import { gitCurriculum, getGitDay } from "@/data/git/curriculum";
import { GitDayView } from "@/components/GitDayView";

export function generateStaticParams() {
  return gitCurriculum.map((day) => ({ day: day.slug }));
}

export function generateMetadata({ params }: { params: { day: string } }) {
  const day = getGitDay(params.day);
  if (!day) return { title: "初めてのGit" };
  return {
    title: `Day ${day.day} ${day.title} — 初めてのGit`,
    description: day.goal,
  };
}

export default function GitDayPage({ params }: { params: { day: string } }) {
  const day = getGitDay(params.day);
  if (!day) notFound();
  return <GitDayView day={day} />;
}
