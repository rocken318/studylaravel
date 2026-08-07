import type { Day } from "@/types";

export const day2: Day = {
  day: 2,
  slug: "day2",
  title: "ディレクトリ構造、artisan、マイグレーションの思想",
  goal: "Laravelの主要ディレクトリの役割、Artisanとコード生成の意義、Composerによる依存管理、そしてマイグレーションで「DBをコードで版管理する」思想を説明できるようになる。",
  lessons: [
    // ================================================================
    // Lesson 1: ディレクトリ構造
    // ================================================================
    {
      id: "day2-lesson1",
      slug: "directory-structure",
      title: "主要ディレクトリの役割と「どこに何を書くか」",
      summary: "app・routes・database・configなど主要ディレクトリの役割を理解し、コードの置き場所に迷わないようにする。",
      blocks: [
        {
          type: "heading",
          text: "ディレクトリ構造は「地図」である",
        },
        {
          type: "paragraph",
          text: "Laravelプロジェクトを開くと、たくさんのフォルダが並んでいます。これは散らかっているのではなく、「どんなコードをどこに置くか」を決めた地図です。この地図を覚えておくと、初めてのプロジェクトでも「認証処理ならこの辺」「DB定義ならここ」と当たりをつけられます。まさに前日に学んだ「規約」の実体です。",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "app/ … アプリ本体のPHPコード。Model、Controller、業務ロジックなど。最もよく触る場所。",
            "routes/ … URLと処理の対応表。web.php(画面用)や api.php(API用)がある。",
            "database/ … DB関連。migrations(スキーマ定義)、seeders(初期データ)、factories(テスト用ダミー)。",
            "config/ … アプリの設定値。DB接続やメールなどの設定をまとめる。",
            "resources/ … ビューのテンプレート(views)や、コンパイル前のCSS・JS。",
            "public/ … 外部から直接アクセスされる入口。index.phpや画像などの公開ファイル。",
            "storage/ … ログ・アップロードファイル・キャッシュなど、アプリが書き出すファイル。",
            "tests/ … 自動テストのコード。",
          ],
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ置き場所を規約で決めるのか",
          text: "置き場所を規約で固定する理由は、コードの「探しやすさ」と「予測可能性」のためです。人によって置き場所がバラバラだと、目的のコードを探すのに時間がかかり、レビューもしづらくなります。規約で場所が決まっていれば、誰が書いても同じ場所に同じ種類のコードが集まり、チーム全体の認知コストが下がります。",
        },
        {
          type: "heading",
          text: "app/ の中はさらに役割で分かれる",
        },
        {
          type: "paragraph",
          text: "最もよく触る app/ の中も、役割ごとにフォルダが分かれています。Modelは app/Models、Controllerは app/Http/Controllers、ミドルウェアは app/Http/Middleware に置く、というように、Day1で学んだMVCの各層がフォルダとして表現されています。",
        },
        {
          type: "code",
          language: "bash",
          code: "# 代表的な配置(抜粋)\napp/\n  Http/\n    Controllers/   # コントローラ(司令塔)\n    Middleware/    # ミドルウェア(関所)\n    Requests/      # フォーム入力のバリデーション\n  Models/          # モデル(データと業務ルール)\n  Providers/       # アプリ起動時の初期設定\nroutes/\n  web.php          # 画面用のルート\n  api.php          # API用のルート\ndatabase/\n  migrations/      # DBスキーマの定義(版管理される)\n  seeders/         # 初期データ投入\nconfig/            # 各種設定値\nresources/views/   # Bladeテンプレート",
          caption: "MVCの各層がそのままフォルダに対応している。地図として覚えておくと迷わない。",
        },
        {
          type: "compare",
          bad: {
            label: "悪い例: 置き場所を自己流にする",
            text: "業務ロジックを resources やルートファイルに書いたり、Controllerに何でも詰め込む。規約を無視すると、他の人がコードを探せず、レビューも困難になる。",
          },
          good: {
            label: "良い例: 規約通りに配置する",
            text: "業務ロジックはModel(app/Models)やサービス層へ、入力チェックはRequestsへ、共通前処理はMiddlewareへ。役割ごとに正しい場所に置くことで、誰が見ても構造が予測できる。",
          },
        },
        {
          type: "callout",
          variant: "info",
          title: "補足: 設定は config と .env の二段構え",
          text: "接続先などの値は [[env]](.envファイル)に書き、config/ 側はその値を読み込む形にします。こうすると、パスワードなど環境ごとに違う秘密情報をコードに直接書かずに済み、本番と開発で設定を切り替えられます。",
        },
        {
          type: "callout",
          variant: "interview",
          title: "面接ではこう言う",
          text: "「Laravelのディレクトリ構造は規約で役割ごとに分かれていて、appにアプリ本体、routesにURL定義、databaseにスキーマや初期データ、configに設定を置きます。この構造のおかげで、初めてのプロジェクトでも目的のコードを予測して探せますし、チームで置き場所が揃うので保守しやすくなります」と、探しやすさと保守性の観点で説明できると良いです。",
        },
      ],
      questions: [
        {
          id: "day2-lesson1-q1",
          type: "choice",
          question: "DBのテーブル定義(スキーマ)を記述するファイルは、どのディレクトリに置くのが規約か。",
          choices: [
            "app/Http/Controllers/",
            "resources/views/",
            "database/migrations/",
            "config/",
          ],
          answerIndex: 2,
          explanation: "DBスキーマの定義は database/migrations に置くのが規約です。[[migration]] としてDB構造をコードで版管理します。configは設定値、resources/viewsは画面テンプレートの場所です。",
        },
        {
          id: "day2-lesson1-q2",
          type: "free",
          question: "Laravelがディレクトリ構造を規約で固定していることには、チーム開発上どんな意味があるか説明してください。",
          modelAnswer: "置き場所が規約で決まっていることで、どんな種類のコードがどこにあるかを誰もが予測できます。これにより、目的のコードを探す時間が減り、レビューもしやすくなります。人によって配置がバラバラだと認知コストが上がり保守が難しくなりますが、規約により全員が同じ場所に同じ種類のコードを置くため、チーム全体の生産性と保守性が上がります。",
          interviewPhrase: "「ディレクトリ構造が規約で固定されているので、初見のプロジェクトでもコードの場所を予測でき、チーム全員が同じ配置で書くため保守しやすくなります」",
          keywords: ["予測可能性", "探しやすさ", "認知コスト", "保守性", "規約"],
        },
      ],
    },

    // ================================================================
    // Lesson 2: Artisan
    // ================================================================
    {
      id: "day2-lesson2",
      slug: "artisan",
      title: "Artisanコマンドとコード生成の意義",
      summary: "Artisanが何をするツールかを理解し、手作業でなくコマンドで生成することの意義(規約の強制)を説明できるようにする。",
      blocks: [
        {
          type: "heading",
          text: "Artisanは開発を助ける「相棒コマンド」",
        },
        {
          type: "paragraph",
          text: "[[artisan]] は、Laravelに付属するコマンドラインツールです。ターミナルで「php artisan ○○」と打つことで、ファイルの雛形生成、DBの更新、キャッシュのクリアなど、開発中の定型作業をコマンド一発で実行できます。手作業で行う代わりに、決まった手順を確実に自動で行ってくれる相棒だと考えてください。",
        },
        {
          type: "code",
          language: "bash",
          code: "# 使えるコマンドの一覧を見る\nphp artisan list\n\n# Controllerの雛形を生成\nphp artisan make:controller PostController\n\n# Modelとマイグレーションをまとめて生成\nphp artisan make:model Post -m\n\n# マイグレーションを実行してDBに反映\nphp artisan migrate",
          caption: "make系は生成、migrateは実行。よく使うものから覚えていけばよい。",
        },
        {
          type: "heading",
          text: "生成されるコードは規約通りの雛形",
        },
        {
          type: "paragraph",
          text: "「php artisan make:controller PostController」を実行すると、正しいフォルダ(app/Http/Controllers)に、正しい名前空間(namespace)を持つ雛形が自動で作られます。人が手で作ると、置き場所を間違えたり、名前空間の記述をミスしたりしますが、Artisanなら規約通りのものが確実に生成されます。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n// php artisan make:controller PostController で自動生成される雛形\nnamespace App\\Http\\Controllers;\n\nuse Illuminate\\Http\\Request;\n\nclass PostController extends Controller\n{\n    // ここに処理を書き足していく\n}",
          caption: "namespaceも継承元も規約通り。開発者は中身を書き足すことに集中できる。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ手作業でなくArtisanで生成するのか",
          text: "コマンドで生成する本質的な意義は「規約の強制」です。手作業だと、置き場所・命名・名前空間・継承元などを人が毎回正しく書く必要があり、必ずどこかでミスや揺れが生じます。Artisanで生成すれば、これらが常に規約通りになり、コードベース全体の一貫性が保たれます。人為的なミスを構造的に排除できるのが最大の価値です。",
        },
        {
          type: "compare",
          bad: {
            label: "悪い例: 手作業でファイルを作る",
            text: "エディタで空ファイルを作り、namespaceを手打ちする。置き場所や綴りを間違えるとクラスが読み込まれず、原因の分かりにくいエラーになる。",
          },
          good: {
            label: "良い例: Artisanで生成する",
            text: "make:controllerで生成すれば、置き場所も名前空間も継承元も規約通りに揃う。開発者は業務ロジックの実装だけに集中できる。",
          },
        },
        {
          type: "callout",
          variant: "info",
          title: "補足: 自分専用のコマンドも作れる",
          text: "Artisanは、データの一括処理や定期バッチなど、自分のアプリ専用のコマンドを作ることもできます(make:command)。運用作業をコマンド化しておくと、手順書に頼らず誰でも同じ操作を再現できます。",
        },
        {
          type: "callout",
          variant: "interview",
          title: "面接ではこう言う",
          text: "「Artisanはコード生成やマイグレーション実行を行う付属のCLIツールです。手作業ではなくコマンドで生成する意義は、置き場所や命名などの規約を強制でき、人為的なミスを構造的に防いでコードベースの一貫性を保てる点にあると考えています」と、単なる時短でなく規約遵守の観点で答えると評価されます。",
        },
      ],
      questions: [
        {
          id: "day2-lesson2-q1",
          type: "choice",
          question: "「Controllerを手作業で作らず、artisan make:controller で生成すべき」最大の理由はどれか。",
          choices: [
            "コマンドの方がタイピングが少なくて楽だから",
            "置き場所・命名・名前空間などの規約が強制され、人為的ミスを防げるから",
            "Artisanで作らないとControllerは動かないから",
            "生成したControllerは処理が速くなるから",
          ],
          answerIndex: 1,
          explanation: "生成の本質的な意義は「規約の強制」です。手作業では置き場所や名前空間の記述ミスが起きますが、[[artisan]] で生成すれば常に規約通りになり、一貫性が保たれます。Controllerは手作業でも動きますが、ミスが起きやすくなります。",
        },
        {
          id: "day2-lesson2-q2",
          type: "free",
          question: "Artisanとは何か、そしてコマンドでコードを生成することの意義を説明してください。",
          modelAnswer: "ArtisanはLaravel付属のコマンドラインツールで、Controllerやモデルの雛形生成、マイグレーション実行、キャッシュクリアなどの定型作業をコマンドで実行できます。コマンドで生成する意義は、置き場所・命名・名前空間・継承元といった規約が自動的に守られることです。手作業だと人によって揺れやミスが生じますが、Artisanなら常に規約通りに揃い、コードベース全体の一貫性を保てます。時短以上に、規約の強制による品質の安定が本質的な価値です。",
          interviewPhrase: "「ArtisanはLaravelのCLIツールで、コード生成やマイグレーション実行を担います。コマンド生成の意義は規約を強制して人為的ミスを防げる点にあると考えています」",
          keywords: ["CLI", "雛形生成", "規約の強制", "一貫性", "人為的ミスの排除"],
        },
      ],
    },

    // ================================================================
    // Lesson 3: Composer
    // ================================================================
    {
      id: "day2-lesson3",
      slug: "composer",
      title: "Composerと依存管理、autoload",
      summary: "Composerが何をするツールか、composer.jsonとcomposer.lockの違い、autoloadの意味を理解する。",
      blocks: [
        {
          type: "heading",
          text: "Composerは「部品の調達係」",
        },
        {
          type: "paragraph",
          text: "[[composer]] は、PHPの「依存管理ツール」です。アプリは、認証やPDF生成など、他の人が作った便利なライブラリ(部品)を組み合わせて作ります。それらの部品を、必要なバージョンで自動的にダウンロードして揃えてくれるのがComposerです。Laravel本体もComposerで導入されます。",
        },
        {
          type: "paragraph",
          text: "「依存(dependency)」とは、自分のアプリが動くために必要としている外部の部品のことです。これらを手作業でダウンロードして配置するのは大変で、バージョンの食い違いも起きます。Composerはこの調達とバージョン管理を肩代わりします。",
        },
        {
          type: "heading",
          text: "composer.json は「欲しい物リスト」",
        },
        {
          type: "paragraph",
          text: "どの部品をどのバージョン範囲で使いたいかは、composer.json というファイルに書きます。これは「欲しい物リスト」にあたります。人が読み書きする、意図を書くファイルです。",
        },
        {
          type: "code",
          language: "json",
          code: "{\n  \"require\": {\n    \"php\": \"^8.2\",\n    \"laravel/framework\": \"^11.0\",\n    \"guzzlehttp/guzzle\": \"^7.8\"\n  }\n}",
          caption: "composer.json。^11.0 は「11系の互換範囲でよい」という、幅を持ったバージョン指定。",
        },
        {
          type: "heading",
          text: "composer.lock は「実際に入れた物の記録」",
        },
        {
          type: "paragraph",
          text: "一方 composer.lock には、実際にインストールされた「正確なバージョン」が記録されます。composer.json が「11系ならよい」という幅を持つのに対し、lockは「今回入れたのは 11.9.2 だった」という一点を固定します。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ lock ファイルが重要なのか",
          text: "lockファイルが重要なのは「全員の環境を完全に一致させるため」です。composer.jsonの幅指定だけでインストールすると、時期によって少しずつ違うバージョンが入り、「自分の環境では動くのに他の人の環境では動かない」という事故が起きます。lockを共有すれば、チーム全員と本番環境がまったく同じバージョンを使うことを保証でき、再現性が確保されます。",
        },
        {
          type: "compare",
          bad: {
            label: "悪い例: lockを無視して各自install",
            text: "composer.lockをGit管理から外し、各自が composer update してしまう。結果、開発者ごとに微妙に違うバージョンが入り、本番で予期せぬ不具合が出る。",
          },
          good: {
            label: "良い例: lockを共有しinstall",
            text: "composer.lockをGitで共有し、各自は composer install する。全員が寸分違わぬ同じバージョンで動き、環境差による不具合を防げる。",
          },
        },
        {
          type: "heading",
          text: "autoload: クラスを自動で読み込む仕組み",
        },
        {
          type: "paragraph",
          text: "オートロード(autoload)とは、必要なクラスファイルを、使う瞬間に自動で読み込んでくれる仕組みです。Composerは、クラス名(名前空間)とファイルの場所の対応を管理し、いちいち手作業で require しなくてもクラスが使えるようにします。だから Day2 Lesson2 で見た namespace の規約が重要になるのです。",
        },
        {
          type: "compare",
          bad: {
            label: "オートロードがない世界",
            language: "php",
            code: "// 使うクラスの数だけ手でrequireが必要\nrequire \"app/Models/User.php\";\nrequire \"app/Models/Post.php\";\nrequire \"app/Http/Controllers/UserController.php\";\n$user = new User();",
          },
          good: {
            label: "Composerのオートロード",
            language: "php",
            code: "// requireは不要。名前空間から自動で解決される\nuse App\\Models\\User;\n\n$user = new User();",
          },
        },
        {
          type: "callout",
          variant: "interview",
          title: "面接ではこう言う",
          text: "「Composerは依存管理ツールで、必要なライブラリを指定バージョンで揃えます。composer.jsonが欲しいバージョンの範囲を書く意図のファイル、composer.lockが実際に入れた正確なバージョンを固定する記録で、lockを共有することでチームと本番の環境を完全に一致させ再現性を担保します。加えてオートロードにより、requireを書かずに名前空間からクラスを解決できます」と、lockの再現性まで語れると実務理解が伝わります。",
        },
      ],
      questions: [
        {
          id: "day2-lesson3-q1",
          type: "choice",
          question: "composer.json と composer.lock の違いとして正しいものはどれか。",
          choices: [
            "jsonが正確なバージョンの記録、lockが欲しいバージョンの範囲",
            "jsonが欲しいバージョンの範囲(意図)、lockが実際に入れた正確なバージョン(記録)",
            "両方とも同じ内容で、片方はバックアップ",
            "lockはPHPのバージョンだけを固定するファイル",
          ],
          answerIndex: 1,
          explanation: "composer.jsonは「^11.0」のように幅を持った欲しいバージョンを書く意図のファイル、composer.lockは実際にインストールされた正確なバージョンを固定する記録です。lockを共有することで環境の再現性が保たれます。",
        },
        {
          id: "day2-lesson3-q2",
          type: "choice",
          question: "チーム開発で composer.lock を共有し、各自が composer install する理由として最も適切なのはどれか。",
          choices: [
            "installの方がupdateより速いから",
            "全員と本番環境で完全に同じバージョンを使い、環境差による不具合を防ぐため",
            "lockがないとComposerが動かないから",
            "ディスク容量を節約できるから",
          ],
          answerIndex: 1,
          explanation: "lockを共有してinstallすることで、全メンバーと本番環境が寸分違わぬ同じバージョンで動きます。これにより「自分の環境では動くのに他では動かない」という再現性の問題を防げます。",
        },
        {
          id: "day2-lesson3-q3",
          type: "free",
          question: "Composerのオートロード(autoload)とは何か、それがあると何が嬉しいのかを説明してください。",
          modelAnswer: "オートロードは、必要なクラスファイルを使う瞬間に自動で読み込んでくれる仕組みです。Composerがクラスの名前空間とファイルの場所の対応を管理するため、開発者はいちいち手作業でrequireを書かなくても、useで名前空間を指定するだけでクラスを使えます。これにより、ファイルの読み込み漏れによるエラーがなくなり、コードが簡潔になります。この仕組みが成り立つのは、名前空間とフォルダ配置が規約通りに揃っているからです。",
          interviewPhrase: "「オートロードは名前空間からクラスを自動で読み込む仕組みで、requireを手書きせずに済みます。名前空間とフォルダ配置の規約が守られているから成立します」",
          keywords: ["自動読み込み", "名前空間", "require不要", "規約", "簡潔さ"],
        },
      ],
    },

    // ================================================================
    // Lesson 4: マイグレーションの思想
    // ================================================================
    {
      id: "day2-lesson4",
      slug: "migration",
      title: "マイグレーションの思想 — DBスキーマをコードで版管理する",
      summary: "なぜDBの構造をコードで管理するのか、チームでの共有やロールバックの意義を理解する。",
      blocks: [
        {
          type: "heading",
          text: "マイグレーションとは何か",
        },
        {
          type: "paragraph",
          text: "[[migration]](マイグレーション)とは、データベースのテーブル構造(スキーマ)を、SQLの手作業ではなくPHPのコードとして定義し、その変更履歴を1つずつファイルとして残していく仕組みです。「usersテーブルを作る」「postsにcolumnを1つ足す」といった変更が、それぞれ日付付きのファイルとして積み上がっていきます。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n// database/migrations/2026_08_07_000000_create_posts_table.php\nuse Illuminate\\Database\\Migrations\\Migration;\nuse Illuminate\\Database\\Schema\\Blueprint;\nuse Illuminate\\Support\\Facades\\Schema;\n\nreturn new class extends Migration\n{\n    // up: 変更を適用する(テーブルを作る)\n    public function up(): void\n    {\n        Schema::create(\"posts\", function (Blueprint $table) {\n            $table->id();\n            $table->string(\"title\");\n            $table->text(\"body\");\n            $table->timestamps();\n        });\n    }\n\n    // down: 変更を取り消す(テーブルを消す)\n    public function down(): void\n    {\n        Schema::dropIfExists(\"posts\");\n    }\n};",
          caption: "up が「適用」、down が「取り消し」。この対で、進むことも戻すこともできる。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜDBの構造をコードで版管理するのか",
          text: "手作業でSQLを流してテーブルを作ると、その変更履歴はどこにも残りません。「いつ、誰が、何のためにこのcolumnを足したのか」が分からなくなり、開発者ごとにDB構造がズレていきます。マイグレーションはDB構造の変更を、アプリのコードと同じようにGitで版管理できるようにします。これにより、変更の履歴・理由・順序がすべて追跡でき、DBの状態をコードから完全に再現できるようになります。",
        },
        {
          type: "compare",
          bad: {
            label: "悪い例: 手作業でSQLを流す",
            text: "各開発者が自分のDBに直接 ALTER TABLE を実行する。誰がどう変えたか履歴が残らず、環境ごとにDB構造がズレる。新メンバーはDBを正しく再現できない。",
          },
          good: {
            label: "良い例: マイグレーションで管理",
            text: "スキーマ変更をマイグレーションファイルにし、Gitで共有する。全員が php artisan migrate を実行するだけで同じDB構造を再現でき、変更履歴も残る。",
          },
        },
        {
          type: "heading",
          text: "チームでの共有: 全員が同じ手順でDBを揃える",
        },
        {
          type: "paragraph",
          text: "マイグレーションファイルはコードなのでGitで共有されます。新しくチームに入った人は、リポジトリを取得して「php artisan migrate」を一度実行するだけで、全員とまったく同じDB構造を手元に再現できます。口頭やドキュメントで「このテーブルを作って」と伝える必要がなくなります。",
        },
        {
          type: "code",
          language: "bash",
          code: "# 未適用のマイグレーションをすべて実行し、DBを最新の構造にする\nphp artisan migrate\n\n# 初期データ(seeder)も一緒に投入する\nphp artisan migrate --seed",
          caption: "新メンバーはこれ一発で、チームと同じDB構造・初期データを再現できる。",
        },
        {
          type: "callout",
          variant: "info",
          title: "補足: 初期データは Seeder で",
          text: "テーブルの「構造」はマイグレーション、その中に入れる「初期データ」は [[seeder]] という別の仕組みで用意します。構造とデータを分けることで、テーブル定義とデータ投入をそれぞれ独立して管理できます。",
        },
        {
          type: "heading",
          text: "ロールバック: 変更を安全に巻き戻す",
        },
        {
          type: "paragraph",
          text: "各マイグレーションには、適用のupと取り消しのdownがペアで書かれています。このおかげで、間違ったスキーマ変更を「php artisan migrate:rollback」で1つ前の状態に戻せます。DBの変更を、コードのcommitのように進めたり戻したりできるのがマイグレーションの強みです。",
        },
        {
          type: "code",
          language: "bash",
          code: "# 直近のマイグレーションを取り消す(downが実行される)\nphp artisan migrate:rollback\n\n# 現在のマイグレーションの適用状況を確認する\nphp artisan migrate:status",
          caption: "rollbackでdownが実行され、直前の変更を安全に巻き戻せる。",
        },
        {
          type: "callout",
          variant: "warn",
          title: "注意: 本番のロールバックはデータ消失に注意",
          text: "rollbackはスキーマを戻すため、column削除を伴う場合はそのcolumnのデータが失われます。本番環境では、ロールバックよりも「打ち消す新しいマイグレーションを追加する」方が安全な場合が多い、という運用上の判断も知っておくと差がつきます。",
        },
        {
          type: "callout",
          variant: "interview",
          title: "面接ではこう言う",
          text: "「マイグレーションは、DBスキーマの変更をコードとして版管理する仕組みです。手作業のSQLでは履歴が残らず環境がズレますが、マイグレーションならGitで共有でき、全員が migrate 一発で同じDB構造を再現できます。upとdownで適用と取り消しができ、変更を安全に巻き戻せる点も利点です。ただし本番のロールバックはデータ消失リスクがあるので、打ち消しマイグレーションを足す運用も検討します」と、再現性とロールバックの両面、さらに本番運用の注意まで話せると高評価です。",
        },
      ],
      questions: [
        {
          id: "day2-lesson4-q1",
          type: "choice",
          question: "DBのテーブル構造をマイグレーションで管理する最大の利点はどれか。",
          choices: [
            "SQLを書かずに済むので楽だから",
            "DB構造の変更をコードとして版管理・共有でき、全員が同じ構造を再現できるから",
            "マイグレーションを使うとDBが速くなるから",
            "テーブルを暗号化できるから",
          ],
          answerIndex: 1,
          explanation: "最大の利点は、DB構造の変更をGitで版管理・共有でき、履歴が残り、全員が [[migration]] 実行だけで同じ構造を再現できる再現性です。手作業SQLでは履歴が残らず環境がズレます。",
        },
        {
          id: "day2-lesson4-q2",
          type: "choice",
          question: "マイグレーションファイルの up と down メソッドの役割の説明として正しいものはどれか。",
          choices: [
            "upが初期データ投入、downがデータ削除",
            "upがスキーマ変更の適用、downがその変更の取り消し(ロールバック用)",
            "upが本番用、downが開発用の設定",
            "どちらもテーブル作成で、片方は予備",
          ],
          answerIndex: 1,
          explanation: "upはスキーマ変更を適用する処理(テーブル作成など)、downはその変更を取り消す処理です。この対があることで migrate:rollback による巻き戻しが可能になります。初期データ投入は [[seeder]] の役割です。",
        },
        {
          id: "day2-lesson4-q3",
          type: "free",
          question: "「DBの構造を手作業のSQLで管理するのではなく、マイグレーションで管理するのはなぜか」を、チーム開発の観点から説明してください。",
          modelAnswer: "手作業のSQLでテーブルを変更すると、いつ誰が何のために変えたかの履歴が残らず、開発者ごとにDB構造がズレていきます。マイグレーションは、スキーマ変更をコードとして記述しGitで版管理・共有できるため、変更の履歴と順序が追跡でき、新メンバーもmigrateコマンド一発で全員と同じDB構造を再現できます。さらにupとdownの対により変更を安全に巻き戻せます。つまり、DB構造をアプリのコードと同じ流儀で扱えることで、チーム全体の再現性と保守性が保たれるのが理由です。",
          interviewPhrase: "「マイグレーションはDB構造の変更をコードで版管理する仕組みです。履歴が残り、全員がmigrate一発で同じ構造を再現できるので、環境差による不具合を防げます。だから手作業SQLではなくマイグレーションを使います」",
          keywords: ["版管理", "履歴", "再現性", "共有", "ロールバック"],
        },
      ],
    },
  ],
};
