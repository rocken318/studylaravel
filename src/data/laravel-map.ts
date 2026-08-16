// =====================================================================
// Laravel 全体マップ用のデータ
//  - laravelTerms : 初心者向け「重要単語一覧(用語集)」
//  - laravelTrees : クラス→プロパティ/メソッド の階層を見せる「構造ツリー」
// どちらも /laravel-map ページ(LaravelMapPage)から読み込んで描画する。
// =====================================================================

// ------------------------------------------------------------------
// 重要単語一覧(用語集)
// ------------------------------------------------------------------

/** 用語のグループ(色分け・並び順に使う) */
export type LaravelTermGroup =
  | "core" // 基本の役割(MVCまわり)
  | "db" // データベース
  | "view" // 画面
  | "infra" // 土台・仕組み
  | "request"; // リクエスト処理

export interface LaravelTerm {
  /** 用語名 */
  term: string;
  /** 英語表記・別名(任意) */
  en?: string;
  group: LaravelTermGroup;
  /** 初心者にも分かる短い説明(1〜2文) */
  desc: string;
  /** ひとことで言うと(超要約。バッジ的に表示) */
  short: string;
}

export const laravelTermGroupLabels: Record<LaravelTermGroup, string> = {
  core: "基本の役割",
  db: "データベース",
  view: "画面(ビュー)",
  infra: "土台・仕組み",
  request: "リクエスト処理",
};

/** グループの表示順 */
export const laravelTermGroupOrder: LaravelTermGroup[] = [
  "core",
  "request",
  "db",
  "view",
  "infra",
];

