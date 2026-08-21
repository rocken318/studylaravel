// =====================================================================
// 実例で読み解く halvision.com
// 実在する広告枠申込サイト(Laravel製)のコードを教材にした学習セクション。
//
// この章の主役は「同一のサイト内に、良い例と反面教師が"対"で存在する」こと。
// 同じモデル・同じ機能なのに、書き方ひとつで設計品質が変わる——を実コードで追体験する。
//
// 型は types/index.ts を汚さないよう、このファイル内にローカル定義する。
// 引用コードはすべて実ファイルから取った要点抜粋。長さより「正確さ」を優先している。
// =====================================================================

/** コード抜粋(悪い例 / 良い例、あるいは中立の実コード) */
export interface CaseCode {
  /** 抜粋の見出し(どのファイルの何行あたりか等) */
  label: string;
  /** 実ファイルのパス(引用元) */
  file: string;
  language: string;
  code: string;
}

/**
 * ひとつの設計論点を「三点構成」で持つ。
 * - excerpt   : 実コード抜粋(悪い例 bad / 良い例 good / 中立 neutral のいずれか)
 * - verdict   : 何が良い/悪いか(なぜそうなるか)
 * - interview : 自分の言葉で説明するなら(一言)
 */
export interface CaseSection {
  /** アンカー用の一意なID */
  id: string;
  /** 「Day4」など、7日間カリキュラムのどの単元に対応するか */
  dayTag: string;
  /** 節タイトル */
  title: string;
  /** この節の要約(一行) */
  summary: string;
  /** 反面教師のコード(あれば) */
  bad?: CaseCode;
  /** 良い例のコード(あれば) */
  good?: CaseCode;
  /** 対比ではなく単体で示す実コード(あれば) */
  neutral?: CaseCode;
  /** 何が良い/悪いか。段落の配列 */
  verdict: string[];
  /** 自分の言葉で説明するなら(一言) */
  interview: string;
  /** 補足・演習案など(任意) */
  note?: string;
}

export interface CaseStudyIntro {
  title: string;
  lead: string;
  paragraphs: string[];
}

export const caseStudyIntro: CaseStudyIntro = {
  title: "実例で読み解く halvision.com",
  lead: "実在の広告枠申込サイトのコードで、設計判断を追体験する",
  paragraphs: [
    "この章で読むのは、架空のサンプルではなく、実際に動いている広告枠申込サイト(halvision.com)のLaravelコードです。デジタルサイネージ(街頭ディスプレイ)の広告枠を、日別・週別などのプランで申し込める予約サイトです。",
    "面白いのは、同じ一つのサイトの中に「お手本のような良いコード」と「典型的な反面教師」が対で同居していることです。同じ Display モデル、同じリレーションを扱っていても、片方は with 一行で N+1 を防ぎ、もう片方は防いでいない——といった差が、実物として並んでいます。",
    "各節は「実コード抜粋 → 何が良い/悪いか → 自分の言葉で説明するなら」の三点構成です。コードを丸暗記するのではなく、『なぜこの書き方を選ぶ(避ける)のか』を自分の言葉で説明できる状態を目指してください。それがこのサイト全体の哲学であり、実務で差がつくポイントです。",
  ],
};

