"use client";

import { useMemo, useRef, useState } from "react";
import { useProgress } from "@/components/ProgressProvider";
import { interviewQuestions } from "@/data/interview";
import { interviewCategoryLabels } from "@/lib/labels";
import { allLessons, totalLessonCount } from "@/data/curriculum";

function download(filename: string, text: string, mime: string) {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function dateStamp(): string {
  const d = new Date();
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function SettingsPage() {
  const {
    completedLessons,
    interview,
    interviewMastered,
    studyDates,
    hydrated,
    exportData,
    importData,
    resetAll,
  } = useProgress();

  const fileRef = useRef<HTMLInputElement>(null);
  const [importMsg, setImportMsg] = useState<string | null>(null);
  const [importOk, setImportOk] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetMsg, setResetMsg] = useState<string | null>(null);

  const stats = useMemo(() => {
    const done = allLessons.filter((f) => completedLessons[f.lesson.id]).length;
    const answered = Object.values(interview).filter(
      (t) => t.trim().length > 0
    ).length;
    const mastered = Object.values(interviewMastered).filter(Boolean).length;
    return { done, answered, mastered, days: studyDates.length };
  }, [completedLessons, interview, interviewMastered, studyDates]);

  const handleBackup = () => {
    download(
      `laravel-learning-backup-${dateStamp()}.json`,
      exportData(),
      "application/json"
    );
  };

  const handleAnswersMarkdown = () => {
    const lines: string[] = [
      "# 想定Q&A — 自分の回答",
      "",
      `書き出し日: ${new Date().toLocaleString("ja-JP")}`,
      "",
    ];
    let count = 0;
    for (const q of interviewQuestions) {
      const ans = interview[q.id]?.trim();
      if (!ans) continue;
      count++;
      lines.push(`## [${interviewCategoryLabels[q.category]}] ${q.question}`);
      lines.push("");
      lines.push("**自分の回答:**");
      lines.push("");
      lines.push(ans);
      lines.push("");
      lines.push("<details><summary>加点される回答例(参考)</summary>");
      lines.push("");
      lines.push(q.goodAnswer);
      lines.push("");
      lines.push("</details>");
      lines.push("");
      lines.push("---");
      lines.push("");
    }
    if (count === 0) {
      lines.push("_まだ回答が保存されていません。_");
    }
    download(
      `想定Q&A回答-${dateStamp()}.md`,
      lines.join("\n"),
      "text/markdown;charset=utf-8"
    );
  };

  const handlePickFile = () => fileRef.current?.click();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const res = importData(String(reader.result));
      setImportOk(res.ok);
      setImportMsg(
        res.ok
          ? "バックアップを読み込みました。進捗と回答を復元しました。"
          : res.error ?? "読み込みに失敗しました。"
      );
    };
    reader.onerror = () => {
      setImportOk(false);
      setImportMsg(
        "ファイルの読み込み中にエラーが発生しました。もう一度お試しください。"
      );
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setResetMsg(
        "確認のためもう一度押してください。この操作は取り消せません。"
      );
      return;
    }
    resetAll();
    setConfirmReset(false);
    setResetMsg("すべての進捗と回答をリセットしました。");
  };

  const handleCancelReset = () => {
    setConfirmReset(false);
    setResetMsg("リセットをキャンセルしました。");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-6">
        <p className="mb-1 text-sm font-medium text-accent">設定・データ管理</p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          学習データのバックアップ
        </h1>
        <p className="mt-2 leading-relaxed text-ink-soft">
          進捗と「自分の言葉で書いた回答」はこのブラウザの中(localStorage)だけに保存されています。
          ブラウザのデータを消すと失われるため、定期的にバックアップを取っておくと安心です。
        </p>
      </header>

      {/* 現在の保存状況 */}
      <section className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MiniStat label="完了レッスン" value={`${hydrated ? stats.done : 0}/${totalLessonCount}`} />
        <MiniStat label="記述回答" value={`${hydrated ? stats.answered : 0}`} />
        <MiniStat label="覚えたカード" value={`${hydrated ? stats.mastered : 0}`} />
        <MiniStat label="学習日数" value={`${hydrated ? stats.days : 0}`} />
      </section>

      {/* バックアップ */}
      <section className="mb-4 rounded-2xl border border-base-border bg-base-surface p-6 shadow-sm">
        <h2 className="mb-1 font-bold text-ink">バックアップを保存</h2>
        <p className="mb-4 text-sm leading-relaxed text-ink-soft">
          全データをJSONで書き出します。別のブラウザや端末に移すとき、また復元用に使えます。
          想定Q&Aの回答だけを読みやすいMarkdownで書き出すこともできます。
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleBackup}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-soft"
          >
            バックアップを保存(JSON)
          </button>
          <button
            onClick={handleAnswersMarkdown}
            className="rounded-lg border border-base-border px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-brand hover:text-brand"
          >
            想定Q&Aの回答を書き出す(Markdown)
          </button>
        </div>
      </section>

      {/* 復元 */}
      <section className="mb-4 rounded-2xl border border-base-border bg-base-surface p-6 shadow-sm">
        <h2 className="mb-1 font-bold text-ink">バックアップから復元</h2>
        <p className="mb-4 text-sm leading-relaxed text-ink-soft">
          保存したJSONを読み込むと、現在の進捗と回答をその内容で上書きします。
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          onChange={handleFile}
          className="hidden"
        />
        <button
          onClick={handlePickFile}
          className="rounded-lg border border-base-border px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-brand hover:text-brand"
        >
          JSONファイルを選ぶ
        </button>
        <p
          role="status"
          aria-live="polite"
          className={`mt-3 text-sm ${
            importMsg ? (importOk ? "text-good" : "text-bad") : ""
          }`}
        >
          {importMsg}
        </p>
      </section>

      {/* リセット */}
      <section className="rounded-2xl border border-bad/30 bg-bad-bg p-6">
        <h2 className="mb-1 font-bold text-bad">進捗をリセット</h2>
        <p className="mb-4 text-sm leading-relaxed text-ink-soft">
          完了チェック・クイズの結果・想定Q&Aの回答・学習日数をすべて削除します。この操作は取り消せません。
          必要なら先にバックアップを取ってください。
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              confirmReset
                ? "bg-bad text-white hover:bg-bad/90"
                : "border border-bad text-bad hover:bg-bad/10"
            }`}
          >
            {confirmReset ? "本当にリセットする(取り消せません)" : "すべてリセット"}
          </button>
          {confirmReset && (
            <button
              onClick={handleCancelReset}
              className="rounded-lg border border-base-border px-4 py-2 text-sm text-ink-soft hover:border-brand"
            >
              やめる
            </button>
          )}
        </div>
        <p
          role="status"
          aria-live="polite"
          className={`mt-3 text-sm ${
            resetMsg ? (confirmReset ? "text-bad" : "text-ink-soft") : ""
          }`}
        >
          {resetMsg}
        </p>
      </section>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-base-border bg-base-surface p-3 text-center shadow-sm">
      <p className="text-lg font-bold text-ink">{value}</p>
      <p className="text-xs text-ink-faint">{label}</p>
    </div>
  );
}
