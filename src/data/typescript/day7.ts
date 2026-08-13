import type { Day } from "@/types";

export const tsDay7: Day = {
  day: 7,
  slug: "day7",
  title: "小さなAIプロダクトを完成させる(実践)",
  goal: "入力→AI→表示の一直線で、AIチャットまたは要約UIを1つ完成させ、Vercelで公開する道筋と、動かして直す/型で守る感覚を得る。",
  lessons: [
    {
      id: "tsday7-lesson1",
      slug: "small-product-design",
      title: "小さく作る設計(入力→AI→表示)",
      summary: "UIとサーバーの役割を分けて、入力→AI→表示の一直線を先に決める。",
      blocks: [
        {
          type: "heading",
          text: "まず「一直線」を紙に書く"
        },
        {
          type: "paragraph",
          text: "AIプロダクトと聞くと難しそうですが、最初に作るものは驚くほど単純です。やることは3つだけ。ユーザーが何かを入力する、その入力をAIに渡す、返ってきた答えを画面に表示する。この「入力→AI→表示」の一直線を、コードを書く前に日本語で書き出しておくと、途中で迷いません。"
        },
        {
          type: "paragraph",
          text: "たとえば要約ツールなら「長い文章を入力→AIに要約させる→短い要約を表示」。チャットなら「質問を入力→AIに答えさせる→回答を表示」。どちらも形は同じです。まず形を決めて、あとから中身を埋めていきます。"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ設計を先に書くのか",
          text: "実装はAIに任せられますが、「何を作るか」を決めるのは自分です。ここが曖昧だと、AIに頼んでも欲しいものが出てきません。逆に一直線がはっきりしていれば、各パーツを分けてAIに頼めます。"
        },
        {
          type: "heading",
          text: "UIとサーバーの役割分担"
        },
        {
          type: "paragraph",
          text: "ここで大事な分け方が「UI(画面)」と「サーバー」です。UIはユーザーが触る部分で、入力欄やボタン、結果の表示を担当します。サーバーはユーザーから見えない裏方で、AIの会社(OpenAIなど)に問い合わせる部分です。この2つを混ぜないことが、安全で分かりやすいアプリの鍵になります。"
        },
        {
          type: "paragraph",
          text: "なぜ分けるのか。AIを呼ぶには「APIキー」という秘密のパスワードが必要です。これをUI(ブラウザで動くコード)に置くと、誰でも見られてしまい悪用されます。だからAIを呼ぶ処理はサーバー側([[api-route]])に置き、UIはそのサーバーにお願いするだけにします。"
        },
        {
          type: "compare",
          bad: {
            label: "危険: UIから直接AIを呼ぶ",
            text: "ブラウザのコードにAPIキーが露出する",
            language: "typescript",
            code: "// ブラウザで動くコードに秘密キーを書く\nconst res = await fetch(\"https://api.openai.com/v1/chat/completions\", {\n  headers: { Authorization: \"Bearer sk-秘密のキー\" }\n});\n// キーが誰にでも見えてしまう"
          },
          good: {
            label: "安全: サーバー経由で呼ぶ",
            text: "UIは自分のサーバーにお願いし、キーはサーバーだけが持つ",
            language: "typescript",
            code: "// UI側: 自分のサーバーに頼むだけ\nconst res = await fetch(\"/api/chat\", {\n  method: \"POST\",\n  body: JSON.stringify({ message: input })\n});\n// キーはサーバーの中だけにある"
          }
        },
        {
          type: "heading",
          text: "型で「境界」を守る"
        },
        {
          type: "paragraph",
          text: "UIとサーバーの間でやり取りするデータの形を、型で決めておきます。たとえば「UIは message という文字列を送る」「サーバーは reply という文字列を返す」と決めれば、両者が同じ約束の上で動けます。この約束を[[interface]]で書いておくのがコツです。"
        },
        {
          type: "code",
          language: "typescript",
          caption: "UIとサーバーの約束を型で決める",
          code: "// リクエスト(UI → サーバー)の形\ninterface ChatRequest {\n  message: string;\n}\n\n// レスポンス(サーバー → UI)の形\ninterface ChatResponse {\n  reply: string;\n}"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「入力→AI→表示の一直線で動く要約アプリを作りたい。UIとサーバー(APIルート)の役割分担と、両者でやり取りするリクエスト/レスポンスの型を最初に提案して」と頼むと、設計から一緒に組み立てられます。"
        },
        {
          type: "list",
          ordered: true,
          items: [
            "作るものの一直線(入力→AI→表示)を日本語で書く",
            "UI(画面)とサーバー(AIを呼ぶ裏方)を分ける",
            "秘密のAPIキーはサーバー側だけに置く",
            "UIとサーバーがやり取りするデータの形を型で決める"
          ]
        }
      ],
      questions: [
        {
          id: "tsday7-lesson1-q1",
          type: "choice",
          question: "AIを呼ぶ処理をサーバー側に置く主な理由は?",
          choices: [
            "サーバーの方が計算が速いから",
            "APIキー(秘密のパスワード)をブラウザに露出させないため",
            "UIではfetchが使えないから",
            "型が書けるのはサーバーだけだから"
          ],
          answerIndex: 1,
          explanation: "APIキーをブラウザで動くUIに置くと誰でも見られて悪用されます。だから秘密を持つAI呼び出しはサーバー側に置き、UIはそのサーバーにお願いするだけにします。計算速度や型の有無が理由ではありません。"
        },
        {
          id: "tsday7-lesson1-q2",
          type: "free",
          question: "小さなAIプロダクトを作るとき、コードを書く前に決めておくべきことを説明してください。",
          modelAnswer: "「入力→AI→表示」という処理の一直線を先に日本語で書き出します。次にUI(画面・入力・表示)とサーバー(AIを呼ぶ裏方)の役割を分け、秘密のAPIキーはサーバー側だけに置くと決めます。さらにUIとサーバーがやり取りするリクエストとレスポンスのデータの形を型(interface)で決めておくと、両者が同じ約束の上で動けて迷いません。",
          interviewPhrase: "実務では「処理の流れと、フロントとバックの責務分担、その間のデータ契約を型で先に固めてから実装に入りました」と説明します。",
          keywords: ["入力→AI→表示", "役割分担", "APIキー", "型", "interface"]
        }
      ]
    },
    {
      id: "tsday7-lesson2",
      slug: "build-chat-ui",
      title: "実践: AIチャット(要約)UIを完成させる",
      summary: "入力欄・ボタン・表示をつなぎ、サーバー経由でAIを呼ぶ最小のUIを作る。",
      blocks: [
        {
          type: "heading",
          text: "画面(UI)を組み立てる"
        },
        {
          type: "paragraph",
          text: "前のレッスンで決めた設計を、実際のコードにしていきます。ここではReactの部品([[jsx]]で書くtsx)を使います。必要なのは3つ。入力欄、送信ボタン、結果を表示する場所です。入力中の文字や結果は[[usestate]]という仕組みで覚えておきます。"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「入力欄・送信ボタン・結果表示だけのシンプルなReactコンポーネントをTypeScript(tsx)で。useStateで入力と結果を管理し、送信で/api/chatにPOSTして、返ってきたreplyを表示して」。役割を細かく伝えるほど、直しやすいコードが返ってきます。"
        },
        {
          type: "code",
          language: "tsx",
          caption: "最小のチャット/要約UI(表示用)",
          code: "\"use client\";\nimport { useState } from \"react\";\n\nexport default function ChatBox() {\n  const [input, setInput] = useState(\"\");\n  const [reply, setReply] = useState(\"\");\n  const [loading, setLoading] = useState(false);\n\n  async function send() {\n    setLoading(true);\n    const res = await fetch(\"/api/chat\", {\n      method: \"POST\",\n      headers: { \"Content-Type\": \"application/json\" },\n      body: JSON.stringify({ message: input }),\n    });\n    const data: { reply: string } = await res.json();\n    setReply(data.reply);\n    setLoading(false);\n  }\n\n  return (\n    <div>\n      <textarea value={input} onChange={(e) => setInput(e.target.value)} />\n      <button onClick={send} disabled={loading}>\n        {loading ? \"考え中...\" : \"送信\"}\n      </button>\n      <p>{reply}</p>\n    </div>\n  );\n}"
        },
        {
          type: "paragraph",
          text: "ポイントは data の型を { reply: string } と書いているところです。サーバーが返す形を型で書いておくと、data.replay のようにタイプミスした瞬間にエディタが赤線で教えてくれます。AIが書いたコードを貼り付けたときも、この型があるとズレにすぐ気づけます。"
        },
        {
          type: "heading",
          text: "サーバー(APIルート)を作る"
        },
        {
          type: "paragraph",
          text: "次に、UIからのお願いを受けてAIを呼ぶサーバー側です。Next.jsでは決まった場所にファイルを置くと[[api-route]]になります。ここで受け取った message をAIに渡し、返事を reply として返します。async/awaitでAIの返事を待つのがポイントです([[async]] [[promise]])。"
        },
        {
          type: "code",
          language: "typescript",
          caption: "app/api/chat/route.ts(サーバー側・表示用)",
          code: "import { NextResponse } from \"next/server\";\n\ninterface ChatRequest {\n  message: string;\n}\n\nexport async function POST(req: Request) {\n  const body: ChatRequest = await req.json();\n\n  // AIの会社に問い合わせる(キーはサーバーの環境変数から)\n  const ai = await callAI(body.message);\n\n  return NextResponse.json({ reply: ai });\n}"
        },
        {
          type: "callout",
          variant: "warn",
          title: "APIキーは環境変数に",
          text: "APIキーはコードに直接書かず、環境変数(process.env.OPENAI_API_KEYなど)から読みます。コードをそのまま公開してもキーが漏れないためです。Vercelでは管理画面から環境変数を設定します。"
        },
        {
          type: "heading",
          text: "つながりを確認する"
        },
        {
          type: "list",
          ordered: true,
          items: [
            "UIの入力欄に文字を打つと input が更新される",
            "送信ボタンで /api/chat に message を送る",
            "サーバーが message を受け取りAIを呼ぶ",
            "AIの返事を reply として返す",
            "UIが reply を受け取って画面に表示する"
          ]
        },
        {
          type: "paragraph",
          text: "この5ステップが全部つながれば、あなたのAIプロダクトは動きます。最初から完璧を目指さず、まず「入力した文字がそのまま返ってくる」ところまで作り、次にAI呼び出しに差し替える、と段階を分けると詰まりにくいです。"
        }
      ],
      questions: [
        {
          id: "tsday7-lesson2-q1",
          type: "choice",
          question: "UI側で const data: { reply: string } = await res.json(); と型を書く利点は?",
          choices: [
            "通信が速くなる",
            "サーバーが自動で生成される",
            "data.replay のようなタイプミスをエディタが即座に指摘してくれる",
            "APIキーが不要になる"
          ],
          answerIndex: 2,
          explanation: "返ってくるデータの形を型で書いておくと、存在しないプロパティ名(replayなど)を書いた瞬間にエディタが赤線で警告します。AI生成コードのズレにも早く気づけます。通信速度やキーの要否とは関係ありません。"
        },
        {
          id: "tsday7-lesson2-q2",
          type: "choice",
          question: "AIの返事を待つために使う仕組みはどれ?",
          choices: [
            "if文",
            "async/await",
            "map",
            "useState"
          ],
          answerIndex: 1,
          explanation: "AIへの問い合わせは時間がかかる非同期処理なので、async関数の中でawaitを使って返事を待ちます。useStateは値の記憶、mapは配列の変換、ifは条件分岐で、待つ役割は持ちません。"
        },
        {
          id: "tsday7-lesson2-q3",
          type: "free",
          question: "入力→AI→表示のUIとサーバーが、どう連携して1回の応答が完成するか説明してください。",
          modelAnswer: "UIの入力欄に打った文字をuseStateで覚え、送信ボタンで/api/chatにmessageをPOSTします。サーバー(APIルート)はそのmessageを受け取り、async/awaitでAIに問い合わせて返事を待ち、それをreplyとして返します。UIは返ってきたreplyをuseStateにセットして画面に表示します。UIとサーバーの間はリクエスト/レスポンスの型で約束されているので、ズレがあれば型チェックで気づけます。",
          interviewPhrase: "実務では「フロントで入力を受け、APIルート経由でLLMを呼び、レスポンスを型で受け取って描画する、という一連の非同期フローを実装しました」と説明します。",
          keywords: ["useState", "POST", "APIルート", "async/await", "reply", "型"]
        }
      ]
    },
    {
      id: "tsday7-lesson3",
      slug: "run-and-fix-with-types",
      title: "動かして直す＋型で守る",
      summary: "AI生成コードのエラーを、型チェックと実際の動作の両方で潰していく。",
      blocks: [
        {
          type: "heading",
          text: "エラーは2種類ある"
        },
        {
          type: "paragraph",
          text: "作ったものが一発で動くことはまれです。でも大丈夫。エラーには大きく2種類あって、それぞれ潰し方が決まっています。1つは「型エラー」で、コードを書いている段階でエディタが赤線を出すもの。もう1つは「実行時エラー」で、実際に動かしたときに起きるものです。"
        },
        {
          type: "list",
          items: [
            "型エラー: 実行する前に、エディタや型チェックが教えてくれる(例: 存在しないプロパティ、型の食い違い)",
            "実行時エラー: 実際に動かすと起きる(例: AIの返事が空、通信の失敗、想定外のデータ)"
          ]
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ型が「早く気づく」武器になるのか",
          text: "AIが生成したコードは、それらしく見えても細部がズレていることがあります。型があると、動かす前の段階でズレを赤線で示してくれます。実行してから初めて気づくより、はるかに早く・安く直せます。"
        },
        {
          type: "heading",
          text: "型エラーを潰す"
        },
        {
          type: "paragraph",
          text: "AIが書いたコードを貼り付けたら、まずエディタの赤線と、ターミナルでの型チェックを見ます。よくあるのはプロパティ名のズレです。サーバーは reply を返すのに、UIが message を読もうとしている、といった食い違いを型が捕まえます。"
        },
        {
          type: "compare",
          bad: {
            label: "型が食い違っている",
            text: "サーバーはreplyを返すのにmessageを読んでいる",
            language: "typescript",
            code: "const data: { reply: string } = await res.json();\nsetReply(data.message); // エラー: messageは存在しない"
          },
          good: {
            label: "型に合わせて直す",
            text: "返ってくる形(reply)に合わせる",
            language: "typescript",
            code: "const data: { reply: string } = await res.json();\nsetReply(data.reply); // OK"
          }
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "型エラーが出たら、そのエラーメッセージをまるごとコピーして「このTypeScriptの型エラーの意味と直し方を、初心者向けに説明して」と貼ると、原因と修正案が返ってきます。エラー文は隠さず全部渡すのがコツです。"
        },
        {
          type: "heading",
          text: "実行時エラーを潰す"
        },
        {
          type: "paragraph",
          text: "型チェックが通っても、実際に動かすと別の問題が出ることがあります。AIの返事が空だったり、通信が失敗したり。ここは「実際に動かして、想定外に備える」しかありません。返事が来ないときに備えて、値がないケースを型と条件分岐で守ります。"
        },
        {
          type: "code",
          language: "typescript",
          caption: "想定外に備えて守る(表示用)",
          code: "// replyが来ないかもしれないと型で表す\nconst data: { reply?: string } = await res.json();\n\n// 値がある時だけ表示、なければ案内を出す\nif (data.reply) {\n  setReply(data.reply);\n} else {\n  setReply(\"うまく取得できませんでした。もう一度お試しください。\");\n}"
        },
        {
          type: "callout",
          variant: "warn",
          title: "動かす前に必ず型チェック",
          text: "コードを本番に上げる前に型チェック(tscやビルド)を通す習慣をつけましょう。型エラーを残したまま公開すると、ユーザーの前で壊れます。型は「公開前の最後の門番」です。"
        },
        {
          type: "list",
          ordered: true,
          items: [
            "AIのコードを貼ったら、まずエディタの赤線を全部消す",
            "ターミナルで型チェック(ビルド)を通す",
            "実際に動かして、正常なケースを確認する",
            "空・失敗など想定外のケースを試し、条件分岐で守る"
          ]
        }
      ],
      questions: [
        {
          id: "tsday7-lesson3-q1",
          type: "choice",
          question: "「型エラー」と「実行時エラー」の違いとして正しいものは?",
          choices: [
            "どちらも実行しないと分からない",
            "型エラーは実行前に気づけ、実行時エラーは動かして初めて分かる",
            "型エラーはユーザーにしか見えない",
            "実行時エラーは型を書けば絶対に起きない"
          ],
          answerIndex: 1,
          explanation: "型エラーはコードを書く/ビルドする段階でエディタや型チェックが指摘してくれます。実行時エラー(通信失敗や空の返事など)は実際に動かして初めて分かります。型は多くのミスを前倒しで捕まえますが、実行時の想定外を全て防ぐわけではありません。"
        },
        {
          id: "tsday7-lesson3-q2",
          type: "free",
          question: "AIが生成したコードのエラーを、型と実行の両面でどう潰すか説明してください。",
          modelAnswer: "まずAIのコードを貼ったらエディタの赤線とビルド時の型チェックを見て、プロパティ名の食い違いや型の不一致といった型エラーを実行前に消します。型が通ったら実際に動かして正常なケースを確認し、次にAIの返事が空だったり通信が失敗したりする想定外のケースを試します。返ってくる値を任意(reply?)として型で表し、値があるときだけ表示、なければ案内を出すよう条件分岐で守ります。型で前倒しに気づき、実行で残りを潰す、の二段構えです。",
          interviewPhrase: "実務では「静的な型チェックで早期にズレを検出し、実行検証で想定外の入力や失敗ケースを潰す、という二段構えで品質を担保しました」と説明します。",
          keywords: ["型エラー", "実行時エラー", "型チェック", "条件分岐", "想定外"]
        }
      ]
    },
    {
      id: "tsday7-lesson4",
      slug: "deploy-and-graduate",
      title: "公開(Vercel)と卒業",
      summary: "Vercelで公開する道筋を押さえ、作ったものと設計を自分の言葉で説明できるようにする。",
      blocks: [
        {
          type: "heading",
          text: "Vercelで公開する道筋"
        },
        {
          type: "paragraph",
          text: "ローカル(自分のパソコン)で動いたら、いよいよ世界に公開します。Next.jsのアプリはVercelというサービスで簡単に公開できます。難しい設定はほとんどなく、コードを置いてボタンを押せば、あなただけのURLがもらえます。"
        },
        {
          type: "list",
          ordered: true,
          items: [
            "コードをGitHubのリポジトリに置く",
            "VercelにGitHubアカウントでログインし、そのリポジトリを選ぶ",
            "APIキーなどの秘密は、Vercelの環境変数として設定する(コードには書かない)",
            "デプロイ(公開)ボタンを押すと、ビルドが走ってURLが発行される",
            "発行されたURLを開いて、実際に動くか確認する"
          ]
        },
        {
          type: "callout",
          variant: "warn",
          title: "公開前チェック",
          text: "公開前に、型チェック(ビルド)が通ること、APIキーがコードに直書きされていないこと、環境変数がVercel側に設定されていることを必ず確認します。ビルドが通らないと公開自体が失敗します。"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「Next.jsアプリをVercelに公開する手順を、GitHub連携と環境変数の設定を含めて順番に教えて。ビルドが失敗したときの確認ポイントも」と聞くと、詰まりやすい所まで案内してくれます。"
        },
        {
          type: "heading",
          text: "自分の言葉で説明できるか"
        },
        {
          type: "paragraph",
          text: "卒業の条件は、コードを丸暗記することではありません。「何を作ったか」「なぜこの設計にしたか」を自分の言葉で説明できることです。実装の細部はAIに任せていい。でも設計の意図を語れるかどうかが、あなたの価値になります。"
        },
        {
          type: "compare",
          bad: {
            label: "説明できない状態",
            text: "「AIが書いてくれたので、なぜこうなっているかは分かりません」"
          },
          good: {
            label: "説明できる状態",
            text: "「入力→AI→表示の一直線です。APIキーを守るためAI呼び出しはサーバー側に置き、UIとサーバーの間は型で約束しています。だからAI生成コードのズレにも早く気づけます」"
          }
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ「説明できる」が大事なのか",
          text: "AIは実装を高速に生成します。だからこそ、設計を決め、意図を説明し、間違いを見抜く人の価値が上がります。型はその「見抜く」を助ける道具です。書くより、選び、守り、語れることが力になります。"
        },
        {
          type: "heading",
          text: "Python編との往復で力がつく"
        },
        {
          type: "paragraph",
          text: "この教材で身につけた「入力→処理→出力を一直線で考える」「型で境界を守る」「AIに実装を任せ、自分は設計と検証をする」という感覚は、TypeScriptだけのものではありません。Python編でAIのモデル側やデータ処理を学ぶと、フロント(TypeScript)とバック(Python)の両方が見えて、作れるものが一気に広がります。"
        },
        {
          type: "paragraph",
          text: "TypeScriptで画面と入り口を作り、Pythonで中身の処理を作る。この往復を繰り返すたびに、AIプロダクトの全体像がはっきりしていきます。今日完成させた小さな一直線が、その出発点です。"
        },
        {
          type: "list",
          items: [
            "作ったもの: 入力→AI→表示で動く小さなAIプロダクトを1つ完成させた",
            "身につけた設計: UIとサーバーの役割分担、型による境界の約束",
            "身につけた姿勢: 実装はAIに任せ、型で守り、意図を自分の言葉で説明する",
            "次の一歩: Python編と往復し、フロントとバックの両面から作れるようになる"
          ]
        }
      ],
      questions: [
        {
          id: "tsday7-lesson4-q1",
          type: "choice",
          question: "Vercelで公開する前に必ず確認すべきことはどれ?",
          choices: [
            "コードにAPIキーを直書きしておく",
            "型チェック(ビルド)が通り、キーは環境変数に設定されている",
            "テストを全部消しておく",
            "UIから直接AIを呼ぶように変更する"
          ],
          answerIndex: 1,
          explanation: "公開前はビルド(型チェック)が通ること、APIキーがコードに直書きされず環境変数として設定されていることを確認します。キーの直書きやUIからの直接呼び出しは危険で、ビルドが通らなければ公開自体が失敗します。"
        },
        {
          id: "tsday7-lesson4-q2",
          type: "free",
          question: "あなたが作ったAIプロダクトについて、何を作ったか・なぜこの設計かを自分の言葉で説明してください。",
          modelAnswer: "入力→AI→表示の一直線で動く小さなAIプロダクトを作りました。ユーザーが入力した文字をUIが受け取り、サーバー(APIルート)経由でAIに問い合わせ、返ってきた答えを画面に表示します。AI呼び出しをサーバー側に置いたのは、APIキーという秘密をブラウザに露出させないためです。UIとサーバーの間はリクエスト/レスポンスの型で約束しているので、AIが生成したコードにズレがあっても公開前に型チェックで気づけます。実装はAIに任せつつ、設計を決め、型で守り、意図を説明できるようにしています。",
          interviewPhrase: "実務では「責務を分離し、秘密情報をサーバーに閉じ込め、境界を型で契約することで、生成コードの品質を担保しつつ素早くプロダクトを形にしました」と説明します。",
          keywords: ["入力→AI→表示", "サーバー", "APIキー", "型", "設計", "説明"]
        }
      ]
    }
  ]
};
