import type { GlossaryTerm } from "@/types";

// 「初めてのPython」の用語集。category は "python"(文法・基礎) と "ai"(AI/LLM関連)。
// interviewExample は「実務での使い方の一言」として書く。
export const pythonGlossary: GlossaryTerm[] = [
  // ── python: 文法・基礎 ────────────────────────────────
  {
    slug: "variable",
    term: "変数",
    reading: "へんすう",
    category: "python",
    meaning:
      "データにつける「名前つきの箱」のこと。name = \"太郎\" のように書くと、name という名前で値を後から呼び出せます。プログラムは基本的に「箱に入れて、取り出して、加工する」の繰り返しで、その最小単位が変数です。",
    interviewExample:
      "設定値やAPIキーなど、後で使い回す値は変数にまとめておくと、変更が一箇所で済んで安全です。",
    related: ["f-string", "list", "dict"],
  },
  {
    slug: "f-string",
    term: "f-string",
    reading: "エフストリング",
    category: "python",
    meaning:
      "文字列の中に変数の値を埋め込む書き方。f\"こんにちは {name} さん\" のように、先頭に f をつけて {} の中に変数を書きます。文字列の連結より読みやすく、値の差し込みが直感的です。",
    interviewExample:
      "ログや出力メッセージを組み立てるときは、f-stringで変数を埋め込むと読みやすく書けます。",
    related: ["variable"],
  },
  {
    slug: "list",
    term: "リスト",
    reading: "list",
    category: "python",
    meaning:
      "複数の値を「順番に」まとめて持つ入れ物。[\"a\", \"b\", \"c\"] のように角括弧で書き、番号(インデックス)で取り出します。AIやAPIの出力を1件ずつ処理するとき、ほぼ必ず登場します。",
    interviewExample:
      "取得したデータを一覧として扱うときはリストに入れ、for文で1件ずつ処理します。",
    related: ["dict", "json", "loop"],
  },
  {
    slug: "dict",
    term: "辞書",
    reading: "ディクショナリ",
    category: "python",
    meaning:
      "「キー」と「値」のペアでデータを持つ入れ物。{\"name\": \"太郎\", \"age\": 20} のように書き、キーを指定して値を取り出します。APIやAIの入出力(JSON)は、この辞書とリストの組み合わせでできています。",
    interviewExample:
      "APIのレスポンスは辞書で返ることが多いので、必要なキーを指定して値を取り出します。",
    related: ["list", "json"],
  },
  {
    slug: "loop",
    term: "ループ",
    reading: "繰り返し",
    category: "python",
    meaning:
      "同じ処理を繰り返す仕組み。for はリストなどを1件ずつ、while は条件が成り立つ間ずっと繰り返します。手作業でコピペするような処理を、少ない行数で正確に回せます。",
    interviewExample:
      "一覧データの各要素に同じ処理をするときはfor文で回し、コードの重複を避けます。",
    related: ["list", "indentation"],
  },
  {
    slug: "indentation",
    term: "インデント",
    reading: "字下げ",
    category: "python",
    meaning:
      "行頭の空白(字下げ)。Pythonでは見た目の整えではなく「どこからどこまでが1つのまとまりか」を表す文法そのものです。if や for の中身は必ず一段下げます。ずれると動作が変わる・エラーになるため、初学者がつまずきやすい点です。",
    interviewExample:
      "Pythonはインデントでブロックを表すので、字下げの深さを揃えることを常に意識します。",
    related: ["loop"],
  },
  {
    slug: "function",
    term: "関数",
    reading: "かんすう",
    category: "python",
    meaning:
      "処理を「入力→出力」の部品としてまとめたもの。def で定義し、引数を受け取って戻り値を返します。同じ処理を何度も書かずに済み、名前をつけることで「何をするか」が読みやすくなります。",
    interviewExample:
      "繰り返し使う処理は関数に切り出し、入力と出力を明確にしてテストしやすくします。",
    related: ["module"],
  },
  {
    slug: "module",
    term: "モジュール／ライブラリ",
    reading: "module",
    category: "python",
    meaning:
      "誰かが作った便利な機能の部品集を import で読み込んで使う仕組み。標準で付属するものや、pip で追加できるもの(例: requests)があります。車輪の再発明を避け、実績あるコードに乗れます。",
    interviewExample:
      "定番の処理は自作せず、実績あるライブラリをimportして使うことで品質と速度を両立します。",
    related: ["function", "api"],
  },
  {
    slug: "exception",
    term: "例外／try-except",
    reading: "れいがい",
    category: "python",
    meaning:
      "処理の途中で起きた失敗(例外)を、プログラムを止めずに受け止める仕組み。try の中で失敗が起きたら except に処理が移ります。ネットワークやAIのように「失敗しうる処理」は、はじめから失敗前提で書きます。",
    interviewExample:
      "外部APIの呼び出しは失敗する前提で、try-exceptで囲んで落ちないようにします。",
    related: ["error", "api"],
  },
  {
    slug: "error",
    term: "エラー",
    reading: "error",
    category: "python",
    meaning:
      "プログラムが途中で止まって出す警告メッセージ。壊れた合図ではなく「どこで・なぜ止まったか」を教えてくれる道案内です。AI時代の直し方は、エラー文をそのままAIに貼って原因と対処を尋ねるのが基本です。",
    interviewExample:
      "エラーは慌てず最後の行から読み、原因の場所と種類を特定してから直します。",
    related: ["exception"],
  },
  {
    slug: "env",
    term: "環境変数／.env",
    reading: "かんきょうへんすう",
    category: "python",
    meaning:
      "APIキーなどの秘密情報を、コードに直接書かず外から渡す仕組み。.env ファイルや環境変数に置き、プログラムから読み込みます。コードを共有・公開してもキーが漏れないようにするための基本です。",
    interviewExample:
      "APIキーはコードに直書きせず環境変数から読み込み、リポジトリに含めないようにします。",
    related: ["api-key", "api"],
  },
  // ── ai: AI/LLM関連 ────────────────────────────────────
  {
    slug: "api",
    term: "API",
    reading: "エーピーアイ",
    category: "ai",
    meaning:
      "プログラムから外部の機能を呼び出す「窓口」。AIの会社が用意したAPIに文章を送ると、AIの応答が返ってきます。自分でAIを動かさなくても、窓口越しに機能を借りられるのがAPIの利点です。",
    interviewExample:
      "AI機能は自前で持たず、提供元のAPIを呼び出して結果を受け取る構成にします。",
    related: ["api-key", "prompt", "llm"],
  },
  {
    slug: "api-key",
    term: "APIキー",
    reading: "エーピーアイキー",
    category: "ai",
    meaning:
      "APIを使うときの「本人確認の合言葉」。誰の利用かを識別し、料金の集計にも使われます。他人に知られると勝手に使われて課金されるため、コードに直書きせず環境変数で管理します。",
    interviewExample:
      "APIキーは秘密情報として環境変数で扱い、絶対にコードやGitに含めません。",
    related: ["env", "api"],
  },
  {
    slug: "llm",
    term: "LLM（大規模言語モデル）",
    reading: "エルエルエム",
    category: "ai",
    meaning:
      "Large Language Model の略。大量の文章で学習したAIで、ChatGPTやClaudeの中身です。むずかしく考えず「文章を入れると文章が返る、巨大な関数」と捉えると扱いやすくなります。",
    interviewExample:
      "LLMは万能ではなく確率で文章を作るので、出力は必ず検算する前提で使います。",
    related: ["prompt", "token", "hallucination"],
  },
  {
    slug: "prompt",
    term: "プロンプト",
    reading: "prompt",
    category: "ai",
    meaning:
      "AIに送る指示や質問の文章のこと。役割・制約・出力形式(例: JSONで返す)を具体的に書くほど、狙った結果が得やすくなります。プロンプトを一行変えるだけでツールの性格が変わります。",
    interviewExample:
      "出力を安定させるため、プロンプトに役割・制約・出力形式を明示するようにしています。",
    related: ["llm", "api"],
  },
  {
    slug: "token",
    term: "トークン",
    reading: "token",
    category: "ai",
    meaning:
      "AIが文章を扱うときの細かい単位(だいたい単語の一部)。入力と出力のトークン数に応じて料金や処理量が決まります。長い文章ほどトークンが増え、コストと時間がかかると意識しておきます。",
    interviewExample:
      "入出力のトークン量で課金されるので、無駄に長いプロンプトを避けてコストを抑えます。",
    related: ["llm", "prompt"],
  },
  {
    slug: "hallucination",
    term: "ハルシネーション",
    reading: "hallucination",
    category: "ai",
    meaning:
      "AIが、もっともらしいが事実でない内容を生成してしまう現象。要約や回答に、元になかった数字や固有名詞が紛れることがあります。だからAIの出力は、重要な部分を人が検算・確認する前提で使います。",
    interviewExample:
      "AIの出力は鵜呑みにせず、数字や固有名詞は元データと突き合わせて検算します。",
    related: ["llm", "prompt"],
  },
  {
    slug: "json",
    term: "JSON",
    reading: "ジェイソン",
    category: "ai",
    meaning:
      "データをやり取りするための共通の書式。Pythonの辞書とリストとほぼ同じ形で、APIやAIの入出力の標準になっています。JSON=辞書とリスト、と結びつけて読めると、AI連携がぐっと楽になります。",
    interviewExample:
      "APIの入出力はJSONが基本なので、辞書・リストとして読み書きできるようにしておきます。",
    related: ["dict", "list", "api"],
  },
  {
    slug: "pipeline",
    term: "パイプライン",
    reading: "pipeline",
    category: "ai",
    meaning:
      "処理を「入力→AI→整形→表示」のように、左から右へ順に通す一直線の流れのこと。小さく作るときの基本設計で、各段を分けておくと、どこで問題が起きたか切り分けやすくなります。",
    interviewExample:
      "AIツールは入力・推論・整形・表示に分けたパイプラインで設計し、段ごとに検証します。",
    related: ["prompt", "json"],
  },
  {
    slug: "typescript",
    term: "TypeScript",
    reading: "タイプスクリプト",
    category: "ai",
    meaning:
      "JavaScriptに「型」という安全装置を足した言語。ブラウザで動くAIプロダクトの画面づくりでよく使われます。型があると、AIが生成したコードの取り違えに早く気づけます(次のシリーズで扱います)。",
    interviewExample:
      "AIが生成したコードの間違いを早期に検知するため、型のあるTypeScriptを選びます。",
    related: ["api"],
  },
];
