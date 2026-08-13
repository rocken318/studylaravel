import type { GlossaryTerm } from "@/types";

// HTML/CSSの土台コースの用語集。category は "web"。
export const webGlossary: GlossaryTerm[] = [
  {
    slug: "html",
    term: "HTML",
    reading: "エイチティーエムエル",
    category: "web",
    meaning:
      "Webページの「骨組み(構造)」を作る言語。見出し・段落・画像・リンクなどを、タグで意味づけしながら組み立てます。家でいえば柱や壁などの構造そのもの。プログラミング言語ではなく「印(マークアップ)」の言語です。",
    interviewExample:
      "HTMLはページの構造を表すマークアップで、まず骨組みを正しく作ることが土台だと考えています。",
    related: ["css", "element", "semantic-html"],
  },
  {
    slug: "css",
    term: "CSS",
    reading: "シーエスエス",
    category: "web",
    meaning:
      "Webページの「見た目(色・大きさ・配置)」を整える言語。HTMLの骨組みに対して、内装や装飾を指定します。家でいえば壁紙や家具の配置。同じHTMLでもCSS次第で印象がまるで変わります。",
    interviewExample:
      "CSSは見た目を担当し、構造(HTML)と装飾(CSS)を分けることで保守しやすくなると理解しています。",
    related: ["html", "box-model", "selector"],
  },
  {
    slug: "tag",
    term: "タグ",
    reading: "tag",
    category: "web",
    meaning:
      "HTMLで中身を囲む印。<p>ここが段落</p> のように、開始タグ<p>と終了タグ</p>で挟みます。中身に「これは段落」「これは見出し」と意味のラベルを貼るイメージです。",
    interviewExample:
      "タグで中身に意味を与え、開始と終了で挟んで構造を作る、という基本を押さえています。",
    related: ["element", "attribute"],
  },
  {
    slug: "element",
    term: "要素（エレメント）",
    reading: "element",
    category: "web",
    meaning:
      "開始タグ・中身・終了タグをまとめた1つのかたまり。<a>会社概要</a> 全体が1つの要素です。ページは要素を入れ子にして積み上げてできています。",
    interviewExample:
      "要素はタグと中身のひとまとまりで、入れ子に組み合わせてページを構成します。",
    related: ["tag", "attribute", "dom"],
  },
  {
    slug: "attribute",
    term: "属性（アトリビュート）",
    reading: "attribute",
    category: "web",
    meaning:
      "タグに付ける追加情報。<img src=\"cat.jpg\" alt=\"猫\"> の src や alt が属性です。リンク先(href)、画像の場所(src)、代替テキスト(alt)など、要素の詳細を指定します。",
    interviewExample:
      "属性は要素の詳細指定で、リンク先や画像パス、altなどを与える役割です。",
    related: ["tag", "accessibility"],
  },
  {
    slug: "semantic-html",
    term: "セマンティックHTML",
    reading: "semantic HTML",
    category: "web",
    meaning:
      "見た目ではなく「意味・役割」でタグを選ぶ考え方。ヘッダーは<header>、本文は<main>、区切りは<section>のように名付けます。人にもAIにも検索エンジンにも構造が伝わり、アクセシビリティも上がります。",
    interviewExample:
      "div一辺倒にせず、header/main/sectionなど意味のあるタグを使って構造を明確にします。",
    related: ["html", "accessibility"],
  },
  {
    slug: "selector",
    term: "セレクタ",
    reading: "selector",
    category: "web",
    meaning:
      "CSSで「どの要素に」スタイルを当てるかを指定する部分。宛名書きのようなもので、タグ名・クラス(.name)・id(#name)などで狙いを定めます。狙いが広すぎると意図しない所まで変わります。",
    interviewExample:
      "セレクタは適用先の宛名で、クラスなどで狙いを絞って副作用を防ぎます。",
    related: ["css", "box-model"],
  },
  {
    slug: "box-model",
    term: "ボックスモデル",
    reading: "box model",
    category: "web",
    meaning:
      "すべての要素は四角い箱、という考え方。箱は内側から content(中身)・padding(内側の余白)・border(枠)・margin(外側の余白)でできています。レイアウトの余白調整はこの4つの理解が要です。",
    interviewExample:
      "要素は箱で、padding(内側)とmargin(外側)を区別して余白を調整します。",
    related: ["css", "flexbox"],
  },
  {
    slug: "flexbox",
    term: "Flexbox",
    reading: "フレックスボックス",
    category: "web",
    meaning:
      "要素を横一列や縦に「いい感じに並べる」ためのCSSの仕組み。棚に物を等間隔で並べたり、中央に寄せたりが簡単にできます。横並び・中央寄せの多くはFlexboxで解決します。",
    interviewExample:
      "横並びや中央寄せはFlexboxで、並べる方向と揃え方を指定して組みます。",
    related: ["box-model", "responsive"],
  },
  {
    slug: "responsive",
    term: "レスポンシブ",
    reading: "responsive",
    category: "web",
    meaning:
      "スマホ・PCなど画面の幅に合わせて、レイアウトが自動で変わる作り方。1枚の紙が入れ物に合わせて折りたたまれるイメージです。今のWebでは必須の考え方です。",
    interviewExample:
      "画面幅に応じて崩れないよう、レスポンシブ前提でレイアウトを組みます。",
    related: ["flexbox", "css"],
  },
  {
    slug: "dom",
    term: "DOM",
    reading: "ドム",
    category: "web",
    meaning:
      "ブラウザがHTMLを読み込んで作る「入れ子の木構造」。家系図のように親子で枝分かれします。JavaScriptはこのDOMを操作して、後から中身や見た目を動かします。",
    interviewExample:
      "DOMはブラウザ内のHTMLの木構造で、JSはこれを操作して動きをつけると理解しています。",
    related: ["html", "element"],
  },
  {
    slug: "accessibility",
    term: "アクセシビリティ",
    reading: "accessibility",
    category: "web",
    meaning:
      "目が見えにくい人やキーボードだけの人も含め、誰でも使える状態にする配慮。画像のalt、見出しの正しい順序、十分な色のコントラストなどが基本です。全員に届けるための土台です。",
    interviewExample:
      "alt・見出し順・コントラストなど、誰でも使える配慮を最初から入れます。",
    related: ["semantic-html", "attribute"],
  },
];
