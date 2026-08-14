import Link from "next/link";
import { BackToTop } from "@/components/BackToTop";

export const metadata = {
  title: "HTTPとAPIのしくみ — 「ネットの向こう側」を読む",
  description:
    "Webページやアプリが、裏側でどうデータをやり取りしているか。リクエストとレスポンス、URL、HTTPメソッド、ステータスコード、JSON、APIを、レストランのたとえで一望する読みもの。AI時代にfetchやAPIのコードを「読める」ための地図。",
};

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-sm font-bold tracking-wide text-accent">{children}</p>;
}

function Analogy({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 rounded-xl bg-brand-bg p-4">
      <p className="mb-1 text-xs font-semibold text-brand">🔎 たとえるなら</p>
      <p className="text-sm leading-relaxed text-ink-soft">{children}</p>
    </div>
  );
}

function Flow({ steps }: { steps: { icon: string; label: string; sub?: string }[] }) {
  return (
    <div className="my-6 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
      {steps.map((s, i) => (
        <div key={s.label} className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
          <div className="flex flex-1 flex-col items-center rounded-2xl border border-base-border bg-base-surface px-4 py-3 text-center shadow-sm">
            <span aria-hidden className="text-2xl">{s.icon}</span>
            <span className="mt-1 text-sm font-bold text-ink">{s.label}</span>
            {s.sub && <span className="mt-0.5 text-xs text-ink-faint">{s.sub}</span>}
          </div>
          {i < steps.length - 1 && (
            <span aria-hidden className="mx-auto rotate-90 text-lg text-brand sm:rotate-0">→</span>
          )}
        </div>
      ))}
    </div>
  );
}

const METHODS: { m: string; icon: string; mean: string; ex: string }[] = [
  { m: "GET", icon: "📥", mean: "取ってくる(読む)", ex: "記事一覧をちょうだい" },
  { m: "POST", icon: "✍️", mean: "新しく送る(作る)", ex: "この内容で投稿して" },
  { m: "PUT / PATCH", icon: "✏️", mean: "書きかえる(更新)", ex: "この記事を直して" },
  { m: "DELETE", icon: "🗑️", mean: "消す(削除)", ex: "この記事を消して" },
];

const STATUS: { code: string; color: string; mean: string }[] = [
  { code: "200 OK", color: "#2f7d5b", mean: "成功。ちゃんと返ってきた" },
  { code: "301 / 302", color: "#3b7bbf", mean: "引っ越し。別のURLへ案内" },
  { code: "400", color: "#b5533b", mean: "こちらの頼み方が変(入力ミスなど)" },
  { code: "401 / 403", color: "#b5533b", mean: "権限がない(ログイン必要/禁止)" },
  { code: "404", color: "#b5533b", mean: "そのページ・データが無い" },
  { code: "500", color: "#b23b3b", mean: "向こう(サーバー)側でエラー" },
];

