import { notFound } from "next/navigation";
import { tsCurriculum, getTsDay } from "@/data/typescript/curriculum";
import { TsDayView } from "@/components/TsDayView";

export function generateStaticParams() {
  return tsCurriculum.map((day) => ({ day: day.slug }));
}

export function generateMetadata({ params }: { params: { day: string } }) {
  const day = getTsDay(params.day);
  if (!day) return { title: "初めてのTypeScript" };
  return {
    title: `Day ${day.day} ${day.title} — 初めてのTypeScript`,
    description: day.goal,
  };
}

export default function TsDayPage({ params }: { params: { day: string } }) {
  const day = getTsDay(params.day);
  if (!day) notFound();
  return <TsDayView day={day} />;
}
