import type { Day } from "@/types";

export const tsDay0: Day = {
  day: 0,
  slug: "day0",
  title: "なぜTypeScript／JSからの一歩",
  goal: "TypeScriptがAIプロダクト作りで選ばれる理由と、JavaScriptに型を足したものであることを理解し、型があると何が嬉しいかを説明できる。",
  lessons: [
    {
      id: "tsday0-lesson1",
      slug: "why-typescript-now",
      title: "なぜ今TypeScriptなのか",
      summary: "AIプロダクトを作る土台として、TypeScriptが選ばれる理由を実感する。",
      blocks: [
        { type: "heading", text: "コードは書くより「読む・直す」時間が長い" },
        { type: "paragraph", text: "プログラミングの学習というと「一から全部書く」イメージがあるかもしれません。でも実際の開発、とくにAIと一緒に作る開発では、コードを書くより「読む・確かめる・直す」時間のほうがずっと長くなります。AIが実装案を出し、あなたがそれを読んで、意図どおりか判断し、間違っていれば直す。この流れが中心になります。" },
        { type: "paragraph", text: "TypeScript(略してTS)は、この「読む・確かめる」を助けるために作られた言語です。ふだんWeb開発で使うJavaScript(略してJS)に「型(かた)」という情報を足したもので、値が数値なのか文字なのかをコードにはっきり書いておけます。" },
        { type: "callout", variant: "why", title: "なぜ型が効くのか", text: "AIは自信満々に間違えることがあります。型があると、AIが生成したコードの取り違え(数値を入れるべき所に文字を入れた等)を、実行する前に機械が指摘してくれます。あなたが全部見抜かなくても、型が最初の見張り役になります。" },
        { type: "heading", text: "AIプロダクトを作る人にこそ向いている" },
        { type: "list", items: [
          "AIが出したコードの間違いに、動かす前に気づける",
          "実装はAIに任せつつ、型で「安全な形」を決めて守れる",
          "自分のコードを人に説明しやすい(型が仕様書のかわりになる)"
        ] },
        { type: "paragraph", text: "「実装はAIに任せ、型で守り、自分の言葉で説明できる」。この状態を目指すのが、この教材のゴールです。TSはそのための共通言語になります。" },
        { type: "heading", text: "求人・現場でも標準になりつつある" },
        { type: "paragraph", text: "誇張はしませんが、Web系の新しいプロジェクトでTypeScriptを採用する例は年々増えています。ReactやNext.jsといった人気の道具もTS前提で説明されることが多く、TSが読めると学べる教材や仕事の幅が広がります。まずは「読める」ところから始めれば十分です。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このTypeScriptのコードを、プログラミング初心者向けに一行ずつ日本語で説明して。型が何を守っているかも教えて」と頼むと、読む力が早く育ちます。" }
      ],
      questions: [
        {
          id: "tsday0-lesson1-q1",
          type: "choice",
          question: "AIプロダクト作りでTypeScriptが役立つ理由として、最も適切なものはどれですか。",
          choices: [
            "コードを書く量がゼロになるから",
            "AIが生成したコードの取り違えに、実行前に気づきやすくなるから",
            "TypeScriptを使うとAIの回答が必ず正解になるから",
            "JavaScriptより実行速度が必ず速くなるから"
          ],
          answerIndex: 1,
          explanation: "TSの型は、値の取り違えなどを実行前に指摘してくれる見張り役です。AIの回答が必ず正しくなるわけでも、速度が必ず上がるわけでもありません。だからこそ型で早めに間違いを見つける価値があります。"
        },
        {
          id: "tsday0-lesson1-q2",
          type: "free",
          question: "「AIに実装を任せるのに、なぜTypeScriptを使うのか」を、初心者にも伝わるように説明してください。",
          modelAnswer: "AIは実装を速く書けますが、自信満々に間違えることもあります。TypeScriptは値が数値か文字かなどの「型」をコードに書いておける言語で、AIが型に合わない書き方をすると実行前に機械が指摘してくれます。つまり実装はAIに任せつつ、型で安全な形を守り、自分でも内容を説明できる状態を作れるからです。",
          interviewPhrase: "実務でこう説明する: 生成AIの出力は型で受け止めています。実装速度はAIに任せ、型を安全弁にして取り違えを早期に検知し、レビューでも説明できる状態を保っています。",
          keywords: ["型", "AI", "実行前", "取り違え", "説明できる"]
        }
      ]
    },
    {
      id: "tsday0-lesson2",
      slug: "javascript-minimum",
      title: "JavaScriptを最小だけ",
      summary: "変数・関数・オブジェクトという最小のJSを知り、TSがそこに型を足したものだと理解する。",
      blocks: [
        { type: "heading", text: "TypeScriptは「JavaScript + 型」" },
        { type: "paragraph", text: "TypeScriptは新しく別物を覚え直す言語ではありません。JavaScriptにそのまま「型」を足したものです。ですから、JSの基本(変数・関数・オブジェクト)を少しだけ知っておくと、TSはすっと入ってきます。ここでは最小限だけ触れます。" },
        { type: "heading", text: "変数: 値に名前をつける" },
        { type: "paragraph", text: "変数(へんすう)とは、値に名前をつけて後で使い回すための入れ物です。JSでは const(定数、あとで入れ替えない)と let(あとで入れ替える)を使います。" },
        { type: "code", language: "typescript", code: "const name = \"太郎\";\nlet count = 0;\ncount = count + 1;", caption: "constは入れ替えない値、letは入れ替える値に使う" },
        { type: "heading", text: "関数: 入力を受け取り結果を返す" },
        { type: "paragraph", text: "関数(かんすう)は、何かを受け取って処理し、結果を返す小さな機械です。受け取る値を引数(ひきすう)、返す値を戻り値と呼びます。" },
        { type: "code", language: "typescript", code: "function greet(person: string): string {\n  return \"こんにちは、\" + person;\n}\n\nconst message = greet(\"太郎\");", caption: "person: string が「引数の型」、: string が「戻り値の型」" },
        { type: "callout", variant: "info", title: "型はJSに足した部分", text: "上の person: string の : string がTypeScriptで足した「型注釈」です。これを消すとふつうのJavaScriptになります。TSはJSの上に注釈を書き足しているだけ、とイメージしてください。" },
        { type: "heading", text: "オブジェクト: 関連する値をまとめる" },
        { type: "paragraph", text: "オブジェクトは、関連する複数の値を「名前: 値」のペアでまとめた入れ物です。ユーザー1人分の情報などをひとまとめにできます。" },
        { type: "code", language: "typescript", code: "const user = {\n  name: \"太郎\",\n  age: 20,\n};\n\nconsole.log(user.name);", caption: "user.name のように「.名前」で中の値を取り出す" },
        { type: "paragraph", text: "この3つ(変数・関数・オブジェクト)がわかれば、TSのコードの大部分は読み始められます。細かい文法はAIに聞きながらで十分です。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このJavaScriptに、初心者向けにTypeScriptの型注釈を足して。どこを足したか印をつけて説明して」と頼むと、JSとTSの差分が体感できます。" }
      ],
      questions: [
        {
          id: "tsday0-lesson2-q1",
          type: "choice",
          question: "TypeScriptとJavaScriptの関係として正しいものはどれですか。",
          choices: [
            "TypeScriptはJavaScriptと無関係な、まったく別の言語",
            "TypeScriptはJavaScriptに型の情報を足したもの",
            "JavaScriptはTypeScriptから型を足して作られた",
            "両者は名前が違うだけで完全に同一のもの"
          ],
          answerIndex: 1,
          explanation: "TSはJSに型注釈などを足した言語です。型を外せばJSに近づきます。まったくの別物でも、完全に同一でもありません。この関係を押さえると学習がぐっと楽になります。"
        },
        {
          id: "tsday0-lesson2-q2",
          type: "choice",
          question: "次のコードで、TypeScriptとして「足された部分(型注釈)」はどれですか。function greet(person: string): string { return person; }",
          choices: [
            "function というキーワード",
            "person: string の : string と、() の後ろの : string",
            "return person; の部分",
            "greet という関数名"
          ],
          answerIndex: 1,
          explanation: ": string が引数と戻り値の型注釈で、TSで足された部分です。function や return、関数名はJSにも元からあります。型注釈だけを見分けられると、JSとTSの境目が見えてきます。"
        },
        {
          id: "tsday0-lesson2-q3",
          type: "free",
          question: "変数・関数・オブジェクトが、それぞれ何のためのものかを一文ずつで説明してください。",
          modelAnswer: "変数は値に名前をつけて後で使い回すための入れ物です。関数は入力(引数)を受け取り処理して結果(戻り値)を返す小さな機械です。オブジェクトは関連する複数の値を名前と値のペアでひとまとめにする入れ物です。TypeScriptはこれらにそれぞれ型を足して、扱う値の種類を明示します。",
          interviewPhrase: "実務でこう説明する: データは変数で保持し、処理は関数に切り出し、関連する値はオブジェクトにまとめます。TypeScriptではそれぞれに型を付けて、想定外の値が混ざらないようにしています。",
          keywords: ["変数", "関数", "オブジェクト", "引数", "戻り値"]
        }
      ]
    },
    {
      id: "tsday0-lesson3",
      slug: "why-types-help",
      title: "型があると何が嬉しいか",
      summary: "AIが生成したコードの取り違えを、型が実行前に見つけてくれる様子を体感する。",
      blocks: [
        { type: "heading", text: "「動かしてみて初めて壊れる」を減らす" },
        { type: "paragraph", text: "型のないコードは、間違った値を渡しても、その場では何も言われません。実際に動かして、しかもその部分が実行されたときになって初めて壊れます。AIが生成したコードだと、間違いがどこに紛れているか気づきにくく、これが厄介です。" },
        { type: "paragraph", text: "TypeScriptは値の種類を先に宣言しておくので、合わない使い方をすると実行する前(コードを書いている最中)に警告が出ます。次の比較を見てください。" },
        { type: "compare", bad: { label: "型なし(JS): 実行するまで気づけない", language: "typescript", code: "function price(count, unit) {\n  return count * unit;\n}\n\n// unitに文字列を渡してしまった(AIの取り違え)\nprice(3, \"100\"); // その場では何も言われない" }, good: { label: "型あり(TS): 書いた時点で指摘される", language: "typescript", code: "function price(count: number, unit: number): number {\n  return count * unit;\n}\n\n// 文字列 \"100\" は number ではないと警告される\nprice(3, \"100\"); // ここで赤線が出て気づける" } },
        { type: "callout", variant: "why", title: "なぜこれがAIプロダクトで効くのか", text: "AIは大量のコードを速く出します。速い分、取り違えも混ざります。型があれば、あなたが全行を精読しなくても、合わない箇所に機械が印をつけてくれます。レビューの負担が下がり、間違いが本番に流れにくくなります。" },
        { type: "heading", text: "型は「読める仕様書」にもなる" },
        { type: "paragraph", text: "型注釈は、その関数が何を受け取り何を返すのかを示す小さな仕様書です。あとから読む人(未来の自分やAI)が、中身を全部読まなくても使い方を推測できます。" },
        { type: "code", language: "typescript", code: "// 型を見るだけで「文字列を1つ受け取り、文字列を返す」とわかる\nfunction toUpper(text: string): string {\n  return text.toUpperCase();\n}", caption: "型が使い方の説明になっている" },
        { type: "list", ordered: true, items: [
          "型を書く",
          "AIに実装を書いてもらう",
          "型に合わない箇所は警告が出るので、そこを重点的に確認する",
          "説明できる状態でコミットする"
        ] },
        { type: "callout", variant: "warn", title: "型は万能ではない", text: "型が通っても、ロジック(計算の中身)が正しいとは限りません。型は「形の間違い」を防ぎますが、「意味の間違い」は防げません。動作確認とテストは別に必要です。過信は禁物です。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「この関数に型を付けて。もし呼び出し側で型が合わない箇所があれば、どこがなぜ危ないか指摘して」と頼むと、型が守ってくれる範囲がはっきりします。" }
      ],
      questions: [
        {
          id: "tsday0-lesson3-q1",
          type: "choice",
          question: "型があることの利点として、最も正確な説明はどれですか。",
          choices: [
            "コードのロジックが常に正しくなる",
            "値の種類の取り違えを、実行前に指摘してくれる",
            "テストが一切不要になる",
            "プログラムが必ず高速になる"
          ],
          answerIndex: 1,
          explanation: "型は値の種類(形)の取り違えを実行前に指摘します。ロジックの正しさやテスト不要を保証するものではありません。形は型、意味はテスト、と役割を分けて考えると誤解しません。"
        },
        {
          id: "tsday0-lesson3-q2",
          type: "free",
          question: "「型が通ればコードは完全に正しい」と言えない理由を説明してください。",
          modelAnswer: "型は値の種類、つまり形が合っているかを確認するもので、計算やロジックの意味が正しいかまでは確認しません。たとえば掛け算すべき所を足し算していても、型が数値どうしで合っていれば警告は出ません。だから型が通っても、動作確認やテストで意味の正しさを別に確かめる必要があります。",
          interviewPhrase: "実務でこう説明する: 型は形の安全弁で、意味の正しさはテストで担保しています。型チェックが通ったことと仕様どおり動くことは別問題として扱っています。",
          keywords: ["型", "形", "ロジック", "テスト", "実行前"]
        }
      ]
    },
    {
      id: "tsday0-lesson4",
      slug: "how-to-run-typescript",
      title: "環境の考え方",
      summary: "TSがどこで動くのか、まずは「読める状態」を目指せばよいことを理解する。",
      blocks: [
        { type: "heading", text: "まず知るべきは「TSはそのままでは動かない」" },
        { type: "paragraph", text: "少し意外かもしれませんが、ブラウザやサーバーはTypeScriptをそのまま実行できません。TSは最終的にJavaScriptへ変換(コンパイル)してから動きます。型注釈は変換のときに取り除かれ、実行されるのは型のないJSです。" },
        { type: "callout", variant: "info", title: "型は実行時には消える", text: "型は「開発中にあなたとAIを守るためのメモ」であって、動くプログラム本体はJSです。だから型をたくさん書いても、実行速度が重くなることはありません。" },
        { type: "heading", text: "変換する道具の名前だけ知っておく" },
        { type: "list", items: [
          "tsc: TypeScript公式の変換ツール(TypeScript Compilerの略)。TSをJSに変換する",
          "Next.js: React向けの人気フレームワーク。中でTSの変換をやってくれる",
          "オンライン実行環境: TypeScript PlaygroundなどブラウザだけでTSを試せる場所もある"
        ] },
        { type: "paragraph", text: "今の段階では、これらを自分でインストールして設定する必要はありません。名前と役割をなんとなく知っておけば十分です。実際の環境構築が必要になったら、AIに手順を聞けば案内してくれます。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「TypeScriptをブラウザだけで試したい。TypeScript Playgroundの使い方を初心者向けに教えて」と頼めば、インストール不要で手を動かせます。" },
        { type: "heading", text: "この教材のゴールは「まず読める」" },
        { type: "paragraph", text: "最初から全部を自分で書けるようになる必要はありません。この教材が目指すのは、AIが出したTypeScriptを読んで、型が何を守っているか説明でき、おかしい所に気づける状態です。書くのはそのあとで自然についてきます。" },
        { type: "compare", bad: { label: "つまずきやすい進め方", text: "最初から環境構築で完璧を目指し、設定でつまずいて先に進めない" }, good: { label: "おすすめの進め方", text: "まずコードを読めるようにし、必要になった時だけAIに聞いて環境を整える" } },
        { type: "callout", variant: "warn", title: "環境構築で止まらない", text: "初心者が最初に挫折しやすいのが環境構築です。ここは深追いせず、読む力を先に育てましょう。手を動かしたくなったらオンライン実行環境で十分です。" }
      ],
      questions: [
        {
          id: "tsday0-lesson4-q1",
          type: "choice",
          question: "TypeScriptの実行について正しい説明はどれですか。",
          choices: [
            "ブラウザはTypeScriptをそのまま実行できる",
            "TypeScriptはJavaScriptに変換されてから実行され、型は変換時に取り除かれる",
            "型注釈が多いほど実行速度が遅くなる",
            "TypeScriptはJavaScriptとは別のエンジンで直接実行される"
          ],
          answerIndex: 1,
          explanation: "TSはJSへ変換(コンパイル)されてから動き、型はそのとき取り除かれます。実行されるのは型のないJSなので、型注釈の量で実行速度が変わることもありません。型は開発中を守るためのものです。"
        },
        {
          id: "tsday0-lesson4-q2",
          type: "free",
          question: "初心者がまず「読める状態」を目指すのがよい理由を、環境構築の観点も含めて説明してください。",
          modelAnswer: "AI開発ではコードを書くより読んで確かめる時間が長く、まず読めることが実力に直結するからです。また環境構築は初心者がつまずきやすく、そこで止まると学習が進みません。TypeScriptはオンライン実行環境でも試せるので、最初は読む力を育て、必要になったらAIに聞いて環境を整えるほうが挫折しにくいです。",
          interviewPhrase: "実務でこう説明する: まずコードを読んで型が守る範囲を説明できることを重視しています。環境構築は必要になった時点で整え、学習初期は読解と検知の力づくりを優先します。",
          keywords: ["読める", "環境構築", "オンライン実行", "AI", "挫折"]
        }
      ]
    }
  ]
};
