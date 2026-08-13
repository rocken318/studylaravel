import type { Day } from "@/types";

export const tsDay1: Day = {
  day: 1,
  slug: "day1",
  title: "変数・基本型・関数",
  goal: "型注釈と型推論を理解し、基本型と関数の型が読める・書ける。anyを避ける意識を持つ。",
  lessons: [
    {
      id: "tsday1-lesson1",
      slug: "type-annotation-and-inference",
      title: "型注釈(: string など)と型推論",
      summary: "変数に「これは文字列」と書く型注釈と、TypeScriptが自動で判断する型推論を学ぶ。",
      blocks: [
        {
          type: "heading",
          text: "「型」って何のためにあるの?"
        },
        {
          type: "paragraph",
          text: "TypeScriptは、JavaScriptに「型」という仕組みを足した言語です。型とは、その値が「文字列なのか」「数値なのか」といった種類のこと。プログラムを動かす前に「ここには数値が入るはず」と宣言しておくと、間違った値を入れたときにエディタが赤線で教えてくれます。実行しなくても間違いに気づける、これが型の一番のうれしさです。"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜAIプロダクト作りで型が効くのか",
          text: "これからあなたは実装の多くをAIに任せます。AIが書いたコードは一見それらしく見えても、渡す値の種類がズレていることがあります。型があると、AIの出したコードをエディタに貼った瞬間に「ここ型が合いません」と赤線が出る。動かして初めて壊れるのではなく、書いた瞬間に気づけるのです。"
        },
        {
          type: "heading",
          text: "型注釈:自分で型を書く"
        },
        {
          type: "paragraph",
          text: "変数名のうしろに [[type-annotation]](型注釈)としてコロンと型名を書きます。「この箱には文字列だけ入れます」という宣言です。"
        },
        {
          type: "code",
          language: "typescript",
          caption: "型注釈をつけて変数を宣言する",
          code: "// : string が「文字列型」という型注釈\nconst userName: string = \"あかり\";\nconst age: number = 28;\nconst isAdmin: boolean = false;\n\n// 型に合わない値を入れると、実行前にエラーになる\n// const wrong: number = \"30\"; // エラー: 文字列は number に代入できない"
        },
        {
          type: "heading",
          text: "型推論:書かなくても分かってくれる"
        },
        {
          type: "paragraph",
          text: "実は、初期値があれば型注釈を省略できます。TypeScriptが値を見て「これは文字列だな」と自動で判断してくれるからです。これを [[type-inference]](型推論)といいます。省略しても型が消えるわけではなく、裏でちゃんと型が付いています。"
        },
        {
          type: "code",
          language: "typescript",
          caption: "型推論に任せる",
          code: "// 型注釈を書かなくても、右の値から string と推論される\nconst city = \"Tokyo\";\n// city は string 型として扱われる\n\n// なので、あとで数値を入れようとするとエラーになる\n// city = 100; // エラー: number は string に代入できない"
        },
        {
          type: "compare",
          bad: {
            label: "冗長:分かりきった型まで全部書く",
            language: "typescript",
            code: "const title: string = \"入門\";\nconst count: number = 3;"
          },
          good: {
            label: "推論に任せてすっきり",
            language: "typescript",
            code: "const title = \"入門\";\nconst count = 3;"
          }
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「この変数、型注釈を書くべき?それとも型推論に任せていい?理由も教えて」と聞くと、書くべき場面(関数の引数や、初期値が曖昧なとき)と省略していい場面を整理してくれます。"
        },
        {
          type: "list",
          ordered: false,
          items: [
            "型注釈=自分で「: 型名」と書いて宣言する",
            "型推論=初期値から型を自動で判断してくれる",
            "初期値があるならふつうは推論に任せてよい",
            "関数の引数など、推論できない場所では注釈が必要になる"
          ]
        }
      ],
      questions: [
        {
          id: "tsday1-lesson1-q1",
          type: "choice",
          question: "次のうち「型推論」を正しく説明しているものはどれ?",
          choices: [
            "変数名のうしろに必ずコロンで型を書く仕組み",
            "初期値からTypeScriptが自動で型を判断する仕組み",
            "実行時に型をチェックして例外を投げる仕組み",
            "型をすべて any にしてチェックを止める仕組み"
          ],
          answerIndex: 1,
          explanation: "型推論は初期値を見てTypeScriptが型を自動で決める機能です。自分でコロンを書くのは型注釈のほうで、実行時チェックでもありません。"
        },
        {
          id: "tsday1-lesson1-q2",
          type: "free",
          question: "型注釈と型推論の違いを、初学者に説明するつもりで書いてください。",
          modelAnswer: "型注釈は「この変数は文字列」と自分でコロンを使って書く宣言です。型推論は初期値を見てTypeScriptが自動で型を決める機能で、const city = \"Tokyo\" と書けば注釈がなくても string になります。どちらも実行前に間違った代入を防いでくれます。",
          interviewPhrase: "実務では「初期値があるところは推論に任せて、引数など推論が効かないところだけ注釈を足す」と説明します。",
          keywords: ["型注釈", "型推論", "初期値", "string"]
        }
      ]
    },
    {
      id: "tsday1-lesson2",
      slug: "basic-types",
      title: "基本型(string / number / boolean / 配列 / null / undefined)",
      summary: "よく使う基本の型と、値がない状態を表す null・undefined の違いを押さえる。",
      blocks: [
        {
          type: "heading",
          text: "まず覚える3つの基本型"
        },
        {
          type: "paragraph",
          text: "型の中でも登場回数が圧倒的に多いのが string(文字列)、number(数値)、boolean(真偽値=trueかfalse)の3つです。TypeScriptには整数用・小数用の区別はなく、数はすべて number です。"
        },
        {
          type: "code",
          language: "typescript",
          caption: "基本型の例",
          code: "const message: string = \"こんにちは\";\nconst price: number = 1980;      // 整数も小数も number\nconst rate: number = 0.08;\nconst isPublished: boolean = true;"
        },
        {
          type: "heading",
          text: "配列の型:同じ種類を並べる"
        },
        {
          type: "paragraph",
          text: "配列は「同じ種類の値を順番に並べたもの」です。型は「要素の型のうしろに [] を付ける」と書きます。string[] なら文字列の配列、number[] なら数値の配列です。"
        },
        {
          type: "code",
          language: "typescript",
          caption: "配列の型注釈",
          code: "const tags: string[] = [\"ai\", \"typescript\", \"web\"];\nconst scores: number[] = [80, 92, 75];\n\n// 別の型を混ぜるとエラーになる\n// tags.push(100); // エラー: number は string[] に追加できない"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ配列に型があると助かるのか",
          text: "AIに「ユーザー名の一覧を作って」と頼むと string[] が返るはず。もし数値が混ざったコードが返ってきても、string[] と宣言しておけば混入した瞬間に赤線が出ます。データの形をあらかじめ決めておくと、想定外の値の混入を早く見つけられます。"
        },
        {
          type: "heading",
          text: "null と undefined:「値がない」を表す2つ"
        },
        {
          type: "paragraph",
          text: "「値がまだない」状態を表す型が2つあります。[[undefined]] は「まだ何も代入されていない・未定義」、[[null]] は「意図的に空っぽにした」という意味合いで使い分けられることが多いです。実務では、この2つの扱い忘れがバグの定番なので、型の段階で意識しておきます。"
        },
        {
          type: "compare",
          bad: {
            label: "値がない可能性を無視している",
            language: "typescript",
            text: "nickname が無いとき name.length で落ちる",
            code: "function show(nickname: string) {\n  return nickname.length; // 空のときを考えていない\n}"
          },
          good: {
            label: "「無いかもしれない」を型で表す",
            language: "typescript",
            text: "string | undefined なら未設定を扱える",
            code: "function show(nickname: string | undefined) {\n  return nickname ? nickname.length : 0;\n}"
          }
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「この値は null や undefined になる可能性がある?あるなら型と分岐をどう書けばいい?」と聞くと、値が無い場合の安全な書き方まで含めて出してくれます。"
        },
        {
          type: "list",
          ordered: false,
          items: [
            "文字列は string、数値は number(整数も小数も)、真偽は boolean",
            "配列は「要素の型 + []」。例:string[]、number[]",
            "undefined は未定義、null は意図的な空を表すことが多い",
            "値が無い可能性があるなら型で表しておくとバグを防げる"
          ]
        }
      ],
      questions: [
        {
          id: "tsday1-lesson2-q1",
          type: "choice",
          question: "「数値の配列」を表す型注釈として正しいものはどれ?",
          choices: [
            "number{}",
            "array<number>",
            "number[]",
            "[number]"
          ],
          answerIndex: 2,
          explanation: "配列は「要素の型 + []」で表すので、数値の配列は number[] です。要素をまとめて囲む書き方ではありません。"
        },
        {
          id: "tsday1-lesson2-q2",
          type: "choice",
          question: "TypeScriptの number 型について正しい説明はどれ?",
          choices: [
            "整数専用で、小数は別の型を使う",
            "整数も小数もまとめて number で表す",
            "文字列を数値に見せかけるための型",
            "true / false を表す型"
          ],
          answerIndex: 1,
          explanation: "TypeScriptには整数・小数の区別がなく、数はすべて number です。true / false は boolean です。"
        },
        {
          id: "tsday1-lesson2-q3",
          type: "free",
          question: "null と undefined を、それぞれどんな場面で使うか自分の言葉で説明してください。",
          modelAnswer: "undefined は「まだ値が入っていない・未定義」の状態を表し、変数を宣言しただけで代入していないときなどに現れます。null は「意図的に空にした」ことを表すのに使われます。どちらも値が無い状態なので、その値を使う前に有無を確認しないとエラーの原因になります。",
          interviewPhrase: "実務では「未設定は undefined、意図的な空は null と使い分け、使う前に必ず有無をチェックする」と説明します。",
          keywords: ["null", "undefined", "未定義", "空"]
        }
      ]
    },
    {
      id: "tsday1-lesson3",
      slug: "function-types-and-arrow",
      title: "関数の型(引数と戻り値)、アロー関数",
      summary: "関数の引数と戻り値に型を付ける方法と、短く書けるアロー関数の書き方を学ぶ。",
      blocks: [
        {
          type: "heading",
          text: "関数にも「入口」と「出口」の型がある"
        },
        {
          type: "paragraph",
          text: "関数は「値を受け取って、加工して、返す」しくみです。受け取る値が引数、返す値が戻り値。引数と戻り値それぞれに型を付けられます。ここが型注釈の一番おいしい場所です。なぜなら関数の引数は初期値がなく、型推論が効かないからです。"
        },
        {
          type: "code",
          language: "typescript",
          caption: "引数と戻り値に型を付ける",
          code: "// (name: string) が引数の型、: string が戻り値の型\nfunction greet(name: string): string {\n  return \"こんにちは、\" + name + \"さん\";\n}\n\nconst text = greet(\"あかり\"); // text は string\n// greet(123); // エラー: number は string の引数に渡せない"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ関数の型が「AIに任せる」ときの守りになるのか",
          text: "実装をAIに書いてもらうとき、あなたが決めるのは多くの場合「引数と戻り値の型」です。入口と出口の型さえ固定しておけば、中身をAIがどう書こうと、型に合わないコードは受け付けません。型が仕様書の役割を果たし、実装だけを任せられます。"
        },
        {
          type: "heading",
          text: "アロー関数:短く書く関数"
        },
        {
          type: "paragraph",
          text: "同じ関数を、より短い記法で書けるのがアロー関数です。function という語のかわりに => (矢印)を使います。React などでは、このアロー関数が至るところで出てきます。"
        },
        {
          type: "compare",
          bad: {
            label: "function 記法(これはこれで正しい)",
            language: "typescript",
            code: "function add(a: number, b: number): number {\n  return a + b;\n}"
          },
          good: {
            label: "アロー関数で同じ処理",
            language: "typescript",
            code: "const add = (a: number, b: number): number => {\n  return a + b;\n};"
          }
        },
        {
          type: "paragraph",
          text: "処理が「値を1つ返すだけ」なら、波かっこと return も省略できます。1行で書けるので、配列の変換などでよく使います。"
        },
        {
          type: "code",
          language: "typescript",
          caption: "1行のアロー関数",
          code: "// 波かっこと return を省いた形。=> の右がそのまま戻り値になる\nconst double = (n: number): number => n * 2;\n\nconst nums = [1, 2, 3];\nconst doubled = nums.map((n) => n * 2); // [2, 4, 6]"
        },
        {
          type: "callout",
          variant: "warn",
          title: "戻り値の型は書くべき?",
          text: "戻り値の型は推論もされますが、公開する関数や少し複雑な関数では自分で書くのがおすすめです。書いておくと「返すつもりの型」と「実際に返している型」がズレたとき、その関数の中でエラーが出て原因が特定しやすくなります。"
        },
        {
          type: "list",
          ordered: false,
          items: [
            "引数は「名前: 型」、戻り値は引数かっこのうしろに「: 型」",
            "引数は型推論が効かないので型注釈が必要",
            "アロー関数は function のかわりに => を使う短い書き方",
            "1つ値を返すだけなら波かっこと return を省略できる"
          ]
        }
      ],
      questions: [
        {
          id: "tsday1-lesson3-q1",
          type: "choice",
          question: "次のうち、戻り値が number 型のアロー関数として正しいものはどれ?",
          choices: [
            "const f = (a: number): string => a + 1;",
            "const f = (a: number): number => a + 1;",
            "const f: number = (a) => a + 1;",
            "function f(a: number) => number { return a + 1; }"
          ],
          answerIndex: 1,
          explanation: "引数かっこのうしろの : number が戻り値の型です。1つ目は戻り値を string と宣言しているのに数値を返していて矛盾します。4つ目はfunctionとアローの記法が混ざっていて不正です。"
        },
        {
          id: "tsday1-lesson3-q2",
          type: "free",
          question: "関数の引数には型推論が効かず、型注釈が必要になる理由を説明してください。",
          modelAnswer: "変数は初期値から型を推論できますが、関数の引数は呼び出されるまで値が決まらず、初期値がありません。そのためTypeScriptは引数の型を自動で決められず、自分で : string のように型注釈を書く必要があります。引数と戻り値の型を決めておくと、実装をAIに任せても型に合わないコードは弾けます。",
          interviewPhrase: "実務では「引数と戻り値の型が関数の仕様。そこを固定すれば中身の実装は安心して任せられる」と説明します。",
          keywords: ["引数", "型推論", "型注釈", "戻り値"]
        }
      ]
    },
    {
      id: "tsday1-lesson4",
      slug: "avoid-any-vs-unknown",
      title: "anyを避ける・unknownとの違い",
      summary: "型チェックを無効化する any の危うさと、安全な受け皿である unknown の違いを理解する。",
      blocks: [
        {
          type: "heading",
          text: "any は「型チェックをやめる」宣言"
        },
        {
          type: "paragraph",
          text: "[[any]] は「どんな型でもOK、チェックしないで」という特別な型です。一見便利ですが、これを付けた瞬間にTypeScriptの守りが消えます。せっかく型で間違いを防いでいたのに、any の部分だけは何をしてもエラーが出なくなるのです。"
        },
        {
          type: "code",
          language: "typescript",
          caption: "any は間違いを見逃す",
          code: "let data: any = \"文字列です\";\n\n// 本当は文字列なのに、数値のように扱ってもエラーにならない\nconst result = data * 2;   // 実行するとおかしな結果(NaN)\ndata.foo.bar.baz;          // 存在しないのにエラーにならない"
        },
        {
          type: "callout",
          variant: "warn",
          title: "any は「型の穴」",
          text: "any は一箇所付けるだけで、そこから先の値も次々と any になって広がります。エラーが出ないので一見動いているように見えますが、実際には型の守りに穴が空いた状態。急いでいるときの一時しのぎで入れて、そのまま残りがちなので注意します。"
        },
        {
          type: "heading",
          text: "unknown:「まだ何か分からない」を安全に扱う"
        },
        {
          type: "paragraph",
          text: "[[unknown]] も「どんな型か分からない値」を表しますが、any と決定的に違います。unknown はそのままでは使えず、「これは文字列だと確認できたら文字列として使う」というチェックを強制されます。安全な受け皿だと考えてください。"
        },
        {
          type: "compare",
          bad: {
            label: "any:チェックなしで使えてしまう",
            language: "typescript",
            code: "function len(x: any) {\n  return x.length; // xが数値でもエラーなし→実行時に壊れる\n}"
          },
          good: {
            label: "unknown:確認しないと使えない",
            language: "typescript",
            code: "function len(x: unknown) {\n  if (typeof x === \"string\") {\n    return x.length; // 文字列と確認できた中だけで使える\n  }\n  return 0;\n}"
          }
        },
        {
          type: "callout",
          variant: "why",
          title: "AIプロダクトで unknown が効く場面",
          text: "AIのAPIや外部サービスから返ってくるデータは、届くまで中身が確実には分かりません。ここを any にすると想定外の形でも素通りしてしまいます。unknown で受けて「必要な形か確認してから使う」ことで、AIの応答が想定と違ったときに安全側で止められます。"
        },
        {
          type: "heading",
          text: "どうしても型が分からないときの向き合い方"
        },
        {
          type: "paragraph",
          text: "「型が分からないから any にしておこう」と思ったら、まず unknown を試します。それでも面倒なときは、AIに「この値の正しい型を書いて」と頼むのが近道です。型を捨てるのではなく、正しい型を用意する方向で考える習慣が、後々のバグを大きく減らします。"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「この any を、安全な unknown と型の絞り込み(型ガード)で書き直して」と頼むと、typeof などで確認してから使う安全な形に直してくれます。any を見つけたらこの一言、と覚えておくと便利です。"
        },
        {
          type: "list",
          ordered: false,
          items: [
            "any は型チェックを止めるので、間違いが素通りする",
            "any は周りにも広がり、型の守りに穴を空ける",
            "unknown は「確認してからでないと使えない」安全な受け皿",
            "外部やAIから来るデータは unknown で受けて確認するのが安全"
          ]
        }
      ],
      questions: [
        {
          id: "tsday1-lesson4-q1",
          type: "choice",
          question: "any と unknown の違いとして正しいものはどれ?",
          choices: [
            "any は確認してからでないと使えず、unknown は何でもそのまま使える",
            "any も unknown も型チェックを完全に無効化する点で同じ",
            "any はチェックなしで使えてしまい、unknown は型を確認してからでないと使えない",
            "unknown は実行時にエラーを投げ、any は投げない"
          ],
          answerIndex: 2,
          explanation: "any は型チェックを止めるので確認なしで使えてしまいます。unknown は typeof などで型を確認するまで使えず、安全側に倒せる点が違いです。"
        },
        {
          id: "tsday1-lesson4-q2",
          type: "choice",
          question: "外部APIやAIの応答など「届くまで形が確実でないデータ」を受け取るとき、まず選ぶべき型はどれ?",
          choices: [
            "any にして後で考える",
            "unknown で受けて、使う前に形を確認する",
            "string に決め打ちする",
            "boolean にしておく"
          ],
          answerIndex: 1,
          explanation: "形が確実でないデータは unknown で受け、typeof や条件分岐で必要な形か確認してから使うのが安全です。any だと想定外の形でも素通りしてしまいます。"
        },
        {
          id: "tsday1-lesson4-q3",
          type: "free",
          question: "なぜ any をできるだけ避けるべきなのか、初学者に説明するつもりで書いてください。",
          modelAnswer: "any を付けると、その値に対する型チェックが止まり、本来なら赤線で気づけたはずの間違いが素通りします。しかも any は周りの値にも広がり、型の守りに穴が空きます。結果として、書いた時点では気づけず実行して初めて壊れる、という一番避けたい状況になります。分からないときは unknown で受けて確認する方が安全です。",
          interviewPhrase: "実務では「any は型の穴。分からない値は unknown で受けて確認してから使う」と説明します。",
          keywords: ["any", "unknown", "型チェック", "確認"]
        }
      ]
    }
  ]
};
