"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ────────────────────────────────────────────────────────────
   「ターミナル練習ジム」— 壊れない模擬ターミナルでコマンドを体で覚える
   ねらい: 「黒い画面が怖い」で環境構築前に脱落するのを防ぐ
   完全クライアント動作・AI不要・スマホのタップ入力にも配慮
   ──────────────────────────────────────────────────────────── */

type FsNode =
  | { type: "dir"; children: Record<string, FsNode> }
  | { type: "file"; content: string };

function initialFs(): FsNode {
  return {
    type: "dir",
    children: {
      home: {
        type: "dir",
        children: {
          you: {
            type: "dir",
            children: {
              "readme.txt": { type: "file", content: "ようこそ、ターミナル練習ジムへ！" },
              projects: { type: "dir", children: {} },
            },
          },
        },
      },
    },
  };
}

interface LogLine {
  kind: "input" | "output" | "error" | "success";
  text: string;
}

interface Quest {
  instruction: string;
  hint: string;
  done: (ctx: {
    cmd: string;
    sub?: string;
    args: string[];
    cwd: string[];
    ok: boolean;
  }) => boolean;
}

const QUESTS: Quest[] = [
  {
    instruction: "① 今いる場所(フォルダ)を確認しよう。",
    hint: "pwd",
    done: (c) => c.cmd === "pwd",
  },
  {
    instruction: "② いま居るフォルダの中身を見てみよう。",
    hint: "ls",
    done: (c) => c.cmd === "ls" && c.ok,
  },
  {
    instruction: "③ projects フォルダの中に入ろう。",
    hint: "cd projects",
    done: (c) => c.cwd.join("/") === "home/you/projects",
  },
  {
    instruction: "④ 新しいフォルダ myapp を作ろう。",
    hint: "mkdir myapp",
    done: (c) => c.cmd === "mkdir" && c.args[0] === "myapp" && c.ok,
  },
  {
    instruction: "⑤ 作った myapp の中に入ろう。",
    hint: "cd myapp",
    done: (c) => c.cwd.join("/") === "home/you/projects/myapp",
  },
  {
    instruction: "⑥ ここをGitで管理し始めよう(初期化)。",
    hint: "git init",
    done: (c) => c.cmd === "git" && c.sub === "init" && c.ok,
  },
  {
    instruction: "⑦ 一つ上のフォルダ(projects)に戻ろう。",
    hint: "cd ..",
    done: (c) => c.cwd.join("/") === "home/you/projects",
  },
  {
    instruction: "⑧ メモ用の空ファイル memo.txt を作ろう。",
    hint: "touch memo.txt",
    done: (c) => c.cmd === "touch" && c.args[0] === "memo.txt" && c.ok,
  },
  {
    instruction: "⑨ もう一度 ls で、myapp と memo.txt が見えるか確認しよう。",
    hint: "ls",
    done: (c) => c.cmd === "ls" && c.ok,
  },
];

const HELP = [
  "使えるコマンド:",
  "  pwd            今いる場所を表示",
  "  ls             中身の一覧",
  "  cd <名前>      フォルダに入る (cd .. で一つ上)",
  "  mkdir <名前>   フォルダを作る",
  "  touch <名前>   空ファイルを作る",
  "  cat <ファイル> ファイルの中身を表示",
  "  git init       Gitで管理を開始",
  "  git status     Gitの状態を表示",
  "  clear          画面をきれいにする",
  "  help           このヘルプ",
].join("\n");

function getNode(root: FsNode, path: string[]): FsNode | null {
  let cur: FsNode = root;
  for (const seg of path) {
    if (cur.type !== "dir" || !cur.children[seg]) return null;
    cur = cur.children[seg];
  }
  return cur;
}

