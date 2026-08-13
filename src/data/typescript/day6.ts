import type { Day } from "@/types";

export const tsDay6: Day = {
  day: 6,
  slug: "day6",
  title: "AIをフロントから呼ぶ(この教材の看板)",
  goal: "AIプロダクトの構成(UI→APIルート→LLM)を理解し、APIルートからLLMを呼ぶ最小実装ができる。ストリーミングの考え方と、型・検算で安全にする方法を持つ。",
  lessons: [
    {
      id: "tsday6-lesson1",
      slug: "ai-product-architecture",
      title: "AIプロダクトの構成(UI→APIルート→LLM)",
      summary: "画面・サーバー・LLMの3つの登場人物と、APIキーをサーバー側に置く理由を理解する。",
      blocks: [
        { type: "heading", text: "AIプロダクトは「3人の登場人物」でできている" },
        { type: "paragraph", text: "「AIを使ったアプリ」と聞くと難しそうですが、登場人物は3つだけです。ユーザーが触る画面(UI)、あなたのサーバー(APIルート)、そして文章を生成するLLM(大規模言語モデル。ChatGPTやClaudeの中身にあたるAI)です。この3つが順番にバケツリレーをするだけ、と考えると一気に楽になります。" },
        { type: "list", ordered: true, items: [
          "UI(画面): ユーザーが入力し、結果を見る場所。ブラウザで動く。",
          "APIルート(サーバー): 画面からのお願いを受け取り、LLMに橋渡しする中継役。あなたのサーバーで動く。",
          "LLM: 実際に文章を生成するAI。会社(OpenAIやAnthropicなど)のサーバーで動く。"
        ] },
        { type: "paragraph", text: "流れはいつも一方向です。ユーザーが画面に「猫の俳句を作って」と入力する → 画面が[[api-route]](サーバー)にお願いを送る → サーバーがLLMに問い合わせる → LLMが答えを返す → サーバーが画面に渡す → 画面が表示する。この一本道を頭に入れておけば、どこで何が起きているか迷いません。" },
        { type: "callout", variant: "why", title: "なぜ画面から直接LLMを呼ばないの?", text: "技術的には画面(ブラウザ)から直接LLMを呼ぶこともできます。しかしそれをやると、LLMを使うための「APIキー」が全ユーザーに丸見えになってしまいます。だから間にサーバー(APIルート)を挟むのです。" },
        { type: "heading", text: "APIキーは絶対にサーバー側に置く" },
        { type: "paragraph", text: "APIキー(APIキー = LLMの会社があなたを識別し、料金を請求するための秘密のパスワードのようなもの)は、他人に知られると勝手に使われて高額請求につながります。ブラウザに置いたコードは、ユーザーが「開発者ツール」を開けば中身を読めてしまうので、キーを置いてはいけません。逆にサーバー側のコードはユーザーからは見えないので、ここに置くのが正解です。" },
        { type: "compare",
          bad: { label: "危険: 画面(ブラウザ)にキーを書く", language: "tsx", code: "\"use client\";\n\n// このコードはブラウザで動く。ユーザーに全部見える\nconst apiKey = \"sk-abcd1234...\"; // 丸見え。悪用される\n\nasync function ask() {\n  await fetch(\"https://api.example-llm.com/chat\", {\n    headers: { Authorization: \"Bearer \" + apiKey }\n  });\n}" },
          good: { label: "安全: サーバー(APIルート)にキーを置く", language: "typescript", code: "// これはサーバーで動く。ユーザーからは見えない\n// process.env は環境変数(サーバーだけが読める設定置き場)\nconst apiKey = process.env.LLM_API_KEY;\n\n// 画面からはこの中継役にお願いするだけ。キーは渡さない" }
        },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「Next.jsで、APIキーをサーバー側だけに置いてブラウザに漏らさない構成にしたい。UIからAPIルートを経由してLLMを呼ぶ最小構成の全体像を、ファイル分割込みで教えて」と頼むと、この3層構造のひな形を出してくれます。" },
        { type: "paragraph", text: "実装そのものはAIに任せてよいのですが、「なぜサーバーを挟むのか」「キーがどこにあるのか」はあなたが説明できる必要があります。ここを理解していれば、AIが生成したコードがブラウザにキーを書いてしまっていても「これは危険だ」と一目で気づけます。" },
        { type: "callout", variant: "warn", title: "ありがちな事故", text: "AIに「一番簡単なコードで」と頼むと、動作を優先してブラウザ側にキーを直書きした例を出すことがあります。動いても本番では絶対NGです。生成コードにキーが直書きされていないか、必ず自分の目で確認しましょう。" }
      ],
      questions: [
        { id: "tsday6-lesson1-q1", type: "choice",
          question: "AIプロダクトで、画面(ブラウザ)から直接LLMを呼ばずにサーバー(APIルート)を挟む主な理由はどれ?",
          choices: [
            "サーバーを挟むと表示速度が必ず速くなるから",
            "APIキーをブラウザに置くとユーザーに見えて悪用されるため、サーバー側に隠すから",
            "LLMはブラウザからは技術的に一切呼び出せないから",
            "サーバーを挟まないとTypeScriptが使えないから"
          ],
          answerIndex: 1,
          explanation: "技術的には直接呼べますが、キーが丸見えになり悪用されます。だからキーをサーバー側に隠すために中継役を置きます。速度やTypeScriptの可否が理由ではありません。" },
        { id: "tsday6-lesson1-q2", type: "choice",
          question: "APIキーを置くべき場所として最も適切なのは?",
          choices: [
            "\"use client\" のついたブラウザ向けコンポーネント",
            "HTMLの中に直接書く",
            "サーバー側で読める環境変数(process.env)",
            "URLのクエリパラメータ"
          ],
          answerIndex: 2,
          explanation: "キーはユーザーから見えないサーバー側に置くのが原則です。環境変数(process.env)はサーバーだけが読める設定置き場なので適切です。ブラウザ向けコードやHTML、URLに置くと漏れます。" },
        { id: "tsday6-lesson1-q3", type: "free",
          question: "AIプロダクトの「UI→APIルート→LLM」という3層構成を、なぜこう分けるのかを含めて説明してください。",
          modelAnswer: "AIプロダクトは、ユーザーが触るUI(画面)、中継役のAPIルート(サーバー)、文章を生成するLLMの3つで構成されます。処理は一方向で、UIがユーザーの入力をAPIルートに送り、APIルートがLLMを呼び、返ってきた結果をUIに渡して表示します。分ける最大の理由はセキュリティで、LLMを呼ぶためのAPIキーはブラウザに置くと全ユーザーに見えて悪用されるため、ユーザーから見えないサーバー側(APIルート)にキーを置いて隠す必要があるからです。",
          interviewPhrase: "実務ではこう説明する: UIはキーを持たず、サーバーのAPIルートを経由してLLMを呼びます。キーはサーバー側の環境変数に置いてブラウザに露出させない、という3層構成にしています。",
          keywords: ["UI", "APIルート", "LLM", "APIキー", "サーバー側", "一方向"] }
      ]
    },
    {
      id: "tsday6-lesson2",
      slug: "route-ts-minimal-llm-call",
      title: "APIルート(route.ts)でLLMを叩く最小実装",
      summary: "route.tsでリクエストを受け、LLMに問い合わせて結果を返す最小構成を型付きで書く。",
      blocks: [
        { type: "heading", text: "route.ts は「サーバー側の入口」" },
        { type: "paragraph", text: "Next.jsでは、決まった場所に置いた route.ts というファイルがサーバー側の入口になります。画面からのお願い([[fetch]] で送られてくる)をここで受け取り、返事を返します。中身はいたってシンプルで、「受け取る → LLMに聞く → 返す」の3ステップです。" },
        { type: "code", language: "typescript", caption: "app/api/chat/route.ts — 最小の入口", code: "// この関数名 POST は「POSTリクエストを受け取る係」という意味の決まり\n// Request と Response はブラウザ標準の型。追加で覚えることは少ない\nexport async function POST(req: Request): Promise<Response> {\n  // 1) 画面から送られてきたデータを取り出す\n  const body = await req.json();\n  const prompt: string = body.prompt;\n\n  // 2) LLMに聞く(この行は次のコードで実装する)\n  const answer = await askLLM(prompt);\n\n  // 3) 結果をJSONで返す\n  return Response.json({ answer });\n}" },
        { type: "paragraph", text: "ここで注目してほしいのは [[async]] と await です。LLMへの問い合わせは時間がかかる処理なので、「答えが返るまで待つ」という印として await を付けます。async は「この関数は待つ処理を含みます」という宣言です。詳しくはDay5の [[promise]] の話とつながっています。" },
        { type: "heading", text: "LLMに問い合わせる部分" },
        { type: "paragraph", text: "実際にLLMを呼ぶ部分です。多くのLLMは「HTTPでJSONを送ると、JSONで答えが返る」というAPIになっています。ここでキー(process.env)を使い、fetch でLLMのサーバーに問い合わせます。" },
        { type: "code", language: "typescript", caption: "LLMを呼ぶ関数(概念を示す最小例)", code: "// 返ってくる形をあらかじめ型で決めておく\ninterface LLMResponse {\n  text: string;\n}\n\nasync function askLLM(prompt: string): Promise<string> {\n  const res = await fetch(\"https://api.example-llm.com/v1/messages\", {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\",\n      // キーはサーバーの環境変数から。ブラウザには出ない\n      Authorization: \"Bearer \" + process.env.LLM_API_KEY\n    },\n    body: JSON.stringify({ prompt })\n  });\n\n  // 返事の形を LLMResponse だと明示する\n  const data = (await res.json()) as LLMResponse;\n  return data.text;\n}" },
        { type: "callout", variant: "why", title: "なぜ返事に型(LLMResponse)を付けるのか", text: "LLMからの返事を data.text のように使うとき、型がないと data.txet のようなタイプミスに気づけません。型を付けておけば、間違ったプロパティ名を書いた瞬間にエディタが赤線で教えてくれます。AIが生成したコードのミスも同じ仕組みで早く見つかります。" },
        { type: "compare",
          bad: { label: "型なし: どんなプロパティでも書けてしまう", language: "typescript", code: "const data: any = await res.json();\nreturn data.txet; // タイプミスでも誰も止めてくれない\n// 実行して初めて undefined になり、原因探しに時間を溶かす" },
          good: { label: "型あり: 間違いをその場で検知", language: "typescript", code: "interface LLMResponse { text: string; }\nconst data = (await res.json()) as LLMResponse;\nreturn data.txet; // ここで即エラー。text の打ち間違いだと分かる" }
        },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「Next.jsのapp/api/chat/route.tsで、POSTでpromptを受け取り、LLMのAPIをfetchで呼んで結果をJSONで返す最小のroute.tsを書いて。返り値には型を付けて、APIキーはprocess.envから読むこと」と頼めば、この形の下地が出てきます。返ってきたコードはキーの置き場所と型の有無を必ず自分で確認します。" },
        { type: "callout", variant: "warn", title: "エラー処理を忘れずに", text: "LLMのAPIは失敗することがあります(ネットワーク不調、キー切れ、混雑など)。res.ok が false のときの分岐や try/catch を入れないと、画面が無言で固まります。最小実装でまず動かし、次にエラー処理を足す順番がおすすめです。" }
      ],
      questions: [
        { id: "tsday6-lesson2-q1", type: "choice",
          question: "Next.jsの route.ts に書いた POST 関数の役割として正しいのは?",
          choices: [
            "ブラウザ上で画面を描画する係",
            "サーバー側でPOSTリクエストを受け取り、処理して返事を返す係",
            "CSSのスタイルを適用する係",
            "データベースを自動で作成する係"
          ],
          answerIndex: 1,
          explanation: "route.ts はサーバー側の入口で、POST 関数はPOSTリクエストを受け取る係です。画面描画やCSSはUI側の役割で、DB作成は別物です。" },
        { id: "tsday6-lesson2-q2", type: "choice",
          question: "LLMからの返事に interface LLMResponse のような型を付ける利点として最も適切なのは?",
          choices: [
            "実行速度が必ず速くなる",
            "プロパティ名の打ち間違い(例: text を txet)をエディタが実行前に検知できる",
            "APIキーが自動で暗号化される",
            "LLMの料金が安くなる"
          ],
          answerIndex: 1,
          explanation: "型はデータの形を約束するので、間違ったプロパティ名を書いた時点でエラーとして気づけます。速度・暗号化・料金には関係しません。" },
        { id: "tsday6-lesson2-q3", type: "free",
          question: "APIルート(route.ts)からLLMを呼ぶ最小実装の流れを、awaitを使う理由も含めて説明してください。",
          modelAnswer: "route.tsのPOST関数で、まず画面から送られてきたリクエストのbodyをawait req.json()で取り出してpromptを得ます。次にfetchでLLMのAPIに問い合わせ、返ってきたJSONを型付きで受け取り、その結果をResponse.jsonで画面に返します。LLMへの問い合わせやJSONの読み取りは完了まで時間がかかる非同期処理なので、結果を待ってから次に進むためにawaitを付け、それを含む関数にasyncを付けます。APIキーはprocess.envから読み、ブラウザには渡しません。",
          interviewPhrase: "実務ではこう説明する: route.tsでリクエストを受けてfetchでLLMを叩き、返り値を型付きで受け取ってJSONで返します。非同期なのでawaitで待ち、キーはenvから読みます。",
          keywords: ["route.ts", "POST", "fetch", "await", "async", "process.env", "型"] }
      ]
    },
    {
      id: "tsday6-lesson3",
      slug: "streaming-basics",
      title: "ストリーミングの考え方(応答を逐次表示する)",
      summary: "全部そろうまで待たず、届いた分から少しずつ表示するストリーミングの考え方をつかむ。",
      blocks: [
        { type: "heading", text: "「全部待つ」か「届いた分から出す」か" },
        { type: "paragraph", text: "ChatGPTのように、AIの返事が1文字ずつ流れて出てくるのを見たことがあると思います。あれが「ストリーミング」です。普通のやり方は答えが全部そろってからまとめて表示しますが、ストリーミングは届いた文字から順に表示していきます。体感の待ち時間が大きく変わるので、AIプロダクトではよく使われます。" },
        { type: "compare",
          bad: { label: "非ストリーミング: 全部そろうまで無言", text: "LLMが1000文字ぶんの返事を作り終えるまで、画面には何も出ない。ユーザーは「固まった?」と不安になる。" },
          good: { label: "ストリーミング: 届いた分から表示", text: "最初の数文字が来た瞬間から表示が始まる。全体の完成は同じでも、待っている感覚がぐっと減る。" }
        },
        { type: "callout", variant: "why", title: "なぜストリーミングにするのか", text: "LLMは長い文章ほど生成に時間がかかります。完成を待つと数秒〜十数秒の無言時間が生まれます。ストリーミングなら最初の一片が来た瞬間に表示が始まるので、同じ生成時間でも「速い」と感じてもらえます。UX(使い心地)を上げる定番の手法です。" },
        { type: "heading", text: "考え方: 川の水のように「少しずつ流れてくる」" },
        { type: "paragraph", text: "非ストリーミングでは「返事(1つの文字列)」を丸ごと受け取ります。ストリーミングでは、返事が小さなかたまり(チャンク)に分かれて、時間差で次々と届きます。プログラム側は「かたまりが届くたびに、画面に追記する」というループを回すだけです。" },
        { type: "code", language: "typescript", caption: "届いた分を順に読むイメージ(サーバー側)", code: "// LLMがストリーミング対応で返してくると、res.body は\n// 「少しずつ読める入れ物」になっている\nexport async function POST(req: Request): Promise<Response> {\n  const { prompt } = (await req.json()) as { prompt: string };\n\n  const llmRes = await fetch(\"https://api.example-llm.com/v1/messages\", {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\",\n      Authorization: \"Bearer \" + process.env.LLM_API_KEY\n    },\n    body: JSON.stringify({ prompt, stream: true }) // 流して返してと頼む\n  });\n\n  // 届いた流れ(body)をそのまま画面へ受け渡す\n  return new Response(llmRes.body, {\n    headers: { \"Content-Type\": \"text/plain; charset=utf-8\" }\n  });\n}" },
        { type: "paragraph", text: "画面側は、届いたチャンクを読みながら [[usestate]] で管理している文字列にどんどん足していきます。すると、足すたびに再描画されて、1文字ずつ増えていくように見えます。" },
        { type: "code", language: "tsx", caption: "画面側: 届いた分を足していく(概念)", code: "\"use client\";\nimport { useState } from \"react\";\n\nexport function Chat() {\n  const [answer, setAnswer] = useState<string>(\"\");\n\n  async function send(prompt: string) {\n    setAnswer(\"\");\n    const res = await fetch(\"/api/chat\", {\n      method: \"POST\",\n      body: JSON.stringify({ prompt })\n    });\n\n    // res.body から少しずつ読み、届いた分を足していく\n    const reader = res.body!.getReader();\n    const decoder = new TextDecoder();\n    while (true) {\n      const { value, done } = await reader.read();\n      if (done) break; // もう届かない\n      setAnswer((prev) => prev + decoder.decode(value));\n    }\n  }\n\n  return <p>{answer}</p>;\n}" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「Next.jsのroute.tsで、LLMのストリーミング応答をそのままクライアントに中継したい。サーバー側とクライアント側(useStateで逐次追記)の最小サンプルをTypeScriptで」と頼むと、この形のたたき台が得られます。まず非ストリーミングで動かしてから、ストリーミングに差し替えると理解しやすいです。" },
        { type: "callout", variant: "warn", title: "最初は無理にストリーミングしない", text: "ストリーミングは体感を良くしますが、実装は少し複雑です。学習段階ではまず非ストリーミング(全部そろってから表示)で正しく動くことを確認し、その後で置き換えるのが安全です。動く土台があると、AIに差分だけ頼めます。" }
      ],
      questions: [
        { id: "tsday6-lesson3-q1", type: "choice",
          question: "ストリーミングで応答を表示する主な利点はどれ?",
          choices: [
            "LLMの生成そのものが速くなり、料金も下がる",
            "答えが全部そろう前に、届いた分から表示できて体感の待ち時間が減る",
            "APIキーが不要になる",
            "型チェックが自動でかかるようになる"
          ],
          answerIndex: 1,
          explanation: "ストリーミングは届いた分から表示するので、生成時間が同じでも待っている感覚が減ります。生成自体が速くなるわけでも、料金やキー、型チェックに関係するわけでもありません。" },
        { id: "tsday6-lesson3-q2", type: "choice",
          question: "画面側でストリーミングされた文字を表示するとき、届いたチャンクをどう扱うのが典型的?",
          choices: [
            "届くたびに前の文字を消して最新チャンクだけ表示する",
            "全チャンクが届くまで変数に貯めて最後に一度だけ表示する",
            "届いたチャンクを既存の文字列に足していき、そのたびに再描画する",
            "チャンクは無視して最後のレスポンス全体を待つ"
          ],
          answerIndex: 2,
          explanation: "ストリーミングは「届いた分を足して再描画」を繰り返すことで、文字が少しずつ増えて見えます。最新だけ表示したり全部貯めて待つと、逐次表示の利点が消えます。" },
        { id: "tsday6-lesson3-q3", type: "free",
          question: "ストリーミングとは何か、非ストリーミングとの違いと、学習段階での進め方を含めて説明してください。",
          modelAnswer: "ストリーミングは、LLMの応答を全部そろうまで待たず、生成された分(チャンク)を届いた順に少しずつ表示する方式です。非ストリーミングは答えが全部完成してからまとめて表示するため、長い応答では無言の待ち時間が生まれますが、ストリーミングは最初の一片が届いた瞬間に表示が始まるので体感の待ち時間が減ります。仕組みとしては、サーバーはLLMの流れを中継し、画面側は届いたチャンクを既存の文字列に足して再描画を繰り返します。実装は少し複雑なので、学習段階ではまず非ストリーミングで正しく動かし、その後ストリーミングに置き換えるのが安全です。",
          interviewPhrase: "実務ではこう説明する: LLMの応答をチャンク単位で受け取り、届いた分から画面に追記していきます。生成時間は同じでも初表示が速く、体感UXが上がります。",
          keywords: ["ストリーミング", "チャンク", "逐次表示", "体感", "非ストリーミング", "追記"] }
      ]
    },
    {
      id: "tsday6-lesson4",
      slug: "prompt-type-safety-verification",
      title: "プロンプトと型で出力を固定、検算・安全(ハルシネーション/コスト)",
      summary: "出力の形をプロンプトと型で固定し、検算・上限設定でハルシネーションとコストに備える。",
      blocks: [
        { type: "heading", text: "LLMの出力は「そのまま信じない」" },
        { type: "paragraph", text: "LLMは便利ですが、2つの弱点があります。1つはハルシネーション(=もっともらしいウソをつくこと。事実でない内容を自信満々に出す現象)。もう1つはコスト(=使うほどお金がかかること)。この2つに対して、型と検算(=出てきた結果を自分で確かめること)で守るのがプロの作り方です。" },
        { type: "heading", text: "出力の形をプロンプトで固定する" },
        { type: "paragraph", text: "LLMに「自由に答えて」と頼むと、返事の形が毎回バラバラになり、プログラムで扱いにくくなります。そこで「必ずこのJSONの形で返して」と指示(プロンプト)で固定します。形を決めておけば、受け取る側も型で受けられます。" },
        { type: "code", language: "typescript", caption: "出力の形を先に型で決める", code: "// LLMにこの形で返させたい、と先に決めておく\ninterface Recipe {\n  title: string;      // 料理名\n  minutes: number;    // 調理時間(分)\n  steps: string[];    // 手順\n}\n\n// プロンプト側でも同じ形を明示的にお願いする\nconst instruction =\n  \"次のJSON形式のみで返答してください。前後に説明文を付けないこと。\\n\" +\n  \"{ \\\"title\\\": string, \\\"minutes\\\": number, \\\"steps\\\": string[] }\";" },
        { type: "callout", variant: "why", title: "なぜ型とプロンプトの両方で固定するのか", text: "プロンプトは「こう返してね」というお願いなので、LLMが従わないことがあります。型は「受け取った後にこの形か確かめる」役です。お願い(プロンプト)と確認(型・検算)の二段構えにすると、LLMが形を外したときにこちらで気づけます。" },
        { type: "heading", text: "検算: 受け取った後に必ず確かめる" },
        { type: "paragraph", text: "「型を付けた」だけでは実は不十分です。TypeScriptの as は「この形のはずだと信じる」だけで、実際の中身は確かめません。だから受け取った直後に、本当にその形か・値が妥当かを自分のコードでチェックします。これが検算です。" },
        { type: "compare",
          bad: { label: "信じるだけ: 形が違っても素通り", language: "typescript", code: "const recipe = JSON.parse(text) as Recipe;\n// もし minutes が \"30分\" という文字列で来ても\n// as は何もしてくれない。後で計算してバグる" },
          good: { label: "検算する: 形と値を確かめる", language: "typescript", code: "const data = JSON.parse(text);\nif (\n  typeof data.title !== \"string\" ||\n  typeof data.minutes !== \"number\" ||\n  !Array.isArray(data.steps)\n) {\n  throw new Error(\"LLMの出力が期待した形ではありません\");\n}\nconst recipe: Recipe = data; // ここまで来たら安心して使える" }
        },
        { type: "callout", variant: "warn", title: "ハルシネーションへの備え", text: "検算で形は守れても、内容が事実かどうかは別問題です。数値や固有名詞など「間違うと困る情報」は、LLMの出力をそのまま最終結果にせず、確かな情報源(データベースや計算)と突き合わせる設計にします。LLMは下書き役、確定はこちらの検算で、が基本です。" },
        { type: "heading", text: "コストへの備え" },
        { type: "paragraph", text: "LLMは送る文章と受け取る文章の量(トークン)に応じて課金されます。長い入力や無制限の出力は、そのまま料金に響きます。最大出力の上限を決める、無駄に長い入力を送らない、といった歯止めをコードに入れておきます。" },
        { type: "list", ordered: false, items: [
          "出力の最大長(max tokens など)を必ず指定して、際限なく生成させない。",
          "同じ質問には結果を再利用(キャッシュ)して、毎回LLMを呼ばない。",
          "ユーザー入力の長さに上限を設け、極端に長い入力を弾く。",
          "呼び出し回数やエラーを記録して、異常な増え方に早く気づく。"
        ] },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「LLMからのJSON出力を受け取ったあと、title:string / minutes:number / steps:string[] の形かを実行時に検算する関数をTypeScriptで書いて。形が違えばエラーを投げること」と頼むと、検算関数のたたき台が得られます。zodなどの検証ライブラリを提案してもらうのも有効です。" },
        { type: "paragraph", text: "まとめると、AIプロダクトは「実装はAIに任せ、型で守り、検算で確かめ、説明できる」状態を目指します。プロンプトで出力の形をお願いし、型と検算で本当にその形か確かめ、コストの歯止めを入れる。この3点を押さえれば、LLMの弱点に振り回されずに使えます。" }
      ],
      questions: [
        { id: "tsday6-lesson4-q1", type: "choice",
          question: "ハルシネーションの説明として最も適切なのは?",
          choices: [
            "LLMの応答が遅くなる現象",
            "LLMが事実でない内容を、もっともらしく自信を持って出してしまう現象",
            "APIキーが漏れてしまう事故",
            "ストリーミングが途中で止まること"
          ],
          answerIndex: 1,
          explanation: "ハルシネーションは、LLMが事実でない内容をもっともらしく出す現象です。応答速度やキー漏れ、ストリーミングの停止とは別の問題です。" },
        { id: "tsday6-lesson4-q2", type: "choice",
          question: "TypeScriptで const recipe = JSON.parse(text) as Recipe; と書いたとき、asが実際にやってくれることは?",
          choices: [
            "実行時に中身を検査し、形が違えば自動でエラーを出す",
            "中身は検査せず、コンパイラに「この形のはず」と伝えるだけ",
            "LLMの出力を自動で正しい形に変換する",
            "ハルシネーションを自動で除去する"
          ],
          answerIndex: 1,
          explanation: "as は型の見なしを伝えるだけで、実行時に中身は検査しません。だから受け取った後に自分で検算する必要があります。変換やハルシネーション除去は行いません。" },
        { id: "tsday6-lesson4-q3", type: "free",
          question: "LLMの出力を安全に扱うために、プロンプト・型・検算・コスト対策をどう組み合わせるか説明してください。",
          modelAnswer: "まずプロンプトで「必ずこのJSON形式で返す」と出力の形をお願いし、扱いやすくします。次に受け取り側で、期待する形をinterfaceなどの型で決めます。ただしasは形を見なすだけで中身を検査しないため、受け取った直後にtypeofやArray.isArrayなどで実行時に検算し、形や値が期待通りか確かめて、違えばエラーにします。内容が事実かどうかは検算では守れないので、重要な数値や固有名詞は確かな情報源と突き合わせ、LLMは下書き役として使います。コスト対策としては、出力の最大長を指定する、結果をキャッシュする、入力長に上限を設ける、呼び出しを記録するなどの歯止めを入れます。実装はAIに任せつつ、型と検算で守り、仕組みを説明できる状態を目指します。",
          interviewPhrase: "実務ではこう説明する: プロンプトで出力形式を固定し、受け取り後に型と実行時検算で形を確認します。事実は情報源と突き合わせ、出力上限やキャッシュでコストも抑えます。",
          keywords: ["プロンプト", "型", "検算", "as", "ハルシネーション", "コスト", "上限"] }
      ]
    }
  ]
};
