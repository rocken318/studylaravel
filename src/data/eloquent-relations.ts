// =====================================================================
// Eloquent リレーション図解用のデータ
//  - relationSections : 各リレーション種別(hasOne/hasMany/belongsTo…)の解説
//  - 各セクションは「関係の図(箱+外部キー+矢印)」「モデル定義コード」
//    「使い方コード」「具体例」「いつ使うか」「外部キーの向き」を持つ。
// /eloquent-relations ページ(EloquentRelationsPage)から読み込んで描画する。
// =====================================================================

// ------------------------------------------------------------------
// 図(ダイアグラム)の型
//  モデル/テーブルを「箱」で表し、箱の間を「矢印(=外部キーの向き)」で
//  つなぐ。箱は列(カラム)を持ち、外部キーには印を付ける。
// ------------------------------------------------------------------

/** 箱(テーブル/モデル)の役割ごとの色トーン */
export type BoxTone = "primary" | "related" | "pivot";

/** 箱の中の1カラム */
export interface DiagramColumn {
  /** カラム名(例: id, user_id) */
  name: string;
  /** このカラムが主キーか */
  pk?: boolean;
  /** このカラムが外部キーか(強調表示する) */
  fk?: boolean;
  /** 補足(小さく表示。任意) */
  note?: string;
}

/** 図の中の1つの箱(テーブル) */
export interface DiagramBox {
  /** テーブル名(例: users) */
  table: string;
  /** 対応するモデル名(例: User) */
  model: string;
  tone: BoxTone;
  columns: DiagramColumn[];
}

/** 箱と箱をつなぐ矢印(=外部キーが指す向き) */
export interface DiagramArrow {
  /** 矢印の元(外部キーを持つ側)の説明ラベル */
  from: string;
  /** 矢印の先(参照される側)の説明ラベル */
  to: string;
  /** 関係の多重度ラベル(例: "1", "多", "1 — 多") */
  cardinality: string;
  /** 矢印に添える一言(外部キーの向きの説明) */
  label: string;
}

export interface RelationDiagram {
  boxes: DiagramBox[];
  arrows: DiagramArrow[];
}

// ------------------------------------------------------------------
// コードブロック(モデル定義 / 使い方)
// ------------------------------------------------------------------
export interface CodeBlock {
  /** ブロックの見出し(任意) */
  caption?: string;
  /** 実際のコード(等幅で表示。改行そのまま) */
  code: string;
}

// ------------------------------------------------------------------
// 1つのリレーション種別セクション
// ------------------------------------------------------------------
export interface RelationSection {
  id: string;
  /** 見出しの絵文字 */
  icon: string;
  /** リレーション名(例: hasMany(1対多)) */
  title: string;
  /** メソッド名チップ(例: ["hasMany", "belongsTo"]) */
  methods: string[];
  /** ひとこと要約 */
  summary: string;
  /** いつ使うか */
  whenToUse: string;
  /** 外部キーの向き(どのテーブルが外部キーを持つか) */
  fkDirection: string;
  /** 関係の図 */
  diagram: RelationDiagram;
  /** モデル定義コード */
  modelCode: CodeBlock[];
  /** 使い方コード */
  usageCode: CodeBlock[];
  /** 具体例(文章での説明) */
  example: string;
}

