import type { Day } from "@/types";

export const reactDay2: Day = {
  day: 2,
  slug: "day2",
  title: "state と イベント — 動くUIの心臓部",
  goal: "useStateでstateを読んで説明でき、onClick/onChangeでイベントを扱え、stateが変わると自動で再描画される仕組みを理解する。",
  lessons: [
    {
      id: "reactday2-lesson1",
      slug: "usestate",
      title: "state と useState — コンポーネントが覚えておく値",
      summary: "画面が覚えておきたい値=stateと、それを扱うためのuseStateの読み方を学ぶ。なぜ普通の変数ではダメなのかを腹落ちさせる。",
      blocks: [
        {
          type: "heading",
          text: "state=「画面が覚えておく値」"
        },
        {
          type: "paragraph",
          text: "ボタンを押した回数、入力欄に打った文字、メニューが開いているかどうか。こうした「今の画面の状態」を表す値をstate(状態)と呼びます。ページを操作するたびに変わっていく値、と考えるとイメージしやすいです。たとえば料理中のタイマー表示。残り時間という数字が刻々と変わり、そのたびに表示も変わる。あの「変わる数字」がまさにstateです。"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜstateという専用のしくみが必要なのか",
          text: "Reactの画面は「今のstateを見て組み立てる」という作りです。値が変わったら画面も自動で描き直したい。ところが普通の変数を書き換えても、Reactは「変わった」ことに気づけません。そこで「この値はstateです」とReactに登録しておくと、値が変わったときにReactが画面を作り直してくれます。stateは、値と画面を連動させるための専用の箱なのです。"
        },
        {
          type: "heading",
          text: "useState の読み方"
        },
        {
          type: "paragraph",
          text: "stateを作るにはuseStateを使います。次の1行がReactで最も出てくる形です。左辺の角かっこは「配列を2つに分ける書き方(分割代入)」で、1つ目が今の値、2つ目がその値を更新するための関数です。命名はcountとsetCountのように「値」と「setつきの更新関数」でそろえるのが定番です。"
        },
        {
          type: "code",
          language: "tsx",
          caption: "useStateの基本形。countが今の値、setCountが更新用の関数",
          code: "const [count, setCount] = useState(0);\n// useState(0) の 0 は「最初の値(初期値)」\n// count      … 今の値(最初は 0)\n// setCount   … count を新しい値に更新する関数\nreturn <button onClick={() => setCount(count + 1)}>{count}</button>;"
        },
        {
          type: "paragraph",
          text: "useStateに渡した0は初期値です。一番最初に画面が表示されるときだけ使われ、以降はsetCountで更新された値が使われます。countをそのまま画面に{count}と埋め込めば、今の値がそのまま表示されます。"
        },
        {
          type: "heading",
          text: "なぜ普通の変数ではダメなのか"
        },
        {
          type: "paragraph",
          text: "「変わる値なら普通の変数(let count = 0)でいいのでは?」と思うかもしれません。ところがletの変数を書き換えても、Reactは画面を作り直しません。数字は裏で増えているのに、表示は0のまま固まる。値と画面がズレてしまうのです。stateにして初めて「値が変わったら描き直す」がつながります。"
        },
        {
          type: "compare",
          bad: {
            label: "普通の変数:値は変わるが画面が更新されない",
            language: "tsx",
            text: "letを書き換えてもReactは気づかず、表示は0のまま",
            code: "let count = 0;\nfunction handleClick() {\n  count = count + 1; // 裏では増えるが…\n}\nreturn <button onClick={handleClick}>{count}</button>;"
          },
          good: {
            label: "state:値が変わると画面も更新される",
            language: "tsx",
            text: "setCountで更新するとReactが画面を作り直す",
            code: "const [count, setCount] = useState(0);\nfunction handleClick() {\n  setCount(count + 1); // 値も画面も更新される\n}\nreturn <button onClick={handleClick}>{count}</button>;"
          }
        },
        {
          type: "callout",
          variant: "warn",
          title: "更新は必ずsetterで",
          text: "count = count + 1 のように、stateの値を直接書き換えてはいけません。Reactが変化に気づけず画面が更新されないうえ、思わぬバグの温床になります。値を変えたいときは必ずsetCountのような更新関数(setter)を通します。"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「このコンポーネントで覚えておくべき値(state)はどれ? useStateで書くとどうなる?」と聞くと、何をstateにすべきかと、useStateの書き方をセットで教えてくれます。既存コードを貼って「このletはstateにすべき?」と聞くのも有効です。"
        },
        {
          type: "list",
          ordered: false,
          items: [
            "stateは「画面が覚えておく、変わっていく値」",
            "const [値, set値] = useState(初期値) が基本形",
            "1つ目が今の値、2つ目が更新用の関数",
            "普通の変数を書き換えても画面は更新されない=stateにする理由"
          ]
        }
      ],
      questions: [
        {
          id: "reactday2-lesson1-q1",
          type: "choice",
          question: "const [count, setCount] = useState(0); の setCount は何を表している?",
          choices: [
            "countの今の値",
            "countを新しい値に更新するための関数",
            "画面を消すための関数",
            "初期値の0そのもの"
          ],
          answerIndex: 1,
          explanation: "useStateは[今の値, 更新関数]の順で返します。1つ目のcountが今の値、2つ目のsetCountがcountを更新するための関数です。0は初期値でこの2つとは別物です。"
        },
        {
          id: "reactday2-lesson1-q2",
          type: "choice",
          question: "画面に表示したい数字を let count = 0 の普通の変数にして書き換えると、どうなる?",
          choices: [
            "値も画面も正しく更新される",
            "値は変わるがReactが気づかず、画面は更新されない",
            "実行時に必ずエラーで止まる",
            "初期値の0が二度と表示されなくなる"
          ],
          answerIndex: 1,
          explanation: "普通の変数を書き換えてもReactは「変わった」ことに気づけないため、画面を作り直しません。裏で値は変わっても表示は古いまま固まります。だからstate(useState)を使います。"
        },
        {
          id: "reactday2-lesson1-q3",
          type: "free",
          question: "「なぜ画面が変わる値は普通の変数ではなくstateにするのか」を、初学者に説明するつもりで書いてください。",
          modelAnswer: "Reactは今のstateを見て画面を組み立て、stateが変わると自動で画面を作り直します。普通の変数を書き換えてもReactは変化に気づけないため、値は変わっても表示が古いまま固まってしまいます。useStateでstateとして登録し、setterで更新することで、値の変化に合わせて画面も更新されるようになります。",
          interviewPhrase: "実務でこう説明する: 「画面と連動して変わる値はstateにして、必ずsetterで更新する。そうしないとReactが再描画してくれない」と説明します。",
          keywords: ["state", "useState", "再描画", "setter"]
        }
      ]
    },
    {
      id: "reactday2-lesson2",
      slug: "events",
      title: "イベント処理 — onClick と onChange",
      summary: "クリックや入力に反応する書き方を学ぶ。イベントには「関数そのもの」を渡すという最重要ポイントを、よくある間違いと一緒に押さえる。",
      blocks: [
        {
          type: "heading",
          text: "イベント=「ユーザーの操作」に反応する"
        },
        {
          type: "paragraph",
          text: "ボタンをクリックした、入力欄に文字を打った、といったユーザーの操作をイベントと呼びます。Reactでは、こうした操作に「そのとき動かしたい関数」を結びつけます。もっともよく使うのがクリックのonClickと、入力変化のonChangeです。玄関の呼び鈴にたとえると、onClickは「押されたら鳴らす仕掛けをセットしておく」ことに当たります。"
        },
        {
          type: "code",
          language: "tsx",
          caption: "onClickにアロー関数を渡す。クリックされた瞬間に中身が動く",
          code: "const [count, setCount] = useState(0);\nreturn (\n  <button onClick={() => setCount(count + 1)}>\n    {count} 回クリックされました\n  </button>\n);"
        },
        {
          type: "heading",
          text: "最重要:渡すのは「関数」であって「呼び出した結果」ではない"
        },
        {
          type: "paragraph",
          text: "ここがイベントで一番つまずくところです。onClickには「クリックされたら実行してね」という関数そのものを渡します。Reactが預かっておいて、クリックされた瞬間に呼び出してくれます。呼び出しは「あなた」ではなく「React」がやる、という感覚が大事です。"
        },
        {
          type: "code",
          language: "tsx",
          caption: "関数を渡す2つの正しい書き方",
          code: "function handleClick() {\n  setCount(count + 1);\n}\n\n// 書き方1:名前の付いた関数を「そのまま」渡す\n<button onClick={handleClick}>+1</button>\n\n// 書き方2:その場でアロー関数を作って渡す(引数を渡したいとき便利)\n<button onClick={() => setCount(count + 1)}>+1</button>"
        },
        {
          type: "callout",
          variant: "warn",
          title: "onClick={handleClick} と onClick={handleClick()} の違い",
          text: "onClick={handleClick} はhandleClickという関数を「渡す」ので、クリックしたときに動きます。一方 onClick={handleClick()} はかっこが付いていて、画面を組み立てた瞬間にhandleClickを「実行」してしまい、その戻り値を渡すことになります。結果、クリック前に一度動いてしまったり、無限ループになったりします。イベントには「かっこを付けずに関数名だけ」渡すのが基本です。"
        },
        {
          type: "compare",
          bad: {
            label: "() を付けて渡す:描画時に実行されてしまう",
            language: "tsx",
            text: "handleClick() はクリック前に呼び出される",
            code: "<button onClick={handleClick()}>+1</button>"
          },
          good: {
            label: "関数そのものを渡す:クリック時に実行される",
            language: "tsx",
            text: "handleClick はクリックされたときだけ動く",
            code: "<button onClick={handleClick}>+1</button>"
          }
        },
        {
          type: "heading",
          text: "onChange:入力の変化を受け取る"
        },
        {
          type: "paragraph",
          text: "入力欄(input)では、文字が変わるたびにonChangeが呼ばれます。渡した関数はイベント情報(e)を受け取り、e.target.valueで「今入力欄に入っている文字」を取り出せます。それをstateに入れれば、入力とstateが常に同期します。"
        },
        {
          type: "code",
          language: "tsx",
          caption: "onChangeで入力値をstateに反映する",
          code: "const [name, setName] = useState(\"\");\nreturn (\n  <input\n    value={name}\n    onChange={(e) => setName(e.target.value)}\n    placeholder=\"名前を入力\"\n  />\n);"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「このボタンのonClickに関数を渡す形に直して。onClick={fn()} と onClick={fn} の違いも説明して」と聞くと、正しい渡し方に直したうえで、なぜかっこを外すのかまで教えてくれます。onChangeで「入力値をstateに入れる書き方」を頼むのも定番です。"
        },
        {
          type: "list",
          ordered: false,
          items: [
            "onClickはクリック、onChangeは入力変化に反応する",
            "イベントには「関数そのもの」を渡す(呼び出した結果ではない)",
            "onClick={fn} は正しい、onClick={fn()} は描画時に実行されてしまう",
            "引数を渡したいときは () => fn(引数) のようにアロー関数で包む"
          ]
        }
      ],
      questions: [
        {
          id: "reactday2-lesson2-q1",
          type: "choice",
          question: "onClick={handleClick} と onClick={handleClick()} の違いとして正しいものはどれ?",
          choices: [
            "どちらも同じで、クリック時に動く",
            "前者はクリック時に動き、後者は描画された瞬間に実行されてしまう",
            "前者は動かず、後者だけがクリック時に動く",
            "後者のほうが速く動くだけで意味は同じ"
          ],
          answerIndex: 1,
          explanation: "onClick={handleClick} は関数そのものを渡すのでクリック時に動きます。onClick={handleClick()} はかっこ付きで、画面を組み立てた瞬間に実行され、その戻り値が渡ってしまいます。イベントには関数をかっこなしで渡します。"
        },
        {
          id: "reactday2-lesson2-q2",
          type: "choice",
          question: "onChangeで、入力欄に今入っている文字を取り出すにはどれを使う?",
          choices: [
            "e.value.target",
            "e.target.value",
            "e.input.text",
            "e.change.value"
          ],
          answerIndex: 1,
          explanation: "onChangeに渡した関数はイベントeを受け取り、e.target.valueで入力欄の現在の文字を取り出せます。これをsetterでstateに入れると入力とstateが同期します。"
        },
        {
          id: "reactday2-lesson2-q3",
          type: "free",
          question: "「イベントには関数そのものを渡す(呼び出した結果ではない)」とはどういうことか、自分の言葉で説明してください。",
          modelAnswer: "onClickなどのイベントには、クリックされたときに実行してほしい関数を「そのまま」渡します。Reactがその関数を預かっておき、操作された瞬間に呼び出してくれます。onClick={fn} のようにかっこを付けずに渡すのが正解で、onClick={fn()} とかっこを付けると画面を組み立てた瞬間に実行されてしまい、戻り値が渡ってしまいます。引数を渡したいときは () => fn(引数) とアロー関数で包みます。",
          interviewPhrase: "実務でこう説明する: 「イベントには関数を渡すだけ。呼び出すのはReact。かっこを付けると描画時に実行されてしまうので注意」と説明します。",
          keywords: ["onClick", "関数", "呼び出し", "onChange"]
        }
      ]
    },
    {
      id: "reactday2-lesson3",
      slug: "re-render",
      title: "再レンダリングの直感 — stateと画面が同期する感覚",
      summary: "stateが変わると、その部品が再実行されて画面が更新される流れを直感でつかむ。stateを直接書き換えず必ずsetterを使う理由も押さえる。",
      blocks: [
        {
          type: "heading",
          text: "再レンダリング=「state更新 → 部品を作り直す」"
        },
        {
          type: "paragraph",
          text: "Reactの心臓部を一言でいうと「stateが変わったら、その部品(コンポーネント)をもう一度実行して画面を作り直す」です。この作り直しを再レンダリング(再描画)と呼びます。コンポーネントは関数なので、stateが変わるたびにその関数がもう一度呼ばれ、新しいstateを使って新しい見た目を返す、という流れになります。"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ「自動で作り直す」がうれしいのか",
          text: "昔ながらのやり方だと、値が変わるたびに「どのHTML要素を、どう書き換えるか」を自分で指示する必要がありました。Reactでは「今のstateならこう表示する」というルールだけ書けば、あとはstateが変わるたびにReactが差分を計算して画面を更新してくれます。私たちは『状態と見た目の対応』だけを考えればよく、更新の手作業から解放されます。"
        },
        {
          type: "heading",
          text: "流れを追ってみる:カウンターの例"
        },
        {
          type: "paragraph",
          text: "ボタンを押すとsetCountが呼ばれ、countが変わります。するとReactがこのコンポーネント関数をもう一度実行し、新しいcountを使って画面を作り直します。だから表示の数字が増える。「setter → state更新 → 再実行 → 画面更新」という一本道を覚えると、動きが読めるようになります。"
        },
        {
          type: "code",
          language: "tsx",
          caption: "カウンター:ボタンを押すたびに再レンダリングされて表示が増える",
          code: "function Counter() {\n  const [count, setCount] = useState(0);\n  // ↓ ここは count が変わるたびに毎回実行される\n  return (\n    <div>\n      <p>今の値: {count}</p>\n      <button onClick={() => setCount(count + 1)}>+1</button>\n    </div>\n  );\n}"
        },
        {
          type: "heading",
          text: "トグルの例:true と false を切り替える"
        },
        {
          type: "paragraph",
          text: "「開いている / 閉じている」のような2状態の切り替え(トグル)も同じ理屈です。booleanのstateを反転させると再レンダリングが起き、表示が切り替わります。stateと画面がぴったり同期している感覚をつかんでください。"
        },
        {
          type: "code",
          language: "tsx",
          caption: "トグル:stateを反転させると表示が切り替わる",
          code: "function Toggle() {\n  const [open, setOpen] = useState(false);\n  return (\n    <div>\n      <button onClick={() => setOpen(!open)}>\n        {open ? \"閉じる\" : \"開く\"}\n      </button>\n      {open && <p>中身が見えています</p>}\n    </div>\n  );\n}"
        },
        {
          type: "callout",
          variant: "warn",
          title: "stateを直接書き換えない — 必ずsetterを使う",
          text: "count = count + 1 や、配列・オブジェクトのstateを list.push(...) のように直接いじるのはNGです。直接書き換えるとReactは「変わった」ことに気づけず再レンダリングが起きません。表示が古いまま固まったり、更新のタイミングがおかしくなったりします。値を変えたいときは必ずsetCountやsetOpenなどのsetterを通します。"
        },
        {
          type: "compare",
          bad: {
            label: "直接書き換え:再レンダリングされない",
            language: "tsx",
            text: "count++ ではReactが気づかず表示が固まる",
            code: "<button onClick={() => count++}>+1</button>"
          },
          good: {
            label: "setterで更新:再レンダリングされる",
            language: "tsx",
            text: "setCountを通せば画面も更新される",
            code: "<button onClick={() => setCount(count + 1)}>+1</button>"
          }
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「このボタンを押しても画面が更新されないのはなぜ? stateを直接書き換えていないか確認して」と聞くと、setterを使っていない・直接書き換えているといった原因を指摘してくれます。「再レンダリングが起きる条件を教えて」と聞くのも理解が深まります。"
        },
        {
          type: "list",
          ordered: false,
          items: [
            "再レンダリング=stateが変わると、その部品が再実行され画面が更新される",
            "流れは「setter → state更新 → 再実行 → 画面更新」の一本道",
            "私たちは『今のstateならこう表示』だけを書けばよい",
            "stateを直接書き換えると再レンダリングされない。必ずsetterを使う"
          ]
        }
      ],
      questions: [
        {
          id: "reactday2-lesson3-q1",
          type: "choice",
          question: "Reactで「再レンダリング」が起きるのはどんなとき?",
          choices: [
            "ファイルを保存したとき",
            "stateがsetterで更新されたとき",
            "普通の変数をletで書き換えたとき",
            "コメントを書いたとき"
          ],
          answerIndex: 1,
          explanation: "stateがsetterで更新されると、Reactはそのコンポーネントをもう一度実行して画面を作り直します。これが再レンダリングです。普通の変数を書き換えてもReactは気づかず、再レンダリングは起きません。"
        },
        {
          id: "reactday2-lesson3-q2",
          type: "choice",
          question: "ボタンを押しても画面の数字が増えない。もっとも疑うべき原因はどれ?",
          choices: [
            "初期値が0だから",
            "countを count++ のように直接書き換えていて、setterを使っていない",
            "returnの中に文字がないから",
            "コンポーネント名が英語だから"
          ],
          answerIndex: 1,
          explanation: "stateを直接書き換えるとReactが変化に気づけず再レンダリングが起きません。setCountなどのsetterを通して更新すると、画面も更新されます。"
        },
        {
          id: "reactday2-lesson3-q3",
          type: "free",
          question: "「stateが変わると画面が更新される」という再レンダリングの流れを、初学者に説明するつもりで書いてください。",
          modelAnswer: "コンポーネントは関数で、Reactは今のstateを使って画面を組み立てます。setterでstateを更新すると、Reactがその関数をもう一度実行し、新しいstateを使って画面を作り直します。これが再レンダリングです。だからボタンでcountを増やすと表示も増えます。ただしstateを直接書き換えるとReactが変化に気づけず更新されないので、必ずsetterを使います。",
          interviewPhrase: "実務でこう説明する: 「stateをsetterで更新するとコンポーネントが再実行されて画面が更新される。だからstateと見た目は常に同期する」と説明します。",
          keywords: ["再レンダリング", "state", "setter", "同期"]
        }
      ]
    }
  ]
};
