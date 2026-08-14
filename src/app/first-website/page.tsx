import Link from "next/link";
import { BackToTop } from "@/components/BackToTop";

const CONTACT_URL = "https://halvision.dev/ja/contact";
const LINE_URL = "https://lin.ee/xr8meo1l";

export const metadata = {
  title: "はじめてのホームページ作り — パソコン1台とChatGPTだけで",
  description:
    "インストール不要。フォルダを作るところから、ChatGPTにHTMLを作ってもらい、ブラウザで自分のホームページを表示するまでを、中学生でも分かるように1ステップずつ。うまくいかない時の対処つき。",
};

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-sm font-bold tracking-wide text-accent">{children}</p>;
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10 scroll-mt-20" id={`step-${n}`}>
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
          {n}
        </span>
        <h2 className="text-xl font-bold text-ink md:text-2xl">{title}</h2>
      </div>
      <div className="border-l-2 border-base-border pl-4 sm:pl-6">{children}</div>
    </section>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 flex items-start gap-2 rounded-xl border border-good/30 bg-good-bg p-3.5">
      <span aria-hidden className="text-lg">✅</span>
      <p className="text-sm font-medium leading-relaxed text-ink-soft">
        <strong className="text-good">できたかな？</strong> {children}
      </p>
    </div>
  );
}

function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-xl border border-accent/30 bg-accent-bg p-4">
      <p className="mb-1 text-xs font-semibold text-accent">💡 {title}</p>
      <p className="text-sm leading-relaxed text-ink-soft">{children}</p>
    </div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <div className="my-4 overflow-hidden rounded-2xl border border-base-border">
      <pre className="overflow-x-auto bg-ink p-4 font-mono text-[13px] leading-relaxed text-white/90">
        {children}
      </pre>
    </div>
  );
}

