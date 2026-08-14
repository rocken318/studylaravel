import Link from "next/link";
import { BackToTop } from "@/components/BackToTop";

export const metadata = {
  title: "AIに任せる技術 — 指示・レビュー・検証の型",
  description:
    "AIにコードを書かせる時代に、成果を分けるのは「頼み方」と「見極め方」。良いプロンプトの型、AIの出力を疑う検証の型、直すためのデバッグの入口、そして守り(安全)まで。初学者向けの実践ガイド。",
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

function BadGood({
  bad,
  good,
}: {
  bad: { label: string; text: string };
  good: { label: string; text: string };
}) {
  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border border-bad/30 bg-bad-bg p-5">
        <p className="mb-2 flex items-center gap-2 text-sm font-bold text-bad">
          <span aria-hidden>✗</span>
          {bad.label}
        </p>
        <p className="text-sm leading-relaxed text-ink-soft">{bad.text}</p>
      </div>
      <div className="rounded-2xl border border-good/30 bg-good-bg p-5">
        <p className="mb-2 flex items-center gap-2 text-sm font-bold text-good">
          <span aria-hidden>✓</span>
          {good.label}
        </p>
        <p className="text-sm leading-relaxed text-ink-soft">{good.text}</p>
      </div>
    </div>
  );
}