export default function HttpPage() {
  return (
    <article className="mx-auto max-w-reading">
      <header id="top" className="mb-10 scroll-mt-20">
        <a
          href="https://halvision.dev/ja/learn"
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-faint transition-colors hover:text-brand"
        >
          ← 学習メディアトップ
        </a>
        <Kicker>コラム・読みもの</Kicker>
        <h1 className="text-3xl font-bold leading-tight text-ink md:text-4xl">
          HTTPとAPIのしくみ
          <br className="hidden sm:block" />
          <span className="text-xl font-bold text-ink-soft md:text-2xl">
            — 「ネットの向こう側」を読む
          </span>
        </h1>
        <p className="mt-4 leading-relaxed text-ink-soft">
          Webページやアプリは、裏側で<strong>絶えずデータをやり取り</strong>しています。
          「ログイン」「一覧の読み込み」「送信」——全部その通信です。
          AIが書いたコードに <code className="rounded bg-base-bg px-1 font-mono text-xs">fetch</code> や
          「API」が出てきたとき、<strong>何が起きているか読める</strong>ようになるのがこの記事のゴール。
          専門用語は、レストランのたとえで全部ほどきます。
        </p>
      </header>

      {/* リクエスト/レスポンス */}
      <section className="mb-12">
        <Kicker>いちばん大事な1往復</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">「お願い」と「お返事」でできている</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          ネットの通信は、たった1つの往復がすべての基本です。
          あなたのブラウザやアプリが<strong>リクエスト(お願い)</strong>を送り、
          サーバー(向こう側のコンピュータ)が<strong>レスポンス(お返事)</strong>を返す。これだけ。
        </p>
        <Flow
          steps={[
            { icon: "📱", label: "あなた", sub: "ブラウザ/アプリ" },
            { icon: "📨", label: "リクエスト", sub: "○○ちょうだい" },
            { icon: "🖥️", label: "サーバー", sub: "向こう側" },
            { icon: "📦", label: "レスポンス", sub: "はいどうぞ" },
          ]}
        />
        <Analogy>
          レストランと同じです。あなた(お客)が「カレーください」と<strong>注文(リクエスト)</strong>し、
          店(サーバー)が<strong>料理(レスポンス)</strong>を出す。
          注文の仕方が悪ければ違う料理が来るし、店が忙しければ待たされる。通信もまったく同じ構図です。
        </Analogy>
      </section>

      {/* URL */}
      <section className="mb-12">
        <Kicker>あて先</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">URLは「住所」— どこに頼むか</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          リクエストには「どこへ」というあて先が要ります。それがURL。
          プログラムがデータを取りに行く専用のURLを<strong>エンドポイント</strong>と呼びます。
        </p>
        <div className="my-5 rounded-2xl border border-base-border bg-base-surface p-5 shadow-sm">
          <p className="font-mono text-sm text-ink">
            https://<span className="text-brand">api.example.com</span>
            <span className="text-accent">/users</span>
            <span className="text-ink-faint">/123</span>
          </p>
          <ul className="mt-3 space-y-1 text-sm text-ink-soft">
            <li><span className="font-bold text-brand">api.example.com</span> … どのお店か(サーバー)</li>
            <li><span className="font-bold text-accent">/users</span> … 何について(ユーザーの窓口)</li>
            <li><span className="font-bold text-ink-faint">/123</span> … どれか(123番のユーザー)</li>
          </ul>
        </div>
      </section>

      {/* メソッド */}
      <section className="mb-12">
        <Kicker>頼み方の種類</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">HTTPメソッド — 「何をしたいか」の4種</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          同じあて先でも「読みたい」のか「送りたい」のかで、頼み方(メソッド)が変わります。
          よく使うのはこの4つ。名前の意味だけ知っておけば十分です。
        </p>
        <div className="my-6 grid gap-3 sm:grid-cols-2">
          {METHODS.map((x) => (
            <div key={x.m} className="rounded-2xl border border-base-border bg-base-surface p-4 shadow-sm">
              <p className="flex items-center gap-2">
                <span aria-hidden className="text-xl">{x.icon}</span>
                <span className="font-mono text-sm font-bold text-brand">{x.m}</span>
                <span className="text-sm text-ink">{x.mean}</span>
              </p>
              <p className="mt-1 text-xs text-ink-faint">例: 「{x.ex}」</p>
            </div>
          ))}
        </div>
        <Analogy>
          レストランでいえば、GET＝「メニュー見せて」、POST＝「新しく注文」、
          PUT＝「さっきの注文を変更」、DELETE＝「注文キャンセル」。動詞が違うだけです。
        </Analogy>
      </section>

      {/* ステータスコード */}
      <section className="mb-12">
        <Kicker>お返事の合図</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">ステータスコード — 3桁の「結果表示」</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          レスポンスには、うまくいったか失敗したかを表す3桁の番号がついてきます。
          ざっくり<strong>200番台＝成功、400番台＝こちらのミス、500番台＝向こうのミス</strong>と覚えればOK。
        </p>
        <div className="my-6 overflow-hidden rounded-2xl border border-base-border bg-base-surface shadow-sm">
          {STATUS.map((s, i) => (
            <div
              key={s.code}
              className={`flex items-center gap-3 p-3.5 ${i > 0 ? "border-t border-base-border" : ""}`}
            >
              <span
                className="shrink-0 rounded-md px-2 py-1 font-mono text-xs font-bold text-white"
                style={{ background: s.color }}
              >
                {s.code}
              </span>
              <span className="text-sm text-ink-soft">{s.mean}</span>
            </div>
          ))}
        </div>
        <div className="my-5 rounded-xl border border-accent/30 bg-accent-bg p-4">
          <p className="text-sm leading-relaxed text-ink-soft">
            🎮 404や500は
            <Link href="/errors" className="font-bold text-brand underline underline-offset-2">
              「エラー文おみくじ」
            </Link>
            にも登場します。ゲームで引くと、体で覚えられます。
          </p>
        </div>
      </section>

      {/* JSON */}
      <section className="mb-12">
        <Kicker>データの形</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">JSON — やり取りされる「データの箱」</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          レスポンスで返ってくるデータは、たいてい<strong>JSON(ジェイソン)</strong>という形をしています。
          「名前: 値」のペアの集まりで、人間にもプログラムにも読みやすい書き方です。
          JavaScriptのオブジェクトとそっくりなので、JSを学んだ人ならすぐ読めます。
        </p>
        <div className="my-5 overflow-hidden rounded-2xl border border-base-border bg-base-surface shadow-sm">
          <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-ink-soft">{`{
  "id": 123,
  "name": "太郎",
  "isActive": true,
  "tags": ["web", "ai"]
}`}</pre>
        </div>
        <p className="leading-relaxed text-ink-soft">
          「123番の、名前が太郎で、有効な、web/aiタグのユーザー」——
          <strong>形が分かれば、中身も読めます</strong>。
        </p>
      </section>

      {/* API */}
      <section className="mb-8" id="api">
        <Kicker>まとめの言葉</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">APIとは「プログラム同士の窓口」</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          ここまでを一言でまとめると——<strong>API</strong>とは、
          「このURLに、この方法(メソッド)で頼めば、こういうデータ(JSON)を返します」という
          <strong>決められた窓口</strong>のこと。天気・地図・AI(LLM)など、世の中の便利な機能は
          たいていAPIとして公開されていて、あなたのアプリから呼び出して使えます。
        </p>
        <Analogy>
          電源コンセントのようなものです。中の仕組みを知らなくても、
          決まった形の差込口(API)に繋げば電気が使える。
          APIも「決まった頼み方」さえ守れば、中身を作らずに機能を借りられます。
        </Analogy>
        <p className="leading-relaxed text-ink-soft">
          AIが書いた <code className="rounded bg-base-bg px-1 font-mono text-xs">fetch(&quot;https://...&quot;)</code>{" "}
          のコードを見たら、もう大丈夫。「あのURLの窓口に、GETで、データをお願いしているんだな」と
          <strong>読めるあなた</strong>になっています。

        </p>

        <div className="mt-6 rounded-2xl border-l-4 border-brand bg-brand-bg p-6">
          <p className="text-sm font-bold text-brand">▶ 次に読む・学ぶ</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              ["/javascript", "JavaScript(fetch)"],
              ["/react", "React(データ取得)"],
              ["/errors", "エラー文おみくじ"],
              ["/languages", "言語ずかん"],
            ].map(([href, label]) => (
              <Link
                key={label}
                href={href}
                className="rounded-full bg-base-surface px-4 py-2 text-sm font-bold text-brand transition-colors hover:bg-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-base-border pt-6 text-center">
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full border border-base-border bg-base-surface px-6 py-3 text-sm font-bold text-brand transition-colors hover:border-brand"
          >
            ↑ このページのさいしょへ戻る
          </a>
        </div>
      </section>

      <BackToTop />
    </article>
  );
}
