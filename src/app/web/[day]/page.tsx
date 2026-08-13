import { notFound } from "next/navigation";
import { webCurriculum, getWebDay } from "@/data/web/curriculum";
import { WebDayView } from "@/components/WebDayView";

export function generateStaticParams() {
  return webCurriculum.map((day) => ({ day: day.slug }));
}

export function generateMetadata({ params }: { params: { day: string } }) {
  const day = getWebDay(params.day);
  if (!day) return { title: "初めてのHTML/CSS" };
  return {
    title: `Day ${day.day} ${day.title} — 初めてのHTML/CSS`,
    description: day.goal,
  };
}

export default function WebDayPage({ params }: { params: { day: string } }) {
  const day = getWebDay(params.day);
  if (!day) notFound();
  return <WebDayView day={day} />;
}
