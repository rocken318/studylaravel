// =====================================================================
// Laravel 認証・認可フロー用のデータ
//  - authFlowNodes   : ログイン→保護→ログアウトまでの「認証フロー図」ノード
//  - authRoleNotes   : Guard / Provider / auth ミドルウェア / session の役割注釈
//  - authzCompare    : Gate と Policy の違い(対比表)
//  - authzApis       : can / @can / authorize() / Gate::allows() の使い方一覧
//  - authzWhen       : いつどちらを使うか(使い分けの指針)
//  - authStarters    : Breeze / Fortify / Sanctum / Passport の位置づけ一覧
// すべて /auth-flow ページ(AuthFlowPage)から読み込む。
// =====================================================================

// ------------------------------------------------------------------
// 1. 認証(Authentication)フロー図のノード
//  ログインフォーム → credentials → Guard → Provider → session/remember
//  → auth ミドルウェアで保護 → ログアウト、までの主要ステップ。
// ------------------------------------------------------------------

/** 認証フローの各ノードの役割(色分けに使う) */
export type AuthTone =
  | "user" // 利用者・ブラウザ側
  | "guard" // Guard(認証方式)
  | "provider" // User Provider(ユーザー取得・照合)
  | "session" // セッション/remember
  | "guard-mw" // auth ミドルウェア(保護)
  | "logout"; // ログアウト

export interface AuthFlowNode {
  /** 短いラベル(図に太字で出す) */
  label: string;
  /** 補足(関係するクラス・設定など。小さく等幅で出す) */
  sub?: string;
  tone: AuthTone;
}

/** 認証フローの並び(ログイン → 保護 → ログアウト) */
export const authFlowNodes: AuthFlowNode[] = [
  { label: "ログインフォーム", sub: "email / password を送信", tone: "user" },
  { label: "認証情報(credentials)", sub: "['email','password']", tone: "user" },
  { label: "Guard(認証方式)", sub: "session / token", tone: "guard" },
  { label: "User Provider", sub: "DBからユーザー取得", tone: "provider" },
  { label: "パスワード照合", sub: "Hash::check()", tone: "provider" },
  { label: "セッション確立", sub: "ログイン状態を保存", tone: "session" },
  { label: "remember me(任意)", sub: "永続Cookieを発行", tone: "session" },
  { label: "auth ミドルウェアで保護", sub: "未ログインは弾く", tone: "guard-mw" },
  { label: "ログアウト", sub: "Auth::logout()", tone: "logout" },
];

// ------------------------------------------------------------------
// 認証フローに登場する主要要素の役割注釈
// ------------------------------------------------------------------
export interface AuthRoleNote {
  /** 要素名 */
  name: string;
  /** アイコン絵文字 */
  icon: string;
  tone: AuthTone;
  /** 役割の説明 */
  role: string;
  /** 関係する設定・クラス(等幅チップ) */
  refs: string[];
}

export const authRoleNotes: AuthRoleNote[] = [
  {
    name: "Guard(ガード)",
    icon: "🛡️",
    tone: "guard",
    role: "「どうやってユーザーを識別するか」の方式です。Web画面はセッションで覚える session ガード、APIはリクエストごとにトークンを見る token ガードが基本。どのガードを使うかは config/auth.php で設定します。",
    refs: ["config/auth.php (guards)", "SessionGuard", "TokenGuard", "Auth::guard('web')"],
  },
  {
    name: "User Provider(ユーザープロバイダ)",
    icon: "🗄️",
    tone: "provider",
    role: "「ユーザーをどこから、どう取り出すか」の担当です。送られた credentials を使ってDBから該当ユーザーを探し、パスワードのハッシュ照合まで行います。標準は Eloquent プロバイダ(App\\Models\\User を使用)。",
    refs: ["config/auth.php (providers)", "EloquentUserProvider", "App\\Models\\User", "Hash::check()"],
  },
  {
    name: "session(セッション)",
    icon: "🍪",
    tone: "session",
    role: "認証に成功したら「このブラウザはログイン済み」という印をセッションに保存します。以降のリクエストはセッションのIDをCookieで送ることで、毎回ログインし直さずに済みます。remember me は別の永続Cookieで期限を延ばす仕組みです。",
    refs: ["StartSession", "config/session.php", "Auth::login($user, $remember)", "remember_token カラム"],
  },
  {
    name: "auth ミドルウェア",
    icon: "🚧",
    tone: "guard-mw",
    role: "保護したいルートに付ける「関所」です。リクエストがログイン済みかをガードに問い合わせ、未ログインならログイン画面へリダイレクト(APIなら401)します。ルートやコントローラに ->middleware('auth') で付けます。",
    refs: ["Authenticate ミドルウェア", "Route::...->middleware('auth')", "middleware('auth:sanctum')"],
  },
];

// ------------------------------------------------------------------
// 2. 認可(Authorization): Gate と Policy の違い(対比表)
// ------------------------------------------------------------------
export interface AuthzCompareRow {
  /** 観点 */
  axis: string;
  /** Gate 側 */
  gate: string;
  /** Policy 側 */
  policy: string;
}