export const laravelTerms: LaravelTerm[] = [
  // --- 基本の役割(MVC) ---
  {
    term: "MVC",
    en: "Model / View / Controller",
    group: "core",
    short: "役割を3つに分ける設計",
    desc: "アプリを「データ(Model)」「画面(View)」「仲介役(Controller)」の3つに分けて作る考え方。役割を分けることで、どこを直せばよいか分かりやすくなります。",
  },
  {
    term: "ルーティング",
    en: "Routing",
    group: "core",
    short: "URLと処理の対応表",
    desc: "「このURLに来たら、この処理を動かす」という対応づけのこと。routes/web.php に書きます。玄関で行き先を案内する受付のような役割です。",
  },
  {
    term: "コントローラ",
    en: "Controller",
    group: "core",
    short: "処理の交通整理役",
    desc: "リクエストを受け取り、必要な処理を呼び出して、結果(レスポンス)を返す仲介役。自分で計算しすぎず、薄く保つのがコツです。",
  },
  {
    term: "モデル",
    en: "Model",
    group: "core",
    short: "1つのテーブルを表すクラス",
    desc: "データベースの1つのテーブルに対応するクラス。User モデルなら users テーブル、というように結びつきます。データの読み書きの窓口になります。",
  },

  // --- リクエスト処理 ---
  {
    term: "リクエスト / レスポンス",
    en: "Request / Response",
    group: "request",
    short: "受け取る/返す",
    desc: "リクエストはブラウザからサーバへの「お願い」、レスポンスはサーバからブラウザへの「返事」。Laravelはこの一往復を組み立てる仕組みです。",
  },
  {
    term: "ミドルウェア",
    en: "Middleware",
    group: "request",
    short: "処理の前後の関所",
    desc: "リクエストがコントローラに届く前後に挟まる「関所」。ログイン確認や共通チェックなどを、ここでまとめて行えます。",
  },
  {
    term: "バリデーション",
    en: "Validation",
    group: "request",
    short: "入力値のチェック",
    desc: "フォームなどの入力値が正しいか(空でないか、メール形式か等)を確認する仕組み。不正な値を早い段階ではじき、安全とデータの質を守ります。",
  },
  {
    term: "フォームリクエスト",
    en: "Form Request",
    group: "request",
    short: "検証ルール専用クラス",
    desc: "バリデーションのルールをまとめる専用クラス。コントローラから検証の記述を追い出し、すっきり保つために使います。",
  },

  // --- データベース ---
  {
    term: "Eloquent",
    en: "Eloquent ORM",
    group: "db",
    short: "SQLを書かずにDB操作",
    desc: "LaravelのORM。テーブルをクラス(モデル)として扱い、SQLをほとんど書かずに User::find(1) のような直感的な書き方でデータを操作できます。",
  },
  {
    term: "マイグレーション",
    en: "Migration",
    group: "db",
    short: "テーブル設計の履歴",
    desc: "テーブルの作成や変更を、PHPのコードとして記録・実行する仕組み。設計の変更履歴が残り、チーム全員が同じDB構造を再現できます。",
  },
  {
    term: "リレーション",
    en: "Relation",
    group: "db",
    short: "テーブル同士の関係",
    desc: "「ユーザーは複数の投稿を持つ」のようなテーブル間のつながり。Eloquentのモデルにメソッドとして書くと、関連データを簡単にたどれます。",
  },
  {
    term: "シーダー",
    en: "Seeder",
    group: "db",
    short: "初期・テストデータ投入",
    desc: "データベースに初期データやテスト用データをまとめて入れる仕組み。開発中に何度でも同じデータを用意し直せます。",
  },
  {
    term: "クエリビルダ",
    en: "Query Builder",
    group: "db",
    short: "SQLを組み立てる道具",
    desc: "SQLをメソッドを繋げる形で組み立てられる機能。DB::table('users')->where(...) のように書け、複雑な検索も安全に作れます。",
  },

  // --- 画面(ビュー) ---
  {
    term: "Blade",
    en: "Blade Template",
    group: "view",
    short: "HTMLを作るテンプレート",
    desc: "Laravelのテンプレートエンジン。HTMLの中に @if や @foreach、{{ $name }} を書いて、データを埋め込んだ画面を作れます。",
  },
  {
    term: "ビュー",
    en: "View",
    group: "view",
    short: "利用者に見える画面",
    desc: "利用者が実際に目にするHTMLの画面部分。resources/views フォルダに Blade ファイルとして置きます。",
  },
  {
    term: "コンポーネント",
    en: "Blade Component",
    group: "view",
    short: "画面の再利用パーツ",
    desc: "ボタンやカードなど、画面の部品を再利用できる形にまとめたもの。同じ見た目を何度も書かずに済みます。",
  },

  // --- 土台・仕組み ---
  {
    term: "Artisan",
    en: "Artisan CLI",
    group: "infra",
    short: "付属のコマンド道具",
    desc: "Laravel付属のコマンドラインツール。php artisan make:controller のように打つと、雛形の自動生成やDB操作などを素早く行えます。",
  },
  {
    term: "サービスコンテナ",
    en: "Service Container",
    group: "infra",
    short: "部品を組み立てる箱",
    desc: "クラスが必要とする部品(依存)を自動で用意して渡してくれる仕組み。newを自分で書かなくても、必要なものが差し込まれます。",
  },
  {
    term: "サービスプロバイダ",
    en: "Service Provider",
    group: "infra",
    short: "起動時の初期設定係",
    desc: "アプリ起動時に「何をコンテナに登録するか」などをまとめて設定する場所。Laravelの各機能はここで組み立てられます。",
  },
  {
    term: "ファサード",
    en: "Facade",
    group: "infra",
    short: "機能への簡単な入口",
    desc: "Route:: や DB:: のように、複雑な仕組みへ短い書き方でアクセスできる窓口。裏ではサービスコンテナの部品を呼び出しています。",
  },
  {
    term: "設定ファイル",
    en: "Config",
    group: "infra",
    short: "アプリの設定値の置き場",
    desc: "config フォルダにある、アプリ全体の設定をまとめたファイル群。DB接続先やタイムゾーンなどをここで一元管理します。",
  },
  {
    term: "環境変数(.env)",
    en: "Environment Variables",
    group: "infra",
    short: "秘密や環境ごとの値",
    desc: "パスワードやAPIキー、接続先など、環境ごとに変わる値を書くファイル。コードに直接書かず .env に分けて安全に管理します。",
  },
  {
    term: "Composer",
    en: "Composer",
    group: "infra",
    short: "PHPのパッケージ管理",
    desc: "PHPのライブラリ(部品)を導入・管理するツール。Laravel本体や追加機能のインストールにも使います。",
  },
];

// ------------------------------------------------------------------
// 構造ツリー(階層図)
//  クラスの下にプロパティ/メソッドがぶら下がる様子や、
//  ディレクトリ構造・MVCの流れを、入れ子のツリーで表現する。
// ------------------------------------------------------------------

export type TreeNodeKind =
  | "root" // 図の頂点
  | "class" // クラス
  | "property" // プロパティ(変数)
  | "method" // メソッド(関数)
  | "dir" // ディレクトリ
  | "file" // ファイル
  | "concept"; // 概念・役割

export interface TreeNode {
  /** ノードの表示名 */
  label: string;
  kind: TreeNodeKind;
  /** 補足説明(任意。ノードの右側に薄く表示) */
  note?: string;
  /** 子ノード(入れ子の階層) */
  children?: TreeNode[];
}

export interface LaravelTreeGroup {
  id: string;
  title: string;
  /** この図で何が分かるかの一言 */
  caption: string;
  root: TreeNode;
}

