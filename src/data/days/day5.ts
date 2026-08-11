import type { Day } from "@/types";

export const day5: Day = {
  day: 5,
  slug: "day5",
  title: "入力の検証と横断的関心事 — バリデーション・ミドルウェア・Blade",
  goal: "「どこで入力を弾くか」「共通処理をどこに置くか」「なぜビューにロジックを書かないか」を、理由つきで説明できる。",
  lessons: [
    // =====================================================================
    // Lesson 1: バリデーション
    // =====================================================================
    {
      id: "day5-lesson1",
      slug: "validation",
      title: "バリデーション — 不正な入力をアプリの入口で弾く",
      summary: "何を・どこで・なぜ検証するのか。信頼できない外部入力を境界で止める考え方。",
      blocks: [
        { type: "heading", text: "バリデーションとは何か" },
        {
          type: "paragraph",
          text: "[[validation]] とは、ユーザーやAPIから送られてきた入力データが、アプリが期待する形になっているかを検証することです。「メールアドレスの形式か」「必須項目が空でないか」「数値が範囲内か」といったチェックを、処理を進める前に行います。",
        },
        {
          type: "paragraph",
          text: "重要な前提は「外部から来る入力はすべて信頼できない」ということです。フォームは改ざんでき、APIには想定外の値が飛んできます。だからこそ、アプリの入口で一度きちんと弾く必要があります。",
        },
        { type: "heading", text: "どこで弾くか — 三段の防御" },
        {
          type: "list",
          items: [
            "フロント(JavaScript)側: 入力しやすさ(UX)のための即時チェック。ただし改ざん可能なので信用してはいけない。",
            "サーバー(Laravel)側: 本当の防御線。ここを通った値だけを正しいものとして扱う。",
            "データベース側: NOT NULL や UNIQUE 制約で最後の砦を作る。",
          ],
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜサーバー側の検証が必須なのか",
          text: "フロント側のチェックはブラウザの開発者ツールやAPIクライアントで簡単に回避できます。フロントだけに頼ると、不正な値がそのままDBに入り、後続の処理が壊れます。サーバー側検証は「省略できる保険」ではなく「必ず通す関所」です。",
        },
        { type: "heading", text: "Laravelでの基本的な書き方" },
        {
          type: "code",
          language: "php",
          caption: "コントローラ内で validate() を呼ぶ最小の例",
          code: `public function store(Request $request)
{
    // 検証に失敗すると、自動的に前の画面へリダイレクトされ
    // エラーメッセージがセッションに詰められる(APIなら422 JSON)
    $validated = $request->validate([
        'title' => ['required', 'string', 'max:255'],
        'email' => ['required', 'email'],
        'age'   => ['nullable', 'integer', 'min:0', 'max:150'],
    ]);

    // ここに来た時点で $validated は「検証済みの安全な値」だけ
    Post::create($validated);

    return redirect()->route('posts.index');
}`,
        },
        {
          type: "paragraph",
          text: "ルールは「required(必須)」「email(形式)」「max:255(長さ)」のように、名前で意図が読めるよう設計されています。検証済みの値だけを取り出す「validate()」の戻り値を使うことで、想定外のキーを混入させない(マスアサインメント対策)効果もあります。",
        },
        {
          type: "callout",
          variant: "warn",
          title: "ありがちな落とし穴",
          text: "リクエスト全体を「$request->all()」でそのまま保存すると、フォームに無い隠しフィールドまで書き込まれる恐れがあります。検証済みの値(validate()の戻り値)だけを保存対象にするのが安全です。",
        },
        { type: "heading", text: "よく使うルール" },
        {
          type: "list",
          items: [
            "required / nullable: 必須か、空を許すか",
            "string / integer / boolean: 型",
            "min / max: 数値の範囲や文字列の長さ",
            "email / url / date: 形式",
            "unique:users,email: DBに重複が無いか",
            "confirmed: パスワード確認フィールドと一致するか",
          ],
        },
        {
          type: "callout",
          variant: "interview",
          title: "面接ではこう言う",
          text: "「入力は外部から来る信頼できないデータなので、必ずサーバー側で検証してから処理に渡します。フロント側の検証はUXのためで、防御としては当てにしません。Laravelではルールを配列で宣言し、検証済みの値だけを使ってDBに書き込むことで、想定外の値の混入も防いでいます」",
        },
      ],
      questions: [
        {
          id: "day5-lesson1-q1",
          type: "choice",
          question: "フロントエンド(JavaScript)のバリデーションだけに頼ってはいけない最大の理由は?",
          choices: [
            "処理が遅くなるから",
            "開発者ツールやAPIクライアントで簡単に回避できるから",
            "日本語のエラーメッセージが出せないから",
            "コード量が増えるから",
          ],
          answerIndex: 1,
          explanation:
            "フロント側の検証はブラウザ操作やAPIクライアントで容易に回避できます。改ざんされた入力が直接サーバーに届くため、サーバー側の検証が本当の防御線になります。",
        },
        {
          id: "day5-lesson1-q2",
          type: "free",
          question: "バリデーションを「どこで」行うべきか、その理由とともに説明してください。",
          modelAnswer:
            "フロント・サーバー・DBの三段で行うのが理想ですが、防御の本体はサーバー側です。フロントは改ざん可能なのでUX目的に留め、サーバー側で必ず検証してから処理を進めます。DBのNOT NULLやUNIQUE制約は最後の砦として整合性を守ります。外部入力は信頼できないという前提に立ち、境界で不正を弾くのが目的です。",
          interviewPhrase:
            "「入力の検証は多層で行いますが、信用の起点はサーバー側です。フロントはUXのため、DB制約は最後の砦、と役割を分けて説明します」",
          keywords: ["サーバー側", "信頼できない入力", "多層", "DB制約"],
        },
      ],
    },

    // =====================================================================
    // Lesson 2: FormRequest
    // =====================================================================
    {
      id: "day5-lesson2",
      slug: "form-request",
      title: "FormRequest — 検証ロジックを専用クラスに寄せる",
      summary: "コントローラを薄く保ち、検証と認可を再利用可能な1クラスにまとめる設計。",
      blocks: [
        { type: "heading", text: "コントローラに検証を書き続けると何が起きるか" },
        {
          type: "paragraph",
          text: "前のレッスンではコントローラ内で「validate()」を呼びました。しかしルールが増え、認可の判定や独自メッセージが加わると、コントローラのメソッドが検証コードで膨らんでいきます。同じルールを複数のメソッドで使い回したいときにコピペも発生します。",
        },
        {
          type: "paragraph",
          text: "[[form-request]] は、この検証と認可のロジックを専用クラスに切り出す仕組みです。コントローラの引数の型を FormRequest にするだけで、Laravelがメソッドの実行前に自動で検証をかけてくれます。",
        },
        { type: "heading", text: "悪い例と良い例" },
        {
          type: "compare",
          bad: {
            label: "検証をコントローラに直書き",
            language: "php",
            code: `public function store(Request $request)
{
    $validated = $request->validate([
        'title'   => ['required', 'string', 'max:255'],
        'body'    => ['required', 'string'],
        'user_id' => ['required', 'exists:users,id'],
    ]);

    // 認可も手書きで混ざる
    if (! $request->user()->can('create', Post::class)) {
        abort(403);
    }

    Post::create($validated);
    return redirect()->route('posts.index');
}`,
          },
          good: {
            label: "FormRequest に寄せてコントローラを薄く",
            language: "php",
            code: `public function store(StorePostRequest $request)
{
    // 検証も認可も StorePostRequest 側で済んでいる
    Post::create($request->validated());
    return redirect()->route('posts.index');
}`,
          },
        },
        { type: "heading", text: "FormRequest クラスの中身" },
        {
          type: "code",
          language: "php",
          caption: "app/Http/Requests/StorePostRequest.php",
          code: `class StorePostRequest extends FormRequest
{
    // この操作を今のユーザーに許可するか(認可)
    public function authorize(): bool
    {
        return $this->user()->can('create', Post::class);
    }

    // 検証ルール
    public function rules(): array
    {
        return [
            'title'   => ['required', 'string', 'max:255'],
            'body'    => ['required', 'string'],
            'user_id' => ['required', 'exists:users,id'],
        ];
    }

    // 独自のエラーメッセージ(任意)
    public function messages(): array
    {
        return [
            'title.required' => 'タイトルは必須です。',
        ];
    }
}`,
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ検証を専用クラスに寄せるのか",
          text: "第一に、コントローラの責務を「受け取って・呼び出して・返す」だけに絞れます(薄いコントローラ)。第二に、同じ検証ルールを複数の入口で再利用できます。第三に、認可(authorize)を検証と同じ場所にまとめられるため、『誰が・何を・どんな形で』送ってよいかが1クラスを見れば分かります。",
        },
        { type: "heading", text: "authorize による認可の一元化" },
        {
          type: "paragraph",
          text: "authorize() が false を返すと、Laravelはメソッドを実行せず 403 を返します。「検証(形式が正しいか)」と「認可(その人に権限があるか)」を同じクラスに置くことで、入口のチェックが散らばりません。認証と認可の違いは Day3 の内容ともつながります。",
        },
        {
          type: "callout",
          variant: "info",
          title: "コントローラの引数に型を書くだけで動く仕組み",
          text: "Laravelはメソッドの引数の型ヒントを見て、必要なクラスを自動生成して渡します(サービスコンテナによる解決)。FormRequestを型に指定すると、注入の過程で検証と認可が自動実行される、という流れです。",
        },
        {
          type: "callout",
          variant: "interview",
          title: "面接ではこう言う",
          text: "「検証と認可はFormRequestに寄せて、コントローラは薄く保ちます。コントローラは『受け取って、必要な処理を呼んで、結果を返す』だけにしたいので、入力の正しさと権限の判定は入口の専用クラスに集約します。同じルールを再利用でき、テストもしやすくなります」",
        },
      ],
      questions: [
        {
          id: "day5-lesson2-q1",
          type: "choice",
          question: "FormRequest に検証を寄せる主な利点として、当てはまらないものは?",
          choices: [
            "コントローラを薄く保てる",
            "検証ルールを複数の入口で再利用できる",
            "認可(authorize)を検証と同じ場所にまとめられる",
            "データベースへのクエリが自動的に高速化される",
          ],
          answerIndex: 3,
          explanation:
            "FormRequestは検証・認可の集約とコントローラの軽量化が目的で、クエリ速度とは無関係です。パフォーマンス改善を目的とする仕組みではありません。",
        },
        {
          id: "day5-lesson2-q2",
          type: "free",
          question: "なぜ検証ロジックをコントローラではなくFormRequestに置くのですか。",
          modelAnswer:
            "コントローラの責務を『受け取って・呼んで・返す』に絞り、薄く保つためです。検証と認可をFormRequestに集約すると、同じルールを複数メソッドで再利用でき、入力の形式チェックと権限判定が1クラスにまとまって見通しが良くなります。コントローラから検証コードが消えるので単体テストもしやすくなります。",
          interviewPhrase:
            "「検証と認可はFormRequestに寄せて、コントローラは薄くします。再利用性と可読性、テストのしやすさが理由です」",
          keywords: ["薄いコントローラ", "再利用", "authorize", "責務"],
        },
      ],
    },

    // =====================================================================
    // Lesson 3: ミドルウェア
    // =====================================================================
    {
      id: "day5-lesson3",
      slug: "middleware",
      title: "ミドルウェア — リクエストが通る共通の関所",
      summary: "認証・CSRF・ログのような横断的関心事を、パイプラインで一箇所にまとめる。",
      blocks: [
        { type: "heading", text: "横断的関心事という考え方" },
        {
          type: "paragraph",
          text: "「ログインしていないと見せない」「CSRFトークンを確認する」「アクセスをログに残す」——これらは特定の画面だけでなく、多くのリクエストに共通して必要な処理です。こうした、機能をまたいで横断的に必要になる処理を『横断的関心事』と呼びます。",
        },
        {
          type: "paragraph",
          text: "[[middleware]] は、この横断的関心事をコントローラの外側にまとめて置く仕組みです。リクエストがコントローラに届く前(と、レスポンスが返る後)に、共通処理を挟み込みます。",
        },
        { type: "heading", text: "パイプラインのイメージ" },
        {
          type: "paragraph",
          text: "リクエストは、複数のミドルウェアを順番に通り抜けてからコントローラに到達します。玉ねぎの層のように、外側から一枚ずつ通過し、コントローラで折り返して、また各層を通って返っていくイメージです。",
        },
        {
          type: "code",
          language: "php",
          caption: "ミドルウェアの基本構造(handleで次の処理へ渡す)",
          code: `class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        // --- コントローラに届く「前」の処理 ---
        if (! $request->user()?->isAdmin()) {
            abort(403, '管理者のみアクセスできます。');
        }

        // $next() を呼ぶと、次のミドルウェア(最終的にコントローラ)へ進む
        $response = $next($request);

        // --- レスポンスが返る「後」の処理 ---
        // 例: ここでレスポンスヘッダーを足すこともできる

        return $response;
    }
}`,
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ共通処理をミドルウェアに切り出すのか",
          text: "認証チェックを各コントローラに書くと、書き忘れた一箇所が重大な穴になります。共通処理を関所として一元化すれば、『このグループのルートは必ず認証を通る』と宣言的に保証でき、コントローラ本体は本来の仕事に集中できます。付け忘れによる事故を仕組みで防ぐのが狙いです。",
        },
        { type: "heading", text: "ルートへの適用" },
        {
          type: "code",
          language: "php",
          caption: "routes/web.php — グループにまとめて適用する",
          code: `// auth を通ったユーザーだけがアクセスできるグループ
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // さらに admin ミドルウェアを重ねる
    Route::middleware(['admin'])->group(function () {
        Route::get('/admin/users', [AdminUserController::class, 'index']);
    });
});`,
        },
        { type: "heading", text: "代表的なミドルウェア" },
        {
          type: "list",
          items: [
            "auth: 未ログインならログイン画面へ。認証の関所。",
            "CSRF検証: フォーム送信が正規のものか [[csrf]] トークンで確認する。",
            "throttle: 一定時間内のリクエスト回数を制限(総当たり対策)。",
            "ログ記録: アクセス内容を記録して後から追える化する。",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "CSRFとの関係",
          text: "Laravelはフォーム由来のPOSTに対し、標準でCSRF検証ミドルウェアを通します。これは『そのリクエストが本当に自分のサイトのフォームから来たか』を確認する横断的関心事の代表例です。詳しい仕組みは用語集 [[csrf]] を参照してください。",
        },
        {
          type: "callout",
          variant: "interview",
          title: "面接ではこう言う",
          text: "「認証やCSRF、ログのような、機能をまたいで共通に必要な処理はミドルウェアに寄せます。リクエストが通るパイプラインの関所として一箇所にまとめることで、コントローラ本体を本来の仕事に集中させられますし、認証の付け忘れのような事故を仕組みで防げます」",
        },
      ],
      questions: [
        {
          id: "day5-lesson3-q1",
          type: "choice",
          question: "ミドルウェアが担うのに最も適した処理はどれですか。",
          choices: [
            "特定の1画面だけで使う複雑な集計計算",
            "多くのリクエストに共通して必要な認証・CSRF検証・ログ",
            "データベースのテーブル設計",
            "CSSのスタイリング",
          ],
          answerIndex: 1,
          explanation:
            "ミドルウェアは横断的関心事、つまり多くのリクエストに共通して必要な処理を一元化する場所です。認証・CSRF・ログはその典型例です。",
        },
        {
          id: "day5-lesson3-q2",
          type: "free",
          question: "ミドルウェアの『パイプライン』という考え方を、認証を例に説明してください。",
          modelAnswer:
            "リクエストはコントローラに届く前に、複数のミドルウェアを順に通過します。例えばauthミドルウェアが最初にログイン状態を確認し、未ログインならそこで処理を止めてログイン画面へ返します。通過できたリクエストだけがコントローラに到達します。玉ねぎの層のように外から内へ通り、レスポンスは逆順に返っていくイメージです。共通の関所を一箇所にまとめることで、認証の付け忘れを防げます。",
          interviewPhrase:
            "「横断的関心事はミドルウェアのパイプラインに寄せます。リクエストが順に関所を通る構造なので、認証などを宣言的に保証できます」",
          keywords: ["横断的関心事", "パイプライン", "認証", "関所"],
        },
      ],
    },

    // =====================================================================
    // Lesson 4: Blade
    // =====================================================================
    {
      id: "day5-lesson4",
      slug: "blade",
      title: "Blade — 表示に専念するテンプレート",
      summary: "継承とコンポーネントで再利用し、XSSを自動エスケープ。ロジックをビューに書かない理由。",
      blocks: [
        { type: "heading", text: "Bladeとは" },
        {
          type: "paragraph",
          text: "[[blade]] はLaravel標準のテンプレートエンジンです。HTMLの中に「{{ }}」で変数を埋め込んだり、「@if」「@foreach」で簡単な制御を書いたりできます。最終的に素のPHP+HTMLにコンパイルされるため高速です。",
        },
        { type: "heading", text: "XSSの自動エスケープ" },
        {
          type: "paragraph",
          text: "Bladeの「{{ $value }}」は、値を自動的にHTMLエスケープして出力します。ユーザーが入力した文字列にスクリプトタグが含まれていても、そのまま実行されず文字として表示されます。これがXSS(クロスサイトスクリプティング)対策の基本になります。",
        },
        {
          type: "compare",
          bad: {
            label: "エスケープを外して生HTMLを出す(危険)",
            language: "blade",
            code: `{{-- ユーザー入力をそのままHTMLとして出力 --}}
{!! $userComment !!}
{{-- $userComment に <script>...</script> が含まれると実行されてしまう --}}`,
          },
          good: {
            label: "既定の {{ }} で自動エスケープ(安全)",
            language: "blade",
            code: `{{-- 文字として安全に表示される --}}
{{ $userComment }}
{{-- <script> は &lt;script&gt; に変換され、実行されない --}}`,
          },
        },
        {
          type: "callout",
          variant: "warn",
          title: "{!! !!} は原則使わない",
          text: "「{!! !!}」はエスケープを外して生のHTMLを出力します。信頼できる管理者が用意した定型HTMLなど、限られた用途以外では使うべきではありません。ユーザー入力に対して使うとXSSの穴になります。",
        },
        { type: "heading", text: "レイアウトの継承" },
        {
          type: "code",
          language: "blade",
          caption: "共通レイアウトを1つ作り、各ページはそれを継承する",
          code: `{{-- resources/views/layouts/app.blade.php --}}
<html>
  <body>
    <header>共通ヘッダー</header>
    <main>
      @yield('content')  {{-- 各ページの中身がここに入る --}}
    </main>
  </body>
</html>

{{-- resources/views/posts/index.blade.php --}}
@extends('layouts.app')

@section('content')
  <h1>記事一覧</h1>
  @foreach ($posts as $post)
    <article>{{ $post->title }}</article>
  @endforeach
@endsection`,
        },
        { type: "heading", text: "コンポーネントによる再利用" },
        {
          type: "code",
          language: "blade",
          caption: "繰り返し使うUIを部品化する",
          code: `{{-- resources/views/components/alert.blade.php --}}
<div class="alert alert-{{ $type }}">
    {{ $slot }}  {{-- タグの中身がここに入る --}}
</div>

{{-- 使う側 --}}
<x-alert type="danger">
    保存に失敗しました。
</x-alert>`,
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜビューにロジックを書かないのか",
          text: "ビューの責務は『渡されたデータをどう見せるか』だけです。集計や条件分岐の判断、DBアクセスをビューに書くと、同じ計算が複数のビューに散らばり、テストもできず、デザイナーとの分業も崩れます。判断はコントローラやサービス層で終わらせ、ビューには結果だけを渡す——これが表示と処理を分ける(MVCの)基本です。",
        },
        {
          type: "compare",
          bad: {
            label: "ビューで集計・判断してしまう",
            language: "blade",
            code: `{{-- ビュー内でDBアクセスや集計をしている --}}
@php
    $total = \\App\\Models\\Order::where('user_id', $userId)->sum('amount');
    $rank  = $total > 100000 ? 'ゴールド' : '一般';
@endphp
<p>あなたのランク: {{ $rank }}</p>`,
          },
          good: {
            label: "計算は事前に済ませ、ビューは表示だけ",
            language: "blade",
            code: `{{-- コントローラ/サービスで $rank を算出済みにして渡す --}}
<p>あなたのランク: {{ $rank }}</p>`,
          },
        },
        {
          type: "callout",
          variant: "interview",
          title: "面接ではこう言う",
          text: "「Bladeでは {{ }} が自動でエスケープするので、XSS対策の基本がテンプレート側で効いています。ビューの責務は表示だけと考えているので、集計や判断はコントローラやサービス層で終わらせて、ビューには結果だけを渡します。共通部分はレイアウト継承やコンポーネントで再利用します」",
        },
      ],
      questions: [
        {
          id: "day5-lesson4-q1",
          type: "choice",
          question: "Bladeの「{{ $value }}」が既定で行うことは?",
          choices: [
            "値を暗号化して出力する",
            "値をHTMLエスケープして出力し、XSSを防ぐ",
            "値をそのまま生HTMLとして出力する",
            "値をデータベースに保存する",
          ],
          answerIndex: 1,
          explanation:
            "「{{ }}」は自動でHTMLエスケープします。スクリプトタグなどが文字として表示されるため、XSS対策の基本になります。生HTMLを出す「{!! !!}」とは対照的です。",
        },
        {
          id: "day5-lesson4-q2",
          type: "choice",
          question: "ビューにロジックを書くべきでない理由として、最も適切なものは?",
          choices: [
            "PHPが書けないから",
            "ビューの責務は表示だけであり、計算や判断が散らばるとテスト・分業・保守が崩れるから",
            "Bladeは制御構文をまったく持たないから",
            "ビューは実行速度が非常に遅いから",
          ],
          answerIndex: 1,
          explanation:
            "ビューの責務は「どう見せるか」に限定します。集計や判断をビューに書くと同じロジックが複数箇所に散らばり、テストもできず保守が難しくなります。判断はコントローラやサービス層で終わらせます。",
        },
        {
          id: "day5-lesson4-q3",
          type: "free",
          question: "「ロジックをビューに書かない」とはどういう方針か、理由とともに説明してください。",
          modelAnswer:
            "ビューの責務を『渡されたデータをどう見せるか』だけに限定する方針です。集計・条件判断・DBアクセスといったロジックはコントローラやサービス層で済ませ、ビューには結果だけを渡します。理由は、ロジックをビューに書くと同じ処理が複数ビューに散らばって重複し、テストもできず、デザイン担当との分業も崩れるからです。表示と処理を分けることで保守しやすくなります。",
          interviewPhrase:
            "「ビューは表示だけに責務を絞ります。判断や集計はサービス層で終わらせ、ビューには結果を渡すので、重複を防ぎテストもしやすくなります」",
          keywords: ["表示だけ", "責務", "サービス層", "重複を防ぐ"],
        },
      ],
    },
  ],
};
