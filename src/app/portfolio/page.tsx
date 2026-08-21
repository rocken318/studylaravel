import Link from "next/link";
import { BackToTop } from "@/components/BackToTop";

export const metadata = {
  title: "作った物を「仕事」に変える — ポートフォリオと自己PR",
  description:
    "学んだあと、どう就職・受注につなげるか。未経験でも評価される作品の選び方、READMEの書き方、「読める・直せる・説明できる」を証明する見せ方、実務での自己PRの型まで。テンプレつきの実践ガイド。",
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

export default function PortfolioPage() {
  return (
    <article className="mx-auto max-w-reading">
      <header id="top" className="mb-10 scroll-mt-20">
        <a
          href="https://halvision.dev/ja/learn"
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-faint transition-colors hover:text-brand"
        >
          ← 学習メディアトップ
        </a>
        <Kicker>実践ガイド・学びを仕事に</Kicker>
        <h1 className="text-3xl font-bold leading-tight text-ink md:text-4xl">
          作った物を「仕事」に変える
          <br className="hidden sm:block" />
          <span className="text-xl font-bold text-ink-soft md:text-2xl">
            — ポートフォリオと自己PR
          </span>
        </h1>
        <p className="mt-4 leading-relaxed text-ink-soft">
          学んだ先には「就職・受注」というゴールがあります。そこで効くのは資格や経歴より、
          <strong>「何を作ったか(ポートフォリオ)」と「それをどう語れるか(自己PR)」</strong>。
          この2つは、AIに実装を任せる時代だからこそ、
          <strong>あなたが読めて・直せて・説明できることの証明</strong>になります。作り方を具体的にまとめます。
        </p>
      </header>

      {/* なぜ */}
      <section className="mb-12">
        <Kicker>まず前提</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">未経験は「作った物」で判断される</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          経験の浅い人を採用・発注する側は、不安です。その不安を消す一番の材料が、
          <strong>実際に動く作品</strong>。「できます」と100回言うより、動くURLを1つ見せるほうが強い。
        </p>
        <Analogy>
          料理人の就職と同じです。「料理できます」より、実際に一皿を出すほうが早い。
          ポートフォリオは、あなたが出せる「試食の一皿」です。
        </Analogy>
        <div className="my-5 rounded-xl border border-accent/30 bg-accent-bg p-4">
          <p className="text-sm leading-relaxed text-ink-soft">
            💡 <strong>AIで作ってもいい</strong>のか？——はい。今はAIを使えるのが前提の時代です。
            大事なのは「AIに任せた部分も、中身を読めて・直せて・説明できる」こと。
            そこを見せられれば、むしろ評価されます。
          </p>
        </div>
      </section>

      {/* 何を載せる */}
      <section className="mb-12">
        <Kicker>選び方</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">「小さくても完成・公開」が最強</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          未完成の大作より、<strong>小さくても最後まで作って公開したもの</strong>が評価されます。
          「やり切れる人」だと伝わるからです。まずは1〜3個で十分。
        </p>
        <BadGood
          bad={{
            label: "ありがちな失敗",
            text: "壮大なアプリを作ろうとして、途中で力尽き、動くものが1つも無い。「勉強中です」で止まってしまう。",
          }}
          good={{
            label: "刺さるポートフォリオ",
            text: "『行きたい店リスト』『家計メモ』など生活の小さな困りごとを解決する、動く・公開済みのアプリが2〜3個。使ったURLがある。",
          }}
        />
        <p className="mb-1 text-sm font-semibold text-ink">作品ネタの見つけ方</p>
        <ul className="my-4 space-y-2">
          {[
            ["🏠", "自分の生活の困りごと", "毎日ちょっと面倒なこと(メモ・記録・計算)を自動化する。実感がある分、語りやすい。"],
            ["📋", "既存サービスの小さな模倣", "TODOアプリ・天気表示・じゃんけんゲームなど定番。学びの証明に最適。"],
            ["🤝", "身近な人の困りごと", "家族や友人の『これ面倒』を聞いて作る。使ってもらえると説得力が段違い。"],
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
      </section>

      {/* README */}
      <section className="mb-12">
        <Kicker>見せ方(1)</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">READMEは「作品の顔」</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          GitHubに置いた作品の入口が README(説明書)。ここが空だと、どんな良い作品も伝わりません。
          逆にここが丁寧だと、<strong>「説明できる人だ」</strong>と一目で伝わります。次の型を埋めるだけ。
        </p>
        <div className="my-6 rounded-2xl border border-base-border bg-base-bg p-5">
          <p className="mb-2 text-sm font-bold text-ink">📋 コピペで使える README テンプレ</p>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl bg-base-surface p-4 font-mono text-xs leading-relaxed text-ink-soft">{`# アプリ名

## これは何？
（一言で。例：行きたいお店を保存できるメモアプリ）

## なぜ作った？
（解決したい困りごと。あなたの動機）

## 使い方 / デモ
公開URL：https://___
（スクリーンショットが1枚あると強い）

## 工夫した点・大変だった点
（ここが一番読まれる。詰まりをどう乗り越えたか）

## 使った技術
React / TypeScript / … など`}</pre>
        </div>
        <div className="rounded-xl bg-brand-bg p-4">
          <p className="text-sm leading-relaxed text-ink-soft">
            💡 「工夫した点・大変だった点」が最重要。
            <strong>「AIが出したコードのバグに気づいて、こう直した」</strong>のような一節は、
            まさに求められる「読める・直せる」力の証明になります。
          </p>
        </div>
      </section>

      {/* 説明できる力 */}
      <section className="mb-12">
        <Kicker>見せ方(2)</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">「説明できる」を言葉にする</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          作れることと、それを<strong>言葉で説明できること</strong>は別のスキルです。
          そして採用・発注側が本当に見たいのは後者。次の3点を、自分の作品について言えるように準備しましょう。
        </p>
        <ol className="my-5 space-y-2">
          {[
            ["何を・なぜ作ったか", "解決したい困りごとと、それをどう解いたか。"],
            ["どこで詰まり、どう乗り越えたか", "エラーや設計の迷いを、どう調べ・AIに相談し・直したか。"],
            ["次に何を良くしたいか", "改善点を言えると『成長できる人』に見える。"],
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
            label: "弱い自己PR",
            text: "「プログラミングを勉強しました。頑張ります」——何ができるか、何を作ったかが無く、伝わらない。",
          }}
          good={{
            label: "強い自己PR",
            text: "「生活の困りごとを解く小さなアプリを3つ作り公開しました。AIを使いつつ、出たコードは自分で読んで直せます。特に○○のバグを△△と特定して直した経験が自信です」",
          }}
        />
      </section>

      {/* 公開の流れ */}
      <section className="mb-8" id="publish">
        <Kicker>公開まで</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">作品を「URLで見せられる」状態に</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          手元で動くだけでは、まだ「試食の一皿」を出せません。
          <strong>GitHubに置き、Vercelなどで公開してURLにする</strong>ところまでがセット。
          手順の暗記は不要で、詰まったらAIに聞けばOKです。
        </p>
        <ol className="my-5 space-y-2">
          {[
            ["① Gitで記録する", "変更をcommitして履歴を残す。壊しても戻せる状態に。"],
            ["② GitHubに置く", "リポジトリを作ってpush。READMEもここに。作品置き場になる。"],
            ["③ Vercel等で公開", "GitHubと連携すると、pushで自動的に世界に公開されURLが出る。"],
          ].map(([t, d]) => (
            <li key={t} className="flex gap-3 rounded-xl border border-base-border bg-base-surface p-4 shadow-sm">
              <span aria-hidden className="text-lg">{t.slice(0, 2)}</span>
              <div>
                <p className="font-bold text-ink">{t.slice(2)}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{d}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-2xl border-l-4 border-brand bg-brand-bg p-6">
          <p className="text-sm font-bold text-brand">▶ この流れに必要な学び</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            公開に必要な Git / GitHub は、コースで基礎から学べます。
            作品づくりの土台になる言語コースと合わせてどうぞ。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              ["/git", "Gitコース"],
              ["/react", "React"],
              ["/javascript", "JavaScript"],
              ["/ai-guide", "AIに任せる技術"],
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

        <div className="mt-6 rounded-xl border border-base-border bg-base-surface p-4 text-sm leading-relaxed text-ink-soft">
          🏢 <strong>制作会社からの本音</strong>：私たち(HaLVision)が一緒に働きたいのは、
          「完璧な人」ではなく「小さくても作り切り、詰まりを自分で調べ、
          AIと組んで前に進める人」。その姿勢は、動く作品と丁寧なREADMEに、ちゃんとにじみ出ます。
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

      {/* Laravelの案件・仕事の取り方 */}
      <section className="mb-12" id="laravel-work">
        <Kicker>ステップアップ・Laravelで仕事を取る</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">
          Laravelの案件・仕事の取り方
        </h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          「Laravelの案件を取りたい」という声はよく聞きます。ここでは、
          <strong>Laravelの仕事がどこから来るのか</strong>、未経験からの最初の一歩は
          どんな形か、そして<strong>小さな作品の積み重ねがどう案件につながるか</strong>を、
          誇張なく整理します。近道はありませんが、道すじははっきりしています。
        </p>

        <p className="mt-6 mb-1 text-sm font-semibold text-ink">Laravelの仕事はどこから来るか</p>
        <ul className="my-4 space-y-2">
          {[
            ["🏢", "受託開発（制作会社）", "他社のWebサービスやシステムを請け負って作る。実務未経験者はまずここに就職・アシスタントから入るのが王道。"],
            ["🚀", "自社サービス開発", "自社のプロダクトを社員として育てる。腰を据えて技術を深めやすい。"],
            ["💻", "クラウドソーシング", "ランサーズやクラウドワークスなどで小規模な改修・機能追加から。実績と評価を積む入口になる。"],
            ["🤝", "エージェント（フリーランス）", "実務経験が数年たまってから、案件を紹介してもらう働き方。未経験からいきなりは難しい。"],
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

        <Analogy>
          料理人が最初から一人で店を持てないのと同じです。多くの人は、まず厨房(受託開発や
          クラウドソーシングの小さな案件)で腕を磨き、実績を積んでから独立や大きな案件へ進みます。
          Laravelの案件も「小さく入って、積み上げる」のが現実的なルートです。
        </Analogy>

        <p className="mt-6 mb-1 text-sm font-semibold text-ink">初めての「Laravel案件」はどんな形か</p>
        <p className="leading-relaxed text-ink-soft">
          いきなり大規模開発を任されることはまずありません。最初は
          <strong>既存アプリの小さな改修・機能追加・バグ修正</strong>から始まるのが普通です。
          「一覧に検索を足す」「フォームに項目を1つ増やす」といった小さな仕事を、
          規約に沿って安全に直せることが、最初に求められる力です。
        </p>

        <BadGood
          bad={{
            label: "取りにくい進め方",
            text: "「Laravelを勉強しました」と資格や学習歴だけを並べる。動く作品も、直せる証明もないと、案件を任せる側は不安で頼めない。",
          }}
          good={{
            label: "案件につながる進め方",
            text: "Laravelで小さなアプリ(メモ・予約・在庫管理など)を作って公開し、READMEで『何を・どう作り・どこで詰まって直したか』を語れる。小さな実績が信頼になり、次の一歩を任せてもらえる。",
          }}
        />

        <p className="mt-6 mb-1 text-sm font-semibold text-ink">小さな作品が案件に変わる流れ</p>
        <ol className="my-5 space-y-2">
          {[
            ["① Laravelで小さく作って公開", "CRUD(登録・一覧・編集・削除)ができる小さなアプリを1〜3個。公開URLとGitHubをセットに。"],
            ["② 「読める・直せる・説明できる」を示す", "AIに任せた部分も中身を読めて、規約に沿って直せて、なぜそうしたか説明できる状態にする。"],
            ["③ 小さな案件・アシスタントで実績化", "受託のアシスタントやクラウドソーシングの小規模案件で、実務での改修経験を積む。"],
            ["④ 実績を足がかりに次の案件へ", "こなした仕事が次の依頼や紹介を呼ぶ。ここで初めてエージェント経由の案件も現実的になる。"],
          ].map(([t, d]) => (
            <li key={t} className="flex gap-3 rounded-xl border border-base-border bg-base-surface p-4 shadow-sm">
              <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-bg text-xs font-bold text-brand">
                {t.slice(0, 2)}
              </span>
              <div>
                <p className="font-bold text-ink">{t.slice(2)}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{d}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="my-5 rounded-xl border border-accent/30 bg-accent-bg p-4">
          <p className="text-sm leading-relaxed text-ink-soft">
            ⚠️ <strong>正直な話</strong>：「Laravelを学べば必ず案件が取れる・すぐ稼げる」と
            約束はできません。ただ、Laravelは受託・自社サービスの現場で今も広く使われており、
            <strong>小さくても作り切って見せられる人</strong>には、着実にチャンスが回ってきます。
            派手な近道より、公開できる作品を1つずつ増やすのが結局いちばん早い道です。
          </p>
        </div>

        <div className="mt-6 rounded-2xl border-l-4 border-brand bg-brand-bg p-6">
          <p className="text-sm font-bold text-brand">▶ Laravelの案件に向けた学び</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            案件で任されるのは「規約に沿って安全に読み・直す」力です。Laravelコースで
            MVCや設定より規約、Eloquentの基礎を押さえておくと、最初の改修案件に対応しやすくなります。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              ["/curriculum", "Laravelコース"],
              ["/casestudy", "実例で読み解く"],
              ["/git", "Gitコース"],
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
      </section>

      <BackToTop />
    </article>
  );
}
