import type { Day } from "@/types";

export const jsDay3: Day = {
  day: 3,
  slug: "day3",
  title: "関数とオブジェクト — 処理とデータをまとめる",
  goal: "関数(宣言・引数・戻り値・アロー関数)とオブジェクト(プロパティ・ドット記法)を読んで説明でき、現代のJS/Reactで頻出する配列メソッド map / filter を理解できる。",
  lessons: [
    {
      id: "jsday3-lesson1",
      slug: "functions",
      title: "関数 — 入力から出力を作る小さな機械",
      summary: "引数を受け取り、処理して、戻り値を返す。関数の基本形と「なぜ関数に切り出すのか」を学ぶ。",
      blocks: [
        {
          type: "heading",
          text: "関数は「入力 → 処理 → 出力」の箱"
        },
        {
          type: "paragraph",
          text: "関数とは、ある入力を受け取って、決まった処理をして、結果を返す小さな機械です。自動販売機を思い浮かべてください。お金とボタン(入力)を渡すと、中で処理が動いて、ジュース(出力)が出てきます。中の仕組みを知らなくても、入力と出力さえ分かれば使えます。関数もこれと同じで、名前を付けておけば何度でも呼び出せます。"
        },
        {
          type: "code",
          language: "javascript",
          code: "function add(a, b) {\n  return a + b;\n}\n\nadd(2, 3); // 5",
          caption: "add は「2つの数を受け取り、足した結果を返す」関数"
        },
        {
          type: "paragraph",
          text: "add(a, b) のカッコの中にある a と b が引数(ひきすう)です。関数に渡す入力の受け皿だと思ってください。呼び出すときに add(2, 3) と書くと、a に 2、b に 3 が入ります。そして return の後ろに書いた値が戻り値(もどりち)、つまり出力です。"
        },
        {
          type: "code",
          language: "javascript",
          code: "function greet(name) {\n  return \"やあ、\" + name + \"さん\";\n}\n\nconst message = greet(\"太郎\"); // \"やあ、太郎さん\"\nconsole.log(message);",
          caption: "引数 name を受け取り、あいさつ文を作って return で返す"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ関数に切り出すのか",
          text: "同じ処理を何度も書く代わりに、一度関数にまとめれば呼び出すだけで再利用できます。さらに greet や calcTax のような名前を付けることで「ここは何をしているか」が名前だけで伝わります。処理に名前を付けて意図を残すこと、これが関数の一番の価値です。"
        },
        {
          type: "callout",
          variant: "warn",
          title: "return を忘れると undefined が返る",
          text: "関数の中で計算しても、return を書かなければ結果は外に返りません。その場合その関数の戻り値は undefined になります。「関数を呼んだのに結果が空っぽ」というときは、まず return があるかを確認しましょう。"
        },
        {
          type: "compare",
          bad: {
            label: "同じ処理をコピペ",
            text: "税込み計算を何度も手書きすると、直すとき全部直す羽目になる",
            language: "javascript",
            code: "const priceA = 100 + 100 * 0.1;\nconst priceB = 200 + 200 * 0.1;\nconst priceC = 300 + 300 * 0.1;"
          },
          good: {
            label: "関数にまとめる",
            text: "1か所直せば全部に反映され、名前で意図も分かる",
            language: "javascript",
            code: "function withTax(price) {\n  return price + price * 0.1;\n}\nconst priceA = withTax(100);\nconst priceB = withTax(200);"
          }
        },
        {
          type: "list",
          ordered: false,
          items: [
            "引数: 関数に渡す入力の受け皿。カッコの中に書く",
            "戻り値: return の後ろに書いた出力。呼び出し元が受け取る",
            "関数に切り出す理由は「再利用」と「名前で意図を残す」の2つ"
          ]
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「税込み価格を計算する関数を書いて。引数は税抜き価格、戻り値は税込み価格で」のように、引数と戻り値を指定して頼むと、意図どおりの関数が返ってきます。読むときは「入力は何で、何を返すか」だけ追えば十分です。"
        }
      ],
      questions: [
        {
          id: "jsday3-lesson1-q1",
          type: "choice",
          question: "function double(n) { return n * 2; } を double(4) と呼び出したとき、戻り値はどれ?",
          choices: [
            "4",
            "8",
            "undefined",
            "\"nn\""
          ],
          answerIndex: 1,
          explanation: "引数 n に 4 が入り、return n * 2 で 4 * 2 = 8 が返ります。return に書いた値が戻り値になります。"
        },
        {
          id: "jsday3-lesson1-q2",
          type: "choice",
          question: "関数の中で計算はしているのに return を書かなかった。呼び出し元が受け取る戻り値はどれ?",
          choices: [
            "計算結果の数値",
            "0",
            "undefined",
            "エラーになって止まる"
          ],
          answerIndex: 2,
          explanation: "return を書かない関数の戻り値は undefined になります。処理は動いても結果は外に返らないため、「呼んだのに空っぽ」の原因になりがちです。"
        },
        {
          id: "jsday3-lesson1-q3",
          type: "free",
          question: "同じ処理を何度も書く代わりに関数に切り出すと、どんな利点がありますか。2つ挙げて説明してください。",
          modelAnswer: "1つ目は再利用です。一度関数にまとめれば呼び出すだけで同じ処理を使い回せ、修正も1か所直せば全体に反映されます。2つ目は意図が伝わることです。withTax や greet のように名前を付けることで、コードを読んだ人が「ここは何をしているか」を名前だけで理解できます。処理に名前を付けて再利用できるのが関数の価値です。",
          interviewPhrase: "実務でこう説明する: 繰り返す処理は関数に切り出して再利用し、名前で意図を残すことで読みやすさと保守性を上げています。",
          keywords: ["再利用", "名前", "意図", "1か所修正", "保守"]
        }
      ]
    },
    {
      id: "jsday3-lesson2",
      slug: "arrow-functions",
      title: "アロー関数 — (x) => x + 1 の読み方",
      summary: "現代のJSやReactで頻出するアロー関数を、ふつうの関数と対応させて「読める」ようにする。",
      blocks: [
        {
          type: "heading",
          text: "矢印 => は「引数から結果へ」の矢印"
        },
        {
          type: "paragraph",
          text: "現代のJavaScriptやReactのコードを読むと (x) => x + 1 のような書き方をよく見ます。これがアロー関数です。矢印 => の左が引数、右が返す値だと読めば、ほとんどの場合それで十分です。まずは「書く」より「読める」ことを目標にしましょう。"
        },
        {
          type: "code",
          language: "javascript",
          code: "// ふつうの関数\nfunction addOne(x) {\n  return x + 1;\n}\n\n// 同じ意味のアロー関数\nconst addOne = (x) => x + 1;",
          caption: "矢印の左が引数、右が return される値。上下は同じ意味"
        },
        {
          type: "paragraph",
          text: "アロー関数は、本体が1つの式だけなら波かっこ {} と return を省略できます。上の (x) => x + 1 は「x を受け取って x + 1 を返す」という意味で、return を書かなくても矢印の右の値が自動で返ります。この短さが、リストの加工などで大量に使われる理由です。"
        },
        {
          type: "code",
          language: "javascript",
          code: "// 波かっこを使えばふつうの関数と同じように複数行も書ける\nconst greet = (name) => {\n  const upper = name.toUpperCase();\n  return \"Hi, \" + upper;\n};\n\n// 引数が1つなら () も省けることがある\nconst square = x => x * x;",
          caption: "波かっこ版では return が必要。省略版では矢印の右がそのまま戻り値"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜアロー関数が主流なのか",
          text: "map や filter のような配列メソッドには「各要素にこの処理をして」と関数を渡します。そのたびに function と書くと長くなるので、短く書けるアロー関数が好まれます。React のイベント処理でも onClick={() => ...} の形で毎日のように登場します。読めれば、AIが生成したコードの大半が理解できます。"
        },
        {
          type: "compare",
          bad: {
            label: "毎回 function で長い",
            text: "小さな処理でも function 宣言だと記述量が多い",
            language: "javascript",
            code: "const result = numbers.map(function (n) {\n  return n * 2;\n});"
          },
          good: {
            label: "アローで短く",
            text: "同じ処理を1行で。map/filter と相性がよい",
            language: "javascript",
            code: "const result = numbers.map((n) => n * 2);"
          }
        },
        {
          type: "list",
          ordered: false,
          items: [
            "矢印 => の左が引数、右が返す値だと読む",
            "本体が式1つなら {} と return を省略でき、右の値が自動で返る",
            "波かっこ {} を使う場合は return が必要",
            "まずは書けなくても「読める」ことを目標にすればよい"
          ]
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "アロー関数が読めないときは「この (x) => x * 2 をふつうの function の書き方に直して」と頼めば、対応する形を見せてくれます。逆に「この function をアロー関数に書き換えて」と頼めば、短い形に直してくれます。"
        }
      ],
      questions: [
        {
          id: "jsday3-lesson2-q1",
          type: "choice",
          question: "アロー関数 const triple = (n) => n * 3; と同じ意味のふつうの関数はどれ?",
          choices: [
            "function triple(n) { n * 3; }",
            "function triple(n) { return n * 3; }",
            "function triple() { return n * 3; }",
            "function triple(n) { return n + 3; }"
          ],
          answerIndex: 1,
          explanation: "矢印の左 (n) が引数、右 n * 3 が返す値です。省略版なので return が省かれています。対応するふつうの関数は function triple(n) { return n * 3; } です。"
        },
        {
          id: "jsday3-lesson2-q2",
          type: "choice",
          question: "(x) => x + 1 のように波かっこ {} を使わないアロー関数では、返り値はどうなる?",
          choices: [
            "return を書かないと undefined になる",
            "矢印の右に書いた式がそのまま戻り値になる",
            "必ず null が返る",
            "引数がそのまま返る"
          ],
          answerIndex: 1,
          explanation: "波かっこを使わない省略形では、矢印の右に書いた式の結果が自動的に戻り値になります。return を書く必要はありません。"
        },
        {
          id: "jsday3-lesson2-q3",
          type: "free",
          question: "アロー関数 (n) => n * 2 を、日本語で「何を受け取り何を返すか」を説明してください。",
          modelAnswer: "矢印の左の (n) が引数で、数値を1つ受け取ります。矢印の右の n * 2 が返す値で、受け取った n を2倍にした結果を返します。つまり「数値を受け取って、その2倍を返す関数」です。波かっこを使わない省略形なので、return を書かなくても n * 2 が自動的に戻り値になります。",
          interviewPhrase: "実務でこう説明する: アロー関数は矢印の左が引数、右が戻り値と読み、map や filter に渡す小さな処理を短く書くのに使っています。",
          keywords: ["引数", "戻り値", "矢印の左", "矢印の右", "省略"]
        }
      ]
    },
    {
      id: "jsday3-lesson3",
      slug: "objects",
      title: "オブジェクト — 関連するデータをひとまとめにする",
      summary: "{ name: \"太郎\", age: 20 } のようにデータをまとめ、user.name でアクセスする。オブジェクトの配列も学ぶ。",
      blocks: [
        {
          type: "heading",
          text: "オブジェクトは「名前付きの引き出し」"
        },
        {
          type: "paragraph",
          text: "配列が「番号で並んだ箱」だとすると、オブジェクトは「名前の付いた引き出しの集まり」です。1人のユーザーには名前・年齢・メールなど、種類の違うデータがまとまっています。これを別々の変数にバラバラに持つより、1つのオブジェクトにまとめたほうが扱いやすくなります。"
        },
        {
          type: "code",
          language: "javascript",
          code: "const user = {\n  name: \"太郎\",\n  age: 20,\n  email: \"taro@example.com\",\n};",
          caption: "波かっこ {} の中に「キー: 値」を並べる。これがオブジェクト"
        },
        {
          type: "paragraph",
          text: "name や age のような名前をプロパティ(またはキー)、その右の \"太郎\" や 20 を値と呼びます。中の値を取り出すときは、オブジェクト名のうしろにドットとプロパティ名をつなげます。これをドット記法と呼びます。"
        },
        {
          type: "code",
          language: "javascript",
          code: "console.log(user.name); // \"太郎\"\nconsole.log(user.age);  // 20\n\nuser.age = 21;          // 値を書き換えることもできる\nconsole.log(user.age);  // 21",
          caption: "user.name のように「オブジェクト.プロパティ」で値を読み書きする"
        },
        {
          type: "paragraph",
          text: "さらに強力なのが、オブジェクトを配列に並べる形です。同じ形のオブジェクトをいくつも並べると、「データの一覧」を表現できます。ユーザー一覧・商品一覧・投稿一覧など、アプリで扱うデータのほとんどはこの形をしています。"
        },
        {
          type: "code",
          language: "javascript",
          code: "const users = [\n  { name: \"太郎\", age: 20 },\n  { name: \"花子\", age: 25 },\n  { name: \"次郎\", age: 30 },\n];\n\nconsole.log(users[0].name); // \"太郎\"\nconsole.log(users[1].age);  // 25",
          caption: "オブジェクトの配列 = データの一覧。users[番号].プロパティ でたどる"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜオブジェクトでまとめるのか",
          text: "name1, age1, name2, age2 のように変数をバラバラに持つと、どれが同じ人のデータか分からなくなります。1人を1つのオブジェクトにまとめれば「太郎の情報はこの引き出し一式」とはっきりし、関数に渡すのも user 1つで済みます。APIから返ってくるデータもほぼこの形です。"
        },
        {
          type: "callout",
          variant: "warn",
          title: "無いプロパティは undefined",
          text: "user.phone のように存在しないプロパティを読むと、エラーではなく undefined が返ります。「値が取れない」ときは、プロパティ名のつづり違い(name と names など)を疑いましょう。ドット記法は名前が命なので、1文字違うと別物になります。"
        },
        {
          type: "list",
          ordered: false,
          items: [
            "オブジェクトは { キー: 値 } の形で関連データをまとめる",
            "値を読み書きするときは user.name のようにドット記法を使う",
            "同じ形のオブジェクトを並べた配列が「データの一覧」になる",
            "配列の中のオブジェクトは users[0].name のようにたどる"
          ]
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「ユーザーを表すオブジェクトを作って。名前・年齢・メールを持たせて」と頼めば、キーと値の形で作ってくれます。一覧がほしいときは「ユーザーが3人入った配列にして」と伝えれば、オブジェクトの配列を返してくれます。"
        }
      ],
      questions: [
        {
          id: "jsday3-lesson3-q1",
          type: "choice",
          question: "const user = { name: \"太郎\", age: 20 }; のとき、user.name の値はどれ?",
          choices: [
            "20",
            "\"太郎\"",
            "\"name\"",
            "undefined"
          ],
          answerIndex: 1,
          explanation: "ドット記法 user.name は name プロパティの値を取り出します。ここでは \"太郎\" が入っているので \"太郎\" になります。"
        },
        {
          id: "jsday3-lesson3-q2",
          type: "choice",
          question: "const users = [{ name: \"太郎\" }, { name: \"花子\" }]; のとき、users[1].name はどれ?",
          choices: [
            "\"太郎\"",
            "\"花子\"",
            "1",
            "undefined"
          ],
          answerIndex: 1,
          explanation: "users[1] は配列の2番目のオブジェクト { name: \"花子\" } です。そこから .name を取り出すので \"花子\" になります。番号は0から始まる点に注意します。"
        },
        {
          id: "jsday3-lesson3-q3",
          type: "free",
          question: "1人分の情報を name1, age1, name2, age2 のようにバラバラの変数で持つより、オブジェクトの配列で持つほうがよいのはなぜですか。",
          modelAnswer: "1人を1つのオブジェクトにまとめると、名前・年齢など関連するデータが1か所にまとまり、どれが同じ人の情報かが一目で分かります。それを配列に並べればデータの一覧として扱え、users[0].name のように規則的にたどれます。バラバラの変数だと人数が増えるたびに変数も増え、対応関係も崩れやすくなります。APIから返るデータもこの形なので、そのまま扱えます。",
          interviewPhrase: "実務でこう説明する: 関連するデータはオブジェクトにまとめ、一覧はオブジェクトの配列で持つことで、データの対応関係を崩さず扱っています。",
          keywords: ["オブジェクト", "まとめる", "配列", "一覧", "ドット記法"]
        }
      ]
    },
    {
      id: "jsday3-lesson4",
      slug: "map-filter",
      title: "map と filter — 配列を変換する・絞り込む",
      summary: "map は各要素を変換して新しい配列を作り、filter は条件で要素を絞る。Reactのリスト表示の土台。",
      blocks: [
        {
          type: "heading",
          text: "map は「全員に同じ加工」、filter は「条件で選抜」"
        },
        {
          type: "paragraph",
          text: "配列を扱うとき、実務でいちばん使うのが map と filter です。たとえ話で言うと、map は「行列に並んだ全員に同じスタンプを押す」加工、filter は「条件に合う人だけを列から選び出す」選抜です。どちらも元の配列はそのままに、新しい配列を作って返すのが特徴です。"
        },
        {
          type: "code",
          language: "javascript",
          code: "const numbers = [1, 2, 3, 4];\n\n// map: 各要素を2倍にした新しい配列を作る\nconst doubled = numbers.map((n) => n * 2);\nconsole.log(doubled); // [2, 4, 6, 8]\nconsole.log(numbers); // [1, 2, 3, 4] 元は変わらない",
          caption: "map は各要素に同じ処理をして、同じ長さの新しい配列を返す"
        },
        {
          type: "code",
          language: "javascript",
          code: "const numbers = [1, 2, 3, 4, 5, 6];\n\n// filter: 条件(偶数)を満たす要素だけ残す\nconst evens = numbers.filter((n) => n % 2 === 0);\nconsole.log(evens); // [2, 4, 6]",
          caption: "filter は「true を返した要素だけ」を集めた新しい配列を返す"
        },
        {
          type: "paragraph",
          text: "map と filter に渡しているのは、Day3で学んだアロー関数です。map の (n) => n * 2 は「各要素をどう加工するか」、filter の (n) => n % 2 === 0 は「その要素を残すかどうかの条件」を表します。オブジェクトの配列と組み合わせると、実務そのものの形になります。"
        },
        {
          type: "code",
          language: "javascript",
          code: "const users = [\n  { name: \"太郎\", age: 20 },\n  { name: \"花子\", age: 17 },\n  { name: \"次郎\", age: 30 },\n];\n\n// filter で成人だけ、map で名前だけ取り出す\nconst adultNames = users\n  .filter((u) => u.age >= 20)\n  .map((u) => u.name);\n\nconsole.log(adultNames); // [\"太郎\", \"次郎\"]",
          caption: "filter で絞り、map で変換。つなげて書けるのがよく使われる形"
        },
        {
          type: "compare",
          bad: {
            label: "for ループで手書き",
            text: "空の配列を用意して push していく。行数が多く意図が見えにくい",
            language: "javascript",
            code: "const doubled = [];\nfor (let i = 0; i < numbers.length; i++) {\n  doubled.push(numbers[i] * 2);\n}"
          },
          good: {
            label: "map で1行",
            text: "「各要素を2倍にする」という意図がそのまま読める",
            language: "javascript",
            code: "const doubled = numbers.map((n) => n * 2);"
          }
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ for より map / filter が好まれるのか",
          text: "for ループは「カウンタを進めて、空配列に push して」という手順が主役で、何をしたいのかが埋もれます。map / filter は「各要素を変換する」「条件で絞る」という目的そのものが名前になっているので、読んだ瞬間に意図が分かります。元の配列を壊さず新しい配列を返す点も、バグを減らします。"
        },
        {
          type: "callout",
          variant: "warn",
          title: "map と filter を取り違えない",
          text: "map は「必ず元と同じ個数」を返し、filter は「条件に合った分だけ(減ることがある)」を返します。個数を変えたいのに map を使う、値を加工したいのに filter を使う、という取り違えはよくあるミスです。「変換なら map、絞り込みなら filter」と覚えましょう。"
        },
        {
          type: "callout",
          variant: "info",
          title: "リスト表示の土台になる(予告)",
          text: "Reactでは、users.map((u) => <li>{u.name}</li>) のように map で配列を画面の一覧に変換します。つまり「データの配列を、表示要素の配列に map する」のが画面表示の基本です。ここで map / filter を読めるようにしておくと、次のステップがぐっと楽になります。"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「このユーザー配列から、20歳以上の人の名前だけを配列で取り出したい」と伝えれば、filter と map を組み合わせたコードを返してくれます。返ってきたコードは「filter=絞り込み、map=変換」と読めば意図を追えます。"
        }
      ],
      questions: [
        {
          id: "jsday3-lesson4-q1",
          type: "choice",
          question: "[1, 2, 3].map((n) => n + 10) の結果はどれ?",
          choices: [
            "[1, 2, 3]",
            "[11, 12, 13]",
            "[10]",
            "36"
          ],
          answerIndex: 1,
          explanation: "map は各要素に同じ処理をして新しい配列を返します。それぞれに 10 を足すので [11, 12, 13] になります。個数は元と同じ3つのままです。"
        },
        {
          id: "jsday3-lesson4-q2",
          type: "choice",
          question: "「配列の中から条件に合う要素だけを残して新しい配列を作る」のに使うメソッドはどれ?",
          choices: [
            "map",
            "filter",
            "push",
            "length"
          ],
          answerIndex: 1,
          explanation: "filter は渡した条件が true になる要素だけを集めた新しい配列を返します。要素を変換したいときは map、絞り込みたいときは filter です。"
        },
        {
          id: "jsday3-lesson4-q3",
          type: "free",
          question: "map と filter の違いを、返る配列の個数の観点も含めて説明してください。",
          modelAnswer: "map は配列の各要素を変換して、元と同じ個数の新しい配列を返します。全員に同じ加工をするイメージです。filter は各要素が条件を満たすかを調べ、満たした要素だけを集めた新しい配列を返すので、個数が元より減ることがあります。条件で選抜するイメージです。どちらも元の配列は変更せず、新しい配列を返す点は共通しています。使い分けは「変換なら map、絞り込みなら filter」です。",
          interviewPhrase: "実務でこう説明する: 変換したいときは map、条件で絞りたいときは filter を使い、どちらも元配列を壊さず新しい配列を返す点を意識しています。",
          keywords: ["map", "filter", "変換", "絞り込み", "個数", "新しい配列"]
        }
      ]
    }
  ]
};