// ------------------------------------------------------------------
// 本体データ
// ------------------------------------------------------------------
export const relationSections: RelationSection[] = [
  // === 1. hasOne / belongsTo(1対1) ===
  {
    id: "has-one",
    icon: "🔗",
    title: "hasOne / belongsTo(1対1)",
    methods: ["hasOne", "belongsTo"],
    summary:
      "1つのモデルが、別の1つのモデルとちょうど1対1で結びつく関係。「ユーザーは1つのプロフィールを持つ」など。",
    whenToUse:
      "1件に対して関連データがちょうど1件だけのとき。テーブルを分けて主テーブルを軽くしたい・任意情報を切り出したいときに使います(例: users と profiles)。",
    fkDirection:
      "「持たれる側(子)」が外部キーを持ちます。profiles テーブルに user_id を置き、profiles → users を指します。親(User)側が hasOne、子(Profile)側が belongsTo です。",
    diagram: {
      boxes: [
        {
          table: "users",
          model: "User",
          tone: "primary",
          columns: [
            { name: "id", pk: true },
            { name: "name" },
          ],
        },
        {
          table: "profiles",
          model: "Profile",
          tone: "related",
          columns: [
            { name: "id", pk: true },
            { name: "user_id", fk: true, note: "→ users.id" },
            { name: "bio" },
          ],
        },
      ],
      arrows: [
        {
          from: "profiles.user_id",
          to: "users.id",
          cardinality: "1 — 1",
          label: "外部キー user_id は子(profiles)側にあり、親(users)を指す",
        },
      ],
    },
    modelCode: [
      {
        caption: "親: User モデル(hasOne)",
        code: `class User extends Model
{
    // ユーザーは1つのプロフィールを持つ
    public function profile()
    {
        return $this->hasOne(Profile::class);
        // 外部キーを明示するなら:
        // return $this->hasOne(Profile::class, 'user_id', 'id');
    }
}`,
      },
      {
        caption: "子: Profile モデル(belongsTo = 逆向き)",
        code: `class Profile extends Model
{
    // プロフィールは1人のユーザーに属する
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}`,
      },
    ],
    usageCode: [
      {
        caption: "親から子をたどる",
        code: `$user = User::find(1);
$bio = $user->profile->bio;   // hasOne 経由でプロフィール取得`,
      },
      {
        caption: "子から親をたどる(逆)",
        code: `$profile = Profile::find(1);
$name = $profile->user->name; // belongsTo 経由でユーザー取得`,
      },
    ],
    example:
      "会員サイトで、ログイン情報を持つ users テーブルと、自己紹介や住所などを持つ profiles テーブルを分けるケース。1ユーザーにプロフィールは1つだけなので hasOne / belongsTo が最適です。",
  },

  // === 2. hasMany / belongsTo(1対多) ===
  {
    id: "has-many",
    icon: "🌿",
    title: "hasMany / belongsTo(1対多)",
    methods: ["hasMany", "belongsTo"],
    summary:
      "1つの親が複数の子を持つ、最もよく使う関係。「ユーザーは複数の投稿を持つ」「投稿は1人のユーザーに属する」。",
    whenToUse:
      "1件に対して関連データが何件もぶら下がるとき。ブログ記事・コメント・注文明細など、実務で圧倒的に登場する定番です。",
    fkDirection:
      "「多」側(子)が外部キーを持ちます。posts テーブルに user_id を置き、posts → users を指します。親(User)が hasMany、子(Post)が belongsTo です。",
    diagram: {
      boxes: [
        {
          table: "users",
          model: "User",
          tone: "primary",
          columns: [
            { name: "id", pk: true },
            { name: "name" },
          ],
        },
        {
          table: "posts",
          model: "Post",
          tone: "related",
          columns: [
            { name: "id", pk: true },
            { name: "user_id", fk: true, note: "→ users.id" },
            { name: "title" },
          ],
        },
      ],
      arrows: [
        {
          from: "posts.user_id",
          to: "users.id",
          cardinality: "1 — 多",
          label: "外部キー user_id は「多」側(posts)にあり、親(users)を指す",
        },
      ],
    },
    modelCode: [
      {
        caption: "親: User モデル(hasMany)",
        code: `class User extends Model
{
    // ユーザーは複数の投稿を持つ
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}`,
      },
      {
        caption: "子: Post モデル(belongsTo = 逆向き)",
        code: `class Post extends Model
{
    // 投稿は1人のユーザーに属する
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}`,
      },
    ],
    usageCode: [
      {
        caption: "親から子の一覧をたどる",
        code: `$user = User::find(1);

foreach ($user->posts as $post) {   // Collection(複数)が返る
    echo $post->title;
}

$count = $user->posts()->count();   // メソッド呼び出しで件数だけ取得`,
      },
      {
        caption: "子から親をたどる / 子を作成",
        code: `$post = Post::find(10);
echo $post->user->name;             // 投稿者の名前

// 親経由で子を作成すると user_id が自動でセットされる
$user->posts()->create(['title' => '初投稿']);`,
      },
    ],
    example:
      "ブログで「1人のユーザーが何本も記事を書く」関係。User::find(1)->posts でその人の全記事、Post::find(10)->user で記事の著者をたどれます。外部キー user_id は記事(多い側)に置きます。",
  },

  // === 3. belongsToMany(多対多) ===
  {
    id: "belongs-to-many",
    icon: "🔀",
    title: "belongsToMany(多対多・中間テーブル / pivot)",
    methods: ["belongsToMany"],
    summary:
      "両側が複数を持ち合う関係。「記事は複数のタグを持ち、タグも複数の記事に付く」。間に中間テーブル(pivot)を挟みます。",
    whenToUse:
      "どちらから見ても相手が複数になるとき。記事とタグ、ユーザーと役割(ロール)、生徒と講座など。組み合わせを記録する専用テーブルが必要です。",
    fkDirection:
      "外部キーは両側のどちらでもなく、中間テーブル(post_tag)が両方への外部キー(post_id と tag_id)を持ちます。中間テーブル名は原則、関連する2つの単数形をアルファベット順に _ でつなぎます(post + tag → post_tag)。",
    diagram: {
      boxes: [
        {
          table: "posts",
          model: "Post",
          tone: "primary",
          columns: [
            { name: "id", pk: true },
            { name: "title" },
          ],
        },
        {
          table: "post_tag",
          model: "(中間テーブル)",
          tone: "pivot",
          columns: [
            { name: "post_id", fk: true, note: "→ posts.id" },
            { name: "tag_id", fk: true, note: "→ tags.id" },
          ],
        },
        {
          table: "tags",
          model: "Tag",
          tone: "related",
          columns: [
            { name: "id", pk: true },
            { name: "name" },
          ],
        },
      ],
      arrows: [
        {
          from: "post_tag.post_id",
          to: "posts.id",
          cardinality: "多 — 多",
          label: "中間テーブルが post_id で posts を指す",
        },
        {
          from: "post_tag.tag_id",
          to: "tags.id",
          cardinality: "多 — 多",
          label: "中間テーブルが tag_id で tags を指す",
        },
      ],
    },
    modelCode: [
      {
        caption: "両側に belongsToMany を書く",
        code: `class Post extends Model
{
    public function tags()
    {
        // 中間テーブル post_tag を介して多対多
        return $this->belongsToMany(Tag::class);
    }
}

class Tag extends Model
{
    public function posts()
    {
        return $this->belongsToMany(Post::class);
    }
}`,
      },
    ],
    usageCode: [
      {
        caption: "たどる / 付け外し",
        code: `$post = Post::find(1);

foreach ($post->tags as $tag) {   // 紐づく全タグ
    echo $tag->name;
}

$post->tags()->attach($tagId);    // 関連を1件追加(中間に行を作る)
$post->tags()->detach($tagId);    // 関連を1件削除
$post->tags()->sync([1, 2, 3]);   // この3つだけに一括で揃える`,
      },
      {
        caption: "中間テーブルの追加情報(pivot)",
        code: `// マイグレーションで中間テーブルに列を足しておくと…
return $this->belongsToMany(Tag::class)->withPivot('created_by')->withTimestamps();

foreach ($post->tags as $tag) {
    echo $tag->pivot->created_by;   // 中間テーブルの値に $tag->pivot でアクセス
}`,
      },
    ],
    example:
      "記事にタグを付ける機能。1記事に複数タグ、1タグは複数記事に付くので belongsToMany。attach/detach/sync で紐付けを操作します。「誰が付けたか」など関係そのものの情報は中間テーブルに列を足し、pivot でアクセスします。",
  },

  // === 4. hasManyThrough / hasOneThrough(中間経由) ===
  {
    id: "has-many-through",
    icon: "🪜",
    title: "hasManyThrough / hasOneThrough(中間モデル経由)",
    methods: ["hasManyThrough", "hasOneThrough"],
    summary:
      "間に別のモデルを1つ挟んで、離れたモデルへ一気にたどる関係。「国 → ユーザー → 投稿」を、国から投稿へ直接。",
    whenToUse:
      "A→B→C と2段でつながっているとき、中間のBを毎回書かずにAからCへ直接アクセスしたい場合。多対多とは違い、間にあるのは中間「モデル(テーブル)」で、pivotではありません。",
    fkDirection:
      "外部キーは通常の1対多と同じく、下流のテーブルが上流を指します。users が country_id を持ち、posts が user_id を持つ。Through は「その2本の外部キーを連鎖でたどる」ショートカットです。",
    diagram: {
      boxes: [
        {
          table: "countries",
          model: "Country",
          tone: "primary",
          columns: [
            { name: "id", pk: true },
            { name: "name" },
          ],
        },
        {
          table: "users",
          model: "User(中間)",
          tone: "pivot",
          columns: [
            { name: "id", pk: true },
            { name: "country_id", fk: true, note: "→ countries.id" },
          ],
        },
        {
          table: "posts",
          model: "Post",
          tone: "related",
          columns: [
            { name: "id", pk: true },
            { name: "user_id", fk: true, note: "→ users.id" },
            { name: "title" },
          ],
        },
      ],
      arrows: [
        {
          from: "users.country_id",
          to: "countries.id",
          cardinality: "1 — 多",
          label: "中間 users が countries を指す",
        },
        {
          from: "posts.user_id",
          to: "users.id",
          cardinality: "1 — 多",
          label: "posts が中間 users を指す(この2本を連鎖してたどる)",
        },
      ],
    },
    modelCode: [
      {
        caption: "Country モデル(User を経由して Post へ)",
        code: `class Country extends Model
{
    // 国 → (users を経由) → その国のユーザーの全投稿
    public function posts()
    {
        return $this->hasManyThrough(
            Post::class,     // 最終的に欲しいモデル
            User::class      // 中間のモデル
            // 省略時: users.country_id と posts.user_id を推測して連結
        );
    }
}`,
      },
    ],
    usageCode: [
      {
        caption: "国から一気に投稿を取得",
        code: `$country = Country::find(1);

foreach ($country->posts as $post) {
    // その国に属する全ユーザーの投稿が、User を書かずに取れる
    echo $post->title;
}`,
      },
    ],
    example:
      "「日本のユーザーが書いた投稿を全部集めたい」ようなケース。本来は 国→ユーザー→投稿 と2段たどる必要がありますが、hasManyThrough なら Country::find(1)->posts で一気に取得できます。1件だけ欲しいときは hasOneThrough を使います。",
  },

  // === 5. ポリモーフィック ===
  {
    id: "polymorphic",
    icon: "🧩",
    title: "ポリモーフィック(morphOne / morphMany / morphTo / morphToMany)",
    methods: ["morphOne", "morphMany", "morphTo", "morphToMany"],
    summary:
      "1つの子テーブルが、複数種類の親に属せる関係。「コメントが記事にも動画にも付く」を、テーブルを増やさず1つでまかないます。",
    whenToUse:
      "同じ子(コメント・画像・いいね など)を、複数の異なる親モデルにぶら下げたいとき。親ごとに comments テーブルを分けずに済みます。",
    fkDirection:
      "子テーブルが「相手のID(commentable_id)」と「相手の種類(commentable_type)」の2列を持ちます。type にモデルのクラス名(例: App\\\\Models\\\\Post)が入るので、同じ外部キーで複数の親を指し分けられます。親側が morphMany/morphOne、子側が morphTo です。",
    diagram: {
      boxes: [
        {
          table: "posts",
          model: "Post",
          tone: "primary",
          columns: [
            { name: "id", pk: true },
            { name: "title" },
          ],
        },
        {
          table: "videos",
          model: "Video",
          tone: "primary",
          columns: [
            { name: "id", pk: true },
            { name: "url" },
          ],
        },
        {
          table: "comments",
          model: "Comment",
          tone: "related",
          columns: [
            { name: "id", pk: true },
            { name: "body" },
            { name: "commentable_id", fk: true, note: "相手のID" },
            { name: "commentable_type", fk: true, note: "相手のクラス名" },
          ],
        },
      ],
      arrows: [
        {
          from: "comments.commentable_*",
          to: "posts.id",
          cardinality: "多 — 1",
          label: "type が Post なら posts を指す",
        },
        {
          from: "comments.commentable_*",
          to: "videos.id",
          cardinality: "多 — 1",
          label: "type が Video なら videos を指す(1つのFKで指し分け)",
        },
      ],
    },
    modelCode: [
      {
        caption: "子: Comment(morphTo)",
        code: `class Comment extends Model
{
    // このコメントが「何に」付いているか(Post か Video か…)
    public function commentable()
    {
        return $this->morphTo();
        // commentable_id と commentable_type の2列を使う
    }
}`,
      },
      {
        caption: "親: Post / Video(morphMany)",
        code: `class Post extends Model
{
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}

class Video extends Model
{
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}`,
      },
    ],
    usageCode: [
      {
        caption: "親からコメントをたどる / 子から親をたどる",
        code: `$post = Post::find(1);
foreach ($post->comments as $c) {   // 記事のコメント
    echo $c->body;
}

$comment = Comment::find(5);
$parent = $comment->commentable;    // Post か Video が返る(実行時に決まる)

// 追加も同じ書き方で親の種類を問わない
$video->comments()->create(['body' => '面白い!']);`,
      },
      {
        caption: "多対多版: morphToMany(タグを何にでも付ける)",
        code: `class Post extends Model
{
    // タグを Post にも Video にも付けられる多対多ポリモーフィック
    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}
// 中間テーブル taggables(tag_id, taggable_id, taggable_type)を使う`,
      },
    ],
    example:
      "コメント機能を記事(Post)にも動画(Video)にも付けたいケース。comments テーブルを1つだけ作り、commentable_id と commentable_type の2列で「どの種類の・どのレコードに」付くかを記録します。morphToMany を使えば、タグのような多対多も同じ考え方で複数の親に共有できます。",
  },
];

