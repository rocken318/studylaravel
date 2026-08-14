import type { Day } from "@/types";

export const reactDay1: Day = {
  day: 1,
  slug: "day1",
  title: "JSXとコンポーネント — 部品を作って渡す",
  goal: "関数コンポーネントを読んで書けるようになり、JSX(HTMLに似た記法で実体はJS。{}でJSを埋め込む)を理解し、propsで親から子へデータを渡せるようになる。",
  lessons: [
    {
      id: "reactday1-lesson1",
      slug: "jsx",
      title: "JSXの読み方 — HTMLそっくりだが実はJavaScript",
      summary: "JSXはHTMLに見えるが正体はJavaScript。{}の中に変数や式を書けること、classNameなどの違いを読み取れるようになる。",
      blocks: [
        { type: "heading", text: "HTMLに見える。でも実体はJavaScript" },
        { type: "paragraph", text: "Reactのコードを開くと、JavaScriptファイルの中に<p>や<div>といったHTMLらしきものが直接書いてあって驚くかもしれません。これがJSXです。見た目はHTMLそっくりですが、正体はJavaScript。ブラウザに届く前に、裏で「画面を組み立てるJSの命令」へ変換されます。だから『HTMLの顔をしたJS』と思って読むのがコツです。" },
        { type: "code", language: "tsx", code: "function Hello() {\n  return <p>こんにちは、Reactの世界へ</p>;\n}", caption: "関数がJSX(HTMLに見えるJS)を返している。これがReactの一番小さな部品。" },
        { type: "paragraph", text: "returnの後ろに書いた<p>...</p>が、この関数の「見た目」です。関数が値を返すのと同じ感覚で、Reactの部品は「画面の一部」を返します。文字列を返すのではなく、画面の構造を返している、と読み替えてください。" },
        { type: "heading", text: "{}の中にはJavaScriptを書ける" },
        { type: "paragraph", text: "JSXがただのHTMLと決定的に違うのは、波かっこ{}の中にJavaScriptの変数や式を差し込めることです。{}は『ここからはJSですよ』という切り替えスイッチだと考えてください。文字を埋め込むだけでなく、足し算や関数呼び出しの結果も書けます。" },
        { type: "code", language: "tsx", code: "function Price() {\n  const yen = 1200;\n  return <p>お値段は {yen} 円、税込 {Math.round(yen * 1.1)} 円です</p>;\n}", caption: "{yen} で変数を、{Math.round(...)} で式の結果を画面に埋め込んでいる。" },
        { type: "callout", variant: "why", title: "なぜHTMLとJSを混ぜるのか", text: "昔は「見た目(HTML)」と「動き(JS)」をファイルごとに分けるのが常識でした。でも実際は『このボタンが押されたらこの表示が変わる』のように見た目と動きは強く結びついています。JSXは関連するものを1か所にまとめることで、読むときに視線があちこち飛ばず、部品として理解しやすくします。" },
        { type: "heading", text: "HTMLとの小さな違い: className と閉じタグ" },
        { type: "paragraph", text: "JSXはJavaScriptなので、HTMLの一部の書き方がそのままは使えません。代表がclassです。classはJavaScriptの予約語(クラス構文で使う)なので、JSXではclassNameと書きます。見た目はほぼ同じでも、名前が違う点に気づけると読み間違いが減ります。" },
        { type: "code", language: "tsx", code: "// HTMLでは class だが、JSXでは className\nfunction Badge() {\n  return <span className=\"badge\">NEW</span>;\n}", caption: "class ではなく className。JSXがJSであることの表れ。" },
        { type: "callout", variant: "warn", title: "閉じタグを忘れない", text: "HTMLでは<br>や<img>を閉じなくても許されましたが、JSXでは必ず閉じる必要があります。<br />や<img src=\"...\" />のように、末尾にスラッシュを付けた『自己完結タグ』にしてください。閉じ忘れはReactでよく出るエラーの筆頭です。AIの生成コードでも稀に抜けるので、読むときに閉じているか確認する癖をつけると安全です。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このJSXを一行ずつ日本語で説明して。{}の中がJavaScriptとして何をしているか、HTMLと違う書き方(classNameなど)があればそこも教えて」と頼むと、JSXを読む力が早く育ちます。" }
      ],
      questions: [
        {
          id: "reactday1-lesson1-q1",
          type: "choice",
          question: "JSXの説明として最も適切なものはどれですか。",
          choices: [
            "JSXは純粋なHTMLで、JavaScriptとは無関係である",
            "JSXは見た目がHTMLに似ているが実体はJavaScriptで、{}の中にJSの変数や式を書ける",
            "JSXはCSSを書くための専用言語である",
            "JSXではclassやスタイルを一切指定できない"
          ],
          answerIndex: 1,
          explanation: "JSXはHTMLに似た記法ですが、裏でJSに変換される『HTMLの顔をしたJavaScript』です。{}を使えば変数や式の結果を画面へ埋め込めます。classはclassNameと書く、といった違いもJSであることの表れです。"
        },
        {
          id: "reactday1-lesson1-q2",
          type: "free",
          question: "「JSXの{}には何を書けるのか」を、HTMLしか知らない人にも伝わるように説明してください。",
          modelAnswer: "JSXは見た目こそHTMLに似ていますが、実体はJavaScriptです。波かっこ{}は『ここからはJavaScriptですよ』という切り替えスイッチで、その中には変数や式を書けます。たとえば{price}と書けば変数priceの中身が画面に出ますし、{price * 1.1}のように計算式を書けばその結果が表示されます。文字を固定で書くだけのHTMLと違い、値や計算を差し込めるのがJSXの{}です。",
          interviewPhrase: "実務でこう説明する: JSXはHTMLライクな記法ですが実体はJSで、波かっこの中はJavaScriptの式として評価されます。変数や計算結果、条件式などを埋め込んで動的な表示を組み立てています。",
          keywords: ["JSX", "JavaScript", "{}", "変数", "式"]
        }
      ]
    },
    {
      id: "reactday1-lesson2",
      slug: "components",
      title: "関数コンポーネント — UI部品を返す関数",
      summary: "大文字始まりの関数がUI部品(コンポーネント)を返す。<Header />のように使い、1ファイル1役割で部品を組み合わせる感覚をつかむ。",
      blocks: [
        { type: "heading", text: "コンポーネントは「画面を返す関数」" },
        { type: "paragraph", text: "Reactでは、画面を『部品(コンポーネント)』の組み合わせで作ります。そしてコンポーネントの正体は、JSXを返すただの関数です。特別な仕組みではなく、あなたが知っているJSの関数がそのまま『画面を組み立てる部品』になります。" },
        { type: "code", language: "tsx", code: "function Header() {\n  return <h1>マイアプリ</h1>;\n}\n\nfunction Footer() {\n  return <footer>© 2026 MyApp</footer>;\n}", caption: "HeaderもFooterも、JSXを返すだけの関数。これがコンポーネント。" },
        { type: "heading", text: "作った部品はタグのように使う" },
        { type: "paragraph", text: "定義したコンポーネントは、<Header />のようにJSXの中でタグとして呼び出せます。自分で作った部品を、まるでHTMLタグのように置いていく感覚です。部品を並べて、より大きな画面を組み立てます。" },
        { type: "code", language: "tsx", code: "function App() {\n  return (\n    <div>\n      <Header />\n      <p>ようこそ。ここが本文です。</p>\n      <Footer />\n    </div>\n  );\n}", caption: "小さな部品を組み合わせて大きな画面(App)を作る。レゴブロックを積むイメージ。" },
        { type: "callout", variant: "why", title: "なぜ部品に分けるのか", text: "料理でいえば、下ごしらえした材料を組み合わせて一皿を作るのと同じです。ヘッダーやボタンを部品にしておくと、別の画面でも使い回せて、直すときも『その部品だけ』を直せば全部に反映されます。大きな画面を一気に読むより、名前のついた小さな部品に分かれているほうが、読む人にとっても理解しやすくなります。" },
        { type: "heading", text: "名前は必ず大文字から始める" },
        { type: "paragraph", text: "コンポーネントの関数名は必ず大文字で始めます。これはReactのルールです。小文字始まりのタグ(<header>)はブラウザ標準のHTMLタグ、大文字始まり(<Header />)は『あなたが作った部品』とReactが見分けているからです。" },
        { type: "callout", variant: "warn", title: "小文字始まりは部品として認識されない", text: "function header()のように小文字で定義して<header />と書くと、Reactはあなたの部品ではなく標準のHTMLタグだと解釈し、意図した表示になりません。エラーにならず『ただ空っぽ』になることもあり、原因に気づきにくい落とし穴です。部品名は必ず大文字始まり、と覚えておきましょう。" },
        { type: "paragraph", text: "実務では『1ファイルにつき1つの部品(1役割)』にすることが多いです。Header.tsxにはHeaderだけ、というように役割ごとにファイルを分けると、どこに何があるか探しやすくなります。まずは『部品=JSXを返す大文字始まりの関数』という感覚を持てれば十分です。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このReactのファイルにはどんなコンポーネントがあって、それぞれ何を表示している?部品の親子関係も日本語で図のように説明して」と頼むと、画面全体の構造をつかみやすくなります。" }
      ],
      questions: [
        {
          id: "reactday1-lesson2-q1",
          type: "choice",
          question: "関数コンポーネントについて、正しい説明はどれですか。",
          choices: [
            "コンポーネントは特別な言語で書く必要があり、通常のJS関数とは無関係である",
            "JSXを返す関数で、名前は大文字始まりにし、<Header />のようにタグとして使う",
            "コンポーネントの名前は必ず小文字で始めなければならない",
            "1つのファイルには複数の部品を書くことが禁止されている"
          ],
          answerIndex: 1,
          explanation: "コンポーネントはJSXを返すただの関数です。名前を大文字始まりにするのはReactのルールで、これにより『自作の部品』と標準HTMLタグを見分けます。使うときは<Header />のようにタグとして書きます。"
        },
        {
          id: "reactday1-lesson2-q2",
          type: "free",
          question: "「Reactのコンポーネント」とは何かを、関数を知っている初心者に説明してください。名前のルールにも触れてください。",
          modelAnswer: "コンポーネントは、画面の一部(JSX)を返すただのJavaScript関数です。特別な仕組みではなく、知っている関数がそのまま画面の部品になります。作った部品は<Header />のようにタグとして呼び出し、小さな部品を組み合わせて大きな画面を作ります。名前は必ず大文字で始めるルールがあり、これでReactは自作の部品と標準のHTMLタグ(小文字)を見分けています。",
          interviewPhrase: "実務でこう説明する: UIはコンポーネント単位で分割しています。各コンポーネントはJSXを返す関数で、大文字始まりの命名で標準要素と区別し、1ファイル1責務を意識して再利用と保守性を高めています。",
          keywords: ["コンポーネント", "関数", "JSX", "大文字", "部品"]
        }
      ]
    },
    {
      id: "reactday1-lesson3",
      slug: "props",
      title: "props — 親から子へデータを渡す",
      summary: "propsは親コンポーネントから子へデータを渡す仕組み(関数の引数のようなもの)。同じ部品に違うデータを渡して再利用する感覚と、ハードコードとの違いをつかむ。",
      blocks: [
        { type: "heading", text: "部品に「材料」を渡したい" },
        { type: "paragraph", text: "ヘッダーのように中身が固定の部品もありますが、『名前だけ違うカード』のように、形は同じで中身だけ変えたい部品もあります。このとき使うのがpropsです。propsは、親コンポーネントから子コンポーネントへデータを渡す仕組みで、関数の引数によく似ています。" },
        { type: "code", language: "tsx", code: "// 渡す側(親)\nfunction App() {\n  return <UserCard name=\"太郎\" />;\n}", caption: "<UserCard /> に name=\"太郎\" と属性のように書いて、データを渡している。" },
        { type: "paragraph", text: "受け取る側の子コンポーネントは、引数としてpropsを受け取ります。よく使うのは、必要な値だけを{ }で取り出す『分割代入』の書き方です。{ name }と書けば、渡されたnameをそのまま使えます。" },
        { type: "code", language: "tsx", code: "// 受け取る側(子)\nfunction UserCard({ name }: { name: string }) {\n  return <div className=\"card\">ようこそ、{name} さん</div>;\n}", caption: "引数の { name } で props の name を受け取り、JSX の {name} で表示している。" },
        { type: "heading", text: "同じ部品に違うデータ = 再利用" },
        { type: "paragraph", text: "propsの本当のうれしさは再利用です。同じUserCardに違うnameを渡すだけで、何枚でも違うカードを作れます。部品は1つ、データは何通りでも。これが『部品化』のごほうびです。" },
        { type: "code", language: "tsx", code: "function App() {\n  return (\n    <div>\n      <UserCard name=\"太郎\" />\n      <UserCard name=\"花子\" />\n      <UserCard name=\"次郎\" />\n    </div>\n  );\n}", caption: "同じUserCardにnameを変えて渡すだけで3枚のカードができる。" },
        { type: "callout", variant: "why", title: "なぜハードコードせず props にするのか", text: "『太郎』と直接書いた(ハードコードした)カードは、花子さん用にはもう1つ丸ごと作り直すしかありません。propsにしておけば、部品はそのまま、渡す値を変えるだけ。変更が1か所で済み、間違いも減ります。『変わるところを外から渡せるようにする』のが再利用の基本です。" },
        { type: "compare", bad: { label: "ハードコード(再利用できない)", language: "tsx", code: "function TaroCard() {\n  return <div className=\"card\">ようこそ、太郎 さん</div>;\n}\n// 花子さん用にはまた別の部品が必要..." }, good: { label: "props化(何度でも再利用)", language: "tsx", code: "function UserCard({ name }: { name: string }) {\n  return <div className=\"card\">ようこそ、{name} さん</div>;\n}\n// <UserCard name=\"花子\" /> のように渡すだけ" } },
        { type: "heading", text: "children: タグで挟んだ中身も渡せる" },
        { type: "paragraph", text: "もう1つ、childrenという特別なpropsがあります。<Box>ここが中身</Box>のように開始タグと終了タグで挟んだものは、childrenとして子コンポーネントに届きます。今は『タグで囲んだ中身も渡せる』とだけ知っておけば十分です。" },
        { type: "code", language: "tsx", code: "function Box({ children }: { children: React.ReactNode }) {\n  return <div className=\"box\">{children}</div>;\n}\n\n// 使う側: <Box>ここが中身になる</Box>", caption: "タグで挟んだ中身が children として渡り、{children} の位置に表示される。" },
        { type: "callout", variant: "warn", title: "props は上書きしない", text: "propsは親から受け取った値で、子の中で書き換えてはいけません(name = \"別の名前\" のように代入しない)。propsは『親から子への一方通行の手渡し』です。子で値を変えたいときは、Day2で学ぶstateという別の仕組みを使います。まずは『propsは読むだけ』と覚えておきましょう。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「このコンポーネントはどんなpropsを受け取っている?それぞれの型と、親からどう渡されているかを日本語で説明して。ハードコードされている値があれば、propsにすべきか意見も教えて」と聞くと、再利用の勘所がつかめます。" }
      ],
      questions: [
        {
          id: "reactday1-lesson3-q1",
          type: "choice",
          question: "propsの説明として最も適切なものはどれですか。",
          choices: [
            "propsは子コンポーネントが親に命令を送る仕組みである",
            "propsは親から子へデータを渡す仕組みで、関数の引数のようなもの。子の中では書き換えず読むだけにする",
            "propsを使うと同じ部品を再利用できなくなる",
            "propsはCSSのスタイルを指定するための専用機能である"
          ],
          answerIndex: 1,
          explanation: "propsは親コンポーネントから子へデータを渡す仕組みで、関数の引数によく似ています。<UserCard name=\"太郎\" />のように渡し、子は{ name }で受け取ります。子の中で書き換えず読むだけにするのがルールで、同じ部品に違う値を渡して再利用できます。"
        },
        {
          id: "reactday1-lesson3-q2",
          type: "choice",
          question: "同じ内容のカードを名前だけ変えて何枚も表示したいとき、最も適切なのはどれですか。",
          choices: [
            "名前をハードコードしたカード部品を、人数分だけ別々に作る",
            "名前をpropsで受け取るUserCardを1つ作り、<UserCard name=\"...\" />で違う名前を渡して並べる",
            "1枚だけ作り、名前は変えずに使い回す",
            "propsは使わず、CSSで名前を切り替える"
          ],
          answerIndex: 1,
          explanation: "変わるところ(名前)をpropsとして外から渡せるようにすれば、部品は1つで済み、渡す値を変えるだけで何枚でも作れます。ハードコードすると人数分の部品が必要になり、変更も大変です。これが部品化と再利用の基本です。"
        },
        {
          id: "reactday1-lesson3-q3",
          type: "free",
          question: "「値をハードコードするのではなくpropsにする」利点を、初心者にも伝わるように説明してください。",
          modelAnswer: "値をコンポーネントの中に直接書く(ハードコードする)と、少し違うものが欲しくなるたびに部品を丸ごと作り直すことになります。たとえば太郎さん用のカードを作っても、花子さん用にはもう1つ別に作る必要があります。一方、名前をpropsとして外から渡せるようにしておけば、部品は1つのまま、渡す値を変えるだけで何枚でも作れます。変更は1か所で済み、コードも短く、間違いも減ります。『変わるところを外から渡す』のが再利用の基本です。",
          interviewPhrase: "実務でこう説明する: 表示は同じで内容だけ変わる箇所はpropsとして切り出し、コンポーネントを再利用可能にしています。ハードコードを避けることで重複が減り、変更が一箇所に集約されて保守性が上がります。",
          keywords: ["props", "ハードコード", "再利用", "親から子", "一箇所"]
        }
      ]
    }
  ]
};
