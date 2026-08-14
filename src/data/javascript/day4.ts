import type { Day } from "@/types";
export const jsDay4: Day = {
  day: 4, slug: "day4", title: "ブラウザを動かす — JSでページを操作する",
  goal: "JSがどうやってページ(HTML)を読み書きし、クリックや入力に反応し、インターネットからデータを取ってくるのかを、読んで説明できるようになる。DOM(querySelector・textContent)、イベント(addEventListener)、fetchとasync/awaitの“読み方”を身につける。",
  lessons: [
    {
      id: "jsday4-lesson1", slug: "dom", title: "DOM — JSがHTMLを触るための地図",
      summary: "ページを人形劇の舞台、JSを操り手にたとえて、document.querySelectorで要素をつかみ、.textContentで文字を書き換える流れを読めるようにする。",
      blocks: [
        { type: "heading", text: "ページは人形劇の舞台" },
        { type: "paragraph", text: "HTMLで作ったページを「人形劇の舞台」だと思ってください。ボタン、見出し、入力欄は、舞台に立っている人形たちです。そのままだと人形は動きません。動かす「操り手」が必要です。その操り手がJavaScriptです。" },
        { type: "paragraph", text: "でもJSは、いきなり人形をつかめるわけではありません。まず「どの人形か」を指さして選ぶ必要があります。この“指さして選ぶための地図”がDOM(ドム)です。DOMは Document Object Model の略で、ブラウザがHTMLを「JSから触れる形」に変換したもの、と考えれば十分です。" },
        { type: "callout", variant: "why", title: "なぜDOMが要るのか", text: "HTMLはただの文字列(テキスト)です。文字列のままだと「3番目のボタンだけ色を変えて」とは頼めません。ブラウザがHTMLを部品のかたまり(オブジェクト)に組み立て直してくれるから、JSは一個ずつ名指しで触れるのです。それがDOM。" },
        { type: "heading", text: "querySelector — 人形を指さす" },
        { type: "paragraph", text: "要素を1つつかむときは document.querySelector を使います。カッコの中に、CSSと同じ書き方で「どれ?」を渡します。#id はid、.class はクラス、タグ名はそのまま、という約束です。" },
        { type: "code", language: "html", code: "<h1 id=\"title\">こんにちは</h1>\n<button class=\"btn\">押す</button>", caption: "この舞台(HTML)から要素を選ぶ" },
        { type: "code", language: "javascript", code: "const title = document.querySelector(\"#title\");\nconst btn = document.querySelector(\".btn\");\nconsole.log(title);", caption: "#title と .btn をJSでつかんで変数に入れる" },
        { type: "callout", variant: "warn", title: "つかめないと null", text: "querySelector は、指定した要素が見つからないと null(何もない)を返します。「Cannot read properties of null」というエラーは、たいてい“セレクタの綴りミス”か“HTMLが読み込まれる前にJSが走った”のどちらかです。まずはそこを疑いましょう。" },
        { type: "heading", text: "textContent — セリフを書き換える" },
        { type: "paragraph", text: "つかんだ要素の中身の文字を書き換えるには .textContent に代入します。= の右に新しい文字を入れるだけ。人形に新しいセリフを持たせるイメージです。" },
        { type: "code", language: "javascript", code: "const title = document.querySelector(\"#title\");\ntitle.textContent = \"ようこそ！\";", caption: "見出しの文字が「こんにちは」→「ようこそ！」に変わる" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このJSコードを1行ずつ日本語で説明して。document.querySelector と .textContent が何をしているか、初心者にわかるように」" }
      ],
      questions: [
        { id: "jsday4-lesson1-q1", type: "choice", question: "document.querySelector(\"#title\") は何をしている？", choices: ["idが title の要素を1つつかんでいる", "title という名前の関数を実行している", "title というファイルを読み込んでいる", "title を新しく作っている"], answerIndex: 0, explanation: "#title はCSSと同じで「idが title の要素」の意味。querySelector はそれを1つ選んで返します。" },
        { id: "jsday4-lesson1-q2", type: "choice", question: "要素の中の文字を書き換えたいとき、どれを使う？", choices: ["element.textContent = \"新しい文字\"", "element.querySelector(\"新しい文字\")", "console.log(\"新しい文字\")", "element.click()"], answerIndex: 0, explanation: ".textContent に新しい文字を代入すると、その要素の表示テキストが置き換わります。" },
        { id: "jsday4-lesson1-q3", type: "free", question: "DOMとは何か、人形劇のたとえを使って自分の言葉で説明してください。", modelAnswer: "DOMは、ブラウザがHTMLを「JSから触れる部品の集まり」に組み立て直したものです。ページを人形劇の舞台にたとえると、DOMは舞台の地図で、JS(操り手)はその地図を頼りに document.querySelector で目当ての人形(要素)を指さしてつかみ、.textContent でセリフ(文字)を書き換えます。", interviewPhrase: "実務でこう説明する: DOMはHTMLをJSが操作できるオブジェクトにしたもので、querySelectorで要素を取得し、textContentなどで中身を書き換えます。", keywords: ["DOM", "querySelector", "textContent", "要素"] }
      ]
    },
    {
      id: "jsday4-lesson2", slug: "events", title: "イベント — ユーザーの操作に反応する",
      summary: "addEventListenerで「クリックされたら〜する」を仕込む。Day3のアロー関数がここで生きる。カウンターの例で流れを読めるようにする。",
      blocks: [
        { type: "heading", text: "「押されたら」を仕込む" },
        { type: "paragraph", text: "ページは、ユーザーが何かするまではじっと待っています。クリック、文字の入力、こういったユーザーの操作を「イベント」と呼びます。JSでは「このイベントが起きたら、この処理をして」と“予約”しておけます。その予約が addEventListener です。" },
        { type: "paragraph", text: "たとえるなら「玄関のチャイムが鳴ったら(イベント)、ドアを開ける(処理)」という段取りを、あらかじめ書いておく感じです。チャイムがいつ鳴るかはわからないけれど、鳴ったときの行動は先に決めておける。" },
        { type: "code", language: "javascript", code: "const btn = document.querySelector(\"#go\");\nbtn.addEventListener(\"click\", () => {\n  console.log(\"押された\");\n});", caption: "ボタンが click されたら実行する処理を予約する" },
        { type: "callout", variant: "why", title: "ここでアロー関数が生きる", text: "() => { … } はDay3で学んだアロー関数です。addEventListener の2つ目に「あとで実行してほしい処理」を関数ごと渡しています。今すぐ動かすのではなく、“クリックされたそのとき”に動く。関数を「まとめて渡せる」から、こういう予約ができるのです。" },
        { type: "heading", text: "よく使うイベント: click と input" },
        { type: "paragraph", text: "1つ目の引数がイベントの種類です。\"click\" はクリック、\"input\" は入力欄に文字を打つたびに反応します。まずはこの2つを読めれば十分です。" },
        { type: "code", language: "javascript", code: "const field = document.querySelector(\"#name\");\nfield.addEventListener(\"input\", () => {\n  console.log(field.value);\n});", caption: "入力するたびに、今の入力内容(.value)を表示する" },
        { type: "callout", variant: "info", title: "textContent と value のちがい", text: "見出しやボタンの“表示文字”は .textContent。<input> の“入力された中身”は .value で読み書きします。人形のセリフと、記入欄の書き込み、くらいの違いだと思ってください。" },
        { type: "heading", text: "組み合わせ: カウンター" },
        { type: "paragraph", text: "ここまでを合わせると、簡単なカウンターが作れます。ボタンを押すたびに数を1増やして、画面の数字を書き換える、というものです。全部書けなくて大丈夫。何をしているか読めればOKです。" },
        { type: "code", language: "javascript", code: "let count = 0;\nconst btn = document.querySelector(\"#plus\");\nconst num = document.querySelector(\"#num\");\nbtn.addEventListener(\"click\", () => {\n  count = count + 1;\n  num.textContent = count;\n});", caption: "押すたびに count が増え、#num の表示が更新される" },
        { type: "paragraph", text: "読み方の順番はこうです。(1)最初 count は 0。(2)ボタンとカウンター表示の要素をつかむ。(3)クリックされたら count を1増やす。(4)増えた count を画面(.textContent)に反映する。この“反応して書き換える”がイベントの基本形です。" },
        { type: "callout", variant: "warn", title: "予約はページ読み込み後に", text: "addEventListener でつかむ要素は、その時点でHTMLに存在している必要があります。要素より前にJSが走ると querySelector が null になり予約できません。<script> をbodyの終わり近くに置く、が定番の対策です。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このカウンターのコードを1行ずつ説明して。addEventListener の中のアロー関数は、いつ実行されるの?」" }
      ],
      questions: [
        { id: "jsday4-lesson2-q1", type: "choice", question: "btn.addEventListener(\"click\", () => { … }) の () => { … } はいつ実行される？", choices: ["ボタンがクリックされたとき", "このコードが読まれた瞬間すぐ", "ページを閉じたとき", "1秒ごとに自動で"], answerIndex: 0, explanation: "アロー関数は“予約”として渡されているだけで、実際に動くのは click イベントが起きたときです。" },
        { id: "jsday4-lesson2-q2", type: "choice", question: "<input> に入力された文字を読むには？", choices: ["field.value", "field.textContent", "field.click", "field.querySelector"], answerIndex: 0, explanation: "入力欄の中身は .value で読み書きします。表示テキストの .textContent とは別物です。" },
        { id: "jsday4-lesson2-q3", type: "free", question: "addEventListener が何をするものか、身近なたとえを使って説明してください。", modelAnswer: "addEventListener は「このイベントが起きたら、この処理をして」と前もって予約しておく仕組みです。玄関のチャイムが鳴ったらドアを開ける、のように、いつ起きるかわからない操作(クリックや入力)に対して、起きたときの行動を先に登録しておきます。渡す処理はアロー関数でまとめて渡し、実際に動くのはイベントが発生したときです。", interviewPhrase: "実務でこう説明する: addEventListenerでクリックや入力などのイベントにコールバック関数を登録し、そのイベントが発生したタイミングで処理を実行します。", keywords: ["addEventListener", "イベント", "click", "アロー関数"] }
      ]
    },
    {
      id: "jsday4-lesson3", slug: "fetch-async", title: "fetchとasync/await — ネットからデータを取る",
      summary: "fetchでインターネットからデータを取ってくる。async/awaitは「待つ」印。全部書けなくてよい、読めて説明できればよい。最後にReactへの励まし。",
      blocks: [
        { type: "heading", text: "ネットの向こうからデータを取る" },
        { type: "paragraph", text: "アプリの多くは、天気やユーザー情報など、ネットの向こう(サーバー)からデータを取ってきて表示します。この「取りに行く」役目が fetch(フェッチ)です。fetch に住所(URL)を渡すと、そのURLへデータを取りに行ってくれます。" },
        { type: "paragraph", text: "たとえるなら、出前を注文するようなものです。注文(fetch)したら、料理が届くまで少し待ちます。ネット越しのやり取りは一瞬では終わらないので、必ず“待ち時間”があるのがポイントです。" },
        { type: "heading", text: "async / await は「待つ」印" },
        { type: "paragraph", text: "この“待つ”を表す合図が async と await です。関数の頭に async を付けると「この中では待つことがあるよ」という宣言になり、時間のかかる処理の前に await を付けると「これが終わるまでここで待つ」という意味になります。" },
        { type: "code", language: "javascript", code: "async function getUser() {\n  const res = await fetch(\"https://api.example.com/user\");\n  const data = await res.json();\n  console.log(data);\n}", caption: "URLへ取りに行き(待つ)、届いたら中身をJSON化(また待つ)して表示" },
        { type: "paragraph", text: "読み方はこうです。(1)fetch でURLへデータを取りに行き、await で届くまで待つ。(2)返ってきた返事(res)を res.json() で“JSという扱いやすい形”に変換し、これも await で待つ。(3)出来上がった data を使う。全部自分で書けなくて大丈夫。「取りに行って、待って、使う」の3拍子が読めれば十分です。" },
        { type: "callout", variant: "why", title: "なぜ「待つ」が必要なのか", text: "ネット越しのやり取りは時間がかかります。もし待たずに次へ進むと、まだ料理が届いていないのに「いただきます」をしてしまう状態になり、データが空っぽのままエラーになります。await は「届いてから次へ」を保証する安全装置です。" },
        { type: "callout", variant: "warn", title: "await は async の中でだけ", text: "await は、async を付けた関数の中でしか使えません。「await is only valid in async functions」というエラーが出たら、その処理を async function で包み忘れています。まずそこを確認しましょう。" },
        { type: "compare", bad: { label: "つまずきやすい進め方", text: "最初から何も見ずに、エラー処理まで全部を白紙から書こうとして、途中で止まってしまう。" }, good: { label: "おすすめの進め方(まず読む)", text: "「fetch でURLへ取りに行き、await で届くまで待ち、res.json() で使える形に直して使う」——この3拍子を読んで説明できればOK。書くのは後から、AIと一緒に。" } },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このfetchのコードを、出前にたとえて1行ずつ説明して。await が付いている行では何を待っているの?」" },
        { type: "heading", text: "おつかれさま — JSの土台は完成" },
        { type: "paragraph", text: "ここまでで、JSの土台がそろいました。値と変数、条件と繰り返し、関数、そしてページを操作するDOM・イベント・fetch。「全部を白紙から書ける」必要はありません。コードを読めて、何をしているか説明できて、AIと一緒に直せる。それが今のあなたです。もう立派な“読める人”です。" },
        { type: "paragraph", text: "そして次はいよいよ React。今日書いたような「要素をつかんで、イベントで、中身を書き換える」を、もっと楽に・きれいに書くための道具です。今日の人形劇のたとえは、Reactでもそのまま効いてきます。土台はできています。安心して次の舞台へ進みましょう。ここまで本当におつかれさまでした。" },
        { type: "callout", variant: "info", title: "次のコースへ", text: "Reactコースでは、今日の「つかんで書き換える」を“部品(コンポーネント)”という形でまとめていきます。JSで学んだ関数・アロー関数・イベントの知識が、そのまま活きます。楽しみに進んでください。" }
      ],
      questions: [
        { id: "jsday4-lesson3-q1", type: "choice", question: "fetch は何をするもの？", choices: ["指定したURLへデータを取りに行く", "ページの文字を大きくする", "ボタンを新しく作る", "変数を宣言する"], answerIndex: 0, explanation: "fetch はネットの向こう(サーバー)へデータを取りに行く役目。出前の注文にたとえられます。" },
        { id: "jsday4-lesson3-q2", type: "choice", question: "await が付いている行は、何をしている？", choices: ["処理が終わる(データが届く)まで待っている", "処理を飛ばして次へ進んでいる", "エラーをわざと起こしている", "コメントアウトしている"], answerIndex: 0, explanation: "await は「これが終わるまでここで待つ」という印。届く前に次へ進んで空データになるのを防ぎます。" },
        { id: "jsday4-lesson3-q3", type: "free", question: "async/await と fetch の関係を、出前のたとえを使って説明してください。", modelAnswer: "fetch はURL(住所)へデータを取りに行く注文で、ネット越しなので届くまで時間がかかります。async はその関数の中に「待つ処理があるよ」という宣言、await は「届くまでここで待つ」という印です。出前を注文(fetch)して、料理が届くまで待って(await)、届いたら食べる(データを使う)という流れそのものです。await は async 関数の中でだけ使えます。", interviewPhrase: "実務でこう説明する: fetchで非同期にデータを取得し、async関数の中でawaitを使ってレスポンスやjson変換の完了を待ってから、そのデータを扱います。", keywords: ["fetch", "async", "await", "非同期", "待つ"] }
      ]
    }
  ]
};
