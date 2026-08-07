"use client";

// =====================================================================
// 学習進捗・回答を localStorage に永続化する Context Provider
// 完了チェック / 4択の正誤 / 記述式の自己採点 / 面接の自分の回答 / 暗記の習得 を保持
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
}

const emptyState: StoreState = {
  completedLessons: {},
  quiz: {},
  interview: {},
  interviewMastered: {},
};

interface ProgressContextValue extends StoreState {
  /** localStorage からの読み込みが完了したか(ハイドレーション対策) */
  hydrated: boolean;
  toggleLessonComplete: (lessonId: string) => void;
  isLessonComplete: (lessonId: string) => boolean;
  recordChoice: (questionId: string, selectedIndex: number, correct: boolean) => void;
  recordSelfRating: (questionId: string, rating: "correct" | "wrong") => void;
  saveInterviewAnswer: (questionId: string, text: string) => void;
  toggleInterviewMastered: (questionId: string) => void;
  resetAll: () => void;
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

  const toggleLessonComplete = useCallback((lessonId: string) => {
    setState((prev) => {
      const next = { ...prev.completedLessons };
      if (next[lessonId]) {
        delete next[lessonId];
      } else {
        next[lessonId] = true;
      }
      return { ...prev, completedLessons: next };
    });
  }, []);

  const isLessonComplete = useCallback(
    (lessonId: string) => Boolean(state.completedLessons[lessonId]),
    [state.completedLessons]
  );

  const recordChoice = useCallback(
    (questionId: string, selectedIndex: number, correct: boolean) => {
      setState((prev) => ({
        ...prev,
        quiz: {
          ...prev.quiz,
          [questionId]: { answered: true, selectedIndex, correct },
        },
      }));
    },
    []
  );

  const recordSelfRating = useCallback(
    (questionId: string, rating: "correct" | "wrong") => {
      setState((prev) => ({
        ...prev,
        quiz: {
          ...prev.quiz,
          [questionId]: { answered: true, selfRating: rating },
        },
      }));
    },
    []
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
      resetAll,
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
      resetAll,
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
