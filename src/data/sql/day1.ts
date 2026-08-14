import type { Day } from "@/types";
export const sqlDay1: Day = {
  day: 1, slug: "day1", title: "取り出す — SELECT でデータを読む",
  goal: "SELECT と FROM の基本、WHERE での絞り込み、ORDER BY での並び替え、LIMIT での件数制限を読めて、人にやさしく説明できるようになる。",
  lessons: [
    {
      id: "sqlday1-lesson1", slug: "select-from",
      title: "SELECT と FROM — どこから何を取り出すか",
      summary: "データベースから欲しい列を取り出す一番基本の形、SELECT ... FROM ... を読めるようにします。",
      blocks: [
        { type: "heading", text: "データに「これください」とお願いする" },
        { type: "paragraph", text: "SQL は、たくさんのデータをしまってある倉庫（データベース）に「これください」とお願いするための言葉です。その中でいちばん基本のお願いが SELECT（セレクト）です。「どの列がほしいか」を SELECT で、「どの表（テーブル）から取り出すか」を FROM で伝えます。" },
        { type: "paragraph", text: "たとえるなら、名簿を持った係の人に「この名簿から、名前と年齢のところだけ書き写してください」と頼む注文書のようなものです。SELECT が「書き写してほしい項目」、FROM が「どの名簿から」にあたります。" },
        { type: "code", language: "sql", code: "SELECT name, age\nFROM users;", caption: "users という表から、name（名前）と age（年齢）の列だけを取り出す" },
        { type: "paragraph", text: "上の文はこう読めます。「users テーブルから、name と age を取り出してください」。取り出したい列はカンマ（,）で区切って並べます。最後のセミコロン（;）は「お願いはここまで」という区切りの合図です。" },
        { type: "callout", variant: "info", title: "SELECT * ってなに？", text: "SELECT のあとに書く * は「全部の列」という意味です。SELECT * FROM users; と書くと、name も age も、その表にある列を丸ごと全部取り出します。列を選ぶのが面倒なときの「とりあえず全部見せて」ボタンだと思ってください。" },
        { type: "compare", bad: { label: "ぼんやりしたお願い", text: "「users のデータちょうだい」だけでは、機械はどの列がほしいのか分かりません。" }, good: { label: "はっきりしたお願い", text: "SELECT name, age FROM users; なら、ほしい列と取り出し元がひと目で分かります。" } },
        { type: "callout", variant: "why", title: "なぜ列を選ぶの？", text: "全部の列を出す（SELECT *）と楽ですが、必要ない情報まで出てきて見づらくなります。ほしい列だけを名指しすると、結果がすっきりして、何を見たいのかも伝わりやすくなります。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「users テーブルから name と age だけを取り出す SQL を書いて、各行が何をしているか日本語でコメントを付けて」" }
      ],
      questions: [
        { id: "sqlday1-lesson1-q1", type: "choice", question: "SELECT name, age FROM users; の FROM の役割はどれ？", choices: ["取り出したい列を指定する", "どのテーブルから取り出すかを指定する", "並び替えの順番を決める", "件数を制限する"], answerIndex: 1, explanation: "FROM は「どのテーブル（表）から取り出すか」を指定します。取り出す列を決めるのは SELECT のほうです。" },
        { id: "sqlday1-lesson1-q2", type: "choice", question: "SELECT * FROM users; の * はどういう意味？", choices: ["最初の1件だけ", "全部の列", "name という列だけ", "エラーを無視する記号"], answerIndex: 1, explanation: "* は「全部の列」を表します。その表にある列を丸ごと取り出します。" },
        { id: "sqlday1-lesson1-q3", type: "free", question: "SELECT と FROM がそれぞれ何を指定するものか、SQL を知らない人に一言で説明してみましょう。", modelAnswer: "SELECT は「どの列がほしいか」、FROM は「どのテーブルから取り出すか」を指定するもの。名簿の係に「この名簿から、この項目を書き写して」と頼むイメージです。", interviewPhrase: "実務でこう説明する: SELECT は取り出す列、FROM は取り出し元のテーブルを指定します。この2つがクエリのいちばんの土台です。", keywords: ["SELECT", "列", "FROM", "テーブル"] }
      ]
    },
    {
      id: "sqlday1-lesson2", slug: "where",
      title: "WHERE — 条件に合う行だけ絞り込む",
      summary: "WHERE を使って「20歳以上の人だけ」「名前が太郎の人だけ」のように、条件に合う行だけを取り出す方法を読めるようにします。",
      blocks: [
        { type: "heading", text: "全部じゃなくて「この条件の人だけ」" },
        { type: "paragraph", text: "SELECT と FROM だけだと、表の全部の行が出てきます。でも実際には「20歳以上の人だけ見たい」「名前が太郎の人だけ探したい」ということがよくあります。そんなときに使うのが WHERE（ホエア）です。" },
        { type: "paragraph", text: "たとえるなら、名簿を全員分めくるのではなく「20歳以上の人だけ抜き出してください」と条件を付けてお願いする感じです。WHERE のうしろに、その条件を書きます。" },
        { type: "code", language: "sql", code: "SELECT name, age\nFROM users\nWHERE age >= 20;", caption: "age（年齢）が20以上の行だけを取り出す" },
        { type: "paragraph", text: "この文はこう読めます。「users から name と age を取り出す。ただし age が20以上の行だけ」。>= は「以上」という意味の比較の記号（比較演算子）です。" },
        { type: "list", items: ["= は「等しい」（例: age = 20 は20ちょうど）", ">= は「以上」、<= は「以下」", "> は「より大きい」、< は「より小さい」", "<> は「等しくない」"] },
        { type: "code", language: "sql", code: "SELECT name\nFROM users\nWHERE name = \"太郎\";", caption: "name が「太郎」の行だけを取り出す。文字は \" \" で囲む" },
        { type: "callout", variant: "info", title: "AND と OR で条件を組み合わせる", text: "AND は「両方とも満たす」、OR は「どちらか片方でも満たす」です。WHERE age >= 20 AND name = \"太郎\" なら「20歳以上、かつ、名前が太郎」。AND を OR に変えると「20歳以上、または、名前が太郎」になります。" },
        { type: "callout", variant: "warn", title: "文字は囲む、数字は囲まない", text: "太郎のような文字（文字列）は \"太郎\" のように引用符で囲みます。20 のような数字はそのまま書きます。引用符の付け忘れ・付けすぎはよくあるつまずきなので注意しましょう。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「users から、年齢が20以上で、かつ名前が太郎の行を取り出す SQL を書いて。WHERE の条件がどう働くか日本語で説明して」" }
      ],
      questions: [
        { id: "sqlday1-lesson2-q1", type: "choice", question: "WHERE age >= 20 はどんな行を取り出す？", choices: ["年齢がちょうど20の行だけ", "年齢が20以上の行", "年齢が20より小さい行", "年齢の列だけ（行は全部）"], answerIndex: 1, explanation: ">= は「以上」なので、20を含めてそれより大きい行を取り出します。" },
        { id: "sqlday1-lesson2-q2", type: "choice", question: "WHERE age >= 20 AND name = \"太郎\" の意味はどれ？", choices: ["20歳以上、または、名前が太郎", "20歳以上、かつ、名前が太郎", "20歳未満で名前が太郎", "20歳以上の人全員"], answerIndex: 1, explanation: "AND は「両方とも満たす」なので、20歳以上で、なおかつ名前が太郎の行だけになります。" },
        { id: "sqlday1-lesson2-q3", type: "free", question: "WHERE は何のために使うのか、そして AND と OR の違いを一言で説明してみましょう。", modelAnswer: "WHERE は条件に合う行だけを絞り込むために使います。AND は「両方の条件を満たす行」、OR は「どちらか片方でも満たす行」を取り出します。", interviewPhrase: "実務でこう説明する: WHERE で行を絞り込みます。複数条件は AND なら全部満たすもの、OR ならどれか満たすもの、と使い分けます。", keywords: ["WHERE", "条件", "絞り込み", "AND", "OR"] }
      ]
    },
    {
      id: "sqlday1-lesson3", slug: "order-limit",
      title: "ORDER BY と LIMIT — 並び替えて、必要な件数だけ",
      summary: "ORDER BY で結果を並び替え、LIMIT で件数を絞る方法を読めるようにします。「新しい順に10件」のような実務でよく出る形を覚えます。",
      blocks: [
        { type: "heading", text: "並べ替えて、上から何件かだけ見る" },
        { type: "paragraph", text: "取り出した行は、そのままだとバラバラの順で出てくることがあります。「年齢の若い順に見たい」「新しい登録順に見たい」というときに使うのが ORDER BY（オーダー バイ）です。うしろに「どの列で並べるか」を書きます。" },
        { type: "code", language: "sql", code: "SELECT name, age\nFROM users\nORDER BY age;", caption: "age の小さい順（昇順）に並べて取り出す" },
        { type: "paragraph", text: "何も付けないと昇順（小さい順・古い順）になります。大きい順（新しい順）にしたいときは、列名のうしろに DESC を付けます。逆に、はっきり昇順と書きたいときは ASC を付けます。" },
        { type: "list", items: ["ASC = 昇順（小さい順・古い順）。付けなくてもこれが標準", "DESC = 降順（大きい順・新しい順）"] },
        { type: "code", language: "sql", code: "SELECT name, created_at\nFROM users\nORDER BY created_at DESC\nLIMIT 10;", caption: "登録日時が新しい順に並べて、上から10件だけ取り出す" },
        { type: "paragraph", text: "最後の LIMIT 10 が「上から10件だけにしてね」という指定です。ORDER BY で新しい順に並べてから LIMIT 10 とすることで、「新しい順に10件」という実務でとてもよく使う形になります。" },
        { type: "callout", variant: "why", title: "なぜ並べてから絞るの？", text: "LIMIT は「上から何件」を取るだけなので、先に ORDER BY で順番を決めておかないと、どの10件が来るか運任せになります。並べ替え → 件数制限、の順番で考えると狙った結果が得られます。" },
        { type: "compare", bad: { label: "順番を決めずに絞る", text: "SELECT * FROM users LIMIT 10; は、10件は取れるが「どの10件か」が定まらない。" }, good: { label: "並べてから絞る", text: "ORDER BY created_at DESC LIMIT 10; なら「いちばん新しい10件」とはっきり言える。" } },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「users から登録が新しい順に10件だけ取り出す SQL を書いて。ORDER BY の DESC と LIMIT がそれぞれ何をしているか日本語で説明して」" }
      ],
      questions: [
        { id: "sqlday1-lesson3-q1", type: "choice", question: "ORDER BY age DESC はどんな並び順になる？", choices: ["age の小さい順（昇順）", "age の大きい順（降順）", "name のあいうえお順", "並び替えずランダム"], answerIndex: 1, explanation: "DESC は降順（大きい順・新しい順）です。何も付けない、または ASC なら昇順になります。" },
        { id: "sqlday1-lesson3-q2", type: "choice", question: "「新しい順に10件」を出すために組み合わせるのはどれ？", choices: ["WHERE と AND", "SELECT * だけ", "ORDER BY ... DESC と LIMIT 10", "FROM を2回書く"], answerIndex: 2, explanation: "ORDER BY で新しい順に並べ、LIMIT 10 で上から10件に絞ります。この2つの組み合わせが定番です。" },
        { id: "sqlday1-lesson3-q3", type: "free", question: "ORDER BY と LIMIT はそれぞれ何をするものか、そしてなぜ組み合わせて使うことが多いのかを説明してみましょう。", modelAnswer: "ORDER BY は結果を指定した列で並べ替えるもの、LIMIT は取り出す件数を制限するものです。LIMIT は上から数えるだけなので、先に ORDER BY で順番を決めてから使うと「新しい順に10件」のように狙った結果になります。", interviewPhrase: "実務でこう説明する: ORDER BY で並び順を決めて、LIMIT で件数を絞ります。ランキングや最新一覧を出すときの基本パターンです。", keywords: ["ORDER BY", "並び替え", "DESC", "LIMIT", "件数"] }
      ]
    }
  ]
};
