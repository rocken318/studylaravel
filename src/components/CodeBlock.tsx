"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const languageLabels: Record<string, string> = {
  php: "PHP",
  bash: "ターミナル",
  sh: "ターミナル",
  shell: "ターミナル",
  sql: "SQL",
  blade: "Blade",
  html: "HTML",
  yaml: "YAML",
  yml: "YAML",
  json: "JSON",
  env: ".env",
  ini: ".env",
  js: "JavaScript",
  ts: "TypeScript",
};

export function CodeBlock({
  code,
  language,
  caption,
}: {
  code: string;
  language: string;
  caption?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // クリップボード不可の環境では何もしない
    }
  };

  // react-syntax-highlighter が理解する言語名に寄せる
  const highlightLang =
    language === "blade" || language === "env" || language === "ini"
      ? language === "blade"
        ? "php"
        : "bash"
      : language;

  return (
    <figure className="my-5">
      <div className="overflow-hidden rounded-xl border border-[#3a3f4b] bg-[#282c34] shadow-sm">
        <div className="flex items-center justify-between border-b border-[#3a3f4b] px-4 py-2">
          <span className="text-xs font-medium text-[#9aa2b1]">
            {languageLabels[language] ?? language.toUpperCase()}
          </span>
          <button
            onClick={handleCopy}
            className="text-xs text-[#9aa2b1] transition-colors hover:text-white"
          >
            {copied ? "コピーしました" : "コピー"}
          </button>
        </div>
        <div className="code-scroll overflow-x-auto">
          <SyntaxHighlighter
            language={highlightLang}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: "1rem 1.15rem",
              background: "transparent",
              fontSize: "0.86rem",
              lineHeight: 1.7,
            }}
            codeTagProps={{ style: { fontFamily: "var(--font-mono)" } }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-ink-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
