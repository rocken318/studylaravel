import { notFound } from "next/navigation";
import { pythonCurriculum, getPythonDay } from "@/data/python/curriculum";
import { PythonDayView } from "@/components/PythonDayView";

export function generateStaticParams() {
  return pythonCurriculum.map((day) => ({ day: day.slug }));
}

export function generateMetadata({ params }: { params: { day: string } }) {
  const day = getPythonDay(params.day);
  if (!day) return { title: "初めてのPython" };
  return {
    title: `Day ${day.day} ${day.title} — 初めてのPython`,
    description: day.goal,
  };
}

export default function PythonDayPage({ params }: { params: { day: string } }) {
  const day = getPythonDay(params.day);
  if (!day) notFound();
  return <PythonDayView day={day} />;
}
