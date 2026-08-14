import Link from "next/link";
import { BackToTop } from "@/components/BackToTop";

export const metadata = {
  title: "プログラミング言語ずかん — 関係性・得意分野・代表サービス",
  description:
    "いま現役で使われている主要なプログラミング言語を、系統(関係性)・得意な領域・実際に使われているサービスの具体例つきで一望するコラム。なぜ言語がこんなに多いのか、AI時代に何をどう学ぶかまで。",
};

/* ── 小さな表示部品 ── */

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

/* ── データ ── */

interface Lang {
  name: string;
  reading?: string;
  icon: string;
  color: string;
  tag: string; // 一言キャッチ
  domains: string[]; // 得意分野
  services: string[]; // 代表的なサービス・使われ方
  note?: string; // 関係性の補足
  courseHref?: string; // 学習ハブ内リンク(あれば)
}

const LANGS: Lang[] = [
  {
    name: "JavaScript / TypeScript",
    icon: "🟨",
    color: "#f0c000",
    tag: "Webの「動き」の共通語。ブラウザで動く唯一の言語",
    domains: ["フロントエンド(画面の動き)", "Webアプリ全般", "Node.jsでサーバー側も"],
    services: ["Netflix・Airbnbの画面", "Slack・VS Code(Electron)", "ほぼ全てのWebサイト"],
    note: "TypeScriptはJavaScriptに「型」を足して安全にしたもの。中〜大規模の新規開発では標準になりつつある。",
    courseHref: "/javascript",
  },
  {
    name: "Python",
    reading: "パイソン",
    icon: "🐍",
    color: "#3b7bbf",
    tag: "AI・データ分析・自動化の主役。読みやすさNo.1級",
    domains: ["AI・機械学習", "データ分析", "業務自動化・スクレイピング"],
    services: ["ChatGPTなどAI開発の中心", "Instagram(Django)", "NumPy / PyTorch / pandas"],
    note: "文法がやさしく初学者にも人気。AI時代の「最初の一本」に選ばれやすい。",
    courseHref: "/python",
  },
  {
    name: "PHP",
    reading: "ピーエイチピー",
    icon: "🐘",
    color: "#7a86b8",
    tag: "Webサイト・CMSの老舗。世界のWebのかなりをPHPが支える",
    domains: ["Webサイト・Webサービス", "CMS(ブログ・企業サイト)"],
    services: ["WordPress(世界のサイトの約4割)", "Wikipedia", "Slackのバックエンド"],
    note: "人気フレームワークLaravelで、モダンなWeb開発に進化。この学習ハブにもLaravelコースあり。",
    courseHref: "/",
  },
  {
    name: "Ruby",
    reading: "ルビー",
    icon: "💎",
    color: "#b5533b",
    tag: "「楽しく書ける」思想。スタートアップを支えたWeb言語",
    domains: ["Webアプリ(Ruby on Rails)", "スタートアップの高速開発"],
    services: ["GitHub", "Shopify", "Cookpad・食べログ(初期)"],
    note: "Railsという強力なフレームワークで、少人数でも素早くサービスを作れるのが強み。",
  },
  {
    name: "Java",
    reading: "ジャバ",
    icon: "☕",
    color: "#c76b2f",
    tag: "大規模・堅牢の定番。企業システムとAndroidの土台",
    domains: ["大規模業務システム", "銀行・金融", "Androidアプリ(従来)"],
    services: ["多くの企業・銀行の基幹システム", "Minecraft", "楽天・多数のAndroidアプリ"],
    note: "「一度書けばどこでも動く」思想。JavaScriptとは名前が似ているだけの別言語なので注意。",
  },
  {
    name: "Swift / Kotlin",
    icon: "📱",
    color: "#7b52c0",
    tag: "スマホアプリの現代標準。iOSはSwift、AndroidはKotlin",
    domains: ["iOSアプリ(Swift)", "Androidアプリ(Kotlin)"],
    services: ["iPhoneアプリ全般(Swift)", "新しいAndroidアプリ(Kotlin)"],
    note: "どちらも「安全に・簡潔に」書ける現代的な言語。作りたいスマホOSで選ぶ。",
  },
  {
    name: "Go",
    reading: "ゴー",
    icon: "🐹",
    color: "#2aa5c7",
    tag: "速い・並行処理が得意・シンプル。クラウド時代の言語",
    domains: ["サーバー・API", "クラウド基盤・インフラツール", "CLIツール"],
    services: ["Docker", "Kubernetes", "メルカリの一部バックエンド"],
    note: "Googleが開発。学びやすさと処理速度のバランスがよく、裏方(インフラ)で人気。",
  },
  {
    name: "Rust",
    reading: "ラスト",
    icon: "🦀",
    color: "#c5502f",
    tag: "高速かつ安全。C/C++の弱点を克服した新世代",
    domains: ["システムプログラミング", "高性能・低レイヤ", "WebAssembly"],
    services: ["Cloudflare", "Discordの一部", "Firefoxの一部"],
    note: "メモリの事故を仕組みで防ぐのが特徴。「速さと安全」を両立したい所で採用が伸びている。",
  },
  {
    name: "C / C++",
    icon: "⚙️",
    color: "#5566aa",
    tag: "すべての土台。OS・ゲーム・組込みなど低レイヤの王様",
    domains: ["OS・デバイス制御", "ゲームエンジン", "組込み・高性能処理"],
    services: ["Windows / Linux / macOS の中核", "Google Chrome", "Unreal Engine(ゲーム)"],
    note: "多くの言語がCの文法や思想を受け継ぐ「ご先祖様」。速い代わりに扱いは難しめ。",
  },
  {
    name: "C#",
    reading: "シーシャープ",
    icon: "🎮",
    color: "#5a3d8a",
    tag: "Microsoft発。業務システムとゲーム開発(Unity)の両刀",
    domains: ["Windows・業務アプリ", "ゲーム開発(Unity)", "Webバックエンド(.NET)"],
    services: ["Unity製ゲーム多数", "多くの企業システム", "Visual Studio"],
    note: "Javaに近い書き味。ゲームを作りたいならUnity経由でよく出会う言語。",
  },
  {
    name: "SQL",
    reading: "エスキューエル",
    icon: "🗄️",
    color: "#2f7d5b",
    tag: "データベースと会話する共通語。ほぼ全サービスの裏側にいる",
    domains: ["データベース操作", "データ抽出・集計"],
    services: ["ほぼ全てのWebサービスの裏側", "売上・ユーザー分析", "管理画面のデータ"],
    note: "アプリを作る言語とは別枠の「必須教養」。どの言語を選んでも、いずれ必ず出会う。",
  },
];

