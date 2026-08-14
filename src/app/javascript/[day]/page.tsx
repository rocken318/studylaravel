import { notFound } from "next/navigation";
import { jsCurriculum, getJsDay } from "@/data/javascript/curriculum";
import { JsDayView } from "@/components/JsDayView";

export function generateStaticParams() {
  return jsCurriculum.map((day) => ({ day: day.slug }));
}

export function generateMetadata({ params }: { params: { day: string } }) {
  const day = getJsDay(params.day);
  if (!day) return { title: "初めてのJavaScript" };
  return {
    title: `Day ${day.day} ${day.title} — 初めてのJavaScript`,
    description: day.goal,
  };
}

export default function JsDayPage({ params }: { params: { day: string } }) {
  const day = getJsDay(params.day);
  if (!day) notFound();
  return <JsDayView day={day} />;
}
