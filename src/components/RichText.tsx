"use client";

// 段落テキスト内の [[slug]] を用語リンク(クリックでモーダル)に変換する
import { Fragment } from "react";
import { findTerm, useGlossaryModal } from "./GlossaryModal";

const TOKEN = /\[\[([a-z0-9-]+)\]\]/g;

export function RichText({ text }: { text: string }) {
  const { openTerm } = useGlossaryModal();

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        <Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>
      );
    }
    const slug = match[1];
    const term = findTerm(slug);
    const label = term ? term.term : slug;
    nodes.push(
      <button
        key={key++}
        type="button"
        onClick={() => openTerm(slug)}
        className="mx-0.5 inline items-baseline border-b border-dotted border-brand/60 font-medium text-brand transition-colors hover:border-solid hover:bg-brand-bg"
        title="用語の解説を見る"
      >
        {label}
      </button>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }

  return <>{nodes}</>;
}
