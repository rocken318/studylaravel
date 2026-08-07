import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-20 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-2xl font-bold text-white">
        L
      </span>
      <h1 className="mb-2 text-2xl font-bold text-ink">
        ページが見つかりません
      </h1>
      <p className="mb-6 text-ink-soft">
        お探しのレッスンやページは存在しないようです。
      </p>
      <Link
        href="/"
        className="rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-soft"
      >
        ダッシュボードに戻る
      </Link>
    </div>
  );
}
