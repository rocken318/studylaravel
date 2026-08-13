import { notFound } from "next/navigation";
import { basicsCurriculum, getBasicsDay } from "@/data/basics/curriculum";
import { BasicsDayView } from "@/components/BasicsDayView";

export function generateStaticParams() {
  return basicsCurriculum.map((day) => ({ day: day.slug }));
}

export function generateMetadata({ params }: { params: { day: string } }) {
  const day = getBasicsDay(params.day);
  if (!day) return { title: "バイブコーディングの土台" };
  return {
    title: `Day ${day.day} ${day.title} — バイブコーディングの土台`,
    description: day.goal,
  };
}

export default function BasicsDayPage({ params }: { params: { day: string } }) {
  const day = getBasicsDay(params.day);
  if (!day) notFound();
  return <BasicsDayView day={day} />;
}
