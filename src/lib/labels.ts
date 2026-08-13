import type {
  InterviewCategory,
  GlossaryCategory,
  CalloutVariant,
} from "@/types";

export const interviewCategoryLabels: Record<InterviewCategory, string> = {
  design: "設計思想",
  responsibility: "責務分離",
  database: "DB設計",
  performance: "性能",
  team: "チーム開発",
  experience: "自己経験",
};

export const interviewCategoryOrder: InterviewCategory[] = [
  "design",
  "responsibility",
  "database",
  "performance",
  "team",
  "experience",
];

export const glossaryCategoryLabels: Record<GlossaryCategory, string> = {
  design: "設計・思想",
  database: "DB",
  performance: "性能",
  team: "チーム開発",
  laravel: "Laravel機能",
  python: "Python文法・基礎",
  ai: "AI・LLM関連",
  typescript: "TypeScript型・言語",
  react: "React/Next.js",
  basics: "共通の基礎",
};

export const glossaryCategoryOrder: GlossaryCategory[] = [
  "design",
  "laravel",
  "database",
  "performance",
  "team",
];

/** Pythonコースの用語集で使うカテゴリ順 */
export const pythonGlossaryCategoryOrder: GlossaryCategory[] = ["python", "ai"];

/** TypeScriptコースの用語集で使うカテゴリ順 */
export const tsGlossaryCategoryOrder: GlossaryCategory[] = ["typescript", "react"];

/** 基礎コースの用語集で使うカテゴリ順 */
export const basicsGlossaryCategoryOrder: GlossaryCategory[] = ["basics"];

export const calloutMeta: Record<
  CalloutVariant,
  { label: string; className: string; icon: string }
> = {
  why: {
    label: "なぜそう設計するのか",
    className: "border-brand/30 bg-brand-bg",
    icon: "🧭",
  },
  interview: {
    label: "面接ではこう言う",
    className: "border-accent/30 bg-accent-bg",
    icon: "🎤",
  },
  warn: {
    label: "落とし穴",
    className: "border-bad/30 bg-bad-bg",
    icon: "⚠️",
  },
  info: {
    label: "補足",
    className: "border-base-border bg-base-bg",
    icon: "💡",
  },
};
