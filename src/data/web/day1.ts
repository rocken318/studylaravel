import type { Day } from "@/types";

export const webDay1: Day = {
  day: 1,
  slug: "day1",
  title: "HTMLの構造 — 骨組みを読む",
  goal: "要素・タグ・属性・入れ子・セマンティックHTML・基本のフォームを読み書きでき、AIが作ったHTMLの構造を追えるようになる。",
  lessons: [
    {
      id: "webday1-lesson1",
      slug: "element-tag-attribute",
      title: "要素・タグ・属性 — ラベル付きの箱",
      summary: "HTMLの一番小さな部品「要素」を、開きタグ・中身・閉じタグ・属性に分けて読めるようになる。",
      blocks: [
        {
          type: "paragraph",
          text: "AIに「ホームページを作って」と頼むと、たくさんの[[html]]が返ってきます。最初は暗号のように見えますが、実はとても単純な部品のくり返しでできています。その一番小さな部品を[[element]](要素)と呼びます。まずはこの一個を読めるようになりましょう。"
        },
        {
          type: "callout",
          variant: "info",
          title: "たとえるなら",
          text: "HTMLの要素は「ラベルを貼った箱」です。箱の中に中身を入れて、外側に何が入っているかのラベルを貼る。ラベルを見れば、開けなくても中身の種類がわかる。HTMLもまったく同じ考え方です。"
        },
        {
          type: "code",
          language: "html",
          code: "<p>これは段落です</p>",
          caption: "一番シンプルな要素。これで1つの部品。"
        },
        {
          type: "paragraph",
          text: "上の1行を分解します。先頭の <p> が「ここから段落が始まるよ」という開きタグ、まん中の「これは段落です」が中身、最後の </p> が「段落おわり」という閉じタグです。閉じタグにはスラッシュ(/)が付くのが目印。この開きタグ＋中身＋閉じタグの3点セットで、1つの[[element]]になります。"
        },
        {
          type: "callout",
          variant: "info",
          title: "たとえるなら",
          text: "開きタグと閉じタグは「かっこ」のペアです。( で開いたら必ず ) で閉じるように、<p> で開いたら </p> で閉じる。片方を閉じ忘れると、文章がどこまで続くのか誰にもわからなくなります。"
        },
        {
          type: "paragraph",
          text: "次に[[attribute]](属性)です。属性は、タグに付ける「追加のメモ」です。開きタグの中に 名前=\"値\" の形で書きます。たとえばリンクなら「どこへ飛ぶか」を、画像なら「どのファイルを表示するか」を、この属性で指定します。"
        },
        {
          type: "code",
          language: "html",
          code: "<a href=\"/company\">会社概要</a>",
          caption: "a要素に href という属性で「飛び先」を書いている。"
        },
        {
          type: "callout",
          variant: "info",
          title: "たとえるなら",
          text: "属性は宅配便の「送り状」です。箱(タグ)そのものは同じでも、送り状に書く宛先(値)によって届け先が変わる。href=\"/company\" は「会社概要ページ宛」と書いた送り状だと思ってください。"
        },
        {
          type: "compare",
          bad: {
            label: "壊れやすい書き方",
            language: "html",
            code: "<a href=/company>会社概要</a>",
            text: "属性の値をダブルクォートで囲っていない。今は動いても、値に空白や記号が入ると崩れる。"
          },
          good: {
            label: "安全な書き方",
            language: "html",
            code: "<a href=\"/company\">会社概要</a>",
            text: "値を \" で囲む。AIもふつうこう書く。読むときは 名前=\"値\" のかたまりを探すと属性が見つけやすい。"
          }
        },
        {
          type: "callout",
          variant: "warn",
          title: "img など「中身のない要素」もある",
          text: "画像の <img> や改行の <br> は中身を持たないので、閉じタグがありません。「中身がない箱＝閉じタグなし」と覚えると混乱しません。すべての要素に </...> があるわけではない、と知っておけば十分です。"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう頼む",
          text: "AI生成のHTMLで意味がわからないタグに出会ったら、そのまま貼り付けて「この <◯◯> は何の要素で、この属性は何を指定していますか。初心者向けに一言で説明して」と聞けば、確実に読み解けます。"
        }
      ],
      questions: [
        {
          id: "webday1-lesson1-q1",
          type: "choice",
          question: "<a href=\"/company\">会社概要</a> の href=\"/company\" の部分は何と呼ばれますか。",
          choices: ["閉じタグ", "属性", "中身のテキスト", "コメント"],
          answerIndex: 1,
          explanation: "タグに付ける追加のメモ 名前=\"値\" は属性(attribute)です。ここでは a要素に「飛び先は /company だよ」と指定しています。"
        },
        {
          id: "webday1-lesson1-q2",
          type: "choice",
          question: "閉じタグの見分け方として正しいものはどれですか。",
          choices: ["名前が大文字になっている", "スラッシュ(/)が付いている", "属性が2つ以上ある", "中身が空になっている"],
          answerIndex: 1,
          explanation: "</p> のように名前の前にスラッシュが付くのが閉じタグの目印です。<p> が開き、</p> が閉じ、というペアで1つの要素になります。"
        },
        {
          id: "webday1-lesson1-q3",
          type: "free",
          question: "「要素・タグ・属性」の関係を、たとえを使って自分の言葉で説明してください。",
          modelAnswer: "要素は1つの部品で、ラベル付きの箱のようなもの。開きタグと閉じタグで箱の始まりと終わりを示し、その間に中身を入れる。属性は箱に貼る送り状のような追加メモで、名前=値の形で飛び先や画像ファイルなどの細かい指定を書く。",
          interviewPhrase: "要素はラベル付きの箱、タグはその開け閉め、属性は箱に貼る送り状です",
          keywords: ["要素", "開きタグ", "閉じタグ", "属性", "中身"]
        }
      ]
    },
    {
      id: "webday1-lesson2",
      slug: "nesting-parent-child",
      title: "入れ子(ネスト)と親子関係 — マトリョーシカの構造",
      summary: "要素の中に要素が入る「入れ子」を理解し、AI生成HTMLの深い階層を親子関係として読み解く。",
      blocks: [
        {
          type: "paragraph",
          text: "レッスン1で1つの箱(要素)を読めるようになりました。実際のページは、その箱の中にさらに箱を入れて作ります。これを入れ子(ネスト)と呼びます。AIが作るHTMLが長くて怖く見えるのは、たいていこの入れ子が深いだけです。仕組みがわかれば、長さは怖くありません。"
        },
        {
          type: "callout",
          variant: "info",
          title: "たとえるなら",
          text: "入れ子はマトリョーシカ人形です。大きな人形を開けると中に人形、それを開けるとまた中に人形。HTMLも、大きな箱を開けると中に小さな箱が並んでいる。どの箱がどの箱の中にあるか、を追うのが読解のコツです。"
        },
        {
          type: "code",
          language: "html",
          code: "<ul>\n  <li>りんご</li>\n  <li>みかん</li>\n</ul>",
          caption: "ul(リスト全体)という箱の中に、li(項目)という箱が2つ入っている。"
        },
        {
          type: "paragraph",
          text: "上では ul が外側の箱、li が内側の箱です。外側を親、内側を子と呼びます。ul は li の親、li は ul の子。さらに li が2つ並んでいるので、この2つはたがいに兄弟です。親・子・兄弟という言い方は、AIとの会話でもよく出てくるので覚えておくと便利です。"
        },
        {
          type: "callout",
          variant: "info",
          title: "たとえるなら",
          text: "入れ子はパソコンのフォルダ構造そのものです。フォルダの中にフォルダ、その中にファイル。HTMLも同じで、外側の要素というフォルダの中に、内側の要素というファイルやフォルダが入っています。"
        },
        {
          type: "callout",
          variant: "info",
          title: "インデント(字下げ)は地図",
          text: "AIが書くHTMLは、子要素を右にずらして(インデントして)書きます。これは飾りではなく地図です。同じ量だけ右にある要素どうしは兄弟、より右にあれば子。行の左端のずれを見るだけで、開かずに親子関係がわかります。"
        },
        {
          type: "compare",
          bad: {
            label: "入れ子が交差してNG",
            language: "html",
            code: "<b><i>強調</b></i>",
            text: "b の中で始めた i を、b より先に閉じている。かっこが (　[　)　] のように交差した状態で、ブラウザが混乱する。"
          },
          good: {
            label: "内側から順に閉じる",
            language: "html",
            code: "<b><i>強調</i></b>",
            text: "後に開いた i を先に閉じ、先に開いた b を後に閉じる。マトリョーシカと同じで、内側から順に閉じるのが鉄則。"
          }
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ入れ子の順番が大事なのか",
          text: "ブラウザは「開いた順の逆で閉じる」という前提でHTMLを組み立てます。順番が交差すると、どの箱がどこで終わるのか判断できず、見た目が崩れたり[[css]]が効かなくなったりします。閉じる順番は、開いた順番の逆。これだけ守れば入れ子は崩れません。"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう頼む",
          text: "階層が深くて迷子になったら「このHTMLの入れ子構造を、親子がわかるように箇条書きのツリーで書き出して」と頼むと、地図を作ってもらえます。まず全体の骨組みを見てから細部を読むと理解が早いです。"
        }
      ],
      questions: [
        {
          id: "webday1-lesson2-q1",
          type: "choice",
          question: "<ul><li>りんご</li></ul> において、li から見た ul はどういう関係ですか。",
          choices: ["子", "親", "兄弟", "無関係"],
          answerIndex: 1,
          explanation: "外側の箱が親、内側の箱が子です。ul の中に li が入っているので、ul は li の親、li は ul の子になります。"
        },
        {
          id: "webday1-lesson2-q2",
          type: "choice",
          question: "<b><i>強調</i></b> のように入れ子を正しく閉じるルールはどれですか。",
          choices: ["開いた順と同じ順で閉じる", "後に開いたものから先に閉じる", "どんな順で閉じてもよい", "閉じタグは省略してよい"],
          answerIndex: 1,
          explanation: "マトリョーシカと同じで、内側(後に開いたもの)から先に閉じます。開いた順の逆で閉じると入れ子が崩れません。"
        },
        {
          id: "webday1-lesson2-q3",
          type: "free",
          question: "入れ子(ネスト)と親子関係とは何か、たとえを使って説明してください。",
          modelAnswer: "入れ子は要素の中に要素を入れることで、マトリョーシカ人形やフォルダの中のフォルダのような構造。外側の要素が親、内側が子、同じ階層に並ぶ要素どうしが兄弟。インデントの左端のずれを見ると親子関係が読み取れ、閉じるときは内側から順に、開いた順の逆で閉じる。",
          interviewPhrase: "入れ子は箱の中に箱を入れることで、外が親、中が子という関係です",
          keywords: ["入れ子", "親", "子", "兄弟", "インデント"]
        }
      ]
    },
    {
      id: "webday1-lesson3",
      slug: "semantic-html",
      title: "セマンティックHTML — 意味で名付けるタグ",
      summary: "header や main など「意味を持つタグ」を知り、AI生成HTMLの各ブロックが何の役割かを名前から読み取る。",
      blocks: [
        {
          type: "paragraph",
          text: "ページは大きく「ヘッダー」「本文」「サイドの情報」「フッター」などのかたまりに分かれます。これらのかたまりを、意味の伝わる名前のタグで囲むのが[[semantic-html]](セマンティックHTML)です。セマンティックとは「意味のある」という意味。中身が同じでも、役割がわかる名前を付けよう、という考え方です。"
        },
        {
          type: "callout",
          variant: "info",
          title: "たとえるなら",
          text: "引っ越しのダンボールに例えます。全部の箱に「もの」とだけ書いてあったら、開けるまで中身がわかりません。でも「食器」「本」「冬服」と書いてあれば一目瞭然。セマンティックHTMLは、箱にちゃんと役割名を書くことです。"
        },
        {
          type: "list",
          items: [
            "header … ページ上部の見出しやロゴ、ナビゲーションを置く場所",
            "nav … メニューやリンク集などの案内(ナビゲーション)",
            "main … そのページの主役となる本文。1ページに1つ",
            "section … 意味のあるひとまとまりの区切り",
            "article … それ単体で成り立つ記事やカード",
            "footer … ページ下部の著作権表示や連絡先など"
          ]
        },
        {
          type: "code",
          language: "html",
          code: "<header>ロゴとメニュー</header>\n<main>\n  <section>サービス紹介</section>\n  <section>お客様の声</section>\n</main>\n<footer>会社情報</footer>",
          caption: "役割名のタグで囲むと、読むだけでページの地図が浮かぶ。"
        },
        {
          type: "paragraph",
          text: "上のHTMLは、中身のテキストを読まなくても「上にヘッダー、まん中に本文が2セクション、下にフッター」という構成が名前だけでわかります。これがセマンティックHTMLの威力です。AIが作ったページも、まずこの役割タグだけを拾い読みすれば、全体の間取り図がつかめます。"
        },
        {
          type: "compare",
          bad: {
            label: "意味のない div だらけ",
            language: "html",
            code: "<div>\n  <div>ロゴ</div>\n  <div>本文</div>\n</div>",
            text: "div は「ただの箱」で役割名がない。どれがヘッダーで本文か、中を読まないとわからない。"
          },
          good: {
            label: "役割名で囲む",
            language: "html",
            code: "<div>\n  <header>ロゴ</header>\n  <main>本文</main>\n</div>",
            text: "同じ見た目でも、名前で役割が伝わる。人にもAIにも検索エンジンにも読みやすい。"
          }
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ div ではなくセマンティックタグを使うのか",
          text: "div は見た目こそ同じでも、役割の情報がゼロです。役割名のタグを使うと、画面読み上げソフトが「ここはナビ」「ここが本文」と利用者に伝えられ、[[accessibility]](使いやすさ)が上がります。検索エンジンもページ構造を理解しやすくなります。意味は飾りではなく機能です。"
        },
        {
          type: "callout",
          variant: "warn",
          title: "div がすべて悪いわけではない",
          text: "ぴったりの役割タグがないとき、見た目のグループ分けのために div を使うのは正常です。悪いのは「役割タグがあるのに全部 div にする」こと。AIも状況に応じて両方を使います。div を見ても慌てないでください。"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう頼む",
          text: "全部 div のHTMLを渡されたら「意味が伝わるように、適切な箇所を header / main / section / footer などのセマンティックタグに置き換えて」と頼めます。見た目を変えずに構造だけ整えてもらえます。"
        }
      ],
      questions: [
        {
          id: "webday1-lesson3-q1",
          type: "choice",
          question: "そのページの主役となる本文を囲むのに最も適したタグはどれですか。",
          choices: ["footer", "main", "nav", "header"],
          answerIndex: 1,
          explanation: "main はそのページの主役の本文を表し、原則1ページに1つ置きます。header は上部、nav は案内、footer は下部の情報です。"
        },
        {
          id: "webday1-lesson3-q2",
          type: "choice",
          question: "セマンティックHTMLを使う利点として正しくないものはどれですか。",
          choices: ["役割が名前で伝わり読みやすい", "画面読み上げソフトが構造を伝えやすい", "見た目が自動でおしゃれになる", "検索エンジンが構造を理解しやすい"],
          answerIndex: 2,
          explanation: "セマンティックタグは見た目を自動で美しくするものではありません。見た目は[[css]]の担当です。効果は役割の伝わりやすさ、使いやすさ、検索エンジンへの伝わりやすさです。"
        },
        {
          id: "webday1-lesson3-q3",
          type: "free",
          question: "セマンティックHTMLとは何か、なぜ div ばかりより良いのかを説明してください。",
          modelAnswer: "セマンティックHTMLは、header や main のように役割の意味が伝わる名前のタグでページのかたまりを囲む書き方。div はただの箱で役割の情報がないが、役割名のタグを使うと人にも読み上げソフトにも検索エンジンにも構造が伝わりやすくなる。引っ越しの箱に中身の名前を書くのと同じで、開けなくても役割がわかる。",
          interviewPhrase: "セマンティックHTMLは箱に役割名を書いておく書き方です",
          keywords: ["セマンティック", "意味", "header", "main", "div"]
        }
      ]
    },
    {
      id: "webday1-lesson4",
      slug: "links-images-lists-forms",
      title: "リンク・画像・リスト・フォーム — 部品の基本",
      summary: "a・img・ul/ol・form といった定番部品を読み書きし、入力欄を「受付用紙」としてイメージできるようになる。",
      blocks: [
        {
          type: "paragraph",
          text: "ここまでで構造の読み方がわかりました。最後に、どのページにも必ず出てくる定番部品を4つ押さえます。リンク、画像、リスト、フォームです。この4つを読めれば、AIが作るページの中身の8割は追えるようになります。"
        },
        {
          type: "paragraph",
          text: "まずリンクは a要素です。href 属性に飛び先を書きます。「押すと別のページへ移動する文字や画像」はほぼ a だと思ってよいです。"
        },
        {
          type: "code",
          language: "html",
          code: "<a href=\"/contact\">お問い合わせはこちら</a>",
          caption: "a要素。href が飛び先、中身が画面に表示される文字。"
        },
        {
          type: "paragraph",
          text: "次に画像は img要素です。中身を持たないので閉じタグはありません。src 属性で「どの画像ファイルか」を、alt 属性で「画像が表示できないときの代わりの文章」を指定します。"
        },
        {
          type: "code",
          language: "html",
          code: "<img src=\"/logo.png\" alt=\"当社ロゴ\">",
          caption: "src が画像の場所、alt が代わりの説明。"
        },
        {
          type: "callout",
          variant: "why",
          title: "alt を省略しない理由",
          text: "alt は、通信が遅くて画像が出ないときや、目の不自由な人が読み上げソフトを使うときに、その画像が何かを伝える文章です。省略すると情報が消えてしまいます。alt は[[accessibility]]を支える大事な属性なので、AI生成コードでも空になっていないか確認しましょう。"
        },
        {
          type: "paragraph",
          text: "リストは項目の箇条書きです。順番が関係ない箇条書きは ul、順番に意味がある番号付きは ol を使い、どちらも中の各項目を li で囲みます。レッスン2の入れ子の代表例です。"
        },
        {
          type: "code",
          language: "html",
          code: "<ol>\n  <li>会員登録する</li>\n  <li>商品を選ぶ</li>\n  <li>支払う</li>\n</ol>",
          caption: "ol は番号付きリスト。手順のように順番が大事なときに使う。"
        },
        {
          type: "paragraph",
          text: "最後がフォームです。名前や問い合わせ内容を入力してもらう部分で、全体を form で囲み、中に input(1行入力)や textarea(複数行入力)、button(送信ボタン)を置きます。label は入力欄の見出しで、for 属性で対応する入力欄と結びつけます。"
        },
        {
          type: "callout",
          variant: "info",
          title: "たとえるなら",
          text: "フォームは病院の受付用紙です。form が用紙全体、label が各項目の見出し(お名前・ご住所)、input がその横の記入欄、button が受付に提出するボタン。この対応で見ると、フォームのHTMLは一気に読みやすくなります。"
        },
        {
          type: "code",
          language: "html",
          code: "<form>\n  <label for=\"name\">お名前</label>\n  <input id=\"name\" type=\"text\">\n  <button type=\"submit\">送信</button>\n</form>",
          caption: "label の for と input の id を同じ値でそろえると、見出しと記入欄がペアになる。"
        },
        {
          type: "callout",
          variant: "warn",
          title: "input の type を読み分ける",
          text: "input は type 属性で役割が変わります。type=\"text\" は普通の文字、type=\"email\" はメール向き、type=\"password\" は伏せ字。AI生成フォームを読むときは、まず各 input の type を確認すると、その欄が何を入れる場所かがすぐわかります。"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう頼む",
          text: "フォームを直したいときは「お名前・メール・お問い合わせ内容の3項目があるお問い合わせフォームを、label と input を for と id でペアにして作って」のように、項目と結びつけ方まで具体的に頼むと、読みやすく正しいコードが返ってきます。"
        }
      ],
      questions: [
        {
          id: "webday1-lesson4-q1",
          type: "choice",
          question: "img要素で「画像が表示できないときの代わりの文章」を指定する属性はどれですか。",
          choices: ["src", "href", "alt", "for"],
          answerIndex: 2,
          explanation: "alt が代わりの説明文です。src は画像ファイルの場所、href はリンクの飛び先、for は label と入力欄を結びつける属性です。"
        },
        {
          id: "webday1-lesson4-q2",
          type: "choice",
          question: "手順のように順番に意味がある箇条書きに最も適したタグはどれですか。",
          choices: ["ul", "ol", "form", "nav"],
          answerIndex: 1,
          explanation: "順番に意味があるときは番号付きの ol を使います。順不同なら ul。どちらも各項目は li で囲みます。"
        },
        {
          id: "webday1-lesson4-q3",
          type: "free",
          question: "フォーム(form / label / input / button)の役割を、受付用紙のたとえで説明してください。",
          modelAnswer: "フォームは病院の受付用紙のようなもの。form が用紙全体を囲み、label がお名前やご住所といった各項目の見出し、input がその横の記入欄、button が用紙を提出する送信ボタン。label の for と input の id を同じ値にすると見出しと記入欄がペアになり、input の type でその欄に何を入れるかが決まる。",
          interviewPhrase: "フォームは受付用紙で、labelが見出し、inputが記入欄、buttonが提出ボタンです",
          keywords: ["form", "label", "input", "button", "type"]
        }
      ]
    }
  ]
};
