"use client";

import { CodeBlock } from "@/components/CodeBlock";
import {
  caseStudyIntro,
  caseStudySections,
  type CaseCode,
  type CaseSection,
} from "@/data/casestudy";

export default function CaseStudyPage() {
  return (
    <div className="mx-auto max-w-reading">
      {/* イントロ */}
      <header className="mb-8">
        <p className="mb-1 text-sm font-medium text-accent">
          実例で読み解く
        </p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          {caseStudyIntro.title}
        </h1>
        <p className="mt-2 text-lg font-medium leading-relaxed text-ink-soft">
          {caseStudyIntro.lead}
        </p>
      </header>

      <div className="prose-reading mb-8">
        {caseStudyIntro.paragraphs.map((p, i) => (
          <p key={i} className="text-ink-soft">
            {p}
          </p>
        ))}
      </div>

      {/* この章の歩き方(目次) */}
      <nav className="mb-10 rounded-2xl border border-base-border bg-base-surface p-5">
        <p className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-ink">
          <span aria-hidden>🗺</span>
          この章で追体験する設計判断
        </p>
        <ol className="space-y-1.5">
          {caseStudySections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="flex items-baseline gap-2 text-sm text-ink-soft transition-colors hover:text-brand"
              >
                <span className="text-xs font-medium text-ink-faint">
                  {i + 1}.
                </span>
                <span className="shrink-0 rounded-full bg-brand-bg px-2 py-0.5 text-[0.7rem] font-medium text-brand">
                  {s.dayTag}
                </span>
                <span>{s.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* 各節 */}
      <div className="space-y-12">
        {caseStudySections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
      </div>

      <p className="mt-12 text-center text-xs text-ink-faint">
        コードはすべて実在サイト(halvision.com)の実ファイルからの要点抜粋です。
        丸暗記ではなく「なぜこう書く/避けるか」を自分の言葉で言えるかを確認しましょう。
      </p>
    </div>
  );
}

function Section({ section }: { section: CaseSection }) {
  return (
    <section
      id={section.id}
      className="scroll-mt-24 border-t border-base-border pt-8"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-full bg-brand-bg px-2.5 py-0.5 text-xs font-medium text-brand">
          {section.dayTag}
        </span>
      </div>
      <h2 className="text-xl font-bold text-ink md:text-2xl">
        {section.title}
      </h2>
      <p className="mt-2 leading-relaxed text-ink-soft">{section.summary}</p>

      {/* ① 実コード抜粋 */}
      <div className="mt-5 space-y-4">
        {section.bad && <CodeCard code={section.bad} tone="bad" />}
        {section.good && <CodeCard code={section.good} tone="good" />}
        {section.neutral && <CodeCard code={section.neutral} tone="neutral" />}
      </div>

      {/* ② 何が良い/悪いか */}
      <div className="mt-6">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-ink">
          <span aria-hidden>🔍</span>
          何が良い / 悪いか
        </h3>
        <div className="space-y-2.5">
          {section.verdict.map((v, i) => (
            <p key={i} className="text-sm leading-relaxed text-ink-soft">
              {v}
            </p>
          ))}
        </div>
      </div>

      {/* 補足(あれば) */}
      {section.note && (
        <div className="mt-5 rounded-xl border border-base-border bg-base-bg p-4">
          <p className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-ink">
            <span aria-hidden>💡</span>
            補足
          </p>
          <p className="text-sm leading-relaxed text-ink-soft">
            {section.note}
          </p>
        </div>
      )}

      {/* ③ 自分の言葉で説明するなら */}
      <div className="mt-5 rounded-xl border border-accent/30 bg-accent-bg p-4">
        <p className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-accent">
          <span aria-hidden>🎤</span>
          自分の言葉で説明するなら
        </p>
        <p className="text-sm leading-relaxed text-ink-soft">
          {section.interview}
        </p>
      </div>
    </section>
  );
}

function CodeCard({
  code,
  tone,
}: {
  code: CaseCode;
  tone: "bad" | "good" | "neutral";
}) {
  const meta =
    tone === "bad"
      ? {
          icon: "✗",
          className: "border-bad/30 bg-bad-bg",
          labelClass: "text-bad",
        }
      : tone === "good"
        ? {
            icon: "✓",
            className: "border-good/30 bg-good-bg",
            labelClass: "text-good",
          }
        : {
            icon: "◦",
            className: "border-base-border bg-base-bg",
            labelClass: "text-ink",
          };

  return (
    <div className={`rounded-xl border p-4 ${meta.className}`}>
      <p
        className={`mb-1 flex items-center gap-1.5 text-sm font-semibold ${meta.labelClass}`}
      >
        <span aria-hidden>{meta.icon}</span>
        {code.label}
      </p>
      <p className="mb-2 font-mono text-xs text-ink-faint">{code.file}</p>
      <CodeBlock code={code.code} language={code.language} />
    </div>
  );
}
