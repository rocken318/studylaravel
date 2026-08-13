import type { Day } from "@/types";

export const tsDay3: Day = {
  day: 3,
  slug: "day3",
  title: "ユニオン・絞り込み・ジェネリクス(読める範囲で)",
  goal: "ユニオン型・リテラル型・型の絞り込みを理解し、Array<T>やPromise<T>などジェネリクスを読める。",
  lessons: [
    {
      id: "tsday3-lesson1",
      slug: "union-and-literal-types",
      title: "ユニオン型(A | B)とリテラル型",
      summary: "「AかBのどちらか」を表すユニオン型と、値そのものを型にするリテラル型を学ぶ。",
      blocks: [
        {
          type: "heading",
          text: "「どちらか」を型で表す"
        },
        {
          type: "paragraph",
          text: "現実のデータは「文字列のときもあれば数値のときもある」「3つの状態のどれか」といった形をよく取ります。こういう「AかBのどちらか」を1つの型で表すのがユニオン型です。書き方は縦棒 | でつなぐだけで、[[union]] と呼びます。"
        },
        {
          type: "code",
          language: "typescript",
          code: "// id は「文字列」または「数値」のどちらか\nlet id: string | number;\n\nid = \"abc123\"; // OK\nid = 42;       // OK\nid = true;     // エラー: boolean は string でも number でもない",
          caption: "string | number は「文字列か数値のどちらか」を表す"
        },
        {
          type: "paragraph",
          text: "さらに強力なのがリテラル型です。ふつう型は string のように「文字列全般」を表しますが、リテラル型は \"success\" のように「その値そのもの」を型にします。これをユニオンと組み合わせると「決まった選択肢のどれか」を表現できます。"
        },
        {
          type: "code",
          language: "typescript",
          code: "// status は「この3つの文字列のどれか」しか受け付けない\ntype Status = \"idle\" | \"loading\" | \"done\";\n\nlet s: Status = \"loading\"; // OK\ns = \"done\";                // OK\ns = \"finished\";            // エラー: 3つの選択肢に無い",
          caption: "リテラル型のユニオンで「決まった選択肢」を表現する"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜリテラル型が便利なのか",
          text: "AIに状態管理のコードを書かせると、\"loading\" のつもりで \"Loading\" や \"loding\" と綴りがブレることがあります。リテラル型で選択肢を固定しておくと、こうしたタイプミスをその場で赤線として検出でき、実行する前に気づけます。"
        },
        {
          type: "compare",
          bad: {
            label: "型が広すぎる",
            text: "string にすると何でも入り、綴りミスを見逃す",
            language: "typescript",
            code: "let status: string = \"lodaing\"; // ミスに気づけない"
          },
          good: {
            label: "選択肢を固定",
            text: "リテラル型なら許されない値は即エラー",
            language: "typescript",
            code: "type Status = \"idle\" | \"loading\" | \"done\";\nlet status: Status = \"lodaing\"; // エラーで即発覚"
          }
        },
        {
          type: "list",
          ordered: false,
          items: [
            "ユニオン型: A | B と書き「AかBのどちらか」を表す",
            "リテラル型: \"success\" や 200 のように「値そのもの」を型にする",
            "両者を組み合わせると「決まった選択肢のどれか」を安全に表現できる"
          ]
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「このボタンの状態は idle / loading / done の3つだけ。これをリテラル型のユニオンで表して、状態に応じて表示を切り替えるコードを書いて」と伝えると、選択肢が固定された安全なコードが返ってきます。"
        }
      ],
      questions: [
        {
          id: "tsday3-lesson1-q1",
          type: "choice",
          question: "type Result = \"ok\" | \"error\"; と定義したとき、代入できないものはどれ?",
          choices: [
            "\"ok\"",
            "\"error\"",
            "\"OK\"",
            "上のどれも代入できる"
          ],
          answerIndex: 2,
          explanation: "リテラル型は値そのものを見るため、大文字小文字も区別します。\"OK\" は \"ok\" とは別物なのでエラーになります。この厳密さがタイプミス検出に役立ちます。"
        },
        {
          id: "tsday3-lesson1-q2",
          type: "choice",
          question: "ユニオン型 string | number の変数に対して、安全に代入できる値はどれ?",
          choices: [
            "true",
            "\"hello\"",
            "{ x: 1 }",
            "[1, 2, 3]"
          ],
          answerIndex: 1,
          explanation: "string | number は文字列か数値のどちらかだけを許します。\"hello\" は文字列なのでOK。boolean・オブジェクト・配列はどちらでもないためエラーです。"
        },
        {
          id: "tsday3-lesson1-q3",
          type: "free",
          question: "リテラル型のユニオン(例: \"idle\" | \"loading\" | \"done\")を使うと、なぜバグを早く見つけられるのか説明してください。",
          modelAnswer: "リテラル型のユニオンは、取りうる値をあらかじめ決まった選択肢に限定します。そのため、綴りミスや想定外の値を代入した瞬間に型エラーとして検出され、実行する前にエディタ上で気づけます。string のように広い型だと何でも入ってしまい、間違った値でも実行するまで問題に気づけません。",
          interviewPhrase: "実務では「状態はリテラル型のユニオンで固定して、想定外の値をコンパイル時に弾いています」と説明します。",
          keywords: ["リテラル型", "ユニオン", "選択肢を限定", "綴りミス", "コンパイル時"]
        }
      ]
    },
    {
      id: "tsday3-lesson2",
      slug: "narrowing",
      title: "型の絞り込み(narrowing)",
      summary: "ユニオン型を安全に扱うため、条件分岐で型を1つに絞り込む方法を学ぶ。",
      blocks: [
        {
          type: "heading",
          text: "ユニオン型はそのままだと使いにくい"
        },
        {
          type: "paragraph",
          text: "string | number という値があるとき、いきなり文字列専用のメソッドを呼ぶことはできません。文字列かもしれないし数値かもしれないからです。そこで if などで条件を確認し、その分岐の中では「今は文字列だ」と型を1つに狭めます。これを型の絞り込み(narrowing)と呼びます。"
        },
        {
          type: "code",
          language: "typescript",
          code: "function format(value: string | number): string {\n  if (typeof value === \"string\") {\n    // このブロックの中では value は string 扱い\n    return value.toUpperCase();\n  }\n  // ここまで来たら value は number 扱い\n  return value.toFixed(2);\n}",
          caption: "typeof で分岐すると、各ブロック内で型が絞り込まれる"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ絞り込みが必要か",
          text: "TypeScriptは「まだ文字列か数値か分からない値」に対して、文字列専用の操作を許しません。もし許すと、数値のときに toUpperCase() を呼んで実行時エラーになるからです。絞り込みは「今この分岐では安全に使える」ことを型で証明する仕組みです。"
        },
        {
          type: "paragraph",
          text: "絞り込みの手段はいくつかあります。値の種類を調べる typeof、リテラル型を直接比較する ===、値が存在するかを確認する if などです。特にリテラルのユニオンでは === が主役になります。"
        },
        {
          type: "code",
          language: "typescript",
          code: "type Status = \"idle\" | \"loading\" | \"done\";\n\nfunction label(status: Status): string {\n  if (status === \"loading\") {\n    return \"読み込み中...\";\n  }\n  if (status === \"done\") {\n    return \"完了しました\";\n  }\n  return \"待機中\"; // ここでは status は \"idle\" に絞られている\n}",
          caption: "リテラルのユニオンは === で1つずつ絞り込む"
        },
        {
          type: "compare",
          bad: {
            label: "絞り込まずに使う",
            text: "文字列か数値か分からないまま操作しようとする",
            language: "typescript",
            code: "function f(v: string | number) {\n  return v.toUpperCase(); // エラー: number には無い\n}"
          },
          good: {
            label: "絞り込んでから使う",
            text: "typeof で確認した分岐の中でだけ操作する",
            language: "typescript",
            code: "function f(v: string | number) {\n  if (typeof v === \"string\") return v.toUpperCase();\n  return String(v);\n}"
          }
        },
        {
          type: "callout",
          variant: "warn",
          title: "「値があるか」の確認も絞り込み",
          text: "string | undefined のような型では、いきなり使うとエラーになります。if (value) { ... } のように存在を確認すると、その中では undefined が除かれた型に絞り込まれます。AIが生成したコードで赤線が出たら、多くはこの確認が抜けているのが原因です。"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「この関数の引数は string | number。分岐で型を絞り込んで、それぞれ適切に処理して」と頼むと、typeof を使った安全な分岐を書いてくれます。赤線が残ったら「絞り込みが足りない箇所を教えて」と続けて聞きましょう。"
        }
      ],
      questions: [
        {
          id: "tsday3-lesson2-q1",
          type: "choice",
          question: "value: string | number に対して value.toFixed(2) を安全に呼ぶには、どの絞り込みが必要?",
          choices: [
            "if (typeof value === \"string\") の中で呼ぶ",
            "if (typeof value === \"number\") の中で呼ぶ",
            "絞り込みは不要でそのまま呼べる",
            "if (value) の中なら型に関係なく呼べる"
          ],
          answerIndex: 1,
          explanation: "toFixed は数値のメソッドです。typeof value === \"number\" で絞り込んだ分岐の中なら value は number 扱いになり、安全に呼べます。"
        },
        {
          id: "tsday3-lesson2-q2",
          type: "choice",
          question: "型の絞り込み(narrowing)を最もよく表しているのはどれ?",
          choices: [
            "ユニオン型を別の名前に付け替えること",
            "条件分岐によって、その分岐内で型をより具体的な1つに狭めること",
            "型注釈を消してTypeScriptに推論させること",
            "複数の型を | でつなげること"
          ],
          answerIndex: 1,
          explanation: "絞り込みは、typeof や === などの条件でユニオン型を確認し、その分岐の内側で型をより具体的な形に狭める仕組みです。"
        },
        {
          id: "tsday3-lesson2-q3",
          type: "free",
          question: "string | undefined 型の値をそのまま使うと赤線が出ます。なぜ出るのか、どう対処するのかを説明してください。",
          modelAnswer: "値が undefined かもしれない状態では、文字列としての操作が安全とは限らないため型エラーになります。if (value) や if (value !== undefined) で存在を確認すると、その分岐の中では undefined が除かれて string に絞り込まれ、安全に使えます。これも型の絞り込みの一種です。",
          interviewPhrase: "実務では「undefined の可能性がある値は、存在チェックで絞り込んでから使うようにしています」と説明します。",
          keywords: ["undefined", "絞り込み", "存在チェック", "if", "型エラー"]
        }
      ]
    },
    {
      id: "tsday3-lesson3",
      slug: "reading-generics",
      title: "ジェネリクスの読み方(Array<T>, Promise<T>)",
      summary: "Array<T> や Promise<T> の <T> が「中身の型を差し込む穴」であることを読めるようになる。",
      blocks: [
        {
          type: "heading",
          text: "<T> は「中身の型を差し込む穴」"
        },
        {
          type: "paragraph",
          text: "TypeScriptのコードを読むと Array<string> や Promise<User> のように、山かっこ <> の付いた型をよく見ます。この <> の中身は「後から差し込む型」を表し、この仕組みをジェネリクスと呼びます。まずは書く側ではなく、読める側になることを目標にします。"
        },
        {
          type: "paragraph",
          text: "Array<T> は「T という型の値が並んだ配列」を意味します。T の部分に実際の型を入れると、中身が何の配列かが決まります。string[] という書き方は Array<string> と同じ意味です。"
        },
        {
          type: "code",
          language: "typescript",
          code: "// どちらも「文字列の配列」を表す。同じ意味\nlet names1: Array<string> = [\"a\", \"b\"];\nlet names2: string[] = [\"a\", \"b\"];\n\n// 数値の配列\nlet scores: Array<number> = [80, 95];\n\n// ユーザーの配列(User は自分で定義した型のイメージ)\n// let users: Array<User> = [...];",
          caption: "Array<T> の T に入れた型が、配列の中身の型になる"
        },
        {
          type: "paragraph",
          text: "非同期処理でよく出るのが Promise<T> です。Promise は「今すぐには結果が無いが、あとで T 型の値が得られる約束」を表します。await を付けると、その中身の T が取り出せます。[[async]] や [[await]] と一緒に必ず登場します。"
        },
        {
          type: "code",
          language: "typescript",
          code: "// getUser は「あとで User が得られる約束」を返す\nasync function getUser(): Promise<User> {\n  const res = await fetch(\"/api/user\");\n  return res.json();\n}\n\n// await すると Promise<User> の中身 User が取り出される\nconst user: User = await getUser();\n\ntype User = { id: number; name: string };",
          caption: "Promise<User> は「あとで User が得られる」型。await で中身を取り出す"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ <T> の読み方が大事か",
          text: "AIが生成した非同期コードの返り値は、ほぼ必ず Promise<何か> の形をしています。この <何か> を読めれば、await した後に何が手に入るのかが分かり、その先の処理が正しいか自分で判断できます。実装はAIに任せても、型を読めれば説明できます。"
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Array<T> は「T が並んだ配列」。string[] と Array<string> は同じ",
            "Promise<T> は「あとで T が得られる約束」。await で中身の T を取り出す",
            "<> の中身は「差し込まれた型」だと読む。まずは読めれば十分"
          ]
        },
        {
          type: "compare",
          bad: {
            label: "中身を読み違える",
            text: "Promise<User[]> を User だと思って1件用に処理する",
            language: "typescript",
            code: "const users = await getUsers(); // Promise<User[]>\nconsole.log(users.name); // エラー: 配列に name は無い"
          },
          good: {
            label: "中身を正しく読む",
            text: "User[] だと分かれば配列として扱える",
            language: "typescript",
            code: "const users = await getUsers(); // User[]\nconsole.log(users[0].name); // OK"
          }
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "型が読めないときは「この関数の返り値 Promise<User[]> って、await した後は何になるの?」と聞けば、User の配列だと説明してくれます。<> の中身が分からないときの最短の確認方法です。"
        }
      ],
      questions: [
        {
          id: "tsday3-lesson3-q1",
          type: "choice",
          question: "Array<number> と同じ意味の書き方はどれ?",
          choices: [
            "number{}",
            "number[]",
            "[number]",
            "<number>"
          ],
          answerIndex: 1,
          explanation: "Array<number> と number[] はどちらも「数値の配列」を表す同じ意味の書き方です。[number] は要素が1つの数値だけのタプルという別物です。"
        },
        {
          id: "tsday3-lesson3-q2",
          type: "choice",
          question: "async function f(): Promise<string> の返り値を await したとき、得られる値の型はどれ?",
          choices: [
            "Promise<string>",
            "string",
            "string[]",
            "void"
          ],
          answerIndex: 1,
          explanation: "await は Promise<T> の中身 T を取り出します。Promise<string> を await すれば string が得られます。"
        },
        {
          id: "tsday3-lesson3-q3",
          type: "free",
          question: "Promise<User[]> という型を、日本語で噛み砕いて説明してください。await した後に何が得られるかも含めてください。",
          modelAnswer: "Promise<User[]> は「今すぐには結果が無いが、あとで User の配列が得られる約束」という意味です。Promise が非同期の約束を表し、その中身 User[] が最終的に得られる値の型です。await を付けると中身が取り出され、User[](Userの配列)が得られます。",
          interviewPhrase: "実務では「この関数はあとでUserの配列を返すので、awaitして配列としてループします」と説明します。",
          keywords: ["Promise", "非同期", "配列", "await", "中身の型"]
        }
      ]
    },
    {
      id: "tsday3-lesson4",
      slug: "handy-utility-types",
      title: "実務で出る便利な型の触り(Record, Partial など)",
      summary: "Record や Partial など、既存の型から新しい型を作るユーティリティ型を読める範囲で知る。",
      blocks: [
        {
          type: "heading",
          text: "既存の型から新しい型を作る"
        },
        {
          type: "paragraph",
          text: "TypeScriptには、すでにある型を元に別の型を組み立てる「ユーティリティ型」が用意されています。これも <> を使うジェネリクスの一種です。ここでは実務でよく見る Record と Partial を、読める範囲で押さえます。"
        },
        {
          type: "paragraph",
          text: "Record<K, V> は「キーが K 型、値が V 型のオブジェクト」を表します。たとえば「文字列のキーに数値がぶら下がった辞書」を Record<string, number> と書けます。"
        },
        {
          type: "code",
          language: "typescript",
          code: "// 商品名(文字列)ごとに在庫数(数値)を持つ辞書\nconst stock: Record<string, number> = {\n  apple: 3,\n  banana: 5,\n};\n\nstock.apple = 10;   // OK: 値は数値\nstock.cherry = \"x\"; // エラー: 値は数値でないといけない",
          caption: "Record<string, number> は「文字列キー・数値バリューのオブジェクト」"
        },
        {
          type: "paragraph",
          text: "Partial<T> は「T の全プロパティを省略可能にした型」です。元の型では必須だった項目を、あってもなくてもよい状態にします。更新処理で「一部の項目だけ渡したい」ときによく使われます。"
        },
        {
          type: "code",
          language: "typescript",
          code: "type User = { id: number; name: string; email: string };\n\n// Partial<User> は { id?: number; name?: string; email?: string }\n// つまり全部が省略可能\nfunction updateUser(id: number, patch: Partial<User>) {\n  // patch は name だけ、email だけ、などでもOK\n}\n\nupdateUser(1, { name: \"新しい名前\" }); // OK\nupdateUser(1, {});                    // OK(何も更新しない)",
          caption: "Partial<User> は User の全項目を省略可能にした型"
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ元の型から作るのか",
          text: "User を1つ定義しておけば、Partial<User> は自動的に追従します。User に項目を足せば Partial<User> にも反映されるので、型がバラバラになりません。AIに「更新用の型はPartialで」と伝えれば、二重管理の無い安全な型を作ってくれます。"
        },
        {
          type: "compare",
          bad: {
            label: "手で作り直す",
            text: "更新用に全項目 optional の型を別途手書きする",
            language: "typescript",
            code: "type UserPatch = {\n  id?: number; name?: string; email?: string;\n}; // User を変えたら手直しが必要"
          },
          good: {
            label: "元の型から生成",
            text: "Partial<User> なら User の変更に自動で追従",
            language: "typescript",
            code: "type UserPatch = Partial<User>; // 二重管理が無い"
          }
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Record<K, V>: キーが K、値が V のオブジェクト型(辞書のイメージ)",
            "Partial<T>: T の全プロパティを省略可能にした型(部分更新に便利)",
            "どちらも既存の型から新しい型を作るので、二重管理を防げる"
          ]
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「User型を元に、更新用に一部だけ渡せる型を作りたい」と伝えれば Partial<User> を提案してくれます。読めない型が出てきたら「この Record<string, User[]> はどういう構造?」と聞けば、日本語で構造を説明してくれます。"
        }
      ],
      questions: [
        {
          id: "tsday3-lesson4-q1",
          type: "choice",
          question: "Record<string, boolean> が表すのはどんな値?",
          choices: [
            "文字列と真偽値のどちらか1つの値",
            "文字列をキー、真偽値を値に持つオブジェクト",
            "文字列の配列",
            "真偽値の配列"
          ],
          answerIndex: 1,
          explanation: "Record<K, V> はキーが K・値が V のオブジェクト型です。Record<string, boolean> は文字列キーに真偽値がぶら下がったオブジェクトを表します。"
        },
        {
          id: "tsday3-lesson4-q2",
          type: "choice",
          question: "type User = { id: number; name: string } のとき、Partial<User> として正しいものはどれ?",
          choices: [
            "id も name も必須のまま",
            "id と name が両方とも省略可能(あってもなくてもよい)",
            "id と name の型が両方 string になる",
            "User の配列になる"
          ],
          answerIndex: 1,
          explanation: "Partial<T> は T の全プロパティを省略可能にします。Partial<User> は { id?: number; name?: string } となり、どちらも渡さなくてもよくなります。"
        },
        {
          id: "tsday3-lesson4-q3",
          type: "free",
          question: "更新処理で Partial<User> を使うと、手書きの更新用型を作るのに比べてどんな利点がありますか。",
          modelAnswer: "Partial<User> は User の定義を元に自動生成されるため、User に項目を追加・変更しても更新用の型が自動で追従します。手書きの更新用型だと、元の型を変えるたびに手直しが必要で、直し忘れると型がずれてバグの原因になります。Partial を使えば型の二重管理が無くなり、常に元の型と一貫した状態を保てます。",
          interviewPhrase: "実務では「更新用の型は Partial で元の型から生成して、二重管理を避けています」と説明します。",
          keywords: ["Partial", "省略可能", "自動追従", "二重管理", "一貫性"]
        }
      ]
    }
  ]
};
