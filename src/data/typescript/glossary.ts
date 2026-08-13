import type { GlossaryTerm } from "@/types";

// 「初めてのTypeScript」の用語集。category は "typescript"(型・言語) と "react"(React/Next)。
export const tsGlossary: GlossaryTerm[] = [
  // ── typescript ────────────────────────────────────────
  {
    slug: "type-annotation",
    term: "型注釈",
    reading: "type annotation",
    category: "typescript",
    meaning:
      "変数や引数に「これは文字列」「これは数値」と型を明示する書き方。let name: string のように : の後ろに型を書きます。人にもAIにも意図が伝わり、間違った値の代入を書いた時点で警告してくれます。",
    interviewExample:
      "関数の引数と戻り値には型注釈をつけ、呼び出し側の誤用を書いた時点で気づけるようにします。",
    related: ["type-inference", "type"],
  },
  {
    slug: "type-inference",
    term: "型推論",
    reading: "type inference",
    category: "typescript",
    meaning:
      "型注釈を書かなくても、TypeScriptが値から型を自動で判断してくれる機能。const n = 3 なら n は number と推論されます。毎回書かなくてよい一方、関数の境界など重要な所は明示すると安全です。",
    interviewExample:
      "内部の変数は型推論に任せ、関数の入出力など境界だけ明示して読みやすさと安全性を両立します。",
    related: ["type-annotation"],
  },
  {
    slug: "type",
    term: "型",
    reading: "type",
    category: "typescript",
    meaning:
      "その値が「何であるか（文字列・数値・特定の形のオブジェクト等）」を表す情報。型があると、実行しなくても矛盾を見つけられます。AIが生成したコードの取り違えを早期に発見できるのが最大の利点です。",
    interviewExample:
      "型は実行前に矛盾を検出する安全装置で、特にAI生成コードのレビューを速くしてくれます。",
    related: ["type-annotation", "any"],
  },
  {
    slug: "type-alias",
    term: "type（型エイリアス）",
    reading: "type alias",
    category: "typescript",
    meaning:
      "type キーワードで、型に名前をつける仕組み。type User = { name: string; age: number } のように、繰り返し使う形に名前を与えて再利用します。interfaceと近い用途で使われます。",
    interviewExample:
      "使い回すデータの形は type や interface で名前をつけ、各所で同じ型を共有します。",
    related: ["interface", "union"],
  },
  {
    slug: "interface",
    term: "interface",
    reading: "インターフェース",
    category: "typescript",
    meaning:
      "オブジェクトの「形」を定義する仕組み。interface User { name: string } のように、どんなプロパティを持つかを宣言します。APIのレスポンスの形を表すのによく使われ、typeとほぼ同じ役割です。",
    interviewExample:
      "APIレスポンスの形はinterfaceで定義し、受け取ったデータをその型として扱います。",
    related: ["type-alias", "object", "optional"],
  },
  {
    slug: "object",
    term: "オブジェクト型",
    reading: "object",
    category: "typescript",
    meaning:
      "{ キー: 値 } の形をしたデータの型。{ name: string; age: number } のように各プロパティの型を書きます。APIやAIの入出力(JSON)は、この形の組み合わせで表せます。",
    interviewExample:
      "受け渡すデータはオブジェクト型で形を固定し、必要なプロパティの過不足を型で防ぎます。",
    related: ["interface", "array", "optional"],
  },
  {
    slug: "array",
    term: "配列型",
    reading: "array",
    category: "typescript",
    meaning:
      "同じ型の値が並んだリストの型。string[] や Array<string> と書きます。一覧データを扱うときの基本で、mapなどで1件ずつ処理します。",
    interviewExample:
      "一覧は string[] のように要素の型つきの配列で持ち、要素の取り違えを防ぎます。",
    related: ["object", "union"],
  },
  {
    slug: "optional",
    term: "オプショナル（?）",
    reading: "optional",
    category: "typescript",
    meaning:
      "プロパティが「あってもなくてもよい」ことを表す ? 記号。{ name: string; nickname?: string } なら nickname は省略可能です。省略時は undefined になるため、使う前に存在チェックが要ります。",
    interviewExample:
      "任意項目は ? をつけ、使う前に存在を確認して undefined による事故を防ぎます。",
    related: ["undefined", "interface"],
  },
  {
    slug: "union",
    term: "ユニオン型",
    reading: "union",
    category: "typescript",
    meaning:
      "「AまたはB」を表す型。string | number なら文字列か数値、\"loading\" | \"done\" のようにリテラルを並べて状態を表すこともできます。ありえない値を型レベルで排除できます。",
    interviewExample:
      "状態は \"loading\" | \"success\" | \"error\" のようなユニオン型にして、想定外の値を防ぎます。",
    related: ["type-alias", "unknown"],
  },
  {
    slug: "any",
    term: "any",
    reading: "エニー",
    category: "typescript",
    meaning:
      "「どんな型でもよい」を意味する型。便利に見えますが、型チェックを無効化してしまうため、TypeScriptの利点を捨てることになります。安易なanyは避け、必要なら後述のunknownを使います。",
    interviewExample:
      "anyは型チェックを無効化するので極力使わず、不明な値はunknownで受けて絞り込みます。",
    related: ["unknown", "type"],
  },
  {
    slug: "unknown",
    term: "unknown",
    reading: "アンノウン",
    category: "typescript",
    meaning:
      "「型が不明」を安全に表す型。anyと違い、そのままでは使えず、型を絞り込んでからでないと操作できません。外部から来る信用できない値(APIの結果など)を受ける入り口に向いています。",
    interviewExample:
      "外部由来の値はunknownで受け、型を確認してから使うことで安全性を担保します。",
    related: ["any", "union"],
  },
  {
    slug: "null",
    term: "null",
    reading: "ヌル",
    category: "typescript",
    meaning:
      "「値が無い」ことを意図的に表す値。存在しない・見つからないことを示します。使う前にnullかどうかを確認しないと、実行時エラーの原因になります。",
    interviewExample:
      "取得できない可能性がある値はnullを含む型にし、使う前に必ずnullチェックします。",
    related: ["undefined", "optional"],
  },
  {
    slug: "undefined",
    term: "undefined",
    reading: "アンディファインド",
    category: "typescript",
    meaning:
      "「値が未定義（まだ入っていない）」を表す値。省略されたオプショナル項目や、未代入の変数がこれになります。nullと似ますが、意味合いが少し異なります。",
    interviewExample:
      "オプショナル項目はundefinedになりうるので、参照前に存在を確認します。",
    related: ["null", "optional"],
  },
  {
    slug: "promise",
    term: "Promise",
    reading: "プロミス",
    category: "typescript",
    meaning:
      "「あとで結果が返ってくる」ことを表す入れ物。ネットワーク通信のように時間がかかる処理は、待たずに先に進み、完了したら結果を受け取ります。Promise<string> なら、後で文字列が返る意味です。",
    interviewExample:
      "非同期処理はPromiseで表され、完了を待って結果を受け取る前提で設計します。",
    related: ["async", "await", "fetch"],
  },
  {
    slug: "async",
    term: "async",
    reading: "エイシンク",
    category: "typescript",
    meaning:
      "関数の前につけて「この関数は非同期（待ちが発生する）」と宣言するキーワード。async をつけた関数は必ずPromiseを返します。中で await を使えるようになります。",
    interviewExample:
      "待ちが発生する処理はasync関数にまとめ、中でawaitして直列的に読める形にします。",
    related: ["await", "promise"],
  },
  {
    slug: "await",
    term: "await",
    reading: "アウェイト",
    category: "typescript",
    meaning:
      "Promiseの結果が返るまで「待つ」キーワード。await fetch(...) と書くと、通信が終わるまで待ってから次に進みます。非同期処理を、上から順に読める形で書けます。",
    interviewExample:
      "awaitで結果を待ってから次に進めることで、コールバックの入れ子を避けて読みやすくします。",
    related: ["async", "promise", "fetch"],
  },
  {
    slug: "fetch",
    term: "fetch",
    reading: "フェッチ",
    category: "typescript",
    meaning:
      "ブラウザやサーバーからWeb APIを呼び出す標準関数。await fetch(url) で通信し、.json() で結果を取り出します。取り出した結果に型をつけると、以降の扱いが安全になります。",
    interviewExample:
      "APIはfetchで呼び、.json()の結果にinterfaceの型を当てて安全に扱います。",
    related: ["promise", "await", "api-route"],
  },
  // ── react ─────────────────────────────────────────────
  {
    slug: "jsx",
    term: "JSX / TSX",
    reading: "ジェイエスエックス",
    category: "react",
    meaning:
      "JavaScript/TypeScriptの中にHTMLのような見た目を書ける記法。<h1>{title}</h1> のように、画面の構造と値を一緒に書けます。TypeScriptで書くファイルは .tsx 拡張子になります。",
    interviewExample:
      "画面はJSX(TSX)で構造を書き、{}で変数を差し込んで動的な表示にします。",
    related: ["component", "props"],
  },
  {
    slug: "component",
    term: "コンポーネント",
    reading: "component",
    category: "react",
    meaning:
      "画面を組み立てる「部品」。関数として書き、JSXを返します。ボタンやカードなどを部品にして組み合わせることで、UIを再利用しやすく整理できます。",
    interviewExample:
      "UIはコンポーネント単位で分割し、再利用と見通しの良さを両立させます。",
    related: ["props", "usestate", "jsx"],
  },
  {
    slug: "props",
    term: "props",
    reading: "プロップス",
    category: "react",
    meaning:
      "親コンポーネントから子へ値を渡す仕組み。関数の引数のようなもので、型をつけることで渡し間違いを防げます。<Card title=\"...\" /> の title が props です。",
    interviewExample:
      "コンポーネントの入力はpropsとして型定義し、必要な値の渡し漏れを型で防ぎます。",
    related: ["component", "jsx"],
  },
  {
    slug: "usestate",
    term: "useState",
    reading: "ユーズステート",
    category: "react",
    meaning:
      "コンポーネントに「状態（変わる値）」を持たせるReactの機能。const [text, setText] = useState(\"\") のように、現在値と更新関数を受け取ります。入力欄の中身やAIの応答など、変化するデータの保持に使います。",
    interviewExample:
      "入力値やAIの応答など変化する値はuseStateで保持し、更新関数経由で反映します。",
    related: ["component", "props"],
  },
  {
    slug: "app-router",
    term: "App Router（Next.js）",
    reading: "アップルーター",
    category: "react",
    meaning:
      "Next.jsで、フォルダ構成がそのままページのURLになる仕組み。app/page.tsx が \"/\" に対応します。サーバーで動く部分とブラウザで動く部分を分けられ、AIのAPIキーはサーバー側に置けます。",
    interviewExample:
      "Next.jsのApp Routerでページとサーバー処理を分け、APIキーはサーバー側に隠します。",
    related: ["api-route", "component"],
  },
  {
    slug: "api-route",
    term: "APIルート（route.ts）",
    reading: "エーピーアイルート",
    category: "react",
    meaning:
      "Next.jsで、サーバー側の処理窓口を作る仕組み。ブラウザからここを呼び、サーバー内でLLMのAPIを叩きます。APIキーをブラウザに出さずに済むため、AIプロダクトの安全な構成の要になります。",
    interviewExample:
      "AI呼び出しはAPIルート(サーバー側)に置き、APIキーをブラウザに露出させません。",
    related: ["app-router", "fetch"],
  },
];
