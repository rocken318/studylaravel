import type { Day } from "@/types";

export const tsDay4: Day = {
  day: 4,
  slug: "day4",
  title: "非同期とfetchでAPIを叩く",
  goal: "Promiseとasync/awaitを理解し、fetchでAPIを呼んで結果を型で扱える。失敗に備えられる。",
  lessons: [
    {
      id: "tsday4-lesson1",
      slug: "promise-async-await",
      title: "Promiseとasync/await",
      summary: "「あとで返ってくる値」の扱い方を、Promiseとasync/awaitで理解する。",
      blocks: [
        { type: "heading", text: "「すぐには返ってこない処理」とは" },
        { type: "paragraph", text: "プログラムには、結果がその場ですぐ出る処理と、少し待たないと結果が出ない処理があります。1+1のような計算は一瞬で終わりますが、外部のサーバーにデータを取りに行く処理は、返事が返ってくるまで数百ミリ秒かかることもあります。この「時間がかかる処理」を、待っている間もプログラム全体を止めずに扱う仕組みを [[async]](非同期)と呼びます。" },
        { type: "paragraph", text: "非同期処理の結果を表す入れ物が [[promise]](プロミス)です。Promiseは「今はまだ値がないけれど、あとで成功か失敗のどちらかで返す」という約束を表す箱だと考えてください。" },
        { type: "callout", variant: "why", title: "なぜ非同期が必要なのか", text: "もしサーバーの返事を待つ間プログラム全体が固まってしまうと、その間ボタンも押せず画面も動かなくなります。非同期にすることで、待っている間も他の処理を続けられます。" },
        { type: "heading", text: "async/awaitで読みやすく書く" },
        { type: "paragraph", text: "Promiseをそのまま扱うと書き方が入り組みがちです。そこで [[async]] と await という書き方を使うと、非同期の処理を「上から下に順番に読める」形で書けます。await は「この処理が終わるまで待ってから次に進む」という意味です。" },
        { type: "code", language: "typescript", code: "// async をつけた関数の中でだけ await が使える\nasync function greet(): Promise<string> {\n  // wait は 1 秒待つだけの Promise を返すと考える\n  await wait(1000);\n  return \"こんにちは\";\n}\n\n// 1秒待つ処理を Promise で表した例\nfunction wait(ms: number): Promise<void> {\n  return new Promise((resolve) => setTimeout(resolve, ms));\n}", caption: "async 関数は必ず Promise を返す" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「この async 関数の戻り値の型は何になりますか？ Promise<...> の中身を含めて教えてください」と聞くと、awaitで取り出したあとの本当の型を確認できます。AIが書いたコードでも、型を一緒に確認するクセをつけましょう。" },
        { type: "heading", text: "awaitすると中身が取り出せる" },
        { type: "compare", bad: { label: "awaitを忘れる", language: "typescript", code: "const message = greet();\n// message は Promise<string> のまま\n// 文字列として使おうとすると意図とズレる\nconsole.log(message.length); // 期待した長さにならない" }, good: { label: "awaitで取り出す", language: "typescript", code: "const message = await greet();\n// message は string になっている\nconsole.log(message.length); // 文字数が取れる" } },
        { type: "paragraph", text: "async関数の戻り値は必ずPromiseに包まれます。上の悪い例のように await を忘れると、中身(string)ではなく箱(Promise<string>)のまま扱ってしまい、思った動きになりません。TypeScriptを使っていれば、型が Promise<string> と表示されるので「まだ箱のままだ」と気づけます。" },
        { type: "callout", variant: "warn", title: "await はどこでも使えるわけではない", text: "await は async をつけた関数の中でしか使えません(トップレベルの一部を除く)。AIが生成したコードで await がエラーになるときは、囲んでいる関数に async が付いているかをまず確認しましょう。" },
        { type: "list", ordered: false, items: ["非同期 = 時間がかかる処理を、全体を止めずに扱う仕組み", "Promise = あとで成功か失敗で返る値の箱", "async 関数の戻り値は必ず Promise に包まれる", "await でその箱の中身を取り出せる"] }
      ],
      questions: [
        { id: "tsday4-lesson1-q1", type: "choice", question: "async をつけた関数 greet が return \"こんにちは\"; とだけ書いてあるとき、greet() の戻り値の型は？", choices: ["string", "Promise<string>", "void", "\"こんにちは\""], answerIndex: 1, explanation: "async 関数の戻り値は必ず Promise に包まれます。中で文字列を return しても、外から見た型は Promise<string> になります。中身を取り出すには await が必要です。" },
        { id: "tsday4-lesson1-q2", type: "choice", question: "await の説明として正しいものは？", choices: ["処理を並列に同時実行する命令", "Promiseの処理が終わるまで待って、中身を取り出す", "エラーを無視して次へ進む命令", "関数をasyncに変換する命令"], answerIndex: 1, explanation: "await は対象のPromiseが解決するまで待ち、その中身の値を取り出します。並列実行やエラー無視の意味はありません。" },
        { id: "tsday4-lesson1-q3", type: "free", question: "非同期処理とPromiseが必要な理由を、初学者にわかるように説明してください。", modelAnswer: "サーバーへの問い合わせなど時間のかかる処理を待つ間、プログラム全体を止めてしまうと画面が固まって操作できなくなります。非同期にすると待っている間も他の処理を続けられます。Promiseは「あとで成功か失敗で返る値」を入れておく箱で、async/awaitを使うとその箱の中身を上から下に読める形で取り出せます。", interviewPhrase: "実務では「重い処理でUIを固めないために非同期にしていて、結果はPromiseで受けてasync/awaitで扱っています」と説明します。", keywords: ["非同期", "Promise", "await", "固まらない"] }
      ]
    },
    {
      id: "tsday4-lesson2",
      slug: "fetch-json-typing",
      title: "fetchでAPIを呼ぶ、.json()の結果に型をつける",
      summary: "fetchでAPIを呼び、返ってきたJSONに型をつけて安全に扱う。",
      blocks: [
        { type: "heading", text: "fetchでデータを取りに行く" },
        { type: "paragraph", text: "[[fetch]] は、指定したURLにデータを取りに行くための、ブラウザやNode.jsに最初から用意されている関数です。fetchはPromiseを返すので、await で結果を待ちます。返ってきたものは Response という「返事全体」を表すオブジェクトで、そこから .json() を呼ぶと本文をJavaScriptの値に変換できます。" },
        { type: "code", language: "typescript", code: "async function loadData(): Promise<void> {\n  // await で返事を待つ\n  const res = await fetch(\"https://api.example.com/user\");\n  // .json() も Promise を返すので await する\n  const data = await res.json();\n  console.log(data);\n}", caption: "fetch と .json() は両方 await が必要" },
        { type: "callout", variant: "warn", title: ".json() の戻り値は any になる", text: "res.json() の型は any です。any は「型チェックをしない」という意味で、どんな使い方をしてもエラーになりません。便利に見えて危険で、存在しないプロパティを触ってもその場では気づけません。ここに型をつけるのがこのレッスンの本題です。" },
        { type: "heading", text: "返ってくるデータの形を型で宣言する" },
        { type: "paragraph", text: "APIがどんな形のデータを返すかを、あらかじめ [[interface]](インターフェース)や型で書いておきます。そして .json() の結果を「この型ですよ」と指定することで、以降のコードで安全に扱えます。" },
        { type: "code", language: "typescript", code: "// APIが返すユーザーの形をあらかじめ宣言\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nasync function loadUser(): Promise<User> {\n  const res = await fetch(\"https://api.example.com/user\");\n  // 「この JSON は User の形」と型を指定する\n  const user = (await res.json()) as User;\n  return user;\n}", caption: "as User で any に型の意味を与える" },
        { type: "compare", bad: { label: "型なし(any)", language: "typescript", code: "const user = await res.json();\n// namee とタイプミスしてもエラーなし\nconsole.log(user.namee); // undefined になり気づけない" }, good: { label: "型あり", language: "typescript", code: "const user = (await res.json()) as User;\n// namee はエディタが赤線で指摘\nconsole.log(user.namee); // コンパイルエラーで即気づける" } },
        { type: "callout", variant: "why", title: "なぜ型をつけると安心なのか", text: "AIに「fetchでユーザーを取ってきて」と頼むと動くコードは書けますが、プロパティ名のズレや形の勘違いは残りがちです。返り値に型をつけておけば、AIが user.name のつもりで user.userName と書くようなズレを、実行前にエディタが指摘してくれます。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このAPIのレスポンス例(サンプルJSON)から TypeScript の interface を作って」と頼むと、型の下書きを一気に用意できます。ただし as で型を名乗らせても実際のデータがその形とは限らないので、キー名はAPIの仕様やサンプルと突き合わせて確認しましょう。" },
        { type: "list", ordered: true, items: ["fetch(url) でリクエストを送り、await で Response を受け取る", "res.json() を await して本文を取り出す(戻り値は any)", "返るデータの形を interface で宣言する", "as で .json() の結果に型を与えて安全に使う"] }
      ],
      questions: [
        { id: "tsday4-lesson2-q1", type: "choice", question: "res.json() の戻り値の型は初期状態で何になっていますか？", choices: ["string", "object", "any", "unknown"], answerIndex: 2, explanation: ".json() の戻り値は any です。any は型チェックが効かないため、存在しないプロパティを触ってもエラーにならず危険です。だからこそ interface と as で型をつけます。" },
        { id: "tsday4-lesson2-q2", type: "choice", question: "fetchの結果を安全に扱うための手順として最も適切なものは？", choices: [".json()の結果をそのままanyで使う", "返るデータの形をinterfaceで宣言し、.json()の結果に型を指定する", "console.logで中身を見ればよいので型は不要", "fetchの戻り値をstringにキャストする"], answerIndex: 1, explanation: "返却データの形をinterfaceで宣言し、.json()の結果へ型を与えることで、プロパティ名のズレなどを実行前に検出できます。ログ確認だけでは型の恩恵は得られません。" },
        { id: "tsday4-lesson2-q3", type: "free", question: "fetchで取得したJSONに型をつけると何が嬉しいか、説明してください。", modelAnswer: "res.json()の戻り値はanyで型チェックが効かないため、プロパティ名の打ち間違いや形の勘違いに実行するまで気づけません。返るデータの形をinterfaceで宣言し、asで型を与えると、存在しないプロパティを触ったときにエディタやコンパイラが実行前に指摘してくれます。AIが生成したコードのズレも早く見つけられます。", interviewPhrase: "実務では「レスポンスの型を定義してjsonに型付けし、プロパティのズレをコンパイル時に弾いています」と説明します。", keywords: ["json", "any", "interface", "型付け", "コンパイル時"] }
      ]
    },
    {
      id: "tsday4-lesson3",
      slug: "error-handling-try-catch",
      title: "エラーハンドリング(try/catch)",
      summary: "通信は失敗する前提で、try/catchとステータス確認で備える。",
      blocks: [
        { type: "heading", text: "通信は必ず失敗しうる" },
        { type: "paragraph", text: "APIを叩く処理は、いつも成功するとは限りません。ネットワークが切れている、サーバーが落ちている、URLが間違っている、権限がない、といった理由で失敗します。失敗に備えていないと、アプリが突然止まったり、真っ白な画面になったりします。「失敗する前提で書く」のがプロの基本です。" },
        { type: "callout", variant: "warn", title: "fetch はステータスエラーで例外を投げない", text: "重要な落とし穴です。fetch は 404 や 500 のようなエラー応答が返っても「通信自体は成功した」とみなし、例外を投げません。res.ok(または res.status)を自分で確認しないと、エラー応答を正常なデータとして扱ってしまいます。" },
        { type: "heading", text: "try/catchで失敗を受け止める" },
        { type: "paragraph", text: "try/catch は「try のブロックで問題が起きたら catch に飛ぶ」という仕組みです。await した処理が失敗(Promiseが失敗)すると catch に入るので、そこでエラー時の処理を書きます。あわせて res.ok を確認して、ステータスエラーも自分で例外に変えます。" },
        { type: "code", language: "typescript", code: "interface User {\n  id: number;\n  name: string;\n}\n\nasync function loadUser(): Promise<User | null> {\n  try {\n    const res = await fetch(\"https://api.example.com/user\");\n    // 404 や 500 は自分で弾く\n    if (!res.ok) {\n      throw new Error(\"取得に失敗しました: \" + res.status);\n    }\n    const user = (await res.json()) as User;\n    return user;\n  } catch (error) {\n    // ネットワーク切れやステータスエラーがここに来る\n    console.error(error);\n    return null; // 失敗時は null を返す設計にする\n  }\n}", caption: "res.ok の確認と try/catch を両方書く" },
        { type: "callout", variant: "why", title: "なぜ戻り値の型を User | null にするのか", text: "失敗時は null を返す設計にすると、戻り値の型が [[union]] で User | null になります。呼び出し側は「null かもしれない」と型で知らされるので、必ず失敗のケースを考えて書くことになります。型が成功と失敗の両方を語ってくれるわけです。" },
        { type: "compare", bad: { label: "備えなし", language: "typescript", code: "// 失敗を考えていない\nconst res = await fetch(url);\nconst user = await res.json();\n// 通信失敗やエラー応答でそのまま壊れる\nreturn user;" }, good: { label: "備えあり", language: "typescript", code: "try {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error(String(res.status));\n  return (await res.json()) as User;\n} catch (e) {\n  console.error(e);\n  return null;\n}" } },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このfetch処理に、res.okのチェックとtry/catchを足して、失敗時はnullを返す形にして」と頼むと、抜けがちなエラーハンドリングを補ってもらえます。生成後は「res.okのチェックが入っているか」「catchで握りつぶしていないか」を自分の目で確認しましょう。" },
        { type: "list", ordered: false, items: ["通信は必ず失敗しうるので、失敗前提で書く", "fetch は 404/500 で例外を投げない → res.ok を自分で確認", "try/catch で失敗を受け止める", "失敗時は null を返すなど、型(User | null)で呼び出し側に伝える"] }
      ],
      questions: [
        { id: "tsday4-lesson3-q1", type: "choice", question: "fetchで404が返ってきたとき、標準の挙動として正しいものは？", choices: ["自動的に例外(catch)が発生する", "例外は投げず、res.okがfalseのResponseが返る", "空文字列が返る", "自動的にリトライされる"], answerIndex: 1, explanation: "fetchは通信自体が成立すれば、404や500でも例外を投げません。res.ok(res.statusが200番台か)を自分で確認し、必要ならthrowしてエラーとして扱う必要があります。" },
        { id: "tsday4-lesson3-q2", type: "choice", question: "失敗時にnullを返す設計にしたとき、戻り値の型として自然なものは？", choices: ["User", "Promise<User>", "Promise<User | null>", "any"], answerIndex: 2, explanation: "async関数なので戻り値はPromiseに包まれ、成功時はUser・失敗時はnullなので中身はUser | nullのユニオン型になります。よってPromise<User | null>が自然です。" },
        { id: "tsday4-lesson3-q3", type: "free", question: "fetchを使う処理で、なぜres.okの確認とtry/catchの両方が必要なのか説明してください。", modelAnswer: "try/catchはネットワーク切れなど通信そのものの失敗を捕まえますが、fetchは404や500のようなエラー応答では例外を投げないため、それだけではエラー応答を正常データとして扱ってしまいます。そこでres.okを確認し、falseならthrowして自分で例外に変えることで、両方の失敗をcatchでまとめて扱えます。失敗時はnullを返すなど型で呼び出し側に伝えると安全です。", interviewPhrase: "実務では「fetchはステータスエラーで例外を投げないので、res.okチェックとtry/catchを併用して両方の失敗に備えています」と説明します。", keywords: ["res.ok", "try/catch", "例外を投げない", "404", "throw"] }
      ]
    },
    {
      id: "tsday4-lesson4",
      slug: "env-vars-api-keys",
      title: "環境変数とAPIキー(秘密はフロントに置かない)",
      summary: "APIキーなどの秘密は環境変数で管理し、ブラウザに露出させない。",
      blocks: [
        { type: "heading", text: "APIキーは「秘密」である" },
        { type: "paragraph", text: "多くのAPIは、利用するときにAPIキー(合言葉のような文字列)を必要とします。このキーは、あなたのアカウントで課金される権利そのものです。もし他人に知られると、勝手に使われて高額な請求が来たり、データを盗まれたりします。つまりAPIキーはパスワードと同じ「秘密」で、コードに直接書いたり、外に見える場所に置いたりしてはいけません。" },
        { type: "callout", variant: "warn", title: "フロントエンドに秘密を置くと全員に見える", text: "ブラウザで動くコード(フロントエンド)は、利用者が中身を自由にのぞけます。開発者ツールを開けば、埋め込まれた文字列はすべて見えます。APIキーをフロントに書くと、サイトを訪れた誰もがそのキーを読み取れてしまいます。" },
        { type: "heading", text: "環境変数で秘密をコードの外に出す" },
        { type: "paragraph", text: "秘密の値は、コードに直接書かずに環境変数として渡します。環境変数とは、プログラムの外側(実行環境)に用意しておく設定値のことです。Node.jsでは process.env から読み取ります。実際の値は .env という設定ファイルに書き、そのファイルはGitなどで共有しない(.gitignoreに入れる)のが基本です。" },
        { type: "code", language: "typescript", code: "// .env ファイル(この中身は共有しない)\n// API_KEY=sk-xxxxxxxxxxxxxxxx\n\n// サーバー側のコードから読み取る\nconst apiKey = process.env.API_KEY;\n\nif (!apiKey) {\n  // 設定漏れに早く気づけるようにチェックする\n  throw new Error(\"API_KEY が設定されていません\");\n}", caption: "秘密はコードに直書きせず process.env から読む" },
        { type: "heading", text: "秘密を使う処理はサーバー側で行う" },
        { type: "paragraph", text: "では、ブラウザからAPIキーが必要なAPIを呼びたいときはどうするか。答えは「ブラウザから直接呼ばない」です。自分のサーバー(Next.jsなら [[api-route]] などのサーバー側の入口)にリクエストを送り、そのサーバーの中でAPIキーを使って本物のAPIを呼びます。キーはサーバーの中だけに存在し、ブラウザには渡りません。" },
        { type: "compare", bad: { label: "ブラウザから直接呼ぶ", language: "typescript", code: "// フロントのコード(ブラウザで動く)\nconst res = await fetch(\"https://api.example.com/chat\", {\n  headers: { Authorization: \"Bearer \" + apiKey },\n});\n// apiKey がブラウザに埋め込まれ、誰でも見える" }, good: { label: "自分のサーバー経由で呼ぶ", language: "typescript", code: "// フロントは自分のサーバーだけを呼ぶ\nconst res = await fetch(\"/api/chat\", { method: \"POST\" });\n// キーはサーバー側の process.env にあり、ブラウザに出ない" } },
        { type: "callout", variant: "why", title: "なぜサーバーを経由させるのか", text: "秘密を使う処理を自分のサーバーの中に閉じ込めるためです。ブラウザには「自分のサーバーの入口」だけを見せ、本物のAPIキーはサーバーの環境変数から使う。こうすればキーが利用者に漏れません。AIプロダクトでAIのAPIを使うときも、この形が基本です。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このAPIキーを使う処理を、フロントから直接呼ばずにサーバー側(APIルート)に移して、キーは環境変数から読むようにして」と頼むと、安全な構成に直してもらえます。生成後は「キーがフロントのコードに残っていないか」を必ず確認しましょう。" },
        { type: "list", ordered: false, items: ["APIキーはパスワードと同じ秘密。コードに直書きしない", "フロントに置くと利用者全員に見えてしまう", "秘密は環境変数(process.env)で渡し、.envは共有しない", "秘密を使う処理はサーバー側で行い、ブラウザからは自分のサーバー経由で呼ぶ"] }
      ],
      questions: [
        { id: "tsday4-lesson4-q1", type: "choice", question: "APIキーの扱いとして最も安全なものは？", choices: ["フロントのコードに直接書いておく", "サーバー側の環境変数に置き、フロントからは自分のサーバー経由で呼ぶ", "HTMLのdata属性に埋め込む", "URLのクエリパラメータに付けて毎回送る"], answerIndex: 1, explanation: "APIキーは秘密なのでサーバー側の環境変数に置き、ブラウザには露出させません。フロントは自分のサーバーの入口だけを呼び、サーバーの中でキーを使って本物のAPIを叩くのが安全です。" },
        { id: "tsday4-lesson4-q2", type: "choice", question: "フロントエンド(ブラウザで動くコード)にAPIキーを埋め込むと何が問題ですか？", choices: ["通信が遅くなる", "利用者が開発者ツールなどでキーを読み取れてしまう", "型チェックが効かなくなる", "キーの文字数制限を超える"], answerIndex: 1, explanation: "ブラウザで動くコードは利用者が中身を自由に見られます。開発者ツールを開けば埋め込まれた文字列は読めるため、キーが全員に漏れます。だから秘密はサーバー側に置きます。" },
        { id: "tsday4-lesson4-q3", type: "free", question: "APIキーをフロントに置かず、環境変数とサーバー経由で扱う理由を説明してください。", modelAnswer: "APIキーはパスワードと同じ秘密で、漏れると不正利用や課金の被害につながります。ブラウザで動くフロントのコードは利用者が中身を見られるため、そこにキーを書くと全員に漏れます。そこでキーは環境変数(process.env)に置いてコードの外に出し、キーを使う処理は自分のサーバー側で行います。フロントは自分のサーバーの入口だけを呼び、サーバーの中でキーを使って本物のAPIを叩くので、キーはブラウザに出ません。", interviewPhrase: "実務では「APIキーは環境変数に置いてサーバー側でだけ使い、フロントは自社のAPIルート経由で呼ぶことでキーの露出を防いでいます」と説明します。", keywords: ["環境変数", "process.env", "サーバー側", "フロントに置かない", "露出"] }
      ]
    }
  ]
};
