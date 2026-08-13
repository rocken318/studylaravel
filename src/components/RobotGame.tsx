"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ────────────────────────────────────────────────────────────
   「ロボットにめいれい」— プログラミングの本質を体験する小さなパズル
   ・ロボットは自分で考えない → 命令を順番に並べてゴールへ導く
   ・まちがえたら並べ直して もう一度 ＝ デバッグ
   AI/API不要・完全クライアント動作・スマホのタップ操作向け
   ──────────────────────────────────────────────────────────── */

type Dir = 0 | 1 | 2 | 3; // 0:上 1:右 2:下 3:左
type Cmd = "forward" | "left" | "right";
interface Cell {
  x: number;
  y: number;
}
interface RobotState extends Cell {
  dir: Dir;
}
interface Stage {
  title: string;
  hint: string;
  cols: number;
  rows: number;
  start: RobotState;
  goal: Cell;
  walls: Cell[];
}

const VEC: Record<Dir, [number, number]> = {
  0: [0, -1],
  1: [1, 0],
  2: [0, 1],
  3: [-1, 0],
};

// BFSで解けることを検証済みのステージ (min: 3 / 6 / 11 / 21)
const STAGES: Stage[] = [
  {
    title: "まっすぐ すすもう",
    hint: "「まえ」を3回ならべて、ゴールまで まっすぐ。ならべたら ▶ さいごに「じっこう」！",
    cols: 5,
    rows: 5,
    start: { x: 2, y: 4, dir: 0 },
    goal: { x: 2, y: 1 },
    walls: [],
  },
  {
    title: "まがって みよう",
    hint: "まっすぐだけじゃ とどかない。「みぎ」で むきをかえてから すすもう。",
    cols: 5,
    rows: 5,
    start: { x: 1, y: 4, dir: 0 },
    goal: { x: 3, y: 1 },
    walls: [],
  },
  {
    title: "かべを よけよう",
    hint: "🧱かべ には ぶつかれない。まわりみちを 考えて ならべよう。",
    cols: 5,
    rows: 5,
    start: { x: 0, y: 4, dir: 1 },
    goal: { x: 4, y: 4 },
    walls: [
      { x: 2, y: 4 },
      { x: 2, y: 3 },
    ],
  },
  {
    title: "めいろに ちょうせん！",
    hint: "くねくね めいろ。あわてず、1つずつ めいれいを ならべよう。クリアできたら きみは プログラマー！",
    cols: 5,
    rows: 5,
    start: { x: 0, y: 4, dir: 0 },
    goal: { x: 4, y: 0 },
    walls: [
      { x: 0, y: 3 },
      { x: 1, y: 3 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 1 },
    ],
  },
];

const CMD_META: Record<Cmd, { label: string; icon: string }> = {
  forward: { label: "まえ", icon: "⬆️" },
  left: { label: "ひだり", icon: "↺" },
  right: { label: "みぎ", icon: "↻" },
};

type RunResult = "win" | "hitwall" | "outside" | "incomplete";

/** 命令列を実行して、各ステップのロボット状態(フレーム)と結果を返す */
function simulate(
  stage: Stage,
  program: Cmd[]
): { frames: RobotState[]; result: RunResult } {
  const isBlocked = (x: number, y: number) =>
    x < 0 ||
    y < 0 ||
    x >= stage.cols ||
    y >= stage.rows ||
    stage.walls.some((w) => w.x === x && w.y === y);

  let s: RobotState = { ...stage.start };
  const frames: RobotState[] = [{ ...s }];

  for (const cmd of program) {
    if (cmd === "left") {
      s = { ...s, dir: ((s.dir + 3) % 4) as Dir };
      frames.push({ ...s });
      continue;
    }
    if (cmd === "right") {
      s = { ...s, dir: ((s.dir + 1) % 4) as Dir };
      frames.push({ ...s });
      continue;
    }
    // forward
    const [dx, dy] = VEC[s.dir];
    const nx = s.x + dx;
    const ny = s.y + dy;
    if (isBlocked(nx, ny)) {
      const outside = nx < 0 || ny < 0 || nx >= stage.cols || ny >= stage.rows;
      return { frames, result: outside ? "outside" : "hitwall" };
    }
    s = { ...s, x: nx, y: ny };
    frames.push({ ...s });
    if (s.x === stage.goal.x && s.y === stage.goal.y) {
      return { frames, result: "win" };
    }
  }
  return { frames, result: "incomplete" };
}

