// =====================================================================
// Laravel リクエストライフサイクル用のデータ
//  - lifecycleOverview : ひと目で追える「概観フロー図」の主要ステップ
//  - lifecycleSteps    : 各ステップを詳しく解説する「ステップ詳細」
// どちらも /request-lifecycle ページ(RequestLifecyclePage)から読み込む。
// =====================================================================

// ------------------------------------------------------------------
// 1. 概観フロー図(一覧できる図)
//  ブラウザ → index.php → … → ブラウザ の主要ステップを矢印でつなぐ。
// ------------------------------------------------------------------

/** フローの各ノードの色分け(役割ごと) */
export type FlowTone = "browser" | "boot" | "kernel" | "middleware" | "route" | "app" | "response";

export interface FlowNode {
  /** 短いラベル(図に太字で出す) */
  label: string;
  /** 補足(関係するファイルなど。小さく出す) */
  sub?: string;
  tone: FlowTone;
}

/** 概観フローの並び(往路 → 復路 → ブラウザ) */
export const lifecycleOverview: FlowNode[] = [
  { label: "ブラウザ", sub: "URLへアクセス", tone: "browser" },
  { label: "public/index.php", sub: "全リクエストの入口", tone: "boot" },
  { label: "オートローダ読込", sub: "vendor/autoload.php", tone: "boot" },
  { label: "アプリ生成", sub: "bootstrap/app.php", tone: "boot" },
  { label: "HTTPカーネル", sub: "App\\Http\\Kernel", tone: "kernel" },
  { label: "カーネル起動処理", sub: "設定/プロバイダ register→boot", tone: "kernel" },
  { label: "ミドルウェア(往路)", sub: "セッション/CSRF/認証", tone: "middleware" },
  { label: "ルーティング", sub: "URLに一致するルートを解決", tone: "route" },
  { label: "コントローラ", sub: "検証・モデル・ロジック", tone: "app" },
  { label: "レスポンス生成", sub: "View / JSON", tone: "response" },
  { label: "ミドルウェア(復路)", sub: "逆順で通過", tone: "middleware" },
  { label: "ブラウザへ返却", sub: "そして terminate", tone: "browser" },
];

// ------------------------------------------------------------------
// 2. ステップ詳細(細かい図解)
//  各ステップで「何が起きるか / なぜ / 関係する主なファイル・クラス」を添える。
// ------------------------------------------------------------------

export interface LifecycleStep {
  /** 通し番号 */
  no: number;
  /** 見出し */
  title: string;
  /** このステップを表す絵文字 */
  icon: string;
  /** 何が起きるか(本文) */
  what: string;
  /** なぜ必要か */
  why: string;
  /** 関係する主なファイル・クラス(コード表示) */
  files: string[];
  /** 往路/復路など、流れの向きのタグ(任意) */
  phase?: "往路" | "復路" | "起動" | "終了";
}

