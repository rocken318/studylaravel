import { notFound } from "next/navigation";
import { curriculum, getDay } from "@/data/curriculum";
import { DayView } from "@/components/DayView";

export function generateStaticParams() {
  return curriculum.map((day) => ({ day: day.slug }));
}

export function generateMetadata({ params }: { params: { day: string } }) {
  const day = getDay(params.day);
  if (!day) return { title: "初めてのLaravel" };
  return {
    title: `Day ${day.day} ${day.title} — 初めてのLaravel`,
    description: day.goal,
  };
}

export default function DayPage({ params }: { params: { day: string } }) {
  const day = getDay(params.day);
  if (!day) notFound();
  return <DayView day={day} />;
}