interface DomainRow {
  icon: string;
  domain: string;
  langs: string;
}
const DOMAIN_MAP: DomainRow[] = [
  { icon: "🖥️", domain: "Webのフロント(画面)", langs: "JavaScript / TypeScript" },
  { icon: "🔧", domain: "Webのバックエンド(裏側)", langs: "Python・PHP・Ruby・Java・Go・C#・Node.js" },
  { icon: "📱", domain: "スマホアプリ", langs: "Swift(iOS)・Kotlin(Android)" },
  { icon: "🤖", domain: "AI・データ分析", langs: "Python(＋ SQL)" },
  { icon: "🎮", domain: "ゲーム", langs: "C++・C#(Unity)" },
  { icon: "⚙️", domain: "OS・低レイヤ・高性能", langs: "C・C++・Rust" },
  { icon: "☁️", domain: "クラウド・インフラ", langs: "Go・Rust" },
  { icon: "🗄️", domain: "データベース", langs: "SQL(共通)" },
];

export default function LanguagesPage() {
  return (
    <article className="mx-auto max-w-reading">
      {/* Hero */}
      <header id="top" className="mb-10 scroll-mt-20">
        <a
          href="https://halvision.dev/ja/learn"
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-faint transition-colors hover:text-brand"
        >
          ← 学習メディアトップ
        </a>
        <Kicker>コラム・読みもの</Kicker>
        <h1 className="text-3xl font-bold leading-tight text-ink md:text-4xl">
          プログラミング言語ずかん
        </h1>
        <p className="mt-4 leading-relaxed text-ink-soft">
          プログラミング言語は、世の中に数百種類あります。でも実務でよく使われるのは十数個ほど。
          この記事では、<strong>いま現役の主要言語</strong>を「どうつながっているか(関係性)」
          「何が得意か」「実際にどんなサービスで使われているか」の具体例つきで一望します。
          どれを学ぶか迷っている人の地図にもなります。
        </p>
      </header>

      {/* なぜ多いのか */}
      <section className="mb-12">
        <Kicker>まず素朴な疑問</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">なぜ言語はこんなにたくさんあるの？</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          答えはシンプルで、<strong>「作るものによって、向いている道具が違う」</strong>から。
          速さが命のゲームと、素早く形にしたいWebサービスでは、求められる性質が違います。
          だから目的ごとに、それぞれ得意な言語が育ってきました。
        </p>
        <Analogy>
          料理と同じです。刺身には包丁、パンにはめん棒、炒め物には中華鍋。
          「万能の道具1本」ではなく、<strong>目的に合った道具を選ぶ</strong>。
          プログラミング言語も、その“道具箱”だと思ってください。
        </Analogy>
        <p className="leading-relaxed text-ink-soft">
          裏を返せば、<strong>1つ深く学べば、他の言語も「読める」ようになります</strong>。
          多くの言語は考え方(変数・条件・関数…)が共通だからです。全部を覚える必要はありません。
        </p>
      </section>

      {/* 関係性・系統 */}
      <section className="mb-12">
        <Kicker>関係性で見る</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">言語は「家系図」でつながっている</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          多くの言語は、先輩言語の良い所を受け継いで生まれました。だから
          <strong>書き方(文法)が似ているグループ</strong>があります。代表的なつながりはこの3系統です。
        </p>
        <div className="my-6 space-y-3">
          <div className="rounded-2xl border border-base-border bg-base-surface p-5 shadow-sm">
            <p className="mb-1 font-bold text-brand">① Cファミリー(文法のご先祖)</p>
            <p className="text-sm leading-relaxed text-ink-soft">
              <strong>C → C++ → Java / C# → JavaScript</strong> …
              波かっこ <code className="rounded bg-base-bg px-1 font-mono text-xs">{"{ }"}</code>{" "}
              で囲む書き方はここから。1つ読めると、仲間の言語も読みやすい。
            </p>
          </div>
          <div className="rounded-2xl border border-base-border bg-base-surface p-5 shadow-sm">
            <p className="mb-1 font-bold text-brand">② Web三層 → JavaScript拡張</p>
            <p className="text-sm leading-relaxed text-ink-soft">
              <strong>HTML(骨組み)・CSS(見た目)・JavaScript(動き)</strong> がWebの土台。
              JavaScriptに型を足したのが <strong>TypeScript</strong>、UIを組むのが <strong>React</strong>。
            </p>
          </div>
          <div className="rounded-2xl border border-base-border bg-base-surface p-5 shadow-sm">
            <p className="mb-1 font-bold text-brand">③ モバイル2大 & データ系</p>
            <p className="text-sm leading-relaxed text-ink-soft">
              スマホは <strong>Swift(iOS)</strong> と <strong>Kotlin(Android)</strong>。
              AI・分析は <strong>Python</strong>、データ操作は <strong>SQL</strong>——この2つはセットで語られがち。
            </p>
          </div>
        </div>
      </section>

      {/* 領域から見る得意分野マップ */}
      <section className="mb-12">
        <Kicker>得意分野で見る</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">「何を作るか」から言語を引く</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          作りたいものが決まっているなら、この対応表が近道です。
        </p>
        <div className="my-6 overflow-hidden rounded-2xl border border-base-border bg-base-surface shadow-sm">
          {DOMAIN_MAP.map((d, i) => (
            <div
              key={d.domain}
              className={`flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:gap-4 ${
                i > 0 ? "border-t border-base-border" : ""
              }`}
            >
              <div className="flex shrink-0 items-center gap-2 sm:w-56">
                <span aria-hidden className="text-xl">{d.icon}</span>
                <span className="text-sm font-bold text-ink">{d.domain}</span>
              </div>
              <span className="text-sm text-ink-soft">{d.langs}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 言語ずかん本体 */}
      <section className="mb-12">
        <Kicker>ずかん(11種)</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">主要言語カタログ</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          一言キャッチ・得意分野・実際に使われているサービスをまとめました。
          気になったものから眺めてみてください。
        </p>
        <div className="mt-6 space-y-4">
          {LANGS.map((l) => (
            <article
              key={l.name}
              className="overflow-hidden rounded-2xl border border-base-border bg-base-surface shadow-sm"
            >
              <div
                className="flex items-center gap-3 px-5 py-4"
                style={{ borderLeft: `5px solid ${l.color}` }}
              >
                <span aria-hidden className="text-2xl">{l.icon}</span>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-ink">
                    {l.name}
                    {l.reading && (
                      <span className="ml-1.5 text-xs font-normal text-ink-faint">{l.reading}</span>
                    )}
                  </h3>
                  <p className="text-sm text-ink-soft">{l.tag}</p>
                </div>
              </div>
              <div className="grid gap-4 border-t border-base-border p-5 sm:grid-cols-2">
                <div>
                  <p className="mb-1.5 text-xs font-semibold text-brand">得意分野</p>
                  <ul className="space-y-1">
                    {l.domains.map((d) => (
                      <li key={d} className="flex gap-1.5 text-sm text-ink-soft">
                        <span aria-hidden className="text-brand">•</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-1.5 text-xs font-semibold text-accent">代表的な使われ方</p>
                  <ul className="space-y-1">
                    {l.services.map((s) => (
                      <li key={s} className="flex gap-1.5 text-sm text-ink-soft">
                        <span aria-hidden className="text-accent">▸</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {l.note && (
                <p className="border-t border-base-border bg-base-bg px-5 py-3 text-xs leading-relaxed text-ink-soft">
                  💡 {l.note}
                </p>
              )}
              {l.courseHref && (
                <div className="border-t border-base-border px-5 py-3">
                  <Link
                    href={l.courseHref}
                    className="text-sm font-bold text-brand underline underline-offset-2"
                  >
                    このハブで学ぶ →
                  </Link>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* AI時代の選び方 */}
      <section id="how-to-choose" className="mb-8 scroll-mt-20">
        <Kicker>AI時代の視点</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">結局、何をどう学べばいい？</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          AIがコードを書いてくれる今、大事なのは「全部の言語を丸暗記すること」ではありません。
          次の3つで十分に戦えます。
        </p>
        <ul className="my-5 space-y-3">
          {[
            ["🎯", "まず1本、目的に合わせて深く", "作りたいものから選ぶ(Webの動き→JavaScript、AI・分析→Python、業務→Java/PHP)。1本を深くやると他が読めるようになる。"],
            ["👀", "「読める・直せる・説明できる」力", "自分で全部書けなくてよい。AIが出したコードを読んで、意図を確かめ、直せることが実力になる。"],
            ["🗄️", "SQLは共通教養として少し", "どの道に進んでも、データを扱うSQLにはいずれ必ず出会う。軽く読めるだけで強い。"],
          ].map(([icon, t, d]) => (
            <li key={t} className="flex gap-3 rounded-xl border border-base-border bg-base-surface p-4 shadow-sm">
              <span aria-hidden className="text-xl">{icon}</span>
              <div>
                <p className="font-bold text-ink">{t}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{d}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-2xl border-l-4 border-brand bg-brand-bg p-6">
          <p className="text-sm font-bold text-brand">▶ このハブで学べるコース</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            まず<Link href="/vibe" className="font-bold text-brand underline underline-offset-2">総論(バイブコーディング時代の基礎知識)</Link>
            を読んでから、興味のある言語へ。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              ["/basics", "土台"],
              ["/web", "HTML/CSS"],
              ["/javascript", "JavaScript"],
              ["/react", "React"],
              ["/typescript", "TypeScript"],
              ["/python", "Python"],
              ["/", "Laravel"],
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
