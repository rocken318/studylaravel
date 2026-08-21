import type { Day } from "@/types";

export const day4: Day = {
  day: 4,
  slug: "day4",
  title: "EloquentとリレーションとN+1問題",
  goal: "Eloquentでモデルとテーブルがどう対応し、リレーションをどう扱うかを説明でき、N+1問題がなぜ起きて・どう気づき・どう直すかを、発行SQLの本数の違いを添えて自分の言葉で語れるようになる。",
  lessons: [
    // =================================================================
    // Lesson 1: Eloquentの基本
    // =================================================================
    {
      id: "day4-lesson1",
      slug: "eloquent-basics",
      title: "Eloquentの基本",
      summary: "モデル1つがテーブル1つに対応する。SQLを直接書かずにデータを読み書きする仕組みを理解する。",
      blocks: [
        { type: "heading", text: "EloquentとORMとは" },
        {
          type: "paragraph",
          text: "[[eloquent]] はLaravelに標準搭載された [[orm]](Object-Relational Mapping)です。ORMとは、DBのテーブル(表)とプログラムのオブジェクト(モデル)を対応づけ、SQLを直接書かなくてもデータを読み書きできるようにする仕組みのことです。Eloquentは [[active-record]] というパターンを採用しており、「1つのモデルが1つのテーブルに対応し、そのモデル自身がDB操作の方法を持つ」のが特徴です。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜORMを使うのか",
          text: "生SQLをコードのあちこちに書くと、テーブル構造を変えたときに全SQLを直す羽目になり、記述もばらつきます。ORMを使うと、DB操作を「モデルのメソッド呼び出し」という統一された形で書けるため、可読性が上がり、DBの種類が変わっても書き方を大きく変えずに済みます。設計としては『DBアクセスの共通言語を用意する』ものだと捉えると分かりやすいです。",
        },
        { type: "heading", text: "モデルとテーブルの対応" },
        {
          type: "paragraph",
          text: "Eloquentには「規約(命名のお約束)」があります。モデル名を単数形にし、テーブル名はその複数形にする、というのが基本です。例えば「Post」モデルは「posts」テーブルに、「User」モデルは「users」テーブルに自動で対応します。この規約に従っていれば、対応関係を明示的に書く必要はありません。",
        },
        {
          type: "code",
          language: "php",
          caption: "モデルは驚くほど短い(規約が効いている)",
          code: `namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Post extends Model
{
    // モデル名 Post → テーブル posts に自動対応
    // 主キー id、created_at / updated_at も規約で自動的に扱われる

    // 一括代入を許可する項目(mass-assignment 対策)
    protected $fillable = ['title', 'body'];
}`,
        },
        {
          type: "callout",
          variant: "info",
          text: "テーブルの列そのものは、Eloquentではなく [[migration]](テーブル定義をコードで管理する仕組み)で作ります。Eloquentは「できたテーブルをどう操作するか」を担当します。",
        },
        { type: "heading", text: "CRUD: 作成・取得・更新・削除" },
        {
          type: "paragraph",
          text: "データ操作の基本はCRUD(Create/Read/Update/Delete)です。Eloquentではこれらをモデルのメソッドで直感的に書けます。",
        },
        {
          type: "code",
          language: "php",
          caption: "Eloquentによる基本のCRUD",
          code: `// Create: 作成
$post = Post::create(['title' => '入門', 'body' => '本文']);

// Read: 取得
$all   = Post::all();            // 全件
$one   = Post::find(1);          // 主キーで1件(無ければ null)
$req   = Post::findOrFail(1);    // 無ければ404を投げる
$some  = Post::where('title', '入門')->get(); // 条件で絞る

// Update: 更新
$post->title = '入門(改訂)';
$post->save();

// Delete: 削除
$post->delete();`,
        },
        {
          type: "callout",
          variant: "warn",
          title: "落とし穴",
          text: "「Post::all()」は文字通り全件をメモリに読み込みます。行数が多いテーブルで安易に使うとメモリを圧迫します。実務では必要な件数だけを取る(where や paginate で絞る)意識が大切です。この『DB側で絞る』考え方はLesson5で詳しく扱います。",
        },
        {
          type: "callout",
          variant: "interview",
          text: "「EloquentはLaravelのORMで、アクティブレコード方式でモデルとテーブルを対応させます。私はモデル名の単数形とテーブル名の複数形という規約に沿って書き、SQLを直書きせずCRUDを統一的に表現します。ただしall()で全件取るような書き方は避け、必要な分だけ取る意識を持っています」と説明できます。",
        },
      ],
      questions: [
        {
          id: "day4-lesson1-q1",
          type: "choice",
          question: "EloquentのようなORMを使う主な狙いとして、最も適切なものはどれか。",
          choices: [
            "SQLより必ず高速に動作させるため",
            "テーブルとオブジェクトを対応づけ、DB操作を統一された書き方で表現して可読性・保守性を上げるため",
            "データベースを一切使わずに済ませるため",
            "バリデーションを自動化するため",
          ],
          answerIndex: 1,
          explanation: "ORMの狙いは、テーブルとオブジェクトを対応づけ、DB操作を統一的な書き方で表現することです。可読性・保守性が上がります。必ず高速になるわけではなく(むしろ使い方次第でN+1などの遅さを招く)、DBが不要になるわけでもありません。",
        },
        {
          id: "day4-lesson1-q2",
          type: "free",
          question: "「アクティブレコード」とはどんな考え方か、Eloquentを例に説明せよ。",
          modelAnswer: "アクティブレコードは、1つのモデルクラスが1つのテーブルに対応し、そのモデル自身がDBへの読み書きの方法(save・delete・findなど)を持っている設計パターンです。Eloquentはこの方式を採用しており、例えばPostモデルはpostsテーブルに対応し、$post->save()のようにモデル経由でDB操作ができます。テーブルの1行がオブジェクト1つに対応するイメージなので、直感的に書けるのが利点です。",
          interviewPhrase: "Eloquentはアクティブレコード方式で、モデル1つがテーブル1つに対応し、モデル自身がsaveやfindといったDB操作を持つので、直感的にデータを扱えます。",
          keywords: ["アクティブレコード", "モデルとテーブルの対応", "ORM", "save", "1行=1オブジェクト"],
        },
      ],
    },

    // =================================================================
    // Lesson 2: リレーション
    // =================================================================
    {
      id: "day4-lesson2",
      slug: "relationships",
      title: "リレーション",
      summary: "テーブル同士のつながり(1対多・多対多など)をモデルのメソッドとして表現する。",
      blocks: [
        { type: "heading", text: "リレーションとは" },
        {
          type: "paragraph",
          text: "現実のデータは互いに関係しています。「1人のユーザーが複数の投稿を持つ」「1つの投稿は1人のユーザーに属する」といったつながりが [[relationship]] です。Eloquentでは、このつながりをモデルのメソッドとして定義します。定義しておくと、外部キーを意識せずに「$user->posts」のようにたどれるようになります。",
        },
        {
          type: "list",
          items: [
            "hasMany(1対多): 1人のユーザーが複数の投稿を持つ(User → posts)。",
            "belongsTo(多対1): 1つの投稿は1人のユーザーに属する(Post → user)。",
            "belongsToMany(多対多): 投稿は複数のタグを持ち、タグも複数の投稿に付く(中間テーブルを使う)。",
            "hasOne(1対1): 1人のユーザーが1つのプロフィールを持つ、など。",
          ],
        },
        {
          type: "code",
          language: "php",
          caption: "1対多と多対1(逆向き)を両モデルに定義する",
          code: `class User extends Model
{
    // 1人のユーザーは複数の投稿を持つ
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}

class Post extends Model
{
    // 1つの投稿は1人のユーザーに属する(hasMany の逆向き)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}`,
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ外部キーを直接触らずリレーションを定義するのか",
          text: "「user_id が一致する行を探す」ようなSQLを都度書くと、結合条件があちこちに散らばり、修正時に漏れます。リレーションとして1か所に定義しておけば、以降は「$user->posts」「$post->user」と意味の分かる形でたどれ、結合の詳細を意識せずに済みます。関係性の定義を一箇所に集約する、という保守性の設計です。",
        },
        {
          type: "code",
          language: "php",
          caption: "定義したリレーションを使う",
          code: `$user = User::find(1);

// メソッドをプロパティのように呼ぶと、関連データを取得できる
foreach ($user->posts as $post) {
    echo $post->title;
}

// 逆向きもたどれる
$post = Post::find(10);
echo $post->user->name;`,
        },
        {
          type: "code",
          language: "php",
          caption: "多対多(belongsToMany)は中間テーブルを介する",
          code: `class Post extends Model
{
    // 投稿は複数のタグを持ち、タグも複数の投稿に付く
    public function tags()
    {
        // post_tag という中間テーブルを介して結びつく
        return $this->belongsToMany(Tag::class);
    }
}`,
        },
        {
          type: "callout",
          variant: "warn",
          title: "落とし穴(次のレッスンへの布石)",
          text: "「$user->posts」のように後からリレーションにアクセスすると、その瞬間に追加のSQLが1本発行されます(遅延ロード)。これ自体は正しい挙動ですが、ループの中で毎回アクセスすると、SQLが件数分だけ増えてしまう——これが次に学ぶ [[n-plus-one]] 問題です。",
        },
        {
          type: "callout",
          variant: "interview",
          text: "「リレーションは、テーブル同士のつながりをモデルのメソッドとして定義する仕組みです。hasMany・belongsTo・belongsToManyで1対多・多対1・多対多を表し、以降は $user->posts のように意味の分かる形でたどれます。結合条件を1か所に集約できるので保守性が上がります」と説明できます。",
        },
      ],
      questions: [
        {
          id: "day4-lesson2-q1",
          type: "choice",
          question: "「1人のユーザーが複数の投稿を持ち、1つの投稿は1人のユーザーに属する」関係を表す組み合わせはどれか。",
          choices: [
            "User に belongsTo、Post に hasMany",
            "User に hasMany、Post に belongsTo",
            "両方に belongsToMany",
            "両方に hasOne",
          ],
          answerIndex: 1,
          explanation: "「1人が複数を持つ」側(User)がhasMany、「1つが1人に属する」側(Post)がbelongsToです。多対1(belongsTo)は1対多(hasMany)の逆向きの定義になります。",
        },
        {
          id: "day4-lesson2-q2",
          type: "free",
          question: "外部キーで都度JOINを書くのではなく、Eloquentのリレーションとして定義しておく利点を説明せよ。",
          modelAnswer: "テーブル同士のつながりをリレーションとして1か所に定義しておくと、以降は$user->postsや$post->userのように意味の分かる形で関連データをたどれます。結合条件(どのカラムで結ぶか)をあちこちのSQLに散らばせずに済むので、テーブル構造が変わっても修正箇所が集約され、保守しやすくなります。コードの意図も読み取りやすくなります。ただし遅延ロードのままループ内でアクセスするとN+1問題を招く点には注意が必要です。",
          interviewPhrase: "リレーションを定義しておくと結合条件を一箇所に集約でき、$user->postsのように意味の分かる形でたどれて保守性が上がるので、私は外部キーを都度JOINせずリレーションを定義します。",
          keywords: ["relationship", "hasMany", "belongsTo", "結合条件を集約", "保守性"],
        },
      ],
    },

    // =================================================================
    // Lesson 3: N+1問題
    // =================================================================
    {
      id: "day4-lesson3",
      slug: "n-plus-one",
      title: "N+1問題",
      summary: "リレーションを持つデータをループで扱うと、SQLが件数分だけ増える定番の性能問題。",
      blocks: [
        { type: "heading", text: "N+1問題とは" },
        {
          type: "paragraph",
          text: "[[n-plus-one]] 問題とは、一覧を取る1本のSQLに加えて、各行の関連データを取るために追加のSQLが件数分(N本)発行されてしまい、合計で「1 + N本」のクエリが走ってしまう性能問題です。Laravelに限らずORM全般で起きる、最も有名な落とし穴のひとつです。",
        },
        { type: "heading", text: "なぜ起きるのか" },
        {
          type: "paragraph",
          text: "原因は「遅延ロード」です。リレーションは、実際にアクセスされた瞬間に初めてSQLを発行します。投稿一覧を取り、ループの中で毎回「$post->user->name」のように著者にアクセスすると、投稿の件数だけ著者取得のSQLが繰り返されてしまいます。",
        },
        {
          type: "compare",
          bad: {
            label: "悪い例(N+1が発生する)",
            text: "投稿100件なら、一覧1本 + 著者取得100本 = 合計101本のSQLが発行される。",
            language: "php",
            code: `// 投稿を全件取得(SQLは1本)
$posts = Post::all();

foreach ($posts as $post) {
    // ループの中で著者にアクセス → 1件ごとにSQLが1本発行される!
    echo $post->user->name;
}
// 投稿100件なら 1 + 100 = 101本のクエリ`,
          },
          good: {
            label: "良い例(Eager Loadingで解決)",
            text: "with で著者を事前にまとめて取得。一覧1本 + 著者一括1本 = 合計2本で済む。",
            language: "php",
            code: `// with('user') で著者を事前にまとめて読み込む([[eager-loading]])
$posts = Post::with('user')->get();

foreach ($posts as $post) {
    // すでに読み込み済みなので、ここでは追加のSQLは出ない
    echo $post->user->name;
}
// 投稿が何件でも 1 + 1 = 2本のクエリで済む`,
          },
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ致命的になりやすいのか",
          text: "件数が少ないうちは動いてしまうため、開発中は気づきにくいのがN+1の怖さです。本番でデータが増えると、101本・1001本とクエリが膨れ、ページ表示が急に遅くなります。1本1本は速くても、DBへの往復回数そのものが増えるのがボトルネックです。『動くけど遅い』の典型で、レビューや設計段階で潰すべき問題です。",
        },
        {
          type: "code",
          language: "sql",
          caption: "実際に発行されるSQL(悪い例のイメージ)",
          code: `-- 最初の1本: 一覧
SELECT * FROM posts;

-- 続く N 本: 行ごとに繰り返される
SELECT * FROM users WHERE id = 1;
SELECT * FROM users WHERE id = 2;
SELECT * FROM users WHERE id = 3;
-- … 投稿の件数だけ延々と続く …`,
        },
        {
          type: "code",
          language: "sql",
          caption: "Eager Loading後のSQL(良い例のイメージ)",
          code: `-- 1本目: 一覧
SELECT * FROM posts;

-- 2本目: 必要な著者を IN でまとめて1回だけ取得
SELECT * FROM users WHERE id IN (1, 2, 3, 4, 5);`,
        },
        { type: "heading", text: "どう気づくか" },
        {
          type: "paragraph",
          text: "N+1は「発行されているSQLの本数」を見れば一発で分かります。以下のような方法で、1画面あたり何本のクエリが走っているかを可視化します。",
        },
        {
          type: "list",
          items: [
            "Laravel Debugbar: 画面下部に、そのページで発行されたクエリ本数と内容を表示してくれる。同じSQLが大量に並んでいたらN+1のサイン。",
            "Laravel Telescope: 開発用の監視ツールで、リクエストごとのクエリを一覧・件数で確認できる。",
            "DB::listen やクエリログ: 発行SQLをログに出して数える。",
            "Model::preventLazyLoading(): 遅延ロードが起きたら例外を投げさせ、開発中にN+1を強制的に検知する。",
          ],
        },
        {
          type: "callout",
          variant: "info",
          text: "コツは「同じ形のSELECTが件数分だけ並んでいないか」を見ることです。WHERE id = ? の値だけ違うSQLが延々と続いていたら、ほぼN+1だと判断できます。",
        },
        {
          type: "callout",
          variant: "interview",
          text: "「N+1問題は、一覧の1本に加えて各行の関連取得でN本のSQLが出て、合計1+N本になる性能問題です。遅延ロードのままループ内でリレーションにアクセスすると起きます。私はDebugbarやTelescopeで発行クエリ本数を確認して気づき、withによるEager Loadingで1+1本に抑えて解決します」と、原因・気づき方・解決までワンセットで話せると強いです。",
        },
      ],
      questions: [
        {
          id: "day4-lesson3-q1",
          type: "choice",
          question: "N+1問題が起きる直接の原因として、最も適切なものはどれか。",
          choices: [
            "テーブルにインデックスが張られていないこと",
            "遅延ロードのまま、ループの中で行ごとにリレーションへアクセスし、関連取得のSQLが件数分発行されること",
            "SQLが1本にまとまりすぎていること",
            "モデルとテーブルの命名規約が違うこと",
          ],
          answerIndex: 1,
          explanation: "N+1は、遅延ロードによって「ループの各行で関連データを取るSQL」が件数分(N本)発行され、一覧の1本と合わせて1+N本になる問題です。インデックスや命名規約とは別の話です。",
        },
        {
          id: "day4-lesson3-q2",
          type: "choice",
          question: "投稿100件それぞれの著者名を、遅延ロードのまま表示した。発行されるクエリ本数に最も近いものはどれか。",
          choices: ["1本", "2本", "約101本", "10000本"],
          answerIndex: 2,
          explanation: "一覧取得の1本に加え、100件それぞれで著者取得のSQLが1本ずつ発行されるため、1 + 100 = 約101本になります。これがN+1です。withで事前ロードすれば2本に抑えられます。",
        },
        {
          id: "day4-lesson3-q3",
          type: "free",
          question: "N+1問題とは何か、なぜ起きるか、どうやって気づくかを、先輩エンジニアに説明するつもりで述べよ。",
          modelAnswer: "N+1問題は、一覧を取る1本のSQLに加えて、各行の関連データを取るためのSQLが件数分(N本)発行され、合計で1+N本のクエリが走ってしまう性能問題です。原因は遅延ロードで、リレーションはアクセスされた瞬間にSQLを発行するため、ループの中で$post->user->nameのように毎回関連にアクセスすると件数分だけSQLが繰り返されます。件数が少ないうちは動くので気づきにくいのが怖いところです。気づき方としては、Laravel DebugbarやTelescopeで1画面あたりの発行クエリ本数を見て、WHERE id = ? の値だけ違う同じ形のSQLが大量に並んでいたらN+1と判断します。preventLazyLoadingで開発中に強制検知する方法もあります。解決はwithによるEager Loadingで、関連をまとめて事前取得し1+1本に抑えます。",
          interviewPhrase: "N+1は一覧1本に加えて各行の関連取得でN本のSQLが出て合計1+N本になる問題で、遅延ロードが原因です。私はDebugbarやTelescopeで発行クエリ本数を見て気づき、withで事前ロードして解決します。",
          keywords: ["n-plus-one", "1+N本", "遅延ロード", "Debugbar", "Telescope", "with", "eager loading"],
        },
      ],
    },

    // =================================================================
    // Lesson 4: Eager Loading
    // =================================================================
    {
      id: "day4-lesson4",
      slug: "eager-loading",
      title: "Eager Loading(事前ロード)",
      summary: "with で関連データをまとめて先読みし、N+1を根本から解決する。遅延ロードとの違いを押さえる。",
      blocks: [
        { type: "heading", text: "遅延ロードと事前ロードの違い" },
        {
          type: "paragraph",
          text: "リレーションの読み込み方には2種類あります。「遅延ロード(Lazy Loading)」はアクセスされた瞬間に都度SQLを出す方式、「[[eager-loading]](事前ロード)」は必要な関連を最初にまとめて読み込んでおく方式です。N+1を防ぐには、後者を意識的に選びます。",
        },
        {
          type: "compare",
          bad: {
            label: "遅延ロード(既定・N+1の温床)",
            text: "アクセス時に都度SQL。ループで回すと件数分に増える。",
            language: "php",
            code: `$posts = Post::all();            // 著者は読み込まれていない
foreach ($posts as $post) {
    echo $post->user->name;      // ここで初めて、1件ずつSQLが飛ぶ
}`,
          },
          good: {
            label: "事前ロード(with で先読み)",
            text: "必要な関連を最初にまとめて取得。ループ内では追加SQLが出ない。",
            language: "php",
            code: `$posts = Post::with('user')->get(); // 著者もまとめて先読み
foreach ($posts as $post) {
    echo $post->user->name;         // 追加SQLなし
}`,
          },
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ事前ロードで速くなるのか",
          text: "事前ロードは「必要な著者IDをまとめて、WHERE id IN (...) の1本で取得する」からです。DBへの往復回数が『件数分』から『1回』に減るのが本質です。1本ごとのSQLが速くても、往復の回数が多いこと自体が遅さの原因なので、回数を減らすことが効きます。",
        },
        { type: "heading", text: "ネストした関連や複数関連の先読み" },
        {
          type: "code",
          language: "php",
          caption: "複数・ネスト・条件つきの先読み",
          code: `// 複数の関連を同時に先読み
$posts = Post::with(['user', 'tags'])->get();

// ネスト: 投稿の著者の、さらにプロフィールまで先読み
$posts = Post::with('user.profile')->get();

// 先読みする関連にも条件を付けられる
$posts = Post::with(['comments' => function ($query) {
    $query->where('approved', true);
}])->get();`,
        },
        { type: "heading", text: "withCount: 件数だけ欲しいとき" },
        {
          type: "paragraph",
          text: "「各投稿のコメント本文は要らないが、コメント件数だけ表示したい」という場面はよくあります。関連そのものを全部読み込むと無駄なので、件数だけを効率的に取る「withCount」を使います。",
        },
        {
          type: "code",
          language: "php",
          caption: "withCount で件数を効率的に取得する",
          code: `// 各投稿の「コメント件数」を1回のクエリでまとめて取得
$posts = Post::withCount('comments')->get();

foreach ($posts as $post) {
    // comments_count というプロパティが自動で用意される
    echo $post->comments_count;
}
// コメント本文を全件読み込まずに、件数だけ取れる`,
        },
        {
          type: "callout",
          variant: "warn",
          title: "落とし穴: 何でもwithすればいいわけではない",
          text: "使わない関連まで先読みすると、逆に無駄なデータをメモリに載せてしまいます。事前ロードは「そのページで実際に使う関連だけ」を対象にするのが原則です。件数しか要らないならwithCount、本文も要るならwith、と目的で使い分けます。N+1を恐れて過剰にwithするのも別の無駄を生みます。",
        },
        {
          type: "callout",
          variant: "interview",
          text: "「N+1はwithによるEager Loadingで解決します。関連をWHERE IN でまとめて1本にすることで、DBへの往復回数を件数分から1回に減らせます。件数だけ欲しい場面ではwithCountを使い、本文を読み込まずに済ませます。使う関連だけを先読みする、という点も意識しています」と説明できます。",
        },
      ],
      questions: [
        {
          id: "day4-lesson4-q1",
          type: "choice",
          question: "with('user') による事前ロードが速い理由として、最も適切なものはどれか。",
          choices: [
            "SQLを一切発行しなくなるから",
            "必要な関連を WHERE id IN (...) でまとめて取得し、DBへの往復回数を件数分から1回に減らせるから",
            "テーブルを自動的にキャッシュに置き換えるから",
            "遅延ロードよりインデックスが増えるから",
          ],
          answerIndex: 1,
          explanation: "事前ロードは、必要なIDをまとめてWHERE id IN (...)の1本で取得します。DBへの往復回数が件数分から1回に減るのが速さの本質です。SQLがゼロになるわけではありません。",
        },
        {
          id: "day4-lesson4-q2",
          type: "choice",
          question: "各投稿の「コメント件数」だけを効率よく表示したい。最も適切な方法はどれか。",
          choices: [
            "with('comments') で全コメントを読み込み、ループ内で count() する",
            "withCount('comments') を使い、comments_count を参照する",
            "ループ内で $post->comments()->count() を毎回呼ぶ",
            "Post::all() してPHP側で数える",
          ],
          answerIndex: 1,
          explanation: "件数だけ欲しいならwithCountが最適です。コメント本文を読み込まずに件数だけをまとめて取得できます。with('comments')は本文まで読むため無駄が多く、ループ内でcount()を毎回呼ぶのはN+1を招きます。",
        },
        {
          id: "day4-lesson4-q3",
          type: "free",
          question: "遅延ロード(Lazy Loading)と事前ロード(Eager Loading)の違いを、N+1との関係を含めて説明せよ。",
          modelAnswer: "遅延ロードは、リレーションにアクセスされた瞬間に初めてSQLを発行する方式です。手軽ですが、ループの中で行ごとに関連へアクセスすると件数分のSQLが飛び、N+1問題を起こします。事前ロードは、withを使って必要な関連を最初にまとめて読み込んでおく方式で、著者などをWHERE id IN (...)の1本でまとめて取得します。これによりDBへの往復回数が件数分から1回に減り、1+N本だったクエリが1+1本に抑えられます。ただし使わない関連まで先読みするのは無駄なので、そのページで実際に使う関連だけを対象にします。",
          interviewPhrase: "遅延ロードはアクセス時に都度SQLを出すのでループでN+1を招きますが、withによる事前ロードなら関連をまとめて1本で取れるので、私は一覧で関連を使う場面では意識的にEager Loadingを選びます。",
          keywords: ["遅延ロード", "eager loading", "with", "WHERE IN", "往復回数", "N+1", "1+1本"],
        },
      ],
    },

    // =================================================================
    // Lesson 5: クエリビルダとコレクションの違い
    // =================================================================
    {
      id: "day4-lesson5",
      slug: "query-vs-collection",
      title: "クエリビルダとコレクションの違い",
      summary: "絞り込みをDB側でやるか、PHP側でやるか。性能の基礎となる「どこで絞るか」の意識を持つ。",
      blocks: [
        { type: "heading", text: "クエリビルダとコレクション" },
        {
          type: "paragraph",
          text: "Eloquentには、似ているようで働く場所が違う2つの世界があります。「クエリビルダ」は、まだDBに投げる前のSQLを組み立てる段階で、whereやorderByはここでSQLの条件になります。一方「コレクション」は、getなどでDBから取り出した後のデータ(PHPのメモリ上の配列のようなもの)で、そこでのfilterやsortはPHP側の処理になります。",
        },
        {
          type: "callout",
          variant: "info",
          text: "見分け方の目安: getやall、findで結果を取り出す前がクエリビルダ(SQLになる)、取り出した後がコレクション(PHPで処理される)です。",
        },
        { type: "heading", text: "どこで絞るかで性能が変わる" },
        {
          type: "paragraph",
          text: "同じ「公開済みの投稿だけ欲しい」でも、DB側で絞るかPHP側で絞るかで負荷が大きく変わります。全件をPHPに読み込んでから絞ると、DBもメモリも無駄に使います。",
        },
        {
          type: "compare",
          bad: {
            label: "悪い例(全件取ってからPHPで絞る)",
            text: "全件をメモリに載せてからfilter。DB転送量もメモリも無駄。",
            language: "php",
            code: `// 全投稿をDBから取り出す(公開・非公開すべて)
$posts = Post::all();

// PHP側(コレクション)で絞り込む
$published = $posts->filter(function ($post) {
    return $post->is_published;
});
// 100万件あれば100万件を読み込んでから捨てることになる`,
          },
          good: {
            label: "良い例(DB側で絞ってから取り出す)",
            text: "whereで条件をSQLに乗せ、必要な行だけDBから受け取る。",
            language: "php",
            code: `// DB側(クエリビルダ)で絞ってから取り出す
$published = Post::where('is_published', true)->get();

// 必要な行だけがメモリに載る。転送量も少ない`,
          },
        },
        {
          type: "code",
          language: "sql",
          caption: "良い例で発行されるSQL(DBが絞ってくれる)",
          code: `-- 条件が WHERE に乗るので、DBが必要な行だけ返す
SELECT * FROM posts WHERE is_published = 1;`,
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ「DB側で絞る」のが基本なのか",
          text: "DBは大量データの絞り込み・並べ替えに最適化された専用エンジンで、インデックスも使えます。PHP側で絞ると、まず全件をネットワーク経由で受け取り、メモリに載せ、そこから捨てる、という無駄が発生します。『絞り込みや集計はできるだけDBに任せ、PHPには必要な分だけ持ってくる』——これが性能設計の基礎です。",
        },
        { type: "heading", text: "件数の多いテーブルへの向き合い方" },
        {
          type: "list",
          items: [
            "一覧はpaginateでページ分割し、一度に全件を読まない。",
            "絞り込み条件(where)・並べ替え(orderBy)はできるだけクエリビルダ側=SQLに寄せる。",
            "件数だけ欲しいならcount()、存在確認だけならexists()を使い、全件取得を避ける。",
            "集計(合計・平均)もsum()やavg()でDB側に任せる。",
            "大量データを1件ずつ処理するときはchunkやcursorでメモリを守る。",
          ],
        },
        {
          type: "callout",
          variant: "warn",
          title: "落とし穴",
          text: "コレクションのメソッド(filter・sort・whereなど)は便利ですが、それはすでにメモリに載ったデータへの操作です。「Post::all()->where(...)」のように書くと、先に全件を取ってしまうので、DBで絞る「Post::where(...)->get()」とは負荷が全く違います。メソッド名が似ているぶん取り違えやすいので注意しましょう。",
        },
        {
          type: "callout",
          variant: "interview",
          text: "「クエリビルダはSQLになる前、コレクションは取り出した後のPHP上のデータで、絞り込みをどちらでやるかで性能が変わります。私は絞り込み・並べ替え・集計はできるだけwhereやcount、sumでDB側に寄せ、PHPには必要な分だけ持ってくる方針です。一覧はpaginateで全件取得を避けます」と言えると、性能を意識していると伝わります。",
        },
      ],
      questions: [
        {
          id: "day4-lesson5-q1",
          type: "choice",
          question: "「Post::all()->filter(...)」と「Post::where(...)->get()」の違いとして、最も適切なものはどれか。",
          choices: [
            "どちらも同じで、性能に差はない",
            "前者は全件をPHPに読み込んでから絞る(コレクション操作)、後者はDB側で絞ってから取り出す(クエリビルダ操作)ので、後者の方が無駄が少ない",
            "前者の方がインデックスを使えるので速い",
            "後者はSQLを発行しない",
          ],
          answerIndex: 1,
          explanation: "all()->filter()は全件を取り出してからPHP側(コレクション)で絞るため、DB転送量もメモリも無駄になります。where()->get()はDB側(クエリビルダ)で絞るので、必要な行だけを受け取れて効率的です。",
        },
        {
          id: "day4-lesson5-q2",
          type: "free",
          question: "「絞り込みはできるだけDB側でやるべき」と言われる理由を説明せよ。",
          modelAnswer: "DBは大量データの絞り込みや並べ替えに特化した専用エンジンで、インデックスも活用できます。whereなどでDB側に条件を渡せば、必要な行だけをネットワーク越しに受け取れます。逆に全件を取ってからPHPのコレクションで絞ると、不要な行までネットワーク経由で運んでメモリに載せ、そこから捨てることになり、転送量もメモリも無駄になります。だから絞り込み・並べ替え・集計はできるだけクエリビルダ側=SQLに寄せ、PHPには必要な分だけ持ってくるのが性能設計の基本です。件数だけならcount()、集計はsum()などもDBに任せます。",
          interviewPhrase: "DBは絞り込みに特化していてインデックスも使えるので、私はwhereやcount、sumで条件や集計をDB側に寄せ、PHPには必要な分だけ持ってくるようにしています。",
          keywords: ["DB側で絞る", "クエリビルダ", "コレクション", "インデックス", "転送量", "paginate"],
        },
      ],
    },
  ],
};
