import type { Day } from "@/types";

export const pythonDay1: Day = {
  day: 1,
  slug: "day1",
  title: "変数・型・入出力(データの器)",
  goal: "変数にデータを入れて表示・受け取りができ、基本の型を意識できる。",
  lessons: [
    {
      id: "pyday1-lesson1",
      slug: "variables-and-assignment",
      title: "変数と代入(名前つきの箱)",
      summary: "データに名前をつけて後から使い回すための「変数」を理解する。",
      blocks: [
        { type: "heading", text: "変数とは「名前をつけたデータの置き場所」" },
        { type: "paragraph", text: "プログラムでは数値や文字などのデータを何度も使い回します。そのたびに書き直すのは大変なので、データに名前をつけて置いておきます。この「名前つきの置き場所」が変数です。イメージとしては、中身にラベルを貼った箱だと思ってください。" },
        { type: "code", language: "python", code: "price = 100\nmessage = \"こんにちは\"", caption: "price と message という名前の変数にデータを入れている" },
        { type: "paragraph", text: "= は「等しい」ではなく「右のデータを左の名前に入れる」という意味です。これを代入と呼びます。数学の等号とは違うので、最初は混乱しやすいポイントです。" },
        { type: "callout", variant: "why", title: "なぜ変数を使うのか", text: "同じ値を1か所で管理できるからです。price = 100 と一度決めておけば、あとで price を使うだけで済みます。値を変えたいときも代入する場所を1つ直せば全体に反映され、書き間違いが減ります。" },
        { type: "heading", text: "変数は後から中身を入れ替えられる" },
        { type: "paragraph", text: "変数は箱なので、中身をあとから入れ替えられます。新しく代入すると、前の値は上書きされます。" },
        { type: "code", language: "python", code: "count = 1\ncount = 2\nprint(count)  # 2 が表示される", caption: "後から代入した値で上書きされる" },
        { type: "callout", variant: "warn", title: "よくある落とし穴", text: "= の左右を逆に書くとエラーになります。2 = count のように「先に値」ではなく、必ず「名前 = 値」の順で書きます。また、変数名を使う前に代入していないと NameError(その名前は定義されていません)になります。" },
        { type: "list", ordered: false, items: [
          "変数名は英小文字とアンダースコアで書くのが基本(例: user_name)",
          "数字から始まる名前(例: 1st)は使えない",
          "意味の分かる名前をつけると、後で読んだときに理解しやすい"
        ] },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「この変数名は分かりやすいですか。もっと適切な名前の候補を3つ挙げて」と聞くと、命名の改善案をもらえます。AIが出した名前でも、なぜその名前なのか自分で説明できる状態にしておきます。" }
      ],
      questions: [
        {
          id: "pyday1-lesson1-q1",
          type: "choice",
          question: "Python で「変数 price に 100 を入れる」正しい書き方はどれですか。",
          choices: [
            "100 = price",
            "price = 100",
            "price == 100",
            "price -> 100"
          ],
          answerIndex: 1,
          explanation: "代入は「名前 = 値」の順で書きます。100 = price は左右が逆でエラー、== は「等しいか比較する」演算子で代入ではありません。-> はPythonの代入記号ではありません。"
        },
        {
          id: "pyday1-lesson1-q2",
          type: "choice",
          question: "次のコードを実行すると print(count) は何を表示しますか。\ncount = 1\ncount = 2",
          choices: [
            "1",
            "2",
            "1 と 2 の両方",
            "エラーになる"
          ],
          answerIndex: 1,
          explanation: "変数は後から代入した値で上書きされます。count は最後に 2 が代入されているので、表示されるのは 2 です。"
        },
        {
          id: "pyday1-lesson1-q3",
          type: "free",
          question: "「変数」とは何か、プログラミング未経験の人に一言で説明してください。",
          modelAnswer: "変数とは、データに名前をつけて後から使い回せるようにした置き場所のことです。= を使ってデータを入れ(代入)、その名前を書くことでいつでも中身を取り出せます。中身は後から入れ替えることもできます。",
          interviewPhrase: "実務ではこう説明する: 変数は値に名前をつけて再利用するための入れ物で、代入で中身を差し替えられます。",
          keywords: ["名前", "代入", "使い回す", "上書き"]
        }
      ]
    },
    {
      id: "pyday1-lesson2",
      slug: "basic-types",
      title: "基本の型(str/int/float/bool)と型を意識する理由",
      summary: "文字列・整数・小数・真偽値という4つの基本の型と、その違いを意識する理由を学ぶ。",
      blocks: [
        { type: "heading", text: "データには「型(かた)」がある" },
        { type: "paragraph", text: "同じ「箱」に入るデータでも、中身が文字なのか数値なのかで扱いが変わります。この「データの種類」を型と呼びます。まずは4つの基本の型を押さえます。" },
        { type: "list", ordered: false, items: [
          "str(文字列): 文字の並び。\"こんにちは\" や \"123\" のようにクォートで囲む",
          "int(整数): 小数点のない数。100 や -5 など",
          "float(浮動小数点数): 小数点のある数。3.14 や 0.5 など",
          "bool(真偽値): True か False の2つだけ。条件が成り立つかを表す"
        ] },
        { type: "code", language: "python", code: "name = \"田中\"      # str\nage = 30           # int\nheight = 170.5     # float\nis_member = True   # bool", caption: "それぞれ違う型のデータを変数に入れている" },
        { type: "heading", text: "type() で型を確かめられる" },
        { type: "paragraph", text: "ある変数の中身がどの型かは type() という命令で確認できます。困ったときに「今この変数は何型なのか」を調べる基本の道具です。" },
        { type: "code", language: "python", code: "print(type(30))       # <class 'int'>\nprint(type(3.14))     # <class 'float'>\nprint(type(\"30\"))     # <class 'str'>\nprint(type(True))     # <class 'bool'>", caption: "type() で型を表示する" },
        { type: "callout", variant: "why", title: "なぜ型を意識するのか", text: "型が違うと同じ記号でも動きが変わるからです。数値の 1 + 2 は 3 ですが、文字列の \"1\" + \"2\" は \"12\"(連結)になります。見た目が同じ「1」でも、型によって結果が変わることを知らないとバグの原因になります。" },
        { type: "compare",
          bad: { label: "文字列同士", text: "クォートで囲むと文字として連結される", code: "print(\"1\" + \"2\")  # 12", language: "python" },
          good: { label: "整数同士", text: "クォートなしなら数値として足し算される", code: "print(1 + 2)  # 3", language: "python" }
        },
        { type: "heading", text: "型が合わないとエラーになる" },
        { type: "paragraph", text: "文字列と数値をそのまま足そうとすると、Python は「種類が違うので計算できない」とエラーを出します。これは間違いを早めに教えてくれる仕組みでもあります。" },
        { type: "code", language: "python", code: "print(\"年齢:\" + 30)\n# TypeError: can only concatenate str (not \"int\") to str", caption: "文字列と整数はそのまま足せない" },
        { type: "callout", variant: "warn", title: "よくある落とし穴", text: "input() で受け取った値は数値に見えても必ず str(文字列)です。そのまま計算すると意図しない連結やエラーになります。数値として使うときは int() や float() で変換します(次のレッスンで扱います)。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "型に関するエラーが出たら「このTypeErrorの意味と、どの型をどう変換すれば直るか教えて」とエラー文ごと貼って聞きます。AIの提案を試したら、type() で本当に狙った型になったか自分で確認します。" }
      ],
      questions: [
        {
          id: "pyday1-lesson2-q1",
          type: "choice",
          question: "print(\"1\" + \"2\") の実行結果はどれですか。",
          choices: [
            "3",
            "12",
            "\"12\"",
            "エラーになる"
          ],
          answerIndex: 1,
          explanation: "\"1\" と \"2\" はクォートで囲まれた文字列(str)です。文字列同士の + は連結なので、結果は 12 という文字列が表示されます。数値の足し算にしたい場合はクォートを外して 1 + 2 と書きます。"
        },
        {
          id: "pyday1-lesson2-q2",
          type: "choice",
          question: "3.14 の型はどれですか。",
          choices: [
            "int",
            "float",
            "str",
            "bool"
          ],
          answerIndex: 1,
          explanation: "3.14 は小数点を含む数なので float(浮動小数点数)です。int は小数点のない整数、str は文字列、bool は True/False の真偽値です。"
        },
        {
          id: "pyday1-lesson2-q3",
          type: "free",
          question: "なぜプログラミングでは「型」を意識する必要があるのか説明してください。",
          modelAnswer: "型が違うと同じ記号でも動きが変わり、結果やエラーが変わるからです。たとえば数値の 1 + 2 は 3 ですが、文字列の \"1\" + \"2\" は連結されて \"12\" になります。文字列と数値をそのまま足すとエラーにもなります。今どの型を扱っているかを意識しないと、意図しない結果やバグにつながります。",
          interviewPhrase: "実務ではこう説明する: 型を意識するのは、同じ演算でも型で挙動が変わり、型の取り違えがバグの原因になるからです。",
          keywords: ["型", "連結", "TypeError", "変換"]
        }
      ]
    },
    {
      id: "pyday1-lesson3",
      slug: "print-and-input",
      title: "print()とinput()で出力・入力する",
      summary: "print()で画面に表示し、input()で利用者からの入力を受け取る方法を学ぶ。",
      blocks: [
        { type: "heading", text: "print() は「画面に表示する」命令" },
        { type: "paragraph", text: "print() は、かっこの中に書いた内容を画面に表示する命令です。プログラムの結果を確認したり、途中経過を見たりする、いちばん基本の出力手段です。" },
        { type: "code", language: "python", code: "print(\"はじめてのPython\")\nprint(100)\nprint(1 + 2)  # 計算結果 3 が表示される", caption: "文字列・数値・計算結果を表示する" },
        { type: "paragraph", text: "print() はカンマで区切って複数のものを一度に表示できます。区切りには自動で半角スペースが入ります。" },
        { type: "code", language: "python", code: "name = \"田中\"\nprint(\"こんにちは\", name, \"さん\")\n# こんにちは 田中 さん", caption: "カンマ区切りで複数の値を表示" },
        { type: "heading", text: "input() は「利用者から文字を受け取る」命令" },
        { type: "paragraph", text: "input() は、キーボードから入力された文字を受け取る命令です。かっこの中に書いた文字は、入力を促すメッセージとして先に表示されます。入力された内容は変数に代入して使います。" },
        { type: "code", language: "python", code: "name = input(\"名前を入力してください: \")\nprint(\"ようこそ、\" + name + \"さん\")", caption: "入力を受け取り、あいさつに使う" },
        { type: "callout", variant: "warn", title: "最重要の落とし穴: input() は必ず文字列", text: "input() が返す値は、数字を入力しても必ず str(文字列)です。年齢を入力させて計算しようとしても、そのままでは足し算できずエラーになります。数値として使うときは int() や float() で変換が必要です。" },
        { type: "compare",
          bad: { label: "変換しない", text: "文字列のまま計算しようとしてエラー", code: "age = input(\"年齢: \")\nprint(age + 1)  # TypeError", language: "python" },
          good: { label: "int() で変換", text: "整数に変換してから計算する", code: "age = int(input(\"年齢: \"))\nprint(age + 1)  # 正しく計算できる", language: "python" }
        },
        { type: "callout", variant: "why", title: "なぜ変換が必要なのか", text: "input() はキーボードからの入力を「文字の並び」として受け取るからです。\"30\" という文字列と 30 という整数は別物なので、計算に使うには int() で数値に変換して、型をそろえる必要があります。" },
        { type: "list", ordered: false, items: [
          "int(\"30\") は文字列 \"30\" を整数 30 に変換する",
          "float(\"3.14\") は文字列を小数に変換する",
          "str(30) は逆に整数を文字列 \"30\" に変換する"
        ] },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「input()で受け取った値で計算したらエラーになった」とコードとエラー文を貼って聞くと、どこで変換すべきか教えてくれます。直った後は、なぜ int() が必要だったのかを自分の言葉で説明できるか確認します。" }
      ],
      questions: [
        {
          id: "pyday1-lesson3-q1",
          type: "choice",
          question: "input() が返す値の型は何ですか。",
          choices: [
            "入力内容に応じて int か float",
            "常に str(文字列)",
            "常に int(整数)",
            "常に bool(真偽値)"
          ],
          answerIndex: 1,
          explanation: "input() は数字を入力しても常に str(文字列)を返します。数値として計算に使うには int() や float() で変換する必要があります。ここを忘れるとエラーや意図しない連結の原因になります。"
        },
        {
          id: "pyday1-lesson3-q2",
          type: "choice",
          question: "利用者が入力した年齢に1を足して表示したいとき、正しいのはどれですか。",
          choices: [
            "age = input(\"年齢: \"); print(age + 1)",
            "age = int(input(\"年齢: \")); print(age + 1)",
            "age = input(\"年齢: \"); print(age + \"1\")",
            "age = str(input(\"年齢: \")); print(age + 1)"
          ],
          answerIndex: 1,
          explanation: "input() の結果は文字列なので、int() で整数に変換してから計算します。選択肢1と4は文字列のままで、+ 1 するとTypeErrorになります。選択肢3は文字列連結なので \"301\" のようになり、計算になりません。"
        },
        {
          id: "pyday1-lesson3-q3",
          type: "free",
          question: "input() で受け取った値を計算に使うとき、なぜ int() などの変換が必要になるのか説明してください。",
          modelAnswer: "input() はキーボードからの入力を必ず str(文字列)として返すからです。\"30\" という文字列は 30 という整数とは別物で、そのまま + などで計算しようとするとエラーになったり文字列連結になったりします。数値として扱うには int() や float() で型を数値に変換し、計算する値と型をそろえる必要があります。",
          interviewPhrase: "実務ではこう説明する: input() の戻り値は常に文字列なので、数値演算前に int() や float() で型を変換します。",
          keywords: ["input", "文字列", "int", "変換", "型をそろえる"]
        }
      ]
    },
    {
      id: "pyday1-lesson4",
      slug: "f-strings",
      title: "f-stringで文字列を組み立てる",
      summary: "変数を文字列の中に埋め込んで読みやすく組み立てるf-stringの書き方を学ぶ。",
      blocks: [
        { type: "heading", text: "変数を文章に埋め込みたい" },
        { type: "paragraph", text: "「こんにちは、田中さん。あなたは30歳です」のように、変数の値を文章の中に混ぜたい場面は多いです。+ で文字列を連結する方法もありますが、読みにくく、型を変換する手間もかかります。" },
        { type: "compare",
          bad: { label: "+ で連結", text: "クォートと + が多く読みづらい。数値は str() 変換が必要", code: "name = \"田中\"\nage = 30\nprint(\"こんにちは、\" + name + \"さん。あなたは\" + str(age) + \"歳です\")", language: "python" },
          good: { label: "f-string", text: "文章の形のまま変数を差し込める。変換も不要", code: "name = \"田中\"\nage = 30\nprint(f\"こんにちは、{name}さん。あなたは{age}歳です\")", language: "python" }
        },
        { type: "heading", text: "f-string の書き方" },
        { type: "paragraph", text: "文字列の先頭に f をつけ、その中で {変数名} と書くと、その部分が変数の値に置き換わります。これをf-string(f文字列)と呼びます。数値でも自動で文字列として埋め込まれるので、str() 変換は不要です。" },
        { type: "code", language: "python", code: "price = 100\ncount = 3\nprint(f\"合計は {price * count} 円です\")\n# 合計は 300 円です", caption: "波かっこの中には計算式も書ける" },
        { type: "callout", variant: "why", title: "なぜ f-string を使うのか", text: "文章の完成形を見たまま書けるので、読みやすく間違えにくいからです。+ による連結だとクォートや変換が増えて、閉じ忘れや型エラーを起こしやすくなります。現在のPythonでは f-string が標準的な書き方です。" },
        { type: "callout", variant: "warn", title: "よくある落とし穴", text: "先頭の f を書き忘れると、{name} がそのまま文字として表示されます。また、波かっこ { } の中に書けるのは値や式です。文字列全体をクォートで正しく閉じることも忘れないようにします。" },
        { type: "code", language: "python", code: "name = \"田中\"\nprint(\"こんにちは {name}\")   # f がないので {name} がそのまま表示される\nprint(f\"こんにちは {name}\")  # f があるので 田中 に置き換わる", caption: "f の有無で結果が変わる" },
        { type: "list", ordered: false, items: [
          "f\"...\" の中で {変数名} を書くと値に置き換わる",
          "{ } の中には price * count のような式も書ける",
          "数値でも自動で文字列に変換されるので str() は不要"
        ] },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「この + でつないだ文字列を f-string に書き換えて」と頼むと、読みやすい形に直してくれます。書き換え後のコードも、どこが変数に置き換わるのか自分で読めることを確認しておきます。" }
      ],
      questions: [
        {
          id: "pyday1-lesson4-q1",
          type: "choice",
          question: "name = \"田中\" のとき、田中 と表示されるのはどれですか。",
          choices: [
            "print(\"こんにちは {name}\")",
            "print(f\"こんにちは {name}\")",
            "print(\"こんにちは\" name)",
            "print(f\"こんにちは name\")"
          ],
          answerIndex: 1,
          explanation: "f-string は先頭に f をつけ、{name} と波かっこで囲むと変数の値に置き換わります。選択肢1は f がないので {name} のまま表示され、選択肢4は波かっこがないので name という文字がそのまま出ます。選択肢3は文法エラーです。"
        },
        {
          id: "pyday1-lesson4-q2",
          type: "choice",
          question: "price = 100 のとき print(f\"合計は {price * 3} 円\") の表示はどれですか。",
          choices: [
            "合計は price * 3 円",
            "合計は 300 円",
            "合計は 100 * 3 円",
            "エラーになる"
          ],
          answerIndex: 1,
          explanation: "f-string の波かっこの中には式も書けます。price * 3 が計算されて 300 になり、その結果が埋め込まれます。よって「合計は 300 円」と表示されます。"
        },
        {
          id: "pyday1-lesson4-q3",
          type: "free",
          question: "文字列を + で連結する代わりに f-string を使う利点を説明してください。",
          modelAnswer: "f-string は文章の完成形を見たまま書け、{変数名} と書くだけで値が埋め込まれるので読みやすく間違えにくいからです。+ による連結ではクォートや + が増え、数値を混ぜるときは str() 変換も必要で、閉じ忘れや型エラーを起こしやすくなります。f-string なら数値でも自動で文字列になり、変換の手間が減ります。",
          interviewPhrase: "実務ではこう説明する: f-string は可読性が高く、型変換や連結記号のミスを減らせるので標準的に使います。",
          keywords: ["f-string", "埋め込む", "可読性", "str変換不要"]
        }
      ]
    }
  ]
};
