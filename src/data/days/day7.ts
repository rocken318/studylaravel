import type { Day } from "@/types";

export const day7: Day = {
  day: 7,
  slug: "day7",
  title: "チーム開発の作法 — 規約・Gitフロー・レビュー・テスト・秘匿情報",
  goal: "「なぜ規約やレビューやテストが要るのか」をチームの生産性の観点で説明でき、実装はAIに任せても人間の判断と説明で価値を出せる。",
  lessons: [
    // =====================================================================
    // Lesson 1: コーディング規約 / PSR-12
    // =====================================================================
    {
      id: "day7-lesson1",
      slug: "coding-standards",
      title: "コーディング規約とPSR-12 — 書き方を揃える理由",
      summary: "PSR-12という共通の書式と、Pintで自動整形する意味。なぜ規約が要るのか。",
      blocks: [
        { type: "heading", text: "コーディング規約とは" },
        {
          type: "paragraph",
          text: "コーディング規約とは、インデントの幅・命名・波括弧の位置といった『書き方のルール』をチームで揃える取り決めです。PHPの世界では [[psr-12]] という業界標準の書式があり、Laravelもこれに準拠しています。",
        },
        { type: "heading", text: "なぜ書き方を揃えるのか" },
        {
          type: "callout",
          variant: "why",
          title: "規約は好みの押し付けではなく、生産性の道具",
          text: "書式がばらばらだと、コードを読むたびに『この人はどう書く人か』を読み解く負荷がかかります。規約で揃えると、誰が書いても同じ見た目になり、読み手は中身の意味だけに集中できます。さらにレビューで『インデントが』『命名が』といった本質でない指摘が消え、設計の議論に時間を使えます。規約は個人の好みより、チーム全体の読みやすさを優先する仕組みです。",
        },
        {
          type: "list",
          items: [
            "誰のコードも同じ見た目になり、読む負荷が下がる",
            "書式の議論がレビューから消え、設計の議論に集中できる",
            "差分(diff)が書式の揺れで汚れず、変更の本質が見やすい",
          ],
        },
        { type: "heading", text: "自動整形ツールに任せる" },
        {
          type: "paragraph",
          text: "規約を手で守るのは大変なので、自動整形ツールを使います。Laravelには「Laravel Pint」が同梱されており、内部はPHP-CS-Fixerです。コマンド一発でPSR-12準拠に整形してくれます。",
        },
        {
          type: "code",
          language: "bash",
          caption: "Pintで整形・チェックする",
          code: `# コードを規約に沿って自動整形する
./vendor/bin/pint

# 整形せず、違反がないかのチェックだけ(CIで使う)
./vendor/bin/pint --test`,
        },
        {
          type: "compare",
          bad: {
            label: "整形前(書式がばらばら)",
            language: "php",
            code: `class UserService{
  public function find( $id ){
        return User::where('id',$id)->first();
  }
}`,
          },
          good: {
            label: "Pint整形後(PSR-12準拠)",
            language: "php",
            code: `class UserService
{
    public function find($id)
    {
        return User::where('id', $id)->first();
    }
}`,
          },
        },
        {
          type: "callout",
          variant: "info",
          title: "AI時代の規約の価値",
          text: "コードの生成はAIが得意になりましたが、AIも規約に沿った整形ツールを通すべきです。人間の価値は『どの規約を採用し、なぜそう決めるか』という判断側にあります。ツールで機械的に守れるものはツールに任せ、人はレビューで設計と意図を見る、という分担が現実的です。",
        },
        {
          type: "callout",
          variant: "interview",
          title: "面接ではこう言う",
          text: "「コーディング規約はPSR-12に合わせ、Laravel Pintで自動整形しています。規約は好みの問題ではなく、書式を揃えて読む負荷を下げ、レビューを設計の議論に集中させるための道具だと考えています。書式は機械に守らせ、人は意図と設計を見る、という分担が効率的です」",
        },
      ],
      questions: [
        {
          id: "day7-lesson1-q1",
          type: "choice",
          question: "コーディング規約(PSR-12など)を導入する主な目的は?",
          choices: [
            "実行速度を上げるため",
            "書式を揃えて読む負荷を下げ、レビューを設計の議論に集中させるため",
            "ファイルサイズを小さくするため",
            "個人の好みを表現するため",
          ],
          answerIndex: 1,
          explanation:
            "規約の目的は書式の統一による可読性向上と、書式論争の排除です。実行速度やファイルサイズとは無関係で、好みの表現でもありません。",
        },
        {
          id: "day7-lesson1-q2",
          type: "free",
          question: "PintのようなツールでPSR-12を自動整形する意義を説明してください。",
          modelAnswer:
            "規約を人が手で守るのは負担が大きく、抜けも出ます。Pint(内部はPHP-CS-Fixer)で自動整形すれば、コマンド一発で全員のコードが同じ書式になり、書式の揺れによる差分の汚れも消えます。結果としてレビューで書式を指摘する必要がなくなり、設計や可読性といった本質の議論に集中できます。機械に守らせられるものは機械に任せ、人は意図を見る、という分担が効率的です。",
          interviewPhrase:
            "「書式はPintで自動整形し、人は設計を見ます。機械的に守れる規約はツールに任せて、レビューを本質に集中させます」",
          keywords: ["自動整形", "PSR-12", "差分", "設計に集中"],
        },
      ],
    },

    // =====================================================================
    // Lesson 2: Gitフロー
    // =====================================================================
    {
      id: "day7-lesson2",
      slug: "git-flow",
      title: "ブランチ戦略とPR — 変更を安全に取り込む流れ",
      summary: "GitHubフローを基本に、ブランチ・プルリクエスト・コミット粒度を理解する。",
      blocks: [
        { type: "heading", text: "なぜブランチを分けるのか" },
        {
          type: "paragraph",
          text: "複数人が同じコードを同時に触ると、互いの変更がぶつかります。そこで、作業ごとに本流(main)から枝(ブランチ)を切り、そこで作業してから本流に取り込む、という流れをとります。この分岐と合流のルールを [[git-flow]](ブランチ戦略)と呼びます。",
        },
        { type: "heading", text: "GitHubフロー — シンプルな基本形" },
        {
          type: "list",
          ordered: true,
          items: [
            "main から作業用ブランチを切る(例: feature/order-service)",
            "そのブランチで実装し、意味のある単位でコミットする",
            "プルリクエスト(PR)を出し、レビューを受ける",
            "承認されたら main にマージし、ブランチを削除する",
          ],
        },
        {
          type: "paragraph",
          text: "GitFlowという、developやreleaseなど複数の恒久ブランチを使うより複雑な戦略もありますが、Webアプリの継続的なリリースには、main中心のGitHubフローが扱いやすく主流です。",
        },
        {
          type: "code",
          language: "bash",
          caption: "作業ブランチを切ってPRの元を作る",
          code: `# main を最新にしてから枝を切る
git switch main
git pull origin main
git switch -c feature/order-service

# 実装してコミット
git add app/Services/OrderService.php
git commit -m "注文処理をOrderServiceに切り出す"

# リモートに上げてPRを作成
git push -u origin feature/order-service`,
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜPR(プルリクエスト)を挟むのか",
          text: "PRは『この変更を取り込んでよいか』を他人に確認してもらう仕組みです。直接mainに書き込むと、誰のチェックも受けずに壊れたコードが本流に入ります。PRを挟むことで、マージ前にレビューと自動テストを必ず通す関所を作れます。変更の意図を文章で説明する場にもなり、後から履歴として残ります。",
        },
        { type: "heading", text: "コミットの粒度" },
        {
          type: "compare",
          bad: {
            label: "粒度が悪いコミット",
            text: "「いろいろ修正」という1コミットに、機能追加・バグ修正・整形が全部混ざっている。後から特定の変更だけを取り消せず、レビューも追えない。",
          },
          good: {
            label: "粒度が良いコミット",
            text: "「注文サービスを追加」「在庫チェックのバグを修正」のように、1つの意味ある変更で1コミット。メッセージで何をしたか分かり、必要なら個別に取り消せる。",
          },
        },
        {
          type: "callout",
          variant: "info",
          title: "コミットメッセージは未来の自分への説明",
          text: "コミットメッセージは『何を』だけでなく『なぜ』が書けると価値が上がります。半年後に履歴を追う人(多くは自分)が、変更の理由を理解できるかを基準にします。",
        },
        {
          type: "callout",
          variant: "interview",
          title: "面接ではこう言う",
          text: "「基本はGitHubフローで、mainから作業ブランチを切って、PRでレビューと自動テストを通してからマージします。直接mainに書かないのは、レビューとテストの関所を必ず通すためです。コミットは1つの意味ある変更ごとに分け、なぜ変えたかがメッセージから分かるようにしています」",
        },
      ],
      questions: [
        {
          id: "day7-lesson2-q1",
          type: "choice",
          question: "作業をmainブランチに直接コミットせず、ブランチとPRを使う主な理由は?",
          choices: [
            "Gitの容量を節約するため",
            "マージ前にレビューと自動テストを必ず通す関所を作るため",
            "コミット数を減らすため",
            "ブランチ名を自由に付けられるため",
          ],
          answerIndex: 1,
          explanation:
            "ブランチとPRは、本流に取り込む前にレビューとテストを通す関所を作るための仕組みです。直接mainに書くと、誰のチェックも受けずに壊れたコードが入る恐れがあります。",
        },
        {
          id: "day7-lesson2-q2",
          type: "free",
          question: "コミットの粒度はどう分けるべきか、理由とともに説明してください。",
          modelAnswer:
            "1つの意味ある変更ごとに1コミットに分けます。機能追加・バグ修正・整形を1コミットに混ぜると、後から特定の変更だけを取り消せず、レビューでも何をしたか追えません。粒度を揃えておけば、メッセージで各変更の意図が分かり、問題があった箇所だけを個別に戻せます。メッセージには何をしたかに加え、なぜ変えたかを書くと、後から履歴を追う人が理解しやすくなります。",
          interviewPhrase:
            "「1つの意味ある変更で1コミットに分けます。個別に戻せて、レビューで追いやすく、なぜ変えたかが履歴に残るからです」",
          keywords: ["1つの意味ある変更", "取り消せる", "レビュー", "なぜ"],
        },
      ],
    },

    // =====================================================================
    // Lesson 3: コードレビュー
    // =====================================================================
    {
      id: "day7-lesson3",
      slug: "code-review",
      title: "コードレビュー — 何を見て、どう出すか",
      summary: "設計・可読性・テスト・セキュリティの観点と、レビューされる側の作法。",
      blocks: [
        { type: "heading", text: "コードレビューの目的" },
        {
          type: "paragraph",
          text: "[[code-review]] は、マージ前に他のメンバーが変更を読み、問題を早く見つける工程です。目的はバグの発見だけでなく、設計の妥当性の確認、知識の共有、コードの一貫性の維持など多岐にわたります。『間違い探し』ではなく『チームでコードを良くする協働』です。",
        },
        { type: "heading", text: "レビューの観点" },
        {
          type: "list",
          items: [
            "設計: 責務は適切か。コントローラが太っていないか、ロジックの置き場所は妥当か。",
            "可読性: 半年後の人が読んで意図が分かるか。命名は適切か。",
            "テスト: 変更に対するテストがあるか。壊れやすい箇所が守られているか。",
            "セキュリティ: 入力検証・認可・エスケープは効いているか。秘匿情報が漏れていないか。",
          ],
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ設計とセキュリティを人が見るのか",
          text: "書式や単純なミスはツールが見つけられます。しかし『この責務分けは妥当か』『この認可漏れは業務上まずいか』といった判断は、仕様と文脈を理解した人間にしかできません。AIが実装を出せる時代でも、その設計判断とリスク評価こそ人間がレビューで価値を出す部分です。だからレビューは機械に任せられない観点に集中させます。",
        },
        { type: "heading", text: "レビューする側の作法" },
        {
          type: "compare",
          bad: {
            label: "刺さるレビューコメント",
            text: "「これはダメ。なんでこう書いたの?」——人格や能力を責め、代案も理由も示さない。相手は萎縮し、議論が進まない。",
          },
          good: {
            label: "建設的なレビューコメント",
            text: "「ここはサービス層に寄せると再利用しやすいと思いますが、いかがでしょう?理由は〜」——対象はコードで、理由と代案を添え、判断を相手に委ねる。",
          },
        },
        { type: "heading", text: "レビューされる側の作法" },
        {
          type: "list",
          items: [
            "PRの説明に『何を・なぜ』変えたかを書き、レビュアーの前提を揃える",
            "変更は小さく保つ。巨大なPRはレビューされにくく、見落としも増える",
            "指摘は攻撃ではなくコードへの意見として受け取る。ただし鵜呑みにせず、疑問があれば理由を確認する",
            "対応した/しない を明示し、しない場合は理由を返す",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "指摘を鵜呑みにしないことも作法",
          text: "レビューは対話です。指摘が常に正しいとは限らないので、技術的におかしいと思えば理由を尋ね、根拠を確認します。逆に自分が正しいと思い込まず、相手の意図を確かめる。どちらも『コードを良くする』という同じ目的に向いているという姿勢が大切です。",
        },
        {
          type: "callout",
          variant: "interview",
          title: "面接ではこう言う",
          text: "「レビューでは設計・可読性・テスト・セキュリティを見ます。書式はツールに任せ、人は責務分けや認可漏れのような判断が要る部分に集中します。コメントはコードを対象にして理由と代案を添えます。される側としては、PRを小さく保ち、何をなぜ変えたかを説明し、指摘は鵜呑みにせず理由を確かめるようにしています」",
        },
      ],
      questions: [
        {
          id: "day7-lesson3-q1",
          type: "choice",
          question: "コードレビューで、ツールより人間が見るべき観点として最も重要なものは?",
          choices: [
            "インデントの幅が規約通りか",
            "設計の妥当性や認可漏れなど、仕様と文脈が必要な判断",
            "セミコロンの付け忘れ",
            "行末の空白",
          ],
          answerIndex: 1,
          explanation:
            "書式や単純なミスはツールが検出できます。設計の妥当性や認可漏れの評価は仕様と文脈の理解が要るため、人間がレビューで価値を出す部分です。",
        },
        {
          id: "day7-lesson3-q2",
          type: "free",
          question: "レビューされる側として、どんな作法を心がけますか。",
          modelAnswer:
            "まずPRの説明に何をなぜ変えたかを書き、レビュアーと前提を揃えます。変更は小さく保ち、巨大なPRで見落としを生まないようにします。指摘は人格への攻撃ではなくコードへの意見として受け止めますが、鵜呑みにはせず、技術的に疑問があれば理由を確認します。対応したかしないかを明示し、しない場合はその理由を返します。レビューをコードを良くする対話と捉える姿勢が大切です。",
          interviewPhrase:
            "「PRは小さく保ち、何をなぜ変えたかを説明します。指摘はコードへの意見として受け、鵜呑みにせず理由を確かめる対話にします」",
          keywords: ["小さいPR", "何をなぜ", "対話", "鵜呑みにしない"],
        },
      ],
    },

    // =====================================================================
    // Lesson 4: テスト
    // =====================================================================
    {
      id: "day7-lesson4",
      slug: "testing",
      title: "テスト — なぜ書くのか、単体とFeature、CI",
      summary: "リグレッション防止という最大の価値。単体テストとFeatureテストの違いとCI。",
      blocks: [
        { type: "heading", text: "なぜテストを書くのか" },
        {
          type: "paragraph",
          text: "テストの最大の価値は [[regression]](リグレッション、後退)の防止です。一度直したバグや作った機能が、後の変更で再び壊れることをリグレッションと呼びます。テストがあれば、変更のたびに自動で『前の機能がまだ動くか』を確認でき、壊したことにすぐ気づけます。",
        },
        {
          type: "callout",
          variant: "why",
          title: "テストは『安心して変更するため』の投資",
          text: "テストがないコードは、直すたびに『どこか壊していないか』を手で確認する必要があり、変更が怖くなります。テストがあると、変更後にテストを走らせて緑ならOK、赤なら壊した箇所が分かる、という安心が得られます。つまりテストは、将来の変更コストを下げるための投資です。AIに実装を任せる場合でも、テストが『期待する振る舞いの仕様』として振る舞いを固定してくれます。",
        },
        { type: "heading", text: "単体テストとFeatureテスト" },
        {
          type: "list",
          items: [
            "単体テスト([[unit-test]]): サービスのメソッドなど、小さな部品を単独で検証する。例: 割引計算が正しいか。速くて数を多く書ける。",
            "Featureテスト: HTTPリクエストからレスポンスまで、機能を通しで検証する。例: 注文APIを叩くと注文が作られ在庫が減るか。実際の使われ方に近い。",
          ],
        },
        {
          type: "code",
          language: "php",
          caption: "単体テスト — 割引計算だけを検証(部品を単独で)",
          code: `class OrderServiceTest extends TestCase
{
    public function test_プレミアム会員は10パーセント割引される(): void
    {
        $service = new OrderService();
        $amount  = $service->calculateAmountForTest(premium: true, price: 1000, qty: 2);

        // 2000円の10%引きで1800円になること
        $this->assertSame(1800, $amount);
    }
}`,
        },
        {
          type: "code",
          language: "php",
          caption: "Featureテスト — 注文機能を通しで検証",
          code: `class OrderApiTest extends TestCase
{
    public function test_注文すると在庫が減り注文が作られる(): void
    {
        $user    = User::factory()->create();
        $product = Product::factory()->create(['stock' => 5]);

        $response = $this->actingAs($user)->post('/orders', [
            'product_id' => $product->id,
            'quantity'   => 2,
        ]);

        $response->assertRedirect();
        // 在庫が2減っていること
        $this->assertSame(3, $product->fresh()->stock);
        // 注文が1件作られていること
        $this->assertDatabaseHas('orders', ['user_id' => $user->id]);
    }
}`,
        },
        { type: "heading", text: "CI — 自動でテストを走らせる" },
        {
          type: "paragraph",
          text: "CI(継続的インテグレーション)は、PRが出るたびに自動でテストと整形チェックを走らせる仕組みです。人が走らせ忘れても機械が必ず確認するので、壊れたコードがmainに入るのを防げます。",
        },
        {
          type: "code",
          language: "yaml",
          caption: ".github/workflows/ci.yml — PRごとに整形チェックとテストを実行",
          code: `name: CI
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
      - run: composer install --no-interaction
      # 書式チェック(違反があれば失敗)
      - run: ./vendor/bin/pint --test
      # テスト実行(1つでも赤なら失敗し、マージをブロック)
      - run: php artisan test`,
        },
        {
          type: "callout",
          variant: "info",
          title: "テストが仕様書になる",
          text: "良いテストは『このコードはこう振る舞うべき』という仕様を、実行可能な形で示します。テスト名やアサーションを読めば、期待される動きが分かります。ドキュメントと違い、テストは古くなれば失敗して知らせてくれるので、嘘をつかない仕様書として機能します。",
        },
        {
          type: "callout",
          variant: "interview",
          title: "面接ではこう言う",
          text: "「テストの一番の価値はリグレッション防止です。変更のたびに前の機能が壊れていないか自動で確認でき、安心して直せます。細かいロジックは単体テスト、機能全体はFeatureテストで見て、CIでPRごとに自動実行します。テストは実行可能な仕様書でもあるので、AIに実装させる場合でも期待する振る舞いを固定できると考えています」",
        },
      ],
      questions: [
        {
          id: "day7-lesson4-q1",
          type: "choice",
          question: "テストを書く最大の価値として最も適切なものは?",
          choices: [
            "コードの実行速度が上がる",
            "リグレッション(後退)を防ぎ、安心して変更できるようになる",
            "コード量が減る",
            "デプロイが不要になる",
          ],
          answerIndex: 1,
          explanation:
            "テストの最大の価値はリグレッション防止です。変更で以前の機能を壊していないかを自動で確認でき、変更のコストと不安を下げます。実行速度やコード量とは直接関係しません。",
        },
        {
          id: "day7-lesson4-q2",
          type: "choice",
          question: "単体テストとFeatureテストの違いとして正しいものは?",
          choices: [
            "単体テストは本番環境で、Featureテストは開発環境で動く",
            "単体テストは小さな部品を単独で、FeatureテストはHTTPからレスポンスまで機能を通しで検証する",
            "単体テストは手動、Featureテストは自動である",
            "両者に違いはない",
          ],
          answerIndex: 1,
          explanation:
            "単体テストはサービスのメソッドなど小さな部品を単独で検証し、FeatureテストはリクエストからレスポンスまでをHTTP経由で通しで検証します。使われ方に近いのがFeatureテストです。",
        },
        {
          id: "day7-lesson4-q3",
          type: "free",
          question: "CI(継続的インテグレーション)でテストを走らせる意義を説明してください。",
          modelAnswer:
            "CIはPRが出るたびに自動で整形チェックとテストを実行する仕組みです。人が走らせ忘れても機械が必ず確認するので、テストが失敗した状態のコードがmainにマージされるのを防げます。これにより本流を常に動く状態に保て、問題を早い段階で検知できます。レビュアーも、CIが緑であることを前提に設計の議論に集中できます。",
          interviewPhrase:
            "「CIでPRごとにテストと整形を自動実行します。走らせ忘れを機械が防ぎ、壊れたコードが本流に入らないようにするためです」",
          keywords: ["PRごと", "自動実行", "マージをブロック", "本流を守る"],
        },
      ],
    },

    // =====================================================================
    // Lesson 5: .env と秘匿情報
    // =====================================================================
    {
      id: "day7-lesson5",
      slug: "env-secrets",
      title: ".envと秘匿情報 — 設定と鍵の扱い方",
      summary: "環境ごとの設定と秘密の分離、config()経由で読む理由、マイグレーション共有。",
      blocks: [
        { type: "heading", text: "秘匿情報をコードに書いてはいけない" },
        {
          type: "paragraph",
          text: "DBのパスワード、外部APIのキー、暗号化の鍵といった秘匿情報を、ソースコードに直接書いてGitに入れると、リポジトリを見た全員に鍵が漏れます。これを避けるため、そうした値は [[env]] ファイル(.env)に切り出し、Gitの管理対象から外します。",
        },
        {
          type: "callout",
          variant: "warn",
          title: ".env はコミットしない",
          text: ".env には本番のパスワードや鍵が入るため、.gitignoreで除外して絶対にコミットしません。代わりに、鍵の値を伏せた「.env.example」をコミットし、『どんな設定項目が必要か』だけをチームで共有します。",
        },
        { type: "heading", text: "環境ごとに値を変える" },
        {
          type: "paragraph",
          text: "開発・ステージング・本番では、接続先DBもAPIキーも異なります。コードは同じまま、.envの値だけを環境ごとに差し替えることで、1つのコードベースをどの環境でも動かせます。",
        },
        {
          type: "code",
          language: "bash",
          caption: ".env — 環境ごとに異なる値を持つ(コミットしない)",
          code: `APP_ENV=production
APP_DEBUG=false

DB_HOST=127.0.0.1
DB_DATABASE=shop
DB_USERNAME=shop_user
DB_PASSWORD=ここに本番のパスワード

STRIPE_SECRET=sk_live_xxxxxxxxxxxx`,
        },
        {
          type: "code",
          language: "bash",
          caption: ".env.example — これはコミットする(値は空/ダミー)",
          code: `APP_ENV=local
APP_DEBUG=true

DB_HOST=127.0.0.1
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

STRIPE_SECRET=`,
        },
        { type: "heading", text: "config() 経由で読む理由" },
        {
          type: "compare",
          bad: {
            label: "コードから直接 env() を呼ぶ",
            language: "php",
            code: `// アプリのあちこちで env() を直接呼ぶ
$key = env('STRIPE_SECRET');
// 本番では設定キャッシュ時に env() が null を返し、事故になる`,
          },
          good: {
            label: "config() 経由で読む",
            language: "php",
            code: `// config/services.php で一度だけ env() を読み、キーを定義
// 'stripe' => ['secret' => env('STRIPE_SECRET')]

// アプリ側は config() を使う
$key = config('services.stripe.secret');`,
          },
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ config() を挟むのか",
          text: "Laravelは本番で「config:cache」により設定を1ファイルにまとめて高速化します。このとき env() はキャッシュ後にnullを返すため、コードから直接env()を呼ぶと本番で値が消えます。config()経由なら、設定はconfigファイルで一度だけenv()を読み、以後はキャッシュされた値を使うので安全かつ高速です。設定の入口を一箇所にまとめる意味もあります。",
        },
        { type: "heading", text: "マイグレーションで構造を共有する" },
        {
          type: "paragraph",
          text: "秘匿情報は共有しませんが、DBの『構造』はチームで共有する必要があります。[[migration]] は、テーブルの作成・変更をPHPコードで記述し、Gitで共有する仕組みです。各自が同じマイグレーションを実行すれば、全員のDBが同じ構造になります。初期データが必要なら [[seeder]] を併用します。",
        },
        {
          type: "code",
          language: "bash",
          caption: "マイグレーションで全員のDB構造を揃える",
          code: `# 最新のマイグレーションを適用してテーブルを作る/更新する
php artisan migrate

# 開発用の初期データを投入する
php artisan db:seed`,
        },
        {
          type: "callout",
          variant: "info",
          title: "何を共有し、何を隠すか",
          text: "共有するのは『構造(マイグレーション)』『必要な設定項目の一覧(.env.example)』。隠すのは『実際の鍵やパスワード(.env)』。この線引きが、チームで安全に同じ環境を再現する鍵です。",
        },
        {
          type: "callout",
          variant: "interview",
          title: "面接ではこう言う",
          text: "「鍵やパスワードはコードに書かず.envに切り出し、.gitignoreで除外します。共有するのは項目だけを示す.env.exampleです。アプリからはenv()を直接呼ばずconfig()経由で読みます。本番の設定キャッシュ後にenv()がnullを返す事故を避けるためです。DBの構造はマイグレーションで共有し、初期データはシーダーで揃えます」",
        },
      ],
      questions: [
        {
          id: "day7-lesson5-q1",
          type: "choice",
          question: ".env ファイルを .gitignore で除外する理由は?",
          choices: [
            "ファイルサイズが大きいから",
            "本番のパスワードやAPIキーなどの秘匿情報が含まれ、漏洩を防ぐため",
            "Laravelが読み込めなくなるから",
            "文字コードが特殊だから",
          ],
          answerIndex: 1,
          explanation:
            ".env には本番の鍵やパスワードが入るため、コミットするとリポジトリを見た全員に漏れます。代わりに項目だけを示す.env.exampleを共有します。",
        },
        {
          id: "day7-lesson5-q2",
          type: "choice",
          question: "アプリのコードから env() を直接呼ばず、config() 経由で読むべき理由は?",
          choices: [
            "env() は動作が遅いから",
            "本番の設定キャッシュ後は env() が null を返し、値が消えて事故になるから",
            "config() の方が短く書けるから",
            "env() は非推奨で削除されたから",
          ],
          answerIndex: 1,
          explanation:
            "本番でconfig:cacheを行うと、キャッシュ後にenv()はnullを返します。config()経由なら設定ファイルで一度だけenv()を読むため、キャッシュ後も値が保たれ安全です。",
        },
        {
          id: "day7-lesson5-q3",
          type: "free",
          question: "チーム開発で『何を共有し、何を隠すか』を、.envとマイグレーションの観点で説明してください。",
          modelAnswer:
            "隠すのは実際の鍵やパスワードで、これらは.envに入れて.gitignoreで除外し、コミットしません。共有するのは、必要な設定項目の一覧を示す.env.exampleと、DBの構造を記述したマイグレーションです。マイグレーションを全員が実行すれば同じテーブル構造が再現でき、初期データはシーダーで揃えます。つまり構造と設定項目の枠組みは共有し、実際の秘密の値だけを各環境に閉じて持つ、という線引きをします。",
          interviewPhrase:
            "「構造はマイグレーション、設定項目は.env.exampleで共有し、実際の鍵は.envに隠します。枠組みは共有し、秘密の値だけ各環境に閉じる、と説明します」",
          keywords: [".gitignore", ".env.example", "マイグレーション", "構造を共有"],
        },
      ],
    },
  ],
};
