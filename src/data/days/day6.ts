import type { Day } from "@/types";

export const day6: Day = {
  day: 6,
  slug: "day6",
  title: "責務の分離とデータ整合性 — サービス層・トランザクション・排他制御",
  goal: "「ビジネスロジックをどこに置くか」「複数の更新をどう整合させるか」「同時アクセスの競合をどう防ぐか」を、具体例で説明できる。",
  lessons: [
    // =====================================================================
    // Lesson 1: Fat Controller
    // =====================================================================
    {
      id: "day6-lesson1",
      slug: "fat-controller",
      title: "Fat Controller問題 — コントローラに何もかも書くと何が壊れるか",
      summary: "テスト困難・再利用不可・読めない。肥大化したコントローラの具体的な害を知る。",
      blocks: [
        { type: "heading", text: "Fat Controller とは" },
        {
          type: "paragraph",
          text: "[[fat-controller]] とは、コントローラのメソッドにバリデーション・ビジネスロジック・DB操作・通知・外部API呼び出しまで、あらゆる処理を詰め込んで肥大化した状態を指します。最初は動くので気づきにくいのですが、機能が増えるほど手が付けられなくなります。",
        },
        {
          type: "paragraph",
          text: "本来コントローラの責務は『HTTPリクエストを受け取り、適切な処理を呼び出し、レスポンスを返す』という交通整理だけです。判断や計算そのものを抱え込むと、責務が肥大化します。",
        },
        { type: "heading", text: "肥大化したコントローラの例" },
        {
          type: "code",
          language: "php",
          caption: "注文処理をすべてコントローラに書いた例(アンチパターン)",
          code: `public function store(Request $request)
{
    $data = $request->validate([...]);

    // 在庫チェック
    $product = Product::find($data['product_id']);
    if ($product->stock < $data['quantity']) {
        return back()->withErrors('在庫不足');
    }

    // 金額計算(割引ロジックまでここに)
    $amount = $product->price * $data['quantity'];
    if ($request->user()->isPremium()) {
        $amount *= 0.9;
    }

    // 在庫を減らして注文を作る
    $product->decrement('stock', $data['quantity']);
    $order = Order::create([...]);

    // ポイント付与
    $request->user()->increment('points', (int) ($amount * 0.01));

    // メール送信
    Mail::to($request->user())->send(new OrderCompleted($order));

    return redirect()->route('orders.show', $order);
}`,
        },
        { type: "heading", text: "何が悪いのか — 三つの害" },
        {
          type: "list",
          ordered: true,
          items: [
            "テストが困難: このロジックを検証するにはHTTPリクエストを丸ごと組み立てる必要があり、割引計算だけを単体で試せない。",
            "再利用できない: 同じ注文処理をバッチ処理やAPIから呼びたくても、コントローラの中に埋まっていて呼び出せない。",
            "読めない: 在庫・金額・ポイント・メールが一つのメソッドに混在し、どこで何が起きるか追いにくい。",
          ],
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ『薄いコントローラ』を目指すのか",
          text: "コントローラをHTTPの入出力だけに絞ると、中身のビジネスロジックをHTTPから切り離してテストでき、他の入口(バッチ・API・コマンド)からも再利用できます。読み手も『この画面は何を呼んでいるか』を一目で追えます。肥大化を放置すると、変更のたびに影響範囲が読めず、修正が怖くなるのが最大の問題です。",
        },
        {
          type: "callout",
          variant: "warn",
          title: "モデルに全部書くのも別の肥大化",
          text: "『コントローラが薄ければモデルに全部書けばいい』とすると、今度はモデルが肥大化します(Fat Model)。複数のモデルをまたぐ業務手順は、次のレッスンのサービス層に置くのが自然です。",
        },
        {
          type: "callout",
          variant: "interview",
          title: "面接ではこう言う",
          text: "「コントローラにロジックを詰め込むと、HTTPと業務処理が密結合して、単体テストも再利用もできなくなります。だからコントローラは受け取って呼んで返すだけに絞り、業務ロジックは別の層に切り出します。肥大化の一番の害は、変更の影響範囲が読めなくなって修正が怖くなることだと考えています」",
        },
      ],
      questions: [
        {
          id: "day6-lesson1-q1",
          type: "choice",
          question: "Fat Controller(肥大化したコントローラ)の害として、当てはまらないものは?",
          choices: [
            "ビジネスロジックがHTTPと密結合し、単体テストが難しい",
            "処理が他の入口(バッチ・API)から再利用できない",
            "処理が一箇所に混在して読みにくい",
            "データベースへの接続が確立できなくなる",
          ],
          answerIndex: 3,
          explanation:
            "DB接続が確立できなくなることはFat Controllerの害ではありません。問題はテスト困難・再利用不可・可読性の低下、そして変更の影響範囲が読めなくなることです。",
        },
        {
          id: "day6-lesson1-q2",
          type: "free",
          question: "コントローラにビジネスロジックを書くと、なぜテストが難しくなるのですか。",
          modelAnswer:
            "ロジックがHTTPリクエスト処理と密結合するからです。割引計算や在庫判定だけを検証したくても、コントローラ経由でしか呼べないため、HTTPリクエストを丸ごと組み立てないとテストできません。ロジックをサービス層などに切り出せば、素のPHPの関数呼び出しとして入力と出力だけを検証でき、単体テストが容易になります。",
          interviewPhrase:
            "「ロジックをコントローラに書くとHTTPと密結合してテストが重くなります。切り出せば入出力だけで検証できるので、テストのために設計を分けます」",
          keywords: ["密結合", "単体テスト", "切り出す", "再利用"],
        },
      ],
    },

    // =====================================================================
    // Lesson 2: サービス層
    // =====================================================================
    {
      id: "day6-lesson2",
      slug: "service-layer",
      title: "サービス層 — ビジネスロジックの置き場所",
      summary: "業務手順を専用クラスに集約し、コントローラ・モデルと責務を分担。DIで受け取る。",
      blocks: [
        { type: "heading", text: "サービス層とは" },
        {
          type: "paragraph",
          text: "[[service-layer]] とは、アプリの『業務手順(ビジネスロジック)』を担当する専用クラスの層です。前レッスンの注文処理のように、複数のモデルをまたいで『在庫を減らし、注文を作り、ポイントを付け、メールを送る』といった一連の手順を、ここに一つのメソッドとしてまとめます。",
        },
        { type: "heading", text: "三者の責務分担" },
        {
          type: "list",
          items: [
            "コントローラ: HTTPの入出力。リクエストを受け、サービスを呼び、結果をレスポンスにする。",
            "サービス層: 業務手順の調整。複数モデルをまたぐ処理の順序や条件を決める。",
            "モデル: 1つのテーブルに対応するデータと、そのデータ自身に閉じたルール。",
          ],
        },
        { type: "heading", text: "悪い例と良い例" },
        {
          type: "compare",
          bad: {
            label: "コントローラに全部書く",
            language: "php",
            code: `public function store(Request $request)
{
    // 在庫チェック・金額計算・在庫更新・注文作成・
    // ポイント付与・メール送信…すべてここに直書き
    $product = Product::find($request->product_id);
    if ($product->stock < $request->quantity) { /* ... */ }
    $amount = /* 割引計算 */;
    $product->decrement('stock', $request->quantity);
    $order = Order::create([/* ... */]);
    $request->user()->increment('points', /* ... */);
    Mail::to($request->user())->send(/* ... */);
    return redirect()->route('orders.show', $order);
}`,
          },
          good: {
            label: "サービスに委譲する",
            language: "php",
            code: `public function store(
    StoreOrderRequest $request,
    OrderService $orders
) {
    // 業務手順は OrderService に任せ、
    // コントローラは呼び出しと結果の受け渡しだけ
    $order = $orders->place(
        $request->user(),
        $request->validated()
    );

    return redirect()->route('orders.show', $order);
}`,
          },
        },
        { type: "heading", text: "サービスクラスの中身" },
        {
          type: "code",
          language: "php",
          caption: "app/Services/OrderService.php — 業務手順を1メソッドに集約",
          code: `class OrderService
{
    public function place(User $user, array $data): Order
    {
        $product = Product::findOrFail($data['product_id']);

        if ($product->stock < $data['quantity']) {
            throw new OutOfStockException();
        }

        $amount = $this->calculateAmount($user, $product, $data['quantity']);

        $product->decrement('stock', $data['quantity']);

        $order = Order::create([
            'user_id'    => $user->id,
            'product_id' => $product->id,
            'quantity'   => $data['quantity'],
            'amount'     => $amount,
        ]);

        $user->increment('points', (int) ($amount * 0.01));
        Mail::to($user)->send(new OrderCompleted($order));

        return $order;
    }

    // 金額・割引の計算はプライベートメソッドに分けて単体テストしやすく
    private function calculateAmount(User $user, Product $product, int $qty): int
    {
        $amount = $product->price * $qty;
        return $user->isPremium() ? (int) ($amount * 0.9) : $amount;
    }
}`,
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ業務手順をサービス層に集約するのか",
          text: "複数モデルをまたぐ手順は、どのモデルにも属しません。コントローラに書けば再利用できず、無理に片方のモデルに押し込めば別のモデルへの依存が漏れます。中立なサービス層に置くことで、コントローラ・バッチ・APIのどこからでも同じ手順を呼べ、割引計算のような部分だけを単体テストできます。責務が『どこに何があるか』の形で整理されるのが利点です。",
        },
        { type: "heading", text: "DI(依存性の注入)で受け取る" },
        {
          type: "paragraph",
          text: "上の例では、コントローラのメソッド引数に「OrderService」を型で書くだけで、Laravelが自動的にインスタンスを作って渡してくれます。これが [[dependency-injection]](依存性の注入)です。自分で「new OrderService()」せずに外から受け取ることで、テスト時には偽物(モック)に差し替えられ、依存関係が疎になります。",
        },
        {
          type: "code",
          language: "php",
          caption: "自前で new すると差し替えができない",
          code: `// アンチパターン: クラス内部で依存を固定してしまう
class OrderService
{
    public function place(...)
    {
        $mailer = new SmtpMailer(); // テストで差し替え不可
    }
}

// 良い例: コンストラクタで受け取る(DI)
class OrderService
{
    public function __construct(private Mailer $mailer) {}
    // $this->mailer はテスト時にモックへ差し替えられる
}`,
        },
        {
          type: "callout",
          variant: "info",
          title: "サービスコンテナが解決する",
          text: "型ヒントを見て必要な依存を組み立てて渡す仕組みは [[di-container]](サービスコンテナ)が担います。開発者は『何が必要か』を型で宣言するだけで、『どう作るか』はフレームワークに任せられます。",
        },
        {
          type: "callout",
          variant: "interview",
          title: "面接ではこう言う",
          text: "「複数モデルをまたぐ業務手順はサービス層に集約します。コントローラはHTTP、モデルは自テーブルのデータ、サービスは業務手順、と責務を分けます。サービスはコンストラクタインジェクションで依存を受け取るので、テストではモックに差し替えられますし、バッチやAPIからも同じ手順を再利用できます」",
        },
      ],
      questions: [
        {
          id: "day6-lesson2-q1",
          type: "choice",
          question: "サービス層に置くのに最も適した処理はどれですか。",
          choices: [
            "1つのカラムの表示フォーマット変換",
            "在庫を減らし注文を作りポイントを付ける、複数モデルをまたぐ業務手順",
            "HTMLの見た目調整",
            "HTTPステータスコードの決定",
          ],
          answerIndex: 1,
          explanation:
            "複数モデルをまたぐ業務手順はどのモデルにも属さないため、中立なサービス層にまとめます。表示やHTTPの決定はビューやコントローラの責務です。",
        },
        {
          id: "day6-lesson2-q2",
          type: "choice",
          question: "DI(依存性の注入)でサービスを受け取る利点として最も適切なものは?",
          choices: [
            "コードの行数が必ず減る",
            "テスト時に依存をモックへ差し替えられ、結合が疎になる",
            "SQLが自動的に最適化される",
            "本番環境でのみ動作するようになる",
          ],
          answerIndex: 1,
          explanation:
            "DIは依存を外から受け取る仕組みで、テスト時に偽物へ差し替えられます。自前でnewすると固定されて差し替えできません。結合を疎に保つのが目的です。",
        },
        {
          id: "day6-lesson2-q3",
          type: "free",
          question: "コントローラ・サービス層・モデルの責務分担を説明してください。",
          modelAnswer:
            "コントローラはHTTPの入出力を担当し、リクエストを受けてサービスを呼び、結果をレスポンスにします。サービス層は複数モデルをまたぐ業務手順を調整し、処理の順序や条件を決めます。モデルは1つのテーブルに対応するデータと、そのデータ自身に閉じたルールを持ちます。この分担により、業務ロジックをHTTPから切り離してテスト・再利用でき、どこに何があるかが明確になります。",
          interviewPhrase:
            "「コントローラはHTTP、サービスは業務手順、モデルは自テーブルのデータ、と責務を分けます。業務手順をサービスに集約すると再利用とテストがしやすくなります」",
          keywords: ["HTTP", "業務手順", "モデル", "責務分担"],
        },
      ],
    },

    // =====================================================================
    // Lesson 3: トランザクション
    // =====================================================================
    {
      id: "day6-lesson3",
      slug: "transaction",
      title: "トランザクション — 複数の更新を全部成功か全部失敗に",
      summary: "ACIDの考え方と、DB::transactionで整合性を守るべき場面。",
      blocks: [
        { type: "heading", text: "なぜトランザクションが必要か" },
        {
          type: "paragraph",
          text: "前の注文処理では『在庫を減らす』『注文を作る』『ポイントを付ける』と、複数のテーブルを続けて更新しました。もし在庫を減らした直後に例外が起きて処理が止まったら、在庫は減ったのに注文が作られない、という矛盾した状態が残ります。",
        },
        {
          type: "paragraph",
          text: "[[transaction]] とは、こうした複数の更新を『ひとかたまり』として扱い、全部成功したときだけ確定(コミット)し、途中で失敗したら全部なかったことにする(ロールバック)仕組みです。中途半端な状態を残さないのが目的です。",
        },
        { type: "heading", text: "ACID — トランザクションが守る4性質" },
        {
          type: "list",
          items: [
            "Atomicity(原子性): 全部成功か、全部失敗か。中途半端がない。",
            "Consistency(一貫性): 実行の前後でDBの整合性ルールが保たれる。",
            "Isolation(独立性): 同時に走る他のトランザクションから干渉されない。",
            "Durability(永続性): コミットした結果は障害が起きても失われない。",
          ],
        },
        {
          type: "paragraph",
          text: "この4性質をまとめて [[acid]] と呼びます。面接では特に原子性(全部成功か全部失敗か)を説明できると強いです。",
        },
        { type: "heading", text: "Laravelでの書き方" },
        {
          type: "code",
          language: "php",
          caption: "DB::transaction のクロージャ内で例外が起きると自動ロールバック",
          code: `use Illuminate\\Support\\Facades\\DB;

public function place(User $user, array $data): Order
{
    return DB::transaction(function () use ($user, $data) {
        $product = Product::findOrFail($data['product_id']);

        if ($product->stock < $data['quantity']) {
            // 例外を投げると、それまでの更新はすべて取り消される
            throw new OutOfStockException();
        }

        $product->decrement('stock', $data['quantity']);

        $order = Order::create([
            'user_id'    => $user->id,
            'product_id' => $product->id,
            'quantity'   => $data['quantity'],
        ]);

        $user->increment('points', 10);

        // ここまで例外なく到達すれば、まとめてコミットされる
        return $order;
    });
}`,
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜクロージャで囲むだけで安全になるのか",
          text: "DB::transaction は、クロージャ内で例外が投げられると自動でロールバックし、最後まで到達すれば自動でコミットします。開発者が begin / commit / rollback を手書きすると、ロールバックの書き忘れで矛盾が残ります。囲むだけで『全部か無か』を保証できるので、事故を仕組みで防げます。",
        },
        { type: "heading", text: "どんな場面で使うか" },
        {
          type: "list",
          items: [
            "口座間の送金: Aから引いてBへ足す。片方だけ成功したら残高が壊れる。",
            "在庫を減らして注文を作る: 片方だけだと在庫と注文が食い違う。",
            "親レコードと複数の子レコードを一括登録: 途中で失敗したら親だけ残る。",
          ],
        },
        {
          type: "callout",
          variant: "warn",
          title: "何でも囲めばいいわけではない",
          text: "トランザクション中はロックを保持するため、長時間の外部API呼び出しやメール送信をトランザクション内に入れると、他の処理を待たせて性能を落とします。DBの整合性に関わる更新だけを囲み、メール送信などはコミット後に回すのが定石です。",
        },
        {
          type: "callout",
          variant: "interview",
          title: "面接ではこう言う",
          text: "「複数テーブルの更新で整合性が崩れると困る場面では、トランザクションで囲みます。要は全部成功か全部失敗かという原子性を保証したいからです。LaravelではDB::transactionのクロージャ内で例外が出れば自動ロールバックされます。ただしメール送信のような外部処理はロックを長引かせるのでコミット後に回します」",
        },
      ],
      questions: [
        {
          id: "day6-lesson3-q1",
          type: "choice",
          question: "ACIDの「原子性(Atomicity)」が意味することは?",
          choices: [
            "データが暗号化されること",
            "一連の更新が全部成功するか、全部失敗するかのどちらかになること",
            "処理が並列で高速に走ること",
            "テーブルが自動的に分割されること",
          ],
          answerIndex: 1,
          explanation:
            "原子性は『全部成功か、全部失敗か』を保証する性質です。途中で失敗すればすべて取り消され、中途半端な状態を残しません。",
        },
        {
          id: "day6-lesson3-q2",
          type: "free",
          question: "口座間の送金を例に、なぜトランザクションが必要か説明してください。",
          modelAnswer:
            "送金はA口座から引いてB口座へ足す、2つの更新から成ります。もしAから引いた直後に障害が起きて処理が止まると、お金が消えて総額が合わなくなります。トランザクションで両方をひとかたまりにすれば、片方だけ成功することがなくなり、全部成功したときだけ確定します。途中で失敗すれば両方取り消され、残高の整合性が保たれます。これが原子性の効果です。",
          interviewPhrase:
            "「送金のように複数の更新が食い違うと困る処理はトランザクションで囲みます。全部成功か全部失敗かを保証して、中途半端な状態を残さないためです」",
          keywords: ["原子性", "全部成功か全部失敗", "整合性", "ロールバック"],
        },
      ],
    },

    // =====================================================================
    // Lesson 4: 排他制御
    // =====================================================================
    {
      id: "day6-lesson4",
      slug: "locking",
      title: "排他制御 — 同時アクセスの競合を防ぐ",
      summary: "悲観ロックと楽観ロックの仕組みと使い分け。在庫・残高の競合で理解する。",
      blocks: [
        { type: "heading", text: "何が問題なのか — 競合状態" },
        {
          type: "paragraph",
          text: "在庫が1個の商品を、2人がほぼ同時に注文したとします。両方の処理が『在庫は1個ある』と読み取り、両方が『在庫を0にして注文を作る』と進むと、在庫1個に対して2件の注文が成立してしまいます。トランザクションだけでは、この『同時に読んで同時に書く』競合は防ぎきれません。",
        },
        {
          type: "paragraph",
          text: "排他制御は、こうした同時アクセスによるデータ競合を防ぐ仕組みです。代表的な方法が [[pessimistic-lock]](悲観ロック)と [[optimistic-lock]](楽観ロック)です。",
        },
        { type: "heading", text: "悲観ロック — 先に読んだ人が鍵をかける" },
        {
          type: "paragraph",
          text: "悲観ロックは『競合はよく起きる』と悲観的に考え、対象の行を読む時点でロックをかけ、他の処理を待たせる方式です。Laravelでは「lockForUpdate()」でその行に更新用ロックをかけます。",
        },
        {
          type: "code",
          language: "php",
          caption: "lockForUpdate() で在庫行をロックして競合を防ぐ",
          code: `DB::transaction(function () use ($productId, $qty) {
    // この行にロックをかける。同じ行を触る他の処理はここで待たされる
    $product = Product::where('id', $productId)
        ->lockForUpdate()
        ->first();

    if ($product->stock < $qty) {
        throw new OutOfStockException();
    }

    $product->decrement('stock', $qty);
    // トランザクションのコミットでロックが解放される
});`,
        },
        {
          type: "callout",
          variant: "warn",
          title: "悲観ロックの注意点",
          text: "他の処理を待たせるため、ロックを長く保持すると全体の処理が詰まります。またロックの取得順序が処理ごとにばらばらだと、互いに待ち合ってデッドロックになることがあります。ロック区間は短く、順序を揃えるのが原則です。",
        },
        { type: "heading", text: "楽観ロック — 更新時にバージョンで衝突を検知する" },
        {
          type: "paragraph",
          text: "楽観ロックは『競合はめったに起きない』と楽観的に考え、ロックはかけません。代わりにテーブルに「version」カラムを持たせ、更新時に『自分が読んだときのバージョンのままか』を条件にします。もし他の人が先に更新してバージョンが変わっていたら、自分の更新は0件になり、衝突を検知できます。",
        },
        {
          type: "code",
          language: "php",
          caption: "version カラムで衝突を検知する楽観ロック",
          code: `// 読み込み時に version も取得しておく(例: version = 5)
$product = Product::find($productId);
$currentVersion = $product->version;

// 更新は「読んだときの version と一致する行」だけを対象にする
$updated = Product::where('id', $productId)
    ->where('version', $currentVersion)
    ->update([
        'stock'   => $product->stock - $qty,
        'version' => $currentVersion + 1,
    ]);

if ($updated === 0) {
    // 0件 = 誰かが先に更新して version が変わっていた
    throw new ConflictException('他の操作と競合しました。やり直してください。');
}`,
        },
        { type: "heading", text: "どう使い分けるか" },
        {
          type: "compare",
          bad: {
            label: "悲観ロックが向く場面",
            text: "競合が頻繁に起きる/絶対に取りこぼせない場面。例: 残りわずかな在庫の取り合い、口座残高の更新。確実だが待ちが発生する。",
          },
          good: {
            label: "楽観ロックが向く場面",
            text: "競合がまれな場面。例: 管理画面での商品情報の編集、プロフィール更新。ロックしないので速いが、衝突時はやり直しが必要。",
          },
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ二種類を使い分けるのか",
          text: "悲観ロックは確実ですが他を待たせるため、競合がまれな場面で使うと無駄に遅くなります。楽観ロックは速いですが、衝突が多い場面ではやり直しが頻発して逆に非効率です。つまり『競合の起きやすさ』でコストの安い方を選ぶ、というトレードオフの判断になります。",
        },
        {
          type: "callout",
          variant: "info",
          title: "二重登録の防止とも関係する",
          text: "送信ボタンの連打で同じ注文が2件登録される問題も競合の一種です。ユニーク制約や [[idempotency]](冪等性)を組み合わせ、『同じリクエストが2回来ても結果は1回分』にする設計と併せて考えると堅牢になります。",
        },
        {
          type: "callout",
          variant: "interview",
          title: "面接ではこう言う",
          text: "「在庫や残高のように同時更新で競合する場面では排他制御を使います。競合が頻繁なら悲観ロックでlockForUpdate、まれなら楽観ロックでversionカラムを使う、と競合の起きやすさで選びます。悲観ロックは確実だが待ちが出る、楽観ロックは速いが衝突時にやり直す、というトレードオフで判断していると説明します」",
        },
      ],
      questions: [
        {
          id: "day6-lesson4-q1",
          type: "choice",
          question: "悲観ロック(lockForUpdate)の特徴として正しいものは?",
          choices: [
            "ロックをかけず、更新時にバージョンで衝突を検知する",
            "対象の行にロックをかけ、他の処理を待たせて確実に競合を防ぐ",
            "競合がまれな場面に最も適している",
            "データを暗号化して守る仕組みである",
          ],
          answerIndex: 1,
          explanation:
            "悲観ロックは読む時点で行にロックをかけ、他を待たせて確実に競合を防ぎます。バージョンで検知するのは楽観ロックです。悲観ロックは競合が頻繁な場面に向きます。",
        },
        {
          id: "day6-lesson4-q2",
          type: "choice",
          question: "楽観ロックで「versionカラム」を使う目的は?",
          choices: [
            "更新を高速化するため",
            "自分が読んだ後に他の人が更新していないかを、更新時に検知するため",
            "行に物理的なロックをかけるため",
            "データのバックアップを取るため",
          ],
          answerIndex: 1,
          explanation:
            "楽観ロックはロックをかけず、読んだときのversionを条件に更新します。versionが変わっていれば更新が0件になり、他の人が先に更新した衝突を検知できます。",
        },
        {
          id: "day6-lesson4-q3",
          type: "free",
          question: "悲観ロックと楽観ロックをどう使い分けますか。在庫の例で説明してください。",
          modelAnswer:
            "競合の起きやすさで選びます。残りわずかな在庫の取り合いのように競合が頻繁で取りこぼせない場面では、悲観ロック(lockForUpdate)で行をロックし、他の処理を待たせて確実に防ぎます。一方、めったに競合しない編集画面のような場面では、楽観ロックでversionカラムを使い、更新時に衝突を検知してやり直させます。悲観ロックは確実だが待ちが出る、楽観ロックは速いが衝突時にやり直しが要る、というトレードオフで判断します。",
          interviewPhrase:
            "「競合が頻繁なら悲観ロック、まれなら楽観ロック、と競合の起きやすさで選びます。確実さと速度のトレードオフで判断していると説明します」",
          keywords: ["競合の頻度", "lockForUpdate", "version", "トレードオフ"],
        },
      ],
    },
  ],
};
