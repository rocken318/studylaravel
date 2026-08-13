import type { Day } from "@/types";

export const pythonDay3: Day = {
  day: 3,
  slug: "day3",
  title: "リスト・辞書(まとめて扱う)＝AIとの接点",
  goal: "リストと辞書で複数データを扱える。AIの入出力(JSON)が辞書とリストであることを理解し、必要な値を取り出せる。",
  lessons: [
    {
      id: "pyday3-lesson1",
      slug: "list-ordered-collection",
      title: "リスト(順序のあるまとまり)",
      summary: "複数の値を1つにまとめて、順番に扱うためのリストを学ぶ。",
      blocks: [
        { type: "heading", text: "リストとは「箱を一列に並べたもの」" },
        { type: "paragraph", text: "変数は値を1個しか入れられません。でも実際のデータは「3人の名前」「今週7日分の売上」のように複数まとめて扱いたいことがほとんどです。そこで使うのがリストです。リストとは、複数の値を順番付きで1つにまとめた入れ物のことです。" },
        { type: "code", language: "python", code: "fruits = [\"りんご\", \"みかん\", \"ぶどう\"]\nprint(fruits)\n# ['りんご', 'みかん', 'ぶどう']", caption: "角カッコ [ ] で囲み、値をカンマで区切る" },
        { type: "paragraph", text: "リストの中の1つ1つを「要素(element)」と呼びます。要素には前から順番に番号が振られていて、この番号を「インデックス(index)」と言います。大事なのは、番号が 0 から始まることです。1ではありません。" },
        { type: "code", language: "python", code: "fruits = [\"りんご\", \"みかん\", \"ぶどう\"]\nprint(fruits[0])  # りんご (最初)\nprint(fruits[1])  # みかん\nprint(fruits[2])  # ぶどう (3番目だが番号は2)\nprint(fruits[-1]) # ぶどう (-1 は末尾)", caption: "[番号] で取り出す。マイナスは後ろから数える" },
        { type: "callout", variant: "warn", title: "0始まりの落とし穴", text: "「3個目が欲しい」ときのインデックスは 3 ではなく 2 です。プログラミングで最も多い勘違いの1つがこの「1つずれる」ミスです。最初は指を折って数える気持ちで確認してください。" },
        { type: "heading", text: "リストは後から変えられる" },
        { type: "paragraph", text: "リストは中身を追加・変更・削除できます。よく使うのは末尾に足す append です。" },
        { type: "code", language: "python", code: "todo = [\"買い物\", \"掃除\"]\ntodo.append(\"洗濯\")     # 末尾に追加\nprint(todo)            # ['買い物', '掃除', '洗濯']\n\ntodo[0] = \"買い物(完了)\" # 上書き\nprint(len(todo))        # 3 (要素の数)", caption: "append で追加、len( ) で個数を数える" },
        { type: "paragraph", text: "Day2で学んだ for と組み合わせると、リストの全要素を1つずつ処理できます。ここがリストの本領です。" },
        { type: "code", language: "python", code: "scores = [80, 55, 90, 40]\nfor s in scores:\n    if s >= 60:\n        print(s, \"合格\")\n    else:\n        print(s, \"不合格\")", caption: "for でリストを1件ずつ処理する" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このリストから60点以上だけを取り出すPythonコードを書いて。理由も説明して」と頼めばコードは出ます。あなたの仕事は、出てきたコードが本当に60点以上を選んでいるか、インデックスがずれていないかを読んで確かめることです。" }
      ],
      questions: [
        {
          id: "pyday3-lesson1-q1",
          type: "choice",
          question: "items = [\"a\", \"b\", \"c\"] のとき、items[1] が返す値はどれですか。",
          choices: ["\"a\"", "\"b\"", "\"c\"", "エラーになる"],
          answerIndex: 1,
          explanation: "インデックスは0始まりなので、items[0] が \"a\"、items[1] が \"b\"、items[2] が \"c\" です。1番目ではなく2番目の要素が返る点に注意します。"
        },
        {
          id: "pyday3-lesson1-q2",
          type: "choice",
          question: "リストの末尾に新しい要素を1つ追加するメソッドはどれですか。",
          choices: ["len()", "print()", "append()", "index()"],
          answerIndex: 2,
          explanation: "append() は末尾に要素を追加します。len() は個数を数える、print() は表示、index() は要素の位置を調べる用途で、追加はしません。"
        },
        {
          id: "pyday3-lesson1-q3",
          type: "free",
          question: "リストとは何か、なぜ変数だけでは足りないのかを、未経験者に説明してください。",
          modelAnswer: "変数は値を1個しか入れられませんが、実際のデータは複数まとめて扱いたいことが多いです。リストは複数の値を順番付きで1つにまとめた入れ物で、[ ] で作り、0から始まるインデックスで各要素を取り出せます。for と組み合わせれば全要素をまとめて処理できます。",
          interviewPhrase: "実務ではこう説明する：「リストは順序を保ったまま複数データをまとめる基本の型で、ループで一括処理する起点になります」",
          keywords: ["複数", "順番", "インデックス", "0始まり", "for"]
        }
      ]
    },
    {
      id: "pyday3-lesson2",
      slug: "dict-key-value-nest",
      title: "辞書(キーと値)とネスト",
      summary: "名前で値を引く辞書と、辞書やリストを入れ子にするネストを学ぶ。",
      blocks: [
        { type: "heading", text: "辞書は「名前で引く」入れ物" },
        { type: "paragraph", text: "リストは番号で値を取り出しました。でも「0番目の値」より「name の値」の方が意味が分かりやすいですよね。辞書(dictionary)は、番号ではなく「キー(key)」という名前で値を取り出す入れ物です。キーと値をペアで持ちます。" },
        { type: "code", language: "python", code: "user = {\"name\": \"田中\", \"age\": 28}\nprint(user[\"name\"])  # 田中\nprint(user[\"age\"])   # 28", caption: "波カッコ { } で、キー: 値 の形で書く" },
        { type: "compare", bad: { label: "リスト(番号で引く)", language: "python", code: "user = [\"田中\", 28]\nprint(user[0])  # 田中 (0が何か分からない)" }, good: { label: "辞書(名前で引く)", language: "python", code: "user = {\"name\": \"田中\", \"age\": 28}\nprint(user[\"name\"])  # 田中 (意味が明確)" } },
        { type: "callout", variant: "why", title: "なぜ辞書を使うのか", text: "user[0] を見ても「0番目って何?」となりますが、user[\"name\"] なら名前だと一目で分かります。データに名札を付けられるのが辞書の価値です。人間にもAIにも読みやすくなります。" },
        { type: "heading", text: "値の追加・変更と存在チェック" },
        { type: "code", language: "python", code: "user = {\"name\": \"田中\", \"age\": 28}\nuser[\"city\"] = \"東京\"   # 新しいキーを追加\nuser[\"age\"] = 29        # 既存キーを上書き\n\nprint(user.get(\"email\", \"未登録\"))  # 未登録 (無いキーの保険)", caption: "get(キー, 初期値) は無いキーでもエラーにならない" },
        { type: "callout", variant: "warn", title: "無いキーはエラー", text: "user[\"email\"] のように存在しないキーを角カッコで指定すると KeyError で止まります。有るか分からないときは get( ) を使うと、無い場合に指定した初期値を返してくれて安全です。" },
        { type: "heading", text: "ネスト(入れ子)＝辞書の中にリストや辞書" },
        { type: "paragraph", text: "辞書の値には、数値や文字列だけでなく、リストや別の辞書も入れられます。これを「ネスト(入れ子)」と呼びます。現実のデータはほぼこの形です。" },
        { type: "code", language: "python", code: "person = {\n    \"name\": \"田中\",\n    \"hobbies\": [\"読書\", \"料理\"],\n    \"address\": {\"city\": \"東京\", \"zip\": \"100-0001\"}\n}\nprint(person[\"hobbies\"][0])       # 読書\nprint(person[\"address\"][\"city\"]) # 東京", caption: "外側から内側へ、順番に [ ] を重ねて掘っていく" },
        { type: "list", ordered: true, items: ["まず person[\"address\"] で内側の辞書を取り出す", "その結果に対して [\"city\"] でさらに値を取り出す", "[ ] を左から順に読めば、どこを掘っているか追える"] },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "深いネストで欲しい値の取り出し方が分からないときは、「このデータ構造から東京という値を取り出すには何と書けばいい?」とデータそのものを貼って聞くのが有効です。返ってきた [ ] の順番を、自分の目でも上から追って確認しましょう。" }
      ],
      questions: [
        {
          id: "pyday3-lesson2-q1",
          type: "choice",
          question: "user = {\"name\": \"佐藤\", \"age\": 30} から年齢を取り出す正しい書き方はどれですか。",
          choices: ["user[0]", "user[\"age\"]", "user.age", "user(age)"],
          answerIndex: 1,
          explanation: "辞書はキーで値を引くので user[\"age\"] が正解です。user[0] は番号での指定でリスト向き、user.age や user(age) はPythonの辞書アクセスの書き方ではありません。"
        },
        {
          id: "pyday3-lesson2-q2",
          type: "choice",
          question: "person = {\"address\": {\"city\": \"大阪\"}} から \"大阪\" を取り出す書き方はどれですか。",
          choices: ["person[\"city\"]", "person[\"address\"][\"city\"]", "person[0][\"city\"]", "person[\"address\", \"city\"]"],
          answerIndex: 1,
          explanation: "外側の辞書からまず [\"address\"] で内側の辞書を取り出し、続けて [\"city\"] を指定します。ネストは外側から順に [ ] を重ねて掘ります。"
        },
        {
          id: "pyday3-lesson2-q3",
          type: "free",
          question: "リストと辞書の違いを、それぞれ何で値を取り出すかに注目して説明してください。",
          modelAnswer: "リストは値を順番付きで並べ、0から始まるインデックス番号で取り出します。辞書はキーという名前と値をペアで持ち、名前で取り出します。番号より名前の方がデータの意味が明確になるため、意味のあるデータには辞書が向きます。両者は入れ子にでき、辞書の中にリストや辞書を持たせられます。",
          interviewPhrase: "実務ではこう説明する：「順序が主役ならリスト、名前で引きたいなら辞書。実データは辞書の中にリストを持つネスト構造が基本です」",
          keywords: ["インデックス", "キー", "名前", "ネスト", "意味"]
        }
      ]
    },
    {
      id: "pyday3-lesson3",
      slug: "why-json-is-dict-and-list",
      title: "なぜ重要か: AIの入出力(JSON)は辞書とリストでできている",
      summary: "AIやAPIがやり取りするJSONの正体が辞書とリストであることを理解する。",
      blocks: [
        { type: "heading", text: "JSONとは何か" },
        { type: "paragraph", text: "AIのAPIや多くのWebサービスは、データを JSON という形式でやり取りします。JSON(ジェイソン)は「JavaScript Object Notation」の略で、プログラム同士がデータを受け渡すための共通フォーマットです。難しく聞こえますが、見た目は今まで学んだ辞書とリストのミックスそのものです。" },
        { type: "code", language: "json", code: "{\n  \"model\": \"gpt-example\",\n  \"choices\": [\n    { \"index\": 0, \"message\": { \"role\": \"assistant\", \"content\": \"こんにちは\" } }\n  ],\n  \"usage\": { \"total_tokens\": 42 }\n}", caption: "AIの応答の一例(構造を示すためのサンプル。実際のフィールド名はサービスごとに異なる)" },
        { type: "paragraph", text: "この { } は辞書、[ ] はリストです。つまりJSONを読むとは、辞書とリストのネストを読むことに他なりません。Day3の前半をやったあなたは、もうこれを読む準備ができています。" },
        { type: "callout", variant: "why", title: "なぜこの回が一番大事か", text: "AIを使う実務では、送るデータも返ってくるデータもほぼJSONです。JSONが辞書とリストだと分かっていれば、AIの出力から欲しい値を自分で取り出せます。ここが「AIを使う人」と「AIに使われて終わる人」の分かれ目です。" },
        { type: "heading", text: "JSONと辞書・リストの対応" },
        { type: "list", items: ["JSONの { } はPythonの辞書に対応する", "JSONの [ ] はPythonのリストに対応する", "文字列は \" \" で囲む(Pythonでも同じ)", "true / false / null はPythonでは True / False / None になる"] },
        { type: "callout", variant: "warn", title: "見た目は似ているが同じではない", text: "JSONとPythonの辞書は見た目がそっくりですが別物です。JSONは文字列(テキスト)で、Pythonで扱うには辞書に変換する必要があります。この変換を json ライブラリが担当します。次のレッスンで実際に取り出します。" },
        { type: "code", language: "python", code: "import json\n\ntext = '{\"name\": \"田中\", \"age\": 28}'  # これは文字列(JSON)\ndata = json.loads(text)               # 辞書に変換\nprint(data[\"name\"])                   # 田中 (もう辞書として扱える)", caption: "json.loads で JSON文字列 を Python辞書 に変換する" },
        { type: "paragraph", text: "loads は「load string(文字列から読み込む)」の意味です。逆に辞書をJSON文字列に変換するときは json.dumps を使います。今は「JSONは文字列、変換すれば辞書」とだけ押さえれば十分です。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "APIのドキュメントを読むのがつらいときは、「このAPIが返すJSONの例と、各フィールドの意味を初心者向けに説明して」とAIに頼むと理解が早いです。ただし返答のフィールド名が実物と一致するかは、必ず本物のレスポンスで確認してください。AIは構造を推測で埋めることがあります。" }
      ],
      questions: [
        {
          id: "pyday3-lesson3-q1",
          type: "choice",
          question: "JSONの中の { } と [ ] は、Pythonのどのデータ型に対応しますか。",
          choices: ["{ } はリスト、[ ] は辞書", "{ } は辞書、[ ] はリスト", "どちらも文字列", "どちらも数値"],
          answerIndex: 1,
          explanation: "JSONの { } は辞書(キーと値のペア)、[ ] はリスト(順序のある並び)に対応します。JSONを読むことは辞書とリストのネストを読むことと同じです。"
        },
        {
          id: "pyday3-lesson3-q2",
          type: "choice",
          question: "JSON文字列をPythonの辞書に変換するときに使うものはどれですか。",
          choices: ["print(text)", "json.loads(text)", "len(text)", "text.append()"],
          answerIndex: 1,
          explanation: "json.loads はJSON文字列をPythonの辞書やリストに変換します。JSONはあくまで文字列なので、辞書として値を取り出す前にこの変換が必要です。"
        },
        {
          id: "pyday3-lesson3-q3",
          type: "free",
          question: "「JSONが読めることがAI時代に重要」と言われるのはなぜか、あなたの言葉で説明してください。",
          modelAnswer: "AIのAPIや多くのWebサービスは、入力も出力もJSONでやり取りします。JSONの正体は辞書とリストのネストなので、それが読めればAIの出力から欲しい値を自分で取り出し、確認し、直せます。逆に読めないとAIの応答をそのまま鵜呑みにするしかなく、使いこなせません。だからJSONが読めることが、AIを道具として使える人の基礎になります。",
          interviewPhrase: "実務ではこう説明する：「API連携の入出力はJSONが標準。辞書とリストの構造として読めることが、レスポンスから必要な値を安全に取り出す前提になります」",
          keywords: ["JSON", "API", "辞書", "リスト", "取り出す"]
        }
      ]
    },
    {
      id: "pyday3-lesson4",
      slug: "comprehension-and-extract-values",
      title: "内包表記の読み方と、APIレスポンスから欲しい値を取り出す",
      summary: "内包表記を読めるようにし、ネストしたAPIレスポンスから必要な値を抜き出す。",
      blocks: [
        { type: "heading", text: "内包表記は「forを1行に畳んだもの」" },
        { type: "paragraph", text: "Pythonのコードやサンプルでは、リスト内包表記(list comprehension)という書き方が頻繁に出てきます。これはforループでリストを作る処理を1行にまとめた省略記法です。書けなくてもいいので、読めるようになりましょう。" },
        { type: "compare", bad: { label: "普通のfor(縦に長い)", language: "python", code: "nums = [1, 2, 3, 4]\ndoubled = []\nfor n in nums:\n    doubled.append(n * 2)\n# [2, 4, 6, 8]" }, good: { label: "内包表記(1行)", language: "python", code: "nums = [1, 2, 3, 4]\ndoubled = [n * 2 for n in nums]\n# [2, 4, 6, 8]" } },
        { type: "paragraph", text: "読み方のコツは、真ん中の for から読むことです。[n * 2 for n in nums] は「nums の各 n について、n * 2 を集めた新しいリスト」と読みます。左側が「集める中身」、右側が「どこから取るか」です。" },
        { type: "code", language: "python", code: "scores = [80, 55, 90, 40]\npassed = [s for s in scores if s >= 60]\nprint(passed)  # [80, 90]", caption: "末尾に if を足すと条件で絞り込める" },
        { type: "list", ordered: true, items: ["まず右の for ... in ... を見て、何を1件ずつ取るか把握する", "末尾に if があれば、その条件で絞られる", "最後に左の式が、各要素をどう変換するかを表す"] },
        { type: "callout", variant: "warn", title: "読めれば十分、無理に短くしない", text: "内包表記は便利ですが、条件やネストを詰め込みすぎると一気に読めなくなります。自分で書くときは、複雑になりそうなら普通のforで書く方が、後で読む人(未来の自分やAI)に親切です。" },
        { type: "heading", text: "実践: APIレスポンスから欲しい値を取り出す" },
        { type: "paragraph", text: "総仕上げです。JSONを辞書に変換し、ネストを掘り、内包表記で欲しい値だけを集めます。Day3で学んだことが全部つながります。" },
        { type: "code", language: "python", code: "import json\n\nresponse = '''\n{\n  \"users\": [\n    {\"name\": \"田中\", \"age\": 28},\n    {\"name\": \"佐藤\", \"age\": 17},\n    {\"name\": \"鈴木\", \"age\": 35}\n  ]\n}\n'''\n\ndata = json.loads(response)          # 文字列 -> 辞書\nusers = data[\"users\"]                # リストを取り出す\n\nnames = [u[\"name\"] for u in users]   # 名前だけ集める\nadults = [u[\"name\"] for u in users if u[\"age\"] >= 18]\n\nprint(names)   # ['田中', '佐藤', '鈴木']\nprint(adults)  # ['田中', '鈴木']", caption: "変換 -> ネストを掘る -> 内包表記で抽出、の3ステップ" },
        { type: "callout", variant: "why", title: "この流れが実務の型", text: "APIから受け取る、辞書に変換する、必要な部分まで [ ] で掘る、リストを内包表記やforで加工する。この一連の流れは、AIのAPIを使うときも他のWebサービスを使うときもほぼ同じです。ここを自分の手で追えることが目標でした。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このJSONから18歳以上の名前だけをPythonで取り出すコードを書いて」と頼めばコードは出ます。あなたの役割は、u[\"age\"] のキー名が実際のデータと合っているか、条件が >= 18 で正しいか(17歳が除外され18歳が含まれるか)を読んで確かめることです。境界の1歳のずれをAIが間違えることもあります。" }
      ],
      questions: [
        {
          id: "pyday3-lesson4-q1",
          type: "choice",
          question: "nums = [1, 2, 3, 4] のとき、[n for n in nums if n % 2 == 0] の結果はどれですか。",
          choices: ["[1, 2, 3, 4]", "[2, 4]", "[1, 3]", "[]"],
          answerIndex: 1,
          explanation: "if n % 2 == 0 は「2で割った余りが0」つまり偶数だけを残す条件です。よって偶数の 2 と 4 が集まり [2, 4] になります。"
        },
        {
          id: "pyday3-lesson4-q2",
          type: "choice",
          question: "users がユーザー辞書のリストのとき、各ユーザーの名前だけを集める内包表記はどれですか。",
          choices: ["[u for u in users]", "[u[\"name\"] for u in users]", "[users[\"name\"]]", "[name for name in users]"],
          answerIndex: 1,
          explanation: "users の各要素 u は1人分の辞書なので、u[\"name\"] で名前を取り出します。[u[\"name\"] for u in users] が名前だけのリストを作ります。"
        },
        {
          id: "pyday3-lesson4-q3",
          type: "free",
          question: "APIのJSONレスポンスから欲しい値を取り出す手順を、Day3で学んだ言葉を使って順に説明してください。",
          modelAnswer: "まず json.loads でJSON文字列をPythonの辞書に変換します。次に、辞書のキーやリストのインデックスを [ ] で外側から順にたどり、目的のリストや値まで掘っていきます。最後に、リストに対して内包表記やforを使い、条件で絞ったり必要な値だけを集めたりします。取り出したあとは、キー名や条件が実際のデータと合っているかを自分の目で確認します。",
          interviewPhrase: "実務ではこう説明する：「JSONを辞書へパースし、キーとインデックスで目的の階層まで掘り、内包表記で必要な値を抽出します。キー名と境界条件は実データで検証します」",
          keywords: ["json.loads", "辞書", "掘る", "内包表記", "確認"]
        }
      ]
    }
  ]
};