export function RobotGame() {
  const [stageIdx, setStageIdx] = useState(0);
  const [program, setProgram] = useState<Cmd[]>([]);
  const [robot, setRobot] = useState<RobotState>({ ...STAGES[0].start });
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState<"idle" | RunResult>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const stage = STAGES[stageIdx];
  const isLast = stageIdx === STAGES.length - 1;

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const resetStage = useCallback(
    (idx: number) => {
      clearTimers();
      setProgram([]);
      setRobot({ ...STAGES[idx].start });
      setRunning(false);
      setStatus("idle");
    },
    [clearTimers]
  );

  useEffect(() => () => clearTimers(), [clearTimers]);

  const addCmd = (cmd: Cmd) => {
    if (running) return;
    if (status !== "idle") {
      // 実行後にいじり始めたら盤面を初期化
      setRobot({ ...stage.start });
      setStatus("idle");
    }
    setProgram((p) => (p.length >= 30 ? p : [...p, cmd]));
  };

  const undo = () => {
    if (running) return;
    setProgram((p) => p.slice(0, -1));
    setRobot({ ...stage.start });
    setStatus("idle");
  };

  const clearAll = () => {
    if (running) return;
    resetStage(stageIdx);
  };

  const run = () => {
    if (running || program.length === 0) return;
    clearTimers();
    setRobot({ ...stage.start });
    setStatus("idle");
    setRunning(true);

    const { frames, result } = simulate(stage, program);
    const STEP = 480;

    frames.forEach((f, i) => {
      const t = setTimeout(() => setRobot(f), i * STEP);
      timers.current.push(t);
    });
    const end = setTimeout(() => {
      setRunning(false);
      setStatus(result);
    }, frames.length * STEP + 120);
    timers.current.push(end);
  };

  const nextStage = () => {
    const n = Math.min(stageIdx + 1, STAGES.length - 1);
    setStageIdx(n);
    resetStage(n);
  };

  // セル1マスの大きさ(%)
  const cellPct = 100 / stage.cols;
  const cellPctY = 100 / stage.rows;

  const cells = [];
  for (let y = 0; y < stage.rows; y++) {
    for (let x = 0; x < stage.cols; x++) {
      const wall = stage.walls.some((w) => w.x === x && w.y === y);
      const goal = stage.goal.x === x && stage.goal.y === y;
      cells.push(
        <div
          key={`${x}-${y}`}
          className={`flex items-center justify-center text-xl ${
            wall ? "bg-ink/80" : "bg-base-bg"
          }`}
          style={{ outline: "2px solid var(--cellline)" }}
        >
          {goal && !wall ? "🎯" : wall ? "🧱" : ""}
        </div>
      );
    }
  }

  const won = status === "win";
  const failed =
    status === "hitwall" || status === "outside" || status === "incomplete";
  const failMsg =
    status === "hitwall"
      ? "🧱 かべに ぶつかっちゃった！"
      : status === "outside"
      ? "😵 そとに でちゃった！"
      : "🤔 ゴールに とどかなかった…";

  return (
    <div className="mx-auto max-w-md" style={{ ["--cellline" as string]: "#e7e2d9" }}>
      {/* ヘッダー */}
      <header className="mb-4">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-sm font-bold text-accent">
            ステージ {stageIdx + 1} / {STAGES.length}
          </p>
          <div className="flex gap-1">
            {STAGES.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-6 rounded-full ${
                  i < stageIdx ? "bg-good" : i === stageIdx ? "bg-brand" : "bg-base-border"
                }`}
              />
            ))}
          </div>
        </div>
        <h1 className="text-2xl font-bold text-ink">{stage.title}</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{stage.hint}</p>
      </header>

      {/* 盤面 */}
      <div
        className="relative mb-4 w-full overflow-hidden rounded-2xl border border-base-border shadow-sm"
        style={{ aspectRatio: `${stage.cols} / ${stage.rows}` }}
      >
        <div
          className="grid h-full w-full"
          style={{
            gridTemplateColumns: `repeat(${stage.cols}, 1fr)`,
            gridTemplateRows: `repeat(${stage.rows}, 1fr)`,
          }}
        >
          {cells}
        </div>

        {/* ロボット */}
        <div
          className="pointer-events-none absolute flex items-center justify-center"
          style={{
            width: `${cellPct}%`,
            height: `${cellPctY}%`,
            left: `${robot.x * cellPct}%`,
            top: `${robot.y * cellPctY}%`,
            transform: `rotate(${robot.dir * 90}deg)`,
            transition: "left 0.42s ease, top 0.42s ease, transform 0.42s ease",
          }}
        >
          <div className="relative flex h-[74%] w-[74%] items-center justify-center rounded-xl bg-brand text-lg shadow-md">
            {/* 向きを示す三角(上向き基準) */}
            <span
              aria-hidden
              className="absolute -top-1 text-[10px] leading-none text-brand"
              style={{ filter: "drop-shadow(0 0 1px #fff)" }}
            >
              ▲
            </span>
            <span aria-hidden>🤖</span>
          </div>
        </div>

        {/* 結果オーバーレイ */}
        {(won || failed) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/55 p-4 text-center backdrop-blur-sm animate-fade-in">
            {won ? (
              <>
                <p className="text-4xl">🎉</p>
                <p className="text-xl font-bold text-white">
                  {isLast ? "ぜんぶ クリア！" : "クリア！"}
                </p>
                {isLast && (
                  <p className="text-sm text-white/85">
                    きみは「順番に めいれいする力」を つかいこなした。
                    <br />
                    これが プログラミングの 第一歩！
                  </p>
                )}
                <div className="mt-1 flex flex-wrap justify-center gap-2">
                  {!isLast ? (
                    <button
                      onClick={nextStage}
                      className="rounded-full bg-white px-6 py-3 text-sm font-bold text-brand"
                    >
                      つぎのステージへ →
                    </button>
                  ) : (
                    <Link
                      href="/vibe#kids"
                      className="rounded-full bg-white px-6 py-3 text-sm font-bold text-brand"
                    >
                      解説にもどる
                    </Link>
                  )}
                  <button
                    onClick={() => resetStage(stageIdx)}
                    className="rounded-full border border-white/60 px-6 py-3 text-sm font-bold text-white"
                  >
                    もう一度
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-lg font-bold text-white">{failMsg}</p>
                <p className="text-sm text-white/85">
                  だいじょうぶ。めいれいを 直して もう一度！
                  <br />
                  <span className="text-white/70">（これが「デバッグ」だよ）</span>
                </p>
                <button
                  onClick={() => {
                    setRobot({ ...stage.start });
                    setStatus("idle");
                  }}
                  className="mt-1 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand"
                >
                  ならべ直す
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* プログラム(命令のならび) */}
      <div className="mb-3 min-h-[54px] rounded-2xl border border-base-border bg-base-surface p-3">
        <div className="mb-1.5 flex items-center justify-between">
          <p className="text-xs font-bold text-ink-faint">きみのプログラム</p>
          <p className="text-xs text-ink-faint">{program.length} こ</p>
        </div>
        {program.length === 0 ? (
          <p className="py-1 text-sm text-ink-faint">
            ↓ ボタンを おして めいれいを ならべよう
          </p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {program.map((c, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded-lg bg-brand-bg px-2 py-1 text-sm font-bold text-brand"
              >
                <span className="text-xs text-ink-faint">{i + 1}</span>
                {CMD_META[c].icon}
                <span className="text-xs">{CMD_META[c].label}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 命令ボタン */}
      <div className="mb-3 grid grid-cols-3 gap-2">
        {(["left", "forward", "right"] as Cmd[]).map((c) => (
          <button
            key={c}
            onClick={() => addCmd(c)}
            disabled={running}
            className="flex flex-col items-center gap-1 rounded-2xl border border-base-border bg-base-surface py-4 text-ink shadow-sm transition-colors hover:border-brand active:scale-95 disabled:opacity-40"
          >
            <span aria-hidden className="text-2xl">
              {CMD_META[c].icon}
            </span>
            <span className="text-sm font-bold">{CMD_META[c].label}</span>
          </button>
        ))}
      </div>

      {/* 操作ボタン */}
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={undo}
          disabled={running || program.length === 0}
          className="rounded-xl border border-base-border bg-base-surface py-3 text-sm font-bold text-ink-soft transition-colors hover:border-accent disabled:opacity-40"
        >
          ⌫ ひとつ
        </button>
        <button
          onClick={clearAll}
          disabled={running || program.length === 0}
          className="rounded-xl border border-base-border bg-base-surface py-3 text-sm font-bold text-ink-soft transition-colors hover:border-accent disabled:opacity-40"
        >
          🗑️ ぜんぶ
        </button>
        <button
          onClick={run}
          disabled={running || program.length === 0}
          className="col-span-2 rounded-xl bg-brand py-3 text-sm font-bold text-white transition-colors hover:bg-brand/90 active:scale-95 disabled:opacity-40"
        >
          {running ? "じっこう中…" : "▶ じっこう"}
        </button>
      </div>

      {/* これがプログラミング、の一言 */}
      <div className="mt-6 rounded-2xl border-l-4 border-brand bg-brand-bg p-4">
        <p className="text-sm leading-relaxed text-ink-soft">
          <strong className="text-brand">これがプログラミング！</strong>{" "}
          ロボットは自分で考えないから、「まえ・みぎ…」と
          <strong>順番どおり ぜんぶ</strong>めいれいする。まちがえたら 直して もう一度＝
          <strong>デバッグ</strong>。むずかしい言葉を おぼえなくても、きみはもう
          「段取りを 組み立てる」体験を したんだよ。
        </p>
      </div>

      <div className="mt-4 text-center">
        <Link href="/vibe#kids" className="text-sm font-bold text-brand underline underline-offset-2">
          ← 総論「もっと分かりやすく」にもどる
        </Link>
      </div>
    </div>
  );
}
