import type { Day } from "@/types";

export const reactDay4: Day = {
  day: 4,
  slug: "day4",
  title: "useEffect と データ取得 — 外の世界とつながる",
  goal: "useEffectで副作用を読み書きでき、fetchでAPIからデータを取得し、読み込み中・成功・失敗の状態を扱えるようになる。",
  lessons: [
    {
      id: "reactday4-lesson1",
      slug: "useeffect",
      title: "副作用とuseEffect — 描画のあとに動く処理",
      summary: "「画面を描くこと以外の処理」をどこに書くか。useEffectと依存配列の意味を、たとえで理解する。",
      blocks: [
        { type: "heading", text: "副作用ってなに？" },
        { type: "paragraph", text: "Reactのコンポーネントは、本来は「今の状態(state)を受け取って、画面(JSX)を返すだけ」の関数です。入力が同じなら出力も同じ、という素直な計算に近いものです。ところが実際のアプリでは、それだけでは足りません。サーバーにデータを取りに行ったり、タイマーを動かしたり、外部のイベントを購読したり、といった「画面を描くこと以外の処理」が必要になります。この、描画の外側で世界に触れる処理のことを副作用(effect)と呼びます。" },
        { type: "paragraph", text: "たとえるなら、コンポーネントの本体は「注文票を見て料理の見た目を絵に描く」係です。でも実際にはお客さんの人数をお店に電話で問い合わせたり、タイマーをセットして焼き加減を測ったりもしたい。この「電話をかける」「タイマーをセットする」といった、絵を描くのとは別の外向きの行動が副作用です。これを絵を描いている最中にやると手が止まってしまうので、描き終わったあとにまとめてやろう、というのがuseEffectの発想です。" },
        { type: "callout", variant: "why", title: "なぜ描画とは分けるのか", text: "Reactは同じstateなら同じ画面になることを前提に、再描画のたびにコンポーネント関数を何度も呼び出します。もし関数の本体で直接fetchやタイマーを動かすと、描画のたびに通信が走ったり、動作が予測できなくなります。だから副作用は本体から追い出し、useEffectという専用の置き場所にまとめます。" },
        { type: "heading", text: "useEffectの形" },
        { type: "paragraph", text: "useEffectは「描画が終わったあとに、この処理を動かして」とReactにお願いする道具です。第一引数に動かしたい関数を、第二引数に依存配列(deps)という配列を渡します。この依存配列が、いつ再実行するかを決める心臓部です。" },
        { type: "code", language: "tsx", code: "import { useEffect, useState } from \"react\";\n\nfunction Clock() {\n  const [now, setNow] = useState(new Date());\n\n  useEffect(() => {\n    // 描画のあとに1秒ごとに現在時刻を更新する副作用\n    const id = setInterval(() => setNow(new Date()), 1000);\n    // 後片付け: このコンポーネントが消えるときにタイマーを止める\n    return () => clearInterval(id);\n  }, []);\n\n  return <p>{now.toLocaleTimeString()}</p>;\n}", caption: "useEffect(処理, 依存配列) の形。returnした関数は後片付けに使われる" },
        { type: "heading", text: "依存配列 = いつ再実行するか" },
        { type: "paragraph", text: "依存配列は「この中の値が前回と変わっていたら、もう一度副作用を実行してね」という指示リストです。Reactは再描画のたびに、配列の中身を前回と見比べます。何か変わっていれば副作用を動かし直し、すべて同じなら何もしません。だから配列に何を入れるかで、実行のタイミングが決まります。" },
        { type: "list", ordered: false, items: ["依存配列なし → 毎回の描画のあとに実行される(使いどころは少ない)", "空の配列 [] → 最初の描画のあと一度だけ実行される", "[url] のように値を入れる → その値が変わったときだけ再実行される"] },
        { type: "code", language: "tsx", code: "// userId が変わるたびに、そのユーザーのデータを取り直す\nuseEffect(() => {\n  fetch(`/api/users/${userId}`)\n    .then((r) => r.json())\n    .then(setUser);\n}, [userId]);", caption: "[userId] を依存に入れると、別のユーザーに切り替わったとき自動で取り直す" },
        { type: "callout", variant: "warn", title: "依存の入れ忘れに注意", text: "副作用の中で使っている値(上の例のuserIdなど)は、原則すべて依存配列に入れます。入れ忘れると、値が変わっても副作用が古い値のまま動き続け、「別のユーザーを選んだのに前の人のデータが出る」といったバグになります。逆に空配列 [] は「本当に初回だけでいい」と確信できるときにだけ使いましょう。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このuseEffectの依存配列はこれで正しいですか？中で使っている値を全部挙げて、入れ忘れがないか指摘してください」と聞くと、依存の抜けを洗い出せます。AIが生成したuseEffectも、依存配列だけは自分の目で確認するクセをつけましょう。" }
      ],
      questions: [
        { id: "reactday4-lesson1-q1", type: "choice", question: "useEffectの第二引数に空の配列 [] を渡すと、副作用はいつ実行されますか？", choices: ["毎回の再描画のあとに実行される", "最初の描画のあと一度だけ実行される", "一度も実行されない", "stateが変わるたびに実行される"], answerIndex: 1, explanation: "空配列は「見比べる依存が何もない=常に変化なし」という意味なので、初回の描画後に一度だけ実行され、その後は再実行されません。毎回実行したいなら依存配列自体を省略します。" },
        { id: "reactday4-lesson1-q2", type: "choice", question: "副作用(effect)の説明として最も適切なものは？", choices: ["JSXを組み立てて画面を返す処理", "描画以外の、外の世界に触れる処理(データ取得・購読・タイマーなど)", "propsを子コンポーネントに渡す処理", "stateを宣言する処理"], answerIndex: 1, explanation: "副作用とは、コンポーネントの本来の仕事である描画の外側で、サーバー通信・イベント購読・タイマーなど外の世界に触れる処理を指します。これらはuseEffectにまとめます。" },
        { id: "reactday4-lesson1-q3", type: "free", question: "依存配列(deps)が何を決めているのか、たとえを交えて説明してください。", modelAnswer: "依存配列は「この中の値が前回と変わっていたら副作用をもう一度実行してね」という指示リストです。Reactは再描画のたびに配列の中身を前回と見比べ、変化があれば副作用を再実行し、なければ何もしません。空配列なら初回だけ、[userId]のように値を入れればその値が変わったときだけ実行されます。買い物メモに「牛乳が切れていたら買い直す」と書いておくのと同じで、条件が変わったときだけ動くように制御します。", interviewPhrase: "実務では「依存配列で副作用の再実行タイミングを制御していて、中で参照している値は入れ忘れないようにしています」と説明します。", keywords: ["依存配列", "再実行", "空配列", "初回", "入れ忘れ"] }
      ]
    },
    {
      id: "reactday4-lesson2",
      slug: "data-fetching",
      title: "fetchでデータを取ってstateに入れる",
      summary: "useEffectの中でAPIを叩き、返ってきたデータをuseStateに入れて画面に出す。JSで学んだfetchがここで生きる。",
      blocks: [
        { type: "heading", text: "データ取得の全体像" },
        { type: "paragraph", text: "外部のAPIからデータを取ってきて画面に出す、というのはアプリで最もよくある処理です。Reactでの流れはいつも同じ形になります。まずuseStateで「取ってきたデータを入れておく箱」を用意します。次にuseEffectの中でfetchを使ってサーバーに問い合わせます。返ってきたデータをsetで箱に入れると、stateが変わったReactが自動で再描画してくれて、画面にデータが現れます。" },
        { type: "list", ordered: true, items: ["useStateで空の箱(初期値)を用意する", "useEffectの中でfetchしてデータを取りに行く", "取れたデータをsetで箱に入れる", "stateが変わり、Reactが自動で再描画して画面に反映される"] },
        { type: "callout", variant: "why", title: "なぜfetchはuseEffectの中なのか", text: "コンポーネントの本体で直接fetchすると、再描画のたびに通信が走り、その結果でsetすればまた再描画…と無限ループに陥りがちです。fetchは副作用なので、描画のあとに動くuseEffectに置き、依存配列で「いつ取りに行くか」を制御するのが正しい置き場所です。" },
        { type: "heading", text: ".then()で書く基本形" },
        { type: "paragraph", text: "JavaScriptで学んだfetchは、そのままReactでも使えます。fetchはPromiseを返すので、.then()でレスポンスを受け取り、.json()で本文を取り出し、もう一度.then()でsetに渡します。下の例は、記事一覧を初回に一度だけ取ってくる形です。" },
        { type: "code", language: "tsx", code: "import { useEffect, useState } from \"react\";\n\nfunction ArticleList() {\n  const [articles, setArticles] = useState([]);\n\n  useEffect(() => {\n    fetch(\"/api/articles\")\n      .then((r) => r.json())\n      .then((data) => setArticles(data));\n  }, []); // 初回に一度だけ取得\n\n  return (\n    <ul>\n      {articles.map((a) => (\n        <li key={a.id}>{a.title}</li>\n      ))}\n    </ul>\n  );\n}", caption: ".then()チェーンでfetch→json→setとつなぐ" },
        { type: "heading", text: "async/awaitで書きたいとき" },
        { type: "paragraph", text: "async/awaitのほうが読みやすいと感じる人も多いはずです。ただし注意点があります。useEffectに渡す関数そのものをasyncにしてはいけません。async関数はPromiseを返しますが、useEffectは後片付け用の関数が返ってくることを期待しているため、噛み合わなくなるからです。そこで、effectの中に別のasync関数を作って、それをその場で呼び出すのが定番の書き方です。" },
        { type: "compare", bad: { label: "effectの引数を直接asyncにする(NG)", language: "tsx", code: "useEffect(async () => {\n  const r = await fetch(\"/api/articles\");\n  const data = await r.json();\n  setArticles(data);\n}, []);\n// effectがPromiseを返してしまい、後片付けと噛み合わない" }, good: { label: "中でasync関数を作って呼ぶ", language: "tsx", code: "useEffect(() => {\n  const load = async () => {\n    const r = await fetch(\"/api/articles\");\n    const data = await r.json();\n    setArticles(data);\n  };\n  load();\n}, []);\n// effect自体は普通の関数のまま。中でawaitを使える" } },
        { type: "callout", variant: "warn", title: "取得中に画面が変わることを忘れない", text: "fetchは時間がかかるので、返事が来る前に別の画面へ移動したり、依存配列の値が変わって再取得が走ったりします。返事が遅れて届いたとき、すでに消えたコンポーネントにsetしようとすると警告が出ることがあります。まずは「取得は非同期で、あとから返ってくる」という感覚を持っておきましょう。次のレッスンで状態設計を学ぶと、この扱いがぐっと楽になります。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このfetchをuseEffectの中でasync/awaitを使って書き直して。effectの引数は直接asyncにしないで、中で関数を作る形にして」と頼むと、定番のパターンで書いてくれます。生成されたコードでも、依存配列とasyncの置き場所は自分で確認しましょう。" }
      ],
      questions: [
        { id: "reactday4-lesson2-q1", type: "choice", question: "Reactで取得したデータを画面に反映させる正しい流れは？", choices: ["fetchの結果を直接JSXに書けば自動で表示される", "fetchで取ったデータをsetでstateに入れ、再描画で画面に反映する", "useEffectの外でfetchしてグローバル変数に入れる", "fetchの戻り値をそのままreturnする"], answerIndex: 1, explanation: "取得したデータはsetでstateに入れます。stateが変わるとReactが自動で再描画し、画面にデータが現れます。グローバル変数や直接returnでは再描画は起きません。" },
        { id: "reactday4-lesson2-q2", type: "choice", question: "useEffectの中でasync/awaitを使いたいとき、正しい書き方は？", choices: ["useEffect(async () => { ... }) のように引数を直接asyncにする", "effectの中で別のasync関数を定義し、その場で呼び出す", "awaitはuseEffectでは使えないので必ず.then()にする", "コンポーネント関数自体をasyncにする"], answerIndex: 1, explanation: "useEffectに渡す関数を直接asyncにするとPromiseを返してしまい後片付けと噛み合いません。中でasync関数を定義して呼び出すのが定番です。コンポーネント関数自体をasyncにするのも誤りです。" },
        { id: "reactday4-lesson2-q3", type: "free", question: "なぜfetchはコンポーネント本体ではなくuseEffectの中に書くのか、説明してください。", modelAnswer: "コンポーネント本体は再描画のたびに何度も実行されるため、そこで直接fetchすると描画のたびに通信が走ります。取得結果でsetすればまた再描画され、それでまたfetch…と無限ループになりがちです。fetchは描画以外の副作用なので、描画のあとに動くuseEffectに置き、依存配列で実行タイミングを制御します。初回だけなら空配列、特定の値が変わったときだけなら[その値]を依存に入れます。", interviewPhrase: "実務では「データ取得は副作用なのでuseEffectに寄せ、依存配列で取得タイミングを制御しています」と説明します。", keywords: ["副作用", "useEffect", "無限ループ", "依存配列", "再描画"] }
      ]
    },
    {
      id: "reactday4-lesson3",
      slug: "loading-error",
      title: "読み込み中・成功・失敗の3状態を設計する",
      summary: "データ取得には必ず「待ち」と「失敗」がある。loadingとerrorを状態として持ち、ユーザーに伝えるUIを作る。",
      blocks: [
        { type: "heading", text: "取得には必ず3つの状態がある" },
        { type: "paragraph", text: "前のレッスンではデータを取って表示するところまでやりました。でも実際のアプリでは、それだけでは不十分です。通信には時間がかかるので、データがまだ来ていない「読み込み中」の時間が必ずあります。さらに、サーバーが落ちていたり電波が悪かったりで「失敗」することもあります。つまりデータ取得は、読み込み中・成功・失敗という3つの状態を必ず通ります。この3つをきちんと扱うのが、実務の定番の考え方です。" },
        { type: "paragraph", text: "たとえるなら、ネット通販で注文したときの状態と同じです。「配送中(まだ届いていない)」「到着(受け取れた)」「配送トラブル(届かなかった)」の3つがあり、アプリはそれぞれに応じた表示をするべきです。配送中なのに真っ白な画面を見せたら、ユーザーは壊れたのかと不安になります。だから、いま自分がどの状態にいるかを画面に出すことが大切です。" },
        { type: "heading", text: "loadingとerrorをstateとして持つ" },
        { type: "paragraph", text: "3状態を扱うには、データを入れる箱に加えて、読み込み中かどうかを表すloadingと、失敗した理由を入れるerrorという状態を用意します。取得を始めるときにloadingをtrueにし、成功したらデータを入れてloadingをfalseに、失敗したらerrorに理由を入れます。この3つのstateの組み合わせで、いまどの状態かが表現できます。" },
        { type: "code", language: "tsx", code: "import { useEffect, useState } from \"react\";\n\nfunction UserCard({ userId }) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    setLoading(true);\n    setError(null);\n    fetch(`/api/users/${userId}`)\n      .then((r) => {\n        if (!r.ok) throw new Error(\"取得に失敗しました\");\n        return r.json();\n      })\n      .then((data) => setUser(data))\n      .catch((e) => setError(e.message))\n      .finally(() => setLoading(false));\n  }, [userId]);\n\n  if (loading) return <p>読み込み中...</p>;\n  if (error) return <p>エラー: {error}</p>;\n  return <p>{user.name}</p>;\n}", caption: "loading→成功/失敗の順に画面を分岐する定番パターン" },
        { type: "callout", variant: "warn", title: "response.okのチェックを忘れない", text: "fetchはサーバーが404や500を返しても、通信自体が届いていれば「成功」として.then()に進んでしまいます。だからr.okを確認し、失敗ステータスなら自分でthrowしてcatchに送る必要があります。これを忘れると、エラーページのHTMLをデータだと思い込んで表示が崩れる、といった事故になります。" },
        { type: "heading", text: "状態管理あり・なしを比べる" },
        { type: "compare", bad: { label: "状態管理なし", language: "tsx", code: "function UserCard({ userId }) {\n  const [user, setUser] = useState(null);\n  useEffect(() => {\n    fetch(`/api/users/${userId}`)\n      .then((r) => r.json())\n      .then(setUser);\n  }, [userId]);\n  // 取得中は user が null で user.name が落ちる\n  // 失敗しても永遠に空白のまま、原因もわからない\n  return <p>{user.name}</p>;\n}" }, good: { label: "状態管理あり", language: "tsx", code: "function UserCard({ userId }) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n  // ...fetchでloading/error/userを更新...\n  if (loading) return <p>読み込み中...</p>;\n  if (error) return <p>エラー: {error}</p>;\n  return <p>{user.name}</p>;\n}" } },
        { type: "paragraph", text: "状態管理なしの左側は、取得が終わる前はuserがnullなのにuser.nameを読もうとして画面が壊れます。失敗しても真っ白なまま何も起きず、ユーザーは原因がわかりません。右側のように3状態を分けると、待っている間は「読み込み中」を、失敗したら理由を、成功したら中身を、それぞれ確実に見せられます。この差が、動くだけのアプリと使えるアプリの分かれ目です。" },
        { type: "callout", variant: "why", title: "なぜ3状態を意識するのか", text: "ユーザーにとって最も不安なのは、何が起きているかわからない沈黙です。読み込み中と伝えれば待てますし、失敗と理由を伝えれば再試行できます。3状態の設計は技術というより、待たせている相手への配慮です。実務ではこの分岐が当たり前の作法として求められます。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このデータ取得コンポーネントに、loading・error・successの3状態を持たせて。fetchのr.okチェックとcatch、finallyでのloading解除も入れて」と頼むと、実務的な形にしてくれます。生成後は、失敗時に本当にerrorへ入るか、loadingが必ずfalseに戻るかを確認しましょう。" }
      ],
      questions: [
        { id: "reactday4-lesson3-q1", type: "choice", question: "データ取得で必ず考えるべき3つの状態はどれ？", choices: ["開始・停止・再開", "読み込み中・成功・失敗", "作成・更新・削除", "描画前・描画中・描画後"], answerIndex: 1, explanation: "通信には時間がかかり失敗もありうるため、読み込み中・成功・失敗の3状態を必ず通ります。この3つを分けて表示するのが実務の定番です。" },
        { id: "reactday4-lesson3-q2", type: "choice", question: "fetchでサーバーが404を返したとき、そのままだと何が起きますか？", choices: ["自動でcatchに飛んでエラー扱いになる", "通信は届いているので.then()に進んでしまい、自分でr.okを確認しないとエラーにできない", "fetch自体がクラッシュする", "空のデータが返って必ず成功扱いになる"], answerIndex: 1, explanation: "fetchは通信が届けば404や500でも「成功」として.then()に進みます。r.okを確認し、失敗ステータスなら自分でthrowしてcatchへ送る必要があります。" },
        { id: "reactday4-lesson3-q3", type: "free", question: "loadingとerrorの状態を持たないと、どんな不便が起きるか説明してください。", modelAnswer: "loadingを持たないと、データが届く前はstateが初期値(nullなど)のままで、user.nameのようにアクセスして画面が壊れたり、待っている間ずっと真っ白になってユーザーが不安になります。errorを持たないと、通信に失敗しても何も表示されず、ユーザーは原因がわからず再試行の判断もできません。読み込み中・成功・失敗の3状態を分けて持てば、待っている間は読み込み中を、失敗したら理由を、成功したら中身を確実に見せられます。", interviewPhrase: "実務では「取得はloading・error・successの3状態で設計して、待ちと失敗をユーザーに必ず伝えるようにしています」と説明します。", keywords: ["loading", "error", "3状態", "真っ白", "再試行"] }
      ]
    }
  ]
};
