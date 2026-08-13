import type { Day } from "@/types";

export const pythonDay2: Day = {
  day: 2,
  slug: "day2",
  title: "条件分岐・ループ(判断と繰り返し)",
  goal: "if/for/whileで「判断」と「繰り返し」を組め、インデントの意味を理解する。",
  lessons: [
    {
      id: "pyday2-lesson1",
      slug: "if-elif-else",
      title: "if/elif/elseで分岐する",
      summary: "条件によって処理を切り替える基本形を、インデントとセットで身につける。",
      blocks: [
        {
          type: "heading",
          text: "プログラムに「判断」をさせる"
        },
        {
          type: "paragraph",
          text: "これまでのプログラムは、書いた順に上から下へ流れるだけでした。しかし現実の処理では「もし在庫があれば注文を受ける、なければ断る」のように、状況によって動きを変えたい場面がほとんどです。この「もし〜なら」を表すのが if(イフ)文です。日本語の「もし」とほぼ同じ意味だと思ってください。"
        },
        {
          type: "code",
          language: "python",
          code: "age = 20\n\nif age >= 18:\n    print(\"大人です\")\nelse:\n    print(\"未成年です\")",
          caption: "ifで条件を判定し、結果によって表示を変える"
        },
        {
          type: "paragraph",
          text: "if の後ろに条件を書き、末尾にコロン( : )を付けます。条件が成り立つ(True・真)ときは if のブロックが実行され、成り立たない(False・偽)ときは else(エルス、それ以外)のブロックが実行されます。True と False は「はい/いいえ」を表すPython専用の値で、Day1でも触れた真偽値です。"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜコロンとインデントが必要か",
          text: "Pythonは「どこからどこまでが if の中身か」を、行頭の字下げ(インデント)で判断します。コロンは「ここからブロックが始まる」という合図です。他の多くの言語が波かっこ { } で囲む役割を、Pythonでは字下げが担っています。だから字下げは見た目の問題ではなく、動作を決める文法そのものです。"
        },
        {
          type: "heading",
          text: "3つ以上に分けたいとき: elif"
        },
        {
          type: "paragraph",
          text: "条件が2択ではなく「A なら…、B なら…、それ以外なら…」と3つ以上に枝分かれするときは、elif(エルイフ、else if の短縮)を使います。elif は上から順に判定され、最初に成り立った1つだけが実行されます。"
        },
        {
          type: "code",
          language: "python",
          code: "score = 72\n\nif score >= 80:\n    print(\"合格(優)\")\nelif score >= 60:\n    print(\"合格\")\nelse:\n    print(\"不合格\")",
          caption: "elifで3段階に分岐。上から順に判定され、最初に当たった枝だけ動く"
        },
        {
          type: "paragraph",
          text: "この例では score が 72 なので、最初の「80以上」は成り立たず、次の「60以上」で成り立ち「合格」と表示されます。ここで大事なのは順番です。もし「60以上」を先に書くと、80点でも「60以上」に先に当たってしまい「優」が表示されません。elif は上から順にふるいにかける仕組みだと覚えてください。"
        },
        {
          type: "compare",
          bad: {
            label: "順番が逆で優が出ない",
            language: "python",
            code: "if score >= 60:\n    print(\"合格\")\nelif score >= 80:\n    print(\"合格(優)\")  # ここには絶対に来ない"
          },
          good: {
            label: "厳しい条件から順に書く",
            language: "python",
            code: "if score >= 80:\n    print(\"合格(優)\")\nelif score >= 60:\n    print(\"合格\")"
          }
        },
        {
          type: "callout",
          variant: "warn",
          title: "よくあるつまずき",
          text: "コロンの付け忘れ、字下げのズレ(半角スペースとタブの混在)、else の後ろに条件を書いてしまう、の3つが定番のエラーです。else はあくまで「それ以外の全部」なので条件は書けません。条件を付けたいなら elif を使います。"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "分岐が思った通りに動かないときは、コードを丸ごと貼って「この if 文で score=72 のとき何が表示されますか。表示されないなら理由も教えて」と聞くと、実行結果を追いながら説明してくれます。AIに直させる前に、まず自分で「どの枝に入るはずか」を予想してから答え合わせすると、読む力が育ちます。"
        }
      ],
      questions: [
        {
          id: "pyday2-lesson1-q1",
          type: "choice",
          question: "次のコードで score = 90 のとき、表示されるのはどれですか。\n\nif score >= 80:\n    print(\"A\")\nelif score >= 60:\n    print(\"B\")\nelse:\n    print(\"C\")",
          choices: ["A", "B", "C", "AとBの両方"],
          answerIndex: 0,
          explanation: "elif は上から順に判定され、最初に成り立った1つだけが実行されます。90 は最初の「80以上」で成り立つので \"A\" だけが表示され、以降の枝は評価されません。"
        },
        {
          id: "pyday2-lesson1-q2",
          type: "choice",
          question: "if 文について正しい説明はどれですか。",
          choices: [
            "else の後ろには条件を書く必要がある",
            "ブロックの範囲は行頭のインデント(字下げ)で決まる",
            "elif は1つの if に対して1回までしか使えない",
            "条件の末尾のコロンは省略してもよい"
          ],
          answerIndex: 1,
          explanation: "Pythonではブロックの範囲を字下げで表します。else に条件は書けず、elif は複数並べられ、コロンは省略できません(省略するとエラーになります)。"
        },
        {
          id: "pyday2-lesson1-q3",
          type: "free",
          question: "if / elif / else の3つが、それぞれどういうときに実行されるのかを、自分の言葉で説明してください。",
          modelAnswer: "if は最初の条件が成り立つ(Trueになる)ときに実行されます。elif は「if が成り立たず、かつ自分の条件が成り立つ」ときに実行され、上から順に判定されて最初に当たった1つだけが動きます。else はどの条件にも当てはまらなかった残り全部のときに実行されます。全体として、上から順にふるいにかけて最初に一致した枝だけを実行する仕組みです。",
          interviewPhrase: "実務ではこう説明する: 『条件を厳しい順・優先順に上から並べて、最初に一致した分岐だけを実行させています。else は取りこぼしの受け皿です』",
          keywords: ["条件", "True", "上から順", "最初に一致", "else"]
        }
      ]
    },
    {
      id: "pyday2-lesson2",
      slug: "comparison-and-logical-operators",
      title: "比較演算子と論理演算子(and/or/not)",
      summary: "条件式そのものの書き方を学び、複数条件を and / or / not で組み合わせる。",
      blocks: [
        {
          type: "heading",
          text: "条件は「比べた結果」でできている"
        },
        {
          type: "paragraph",
          text: "if の後ろに書く条件は、実は「2つの値を比べて True か False を返す式」です。この比べるための記号を比較演算子と呼びます。数学とほぼ同じですが、いくつか記号が違うので最初に確認します。"
        },
        {
          type: "list",
          items: [
            "== : 等しい(イコール2つ。1つの = は「代入」なので意味が全く違う)",
            "!= : 等しくない",
            "> : より大きい / < : より小さい",
            ">= : 以上 / <= : 以下"
          ]
        },
        {
          type: "compare",
          bad: {
            label: "間違い: = は代入",
            language: "python",
            code: "if age = 18:  # エラー。これは「代入」の記号\n    print(\"18歳\")"
          },
          good: {
            label: "正しい: == は比較",
            language: "python",
            code: "if age == 18:  # 「等しいか?」を比べる\n    print(\"18歳\")"
          }
        },
        {
          type: "callout",
          variant: "warn",
          title: "= と == の取り違えは最頻出",
          text: "= は「右の値を左に入れる(代入)」、== は「左右が等しいか比べる」です。if の中で = を1つだけ書くと、Pythonは文法エラーで止めてくれます。エラーメッセージに SyntaxError と出たら、まず == の書き忘れを疑ってください。"
        },
        {
          type: "heading",
          text: "複数の条件を組み合わせる: and / or / not"
        },
        {
          type: "paragraph",
          text: "「18歳以上、かつ、会員である」のように条件を2つ以上つなげたいときは、論理演算子を使います。and(アンド)は「両方とも成り立つ」、or(オア)は「どちらか一方でも成り立つ」、not(ノット)は「成り立たないことを反転する」という意味です。"
        },
        {
          type: "code",
          language: "python",
          code: "age = 20\nis_member = True\n\nif age >= 18 and is_member:\n    print(\"割引を適用します\")\n\nif age < 18 or not is_member:\n    print(\"割引の対象外です\")",
          caption: "andは両方True、orはどちらかTrue、notは真偽を反転する"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ and と or を区別するのか",
          text: "条件を「かつ」でつなぐか「または」でつなぐかで、対象になる範囲が正反対になることがあります。たとえば『18歳以上 and 会員』は両方満たす人だけ。『18歳以上 or 会員』はどちらか一方でも満たす広い範囲。要件を読み違えるとバグになるので、日本語の仕様を『かつ/または』のどちらなのか必ず確認してから書きます。"
        },
        {
          type: "paragraph",
          text: "Pythonでは 0 <= age <= 120 のように、比較を鎖のようにつなげて「範囲チェック」も書けます。これは age が 0 以上「かつ」120 以下、という意味で、and で書くより読みやすい書き方です。"
        },
        {
          type: "code",
          language: "python",
          code: "age = 30\nif 0 <= age <= 120:\n    print(\"ありえる年齢です\")\nelse:\n    print(\"入力ミスの可能性があります\")",
          caption: "範囲は数学と同じように鎖でつなげて書ける"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "複雑な条件は自分で書く前に、日本語の仕様をそのままAIに渡して『この条件をPythonの if 文にしてください。and と or のどちらを使ったか理由も添えて』と頼むと、根拠付きの式が返ります。返ってきた式は必ず『かつ/または』が仕様通りか自分で読み直してから採用してください。"
        }
      ],
      questions: [
        {
          id: "pyday2-lesson2-q1",
          type: "choice",
          question: "「等しいかどうか」を比べる正しい演算子はどれですか。",
          choices: ["=", "==", "!=", "=>"],
          answerIndex: 1,
          explanation: "== が「等しいか比べる」比較演算子です。= は代入、!= は「等しくない」、=> という演算子はPythonには存在しません(「以上」は >= です)。"
        },
        {
          id: "pyday2-lesson2-q2",
          type: "choice",
          question: "age = 16, is_member = True のとき、次の式の結果はどれですか。\n\nage >= 18 and is_member",
          choices: ["True", "False", "エラーになる", "16"],
          answerIndex: 1,
          explanation: "and は両方が True のときだけ True になります。age >= 18 は 16 >= 18 なので False。片方が False なので全体も False です。"
        },
        {
          id: "pyday2-lesson2-q3",
          type: "free",
          question: "and と or の違いを、具体例を1つ挙げて説明してください。",
          modelAnswer: "and は「両方の条件がともに成り立つ」ときだけ True になり、or は「どちらか一方でも成り立てば」True になります。たとえば『18歳以上 and 会員』は年齢も会員資格も両方満たす人だけが対象になりますが、『18歳以上 or 会員』は年齢だけ満たす人や会員なだけの人も含む、より広い対象になります。同じ2条件でも、つなぎ方で対象範囲が正反対になります。",
          interviewPhrase: "実務ではこう説明する: 『AND は全条件を満たす積集合、OR はいずれかを満たす和集合です。仕様の「かつ/または」を取り違えると対象範囲がずれるので、まず言葉の意味を確認します』",
          keywords: ["and", "or", "両方", "どちらか", "範囲"]
        }
      ]
    },
    {
      id: "pyday2-lesson3",
      slug: "for-and-range",
      title: "forとrangeで繰り返す",
      summary: "決まった回数・要素ぶんの繰り返しを for で書き、range の使い方を理解する。",
      blocks: [
        {
          type: "heading",
          text: "同じ処理を何度も書かない"
        },
        {
          type: "paragraph",
          text: "「1から5まで表示する」ために print を5回書くのは非効率で、回数が変われば全部書き直しになります。こういう「繰り返し」を1つの命令で表すのが for(フォー)文です。ループ(loop、繰り返し)とも呼びます。"
        },
        {
          type: "compare",
          bad: {
            label: "手で5回書く(繰り返しに弱い)",
            language: "python",
            code: "print(1)\nprint(2)\nprint(3)\nprint(4)\nprint(5)"
          },
          good: {
            label: "forで1回書く",
            language: "python",
            code: "for i in range(1, 6):\n    print(i)"
          }
        },
        {
          type: "paragraph",
          text: "range(レンジ、範囲)は「連続した数の並び」を作る道具です。range(1, 6) は「1 から始めて 6 の手前まで」、つまり 1, 2, 3, 4, 5 を意味します。終わりの数は含まれない(6は入らない)のがポイントです。i(アイ)は繰り返しのたびに順番に値が入る変数で、名前は自由ですが慣習的に i がよく使われます。"
        },
        {
          type: "callout",
          variant: "warn",
          title: "range は「終わりを含まない」",
          text: "range(5) は 0, 1, 2, 3, 4 の5個で、5 は含まれません。初心者が最も戸惑う点です。『5回繰り返したい』なら range(5)、『1から5を出したい』なら range(1, 6) と、目的に合わせて使い分けます。"
        },
        {
          type: "heading",
          text: "回数だけ繰り返す vs 要素を順に処理する"
        },
        {
          type: "paragraph",
          text: "for は数だけでなく、リスト(複数の値をまとめた入れ物。Day3で詳しく学びます)の中身を1つずつ取り出すのにも使えます。むしろこちらが for の本来の姿です。range は「回数ぶんの繰り返し」を作るための一種の道具に過ぎません。"
        },
        {
          type: "code",
          language: "python",
          code: "fruits = [\"りんご\", \"みかん\", \"ぶどう\"]\n\nfor fruit in fruits:\n    print(fruit + \"を数えました\")",
          caption: "リストの要素を先頭から1つずつ取り出して処理する"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ for を使うと良いのか",
          text: "繰り返しを for にまとめると、対象が3個でも1000個でも同じコードで動きます。手で書き並べると、要素が増えたときに全部書き直しになり、書き漏れや順序ミスも起きます。『変わる部分(データ)』と『変わらない部分(処理)』を分けられるのがループの価値です。"
        },
        {
          type: "code",
          language: "python",
          code: "total = 0\nfor n in range(1, 11):\n    total = total + n\nprint(total)  # 1から10までの合計 55",
          caption: "繰り返しながら合計を積み上げる典型パターン"
        },
        {
          type: "paragraph",
          text: "この例では total という「入れ物」を最初に 0 にしておき、ループのたびに n を足し込んでいます。ループの外で初期化し、ループの中で更新する、という形は合計・件数・最大値などを求めるときの定番です。total = total + n は total += n と短く書くこともできます。"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "ループの中で数がどう変化するか追えないときは、『この for ループを1周ごとに i と total の値を表にして見せて』とAIに頼むと、頭の中の実行を代わりにトレースしてくれます。表を見て自分の予想と合っているか確かめるのが、繰り返しを読む練習になります。"
        }
      ],
      questions: [
        {
          id: "pyday2-lesson3-q1",
          type: "choice",
          question: "range(2, 6) が表す数の並びはどれですか。",
          choices: ["2, 3, 4, 5, 6", "2, 3, 4, 5", "2, 6", "0, 1, 2, 3, 4, 5"],
          answerIndex: 1,
          explanation: "range(開始, 終了) は開始を含み、終了は含みません。よって 2, 3, 4, 5 の4個になります。終わりの 6 は含まれない点に注意してください。"
        },
        {
          id: "pyday2-lesson3-q2",
          type: "choice",
          question: "「ちょうど3回だけ処理を繰り返したい」とき、最も適切な書き方はどれですか。",
          choices: ["for i in range(3):", "for i in range(1, 3):", "for i in range(0, 4):", "for i in range(3, 0):"],
          answerIndex: 0,
          explanation: "range(3) は 0, 1, 2 の3個なので、中身がちょうど3回実行されます。range(1, 3) は2個、range(0, 4) は4個、range(3, 0) は空(何も繰り返さない)です。"
        },
        {
          id: "pyday2-lesson3-q3",
          type: "free",
          question: "for ループを使うと、同じ処理を手で並べて書くのに比べて何が良いのかを説明してください。",
          modelAnswer: "for ループは「変わらない処理」を1回だけ書き、「変わるデータ」を順番に当てはめて繰り返します。そのため対象の数が増えても減ってもコードを書き直す必要がなく、書き漏れや順序ミスも起きにくくなります。合計を求める処理なども、要素数に関係なく同じ数行で書けます。処理とデータを分離できることが最大の利点です。",
          interviewPhrase: "実務ではこう説明する: 『処理を1箇所に集約して、対象データを順に流し込む形にしています。件数が変わっても改修不要で、重複コードによるバグも防げます』",
          keywords: ["繰り返し", "データ", "処理", "書き直し不要", "ミスが減る"]
        }
      ]
    },
    {
      id: "pyday2-lesson4",
      slug: "while-break-continue-indent",
      title: "whileとbreak/continue、そしてインデント",
      summary: "条件が続く間の繰り返しを while で書き、break/continue とインデントの意味を固める。",
      blocks: [
        {
          type: "heading",
          text: "回数が決まっていない繰り返し: while"
        },
        {
          type: "paragraph",
          text: "for は「回数や対象があらかじめ決まっている」繰り返しに向いています。一方で「正しい入力が来るまで」「残高が0になるまで」のように、何回で終わるか事前にわからない繰り返しには while(ホワイル)を使います。while は「条件が True である間ずっと繰り返す」という意味です。"
        },
        {
          type: "code",
          language: "python",
          code: "count = 0\nwhile count < 3:\n    print(\"あと\", 3 - count, \"回\")\n    count = count + 1\nprint(\"終了\")",
          caption: "条件が成り立つ間だけ繰り返し、count を毎回1増やして終わりに近づける"
        },
        {
          type: "callout",
          variant: "warn",
          title: "無限ループに注意",
          text: "while で最も怖いのは、条件がずっと True のままで永遠に止まらない「無限ループ」です。上の例で count = count + 1 を書き忘れると、count は 0 のままで条件が永遠に成り立ち、プログラムが止まりません。while を書くときは『どうすればこの条件がいつか False になるか』を必ずセットで考えます。"
        },
        {
          type: "heading",
          text: "途中で抜ける break、途中でスキップする continue"
        },
        {
          type: "paragraph",
          text: "ループの途中で「もう繰り返しをやめたい」ときは break(ブレイク)、「今回だけ飛ばして次に進みたい」ときは continue(コンティニュー)を使います。break はループそのものを終了し、continue はその周回の残りを飛ばして次の周回に進みます。"
        },
        {
          type: "code",
          language: "python",
          code: "for n in range(1, 11):\n    if n == 5:\n        break        # 5になったらループごと終了\n    if n % 2 == 0:\n        continue     # 偶数はスキップして次へ\n    print(n)         # 1, 3 だけ表示される",
          caption: "breakはループを抜け、continueはその回だけ飛ばす"
        },
        {
          type: "paragraph",
          text: "n % 2 は「n を 2 で割った余り」を求める書き方です(% は余りを出す演算子)。余りが 0 なら偶数なので continue で飛ばしています。そして n が 5 になった時点で break が働き、ループ全体が終わります。結果として表示されるのは 1 と 3 だけです。"
        },
        {
          type: "compare",
          bad: {
            label: "continue: 今回だけ飛ばす",
            language: "python",
            code: "for n in range(1, 4):\n    if n == 2:\n        continue\n    print(n)\n# 出力: 1, 3(2だけ飛ぶ)"
          },
          good: {
            label: "break: そこで打ち切る",
            language: "python",
            code: "for n in range(1, 4):\n    if n == 2:\n        break\n    print(n)\n# 出力: 1(2以降は全部止まる)"
          }
        },
        {
          type: "heading",
          text: "すべての土台: インデント(字下げ)"
        },
        {
          type: "paragraph",
          text: "if でも for でも while でも、共通して支えているのがインデントです。Pythonは行頭の字下げの深さで「どこまでが同じブロックか」を判断します。同じ深さの行はひとまとまり、深くなればその内側、浅くなればブロックの外、というルールです。字下げは通常、半角スペース4つで統一します。"
        },
        {
          type: "code",
          language: "python",
          code: "for n in range(3):\n    print(\"外側: これはループの中\")\n    if n == 1:\n        print(\"内側: nが1のときだけ\")\n    print(\"外側: 毎回実行される\")\nprint(\"ループの外: 1回だけ実行\")",
          caption: "字下げの深さがブロックの範囲を表す。浅くなった行はループの外"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜインデントで構造を表すのか",
          text: "多くの言語は { } でブロックを囲みますが、Pythonは字下げそのものを文法にしました。おかげで『見た目のインデント』と『実際の構造』が必ず一致し、他人のコードでも構造を目で追いやすくなります。逆に言うと、字下げを1つ間違えるだけで意味が変わるので、揃えることが読みやすさと正しさの両方につながります。"
        },
        {
          type: "callout",
          variant: "warn",
          title: "スペースとタブを混ぜない",
          text: "見た目は同じでも、半角スペースとタブ文字が混在すると IndentationError や TabError が出ます。エディタの設定で『タブをスペースに変換』を有効にし、字下げは常にスペース4つに統一しておくと、この種のエラーをほぼ避けられます。"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "IndentationError や『ループが止まらない』といった不具合は、コードとエラーメッセージをそのまま貼って『どの行の字下げがおかしいか、無限ループになる条件は何か教えて』と聞くのが有効です。直った後は、AI任せにせず『なぜその字下げで正しくなるのか』を一言で説明できるか自分に問い直すと、構造を読む力が定着します。"
        }
      ],
      questions: [
        {
          id: "pyday2-lesson4-q1",
          type: "choice",
          question: "break と continue の違いとして正しいものはどれですか。",
          choices: [
            "break は今回だけ飛ばし、continue はループを終了する",
            "break はループを終了し、continue はその回を飛ばして次に進む",
            "どちらもループを完全に終了する",
            "どちらも今回の周回だけを飛ばす"
          ],
          answerIndex: 1,
          explanation: "break はループそのものを打ち切ってループの外に出ます。continue はその周回の残りだけを飛ばし、ループ自体は次の周回へと続きます。役割が逆なので混同に注意します。"
        },
        {
          id: "pyday2-lesson4-q2",
          type: "choice",
          question: "while ループで「無限ループ」になってしまう典型的な原因はどれですか。",
          choices: [
            "条件式にコロンを付けている",
            "ループ内で条件を False に近づける更新をしていない",
            "range を使っている",
            "print を使っている"
          ],
          answerIndex: 1,
          explanation: "while は条件が True である間ずっと繰り返します。ループの中でカウンタを増やすなど条件がいつか False になる更新をしないと、条件が永遠に成り立ち止まらなくなります。"
        },
        {
          id: "pyday2-lesson4-q3",
          type: "free",
          question: "Pythonにおける「インデント(字下げ)」が果たしている役割を説明してください。",
          modelAnswer: "Pythonではインデントの深さがブロック(処理のまとまり)の範囲を表します。同じ深さの行は同じブロックに属し、深くなればその内側、浅くなれば外側という構造になります。多くの言語が波かっこで囲む役割を、Pythonでは字下げが担っているため、字下げは見た目ではなく動作を決める文法そのものです。だからスペース4つで統一し、タブと混在させないことが正しさと読みやすさの両方につながります。",
          interviewPhrase: "実務ではこう説明する: 『Pythonはインデントで制御構造のスコープを表現するので、字下げのズレはそのままロジックの変化になります。スペース4つで統一してレビューでも構造を追いやすくしています』",
          keywords: ["インデント", "ブロック", "範囲", "文法", "スペース4つ"]
        }
      ]
    }
  ]
};