export const authzCompare: AuthzCompareRow[] = [
  {
    axis: "何に対する権限か",
    gate: "特定のモデルに紐づかない、単発・横断的な権限",
    policy: "特定のモデル(例: Post)に対する一連の権限をまとめる",
  },
  {
    axis: "定義場所",
    gate: "AuthServiceProvider の boot() で Gate::define(...)",
    policy: "app/Policies/ 配下のポリシークラス(1モデル1クラス)",
  },
  {
    axis: "生成コマンド",
    gate: "(手書きでクロージャを定義)",
    policy: "php artisan make:policy PostPolicy --model=Post",
  },
  {
    axis: "向いている場面",
    gate: "「管理者だけ」など、モデルに依存しない単純な判定",
    policy: "「自分の投稿だけ編集可」など、モデル単位の複数操作",
  },
  {
    axis: "呼び出し例",
    gate: "Gate::allows('admin-only')",
    policy: "$user->can('update', $post)",
  },
];

// ------------------------------------------------------------------
// can / @can / authorize() / Gate::allows() の使い方一覧
// ------------------------------------------------------------------
export interface AuthzApi {
  /** API 名 */
  name: string;
  /** どこで使うか */
  where: string;
  /** 何をするか */
  what: string;
  /** 失敗時の挙動 */
  onFail: string;
  /** コード例(1行) */
  code: string;
}

export const authzApis: AuthzApi[] = [
  {
    name: "$user->can(...)",
    where: "コントローラ・任意のPHP",
    what: "権限があるかを true / false で返す(判定だけ)",
    onFail: "false を返すだけ(例外は投げない)",
    code: "if ($user->can('update', $post)) { /* ... */ }",
  },
  {
    name: "@can(...) / @cannot(...)",
    where: "Blade テンプレート",
    what: "権限の有無で表示を出し分ける(ボタンの表示制御など)",
    onFail: "そのブロックを表示しないだけ",
    code: "@can('update', $post) <a href=\"...\">編集</a> @endcan",
  },
  {
    name: "$this->authorize(...)",
    where: "コントローラ(AuthorizesRequests)",
    what: "権限がなければ処理を止める(ガードとして使う)",
    onFail: "403 (AuthorizationException) を投げる",
    code: "$this->authorize('update', $post);",
  },
  {
    name: "Gate::allows(...) / denies(...)",
    where: "任意のPHP(ファサード)",
    what: "現在ログイン中のユーザーで権限を判定する",
    onFail: "false / true を返すだけ(例外は投げない)",
    code: "if (Gate::allows('update-post', $post)) { /* ... */ }",
  },
];

// ------------------------------------------------------------------
// いつどちらを使うか(使い分けの指針)
// ------------------------------------------------------------------
export interface AuthzWhen {
  icon: string;
  situation: string;
  choice: string;
}

export const authzWhen: AuthzWhen[] = [
  {
    icon: "🖥️",
    situation: "画面でボタンやリンクを出し分けたい",
    choice: "Blade の @can / @cannot(判定だけ・例外なし)",
  },
  {
    icon: "🛂",
    situation: "コントローラで「権限がなければ弾く」ようにしたい",
    choice: "$this->authorize(...)(403 を投げて処理を止める)",
  },
  {
    icon: "🔀",
    situation: "処理を分岐したい(弾かず true/false で判断)",
    choice: "$user->can(...) または Gate::allows(...)",
  },
  {
    icon: "🗂️",
    situation: "1つのモデルに複数の操作権限がある",
    choice: "Policy にまとめる(view/update/delete などを1クラスに)",
  },
  {
    icon: "🎫",
    situation: "モデルに紐づかない単発の権限(例: 管理者のみ)",
    choice: "Gate::define(...) でゲートを1つ定義",
  },
];

// ------------------------------------------------------------------
// 3. Breeze / Fortify / Sanctum / Passport の位置づけ一覧
// ------------------------------------------------------------------
export interface AuthStarter {
  name: string;
  icon: string;
  /** 一言で「何用か」 */
  tagline: string;
  /** どんな場面で選ぶか */
  detail: string;
  /** 種別タグ(UIあり=スターター / 認証基盤 / API) */
  kind: "スターターキット" | "認証バックエンド" | "API認証";
}

export const authStarters: AuthStarter[] = [
  {
    name: "Breeze",
    icon: "🌱",
    tagline: "最小構成のログイン画面つきスターター",
    detail: "ログイン・登録・パスワードリセットなどの画面と処理を一式生成。シンプルで読みやすく、認証の仕組みを学ぶ入口に最適。中身は普通のBladeやControllerなので改造しやすい。",
    kind: "スターターキット",
  },
  {
    name: "Fortify",
    icon: "🏰",
    tagline: "画面を持たない認証バックエンド(ロジックのみ)",
    detail: "ログインや2段階認証などの「処理側」だけを提供し、画面は自分で用意する前提。SPAや独自デザインで認証ロジックだけ借りたいときに使う。Breeze/Jetstream の裏側でも動いている。",
    kind: "認証バックエンド",
  },
  {
    name: "Sanctum",
    icon: "🔑",
    tagline: "SPA・モバイル・シンプルなAPIトークン認証",
    detail: "同一ドメインのSPAはCookieセッションで、外部アプリには軽量なAPIトークンで認証。多くのAPIにはこれで十分。OAuthのような重い仕組みは不要なときの第一候補。",
    kind: "API認証",
  },
  {
    name: "Passport",
    icon: "🎫",
    tagline: "本格的なOAuth2サーバー",
    detail: "第三者アプリに権限を委譲するOAuth2をフル実装。アクセストークン発行やスコープ管理が必要な大規模・外部連携向け。要件が重いぶん、まずは Sanctum で足りないか検討する。",
    kind: "API認証",
  },
];
