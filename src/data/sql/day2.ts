import type { Day } from "@/types";
export const sqlDay2: Day = {
  day: 2,
  slug: "day2",
  title: "まとめる・つなぐ — 集計とJOIN",
  goal: "COUNT・SUM・AVGとGROUP BYで「まとめて数える」SQLを読めて、JOINで2つのテーブルをキーでつなぐ考え方を、たとえで説明できるようになる。",
  lessons: [
    {
      id: "sqlday2-lesson1",
      slug: "aggregate",
      title: "数える・合計する・平均を出す — 集計関数",
      summary: "COUNT(件数)・SUM(合計)・AVG(平均)で、たくさんの行を「1つの答え」にまとめる。",
      blocks: [
        { type: "heading", text: "たくさんの行を、1つの数字にまとめる" },
        { type: "paragraph", text: "これまでのSELECTは「1行ずつ取り出す」動きでした。でも実務では「全部で何件あるの?」「合計いくら?」「平均は?」のように、たくさんの行を1つの数字にまとめたいことがよくあります。それをやってくれるのが集計関数です。" },
        { type: "paragraph", text: "たとえるなら、名簿を1枚ずつめくって読むのが今までのSELECT。集計関数は「名簿は全部で何人ぶん?」と最後の1つの数字だけを教えてくれる係の人です。" },
        { type: "list", items: ["COUNT(...) … 件数を数える(何行あるか)", "SUM(列) … その列の合計を出す", "AVG(列) … その列の平均を出す", "MAX(列) / MIN(列) … 最大・最小を出す"] },
        { type: "heading", text: "COUNT — 件数を数える" },
        { type: "code", language: "sql", code: "SELECT COUNT(*)\nFROM users;", caption: "usersテーブルに何行(何人)あるかを数える。COUNT(*) は「行数を数えて」の意味。" },
        { type: "paragraph", text: "COUNT(*) は「全部の行を数えて」という読み方をします。* は「すべて」の記号でしたね(Day1で登場)。結果は「42」のような数字が1つだけ返ってきます。" },
        { type: "heading", text: "SUM と AVG — 合計と平均" },
        { type: "code", language: "sql", code: "SELECT SUM(price), AVG(price)\nFROM orders;", caption: "ordersテーブルのprice列を、合計(SUM)と平均(AVG)でまとめる。" },
        { type: "callout", variant: "warn", title: "「全部を1つにまとめる」ので、行と混ぜられない", text: "SELECT name, COUNT(*) FROM users; のように、集計していない列(name)と集計(COUNT)を素朴に並べると、多くのDBでエラーになります。「1行ずつのname」と「全体で1つの件数」は、そのままでは同じ表に並べられないからです。行ごとに分けて数えたいときは、次のレッスンのGROUP BYを使います。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「usersテーブルの行数と、ordersテーブルのpriceの合計・平均を出すSQLを書いて。集計関数の意味も一言ずつ添えて」と頼むと、COUNT・SUM・AVGの形を確認できます。" }
      ],
      questions: [
        { id: "sqlday2-lesson1-q1", type: "choice", question: "SELECT COUNT(*) FROM users; は何を返す?", choices: ["usersの全部の行(全データ)", "usersの行数(件数)を表す1つの数字", "usersの最初の1行", "usersの列の名前一覧"], answerIndex: 1, explanation: "COUNT(*) は行数を数える集計関数で、返ってくるのは件数を表す数字が1つだけ。全データが返るわけではありません。" },
        { id: "sqlday2-lesson1-q2", type: "free", question: "SUM(price) と AVG(price) は、それぞれ何を出すSQLか、名簿や伝票のたとえを使って説明してください。", modelAnswer: "SUM(price) はprice列の値を全部足した合計を出す。AVG(price) はその平均を出す。たとえるなら、注文伝票を全部集めて金額を足すのがSUM、それを枚数で割った1枚あたりの平均がAVG。どちらもたくさんの行を1つの数字にまとめる集計関数。", interviewPhrase: "実務でこう説明する: SUMは合計、AVGは平均を出す集計関数で、たくさんの行を1つの数字にまとめて全体像をつかむのに使います。", keywords: ["合計", "平均", "集計", "1つの数字"] }
      ]
    },
    {
      id: "sqlday2-lesson2",
      slug: "group-by",
      title: "種類ごとにまとめる — GROUP BY",
      summary: "GROUP BYで「カテゴリ別」「日別」のようにグループごとに数え直す。",
      blocks: [
        { type: "heading", text: "「全体で1つ」ではなく「種類ごとに1つ」" },
        { type: "paragraph", text: "前のレッスンのCOUNTやSUMは、全体をまとめて1つの数字にしました。でも実務では「カテゴリ別の件数」「日別の売上」のように、種類ごとに分けて数えたいことが多いです。そこで登場するのがGROUP BY(グループ・バイ)です。" },
        { type: "paragraph", text: "たとえるなら、たくさんのカードをまず「色ごとの山」に分けて、それぞれの山の枚数を数える動きです。GROUP BY category と書くと「categoryが同じものを1つの山にまとめてね」という意味になり、その山ごとにCOUNTやSUMが働きます。" },
        { type: "heading", text: "カテゴリ別の件数を出す" },
        { type: "code", language: "sql", code: "SELECT category, COUNT(*)\nFROM items\nGROUP BY category;", caption: "itemsをcategoryごとの山に分け、山ごとの件数を出す。結果は「本 12」「文具 30」のようにカテゴリごとに1行ずつ。" },
        { type: "paragraph", text: "ポイントは、GROUP BY category と書くと、category列を一緒にSELECTに並べてよくなることです。前のレッスンで「集計と普通の列は混ぜられない」と言いましたが、GROUP BYで山に分けた基準の列(ここではcategory)なら、山ごとに1つに決まるので並べられます。" },
        { type: "heading", text: "売上をカテゴリ別に合計する" },
        { type: "code", language: "sql", code: "SELECT category, SUM(price)\nFROM orders\nGROUP BY category;", caption: "注文をカテゴリ別の山に分け、山ごとの売上合計を出す。実務でよくある「カテゴリ別売上」の形。" },
        { type: "callout", variant: "why", title: "なぜ実務で山ほど使うのか", text: "経営や分析の質問は、たいてい「〜別に」の形をしています。地域別の会員数、月別の売上、商品別の注文数。この「〜別に数える」を一手にこなすのがGROUP BYなので、集計SQLの中心になります。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「ordersテーブルをカテゴリ別に売上合計を出したい。GROUP BYを使ったSQLを書いて、なぜcategoryをSELECTに並べられるのかも説明して」と頼むと、GROUP BYの考え方が腹落ちします。" }
      ],
      questions: [
        { id: "sqlday2-lesson2-q1", type: "choice", question: "GROUP BY category は、ざっくり何をする指示?", choices: ["categoryの列を消す", "categoryが同じ行を1つの山にまとめ、その山ごとに集計する", "categoryで並び替えるだけで集計はしない", "categoryの1行目だけを取り出す"], answerIndex: 1, explanation: "GROUP BYは「同じ値のものを1つの山にまとめる」指示。その山ごとにCOUNTやSUMなどの集計が働くので、カテゴリ別の件数や合計が出せます。" },
        { id: "sqlday2-lesson2-q2", type: "free", question: "SELECT category, COUNT(*) FROM items GROUP BY category; はどんな結果になるか、カードを色ごとに分けるたとえで説明してください。", modelAnswer: "itemsの行を、categoryが同じものごとの山に分け、山ごとに件数を数える。結果はカテゴリごとに1行ずつ、たとえば「本 12」「文具 30」のように出る。カードを色ごとの山に分けて、それぞれの山の枚数を数えるのと同じ動き。", interviewPhrase: "実務でこう説明する: GROUP BYはデータを種類ごとの山に分けて、山ごとに集計する仕組みで、カテゴリ別売上や地域別会員数のような「〜別」の分析に使います。", keywords: ["山に分ける", "グループごと", "カテゴリ別", "集計"] }
      ]
    },
    {
      id: "sqlday2-lesson3",
      slug: "join",
      title: "2つの表をつなぐ — JOIN",
      summary: "なぜテーブルを分けるのか、そしてJOINでキーを使って2つの表をひもづける考え方。",
      blocks: [
        { type: "heading", text: "なぜテーブルを分けるのか" },
        { type: "paragraph", text: "実務のデータは、たいてい複数の表に分かれています。ユーザーの情報はusersテーブル、注文の情報はordersテーブル、というように。なぜ1枚にまとめず、わざわざ分けるのでしょう。" },
        { type: "paragraph", text: "理由は「同じことを何度も書きたくない」からです。もし注文伝票に毎回お客さんの名前・住所・電話番号をフルで書いていたら、同じ人が10回注文すれば同じ情報を10回書くことになります。引っ越したら10か所ぜんぶ直す必要も出てきます。これはミスのもとです。" },
        { type: "compare", bad: { label: "1枚に全部詰め込む", text: "注文ごとに、顧客の名前・住所・電話番号をそのまま書き込む。同じ人の情報が何度も重複し、変更が起きると全部を直す必要があってミスが出やすい。" }, good: { label: "分けてJOINでつなぐ", text: "顧客情報はusersに1人1行だけ持つ。ordersには「顧客番号(user_id)」だけを書き、必要なときにJOINで名前などを取りに行く。重複がなく、変更も1か所で済む。" } },
        { type: "heading", text: "キーでひもづける — 顧客番号で照合する" },
        { type: "paragraph", text: "分けた表をつなぎ直すのがJOIN(ジョイン)です。たとえるなら、注文伝票に書かれた「顧客番号」を手がかりに、名簿(users)から同じ番号の人を探して照合する動きです。この「手がかりの番号」をキー(この例ではuser_id)と呼びます。" },
        { type: "code", language: "sql", code: "SELECT orders.id, users.name\nFROM orders\nJOIN users ON orders.user_id = users.id;", caption: "ordersとusersを、orders.user_id と users.id が一致する行どうしでつなぐ。注文ごとに「どの人の注文か」の名前を並べて取れる。" },
        { type: "paragraph", text: "読み方はこうです。「ordersから始めて(FROM orders)、usersをつなぐ(JOIN users)。つなぐ条件は、ordersのuser_idとusersのidが一致すること(ON ...)」。ON以下が「同じ顧客番号どうしを照合する」の部分です。" },
        { type: "callout", variant: "warn", title: "ONのつなぐ条件を書き忘れない", text: "JOINでON(つなぐ条件)を書き忘れると、全部の行と全部の行が総当たりでくっついて、膨大な意味のない行が出てしまいます。「どのキーで照合するのか」を必ずONで指定します。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「ordersとusersをuser_idでつないで、注文IDとユーザー名を出すSQLを書いて。なぜテーブルを分けてJOINでつなぐのかも、重複の観点で説明して」と頼むと、JOINの目的まで理解できます。" }
      ],
      questions: [
        { id: "sqlday2-lesson3-q1", type: "choice", question: "JOIN ... ON orders.user_id = users.id の ON は何を表す?", choices: ["取り出す列の名前", "2つの表をどのキーで照合してつなぐかの条件", "並び替えの順番", "取り出す行数の上限"], answerIndex: 1, explanation: "ONはJOINの「つなぐ条件」。ここでは注文の顧客番号(user_id)とユーザーのid が一致する行どうしをひもづける、という照合の条件を表します。" },
        { id: "sqlday2-lesson3-q2", type: "free", question: "なぜ顧客情報を注文テーブルに毎回書かず、テーブルを分けてJOINでつなぐのか。伝票と名簿のたとえで説明してください。", modelAnswer: "同じ顧客情報を何度も書くと重複し、変更のとき全部を直す必要があってミスが出るから。だから顧客情報はusersに1人1行だけ持ち、注文には顧客番号(user_id)だけを書く。名前が必要なときは、その番号を手がかりにJOINで名簿から照合して取ってくる。伝票に顧客番号だけ書いておき、名簿と突き合わせるのと同じ。", interviewPhrase: "実務でこう説明する: 重複を避けて変更を1か所で済ませるためにテーブルを分け、必要なときにキー(user_idなど)でJOINしてつなぎ直します。", keywords: ["重複を避ける", "キー", "user_id", "照合", "つなぐ"] }
      ]
    }
  ]
};
