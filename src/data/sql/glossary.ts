import type { GlossaryTerm } from "@/types";

// SQLコースの用語集。category は "sql"。
export const sqlGlossary: GlossaryTerm[] = [
  {
    slug: "database",
    term: "データベース",
    reading: "データベース",
    category: "sql",
    meaning:
      "アプリの裏側でデータを保存・整理しておく場所。ユーザー・投稿・注文などを覚えておくために使います。よく使われるのは「表(テーブル)」の形でデータを持つRDB(リレーショナルDB)。巨大で整理された名簿の集まり、とイメージすると分かりやすいです。",
    interviewExample:
      "実務でこう説明する: アプリのデータはデータベースに永続化し、必要なときにSQLで取り出して表示しています。",
    related: ["sql", "table"],
  },
  {
    slug: "sql",
    term: "SQL",
    reading: "エスキューエル",
    category: "sql",
    meaning:
      "データベースに「これ取って」「これ足して」とお願いするための専用の言葉(問い合わせ言語)。アプリを作る言語とは別枠の必須教養で、どの道に進んでもいずれ必ず出会います。まずは読めれば十分です。",
    interviewExample:
      "実務でこう説明する: データの取得・集計はSQLで書き、意図が読み取れる形を意識しています。",
    related: ["database", "select"],
  },
  {
    slug: "table",
    term: "テーブル(表)",
    reading: "テーブル",
    category: "sql",
    meaning:
      "データベースの中で、同じ種類のデータをまとめる「表」。1つのテーブルは1つの種類(ユーザー、注文など)を持ちます。Excelの1シートのイメージ。行(レコード)と列(カラム)でできています。",
    interviewExample:
      "実務でこう説明する: データは種類ごとにテーブルを分け、重複を避けて管理しています。",
    related: ["row", "column", "database"],
  },
  {
    slug: "row",
    term: "行(レコード)",
    reading: "ぎょう",
    category: "sql",
    meaning:
      "テーブルの中の1件分のデータ。名簿でいえば「1人分の行」。ユーザーテーブルなら、ユーザー1人が1行(1レコード)です。",
    interviewExample:
      "実務でこう説明する: 1件のデータは1行(レコード)として登録し、主キーで一意に識別しています。",
    related: ["table", "column", "primary-key"],
  },
  {
    slug: "column",
    term: "列(カラム)",
    reading: "れつ",
    category: "sql",
    meaning:
      "テーブルの「項目」。名簿でいえば『名前』『年齢』などの縦の列。カラムごとに入るデータの種類(文字・数値・日付など)が決まっています。",
    interviewExample:
      "実務でこう説明する: 各カラムには適切な型を設定し、想定外の値が入らないようにしています。",
    related: ["table", "row"],
  },
  {
    slug: "select",
    term: "SELECT",
    reading: "セレクト",
    category: "sql",
    meaning:
      "データを取り出す(読む)ための命令。SELECT(どの列を) FROM(どのテーブルから) の形が基本。SELECT * は「全部の列」を意味します。SQLで最もよく使う命令です。",
    interviewExample:
      "実務でこう説明する: 必要な列だけをSELECTで取得し、無駄なデータを引かないようにしています。",
    related: ["where", "sql"],
  },
  {
    slug: "where",
    term: "WHERE",
    category: "sql",
    meaning:
      "取り出す行を条件で絞り込む句。WHERE age >= 20 のように書き、条件に合う行だけを対象にします。名簿から条件に合う人だけ抜き出すイメージ。AND / OR で条件を組み合わせられます。",
    interviewExample:
      "実務でこう説明する: 対象を明確にするためWHEREで条件を絞り、意図しない行に触れないようにしています。",
    related: ["select", "delete-danger"],
  },
  {
    slug: "order-by",
    term: "ORDER BY / LIMIT",
    category: "sql",
    meaning:
      "ORDER BY は結果の並び替え(昇順ASC/降順DESC)、LIMIT は件数を絞る指定。組み合わせると「新しい順に10件」のような、実務で頻出の取り出し方ができます。",
    interviewExample:
      "実務でこう説明する: 一覧は ORDER BY で意味のある順に並べ、LIMIT でページ単位に絞って取得しています。",
    related: ["select"],
  },
  {
    slug: "aggregate",
    term: "集計関数",
    reading: "しゅうけいかんすう",
    category: "sql",
    meaning:
      "たくさんの行をまとめて計算する関数。COUNT(件数)、SUM(合計)、AVG(平均)、MAX/MIN(最大/最小)など。「全体で何件か」「売上の合計は」といった問いに答えます。",
    interviewExample:
      "実務でこう説明する: 件数や合計は集計関数で算出し、アプリ側で計算し直さないようにしています。",
    related: ["group-by"],
  },
  {
    slug: "group-by",
    term: "GROUP BY",
    category: "sql",
    meaning:
      "グループごとに集計するための句。カテゴリ別の件数、日別の売上など「〜ごと」の集計に使います。種類ごとに山分けして数えるイメージ。集計関数とセットで使います。",
    interviewExample:
      "実務でこう説明する: カテゴリ別などの集計は GROUP BY でまとめ、分析用のデータを1クエリで作っています。",
    related: ["aggregate"],
  },
  {
    slug: "join",
    term: "JOIN(結合)",
    reading: "ジョイン",
    category: "sql",
    meaning:
      "複数のテーブルをキーでつなぐ命令。注文テーブルの『顧客番号』でユーザーテーブルと照合する、のように関連づけます。データを種類ごとに分けて持ち(重複を避け)、必要なときにJOINで組み合わせるのが基本設計です。",
    interviewExample:
      "実務でこう説明する: 正規化して分けたテーブルを、必要な場面でJOINして1つの結果にまとめています。",
    related: ["foreign-key", "table"],
  },
  {
    slug: "insert",
    term: "INSERT",
    reading: "インサート",
    category: "sql",
    meaning:
      "テーブルに新しい行を追加する命令。INSERT INTO テーブル (列...) VALUES (値...) の形。名簿に新しい1人を書き足すイメージです。",
    interviewExample:
      "実務でこう説明する: 新規データはINSERTで追加し、必須項目や制約を満たす形で登録しています。",
    related: ["update", "delete-danger"],
  },
  {
    slug: "update",
    term: "UPDATE",
    reading: "アップデート",
    category: "sql",
    meaning:
      "既存の行を書きかえる命令。UPDATE ... SET ... WHERE ... の形。WHERE を付け忘れると全行が書きかわってしまうため、必ず対象を絞ります。",
    interviewExample:
      "実務でこう説明する: UPDATEは必ずWHEREで対象を限定し、実行前にSELECTで対象件数を確認しています。",
    related: ["where", "delete-danger"],
  },
  {
    slug: "delete-danger",
    term: "DELETE(危険な操作)",
    reading: "デリート",
    category: "sql",
    meaning:
      "行を削除する命令。UPDATE/DELETE は WHERE を付け忘れると全件が変わる/消える最も危険な操作です。実行前に同じ条件で SELECT して対象を確かめるのが鉄則。AIが出したこれらの命令は特に注意して読みます。",
    interviewExample:
      "実務でこう説明する: 破壊的な操作は対象を必ずWHEREで絞り、事前にSELECTで確認、必要ならバックアップも取ってから実行します。",
    related: ["where", "update"],
  },
  {
    slug: "primary-key",
    term: "主キー(primary key)",
    reading: "しゅキー",
    category: "sql",
    meaning:
      "各行を一意に識別するための列(idなど)。同じ値は2つと存在せず、行を確実に特定できます。会員番号のような『背番号』のイメージ。JOINや更新の目印になります。",
    interviewExample:
      "実務でこう説明する: 各テーブルに主キーを設け、行を一意に特定できるようにして更新や参照を安全にしています。",
    related: ["foreign-key", "row"],
  },
  {
    slug: "foreign-key",
    term: "外部キー(foreign key)",
    category: "sql",
    meaning:
      "別のテーブルの主キーを指し示す列。注文テーブルの『顧客ID』がユーザーテーブルのidを指す、のように関連をつくります。JOINでテーブルをつなぐ土台になります。",
    interviewExample:
      "実務でこう説明する: テーブル間の関連は外部キーで表現し、参照整合性を保ちながらJOINで組み合わせています。",
    related: ["primary-key", "join"],
  },
];
