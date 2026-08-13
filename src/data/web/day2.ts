import type { Day } from "@/types";

export const webDay2: Day = {
  day: 2,
  slug: "day2",
  title: "CSSの考え方 — 見た目を整える",
  goal: "セレクタ・ボックスモデル・Flexbox・レスポンシブの考え方を理解し、AI生成CSSの意図を読めるようになる。",
  lessons: [
    {
      id: "webday2-lesson1",
      slug: "css-basics",
      title: "CSSの基本 — どの要素を、どう見せるか",
      summary: "セレクタは宛名、プロパティは指示。CSSは「誰に」「何をする」を書く手紙だと考える。",
      blocks: [
        { type: "heading", text: "HTMLは骨組み、CSSは服" },
        { type: "paragraph", text: "前回、[[html]]は建物の骨組みだと話しました。骨組みだけの家は、柱や部屋の役割はあっても、壁の色も床の質感もありません。そこに色を塗り、家具を置き、見た目を整えるのが[[css]]です。同じ骨組みでも、CSS次第で真っ白なオフィスにも、あたたかい木の家にもなります。" },
        { type: "paragraph", text: "つまりHTMLは「何があるか」、CSSは「それをどう見せるか」を担当します。この二つが別々になっているおかげで、中身をいじらずに見た目だけを着せ替えできるのです。" },
        { type: "callout", variant: "info", title: "たとえるなら", text: "HTMLは人間の体、CSSはその人が着ている服とメイク。体(中身)はそのままに、服(見た目)だけ変えれば印象がガラッと変わります。" },
        { type: "heading", text: "CSSの一行は「宛名 + 指示」" },
        { type: "paragraph", text: "CSSの基本は、たった一つの形の繰り返しです。「誰に」「何を」「どうする」。これを手紙にたとえると、宛名を書いて、中身にお願いごとを書く、という形です。" },
        { type: "code", language: "css", code: "h1 {\n  color: red;\n  font-size: 32px;\n}", caption: "h1という宛名に、「文字色を赤に」「文字サイズを32pxに」と指示している" },
        { type: "paragraph", text: "この例で、最初の h1 が[[selector]](宛名)です。「どの[[element]]に話しかけるか」を決めます。波カッコの中の color や font-size がプロパティ(何を)、その右の red や 32px が値(どうする)です。プロパティと値はコロンで区切り、行の終わりはセミコロンで締めます。" },
        { type: "callout", variant: "why", title: "なぜセミコロンが要るの?", text: "指示を一行ずつ区切る「ここで一つの指示が終わり」という合図だからです。忘れると次の指示とくっついて、AIが書いたCSSでも見た目が崩れる原因になります。まず疑うポイントの一つです。" },
        { type: "heading", text: "宛名の書き方はいろいろ" },
        { type: "paragraph", text: "宛名(セレクタ)には種類があります。全員に配るか、名札のグループに配るか、たった一人に配るか、のイメージです。" },
        { type: "list", items: [
          "p { ... } … pタグ全部が宛先。「段落という種類の人、全員へ」",
          ".note { ... } … class=\"note\" を付けた要素が宛先。ドットで始まるのがクラス。「noteという名札の人へ」",
          "#header { ... } … id=\"header\" の要素が宛先。シャープで始まるのがID。「headerさん、あなた一人へ」"
        ] },
        { type: "callout", variant: "info", title: "AIにはこう頼む", text: "AIが .btn { ... } と書いていたら、「btnというクラス名の付いたボタン全部に効くスタイル」だと読めます。直したい時は「.btnの文字色を白にして」と、宛名(クラス名)を指定して頼むと正確に伝わります。" },
        { type: "paragraph", text: "AIが生成したCSSを読むとき、まず「この宛名は誰を指しているか」を探すクセをつけましょう。宛名さえ分かれば、どの見た目を変えている指示なのかがつかめます。" }
      ],
      questions: [
        {
          id: "webday2-lesson1-q1",
          type: "choice",
          question: "CSSの h1 { color: red; } で、h1 の部分は何と呼ばれますか?",
          choices: ["プロパティ(指示の名前)", "セレクタ(どの要素かの宛名)", "値(どうするかの中身)"],
          answerIndex: 1,
          explanation: "h1 は「どの要素に効かせるか」を決めるセレクタ(宛名)です。color がプロパティ、red が値にあたります。宛名・指示・中身の三つで一組だと覚えましょう。"
        },
        {
          id: "webday2-lesson1-q2",
          type: "choice",
          question: "class=\"note\" を付けた要素だけにスタイルを当てたいとき、正しいセレクタはどれ?",
          choices: [".note { ... }", "#note { ... }", "note { ... }"],
          answerIndex: 0,
          explanation: "クラスを指す宛名はドットで始めます。シャープ(#)はID用、何も付けないとタグ名を指します。名札(クラス)にはドット、と覚えると混乱しません。"
        },
        {
          id: "webday2-lesson1-q3",
          type: "free",
          question: "CSSの一行を「宛名」と「指示」という言葉を使って説明してください。",
          modelAnswer: "CSSの一行は、まず宛名(セレクタ)でどの要素に話しかけるかを決め、次に波カッコの中に「何をどうするか」という指示(プロパティと値)を書きます。手紙のように、宛名を書いてからお願いごとを書く形です。",
          interviewPhrase: "CSSは「誰に」「何をどうする」を書く手紙のようなものです",
          keywords: ["セレクタ", "宛名", "プロパティ", "値", "指示"]
        }
      ]
    },
    {
      id: "webday2-lesson2",
      slug: "box-model",
      title: "ボックスモデル — すべての要素は箱",
      summary: "画面上の要素はすべて四角い箱。margin/border/paddingで、箱の余白と枠を調整する。",
      blocks: [
        { type: "heading", text: "見えないけど、すべては箱でできている" },
        { type: "paragraph", text: "Webページを見ると、文字も画像もボタンもバラバラの形に見えます。でも裏側では、[[css]]はすべての[[element]]を「四角い箱」として扱っています。丸いボタンでさえ、実は四角い箱の角を丸めているだけです。この考え方を[[box-model]]と呼びます。" },
        { type: "callout", variant: "info", title: "たとえるなら", text: "引っ越しのダンボールを想像してください。中身(文字や画像)があり、そのまわりに緩衝材(内側の余白)、箱の壁(枠線)、そして箱と箱のあいだの隙間(外側の余白)があります。要素も同じ構造です。" },
        { type: "heading", text: "箱の四つの層" },
        { type: "paragraph", text: "一つの箱は、内側から外側へ向かって次の四つでできています。" },
        { type: "list", ordered: true, items: [
          "content(中身) … 文字や画像そのもの。ダンボールの中の荷物",
          "padding(内側の余白) … 中身と枠線のあいだの隙間。荷物を守る緩衝材",
          "border(枠線) … 箱の壁。太さ・色・線の種類を決められる",
          "margin(外側の余白) … 箱と、隣の箱とのあいだの隙間"
        ] },
        { type: "callout", variant: "why", title: "なぜpaddingとmarginを分けるの?", text: "paddingは「箱の内側を広げる(中身にゆとりを持たせる)」、marginは「箱の外側に隙間を作る(隣と離す)」で役割が違うからです。ボタンの中の文字が窮屈ならpadding、ボタン同士がくっついているならmargin、と切り分けて考えられます。" },
        { type: "code", language: "css", code: ".card {\n  padding: 16px;\n  border: 1px solid gray;\n  margin: 24px;\n}", caption: "中身のまわりに16pxのゆとり、灰色1pxの枠、外側に24pxの隙間を持つカード" },
        { type: "paragraph", text: "この border の書き方は「太さ・線の種類・色」を空白区切りで並べたものです。1px solid gray は「1pxの実線で灰色」という意味。AIが生成したCSSでよく出てくる形なので、順番の意味を知っておくと読めます。" },
        { type: "heading", text: "余白トラブルはまずボックスを疑う" },
        { type: "paragraph", text: "「なんか隙間が広すぎる」「ボタンが窮屈」といった見た目の不満は、たいてい padding か margin の数値が原因です。AI生成CSSを直すときも、まずこの二つを探すのが近道です。" },
        { type: "compare",
          bad: { label: "窮屈なボタン", language: "css", code: ".btn {\n  padding: 0;\n}", text: "内側の余白がゼロで、文字が枠にぴったりくっついて読みにくい" },
          good: { label: "ゆとりのあるボタン", language: "css", code: ".btn {\n  padding: 12px 20px;\n}", text: "上下12px・左右20pxのゆとりができ、押しやすく見える" }
        },
        { type: "callout", variant: "info", title: "AIにはこう頼む", text: "余白を直したいときは「このボタンの内側の余白(padding)をもう少し広げて」「カード同士の間隔(margin)を詰めて」と、paddingかmarginかを名指しで頼むと、AIが的確に直してくれます。" }
      ],
      questions: [
        {
          id: "webday2-lesson2-q1",
          type: "choice",
          question: "ボタンの「中の文字」が枠にくっついて窮屈です。広げるべきなのはどれ?",
          choices: ["margin(外側の余白)", "padding(内側の余白)", "border(枠線)"],
          answerIndex: 1,
          explanation: "中身と枠のあいだのゆとりはpadding(内側の余白)です。marginは箱の外側、隣の要素との隙間なので、内側の窮屈さは解決しません。"
        },
        {
          id: "webday2-lesson2-q2",
          type: "choice",
          question: "二つのカードがくっついて見えます。あいだに隙間を作るには?",
          choices: ["marginを足す", "paddingをゼロにする", "borderを消す"],
          answerIndex: 0,
          explanation: "箱と箱のあいだの隙間はmargin(外側の余白)で作ります。paddingは箱の内側なので、要素同士の間隔には効きません。"
        },
        {
          id: "webday2-lesson2-q3",
          type: "free",
          question: "ボックスモデルの padding と margin の違いを、たとえを使って説明してください。",
          modelAnswer: "すべての要素はダンボールのような箱で、paddingは箱の内側の緩衝材(中身と枠のあいだのゆとり)、marginは箱と隣の箱のあいだの隙間です。中身を広げたいならpadding、隣と離したいならmarginを使います。",
          interviewPhrase: "paddingは箱の内側のゆとり、marginは箱と箱のあいだの隙間です",
          keywords: ["ボックスモデル", "padding", "margin", "内側", "外側", "余白"]
        }
      ]
    },
    {
      id: "webday2-lesson3",
      slug: "flexbox-layout",
      title: "並べる — Flexboxの考え方",
      summary: "箱をきれいに横一列や縦に並べる仕組みがFlexbox。棚に物を並べるイメージで意図を読む。",
      blocks: [
        { type: "heading", text: "箱をどう並べるか、という問題" },
        { type: "paragraph", text: "前回、すべての要素は箱だと学びました。次の課題は「その箱たちをどう並べるか」です。何もしないと、多くの箱は上から下へ縦にひとつずつ積まれます。でも実際のサイトでは、メニューが横一列に並んだり、カードが横に3つ並んだりします。これを担当するのが[[flexbox]]です。" },
        { type: "callout", variant: "info", title: "たとえるなら", text: "Flexboxは「棚」です。棚(親の箱)に指示を出すと、中に入れた物(子の箱たち)を、横一列に並べたり、均等に間隔をあけたり、中央に寄せたりできます。並べ方を決めるのは、物ではなく棚のほうです。" },
        { type: "heading", text: "まず親に「棚になれ」と伝える" },
        { type: "paragraph", text: "Flexboxは、並べたい箱そのものではなく、それらを囲む親の箱に対して指示します。親に display: flex を書いた瞬間、その親は「棚」になり、中の子要素たちが横一列に並びます。" },
        { type: "code", language: "html", code: "<nav class=\"menu\">\n  <a href=\"/\">ホーム</a>\n  <a href=\"/about\">会社概要</a>\n  <a href=\"/contact\">お問い合わせ</a>\n</nav>", caption: "3つのリンクを持つメニュー。このままだと縦に並ぶ" },
        { type: "code", language: "css", code: ".menu {\n  display: flex;\n  gap: 16px;\n}", caption: "親のmenuを棚にすると、中のリンクが横一列になり、gapで間隔を16pxあける" },
        { type: "paragraph", text: "display: flex が「この親を棚にする」という合図です。gap は棚に並んだ物どうしの間隔。この2行を見つけたら、「あ、中身を横に並べているんだな」と読めます。" },
        { type: "heading", text: "並び方をそろえる二つの向き" },
        { type: "paragraph", text: "棚には「並ぶ方向」と「それに直交する方向」があります。よく出てくる二つのプロパティを、意味とセットで覚えましょう。" },
        { type: "list", items: [
          "justify-content … 並んでいる方向のそろえ方。横並びなら「左寄せ/中央/右寄せ/均等」など",
          "align-items … 並びと直交する方向のそろえ方。横並びなら「上寄せ/中央/下寄せ」など"
        ] },
        { type: "callout", variant: "why", title: "なぜ縦横で名前が違うの?", text: "Flexboxは並ぶ向き(主軸)を基準に考えるからです。justify-contentは主軸方向、align-itemsはそれと垂直方向のそろえ、と役割を分けることで、横並びでも縦並びでも同じ考え方が使えます。" },
        { type: "compare",
          bad: { label: "縦に積まれたまま", language: "css", code: ".menu {\n  /* display: flex がない */\n}", text: "指示がないので、リンクが縦にひとつずつ並んで間延びして見える" },
          good: { label: "横一列で中央ぞろえ", language: "css", code: ".menu {\n  display: flex;\n  justify-content: center;\n  gap: 16px;\n}", text: "棚にして横並びにし、全体を中央に寄せてメニューらしく整えた" }
        },
        { type: "callout", variant: "info", title: "AIにはこう頼む", text: "並びを直したいときは「このメニューを横並びにして、間隔を広げて」「カードを中央にそろえて」と、並べる向きと寄せ方を言葉で伝えます。AIはそれをdisplay: flexやjustify-contentに翻訳してくれます。" }
      ],
      questions: [
        {
          id: "webday2-lesson3-q1",
          type: "choice",
          question: "縦に並んでいるメニューを横一列にしたいとき、まず何を書きますか?",
          choices: ["子のリンクそれぞれに display: flex", "親の箱に display: flex", "各リンクに margin: 0"],
          answerIndex: 1,
          explanation: "Flexboxは並べたい箱ではなく、それらを囲む親に指示します。親に display: flex を書くと、その親が棚になり中身が横並びになります。"
        },
        {
          id: "webday2-lesson3-q2",
          type: "choice",
          question: "Flexboxで、並んだ子要素の「間隔」をあけるのに使うプロパティは?",
          choices: ["gap", "border", "color"],
          answerIndex: 0,
          explanation: "gapは棚に並んだ物どうしの間隔を決めます。borderは枠線、colorは文字色で、並べる間隔とは関係ありません。"
        },
        {
          id: "webday2-lesson3-q3",
          type: "free",
          question: "Flexboxとは何をする仕組みか、たとえを使って説明してください。",
          modelAnswer: "Flexboxは箱を並べる仕組みで、棚のようなものです。並べたい箱を囲む親にdisplay: flexと書くと親が棚になり、中の子要素が横一列に並びます。justify-contentやgapで寄せ方や間隔を調整できます。",
          interviewPhrase: "Flexboxは箱を横や縦にきれいに並べる棚のような仕組みです",
          keywords: ["Flexbox", "display: flex", "親", "並べる", "横一列", "gap"]
        }
      ]
    },
    {
      id: "webday2-lesson4",
      slug: "responsive-design",
      title: "レスポンシブ — 画面幅で変わるレイアウト",
      summary: "同じHTMLでもスマホとPCで見え方を変える。伸び縮みするレイアウトの考え方を学ぶ。",
      blocks: [
        { type: "heading", text: "同じページを、いろんな画面で見る時代" },
        { type: "paragraph", text: "あなたのサイトは、大きなPC画面でも、細長いスマホでも見られます。PCで横3列に並んでいたカードが、スマホでも横3列のままだと、一つひとつが小さすぎて読めません。画面の幅に合わせて見た目を変える考え方を[[responsive]](レスポンシブ)と呼びます。" },
        { type: "callout", variant: "info", title: "たとえるなら", text: "水は、入れる器に合わせて形を変えます。細いコップなら細長く、広い皿なら平たく。レスポンシブなレイアウトも同じで、画面という器に合わせて、中身が自然に形を変えます。" },
        { type: "heading", text: "まずは「伸び縮みする」土台" },
        { type: "paragraph", text: "レスポンシブの第一歩は、幅をピクセルでガチガチに固定しないことです。幅を 300px と決め打ちすると、狭い画面でははみ出します。代わりに % や、画面幅に応じた単位を使うと、器に合わせて伸び縮みします。" },
        { type: "compare",
          bad: { label: "固定幅ではみ出す", language: "css", code: ".card {\n  width: 600px;\n}", text: "画面が600pxより狭いスマホでは、横スクロールが出てはみ出す" },
          good: { label: "伸び縮みする", language: "css", code: ".card {\n  width: 100%;\n  max-width: 600px;\n}", text: "広い画面では最大600px、狭い画面では画面いっぱいに縮んで収まる" }
        },
        { type: "callout", variant: "why", title: "なぜ幅を固定しない方がいいの?", text: "画面の幅は人によってバラバラだからです。固定してしまうと、ある画面ではちょうどよくても、別の画面でははみ出したり隙間が空いたりします。%やmax-widthで「上限は決めるが、狭ければ縮む」としておくと、多くの画面に一つのコードで対応できます。" },
        { type: "heading", text: "幅で切り替える「メディアクエリ」" },
        { type: "paragraph", text: "伸び縮みだけでは足りない場面もあります。たとえば「PCでは横3列、スマホでは縦1列」のように、並び方そのものを変えたいときです。これには「画面幅がこれ以下なら、このスタイルを使う」という条件付きの指示、メディアクエリを使います。" },
        { type: "code", language: "css", code: ".cards {\n  display: flex;\n}\n@media (max-width: 600px) {\n  .cards {\n    flex-direction: column;\n  }\n}", caption: "普段は横並び。画面幅が600px以下のときだけ、縦並びに切り替える" },
        { type: "paragraph", text: "@media (max-width: 600px) が「画面幅が600px以下のとき」という条件です。その波カッコの中に書いたスタイルは、その条件を満たしたときだけ効きます。AI生成CSSでこの記号を見つけたら、「ここはスマホなど狭い画面向けの調整だな」と読めます。" },
        { type: "callout", variant: "info", title: "AIにはこう頼む", text: "スマホでの見え方を直したいときは「スマホ(画面が狭いとき)ではカードを縦1列にして」と頼みます。AIはこれを @media のメディアクエリに翻訳してくれます。逆にコードで @media を見たら、特定の画面幅向けの調整だと読み取りましょう。" },
        { type: "callout", variant: "warn", title: "確認を忘れずに", text: "AIが作ったページは、必ずPC幅とスマホ幅の両方で見た目を確認しましょう。片方だけ整っていて、もう片方が崩れていることはよくあります。ブラウザの画面を横に伸び縮みさせるだけでも、崩れに気づけます。" }
      ],
      questions: [
        {
          id: "webday2-lesson4-q1",
          type: "choice",
          question: "レスポンシブで、狭い画面でもはみ出しにくいのはどの書き方?",
          choices: ["width: 600px;", "width: 100%; max-width: 600px;", "width: 2000px;"],
          answerIndex: 1,
          explanation: "width: 100% で器に合わせて縮み、max-width: 600px で広がりすぎを防ぎます。ピクセル決め打ちの固定幅は、狭い画面ではみ出す原因になります。"
        },
        {
          id: "webday2-lesson4-q2",
          type: "choice",
          question: "CSSに @media (max-width: 600px) { ... } とありました。これは何を意味する?",
          choices: ["常にこのスタイルを適用する", "画面幅が600px以下のときだけこのスタイルを適用する", "文字を600pxにする"],
          answerIndex: 1,
          explanation: "@media は条件付きの指示(メディアクエリ)です。max-width: 600px は「画面幅が600px以下のとき」という条件で、狭い画面向けの調整によく使われます。"
        },
        {
          id: "webday2-lesson4-q3",
          type: "free",
          question: "レスポンシブデザインとは何か、たとえを使って説明してください。",
          modelAnswer: "レスポンシブデザインは、同じHTMLでも画面の幅に合わせて見た目を変える考え方です。水が器に合わせて形を変えるように、%やmax-widthで伸び縮みさせたり、メディアクエリで並び方を切り替えたりして、PCでもスマホでも見やすくします。",
          interviewPhrase: "レスポンシブは、画面という器に合わせて中身の形が変わる仕組みです",
          keywords: ["レスポンシブ", "画面幅", "メディアクエリ", "max-width", "伸び縮み"]
        }
      ]
    }
  ]
};
