// HTML/CSS 早見表(リファレンス)。調べ物用。暗記ではなく「引く」ためのもの。

export interface RefItem {
  name: string;
  desc: string;
  example?: string;
}
export interface RefGroup {
  title: string;
  kind: "html" | "css";
  items: RefItem[];
}

export const webCheatsheet: RefGroup[] = [
  // ── HTML ──────────────────────────────────────────────
  {
    title: "HTML — 構造・レイアウト",
    kind: "html",
    items: [
      { name: "<html> / <head> / <body>", desc: "ページ全体 / 設定情報 / 表示される中身の3つの土台" },
      { name: "<header>", desc: "ページや区画の上部(ロゴ・ナビなど)", example: "<header>…</header>" },
      { name: "<nav>", desc: "ナビゲーション(メニューのリンク集)" },
      { name: "<main>", desc: "そのページの主内容。1ページに1つ" },
      { name: "<section> / <article>", desc: "意味のある区切り / 独立した記事のまとまり" },
      { name: "<footer>", desc: "ページや区画の下部(著作権・連絡先など)" },
      { name: "<div> / <span>", desc: "意味を持たない箱(まとめ用) / 文中の一部を囲む" },
    ],
  },
  {
    title: "HTML — テキスト・リンク",
    kind: "html",
    items: [
      { name: "<h1>〜<h6>", desc: "見出し。h1が最上位。順番を飛ばさない" },
      { name: "<p>", desc: "段落(ひとまとまりの文章)" },
      { name: "<a href>", desc: "リンク。hrefに飛び先を書く", example: '<a href="/about">会社概要</a>' },
      { name: "<strong> / <em>", desc: "重要(太字) / 強調(斜体)。意味つきの強調" },
      { name: "<ul> / <ol> / <li>", desc: "箇条書き / 番号付きリスト / 各項目" },
      { name: "<br>", desc: "改行(多用しない。段落や余白で整えるのが基本)" },
    ],
  },
  {
    title: "HTML — 画像・フォーム",
    kind: "html",
    items: [
      { name: "<img src alt>", desc: "画像。srcが場所、altが代替テキスト(必須級)", example: '<img src="cat.jpg" alt="猫">' },
      { name: "<form>", desc: "入力をまとめて送る枠" },
      { name: "<input>", desc: "入力欄(type=text/email/checkbox…)", example: '<input type="email">' },
      { name: "<textarea>", desc: "複数行の入力欄" },
      { name: "<select> / <option>", desc: "プルダウン / その選択肢" },
      { name: "<button>", desc: "ボタン(送信・操作)" },
      { name: "<label>", desc: "入力欄の見出し。押しやすさ・読み上げに効く" },
    ],
  },
  // ── CSS ───────────────────────────────────────────────
  {
    title: "CSS — 並べる・配置",
    kind: "css",
    items: [
      { name: "display: flex", desc: "子要素を横一列などに並べる(Flexbox)" },
      { name: "justify-content", desc: "主軸方向の揃え(左/中央/両端など)", example: "justify-content: center;" },
      { name: "align-items", desc: "交差軸方向の揃え(上下中央など)" },
      { name: "gap", desc: "要素どうしの間隔(すきま)" },
      { name: "display: grid", desc: "格子状に並べる(行と列)" },
      { name: "position", desc: "配置方法(static/relative/absolute/fixed)" },
    ],
  },
  {
    title: "CSS — 箱(余白・サイズ・枠)",
    kind: "css",
    items: [
      { name: "width / height", desc: "幅 / 高さ" },
      { name: "margin", desc: "箱の外側の余白" },
      { name: "padding", desc: "箱の内側の余白(中身と枠の間)" },
      { name: "border", desc: "枠線", example: "border: 1px solid #ccc;" },
      { name: "border-radius", desc: "角を丸める" },
      { name: "box-sizing: border-box", desc: "枠と内側余白を幅に含める(崩れ防止の定番)" },
    ],
  },
  {
    title: "CSS — 文字・色・背景",
    kind: "css",
    items: [
      { name: "color", desc: "文字の色", example: "color: #333;" },
      { name: "font-size", desc: "文字の大きさ" },
      { name: "font-weight", desc: "文字の太さ(normal/bold/700など)" },
      { name: "line-height", desc: "行の高さ(読みやすさに直結)" },
      { name: "text-align", desc: "文字の揃え(left/center/right)" },
      { name: "background / background-color", desc: "背景(色・画像)" },
    ],
  },
  {
    title: "CSS — レスポンシブ・その他",
    kind: "css",
    items: [
      { name: "@media", desc: "画面幅などの条件でスタイルを切り替える", example: "@media (max-width: 768px) { … }" },
      { name: "max-width", desc: "最大幅(広がりすぎを防ぐ)" },
      { name: "overflow", desc: "はみ出しの扱い(hidden/auto/scroll)" },
      { name: "z-index", desc: "重なり順(大きいほど手前)" },
      { name: "transition", desc: "変化をなめらかにする(ホバー等)" },
    ],
  },
];