export default function FirstWebsitePage() {
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
        <Kicker>いちばんやさしい・ハンズオン</Kicker>
        <h1 className="text-3xl font-bold leading-tight text-ink md:text-4xl">
          はじめてのホームページ作り
          <br className="hidden sm:block" />
          <span className="text-xl font-bold text-ink-soft md:text-2xl">
            — パソコン1台とChatGPTだけで
          </span>
        </h1>
        <p className="mt-4 leading-relaxed text-ink-soft">
          むずかしいソフトのインストールは一切なし。
          <strong>フォルダを作るところから、自分のホームページをブラウザに表示するまで</strong>を、
          1ステップずつ、中学生でも分かるように進めます。
          コードは自分で書きません。<strong>ChatGPTに作ってもらいます</strong>。
          いっしょにやれば、今日中に「自分のページ」が持てます。
        </p>
        <div className="mt-5 rounded-2xl border border-base-border bg-base-surface p-4 shadow-sm">
          <p className="text-sm font-bold text-ink">🎯 今日のゴール</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">
            自分のパソコンの中に、お店の紹介や自己紹介の
            <strong>1ページのホームページ</strong>を作って、ブラウザで表示できるようになる。
          </p>
        </div>
      </header>

      {/* 用意するもの */}
      <section className="mb-10">
        <Kicker>はじめる前に</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">用意するもの(ぜんぶ無料)</h2>
        <ul className="mt-3 space-y-2">
          {[
            ["💻", "パソコン", "WindowsでもMacでもOK。スマホだけだと少し難しいので、できればパソコンで。"],
            ["🌐", "ブラウザ", "Chrome・Edge・Safariなど、いつも使っているものでOK。"],
            ["🤖", "ChatGPT", "無料でOK。chat.openai.com にアクセスできれば大丈夫(登録は必要)。"],
            ["📝", "メモ帳などの文字を打つソフト", "Windowsなら「メモ帳」、Macなら「テキストエディット」。最初から入っています。"],
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
        <Note title="そもそもHTMLって何？">
          ホームページの「文章と骨組み」を書いたもので、
          <strong>ただのテキスト(文字)ファイル</strong>です。むずかしいものではありません。
          拡張子(名前のうしろ)を <code className="rounded bg-base-bg px-1 font-mono text-xs">.html</code>{" "}
          にすると、ブラウザが「これはホームページだ」と分かって表示してくれます。それだけ。
        </Note>
      </section>

      {/* ステップ */}
      <Step n={1} title="デスクトップにフォルダを作る">
        <p className="leading-relaxed text-ink-soft">
          まず、作品を入れる「箱」を作ります。デスクトップ(パソコンの最初の画面)の
          <strong>何もない所を右クリック</strong>してください。
        </p>
        <ul className="my-3 space-y-1 text-sm text-ink-soft">
          <li>・<strong>Windows</strong>：「新規作成」→「フォルダー」を選ぶ</li>
          <li>・<strong>Mac</strong>：「新規フォルダ」を選ぶ</li>
        </ul>
        <p className="leading-relaxed text-ink-soft">
          できたフォルダの名前を{" "}
          <code className="rounded bg-base-bg px-1 font-mono text-xs">my-website</code>{" "}
          に変えましょう(日本語やスペースは避けると安心)。
        </p>
        <Check>デスクトップに「my-website」という名前のフォルダができていればOK！</Check>
      </Step>

      <Step n={2} title="空っぽの index.html を作る">
        <p className="leading-relaxed text-ink-soft">
          次に、ホームページ本体のファイルを作ります。名前は必ず{" "}
          <code className="rounded bg-base-bg px-1 font-mono text-xs">index.html</code>{" "}
          にします(「表紙」という意味の決まった名前です)。
        </p>
        <p className="mt-3 font-bold text-ink">Windowsの場合</p>
        <ul className="my-2 space-y-1 text-sm text-ink-soft">
          <li>1. メモ帳を開く</li>
          <li>2. 「ファイル」→「名前を付けて保存」</li>
          <li>3. 保存先を、さっき作った <strong>my-website フォルダ</strong>にする</li>
          <li>4. 「ファイルの種類」を <strong>「すべてのファイル」</strong>に変える(ここ大事！)</li>
          <li>5. 名前を <code className="rounded bg-base-bg px-1 font-mono text-xs">index.html</code> にして保存</li>
        </ul>
        <p className="mt-3 font-bold text-ink">Macの場合</p>
        <ul className="my-2 space-y-1 text-sm text-ink-soft">
          <li>1. テキストエディットを開く</li>
          <li>2. メニュー「フォーマット」→「標準テキストにする」を選ぶ(大事！)</li>
          <li>3. 「ファイル」→「保存」で my-website フォルダに <code className="rounded bg-base-bg px-1 font-mono text-xs">index.html</code> として保存</li>
          <li>4. 「.txtを使用」と聞かれたら <strong>「.htmlを使用」</strong>を選ぶ</li>
        </ul>
        <Note title="拡張子が見えない時(Windows)">
          ファイル名のうしろの <code className="rounded bg-base-bg px-1 font-mono text-xs">.html</code>{" "}
          が見えない場合は、フォルダの「表示」メニューで「ファイル名拡張子」にチェックを入れると見えます。
          もし <code className="rounded bg-base-bg px-1 font-mono text-xs">index.html.txt</code>{" "}
          になっていたら、うしろの <code className="rounded bg-base-bg px-1 font-mono text-xs">.txt</code> を消しましょう。
        </Note>
        <Check>my-website フォルダの中に index.html ができていればOK！</Check>
      </Step>

      <Step n={3} title="ためしに1行だけ書いて、表示してみる">
        <p className="leading-relaxed text-ink-soft">
          本番の前に、「本当に表示できるの？」を確かめます。
          index.html を開いて(メモ帳/テキストエディットで)、下の文をまるごとコピーして貼り付け、保存してください。
        </p>
        <Code>{`<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>わたしのはじめてのページ</title>
  </head>
  <body>
    <h1>やった！表示できた！</h1>
    <p>これがわたしのホームページです。</p>
  </body>
</html>`}</Code>
        <p className="leading-relaxed text-ink-soft">
          保存したら、フォルダの中の{" "}
          <code className="rounded bg-base-bg px-1 font-mono text-xs">index.html</code>{" "}
          を<strong>ダブルクリック</strong>してみてください。ブラウザが開いて、
          「やった！表示できた！」という大きな文字が出れば大成功です。
        </p>
        <Note title="これがすごいこと">
          サーバーも、むずかしい準備も無しに、
          <strong>あなたのパソコンの中だけでホームページが表示できました</strong>。
          HTMLファイルはダブルクリックするだけでブラウザが読んでくれる——これを知っているだけで、もう怖くありません。
        </Note>
        <Check>ブラウザに「やった！表示できた！」と出ればOK！ここまで来たら半分終わりです。</Check>
      </Step>

      <Step n={4} title="ChatGPTに、あなたのホームページを作ってもらう">
        <p className="leading-relaxed text-ink-soft">
          いよいよ本番。コードは自分で考えません。
          <strong>ChatGPTに「こんなページが欲しい」と伝えるだけ</strong>。
          下のテンプレの空欄(___)を、あなたの内容に書きかえて、ChatGPTに送ってください。
        </p>
        <Code>{`あなたはプロのWeb制作者です。初心者向けに、
1つのHTMLファイルだけで完結するホームページを作ってください。

【何のページ】___（例：小さなカフェの紹介 / わたしの自己紹介）
【載せたいこと】___（例：店名、こだわり、営業時間、地図の代わりに住所、問い合わせ先）
【雰囲気・色】___（例：やさしい / かわいい / かっこいい、ベージュ系）

条件：
- CSS(見た目)も同じHTMLファイルの中に入れて、1ファイルで使える形にして
- スマホでも見やすいようにして
- 画像は使わず、色と文字だけで作って
- 説明はいらないので、HTMLのコードだけをコードブロックで出して
- 日本語で`}</Code>
        <p className="leading-relaxed text-ink-soft">
          ChatGPTが、長いHTMLのコードを<strong>コードブロック(黒い枠)</strong>で返してくれます。
          その枠の右上にある<strong>コピーボタン</strong>を押せば、まるごとコピーできます。
        </p>
        <Note title="うまく伝えるコツ">
          具体的に書くほど、良いページが返ってきます。迷ったら「もっとおしゃれにして」
          「文字を大きくして」など、追加でお願いすればどんどん直してくれます。
          この「頼んで・見て・直す」のやり取りは、
          <Link href="/ai-guide" className="font-bold text-brand underline underline-offset-2">
            AIに任せる技術
          </Link>
          でくわしく解説しています。
        </Note>
      </Step>

      <Step n={5} title="もらったコードを貼り付けて、表示する">
        <p className="leading-relaxed text-ink-soft">
          コピーしたら、index.html を開いて、
          <strong>中身をぜんぶ消してから、貼り付け</strong>ます(さっきの練習の文は消してOK)。
          保存したら、ブラウザで開いている index.html を<strong>再読み込み(更新)</strong>してください。
        </p>
        <ul className="my-2 space-y-1 text-sm text-ink-soft">
          <li>・更新のショートカット：<strong>Windows</strong> は F5、<strong>Mac</strong> は ⌘(コマンド)＋R</li>
        </ul>
        <p className="leading-relaxed text-ink-soft">
          あなたのホームページが表示されました。おめでとうございます、
          <strong>もうあなたは「ホームページを作れる人」</strong>です。
        </p>
        <Check>ブラウザに、あなたの内容のホームページが表示されればOK！🎉</Check>
      </Step>

      <Step n={6} title="気に入らない所を直す(これがバイブコーディング)">
        <p className="leading-relaxed text-ink-soft">
          完璧じゃなくて当たり前。直したい所は、そのままChatGPTにお願いします。
          全部を作り直す必要はありません。「ここをこう変えて」と言うだけ。
        </p>
        <ul className="my-3 space-y-1.5 text-sm text-ink-soft">
          <li>・「タイトルの色を、もっと濃い青にして」</li>
          <li>・「営業時間の下に、電話番号を大きく入れて」</li>
          <li>・「全体をもっと余白多めで、ゆったりさせて」</li>
        </ul>
        <p className="leading-relaxed text-ink-soft">
          返ってきた新しいコードを、また index.html に貼り付けて保存→更新。これのくり返しです。
          <strong>「言葉で頼んで、AIが直す」——これがいま話題の“バイブコーディング”</strong>そのものです。
        </p>
        <Note title="困ったとき">
          真っ白になった・文字化けした・変な表示になった——そんな時は、
          <strong>その状態をそのままChatGPTに伝えて「直して」</strong>と言えば直ります。
          エラーが出ても大丈夫。エラーは「敵」ではなく「ヒント」です(
          <Link href="/errors" className="font-bold text-brand underline underline-offset-2">
            エラー文おみくじ
          </Link>
          で練習できます)。
        </Note>
      </Step>

      {/* うまくいかない時 */}
      <section className="mb-10">
        <Kicker>つまずいたら</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">よくある「あれ？」と直し方</h2>
        <div className="mt-4 space-y-3">
          {[
            ["画面が真っ白", "index.html を開いているか確認。ファイル名が index.html.txt になっていないかも見てみて(なっていたら .txt を消す)。"],
            ["文字が □□□ に化ける", "1行目あたりに <meta charset=\"UTF-8\"> があるか確認。無ければChatGPTに「文字化けするので直して」と頼む。"],
            ["変更が反映されない", "保存し忘れかも。保存してから、ブラウザを更新(F5 / ⌘R)。それでもダメなら一度ブラウザで開き直す。"],
          ].map(([q, a]) => (
            <div key={q} className="rounded-2xl border border-base-border bg-base-surface p-4 shadow-sm">
              <p className="font-bold text-ink">❓ {q}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">→ {a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 次のステップ */}
      <section className="mb-10">
        <Kicker>もっとやりたくなったら</Kicker>
        <h2 className="text-xl font-bold text-ink md:text-2xl">次にできること</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          できたページを世界に公開したり、もっと理解を深めたくなったら、この先の道もあります。
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            ["/web", "HTML/CSSをちゃんと学ぶ"],
            ["/git", "作品を公開する(Git)"],
            ["/portfolio", "作品を仕事につなげる"],
            ["/ai-guide", "AIへの頼み方を極める"],
          ].map(([href, label]) => (
            <Link
              key={label}
              href={href}
              className="rounded-full border border-base-border bg-base-surface px-4 py-2 text-sm font-bold text-brand transition-colors hover:border-brand"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* 依頼への導線(funnel) */}
      <section id="pro" className="mb-8">
        <div className="rounded-3xl border border-brand/30 bg-brand-bg p-6 md:p-8">
          <p className="text-sm font-bold text-brand">ここから先は、プロの出番</p>
          <h2 className="mt-1 text-xl font-bold text-ink md:text-2xl">
            「本気のホームページ」にしたくなったら
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            自分で作れたのは、すごいことです。でも——
            <strong>集客できるデザイン</strong>、スマホでの美しい見え方、
            予約・問い合わせフォーム、検索で見つけてもらう工夫(SEO)、
            ロゴや写真の作り込み……ここから先は、専門の知識と手間がかかる領域です。
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            「自分のお店・事業の“顔”になる本格的なサイトが欲しい」——そう思ったら、
            私たち<strong>HaLVision(ハルビジョン)</strong>にお任せください。
            この学習メディアを運営している、Web制作・アプリ開発のプロチームです。
            <strong>あなたが自分で作ってみた経験は、打ち合わせでもきっと役立ちます。</strong>
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={CONTACT_URL}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand/90"
            >
              制作を相談する →
            </a>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-base-border bg-base-surface px-6 py-3 text-sm font-bold text-ink-soft transition-colors hover:border-brand"
            >
              LINEで気軽に聞く
            </a>
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
