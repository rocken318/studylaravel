import type { GlossaryTerm } from "@/types";

// JavaScriptコースの用語集。category は "javascript"。
export const jsGlossary: GlossaryTerm[] = [
  {
    slug: "javascript",
    term: "JavaScript",
    reading: "ジャバスクリプト",
    category: "javascript",
    meaning:
      "Webページに「動き(ふるまい)」を与えるプログラミング言語。HTMLが骨組み、CSSが見た目を担当するのに対し、JavaScript(略してJS)はボタンを押すと表示が変わる・データを取ってくる、といった動作を担います。ブラウザの中で動くのが基本ですが、サーバー側(Node.js)でも動きます。",
    interviewExample:
      "実務でこう説明する: フロントの動的な挙動はJavaScriptで実装し、AIに書かせた部分もまず読んで意図を確認しています。",
    related: ["dom", "event", "node"],
  },
  {
    slug: "variable",
    term: "変数",
    reading: "へんすう",
    category: "javascript",
    meaning:
      "値に名前をつけて後から使い回すための入れ物。JSでは const(入れ替えない)と let(入れ替える)で宣言します。ラベルを貼った箱をイメージすると分かりやすいです。",
    interviewExample:
      "実務でこう説明する: 再代入しない値は const を基本にし、変更が必要なものだけ let にして、意図を読み手に伝えています。",
    related: ["const-let", "value-type"],
  },
  {
    slug: "const-let",
    term: "const / let",
    category: "javascript",
    meaning:
      "変数を宣言するキーワード。const は後から入れ替えない値、let は入れ替える値に使います。まず const で書き、再代入が必要なときだけ let にするのが基本です(かつての var は今はほぼ使いません)。",
    interviewExample:
      "実務でこう説明する: const を既定にして、状態が変わる変数だけ let にすることで、どこで値が変わるかを読みやすくしています。",
    related: ["variable"],
  },
  {
    slug: "value-type",
    term: "値の種類(型)",
    reading: "あたいのしゅるい",
    category: "javascript",
    meaning:
      "JSが扱う値の種類。主に文字列(string、\"あ\"のように引用符で囲む)・数値(number、123)・真偽値(boolean、true/false)があります。文字列の \"3\" と 数値の 3 は別物で、混同すると計算がおかしくなります。",
    interviewExample:
      "実務でこう説明する: 数値と文字列の取り違えは事故のもとなので、値の種類を意識し、必要なら変換してから扱っています。",
    related: ["template-literal", "javascript"],
  },
  {
    slug: "template-literal",
    term: "テンプレートリテラル",
    category: "javascript",
    meaning:
      "バッククォート(`)で囲み、${ } の中に変数や式を埋め込める文字列の書き方。\"こんにちは、\" + name のような連結より読みやすく書けます。",
    interviewExample:
      "実務でこう説明する: 文字列に値を差し込むときはテンプレートリテラルを使い、連結より意図が読みやすい形にしています。",
    related: ["value-type"],
  },
  {
    slug: "operator",
    term: "演算子",
    reading: "えんざんし",
    category: "javascript",
    meaning:
      "値を計算・比較する記号。算術(+ - * / %)、比較(=== 等しい / !== 等しくない / < >)、論理(&& かつ / || または)などがあります。等値判定は == ではなく === を使うのが基本です。",
    interviewExample:
      "実務でこう説明する: 等値比較は型も含めて厳密に見る === を使い、意図しない型変換による不具合を避けています。",
    related: ["condition"],
  },
  {
    slug: "condition",
    term: "条件分岐",
    reading: "じょうけんぶんき",
    category: "javascript",
    meaning:
      "条件によって処理を変える仕組み。if / else if / else で「もし〜なら」を表現します。分かれ道のように、真偽値(true/false)で進む先が決まります。",
    interviewExample:
      "実務でこう説明する: 条件分岐は分岐条件を明確にし、例外ケースを else で取りこぼさないように書いています。",
    related: ["operator", "boolean"],
  },
  {
    slug: "boolean",
    term: "真偽値",
    reading: "しんぎち",
    category: "javascript",
    meaning:
      "true(真)か false(偽)のどちらかを表す値。条件分岐やくり返しの判断に使われます。「はい/いいえ」のスイッチのようなものです。",
    interviewExample:
      "実務でこう説明する: フラグは真偽値で持ち、条件式が何を意味するか名前で分かるようにしています。",
    related: ["condition"],
  },
  {
    slug: "array",
    term: "配列",
    reading: "はいれつ",
    category: "javascript",
    meaning:
      "複数の値を順番に並べてまとめて持つ入れ物。[\"a\", \"b\", \"c\"] のように書き、先頭は0番目から数えます。番号付きロッカーのイメージです。.length で個数が分かります。",
    interviewExample:
      "実務でこう説明する: 一覧データは配列で扱い、map や filter で加工・絞り込みをして画面に渡しています。",
    related: ["loop", "map-filter"],
  },
  {
    slug: "loop",
    term: "くり返し(ループ)",
    category: "javascript",
    meaning:
      "同じ処理を複数の要素に対してくり返す仕組み。for...of や forEach で配列を1件ずつ処理します。人間が手で書く代わりに、機械にまとめて任せる考え方です。",
    interviewExample:
      "実務でこう説明する: 反復処理はループにまとめ、同じコードの繰り返しを避けて読みやすさと保守性を保っています。",
    related: ["array", "map-filter"],
  },
  {
    slug: "function",
    term: "関数",
    reading: "かんすう",
    category: "javascript",
    meaning:
      "入力(引数)を受け取り、処理して結果(戻り値)を返す小さな機械。return で値を返します。処理に名前をつけて再利用でき、意図が読み取りやすくなります。",
    interviewExample:
      "実務でこう説明する: 処理は関数に切り出して名前で意図を示し、再利用とテストのしやすさを確保しています。",
    related: ["arrow-function", "argument"],
  },
  {
    slug: "argument",
    term: "引数 / 戻り値",
    reading: "ひきすう / もどりち",
    category: "javascript",
    meaning:
      "引数は関数に渡す入力の値、戻り値は関数が返す結果の値。greet(\"太郎\") の \"太郎\" が引数、return された文字列が戻り値です。",
    interviewExample:
      "実務でこう説明する: 関数の入出力(引数と戻り値)を明確にし、副作用を減らして扱いやすい関数にしています。",
    related: ["function"],
  },
  {
    slug: "arrow-function",
    term: "アロー関数",
    category: "javascript",
    meaning:
      "(x) => x + 1 のように => を使って短く書く関数。map やイベント処理の引数として頻繁に登場します。ふつうの関数と役割はほぼ同じで、まず「読めれば十分」です。",
    interviewExample:
      "実務でこう説明する: コールバックはアロー関数で簡潔に書き、処理の流れが追いやすいコードにしています。",
    related: ["function", "map-filter"],
  },
  {
    slug: "object",
    term: "オブジェクト",
    category: "javascript",
    meaning:
      "関連する複数の値を「名前: 値」のペアでまとめた入れ物。{ name: \"太郎\", age: 20 } のように書き、user.name で中の値を取り出します。オブジェクトを配列に入れると「データの一覧」になります。",
    interviewExample:
      "実務でこう説明する: 関連する値はオブジェクトにまとめ、一覧はオブジェクトの配列として扱ってUIに渡しています。",
    related: ["array", "property"],
  },
  {
    slug: "property",
    term: "プロパティ",
    category: "javascript",
    meaning:
      "オブジェクトが持つ「名前: 値」のひと組。user オブジェクトの name や age がプロパティです。ドット記法 user.name でアクセスします。",
    interviewExample:
      "実務でこう説明する: オブジェクトのプロパティ名は意味が伝わる名前にし、データ構造を読み取りやすくしています。",
    related: ["object"],
  },
  {
    slug: "map-filter",
    term: "map / filter",
    category: "javascript",
    meaning:
      "配列メソッド。map は各要素を変換して新しい配列を作り(全員に同じ加工)、filter は条件に合う要素だけを残します(選抜)。元の配列は変えず、新しい配列を返すのが特徴で、Reactのリスト表示の土台になります。",
    interviewExample:
      "実務でこう説明する: 一覧の変換は map、絞り込みは filter を使い、元データを壊さずに表示用データを組み立てています。",
    related: ["array", "arrow-function"],
  },
  {
    slug: "dom",
    term: "DOM",
    reading: "ドム",
    category: "javascript",
    meaning:
      "ブラウザが読み込んだHTMLを、JavaScriptから触れるように表現したもの(ページの地図)。document.querySelector で要素を取り出し、.textContent などで中身を書き換えられます。",
    interviewExample:
      "実務でこう説明する: 素のJSでは要素をDOM経由で取得して更新しますが、規模が大きいときはReactのような仕組みで宣言的に扱います。",
    related: ["event", "javascript"],
  },
  {
    slug: "event",
    term: "イベント",
    category: "javascript",
    meaning:
      "クリック・入力・送信などのユーザー操作。addEventListener(\"click\", 関数) のように、操作が起きたときに実行する処理を登録します。「〜されたら〜する」の仕組みです。",
    interviewExample:
      "実務でこう説明する: ユーザー操作はイベントで受け取り、対応する処理をハンドラに分けて見通しよく書いています。",
    related: ["dom", "arrow-function"],
  },
  {
    slug: "fetch",
    term: "fetch / 非同期",
    reading: "フェッチ / ひどうき",
    category: "javascript",
    meaning:
      "fetch はインターネット越しにデータを取ってくる関数。通信は時間がかかるため、結果を「待つ」印として async / await を使います。全部を自分で書けなくても、何をしているか読めれば十分です。",
    interviewExample:
      "実務でこう説明する: APIからのデータ取得は fetch と async/await で書き、待ち時間や失敗を考慮した処理にしています。",
    related: ["javascript"],
  },
  {
    slug: "node",
    term: "Node.js",
    reading: "ノードジェイエス",
    category: "javascript",
    meaning:
      "ブラウザの外(サーバーや自分のPC)でJavaScriptを動かすための実行環境。これのおかげで、JSはWebページの中だけでなくサーバー側でも使えます。名前と役割を知っておけば十分です。",
    interviewExample:
      "実務でこう説明する: フロントもバックもJavaScript/TypeScriptで書けるのはNode.jsのおかげで、言語をまたがず開発できます。",
    related: ["javascript"],
  },
];
