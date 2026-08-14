import type { Day } from "@/types";

export const jsDay0: Day = {
  day: 0,
  slug: "day0",
  title: "JavaScriptってなに？ — Webページに命を吹き込む",
  goal: "Webページは「骨組み(HTML)・見た目(CSS)・動き(JavaScript)」の三層でできていることを理解し、JavaScriptが担う「動き」の役割、AI時代でも読む力を学ぶ意味、そしてJavaScriptがどこで動くのかを、やさしい言葉で説明できる。",
  lessons: [
    {
      id: "jsday0-lesson1",
      slug: "three-layers-js",
      title: "Webページの三層とJavaScriptの役割",
      summary: "HTML・CSS・JavaScriptを家にたとえて、JavaScriptが担う「動き」の層を実感する。",
      blocks: [
        { type: "heading", text: "Webページは三つの層でできている" },
        { type: "paragraph", text: "私たちが毎日見ているWebページは、じつは三つの役割が重なってできています。文章やボタンなどの「中身」を並べるHTML、それに色や配置といった「見た目」をつけるCSS、そしてクリックやスクロールに反応して「動き」を出すJavaScript。この三つが協力して一枚のページになっています。" },
        { type: "paragraph", text: "いきなり三つの名前が出てくると混乱しやすいので、身近な「家」にたとえてみましょう。" },
        { type: "list", items: [
          "HTML = 家の骨組み(柱や壁、部屋の配置)。どこに何があるかを決める",
          "CSS = 内装(壁紙や照明の色、家具の並べ方)。見た目を整える",
          "JavaScript = 電気や自動ドア(スイッチを押すと明かりがつく、人が近づくと扉が開く)。動きをつける"
        ] },
        { type: "paragraph", text: "骨組みだけの家(HTMLだけ)でも住むことはできますが、内装がなければ殺風景ですし、電気や自動ドアがなければ不便です。Webページも同じで、JavaScriptがあることで「押すと反応する」「近づくと変わる」といった便利さが生まれます。" },
        { type: "heading", text: "JavaScriptがあると何ができるのか" },
        { type: "paragraph", text: "「動き」と言われてもピンと来ないかもしれません。あなたが普段使っているWebサービスで、JavaScriptが働いている場面を挙げてみます。" },
        { type: "list", items: [
          "ボタンを押すと、隠れていたメニューや説明がふわっと表示される",
          "フォームに入力して「送信」を押すと、内容がサーバーに届く",
          "ページを開き直さなくても、新しいデータ(投稿やコメント)が読み込まれて画面に増える"
        ] },
        { type: "code", language: "html", code: "<button onclick=\"alert('こんにちは！')\">押してみて</button>", caption: "ボタンを押すとメッセージが出る、いちばん小さな「動き」の例" },
        { type: "callout", variant: "why", title: "なぜ層を分けて考えるのか", text: "中身(HTML)・見た目(CSS)・動き(JS)を分けておくと、直したい所だけを直せます。色を変えたいならCSS、押したときの反応を変えたいならJavaScript、と担当がはっきりします。AIにお願いするときも「これはどの層の話か」が言えると、的確な指示になります。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このWebページで、HTML・CSS・JavaScriptがそれぞれどの部分を担当しているか、初心者向けに色分けして説明して」と頼むと、三層の役割分担が一気に見えてきます。" }
      ],
      questions: [
        {
          id: "jsday0-lesson1-q1",
          type: "choice",
          question: "Webページの三層と、その役割の組み合わせとして正しいものはどれですか。",
          choices: [
            "HTML=見た目、CSS=動き、JavaScript=骨組み",
            "HTML=骨組み(中身)、CSS=見た目、JavaScript=動き",
            "HTML=動き、CSS=骨組み、JavaScript=見た目",
            "三つとも同じ役割で、どれを使っても結果は変わらない"
          ],
          answerIndex: 1,
          explanation: "HTMLが中身(骨組み)、CSSが見た目、JavaScriptが動きを担当します。家でいえば骨組み・内装・電気や自動ドアの関係です。役割が分かれているからこそ、直したい所だけを直せます。"
        },
        {
          id: "jsday0-lesson1-q2",
          type: "choice",
          question: "次のうち、主にJavaScriptが担当している「動き」はどれですか。",
          choices: [
            "見出しの文字の色を青くする",
            "段落と画像をページに並べて配置する",
            "ボタンを押したら隠れていたメニューを表示する",
            "文章の余白(マージン)を広げる"
          ],
          answerIndex: 2,
          explanation: "「押したら表示が変わる」といった反応はJavaScriptの担当です。文字色や余白の調整はCSS、段落や画像の配置はHTMLの役割です。何が変化のきっかけになっているかで見分けられます。"
        },
        {
          id: "jsday0-lesson1-q3",
          type: "free",
          question: "HTML・CSS・JavaScriptの役割を、家のたとえを使って一文ずつで説明してください。",
          modelAnswer: "HTMLは家の骨組みで、柱や部屋の配置のようにページの中身がどこにあるかを決めます。CSSは内装で、壁紙や照明の色のようにページの見た目を整えます。JavaScriptは電気や自動ドアで、スイッチを押すと明かりがつくようにページに動きや反応をつけます。この三つが重なって一枚のWebページになります。",
          interviewPhrase: "実務でこう説明する: ページは中身のHTML、見た目のCSS、動きのJavaScriptの三層で構成しています。関心を分離しておくことで、変更したい層だけを安全に触れるようにしています。",
          keywords: ["HTML", "CSS", "JavaScript", "骨組み", "動き"]
        }
      ]
    },
    {
      id: "jsday0-lesson2",
      slug: "why-learn-js-ai-era",
      title: "AIが書いてくれる時代に、なぜJavaScriptを学ぶのか",
      summary: "実装はAIに任せてよい。でも「読む・直す・説明する」力が、AIの出力を見極める土台になることを理解する。",
      blocks: [
        { type: "heading", text: "「もう自分で書かなくていいのでは？」への答え" },
        { type: "paragraph", text: "AIがコードをすらすら書いてくれる今、「わざわざJavaScriptを勉強する意味はあるの？」と思うのは自然なことです。答えを先に言うと、実装(コードを一から書く作業)はどんどんAIに任せていって構いません。ただし、AIが出したコードを「読める・直せる・説明できる」力は、これからむしろ大事になります。" },
        { type: "paragraph", text: "料理でたとえると、レシピを全部AIが書いてくれても、味見をして「ちょっと塩が足りない」と気づき、直せる人が必要です。コードも同じで、AIが出したものをそのまま出すのではなく、確かめて手を入れる人がいて初めて安心して使えます。" },
        { type: "heading", text: "AIは自信満々に間違えることがある" },
        { type: "paragraph", text: "AIはとても便利ですが、まちがったコードを、まるで正解のような口ぶりで出すことがあります。ここで読む力がないと、間違いに気づけないまま採用してしまいます。逆に、少しでも読めれば「ここ、本当に合ってる？」と立ち止まれます。" },
        { type: "list", items: [
          "読む力: AIが出したコードが、やりたいことと合っているかを確かめられる",
          "直す力: おかしい所を見つけて、AIに具体的に修正を頼める",
          "説明する力: なぜこう動くのかを、チームや自分の言葉で言える"
        ] },
        { type: "callout", variant: "why", title: "なぜ読む力が武器になるのか", text: "これからの開発は「一から書く」より「AIの出力を読んで、確かめて、直す」流れが中心になります。読める人はAIを道具として乗りこなせますが、読めない人はAIの出力を鵜呑みにするしかありません。読む力は、AIを疑える力でもあります。" },
        { type: "heading", text: "この教材のゴール" },
        { type: "paragraph", text: "だからこの教材では、あなたを「JavaScriptを全部そらで書ける人」にしようとはしません。目指すのは、AIが出したJavaScriptを読んで、意図どおりか判断でき、おかしければ直せて、人に説明できる状態です。書く力はそのあと自然についてきます。" },
        { type: "callout", variant: "warn", title: "丸暗記しなくていい", text: "細かい書き方(文法)を全部覚える必要はありません。忘れたらAIに聞けばよいのです。大事なのは、出てきたコードが何をしているかを大まかに読み取れることです。暗記ではなく理解を優先しましょう。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このJavaScriptのコードを、プログラミング初心者向けに一行ずつ日本語で説明して。もし危なそうな所があれば理由も教えて」と頼むと、読む力と、AIの出力を疑う目が同時に育ちます。" }
      ],
      questions: [
        {
          id: "jsday0-lesson2-q1",
          type: "choice",
          question: "AIがコードを書ける時代に、JavaScriptを学ぶ理由として最も適切なものはどれですか。",
          choices: [
            "自分で一から全部書けるようにならないと、AIは使えないから",
            "AIが出したコードを読んで確かめ、直し、説明できる力が必要だから",
            "JavaScriptを学ぶとAIの回答が必ず正解になるから",
            "これからはコードを読む必要が一切なくなるから"
          ],
          answerIndex: 1,
          explanation: "実装はAIに任せてよい一方で、その出力を読んで確かめ、直し、説明する力は重要になります。AIは自信満々に間違えることがあるため、読める人がAIを乗りこなせます。全部を暗記する必要はありません。"
        },
        {
          id: "jsday0-lesson2-q2",
          type: "free",
          question: "「実装はAIに任せてよいのに、なぜ読む力を学ぶのか」を、初心者にも伝わるように説明してください。",
          modelAnswer: "AIはコードを速く書いてくれますが、自信満々に間違えることもあります。読む力がないと、その間違いに気づけないまま使ってしまいます。読めれば、AIの出力がやりたいことと合っているか確かめられ、おかしい所を直すよう具体的に頼め、人にも説明できます。だから実装はAIに任せつつ、読む・直す・説明する力を自分の武器として持っておくのです。",
          interviewPhrase: "実務でこう説明する: 実装速度はAIに任せ、私はその出力をレビューして品質を担保する役割を担っています。読める・直せる・説明できることを重視し、AIの出力を鵜呑みにしないようにしています。",
          keywords: ["読む力", "AI", "確かめる", "直す", "説明できる"]
        }
      ]
    },
    {
      id: "jsday0-lesson3",
      slug: "where-js-runs",
      title: "JavaScriptはどこで動く？",
      summary: "JavaScriptはブラウザの中で動き、開発者ツールのConsoleで試せる。Node.jsを使えばサーバー側でも動く、という名前だけ知っておく。",
      blocks: [
        { type: "heading", text: "まずはブラウザの中で動く" },
        { type: "paragraph", text: "JavaScriptが最初に活躍する場所は、あなたがWebページを見ている「ブラウザ」の中です。Chrome、Safari、Edgeといったブラウザには、JavaScriptを動かすしくみが最初から入っています。だから特別なインストールなしで、ページを開けばもうJavaScriptは動いています。" },
        { type: "paragraph", text: "料理でいえば、ブラウザは「調理器具が全部そろったキッチン」のようなものです。あなたはレシピ(JavaScript)を渡すだけで、キッチン(ブラウザ)が実際に調理してくれます。" },
        { type: "heading", text: "開発者ツールのConsoleで気軽に試せる" },
        { type: "paragraph", text: "ブラウザには「開発者ツール」という、作る人向けの画面が隠れています。その中の「Console(コンソール)」を開くと、その場でJavaScriptを一行打って結果を見られます。環境構築は不要で、いま開いているページの上ですぐ試せます。" },
        { type: "code", language: "javascript", code: "console.log(\"はじめてのJavaScript\");\n1 + 2;", caption: "Consoleに打つと、メッセージの表示や計算の結果がすぐ返ってくる" },
        { type: "callout", variant: "info", title: "まずは眺めるだけでいい", text: "Consoleは「電卓 + メモ帳」のような気軽な場所です。今すぐ使いこなす必要はありません。こういう試し打ちの場所があるんだ、と知っておくだけで十分です。手を動かしたくなったら、開いているページで一行打ってみましょう。" },
        { type: "heading", text: "サーバー側でも動く — Node.jsという名前" },
        { type: "paragraph", text: "もともとブラウザ専用だったJavaScriptですが、今では「Node.js(ノード)」というしくみを使うと、サーバー(ユーザーからは見えない裏側のコンピューター)でも動かせます。つまりJavaScriptは、画面側と裏側の両方で使える言語になっています。" },
        { type: "paragraph", text: "とはいえ、今の段階でNode.jsを自分で入れて設定する必要はありません。「JavaScriptはブラウザだけでなくサーバーでも動く。その裏側で使うのがNode.js」という名前と役割を、ぼんやり知っておけば大丈夫です。" },
        { type: "callout", variant: "warn", title: "環境構築で止まらない", text: "初心者が最初に挫折しやすいのが環境構築です。ここは深追いせず、まずは読める状態を目指しましょう。試したくなったら、インストール不要のブラウザConsoleで十分です。Node.jsが必要になったら、そのときAIに手順を聞けば案内してくれます。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「ブラウザの開発者ツールのConsoleを開く方法を、私のブラウザ向けに初心者向けで教えて。開いたら試せる簡単なJavaScriptも一つ教えて」と頼めば、インストールなしで手を動かせます。" }
      ],
      questions: [
        {
          id: "jsday0-lesson3-q1",
          type: "choice",
          question: "JavaScriptが動く場所についての説明として、最も正しいものはどれですか。",
          choices: [
            "JavaScriptはサーバーでしか動かず、ブラウザでは動かない",
            "JavaScriptはブラウザの中で動き、Node.jsを使えばサーバー側でも動く",
            "JavaScriptを動かすには必ず特別なソフトを自分でインストールする必要がある",
            "JavaScriptは紙の上でしか動かない、理論だけの言語である"
          ],
          answerIndex: 1,
          explanation: "JavaScriptはブラウザに最初から入っているしくみで動き、さらにNode.jsを使えばサーバー側でも動きます。ブラウザで試すだけならインストールは不要で、開発者ツールのConsoleですぐ試せます。"
        },
        {
          id: "jsday0-lesson3-q2",
          type: "choice",
          question: "初心者がまずJavaScriptを気軽に試すのに向いている場所はどれですか。",
          choices: [
            "自分でサーバーを一から構築してから試す",
            "ブラウザの開発者ツールにあるConsole",
            "何もインストールせず、頭の中だけで想像する",
            "専用の有料ソフトを購入してから試す"
          ],
          answerIndex: 1,
          explanation: "ブラウザの開発者ツールにあるConsoleは、インストール不要でその場でJavaScriptを試せる気軽な場所です。まずはここで一行打ってみるのがおすすめで、環境構築で立ち止まる必要はありません。"
        },
        {
          id: "jsday0-lesson3-q3",
          type: "free",
          question: "JavaScriptがどこで動くのかを、ブラウザとNode.jsという言葉を使って説明してください。",
          modelAnswer: "JavaScriptはまずブラウザの中で動きます。ChromeやSafariなどのブラウザにはJavaScriptを動かすしくみが最初から入っているので、特別なインストールなしにWebページ上で動きます。さらにNode.jsというしくみを使うと、ユーザーからは見えない裏側のサーバーでもJavaScriptを動かせます。つまりJavaScriptは画面側と裏側の両方で使える言語です。",
          interviewPhrase: "実務でこう説明する: JavaScriptはブラウザで動くだけでなく、Node.jsを使えばサーバーサイドでも動きます。フロントとバックの両方を同じ言語で書けるのが強みだと捉えています。",
          keywords: ["ブラウザ", "Node.js", "サーバー", "Console", "動く"]
        }
      ]
    }
  ]
};
