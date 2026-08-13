import type { Day } from "@/types";

export const tsDay5: Day = {
  day: 5,
  slug: "day5",
  title: "React/Next.jsの超入門",
  goal: "コンポーネント・propsの型・useStateの型を理解し、画面に表示してイベントを扱える。Next.jsのApp Routerの超基本がわかる。",
  lessons: [
    {
      id: "tsday5-lesson1",
      slug: "component-and-jsx",
      title: "コンポーネントとJSX/TSX",
      summary: "画面を「部品(コンポーネント)」に分け、JSX/TSXで見た目を書く感覚をつかむ。",
      blocks: [
        {
          type: "heading",
          text: "画面は「部品」を組み合わせて作る",
        },
        {
          type: "paragraph",
          text: "React(リアクト)は、Webの画面を作るための仕組みです。いちばん大事な考え方は「画面を小さな部品に分ける」こと。ボタン、見出し、カード、入力欄……それぞれを独立した部品として作り、レゴのように組み合わせて1つの画面にします。この部品のことを[[component]](コンポーネント)と呼びます。",
        },
        {
          type: "paragraph",
          text: "コンポーネントの正体は「見た目を返す関数」です。ふつうの関数が数値や文字列を返すように、コンポーネントは「画面に表示するもの」を返します。返すものを書くための特別な書き方が [[jsx]](ジェイエスエックス)で、TypeScriptと組み合わせたファイルは拡張子 .tsx を使い、TSXと呼びます。",
        },
        {
          type: "code",
          language: "tsx",
          caption: "いちばん小さいコンポーネント。関数がJSXを返している",
          code: "// 関数名は大文字始まりにする(Reactの決まり)\n// JSXの中の <h1> はHTMLに似ているが、JavaScriptの式\nfunction Hello() {\n  return <h1>こんにちは</h1>;\n}\n\nexport default Hello;",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜHTMLをそのまま書かず、JSXにするのか",
          text: "JSXは「見た目」と「動き(JavaScript)」を同じ場所に書けるのが利点です。中括弧 { } を書くと、その中はJavaScriptの式として計算されます。たとえば {1 + 2} は画面に 3 と表示されます。データを画面に差し込むのが簡単になります。",
        },
        {
          type: "code",
          language: "tsx",
          caption: "中括弧 { } の中はJavaScriptとして評価される",
          code: "function Greeting() {\n  const name = \"田中\";\n  const hour = 9;\n  return (\n    <div>\n      <p>{name}さん、こんにちは</p>\n      <p>今は{hour}時です</p>\n    </div>\n  );\n}",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "コンポーネント名は大文字で始める(hello ではなく Hello)。小文字だとReactがただのHTMLタグと勘違いする",
            "return では1つの親要素にまとめる。複数並べたいときは <div> や <> </> で囲む",
            "class ではなく className と書く(class はJavaScriptの予約語のため)",
          ],
        },
        {
          type: "compare",
          bad: {
            label: "うっかり",
            language: "tsx",
            text: "returnの中に要素が2つ並んでいてエラーになる",
            code: "function Bad() {\n  return (\n    <h1>タイトル</h1>\n    <p>本文</p>\n  );\n}",
          },
          good: {
            label: "正しい",
            language: "tsx",
            text: "1つの親(ここでは空タグ <> </>)で囲む",
            code: "function Good() {\n  return (\n    <>\n      <h1>タイトル</h1>\n      <p>本文</p>\n    </>\n  );\n}",
          },
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「このJSXがエラーになる。原因と直し方を教えて」とエラーメッセージごと貼ると早いです。JSXは慣れるまで独特なので、実装はAIに任せてよい部分です。ただしTSXにしておけば、returnの中で存在しない変数を使ったときなどにエディタが赤線で教えてくれます。型があるとAIが書いたコードの取り違えにも早く気づけます。",
        },
        {
          type: "paragraph",
          text: "まとめると、コンポーネントは「JSXを返す大文字始まりの関数」です。まずはこの1文だけ覚えれば十分です。次のレッスンでは、部品に外から値を渡す方法([[props]])を学びます。",
        },
      ],
      questions: [
        {
          id: "tsday5-lesson1-q1",
          type: "choice",
          question: "Reactのコンポーネント(関数コンポーネント)の説明として正しいものはどれ?",
          choices: [
            "画面に表示するもの(JSX)を返す関数である",
            "数値だけを返す特別な計算式である",
            "HTMLファイルを直接書き換える命令である",
            "データベースに接続するための関数である",
          ],
          answerIndex: 0,
          explanation: "コンポーネントは「見た目(JSX)を返す関数」です。ふつうの関数が値を返すのと同じ発想で、返すものが画面表示になります。",
        },
        {
          id: "tsday5-lesson1-q2",
          type: "choice",
          question: "JSXの中で変数 name の値を画面に表示したいとき、正しい書き方はどれ?",
          choices: [
            "<p>name</p>",
            "<p>{name}</p>",
            "<p>${name}</p>",
            "<p>%name%</p>",
          ],
          answerIndex: 1,
          explanation: "JSXの中でJavaScriptの値を差し込むには中括弧 { } を使います。{name} と書くと変数nameの中身が表示されます。そのまま name と書くと文字列「name」が表示されるだけです。",
        },
        {
          id: "tsday5-lesson1-q3",
          type: "free",
          question: "コンポーネントとJSX(TSX)の関係を、初心者に説明するつもりで一言でまとめてください。",
          modelAnswer: "コンポーネントは画面の部品で、その正体は「JSXという書き方で見た目を返す関数」です。JSXはHTMLに似た書き方で、中括弧を使えばJavaScriptの値を画面に差し込めます。TypeScriptと組み合わせたファイルは.tsx(TSX)と呼び、書き間違いをエディタが型で早めに教えてくれます。",
          interviewPhrase: "実務では「画面を部品に分けて、各部品はJSXで見た目を返す関数として作ります。TSXにしておくと型チェックが効くので、生成AIに書かせたコードのミスも早く気づけます」と説明します。",
          keywords: ["コンポーネント", "JSX", "TSX", "関数", "型"],
        },
      ],
    },
    {
      id: "tsday5-lesson2",
      slug: "typing-props",
      title: "propsの型づけ",
      summary: "部品に外から渡す値(props)に型をつけ、渡し忘れや型違いをコンパイル時に防ぐ。",
      blocks: [
        {
          type: "heading",
          text: "部品に「外から値を渡す」のがprops",
        },
        {
          type: "paragraph",
          text: "同じ見た目でも、中身のテキストだけ変えたい場面はよくあります。たとえば「◯◯さん、こんにちは」の◯◯だけ差し替えたい。このとき、コンポーネントに外から渡す値のことを[[props]](プロップス、propertiesの略)と呼びます。propsは、関数コンポーネントが受け取る「引数」だと考えてください。",
        },
        {
          type: "code",
          language: "tsx",
          caption: "propsを受け取る。型がないと何を渡せるのか分からない",
          code: "// props は関数の引数として受け取る\nfunction Greeting(props) {\n  return <p>{props.name}さん、こんにちは</p>;\n}\n\n// 使う側: name という値を渡している\n// <Greeting name=\"田中\" />",
        },
        {
          type: "callout",
          variant: "warn",
          title: "型なしのpropsは事故のもと",
          text: "上のコードは props に型がないため、name を渡し忘れても、数値を渡しても、エディタは何も警告しません。実行して初めて「undefinedさん、こんにちは」と表示されて気づく、という遅い失敗になります。",
        },
        {
          type: "heading",
          text: "propsの形を型で宣言する",
        },
        {
          type: "paragraph",
          text: "そこで、propsがどんな形かを型で宣言します。よく使うのは[[type-alias]](type)か[[interface]]です。ここでは分かりやすいtypeで書きます。「name は文字列」と決めておけば、渡し忘れや型違いをエディタが赤線で即座に教えてくれます。実行前に間違いが分かるのが型の価値です。",
        },
        {
          type: "code",
          language: "tsx",
          caption: "propsの型を宣言してから受け取る",
          code: "// propsの形を型で定義する\ntype GreetingProps = {\n  name: string;      // 必須の文字列\n  age?: number;      // ? をつけると「あってもなくてもよい」\n};\n\nfunction Greeting({ name, age }: GreetingProps) {\n  return (\n    <p>\n      {name}さん、こんにちは\n      {age !== undefined ? \"(\" + age + \"歳)\" : \"\"}\n    </p>\n  );\n}\n\n// <Greeting name=\"田中\" />           OK\n// <Greeting name=\"田中\" age={30} />  OK\n// <Greeting age={30} />              エラー: name が足りない\n// <Greeting name={30} />             エラー: name は文字列のはず",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "{ name, age } のように書くのは「分割代入」。props.name と書く代わりに、必要な値を直接取り出せる",
            "型の name: string は「必須」、age?: number の ? は「省略可能」を意味する",
            "渡し忘れ・型違いはコンパイル時(実行前)にエラーになるので、画面を開く前に気づける",
          ],
        },
        {
          type: "compare",
          bad: {
            label: "型なし",
            language: "tsx",
            text: "何を渡せばいいか呼び出し側から分からず、ミスに実行時まで気づけない",
            code: "function UserCard(props) {\n  return <div>{props.title}</div>;\n}\n// props.name の打ち間違いをしても無警告",
          },
          good: {
            label: "型あり",
            language: "tsx",
            text: "受け取れる値が一目で分かり、間違いは赤線で即座に分かる",
            code: "type UserCardProps = { title: string };\n\nfunction UserCard({ title }: UserCardProps) {\n  return <div>{title}</div>;\n}\n// title の打ち間違いはその場でエラー",
          },
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「このコンポーネントのpropsに型をつけて。nameは必須の文字列、ageは省略可能な数値」と形を日本語で伝えれば、AIが型定義を書いてくれます。ポイントは、あなたが型(=仕様)を決めて、実装はAIに任せること。型があれば、AIの出力が仕様どおりか型チェックが自動で照合してくれます。",
        },
        {
          type: "paragraph",
          text: "propsは「部品への引数」、その形を型で決めておく。これだけで、チーム開発でもAIとの共同作業でも、渡し間違いという定番のバグを実行前に潰せます。",
        },
      ],
      questions: [
        {
          id: "tsday5-lesson2-q1",
          type: "choice",
          question: "型 type GreetingProps = { name: string; age?: number } が表す意味として正しいものはどれ?",
          choices: [
            "name も age も必須である",
            "name は必須の文字列、age は省略できる数値である",
            "name は省略でき、age は必須である",
            "name も age も文字列である",
          ],
          answerIndex: 1,
          explanation: "? がついたプロパティは省略可能を意味します。name: string は必須の文字列、age?: number は「あってもなくてもよい数値」です。",
        },
        {
          id: "tsday5-lesson2-q2",
          type: "choice",
          question: "propsに型をつける最大のメリットは何?",
          choices: [
            "画面の表示速度が速くなる",
            "渡し忘れや型違いを実行前(コンパイル時)に検出できる",
            "CSSを書かなくてよくなる",
            "サーバーが不要になる",
          ],
          answerIndex: 1,
          explanation: "型はコンパイル時に照合されます。必須のpropsを渡し忘れたり違う型を渡したりすると、画面を開く前にエラーで気づけます。これが「早く失敗できる」利点です。",
        },
        {
          id: "tsday5-lesson2-q3",
          type: "free",
          question: "propsに型をつけると、AIと一緒に開発するときにどう役立ちますか。",
          modelAnswer: "propsの型は「このコンポーネントが受け取ってよい値の仕様」です。仕様を型として先に決めておけば、AIに実装を書かせても、渡す値の型違いや渡し忘れを型チェックが自動で照合し、実行前にエラーで教えてくれます。人間が仕様(型)を決め、実装はAIに任せ、型で守るという分担ができます。",
          interviewPhrase: "実務では「propsの型は受け取り仕様そのものなので、AIに実装させても型チェックが仕様どおりかを自動照合してくれて、渡し間違いを実行前に防げます」と説明します。",
          keywords: ["props", "型", "仕様", "コンパイル時", "AI"],
        },
      ],
    },
    {
      id: "tsday5-lesson3",
      slug: "usestate-and-events",
      title: "useStateの型と状態更新・イベント",
      summary: "画面の状態をuseStateで持ち、型を推論させつつ、クリックや入力のイベントを型安全に扱う。",
      blocks: [
        {
          type: "heading",
          text: "画面に「覚えておく値」を持たせるのがuseState",
        },
        {
          type: "paragraph",
          text: "ボタンを押すたびに数が増えるカウンター、入力欄に打った文字。こうした「時間とともに変わり、画面に反映したい値」を状態(state)と呼びます。Reactでは[[usestate]]という仕組みで状態を持ちます。ふつうの変数ではなくuseStateを使う理由は、値を更新したときにReactが自動で画面を描き直してくれるからです。",
        },
        {
          type: "code",
          language: "tsx",
          caption: "useStateの基本。返り値は[今の値, 更新する関数]の2つ組",
          code: "import { useState } from \"react\";\n\nfunction Counter() {\n  // count が今の値、setCount が更新する関数\n  // 初期値 0 を渡すと、count の型は number と推論される\n  const [count, setCount] = useState(0);\n\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      {count} 回押した\n    </button>\n  );\n}",
        },
        {
          type: "callout",
          variant: "warn",
          title: "状態は直接書き換えない",
          text: "count = count + 1 のように直接代入しても、Reactは変化に気づかず画面を更新しません。必ず更新関数 setCount を通します。setCountを呼ぶことが「画面を描き直して」という合図になります。",
        },
        {
          type: "heading",
          text: "型は推論に任せ、必要なときだけ明示する",
        },
        {
          type: "paragraph",
          text: "useState(0) のように初期値を渡すと、TypeScriptが「これはnumberだ」と自動で判断します(型推論)。多くの場合これで十分です。ただし、初期値がnullで後から値が入る場合など、推論では足りないときは山括弧で型を明示します。",
        },
        {
          type: "code",
          language: "tsx",
          caption: "型を明示するケース。最初はnull、あとでUserが入る",
          code: "type User = { id: number; name: string };\n\nfunction Profile() {\n  // 初期値 null だけだと「常にnull」と推論されてしまう\n  // <User | null> で「Userかnull」と明示する\n  const [user, setUser] = useState<User | null>(null);\n\n  if (user === null) {\n    return <p>読み込み中...</p>;\n  }\n  // ここでは user は User 型に絞り込まれている\n  return <p>{user.name}</p>;\n}",
        },
        {
          type: "heading",
          text: "イベントにも型がある",
        },
        {
          type: "paragraph",
          text: "クリックや入力などの操作を「イベント」と呼び、それに応じて動く関数を書きます。入力欄の値を状態に反映する定番パターンを見てみましょう。イベントの引数にも型があり、e.target.value が文字列だとエディタが分かっているので、打ち間違いを防げます。",
        },
        {
          type: "code",
          language: "tsx",
          caption: "入力イベント。ChangeEventの型で e.target.value が守られる",
          code: "import { useState, type ChangeEvent } from \"react\";\n\nfunction NameInput() {\n  const [name, setName] = useState(\"\");\n\n  // e は入力イベント。型をつけると e.target.value が string と分かる\n  function handleChange(e: ChangeEvent<HTMLInputElement>) {\n    setName(e.target.value);\n  }\n\n  return (\n    <div>\n      <input value={name} onChange={handleChange} />\n      <p>入力中: {name}</p>\n    </div>\n  );\n}",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "useStateは [今の値, 更新関数] の2つ組を返す。分割代入で受け取る",
            "更新は必ず更新関数(setXxx)を通す。直接代入は画面に反映されない",
            "初期値から型が推論される。null始まりなど足りないときだけ useState<型>() で明示する",
            "イベント引数の型(例: ChangeEvent<HTMLInputElement>)をつけると e.target.value などが守られる",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「入力欄の値をuseStateで管理し、onChangeで更新するReactコンポーネントを、TypeScriptで型もつけて書いて」と頼めば、イベント型まで含めて書いてくれます。生成されたコードで e の型が any になっていないかだけ自分でチェックしましょう。型がついていれば、AIが e.target.velue のように綴りを間違えても赤線で分かります。",
        },
        {
          type: "paragraph",
          text: "状態はuseStateで持ち、更新は更新関数を通す。イベントには型をつける。この3つを押さえれば、動きのある画面の土台は作れます。",
        },
      ],
      questions: [
        {
          id: "tsday5-lesson3-q1",
          type: "choice",
          question: "const [count, setCount] = useState(0) について、正しい説明はどれ?",
          choices: [
            "count は更新関数で、setCount が今の値である",
            "count が今の値、setCount が更新用の関数で、count の型は number と推論される",
            "count も setCount も文字列型である",
            "useState は値を1つだけ返す",
          ],
          answerIndex: 1,
          explanation: "useStateは [今の値, 更新関数] の2つ組を返します。初期値 0 から count は number 型と推論されます。更新は setCount を通して行います。",
        },
        {
          id: "tsday5-lesson3-q2",
          type: "choice",
          question: "初期値が null で、あとから User 型の値が入る状態を宣言したい。適切なのはどれ?",
          choices: [
            "useState(null)",
            "useState<User>(null)",
            "useState<User | null>(null)",
            "useState<User>()",
          ],
          answerIndex: 2,
          explanation: "useState(null) だと型が「常にnull」と推論され、後からUserを入れられません。useState<User>(null) は初期値nullが型に合わずエラーです。User または null を許す useState<User | null>(null) が正解です。",
        },
        {
          id: "tsday5-lesson3-q3",
          type: "free",
          question: "Reactで状態を直接書き換えず更新関数(setXxx)を使う理由を説明してください。",
          modelAnswer: "Reactは更新関数が呼ばれたことを合図に、画面を描き直します。count = count + 1 のように変数へ直接代入しても、Reactは変化に気づかず画面が更新されません。だからsetCountのような更新関数を必ず通します。あわせて、初期値から状態の型が推論され、イベントにも型をつけておけば、e.target.valueの取り違えなどを実行前に防げます。",
          interviewPhrase: "実務では「状態は更新関数を通して変えます。そうしないとReactが再描画しないからです。型も推論に任せつつ、イベントには型をつけて取り違えを防ぎます」と説明します。",
          keywords: ["useState", "更新関数", "再描画", "型推論", "イベント"],
        },
      ],
    },
    {
      id: "tsday5-lesson4",
      slug: "nextjs-app-router-basics",
      title: "Next.js App Router超入門",
      summary: "page.tsxでページを作り、サーバーコンポーネントとクライアントコンポーネントの違いを理解する。",
      blocks: [
        {
          type: "heading",
          text: "Next.jsは「Reactで本物のWebサイトを作る」ための土台",
        },
        {
          type: "paragraph",
          text: "Reactだけでは、ページの切り替え(ルーティング)やサーバー側の処理など、実際のWebサイトに必要な部品が足りません。それらをまとめて用意してくれるのがNext.js(ネクストジェイエス)です。現在の標準は[[app-router]](App Router)という方式で、フォルダの構造がそのままURLになるのが特徴です。",
        },
        {
          type: "paragraph",
          text: "ルールはシンプルです。app というフォルダの下に page.tsx という名前のファイルを置くと、それが1つのページになります。フォルダ名がURLの一部になります。たとえば app/page.tsx はトップページ、app/about/page.tsx は /about のページです。",
        },
        {
          type: "code",
          language: "tsx",
          caption: "app/page.tsx がトップページ(/)になる",
          code: "// app/page.tsx\n// このファイルが置いてあるだけで / でアクセスできる\nexport default function HomePage() {\n  return (\n    <main>\n      <h1>ようこそ</h1>\n      <p>これはトップページです</p>\n    </main>\n  );\n}",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "app/page.tsx  →  / (トップ)",
            "app/about/page.tsx  →  /about",
            "app/blog/page.tsx  →  /blog",
            "ページの中身は、これまで学んだReactコンポーネントそのもの",
          ],
        },
        {
          type: "heading",
          text: "サーバーコンポーネントとクライアントコンポーネント",
        },
        {
          type: "paragraph",
          text: "App Routerでは、コンポーネントは初期状態ではサーバーコンポーネントです。これは「サーバー側で実行され、できあがったHTMLだけがブラウザに届く」種類です。データベースやAPIキーなど、外に見せたくないものを安全に扱え、表示も速いのが利点です。ただし、useStateやonClickのような「ブラウザで動く機能」は使えません。",
        },
        {
          type: "paragraph",
          text: "useStateやクリックイベントを使いたいときは、ファイルの先頭に \"use client\" と書いてクライアントコンポーネントにします。こちらはブラウザ側で動くので、状態やイベントを扱えます。前のレッスンのCounterのような対話的な部品はこちらです。",
        },
        {
          type: "code",
          language: "tsx",
          caption: "\"use client\" をつけると状態やイベントが使える",
          code: "// このファイルの先頭に書く。ダブルクォートも含めてこの1行\n\"use client\";\n\nimport { useState } from \"react\";\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      {count}\n    </button>\n  );\n}",
        },
        {
          type: "compare",
          bad: {
            label: "エラーになる",
            language: "tsx",
            text: "サーバーコンポーネント(use clientなし)でuseStateを使っている",
            code: "// app/page.tsx  ← use client がない\nimport { useState } from \"react\";\n\nexport default function Page() {\n  const [n, setN] = useState(0); // エラー\n  return <button onClick={() => setN(n + 1)}>{n}</button>;\n}",
          },
          good: {
            label: "正しい",
            language: "tsx",
            text: "対話的な部品はクライアントに切り出す。表示は速いサーバー側のまま",
            code: "// app/page.tsx (サーバー) は表示だけ担当\nimport Counter from \"./Counter\"; // Counter 側に \"use client\"\n\nexport default function Page() {\n  return (\n    <main>\n      <h1>ホーム</h1>\n      <Counter />\n    </main>\n  );\n}",
          },
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ2種類に分かれているのか",
          text: "全部をブラウザで動かすと、送るコードが増えて表示が遅くなり、APIキーのような秘密も漏れやすくなります。基本はサーバー側で作り、ボタンや入力など「操作が必要な部分」だけをクライアントに切り出す。この分担で、速さと安全さを両立します。",
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「Next.js App Routerで /about ページを作りたい。どのフォルダに何を置く?」や「このコンポーネントで useState を使うと Error。原因は?」と聞くと、use client の付け忘れなど定番の原因を教えてくれます。型と \"use client\" の有無を自分で確認できれば、AIの提案の正しさを判断できます。",
        },
        {
          type: "paragraph",
          text: "覚えることは2つ。フォルダに置いた page.tsx がページになること、そして状態やイベントを使う部品だけ先頭に \"use client\" をつけること。ここまでで、型で守られたReact/Next.jsの入り口に立てました。",
        },
      ],
      questions: [
        {
          id: "tsday5-lesson4-q1",
          type: "choice",
          question: "Next.jsのApp Routerで /about というURLのページを作るには、どのファイルを用意する?",
          choices: [
            "app/about.tsx",
            "app/about/page.tsx",
            "pages/about.html",
            "about/index.tsx",
          ],
          answerIndex: 1,
          explanation: "App Routerではフォルダ構造がURLになり、ページの実体は page.tsx です。app/about/page.tsx を置くと /about でアクセスできます。",
        },
        {
          id: "tsday5-lesson4-q2",
          type: "choice",
          question: "コンポーネントで useState や onClick を使いたいのに使えない。まず確認すべきことは?",
          choices: [
            "ファイル名を index.tsx に変える",
            "ファイルの先頭に \"use client\" が書いてあるか(なければ書く)",
            "return を1行にまとめる",
            "型注釈をすべて消す",
          ],
          answerIndex: 1,
          explanation: "App Routerの初期状態はサーバーコンポーネントで、useStateやonClickは使えません。これらを使う部品は先頭に \"use client\" を書いてクライアントコンポーネントにする必要があります。",
        },
        {
          id: "tsday5-lesson4-q3",
          type: "free",
          question: "サーバーコンポーネントとクライアントコンポーネントの違いと使い分けを説明してください。",
          modelAnswer: "サーバーコンポーネントはサーバー側で実行され、できあがったHTMLだけがブラウザに届きます。表示が速く、APIキーなどの秘密も安全に扱えますが、useStateやonClickは使えません。クライアントコンポーネントは先頭に \"use client\" を書き、ブラウザで動くので状態やイベントを扱えます。基本はサーバー側で作り、操作が必要な部分だけをクライアントに切り出すのが定石です。",
          interviewPhrase: "実務では「デフォルトはサーバーで作って表示を速く安全に保ち、ボタンや入力など対話が必要な部分だけ use client でクライアントに切り出します」と説明します。",
          keywords: ["サーバーコンポーネント", "クライアントコンポーネント", "use client", "useState", "使い分け"],
        },
      ],
    },
  ],
};
