import type { Day } from "@/types";

export const reactDay3: Day = {
  day: 3,
  slug: "day3",
  title: "リスト・条件・フォーム — 実データを画面に出す",
  goal: "配列を map で一覧に変換し key を正しく付けられる。条件付きレンダリングで表示を出し分けられる。input を state に結びつけた制御コンポーネントでフォームを作れる。",
  lessons: [
    {
      id: "reactday3-lesson1",
      slug: "lists-and-keys",
      title: "配列を map で一覧に変換する(key の役割)",
      summary: "JavaScript の map で配列を JSX の要素へ変換し、なぜ key が必要なのかを理解する。",
      blocks: [
        {
          type: "heading",
          text: "データの配列を、そのまま画面のリストにする"
        },
        {
          type: "paragraph",
          text: "実務の画面は「サーバーから届いた配列を並べて表示する」ものだらけです。商品一覧、コメント一覧、通知一覧、どれも中身は配列です。React では、この配列を JavaScript の map で JSX の要素の配列に変換して、そのまま画面に置きます。Day3 で学んだ JS の map が、ここでそのまま生きます。"
        },
        {
          type: "code",
          language: "tsx",
          code: "const fruits = [\"りんご\", \"みかん\", \"ぶどう\"];\n\nfunction FruitList() {\n  return (\n    <ul>\n      {fruits.map((fruit) => (\n        <li>{fruit}</li>\n      ))}\n    </ul>\n  );\n}",
          caption: "配列を map で <li> の配列に変換し、そのまま <ul> の中に置く"
        },
        {
          type: "paragraph",
          text: "ポイントは、map が返すのが「JSX 要素の配列」だということです。React は配列を渡されると、その中身を順番に並べて描画してくれます。だから for 文で組み立てる必要はなく、map の結果を波かっこ {} でそのまま埋め込むだけで一覧になります。"
        },
        {
          type: "paragraph",
          text: "ただし、上のコードを動かすと React が警告を出します。「リストの各項目には key が必要です」というものです。map で作った各要素には、どれがどれかを見分けるための目印 key を付ける決まりになっています。"
        },
        {
          type: "code",
          language: "tsx",
          code: "const users = [\n  { id: 1, name: \"佐藤\" },\n  { id: 2, name: \"鈴木\" },\n];\n\nfunction UserList() {\n  return (\n    <ul>\n      {users.map((user) => (\n        <li key={user.id}>{user.name}</li>\n      ))}\n    </ul>\n  );\n}",
          caption: "各要素に key={user.id} を付ける。id のような一意な値を使う"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ key が必要なのか",
          text: "リストは追加・削除・並び替えで中身が動きます。React は再描画のとき、前回のリストと今回のリストを見比べて「どれが同じ項目か」を判断します。key はその照合の目印です。key があれば「この項目は同じで、位置だけ変わった」と正しく判断でき、無駄な作り直しを避けて速く・正確に更新できます。"
        },
        {
          type: "callout",
          variant: "warn",
          title: "index を key にするのは基本 NG",
          text: "map の第2引数の index(0,1,2...)を key にしたくなりますが、並び替えや途中の削除があると「同じ index が別の項目を指す」ようになり、表示崩れや入力値の取り違えが起きます。key には、その項目に固有で変わらない値(id など)を使ってください。どうしても id が無い場合の一時しのぎ以外では index を避けます。"
        },
        {
          type: "compare",
          bad: {
            label: "index を key にする",
            text: "並び替え・削除で挙動が壊れやすい",
            language: "tsx",
            code: "{items.map((item, index) => (\n  <li key={index}>{item.name}</li>\n))}"
          },
          good: {
            label: "一意な id を key にする",
            text: "項目が動いても正しく追跡できる",
            language: "tsx",
            code: "{items.map((item) => (\n  <li key={item.id}>{item.name}</li>\n))}"
          }
        },
        {
          type: "list",
          ordered: false,
          items: [
            "配列 → map で JSX 要素の配列に変換 → {} で埋め込むと一覧になる",
            "map で作った各要素には key を付ける(React の決まり)",
            "key には id のような一意で不変な値を使う。index は避ける",
            "key は React が項目を照合するための目印であって、画面には表示されない"
          ]
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「このユーザー配列(id と name を持つ)を <ul><li> の一覧で表示する React コンポーネントを書いて。key は id を使って」と伝えると、正しい形で返ってきます。警告が出たら「key の警告が出た。原因と直し方を教えて」と続けて聞きましょう。"
        }
      ],
      questions: [
        {
          id: "reactday3-lesson1-q1",
          type: "choice",
          question: "配列を画面のリストに変換するとき、React で一般的に使うのはどれ?",
          choices: [
            "配列の forEach で 1件ずつ描画する",
            "配列の map で JSX 要素の配列を作り {} で埋め込む",
            "for 文で文字列を連結してから innerHTML に入れる",
            "配列を JSON.stringify して表示する"
          ],
          answerIndex: 1,
          explanation: "React では map で配列を JSX 要素の配列へ変換し、それを {} で埋め込みます。forEach は値を返さないため一覧の生成には向きません。"
        },
        {
          id: "reactday3-lesson1-q2",
          type: "choice",
          question: "リストの key に使う値として最も適切なのはどれ?",
          choices: [
            "map の index(0,1,2...)",
            "その項目に固有で変わらない値(id など)",
            "ランダムに毎回生成した値",
            "項目の表示名(name)を常に使う"
          ],
          answerIndex: 1,
          explanation: "key は項目を安定して照合するための目印なので、固有かつ不変な値(id など)が最適です。index は並び替えや削除でずれ、毎回ランダムだと毎回別物と見なされて再描画が無駄になります。"
        },
        {
          id: "reactday3-lesson1-q3",
          type: "free",
          question: "リストに key を付ける理由を、再描画のしくみに触れながら説明してください。",
          modelAnswer: "React は再描画のとき、前回のリストと今回のリストを見比べて、どの項目が同じでどれが増減・移動したかを判断します。key は各項目に付けた一意の目印で、これがあると「同じ key の項目は同じもの」と正しく追跡でき、必要な部分だけを効率よく更新できます。key が無い、あるいは index を使うと、並び替えや削除のときに項目の対応がずれ、表示崩れや入力値の取り違えが起きます。",
          interviewPhrase: "実務では「リストの key は id など一意で不変な値を使い、React が差分を正しく追跡できるようにしています」と説明します。",
          keywords: ["key", "map", "再描画", "差分", "一意", "index は避ける"]
        }
      ]
    },
    {
      id: "reactday3-lesson2",
      slug: "conditional-rendering",
      title: "条件付きレンダリング(出し分け)",
      summary: "&& と三項演算子を使って、状態に応じて表示する内容を切り替える。",
      blocks: [
        {
          type: "heading",
          text: "「今の状態」で見せるものを変える"
        },
        {
          type: "paragraph",
          text: "画面は常に同じものを見せているわけではありません。読み込み中はスピナー、ログイン済みならユーザー名、未ログインならログインボタン。こうした「状態によって表示を出し分ける」ことを条件付きレンダリングと呼びます。JSX の中では if 文を直接書けないので、JavaScript の式である && や三項演算子を使います。"
        },
        {
          type: "paragraph",
          text: "まずは「条件が真のときだけ表示する」パターン。論理積 && を使います。左が true のときだけ右の JSX が描画され、false のときは何も表示されません。"
        },
        {
          type: "code",
          language: "tsx",
          code: "function Panel({ isLoading }: { isLoading: boolean }) {\n  return (\n    <div>\n      {isLoading && <Spinner />}\n      <p>本文</p>\n    </div>\n  );\n}",
          caption: "isLoading が true のときだけ <Spinner /> を表示する(&& パターン)"
        },
        {
          type: "paragraph",
          text: "次は「A か B のどちらかを出す」パターン。三項演算子 条件 ? A : B を使います。条件が true なら A、false なら B が描画されます。ログイン状態での出し分けが典型例です。"
        },
        {
          type: "code",
          language: "tsx",
          code: "function Header({ isLoggedIn }: { isLoggedIn: boolean }) {\n  return (\n    <header>\n      {isLoggedIn ? <p>ようこそ!</p> : <button>ログイン</button>}\n    </header>\n  );\n}",
          caption: "三項演算子で「ログイン済み」と「未ログイン」の表示を切り替える"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ if 文でなく式を使うのか",
          text: "JSX の {} の中には「値を返す式」しか置けません。if 文は値を返さない文なので、そのままは埋め込めません。&& や三項演算子は「JSX という値を返す式」なので {} の中に置けます。どうしても if で書きたいときは、return の前で分岐して変数に入れておき、JSX ではその変数を使う、という書き方をします。"
        },
        {
          type: "callout",
          variant: "warn",
          title: "&& の左は boolean にする",
          text: "{items.length && <List />} のように書くと、length が 0 のとき画面に 0 が表示されてしまいます。数値や文字列は「そのまま値として出る」ためです。{items.length > 0 && <List />} のように、左を必ず true/false になる比較にしておくと安全です。",
        },
        {
          type: "compare",
          bad: {
            label: "数値をそのまま && の左に置く",
            text: "0 のとき画面に 0 が出てしまう",
            language: "tsx",
            code: "{count && <Badge count={count} />}"
          },
          good: {
            label: "比較して boolean にする",
            text: "0 のときは何も出ない",
            language: "tsx",
            code: "{count > 0 && <Badge count={count} />}"
          }
        },
        {
          type: "list",
          ordered: false,
          items: [
            "条件が真のときだけ出す → 条件 && <要素 />",
            "AかBのどちらかを出す → 条件 ? <A /> : <B />",
            "JSX の {} には「式」しか置けないので if 文は使えない",
            "&& の左は数値でなく比較(> 0 など)にして 0 の表示を防ぐ"
          ]
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「isLoading が true のときだけスピナーを出し、ログイン状態でヘッダーの表示を出し分けたい。&& と三項演算子で書いて」と頼むと意図どおりの分岐が返ります。0 が表示される不具合が出たら「条件のところに 0 が表示される。原因と直し方を教えて」と聞きましょう。"
        }
      ],
      questions: [
        {
          id: "reactday3-lesson2-q1",
          type: "choice",
          question: "「条件が true のときだけ <Spinner /> を表示する」書き方はどれ?",
          choices: [
            "{if (isLoading) <Spinner />}",
            "{isLoading && <Spinner />}",
            "{isLoading ? <Spinner />}",
            "{<Spinner /> when isLoading}"
          ],
          answerIndex: 1,
          explanation: "条件 && <要素 /> は、左が true のときだけ右を描画するパターンです。JSX の中に if 文は書けず、三項演算子は : の後ろも必要なので選択肢3も不正です。"
        },
        {
          id: "reactday3-lesson2-q2",
          type: "choice",
          question: "{items.length && <List />} と書いたとき、items が空(length が 0)だと起こることはどれ?",
          choices: [
            "何も表示されず問題ない",
            "画面に 0 という文字が表示されてしまう",
            "エラーで画面が真っ白になる",
            "<List /> が常に表示される"
          ],
          answerIndex: 1,
          explanation: "&& の左が数値 0 のとき、その 0 がそのまま描画されてしまいます。{items.length > 0 && <List />} のように比較して boolean にすれば防げます。"
        },
        {
          id: "reactday3-lesson2-q3",
          type: "free",
          question: "JSX の中で if 文が使えず、代わりに && や三項演算子を使うのはなぜか説明してください。",
          modelAnswer: "JSX の波かっこ {} の中に置けるのは「値を返す式」だけだからです。if 文は値を返さない文なので、そのままは埋め込めません。一方 && や三項演算子は、条件に応じて JSX という値を返す式なので {} の中に置けます。どうしても if で書きたい場合は、return の前で分岐して結果を変数に入れ、JSX ではその変数を使うようにします。",
          interviewPhrase: "実務では「JSX 内は式しか置けないので、出し分けは && と三項演算子で書き、複雑なら return 前に変数へ組み立てます」と説明します。",
          keywords: ["式", "if は文", "&&", "三項演算子", "出し分け"]
        }
      ]
    },
    {
      id: "reactday3-lesson3",
      slug: "forms-controlled",
      title: "制御コンポーネント(フォームの値を React が握る)",
      summary: "input の value を state に結びつけ、onChange で更新する制御コンポーネントの型を身につける。",
      blocks: [
        {
          type: "heading",
          text: "入力欄の値を React の state で管理する"
        },
        {
          type: "paragraph",
          text: "フォームの入力欄(input など)は、放っておくとブラウザ側が値を持ちます。React ではこれを「state に値を持たせ、input はその state を映すだけ」に変えるのが定番です。こうすると入力値の唯一の正解が state になり、React がフォームを握れます。この形を制御コンポーネントと呼びます。"
        },
        {
          type: "paragraph",
          text: "作り方は2ステップです。1つ目、input の value に state を渡す(表示は常に state に従う)。2つ目、onChange で入力のたびに setState して state を更新する。これで「state → 表示」「入力 → state」が一周し、常に一致します。"
        },
        {
          type: "code",
          language: "tsx",
          code: "import { useState } from \"react\";\n\nfunction NameForm() {\n  const [name, setName] = useState(\"\");\n\n  return (\n    <input\n      value={name}\n      onChange={(e) => setName(e.target.value)}\n    />\n  );\n}",
          caption: "value に state を渡し、onChange で state を更新する(制御コンポーネントの基本形)"
        },
        {
          type: "paragraph",
          text: "onChange に渡す関数は、イベント e を受け取ります。入力された今の文字列は e.target.value で取れます。これを setName に渡すと state が更新され、再描画で value={name} が新しい値になり、画面に反映されます。"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ React に値を握らせるのか",
          text: "値が state にあると、送信前の入力チェック、他の欄と連動した表示、ボタンの有効・無効の切り替え、入力のリセットなどが、すべて state を見る・書き換えるだけで実現できます。値がブラウザ任せだと「今いくつ入っているか」を毎回取りに行く必要があり、ロジックが散らかります。state に一本化することで扱いやすくなります。"
        },
        {
          type: "compare",
          bad: {
            label: "非制御(値をブラウザが持つ)",
            text: "value を state に結ばず、必要なときに DOM から読み出す",
            language: "tsx",
            code: "// React は値を把握していない\n<input ref={inputRef} />\n// 送信時に inputRef.current.value を取りに行く"
          },
          good: {
            label: "制御(値を React が持つ)",
            text: "value を state に結び、常に state が唯一の正解",
            language: "tsx",
            code: "<input\n  value={name}\n  onChange={(e) => setName(e.target.value)}\n/>"
          }
        },
        {
          type: "paragraph",
          text: "フォームの送信も押さえておきます。<form> の onSubmit で送信を受け取りますが、そのままだとブラウザがページを再読み込みしてしまいます。これを止めるのが e.preventDefault() です。止めた上で、state に入っている値を使って処理します。"
        },
        {
          type: "code",
          language: "tsx",
          code: "function SearchForm() {\n  const [keyword, setKeyword] = useState(\"\");\n\n  const handleSubmit = (e) => {\n    e.preventDefault(); // ページ再読み込みを止める\n    console.log(\"検索:\", keyword);\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input\n        value={keyword}\n        onChange={(e) => setKeyword(e.target.value)}\n      />\n      <button type=\"submit\">検索</button>\n    </form>\n  );\n}",
          caption: "onSubmit で受け取り、preventDefault で再読み込みを止めてから state の値を使う"
        },
        {
          type: "list",
          ordered: true,
          items: [
            "state を用意する(useState で入力値を持つ)",
            "input の value に state を渡す(表示は state に従う)",
            "onChange で e.target.value を setState して更新する",
            "送信は onSubmit で受け、先頭で e.preventDefault() を呼ぶ"
          ]
        },
        {
          type: "callout",
          variant: "warn",
          title: "value を渡すなら onChange も必ず付ける",
          text: "value={name} だけ書いて onChange を付けないと、値が state に固定されて何を打っても変わらない「読み取り専用」になり、React が警告します。制御コンポーネントでは value と onChange は必ずセットにします。",
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「名前とメールを入力する制御コンポーネントのフォームを作って。各 input は value を state に結び、onChange で更新。送信は onSubmit で preventDefault してから値をまとめてログに出して」と伝えると、この章の型どおりのコードが返ります。"
        }
      ],
      questions: [
        {
          id: "reactday3-lesson3-q1",
          type: "choice",
          question: "制御コンポーネントで input を作るとき、value と一緒に必ず用意すべきものはどれ?",
          choices: [
            "ref(DOM への参照)",
            "onChange(入力のたびに state を更新するハンドラ)",
            "defaultValue(初期値)",
            "placeholder(プレースホルダー)"
          ],
          answerIndex: 1,
          explanation: "value を state に結んだら、入力を反映するために onChange で setState する必要があります。onChange が無いと値が変わらず、React が読み取り専用の警告を出します。"
        },
        {
          id: "reactday3-lesson3-q2",
          type: "choice",
          question: "onChange のハンドラで、入力された今の文字列を取り出すのはどれ?",
          choices: [
            "e.value",
            "e.target.value",
            "e.input",
            "e.state"
          ],
          answerIndex: 1,
          explanation: "onChange の関数はイベント e を受け取り、入力欄の現在値は e.target.value で取得できます。これを setState に渡して state を更新します。"
        },
        {
          id: "reactday3-lesson3-q3",
          type: "free",
          question: "「非制御コンポーネント」と「制御コンポーネント」の違いを、値をどこが持つかに注目して説明してください。",
          modelAnswer: "非制御コンポーネントは、入力値をブラウザ(DOM)が持ち、React は値を把握していません。必要になったとき ref などで DOM から値を読み出します。制御コンポーネントは、入力値を React の state が持ち、input の value に state を渡して表示させ、onChange で入力のたびに state を更新します。制御では state が値の唯一の正解になるため、入力チェックや連動表示、リセットなどを state を見るだけで扱え、ロジックが一箇所にまとまります。",
          interviewPhrase: "実務では「フォームは基本、制御コンポーネントにして値を state で一元管理し、入力チェックや送信もその state を見て行います」と説明します。",
          keywords: ["制御", "非制御", "value", "onChange", "state が唯一の正解"]
        }
      ]
    }
  ]
};
