// =====================================================================
// アプリ全体で共有する型定義
// データ(src/data/)と画面(src/app/, src/components/)の契約となる中心的なファイル
// =====================================================================

// ------------------------------------------------------------------
// レッスン本文を構成するコンテンツブロック
// 長文の技術解説を、意味のある単位で構造化して持つ
// ------------------------------------------------------------------

/** 見出し(レッスン内のセクション区切り) */
export interface HeadingBlock {
  type: "heading";
  text: string;
}

/**
 * 段落。text 内に [[term-slug]] と書くと、用語集の該当語へのリンクになり、
 * クリックでモーダル解説が開く。
 */
export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

/** コード例(シンタックスハイライト付きで表示。写経用ではなく読解用) */
export interface CodeBlock {
  type: "code";
  language: string;
  code: string;
  caption?: string;
}

/**
 * 補足ボックス。
 * - why      : 「なぜそう設計するのか」の理由
 * - interview: 「面接ではこう言う」という言い換え例
 * - warn     : 落とし穴・アンチパターンへの注意
 * - info     : 補足知識
 */
export type CalloutVariant = "why" | "interview" | "warn" | "info";

export interface CalloutBlock {
  type: "callout";
  variant: CalloutVariant;
  title?: string;
  text: string;
}

/** 箇条書き */
export interface ListBlock {
  type: "list";
  ordered?: boolean;
  items: string[];
}

/** 悪い例 / 良い例 の対比表示 */
export interface CompareSide {
  label?: string;
  text?: string;
  code?: string;
  language?: string;
}

export interface CompareBlock {
  type: "compare";
  bad: CompareSide;
  good: CompareSide;
}

export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | CodeBlock
  | CalloutBlock
  | ListBlock
  | CompareBlock;

// ------------------------------------------------------------------
// 理解度チェックの設問
// ------------------------------------------------------------------

/** 4択問題 */
export interface ChoiceQuestion {
  id: string;
  type: "choice";
  question: string;
  choices: string[];
  answerIndex: number;
  /** なぜその選択肢が正解なのか */
  explanation: string;
}

/** 記述式(自己採点)問題 */
export interface FreeQuestion {
  id: string;
  type: "free";
  question: string;
  /** 模範解答 */
  modelAnswer: string;
  /** 面接での言い換え例 */
  interviewPhrase: string;
  /** 自己採点の観点(この語に触れられていれば加点、など) */
  keywords?: string[];
}

export type Question = ChoiceQuestion | FreeQuestion;

// ------------------------------------------------------------------
// カリキュラム(7日間)
// ------------------------------------------------------------------

export interface Lesson {
  /** グローバルに一意なID。例: "day1-lesson2" */
  id: string;
  /** URLに使うスラッグ。例: "mvc" */
  slug: string;
  title: string;
  /** サイドバー・一覧に出す一行要約 */
  summary: string;
  blocks: ContentBlock[];
  questions: Question[];
}

export interface Day {
  day: number; // 1..7
  slug: string; // "day1"
  title: string;
  /** このDayを終えたときに説明できるようになるゴール */
  goal: string;
  lessons: Lesson[];
}

// ------------------------------------------------------------------
// 面接想定問答集
// ------------------------------------------------------------------

export type InterviewCategory =
  | "design" // 設計思想
  | "responsibility" // 責務分離
  | "database" // DB設計
  | "performance" // 性能
  | "team" // チーム開発
  | "experience"; // 自己経験

export interface InterviewQuestion {
  id: string;
  category: InterviewCategory;
  question: string;
  /** NG回答例 */
  ngAnswer: string;
  /** 加点される回答例 */
  goodAnswer: string;
  /** なぜ差がつくのか */
  whyDiffers: string;
  /** 関連する用語集のスラッグ */
  relatedTerms?: string[];
}

// ------------------------------------------------------------------
// 実務用語集
// ------------------------------------------------------------------

export type GlossaryCategory =
  | "design" // 設計・思想
  | "database" // DB
  | "performance" // 性能
  | "team" // チーム開発
  | "laravel" // Laravel機能
  | "python" // Python文法・基礎
  | "ai" // AI・LLM関連
  | "typescript" // TypeScript型・言語
  | "react" // React/Next.js
  | "basics" // 言語共通の基礎
  | "web"; // HTML/CSS

export interface GlossaryTerm {
  /** [[term-slug]] で参照されるキー。例: "n-plus-one" */
  slug: string;
  term: string;
  /** 読み(任意) */
  reading?: string;
  category: GlossaryCategory;
  /** 意味の説明 */
  meaning: string;
  /** 面接での使い方の例文 */
  interviewExample: string;
  /** 関連語のスラッグ */
  related?: string[];
}