export default function AiGuidePage() {
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
        <Kicker>実践ガイド・総論の続き</Kicker>
        <h1 className="text-3xl font-bold leading-tight text-ink md:text-4xl">
          AIに任せる技術
          <br className="hidden sm:block" />
          <span className="text-xl font-bold text-ink-soft md:text-2xl">
            — 指示・レビュー・検証の型
          </span>
        </h1>
        <p className="mt-4 leading-relaxed text-ink-soft">
          AIがコードを書いてくれる時代。でも、
          <strong>同じAIを使っても、成果には大きな差が出ます</strong>。
          差を生むのは「頼み方」と「出てきたものの見極め方」。
          この2つは、才能ではなく<strong>“型”で身につく技術</strong>です。
          このページでは、その型を4ステップでまとめます。
          <Link href="/vibe" className="ml-1 font-bold text-brand underline underline-offset-2">
            総論(なぜAIに任せてよいのか)
          </Link>
          を読んでからだと、より腑に落ちます。
        </p>
      </header>

      {/* 全体像 */}
      <section className="mb-12">
        <Kicker>まず全体像</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">AIと組む仕事は「4つの動き」でできている</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          AIにコードを任せる作業は、ぐるぐる回る4つの動きに分けられます。
          この地図を頭に入れておくと、迷子になりません。
        </p>
        <div className="my-6 grid gap-3 sm:grid-cols-2">
          {[
            ["① 頼む", "🗣️", "やりたいことを、あいまいさなくAIに伝える"],
            ["② 疑う", "🔍", "出てきたコードを鵜呑みにせず、正しいか確かめる"],
            ["③ 直す", "🔧", "おかしければ、状況を添えてAIに直させる"],
            ["④ 守る", "🛡️", "危ない・古い・秘密に触れる所を避ける"],
          ].map(([t, icon, d]) => (
            <div key={t} className="flex gap-3 rounded-2xl border border-base-border bg-base-surface p-4 shadow-sm">
              <span aria-hidden className="text-2xl">{icon}</span>
              <div>
                <p className="font-bold text-ink">{t}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{d}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="leading-relaxed text-ink-soft">
          多くの人は「①頼む」だけで止まり、出てきたものをそのまま使ってしまいます。
          でも<strong>本当に差がつくのは②〜④</strong>。順番に見ていきましょう。
        </p>
      </section>

      {/* ① 頼む */}
      <section className="mb-12">
        <Kicker>① 頼む</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">良い指示は「5つの材料」でできている</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          AIは察してくれません。人間の同僚なら「いい感じに」で通じても、AIには
          <strong>材料を渡すほど、返ってくるものが良くなります</strong>。
          迷ったら、次の5つを埋めるだけで劇的に変わります。
        </p>
        <ol className="my-5 space-y-2">
          {[
            ["目的", "何のために作るのか(例: 予約フォームを作りたい)"],
            ["状況", "今どういう状態か(使っている言語・ツール・既存コード)"],
            ["制約", "守ってほしい条件(初心者向け・このファイルだけ・使う技術)"],
            ["期待する形", "どんな結果がほしいか(動く例・出力の形・説明つきで)"],
            ["レベル指定", "「プログラミング初心者にも分かるように」の一言"],
          ].map(([t, d], i) => (
            <li key={t} className="flex gap-3 rounded-xl border border-base-border bg-base-surface p-4 shadow-sm">
              <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-bg text-xs font-bold text-brand">
                {i + 1}
              </span>
              <div>
                <p className="font-bold text-ink">{t}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{d}</p>
              </div>
            </li>
          ))}
        </ol>

        <BadGood
          bad={{
            label: "ダメな頼み方",
            text: "「ログイン機能を作って」——目的も状況も制約もなく、AIは前提を勝手に想像するしかない。返ってきても自分の環境で動かず、直し方も分からない。",
          }}
          good={{
            label: "良い頼み方",
            text: "「Next.jsの初心者です。メールとパスワードのログイン画面のコードを、初心者にも分かるコメント付きで書いて。まずは見た目だけでOK。専門用語には一言説明を添えて」",
          }}
        />

        <div className="my-6 rounded-2xl border border-base-border bg-base-bg p-5">
          <p className="mb-2 text-sm font-bold text-ink">📋 コピペで使える「頼み方テンプレ」</p>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl bg-base-surface p-4 font-mono text-xs leading-relaxed text-ink-soft">{`【目的】○○を作りたい / ○○を直したい
【状況】使っている言語・ツール：___
　　　　今のコード（あれば貼る）：___
【制約】___（例：このファイルだけ / 初心者向け / △△を使う）
【ほしい形】___（例：動く例＋一行ずつの説明）
【お願い】プログラミング初心者にも分かるように説明して`}</pre>
        </div>

        <div className="my-5 rounded-xl bg-brand-bg p-4">
          <p className="mb-1 text-xs font-semibold text-brand">💡 効くコツ3つ</p>
          <ul className="space-y-1 text-sm leading-relaxed text-ink-soft">
            <li>・<strong>分割して頼む</strong>：一気に全部より、小さく区切るほど精度が上がる。</li>
            <li>・<strong>例を見せる</strong>：「こんな感じ」の見本を1つ渡すと一気に伝わる。</li>
            <li>・<strong>役割を与える</strong>：「初心者向けの先生として」など立場を指定する。</li>
          </ul>
        </div>
      </section>

      {/* ② 疑う */}
      <section className="mb-12">
        <Kicker>② 疑う</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">AIは「自信満々に間違える」</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          いちばん大事な心構えがこれです。AIは、<strong>間違っていても堂々と、正しそうな顔で答えます</strong>
          （これをハルシネーション＝もっともらしい作り話、と呼びます）。
          だから出てきたコードは、そのまま信じず<strong>「一回疑う」</strong>のが基本です。
        </p>
        <Analogy>
          とても優秀だけど、たまに嘘の道案内を堂々とする案内人のようなもの。
          ほとんど当たるからこそ、たまの嘘が怖い。だから
          <strong>「本当にこの道で合ってる？」と一言確かめる</strong>クセをつけます。
        </Analogy>
        <p className="mb-1 text-sm font-semibold text-ink">出てきたコードへの「4つの問いかけ」</p>
        <ul className="my-4 space-y-2">
          {[
            ["🏃 動く？", "そもそもエラーなく動くか。まず動かして確かめる。"],
            ["🎯 意図どおり？", "動くだけでなく、自分がやりたかったこと通りか。"],
            ["⚠️ 危なくない？", "秘密の情報が入っていないか、消しちゃいけないデータを触っていないか。"],
            ["📅 古くない？", "AIの知識は少し前の場合がある。古いやり方を出していないか。"],
          ].map(([t, d]) => (
            <li key={t} className="flex gap-3 rounded-xl border border-base-border bg-base-surface p-4 shadow-sm">
              <span aria-hidden className="shrink-0 text-lg">{t.split(" ")[0]}</span>
              <div>
                <p className="font-bold text-ink">{t.split(" ").slice(1).join(" ")}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{d}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="my-5 rounded-xl border border-accent/30 bg-accent-bg p-4">
          <p className="mb-1 text-xs font-semibold text-accent">🔑 最強の一言</p>
          <p className="text-sm leading-relaxed text-ink-soft">
            <strong>「このコードが何をしているか、一行ずつ初心者向けに説明して」</strong>
            と聞き返すこと。AI自身に説明させると、あなたの理解が深まり、
            AIの説明が怪しい所（＝間違っている所）もあぶり出せます。
          </p>
        </div>
      </section>

      {/* ③ 直す */}
      <section className="mb-12">
        <Kicker>③ 直す</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">エラーは「敵」ではなく「ヒント」</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          赤いエラーが出ても、落ち込む必要はありません。エラーは
          <strong>「ここがこう困っています」という手がかり</strong>です。
          AIに直させるときは、次の3つを守ると一発で伝わります。
        </p>
        <ol className="my-5 space-y-2">
          {[
            ["エラーは全文を貼る", "一部だけでなく、赤い文字を丸ごとコピーして渡す。原因はたいてい全文の中にある。"],
            ["状況を添える", "「○○をしたら、このエラーが出た。期待は△△」と、前後を1〜2文で説明する。"],
            ["一度に直さない", "たくさんの変更を一気にせず、1つ直して確かめる。どれが効いたか分かる。"],
          ].map(([t, d], i) => (
            <li key={t} className="flex gap-3 rounded-xl border border-base-border bg-base-surface p-4 shadow-sm">
              <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-bg text-xs font-bold text-brand">
                {i + 1}
              </span>
              <div>
                <p className="font-bold text-ink">{t}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{d}</p>
              </div>
            </li>
          ))}
        </ol>
        <BadGood
          bad={{
            label: "伝わらない直し依頼",
            text: "「動きません。直して」——何がどう動かないのか、AIには分からない。エスパーを頼んでいるのと同じ。",
          }}
          good={{
            label: "伝わる直し依頼",
            text: "「ボタンを押したら画面が変わるはずが、何も起きません。押したときのエラー全文はこれです：(貼る)。原因と直し方を、初心者向けに教えて」",
          }}
        />
        <div className="my-6 rounded-2xl border-l-4 border-brand bg-brand-bg p-5">
          <p className="text-sm leading-relaxed text-ink-soft">
            🎮 エラーに慣れる練習に、
            <Link href="/errors" className="font-bold text-brand underline underline-offset-2">
              「エラー文おみくじ」ゲーム
            </Link>
            を用意しました。英語のエラーを引いて、原因を当てるミニゲームです。
          </p>
        </div>
      </section>

      {/* ④ 守る */}
      <section className="mb-8" id="safety">
        <Kicker>④ 守る</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">最低限の「安全」だけは自分で握る</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          AIに任せてよい時代でも、<strong>ここだけは人間が責任を持つ</strong>という守りがあります。
          むずかしくありません。次の3つを知っておくだけで十分です。
        </p>
        <ul className="my-5 space-y-3">
          {[
            ["🔒", "秘密情報は貼らない", "パスワード・APIキー・個人情報などを、そのままAIに貼らない。伏せるか、ダミーに置き換える。"],
            ["🧐", "鵜呑みにしない", "「AIが言ったから」で本番に出さない。特にお金・削除・公開に関わる所は必ず自分で確認する。"],
            ["©️", "権利を意識する", "AIの出力をそのまま商用に使ってよいか、ライセンスや利用規約を意識する。丸ごとコピーの怖さは総論でも触れたとおり。"],
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

        <div className="mt-8 rounded-2xl border-l-4 border-brand bg-brand-bg p-6">
          <p className="text-sm font-bold text-brand">▶ まとめ</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            <strong>頼む→疑う→直す→守る。</strong>
            この4つを回せる人が、AI時代の「できる人」です。実装が全部書けなくても、
            この型があれば、AIを部下のように使いこなせます。あとは各言語コースで
            「読める力」を足していくだけ。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              ["/vibe", "総論を読む"],
              ["/errors", "エラー文おみくじ"],
              ["/basics", "土台コース"],
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
