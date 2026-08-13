import type { GlossaryTerm } from "@/types";

// 言語に依存しない共通基礎の用語集。category は "basics"。
// レッスンからは variable/function/api/prompt/hallucination/json 等(他コースの用語)も
// [[slug]] で参照でき、統合termMapから解決される。
export const basicsGlossary: GlossaryTerm[] = [
  {
    slug: "vibe-coding",
    term: "バイブコーディング",
    reading: "vibe coding",
    category: "basics",
    meaning:
      "作りたいものを言葉でAIに伝え、コードを生成してもらいながら進める作り方。速く形にできる一方、出てきたコードを読めない・確かめられないと、間違いや危険にそのまま乗ってしまいます。基礎があると「任せつつ、見抜ける」状態になります。",
    interviewExample:
      "AIに任せて速く作りつつ、生成物を読んで検証できる状態を保つのがバイブコーディングのコツです。",
    related: ["source-code", "prompt", "debug"],
  },
  {
    slug: "source-code",
    term: "ソースコード",
    reading: "source code",
    category: "basics",
    meaning:
      "人間が書く(またはAIが書く)プログラムの文章そのもの。料理でいう「レシピ」です。コンピュータはこのレシピ通りに動くので、レシピが読めれば結果を予想でき、直せます。",
    interviewExample:
      "ソースコードは動作のレシピなので、読めれば挙動を予測でき、修正の当たりもつけられます。",
    related: ["runtime", "algorithm"],
  },
  {
    slug: "algorithm",
    term: "アルゴリズム",
    reading: "algorithm",
    category: "basics",
    meaning:
      "目的を達成するための手順・段取りのこと。料理の手順や、道順の決め方に似ています。同じことをするにも段取り次第で速さや分かりやすさが変わります。",
    interviewExample:
      "アルゴリズムは問題を解く手順で、選び方次第で速度や読みやすさが変わると理解しています。",
    related: ["control-flow", "data-structure"],
  },
  {
    slug: "data-structure",
    term: "データ構造",
    reading: "data structure",
    category: "basics",
    meaning:
      "データをどんな形でまとめて持つかの型。順番に並べる「リスト」、名前で引く「辞書」などがあります。道具箱の仕切り方のようなもので、目的に合う形を選ぶと扱いやすくなります。",
    interviewExample:
      "順序が大事ならリスト、名前で引くなら辞書、と目的に合うデータ構造を選びます。",
    related: ["json", "algorithm"],
  },
  {
    slug: "control-flow",
    term: "制御フロー",
    reading: "control flow",
    category: "basics",
    meaning:
      "プログラムが処理を進める順番のこと。上から順に進み、条件で分かれ(分かれ道)、必要なら繰り返す(ベルトコンベア)。この流れを追えると、コードが「何をしているか」を読めます。",
    interviewExample:
      "制御フロー(順次・分岐・反復)を追えれば、コードの動きを頭の中で再生できます。",
    related: ["algorithm", "state"],
  },
  {
    slug: "state",
    term: "状態（ステート）",
    reading: "state",
    category: "basics",
    meaning:
      "プログラムの「今の状況」を表すデータ。ゲームのセーブデータや信号機の色のように、時間とともに変わります。バグの多くは「状態の思い違い」から起きます。",
    interviewExample:
      "状態は今の状況を表すデータで、変化の管理を誤るとバグの温床になると意識します。",
    related: ["sync-async", "debug"],
  },
  {
    slug: "sync-async",
    term: "同期・非同期",
    reading: "sync / async",
    category: "basics",
    meaning:
      "同期は「終わるまでその場で待つ」(行列に並んで待つ)、非同期は「頼んで番号札をもらい、後で受け取る」(呼ばれるまで別のことをする)。通信やAI呼び出しは時間がかかるので非同期で扱います。",
    interviewExample:
      "通信やAI呼び出しは待ち時間があるので、非同期にして他の処理を止めないようにします。",
    related: ["request-response", "runtime"],
  },
  {
    slug: "client-server",
    term: "クライアントとサーバー",
    reading: "client / server",
    category: "basics",
    meaning:
      "クライアントは「お客(ブラウザやアプリ)」、サーバーは「厨房」。客が注文し、厨房が作って出す、というレストランの関係です。秘密の材料(APIキー)は厨房(サーバー)側に置きます。",
    interviewExample:
      "画面はクライアント、処理と秘密情報はサーバー、と役割を分けて設計します。",
    related: ["request-response", "api"],
  },
  {
    slug: "request-response",
    term: "リクエストとレスポンス",
    reading: "request / response",
    category: "basics",
    meaning:
      "リクエストは「注文」、レスポンスは「提供された料理」。クライアントが欲しいものを伝え(request)、サーバーが結果を返す(response)。うまくいったか失敗かの合図(ステータス)も一緒に返ります。",
    interviewExample:
      "やり取りは注文(リクエスト)と提供(レスポンス)の往復で、成否の合図も確認します。",
    related: ["client-server", "api"],
  },
  {
    slug: "debug",
    term: "デバッグ",
    reading: "debug",
    category: "basics",
    meaning:
      "うまく動かない原因を探して直す作業。故障探しと同じで、「どこまでは正しいか」を切り分けて範囲を狭めます。エラー文は場所と理由を教えてくれる道案内で、そのままAIに貼るのが近道です。",
    interviewExample:
      "デバッグは切り分けが要で、正常な範囲を確かめながら原因を絞り込みます。",
    related: ["state", "vibe-coding"],
  },
  {
    slug: "version-control",
    term: "バージョン管理（Git）",
    reading: "version control",
    category: "basics",
    meaning:
      "コードの変更履歴を保存し、いつでも戻れるようにする仕組み。ゲームのセーブポイントのようなものです。AIに大きく書き換えてもらう前にセーブしておけば、失敗しても元に戻せます。",
    interviewExample:
      "Gitでこまめにセーブし、AIに大きく変更させる前後で戻れる状態を保ちます。",
    related: ["source-code", "debug"],
  },
  {
    slug: "runtime",
    term: "実行時（ランタイム）",
    reading: "runtime",
    category: "basics",
    meaning:
      "プログラムが実際に動いている最中のこと、またはそれを動かす土台。レシピ(コード)を実際に調理している時間帯です。書いた時点では分からず、動かして初めて分かる問題(実行時エラー)もあります。",
    interviewExample:
      "コード上は正しく見えても、実行時に初めて出る問題があるので、動かして確認します。",
    related: ["source-code", "state"],
  },
];