export const laravelTrees: LaravelTreeGroup[] = [
  // === 1. Eloquent モデルクラスの構造(クラス→プロパティ/メソッド) ===
  {
    id: "model-class",
    title: "Eloquentモデルクラスの中身",
    caption:
      "1つのクラスの下に「プロパティ(設定値)」と「メソッド(動き)」がぶら下がる、クラスの基本構造です。",
    root: {
      label: "class User extends Model",
      kind: "class",
      note: "users テーブルに対応するモデル",
      children: [
        {
          label: "プロパティ",
          kind: "concept",
          note: "クラスが持つ設定・データ",
          children: [
            { label: "$table = 'users'", kind: "property", note: "対応するテーブル名" },
            { label: "$fillable = [...]", kind: "property", note: "一括代入を許す列" },
            { label: "$hidden = ['password']", kind: "property", note: "JSONで隠す列" },
            { label: "$timestamps = true", kind: "property", note: "作成/更新日時を自動管理" },
          ],
        },
        {
          label: "メソッド",
          kind: "concept",
          note: "クラスが行える動き",
          children: [
            {
              label: "posts()",
              kind: "method",
              note: "リレーション: このユーザーの投稿一覧",
            },
            {
              label: "profile()",
              kind: "method",
              note: "リレーション: 1対1のプロフィール",
            },
            {
              label: "getFullNameAttribute()",
              kind: "method",
              note: "アクセサ: 姓名を結合して返す",
            },
            {
              label: "scopeActive()",
              kind: "method",
              note: "スコープ: 有効なユーザーだけ絞り込む",
            },
          ],
        },
      ],
    },
  },

  // === 2. MVC + リクエストの流れ ===
  {
    id: "mvc-flow",
    title: "MVCとリクエストの流れ",
    caption:
      "ブラウザからのリクエストが、どの部品を通ってレスポンスになるのかを上から順にたどれます。",
    root: {
      label: "HTTPリクエスト(ブラウザから)",
      kind: "root",
      children: [
        {
          label: "ルーティング (routes/web.php)",
          kind: "concept",
          note: "URLから担当を決める",
          children: [
            {
              label: "ミドルウェア",
              kind: "concept",
              note: "前後の関所(ログイン確認など)",
              children: [
                {
                  label: "Controller",
                  kind: "class",
                  note: "処理の交通整理",
                  children: [
                    {
                      label: "Model (Eloquent)",
                      kind: "class",
                      note: "DBからデータを取得",
                    },
                    {
                      label: "View (Blade)",
                      kind: "concept",
                      note: "データを埋めてHTML生成",
                      children: [
                        {
                          label: "HTTPレスポンス(ブラウザへ)",
                          kind: "root",
                          note: "完成したHTMLを返す",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },

  // === 3. プロジェクトのディレクトリ構造 ===
  {
    id: "project-tree",
    title: "Laravelプロジェクトのフォルダ構成",
    caption:
      "「どのファイルがどこにあるか」の地図。役割ごとにフォルダが分かれています。",
    root: {
      label: "my-app/",
      kind: "dir",
      note: "プロジェクトの一番上",
      children: [
        {
          label: "app/",
          kind: "dir",
          note: "アプリ本体のPHP",
          children: [
            {
              label: "Http/",
              kind: "dir",
              children: [
                { label: "Controllers/", kind: "dir", note: "コントローラ群" },
                { label: "Middleware/", kind: "dir", note: "ミドルウェア群" },
              ],
            },
            { label: "Models/", kind: "dir", note: "Eloquentモデル群" },
            { label: "Providers/", kind: "dir", note: "サービスプロバイダ" },
          ],
        },
        {
          label: "routes/",
          kind: "dir",
          note: "ルーティング定義",
          children: [
            { label: "web.php", kind: "file", note: "画面向けのルート" },
            { label: "api.php", kind: "file", note: "API向けのルート" },
          ],
        },
        {
          label: "resources/",
          kind: "dir",
          children: [{ label: "views/", kind: "dir", note: "Bladeテンプレート" }],
        },
        {
          label: "database/",
          kind: "dir",
          children: [
            { label: "migrations/", kind: "dir", note: "テーブル設計の履歴" },
            { label: "seeders/", kind: "dir", note: "初期データ" },
          ],
        },
        { label: "config/", kind: "dir", note: "設定ファイル群" },
        { label: "public/", kind: "dir", note: "公開フォルダ(入口 index.php)" },
        { label: ".env", kind: "file", note: "環境ごとの秘密の値" },
        { label: "composer.json", kind: "file", note: "依存パッケージ一覧" },
      ],
    },
  },
];
