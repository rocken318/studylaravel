import type { Day } from "@/types";

export const jsDay2: Day = {
  day: 2,
  slug: "day2",
  title: "条件と くり返し — プログラムに判断させる",
  goal: "if/else if/else と比較・論理演算子(===、!==、<、>、&&、||)を読んで説明でき、真偽値による条件分岐、配列(作成・添字・length)、for...of と forEach での配列処理が読める・直せる。",
  lessons: [
    {
      id: "jsday2-lesson1",
      slug: "if-else",
      title: "条件分岐 — if / else if / else",
      summary: "「もし〜なら」でプログラムに道を選ばせる。比較演算子と &&・|| の読み方を身につける。",
      blocks: [
        {
          type: "heading",
          text: "プログラムは「分かれ道」で判断する",
        },
        {
          type: "paragraph",
          text: "if 文は「もし〜なら、こうする」という分かれ道です。たとえば散歩中に分かれ道があって、「雨なら傘の道、晴れなら公園の道」と選ぶのと同じです。条件が正しい(true)なら { } の中を実行し、そうでなければ飛ばします。",
        },
        {
          type: "code",
          language: "javascript",
          code: "const age = 20;\nif (age >= 20) {\n  console.log(\"おとな\");\n} else {\n  console.log(\"みせいねん\");\n}",
          caption: "if は「もし〜なら」、else は「そうでなければ」の道",
        },
        {
          type: "paragraph",
          text: "分かれ道が3つ以上あるときは else if でつなぎます。上から順に条件を試して、最初に true になった道だけを通ります。",
        },
        {
          type: "code",
          language: "javascript",
          code: "const score = 75;\nif (score >= 80) {\n  console.log(\"合格\");\n} else if (score >= 60) {\n  console.log(\"あと少し\");\n} else {\n  console.log(\"不合格\");\n}",
          caption: "上から順にチェックし、最初に当てはまった道だけ通る",
        },
        {
          type: "heading",
          text: "比較演算子 — 2つの値をくらべる",
        },
        {
          type: "paragraph",
          text: "条件の中では、値どうしをくらべる比較演算子を使います。=== は「等しい」、!== は「等しくない」、< > <= >= は大小の比較です。くらべた結果は必ず true か false(真偽値)になります。",
        },
        {
          type: "code",
          language: "javascript",
          code: "console.log(5 === 5);   // true(等しい)\nconsole.log(5 !== 3);   // true(等しくない)\nconsole.log(3 < 5);     // true(3は5より小さい)\nconsole.log(5 <= 4);    // false",
          caption: "比較の結果は true か false のどちらか",
        },
        {
          type: "callout",
          variant: "warn",
          title: "= と === を混同しない",
          text: "= は「代入(入れる)」、=== は「等しいか比べる」で、まったくの別物です。if (age = 20) と書くと、比べるつもりが age に 20 を入れてしまい、いつも通ってしまうバグになります。「比べたい」ときは必ず === を使います。1つの = はイコールではなく「入れる矢印」だと覚えておきましょう。",
        },
        {
          type: "compare",
          bad: {
            label: "== はあいまいに比べてしまう",
            code: "console.log(0 == \"\");     // true(型が違うのに等しい扱い)\nconsole.log(1 == true);   // true(数値と真偽値を混ぜて比較)",
            language: "javascript",
          },
          good: {
            label: "=== は型もふくめて厳密に比べる",
            code: "console.log(0 === \"\");    // false(数値と文字列は別物)\nconsole.log(1 === true);  // false(数値と真偽値は別物)",
            language: "javascript",
          },
        },
        {
          type: "paragraph",
          text: "== は型の違いを見逃してあいまいに比べるため、思わぬ結果になります。迷ったら === を使えば、まず間違いありません。",
        },
        {
          type: "heading",
          text: "&& と || — 条件を組み合わせる",
        },
        {
          type: "paragraph",
          text: "複数の条件を合わせたいときは、&&(かつ)と ||(または)を使います。&& は「両方とも true なら true」、|| は「どちらか一方でも true なら true」です。「傘を持っていて、かつ雨なら」は &&、「土曜または日曜なら」は || です。",
        },
        {
          type: "code",
          language: "javascript",
          code: "const age = 25;\nconst hasTicket = true;\nif (age >= 20 && hasTicket) {\n  console.log(\"入場できます\"); // 両方 true なので通る\n}\n\nconst day = \"日\";\nif (day === \"土\" || day === \"日\") {\n  console.log(\"週末です\"); // どちらか当たれば通る\n}",
          caption: "&& は「かつ」、|| は「または」",
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "条件が読みづらいときは「この if 文の条件を日本語で説明して」とAIに聞くと、&& や || を『〜かつ〜』のように言葉にしてくれます。逆に「20歳以上で、かつチケットを持っている場合だけ通す条件を書いて」と日本語で頼めば、if 文を提案してくれます。あなたの仕事は、提案された条件が本当に意図どおりか(=== か == か、&& か || か)を読んで確かめることです。",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "if / else if / else は「分かれ道」。上から順に、最初に当てはまった道だけ通る",
            "比較演算子(===、!==、<、>、<=、>=)の結果は true か false になる",
            "値を比べるときは === を使う。= は代入なので混同しない",
            "&& は「かつ(両方 true)」、|| は「または(どちらか true)」",
          ],
        },
      ],
      questions: [
        {
          id: "jsday2-lesson1-q1",
          type: "choice",
          question: "次のコードで表示されるものはどれですか。 const n = 60; if (n >= 80) { console.log(\"A\"); } else if (n >= 60) { console.log(\"B\"); } else { console.log(\"C\"); }",
          choices: [
            "A",
            "B",
            "C",
            "何も表示されない",
          ],
          answerIndex: 1,
          explanation: "n は 60 です。最初の n >= 80 は false なので飛ばし、次の n >= 60 は true なので \"B\" を表示してそこで終了します。else if は上から順に試し、最初に当てはまった道だけを通ります。",
        },
        {
          id: "jsday2-lesson1-q2",
          type: "choice",
          question: "「年齢が18歳以上で、かつ会員である」場合だけを表す条件はどれですか。",
          choices: [
            "if (age >= 18 || isMember)",
            "if (age >= 18 && isMember)",
            "if (age = 18 && isMember)",
            "if (age >= 18 == isMember)",
          ],
          answerIndex: 1,
          explanation: "「かつ(両方とも成り立つ)」は && です。|| は「または」なので意味が変わります。age = 18 は代入で比較になっていません。=== ではなく = を1つだけ書くのは典型的なミスです。",
        },
        {
          id: "jsday2-lesson1-q3",
          type: "free",
          question: "値を比べるときに == ではなく === を使うほうがよいのは、なぜですか。",
          modelAnswer: "== は型が違ってもあいまいに変換して比べるため、0 == \"\" が true になるなど直感に反する結果を生みます。=== は型もふくめて厳密に比べるので、意図しない一致が起きにくく、バグを減らせます。迷ったら === を使えば安全です。",
          interviewPhrase: "実務でこう説明する: 等価比較は基本 === を使います。== は暗黙の型変換で予期しない一致が起きるので、型まで厳密に見る === のほうが安全で読み手にも意図が伝わるからです。",
          keywords: ["型", "厳密", "暗黙の型変換", "true"],
        },
      ],
    },
    {
      id: "jsday2-lesson2",
      slug: "arrays",
      title: "配列 — 複数の値を順番にまとめる",
      summary: "配列で値をまとめて持つ。作り方、0から始まる添字、length(個数)を読めるようにする。",
      blocks: [
        {
          type: "heading",
          text: "配列は「番号付きのロッカー」",
        },
        {
          type: "paragraph",
          text: "値が1つだけなら変数で足りますが、「くだものの名前を3つ」のように複数まとめたいことがあります。そのための入れ物が配列です。配列は「番号付きのロッカーが横に並んだもの」とイメージすると分かりやすいです。それぞれのロッカーに値が1つずつ入っていて、番号で取り出せます。",
        },
        {
          type: "code",
          language: "javascript",
          code: "const fruits = [\"りんご\", \"みかん\", \"ぶどう\"];\nconsole.log(fruits); // [\"りんご\", \"みかん\", \"ぶどう\"]",
          caption: "[ ] の中に値をカンマで並べると配列になる",
        },
        {
          type: "heading",
          text: "添字は0から始まる",
        },
        {
          type: "paragraph",
          text: "配列から1つ取り出すには、[番号] を使います。この番号を添字(そえじ、インデックス)と呼びます。大事なのは、番号が1ではなく 0 から始まることです。ロッカーの一番左が「0番」だと思ってください。",
        },
        {
          type: "code",
          language: "javascript",
          code: "const fruits = [\"りんご\", \"みかん\", \"ぶどう\"];\nconsole.log(fruits[0]); // りんご(最初)\nconsole.log(fruits[1]); // みかん\nconsole.log(fruits[2]); // ぶどう(最後)",
          caption: "先頭が [0]。番号は0から数える",
        },
        {
          type: "callout",
          variant: "warn",
          title: "1番目は [0]。1つずれやすい",
          text: "「1番目」を取りたくて fruits[1] と書くと、実際には2番目の \"みかん\" が返ってきます。人間の数え方(1から)とコンピュータの添字(0から)は1つずれています。ここは初心者が最もつまずくポイントなので、「最初は [0]」と口に出して覚えましょう。",
        },
        {
          type: "paragraph",
          text: "存在しない番号を指定すると、エラーではなく undefined(値なし)が返ります。3つの配列に fruits[5] はないので undefined です。エラーが出ないぶん気づきにくいので注意します。",
        },
        {
          type: "code",
          language: "javascript",
          code: "const fruits = [\"りんご\", \"みかん\", \"ぶどう\"];\nconsole.log(fruits[5]); // undefined(その番号のロッカーは無い)",
          caption: "無い番号を指定すると undefined になる",
        },
        {
          type: "heading",
          text: "length で「何個あるか」を知る",
        },
        {
          type: "paragraph",
          text: "配列.length で、中に値がいくつ入っているか(個数)が分かります。個数は1から数えた数なので、最後の添字は length より1小さくなります(添字は0から始まるため)。",
        },
        {
          type: "code",
          language: "javascript",
          code: "const fruits = [\"りんご\", \"みかん\", \"ぶどう\"];\nconsole.log(fruits.length);          // 3(個数)\nconsole.log(fruits[fruits.length - 1]); // ぶどう(最後の要素)",
          caption: "length は個数。最後の添字は length - 1",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ配列でまとめるのか",
          text: "もし fruit1、fruit2、fruit3 と別々の変数にすると、数が増えるたびに変数を足す必要があり、まとめて処理もできません。配列にまとめておけば、length で個数を数えたり、次のレッスンのように1件ずつ順番に処理したりできます。「同じ種類のものを順番にまとめて持ちたい」ときが配列の出番です。",
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「この配列の3番目の値を取り出すコードを書いて」と頼むと、AIは添字が0からであることを踏まえて fruits[2] のように書いてくれます。あなたは、その番号が本当に意図した位置か(1つずれていないか)を確認します。配列の中身が分からないときは「この配列にはいくつ値が入っている?」と length を使って確かめるよう頼むのも有効です。",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "配列は [ ] の中に値を並べて作る(例: [\"a\", \"b\"])",
            "取り出しは 配列[添字]。添字は0から始まる(先頭は [0])",
            "無い番号を指定すると undefined が返る",
            "配列.length で個数が分かる。最後の添字は length - 1",
          ],
        },
      ],
      questions: [
        {
          id: "jsday2-lesson2-q1",
          type: "choice",
          question: "const arr = [\"a\", \"b\", \"c\"]; のとき、arr[1] の値はどれですか。",
          choices: [
            "\"a\"",
            "\"b\"",
            "\"c\"",
            "undefined",
          ],
          answerIndex: 1,
          explanation: "添字は0から始まるので、arr[0] が \"a\"、arr[1] が \"b\"、arr[2] が \"c\" です。「1番目だから a」と考えると間違えます。先頭は [0] だと覚えましょう。",
        },
        {
          id: "jsday2-lesson2-q2",
          type: "choice",
          question: "const arr = [\"a\", \"b\", \"c\"]; のとき、arr.length の値と、最後の要素を取り出す式の組み合わせとして正しいものはどれですか。",
          choices: [
            "length は 2、最後は arr[2]",
            "length は 3、最後は arr[3]",
            "length は 3、最後は arr[arr.length - 1]",
            "length は 3、最後は arr[0]",
          ],
          answerIndex: 2,
          explanation: "要素は3つなので length は 3 です。ただし添字は0から始まるため最後の要素の添字は 2、つまり arr[arr.length - 1] で取り出します。arr[3] は存在せず undefined になります。",
        },
        {
          id: "jsday2-lesson2-q3",
          type: "free",
          question: "値を fruit1、fruit2、fruit3 と別々の変数にするより、配列にまとめるほうがよいのはなぜですか。",
          modelAnswer: "配列にまとめると、length で個数を数えたり、ループで1件ずつ順番に処理したりでき、数が増えても同じコードで扱えます。別々の変数だと、増えるたびに変数と処理を書き足す必要があり、まとめて操作できません。同じ種類の値を順番に持つときは配列が適しています。",
          interviewPhrase: "実務でこう説明する: 同種のデータは配列でまとめます。個数を length で取れて、ループで一括処理でき、件数が変わってもコードを変えずに済むからです。個別の変数だと拡張に弱くなります。",
          keywords: ["まとめる", "length", "ループ", "順番"],
        },
      ],
    },
    {
      id: "jsday2-lesson3",
      slug: "loops",
      title: "くり返し — 配列を1件ずつ処理する",
      summary: "for...of と forEach で配列を1件ずつ処理する。なぜ人間が手で並べず「くり返し」を使うのかを理解する。",
      blocks: [
        {
          type: "heading",
          text: "同じことを何度も — 人間が手で書かない理由",
        },
        {
          type: "paragraph",
          text: "配列の中身をすべて表示したいとき、fruits[0]、fruits[1]…と1行ずつ書くこともできます。でも100件あったら100行です。しかも件数が変わると全部書き直しになります。そこで「同じ処理を、中身ぶんだけ自動でくり返す」のがループ(くり返し)です。宛名書きを1枚ずつ手書きするか、同じ作業をコピー機に任せるか、の違いです。",
        },
        {
          type: "compare",
          bad: {
            label: "手で1件ずつ書く",
            code: "const fruits = [\"りんご\", \"みかん\", \"ぶどう\"];\nconsole.log(fruits[0]);\nconsole.log(fruits[1]);\nconsole.log(fruits[2]);\n// 件数が変わると全部書き直し",
            language: "javascript",
          },
          good: {
            label: "ループで自動でくり返す",
            code: "const fruits = [\"りんご\", \"みかん\", \"ぶどう\"];\nfor (const fruit of fruits) {\n  console.log(fruit);\n}\n// 件数が変わってもこのままでOK",
            language: "javascript",
          },
        },
        {
          type: "heading",
          text: "for...of — 配列を1件ずつ取り出す",
        },
        {
          type: "paragraph",
          text: "for...of は「配列の中身を1件ずつ取り出して、順番に処理する」書き方です。for (const 変数 of 配列) と書くと、変数に先頭から1つずつ値が入り、{ } の中がその回ごとに実行されます。読むときは「配列の の中身 of を1件ずつ fruit に入れて回す」と考えます。",
        },
        {
          type: "code",
          language: "javascript",
          code: "const fruits = [\"りんご\", \"みかん\", \"ぶどう\"];\nfor (const fruit of fruits) {\n  console.log(\"くだもの: \" + fruit);\n}\n// くだもの: りんご\n// くだもの: みかん\n// くだもの: ぶどう",
          caption: "fruit に1件ずつ入りながら3回くり返す",
        },
        {
          type: "callout",
          variant: "info",
          title: "console.log で「今どれを処理中か」を確認する",
          text: "ループが思ったとおり動いているか不安なときは、くり返しの中で console.log を使い、いま変数に何が入っているかを毎回表示すると確かめられます。値が1件ずつ変わって出力されれば、ちゃんと全件を回れている証拠です。バグを直すときも、まずここで中身を見るのが基本です。",
        },
        {
          type: "heading",
          text: "forEach — 配列に「これを全部にやって」と頼む",
        },
        {
          type: "paragraph",
          text: "forEach は配列自身に「各要素に対してこの処理をして」と頼む書き方です。配列.forEach((要素) => { 処理 }) と書くと、for...of と同じように1件ずつ処理できます。(要素) => { } の部分は「1件ごとに実行してほしい処理」で、Day1で学んだ関数の一種です。",
        },
        {
          type: "code",
          language: "javascript",
          code: "const fruits = [\"りんご\", \"みかん\", \"ぶどう\"];\nfruits.forEach((fruit) => {\n  console.log(\"くだもの: \" + fruit);\n});\n// for...of と同じ結果になる",
          caption: "forEach は「1件ごとの処理」を関数で渡す",
        },
        {
          type: "paragraph",
          text: "for...of と forEach は、どちらも「配列を1件ずつ処理する」ための道具です。読めればどちらでも構いません。まずは「配列を頭から順に全部回している」と読み取れることが大切です。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ2つの書き方があるのか",
          text: "for...of は途中で止めたり(break)、条件で飛ばしたりしやすく、素直に読めます。forEach は「各要素にこの処理」を短く書け、次のDayで学ぶ map など、値を作りかえる仲間とセットで覚えると便利です。今は違いを暗記するより、両方とも『全件を1件ずつ処理している』と読めれば十分です。",
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「この配列を1件ずつ表示するループを書いて」と頼めば、for...of か forEach でコードを提案してくれます。あなたは、それが本当に全件を回っているか(先頭から最後まで漏れなく処理しているか)を読んで確かめます。次のDayでは、この「1件ずつ処理する」考え方をもとに、配列を別の配列に作りかえる map を学びます。まずは「くり返しで全件を回す」感覚をここでつかんでおきましょう。",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "ループは「同じ処理を中身ぶんだけ自動でくり返す」道具。手書きの繰り返しをなくす",
            "for...of は for (const 変数 of 配列) で1件ずつ取り出す",
            "forEach は 配列.forEach((要素) => { 処理 }) で1件ずつ処理する",
            "くり返しの中で console.log すると、今どの値を処理中か確認できる",
            "どちらも「全件を1件ずつ処理する」ための道具。次のDayの map につながる",
          ],
        },
      ],
      questions: [
        {
          id: "jsday2-lesson3-q1",
          type: "choice",
          question: "const nums = [10, 20, 30]; に対して for (const n of nums) { console.log(n); } を実行すると、どうなりますか。",
          choices: [
            "10 20 30 が1回ずつ、合計3回表示される",
            "配列全体 [10, 20, 30] が1回だけ表示される",
            "添字の 0 1 2 が表示される",
            "何も表示されない",
          ],
          answerIndex: 0,
          explanation: "for...of は配列の中身(値そのもの)を先頭から1件ずつ変数 n に入れて回します。よって 10、20、30 が順に1回ずつ表示されます。添字ではなく値が入る点がポイントです。",
        },
        {
          id: "jsday2-lesson3-q2",
          type: "choice",
          question: "配列 items を1件ずつ処理する書き方として正しいものはどれですか。",
          choices: [
            "items.forEach(item => { console.log(item); })",
            "forEach(items) { console.log(item); }",
            "for item of items console.log(item)",
            "items.for((item) => console.log(item))",
          ],
          answerIndex: 0,
          explanation: "forEach は 配列.forEach((要素) => { 処理 }) の形で、配列に対してドットでつないで呼び出します。2番目や3番目は文法として成り立たず、items.for のようなメソッドは存在しません。",
        },
        {
          id: "jsday2-lesson3-q3",
          type: "free",
          question: "配列の全要素に同じ処理をするとき、fruits[0]、fruits[1]… と手で書かずにループを使うのは、なぜですか。",
          modelAnswer: "手で書くと件数ぶんの行が必要で、件数が変わるたびにコードを書き直さなければなりません。ループなら「1件ずつこう処理する」と一度書くだけで、配列の中身が何件でも自動で全件を処理できます。コードが短く、間違いにくく、変更にも強くなります。",
          interviewPhrase: "実務でこう説明する: 全件処理はループでまとめます。処理を1回書けば件数に依存せず全要素に適用でき、行数が減ってミスも減り、データ件数が変わっても直さずに済むからです。",
          keywords: ["くり返し", "件数", "自動", "書き直さない"],
        },
      ],
    },
  ],
};
