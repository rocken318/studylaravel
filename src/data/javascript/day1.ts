import type { Day } from "@/types";

export const jsDay1: Day = {
  day: 1,
  slug: "day1",
  title: "変数と値 — データを入れる箱",
  goal: "変数(const/let、なぜまずconstか)と、基本の値の種類(文字列・数値・真偽値)、文字列の連結とテンプレートリテラル、基本の演算子を、読んで直して説明できる。",
  lessons: [
    {
      id: "jsday1-lesson1",
      slug: "variables-const-let",
      title: "変数とは — ラベルを貼った箱",
      summary: "変数は値に名前をつける箱。const と let の違いと、まず const から使う理由を知る。",
      blocks: [
        { type: "heading", text: "変数は「値に名前をつける箱」" },
        { type: "paragraph", text: "プログラムでは、数字や文字などの値(あたい)をあちこちで使い回します。そのたびに書き直すのは大変なので、値に名前をつけておく仕組みが変数(へんすう)です。イメージは、中身を入れてラベルを貼った箱です。「namae」というラベルの箱に「太郎」を入れておけば、あとは箱の名前を呼ぶだけで中身を取り出せます。" },
        { type: "code", language: "javascript", code: "const name = \"太郎\";\nconsole.log(name);", caption: "name という箱に「太郎」を入れ、あとで name と書くだけで取り出せる" },
        { type: "heading", text: "const と let の違い" },
        { type: "paragraph", text: "変数を作る書き方には主に const(コンスト)と let(レット)があります。const は「あとで中身を入れ替えない箱」、let は「あとで中身を入れ替える箱」です。ラベルはそのままに、箱の中身を差し替えたいときが let、中身を固定しておきたいときが const です。" },
        { type: "code", language: "javascript", code: "const tax = 0.1;   // あとで変えない値は const\nlet count = 0;      // あとで変える値は let\ncount = count + 1;  // let は入れ替えOK\nconsole.log(count); // 1", caption: "count は let なので入れ替えられる。tax は const で固定" },
        { type: "callout", variant: "warn", title: "const の箱は入れ替えられない", text: "const で作った箱に、あとから別の値を入れ直そうとするとエラーになります。たとえば const tax = 0.1; のあとに tax = 0.2; と書くと「定数には代入できない」と怒られます。入れ替えたい値だと分かっているなら、最初から let にしておきましょう。" },
        { type: "heading", text: "まず const、必要なときだけ let" },
        { type: "paragraph", text: "迷ったら、まず const を使います。理由は「うっかり中身が書き換わる事故」を防げるからです。const にしておけば、どこかで勝手に値が変わることがなく、コードを読む人も「この値は変わらない」と安心できます。そして、どうしても入れ替えが必要な場面(カウントを増やす、状態を切り替えるなど)でだけ let に変えます。" },
        { type: "callout", variant: "why", title: "なぜ const から始めるのか", text: "変わらないと分かっている箱に「変わらない」という印(const)をつけておくと、あとで読む人(未来の自分やAI)が値の追跡をしなくて済みます。let が並ぶコードは「どこかで値が変わるかも」と身構えて読む必要があり、疲れます。まず const にすることで、注意すべき let を目立たせられます。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このコードの let を、入れ替えが不要なものは const に直して。なぜ const にできるのか一つずつ理由を教えて」と頼むと、const 優先の感覚が早く身につきます。" }
      ],
      questions: [
        {
          id: "jsday1-lesson1-q1",
          type: "choice",
          question: "const と let の使い分けとして、最も適切なものはどれですか。",
          choices: [
            "const は数値専用、let は文字専用に使い分ける",
            "あとで中身を入れ替えない値は const、入れ替える値は let を使う",
            "const と let に違いはなく、どちらでもまったく同じ",
            "let のほうが速いので、常に let を使うべき"
          ],
          answerIndex: 1,
          explanation: "const は入れ替えない値、let は入れ替える値に使います。型で分けるものでも、速さで選ぶものでもありません。まず const にし、入れ替えが必要なときだけ let にするのが基本です。"
        },
        {
          id: "jsday1-lesson1-q2",
          type: "choice",
          question: "次のコードを実行するとどうなりますか。const tax = 0.1; tax = 0.2;",
          choices: [
            "tax が 0.2 に書き換わる",
            "const には入れ替えできないのでエラーになる",
            "tax が 0.1 と 0.2 の両方を持つ",
            "何も起きず、tax は 0.1 のまま無視される"
          ],
          answerIndex: 1,
          explanation: "const で作った箱には別の値を入れ直せません。入れ替えようとするとエラーになります。あとで変えたい値なら、最初から let で宣言する必要があります。"
        },
        {
          id: "jsday1-lesson1-q3",
          type: "free",
          question: "「変数とは何か」と「なぜまず const を使うのか」を、初心者にも伝わるように説明してください。",
          modelAnswer: "変数は値に名前をつけて後で使い回すための箱です。ラベルを貼った箱に値を入れておき、名前を呼ぶだけで中身を取り出せます。まず const を使うのは、うっかり中身が書き換わる事故を防げるからです。const は入れ替えない印なので、読む人が値の変化を追わなくてよくなり、入れ替えが本当に必要な let だけを目立たせられます。",
          interviewPhrase: "実務でこう説明する: 変数はまず const で宣言し、再代入が必要な箇所だけ let にしています。こうすると意図しない書き換えを防げて、可変な箇所がレビューで一目で分かります。",
          keywords: ["変数", "名前", "const", "let", "入れ替え"]
        }
      ]
    },
    {
      id: "jsday1-lesson2",
      slug: "value-types",
      title: "値の種類 — 文字列・数値・真偽値",
      summary: "基本の値の種類を知り、数値と文字列を混同する事故の例を体感する。",
      blocks: [
        { type: "heading", text: "よく使う3つの値の種類" },
        { type: "paragraph", text: "箱に入れる中身、つまり値には種類があります。まずは基本の3つを押さえれば十分です。文字列(もじれつ)、数値(すうち)、真偽値(しんぎち)です。この種類のことを型(かた)とも呼びます。" },
        { type: "list", items: [
          "文字列(string): 文字のこと。ダブルクオート \" \" で囲む。例: \"太郎\"、\"こんにちは\"",
          "数値(number): 数のこと。囲まない。例: 123、0.1、-5",
          "真偽値(boolean): 正しいか正しくないか。true(真)か false(偽)の2つだけ"
        ] },
        { type: "code", language: "javascript", code: "const name = \"太郎\";   // 文字列\nconst age = 20;        // 数値\nconst isMember = true; // 真偽値", caption: "文字はクオートで囲む、数はそのまま、真偽は true / false" },
        { type: "callout", variant: "info", title: "typeof で種類を確かめられる", text: "値がどの種類かを知りたいときは typeof を使います。typeof \"太郎\" は \"string\"、typeof 20 は \"number\"、typeof true は \"boolean\" を返します。今は「種類を調べる道具がある」とだけ知っておけば十分です。" },
        { type: "heading", text: "数値と文字列を混同する事故" },
        { type: "paragraph", text: "初心者がよくやる事故が、数値のつもりで文字列を使ってしまうことです。見た目は同じ「3」でも、3(数値)と \"3\"(文字列、クオート付き)はまったくの別物です。とくに足し算のように見える + を使うと、結果が変わってしまいます。" },
        { type: "compare", bad: { label: "文字列の \"3\" を足すと連結される", language: "javascript", code: "const a = \"3\";\nconst result = a + 5;\nconsole.log(result); // \"35\"(文字列としてくっつく)" }, good: { label: "数値の 3 なら計算される", language: "javascript", code: "const a = 3;\nconst result = a + 5;\nconsole.log(result); // 8(数値として足される)" } },
        { type: "callout", variant: "warn", title: "\"35\" になったら型を疑う", text: "計算したはずなのに数字がくっついて \"35\" のようになったら、値が文字列になっている可能性が高いです。フォームから受け取った入力は文字列になりがちなので、計算する前に数値へ変換(例: Number(a))が要る、と覚えておきましょう。" },
        { type: "paragraph", text: "つまり、同じ + でも「両側が数値なら足し算」「どちらかが文字列なら連結」になります。値の種類を意識するだけで、この手の事故はぐっと減ります。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「この計算結果が思った数字にならない。値の型が原因かどうか調べて、どこで文字列が混ざっているか教えて」と頼むと、型の混同を早く見つけられます。" }
      ],
      questions: [
        {
          id: "jsday1-lesson2-q1",
          type: "choice",
          question: "console.log(\"3\" + 5) の実行結果はどれですか。",
          choices: [
            "8",
            "\"35\"",
            "エラーになる",
            "\"8\""
          ],
          answerIndex: 1,
          explanation: "\"3\" は文字列なので、+ は足し算ではなく連結になり、\"35\" になります。両側が数値の 3 + 5 なら 8 です。同じ + でも、文字列が混ざると連結に変わります。"
        },
        {
          id: "jsday1-lesson2-q2",
          type: "choice",
          question: "値の種類(型)の説明として、正しくないものはどれですか。",
          choices: [
            "\"太郎\" のようにクオートで囲まれた値は文字列",
            "123 や 0.1 のような数は数値",
            "true と false は真偽値",
            "3 と \"3\" は同じ値なので、どちらで書いても結果は変わらない"
          ],
          answerIndex: 3,
          explanation: "3(数値)と \"3\"(文字列)は別物で、+ を使うと結果が変わります。文字列はクオートで囲む、数値は囲まない、真偽値は true / false という区別は正しい説明です。"
        },
        {
          id: "jsday1-lesson2-q3",
          type: "free",
          question: "3 + 5 と \"3\" + 5 で結果が変わる理由を説明してください。",
          modelAnswer: "3 + 5 は両側が数値なので、+ は足し算として働き 8 になります。一方 \"3\" + 5 は左側がクオート付きの文字列なので、+ は連結として働き、5 も文字列として扱われて \"35\" になります。同じ + でも、値の種類が数値か文字列かで意味が変わるためです。フォーム入力などは文字列になりやすいので、計算前に数値へ変換する必要があります。",
          interviewPhrase: "実務でこう説明する: + は数値どうしなら加算、片方が文字列なら連結になります。入力値は文字列で入ってきがちなので、計算の前に数値へ変換して型を揃えるようにしています。",
          keywords: ["文字列", "数値", "連結", "足し算", "変換"]
        }
      ]
    },
    {
      id: "jsday1-lesson3",
      slug: "strings-and-operators",
      title: "文字列の連結と演算子",
      summary: "文字列の連結とテンプレートリテラルを対比し、算術演算子と比較の前ふりを知る。",
      blocks: [
        { type: "heading", text: "文字列をつなげる(連結)" },
        { type: "paragraph", text: "文字列どうしは + でつなげられます。これを連結(れんけつ)と呼びます。あいさつ文に名前を差し込む、といった使い方が定番です。" },
        { type: "code", language: "javascript", code: "const name = \"太郎\";\nconst message = \"こんにちは、\" + name + \"さん\";\nconsole.log(message); // こんにちは、太郎さん", caption: "+ で文字列と変数の中身をつなげる" },
        { type: "heading", text: "テンプレートリテラル(もっと読みやすい書き方)" },
        { type: "paragraph", text: "+ をたくさん並べると読みにくくなります。そこで便利なのがテンプレートリテラルです。バッククォート(`)で全体を囲み、変数を差し込みたい場所に ${ } と書きます。文章の中に穴を開けて値をはめ込むイメージです。" },
        { type: "compare", bad: { label: "+ で連結(つなぎ目が多くて読みにくい)", language: "javascript", code: "const name = \"太郎\";\nconst age = 20;\nconst text = \"こんにちは、\" + name + \"さん(\" + age + \"歳)\";" }, good: { label: "テンプレートリテラル(文章がそのまま読める)", language: "javascript", code: "const name = \"太郎\";\nconst age = 20;\nconst text = `こんにちは、${name}さん(${age}歳)`;" } },
        { type: "callout", variant: "info", title: "${ } の中身は値になる", text: "${ } の中には変数だけでなく、age + 1 のような計算も書けます。例えば `来年は${age + 1}歳です` と書くと、${age + 1} の部分が計算され「来年は21歳です」になります。${ } は「ここに値をはめ込む穴」だと覚えてください。" },
        { type: "heading", text: "算術演算子(計算の記号)" },
        { type: "paragraph", text: "数値の計算には算術演算子(えんざんし)を使います。多くは学校の算数と同じですが、記号が少し違うものと、見慣れないものが一つあります。" },
        { type: "list", items: [
          "+ 足し算、- 引き算",
          "* かけ算(×ではなくアスタリスク)、/ わり算(÷ではなくスラッシュ)",
          "% 余り(わり算のあまり)。例: 7 % 3 は 1"
        ] },
        { type: "code", language: "javascript", code: "console.log(3 + 5); // 8\nconsole.log(10 / 2); // 5\nconsole.log(7 % 3); // 1(7を3で割った余り)", caption: "% は「余り」。奇数か偶数かの判定などによく使う" },
        { type: "heading", text: "比較の前ふり" },
        { type: "paragraph", text: "計算だけでなく、値どうしを比べることもよくあります。「等しいか」「大きいか」を調べると、結果は true か false の真偽値になります。ここでは「比べると真偽値が返る」ことだけ知っておけば十分で、詳しくは次のDayで扱います。" },
        { type: "code", language: "javascript", code: "console.log(3 > 5);   // false(3は5より大きくない)\nconsole.log(10 === 10); // true(等しい。=== は「等しいか」の比較)", caption: "比較の結果は true か false になる。=== は等しいかの比較(次のDayで詳しく)" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「この + で書いた文字列連結を、テンプレートリテラルに書き換えて。どこが読みやすくなったか説明して」と頼むと、2つの書き方の違いが体でわかります。" }
      ],
      questions: [
        {
          id: "jsday1-lesson3-q1",
          type: "choice",
          question: "テンプレートリテラルの説明として正しいものはどれですか。",
          choices: [
            "ダブルクオート \" \" で囲み、変数は + でつなぐ書き方",
            "バッククォート ` ` で囲み、${ } の中に変数や式を差し込める書き方",
            "シングルクオート ' ' で囲むと自動で計算される書き方",
            "数値専用で、文字列には使えない書き方"
          ],
          answerIndex: 1,
          explanation: "テンプレートリテラルはバッククォートで囲み、${ } の中に変数や計算を差し込めます。+ を並べるより読みやすくなります。文字列を組み立てるための書き方で、数値専用ではありません。"
        },
        {
          id: "jsday1-lesson3-q2",
          type: "choice",
          question: "console.log(7 % 3) の結果はどれですか。",
          choices: [
            "2.33...(7を3で割った答え)",
            "1(7を3で割った余り)",
            "21(7かける3)",
            "4(7引く3)"
          ],
          answerIndex: 1,
          explanation: "% は「わり算の余り」を求める演算子です。7 を 3 で割ると商が 2、余りが 1 なので結果は 1 です。/ が割った答え、% が余り、と区別して覚えましょう。"
        },
        {
          id: "jsday1-lesson3-q3",
          type: "free",
          question: "文字列の連結(+)とテンプレートリテラルの違いを、どちらが読みやすいかの理由も含めて説明してください。",
          modelAnswer: "+ による連結は、\"こんにちは、\" + name + \"さん\" のように文字列と変数を + でつないでいく書き方です。つなぎ目が増えると読みにくくなります。テンプレートリテラルはバッククォートで全体を囲み、${name} のように変数を差し込む書き方で、文章がそのままの形で読めます。${ } の中には計算も書けます。つなぎ目が減り、完成形が見えるぶんテンプレートリテラルのほうが読みやすいです。",
          interviewPhrase: "実務でこう説明する: 文字列の組み立てはテンプレートリテラルを使い、${ } で値を差し込んでいます。+ の連結より完成後の文字列が読みやすく、つなぎ目のミスも減るためです。",
          keywords: ["連結", "テンプレートリテラル", "バッククォート", "${ }", "読みやすい"]
        }
      ]
    }
  ]
};
