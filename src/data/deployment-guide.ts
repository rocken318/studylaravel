// =====================================================================
// Laravel 本番デプロイ手順チェックリスト用のデータ
//   - deployStages    : 段階(準備→ビルド→DB→最適化→稼働→確認)の定義
//   - deployChecklist : 各段階に属するチェック項目(なぜ/コマンド付き)
//   /deployment-guide ページ(DeploymentGuidePage)から読み込む。
//
//   ※ /team-development(チーム開発)・/cheatsheet(直前チェック)とは別物。
//     ここは「Laravelアプリを本番公開する手順」に特化したチェックリスト。
// =====================================================================

// ------------------------------------------------------------------
// 1. 段階(ステージ)
//   デプロイ作業を時間の流れでグルーピングする。色分け・並び順に使う。
// ------------------------------------------------------------------

/** デプロイの段階(色分け・並び順に使う) */
export type DeployStage =
  | "prepare" // 準備・環境設定
  | "build" // 依存・資産ビルド
  | "database" // データベース
  | "optimize" // 最適化(キャッシュ)
  | "run" // 稼働(worker/cron/HTTPS/監視)
  | "verify"; // デプロイ後の確認

export interface StageMeta {
  /** ステージの短い見出し */
  title: string;
  /** ステージを表す絵文字 */
  icon: string;
  /** ステージの一言サブタイトル */
  hint: string;
}

/** 各ステージのメタ情報 */
export const deployStageMeta: Record<DeployStage, StageMeta> = {
  prepare: {
    title: "準備・環境設定",
    icon: "🧰",
    hint: "本番用の .env を整え、アプリのキーを用意する土台づくり",
  },
  build: {
    title: "依存・資産ビルド",
    icon: "📦",
    hint: "本番向けに依存パッケージとフロント資産を用意する",
  },
  database: {
    title: "データベース",
    icon: "🗄️",
    hint: "テーブル構成を本番DBへ反映する",
  },
  optimize: {
    title: "最適化(キャッシュ)",
    icon: "⚡",
    hint: "設定・ルート・ビューを事前キャッシュして高速化する",
  },
  run: {
    title: "稼働(worker/cron/HTTPS)",
    icon: "🚀",
    hint: "権限・常駐処理・HTTPS・監視など、動かし続ける仕組みを整える",
  },
  verify: {
    title: "デプロイ後の確認",
    icon: "🔍",
    hint: "実際に動くか、エラーが出ていないかを最後に点検する",
  },
};

/** ステージの表示順 */
export const deployStageOrder: DeployStage[] = [
  "prepare",
  "build",
  "database",
  "optimize",
  "run",
  "verify",
];

// ------------------------------------------------------------------
// 2. チェック項目
//   各項目に「なぜ(理由)」と、必要なら「コマンド(等幅表示)」を添える。
// ------------------------------------------------------------------

export interface DeployItem {
  /** 属する段階 */
  stage: DeployStage;
  /** 項目名(チェックボックスの見出し) */
  title: string;
  /** なぜ必要か(理由・背景) */
  why: string;
  /** 実行するコマンドや設定(等幅ブロック。無い項目は省略) */
  commands?: string[];
  /** 補足の注意(任意) */
  note?: string;
}