// ------------------------------------------------------------------
// N+1問題 と Eager Loading(with())の注意
//  ページ末尾で表示する「つまずきポイント」。
// ------------------------------------------------------------------
export interface EagerCode {
  /** 良い/悪いの区別 */
  kind: "bad" | "good";
  /** 見出し */
  caption: string;
  code: string;
  /** 補足説明 */
  note: string;
}

export const nPlusOneNote = {
  title: "N+1問題 と Eager Loading(with())",
  intro:
    "リレーションは便利ですが、うっかり書くと「無駄なSQLが大量に飛ぶ」N+1問題を起こします。リレーションを学んだら必ずセットで覚えたい、最重要の注意点です。",
  what:
    "一覧(N件)をループしながら、各件で関連データを $post->user のように取り出すと、1件ごとに追加のSQLが飛びます。最初の一覧取得1回 + N件ぶんのN回 = 合計 N+1 回のクエリになる、これがN+1問題です。件数が増えるほど遅くなります。",
  fix:
    "あらかじめ with('リレーション名') で関連データをまとめて先読み(Eager Loading)します。Laravelは関連を IN 句でまとめて取得するので、クエリは合計2回(一覧1回 + 関連1回)で済みます。",
  codes: [
    {
      kind: "bad",
      caption: "悪い例: N+1が発生する",
      code: `$posts = Post::all();              // クエリ1回

foreach ($posts as $post) {
    echo $post->user->name;        // 1件ごとに users への追加クエリ!
}
// posts が100件なら 1 + 100 = 101 回のクエリ`,
      note: "ループの中で $post->user を初めて触るたびに、その都度SQLが実行されてしまいます。",
    },
    {
      kind: "good",
      caption: "良い例: with() で先読み",
      code: `$posts = Post::with('user')->get();   // 一覧1回 + users まとめて1回 = 2回

foreach ($posts as $post) {
    echo $post->user->name;           // 追加クエリは飛ばない
}

// 複数・ネストもまとめて指定できる
Post::with(['user', 'comments.user'])->get();`,
      note: "with() で「これから使う関連」を宣言しておくと、Laravelがまとめて取得してくれます。件数が増えてもクエリ回数は一定です。",
    },
  ] as EagerCode[],
  tips: [
    "遅延読み込みでも load('user') で後から先読みできます(取得済みのモデルに関連を足す)。",
    "件数だけ欲しいなら withCount('comments') を使うと $post->comments_count で取れ、これもN+1を防げます。",
    "開発中は Laravel Debugbar や DB::listen でクエリ数を見張ると、N+1に気づきやすくなります。",
  ],
};