function resolve(cwd: string[], arg: string): string[] | null {
  let base: string[];
  if (arg.startsWith("/")) base = [];
  else base = [...cwd];
  const segs = arg.split("/").filter((s) => s.length > 0);
  for (const s of segs) {
    if (s === ".") continue;
    if (s === "..") {
      if (base.length > 0) base.pop();
    } else {
      base.push(s);
    }
  }
  return base;
}

function displayPath(cwd: string[]): string {
  const p = cwd.join("/");
  if (p === "home/you") return "~";
  if (p.startsWith("home/you/")) return "~/" + p.slice("home/you/".length);
  return "/" + p;
}

export function TerminalGym() {
  const [fs, setFs] = useState<FsNode>(initialFs);
  const [cwd, setCwd] = useState<string[]>(["home", "you"]);
  const [log, setLog] = useState<LogLine[]>([
    { kind: "output", text: "ようこそ！ここは壊れない練習用のターミナルです。" },
    { kind: "output", text: "下の指示どおりにコマンドを打ってみましょう。困ったら help と打つと一覧が出ます。" },
  ]);
  const [input, setInput] = useState("");
  const [questIdx, setQuestIdx] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [log]);

  const append = (lines: LogLine[]) => setLog((l) => [...l, ...lines]);

  const run = (raw: string) => {
    const line = raw.trim();
    if (!line) return;
    const out: LogLine[] = [
      { kind: "input", text: `${displayPath(cwd)} $ ${line}` },
    ];
    const tokens = line.split(/\s+/);
    const cmd = tokens[0];
    const args = tokens.slice(1);
    let ok = false;
    let sub: string | undefined;
    let nextCwd = cwd;
    let nextFs = fs;

    const cwdNode = getNode(fs, cwd);

    if (cmd === "help") {
      out.push({ kind: "output", text: HELP });
      ok = true;
    } else if (cmd === "clear") {
      setLog([]);
      setInput("");
      return;
    } else if (cmd === "pwd") {
      out.push({ kind: "output", text: "/" + cwd.join("/") });
      ok = true;
    } else if (cmd === "ls") {
      const targetPath = args[0] ? resolve(cwd, args[0]) : cwd;
      const node = targetPath ? getNode(fs, targetPath) : null;
      if (!node) {
        out.push({ kind: "error", text: `ls: '${args[0]}' が見つかりません` });
      } else if (node.type === "file") {
        out.push({ kind: "output", text: args[0] });
        ok = true;
      } else {
        const names = Object.entries(node.children).map(([n, v]) =>
          v.type === "dir" ? n + "/" : n
        );
        out.push({
          kind: "output",
          text: names.length ? names.join("   ") : "(空っぽです)",
        });
        ok = true;
      }
    } else if (cmd === "cd") {
      const arg = args[0] ?? "/home/you";
      const targetPath = resolve(cwd, arg);
      const node = targetPath ? getNode(fs, targetPath) : null;
      if (!node) {
        out.push({ kind: "error", text: `cd: '${arg}' というフォルダはありません` });
      } else if (node.type !== "dir") {
        out.push({ kind: "error", text: `cd: '${arg}' はフォルダではありません` });
      } else {
        nextCwd = targetPath as string[];
        ok = true;
      }
    } else if (cmd === "mkdir" || cmd === "touch") {
      const name = args[0];
      if (!name) {
        out.push({ kind: "error", text: `${cmd}: 名前を指定してください (例: ${cmd} myapp)` });
      } else if (name.includes("/")) {
        out.push({ kind: "error", text: `${cmd}: ここでは単純な名前だけにしましょう` });
      } else if (!cwdNode || cwdNode.type !== "dir") {
        out.push({ kind: "error", text: `${cmd}: 今の場所に作れません` });
      } else if (cwdNode.children[name]) {
        out.push({ kind: "error", text: `${cmd}: '${name}' はすでに存在します` });
      } else {
        const clone = structuredCloneFs(fs);
        const parent = getNode(clone, cwd) as { type: "dir"; children: Record<string, FsNode> };
        parent.children[name] =
          cmd === "mkdir"
            ? { type: "dir", children: {} }
            : { type: "file", content: "" };
        nextFs = clone;
        ok = true;
      }
    } else if (cmd === "cat") {
      const targetPath = args[0] ? resolve(cwd, args[0]) : null;
      const node = targetPath ? getNode(fs, targetPath) : null;
      if (!node) {
        out.push({ kind: "error", text: `cat: '${args[0] ?? ""}' が見つかりません` });
      } else if (node.type !== "file") {
        out.push({ kind: "error", text: `cat: '${args[0]}' はフォルダです` });
      } else {
        out.push({ kind: "output", text: node.content || "(空のファイルです)" });
        ok = true;
      }
    } else if (cmd === "git") {
      sub = args[0];
      if (sub === "init") {
        if (!cwdNode || cwdNode.type !== "dir") {
          out.push({ kind: "error", text: "git init: 今の場所では初期化できません" });
        } else if (cwdNode.children[".git"]) {
          out.push({ kind: "output", text: "すでにGitリポジトリです。" });
          ok = true;
        } else {
          const clone = structuredCloneFs(fs);
          const parent = getNode(clone, cwd) as { type: "dir"; children: Record<string, FsNode> };
          parent.children[".git"] = { type: "dir", children: {} };
          nextFs = clone;
          out.push({
            kind: "output",
            text: `空のGitリポジトリを作りました (${displayPath(cwd)}/.git)`,
          });
          ok = true;
        }
      } else if (sub === "status") {
        const isRepo = cwdNode && cwdNode.type === "dir" && !!cwdNode.children[".git"];
        out.push({
          kind: "output",
          text: isRepo
            ? "On branch main\nまだ何もコミットしていません。"
            : "fatal: ここはGitリポジトリではありません (git init を先に)",
        });
        ok = !!isRepo;
      } else {
        out.push({ kind: "output", text: `git: この練習では init と status だけ使えます` });
      }
    } else {
      out.push({
        kind: "error",
        text: `'${cmd}' というコマンドは見つかりません。help で一覧が見られます。`,
      });
    }

    if (nextFs !== fs) setFs(nextFs);
    if (nextCwd !== cwd) setCwd(nextCwd);

    // クエスト判定
    if (!allDone) {
      const q = QUESTS[questIdx];
      if (q && q.done({ cmd, sub, args, cwd: nextCwd, ok })) {
        if (questIdx + 1 >= QUESTS.length) {
          out.push({ kind: "success", text: "🎉 全ミッション クリア！ もう黒い画面は怖くない。" });
          setAllDone(true);
        } else {
          out.push({ kind: "success", text: "✅ ミッション達成！ 次へ進みます。" });
          setQuestIdx((i) => i + 1);
          setShowHint(false);
        }
      }
    }

    append(out);
    setInput("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    run(input);
  };

  const restart = () => {
    setFs(initialFs());
    setCwd(["home", "you"]);
    setLog([
      { kind: "output", text: "リセットしました。もう一度どうぞ！" },
    ]);
    setInput("");
    setQuestIdx(0);
    setShowHint(false);
    setAllDone(false);
  };

  const quest = QUESTS[questIdx];

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-4">
        <p className="mb-1 text-sm font-bold text-accent">ターミナル練習ジム 🏋️</p>
        <h1 className="text-2xl font-bold text-ink">「黒い画面」に慣れよう</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
          ここは壊れない練習用のターミナルです。何を打っても本物のPCには影響しません。
          安心して、指示どおりにコマンドを打ってみましょう。
        </p>
      </header>

      {/* ミッション */}
      <div className="mb-3 rounded-2xl border border-base-border bg-base-surface p-4 shadow-sm">
        <div className="mb-1.5 flex items-center justify-between">
          <p className="text-xs font-bold text-ink-faint">
            ミッション {Math.min(questIdx + 1, QUESTS.length)} / {QUESTS.length}
          </p>
          <div className="flex gap-1">
            {QUESTS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-4 rounded-full ${
                  i < questIdx || allDone ? "bg-good" : i === questIdx ? "bg-brand" : "bg-base-border"
                }`}
              />
            ))}
          </div>
        </div>
        {allDone ? (
          <p className="text-sm font-bold text-good">🎉 全ミッション クリア！おつかれさま。</p>
        ) : (
          <>
            <p className="text-sm font-bold text-ink">{quest.instruction}</p>
            <button
              onClick={() => setShowHint((s) => !s)}
              className="mt-1.5 text-xs font-bold text-brand underline underline-offset-2"
            >
              {showHint ? "ヒントを隠す" : "ヒントを見る"}
            </button>
            {showHint && (
              <p className="mt-1 rounded-lg bg-base-bg px-3 py-2 font-mono text-sm text-ink-soft">
                {quest.hint}
              </p>
            )}
          </>
        )}
      </div>

      {/* ターミナル */}
      <div className="overflow-hidden rounded-2xl border border-base-border shadow-sm">
        <div className="flex items-center gap-2 bg-ink px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-bad" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="h-2.5 w-2.5 rounded-full bg-good" />
          <span className="ml-2 text-xs font-medium text-white/50">練習用ターミナル</span>
        </div>
        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="h-72 overflow-y-auto bg-ink px-4 py-3 font-mono text-[13px] leading-relaxed"
        >
          {log.map((l, i) => (
            <p
              key={i}
              className={`whitespace-pre-wrap break-words ${
                l.kind === "input"
                  ? "text-white"
                  : l.kind === "error"
                  ? "text-red-300"
                  : l.kind === "success"
                  ? "text-emerald-300"
                  : "text-white/70"
              }`}
            >
              {l.text}
            </p>
          ))}
          <form onSubmit={onSubmit} className="mt-1 flex items-center gap-2">
            <span className="shrink-0 text-emerald-300">{displayPath(cwd)} $</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              aria-label="コマンド入力"
              className="min-w-0 flex-1 bg-transparent text-white outline-none"
            />
          </form>
        </div>
      </div>

      {/* スマホ用クイック入力 */}
      <div className="mt-3 flex flex-wrap gap-2">
        {["pwd", "ls", "cd ..", "help", "clear"].map((c) => (
          <button
            key={c}
            onClick={() => {
              run(c);
              inputRef.current?.focus();
            }}
            className="rounded-lg border border-base-border bg-base-surface px-3 py-1.5 font-mono text-xs text-ink-soft transition-colors hover:border-brand active:scale-95"
          >
            {c}
          </button>
        ))}
        <button
          onClick={restart}
          className="ml-auto rounded-lg border border-base-border bg-base-surface px-3 py-1.5 text-xs font-bold text-ink-soft transition-colors hover:border-accent"
        >
          🔄 最初から
        </button>
      </div>

      <div className="mt-6 rounded-2xl border-l-4 border-brand bg-brand-bg p-4">
        <p className="text-sm leading-relaxed text-ink-soft">
          <strong className="text-brand">黒い画面は「命令の入口」。</strong>{" "}
          cd で移動、ls で確認、mkdir で作る——この数個を知るだけで怖くなくなります。
          本物のコマンドが分からなくなったら、<strong>そのままAIに「このコマンドの意味を教えて」</strong>と聞けばOK。
        </p>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-base-border pt-5 text-sm font-bold text-brand">
        <Link href="/git" className="underline underline-offset-2">
          Gitコースへ進む →
        </Link>
        <Link href="/vibe" className="underline underline-offset-2">
          ↑ 総論のトップへ
        </Link>
      </div>
    </div>
  );
}

// 簡易ディープコピー(この練習FSはJSONで表せる範囲)
function structuredCloneFs(node: FsNode): FsNode {
  return JSON.parse(JSON.stringify(node));
}
