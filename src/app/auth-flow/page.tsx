"use client";

import {
  authFlowNodes,
  authRoleNotes,
  authzCompare,
  authzApis,
  authzWhen,
  authStarters,
  type AuthTone,
  type AuthStarter,
} from "@/data/auth-flow";

// ------------------------------------------------------------------
// 認証フロー: ノードの役割ごとの色
// ------------------------------------------------------------------
const authToneClass: Record<AuthTone, string> = {
  user: "border-accent/50 bg-accent-bg text-accent",
  guard: "border-brand/40 bg-brand-bg text-brand",
  provider: "border-good/40 bg-good-bg text-good",
  session: "border-accent/40 bg-accent-bg text-accent",
  "guard-mw": "border-brand/40 bg-brand-bg text-brand",
  logout: "border-base-border bg-base-surface text-ink",
};

// ------------------------------------------------------------------
// スターターキットの種別タグの色
// ------------------------------------------------------------------
const starterKindClass: Record<AuthStarter["kind"], string> = {
  スターターキット: "bg-good-bg text-good",
  認証バックエンド: "bg-brand-bg text-brand",
  API認証: "bg-accent-bg text-accent",
};

export default function AuthFlowPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <p className="mb-1 text-sm font-medium text-accent">
          Laravel 認証・認可フロー図解
        </p>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          「ログインの仕組み」と「権限チェック」を図でつかむ
        </h1>
        <p className="mt-2 max-w-reading leading-relaxed text-ink-soft">
          Laravelのセキュリティは大きく2つに分かれます。
          <strong className="text-ink">認証(Authentication)</strong>
          は「あなたは誰か(ログイン済みか)」の確認、
          <strong className="text-ink">認可(Authorization)</strong>
          は「その人に、この操作をする権限があるか」の確認です。
          ここではまず認証の流れをフロー図で追い、続いて認可(Gate と Policy)の
          使い分けをコード例つきで整理します。
        </p>
      </header>

      {/* ============================================================ */}
      {/* 1. 認証(Authentication)フロー図 */}
      {/* ============================================================ */}
      <section className="mb-14">
        <h2 className="mb-1 flex items-center gap-2 text-xl font-bold text-ink">
          <span aria-hidden>🔐</span>
          認証(Authentication)フロー
        </h2>
        <p className="mb-5 text-sm text-ink-soft">
          ログインフォームの送信から、Guard と User Provider による本人確認、
          セッション確立、その後の <span className="font-mono text-xs">auth</span>{" "}
          ミドルウェアによる保護、ログアウトまでの流れです。
        </p>

        {/* 凡例 */}
        <div className="mb-5 flex flex-wrap gap-2 text-xs text-ink-soft">
          <AuthLegend tone="user" label="利用者・入力" />
          <AuthLegend tone="guard" label="Guard(認証方式)" />
          <AuthLegend tone="provider" label="User Provider" />
          <AuthLegend tone="session" label="セッション/remember" />
          <AuthLegend tone="guard-mw" label="auth ミドルウェア" />
          <AuthLegend tone="logout" label="ログアウト" />
        </div>

        {/* フロー図: スマホ=縦 / sm以上=横に折り返し */}
        <div className="rounded-2xl border border-base-border bg-base-surface p-4 shadow-sm sm:p-6">
          <ol className="flex flex-col items-stretch gap-0 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-y-2">
            {authFlowNodes.map((node, i) => {
              const last = i === authFlowNodes.length - 1;
              return (
                <li
                  key={node.label}
                  className="flex flex-col items-center sm:flex-row"
                >
                  <div
                    className={`flex min-h-[3.5rem] w-full flex-col items-center justify-center rounded-xl border px-3 py-2 text-center sm:w-40 ${
                      authToneClass[node.tone]
                    }`}
                  >
                    <span className="text-sm font-bold leading-tight">
                      {node.label}
                    </span>
                    {node.sub && (
                      <span className="mt-0.5 font-mono text-[10px] leading-tight opacity-80">
                        {node.sub}
                      </span>
                    )}
                  </div>
                  {!last && (
                    <span
                      aria-hidden
                      className="my-1 text-ink-faint sm:my-0 sm:mx-1"
                    >
                      <span className="sm:hidden">↓</span>
                      <span className="hidden sm:inline">→</span>
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
        <p className="mt-3 text-xs text-ink-faint">
          ※ Guard が「どう識別するか」、User Provider が「どこから取り出して照合するか」を担当します。
          Web画面は session ガード、APIは token ガード(Sanctumなど)が基本です。
        </p>

        {/* 各要素の役割注釈 */}
        <h3 className="mb-3 mt-8 flex items-center gap-2 text-base font-bold text-ink">
          <span aria-hidden>📝</span>
          登場する部品の役割
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {authRoleNotes.map((note) => (
            <article
              key={note.name}
              className="rounded-2xl border border-base-border bg-base-surface p-4 shadow-sm"
            >
              <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-ink">
                <span aria-hidden>{note.icon}</span>
                {note.name}
              </h4>
              <p className="mb-3 text-sm leading-relaxed text-ink-soft">
                {note.role}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {note.refs.map((r) => (
                  <li
                    key={r}
                    className="rounded-md bg-base-bg px-2 py-1 font-mono text-[11px] leading-tight text-ink-soft"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. 認可(Authorization): Gate と Policy */}
      {/* ============================================================ */}
      <section className="mb-14">
        <h2 className="mb-1 flex items-center gap-2 text-xl font-bold text-ink">
          <span aria-hidden>⚖️</span>
          認可(Authorization): Gate と Policy
        </h2>
        <p className="mb-5 text-sm text-ink-soft">
          認証で「ログイン済み」と分かった後、
          <strong className="text-ink">その人がこの操作をしてよいか</strong>
          を判定するのが認可です。判定ルールの置き場所として
          <span className="font-mono text-xs">Gate</span> と{" "}
          <span className="font-mono text-xs">Policy</span> の2つがあります。
        </p>

        {/* Gate vs Policy 対比表 */}
        <div className="mb-8 overflow-x-auto rounded-2xl border border-base-border bg-base-surface shadow-sm">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-base-border bg-base-bg text-left">
                <th className="px-4 py-3 font-semibold text-ink-faint">観点</th>
                <th className="px-4 py-3 font-semibold text-brand">
                  Gate(ゲート)
                </th>
                <th className="px-4 py-3 font-semibold text-good">
                  Policy(ポリシー)
                </th>
              </tr>
            </thead>
            <tbody>
              {authzCompare.map((row, i) => (
                <tr
                  key={row.axis}
                  className={
                    i < authzCompare.length - 1
                      ? "border-b border-base-border"
                      : ""
                  }
                >
                  <th
                    scope="row"
                    className="px-4 py-3 text-left align-top font-semibold text-ink"
                  >
                    {row.axis}
                  </th>
                  <td className="px-4 py-3 align-top text-ink-soft">
                    {isCodey(row.gate) ? (
                      <code className="font-mono text-[13px]">{row.gate}</code>
                    ) : (
                      row.gate
                    )}
                  </td>
                  <td className="px-4 py-3 align-top text-ink-soft">
                    {isCodey(row.policy) ? (
                      <code className="font-mono text-[13px]">{row.policy}</code>
                    ) : (
                      row.policy
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* can / @can / authorize / Gate::allows の使い方 */}
        <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-ink">
          <span aria-hidden>🧰</span>
          呼び出し方の使い分け
        </h3>
        <div className="mb-8 grid gap-3 sm:grid-cols-2">
          {authzApis.map((api) => (
            <article
              key={api.name}
              className="flex flex-col rounded-2xl border border-base-border bg-base-surface p-4 shadow-sm"
            >
              <h4 className="mb-2 font-mono text-sm font-bold text-brand">
                {api.name}
              </h4>
              <dl className="mb-3 space-y-1 text-xs text-ink-soft">
                <div className="flex gap-1.5">
                  <dt className="shrink-0 font-semibold text-ink-faint">
                    使う場所:
                  </dt>
                  <dd>{api.where}</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="shrink-0 font-semibold text-ink-faint">
                    何をする:
                  </dt>
                  <dd>{api.what}</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="shrink-0 font-semibold text-ink-faint">
                    権限なしなら:
                  </dt>
                  <dd>{api.onFail}</dd>
                </div>
              </dl>
              <pre className="mt-auto overflow-x-auto whitespace-pre-wrap rounded-xl bg-base-bg p-3 font-mono text-[11px] leading-relaxed text-ink-soft">
                {api.code}
              </pre>
            </article>
          ))}
        </div>

        {/* コード例(まとめ) */}
        <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-ink">
          <span aria-hidden>💡</span>
          コード例で一気に見る
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <figure className="rounded-2xl border border-base-border bg-base-surface p-4 shadow-sm">
            <figcaption className="mb-2 text-xs font-semibold text-brand">
              Gate を定義して使う(モデルに依存しない権限)
            </figcaption>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl bg-base-bg p-4 font-mono text-xs leading-relaxed text-ink-soft">
              {`// AuthServiceProvider::boot()
Gate::define('admin-only', function ($user) {
    return $user->is_admin;
});

// コントローラ
if (Gate::allows('admin-only')) {
    // 管理者だけの処理
}

// Blade
@can('admin-only')
    <a href="/admin">管理画面</a>
@endcan`}
            </pre>
          </figure>

          <figure className="rounded-2xl border border-base-border bg-base-surface p-4 shadow-sm">
            <figcaption className="mb-2 text-xs font-semibold text-good">
              Policy でモデル単位の権限をまとめる
            </figcaption>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl bg-base-bg p-4 font-mono text-xs leading-relaxed text-ink-soft">
              {`// php artisan make:policy PostPolicy --model=Post
class PostPolicy
{
    public function update(User $user, Post $post): bool
    {
        return $user->id === $post->user_id;
    }
}

// コントローラ: 権限なしなら 403
public function update(Post $post)
{
    $this->authorize('update', $post);
    // 自分の投稿だけ更新できる
}`}
            </pre>
          </figure>
        </div>

        {/* いつどちらを使うか */}
        <h3 className="mb-3 mt-8 flex items-center gap-2 text-base font-bold text-ink">
          <span aria-hidden>🧭</span>
          いつどちらを使う?(早見表)
        </h3>
        <ul className="space-y-2">
          {authzWhen.map((w) => (
            <li
              key={w.situation}
              className="flex flex-col gap-1 rounded-xl border border-base-border bg-base-surface p-3 shadow-sm sm:flex-row sm:items-center sm:gap-3"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-ink sm:w-1/2">
                <span aria-hidden>{w.icon}</span>
                {w.situation}
              </span>
              <span className="rounded-lg bg-brand-bg px-3 py-1.5 text-sm text-ink-soft sm:w-1/2">
                → {w.choice}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ============================================================ */}
      {/* 3. Breeze / Fortify / Sanctum / Passport の位置づけ */}
      {/* ============================================================ */}
      <section>
        <h2 className="mb-1 flex items-center gap-2 text-xl font-bold text-ink">
          <span aria-hidden>🧩</span>
          補足: Breeze / Fortify / Sanctum / Passport の位置づけ
        </h2>
        <p className="mb-5 text-sm text-ink-soft">
          認証まわりには公式パッケージが複数あり、名前が似ていて混乱しがちです。
          「どれが何用か」を短くまとめます。
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {authStarters.map((s) => (
            <article
              key={s.name}
              className="rounded-2xl border border-base-border bg-base-surface p-4 shadow-sm"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h3 className="flex items-center gap-2 text-base font-bold text-ink">
                  <span aria-hidden>{s.icon}</span>
                  {s.name}
                </h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    starterKindClass[s.kind]
                  }`}
                >
                  {s.kind}
                </span>
              </div>
              <p className="mb-2 text-sm font-semibold text-accent">
                {s.tagline}
              </p>
              <p className="text-sm leading-relaxed text-ink-soft">{s.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <p className="mt-10 text-center text-xs text-ink-faint">
        リクエスト全体の流れは
        <a
          href="/request-lifecycle"
          className="text-brand underline hover:text-accent"
        >
          リクエストライフサイクル
        </a>
        、部品の位置関係は
        <a href="/laravel-map" className="text-brand underline hover:text-accent">
          全体マップ
        </a>
        も参考になります。
      </p>
    </div>
  );
}

// ------------------------------------------------------------------
// 表のセルがコード片っぽいか(等幅で見せるかどうかの簡易判定)
// ------------------------------------------------------------------
function isCodey(text: string): boolean {
  return /::|->|\(|php artisan/.test(text);
}

// ------------------------------------------------------------------
// 認証フローの凡例1項目
// ------------------------------------------------------------------
function AuthLegend({ tone, label }: { tone: AuthTone; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-base-border bg-base-surface px-2 py-0.5">
      <span
        aria-hidden
        className={`h-2.5 w-2.5 rounded-full border ${authToneClass[tone]}`}
      />
      {label}
    </span>
  );
}
