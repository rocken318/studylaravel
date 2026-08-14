import { notFound } from "next/navigation";
import { sqlCurriculum, getSqlDay } from "@/data/sql/curriculum";
import { SqlDayView } from "@/components/SqlDayView";

export function generateStaticParams() {
  return sqlCurriculum.map((day) => ({ day: day.slug }));
}

export function generateMetadata({ params }: { params: { day: string } }) {
  const day = getSqlDay(params.day);
  if (!day) return { title: "初めてのSQL" };
  return {
    title: `Day ${day.day} ${day.title} — 初めてのSQL`,
    description: day.goal,
  };
}

export default function SqlDayPage({ params }: { params: { day: string } }) {
  const day = getSqlDay(params.day);
  if (!day) notFound();
  return <SqlDayView day={day} />;
}
