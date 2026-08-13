import type { Day } from "@/types";

export const tsDay2: Day = {
  day: 2,
  slug: "day2",
  title: "オブジェクト・配列・型に名前をつける",
  goal: "オブジェクトと配列の型を書け、interface/typeでデータの形に名前をつけられる(APIのJSONに対応)。",
  lessons: [
    {
      id: "tsday2-lesson1",
      slug: "object-types",
      title: "オブジェクトの型",
      summary: "オブジェクト(データのまとまり)にどんなプロパティがあるかを型で書く方法を学ぶ。",
      blocks: [
        {
          type: "heading",
          text: "オブジェクトとは「名前つきのデータのまとまり」",
        },
        {
          type: "paragraph",
          text: "プログラムでは、関係するデータをひとまとめにして扱いたい場面が多いです。たとえば「ユーザー」なら、名前・年齢・メールアドレスがセットになっています。こういう「複数の値を名前つきでまとめたもの」を[[object]](オブジェクト)と呼びます。",
        },
        {
          type: "code",
          language: "typescript",
          code: "const user = {\n  name: \"田中\",\n  age: 30,\n  email: \"tanaka@example.com\",\n};",
          caption: "オブジェクトの例。{ } の中に「キー: 値」を並べる",
        },
        {
          type: "paragraph",
          text: "このオブジェクトが「どんな形なのか」を型で表せます。プロパティごとに型をつけるのが、オブジェクトの型注釈です。",
        },
        {
          type: "code",
          language: "typescript",
          code: "const user: { name: string; age: number; email: string } = {\n  name: \"田中\",\n  age: 30,\n  email: \"tanaka@example.com\",\n};",
          caption: "{ プロパティ名: 型; ... } の形でオブジェクトの型を書く",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ形を型にするのか",
          text: "型があると、user.name は文字列、user.age は数値、と決まります。存在しない user.nema(タイプミス)を書くとエディタが赤線で教えてくれます。データの形をあらかじめ約束しておくことで、間違ったアクセスをその場で防げます。",
        },
        {
          type: "compare",
          bad: {
            label: "型がないと気づけない",
            code: "const user = { name: \"田中\", age: 30 };\nconsole.log(user.nema); // undefined になるだけ。実行するまで気づかない",
            language: "typescript",
          },
          good: {
            label: "型があるとその場で分かる",
            code: "const user: { name: string; age: number } = { name: \"田中\", age: 30 };\nconsole.log(user.nema); // エラー: nema は存在しない",
            language: "typescript",
          },
        },
        {
          type: "paragraph",
          text: "存在しないプロパティを追加しようとしたり、型の合わない値を入れようとしても、TypeScriptが止めてくれます。次のコードはどちらもエラーになります。",
        },
        {
          type: "code",
          language: "typescript",
          code: "const user: { name: string; age: number } = {\n  name: \"田中\",\n  age: \"30\", // エラー: age は number なのに文字列を入れている\n};",
          caption: "型が合わないとその場でエラーになる",
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「このオブジェクトの型注釈を書いて」とAIに頼めば、形に合った型を提案してくれます。あなたは提案された型を読んで、プロパティ名や型が実際のデータと合っているかを確認するだけで済みます。実装はAIに任せ、型で守り、内容を説明できるようにしておくのが狙いです。",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "オブジェクトは { キー: 値 } でデータをまとめたもの",
            "型は { プロパティ名: 型; ... } の形で書く",
            "存在しないプロパティや型違いはその場でエラーになる",
          ],
        },
      ],
      questions: [
        {
          id: "tsday2-lesson1-q1",
          type: "choice",
          question: "オブジェクト { name: string; age: number } 型の変数に対して、正しいアクセスはどれですか。",
          choices: [
            "user.age = \"25\" と文字列を代入する",
            "user.name で文字列を取り出す",
            "user.email でメールを取り出す",
            "user[0] で最初の値を取り出す",
          ],
          answerIndex: 1,
          explanation: "この型には name(string)と age(number)しかありません。user.name は文字列として取り出せます。age に文字列を入れるのは型違い、email は存在しないプロパティ、user[0] は配列のようなアクセスでオブジェクトには使えません。",
        },
        {
          id: "tsday2-lesson1-q2",
          type: "free",
          question: "オブジェクトに型をつけると、型をつけない場合と比べてどんな間違いを早く防げますか。",
          modelAnswer: "存在しないプロパティへのアクセス(タイプミスなど)や、プロパティに型の合わない値を入れる間違いを、実行前にエディタ上で検出できます。型がないと undefined が返るだけで、実行して初めて不具合に気づくことになります。",
          interviewPhrase: "実務では「オブジェクトに型を付けておくと、プロパティ名のタイプミスや値の型ミスをエディタが即座に指摘してくれるので、実行前にバグを潰せます」と説明します。",
          keywords: ["プロパティ", "タイプミス", "型違い", "実行前"],
        },
      ],
    },
    {
      id: "tsday2-lesson2",
      slug: "interface-and-type",
      title: "interfaceとtype(データの形に名前をつける)",
      summary: "毎回長い型を書くのをやめ、interfaceやtypeでデータの形に名前をつけて再利用する。",
      blocks: [
        {
          type: "heading",
          text: "同じ形を何度も書くのは大変",
        },
        {
          type: "paragraph",
          text: "前のレッスンで { name: string; age: number; email: string } という型を書きました。でも、この形のユーザーを何箇所でも使うたびに同じ型を書き直すのは面倒で、間違いのもとです。そこで「この形に名前をつけて再利用する」仕組みが[[interface]]と[[type]]です。",
        },
        {
          type: "code",
          language: "typescript",
          code: "interface User {\n  name: string;\n  age: number;\n  email: string;\n}\n\nconst user: User = {\n  name: \"田中\",\n  age: 30,\n  email: \"tanaka@example.com\",\n};",
          caption: "interface で User という名前の形を定義し、それを型として使う",
        },
        {
          type: "paragraph",
          text: "interface User { ... } は「User という形はこういうプロパティを持つ」という約束です。一度定義すれば、User と書くだけでその形を指せます。",
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「このJSONに対応する interface を作って」とAIに頼むと、形に合った User のような型を一発で作ってくれます。あなたはプロパティ名と型が実際のデータと合っているかを確認します。型に名前があると、AIとの会話でも『User型を渡して』のように短く正確に指示できます。",
        },
        {
          type: "heading",
          text: "type でも同じことができる",
        },
        {
          type: "paragraph",
          text: "type というキーワードでも、形に名前をつけられます。オブジェクトの形に名前をつける用途では、interface とほぼ同じように使えます。",
        },
        {
          type: "code",
          language: "typescript",
          code: "type User = {\n  name: string;\n  age: number;\n  email: string;\n};\n\nconst user: User = { name: \"田中\", age: 30, email: \"tanaka@example.com\" };",
          caption: "type でも同じ User を定義できる。= が付く点に注意",
        },
        {
          type: "compare",
          bad: {
            label: "名前をつけないと重複する",
            code: "function greet(u: { name: string; age: number }) {}\nfunction save(u: { name: string; age: number }) {}\n// 同じ形を何度も手書き。片方だけ直すと不整合",
            language: "typescript",
          },
          good: {
            label: "名前をつけると一箇所で管理",
            code: "interface User { name: string; age: number }\nfunction greet(u: User) {}\nfunction save(u: User) {}\n// User を直せば全部に反映される",
            language: "typescript",
          },
        },
        {
          type: "callout",
          variant: "info",
          title: "interfaceとtypeどちらを使う",
          text: "オブジェクトの形に名前をつけるだけなら、どちらを使っても構いません。この教材ではデータの形は interface を中心に使います。type は後で出てくる複数の型を組み合わせる場面(union など)で力を発揮します。まずは「形に名前をつける道具が2つある」と覚えておけば十分です。",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "interface や type で、データの形に名前をつけられる",
            "一度定義すれば、その名前を型として何度でも使える",
            "形を一箇所で管理できるので、変更に強く間違いが減る",
          ],
        },
        {
          type: "callout",
          variant: "warn",
          title: "定義と使う場所を混同しない",
          text: "interface User { ... } は「型の定義」で、値そのものではありません。実際のデータ(値)は const user: User = { ... } のように別に用意します。型は設計図、値は実際の中身、という関係です。",
        },
      ],
      questions: [
        {
          id: "tsday2-lesson2-q1",
          type: "choice",
          question: "interface や type を使って型に名前をつける主な利点はどれですか。",
          choices: [
            "プログラムの実行速度が速くなる",
            "同じ形の型を再利用でき、変更を一箇所で管理できる",
            "オブジェクトのメモリ使用量が減る",
            "コメントを書かなくてよくなる",
          ],
          answerIndex: 1,
          explanation: "interface や type は、データの形に名前をつけて再利用するための仕組みです。同じ形を何度も手書きせずに済み、定義を直せば使っている全箇所に反映されます。実行速度やメモリには影響しません(型は実行時には消えます)。",
        },
        {
          id: "tsday2-lesson2-q2",
          type: "choice",
          question: "次のうち、type を使った正しい定義はどれですか。",
          choices: [
            "type User { name: string }",
            "type User = { name: string };",
            "interface User = { name: string };",
            "type User: { name: string }",
          ],
          answerIndex: 1,
          explanation: "type は type 名前 = 型; のように = を使って書きます。interface は = を使いません(interface User { ... })。この違いは書き間違えやすいので、type には =、interface には = なし、と覚えておくとよいです。",
        },
        {
          id: "tsday2-lesson2-q3",
          type: "free",
          question: "APIから受け取るユーザーデータに interface で名前をつけておくと、開発中にどんな場面で役立ちますか。",
          modelAnswer: "受け取ったデータを関数の引数にしたり、画面に表示したりする各所で User 型を指定でき、プロパティ名や型のズレを自動でチェックできます。APIの形が変わったときも interface を一箇所直せば、影響する箇所がすべてエラーで示され、修正漏れを防げます。",
          interviewPhrase: "実務では「APIのレスポンス形状を interface で定義しておくと、その型を使い回して整合性を保てるし、仕様変更のときも一箇所直せば影響範囲がエラーで洗い出せます」と説明します。",
          keywords: ["再利用", "一箇所", "仕様変更", "影響範囲"],
        },
      ],
    },
    {
      id: "tsday2-lesson3",
      slug: "arrays-and-nested-objects",
      title: "配列とオブジェクトの組み合わせ(APIのJSONを型で表す)",
      summary: "配列の型と、オブジェクトが入れ子になったデータの型を書き、実際のJSONに対応させる。",
      blocks: [
        {
          type: "heading",
          text: "配列は「同じ型の値が並んだもの」",
        },
        {
          type: "paragraph",
          text: "[[array]](配列)は、同じ種類の値を順番に並べたものです。型は「要素の型 + []」で書きます。string[] は文字列の配列、number[] は数値の配列です。",
        },
        {
          type: "code",
          language: "typescript",
          code: "const names: string[] = [\"田中\", \"佐藤\", \"鈴木\"];\nconst scores: number[] = [80, 92, 75];",
          caption: "文字列の配列と数値の配列",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ配列にも型が要るのか",
          text: "string[] と決めておけば、うっかり数値を混ぜたときにエラーになります。また names の中身は必ず文字列だと分かるので、names[0].length のような文字列向けの操作を安心して書けます。中身の型が保証されるのが配列の型注釈の価値です。",
        },
        {
          type: "heading",
          text: "オブジェクトの配列でAPIのJSONを表す",
        },
        {
          type: "paragraph",
          text: "実際のAPIは「ユーザーの一覧」のように、オブジェクトが並んだ配列を返すことがよくあります。これは User[] のように、interface の名前に [] をつけて表せます。",
        },
        {
          type: "code",
          language: "typescript",
          code: "interface User {\n  id: number;\n  name: string;\n}\n\nconst users: User[] = [\n  { id: 1, name: \"田中\" },\n  { id: 2, name: \"佐藤\" },\n];",
          caption: "User[] は「User が並んだ配列」を表す",
        },
        {
          type: "paragraph",
          text: "さらにAPIのJSONは、オブジェクトの中にオブジェクトや配列が入る「入れ子(ネスト)」になることがあります。次のようなJSONを考えます。",
        },
        {
          type: "code",
          language: "typescript",
          code: "{\n  \"id\": 1,\n  \"name\": \"田中\",\n  \"profile\": { \"age\": 30, \"city\": \"東京\" },\n  \"tags\": [\"admin\", \"active\"]\n}",
          caption: "入れ子になったJSONの例(profile はオブジェクト、tags は文字列配列)",
        },
        {
          type: "paragraph",
          text: "このJSONの形は、interface を組み合わせて次のように表せます。profile は別の interface に切り出すと読みやすくなります。",
        },
        {
          type: "code",
          language: "typescript",
          code: "interface Profile {\n  age: number;\n  city: string;\n}\n\ninterface User {\n  id: number;\n  name: string;\n  profile: Profile;\n  tags: string[];\n}",
          caption: "入れ子のJSONに対応する型。profile は Profile 型、tags は string[]",
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「このJSONに対応するTypeScriptの型を作って」とサンプルのJSONを貼って頼めば、入れ子まで含めた interface を作ってくれます。あなたは、切り出された Profile のような型が妥当か、配列とオブジェクトの区別が合っているかを確認します。型で守られていれば、後でAIが書いた処理コードのミスにも早く気づけます。",
        },
        {
          type: "compare",
          bad: {
            label: "型なしでJSONを扱う",
            code: "const user = getUser(); // 型が any(なんでもあり)\nconsole.log(user.profile.age); // age のはずが age と書けてしまう…つづりミスに気づけない",
            language: "typescript",
          },
          good: {
            label: "型ありでJSONを扱う",
            code: "const user: User = getUser();\nconsole.log(user.profile.age); // profile が Profile 型なので age 以外は赤線",
            language: "typescript",
          },
        },
        {
          type: "list",
          ordered: false,
          items: [
            "配列の型は「要素の型 + []」(例: string[]、User[])",
            "オブジェクトの配列で API のユーザー一覧などを表せる",
            "入れ子のJSONは interface を組み合わせて表す",
            "profile のような部分は別の interface に切り出すと読みやすい",
          ],
        },
      ],
      questions: [
        {
          id: "tsday2-lesson3-q1",
          type: "choice",
          question: "「User というオブジェクトが並んだ配列」を表す型はどれですか。",
          choices: [
            "User",
            "User[]",
            "[]User",
            "Array<User, number>",
          ],
          answerIndex: 1,
          explanation: "配列の型は「要素の型 + []」で書きます。User が並んだ配列は User[] です。User は単体、[]User という書き方はなく、Array<User, number> のような二引数の書き方も誤りです(正しくは Array<User> とも書けますが、この選択肢は形が不正です)。",
        },
        {
          id: "tsday2-lesson3-q2",
          type: "choice",
          question: "次のJSONに対応する型として最も適切なのはどれですか。 { \"id\": 1, \"tags\": [\"a\", \"b\"] }",
          choices: [
            "{ id: string; tags: string }",
            "{ id: number; tags: string[] }",
            "{ id: number; tags: string }",
            "{ id: number[]; tags: string[] }",
          ],
          answerIndex: 1,
          explanation: "id は数値なので number、tags は文字列が並んだ配列なので string[] です。id を string にしたり、tags を配列でない string にしたりするのは、実際のデータの形と合いません。",
        },
        {
          id: "tsday2-lesson3-q3",
          type: "free",
          question: "APIが返す入れ子のJSONに対して型を用意しておくと、AIに実装を任せるうえでどんな安心につながりますか。",
          modelAnswer: "型があると、AIが生成したデータ処理コードが存在しないプロパティを参照したり、配列とオブジェクトを取り違えたりしたときに、その場でエラーとして表示されます。JSONの形を型で固定しておくことで、AIの出力を目視で全部追わなくても、形のズレを機械的に検出できます。",
          interviewPhrase: "実務では「レスポンスの形を型で定義しておけば、AIが書いた処理のプロパティ名ミスやネストの取り違えをコンパイラが弾いてくれるので、生成コードを安心してレビューできます」と説明します。",
          keywords: ["入れ子", "プロパティ", "検出", "生成コード"],
        },
      ],
    },
    {
      id: "tsday2-lesson4",
      slug: "optional-and-readonly",
      title: "オプショナル(?)と読み取り専用(readonly)",
      summary: "あってもなくてもよいプロパティを ? で、書き換え禁止のプロパティを readonly で表す。",
      blocks: [
        {
          type: "heading",
          text: "あるかもしれないし、ないかもしれないプロパティ",
        },
        {
          type: "paragraph",
          text: "実際のデータでは「値があるとは限らない」プロパティがあります。たとえばユーザーの電話番号は、登録している人もいれば、していない人もいます。こういう「あってもなくてもよい」プロパティは、名前のうしろに ? をつけて表します。これを[[optional]](オプショナル)と呼びます。",
        },
        {
          type: "code",
          language: "typescript",
          code: "interface User {\n  name: string;\n  phone?: string; // ? があるので、あってもなくてもよい\n}\n\nconst a: User = { name: \"田中\", phone: \"090-0000-0000\" }; // OK\nconst b: User = { name: \"佐藤\" }; // phone なしでもOK",
          caption: "phone? は省略してもよいプロパティ",
        },
        {
          type: "callout",
          variant: "warn",
          title: "オプショナルは「undefinedかもしれない」",
          text: "phone? があるプロパティは、値が入っていない場合 undefined(値なし)になります。そのため user.phone.length のようにいきなり中身を触ると、値がないときにエラーになります。使う前に「値があるか」を確認するのが基本です。次の例で確認します。",
        },
        {
          type: "compare",
          bad: {
            label: "確認せずに使う",
            code: "function show(u: User) {\n  return u.phone.length; // エラー: phone は undefined かもしれない\n}",
            language: "typescript",
          },
          good: {
            label: "あるか確認してから使う",
            code: "function show(u: User) {\n  if (u.phone) {\n    return u.phone.length; // ここでは phone があると分かっている\n  }\n  return 0;\n}",
            language: "typescript",
          },
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ ? が便利なのか",
          text: "? を使うと「このプロパティは無いことがある」という現実をそのまま型に書けます。すると TypeScript が「無い場合の処理を書き忘れていないか」を見張ってくれます。値の有無を型で明示することが、実行時のエラーを未然に防ぎます。",
        },
        {
          type: "heading",
          text: "書き換えてほしくないプロパティは readonly",
        },
        {
          type: "paragraph",
          text: "逆に、一度決めたら変えてほしくないプロパティもあります。たとえばユーザーの id は途中で変わると困ります。プロパティの前に readonly をつけると、あとから書き換えられなくなります。",
        },
        {
          type: "code",
          language: "typescript",
          code: "interface User {\n  readonly id: number;\n  name: string;\n}\n\nconst user: User = { id: 1, name: \"田中\" };\nuser.name = \"佐藤\"; // OK(name は書き換え可能)\nuser.id = 2; // エラー: id は readonly なので書き換えられない",
          caption: "readonly id は後から変更できない",
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう使う",
          text: "「id は変更されないはずだから readonly にして、phone は任意入力だから ? にして」とAIに伝えると、意図どおりの型を作ってくれます。? と readonly でデータのルール(任意なのか、固定なのか)を型に書いておけば、AIが書いた処理がそのルールを破ったときに自動で止められます。",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "? は「あってもなくてもよい」プロパティ(オプショナル)",
            "オプショナルは値がないと undefined になるので、使う前に有無を確認する",
            "readonly は「後から書き換えられない」プロパティ",
            "? と readonly でデータのルールを型に書き込める",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "この2日間のまとめ",
          text: "Day2 では、オブジェクトと配列に型をつけ、interface でデータの形に名前をつけ、APIのJSONを型で表す方法を学びました。? と readonly でプロパティのルールまで書けるようになりました。これで「実装はAIに任せ、型で守り、自分の言葉で説明する」土台ができています。",
        },
      ],
      questions: [
        {
          id: "tsday2-lesson4-q1",
          type: "choice",
          question: "interface のプロパティに phone?: string と書いたとき、正しい説明はどれですか。",
          choices: [
            "phone は必ず入力しなければならない",
            "phone は省略でき、無い場合は undefined になりうる",
            "phone は後から書き換えられない",
            "phone は文字列以外も入れられる",
          ],
          answerIndex: 1,
          explanation: "プロパティ名のうしろの ? はオプショナルを表し、そのプロパティを省略できることを意味します。省略した場合、値は undefined になります。必須になるわけでも、書き換え禁止(readonly)になるわけでもありません。",
        },
        {
          id: "tsday2-lesson4-q2",
          type: "choice",
          question: "readonly id: number と定義したプロパティに対して起きることはどれですか。",
          choices: [
            "id を省略できるようになる",
            "id に数値以外を入れられるようになる",
            "後から user.id = 2 のように書き換えるとエラーになる",
            "id が自動的に連番になる",
          ],
          answerIndex: 2,
          explanation: "readonly は「初期化のあとは書き換え不可」を意味します。最初に値を設定することはできますが、後から代入し直そうとするとエラーになります。省略可(?)や自動連番とは無関係で、型(number)も変わりません。",
        },
        {
          id: "tsday2-lesson4-q3",
          type: "free",
          question: "オプショナル(?)なプロパティを扱うとき、なぜ「値があるか確認してから使う」必要があるのですか。",
          modelAnswer: "オプショナルなプロパティは値が入っていない(undefined の)場合があり、その状態でいきなり中身を操作すると実行時にエラーになります。TypeScript は undefined の可能性を型で示すので、if などで値の有無を確認してから使うことで、値がないケースを安全に処理できます。",
          interviewPhrase: "実務では「オプショナルなフィールドは undefined になりうるので、if や早期リターンで存在チェックしてから触る。そうしないと値なしの場合に落ちるからです」と説明します。",
          keywords: ["undefined", "存在チェック", "実行時エラー", "安全"],
        },
      ],
    },
  ],
};
