import type { Day } from "@/types";

export const day0: Day = {
  day: 0,
  slug: "day0",
  title: "Laravelを読むための最低限PHP",
  goal: "PHPを触ったことがなくても、Laravelのコード例に出てくる「$変数」「連想配列」「関数・クロージャ」「クラスと -> や ::」「namespace と use」「型宣言や ?? などの新しい書き方」を見て、それが何をしているか自分の言葉で読み解けるようになる。",
  lessons: [
    // ================================================================
    // Lesson 1: PHPの基本 — 実行の仕組みと変数・型・出力
    // ================================================================
    {
      id: "day0-lesson1",
      slug: "php-basics",
      title: "PHPの基本 — どこで動く?変数と型と出力",
      summary: "PHPがサーバー側で動く言語であること、変数($name)、基本の型、echoでの出力、文字列の連結と埋め込みを理解する。",
      blocks: [
        {
          type: "heading",
          text: "PHPは「サーバー側」で動く言語",
        },
        {
          type: "paragraph",
          text: "まずは肩の力を抜いてください。ここはLaravelを読むための準備運動です。PHPは、Webサーバーの中で動いて「HTMLなどの文字列を作って返す」ための言語です。ブラウザ(あなたのPC)で動くJavaScriptと違い、PHPはサーバー側で処理を終え、その結果だけがブラウザに届きます。つまりブラウザの画面を右クリックして「ソースを表示」しても、PHPのコードそのものは見えません。見えるのはPHPが生成し終えたHTMLだけです。",
        },
        {
          type: "paragraph",
          text: "PHPのコードは「ここからPHPですよ」という合図の「<?php」というタグの後ろに書きます。1つのファイルの中でHTMLとPHPを混ぜることもできますが、Laravelのクラスファイルは中身がほぼPHPだけなので、先頭に「<?php」が1行あるのが普通です。命令の区切りは文末のセミコロン「;」で表します。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\n// 「//」で始まる行はコメント(実行されないメモ書き)です。\necho \"こんにちは\"; // echo は「画面に出力する」命令。文末は必ずセミコロン;",
          caption: "最小のPHP。<?php で始まり、echo で文字列を出力する。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ文末に「;」が要るのか",
          text: "PHPは1つの命令の区切りをセミコロン「;」で判断します。日本語の句点「。」のようなものです。これが無いと「命令がどこで終わったか」が分からず、エラーになります。初心者が最初に一番よく出すエラーがこの付け忘れなので、まずここを覚えておくと安心です。",
        },
        {
          type: "heading",
          text: "変数は「$」から始まる",
        },
        {
          type: "paragraph",
          text: "変数とは「値を入れておく名前付きの箱」です。PHPでは変数の名前は必ず「$」で始めます。たとえば「$name」は「nameという名前の箱」という意味です。Laravelのコードには「$user」「$request」など「$」付きの言葉が大量に出てきますが、これは全部「変数=何かが入っている箱」だと思ってください。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\n$name = \"田中\";   // 文字列(string):文字の並び。ダブルクォートかシングルクォートで囲む\n$age  = 30;        // 整数(int):小数点のない数\n$rate = 1.08;      // 浮動小数点数(float):小数を含む数\n$isAdmin = true;   // 真偽値(bool):true(真)か false(偽)の2択\n$note = null;      // null:「値が何も無い」ことを表す特別な値\n\necho $name; // → 田中",
          caption: "変数への代入(=)と、PHPの基本の型。「=」は「等しい」ではなく「右の値を左の箱に入れる」の意味。",
        },
        {
          type: "heading",
          text: "文字列の連結「.」と、変数の埋め込み",
        },
        {
          type: "paragraph",
          text: "PHPでは、文字列と文字列をつなげるのにプラス「+」ではなく、ドット「.」を使います。ここはJavaScriptなど他の言語と違うので、最初につまずきやすいポイントです。また、ダブルクォート「\"」で囲んだ文字列の中では、変数をそのまま書くと中身に置き換わります(これを「変数の埋め込み」と呼びます)。",
        },
        {
          type: "compare",
          bad: {
            label: "連結のつもりで + を使う(PHPでは間違い)",
            language: "php",
            code: "<?php\n$name = \"田中\";\n// PHPで文字列を + でつなごうとすると意図通りにならない\necho \"こんにちは \" + $name; // 数値扱いされ 0 などになりバグの元",
          },
          good: {
            label: "「.」で連結、または \"\" 内に埋め込む(正しい)",
            language: "php",
            code: "<?php\n$name = \"田中\";\necho \"こんにちは \" . $name . \" さん\"; // ドットで連結\necho \"こんにちは $name さん\";          // \"\" 内は変数がそのまま展開される",
          },
        },
        {
          type: "callout",
          variant: "warn",
          title: "シングルクォートでは埋め込まれない",
          text: "変数が中身に置き換わるのはダブルクォート「\"」の中だけです。シングルクォート「'」で囲むと、'こんにちは $name' は文字どおり「$name」という文字として出力されます。「変数を展開したいならダブルクォート」と覚えてください。なお、コメント行の「//」もあわせて押さえておくと、以降のコード例が読みやすくなります。",
        },
        {
          type: "callout",
          variant: "info",
          title: "Laravelではこう出てくる",
          text: "Laravelのコントローラでは、下のように「$request から受け取った値を変数に入れて、\"\" の中に埋め込む」書き方が日常的に出てきます。今日学んだ「$変数」と「文字列の埋め込み」がそのまま使われています。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\n// Laravelのコントローラの一部(雰囲気をつかむための断片)\npublic function greet(Request $request)\n{\n    $name = $request->input(\"name\"); // 送られてきた名前を変数に入れる\n    return \"ようこそ $name さん\";       // \"\" 内に変数を埋め込んで返す\n}",
          caption: "「$変数」「\"\"内の埋め込み」がLaravelでもそのまま使われている例(-> の意味はレッスン4で学ぶ)。",
        },
      ],
      questions: [
        {
          id: "day0-lesson1-q1",
          type: "choice",
          question: "PHPで2つの文字列をつなげる(連結する)ときに使う記号はどれか。",
          choices: ["+(プラス)", ".(ドット)", "&(アンパサンド)", "->(アロー)"],
          answerIndex: 1,
          explanation: "PHPの文字列連結はドット「.」です。「+」は数値の足し算に使われるため、文字列を「+」でつなごうとすると意図しない結果になります。ここは他言語経験者ほど間違えやすいポイントです。",
        },
        {
          id: "day0-lesson1-q2",
          type: "choice",
          question: "「$name = \"田中\";」のとき、echo で「こんにちは 田中」と出力されるのはどれか。",
          choices: [
            "echo 'こんにちは $name';",
            "echo \"こんにちは $name\";",
            "echo こんにちは $name;",
            "echo \"こんにちは\" + $name;",
          ],
          answerIndex: 1,
          explanation: "変数が中身に展開されるのはダブルクォート「\"」の中だけです。シングルクォート「'」では「$name」がそのまま文字として出力され、「+」はPHPでは文字列連結になりません。",
        },
        {
          id: "day0-lesson1-q3",
          type: "free",
          question: "PHPが「サーバーサイドで動く」とはどういう意味か、未経験の人にも分かるように説明してください。",
          modelAnswer: "PHPはブラウザではなくWebサーバーの中で実行される言語です。サーバー側でPHPが処理を行い、HTMLなどの文字列を組み立て、その完成した結果だけがブラウザに送られます。そのためブラウザ側でソースを見てもPHPのコードは見えず、生成されたHTMLだけが見えます。LaravelはこのサーバーサイドでPHPを動かし、リクエストに応じたレスポンスを作る仕組みを整理してくれるものです。",
          interviewPhrase: "「PHPはサーバー側で動いてHTMLを組み立て、その結果だけをブラウザに返す言語です。だからブラウザにコードは見えず、Laravelはこのサーバーサイド処理を整理する役割を担います」",
          keywords: ["サーバーサイド", "ブラウザに結果だけ返す", "HTMLを生成", "レスポンス"],
        },
      ],
    },

    // ================================================================
    // Lesson 2: 配列と連想配列
    // ================================================================
    {
      id: "day0-lesson2",
      slug: "php-arrays",
      title: "配列と連想配列 — Laravelのデータの正体",
      summary: "順番で並べる配列と、キーと値で持つ連想配列。foreachでの繰り返し、多次元配列、[]短縮記法を理解する。",
      blocks: [
        {
          type: "heading",
          text: "配列とは「たくさんの値をまとめて入れる箱」",
        },
        {
          type: "paragraph",
          text: "変数が「値を1つ入れる箱」なら、配列は「値をいくつも並べて入れられる箱」です。買い物リストのように、複数の値を1つの名前でまとめて持てます。PHPでは配列を角かっこ「[]」で作ります(この「[]」を使う書き方を「短縮記法」と呼びます。昔は array() と書きましたが、今はほぼ [] です)。たとえば「$fruits = [\"りんご\", \"みかん\"];」とすると、$fruits[0] が「りんご」になります。番号(添字)が1ではなく0から始まる点に注意してください。",
        },
        {
          type: "heading",
          text: "連想配列 — 「キー => 値」で持つ",
        },
        {
          type: "paragraph",
          text: "ここがこのレッスンの主役です。連想配列(れんそうはいれつ)は、値に「番号」ではなく「名前(キー)」を付けて持つ配列です。キーと値は矢印のような記号「=>」で結びます。「name というキーには 田中 という値」という具合です。辞書やラベル付きの引き出しをイメージしてください。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\n// 連想配列:キー => 値 の組を並べる\n$user = [\n    \"name\" => \"田中\",\n    \"age\"  => 30,\n    \"admin\" => true,\n];\n\necho $user[\"name\"]; // → 田中(キーを指定して値を取り出す)\necho $user[\"age\"];  // → 30",
          caption: "連想配列。キー(name, age...)を指定して値を取り出す。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ連想配列が超重要なのか",
          text: "Laravelでは、設定・データベースから取った1件のデータ・フォームで送られてきた入力値・APIのやり取りなど、あらゆる「まとまったデータ」が連想配列(または連想配列のように振る舞うオブジェクト)で表されます。つまり連想配列の「キーで値を取り出す」感覚が分かっていないと、Laravelのコードはほとんど読めません。逆にここさえ掴めば一気に読めるようになります。",
        },
        {
          type: "heading",
          text: "foreach — 配列を1個ずつ取り出して繰り返す",
        },
        {
          type: "paragraph",
          text: "配列の中身を1つずつ取り出して処理したいときは「foreach」を使います。読み方は「フォーイーチ」。「配列の要素それぞれについて(for each)、こうする」という意味です。連想配列では「キーと値の両方」を一度に受け取れます。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\n$user = [\"name\" => \"田中\", \"age\" => 30];\n\n// $key にキー、$value に値が1組ずつ入り、中の処理が繰り返される\nforeach ($user as $key => $value) {\n    echo \"$key は $value です\\n\";\n}\n// → name は 田中 です\n// → age は 30 です\n\n// 値だけで十分なら $key => は省略できる\n$fruits = [\"りんご\", \"みかん\"];\nforeach ($fruits as $fruit) {\n    echo $fruit . \"\\n\";\n}",
          caption: "foreach ($配列 as $キー => $値) で、要素を1組ずつ取り出して繰り返す。",
        },
        {
          type: "heading",
          text: "多次元配列 — 配列の中に配列",
        },
        {
          type: "paragraph",
          text: "配列の要素として、さらに配列を入れることもできます。これを多次元配列と呼びます。たとえば「ユーザーの一覧(=ユーザーという連想配列が複数並んだ配列)」はまさにこの形です。DBから複数件のデータを取ってくると、たいていこの形になり、foreach で1件ずつ取り出して、さらにキーで中の値にアクセスします。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\n// 連想配列が3つ並んだ配列(= ユーザー一覧)\n$users = [\n    [\"name\" => \"田中\", \"age\" => 30],\n    [\"name\" => \"鈴木\", \"age\" => 25],\n    [\"name\" => \"佐藤\", \"age\" => 40],\n];\n\nforeach ($users as $user) {\n    // $user は1件分の連想配列。キーで中の値を取り出す\n    echo $user[\"name\"] . \"(\" . $user[\"age\"] . \"歳)\\n\";\n}",
          caption: "多次元配列。foreachで1件ずつ取り出し、さらにキーで中の値にアクセスする。",
        },
        {
          type: "callout",
          variant: "info",
          title: "Laravelではこう出てくる",
          text: "Laravelのビューに渡すデータや設定ファイルは、まさにこの連想配列です。下は設定ファイル(config)の一部で、「キー => 値」がそのまま使われています。今日の連想配列が読めれば、Laravelの設定も読めます。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\n// Laravelの設定ファイル config/app.php の雰囲気\nreturn [\n    \"name\" => \"My App\",\n    \"env\"  => \"production\",\n    \"providers\" => [\n        \"App\\\\Providers\\\\AppServiceProvider\",\n        \"App\\\\Providers\\\\RouteServiceProvider\",\n    ],\n];",
          caption: "Laravelの設定はまるごと連想配列。「providers」キーの値はさらに配列(多次元)。",
        },
      ],
      questions: [
        {
          id: "day0-lesson2-q1",
          type: "choice",
          question: "連想配列でキーと値を結びつけるのに使う記号はどれか。",
          choices: ["->", "=>", "::", ":="],
          answerIndex: 1,
          explanation: "連想配列は「キー => 値」の形で書きます。「->」はオブジェクトのメンバーアクセス、「::」は静的メンバーアクセスで、どちらも別物です(レッスン4で学びます)。",
        },
        {
          id: "day0-lesson2-q2",
          type: "choice",
          question: "「$user = [\"name\" => \"田中\"];」から「田中」を取り出す正しい書き方はどれか。",
          choices: ["$user->name", "$user[0]", "$user[\"name\"]", "$user::name"],
          answerIndex: 2,
          explanation: "連想配列は「キー」を角かっこで指定して値を取り出します。ここでは $user[\"name\"] が正解です。$user[0] は番号での指定なので、この連想配列には該当するキーがありません。",
        },
        {
          id: "day0-lesson2-q3",
          type: "free",
          question: "なぜ連想配列を理解することがLaravelを読むうえで特に重要なのか説明してください。",
          modelAnswer: "Laravelでは、設定・データベースから取得したデータ・フォームの入力値・APIのやり取りなど、あらゆる「まとまったデータ」が連想配列、または連想配列のように振る舞うオブジェクトで表現されます。連想配列は「キーで値を取り出す」構造なので、この感覚が身についていないと、Laravelのコードでデータが何をどう保持しているのか読み取れません。逆にこの構造さえ理解すれば、設定ファイルもリクエストのデータも一気に読めるようになります。",
          interviewPhrase: "「Laravelの設定・DBのデータ・リクエストは、ほぼすべてキーと値を持つ連想配列で表されます。だから連想配列の読み方が、Laravelを読むための土台になります」",
          keywords: ["キーと値", "設定", "リクエスト", "DBのデータ", "土台"],
        },
      ],
    },

    // ================================================================
    // Lesson 3: 関数・クロージャ・アロー関数
    // ================================================================
    {
      id: "day0-lesson3",
      slug: "php-functions",
      title: "関数・無名関数・アロー関数 — 処理を渡す考え方",
      summary: "関数の定義、引数と戻り値、無名関数(クロージャ)、アロー関数、そして「処理を値として渡す」コールバックの考え方を理解する。",
      blocks: [
        {
          type: "heading",
          text: "関数とは「名前を付けた処理のまとまり」",
        },
        {
          type: "paragraph",
          text: "関数とは、いくつかの処理をひとまとめにして名前を付けたものです。一度定義すれば、その名前を呼ぶだけで何度でも同じ処理を実行できます。関数には「引数(ひきすう)」という入り口から値を渡し、「戻り値(もどりち)」という出口から結果を受け取ります。自動販売機に例えると、お金を入れる(引数)と、飲み物が出てくる(戻り値)イメージです。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\n// function 関数名(引数) { 処理; return 戻り値; }\nfunction add($a, $b)\n{\n    return $a + $b; // return で結果を呼び出し元に返す\n}\n\n$result = add(3, 5); // 引数として 3 と 5 を渡す\necho $result;        // → 8",
          caption: "関数の定義と呼び出し。$a と $b が引数、return の後ろが戻り値。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ return が要るのか",
          text: "echo は「その場で画面に出す」だけで、値を後で使うことはできません。return は「計算した結果を呼び出し元に持ち帰る」ための命令です。結果を変数に入れたり、別の処理に渡したりしたいときは return が必要になります。Laravelのコントローラも最後に return でレスポンスを返すので、この考え方は必ず出てきます。",
        },
        {
          type: "heading",
          text: "無名関数(クロージャ)— 名前のない使い捨ての関数",
        },
        {
          type: "paragraph",
          text: "関数の中には「その場で1回だけ使いたいから、名前を付けるまでもない」ものがあります。そういう名前のない関数を「無名関数」または「クロージャ」と呼びます。書き方は「function() { ... }」のように、function の後ろに名前を書かないだけです。そして重要なのは、この無名関数を「変数に入れたり、別の関数に引数として渡せる」という点です。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\n// 無名関数(クロージャ)を変数に入れる\n$greet = function ($name) {\n    return \"こんにちは $name さん\";\n};\n\necho $greet(\"田中\"); // → こんにちは 田中 さん(変数を関数のように呼べる)",
          caption: "名前のない関数を変数 $greet に入れ、後から $greet(...) で呼び出す。",
        },
        {
          type: "paragraph",
          text: "無名関数の中でも「1つの式を返すだけ」の短いものは、アロー関数という省略記法でもっと短く書けます。「fn(引数) => 式」の形で、矢印「=>」の右の式の結果がそのまま戻り値になります(return を書きません)。次の対比で、同じ処理が無名関数とアロー関数でどれだけ短くなるかを見てください。",
        },
        {
          type: "compare",
          bad: {
            label: "無名関数(やや長い)",
            language: "php",
            code: "<?php\n$double = function ($x) {\n    return $x * 2;\n};\necho $double(4); // → 8",
          },
          good: {
            label: "アロー関数(同じ意味を短く)",
            language: "php",
            code: "<?php\n$double = fn($x) => $x * 2; // fn と => で完結。return 不要\necho $double(4); // → 8",
          },
        },
        {
          type: "heading",
          text: "コールバック — 処理そのものを引数として渡す",
        },
        {
          type: "paragraph",
          text: "無名関数やアロー関数が便利なのは「処理を値のように、別の関数へ引数として渡せる」からです。こうして渡される関数を「コールバック」と呼びます。「どう繰り返すか」は既存の仕組みに任せ、「各要素に何をするか」だけを自分の関数として渡す、という分担ができます。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\n$numbers = [1, 2, 3, 4];\n\n// array_map(コールバック, 配列):各要素にコールバックを適用した新しい配列を返す\n$doubled = array_map(fn($n) => $n * 2, $numbers);\n\nprint_r($doubled); // → [2, 4, 6, 8]",
          caption: "array_map に「各要素を2倍にする処理」をアロー関数として渡している。この関数がコールバック。",
        },
        {
          type: "callout",
          variant: "info",
          title: "Laravelではこう出てくる",
          text: "Laravelのルーティング(どのURLでどの処理を動かすかの定義)は、まさに「無名関数をコールバックとして渡す」形で書かれます。下の Route::get の第2引数がクロージャです。今日の「処理を関数として渡す」考え方がそのまま使われています(:: の意味はレッスン4で学びます)。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\n// Laravelのルート定義 routes/web.php\nRoute::get(\"/hello\", function () {\n    return \"Hello World\"; // このクロージャが /hello にアクセスされたときに実行される\n});\n\n// コレクション操作でもクロージャ/アロー関数を渡す\n$names = collect([\"tanaka\", \"suzuki\"])->map(fn($n) => strtoupper($n));",
          caption: "ルート定義の第2引数はクロージャ。コレクションの map にもアロー関数を渡す。処理を値として渡す考え方が随所に出てくる。",
        },
      ],
      questions: [
        {
          id: "day0-lesson3-q1",
          type: "choice",
          question: "アロー関数「fn($x) => $x * 2」について正しい説明はどれか。",
          choices: [
            "$x を2で割った結果を返す",
            "$x を2倍した結果を返す。=> の右の式がそのまま戻り値になる",
            "$x に2を代入する",
            "何も返さず、画面に出力するだけ",
          ],
          answerIndex: 1,
          explanation: "アロー関数は「fn(引数) => 式」の形で、矢印の右の式の結果がそのまま戻り値になります。return を書かなくても値が返る点が、通常の無名関数との違いです。",
        },
        {
          id: "day0-lesson3-q2",
          type: "choice",
          question: "「コールバック」とは何を指すか。",
          choices: [
            "後で電話をかけ直す機能",
            "別の関数に引数として渡される関数(処理)",
            "エラーが起きたときに戻る処理",
            "データベースへの接続",
          ],
          answerIndex: 1,
          explanation: "コールバックとは、別の関数に引数として渡される関数(処理)のことです。array_map や Laravelのルート定義のように「繰り返しや振り分けは既存の仕組みに任せ、各場面で何をするかだけを関数として渡す」形で多用されます。",
        },
        {
          id: "day0-lesson3-q3",
          type: "free",
          question: "無名関数(クロージャ)やアロー関数がLaravelで多用される理由を、コールバックという言葉を使って説明してください。",
          modelAnswer: "無名関数やアロー関数は、名前を付けずにその場で処理を定義し、それを値として別の関数へ引数(コールバック)として渡せます。Laravelでは、ルート定義で「このURLに来たら実行する処理」を渡したり、コレクション操作で「各要素にどんな処理をするか」を渡したりと、処理そのものを受け取る仕組みが多くあります。そのため、その場限りの処理を短く書けるクロージャやアロー関数が自然と多用されます。",
          interviewPhrase: "「クロージャは名前のない使い捨ての関数で、処理を値として渡せます。Laravelはルート定義やコレクション操作でこの処理(コールバック)を受け取るので、クロージャやアロー関数が多用されます」",
          keywords: ["無名関数", "コールバック", "処理を渡す", "ルート定義", "コレクション"],
        },
      ],
    },

    // ================================================================
    // Lesson 4: クラスとオブジェクト、-> と ::
    // ================================================================
    {
      id: "day0-lesson4",
      slug: "php-oop",
      title: "クラスとオブジェクト — -> と :: の違い",
      summary: "クラス・オブジェクト・new・プロパティ・メソッド・$this・コンストラクタ・可視性・static・定数、そして初心者最大の壁「->」と「::」の違いを理解する。",
      blocks: [
        {
          type: "heading",
          text: "クラスは「設計図」、オブジェクトは「その実物」",
        },
        {
          type: "paragraph",
          text: "クラスとは「こういうデータと、こういう動作を持ったものを作る」という設計図です。そして、その設計図から実際に作り出した実物を「オブジェクト」または「インスタンス」と呼びます。たい焼きで例えるなら、金型がクラス、そこから焼き上がった1つ1つのたい焼きがオブジェクトです。設計図(クラス)は1つでも、実物(オブジェクト)はいくつも作れます。オブジェクトが持つ「データ」を「プロパティ」、「動作」を「メソッド」と呼びます。プロパティは変数、メソッドは関数の、クラスの中版だと考えてください。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\nclass User\n{\n    public $name; // プロパティ(このオブジェクトが持つデータ)\n\n    // メソッド(このオブジェクトができる動作)\n    public function hello()\n    {\n        // $this は「このオブジェクト自身」を指す\n        return \"こんにちは \" . $this->name . \" さん\";\n    }\n}\n\n// new でクラス(設計図)から実物(オブジェクト)を作る\n$user = new User();\n$user->name = \"田中\";     // -> でプロパティに値を入れる\necho $user->hello();       // -> でメソッドを呼ぶ → こんにちは 田中 さん",
          caption: "クラス定義と new。$this は「自分自身」、-> でプロパティやメソッドにアクセスする。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ $this が要るのか",
          text: "メソッドの中から「このオブジェクト自身が持つプロパティ」を触りたいとき、単に $name と書くと「メソッド内のただの変数」と区別がつきません。$this->name と書くことで「今処理している、このオブジェクト自身の name プロパティ」だと明確に指し示せます。$this は「自分自身」を指す合言葉だと覚えてください。",
        },
        {
          type: "heading",
          text: "コンストラクタ __construct — 生まれた瞬間の初期設定",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\n// new した瞬間に自動で1回だけ呼ばれる特別なメソッドが「コンストラクタ」。\n// 名前は必ず __construct(アンダースコア2つ)。作られたと同時に初期値をセットする。\nclass User\n{\n    public $name;\n\n    // new User(\"田中\") とした瞬間に自動で呼ばれる\n    public function __construct($name)\n    {\n        $this->name = $name; // 受け取った値を自分のプロパティに保存\n    }\n}\n\n$user = new User(\"田中\"); // ここで __construct が動く\necho $user->name;          // → 田中",
          caption: "コンストラクタは new と同時に自動実行され、初期値をセットする。可視性(public/private/protected)は次のセクションで扱う。",
        },
        {
          type: "heading",
          text: "可視性(public / private / protected)",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "public(公開):クラスの外からでも自由に触れる",
            "private(非公開):そのクラスの中からしか触れない。外に見せたくない内部データに使う",
            "protected(限定公開):そのクラス自身と、それを受け継いだクラス(継承先)からだけ触れる",
          ],
        },
        {
          type: "heading",
          text: "最大の壁:「->」と「::」の違い",
        },
        {
          type: "paragraph",
          text: "PHP初心者が最もつまずくのがこの2つの矢印です。結論から言うと、対象が「new して作った実物(オブジェクト)」か「クラスそのもの」かで使い分けます。「->」(アロー)は new で作った実物のプロパティやメソッドに使い(例: $user->name)、「::」(ダブルコロン、スコープ解決演算子)はクラスそのものに属する static メンバーや定数に使います(例: User::create()、User::MAX_AGE)。ここで「static(静的)」とは、実物を作らなくても「クラスそのものに属する」共有のメンバーのことで、「const」で定義する定数と同じく new せずに「::」で使えます。",
        },
        {
          type: "compare",
          bad: {
            label: "「->」実物(オブジェクト)に対して使う",
            language: "php",
            code: "<?php\n$user = new User(\"田中\"); // まず new で実物を作る\necho $user->name;          // 実物のプロパティ\necho $user->hello();       // 実物のメソッド\n// $obj->method() = 「作った実物に対して」呼ぶ",
          },
          good: {
            label: "「::」クラスそのものに対して使う",
            language: "php",
            code: "<?php\necho User::MAX_AGE;   // クラスの定数(new 不要)\n$user = User::create(); // クラスの static メソッド(new 不要)\n// Class::method() = 「クラスに対して直接」呼ぶ",
          },
        },
        {
          type: "callout",
          variant: "warn",
          title: "覚え方のコツ",
          text: "「実物(オブジェクト)を作ってから触るなら ->」「実物を作らずクラスに直接触るなら ::」と覚えてください。$小文字の変数の後ろは大体「->」、先頭大文字のクラス名の後ろは大体「::」という見た目の目印も、最初のうちは役に立ちます。",
        },
        {
          type: "callout",
          variant: "info",
          title: "Laravelではこう出てくる",
          text: "Laravelのコードは「->」と「::」だらけです。下の例で両方の使い分けを見てください。Route や User(モデル)のように「クラス名::」で始まるものと、$user のように「実物->」で続くものが混在します。今日の区別ができれば、この行が読めます。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\n// User はクラス。:: でクラスに直接メソッドを呼び、1件取得する\n$user = User::find(1);\n\n// $user は取得できた「実物」。-> でプロパティやメソッドにアクセス\necho $user->name;\n$user->save();\n\n// Route もクラス。:: で get メソッドを呼ぶ\nRoute::get(\"/users\", function () {\n    return User::all(); // User クラスに :: で all を呼ぶ\n});",
          caption: "「クラス名::」と「実物->」が混在するLaravelの典型例。区別の目印は、先頭が大文字のクラス名か、$付きの変数か。",
        },
      ],
      questions: [
        {
          id: "day0-lesson4-q1",
          type: "choice",
          question: "「$user->name」と「User::MAX_AGE」の違いとして正しいものはどれか。",
          choices: [
            "どちらも同じ意味で、書き方が違うだけ",
            "-> は new で作った実物(オブジェクト)に、:: はクラスそのものに属するメンバーに使う",
            ":: は実物に、-> はクラスに使う(逆)",
            "-> は文字列連結、:: は割り算に使う",
          ],
          answerIndex: 1,
          explanation: "「->」は new で作ったオブジェクト(実物)のプロパティ・メソッドに、「::」はクラスそのものに属する static メンバーや定数に使います。対象が「実物」か「クラス」かで使い分けるのがポイントです。",
        },
        {
          id: "day0-lesson4-q2",
          type: "choice",
          question: "オブジェクトを new した瞬間に自動で1回だけ呼ばれ、初期値をセットするのに使う特別なメソッドはどれか。",
          choices: ["__init", "__construct", "__main", "__new"],
          answerIndex: 1,
          explanation: "コンストラクタは「__construct」(アンダースコア2つ)という名前で、new と同時に自動で呼ばれます。ここで受け取った引数を $this->プロパティ に保存して初期化するのが定番です。",
        },
        {
          id: "day0-lesson4-q3",
          type: "free",
          question: "メソッドの中で使う「$this」とは何を指すか、なぜ必要かを説明してください。",
          modelAnswer: "$this は「今まさに処理をしている、そのオブジェクト自身」を指す特別な変数です。メソッドの中から、自分のオブジェクトが持つプロパティや他のメソッドにアクセスするために使います。たとえば $this->name と書くと「このオブジェクト自身の name プロパティ」を意味します。単に $name と書くとメソッド内のただの変数と区別できないため、自分自身のメンバーだと明示するために $this が必要になります。",
          interviewPhrase: "「$this はそのオブジェクト自身を指す変数で、メソッドの中から自分のプロパティやメソッドにアクセスするために使います」",
          keywords: ["オブジェクト自身", "プロパティ", "メソッド", "$this->name"],
        },
      ],
    },

    // ================================================================
    // Lesson 5: 名前空間・use・オートロード
    // ================================================================
    {
      id: "day0-lesson5",
      slug: "php-namespace",
      title: "名前空間とuse — App\\Http\\Controllers を読む",
      summary: "namespaceでクラスを整理し、useでインポートする仕組み。1ファイル1クラスの慣習とComposerによるオートロードを理解する。",
      blocks: [
        {
          type: "heading",
          text: "名前空間(namespace)は「クラスの住所」",
        },
        {
          type: "paragraph",
          text: "大きなアプリになると、クラスの数は何百にもなります。すると「User」という同じ名前のクラスを別の目的で作りたいことも出てきます。そこで、クラスに「住所(所属)」を付けて区別する仕組みが名前空間(namespace)です。フォルダで書類を整理するのと同じ発想で、名前空間はバックスラッシュ「\\」で階層を区切ります。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\n// このファイルのクラスは App\\Models という名前空間に属する、と宣言\nnamespace App\\Models;\n\nclass User\n{\n    // ...\n}\n\n// このクラスの「フルネーム(完全修飾名)」は App\\Models\\User になる",
          caption: "ファイル冒頭の namespace 宣言で、クラスの所属(住所)を決める。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ名前空間が要るのか",
          text: "名前空間がないと、アプリ全体でクラス名が1つでも重複した瞬間に衝突してエラーになります。名前空間で「住所」を分けておけば、App\\Models\\User と App\\Admin\\User のように、同じ User という名前でも別物として共存できます。大規模なLaravelアプリが破綻せず整理される土台がこれです。",
        },
        {
          type: "heading",
          text: "use — 別の名前空間のクラスを呼び込む",
        },
        {
          type: "paragraph",
          text: "別の名前空間にあるクラスを使いたいとき、毎回「App\\Models\\User」とフルネームで書くのは大変です。そこでファイル冒頭に「use App\\Models\\User;」と1行書いておくと、そのファイルの中では短く「User」と書くだけで使えるようになります。これを「インポート(取り込み)」と呼びます。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\nnamespace App\\Http\\Controllers;\n\nuse App\\Models\\User; // User クラスをこのファイルに取り込む\n\nclass UserController\n{\n    public function show()\n    {\n        // use のおかげでフルネームでなく User と短く書ける\n        return User::all();\n    }\n}",
          caption: "use でクラスを取り込むと、以降は短い名前で参照できる。",
        },
        {
          type: "heading",
          text: "1ファイル1クラス と オートロード",
        },
        {
          type: "paragraph",
          text: "PHPの現代的な慣習では「1つのファイルに1つのクラスを書き、ファイル名をクラス名に合わせる」ことになっています(例: User クラスは User.php)。そして、名前空間とフォルダ構成を対応させておくと、クラスを使った瞬間に対応するファイルを自動で読み込んでくれます。これを「オートロード」と呼びます。",
        },
        {
          type: "paragraph",
          text: "このオートロードを担うのが [[composer]] です。Composerは、名前空間「App\\」がフォルダ「app/」に対応する、といったルールを管理しており、あなたが手動で require(ファイルの読み込み命令)を書かなくても、必要なクラスを自動で見つけて読み込んでくれます。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜオートロードがありがたいのか",
          text: "オートロードが無かった時代は、クラスを使うたびに「このファイルを読み込む」という require 文を人間が手で書いていました。数百クラスあると管理は地獄です。名前空間とフォルダを対応させ、Composerに任せることで、この面倒が完全に消えます。だからLaravelのファイルには require がほとんど出てきません。",
        },
        {
          type: "callout",
          variant: "info",
          title: "Laravelではこう出てくる",
          text: "Laravelのコントローラは必ず名前空間の宣言と use から始まります。ファイルのパス app/Http/Controllers/UserController.php が、名前空間 App\\Http\\Controllers\\UserController にそのまま対応しているのが分かります。今日の知識で、この冒頭数行の意味が読めます。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\nnamespace App\\Http\\Controllers; // フォルダ app/Http/Controllers に対応\n\nuse App\\Models\\User;                       // 使うクラスを取り込む\nuse Illuminate\\Http\\Request;              // Laravel本体のクラスを取り込む\n\nclass UserController extends Controller\n{\n    public function index()\n    {\n        return User::all(); // Composerが App\\Models\\User を自動読込\n    }\n}",
          caption: "「namespace」+「use」で始まるLaravelコントローラ。パスと名前空間が対応し、読み込みはComposerが自動で行う。",
        },
      ],
      questions: [
        {
          id: "day0-lesson5-q1",
          type: "choice",
          question: "ファイル冒頭の「use App\\Models\\User;」は何のための行か。",
          choices: [
            "User クラスを新しく定義している",
            "User クラスをこのファイルに取り込み、以降 User と短く書けるようにしている",
            "User という変数を作っている",
            "User クラスを削除している",
          ],
          answerIndex: 1,
          explanation: "use はクラスの「インポート(取り込み)」です。フルネーム App\\Models\\User を毎回書く代わりに、use しておけばファイル内では短く User と書けます。定義や変数生成ではありません。",
        },
        {
          id: "day0-lesson5-q2",
          type: "choice",
          question: "Laravelのファイルに require(手動の読み込み命令)がほとんど出てこないのはなぜか。",
          choices: [
            "Laravelでは1つのファイルに全クラスをまとめて書くから",
            "Composerが名前空間とフォルダの対応をもとにクラスを自動で読み込む(オートロード)から",
            "PHPは読み込みという概念が無いから",
            "クラスは使う直前に毎回コピーするから",
          ],
          answerIndex: 1,
          explanation: "名前空間とフォルダ構成を対応させ、Composerがオートロードを担うため、人間が require を書かなくても必要なクラスが自動で読み込まれます。だからLaravelのコードには require がほとんど現れません。",
        },
        {
          id: "day0-lesson5-q3",
          type: "free",
          question: "「App\\Http\\Controllers\\UserController」という表記が何を意味するか、名前空間の観点から説明してください。",
          modelAnswer: "これは UserController というクラスの「フルネーム(完全修飾名)」で、そのクラスが App\\Http\\Controllers という名前空間に属していることを表します。名前空間はクラスの住所のようなもので、バックスラッシュで階層を区切ります。慣習として名前空間はフォルダ構成に対応するため、この表記は実ファイル app/Http/Controllers/UserController.php に対応します。名前空間で住所を分けることで、同名のクラスが衝突せず共存でき、Composerがこの対応をもとにファイルを自動で読み込みます。",
          interviewPhrase: "「これはクラスの完全修飾名で、UserController が App\\Http\\Controllers という名前空間に属することを示します。名前空間はクラスの住所で、フォルダ構成と対応し、Composerのオートロードの基盤になります」",
          keywords: ["名前空間", "完全修飾名", "フォルダ構成に対応", "衝突を防ぐ", "オートロード"],
        },
      ],
    },

    // ================================================================
    // Lesson 6: モダンPHP — 型宣言・null関連・例外・interface/trait
    // ================================================================
    {
      id: "day0-lesson6",
      slug: "php-modern",
      title: "モダンPHP — 型宣言・null・例外・interfaceとtrait",
      summary: "引数と戻り値の型宣言、null許容 ?string、null合体 ??、nullsafe ?->、例外の try/catch/throw、interfaceとtraitのさわりを理解する。",
      blocks: [
        {
          type: "heading",
          text: "型宣言 — 引数と戻り値に「型」を書く",
        },
        {
          type: "paragraph",
          text: "このレッスンは仕上げの準備運動です。レッスン1で型(string/int など)を学びました。現代のPHPでは、関数の引数や戻り値に「この型のはず」という宣言を書けます。引数名の前に型を、戻り値はかっこの後にコロン「:」を付けて書きます。こうしておくと、違う型の値が来たときに早い段階で気づけます。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\n// 引数 $x は int(整数)、戻り値は string(文字列)と宣言\nfunction label(int $x): string\n{\n    return \"番号:\" . $x;\n}\n\necho label(5); // → 番号:5",
          caption: "引数の前に型、かっこの後に「: 戻り値の型」。読み手に意図が伝わり、間違いにも早く気づける。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ型を書くのか",
          text: "型を書くと「この関数は数値を受け取り、文字列を返す」という契約がコード上に明示されます。読む人にとっては仕様書代わりになり、間違った型を渡したときにはエラーで早く気づけます。Laravelのメソッドは引数・戻り値に型が付いていることが多く、型を読めると『この関数が何を受け取り何を返すか』が一目で分かります。",
        },
        {
          type: "heading",
          text: "null 許容「?」・null 合体「??」・nullsafe「?->」",
        },
        {
          type: "paragraph",
          text: "レッスン1で「値が無い」を表す null を学びました。型の前にクエスチョン「?」を付けると「その型、または null のどちらでもよい」(null許容)になります。たとえば「?string」は「文字列 または null」。「??」(null合体演算子)は「左が null ならこっちを使う」という書き方で、たとえば「$name ?? \"ゲスト\"」は「$name が null ならゲストを使う」という意味です。さらに「?->」(nullsafe演算子)を使うと、対象が null のときはメソッドを呼ばず、まるごと null を返してくれるので、null に対して「->」を使ったときのエラーで落ちずに済みます。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\n// ?string = 「文字列 または null」を受け取れる\nfunction greet(?string $name): string\n{\n    // $name が null なら \"ゲスト\" を使う(?? = null合体)\n    $display = $name ?? \"ゲスト\";\n    return \"ようこそ $display さん\";\n}\n\necho greet(\"田中\"); // → ようこそ 田中 さん\necho greet(null);   // → ようこそ ゲスト さん",
          caption: "?string は「文字列かnull」。$name ?? \"ゲスト\" は「$nameがnullならゲスト」。",
        },
        {
          type: "compare",
          bad: {
            label: "-> だけだと null でエラー",
            language: "php",
            code: "<?php\n$user = findUser(); // 見つからないと null が返るとする\n// $user が null だとここでエラーで停止する\necho $user->name;",
          },
          good: {
            label: "?-> なら null でも落ちない",
            language: "php",
            code: "<?php\n$user = findUser();\n// $user が null なら、name を触らず全体が null になる\necho $user?->name ?? \"未登録\";",
          },
        },
        {
          type: "heading",
          text: "例外 — try / catch / throw",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\n// 処理の途中で「続行できない」異常が起きたら、例外(れいがい)で知らせる。\n// throw で投げ、try で囲んだ範囲の例外を catch が受け止める。\nfunction divide(int $a, int $b): int\n{\n    if ($b === 0) {\n        // 異常事態を例外として投げる\n        throw new \\InvalidArgumentException(\"0では割れません\");\n    }\n    return $a / $b;\n}\n\ntry {\n    echo divide(10, 0); // ここで例外が投げられる\n} catch (\\InvalidArgumentException $e) {\n    // 投げられた例外を受け止めて対応\n    echo \"エラー: \" . $e->getMessage(); // → エラー: 0では割れません\n}",
          caption: "throw で例外を投げ、try/catch で受け止める。$e は受け取った例外オブジェクト。全体が止まるのを防ぎ、エラー対応を1か所にまとめられる。",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "interface と trait のさわり(Laravelで多用される2つの言葉。今は概要だけでOK):",
            "interface(インターフェース):「このメソッドを必ず持っていること」という約束(契約)だけを定めたもの。中身は書かず、名前と形だけを決め、実装は各クラスに任せる。今は「そういうものがある」で十分。",
            "trait(トレイト):複数のクラスで使い回したいメソッドのまとまり。クラスに use で取り込むと、その機能を「混ぜ込む」ことができる。",
          ],
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜLaravelで多用されるのか",
          text: "interfaceは「約束の形」だけを決めるので、中身を後から差し替えても呼び出す側は変えずに済みます。これがLaravelの [[service-container]] による [[dependency-injection]](依存性の注入)を支えます。traitは、多くのモデルで共通する機能(例: 論理削除など)を1か所にまとめて各クラスに混ぜ込むために使われます。どちらも「重複を避け、柔軟に組み替える」ための道具です。",
        },
        {
          type: "callout",
          variant: "info",
          title: "Laravelではこう出てくる",
          text: "Laravelのモデルは、型宣言・trait・戻り値の型が一度に出てきます。下の HasFactory は trait、: string は戻り値の型宣言、?-> と ?? もそのまま登場します。今日の知識を総動員すると、この短いクラスがぐっと読みやすくなります。",
        },
        {
          type: "code",
          language: "php",
          code: "<?php\n\nnamespace App\\Models;\n\nuse Illuminate\\Database\\Eloquent\\Factories\\HasFactory;\nuse Illuminate\\Database\\Eloquent\\Model;\n\nclass User extends Model\n{\n    use HasFactory; // trait を混ぜ込む\n\n    // 戻り値は string と宣言。?-> と ?? で安全に呼び名を作る\n    public function displayName(): string\n    {\n        return $this->profile?->nickname ?? $this->name;\n    }\n}",
          caption: "trait の取り込み、戻り値の型宣言、nullsafe ?-> と null合体 ?? が一度に出てくるLaravelのモデル例。",
        },
      ],
      questions: [
        {
          id: "day0-lesson6-q1",
          type: "choice",
          question: "「$name ?? \"ゲスト\"」の意味として正しいものはどれか。",
          choices: [
            "$name が \"ゲスト\" と等しいか比較する",
            "$name が null なら \"ゲスト\" を使い、そうでなければ $name を使う",
            "$name に \"ゲスト\" を代入する",
            "$name と \"ゲスト\" を連結する",
          ],
          answerIndex: 1,
          explanation: "「??」は null合体演算子で、「左の値が null(または未定義)なら右の値を使う」という意味です。ここでは $name が null のときだけ \"ゲスト\" が使われます。",
        },
        {
          id: "day0-lesson6-q2",
          type: "choice",
          question: "「?->」(nullsafe演算子)の説明として正しいものはどれか。",
          choices: [
            "対象が null でも必ずメソッドを実行する",
            "対象が null のときはメソッドを呼ばず、全体を null にしてエラーで落ちるのを防ぐ",
            "対象が null かどうかを true/false で返す",
            "対象を null に初期化する",
          ],
          answerIndex: 1,
          explanation: "「?->」は、対象が null のときはその先のプロパティ・メソッドにアクセスせず、式全体を null にします。null に対して普通の -> を使うと発生するエラーを避けられる安全なアクセス方法です。",
        },
        {
          id: "day0-lesson6-q3",
          type: "free",
          question: "例外(try / catch / throw)の仕組みが何のためにあるのか説明してください。",
          modelAnswer: "例外は、処理の途中で「これ以上続行できない」という異常が起きたことを知らせる仕組みです。throw で例外を投げ、try で囲んだ範囲で例外が起きた場合に catch がそれを受け止めて、エラー時の後始末や代替処理を書けます。これにより、異常が起きてもプログラム全体が突然止まるのを防ぎ、エラー処理を1か所にまとめて見通しよく扱えます。Laravelでも、バリデーション失敗やデータ未発見などが例外として投げられ、共通の仕組みで処理されます。",
          interviewPhrase: "「例外は異常を知らせる仕組みで、throwで投げ、try/catchで受け止めます。エラー時の処理を分離してまとめられるので、突然の停止を防ぎ、見通しよくエラーを扱えます」",
          keywords: ["異常を知らせる", "throw", "try/catch", "エラー処理の分離", "突然止まるのを防ぐ"],
        },
      ],
    },
  ],
};