export const caseStudySections: CaseSection[] = [
  // ---------------------------------------------------------------
  // 1. Day4 : N+1 が「1行で直る」
  // ---------------------------------------------------------------
  {
    id: "n-plus-one",
    dayTag: "Day4",
    title: "N+1が「1行で直る」— with の有無が生む差",
    summary:
      "同じ Display と pricingPlans を扱う2つの一覧。片方は with が無くN+1を起こし、片方は with 一行で防いでいる。",
    bad: {
      label: "反面教師: 管理側の一覧(with が無い)",
      file: "app/Http/Controllers/Admin/DisplayController.php  index()",
      language: "php",
      code: `public function index()
{
    // with が無い。ディスプレイ一覧を取るクエリは1本だけ
    $displays = Display::orderBy('created_at', 'desc')
        ->paginate(10);

    return view('admin.displays.index', compact('displays'));
}`,
    },
    good: {
      label: "良い例: 利用者側の一覧(with で先読み)",
      file: "app/Http/Controllers/Client/DisplayController.php  index()",
      language: "php",
      code: `public function index()
{
    // 使う関連を最初にまとめて先読みする(Eager Loading)
    $displays = Display::with(['timeSlots', 'pricingPlans', 'dailyPrices'])
        ->where('is_active', true)
        ->get();

    // ... 以降このコレクションを回しても、関連アクセスで追加SQLは出ない
}`,
    },
    verdict: [
      "反面教師側の Blade テンプレート(resources/views/admin/displays/index.blade.php の104〜105行あたり)では、一覧をループしながら `$display->pricingPlans->where('plan_type', 'daily')...` のように、行ごとに pricingPlans へアクセスしています。コントローラで先読みしていないため、この瞬間に遅延ロードが発火します。",
      "1ページ10件表示なら、一覧を取る1本に加えて、各行の pricingPlans を取るクエリが10本。合計 1+10=11本のクエリが走ります。これが典型的なN+1です。件数が増えれば線形に悪化します。",
      "対して利用者側は、まったく同じ Display モデル・同じ pricingPlans リレーションを、`with([...])` 一行で事前ロードしています。関連は WHERE IN でまとめて取られるため、行数が何件でも本数は一定に抑えられます。",
      "強調したいのは「モデルもリレーションも同一」で、違いは with 一行だけ、という点です。N+1は特別なバグではなく、先読みを書き忘れただけで誰でも踏む——だからこそレビューで機械的に潰せる、と理解しておくと強いです。",
    ],
    interview:
      "同じサイトの中に、with を書いた一覧と書き忘れた一覧が同居していました。前者は関連を先読みするのでクエリ本数が一定ですが、後者はループ内で pricingPlans にアクセスして 1+N 本のN+1を起こします。差は with 一行なので、私は一覧で関連を使うときは必ず Eager Loading を確認します。",
    note: "演習案: 反面教師の index() で DB::listen(fn ($q) => Log::info($q->sql)) を仕込むか Laravel Debugbar を入れて、一覧を開いたとき何本クエリが出るか実測してみましょう。with を足す前は11本、足した後は数本に減るのが見えるはずです。",
  },

  // ---------------------------------------------------------------
  // 2. Day6 : 排他制御の教科書例
  // ---------------------------------------------------------------
  {
    id: "lock-for-update",
    dayTag: "Day6",
    title: "排他制御の教科書例 — 在庫の二重予約を防ぐ",
    summary:
      "枠(在庫)を減らす処理を DB::transaction + lockForUpdate で囲み、同時アクセスによる二重予約を防いでいる。",
    good: {
      label: "良い例: 枠予約(トランザクション + 行ロック)",
      file: "app/Services/SlotControlService.php  reserveSlots()",
      language: "php",
      code: `return DB::transaction(function () use ($displayId, $dates, $timeSlot, ...) {
    foreach ($dates as $date) {
        // その日の枠レコードを「ロックしながら」取得する
        $slotAvailability = DailySlotAvailability::where('display_id', $displayId)
            ->where('date', $date)
            ->where('time_slot', $timeSlot)
            ->lockForUpdate()   // ← 他トランザクションを待たせる行ロック
            ->first();

        // ロック中に在庫を確認してから
        if ($slotAvailability->available_slots < $slotsCount || $slotAvailability->is_soldout) {
            throw new \\Exception("日付 {$date} の枠が不足しています");
        }

        // 在庫を減らす(使用数+ / 空き-)
        $slotAvailability->increment('used_slots', $slotsCount);
        $slotAvailability->decrement('available_slots', $slotsCount);
    }
});`,
    },
    verdict: [
      "在庫を「読んで、確認して、減らす」処理は、複数の予約が同時に走ると危険です。何もしなければ、AとBが同じ『残り1枠』を同時に読み、両方が『まだ空いている』と判断して二重に予約する——在庫のオーバーブッキングが起きます。",
      "このコードは2つの道具を組み合わせて防いでいます。まず `DB::transaction(...)` で一連の処理を1つの原子的なまとまりにし、途中で例外が出れば全部ロールバックされます(在庫だけ減って予約が作られない、という中途半端を防ぐ)。",
      "次に `lockForUpdate()` で、対象の枠レコードに行ロックをかけます。先にロックを取ったトランザクションが処理を終えるまで、後続は待たされます。つまり在庫の確認と更新が「割り込まれない」ことが保証されます。",
      "『在庫・残席・ポイント』のように、読んで確認して減らす類の処理は、この形が定番の解です。halvision ではこの部分がきちんとサービスクラスに切り出され、教科書どおりに書かれています。",
    ],
    interview:
      "在庫を減らす処理は、同時実行だと『残り1枠』を二人が同時に読んで二重予約を起こします。halvision の予約サービスは DB::transaction で原子性を確保し、対象の枠レコードに lockForUpdate で行ロックをかけて、確認から更新までを他トランザクションに割り込ませない形にしていました。私も在庫や残席を扱う処理では同じパターンを使います。",
  },

  // ---------------------------------------------------------------
  // 3. Day6 : Fat Controller 反面教師
  // ---------------------------------------------------------------
  {
    id: "fat-controller",
    dayTag: "Day6",
    title: "Fat Controller 反面教師 — 250行の store()",
    summary:
      "バリデーション・価格計算・ゲストユーザー作成・保存・メール送信・予約作成が1メソッドに同居し、トランザクションで囲まれてもいない。",
    bad: {
      label: "反面教師: 何もかもが1メソッドに(約248行)",
      file: "app/Http/Controllers/Client/ApplicationController.php  store()",
      language: "php",
      code: `public function store(Request $request)
{
    // ① バリデーション(インラインで数十行)
    $validated = $request->validate([ /* ... display_id, email, start_date のクロージャ検証 ... */ ]);

    // ② 価格計算(サービス呼び出し + 分岐)
    // ③ ゲストユーザーを「その場で」作る
    if (!$userId) {
        $guestUser = \\App\\Models\\User::firstOrCreate(
            ['email' => 'guest@halvision.system'],
            ['name' => 'ゲストユーザー', 'password' => bcrypt(uniqid()), 'role' => 'client']
        );
        $userId = $guestUser->id;
    }

    // ④ 申込を保存
    $application = Application::create([ /* ...十数カラム... */ ]);

    // ⑤ 確認メール送信(try/catchで握りつぶし)
    try { Mail::to($application->email)->send(new ApplicationConfirmation($application)); }
    catch (\\Exception $e) { /* 失敗しても続行 */ }

    // ⑥ 予約作成(日付ごとに Reservation::create をループ)
    foreach ($actualDates as $date) { Reservation::create([ /* ... */ ]); }

    // ⑦ ゲスト/決済でリダイレクト分岐 ...
}   // ← ここまで約248行。全体を DB::transaction で囲んでいない`,
    },
    verdict: [
      "この store() は361行目から約248行続き、①バリデーション ②価格計算 ③ゲストユーザーの firstOrCreate ④申込保存 ⑤メール送信 ⑥予約作成 ⑦リダイレクト分岐、を1メソッドに全部抱えています。いわゆる Fat Controller の典型です。",
      "問題は『変更理由が多すぎる』ことです。価格ロジックが変わっても、メール文面が変わっても、ゲスト処理が変わっても、この巨大メソッドを触ることになります。テストも、DBもメール送信も絡むので単体で書きづらい。責務が混ざるほど壊れやすくなります。",
      "さらに危ういのは、④保存と⑥予約作成が全体として DB::transaction で囲まれていない点です。申込は保存できたのに、途中で例外が出て予約が作られない、といった不整合が起こり得ます(同じサイトの reserveSlots はトランザクションで囲めているのに、こちらは囲めていない=対照的)。",
      "切り出しの指針: バリデーションは FormRequest(次節)へ。『ゲストユーザー確保 → 申込保存 → 予約作成』という業務の手続きは ApplicationService のようなサービスクラスへまとめ、その内側を DB::transaction で囲む。メール送信は本来のトランザクション成功後、できればキュー(非同期)へ。こうするとコントローラは『受け取ってサービスに渡し、結果でリダイレクトするだけ』の薄い層に戻せます。",
    ],
    interview:
      "申込処理が1つのコントローラメソッドに250行近く詰まっていて、バリデーション・価格計算・ゲストユーザー作成・保存・メール送信・予約作成が同居し、しかも保存と予約作成がトランザクションで囲まれていませんでした。私ならバリデーションを FormRequest に、業務手続きをサービスに切り出して内側を DB::transaction で囲み、メールはキューに逃がして、コントローラは薄く保ちます。",
  },

  // ---------------------------------------------------------------
  // 4. Day5 : FormRequest
  // ---------------------------------------------------------------
  {
    id: "form-request",
    dayTag: "Day5",
    title: "FormRequest — 検証はコントローラの外へ",
    summary:
      "専用の FormRequest に検証を寄せた良い例と、コントローラ内でインライン validate している反面教師の対比。",
    good: {
      label: "良い例: 専用 FormRequest に検証を集約",
      file: "app/Http/Requests/ProfileUpdateRequest.php",
      language: "php",
      code: `class ProfileUpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name'  => ['required', 'string', 'max:255'],
            'email' => [
                'required', 'string', 'lowercase', 'email', 'max:255',
                // 自分自身のメールは重複扱いしない(更新時の定石)
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
        ];
    }
}`,
    },
    bad: {
      label: "反面教師: コントローラ内にインライン validate",
      file: "app/Http/Controllers/Client/ApplicationController.php  store()",
      language: "php",
      code: `$validated = $request->validate([
    'display_id'   => 'required|exists:displays,id',
    'contact_person' => 'required|string|max:255',
    'email'        => 'required|email|max:255',
    // 日付検証をその場のクロージャで数十行…
    'start_date'   => ['required', function ($attribute, $value, $fail) {
        // カンマ区切りか単一かで分岐して、過去日を弾く…
    }],
    // ... まだまだ続く
]);`,
    },
    verdict: [
      "良い例の ProfileUpdateRequest は、検証ルールを専用クラスに切り出しています。コントローラ側は型ヒントで受けるだけで、メソッド本体に入る時点で入力は検証済みです。ルールが1か所に集約されるので、再利用でき、テストもしやすい。",
      "特に `Rule::unique(User::class)->ignore($this->user()->id)` は、更新時に『自分自身のメールアドレスは重複エラーにしない』という定番のイディオムで、FormRequest だと `$this->user()` が自然に使えて綺麗に書けます。",
      "対する反面教師は、前節の store() の中で数十行のインライン validate をしています。start_date の検証はその場のクロージャで、カンマ区切りか単一かを分岐して過去日を弾く——ロジックがコントローラに埋まり、再利用も単体テストも難しくなっています。",
      "同じアプリの中で、検証を『外に出せている箇所』と『中に埋めている箇所』が共存しているわけです。どちらが読みやすく・直しやすいかは一目瞭然です。",
    ],
    interview:
      "検証は FormRequest に寄せる派です。halvision でも、プロフィール更新は ProfileUpdateRequest に切り出されていて Rule::unique(...)->ignore() で自分のメールを除外できていましたが、申込処理はコントローラ内で数十行のインライン validate になっていました。検証を外に出すと再利用とテストがしやすく、コントローラも薄くなる、と説明します。",
  },

  // ---------------------------------------------------------------
  // 5. Day2 : マイグレーション 新旧
  // ---------------------------------------------------------------
  {
    id: "migration",
    dayTag: "Day2",
    title: "マイグレーション新旧 — 外部キーの書き方と技術的負債",
    summary:
      "旧式の unsignedBigInteger + foreign() と、モダンな foreignId()->constrained() が同居。さらに後追い修正マイグレーションの乱立=技術的負債。",
    bad: {
      label: "旧式: 外部キーを2ステップで書く",
      file: "database/migrations/..._create_displays_table.php",
      language: "php",
      code: `Schema::create('displays', function (Blueprint $table) {
    $table->id();
    // カラム定義と外部キー制約が分かれている(冗長)
    $table->unsignedBigInteger('user_id')->nullable();
    // ...
    $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
});`,
    },
    good: {
      label: "モダン: foreignId()->constrained() で1行",
      file: "database/migrations/..._create_reservations_table.php",
      language: "php",
      code: `Schema::create('reservations', function (Blueprint $table) {
    $table->id();
    // 型・外部キー制約・削除時挙動までを一息で書ける
    $table->foreignId('display_id')->constrained('displays')->onDelete('cascade');
    $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
    $table->foreignId('time_slot_id')->nullable()
          ->constrained('display_time_slots')->onDelete('set null');
});`,
    },
    verdict: [
      "displays テーブルは旧式で、`unsignedBigInteger('user_id')` でカラムを作ってから、別行で `->foreign(...)->references(...)->on(...)` と制約を張っています。動きますが冗長で、カラム型と制約が離れるぶん読みづらい。",
      "reservations テーブルはモダンで、`foreignId('display_id')->constrained('displays')->onDelete('cascade')` の一息で、型・外部キー制約・削除時の挙動まで書けています。命名規約に沿えば `constrained()` の引数すら省けます。読みやすく、間違いにくい。",
      "そしてこの章で本当に見てほしいのは、migrations フォルダの『後追い修正の乱立』です。add_missing_columns_to_..., fix_displays_table_missing_columns, safe_add_thumbnail_path のような、あとから列を足す・直すマイグレーションが大量に並んでいます。",
      "safe_add 系は `if (!Schema::hasColumn('displays', 'thumbnail_path'))` で存在チェックしてから足す、冪等(何度流しても壊れない)な書き方です。これ自体は堅牢さの工夫ですが、『冪等ガードを付けたくなるほど、同じテーブルへ後から列を足し続けている』こと自体が、初期設計を詰め切れなかった負債の痕跡だと読めます。",
    ],
    interview:
      "外部キーは foreignId()->constrained()->onDelete() で書く派です。halvision では新しい reservations はこの形でしたが、古い displays は unsignedBigInteger + foreign() の旧式でした。さらに add_missing や safe_add といった後追いマイグレーションが乱立していて、Schema::hasColumn で冪等化する工夫はあるものの、それ自体が初期設計の負債の表れだと読み取れます。",
    note: "冪等マイグレーション: 同じ処理を何度実行しても結果が変わらない性質。Schema::hasColumn で『既にあるなら足さない』とガードすることで、環境ごとの適用状態のズレに強くする狙いがあります。",
  },

  // ---------------------------------------------------------------
  // 6. Day3 : ルートモデルバインディング 対比
  // ---------------------------------------------------------------
  {
    id: "route-model-binding",
    dayTag: "Day3",
    title: "ルートモデルバインディング — 手動 findOrFail vs 型ヒント",
    summary:
      "同じコントローラの中に、手動で findOrFail($id) する古い書き方と、型ヒント Display $display で暗黙にバインドする書き方が共存している。",
    bad: {
      label: "手動: 自分で id を受けて findOrFail",
      file: "app/Http/Controllers/Client/DisplayController.php  plans()",
      language: "php",
      code: `public function plans($id)
{
    // ルートから素の id を受け取り、自分で取得+404処理
    $display = Display::with([
        'pricingPlans', 'dailyPrices', 'timeSlots',
    ])->findOrFail($id);
    // ...
}`,
    },
    good: {
      label: "暗黙バインド: 型ヒントで Display を直接受ける",
      file: "app/Http/Controllers/Client/DisplayController.php  getUnifiedCalendarData()",
      language: "php",
      code: `public function getUnifiedCalendarData(Request $request, Display $display)
{
    // {display} ルートパラメータから Laravel が自動で解決して注入。
    // 見つからなければ自動で404。findOrFail を書かなくていい
    // ...
}`,
    },
    verdict: [
      "同じ Client\\DisplayController の中に、両方の書き方が同居しています。plans($id) は素の id を受け取り、自分で `Display::...->findOrFail($id)` して取得と404処理をしています。",
      "一方 getUnifiedCalendarData(Request $request, Display $display) は、引数の型ヒントに Display を書くだけです。ルートの {display} パラメータから Laravel が自動でモデルを解決して注入し(暗黙のルートモデルバインディング)、見つからなければ自動的に404を返します。findOrFail を書く必要がありません。",
      "型ヒント版の利点は、定型の取得・404処理をフレームワークに任せられ、メソッド本体が『取得済みのモデルを使う本質的な処理』だけになることです。取り違いや findOrFail の書き忘れも防げます。",
      "『同じ人が書いた同じクラスでも、新しいメソッドほどバインディングを使っている』という進化の跡が見えるのが、この実例の面白いところです。",
    ],
    interview:
      "詳細系のアクションは、引数に型ヒントを書く暗黙のルートモデルバインディングを使います。halvision の同じコントローラ内でも、古いメソッドは findOrFail($id) を手書きしていましたが、新しいメソッドは Display $display と書くだけで自動解決+404にできていました。取得と404の定型をフレームワークに任せられ、コントローラが本質に集中できるからです。",
  },

  // ---------------------------------------------------------------
  // 7. おまけ: 実バグから学ぶ(名前空間)
  // ---------------------------------------------------------------
  {
    id: "namespace-bug",
    dayTag: "おまけ",
    title: "実バグから学ぶ — 消えたバックスラッシュ",
    summary:
      "routes/web.php のコントローラ参照でバックスラッシュが欠落し、名前空間が壊れている実例から、use文と名前空間の重要性を確認する。",
    bad: {
      label: "実バグ: 区切りのバックスラッシュが消えている",
      file: "routes/web.php  73行目付近",
      language: "php",
      code: `// お問い合わせ
Route::get("inquiry", [AppHttpControllersAdminInquiryController::class, "index"])
    ->name("inquiry.index");
// ↑ 本来は App\\Http\\Controllers\\Admin\\InquiryController のはず。
//   区切りの \\ が全部抜け、1つの謎クラス名になってしまっている`,
    },
    good: {
      label: "あるべき姿: use で取り込むか、正しい FQCN で書く",
      file: "(修正イメージ)",
      language: "php",
      code: `use App\\Http\\Controllers\\Admin\\InquiryController;

// use で取り込めば、短いクラス名で安全に参照できる
Route::get('inquiry', [InquiryController::class, 'index'])
    ->name('inquiry.index');`,
    },
    verdict: [
      "web.php の73行目付近に `AppHttpControllersAdminInquiryController::class` という参照があります。これは本来 `App\\Http\\Controllers\\Admin\\InquiryController` と書くべきところで、名前空間の区切り(バックスラッシュ)がすべて抜け落ちています。",
      "PHP にとってこれは『AppHttpControllersAdminInquiryController という名前の(存在しない)クラス』です。この行を含むルートに実際にアクセスすると、クラスが見つからずエラーになります。整形ツールやコピペの事故で \\ が失われた、典型的な現場のバグです。",
      "教訓は2つ。1つ目は、名前空間は \\ 区切りが意味を持つ『住所』であり、抜けると別物になること。2つ目は、こういう長い FQCN を毎回ベタ書きせず、ファイル冒頭で `use App\\Http\\Controllers\\Admin\\InquiryController;` と取り込んでおけば、短い `InquiryController::class` で安全に書け、区切り欠落のような事故も起きにくいこと。",
      "実際に動いているサイトにも、こういう見落としは普通に潜みます。だからこそ、use 文で参照を整理する習慣と、ルートを一度は踏んで確認するテストが効いてきます。",
    ],
    interview:
      "名前空間はバックスラッシュ区切りで意味が決まるので、抜けると全く別のクラス名になります。実際に見た例では、ルート定義で App\\Http\\Controllers\\Admin\\InquiryController の \\ が全部抜けていました。私は長い FQCN をベタ書きせず use で取り込んで短く参照し、こうした区切り欠落の事故を避けます。",
  },
];
