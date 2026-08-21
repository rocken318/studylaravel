import type { GlossaryTerm } from "@/types";

// Reactコースの用語集。category は "react"。
export const reactGlossary: GlossaryTerm[] = [
  {
    slug: "react",
    term: "React",
    reading: "リアクト",
    category: "react",
    meaning:
      "UI(画面)を「コンポーネント(部品)」の組み合わせで作るための人気ライブラリ。状態(state)を書くと、Reactが画面をそれに合わせて更新してくれます。手作業でDOMを書き換える方式に比べ、大きな画面でも破綻しにくいのが特徴です。",
    interviewExample:
      "実務でこう説明する: UIはReactのコンポーネントに分割して構築し、状態と表示を同期させることで保守しやすくしています。",
    related: ["component", "jsx", "state", "declarative-ui"],
  },
  {
    slug: "declarative-ui",
    term: "宣言的UI",
    reading: "せんげんてきUI",
    category: "react",
    meaning:
      "「どう変えるか(手順)」ではなく「どういう状態か(結果)」を書くと、フレームワークが画面をその状態に合わせてくれる考え方。Reactの中心的な発想で、命令的にDOMを1つずつ操作するのと対になります。",
    interviewExample:
      "実務でこう説明する: 表示は状態から宣言的に導出する形にして、手続き的なDOM操作による不整合を避けています。",
    related: ["react", "state", "re-render"],
  },
  {
    slug: "component",
    term: "コンポーネント",
    category: "react",
    meaning:
      "UIを構成する再利用可能な部品。Reactでは、JSXを返す大文字始まりの関数として書きます(関数コンポーネント)。画面をHeader・List・Itemのように部品へ分解して組み立てます。",
    interviewExample:
      "実務でこう説明する: 画面は責務ごとにコンポーネントへ分割し、再利用と見通しのよさを両立させています。",
    related: ["jsx", "props", "react"],
  },
  {
    slug: "jsx",
    term: "JSX",
    reading: "ジェイエスエックス",
    category: "react",
    meaning:
      "「ジェイエスエックス」と読みます。JavaScriptの中にHTMLのような見た目でUIを書ける記法で、実体はJavaScriptです。読むコツは、{ } の中に変数や式を埋め込めること、HTMLと違い class ではなく className を使うこと、<br /> のように自己完結タグは閉じること、そして全体を1つの親要素でまとめること。この4点を押さえると読み解けます。",
    interviewExample:
      "実務でこう説明する: JSXはHTMLに似ていますが実体はJSなので、式の埋め込みや条件分岐を自然に書ける利点を活かしています。",
    related: ["component", "react"],
  },
  {
    slug: "props",
    term: "props",
    reading: "プロップス",
    category: "react",
    meaning:
      "親コンポーネントから子コンポーネントへ渡すデータ。関数の引数のようなもので、<UserCard name=\"太郎\" /> のように渡し、子側で { name } として受け取ります。同じ部品に違うデータを渡して再利用できます。",
    interviewExample:
      "実務でこう説明する: 部品はpropsで外からデータを受け取る形にして、同じコンポーネントを様々な文脈で再利用しています。",
    related: ["component", "prop-drilling"],
  },
  {
    slug: "state",
    term: "state",
    reading: "ステート",
    category: "react",
    meaning:
      "コンポーネントが保持する「変わる値」。これが更新されると、その部品が再描画され画面が変わります。useState で作り、専用の更新関数(setter)で変更します。ふつうの変数と違い、変更が画面に反映されるのが特徴です。",
    interviewExample:
      "実務でこう説明する: 画面上で変化する値はstateで管理し、更新はsetter経由に統一して予期しない再描画漏れを防いでいます。",
    related: ["usestate", "re-render", "declarative-ui"],
  },
  {
    slug: "usestate",
    term: "useState",
    category: "react",
    meaning:
      "コンポーネントにstate(覚えておく値)を持たせるためのReactの関数(Hook)。const [count, setCount] = useState(0) のように、現在の値と更新関数のペアを受け取ります。",
    interviewExample:
      "実務でこう説明する: ローカルな状態はuseStateで持ち、更新関数を通じて変更することで再レンダリングを正しく発生させています。",
    related: ["state", "hook"],
  },
  {
    slug: "hook",
    term: "Hook",
    reading: "フック",
    category: "react",
    meaning:
      "use〜で始まるReactの関数群で、コンポーネントに状態や副作用などの機能を「引っ掛ける」もの。useState・useEffectが代表。自作もできます(カスタムHook)。コンポーネントのトップレベルで呼ぶという決まりがあります。",
    interviewExample:
      "実務でこう説明する: 状態や副作用はHookで扱い、共通ロジックはカスタムHookに切り出して再利用しています。",
    related: ["usestate", "useeffect", "custom-hook"],
  },
  {
    slug: "re-render",
    term: "再レンダリング",
    reading: "さいレンダリング",
    category: "react",
    meaning:
      "stateやpropsが変わったときに、Reactがそのコンポーネントを再度実行して画面を更新すること。状態と表示が自動で同期する仕組みの中心です。不要な再レンダリングが多いと遅くなることがあります。",
    interviewExample:
      "実務でこう説明する: 状態変更で再レンダリングが起きる前提で設計し、不要な再描画は計測した上で必要なら抑制しています。",
    related: ["state", "declarative-ui"],
  },
  {
    slug: "event-handler",
    term: "イベントハンドラ",
    category: "react",
    meaning:
      "onClick や onChange に渡す、ユーザー操作に反応する関数。onClick={handleClick} のように「関数そのもの」を渡します。onClick={handleClick()} と書くと即実行されてしまうので注意します。",
    interviewExample:
      "実務でこう説明する: イベントハンドラは関数参照を渡す形にして、レンダリング時の意図しない即時実行を避けています。",
    related: ["state", "usestate"],
  },
  {
    slug: "list-key",
    term: "リストの key",
    category: "react",
    meaning:
      "配列を map で並べて表示するとき、各要素に付ける一意の目印。Reactが「どれがどれか」を追跡し、効率よく再描画するために使います。配列のindexをkeyにするのは、並び替えなどで不具合の元になりやすく非推奨です。",
    interviewExample:
      "実務でこう説明する: リストには安定した一意のkeyを付け、indexをkeyにすることによる再描画の不具合を避けています。",
    related: ["list-rendering", "re-render"],
  },
  {
    slug: "list-rendering",
    term: "リストレンダリング",
    category: "react",
    meaning:
      "配列を map でJSXの配列に変換して画面に並べる、Reactでの一覧表示の基本テクニック。items.map((item) => <li key={item.id}>{item.name}</li>) のように書きます。JavaScriptのmapがそのまま生きます。",
    interviewExample:
      "実務でこう説明する: 一覧はmapでリストレンダリングし、各要素に一意のkeyを付けて表示しています。",
    related: ["list-key", "conditional-rendering"],
  },
  {
    slug: "conditional-rendering",
    term: "条件付きレンダリング",
    category: "react",
    meaning:
      "状態に応じて表示を出し分けること。{isLoading && <Spinner />} や {ok ? <A /> : <B />} のように、論理演算子や三項演算子で書きます。ログイン状態や読み込み状態による表示切り替えに使います。",
    interviewExample:
      "実務でこう説明する: 状態に応じた出し分けは条件付きレンダリングで表現し、読み込み中や空状態も明示的に扱っています。",
    related: ["state", "list-rendering"],
  },
  {
    slug: "controlled-component",
    term: "制御コンポーネント",
    reading: "せいぎょコンポーネント",
    category: "react",
    meaning:
      "入力フォームの値をstateで管理し、value と onChange でReactが値を握る書き方。入力のたびにstateを更新するので、値の検証や整形をReact側で一元管理できます。",
    interviewExample:
      "実務でこう説明する: フォームは制御コンポーネントにして、入力値をstateで一元管理し検証や送信整形をしやすくしています。",
    related: ["state", "usestate"],
  },
  {
    slug: "useeffect",
    term: "useEffect",
    category: "react",
    meaning:
      "描画以外の処理(副作用: データ取得・購読・タイマーなど)を扱うHook。useEffect(() => { ... }, [deps]) の依存配列で「いつ再実行するか」を決めます。空配列なら初回だけ実行されます。",
    interviewExample:
      "実務でこう説明する: 副作用はuseEffectにまとめ、依存配列を正しく指定して不要な再実行や実行漏れを防いでいます。",
    related: ["side-effect", "data-fetching", "hook"],
  },
  {
    slug: "side-effect",
    term: "副作用",
    reading: "ふくさよう",
    category: "react",
    meaning:
      "画面を描く以外の外向きの処理。データ取得、イベント購読、タイマー設定、ローカルストレージ操作などが該当します。Reactではこれらをレンダリング中ではなくuseEffectの中で行います。",
    interviewExample:
      "実務でこう説明する: 副作用はレンダリングから切り離してuseEffectで扱い、描画を純粋に保っています。",
    related: ["useeffect"],
  },
  {
    slug: "data-fetching",
    term: "データ取得",
    reading: "データしゅとく",
    category: "react",
    meaning:
      "APIからデータを取ってきて画面に表示すること。fetchで取得し、結果をstateに入れて表示します。読み込み中(loading)・成功・失敗(error)の3状態を用意するのが実務の定番です。",
    interviewExample:
      "実務でこう説明する: データ取得はloading/success/errorの3状態で扱い、待ち時間や失敗もUIで明示しています。",
    related: ["useeffect", "loading-error"],
  },
  {
    slug: "loading-error",
    term: "loading / error 状態",
    category: "react",
    meaning:
      "非同期処理の状態表現。読み込み中はスピナー、失敗時はエラーメッセージ、成功時はデータ、と出し分けます。ユーザーに「今どうなっているか」を伝えるために欠かせません。",
    interviewExample:
      "実務でこう説明する: 非同期処理はloadingとerrorの状態を必ず用意し、ユーザーに進行状況と失敗を伝えるUIにしています。",
    related: ["data-fetching", "conditional-rendering"],
  },
  {
    slug: "lifting-state",
    term: "状態の持ち上げ",
    reading: "じょうたいのもちあげ",
    category: "react",
    meaning:
      "複数のコンポーネントで共有したい状態を、共通の親コンポーネントへ移すこと(lifting state up)。状態の置き場所を1か所(単一の情報源)にすることで、食い違いを防ぎます。",
    interviewExample:
      "実務でこう説明する: 共有が必要な状態は共通の親へ持ち上げ、単一の情報源として扱うことで整合性を保っています。",
    related: ["state", "prop-drilling"],
  },
  {
    slug: "prop-drilling",
    term: "プロップドリリング",
    category: "react",
    meaning:
      "深い階層の子へpropsを何段も手渡しでバケツリレーすること。増えすぎると見通しが悪くなり、そのときはContextなどで途中を省く選択肢が出てきます。",
    interviewExample:
      "実務でこう説明する: propsのバケツリレーが深くなる場合は、Contextなどで受け渡しを簡潔にする判断をしています。",
    related: ["props", "context", "lifting-state"],
  },
  {
    slug: "context",
    term: "Context",
    reading: "コンテキスト",
    category: "react",
    meaning:
      "propsを一段ずつ渡さずに、離れたコンポーネントへ値を届けるReactの仕組み。テーマやログインユーザーなど「多くの場所で使う値」に向きます。使いすぎると追いにくくなるため、必要な範囲で使います。",
    interviewExample:
      "実務でこう説明する: 広く共有する値はContextで配り、propsのバケツリレーを避けつつ、乱用しないよう範囲を絞っています。",
    related: ["prop-drilling", "props"],
  },
  {
    slug: "custom-hook",
    term: "カスタムHook",
    category: "react",
    meaning:
      "use〜で始まる自作の関数に、状態やロジックをまとめて再利用できるようにしたもの(useCounter, useFetchなど)。UIとロジックを分離でき、複数のコンポーネントで同じロジックを使い回せます。",
    interviewExample:
      "実務でこう説明する: 共通ロジックはカスタムHookに切り出し、UIとロジックを分離して再利用とテストをしやすくしています。",
    related: ["hook", "usestate"],
  },
  {
    slug: "nextjs",
    term: "Next.js",
    reading: "ネクストジェイエス",
    category: "react",
    meaning:
      "Reactに、画面遷移(ルーティング)・サーバー機能・最適化などを足した人気フレームワーク。ファイルを置くとページになる仕組みなどがあり、実務のReact開発ではよく使われます。この学習サイト自体もNext.jsで作られています。",
    interviewExample:
      "実務でこう説明する: 本番のReactアプリはNext.jsで構築し、ルーティングやサーバー処理、最適化の恩恵を受けています。",
    related: ["react", "vercel"],
  },
  {
    slug: "vercel",
    term: "Vercel",
    reading: "バーセル",
    category: "react",
    meaning:
      "Next.jsアプリを簡単に公開できるホスティングサービス。GitHubにpushすると自動でビルド・デプロイされ、URLで世界に公開されます。手順は暗記せずAIに聞けば十分です。",
    interviewExample:
      "実務でこう説明する: GitHubへのpushをトリガーにVercelで自動デプロイし、公開までの手間を最小化しています。",
    related: ["nextjs"],
  },
];
