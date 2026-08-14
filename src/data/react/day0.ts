import type { Day } from "@/types";
export const reactDay0: Day = {
  day: 0, slug: "day0", title: "Reactってなに？ — UIを部品で組み立てる",
  goal: "Reactが何で、なぜ生まれたのかを説明できる。宣言的UI(状態を書けば画面はReactが同期)、コンポーネント指向(UIを部品に分けて再利用)、SPAの発想、そして直接DOM操作との違いを自分の言葉で言える。",
  lessons: [
    {
      id: "reactday0-lesson1", slug: "what-is-react", title: "Reactとは — UIを部品でつくるライブラリ",
      summary: "Reactは画面(UI)を「部品(コンポーネント)」の組み合わせで作るためのライブラリ。なぜそんなものが必要になったのかを、手作業のDOM操作の限界から理解する。",
      blocks: [
        { type: "heading", text: "Reactはひとことで言うと「UI部品の道具箱」" },
        { type: "paragraph", text: "Reactは、Webの画面(UI = User Interface、ユーザーが見て触る部分)を作るためのJavaScriptライブラリです。特徴は、画面全体をいきなり作るのではなく、小さな「部品」を組み合わせて作るところにあります。この部品をReactでは「コンポーネント」と呼びます。ボタン、検索バー、商品カード、ヘッダー…これらをそれぞれ独立した部品として作り、レゴブロックのように組み立てて1つの画面にします。" },
        { type: "callout", variant: "why", title: "なぜ「ライブラリ」なのか", text: "ReactはあなたのJavaScriptコードから呼び出して使う「部品づくりの道具集」です。フレームワーク(全部お膳立てしてくれる仕組み)というより、UI作りに特化した道具。だから「画面をどう組み立てるか」に集中でき、他の部分は自由に選べます。" },
        { type: "paragraph", text: "たとえるなら、レゴブロックのカタログです。ブロック一つひとつ(コンポーネント)には決まった形と役割があり、それらを組み合わせて城でも車でも作れます。同じブロックを何度でも使い回せるのがポイントです。「商品カード」という部品を1つ作れば、100個の商品を表示するときも同じ部品を100回並べるだけで済みます。" },
        { type: "code", language: "tsx", code: "function ProductCard() {\n  return (\n    <div className=\"card\">\n      <h2>りんご</h2>\n      <p>120円</p>\n    </div>\n  );\n}", caption: "これが「コンポーネント」。関数が見た目(JSX)を返すだけ。この部品を何度でも並べられる。" },
        { type: "heading", text: "なぜReactが生まれたのか" },
        { type: "paragraph", text: "昔のWeb作りでは、画面を書き換えるたびに「この要素を探して、この文字をここに入れて、この色を変えて…」と1つずつ手作業で命令していました。これを「DOM操作」と言います。DOMとは、ブラウザが画面を木構造(ツリー)として持っているデータのことで、JavaScriptから直接いじれます。" },
        { type: "code", language: "javascript", code: "// 手作業のDOM操作: 要素を探して、直接書き換える\nconst el = document.querySelector(\"#count\");\nel.textContent = \"3\";\nel.classList.add(\"active\");", caption: "小さい画面ならこれで十分。だが規模が大きくなると破綻する。" },
        { type: "paragraph", text: "問題は、画面が複雑になったときです。データが変わるたびに「どこを、どう書き換えるか」を人間が全部管理しなければなりません。要素が数百個あり、状態が絡み合うと、「ここを変えたらあそこも直さなきゃ」という抜け漏れが必ず起きます。バグの温床でした。Reactは、この「手作業の書き換え」から人間を解放するために生まれました。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「Reactのコンポーネントと、素のJavaScriptでDOMを直接操作する方法の違いを、初心者向けに具体例つきで説明して」と聞くと、両者の考え方の差がつかめます。" },
        { type: "list", items: ["Reactは画面(UI)を作るためのJavaScriptライブラリ", "画面を「コンポーネント(部品)」の組み合わせで作る", "同じ部品を何度でも再利用できる(レゴブロックのイメージ)", "手作業のDOM操作が大規模で破綻したことへの答えとして生まれた"] }
      ],
      questions: [
        { id: "reactday0-lesson1-q1", type: "choice", question: "Reactにおける「コンポーネント」を最もよく表しているのはどれ？", choices: ["ページ全体を一度に描画する巨大な設定ファイル", "再利用できるUIの部品。ボタンやカードなどを独立して作れる", "サーバー上でデータベースを操作する仕組み", "CSSの色やフォントだけをまとめたファイル"], answerIndex: 1, explanation: "コンポーネントは再利用可能なUIの部品です。小さな部品を組み合わせて画面を作るのがReactの基本発想で、レゴブロックのように使い回せます。" },
        { id: "reactday0-lesson1-q2", type: "free", question: "「なぜReactのような道具が生まれたのか」を、手作業のDOM操作の問題点に触れながら説明してください。", modelAnswer: "昔はデータが変わるたびに、JavaScriptで要素を1つずつ探して手作業で書き換えていました(DOM操作)。小規模なら問題ありませんが、画面が複雑になると「どこをどう変えるか」を人間が全部管理する必要があり、書き換え漏れによるバグが多発しました。Reactはこの手作業の管理から人間を解放し、UIを部品として組み立てられるようにするために生まれました。", interviewPhrase: "実務でこう説明する: Reactは、手作業のDOM操作が大規模UIで破綻する問題を、コンポーネント化と宣言的な更新で解決するために登場した、と説明します。", keywords: ["DOM操作", "手作業", "コンポーネント", "再利用", "破綻"] }
      ]
    },
    {
      id: "reactday0-lesson2", slug: "declarative-ui", title: "宣言的UI — 「状態」を書けば画面はReactが合わせる",
      summary: "Reactの核心は「宣言的UI」。どう変えるか(手順)ではなく、どういう状態か(結果)を書くと、Reactが画面をその状態に合わせてくれる。命令的なDOM操作と比べて直感をつかむ。",
      blocks: [
        { type: "heading", text: "「手順」ではなく「状態」を書く" },
        { type: "paragraph", text: "Reactの一番大事な考え方が「宣言的UI」です。少し難しい言葉ですが、意味はシンプルです。「画面をどう変えるか(手順)」を書くのではなく、「今どういう状態なら、画面はこう見える」という関係だけを書きます。あとはReactが、状態に合わせて画面を自動で更新してくれます。" },
        { type: "callout", variant: "why", title: "命令的 vs 宣言的の違い", text: "命令的(imperative)は「料理の手順書」。手を洗って、鍋を出して、水を入れて…と1つずつ指示します。宣言的(declarative)は「完成した料理の写真」。こういう状態にしてほしい、と結果だけ伝えて、作り方はReactに任せます。" },
        { type: "paragraph", text: "たとえばカウンター(数字が増えるボタン)を考えます。命令的なやり方では、ボタンが押されるたびに「今の数字を取り出して、+1して、画面の文字を書き換える」という手順を自分で書きます。宣言的なReactでは、「countという状態がある。画面にはcountを表示する」とだけ書きます。countが変われば、画面は自動でついてきます。" },
        { type: "compare",
          bad: { label: "命令的(手作業でDOMを書き換える)", language: "javascript", code: "let count = 0;\nbutton.addEventListener(\"click\", () => {\n  count = count + 1;\n  document.querySelector(\"#n\").textContent = count;\n});" },
          good: { label: "宣言的(状態を書けばReactが表示を合わせる)", language: "tsx", code: "const [count, setCount] = useState(0);\nreturn (\n  <button onClick={() => setCount(count + 1)}>\n    {count}\n  </button>\n);" }
        },
        { type: "paragraph", text: "違いに注目してください。命令的な方では「textContentを書き換える」という画面更新の手順が書かれています。宣言的な方には、その手順がありません。あるのは「countという状態」と「画面にはcountを表示する」という関係だけ。setCountで状態を変えると、Reactが「あ、countが変わったな。じゃあ画面を新しい状態に合わせよう」と自動で更新します。" },
        { type: "heading", text: "再レンダリングの直感" },
        { type: "paragraph", text: "状態が変わったときにReactが画面を作り直すことを「再レンダリング」と言います。イメージは「その状態のときの画面を、もう一度まるごと描き直す」です。ただし本当に全部を書き換えるわけではなく、Reactが賢く「前と違うところだけ」を実際の画面に反映します(この仕組みは次のレッスンで軽く触れます)。" },
        { type: "callout", variant: "warn", title: "状態を直接書き換えてはいけない", text: "count = count + 1 のように変数を直接いじってもReactは気づきません。必ずsetCountのような更新関数を使います。「状態を変えたよ」とReactに伝えることで、初めて再レンダリングが起きます。ここは初心者がよくつまずく落とし穴です。" },
        { type: "code", language: "tsx", code: "function Greeting() {\n  const [name, setName] = useState(\"世界\");\n  return (\n    <div>\n      <p>こんにちは、{name}さん</p>\n      <button onClick={() => setName(\"React\")}>変える</button>\n    </div>\n  );\n}", caption: "nameという状態を書くだけ。ボタンでnameを変えれば、表示は自動で追従する。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このReactコードは宣言的ですか、命令的ですか?なぜそう言えるのか、状態と表示の関係を指摘して」と聞くと、自分の書いたコードがReactらしいかを判定してもらえます。" },
        { type: "list", items: ["宣言的UI = 「どう変えるか」ではなく「どういう状態か」を書く", "状態を更新関数(setCountなど)で変えると、Reactが画面を自動で合わせる", "状態が変わって画面を作り直すことを再レンダリングと呼ぶ", "変数を直接書き換えてもReactは気づかない — 必ず更新関数を使う"] }
      ],
      questions: [
        { id: "reactday0-lesson2-q1", type: "choice", question: "Reactの「宣言的UI」を正しく説明しているのはどれ？", choices: ["画面を書き換える手順を1行ずつ自分で書くこと", "どういう状態かを書けば、Reactが画面をその状態に合わせてくれること", "サーバーにデータを保存する方法を宣言すること", "CSSでレイアウトを宣言すること"], answerIndex: 1, explanation: "宣言的UIとは、状態(どういう状態か)を書けば、画面の更新(どう変えるか)はReactが担ってくれるという考え方です。手順を書く命令的なやり方の対極にあります。" },
        { id: "reactday0-lesson2-q2", type: "free", question: "カウンターを例に、命令的なDOM操作と、Reactの宣言的なやり方の違いを説明してください。", modelAnswer: "命令的なやり方では、ボタンが押されるたびに「今の数字を取り出し、+1し、画面のテキストを書き換える」という更新の手順を自分で書きます。Reactの宣言的なやり方では、countという状態を用意し、画面にはcountを表示すると書くだけです。setCountでcountを更新すると、Reactが再レンダリングして画面を新しい状態に自動で合わせます。手順を書くか、状態と表示の関係だけを書くかが違いです。", interviewPhrase: "実務でこう説明する: 宣言的UIは状態を真実の源(source of truth)にして、画面更新はReactに任せる。命令的なDOM操作のように更新手順を手書きしないので、不整合が起きにくい、と説明します。", keywords: ["宣言的", "命令的", "状態", "再レンダリング", "setCount"] }
      ]
    },
    {
      id: "reactday0-lesson3", slug: "components-thinking", title: "コンポーネント思考 — 画面を部品に分解する",
      summary: "Reactで作るときは、画面をいきなり作らず「部品に分解」して考える。Header・List・Itemのように役割で分けると、再利用・見通し・分担が楽になる。仮想DOMの役割も軽く押さえる。",
      blocks: [
        { type: "heading", text: "画面を「部品の木」として見る" },
        { type: "paragraph", text: "Reactで画面を作るとき、最初にやるのは「この画面をどんな部品に分けられるか」を考えることです。たとえばTODOリストの画面なら、全体を包む部分、上のタイトル、リスト全体、リストの中の1件…というように分けられます。それぞれをコンポーネントにします。" },
        { type: "list", items: ["Header(ページ上部のタイトルやメニュー)", "TodoList(TODOの一覧全体をまとめる部品)", "TodoItem(TODO1件分。TodoListの中で何度も使われる)", "Footer(ページ下部)"] },
        { type: "paragraph", text: "こうして分けた部品は、入れ子(ネスト)にして組み立てます。TodoListの中にTodoItemがいくつも入り、それらがApp(ページ全体)の中に入る、という木構造(ツリー)になります。この「部品を分解して組み立てる」考え方を、コンポーネント思考と呼びます。" },
        { type: "code", language: "tsx", code: "function App() {\n  return (\n    <div>\n      <Header />\n      <TodoList />\n      <Footer />\n    </div>\n  );\n}", caption: "Appは大きな部品を組み合わせるだけ。中身の詳細はそれぞれの部品に任せる。" },
        { type: "callout", variant: "why", title: "なぜ部品に分けると嬉しいのか", text: "3つの利点があります。(1)再利用: TodoItemを1つ作れば何件でも使い回せる。(2)見通し: 1つの部品は小さいので中身を理解しやすい。(3)分担: 「あなたはHeader、私はTodoList」とチームで分けて作れる。大きな画面を1枚で書くと、これらが全部できなくなります。" },
        { type: "paragraph", text: "たとえるなら、家を建てるときにドア・窓・壁を別々の規格部品として作り、それを組み合わせるのに似ています。ドアが壊れたらドアだけ直せばよく、窓には影響しません。Reactのコンポーネントも同じで、1つの部品を直しても他の部品を壊しにくいのが強みです。" },
        { type: "heading", text: "仮想DOM — 名前と役割だけ" },
        { type: "paragraph", text: "宣言的UIのレッスンで「状態が変わると画面を作り直す」と話しました。でも毎回本物の画面を全部書き換えたら重すぎます。そこでReactは「仮想DOM」という仕組みを使います。仮想DOMとは、本物の画面(DOM)の設計図をメモリ上に持つ軽いコピーのことです。" },
        { type: "paragraph", text: "Reactは、状態が変わると新しい設計図(仮想DOM)を作り、前の設計図と見比べて「実際に変わったのはここだけ」と差分を見つけます。そして本物のDOMには、その変わった部分だけを反映します。これで、宣言的に「全部作り直す」ように書いても、実際の画面更新は最小限で済みます。今は「仮想DOM = 効率よく画面を更新するためのReactの内部の仕組み」とだけ覚えれば十分です。" },
        { type: "callout", variant: "warn", title: "仮想DOMは今は深追いしない", text: "仮想DOMの詳しい仕組みは、Reactを使ううえで最初から理解する必要はありません。「なぜ宣言的に書いても速いのか」の答えが仮想DOMだ、という役割だけ押さえておけば大丈夫です。実装はReactがやってくれます。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このTODO画面のワイヤーフレームを、Reactのコンポーネントにどう分割すべきか提案して。各コンポーネントの役割も添えて」と聞くと、部品分解の練習相手になってくれます。分割案が妥当かを自分で読めることが大事です。" },
        { type: "list", items: ["Reactでは、まず画面を役割ごとの部品(コンポーネント)に分解して考える", "部品を入れ子にして木構造で組み立てる", "部品化の利点は再利用・見通し・分担の3つ", "仮想DOMは、変わった部分だけを効率よく本物のDOMに反映するReactの内部の仕組み"] }
      ],
      questions: [
        { id: "reactday0-lesson3-q1", type: "choice", question: "コンポーネントに分けて作ることの利点として、当てはまらないものはどれ？", choices: ["同じ部品を何度でも再利用できる", "1つの部品が小さいので中身を理解しやすい", "チームで部品ごとに分担して作れる", "サーバーの通信速度が自動的に速くなる"], answerIndex: 3, explanation: "部品化の利点は再利用・見通し・分担です。サーバーの通信速度とは関係ありません。他の3つはすべてコンポーネント思考の正しい利点です。" },
        { id: "reactday0-lesson3-q2", type: "free", question: "「コンポーネント思考」とは何か、そして仮想DOMがなぜ必要かを、簡単に説明してください。", modelAnswer: "コンポーネント思考とは、画面をいきなり作らず、Header・List・Itemのように役割ごとの部品(コンポーネント)に分解して考えるやり方です。部品化により再利用・見通し・分担がしやすくなります。仮想DOMは、状態が変わって画面を作り直すとき、本物のDOMを全部書き換えると重いため、メモリ上の軽い設計図で前後を比べ、変わった部分だけを本物に反映する仕組みです。これにより宣言的に書いても効率よく更新できます。", interviewPhrase: "実務でこう説明する: UIを役割単位のコンポーネントに分解して再利用性と保守性を上げるのがコンポーネント思考で、仮想DOMは差分だけを実DOMに反映して宣言的UIの性能を担保する仕組みだ、と説明します。", keywords: ["コンポーネント", "部品", "分解", "再利用", "仮想DOM", "差分"] }
      ]
    }
  ]
};
