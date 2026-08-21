import type { Day } from "@/types";

export const day3: Day = {
  day: 3,
  slug: "day3",
  title: "ルーティングとコントローラー、ルートモデルバインディング",
  goal: "リクエストがどのURLからどのコントローラのメソッドに届くかを説明でき、RESTfulなルート設計・薄いコントローラ・ルートモデルバインディングの狙いを、自分の言葉で語れるようになる。",
  lessons: [
    // =================================================================
    // Lesson 1: ルーティングの基本
    // =================================================================
    {
      id: "day3-lesson1",
      slug: "routing",
      title: "ルーティングの基本",
      summary: "URLとHTTPメソッドの組み合わせを、どの処理に結びつけるかを定義する仕組みを理解する。",
      blocks: [
        { type: "heading", text: "ルーティングとは何か" },
        {
          type: "paragraph",
          text: "ルーティングとは「どのURLに、どのHTTPメソッドでアクセスが来たら、どの処理を動かすか」を対応づける表のことです。ブラウザやアプリから届いたリクエストは、まずこのルーティング定義を見て「行き先」を決められます。[[request-lifecycle]] の入口にあたる、アプリの交通整理役だと考えてください。",
        },
        {
          type: "paragraph",
          text: "Laravelでは、ルート定義は「routes」ディレクトリに置かれた設定ファイルにまとめて書きます。画面(HTML)を返す普通のWebアクセス向けは「web.php」、JSONを返すAPI向けは「api.php」と、用途でファイルが分かれているのが特徴です。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜweb.phpとapi.phpを分けるのか",
          text: "同じアプリでも、ブラウザ向けの画面表示とスマホアプリ向けのAPIでは、必要な下ごしらえ(前処理)が違います。web.phpにはセッションやCSRF対策などブラウザ向けの [[middleware]] が、api.phpにはトークン認証やレート制限などAPI向けの前処理が、それぞれ自動で適用されます。ファイルを分けることで「この経路には何が効いているか」が一目で分かり、設定ミスを防げます。",
        },
        { type: "heading", text: "HTTPメソッドとルート定義" },
        {
          type: "paragraph",
          text: "同じURLでも、HTTPメソッド(GET・POST・PUT・PATCH・DELETE)が違えば意味が変わります。GETは「取得(見るだけ)」、POSTは「新規作成」、PUT/PATCHは「更新」、DELETEは「削除」というように、メソッドが操作の種類を表します。ルートはこの「URL × メソッド」の組で登録します。",
        },
        {
          type: "code",
          language: "php",
          caption: "routes/web.php — メソッドごとにルートを登録する",
          code: `use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\PostController;

// GET /posts        → 一覧を表示
Route::get('/posts', [PostController::class, 'index']);

// GET /posts/create → 新規作成フォームを表示
Route::get('/posts/create', [PostController::class, 'create']);

// POST /posts       → 送信された内容を保存
Route::post('/posts', [PostController::class, 'store']);`,
        },
        {
          type: "callout",
          variant: "info",
          text: "「Route::get('/posts', [PostController::class, 'index'])」は、「GETで /posts に来たら、PostControllerのindexメソッドを動かす」という意味です。第2引数の「[クラス, 'メソッド名']」が行き先の指定です。",
        },
        { type: "heading", text: "名前付きルート" },
        {
          type: "paragraph",
          text: "ルートには「名前」を付けられます。URLの文字列そのものではなく、この名前を使ってリンクやリダイレクト先を組み立てられます。こうしておくと、あとでURLの綴りを変えても、名前さえ同じなら参照側を直さずに済みます。",
        },
        {
          type: "code",
          language: "php",
          caption: "名前付きルートと、その参照",
          code: `Route::get('/posts/{post}', [PostController::class, 'show'])
    ->name('posts.show');

// 別の場所ではURL文字列ではなく「名前」で参照する
$url = route('posts.show', ['post' => 10]); // => /posts/10`,
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜURLを直書きせず名前で参照するのか",
          text: "URLの文字列をコードのあちこちに直書きすると、URL構成を変えたいときに全箇所を探して直す羽目になります。名前付きルートなら、URLの定義は1か所、参照は名前経由になるので、変更に強い(修正漏れが起きにくい)設計になります。「一箇所を直せば全体に反映される」状態を保つのが狙いです。",
        },
        { type: "heading", text: "RESTfulリソースルート" },
        {
          type: "paragraph",
          text: "投稿・ユーザー・商品のような「リソース(資源)」に対する操作は、だいたい決まったパターン(一覧・詳細・作成フォーム・保存・編集フォーム・更新・削除)になります。Laravelはこの定番7アクションを1行でまとめて登録できる「リソースルート」を用意しています。",
        },
        {
          type: "code",
          language: "php",
          caption: "1行で7つの定番ルートをまとめて定義する",
          code: `// これ1行で index / create / store / show / edit / update / destroy が登録される
Route::resource('posts', PostController::class);

// 確認: どんなルートが生えたかはコマンドで一覧できる
// $ php artisan route:list`,
        },
        {
          type: "callout",
          variant: "warn",
          title: "落とし穴",
          text: "リソースルートは便利ですが、無関係なアクションまで全部作られると「使われないルート」が残りがちです。必要なものだけに絞りたいときは「Route::resource(...)->only(['index','show'])」のように限定しましょう。",
        },
        {
          type: "callout",
          variant: "interview",
          text: "「ルーティングは、URLとHTTPメソッドの組み合わせを処理に対応づける層です。私はRESTの考え方に沿って、リソースに対する操作を『GET=取得・POST=作成・PUT/PATCH=更新・DELETE=削除』と揃え、リソースルートで定番7アクションを一貫した命名で定義します。URLはコードに直書きせず名前付きルートで参照し、URL変更に強い構成を心がけています」と説明できます。",
        },
      ],
      questions: [
        {
          id: "day3-lesson1-q1",
          type: "choice",
          question: "web.php と api.php を分けている主な理由として、最も適切なものはどれか。",
          choices: [
            "1ファイルにまとめると行数が多くなり、動作が遅くなるから",
            "ブラウザ向けとAPI向けで自動的に適用される前処理(ミドルウェア)が違い、経路ごとの前提を明確にできるから",
            "web.phpはPHP、api.phpは別言語で書く必要があるから",
            "api.phpに書かないとJSONを一切返せないから",
          ],
          answerIndex: 1,
          explanation: "web.phpにはセッションやCSRF対策など、api.phpにはトークン認証やレート制限など、用途に応じたミドルウェアがそれぞれ自動適用されます。ファイルを分けることで「この経路に何が効いているか」が明確になります。速度や別言語が理由ではありません。",
        },
        {
          id: "day3-lesson1-q2",
          type: "choice",
          question: "名前付きルートを使う利点として最も適切なものはどれか。",
          choices: [
            "ルートの処理速度が上がる",
            "URLの綴りを変えても、名前で参照している箇所を直さずに済む",
            "同じURLに複数のメソッドを割り当てられる",
            "コントローラを書かなくてよくなる",
          ],
          answerIndex: 1,
          explanation: "名前付きルートの狙いは、URL文字列の直書きを避け、URL構成の変更に強くすることです。URLの定義を1か所に集約し、参照は名前経由にすることで、修正漏れを防げます。",
        },
        {
          id: "day3-lesson1-q3",
          type: "free",
          question: "RESTfulなリソースルートを使うと、どんな利点があるか。先輩エンジニアに説明するつもりで述べよ。",
          modelAnswer: "リソース(投稿やユーザーなど)に対する操作は、一覧・詳細・作成・保存・編集・更新・削除という定番パターンになりがちです。リソースルートを使うと、この7アクションを一貫した命名規則で一度に定義でき、URL設計とメソッドの対応が全員にとって予測可能になります。結果としてコードの見通しがよくなり、チームで共通認識を持ちやすくなります。不要なアクションはonlyやexceptで絞ることもできます。",
          interviewPhrase: "リソースに対する操作はパターンが決まっているので、私はリソースルートで定番アクションを一貫した命名で定義し、URLとHTTPメソッドの対応を予測可能に保つようにしています。",
          keywords: ["REST", "7アクション", "一貫した命名", "予測可能", "リソース"],
        },
      ],
    },

    // =================================================================
    // Lesson 2: コントローラの責務
    // =================================================================
    {
      id: "day3-lesson2",
      slug: "controller",
      title: "コントローラの責務と、薄く保つ考え方",
      summary: "コントローラは「受け取って・振り分けて・返す」係。ビジネスロジックを溜め込まない設計を理解する。",
      blocks: [
        { type: "heading", text: "コントローラの役割" },
        {
          type: "paragraph",
          text: "コントローラは、ルーティングが決めた行き先です。役割はシンプルで、「リクエストを受け取り」「必要な処理を適切な担当に振り分け」「結果を画面やJSONとして返す」という交通整理です。自分自身が計算や複雑な判断を全部抱え込む場所ではありません。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜコントローラは薄くあるべきか(単一責任)",
          text: "1つのクラスに「入力の受け取り」「業務ルールの計算」「DB操作」「表示の組み立て」を全部詰め込むと、修正のたびに巨大なメソッドを読み解く必要が出て、テストも難しくなります。これが [[fat-controller]] というアンチパターンです。責務を1つに絞る(単一責任の原則)ことで、変更の影響範囲が小さくなり、読みやすく・テストしやすくなります。",
        },
        { type: "heading", text: "リソースコントローラ" },
        {
          type: "paragraph",
          text: "Day3のレッスン1で見たリソースルートに対応するのが「リソースコントローラ」です。index・create・store・show・edit・update・destroy という定番メソッドを持つコントローラを、コマンド1つで雛形生成できます。命名が揃うので、どのメソッドが何をするか誰でも予測できます。",
        },
        {
          type: "code",
          language: "php",
          caption: "リソースコントローラの雛形(定番メソッドが揃う)",
          code: `// $ php artisan make:controller PostController --resource

class PostController extends Controller
{
    public function index() { /* 一覧を返す */ }
    public function create() { /* 作成フォームを返す */ }
    public function store(Request $request) { /* 保存する */ }
    public function show(Post $post) { /* 詳細を返す */ }
    public function edit(Post $post) { /* 編集フォームを返す */ }
    public function update(Request $request, Post $post) { /* 更新する */ }
    public function destroy(Post $post) { /* 削除する */ }
}`,
        },
        { type: "heading", text: "薄いコントローラ vs 太ったコントローラ" },
        {
          type: "paragraph",
          text: "同じ「投稿を保存する」処理でも、書き方で保守性が大きく変わります。業務ロジックをコントローラに直書きしたものと、処理を別の担当(サービス層など)に委ねたものを比べてみましょう。",
        },
        {
          type: "compare",
          bad: {
            label: "太ったコントローラ(アンチパターン)",
            text: "業務ルールや外部連携までコントローラのメソッドに詰め込むと、肥大化してテストできない。",
            language: "php",
            code: `public function store(Request $request)
{
    // バリデーションも、業務ルールも、DB保存も、通知も全部ここに…
    $data = $request->all();
    if (mb_strlen($data['title']) > 100) { /* 独自チェック */ }
    $slug = mb_strtolower(str_replace(' ', '-', $data['title']));
    $post = new Post();
    $post->title = $data['title'];
    $post->slug = $slug;
    $post->save();
    // メール送信やSlack通知までここに直書き…
    Mail::to($post->user)->send(new PostCreated($post));
    return redirect('/posts');
}`,
          },
          good: {
            label: "薄いコントローラ(推奨)",
            text: "コントローラは受け取って委ねて返すだけ。業務ロジックはサービス層に置く。",
            language: "php",
            code: `public function store(StorePostRequest $request, PostService $service)
{
    // 入力チェックはフォームリクエストへ、業務ロジックはサービス層へ委譲
    $post = $service->create($request->validated());

    return redirect()->route('posts.show', $post);
}`,
          },
        },
        {
          type: "callout",
          variant: "info",
          text: "上の良い例では、業務ロジックを [[service-layer]] に、入力チェックをフォームリクエストに切り出しています。コントローラは「入力を受け取り、担当に委ね、結果を返す」だけの薄い層になっています。なお、引数に書いた PostService は、自分で new しなくてもLaravelのコンテナ(依存解決の仕組み)が自動で用意して渡してくれます。生成コストが高いものや状態を共有したいものは、コンテナに [[singleton]](シングルトン)として登録し、アプリ内で常に同一インスタンスを使い回すこともできます。",
        },
        { type: "heading", text: "コントローラを薄く保つ指針" },
        {
          type: "list",
          items: [
            "1メソッドは「受け取る・委ねる・返す」の3ステップに収まるのが理想。",
            "入力の検証は、コントローラではなくフォームリクエストに寄せる。",
            "業務ルール(いつ・どんな計算をするか)は、サービス層やモデルに置く。",
            "同じ処理を複数のコントローラから呼びたくなったら、それは切り出すサイン。",
            "テストしづらいと感じたら、責務が混ざっている可能性を疑う。",
          ],
        },
        {
          type: "callout",
          variant: "interview",
          text: "「コントローラは受け取って委ねて返すだけの薄い層に保ちます。業務ロジックまで書き込むと [[fat-controller]] になり、テストも保守も難しくなります。私は入力検証をフォームリクエストへ、業務ロジックを [[service-layer]] へ切り出し、単一責任を意識してコントローラを薄く保っています」と言えると、設計を理解していると伝わります。",
        },
      ],
      questions: [
        {
          id: "day3-lesson2-q1",
          type: "choice",
          question: "コントローラを「薄く保つ」とは、どういう状態を目指すことか。",
          choices: [
            "できるだけコード行数を減らし、コメントを書かないこと",
            "業務ロジックやDB操作を抱え込まず、受け取り・委譲・返却の交通整理に徹すること",
            "1つのコントローラに全アクションをまとめること",
            "バリデーションをすべてコントローラ内に書くこと",
          ],
          answerIndex: 1,
          explanation: "薄いコントローラとは、リクエストを受け取り、処理を適切な担当(サービス層やフォームリクエスト)に委ね、結果を返す役割に徹した状態です。行数の多寡やコメントの有無の話ではありません。",
        },
        {
          id: "day3-lesson2-q2",
          type: "free",
          question: "コントローラに業務ロジックを書きすぎると、どんな問題が起きるか。「fat controller」という言葉を使って説明せよ。",
          modelAnswer: "入力の受け取り・業務ルールの計算・DB操作・通知などをコントローラのメソッドに全部詰め込むと、メソッドが肥大化していわゆるfat controller(太ったコントローラ)になります。すると1つの変更のために大きなコードを読み解く必要があり、修正の影響範囲が読めず、ユニットテストも書きにくくなります。同じロジックを他から再利用することもできません。だから私は入力検証をフォームリクエストへ、業務ロジックをサービス層やモデルへ切り出し、コントローラは薄く保ちます。",
          interviewPhrase: "業務ロジックをコントローラに書き込むとfat controllerになり、テストも保守も再利用も難しくなるので、私は責務ごとにフォームリクエストやサービス層へ切り出して薄く保ちます。",
          keywords: ["fat controller", "単一責任", "テストしにくい", "サービス層", "切り出す"],
        },
      ],
    },

    // =================================================================
    // Lesson 3: ルートモデルバインディング
    // =================================================================
    {
      id: "day3-lesson3",
      slug: "route-model-binding",
      title: "ルートモデルバインディング",
      summary: "URLのIDから、対応するモデルを自動で取り出す仕組み。定型のfindOrFailを消せる。",
      blocks: [
        { type: "heading", text: "毎回書いていた「探して、無ければ404」" },
        {
          type: "paragraph",
          text: "詳細画面や更新処理では、まず「URLのIDに対応するデータをDBから探し、無ければ404を返す」という決まり文句を書きます。この定型コードが全アクションに散らばると、書くのも読むのも面倒です。",
        },
        {
          type: "code",
          language: "php",
          caption: "バインディングを使わない場合(毎回このお決まりを書く)",
          code: `public function show($id)
{
    // IDでDBを探し、見つからなければ自動で404を投げる
    $post = Post::findOrFail($id);

    return view('posts.show', ['post' => $post]);
}`,
        },
        { type: "heading", text: "ルートモデルバインディングとは" },
        {
          type: "paragraph",
          text: "[[route-model-binding]] は、URLに含まれるIDから対応するモデルをLaravelが自動で取り出して、コントローラのメソッドに渡してくれる仕組みです。メソッドの引数に「型」を書いておくだけで、findOrFail相当の処理をフレームワークが肩代わりしてくれます。",
        },
        {
          type: "code",
          language: "php",
          caption: "暗黙のバインディング — 引数の型でモデルが渡ってくる",
          code: `// ルート: /posts/{post} の {post} 部分がキー
Route::get('/posts/{post}', [PostController::class, 'show']);

public function show(Post $post) // 引数の型が Post なら…
{
    // URLのIDから対応する Post が自動で見つかり、無ければ404
    // findOrFail はもう書かなくてよい
    return view('posts.show', ['post' => $post]);
}`,
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜこれが便利なのか",
          text: "「探して、無ければ404」という定型コードを全アクションから消せます。コントローラの本文が「本当にやりたいこと」だけになり、意図が読みやすくなります。また404の返し方がフレームワークで統一されるので、ある画面だけ404にならない、といった抜け漏れも防げます。定型を減らして間違いの起きる余地を減らす、という設計上のメリットです。",
        },
        { type: "heading", text: "暗黙のバインディングと明示のバインディング" },
        {
          type: "paragraph",
          text: "デフォルトでは主キー(通常はid)で検索されます。これが「暗黙のバインディング」です。一方、URLをIDではなく人間に読みやすいスラッグ(例: /posts/laravel-basics)にしたい場合は、どのカラムで探すかを指定する「明示のバインディング」を使います。",
        },
        {
          type: "code",
          language: "php",
          caption: "スラッグで解決させる(カラムを明示する)",
          code: `// ルート側で {post:slug} と書くと、id ではなく slug 列で検索される
Route::get('/posts/{post:slug}', [PostController::class, 'show']);

// あるいはモデル側で既定の解決キーを指定する方法もある
class Post extends Model
{
    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}`,
        },
        {
          type: "callout",
          variant: "warn",
          title: "落とし穴",
          text: "バインディングは便利ですが「見つからなければ勝手に404」になる点は覚えておきましょう。ソフトデリート([[soft-delete]])されたデータは既定では見つからず404になります。削除済みも含めて扱いたい場合は、明示的にその指定が必要です。魔法ではなく、裏でfindOrFail相当が動いていると理解しておくのが大切です。",
        },
        {
          type: "callout",
          variant: "interview",
          text: "「ルートモデルバインディングは、URLのIDから対応するモデルを自動解決して渡してくれる仕組みです。findOrFailのような定型コードを消せるので、コントローラが本来の処理だけになり読みやすくなります。裏では見つからなければ404が返る、という挙動を理解した上で使っています。スラッグで解決したいときは明示バインディングを使います」と説明できます。",
        },
      ],
      questions: [
        {
          id: "day3-lesson3-q1",
          type: "choice",
          question: "ルートモデルバインディングが「便利」とされる主な理由はどれか。",
          choices: [
            "SQLを一切発行しなくなり、DBアクセスがゼロになるから",
            "「IDで探して無ければ404」という定型コードを自動化でき、コントローラを本来の処理に集中させられるから",
            "ルート定義そのものが不要になるから",
            "バリデーションを自動で行ってくれるから",
          ],
          answerIndex: 1,
          explanation: "バインディングは findOrFail 相当の定型処理をフレームワークが肩代わりする仕組みです。DBアクセスがなくなるわけでも、バリデーションをするわけでもありません。裏では検索が行われています。",
        },
        {
          id: "day3-lesson3-q2",
          type: "choice",
          question: "URLをIDではなくスラッグ(例: /posts/laravel-basics)で解決させたい。適切な方法はどれか。",
          choices: [
            "ルートを {post} のまま変えず、コントローラ側でstr_replaceする",
            "{post:slug} のように解決キーを明示する、またはモデルのgetRouteKeyNameで指定する",
            "web.phpをapi.phpに移動する",
            "findOrFailをfirstに書き換える",
          ],
          answerIndex: 1,
          explanation: "既定では主キー(id)で解決されます。別カラムで解決したい場合は、ルートで {post:slug} と明示するか、モデルの getRouteKeyName で既定キーを指定します(明示のバインディング)。",
        },
        {
          id: "day3-lesson3-q3",
          type: "free",
          question: "ルートモデルバインディングを使うとコードがどう変わるか、findOrFailに触れながら説明せよ。",
          modelAnswer: "バインディングを使わないと、各アクションでPost::findOrFail($id)のように「IDで探して、無ければ404を投げる」定型コードを毎回書く必要があります。ルートモデルバインディングを使うと、メソッドの引数にモデルの型を書くだけで、Laravelが同じことを自動でやってくれます。結果として定型コードが消え、コントローラの本文が本来やりたい処理だけになって読みやすくなり、404処理のやり方も統一されます。裏ではfindOrFail相当が動いているので、見つからなければ404になる挙動は理解しておく必要があります。",
          interviewPhrase: "ルートモデルバインディングは、各アクションに散らばるfindOrFailの定型を消してくれる仕組みで、コントローラが本来の処理だけになり、404の扱いも統一されるので使っています。",
          keywords: ["findOrFail", "自動解決", "404", "定型コードを消す", "暗黙・明示"],
        },
      ],
    },

    // =================================================================
    // Lesson 4: リクエスト / レスポンス
    // =================================================================
    {
      id: "day3-lesson4",
      slug: "request-response",
      title: "リクエストとレスポンス",
      summary: "入力を受け取るRequest、返し方(リダイレクト・JSON)とステータスコードの基本を理解する。",
      blocks: [
        { type: "heading", text: "Requestオブジェクト" },
        {
          type: "paragraph",
          text: "ユーザーが送ってきた入力(フォームの値、クエリ文字列、ヘッダーなど)は、Requestオブジェクトにまとめられてコントローラに渡ってきます。コントローラのメソッドの引数に型を書いておけば、Laravelが自動でこのオブジェクトを用意してくれます。",
        },
        {
          type: "code",
          language: "php",
          caption: "Requestから入力を取り出す",
          code: `use Illuminate\\Http\\Request;

public function store(Request $request)
{
    $title = $request->input('title');      // 特定の項目を取り出す
    $all   = $request->only(['title', 'body']); // 必要な項目だけ
    $page  = $request->query('page', 1);    // クエリ文字列(既定値つき)

    // 生の $request->all() をそのまま保存するのは避ける([[mass-assignment]] 対策)
}`,
        },
        {
          type: "callout",
          variant: "warn",
          title: "落とし穴: 生の入力をそのまま保存しない",
          text: "「$request->all()」で受け取った内容をそのままモデルに保存すると、意図しない項目まで書き込まれる [[mass-assignment]] のリスクがあります。必要な項目だけをonlyで絞るか、バリデーション済みの値(validated())を使うのが安全です。入力は信用しない、が原則です。",
        },
        { type: "heading", text: "レスポンスの返し方" },
        {
          type: "paragraph",
          text: "処理の結果は「レスポンス」として返します。Webの画面ならビュー(HTML)やリダイレクト、APIならJSONを返すのが基本です。用途によって返し方を選びます。",
        },
        {
          type: "code",
          language: "php",
          caption: "画面向け: ビューとリダイレクト",
          code: `// HTMLを返す
return view('posts.index', ['posts' => $posts]);

// 保存後は一覧へリダイレクト。処理の重複送信も防げる
return redirect()->route('posts.index')
    ->with('status', '投稿を保存しました'); // 一度だけ表示されるメッセージ`,
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ保存後にリダイレクトするのか(PRGパターン)",
          text: "フォーム送信(POST)の直後に画面をそのまま表示すると、ユーザーがブラウザを再読み込みしたときに同じ送信が繰り返され、二重登録が起きます。保存後に別URLへリダイレクト(GET)させる「PRG(Post/Redirect/Get)」にすると、再読み込みしても登録処理が走らず安全です。これは定番の設計パターンです。",
        },
        {
          type: "code",
          language: "php",
          caption: "API向け: JSONレスポンスとステータスコード",
          code: `// 取得成功。既定で 200 OK
return response()->json($post);

// 新規作成の成功は 201 Created を返すのが作法
return response()->json($post, 201);

// 見つからないときは 404 Not Found
return response()->json(['message' => 'not found'], 404);`,
        },
        { type: "heading", text: "ステータスコードの基本" },
        {
          type: "paragraph",
          text: "HTTPステータスコードは「処理の結果を数字で伝える共通言語」です。特にAPIでは、呼び出し側がこの数字を見て成功・失敗を判断するので、正しく返すことが大切です。",
        },
        {
          type: "list",
          items: [
            "200 OK: 取得・更新などが成功した。",
            "201 Created: 新規作成に成功した(POSTで作った直後)。",
            "204 No Content: 成功したが返す本文がない(削除など)。",
            "302 / リダイレクト: 別のURLへ誘導する(Web画面でよく使う)。",
            "404 Not Found: 対象が見つからない。",
            "422 Unprocessable: 入力の検証に失敗した(バリデーションエラー)。",
            "500 Internal Server Error: サーバ側で予期しない例外が起きた。",
          ],
        },
        {
          type: "callout",
          variant: "info",
          text: "「成功なら何でも200を返す」のではなく、作成なら201、削除なら204、というように意味の合ったコードを返すと、APIを使う側の実装が素直になります。",
        },
        {
          type: "callout",
          variant: "interview",
          text: "「入力はRequestオブジェクトから受け取りますが、生のall()をそのまま保存せず、バリデーション済みの値を使ってマスアサインメントを避けます。Web画面ではPRGパターンで保存後にリダイレクトし、二重送信を防ぎます。APIでは結果に応じて201・404・422など意味の合ったステータスコードを返す、という基本を守っています」と言えます。",
        },
      ],
      questions: [
        {
          id: "day3-lesson4-q1",
          type: "choice",
          question: "フォーム送信(POST)後に、あえて別URLへリダイレクトする(PRGパターン)主な理由はどれか。",
          choices: [
            "リダイレクトすると処理が高速になるから",
            "ブラウザの再読み込みによる二重送信(重複登録)を防ぐため",
            "JSONを返すために必須だから",
            "CSSを再読み込みさせるため",
          ],
          answerIndex: 1,
          explanation: "POSTの結果画面をそのまま表示すると、再読み込みで同じPOSTが繰り返され二重登録が起きます。保存後にGETのURLへリダイレクトさせるPRGパターンにすると、再読み込みしても登録処理が走りません。",
        },
        {
          id: "day3-lesson4-q2",
          type: "choice",
          question: "APIで新しいリソースの作成に成功したとき、返すべきステータスコードとして最も適切なものはどれか。",
          choices: ["200 OK", "201 Created", "404 Not Found", "500 Internal Server Error"],
          answerIndex: 1,
          explanation: "新規作成の成功は201 Createdを返すのが作法です。200でも動きはしますが、201の方が「新しく作られた」という意味を正確に伝えられ、API利用側の実装が素直になります。",
        },
        {
          id: "day3-lesson4-q3",
          type: "free",
          question: "「$request->all() をそのまま保存してはいけない」と言われる理由を説明せよ。",
          modelAnswer: "$request->all()はユーザーが送ってきた入力をすべて含みます。これをそのままモデルに渡して保存すると、フォームに無いはずの項目(例: 権限フラグや他人のIDなど)まで送られてきた場合に、意図せず書き込まれてしまうマスアサインメントのリスクがあります。だから必要な項目だけをonlyで絞るか、バリデーション済みのvalidated()の値だけを使います。入力は信用しない、が基本方針です。",
          interviewPhrase: "生のall()をそのまま保存するとマスアサインメントで意図しない項目まで書き込まれる恐れがあるので、私はvalidated()やonlyで必要な項目だけに絞って保存します。",
          keywords: ["mass-assignment", "マスアサインメント", "validated", "only", "入力を信用しない"],
        },
      ],
    },
  ],
};
