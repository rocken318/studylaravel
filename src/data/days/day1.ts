import type { Day } from "@/types";

export const day1: Day = {
  day: 1,
  slug: "day1",
  title: "MVCとリクエストライフサイクル、Laravelを選ぶ理由",
  goal: "「なぜフレームワークを使うのか」「MVCとは何か」「リクエストがどうレスポンスになるか」「なぜLaravelなのか」を、未経験者にも自分の言葉で説明できるようになる。",
  lessons: [
    // ================================================================
    // Lesson 1: なぜフレームワークを使うのか
    // ================================================================
    {
      id: "day1-lesson1",
      slug: "why-framework",
      title: "なぜフレームワークを使うのか",
      summary: "素のPHPで大規模開発をするときの課題と、フレームワークが解決するものを理解する。",
      blocks: [
        {
          type: "heading",
          text: "そもそもフレームワークとは何か",
        },
        {
          type: "paragraph",
          text: "フレームワークとは、Webアプリケーションを作るときに「ほぼ毎回必要になる共通の仕組み」を、あらかじめ用意してくれている土台のことです。たとえば「URLに応じて処理を振り分ける」「データベースに接続する」「安全にフォームの値を受け取る」といった作業は、どんなアプリでも必要になります。これらを毎回ゼロから書くのではなく、実績のある共通部品として提供してくれるのがフレームワークです。",
        },
        {
          type: "paragraph",
          text: "PHPは「素のまま」でもWebアプリを書けます。しかし規模が大きくなると、素のPHPだけで書き続けることには深刻な課題が出てきます。まずは、フレームワークを使わないコードがどう破綻していくのかを見てみましょう。",
        },
        {
          type: "heading",
          text: "素のPHPの何が問題なのか",
        },
        {
          type: "paragraph",
          text: "素のPHPでは、1つのファイルの中に「URLの判定」「入力値の受け取り」「データベース操作」「HTMLの出力」がすべて混ざりがちです。小さいうちは動きますが、機能が増えるほど、どこに何が書いてあるか分からなくなり、修正が別の場所を壊すようになります。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n// user.php — 素のPHPでよくある「全部入り」ファイル\n\n$conn = new mysqli(\"localhost\", \"root\", \"pass\", \"app\");\n\n// URLの ?id= を直接SQLに埋め込んでいる(SQLインジェクションの危険)\n$id = $_GET[\"id\"];\n$result = $conn->query(\"SELECT * FROM users WHERE id = \" . $id);\n$user = $result->fetch_assoc();\n?>\n<html>\n<body>\n  <!-- ユーザー名をそのまま出力(XSSの危険) -->\n  <h1>ようこそ <?php echo $user[\"name\"]; ?> さん</h1>\n</body>\n</html>",
          caption: "URL判定・DB接続・SQL・HTML出力が1ファイルに同居している例。しかもセキュリティ的に危険。",
        },
        {
          type: "callout",
          variant: "warn",
          title: "このコードの危険な点",
          text: "$_GET の値をそのままSQLに埋め込むとSQLインジェクション、そのままHTMLに出力するとXSSという攻撃を許してしまいます。素のPHPでは開発者が毎回、自力で対策を書かないと安全になりません。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜフレームワークを使うのか",
          text: "フレームワークを使う本質的な理由は「楽をするため」ではなく「アプリを安全に、そしてチームで長く保守できる形に保つため」です。セキュリティ対策や共通処理を各自の自己流に任せると、品質は書いた人の力量に依存してバラバラになります。フレームワークは、安全で保守しやすい書き方を最初から標準として強制することで、この品質のばらつきをなくします。",
        },
        {
          type: "paragraph",
          text: "さらに重要なのが「規約(コンベンション)」です。フレームワークには「こういう処理はこのフォルダに、こういう名前で書く」というルールがあります。これにより、初めてそのプロジェクトを見た人でも「ログイン処理ならこの辺にあるはずだ」と見当をつけられます。これがチーム開発における共通言語になります。",
        },
        {
          type: "compare",
          bad: {
            label: "素のPHP(自己流)",
            text: "人によってファイルの置き場所も命名もバラバラ。DB接続やセキュリティ対策も各自が毎回書く。新メンバーはコードを全部読まないと構造が分からない。",
          },
          good: {
            label: "フレームワーク(規約あり)",
            text: "置き場所と命名がルールで決まっている。DB接続やセキュリティ対策は共通部品が担う。新メンバーも規約を知っていれば即座に構造を把握できる。",
          },
        },
        {
          type: "list",
          ordered: false,
          items: [
            "共通処理(ルーティング、DB接続、セキュリティ)を毎回書かなくてよい",
            "安全な書き方が標準として強制され、品質のばらつきが減る",
            "規約により、どこに何を書くかがチームで統一される",
            "実績あるコードを土台にするため、車輪の再発明を避けられる",
          ],
        },
        {
          type: "callout",
          variant: "interview",
          title: "実務ではこう説明する",
          text: "「フレームワークを使う理由は、開発を速くするためだけではありません。セキュリティ対策や共通処理を標準化し、規約でコードの構造を統一することで、チームで長く保守できる品質を担保するためだと考えています」と、保守性とチーム開発の観点で答えると評価されます。",
        },
      ],
      questions: [
        {
          id: "day1-lesson1-q1",
          type: "choice",
          question: "フレームワークを使う「最も本質的な」利点として、実務で最も評価されやすい説明はどれか。",
          choices: [
            "コードを書く量が減って楽になるから",
            "安全性と保守性を標準化し、チームで品質を統一できるから",
            "処理速度が必ず速くなるから",
            "有名だから使っておくと安心だから",
          ],
          answerIndex: 1,
          explanation: "「楽になる」は結果の一部にすぎません。フレームワークの本質は、セキュリティや共通処理を標準化し、規約でチーム全体の品質を揃える点にあります。速度は必ずしも速くなるわけではなく、むしろ設計を優先する分オーバーヘッドが増えることもあります。",
        },
        {
          id: "day1-lesson1-q2",
          type: "free",
          question: "素のPHPで大規模開発を続けると、どんな課題が出るか。具体的に説明してください。",
          modelAnswer: "素のPHPでは、URL判定・入力受け取り・DB操作・HTML出力が1ファイルに混ざりやすく、機能が増えるほど構造が把握しづらくなります。またSQLインジェクションやXSSといったセキュリティ対策を各自が毎回自力で書く必要があり、対策漏れが起きやすくなります。さらに、ファイルの置き場所や命名に共通ルールがないため、チームで書き方がバラバラになり、保守コストが上がります。",
          interviewPhrase: "「素のPHPは小規模なら動きますが、規模が大きくなると責務が混在し、セキュリティ対策も属人的になり、チームで書き方が揃わないという課題があります。だからフレームワークで規約と共通処理を標準化します」",
          keywords: ["責務の混在", "セキュリティ", "属人化", "規約", "保守性"],
        },
      ],
    },

    // ================================================================
    // Lesson 2: MVCとは何か
    // ================================================================
    {
      id: "day1-lesson2",
      slug: "mvc",
      title: "MVCとは何か、各層の責務",
      summary: "Model・View・Controllerがそれぞれ何を担当するのか、なぜ分けるのかを理解する。",
      blocks: [
        {
          type: "heading",
          text: "MVCは「役割分担」の設計",
        },
        {
          type: "paragraph",
          text: "[[mvc]] とは、アプリのコードを「Model(モデル)」「View(ビュー)」「Controller(コントローラ)」という3つの役割に分けて整理する設計パターンです。前のレッスンで見た「全部が1ファイルに混ざった状態」を、役割ごとにきれいに分ける考え方だと思ってください。",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Model(モデル): データとビジネスルールを担当。DBとのやり取りや「1件いくら」といった業務ロジックを持つ。",
            "View(ビュー): 見た目を担当。受け取ったデータをHTMLとして表示する。Laravelでは [[blade]] というテンプレートを使う。",
            "Controller(コントローラ): 司令塔。リクエストを受け取り、Modelにデータを取りに行かせ、その結果をViewに渡す。",
          ],
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ3つに分けるのか",
          text: "分ける理由は「変更の影響範囲を閉じ込めるため」です。たとえば見た目だけ変えたいときはViewだけ触れば済み、データの取り方を変えたいときはModelだけ触れば済みます。役割が混ざっていると、見た目を変えるつもりが業務ロジックまで壊す、といった事故が起きます。責務を分けることで、変更に強く、テストしやすいコードになります。",
        },
        {
          type: "heading",
          text: "各層のコードイメージ",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n// Controller: 司令塔。自分では重い処理をしない\nnamespace App\\Http\\Controllers;\n\nuse App\\Models\\User;\n\nclass UserController extends Controller\n{\n    public function show(int $id)\n    {\n        // Modelにデータ取得を依頼する\n        $user = User::findOrFail($id);\n\n        // Viewにデータを渡して表示を任せる\n        return view(\"users.show\", [\"user\" => $user]);\n    }\n}",
          caption: "Controllerは「受け取って、頼んで、渡す」だけ。処理の中身はModelとViewに任せる。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n// Model: データと業務ルールを持つ\nnamespace App\\Models;\n\nuse Illuminate\\Database\\Eloquent\\Model;\n\nclass User extends Model\n{\n    // 業務ルールの例: プレミアム会員かどうかの判定はModelの責務\n    public function isPremium(): bool\n    {\n        return $this->plan === \"premium\";\n    }\n}",
          caption: "「プレミアム会員か」という業務判断はModelが持つ。Controllerに書くと再利用できず散らばる。",
        },
        {
          type: "code",
          language: "blade",
          code: "{{-- View (resources/views/users/show.blade.php): 表示だけを担当 --}}\n<h1>{{ $user->name }} さんのプロフィール</h1>\n\n@if ($user->isPremium())\n  <span class=\"badge\">プレミアム会員</span>\n@endif",
          caption: "Viewは渡されたデータを表示するだけ。{{ }} は自動でエスケープされXSSを防ぐ。",
        },
        {
          type: "callout",
          variant: "warn",
          title: "よくあるアンチパターン: ファットコントローラ",
          text: "本来Modelに置くべき業務ロジックやDB操作をControllerに書き続けると、Controllerが肥大化します。これを [[fat-controller]](ファットコントローラ)と呼び、テストしにくく再利用もできない典型的なアンチパターンです。",
        },
        {
          type: "compare",
          bad: {
            label: "悪い例: ロジックをControllerに直書き",
            language: "php",
            code: "public function show(int $id)\n{\n    $user = User::find($id);\n    // 業務判断をControllerに書いてしまっている\n    if ($user->plan === \"premium\" && $user->paid_until > now()) {\n        $badge = \"プレミアム\";\n    }\n    return view(\"users.show\", compact(\"user\", \"badge\"));\n}",
          },
          good: {
            label: "良い例: 業務判断はModelに寄せる",
            language: "php",
            code: "public function show(int $id)\n{\n    $user = User::findOrFail($id);\n    // 判断はModelのメソッドに任せる\n    return view(\"users.show\", [\"user\" => $user]);\n}\n// Model側に isPremium() を持たせ、Viewから $user->isPremium() を呼ぶ",
          },
        },
        {
          type: "callout",
          variant: "interview",
          title: "実務ではこう説明する",
          text: "「MVCは役割分担の設計で、Modelがデータと業務ルール、Viewが表示、Controllerが両者をつなぐ司令塔です。分ける目的は変更の影響範囲を閉じ込め、テストしやすくすることです。業務ロジックをControllerに書くとファットコントローラになるので、Modelやサービス層に寄せるよう意識しています」と言えると、設計を理解していると伝わります。",
        },
      ],
      questions: [
        {
          id: "day1-lesson2-q1",
          type: "choice",
          question: "「ユーザーがプレミアム会員かどうかを判定する」ロジックは、MVCのどこに置くのが適切か。",
          choices: [
            "View(表示のついでに判定する)",
            "Controller(司令塔なので何でも書く)",
            "Model(データと業務ルールを持つ層)",
            "ルート定義ファイル",
          ],
          answerIndex: 2,
          explanation: "「プレミアム会員か」という判断は業務ルールなので、データと業務ルールを持つModelの責務です。Controllerに書くと再利用できず、複数箇所に同じ判定が散らばって [[fat-controller]] の原因になります。",
        },
        {
          id: "day1-lesson2-q2",
          type: "choice",
          question: "MVCで責務を分ける「最大の目的」はどれか。",
          choices: [
            "ファイル数を増やして高度に見せるため",
            "変更の影響範囲を閉じ込め、テストしやすくするため",
            "処理速度を上げるため",
            "Laravelの決まりだから従うだけ",
          ],
          answerIndex: 1,
          explanation: "責務分離の目的は、見た目・データ・制御の変更が互いに波及しないよう影響範囲を閉じ込めることです。これにより変更に強く、各層を単体でテストしやすくなります。",
        },
        {
          id: "day1-lesson2-q3",
          type: "free",
          question: "Model・View・Controllerそれぞれの責務を、一言ずつで説明してください。",
          modelAnswer: "Modelはデータとビジネスルールを担当し、DBとのやり取りや業務判断を持ちます。Viewは見た目を担当し、渡されたデータをHTMLとして表示します。Controllerは司令塔で、リクエストを受け取り、Modelにデータ取得を依頼し、その結果をViewに渡します。Controller自身は重い処理を持たず、調整役に徹するのが理想です。",
          interviewPhrase: "「Modelはデータと業務ルール、Viewは表示、Controllerは両者をつなぐ司令塔です。Controllerを薄く保ち、業務ロジックはModelやサービス層に寄せることを意識しています」",
          keywords: ["データ", "業務ルール", "表示", "司令塔", "薄いController"],
        },
      ],
    },

    // ================================================================
    // Lesson 3: リクエストライフサイクル
    // ================================================================
    {
      id: "day1-lesson3",
      slug: "request-lifecycle",
      title: "リクエストがレスポンスになるまで",
      summary: "ブラウザのリクエストが、ルーティング→ミドルウェア→コントローラ→ビューを通ってレスポンスになる流れを理解する。",
      blocks: [
        {
          type: "heading",
          text: "1本の道として理解する",
        },
        {
          type: "paragraph",
          text: "[[request-lifecycle]](リクエストライフサイクル)とは、ブラウザからのリクエストが、どんな順番で処理されて最終的にレスポンス(HTMLなど)になるかという「1本の道」のことです。この流れを理解しておくと、不具合が起きたときに「どの段階で問題が起きたか」を切り分けられるようになります。",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "ブラウザがURLにリクエストを送る(例: GET /users/1)",
            "ルーティングが「そのURLはどの処理か」を判定する",
            "ミドルウェアが前処理を行う(ログイン確認など)",
            "コントローラが処理の中身を実行する(Modelでデータ取得)",
            "ビューがデータをHTMLに組み立てる",
            "ミドルウェアが後処理を行い、レスポンスがブラウザに返る",
          ],
        },
        {
          type: "heading",
          text: "ルーティング: URLと処理の対応表",
        },
        {
          type: "paragraph",
          text: "ルーティングは「このURLに来たら、この処理を呼ぶ」という対応表です。Laravelでは routes フォルダにルートを定義します。ここで初めて、URLとControllerのメソッドが結び付きます。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n// routes/web.php — URLと処理の対応表\nuse App\\Http\\Controllers\\UserController;\nuse Illuminate\\Support\\Facades\\Route;\n\n// GET /users/1 が来たら UserController の show を呼ぶ\nRoute::get(\"/users/{id}\", [UserController::class, \"show\"]);",
          caption: "URL /users/{id} と UserController::show を結び付けている。{id} は動的な値。",
        },
        {
          type: "heading",
          text: "ミドルウェア: 処理の前後に挟む関所",
        },
        {
          type: "paragraph",
          text: "[[middleware]](ミドルウェア)は、コントローラにたどり着く前後に挟む「関所」です。たとえば「ログインしていない人は追い返す」「全リクエストをログに残す」といった共通の前処理・後処理をここで行います。各Controllerに同じチェックを書かずに済むのが利点です。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n// ログイン必須の関所を通してから処理する例\nRoute::get(\"/mypage\", [MyPageController::class, \"index\"])\n    ->middleware(\"auth\"); // 未ログインならログイン画面へリダイレクト",
          caption: "auth ミドルウェアが「関所」となり、ログイン済みの人だけをControllerに通す。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜミドルウェアで共通処理を挟むのか",
          text: "ログイン確認のような共通チェックを各Controllerに毎回書くと、書き忘れが必ず発生します。書き忘れれば、その画面だけ認証が抜けるという重大なセキュリティ事故につながります。ミドルウェアとしてルートにまとめて適用すれば、チェックが一箇所に集約され、抜け漏れを防げます。「横断的な関心事は一箇所にまとめる」という考え方です。",
        },
        {
          type: "callout",
          variant: "info",
          title: "補足: 「道の途中」で何が起きるか",
          text: "リクエストは行きにミドルウェアを通ってControllerに入り、帰りにもう一度ミドルウェアを通ってブラウザに戻ります。行きで認証、帰りでレスポンスヘッダー追加、といった前後の処理を1つのミドルウェアに書けるのはこのためです。",
        },
        {
          type: "callout",
          variant: "interview",
          title: "実務ではこう説明する",
          text: "「リクエストはルーティングでURLと処理が対応づけられ、ミドルウェアで認証などの共通前処理を通り、コントローラが処理を実行し、ビューがHTMLを組み立てて返る、という流れで処理されます。この流れを把握しているので、不具合が起きたときにどの段階が原因かを切り分けられます」と、トラブルシュートに結びつけて話すと実務力が伝わります。",
        },
      ],
      questions: [
        {
          id: "day1-lesson3-q1",
          type: "choice",
          question: "「ログインしていないユーザーを、コントローラに到達する前に追い返したい」。この処理を書く最も適切な場所はどこか。",
          choices: [
            "各コントローラのメソッドの先頭に毎回書く",
            "ミドルウェア(ルートに適用する関所)",
            "ビューのHTML内",
            "ルート定義のURL文字列",
          ],
          answerIndex: 1,
          explanation: "認証確認は複数の画面に共通する横断的な処理です。各Controllerに書くと書き忘れによる認証漏れが起きます。[[middleware]] にまとめて適用することで、チェックを一箇所に集約し、抜け漏れを防げます。",
        },
        {
          id: "day1-lesson3-q2",
          type: "free",
          question: "リクエストがレスポンスになるまでの流れを、ルーティング・ミドルウェア・コントローラ・ビューという語を使って説明してください。",
          modelAnswer: "まずルーティングが、来たURLをどの処理に対応させるかを判定します。次にミドルウェアが、認証確認やログ記録といった共通の前処理を行う関所を通します。関所を通過するとコントローラが呼ばれ、Modelを使ってデータを取得するなど処理の中身を実行します。その結果をビューに渡してHTMLを組み立て、最後にミドルウェアの後処理を経てレスポンスがブラウザに返ります。",
          interviewPhrase: "「ルーティングでURLと処理を対応づけ、ミドルウェアで認証などの共通前処理を通し、コントローラが処理を実行、ビューがHTMLを生成して返す、という一本道で理解しています。だからバグの切り分けもこの順で考えられます」",
          keywords: ["ルーティング", "ミドルウェア", "コントローラ", "ビュー", "順番"],
        },
      ],
    },

    // ================================================================
    // Lesson 4: なぜLaravelを選ぶのか
    // ================================================================
    {
      id: "day1-lesson4",
      slug: "why-laravel",
      title: "数あるフレームワークからLaravelを選ぶ理由",
      summary: "エコシステム、規約、Eloquent、Artisanなど、Laravelが選ばれる具体的な理由を説明できるようにする。",
      blocks: [
        {
          type: "heading",
          text: "PHPフレームワークは1つではない",
        },
        {
          type: "paragraph",
          text: "PHPのフレームワークにはLaravel以外にもSymfonyやCakePHPなどがあります。その中でLaravelが特に広く選ばれているのには、明確な理由があります。「有名だから」で終わらせず、何が優れているのかを自分の言葉で説明できるようにしておきましょう。",
        },
        {
          type: "heading",
          text: "理由1: 開発体験とエコシステムの充実",
        },
        {
          type: "paragraph",
          text: "Laravelは認証、メール送信、ジョブ処理、テストなど、実務で必要になる機能が最初から揃っています。さらに公式・準公式のツールやライブラリ(エコシステム)が豊富で、多くの課題に対して「Laravel流の定番のやり方」が用意されています。これにより、技術選定で迷う時間が減り、チームで知見も共有しやすくなります。",
        },
        {
          type: "heading",
          text: "理由2: 規約と読みやすい書き方",
        },
        {
          type: "paragraph",
          text: "Laravelは「設定より規約(Convention over Configuration)」を重視します。細かい設定を書かなくても、命名やフォルダ配置の規約に従えば自動でつながる仕組みが多く、コードが簡潔になります。書き方も直感的で、初学者でも読み解きやすいのが特徴です。",
        },
        {
          type: "heading",
          text: "「設定より規約」をもう少し具体的に",
        },
        {
          type: "paragraph",
          text: "[[convention-over-configuration]] とは、フレームワークが決めた「お約束」に従って名前を付けたりファイルを置いたりすれば、細かい設定を書かなくても各部品が自動でつながる、という考え方です。たとえば User という名前のModelを作ると、Laravelは何も設定しなくても users という複数形のテーブルに対応づけてくれます。規約を守るだけで設定ファイルが減り、しかもチームの誰が書いても同じ形になるので、読みやすく保守もしやすくなります。",
        },
        {
          type: "compare",
          bad: {
            label: "規約がない世界: 対応を毎回自分で設定",
            language: "php",
            text: "「このModelはこのテーブル」「このControllerはこのURL」と、対応関係を1つずつ設定ファイルに書く必要があり、記述量が増え書き間違いも起きやすい。",
          },
          good: {
            label: "設定より規約: 命名だけで自動で対応",
            language: "php",
            code: "// 規約に従って名前を付けるだけ\n// User モデル → users テーブルに自動対応\nclass User extends Model {}\n\n// $user->name などがそのまま使える(設定不要)",
          },
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ規約に従うと楽になるのか",
          text: "規約に従うと「どこに何を書くか」で迷う時間が減り、設定ファイルの記述も省けます。さらに、他の人のLaravelプロジェクトを開いても置き場所や命名が同じなので、初めて見るコードでも読み解きやすくなります。逆に規約から外れた命名をすると自動連携が効かなくなり、手動で設定を足す手間が生まれます。まずは「規約に乗る」のが得だと覚えておきましょう。",
        },
        {
          type: "heading",
          text: "理由3: Eloquent(直感的なDB操作)",
        },
        {
          type: "paragraph",
          text: "[[eloquent]] はLaravelの [[orm]](オブジェクト関係マッピング)で、SQLを直接書かなくても、PHPのオブジェクト操作としてデータベースを扱えます。1つのテーブルが1つのModelクラスに対応する [[active-record]] という考え方に基づいており、コードが読みやすくなります。",
        },
        {
          type: "compare",
          bad: {
            label: "素のPHP: SQLを直書き",
            language: "php",
            code: "$id = (int) $_GET[\"id\"];\n$result = $conn->query(\n    \"SELECT * FROM users WHERE id = \" . $id\n);\n$user = $result->fetch_assoc();\necho $user[\"name\"];",
          },
          good: {
            label: "Eloquent: オブジェクトとして扱う",
            language: "php",
            code: "// SQLを書かず、値も安全にバインドされる\n$user = User::findOrFail($id);\necho $user->name;",
          },
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜEloquentが好まれるのか",
          text: "Eloquentが好まれるのは「短く書けるから」だけではありません。値が自動的に安全にバインドされSQLインジェクションを防げること、テーブルの関連(ユーザーと投稿など)を直感的にたどれること、そしてコードがSQLよりも業務の意図を表しやすいことが理由です。ただし便利さの裏で [[eloquent]] は N+1問題 のような性能上の落とし穴もあり、そこを理解して使うことが実務では重要です。",
        },
        {
          type: "heading",
          text: "理由4: Artisan(定型作業の自動化)",
        },
        {
          type: "paragraph",
          text: "[[artisan]] はLaravel付属のコマンドラインツールです。Controllerやモデルの雛形生成、DBの [[migration]] 実行など、定型作業をコマンド一発で行えます。手作業で作らないことで、命名や配置の規約が自動的に守られるのが大きな利点です。",
        },
        {
          type: "code",
          language: "bash",
          code: "# Controllerの雛形を規約通りに生成する\nphp artisan make:controller UserController\n\n# Modelとマイグレーションを同時に作る\nphp artisan make:model Post -m",
          caption: "Artisanで生成すれば、置き場所も命名も規約通りになり、人による揺れがなくなる。",
        },
        {
          type: "callout",
          variant: "interview",
          title: "実務ではこう説明する",
          text: "「Laravelを選ぶ理由は、認証などの実務機能とエコシステムが揃っていること、設定より規約でコードが統一されること、EloquentでDB操作が安全かつ直感的になること、Artisanで定型作業と規約遵守が自動化されることです。単に人気だからではなく、チーム開発の生産性と保守性が高い点を評価しています」と、複数の観点を挙げて答えると説得力が出ます。",
        },
      ],
      questions: [
        {
          id: "day1-lesson4-q1",
          type: "choice",
          question: "「Laravelを選ぶ理由は?」と聞かれたとき、最も評価されにくい答えはどれか。",
          choices: [
            "エコシステムが充実し、実務機能が最初から揃っているから",
            "規約でコードが統一され、チームで保守しやすいから",
            "有名で人気だから安心して使えるから",
            "EloquentやArtisanで安全性と生産性が高いから",
          ],
          answerIndex: 2,
          explanation: "「有名だから」は理由になっておらず、技術を主体的に選べていない印象を与えます。エコシステム・規約・Eloquent・Artisanといった具体的な利点を、保守性やチーム開発の観点で語ることが評価されます。",
        },
        {
          id: "day1-lesson4-q2",
          type: "choice",
          question: "Artisanコマンドでファイルを生成することの利点として最も適切なのはどれか。",
          choices: [
            "生成すると必ず処理が速くなるから",
            "置き場所や命名が規約通りになり、人による揺れがなくなるから",
            "ファイルを手で書くより行数が減るから",
            "Artisanでしか作れないファイルがあるから",
          ],
          answerIndex: 1,
          explanation: "[[artisan]] で生成する最大の利点は、フォルダ配置や命名といった規約が自動的に守られ、人による揺れがなくなることです。手作業だと配置ミスや命名の不統一が起きやすくなります。",
        },
        {
          id: "day1-lesson4-q3",
          type: "free",
          question: "EloquentはSQLを直接書くのと比べて何が良いのか。利点と注意点の両方を説明してください。",
          modelAnswer: "Eloquentの利点は、SQLを書かずにPHPのオブジェクト操作としてDBを扱えること、値が自動で安全にバインドされSQLインジェクションを防げること、テーブルの関連を直感的にたどれてコードが業務の意図を表しやすいことです。一方の注意点として、関連データを繰り返し取得する際にN+1問題という性能劣化を招きやすく、eager loadingなどで対策する必要があります。便利さの裏にある落とし穴を理解して使うことが重要です。",
          interviewPhrase: "「Eloquentは安全で読みやすくDBを扱える一方、N+1問題のような性能面の落とし穴もあるので、必要な箇所はeager loadingで対策するよう意識しています」",
          keywords: ["ORM", "安全なバインド", "関連", "N+1問題", "eager loading"],
        },
      ],
    },
  ],
};
