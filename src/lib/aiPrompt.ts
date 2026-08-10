// =====================================================================
// 「AIに聞く」用のプロンプト生成と、外部AIを開くURLの組み立て
// バックエンド・APIキー不要。ChatGPT / Claude を新タブで開き、質問文を事前入力する。
// =====================================================================

export type AiProvider = "chatgpt" | "claude";

export const aiProviderLabels: Record<AiProvider, string> = {
  chatgpt: "ChatGPT",
  claude: "Claude",
};

/** プロンプト生成の入力パターン */
export type AiPromptInput =
  | { kind: "lesson"; lessonTitle: string; dayTitle: string }
  | { kind: "free"; question: string; modelAnswer: string }
  | { kind: "interview"; question: string; category: string }
  | { kind: "glossary"; term: string; meaning: string };

const beginnerPreface =
  "私はPHPとLaravelをこれから学ぶ初心者で、Laravelを使ったチーム開発の面接を受けます。";

/** 文脈に応じた質問文(プロンプト)を組み立てる */
export function buildPrompt(input: AiPromptInput): string {
  switch (input.kind) {
    case "lesson":
      return (
        `${beginnerPreface}\n\n` +
        `いま「${input.dayTitle}」の中の「${input.lessonTitle}」を学んでいます。\n` +
        `この単元について、次の観点で初心者にもわかるように教えてください。\n` +
        `1) まず身近な例えで直感的に\n` +
        `2) なぜLaravelがそう設計されているのか(理由・メリット)\n` +
        `3) ありがちな誤解・アンチパターン\n` +
        `4) 面接で聞かれたときの、そのまま話せる言い換え例(60秒程度)\n` +
        `最後に、理解を確かめる質問を1つ出してください。`
      );
    case "free":
      return (
        `${beginnerPreface}\n\n` +
        `次の質問に自分なりに答える練習をしています。\n` +
        `【質問】${input.question}\n\n` +
        `【参考にしている模範解答】${input.modelAnswer}\n\n` +
        `この模範解答のポイントを噛み砕いて解説したうえで、` +
        `私が面接で自分の言葉として話すための言い換え例を2パターン作ってください。` +
        `専門用語には短い補足をつけてください。`
      );
    case "interview":
      return (
        `${beginnerPreface}\n\n` +
        `面接カテゴリ「${input.category}」の想定質問です。\n` +
        `【質問】${input.question}\n\n` +
        `この質問で面接官が本当に見ているポイントを説明し、` +
        `減点されるNG回答と、設計意図まで語れる加点回答を対比で示してください。` +
        `最後に、私が話す想定で60秒の回答例を作ってください。`
      );
    case "glossary":
      return (
        `${beginnerPreface}\n\n` +
        `「${input.term}」という用語を、面接で説明できるようになりたいです。\n` +
        `【いまの理解】${input.meaning}\n\n` +
        `この用語を、身近な例えと具体的なLaravelでの使いどころを交えて解説し、` +
        `面接でそのまま言える一文の言い換え例も作ってください。`
      );
    default:
      return beginnerPreface;
  }
}

/** 指定プロバイダのチャットを、質問文を事前入力した状態で開くURL */
export function buildAiUrl(provider: AiProvider, prompt: string): string {
  const q = encodeURIComponent(prompt);
  switch (provider) {
    case "chatgpt":
      return `https://chatgpt.com/?q=${q}`;
    case "claude":
      return `https://claude.ai/new?q=${q}`;
    default:
      return `https://chatgpt.com/?q=${q}`;
  }
}