export const lifecycleSteps: LifecycleStep[] = [
  {
    no: 1,
    title: "すべては public/index.php から始まる",
    icon: "🚪",
    phase: "起動",
    what: "ユーザーがどのURLを開いても、Webサーバー(Apache/Nginx)はリクエストをこの1つのファイルに渡します。Laravelアプリの「玄関」であり、唯一の入口です。",
    why: "入口を1か所にまとめる(フロントコントローラ方式)ことで、共通の初期化・セキュリティ処理を必ず通せます。ページごとにPHPファイルが散らばらないので、管理も安全性も高まります。",
    files: ["public/index.php"],
  },
  {
    no: 2,
    title: "Composer オートローダを読み込む",
    icon: "📦",
    phase: "起動",
    what: "index.php が最初に vendor/autoload.php を読み込みます。これで、クラス名を書くだけで対応するPHPファイルが自動で読み込まれるようになります。",
    why: "Laravel本体や外部パッケージは何千ものクラスに分かれています。require を手書きせず、必要になった瞬間に自動で読み込む仕組みがないと現実的に動かせません。",
    files: ["vendor/autoload.php", "composer.json"],
  },
  {
    no: 3,
    title: "アプリケーションインスタンスを生成する",
    icon: "🏗️",
    phase: "起動",
    what: "bootstrap/app.php が実行され、Laravelの中心となるアプリケーション(サービスコンテナ)が1つ作られます。これがアプリ全体の「部品箱」であり、以後あらゆる機能をここから取り出します。",
    why: "この箱(コンテナ)があるおかげで、必要なクラスを自動で組み立てて渡す「依存性の注入」が働きます。アプリの土台となる、たった1つの出発点です。",
    files: ["bootstrap/app.php", "Illuminate\\Foundation\\Application"],
  },
  {
    no: 4,
    title: "HTTPカーネルがリクエストを受け取る",
    icon: "🧠",
    phase: "往路",
    what: "生成したアプリからHTTPカーネルを取り出し、handle() にリクエストを渡します。カーネルはリクエスト受付〜レスポンス返却までの全体の司令塔です。",
    why: "「入ってきたリクエストを、どんな順番で処理してレスポンスにするか」という一連の流れを1つのクラスに集約するため。ここが処理全体の背骨になります。",
    files: ["App\\Http\\Kernel", "Illuminate\\Foundation\\Http\\Kernel", "index.php → $kernel->handle($request)"],
  },
  {
    no: 5,
    title: "カーネルの起動処理(bootstrap)",
    icon: "⚙️",
    phase: "往路",
    what: "handle() の中で、まず一連の起動処理が走ります。環境変数(.env)と設定(config)の読込、ロギングと例外ハンドラの登録、そして各サービスプロバイダの register→boot が順に行われます。register で部品をコンテナに「登録」し、boot でそれらを「起動」します。この段階でDB接続・ルート定義・認証などアプリの機能が使える状態に整います。",
    why: "コントローラが動く前に、設定・DB・ルートなど土台が全部そろっていないと処理できません。register(登録)と boot(起動)を2段階に分けるのは、全プロバイダの登録が終わってから起動することで、機能同士がお互いを安全に参照できるようにするためです。",
    files: ["config/app.php (providers)", "app/Providers/*", "AppServiceProvider::register()", "AppServiceProvider::boot()", "RouteServiceProvider"],
  },
  {
    no: 6,
    title: "ミドルウェアを往路で通過する",
    icon: "🛂",
    phase: "往路",
    what: "リクエストはコントローラへ届く前に、ミドルウェアのパイプラインを順番に通ります。まず全リクエスト共通の「グローバルミドルウェア」、続いてルートが属するグループの「ルートミドルウェア」を通過。ここでセッション開始・CSRFトークン確認・認証チェックなどが行われます。各ミドルウェアは「$next($request) を呼ぶ前=往路」「呼んだ後=復路」の両方に処理を書けます。",
    why: "「ログインしていなければ弾く」「毎回セッションを用意する」といった共通の前処理を、各コントローラに書かずに1か所へ集約するため。関所を並べるように、通過条件を層で重ねられます。",
    files: ["App\\Http\\Kernel ($middleware / $middlewareGroups)", "app/Http/Middleware/*", "VerifyCsrfToken", "Authenticate", "$next($request)"],
  },
  {
    no: 7,
    title: "ルーターがルートを解決しディスパッチ",
    icon: "🧭",
    phase: "往路",
    what: "ミドルウェアを抜けると、ルーターがリクエストのURLとHTTPメソッドに一致するルートを探します。見つかったルートに紐づくコントローラのメソッド(またはクロージャ)へ処理を振り分け(ディスパッチ)ます。ルートモデルバインディングが設定されていれば、この時点でIDから自動でモデルが取得されます。",
    why: "「このURLはこの処理」という対応を1か所(routes)で管理し、URLごとに正しい担当へ確実に届けるため。ルートに専用のミドルウェアを付けることもできます。",
    files: ["routes/web.php", "routes/api.php", "Illuminate\\Routing\\Router", "Route::get(...)->controller"],
  },
  {
    no: 8,
    title: "コントローラが本処理を実行",
    icon: "🎛️",
    phase: "往路",
    what: "呼ばれたコントローラのメソッドが動きます。フォームリクエストなどで入力値を検証(バリデーション)し、Eloquentモデルでデータベースを読み書きし、必要な計算やビジネスロジックを行います。必要な依存クラスは引数に書くだけでコンテナが自動注入します。",
    why: "アプリの「やりたいこと」の本体だからです。ルーティングやミドルウェアが整えた条件のもとで、実際の業務処理をここに書きます(コントローラは薄く保つのがコツ)。",
    files: ["app/Http/Controllers/*", "app/Http/Requests/* (FormRequest)", "app/Models/* (Eloquent)"],
  },
  {
    no: 9,
    title: "レスポンスを生成する",
    icon: "🧾",
    phase: "往路",
    what: "コントローラは処理結果を「レスポンス」として返します。画面ならBladeテンプレートにデータを埋めてHTMLを作り(View)、APIなら配列やモデルをJSONに変換します。返した値はLaravelが Response オブジェクトに整えます。",
    why: "ブラウザやアプリが受け取れる形(HTTPレスポンス)にまとめる必要があるため。ここで初めて「返事」の中身が完成します。",
    files: ["resources/views/*.blade.php", "Illuminate\\Http\\Response", "response()->json(...)", "return view(...)"],
  },
  {
    no: 10,
    title: "レスポンスがミドルウェアを復路で通過",
    icon: "↩️",
    phase: "復路",
    what: "生成されたレスポンスは、往路で通ったミドルウェアを今度は逆順に通り抜けてブラウザへ向かいます。各ミドルウェアの「$next($request) を呼んだ後」の処理がここで実行され、Cookieやセッションの保存、共通ヘッダーの付与などが行われます。",
    why: "往路で始めた処理を締めくくるため。例えば「セッションを開始したなら、最後に保存する」といった後始末を、往路と対になる形で確実に行えます。逆順なのは、後から被せた層を先に外していくイメージです。",
    files: ["app/Http/Middleware/*", "StartSession (往路で開始→復路で保存)", "AddQueuedCookiesToResponse"],
  },
  {
    no: 11,
    title: "terminate(終了処理)",
    icon: "🏁",
    phase: "終了",
    what: "レスポンスがブラウザへ送り返された後、カーネルの terminate() が呼ばれ、「terminable(終了可能)ミドルウェア」の terminate 処理が走ります。ユーザーを待たせずに、セッションのゴミ掃除やログの書き出しなどの後処理を行います。",
    why: "レスポンスをできるだけ速くユーザーへ返しつつ、重い後始末は返却後にまわすため。体感速度を保ちながら必要な片付けを済ませられます。",
    files: ["App\\Http\\Kernel::terminate()", "Middleware::terminate($request, $response)"],
  },
];
