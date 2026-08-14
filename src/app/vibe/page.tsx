import Link from "next/link";
import { BackToTop } from "@/components/BackToTop";

export const metadata = {
  title: "バイブコーディング時代の基礎知識 — 『土台』の前に読む総論",
  description:
    "プログラミングとは何か、コーディングとの違い、バイブコーディングで何が変わるか、プログラマーとエンジニアの違い、そしてこれからの未来。非エンジニアのための総論。文末に小学校高学年でも分かる図解版つき。",
};

/* ────────────────────────────────────────────────────────────
   小さな表示部品(このページ専用)
   ──────────────────────────────────────────────────────────── */

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-sm font-bold tracking-wide text-accent">{children}</p>
  );
}

function Analogy({
  label = "たとえるなら",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-5 rounded-xl bg-brand-bg p-4">
      <p className="mb-1 text-xs font-semibold text-brand">🔎 {label}</p>
      <p className="text-sm leading-relaxed text-ink-soft">{children}</p>
    </div>
  );
}

/** 横並びのフロー図(→でつなぐ)。スマホでは縦に折れる。 */
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
            <span aria-hidden className="mx-auto rotate-90 text-lg text-brand sm:rotate-0">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/** 2枚の比較カード。 */
function Compare({
  left,
  right,
}: {
  left: { title: string; icon: string; points: string[]; tone?: "brand" | "accent" };
  right: { title: string; icon: string; points: string[]; tone?: "brand" | "accent" };
}) {
  const card = (c: typeof left) => {
    const brand = (c.tone ?? "brand") === "brand";
    return (
      <div
        className={`rounded-2xl border p-5 shadow-sm ${
          brand ? "border-brand/25 bg-brand-bg" : "border-accent/25 bg-accent-bg"
        }`}
      >
        <p className={`mb-2 flex items-center gap-2 text-base font-bold ${brand ? "text-brand" : "text-accent"}`}>
          <span aria-hidden className="text-xl">{c.icon}</span>
          {c.title}
        </p>
        <ul className="space-y-1.5">
          {c.points.map((p) => (
            <li key={p} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
              <span aria-hidden className={brand ? "text-brand" : "text-accent"}>•</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return <div className="my-6 grid gap-3 sm:grid-cols-2">{card(left)}{card(right)}</div>;
}

/** 小学生向けブロックの大きな絵カード。 */
function KidCard({
  emoji,
  title,
  children,
}: {
  emoji: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-brand/30 bg-base-surface p-5">
      <p className="mb-2 flex items-center gap-2 text-lg font-bold text-ink">
        <span aria-hidden className="text-2xl">{emoji}</span>
        {title}
      </p>
      <div className="text-[15px] leading-loose text-ink-soft">{children}</div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   ページ本体
   ──────────────────────────────────────────────────────────── */

export default function VibePage() {
  return (
    <article className="mx-auto max-w-reading">
      {/* ── Hero ── */}
      <header id="soron" className="mb-10 scroll-mt-20">
        <a
          href="https://halvision.dev/ja/learn"
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-faint transition-colors hover:text-brand"
        >
          ← 学習メディアトップ
        </a>
        <Kicker>『バイブコーディングの土台』の前に読む・総論</Kicker>
        <h1 className="text-3xl font-bold leading-tight text-ink md:text-4xl">
          バイブコーディング時代の
          <br className="hidden sm:block" />
          基礎知識
        </h1>
        <p className="mt-4 leading-relaxed text-ink-soft">
          「プログラミングって、結局なに？」——
          コードを1行も書いたことがなくても大丈夫です。この文章は、
          <strong>AIがコードを書いてくれる時代</strong>に、
          非エンジニアが知っておくと世界の見え方が変わる“前提”をまとめた総論です。
          むずかしくなってきたら、<a href="#kids" className="font-bold text-brand underline underline-offset-2">
          文末の「もっと分かりやすく」</a>へ。図とたとえで、小学校高学年でも分かるように書き直してあります。
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          {["プログラミングとは", "コーディングとは", "バイブコーディング", "職業の違い", "未来予測"].map((t) => (
            <span key={t} className="rounded-full border border-base-border bg-base-surface px-3 py-1 text-ink-faint">
              {t}
            </span>
          ))}
        </div>
      </header>

      {/* ── ① プログラミングとは何か ── */}
      <section className="mb-12">
        <Kicker>① そもそもの話</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">プログラミングとは「段取りを言葉にする」こと</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          プログラミングと聞くと、黒い画面に暗号のような文字を打ち込む姿を想像するかもしれません。
          でも本質はもっと素朴で、<strong>「コンピュータにやってほしい段取りを、あいまいさなく順番に伝えること」</strong>です。
          人間同士なら「いい感じにやっといて」で通じますが、コンピュータは“空気”を読みません。
          だから「まず何を」「次に何を」「もし〇〇なら」を、抜けなく言い切る必要があります。
        </p>
        <Analogy>
          料理のレシピと同じです。「玉ねぎを炒める」だけでは足りず、
          「みじん切りにする→油をひく→中火で5分→透き通ったら次へ」まで書くのがプログラミング。
          レシピ通りに動く超マジメな新人が、コンピュータです。
        </Analogy>
        <p className="leading-relaxed text-ink-soft">
          つまりプログラミングとは技術というより<strong>「考え方・段取りの設計」</strong>。
          この“段取りを組み立てる力”は、AIが実際の文字を書いてくれる時代になっても、
          むしろ<strong>いちばん価値が残る部分</strong>です。
        </p>
      </section>

      {/* ── ② コーディングとは ── */}
      <section className="mb-12">
        <Kicker>② よく混同される言葉</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">「コーディング」はプログラミングの一部</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          「プログラミング」と「コーディング」はほぼ同じ意味で使われますが、正確には少しちがいます。
          <strong>プログラミング=段取り全体を考えて作ること</strong>。その中で
          <strong>コーディング=考えた段取りを、実際のプログラミング言語の文字（コード）に翻訳して打ち込む作業</strong>を指します。
        </p>
        <Compare
          left={{
            title: "プログラミング",
            icon: "🧠",
            tone: "brand",
            points: ["何を作るか決める", "手順・仕組みを設計する", "うまくいかない所を考え直す", "＝ 考える仕事の全体"],
          }}
          right={{
            title: "コーディング",
            icon: "⌨️",
            tone: "accent",
            points: ["決めた手順を", "言語の文法にそって", "文字として書き出す", "＝ 翻訳・清書の作業"],
          }}
        />
        <p className="leading-relaxed text-ink-soft">
          ここが今、大きく変わろうとしています。
          <strong>「翻訳・清書」の部分＝コーディングを、AIが肩代わりし始めた</strong>のです。
        </p>
      </section>

      {/* ── ③ バイブコーディングで何が変わるか ── */}
      <section className="mb-12">
        <Kicker>③ 時代の変化</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">バイブコーディングで、何が変わるのか</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          <strong>バイブコーディング（vibe coding）</strong>とは、
          細かい文法を自分で打ち込む代わりに、
          <strong>「こういうものが作りたい」と自然な言葉でAIに伝え、AIにコードを書かせながら形にしていく</strong>作り方のことです。
          “vibe（雰囲気・ノリ）”で会話するように開発が進むから、この名前がついています。
        </p>
        <p className="mb-1 text-sm font-semibold text-ink">これまでの流れ</p>
        <Flow
          steps={[
            { icon: "🧠", label: "頭の中の完成イメージ" },
            { icon: "📖", label: "文法を調べる", sub: "何時間も" },
            { icon: "⌨️", label: "自分で全部書く" },
            { icon: "✅", label: "動くもの" },
          ]}
        />
        <p className="mb-1 text-sm font-semibold text-ink">バイブコーディングの流れ</p>
        <Flow
          steps={[
            { icon: "🗣️", label: "言葉で頼む", sub: "『予約フォーム作って』" },
            { icon: "🤖", label: "AIが書く", sub: "数十秒" },
            { icon: "👀", label: "人が読んで直す" },
            { icon: "✅", label: "動くもの" },
          ]}
        />
        <p className="leading-relaxed text-ink-soft">
          変わったのは<strong>「文字を打つ量」</strong>であって、
          <strong>「段取りを考える必要」</strong>が消えたわけではありません。むしろ主役はこちらへ移ります。
          AIに的確に頼み（＝どんな料理か伝え）、出てきた結果が正しいか読んで判断し（＝味見して）、
          おかしければ直させる——この
          <strong>「読める・任せる・直せる・説明できる」力</strong>が、これからの“できる人”の条件になります。
        </p>
        <Analogy label="言いかえると">
          運転そのもの（アクセルやハンドルの操作＝コーディング）は自動運転が担うようになった。
          でも「どこへ、どの道で、なぜ行くのか」を決めるのは、やっぱり乗っている人。その判断力が問われる時代です。
        </Analogy>
      </section>

      {/* ── ④ プログラマーとエンジニアの違い ── */}
      <section className="mb-12">
        <Kicker>④ 職業の話</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">プログラマーとエンジニアは、どう違う？</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          求人でも混ざりがちな2つの言葉ですが、ざっくり
          <strong>「担当する範囲の広さ」</strong>がちがいます。
          プログラマーは<strong>「決まった仕様どおりに正しく作る人」</strong>、
          エンジニアは<strong>「そもそも何をどう作るべきかから設計し、問題を解決する人」</strong>という重心の差です。
        </p>
        <Compare
          left={{
            title: "プログラマー",
            icon: "🔨",
            tone: "accent",
            points: ["設計図どおりに作る", "コードの品質・正確さが得意", "『どう作るか』が中心", "＝ 腕のいい大工さん"],
          }}
          right={{
            title: "エンジニア",
            icon: "📐",
            tone: "brand",
            points: ["課題から設計する", "全体の仕組み・段取りを描く", "『何をなぜ作るか』が中心", "＝ 建築家・現場監督"],
          }}
        />
        <p className="leading-relaxed text-ink-soft">
          注目すべきは、AIが得意なのは主に
          <strong>大工さん側（決められた通りに手を動かす作業）</strong>だということ。
          だからこれからの人に強く求められるのは、
          <strong>建築家側の力＝「何をなぜ作るのかを描き、説明できる」力</strong>です。
          肩書きよりも、この重心を自分の中に持てるかどうかが効いてきます。
        </p>
      </section>

      {/* ── ⑤ 未来予測 ── */}
      <section className="mb-4">
        <Kicker>⑤ これからの話</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">この先、どうなっていく？</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          断言はできませんが、方向はかなり見えています。
          <strong>「作る」ためのハードルは、これからも下がり続ける</strong>。
          文字を打てること自体の価値は薄れ、代わりに
          <strong>「何を作るべきか見抜く力」「AIへの頼み方」「出てきたものの良し悪しを判断する目」</strong>の価値が上がります。
        </p>
        <ul className="my-5 space-y-3">
          {[
            ["🚪", "参入のハードルが下がる", "専門教育を受けていない人でも、アイデアを形にできるようになる。“作れる人”の裾野が一気に広がる。"],
            ["🧭", "価値の重心が『判断』へ", "手を動かす作業はAIへ。人は『方向を決める・正しさを見極める・責任を持つ』側に回る。"],
            ["🤝", "AIと組める人が伸びる", "AIを部下のように使いこなし、成果物を説明・改善できる人が、職種を問わず強くなる。"],
            ["📚", "基礎の“読む力”は残る", "自分で全部書けなくても、コードを読んで意味が分かる力は、AIを使う上でむしろ必須になる。"],
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
        <p className="leading-relaxed text-ink-soft">
          つまり——
          <strong>「プログラミングは一部の専門家のもの」から「考えられる人みんなの道具」へ</strong>。
          その入口に立つために必要なのは、難しい文法の丸暗記ではなく、
          ここまで読んできたような<strong>“土台となる考え方”</strong>です。
        </p>
      </section>

      {/* ── もっと分かりやすく(小学生向け) ── */}
      <section
        id="kids"
        className="my-12 scroll-mt-20 rounded-3xl border border-good/30 bg-good-bg/60 p-6 md:p-8"
      >
        <p className="mb-1 text-sm font-bold text-good">📣 ここから、もっと分かりやすく</p>
        <h2 className="text-2xl font-bold text-ink md:text-3xl">図とたとえで、まるっと理解しよう</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          むずかしい言葉はぜんぶ置いていきます。上の話を、
          <strong>小学校高学年でも「なるほど！」となるように</strong>絵ときにしてみます。
        </p>

        <div className="mt-6 space-y-5">
          <KidCard emoji="🍳" title="プログラミング ＝ おりょうりのレシピづくり">
            コンピュータは、めちゃくちゃマジメだけど<strong>「じぶんで考えない新人さん」</strong>。
            「カレー作って」だけじゃ動けません。
            <br />
            「①たまねぎを切る → ②いためる → ③水を入れる → ④ルウを入れる」と、
            <strong>じゅんばんに、ぜんぶ言ってあげる</strong>のがプログラミングだよ。
            <Flow
              steps={[
                { icon: "📝", label: "レシピを書く" },
                { icon: "🤖", label: "新人さんが実行" },
                { icon: "🍛", label: "カレー完成！" },
              ]}
            />
          </KidCard>

          {/* ゲームへの導線 */}
          <Link
            href="/vibe/game"
            className="group flex items-center gap-4 rounded-2xl border-2 border-brand bg-brand p-5 text-white transition-transform hover:-translate-y-0.5"
          >
            <span aria-hidden className="text-3xl">🎮</span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white/80">スマホで あそべる</p>
              <p className="text-lg font-bold">ロボットに めいれいゲーム</p>
              <p className="mt-0.5 text-sm leading-relaxed text-white/85">
                「まえ・みぎ・ひだり」を ならべて ロボットをゴールへ。
                これが“順番に命令する”＝プログラミングの たいけん！
              </p>
            </div>
            <span aria-hidden className="ml-auto shrink-0 text-2xl">→</span>
          </Link>

          <KidCard emoji="✍️" title="コーディング ＝ レシピを『新人さんの言葉』に書きなおす">
            新人さん（コンピュータ）は、じつは日本語がにがて。
            <strong>その子だけが分かる特別なことば</strong>があるんだ。
            頭の中のレシピを、その特別なことばに<strong>翻訳して書く</strong>のがコーディング。
            <br />
            <span className="text-brand font-bold">レシピを考える＝プログラミング</span>、
            <span className="text-accent font-bold">それを書き写す＝コーディング</span>。だからコーディングは“いちぶ”なんだね。
          </KidCard>

          <KidCard emoji="🪄" title="バイブコーディング ＝ 魔法のAIにお願いする">
            むかしは、その「特別なことば」を<strong>じぶんで全部おぼえて書く</strong>ひつようがあった。とても大変！
            <br />
            いまは<strong>「予約ボタンを作って」ってふつうに話すだけ</strong>で、
            AIがその特別なことばでスラスラ書いてくれる。まるで魔法。
            <div className="my-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-base-border bg-base-surface p-3">
                <p className="text-xs font-bold text-ink-faint">むかし 🐢</p>
                <p className="mt-1 text-sm text-ink-soft">辞書とにらめっこ。1文字まちがえると動かない。何時間もかかる。</p>
              </div>
              <div className="rounded-xl border border-brand/30 bg-brand-bg p-3">
                <p className="text-xs font-bold text-brand">いま 🚀</p>
                <p className="mt-1 text-sm text-ink-soft">「こう作って」と話す→AIが書く→人が見て直す。あっという間。</p>
              </div>
            </div>
            でもね、大事なこと。
            <strong>「どんなカレーが食べたいか」を決めて、味見して「もっと甘く」と直すのは、やっぱり人間</strong>。
            そこがいちばん大切なんだ。
          </KidCard>

          <KidCard emoji="🏠" title="プログラマーとエンジニア ＝ 大工さんと建築家">
            家を建てるのを思いうかべてみて。
            <div className="my-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-accent/30 bg-accent-bg p-3">
                <p className="font-bold text-accent">🔨 大工さん＝プログラマー</p>
                <p className="mt-1 text-sm text-ink-soft">設計図のとおりに、きれいに・じょうぶに建てる人。</p>
              </div>
              <div className="rounded-xl border border-brand/30 bg-brand-bg p-3">
                <p className="font-bold text-brand">📐 建築家＝エンジニア</p>
                <p className="mt-1 text-sm text-ink-soft">「どんな家にする？」から考えて、設計図を描く人。</p>
              </div>
            </div>
            AIがとくいなのは<strong>大工さんのしごと</strong>のほう。
            だからこれからは、<strong>「どんな家にするか考えられる人」</strong>がますます必要になるよ。
          </KidCard>

          <KidCard emoji="🔮" title="これからの未来 ＝ 『作れる人』がどんどん増える">
            むかしは、ものづくり（アプリやサイト作り）は<strong>「特別な人だけ」</strong>のものだった。
            <br />
            これからは、<strong>アイデアがある人なら、だれでも作れる</strong>時代になっていく。
            <div className="my-3 flex items-center gap-2 text-sm">
              <span className="rounded-lg bg-base-surface px-3 py-2 font-bold text-ink-faint">むかし：一部の人だけ 🧑‍💻</span>
              <span aria-hidden className="text-brand">→</span>
              <span className="rounded-lg bg-brand-bg px-3 py-2 font-bold text-brand">これから：考えられる人みんな 🌍</span>
            </div>
            そのとき強いのは、<strong>「何を作りたいかを考えられて、AIにうまくお願いできて、できたものが good か分かる人」</strong>。
            きみもなれるよ。
          </KidCard>
        </div>

        {/* 文末から総論へ戻す橋渡し */}
        <div className="mt-8 rounded-2xl border border-base-border bg-base-surface p-5 text-center shadow-sm">
          <p className="text-sm leading-relaxed text-ink-soft">
            ——ここまで分かれば、もう大丈夫。
            <br />
            さっきの<strong>むずかしかった総論</strong>も、いまなら“同じことを言っていた”と読めるはずです。
          </p>
          <a
            href="#soron"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand/90"
          >
            ↑ もう一度、総論を読み返す
          </a>
        </div>
      </section>

      {/* ── 総論に戻る（締め） ── */}
      <section id="back" className="mb-8 scroll-mt-20">
        <Kicker>もう一度、総論として</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">結局、いちばん大事なこと</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          プログラミングは<strong>「段取りを言葉にする考え方」</strong>。
          その清書作業（コーディング）は、いまやAIが引き受け始めました（＝バイブコーディング）。
          手を動かす仕事はAIへ寄り、人の価値は
          <strong>「何をなぜ作るかを描き、正しさを判断し、説明する」</strong>方へ移っていく——
          これが、この総論で伝えたかった一枚の地図です。
        </p>
        <p className="mt-3 leading-relaxed text-ink-soft">
          だからこそ、最初に身につけるべきは文法の暗記ではなく、
          <strong>言語に依存しない“土台となる考え方”</strong>。
          その土台を、たとえ多めで一歩ずつ組み上げていくのが、次のコースです。
        </p>

        <div className="mt-6 rounded-2xl border-l-4 border-brand bg-brand-bg p-6">
          <p className="text-sm font-bold text-brand">▶ 次に読む・学ぶ</p>
          <p className="mt-1 text-lg font-bold text-ink">バイブコーディングの土台 — 言語共通のプログラミング基礎</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            この総論の“考え方”を、実際に手を動かせるところまで落とし込むコース。
            登録不要・進捗はブラウザに保存されます。
          </p>
          <Link
            href="/basics"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand/90"
          >
            「土台」コースを始める →
          </Link>
        </div>

        {/* ページ末尾からトップへ戻る */}
        <div className="mt-10 border-t border-base-border pt-6 text-center">
          <a
            href="#soron"
            className="inline-flex items-center gap-2 rounded-full border border-base-border bg-base-surface px-6 py-3 text-sm font-bold text-brand transition-colors hover:border-brand"
          >
            ↑ このページの さいしょへ戻る
          </a>
        </div>
      </section>

      <BackToTop />
    </article>
  );
}
