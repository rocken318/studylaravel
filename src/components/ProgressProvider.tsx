"use client";

// =====================================================================
// 学習進捗・回答を localStorage に永続化する Context Provider
// 完了チェック / 4択の正誤 / 記述式の自己採点 / 想定Q&Aの自分の回答 / 暗記の習得 を保持
// =====================================================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "laravel-bootcamp-v1";

export interface QuizResult {
  answered: boolean;
  /** 4択で選んだ番号 */
  selectedIndex?: number;
  /** 4択の正誤 */
  correct?: boolean;
  /** 記述式の自己採点 */
  selfRating?: "correct" | "wrong";
}

interface StoreState {
  completedLessons: Record<string, boolean>;
  quiz: Record<string, QuizResult>;
  interview: Record<string, string>;
  interviewMastered: Record<string, boolean>;
  /** 学習した日付(YYYY-MM-DD)の一覧。ストリーク算出に使う。 */
  studyDates: string[];
}

const emptyState: StoreState = {
  completedLessons: {},
  quiz: {},
  interview: {},
  interviewMastered: {},
  studyDates: [],
};

/** ローカルタイムの今日を YYYY-MM-DD で返す */
function todayStr(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

interface ProgressContextValue extends StoreState {
  /** localStorage からの読み込みが完了したか(ハイドレーション対策) */
  hydrated: boolean;
  toggleLessonComplete: (lessonId: string) => void;
  isLessonComplete: (lessonId: string) => boolean;
  recordChoice: (questionId: string, selectedIndex: number, correct: boolean) => void;
  recordSelfRating: (questionId: string, rating: "correct" | "wrong") => void;
  saveInterviewAnswer: (questionId: string, text: string) => void;
  toggleInterviewMastered: (questionId: string) => void;
  /** 今日を学習日として記録する(重複はしない) */
  recordActivity: () => void;
  resetAll: () => void;
  /** 現在の学習データをJSON文字列で書き出す(バックアップ用) */
  exportData: () => string;
  /** バックアップJSONを読み込んで状態を復元する */
  importData: (json: string) => { ok: boolean; error?: string };
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(emptyState);
  const [hydrated, setHydrated] = useState(false);

  // 初回マウント時に localStorage から読み込む
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<StoreState>;
        setState({
          completedLessons: parsed.completedLessons ?? {},
          quiz: parsed.quiz ?? {},
          interview: parsed.interview ?? {},
          interviewMastered: parsed.interviewMastered ?? {},
          studyDates: parsed.studyDates ?? [],
        });
      }
    } catch {
      // 壊れたデータは無視して初期状態で続行
    }
    setHydrated(true);
  }, []);

  // state 変更のたびに保存(ハイドレーション後のみ)
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // 保存失敗(容量超過など)は無視
    }
  }, [state, hydrated]);

  // 今日を学習日として記録(重複追加しない)。他のミューテーションからも呼ぶ。
  const stampToday = useCallback((prev: StoreState): StoreState => {
    const today = todayStr();
    if (prev.studyDates.includes(today)) return prev;
    return { ...prev, studyDates: [...prev.studyDates, today] };
  }, []);

  const recordActivity = useCallback(() => {
    setState((prev) => stampToday(prev));
  }, [stampToday]);

  const toggleLessonComplete = useCallback(
    (lessonId: string) => {
      setState((prev) => {
        const next = { ...prev.completedLessons };
        let stamped = prev;
        if (next[lessonId]) {
          delete next[lessonId];
        } else {
          next[lessonId] = true;
          stamped = stampToday(prev); // 完了にしたときだけ学習日を刻む
        }
        return { ...stamped, completedLessons: next };
      });
    },
    [stampToday]
  );

  const isLessonComplete = useCallback(
    (lessonId: string) => Boolean(state.completedLessons[lessonId]),
    [state.completedLessons]
  );

  const recordChoice = useCallback(
    (questionId: string, selectedIndex: number, correct: boolean) => {
      setState((prev) => ({
        ...stampToday(prev),
        quiz: {
          ...prev.quiz,
          [questionId]: { answered: true, selectedIndex, correct },
        },
      }));
    },
    [stampToday]
  );

  const recordSelfRating = useCallback(
    (questionId: string, rating: "correct" | "wrong") => {
      setState((prev) => ({
        ...stampToday(prev),
        quiz: {
          ...prev.quiz,
          [questionId]: { answered: true, selfRating: rating },
        },
      }));
    },
    [stampToday]
  );

  const saveInterviewAnswer = useCallback((questionId: string, text: string) => {
    setState((prev) => ({
      ...prev,
      interview: { ...prev.interview, [questionId]: text },
    }));
  }, []);

  const toggleInterviewMastered = useCallback((questionId: string) => {
    setState((prev) => {
      const next = { ...prev.interviewMastered };
      if (next[questionId]) {
        delete next[questionId];
      } else {
        next[questionId] = true;
      }
      return { ...prev, interviewMastered: next };
    });
  }, []);

  const resetAll = useCallback(() => {
    setState(emptyState);
  }, []);

  const exportData = useCallback(() => {
    const payload = {
      app: "laravel-bootcamp",
      version: 1,
      exportedAt: new Date().toISOString(),
      data: state,
    };
    return JSON.stringify(payload, null, 2);
  }, [state]);

  const importData = useCallback(
    (json: string): { ok: boolean; error?: string } => {
      try {
        const parsed = JSON.parse(json);
        // フル形式(exportData出力)と、data直書きの両方を受け付ける
        const d = parsed?.data ?? parsed;
        if (!d || typeof d !== "object" || Array.isArray(d)) {
          return { ok: false, error: "データ形式が正しくありません。" };
        }

        // --- 各フィールドを型検証してからstateへ流し込む ---
        // 想定外の値は該当フィールドを空にしてフォールバックする(部分的に壊れていても他は活かす)

        // Record<string, boolean> を検証。値がbooleanのキーだけ採用。
        const asBoolRecord = (v: unknown): Record<string, boolean> => {
          if (!v || typeof v !== "object" || Array.isArray(v)) return {};
          const out: Record<string, boolean> = {};
          for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
            if (typeof val === "boolean") out[k] = val;
          }
          return out;
        };

        // Record<string, string> を検証。値がstringのキーだけ採用。
        const asStringRecord = (v: unknown): Record<string, string> => {
          if (!v || typeof v !== "object" || Array.isArray(v)) return {};
          const out: Record<string, string> = {};
          for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
            if (typeof val === "string") out[k] = val;
          }
          return out;
        };

        // Record<string, QuizResult> を検証。QuizResultの形をしている値だけ採用。
        const asQuizRecord = (v: unknown): Record<string, QuizResult> => {
          if (!v || typeof v !== "object" || Array.isArray(v)) return {};
          const out: Record<string, QuizResult> = {};
          for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
            if (!val || typeof val !== "object" || Array.isArray(val)) continue;
            const r = val as Record<string, unknown>;
            if (typeof r.answered !== "boolean") continue;
            const entry: QuizResult = { answered: r.answered };
            if (typeof r.selectedIndex === "number") entry.selectedIndex = r.selectedIndex;
            if (typeof r.correct === "boolean") entry.correct = r.correct;
            if (r.selfRating === "correct" || r.selfRating === "wrong") {
              entry.selfRating = r.selfRating;
            }
            out[k] = entry;
          }
          return out;
        };

        // string[] を検証。文字列要素だけ採用。
        const asStringArray = (v: unknown): string[] =>
          Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];

        setState({
          completedLessons: asBoolRecord(d.completedLessons),
          quiz: asQuizRecord(d.quiz),
          interview: asStringRecord(d.interview),
          interviewMastered: asBoolRecord(d.interviewMastered),
          studyDates: asStringArray(d.studyDates),
        });
        return { ok: true };
      } catch {
        return { ok: false, error: "JSONの読み込みに失敗しました。" };
      }
    },
    []
  );

  const value = useMemo<ProgressContextValue>(
    () => ({
      ...state,
      hydrated,
      toggleLessonComplete,
      isLessonComplete,
      recordChoice,
      recordSelfRating,
      saveInterviewAnswer,
      toggleInterviewMastered,
      recordActivity,
      resetAll,
      exportData,
      importData,
    }),
    [
      state,
      hydrated,
      toggleLessonComplete,
      isLessonComplete,
      recordChoice,
      recordSelfRating,
      saveInterviewAnswer,
      toggleInterviewMastered,
      recordActivity,
      resetAll,
      exportData,
      importData,
    ]
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress は ProgressProvider の内側で使ってください");
  }
  return ctx;
}