export const deployChecklist: DeployItem[] = [
  // ---------------- 準備・環境設定 ----------------
  {
    stage: "prepare",
    title: ".env を本番用に設定する",
    why:
      "本番では動作モードを production にし、デバッグ表示を必ず切ります。APP_DEBUG=true のままだと、エラー画面に設定値やスタックトレースが露出し、重大な情報漏えいにつながります。",
    commands: [
      "APP_ENV=production",
      "APP_DEBUG=false",
      "APP_URL=https://example.com",
    ],
    note: ".env は Git に含めず、本番サーバー上で個別に用意します。",
  },
  {
    stage: "prepare",
    title: "APP_KEY を生成する",
    why:
      "APP_KEY はセッションや暗号化・署名付きURLなどの土台になる暗号鍵です。未設定だと暗号化が働かず、アプリが正しく動きません。本番では本番専用の鍵を1度だけ生成します。",
    commands: ["php artisan key:generate"],
  },
  {
    stage: "prepare",
    title: "DB・メール・キャッシュ等の接続情報を設定する",
    why:
      "本番のデータベース・メール送信・キャッシュ/セッション/キューの保存先を .env で指定します。開発用のダミー設定のままだと、接続エラーやメール未達の原因になります。",
    commands: [
      "DB_CONNECTION=mysql  DB_HOST=...  DB_DATABASE=...",
      "MAIL_MAILER=smtp  MAIL_HOST=...  MAIL_USERNAME=...",
      "SESSION_DRIVER=database  QUEUE_CONNECTION=database",
    ],
  },

  // ---------------- 依存・資産ビルド ----------------
  {
    stage: "build",
    title: "本番用に依存パッケージをインストールする",
    why:
      "本番では開発専用パッケージ(テスト等)は不要です。--no-dev で除外し、--optimize-autoloader でオートローダを最適化すると、読み込みが速くなります。",
    commands: ["composer install --no-dev --optimize-autoloader"],
  },
  {
    stage: "build",
    title: "フロント資産をビルドする",
    why:
      "CSS/JS はブラウザ向けに圧縮・最適化した「本番ビルド」が必要です。npm ci はロックファイル通りに正確に入れ、npm run build で公開用の資産を生成します。",
    commands: ["npm ci && npm run build"],
    note: "ビルド成果物(public/build 等)をサーバーへ反映するのを忘れずに。",
  },

  // ---------------- データベース ----------------
  {
    stage: "database",
    title: "マイグレーションを実行する",
    why:
      "テーブル構成(スキーマ)を本番DBへ反映します。本番では確認プロンプトが出るため、--force を付けて自動で適用します。実行前のバックアップを推奨します。",
    commands: ["php artisan migrate --force"],
    note: "--force は破壊的操作を含むことがあるため、必ずバックアップ後に。",
  },

  // ---------------- 最適化(キャッシュ) ----------------
  {
    stage: "optimize",
    title: "設定をキャッシュする",
    why:
      "毎回すべての config ファイルを読むのは無駄です。1つのファイルにまとめてキャッシュすると、起動が速くなります。設定を変更したら必ず作り直します。",
    commands: ["php artisan config:cache", "# 変更時: php artisan config:clear"],
    note: "config:cache 後は .env が直接読まれません。env() は config 経由で。",
  },
  {
    stage: "optimize",
    title: "ルートをキャッシュする",
    why:
      "ルート定義を1ファイルにまとめて読み込みを高速化します。ルートを追加・変更したら作り直しが必要です。",
    commands: ["php artisan route:cache", "# 変更時: php artisan route:clear"],
    note: "クロージャで書いたルートがあると route:cache は失敗します。",
  },
  {
    stage: "optimize",
    title: "ビューをキャッシュする",
    why:
      "Blade テンプレートを事前にコンパイルしておくと、初回表示が速くなります。テンプレートを変更したら作り直します。",
    commands: ["php artisan view:cache", "# 変更時: php artisan view:clear"],
    note: "まとめて行う php artisan optimize / optimize:clear も便利です。",
  },
  {
    stage: "optimize",
    title: "storage:link でシンボリックリンクを作る",
    why:
      "アップロードした画像などを公開するには、storage/app/public を public/storage から見えるようにリンクします。これが無いと保存したファイルにWebからアクセスできません。",
    commands: ["php artisan storage:link"],
  },

  // ---------------- 稼働 ----------------
  {
    stage: "run",
    title: "ディレクトリ権限を設定する",
    why:
      "Laravel は storage/ と bootstrap/cache/ にログ・キャッシュ・セッションを書き込みます。Webサーバーが書き込めないと「Permission denied」で真っ白になります。",
    commands: [
      "chmod -R ug+rwx storage bootstrap/cache",
      "chown -R www-data:www-data storage bootstrap/cache",
    ],
  },
  {
    stage: "run",
    title: "キュー worker を常駐させる",
    why:
      "メール送信や重い処理をキューに逃がしている場合、それを処理する worker を動かし続ける必要があります。Supervisor 等で監視し、落ちても自動で再起動させます。",
    commands: [
      "php artisan queue:work --daemon",
      "# Supervisor で常時監視・自動再起動を設定",
    ],
    note: "デプロイでコードを更新したら queue:restart で worker を入れ替えます。",
  },
  {
    stage: "run",
    title: "スケジューラ(cron)を登録する",
    why:
      "Laravel のタスクスケジュール(定期処理)は、cron が1分ごとに schedule:run を呼ぶことで動きます。cron の登録を忘れると定期処理がまったく走りません。",
    commands: [
      "* * * * * cd /path && php artisan schedule:run >> /dev/null 2>&1",
    ],
  },
  {
    stage: "run",
    title: "HTTPS/SSL を有効にする",
    why:
      "本番は必ず HTTPS にします。通信を暗号化して盗聴・改ざんを防ぎ、Cookieやログイン情報を守るためです。証明書を設定し、http は https へリダイレクトします。",
    note: "APP_URL を https に。プロキシ配下なら TrustProxies の設定も確認。",
  },
  {
    stage: "run",
    title: "ログ・監視を整える",
    why:
      "本番では画面にエラーを出さない代わりに、ログへ記録します。ログの保存先とローテーションを設定し、異常を検知できる監視/通知を用意しておくと、障害に素早く気づけます。",
    commands: ["LOG_CHANNEL=stack  LOG_LEVEL=error"],
    note: "storage/logs/laravel.log が肥大化しないようローテーションを。",
  },
  {
    stage: "run",
    title: "メンテナンスモードを使い分ける",
    why:
      "デプロイ中に中途半端な状態を見せないよう、作業前に down で停止し、完了後に up で再開します。--secret を使えば、自分だけは確認しながら作業できます。",
    commands: [
      "php artisan down --secret=\"...\"",
      "php artisan up",
    ],
  },

  // ---------------- デプロイ後の確認 ----------------
  {
    stage: "verify",
    title: "実際の動作を確認する",
    why:
      "デプロイが成功しても、本番特有の設定ミスで動かないことがあります。トップページ・ログイン・フォーム送信・画像表示など、主要な導線を実際に触って確認します。",
    note: "HTTPS表示・画像(storage:link)・メール送信も忘れず点検。",
  },
  {
    stage: "verify",
    title: "エラーログを確認する",
    why:
      "画面が正常に見えても、裏でエラーが出ていることがあります。デプロイ直後にログを確認し、想定外の警告・例外が出ていないかを点検します。",
    commands: [
      "tail -f storage/logs/laravel.log",
    ],
  },
];

/** チェック項目の総数(ページ見出しで使う) */
export const deployTotal = deployChecklist.length;
