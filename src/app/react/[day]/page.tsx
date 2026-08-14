import { notFound } from "next/navigation";
import { reactCurriculum, getReactDay } from "@/data/react/curriculum";
import { ReactDayView } from "@/components/ReactDayView";

export function generateStaticParams() {
  return reactCurriculum.map((day) => ({ day: day.slug }));
}

export function generateMetadata({ params }: { params: { day: string } }) {
  const day = getReactDay(params.day);
  if (!day) return { title: "初めてのReact" };
  return {
    title: `Day ${day.day} ${day.title} — 初めてのReact`,
    description: day.goal,
  };
}

export default function ReactDayPage({ params }: { params: { day: string } }) {
  const day = getReactDay(params.day);
  if (!day) notFound();
  return <ReactDayView day={day} />;
}
