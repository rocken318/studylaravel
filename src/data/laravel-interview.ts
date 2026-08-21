// =====================================================================
// Laravel 実務Q&A 一覧表(チートシート)用のデータ
//   実務でよく問われる Laravel 関連の質問を、
//   カテゴリごとに「質問 / 回答のポイント / 自分の言葉での一言」の3列でまとめる。
//   /laravel-interview ページ(LaravelInterviewPage)から読み込んで
//   テーブル形式で描画する。
//
//   ※ 既存の /interview(NG/加点/なぜ差がつくか の深掘り問答集)や
//     /glossary(横断用語集)とは別物。ここは「一覧でサッと要点を
//     見返す暗記シート」という切り口に特化する。
// =====================================================================

/** 質問のカテゴリ(色分け・並び順に使う) */
export type LaravelInterviewCategory =
  | "basic" // 基礎
  | "eloquent" // Eloquent・DB
  | "design" // 設計・仕組み
  | "practice"; // 実務

export interface LaravelInterviewRow {
  /** よく聞かれる質問 */
  question: string;
  /** 回答のポイント(端的な要点・キーフレーズ) */
  point: string;
  /** 自分の言葉での一言(そのまま口に出せる言い換え例) */
  phrase: string;
}

export const laravelInterviewCategoryLabels: Record<
  LaravelInterviewCategory,
  string
> = {
  basic: "基礎",
  eloquent: "Eloquent・DB",
  design: "設計・仕組み",
  practice: "実務",
};

/** カテゴリの一言サブタイトル(表の見出し補足) */
export const laravelInterviewCategoryHints: Record<
  LaravelInterviewCategory,
  string
> = {
  basic: "MVC・ルーティング・Blade など、まず押さえる土台",
  eloquent: "ORM・リレーション・N+1 など、データ操作まわり",
  design: "サービスコンテナ・DI・ライフサイクルなど、仕組みの理解",
  practice: "バリデーション・認証・テストなど、現場で使う知識",
};

/** カテゴリの表示順 */
export const laravelInterviewCategoryOrder: LaravelInterviewCategory[] = [
  "basic",
  "eloquent",
  "design",
  "practice",
];

/** 各行が属するカテゴリを持たせた一覧データ */
export interface LaravelInterviewGroup {
  category: LaravelInterviewCategory;
  rows: LaravelInterviewRow[];
}

