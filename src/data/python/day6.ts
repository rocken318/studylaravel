import type { Day } from "@/types";

export const pythonDay6: Day = {
  day: 6,
  slug: "day6",
  title: "AIを動かす",
  goal: "LLM APIの考え方を理解し、要約・分類する小さなAIツールをPythonから作れる。プロンプト設計と結果の検算・安全の基本を持つ。",
  lessons: [
    {
      id: "pyday6-lesson1",
      slug: "how-llm-api-works",
      title: "LLM APIの考え方",
      summary: "プロンプト(入力)と応答(出力)、トークンと料金の基本を、実務の視点でつかむ。",
      blocks: [
        { type: "heading", text: "LLMは「文章を入れると文章が返る関数」" },
        { type: "paragraph", text: "LLM(Large Language Model、大規模言語モデル。大量の文章で学習したAI)は、むずかしく考えると迷子になります。まずは「文章を入れると文章が返ってくる、巨大な関数」だと思ってください。あなたが入れる文章をプロンプト(prompt、指示や質問のこと)、返ってくる文章を応答(response)と呼びます。" },
        { type: "paragraph", text: "API(Application Programming Interface、プログラムから他のサービスを呼び出す窓口)を使うと、この「関数」をPythonのコードから呼べます。つまり、ChatGPTのような画面を人が操作する代わりに、あなたのプログラムがAIに話しかけて答えを受け取れる、ということです。" },
        {
          type: "code",
          language: "text",
          code: "あなた(プロンプト): 次の文を1行で要約して。「今日は雨だったが午後から晴れ、気温も上がった。」\nAI(応答): 午後から晴れて気温が上がった一日。",
          caption: "入力と出力のイメージ。中身はただの文字列のやり取り"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ「関数」と捉えると良いのか",
          text: "関数だと思えば、Day 4で学んだ「入力を渡して戻り値を受け取る」感覚がそのまま使えます。AIを特別なものと構えず、文字列を渡して文字列を受け取る部品として扱えるようになると、コードに組み込むのが一気に楽になります。"
        },
        { type: "heading", text: "トークンと料金" },
        { type: "paragraph", text: "LLMは文章を「トークン」という単位に区切って処理します。トークンはだいたい単語や文字のかたまりで、英語なら1単語がおよそ1トークン、日本語は1文字が複数トークンになることもあります。正確な数はモデルや文章によって変わるため、ここでは「文章の長さの目安になる単位」とだけ覚えておけば十分です。" },
        { type: "paragraph", text: "料金はこのトークン数に応じてかかります。多くのAPIは「入力したトークン数」と「出力したトークン数」の合計で課金されます。つまり、長いプロンプトを送ったり、長い応答を出させたりするほど費用が増える、という素直な仕組みです。単価はモデルや時期で変わるので、実際の金額は必ず提供元の料金ページで確認してください(ここでは具体的な数字は出しません)。" },
        {
          type: "list",
          ordered: false,
          items: [
            "入力トークン: あなたが送るプロンプトの長さ",
            "出力トークン: AIが返す応答の長さ",
            "料金: おおむね (入力 + 出力) のトークン数に比例",
            "長い文章を丸ごと送ると、その分だけ費用も処理時間も増える"
          ]
        },
        {
          type: "callout",
          variant: "warn",
          title: "「とりあえず全部送る」は高くつく",
          text: "巨大なファイルやログを丸ごとプロンプトに貼ると、トークンが膨らんで料金も跳ね上がります。必要な部分だけを渡す、という発想は最初から持っておきましょう。"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「このプロンプトはだいたい何トークンくらい? 料金の考え方を、入力トークンと出力トークンに分けて説明して」と聞くと、仕組みの理解が進みます。金額そのものは変動するので、最終確認は公式の料金ページで、と念押しすると安全です。"
        },
        { type: "heading", text: "AI時代の第一歩として" },
        { type: "paragraph", text: "これからの実務では、AIの呼び出し部分はAIに書いてもらう場面が増えます。だからこそ大事なのは、生成されたコードを「読める・直せる・説明できる」ことです。この章では、細部を暗記するのではなく、AIが返すコードを見て『ここがプロンプト、ここが応答、ここでトークンを消費している』と指させる力を育てます。" }
      ],
      questions: [
        {
          id: "pyday6-lesson1-q1",
          type: "choice",
          question: "LLM APIにおける「プロンプト」と「応答」の説明として正しいものはどれ?",
          choices: [
            "プロンプトはAIが返す文章、応答はあなたが送る文章",
            "プロンプトはあなたが送る入力の文章、応答はAIが返す出力の文章",
            "プロンプトは料金、応答はトークン数のこと",
            "プロンプトと応答はどちらもAIが自動で作るもので、人間は関与しない"
          ],
          answerIndex: 1,
          explanation: "プロンプト=あなたが送る入力、応答=AIが返す出力です。LLMは「文章を入れると文章が返る関数」と捉えると、この対応関係がわかりやすくなります。"
        },
        {
          id: "pyday6-lesson1-q2",
          type: "choice",
          question: "トークンと料金の関係について、最も適切な説明はどれ?",
          choices: [
            "料金は呼び出した回数だけで決まり、文章の長さは関係ない",
            "料金は入力トークンだけで決まり、出力の長さは無料である",
            "料金はおおむね入力トークンと出力トークンの合計に比例する",
            "トークンは日本語には存在せず、英語だけの概念である"
          ],
          answerIndex: 2,
          explanation: "多くのAPIは入力トークンと出力トークンの合計で課金します。長いプロンプトや長い応答ほど費用が増えます。単価自体はモデルや時期で変わるため、金額は公式ページで確認します。"
        },
        {
          id: "pyday6-lesson1-q3",
          type: "free",
          question: "「LLM APIは文章を入れると文章が返る関数だ」という捉え方が、コードにAIを組み込むうえでなぜ役立つのか、自分の言葉で説明してください。",
          modelAnswer: "関数として捉えると、入力(プロンプト)を渡して戻り値(応答)を受け取る、というPythonで慣れた構造にそのまま当てはめられます。AIを特別視せず、文字列を渡して文字列を受け取る部品として扱えるので、既存のコードに組み込みやすく、どこが入力でどこが出力かを指させるようになります。",
          interviewPhrase: "実務ではこう説明する: 『LLMは入力と出力がどちらも文字列の関数と捉えています。だから通常の関数呼び出しと同じ感覚で、入力を組み立てて応答を後処理する、という設計に落とし込めます』",
          keywords: ["関数", "入力", "出力", "プロンプト", "応答"]
        }
      ]
    },
    {
      id: "pyday6-lesson2",
      slug: "call-llm-minimal-code",
      title: "最小コードでLLMを呼ぶ",
      summary: "OpenAIでもAnthropicでも共通する「送って受け取る」構造を、最小のコードでつかむ。",
      blocks: [
        { type: "heading", text: "呼び出しの共通構造" },
        { type: "paragraph", text: "AIの会社はいくつもあり、代表的なものにOpenAI(ChatGPTを作った会社)やAnthropic(Claudeを作った会社)があります。細かい書き方は違いますが、やっていることの骨組みはどれも同じです。この「共通の型」を先につかんでおくと、どの会社のAPIでも迷いません。" },
        {
          type: "list",
          ordered: true,
          items: [
            "APIキー(そのサービスを使う許可証となる秘密の文字列)を用意する",
            "使うモデル名と、送るメッセージ(プロンプト)を決める",
            "APIを呼び出す(送信する)",
            "返ってきた応答から、必要なテキスト部分を取り出す"
          ]
        },
        {
          type: "callout",
          variant: "info",
          title: "SDKとrequests、どちらでもいい",
          text: "SDK(Software Development Kit、各社が用意した専用の呼び出しライブラリ)を使うと短く書けます。requests(HTTP通信を行う汎用ライブラリ)で直接呼ぶこともできますが、まずはSDKの方が読みやすくおすすめです。どちらも『送って受け取る』骨組みは同じです。"
        },
        { type: "heading", text: "SDKを使った最小例(Anthropic)" },
        { type: "paragraph", text: "次はClaudeを呼ぶ最小の例です。写経する必要はありません。『どこがプロンプトで、どこで応答を取り出しているか』を目で追ってください。" },
        {
          type: "code",
          language: "python",
          code: "import os\nfrom anthropic import Anthropic\n\n# APIキーは環境変数から読む(コードに直接書かない)\nclient = Anthropic(api_key=os.environ[\"ANTHROPIC_API_KEY\"])\n\nresponse = client.messages.create(\n    model=\"claude-sonnet-4-5\",\n    max_tokens=200,\n    messages=[\n        {\"role\": \"user\", \"content\": \"Pythonとは何か、初心者向けに2文で説明して。\"}\n    ],\n)\n\n# 応答からテキスト部分を取り出す\nprint(response.content[0].text)",
          caption: "送るメッセージがプロンプト、response からテキストを取り出すのが応答の受け取り"
        },
        { type: "heading", text: "同じ構造を別の会社でも" },
        { type: "paragraph", text: "OpenAIのSDKでも、書き方の細部が違うだけで流れは同じです。『キーを渡す → モデルとメッセージを指定 → 呼ぶ → 応答からテキストを取り出す』という4ステップを探しながら読むと、初見のコードでも構造が見えてきます。" },
        {
          type: "compare",
          bad: {
            label: "危ない書き方",
            text: "APIキーをコードに直接書いてしまう。GitHubなどに公開すると悪用され、料金を請求される危険がある。",
            language: "python",
            code: "client = Anthropic(api_key=\"sk-ant-xxxxxxxxxxxx\")  # 絶対にやらない"
          },
          good: {
            label: "安全な書き方",
            text: "キーは環境変数(OSに登録する設定値)から読む。コードにはキー本体が残らない。",
            language: "python",
            code: "import os\nclient = Anthropic(api_key=os.environ[\"ANTHROPIC_API_KEY\"])"
          }
        },
        {
          type: "callout",
          variant: "warn",
          title: "APIキーは秘密。コードに直書きしない",
          text: "APIキーはお店のレジの鍵のようなものです。コードに直接書いてうっかり公開すると、他人にあなたのアカウントで料金を使われます。環境変数や設定ファイル(公開しない)から読むのが基本です。"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「Anthropic(またはOpenAI)のPython SDKで、環境変数からAPIキーを読んでメッセージを1回送る最小コードを書いて。応答からテキストを取り出す行にコメントを付けて」と頼むと、この章の構造そのままの雛形が得られます。得られたコードは4ステップに分けて自分で読み直しましょう。"
        }
      ],
      questions: [
        {
          id: "pyday6-lesson2-q1",
          type: "choice",
          question: "LLM APIを呼び出す共通の流れとして正しい順序はどれ?",
          choices: [
            "応答を取り出す → APIキーを用意 → モデルを決める → 呼び出す",
            "APIキーを用意 → モデルとメッセージを決める → 呼び出す → 応答を取り出す",
            "モデルを決める → 応答を取り出す → APIキーを用意 → 呼び出す",
            "呼び出す → APIキーを用意 → 応答を取り出す → モデルを決める"
          ],
          answerIndex: 1,
          explanation: "会社やライブラリが違っても、骨組みは『キーを用意 → モデルとメッセージを指定 → 呼び出す → 応答からテキストを取り出す』です。この型を覚えると初見のコードも読めます。"
        },
        {
          id: "pyday6-lesson2-q2",
          type: "choice",
          question: "APIキーの扱い方として最も適切なものはどれ?",
          choices: [
            "コードに直接書き、GitHubにも公開してチームで共有する",
            "環境変数などから読み込み、コード本体にはキーを書かない",
            "毎回チャット画面にコピーして貼り付ける",
            "スクリーンショットにしてSlackやSNSに貼る"
          ],
          answerIndex: 1,
          explanation: "APIキーは秘密の許可証です。コードに直書きして公開すると悪用され、料金を請求される危険があります。環境変数や公開しない設定ファイルから読むのが基本です。"
        },
        {
          id: "pyday6-lesson2-q3",
          type: "free",
          question: "初めて見るLLM呼び出しのコードを渡されたとき、あなたはどこに注目して読みますか。この章で学んだ「共通構造」をもとに説明してください。",
          modelAnswer: "会社やライブラリが違っても骨組みは同じなので、まず4つの部分を探します。(1)APIキーをどこから読んでいるか、(2)どのモデルを指定しているか、(3)送っているメッセージ(プロンプト)は何か、(4)応答からテキストをどう取り出しているか。この4点を指させれば、細部の書き方が違っても全体の意味がつかめます。",
          interviewPhrase: "実務ではこう説明する: 『LLM呼び出しは、キーの読み込み・モデル指定・プロンプト・応答の取り出しの4点を押さえれば、SDKが違っても読めます。まずその4か所を特定してから細部を見ます』",
          keywords: ["APIキー", "モデル", "プロンプト", "応答", "共通構造"]
        }
      ]
    },
    {
      id: "pyday6-lesson3",
      slug: "build-summarizer-tool",
      title: "ミニ実装: 文章を要約するツール",
      summary: "長い文章を渡すと短くまとめて返す、小さな要約ツールを関数として組み立てる。",
      blocks: [
        { type: "heading", text: "作るもの: 要約関数" },
        { type: "paragraph", text: "ここでは「長い文章を渡すと、短い要約が返ってくる関数」を作ります。Day 4で学んだ関数の考え方と、Lesson 2のLLM呼び出しを組み合わせるだけです。中身がAIになっても、『入力を渡して戻り値を受け取る』という使い勝手は普通の関数と変わりません。" },
        {
          type: "code",
          language: "python",
          code: "import os\nfrom anthropic import Anthropic\n\nclient = Anthropic(api_key=os.environ[\"ANTHROPIC_API_KEY\"])\n\ndef summarize(text: str, max_sentences: int = 3) -> str:\n    prompt = (\n        \"次の文章を日本語で要約してください。\\n\"\n        \"条件: \" + str(max_sentences) + \"文以内。事実を追加しない。\\n\\n\"\n        \"----\\n\" + text + \"\\n----\"\n    )\n    response = client.messages.create(\n        model=\"claude-sonnet-4-5\",\n        max_tokens=300,\n        messages=[{\"role\": \"user\", \"content\": prompt}],\n    )\n    return response.content[0].text.strip()\n\narticle = \"(ここに長い文章が入る)\"\nprint(summarize(article, max_sentences=2))",
          caption: "text を受け取り、要約の文字列を返す関数。呼ぶ側は普通の関数と同じ感覚"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ関数にまとめるのか",
          text: "要約の手順を summarize という1つの箱に閉じ込めると、呼ぶ側は中身を知らなくても text を渡すだけで使えます。あとでモデルを変えたり条件を足したりするときも、この関数の中だけ直せばよく、影響が広がりません。"
        },
        { type: "heading", text: "プロンプトに「条件」を書く" },
        { type: "paragraph", text: "上のコードで注目してほしいのは、プロンプトの中に『3文以内』『事実を追加しない』という条件を書いている点です。AIは指示された通りに動こうとするので、望む形を言葉で明確に伝えるほど、結果が安定します。これはLesson 4で扱う「プロンプト設計」の入り口です。" },
        {
          type: "compare",
          bad: {
            label: "あいまいな指示",
            text: "「要約して」だけ。長さや制約が不明で、結果が毎回バラつく。",
            language: "text",
            code: "この文章を要約して。"
          },
          good: {
            label: "条件つきの指示",
            text: "文数の上限と『事実を追加しない』という制約を明示。結果が安定し、検算もしやすい。",
            language: "text",
            code: "次の文章を3文以内で要約して。元の文にない事実は加えないで。"
          }
        },
        { type: "heading", text: "結果を鵜呑みにしない: 検算" },
        { type: "paragraph", text: "AIの要約は自然に読めますが、たまに元の文章にない内容を混ぜることがあります。これをハルシネーション(hallucination、AIがもっともらしい嘘を生成する現象)と呼びます。だから、要約に出てきた数字や固有名詞が本当に元の文章にあるかを確かめる『検算』の習慣が大切です。" },
        {
          type: "list",
          ordered: false,
          items: [
            "要約に出てきた数字・日付・名前が元の文章にあるか確認する",
            "元の文章より内容が『増えて』いないかを見る(増えていたら要注意)",
            "重要な用途では、要約だけでなく必ず原文も参照できるようにしておく"
          ]
        },
        {
          type: "callout",
          variant: "warn",
          title: "要約は『短くなった原文』ではなく『AIの再構成』",
          text: "要約は原文を機械的に切り貼りしたものではなく、AIが読み直して書き直したものです。だからこそ、便利さと引き換えに『事実がずれる可能性』が常にあると意識してください。"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「この要約関数に、要約結果が元の文章に含まれない固有名詞を含んでいないか簡単にチェックする処理を足して」と頼むと、検算の仕組みを一緒に作れます。ただし完全な検出は難しいので、最終判断は人が行う前提にしましょう。"
        }
      ],
      questions: [
        {
          id: "pyday6-lesson3-q1",
          type: "choice",
          question: "要約の手順を summarize という関数にまとめる利点として、最も適切なものはどれ?",
          choices: [
            "関数にすると要約の精度が必ず100%になる",
            "呼ぶ側は中身を知らなくても text を渡すだけで使え、変更もこの関数内で完結する",
            "関数にするとAPI料金が無料になる",
            "関数にするとハルシネーションが起きなくなる"
          ],
          answerIndex: 1,
          explanation: "関数にまとめると、呼ぶ側は入力を渡すだけで使え、モデル変更や条件追加もその関数の中だけで済みます。精度や料金、ハルシネーションの有無は関数化とは無関係です。"
        },
        {
          id: "pyday6-lesson3-q2",
          type: "choice",
          question: "AIの要約に対する「検算」として適切な行動はどれ?",
          choices: [
            "要約は自然に読めるので、内容は一切確認しなくてよい",
            "要約に出た数字や固有名詞が元の文章に本当にあるかを確認する",
            "要約が長ければ長いほど正確なので、長さだけ見る",
            "AIが生成したものは常に正しいので原文は捨ててよい"
          ],
          answerIndex: 1,
          explanation: "AIは元の文章にない内容を混ぜることがあります(ハルシネーション)。要約に出た数字・日付・固有名詞が原文にあるかを確認し、内容が増えていないかを見るのが検算です。"
        },
        {
          id: "pyday6-lesson3-q3",
          type: "free",
          question: "「AIの要約は短くなった原文そのものではない」とはどういう意味か、ハルシネーションという言葉を使って説明してください。",
          modelAnswer: "要約は原文を機械的に切り貼りしたものではなく、AIが読み直して書き直した再構成です。そのため、もっともらしいが元の文章にない事実を混ぜてしまうハルシネーションが起こり得ます。だから要約をそのまま信用せず、数字や固有名詞が原文にあるかを検算し、重要な用途では原文も参照できるようにしておく必要があります。",
          interviewPhrase: "実務ではこう説明する: 『要約はAIによる再構成なので、ハルシネーションの可能性を前提に扱います。数字や固有名詞は原文と突き合わせて検算し、要約単体を根拠にはしません』",
          keywords: ["再構成", "ハルシネーション", "検算", "原文", "固有名詞"]
        }
      ]
    },
    {
      id: "pyday6-lesson4",
      slug: "build-classifier-and-prompt-design",
      title: "ミニ実装: 問い合わせを分類するツール",
      summary: "問い合わせをカテゴリ分けするツールを作りながら、役割・制約・JSON固定のプロンプト設計と安全の基本を学ぶ。",
      blocks: [
        { type: "heading", text: "作るもの: 分類ツール" },
        { type: "paragraph", text: "次は、お客さんからの問い合わせ文を「質問」「クレーム」「要望」などのカテゴリに分ける分類ツールを作ります。要約と違って、答えは決まった選択肢の中から選ばせたいので、出力の形をきっちり指定するのがコツです。" },
        { type: "heading", text: "プロンプト設計の3本柱" },
        { type: "paragraph", text: "望む結果を安定して得るには、プロンプトに次の3つを書きます。これがLesson 3の「条件つき指示」を一段しっかりさせた形です。" },
        {
          type: "list",
          ordered: true,
          items: [
            "役割: AIに立場を与える(例: 『あなたは問い合わせを分類する担当者です』)",
            "制約: 守るべきルール(例: 『カテゴリは指定した3つから必ず1つ選ぶ。推測で新しいカテゴリを作らない』)",
            "出力形式: 返す形を固定する(例: 『JSON形式だけで返す。前後に説明文を付けない』)"
          ]
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ出力形式をJSONで固定するのか",
          text: "プログラムがAIの応答を使うには、機械が読める決まった形が必要です。JSON(データを表す標準的なテキスト形式)で固定すると、応答をそのままPythonの辞書に変換して次の処理に渡せます。自由な文章のままだと、毎回書き方が変わって取り出しに失敗します。"
        },
        {
          type: "code",
          language: "python",
          code: "import os\nimport json\nfrom anthropic import Anthropic\n\nclient = Anthropic(api_key=os.environ[\"ANTHROPIC_API_KEY\"])\n\nCATEGORIES = [\"質問\", \"クレーム\", \"要望\"]\n\ndef classify(text: str) -> dict:\n    prompt = (\n        \"あなたは問い合わせを分類する担当者です。\\n\"\n        \"次の問い合わせを、必ず以下のいずれか1つに分類してください: \"\n        + \"、\".join(CATEGORIES) + \"。\\n\"\n        \"新しいカテゴリを作らないこと。判断に迷う場合は category を \\\"質問\\\" にすること。\\n\"\n        \"出力はJSONのみ。形式: {\\\"category\\\": \\\"...\\\", \\\"reason\\\": \\\"...\\\"}\\n\\n\"\n        \"問い合わせ: \" + text\n    )\n    response = client.messages.create(\n        model=\"claude-sonnet-4-5\",\n        max_tokens=200,\n        messages=[{\"role\": \"user\", \"content\": prompt}],\n    )\n    raw = response.content[0].text.strip()\n    data = json.loads(raw)  # JSON文字列をPythonの辞書に変換\n    return data\n\nresult = classify(\"届いた商品が壊れていました。交換してほしいです。\")\nprint(result[\"category\"])  # 例: クレーム",
          caption: "役割・制約・JSON固定の3点をプロンプトに書き、応答をjson.loadsで辞書に変換する"
        },
        { type: "heading", text: "検算: 想定外の答えをはじく" },
        { type: "paragraph", text: "JSONで返せと指示しても、AIが形式を外したり、指定外のカテゴリを返すことがゼロではありません。だからコード側で『本当に想定した形か』を確認します。これが分類ツールにおける検算です。" },
        {
          type: "code",
          language: "python",
          code: "def classify_safe(text: str) -> dict:\n    data = classify(text)\n    # 検算1: category が想定した3つのどれかか\n    if data.get(\"category\") not in CATEGORIES:\n        return {\"category\": \"要確認\", \"reason\": \"想定外のカテゴリが返された\"}\n    return data\n\n# 実務では json.loads が失敗する場合の try/except も足す",
          caption: "AIの答えをそのまま信じず、想定した選択肢に入っているか確かめてから使う"
        },
        {
          type: "compare",
          bad: {
            label: "検算なし",
            text: "AIの応答をそのまま後続処理へ。想定外の値やJSON崩れでプログラムが止まる、または誤ったまま進む。",
            language: "python",
            code: "category = classify(text)[\"category\"]\nsave_to_db(category)  # 変な値でもそのまま保存"
          },
          good: {
            label: "検算あり",
            text: "想定した選択肢か確認し、外れたら『要確認』に回す。誤りが下流に漏れない。",
            language: "python",
            code: "data = classify_safe(text)\nif data[\"category\"] == \"要確認\":\n    send_to_human(text)  # 人に回す\nelse:\n    save_to_db(data[\"category\"])"
          }
        },
        { type: "heading", text: "安全の基本: キーとハルシネーション" },
        {
          type: "list",
          ordered: false,
          items: [
            "APIキーは環境変数から読み、コードや公開リポジトリに絶対に置かない",
            "AIの答えは必ず『想定した形・値か』を検算してから使う",
            "判断に迷う入力は、AIに無理やり決めさせず『要確認』として人に回す道を用意する",
            "個人情報や機密を含む文章をそのまま送ってよいか、送信前に確認する"
          ]
        },
        {
          type: "callout",
          variant: "warn",
          title: "AIは『わからない』でも自信満々に答える",
          text: "AIは判断がつかないときでも、それらしいカテゴリを堂々と返すことがあります。だから『迷ったら質問にする』『想定外なら要確認に回す』という逃げ道をプロンプトとコードの両方に用意しておくと安全です。"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「この分類プロンプトに、役割・制約・出力形式(JSON固定)が揃っているかレビューして。抜けがあれば指摘して」と頼むと、プロンプト設計の質を上げられます。さらに『json.loadsが失敗したときのtry/exceptを足して』と頼めば、検算も堅くなります。"
        }
      ],
      questions: [
        {
          id: "pyday6-lesson4-q1",
          type: "choice",
          question: "分類ツールの出力形式をJSONで固定する主な理由はどれ?",
          choices: [
            "JSONにするとAPI料金が安くなるから",
            "機械が読める決まった形になり、応答をそのまま辞書に変換して次の処理に渡せるから",
            "JSONにするとAIが絶対に間違えなくなるから",
            "JSONは人間には読めないので、内容を隠せるから"
          ],
          answerIndex: 1,
          explanation: "プログラムがAIの応答を使うには、機械が読める決まった形が必要です。JSONで固定すればjson.loadsで辞書に変換でき、次の処理に渡せます。料金や正確さとは関係ありません。"
        },
        {
          id: "pyday6-lesson4-q2",
          type: "choice",
          question: "分類結果に対する「検算」として、コード側で行うべきことはどれ?",
          choices: [
            "AIが返したカテゴリは常に正しいので、そのまま保存する",
            "返ってきたcategoryが想定した選択肢のどれかを確認し、外れたら要確認に回す",
            "応答が長いほど正確なので、文字数だけをチェックする",
            "応答をそのまま人には見せず、機械だけで完結させる"
          ],
          answerIndex: 1,
          explanation: "JSON指定をしてもAIが形式や値を外すことはあります。categoryが想定した選択肢に入っているかを確認し、外れたら『要確認』として人に回すのが検算です。"
        },
        {
          id: "pyday6-lesson4-q3",
          type: "free",
          question: "プロンプト設計の「役割・制約・出力形式」の3本柱と、コード側の「検算」がなぜ両方必要なのかを説明してください。",
          modelAnswer: "役割・制約・出力形式を書くのは、AIが望む形で答えやすくするための入り口の工夫です。役割で立場を与え、制約で守るべきルールを示し、出力形式をJSONで固定することで結果が安定します。ただしAIは指示を外すことがゼロではないため、返ってきた値が本当に想定した形・選択肢かをコード側で検算し、外れたら人に回す逃げ道を用意します。プロンプトで確率を上げ、検算で最後の安全を担保する、という二段構えが必要です。",
          interviewPhrase: "実務ではこう説明する: 『プロンプトの役割・制約・JSON固定で出力を安定させ、それでも外れる前提でコード側の検算とフォールバックを用意します。入口の設計と出口の検証はどちらも欠かせません』",
          keywords: ["役割", "制約", "出力形式", "JSON", "検算"]
        }
      ]
    }
  ]
};
