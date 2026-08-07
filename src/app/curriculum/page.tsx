import Link from "next/link";
import { curriculum } from "@/data/curriculum";

export const metadata = {
  title: "カリキュラム — Laravel Bootcamp",
  description: "7日間で学ぶLaravelの設計思想とチーム開発の作法。",
};

export default function CurriculumIndexPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-8">
        <p className="mb-1 text-sm font-medium text-accent">カリキュラム</p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          7日間の学習ロードマップ
        </h1>
        <p className="mt-2 leading-relaxed text-ink-soft">
          1日ずつ、設計の「なぜ」を積み上げます。各Dayのゴールは「面接で説明できること」です。
        </p>
      </header>

      <ol className="space-y-3">
        {curriculum.map((day) => (
          <li key={day.slug}>
            <Link
              href={`/curriculum/${day.slug}`}
              className="group flex items-start gap-4 rounded-2xl border border-base-border bg-base-surface p-5 shadow-sm transition-colors hover:border-brand"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-bg text-sm font-bold text-brand">
                D{day.day}
              </span>
              <div>
                <p className="font-bold text-ink group-hover:text-brand">
                  {day.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {day.goal}
                </p>
                <p className="mt-1.5 text-xs text-ink-faint">
                  {day.lessons.length} レッスン
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