export const laravelInterviewTable: LaravelInterviewGroup[] = [
  // ================================================================
  // 基礎
  // ================================================================
  {
    category: "basic",
    rows: [
      {
        question: "MVCとは何ですか?",
        point:
          "アプリを Model(データ)・View(画面)・Controller(仲介)の3つの役割に分ける設計。責務を分離して保守性を上げる考え方。",
        phrase:
          "Modelがデータ、Viewが表示、Controllerがその仲介で、役割を分けて保守しやすくする設計だと理解しています。",
      },
      {
        question: "ルーティングの役割は?",
        point:
          "「どのURLに来たら、どの処理を呼ぶか」の対応づけ。routes/web.php や routes/api.php に定義する。",
        phrase:
          "URLとコントローラの処理を結びつける入口で、web.php や api.php に書きます。",
      },
      {
        question: "コントローラの責務は?",
        point:
          "リクエストを受け取り、必要な処理へ振り分け、レスポンスを返す交通整理役。業務ロジックは書きすぎず薄く保つ。",
        phrase:
          "処理の振り分け役に徹して、ロジックはサービス層に切り出し薄く保つよう意識しています。",
      },
      {
        question: "Bladeテンプレートとは?",
        point:
          "Laravel標準のテンプレートエンジン。{{ }} での出力や @if / @foreach、レイアウト継承・コンポーネントが使える。",
        phrase:
          "HTMLにデータを埋め込むテンプレートで、継承やコンポーネントで画面を再利用できます。",
      },
      {
        question: "マイグレーションとは?",
        point:
          "テーブルの作成・変更を PHP コードで記録・実行する仕組み。バージョン管理でき、チームで同じDB構造を再現できる。",
        phrase:
          "DB構造の変更履歴をコードで管理する仕組みで、誰でも同じテーブルを再現できます。",
      },
      {
        question: "Artisanコマンドとは?",
        point:
          "Laravel付属のCLIツール。make:controller などの雛形生成、migrate、tinker、キュー実行などを行う。",
        phrase:
          "php artisan で雛形生成やマイグレーションなど定型作業を素早く行えるコマンド群です。",
      },
      {
        question: "ルートモデルバインディングとは?",
        point:
          "ルートのパラメータから自動でモデルを解決して注入する仕組み。show(User $user) のように受け取れる。",
        phrase:
          "URLのIDから対応するモデルを自動で取ってきて渡してくれる仕組みで、find を書かずに済みます。",
      },
    ],
  },

  // ================================================================
  // Eloquent・DB
  // ================================================================
  {
    category: "eloquent",
    rows: [
      {
        question: "Eloquent ORMとは?",
        point:
          "テーブルをモデルクラスとして扱う仕組み。SQLをほぼ書かずに User::find(1) のような直感的な操作ができる。",
        phrase:
          "テーブルをモデルとして操作できるORMで、SQLを書かずに直感的にデータを扱えます。",
      },
      {
        question: "リレーションの種類は?",
        point:
          "hasOne / hasMany / belongsTo / belongsToMany など。モデルにメソッドとして定義し、関連データをたどれる。",
        phrase:
          "1対多なら hasMany と belongsTo、多対多は belongsToMany で表現し、関連データを簡単にたどれます。",
      },
      {
        question: "N+1問題とは? 対策は?",
        point:
          "一覧取得後に関連を1件ずつ取り、クエリが大量発行される問題。with() の Eager Loading でまとめて取得して解決する。",
        phrase:
          "ループ内で関連を都度取ってクエリが増える問題で、with()のEager Loadingで一括取得して防ぎます。",
      },
      {
        question: "Eager Loading と Lazy Loading の違いは?",
        point:
          "Eagerは with() で関連を先読み。Lazyはアクセス時に都度取得。一覧+関連表示では Eager が基本。",
        phrase:
          "先にまとめて読むのがEager、必要時に都度読むのがLazyで、一覧表示ではEagerを選びます。",
      },
      {
        question: "Eloquent とクエリビルダの違いは?",
        point:
          "Eloquentはモデル単位でオブジェクトを返し可読性が高い。クエリビルダは DB::table() でSQL寄り・軽量。大量集計等で使い分ける。",
        phrase:
          "可読性重視ならEloquent、大量データや複雑な集計では軽いクエリビルダ、と用途で使い分けます。",
      },
      {
        question: "マイグレーションとシーダーの違いは?",
        point:
          "マイグレーションは「テーブルの構造」を作る。シーダーは「中身のデータ(初期・テスト用)」を入れる。役割が別。",
        phrase:
          "構造を作るのがマイグレーション、初期データを入れるのがシーダーと役割が分かれています。",
      },
      {
        question: "マスアサインメントとは? 対策は?",
        point:
          "リクエスト値を一括代入する機能。意図しない列の書き換えを防ぐため $fillable / $guarded で許可列を制限する。",
        phrase:
          "一括代入で余計な列を書き換えられないよう、$fillableで許可する列を明示します。",
      },
      {
        question: "ソフトデリートとは?",
        point:
          "物理削除せず deleted_at に日時を入れて論理削除する仕組み。SoftDeletes トレイトで有効化。復元も可能。",
        phrase:
          "実際には消さず deleted_at で削除扱いにする仕組みで、あとから復元もできます。",
      },
    ],
  },

  // ================================================================
  // 設計・仕組み
  // ================================================================
  {
    category: "design",
    rows: [
      {
        question: "サービスコンテナとは?",
        point:
          "クラスの依存を自動で解決・生成して渡してくれる箱。LaravelのDIの中核で、bind/singleton で登録する。",
        phrase:
          "必要な部品(依存)を自動で組み立てて渡してくれる仕組みで、LaravelのDIの中核です。",
      },
      {
        question: "依存性注入(DI)とは?",
        point:
          "依存オブジェクトを自分でnewせず外から受け取る設計。疎結合になり、テスト時にモックへ差し替えやすい。",
        phrase:
          "依存を外から渡す設計で、結合を弱くしてテストや差し替えをしやすくします。",
      },
      {
        question: "ファサードとは?",
        point:
          "Route:: や Cache:: のように、静的呼び出しの見た目でコンテナ内の実体へアクセスする窓口。実体は解決可能でテストしやすい。",
        phrase:
          "コンテナ内のクラスへ静的メソッド風にアクセスできる入口で、短く書けてテストも可能です。",
      },
      {
        question: "サービスプロバイダとは?",
        point:
          "アプリ起動時にコンテナへの登録(register)や初期化(boot)を行う場所。各機能はここで組み立てられる。",
        phrase:
          "起動時に何をコンテナへ登録するかをまとめる場所で、register と boot の2段階で設定します。",
      },
      {
        question: "ミドルウェアとは?",
        point:
          "リクエストがコントローラに届く前後に挟む処理。認証チェック・CSRF・ログなど横断的な関心事をまとめて扱う。",
        phrase:
          "処理の前後に挟む関所で、ログイン確認やCSRFなど共通処理をまとめて行います。",
      },
      {
        question: "リクエストのライフサイクルは?",
        point:
          "public/index.php → カーネル起動 → ミドルウェア → ルーティング → コントローラ → レスポンス、の流れ。",
        phrase:
          "index.phpが入口で、カーネルとミドルウェアを通りルーティングからコントローラへ渡り、レスポンスを返します。",
      },
      {
        question: "サービスプロバイダの register と boot の違いは?",
        point:
          "registerはバインド登録だけを行う(他サービス未確定)。bootは全登録後に呼ばれ、実際の初期化処理を書く。",
        phrase:
          "registerで登録だけ行い、全部揃った後のbootで初期化する、と順序を分けて理解しています。",
      },
    ],
  },

  // ================================================================
  // 実務
  // ================================================================
  {
    category: "practice",
    rows: [
      {
        question: "バリデーションはどう書きますか?",
        point:
          "$request->validate() か FormRequest クラスに rules() を定義。ルールが複雑ならFormRequestで分離するのが定石。",
        phrase:
          "軽ければvalidate()、複雑ならFormRequestにrules()を切り出してコントローラを薄く保ちます。",
      },
      {
        question: "認証(auth)はどう実装しますか?",
        point:
          "Breeze / Fortify / Sanctum などのスターターを利用。auth ミドルウェアでルート保護、Auth::user() で取得。",
        phrase:
          "BreezeやSanctumを使い、authミドルウェアでルートを保護し、Auth::user()でログイン中のユーザーを扱います。",
      },
      {
        question: "CSRF対策はどうしていますか?",
        point:
          "Laravelはトークンで自動対策。Bladeの @csrf でフォームにトークンを埋め込み、ミドルウェアが検証する。",
        phrase:
          "フォームに@csrfでトークンを入れ、ミドルウェアが照合するのでCSRFを自動で防げます。",
      },
      {
        question: "環境変数(.env)の役割は?",
        point:
          "DB接続・APIキーなど環境ごとに変わる値・秘密情報を置く。コードに直書きせず config 経由で参照。Gitには含めない。",
        phrase:
          "接続情報や秘密の値を環境ごとに.envに分け、config経由で読むことでコードに直書きしません。",
      },
      {
        question: "キャッシュとキューの使いどころは?",
        point:
          "キャッシュは重い処理・結果を一時保存して高速化。キューはメール送信等の重い処理を非同期で後回しにする。",
        phrase:
          "重い結果はキャッシュで速く、時間のかかる処理はキューで非同期にしてレスポンスを軽くします。",
      },
      {
        question: "テスト(PHPUnit)はどう書きますか?",
        point:
          "Feature/Unit に分け、artisan test で実行。RefreshDatabase でDBを毎回初期化し、$this->get() 等で振る舞いを検証。",
        phrase:
          "FeatureとUnitに分け、RefreshDatabaseで初期化しつつ、リクエストの振る舞いを検証しています。",
      },
      {
        question: "例外処理・エラー表示はどう扱いますか?",
        point:
          "App\\Exceptions\\Handler で集中管理。abort() や独自例外を投げ、環境で表示を切替(本番は詳細を隠す)。",
        phrase:
          "例外はHandlerで一元的に扱い、本番では詳細を隠して安全なエラー画面を返すようにします。",
      },
    ],
  },
];

/** 全行数(見出しのカウント表示などに使う) */
export const laravelInterviewTotal = laravelInterviewTable.reduce(
  (sum, g) => sum + g.rows.length,
  0
);
