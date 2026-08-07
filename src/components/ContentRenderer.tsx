"use client";

import type { ContentBlock } from "@/types";
import { calloutMeta } from "@/lib/labels";
import { CodeBlock } from "./CodeBlock";
import { RichText } from "./RichText";

export function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose-reading">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mb-3 mt-8 border-l-4 border-brand pl-3 text-xl font-bold text-ink">
          {block.text}
        </h2>
      );

    case "paragraph":
      return (
        <p className="text-ink-soft">
          <RichText text={block.text} />
        </p>
      );

    case "code":
      return (
        <CodeBlock
          code={block.code}
          language={block.language}
          caption={block.caption}
        />
      );

    case "list":
      return block.ordered ? (
        <ol className="my-4 list-decimal space-y-1.5 pl-6 text-ink-soft">
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText text={item} />
            </li>
          ))}
        </ol>
      ) : (
        <ul className="my-4 list-disc space-y-1.5 pl-6 text-ink-soft">
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );

    case "callout": {
      const meta = calloutMeta[block.variant];
      return (
        <div className={`my-5 rounded-xl border p-4 ${meta.className}`}>
          <p className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink">
            <span aria-hidden>{meta.icon}</span>
            {block.title ?? meta.label}
          </p>
          <p className="text-sm leading-relaxed text-ink-soft">
            <RichText text={block.text} />
          </p>
        </div>
      );
    }

    case "compare":
      return (
        <div className="my-6 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-bad/30 bg-bad-bg p-4">
            <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-bad">
              <span aria-hidden>✗</span>
              {block.bad.label ?? "悪い例"}
            </p>
            {block.bad.text && (
              <p className="mb-2 text-sm leading-relaxed text-ink-soft">
                <RichText text={block.bad.text} />
              </p>
            )}
            {block.bad.code && (
              <CodeBlock
                code={block.bad.code}
                language={block.bad.language ?? "php"}
              />
            )}
          </div>
          <div className="rounded-xl border border-good/30 bg-good-bg p-4">
            <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-good">
              <span aria-hidden>✓</span>
              {block.good.label ?? "良い例"}
            </p>
            {block.good.text && (
              <p className="mb-2 text-sm leading-relaxed text-ink-soft">
                <RichText text={block.good.text} />
              </p>
            )}
            {block.good.code && (
              <CodeBlock
                code={block.good.code}
                language={block.good.language ?? "php"}
              />
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
}
