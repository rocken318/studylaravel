import type { Day } from "@/types";

export const pythonDay4: Day = {
  day: 4,
  slug: "day4",
  title: "関数・モジュール(再利用と部品化)",
  goal: "関数で処理を部品化でき、importで標準ライブラリや外部ライブラリを使える。設計は人・実装はAIの線引きを持つ。",
  lessons: [
    {
      id: "pyday4-lesson1",
      slug: "def-arguments-return",
      title: "関数def(引数・戻り値・デフォルト引数)",
      summary: "処理に名前を付けて何度でも呼び出せる「関数」の基本を学ぶ。",
      blocks: [
        {
          type: "heading",
          text: "関数とは「名前を付けた処理のかたまり」",
        },
        {
          type: "paragraph",
          text: "同じ計算や手順を何度も書くのは面倒ですし、間違いの元です。関数は、ひとまとまりの処理に名前を付けておき、必要なときにその名前で呼び出す仕組みです。料理でいえば「だしを取る」という手順に名前を付けておき、レシピの中では「だしを取る」と一言書けば済むようにするイメージです。",
        },
        {
          type: "code",
          language: "python",
          code: "def greet(name):\n    message = \"こんにちは、\" + name + \"さん\"\n    return message\n\n# 呼び出す\nresult = greet(\"田中\")\nprint(result)  # こんにちは、田中さん",
          caption: "def で関数を定義し、名前と () で呼び出す",
        },
        {
          type: "list",
          items: [
            "def は「これから関数を定義します」という合図の英単語(define の略)",
            "greet が関数の名前。呼ぶときはこの名前を使う",
            "() の中の name が引数(ひきすう)。呼び出し側から渡す値の受け口",
            "return は「この値を呼び出し元に返す」という命令",
            "関数の中身はインデント(字下げ)で表す。Dayによってはここが動作の境界になる",
          ],
        },
        {
          type: "heading",
          text: "引数と戻り値",
        },
        {
          type: "paragraph",
          text: "引数は関数に「入れる」情報、戻り値(もどりち)は関数から「出てくる」結果です。関数を「入力を受け取って出力を返す箱」と考えると分かりやすいです。引数は複数書けますし、return が無い関数は特に値を返しません(None という「何も無い」を表す値が返ります)。",
        },
        {
          type: "code",
          language: "python",
          code: "def add(a, b):\n    return a + b\n\ndef say_hello():\n    print(\"やあ\")  # 表示するだけで return は無い\n\ntotal = add(3, 5)\nprint(total)      # 8\n\nx = say_hello()   # やあ と表示される\nprint(x)          # None(戻り値が無いため)",
          caption: "return がある関数と無い関数の違い",
        },
        {
          type: "callout",
          variant: "warn",
          title: "print と return は別物",
          text: "print は画面に文字を表示するだけで、値を持ち帰りません。計算結果を後で使いたいなら return が必要です。初心者がよく混同するポイントです。「表示したのに変数に入れたら None だった」という時は、return を書き忘れていないか確認しましょう。",
        },
        {
          type: "heading",
          text: "デフォルト引数",
        },
        {
          type: "paragraph",
          text: "引数に「渡されなかったときの初期値」をあらかじめ決めておけます。これをデフォルト引数と呼びます。よく使う値を初期値にしておくと、呼び出し側が毎回指定せずに済みます。",
        },
        {
          type: "code",
          language: "python",
          code: "def greet(name, greeting=\"こんにちは\"):\n    return greeting + \"、\" + name + \"さん\"\n\nprint(greet(\"佐藤\"))                    # こんにちは、佐藤さん\nprint(greet(\"佐藤\", greeting=\"おはよう\"))  # おはよう、佐藤さん",
          caption: "greeting に初期値を持たせる",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜデフォルト引数が便利か",
          text: "ほとんどのケースで同じ値を使うなら、それを初期値にしておくことで呼び出しが短くなり、読み手も「普段はこの値なんだな」と意図を読み取れます。例外的なときだけ明示的に上書きする、という書き方が可能になります。",
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「この関数の引数と戻り値の型を教えて。何を入れると何が返る?」と聞くと、関数の仕様を日本語で整理してくれます。自分で書いた関数でも、複雑になったらAIに要約させて読みやすさを確認すると良いです。",
        },
      ],
      questions: [
        {
          id: "pyday4-lesson1-q1",
          type: "choice",
          question: "次の関数を greet(\"山田\") と呼び出したときの戻り値はどれ?\n\ndef greet(name, greeting=\"やあ\"):\n    return greeting + name",
          choices: ["やあ山田", "山田やあ", "None", "エラーになる"],
          answerIndex: 0,
          explanation: "greeting を省略したのでデフォルト値の \"やあ\" が使われ、\"やあ\" + \"山田\" で \"やあ山田\" が返ります。引数を省略するとデフォルト引数の値が使われます。",
        },
        {
          id: "pyday4-lesson1-q2",
          type: "choice",
          question: "return を書かない関数を呼び出して、その結果を変数に代入すると変数の中身はどうなる?",
          choices: ["空文字列 \"\"", "0", "None", "直前に print した文字列"],
          answerIndex: 2,
          explanation: "return が無い関数は None を返します。print は表示するだけで値を返さないため、print を書いても戻り値にはなりません。",
        },
        {
          id: "pyday4-lesson1-q3",
          type: "free",
          question: "引数と戻り値の違いを、未経験者に説明するつもりで書いてください。",
          modelAnswer: "引数は関数に渡す入力で、関数が処理に使う材料です。戻り値は関数が処理を終えて呼び出し元に返す結果です。関数を「材料(引数)を入れると結果(戻り値)が出てくる箱」と考えると、両者の役割が区別できます。return を書かないと戻り値は None になります。",
          interviewPhrase: "実務ではこう説明する: 「引数は関数へのインプット、戻り値はアウトプットです。呼び出し側は引数で条件を渡し、return された結果を受け取って次の処理に使います」",
          keywords: ["引数", "戻り値", "return", "入力", "出力", "None"],
        },
      ],
    },
    {
      id: "pyday4-lesson2",
      slug: "why-functions",
      title: "なぜ関数にするのか(重複排除・テスト・説明しやすさ)",
      summary: "関数化がもたらす3つの利点(重複排除・テスト・説明のしやすさ)を理解する。",
      blocks: [
        {
          type: "heading",
          text: "同じコードを繰り返さない(重複排除)",
        },
        {
          type: "paragraph",
          text: "同じ処理をあちこちにコピーして貼り付けると、後で仕様が変わったとき全部を直す羽目になります。1か所でも直し忘れるとバグです。関数にまとめておけば、直す場所は関数の中だけで済みます。",
        },
        {
          type: "compare",
          bad: {
            label: "重複したコード",
            language: "python",
            code: "price1 = 1000\ntax1 = price1 * 0.1\ntotal1 = price1 + tax1\n\nprice2 = 2000\ntax2 = price2 * 0.1\ntotal2 = price2 + tax2\n# 税率が変わったら両方直す必要がある",
          },
          good: {
            label: "関数にまとめる",
            language: "python",
            code: "def with_tax(price, rate=0.1):\n    return price + price * rate\n\ntotal1 = with_tax(1000)\ntotal2 = with_tax(2000)\n# 税率の変更は関数の中だけ直せばよい",
          },
        },
        {
          type: "callout",
          variant: "why",
          title: "DRY原則",
          text: "「Don't Repeat Yourself(繰り返すな)」という有名な考え方があります。同じ知識(ここでは税率の計算)はコードの中に1か所だけ書く、という指針です。関数はこの原則を実現する基本の道具です。",
        },
        {
          type: "heading",
          text: "テストしやすくなる",
        },
        {
          type: "paragraph",
          text: "処理が関数として独立していると、「この入力ならこの出力になるはず」と単体で確認できます。プログラム全体を動かさなくても、関数だけを呼んで結果を確かめられます。これが後々、動作の保証やAIに直してもらった後の確認で効いてきます。",
        },
        {
          type: "code",
          language: "python",
          code: "def with_tax(price, rate=0.1):\n    return price + price * rate\n\n# 関数だけを試して結果を確認する\nprint(with_tax(1000))     # 1100.0 になるはず\nprint(with_tax(0))        # 0.0 になるはず\nprint(with_tax(1000, 0))  # 1000.0 になるはず(税率0)",
          caption: "関数単位で入力と期待する出力を確かめる",
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「この関数のテストケースを考えて。正常系と、境界値や異常系も出して」と頼むと、確認すべき入力の候補を挙げてくれます。ただし「その関数が何を正しいとするか」は人が決めることなので、出てきた期待値が本当に正しいかは自分で判断します。",
        },
        {
          type: "heading",
          text: "説明しやすくなる(名前が意図を語る)",
        },
        {
          type: "paragraph",
          text: "関数に良い名前を付けると、その名前自体が「何をするか」の説明になります。with_tax(1000) と書いてあれば、中身を読まなくても「税込みにしているんだな」と分かります。名前は最初のドキュメントです。",
        },
        {
          type: "compare",
          bad: {
            label: "何をしているか読まないと分からない",
            language: "python",
            code: "x = p + p * 0.1",
          },
          good: {
            label: "名前が意図を語る",
            language: "python",
            code: "total = with_tax(price)",
          },
        },
        {
          type: "callout",
          variant: "warn",
          title: "何でも関数にすればいいわけではない",
          text: "細かすぎる関数を大量に作ると、逆に処理の流れが追いにくくなります。目安は「繰り返し使う」「名前を付けると意図が伝わる」「まとまった一つの仕事になっている」こと。1回しか使わず名前も付けにくいものは、無理に関数化しなくて構いません。",
        },
      ],
      questions: [
        {
          id: "pyday4-lesson2-q1",
          type: "choice",
          question: "同じ計算を複数箇所にコピーして書くことの主な問題点はどれ?",
          choices: [
            "実行速度が必ず遅くなる",
            "仕様変更のとき全箇所を直す必要があり、直し忘れがバグになる",
            "Pythonでは構文エラーになる",
            "メモリを二重に消費してクラッシュする",
          ],
          answerIndex: 1,
          explanation: "コピーした処理は、仕様が変わると全部を直さねばならず、1か所でも漏れるとバグになります。関数にまとめれば修正は1か所で済みます。これがDRY原則の狙いです。",
        },
        {
          id: "pyday4-lesson2-q2",
          type: "choice",
          question: "関数化によって「テストしやすくなる」と言えるのはなぜ?",
          choices: [
            "関数は自動的にエラーを直してくれるから",
            "関数を単体で呼び出し、入力に対する出力を独立して確認できるから",
            "関数を書くとPythonが速くなるから",
            "関数にすると print が不要になるから",
          ],
          answerIndex: 1,
          explanation: "独立した関数は、プログラム全体を動かさなくても単体で呼び出せます。「この入力ならこの出力」を個別に確認できるため、動作の検証がしやすくなります。",
        },
        {
          id: "pyday4-lesson2-q3",
          type: "free",
          question: "「なぜ処理を関数にまとめるのか」を、利点を3つ挙げて説明してください。",
          modelAnswer: "1つ目は重複排除で、同じ処理を1か所にまとめられるので、仕様変更のときの修正が1か所で済み、直し忘れによるバグを防げます。2つ目はテストのしやすさで、関数を単体で呼び出して入力と出力を確認できます。3つ目は説明のしやすさで、良い名前を付ければ名前自体が意図の説明になり、読み手が中身を追わなくても何をするか分かります。",
          interviewPhrase: "実務ではこう説明する: 「関数化は重複排除・検証容易性・可読性の3点で効きます。特に変更に強くなる点と、名前が仕様書代わりになる点を重視しています」",
          keywords: ["重複排除", "DRY", "テスト", "可読性", "名前", "変更に強い"],
        },
      ],
    },
    {
      id: "pyday4-lesson3",
      slug: "import-modules-pip",
      title: "importと標準ライブラリ、pip(requests等)の存在",
      summary: "既にある部品(モジュール)をimportで取り込み、pipで外部ライブラリを追加する仕組みを知る。",
      blocks: [
        {
          type: "heading",
          text: "自分で書かず、既にある部品を使う",
        },
        {
          type: "paragraph",
          text: "関数は自分で部品を作る仕組みでした。一方、世の中には既に他の人が作った便利な部品のかたまりが大量にあります。これをモジュールやライブラリと呼びます。import(インポート、取り込む)という命令で、それらを自分のプログラムから使えるようにします。",
        },
        {
          type: "code",
          language: "python",
          code: "import math\n\nprint(math.sqrt(16))   # 4.0(平方根)\nprint(math.pi)         # 3.141592653589793",
          caption: "math モジュールを import して平方根や円周率を使う",
        },
        {
          type: "list",
          items: [
            "import math で math という部品箱を丸ごと取り込む",
            "使うときは math.sqrt のように「箱の名前.機能の名前」で呼ぶ",
            "sqrt は square root(平方根)の略。ドットの左が出どころを表す",
          ],
        },
        {
          type: "heading",
          text: "標準ライブラリ(最初から入っている部品)",
        },
        {
          type: "paragraph",
          text: "Pythonをインストールすると、最初から使えるモジュール群が付いてきます。これを標準ライブラリと呼びます。追加のインストール無しで import するだけで使えます。代表的なものをいくつか紹介します。",
        },
        {
          type: "code",
          language: "python",
          code: "import random\nimport datetime\n\nprint(random.randint(1, 6))        # 1〜6のランダムな整数(サイコロ)\nprint(datetime.date.today())       # 今日の日付",
          caption: "random(乱数)と datetime(日付時刻)は標準ライブラリ",
        },
        {
          type: "callout",
          variant: "info",
          title: "必要な機能だけ取り込む書き方",
          text: "from モジュール名 import 機能名 と書くと、その機能だけを直接使えます。例えば from math import sqrt と書けば、以降は math. を付けずに sqrt(16) と書けます。どちらの書き方でも動きますが、出どころが分かりやすい import math 形式も広く使われます。",
        },
        {
          type: "heading",
          text: "pip(外部ライブラリを追加する道具)",
        },
        {
          type: "paragraph",
          text: "標準ライブラリに無い機能は、外部ライブラリとして配布されています。それらを取り込むには、まずインストールが必要です。この「Python用の部品を追加でインストールする道具」が pip(ピップ)です。代表例として、Webからデータを取ってくる requests(リクエスツ)というライブラリがあります。",
        },
        {
          type: "code",
          language: "bash",
          code: "pip install requests",
          caption: "ターミナルで requests をインストールする(Pythonコードではなくコマンド)",
        },
        {
          type: "code",
          language: "python",
          code: "import requests\n\nresponse = requests.get(\"https://example.com\")\nprint(response.status_code)   # 200 なら取得成功",
          caption: "インストール後は import して使える",
        },
        {
          type: "callout",
          variant: "warn",
          title: "import できないエラーの多くはインストール漏れ",
          text: "ModuleNotFoundError: No module named 'requests' のようなエラーは、そのライブラリが未インストールなことが原因のことが多いです。標準ライブラリなら import だけで動きますが、requests のような外部ライブラリは pip install が先に必要です。エラー文の中のモジュール名をよく見ましょう。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ自分で作らずライブラリを使うのか",
          text: "Web通信や日付計算のような一般的な処理は、既に多くの人に使われ、検証された実装があります。自分でゼロから書くより、信頼できるライブラリを使うほうが速く、バグも少ないです。「車輪の再発明を避ける」という言い方をします。",
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「この処理をやりたい。標準ライブラリで実現できる? それとも pip で入れる外部ライブラリが必要?」と聞くと、適したモジュール名と最小の使い方を教えてくれます。提示されたライブラリ名を鵜呑みにせず、公式ドキュメントで存在と用途を確認する習慣を付けましょう。",
        },
      ],
      questions: [
        {
          id: "pyday4-lesson3-q1",
          type: "choice",
          question: "import requests と書いたら ModuleNotFoundError: No module named 'requests' が出ました。最初に疑うべきことは?",
          choices: [
            "Pythonのバージョンが壊れている",
            "requests がまだインストールされていない(pip install が必要)",
            "requests は予約語なので import できない",
            "インターネットに繋がっていない",
          ],
          answerIndex: 1,
          explanation: "requests は標準ライブラリではなく外部ライブラリです。ModuleNotFoundError は多くの場合、pip install requests を実行していないことが原因です。まずインストール状況を確認します。",
        },
        {
          id: "pyday4-lesson3-q2",
          type: "choice",
          question: "追加のインストール無しに import だけで使えるのはどれ?",
          choices: [
            "requests(Web通信)",
            "numpy(数値計算)",
            "math(数学関数)",
            "pandas(表データ処理)",
          ],
          answerIndex: 2,
          explanation: "math はPythonに最初から付属する標準ライブラリなので import だけで使えます。requests・numpy・pandas は外部ライブラリで、使う前に pip でのインストールが必要です。",
        },
        {
          id: "pyday4-lesson3-q3",
          type: "free",
          question: "「標準ライブラリ」と「pipで入れる外部ライブラリ」の違いを説明してください。",
          modelAnswer: "標準ライブラリはPython本体に最初から付属していて、import するだけで使えます(math や random、datetime など)。外部ライブラリはPythonには含まれておらず、使う前に pip install でインストールする必要があります(requests など)。どちらも import で取り込む点は同じですが、外部ライブラリは事前インストールの一手間が要る、というのが違いです。",
          interviewPhrase: "実務ではこう説明する: 「標準ライブラリは同梱で import だけで動きます。外部ライブラリは pip で依存として追加し、requirements などで管理します。ModuleNotFoundError はまずインストール漏れを疑います」",
          keywords: ["標準ライブラリ", "外部ライブラリ", "import", "pip", "インストール", "requests"],
        },
      ],
    },
    {
      id: "pyday4-lesson4",
      slug: "design-human-implementation-ai",
      title: "設計は人・実装はAI(AIに任せる部分と自分が持つ判断)",
      summary: "何を作るかは人が決め、どう書くかはAIに任せる。その線引きと確認方法を身につける。",
      blocks: [
        {
          type: "heading",
          text: "「何を作るか」と「どう書くか」を分ける",
        },
        {
          type: "paragraph",
          text: "AIはコードを書くのが得意です。しかし「何を作るべきか」「どういう条件を満たせば正しいのか」を決めるのは、状況を理解している人の仕事です。この2つを分けて考えるのが、AI時代のプログラミングの基本姿勢です。設計は人、実装はAI、と覚えてください。",
        },
        {
          type: "list",
          items: [
            "設計(人が持つ): 何を作るか、どんな入力に対し何を返すか、どこまで正しければ良いか",
            "実装(AIに任せられる): 決めた仕様どおりに動くコードを書くこと、細かい書き方や言語仕様",
            "確認(人が持つ): 出てきたコードが仕様を満たしているか、読んで判断すること",
          ],
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ設計を手放してはいけないのか",
          text: "AIは指示されたことは上手にこなしますが、あなたの目的や制約を勝手には知りません。曖昧な指示には、それらしいが的外れなコードで応じることがあります。何を正解とするかを人が握っていないと、動くのに間違っている、を見抜けなくなります。",
        },
        {
          type: "heading",
          text: "良い指示は「関数の仕様」で渡す",
        },
        {
          type: "paragraph",
          text: "ここまで学んだ関数の考え方が、そのままAIへの指示の形になります。関数名・引数・戻り値・満たすべき条件を明確に伝えると、AIは狙いどおりのコードを出しやすくなります。",
        },
        {
          type: "compare",
          bad: {
            label: "曖昧な指示",
            text: "「税込み計算するコードを書いて」",
          },
          good: {
            label: "仕様として渡す指示",
            text: "「関数 with_tax(price, rate=0.1) を作って。price は整数、rate は税率。price に税を足した金額を小数で返す。price が0なら0を返す」",
          },
        },
        {
          type: "code",
          language: "python",
          code: "# AIが仕様どおり書いたコードを、人が読んで確認する\ndef with_tax(price, rate=0.1):\n    return price + price * rate\n\n# 自分で決めた期待値で検算する\nprint(with_tax(1000))     # 1100.0 を期待\nprint(with_tax(0))        # 0.0 を期待\nprint(with_tax(1000, 0))  # 1000.0 を期待",
          caption: "受け取ったコードは、自分が決めた期待値で必ず確かめる",
        },
        {
          type: "callout",
          variant: "warn",
          title: "動いた=正しい、ではない",
          text: "エラー無く動くことと、仕様を満たすことは別です。AIのコードがそれっぽく動いても、境界値(0や空、想定外の値)で意図と違うことはよくあります。自分が決めた期待値でチェックするまで、正しいと判断してはいけません。",
        },
        {
          type: "heading",
          text: "読める・直せる・説明できる",
        },
        {
          type: "paragraph",
          text: "実装をAIに任せるほど、人に残る力は「読める・直せる・説明できる」の3つになります。コードを読んで意図を追え、間違いを見つけて直せ、なぜそうなっているかを言葉で説明できる。これがあれば、AIを道具として安全に使いこなせます。",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "読める: 変数名・関数名・処理の流れを追い、何をしているか説明できる",
            "直せる: 期待と違う箇所を特定し、修正できる(またはAIに的確な修正指示を出せる)",
            "説明できる: なぜこの設計・この値なのかを、根拠を持って言える",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「このコードが何をしているか1行ずつ説明して」「この関数が想定外の入力(空・0・マイナス)で何を返すか教えて」と聞くと、読む力・確認する力を補えます。ただし最終的に仕様を満たすかの判断は人が下します。AIの説明も一つの意見として、自分で裏を取る姿勢を持ちましょう。",
        },
      ],
      questions: [
        {
          id: "pyday4-lesson4-q1",
          type: "choice",
          question: "「設計は人・実装はAI」という考え方で、人が最後まで手放すべきでないものはどれ?",
          choices: [
            "変数名の細かい付け方",
            "何を作り、どうなれば正しいかという仕様と、それを満たすかの確認",
            "for文の書き方",
            "インデントの調整",
          ],
          answerIndex: 1,
          explanation: "細かい書き方はAIに任せられますが、「何を正解とするか」を決め、成果物がそれを満たすか確認するのは人の役割です。ここを手放すと、動くのに間違っているコードを見抜けなくなります。",
        },
        {
          id: "pyday4-lesson4-q2",
          type: "choice",
          question: "AIが書いたコードがエラー無く動きました。この時点で言えることはどれ?",
          choices: [
            "仕様を完全に満たしていると確定する",
            "構文的に実行できたにすぎず、意図どおりかは期待値で確認するまで分からない",
            "テストは一切不要になる",
            "境界値でも必ず正しく動く",
          ],
          answerIndex: 1,
          explanation: "エラー無く動くのは構文が正しいだけで、仕様を満たす保証ではありません。特に0・空・想定外の値などの境界で意図と違うことがあります。自分の期待値で確かめて初めて正しいと判断できます。",
        },
        {
          id: "pyday4-lesson4-q3",
          type: "free",
          question: "AIに実装を任せる時代に、人が持ち続けるべき力を「読める・直せる・説明できる」の観点から説明してください。",
          modelAnswer: "読める力は、AIが書いたコードを追って何をしているか理解する力です。直せる力は、期待と違う箇所を見つけて自分で修正するか、AIに的確な修正指示を出す力です。説明できる力は、なぜこの設計・この値なのかを根拠を持って言葉にする力です。実装をAIに任せるほど、何を正しいとするかを決め、成果物がそれを満たすか判断する責任が人に残るため、この3つの力が重要になります。",
          interviewPhrase: "実務ではこう説明する: 「実装はAIに任せますが、仕様定義とレビューは人が持ちます。生成コードを読んで意図を追い、境界値で検証し、なぜこの設計かを説明できる状態を保つのが自分の役割だと考えています」",
          keywords: ["設計", "実装", "読める", "直せる", "説明できる", "仕様", "確認", "境界値"],
        },
      ],
    },
  ],
};
