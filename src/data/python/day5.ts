import type { Day } from "@/types";

export const pythonDay5: Day = {
  day: 5,
  slug: "day5",
  title: "ファイル・API連携(外の世界とつながる)",
  goal: "ファイルの読み書きとWeb APIの呼び出しができ、例外処理でエラーに備えられる。APIキーを安全に扱える。",
  lessons: [
    {
      id: "pyday5-lesson1",
      slug: "file-json-csv",
      title: "ファイル読み書き(with open)とJSON/CSVの基本",
      summary: "テキスト・JSON・CSVを安全に読み書きし、withで閉じ忘れを防ぐ。",
      blocks: [
        {
          type: "heading",
          text: "プログラムは「外の世界」とつながって初めて役に立つ",
        },
        {
          type: "paragraph",
          text: "これまでのプログラムは、実行が終わると計算結果がすべて消えていました。変数はメモリ(コンピュータの一時的な作業場所)の上にあるだけなので、プログラムが終わると片付けられてしまうからです。結果を残したい、あるいは前回の続きから始めたい。そのためには、プログラムの外にあるファイルに書き出し、次回それを読み込む必要があります。ここが「外の世界とつながる」第一歩です。",
        },
        {
          type: "paragraph",
          text: "ファイルとは、ディスク(電源を切っても消えない保存領域)に置かれた名前付きのデータのかたまりです。メモ帳で開けるテキストファイル、表計算で開けるCSV、システム間のデータ受け渡しに使うJSONなど、中身の形式はいろいろありますが、Pythonから見れば「開いて、読み書きして、閉じる」という手順は共通です。",
        },
        {
          type: "heading",
          text: "with open で開くと、閉じ忘れがなくなる",
        },
        {
          type: "paragraph",
          text: "ファイルは、使い終わったら必ず「閉じる」必要があります。閉じないと、書いた内容がディスクに反映されなかったり、他のプログラムがそのファイルを触れなくなったりします。Pythonでは with という仕組みを使うと、ブロックを抜けるときに自動でファイルを閉じてくれます。手動の close() を書き忘れる事故がなくなるので、実務ではほぼ常に with を使います。",
        },
        {
          type: "code",
          language: "python",
          caption: "テキストファイルの書き込みと読み込み",
          code: "# 書き込み: \"w\" は write(上書き)モード\n# encoding=\"utf-8\" は日本語を文字化けさせないためのおまじない\nwith open(\"memo.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"1行目です\\n\")\n    f.write(\"2行目です\\n\")\n# ここで with のブロックを抜けると、f は自動的に閉じられる\n\n# 読み込み: \"r\" は read モード\nwith open(\"memo.txt\", \"r\", encoding=\"utf-8\") as f:\n    text = f.read()   # ファイル全体を1つの文字列として読む\nprint(text)",
        },
        {
          type: "callout",
          variant: "warn",
          title: "\"w\" は既存の中身を消す",
          text: "モード \"w\" で開くと、そのファイルの中身は最初にまるごと消えます。追記したいときは \"a\"(append=末尾に追加)を使います。大事なファイルをうっかり \"w\" で開いて空にしてしまう事故はよくあるので、モード文字は毎回意識してください。",
        },
        {
          type: "heading",
          text: "JSON: プログラム同士のデータのやりとりに使う形式",
        },
        {
          type: "paragraph",
          text: "JSON(ジェイソン)は、辞書やリストのようなデータを文字列にして保存・送信するための形式です。Web APIの多くはJSONでデータを返します。Pythonでは標準の json モジュールで、Pythonの辞書と JSON文字列を相互に変換できます。dump/load はファイル相手、dumps/loads は文字列相手、と末尾の s で覚えると混乱しません。",
        },
        {
          type: "code",
          language: "python",
          caption: "辞書をJSONで保存し、読み戻す",
          code: "import json\n\ndata = {\"name\": \"田中\", \"age\": 28, \"skills\": [\"Python\", \"SQL\"]}\n\n# 辞書 -> JSONファイルに書き出す\n# ensure_ascii=False で日本語をそのまま(\\uXXXX に変換せず)保存\nwith open(\"user.json\", \"w\", encoding=\"utf-8\") as f:\n    json.dump(data, f, ensure_ascii=False, indent=2)\n\n# JSONファイル -> 辞書に読み戻す\nwith open(\"user.json\", \"r\", encoding=\"utf-8\") as f:\n    loaded = json.load(f)\n\nprint(loaded[\"name\"])   # 田中\nprint(loaded[\"skills\"]) # ['Python', 'SQL']",
        },
        {
          type: "heading",
          text: "CSV: 表形式データの定番",
        },
        {
          type: "paragraph",
          text: "CSV(カンマ区切り値)は、Excelなどで扱う表を、1行1レコード・列をカンマで区切って表したテキストです。標準の csv モジュールを使うと、区切りの処理を自分で書かずに読み書きできます。1行を辞書として扱える DictReader / DictWriter を使うと、列名でアクセスできて読みやすくなります。",
        },
        {
          type: "code",
          language: "python",
          caption: "CSVを辞書のリストとして読む",
          code: "import csv\n\n# users.csv の中身(例):\n# name,age\n# 田中,28\n# 佐藤,34\nwith open(\"users.csv\", \"r\", encoding=\"utf-8\") as f:\n    reader = csv.DictReader(f)  # 1行目を見出しとして扱う\n    for row in reader:\n        # row は {\"name\": \"田中\", \"age\": \"28\"} のような辞書\n        print(row[\"name\"], row[\"age\"])",
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「このCSVを読み込んで、age列を数値に変換し、平均年齢を出すPythonコードを書いて。encodingはutf-8で」のように、入力形式・やりたい処理・条件を具体的に伝えると、そのまま使えるコードが返りやすくなります。返ってきたら open のモードと encoding が正しいかだけ自分で確認しましょう。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ形式を使い分けるのか",
          text: "自由なメモはテキスト、表はCSV、入れ子構造のあるデータ(オブジェクトの中にリスト、その中にオブジェクト…)はJSON、と向き不向きがあります。相手システムが期待する形式に合わせるのが基本です。形式を間違えると、読み込む側でエラーになったり、意味が壊れたりします。",
        },
      ],
      questions: [
        {
          id: "pyday5-lesson1-q1",
          type: "choice",
          question: "with open(\"data.txt\", \"w\") as f: を実行したとき、data.txt に既にあった中身はどうなりますか。",
          choices: [
            "末尾に追記される",
            "最初にすべて消えて上書きされる",
            "読み取り専用で開かれるので変わらない",
            "エラーになって開けない",
          ],
          answerIndex: 1,
          explanation: "\"w\"(write)モードは開いた時点で中身を空にします。既存の内容を残して追加したいときは \"a\"(append)を使います。読むだけなら \"r\" です。",
        },
        {
          id: "pyday5-lesson1-q2",
          type: "choice",
          question: "Pythonの辞書を、ファイルにJSON形式で書き出すために使う関数はどれですか。",
          choices: [
            "json.loads()",
            "json.load()",
            "json.dump()",
            "json.parse()",
          ],
          answerIndex: 2,
          explanation: "ファイルへ書き出すのは json.dump()。文字列にするのは json.dumps()。読むのは load()/loads() で、s が付く方が文字列相手だと覚えると整理できます。",
        },
        {
          id: "pyday5-lesson1-q3",
          type: "free",
          question: "なぜファイル操作で close() を手書きするより with open(...) を使う方が良いのか、理由を説明してください。",
          modelAnswer: "with を使うと、ブロックを抜けるときに自動でファイルが閉じられるため、close() の書き忘れや、途中でエラーが起きて close() まで到達しないケースを防げます。ファイルを閉じないと書き込み内容がディスクに反映されなかったり、他の処理がそのファイルを開けなくなったりするので、確実に閉じられる with を使う方が安全です。",
          interviewPhrase: "実務では「ファイルの後始末を確実にするために with で開いています。途中で例外が出ても閉じ忘れが起きないのが理由です」と説明します。",
          keywords: ["自動で閉じる", "閉じ忘れ", "例外", "安全"],
        },
      ],
    },
    {
      id: "pyday5-lesson2",
      slug: "requests-web-api",
      title: "requestsでWeb APIを叩く(GET/POST、ステータスコード、.json())",
      summary: "requestsでAPIにリクエストし、ステータスコードとレスポンスを正しく読む。",
      blocks: [
        {
          type: "heading",
          text: "Web APIとは、プログラム向けの窓口",
        },
        {
          type: "paragraph",
          text: "私たちがブラウザでWebサイトを見るとき、裏では「このページをください」というリクエストをサーバーに送り、サーバーがHTMLを返しています。Web API(エーピーアイ)は、これの「プログラム向け」版です。人間が見るための画面ではなく、プログラムが処理しやすいデータ(多くはJSON)を返してくれる窓口だと考えてください。天気、為替、地図、そしてAIのサービスも、多くはWeb API経由で使います。",
        },
        {
          type: "paragraph",
          text: "PythonからWeb APIを呼ぶときの定番が requests(リクエスツ)ライブラリです。標準ライブラリではないので、最初に pip install requests でインストールします。使い方は直感的で、GETで「取ってくる」、POSTで「送って処理してもらう」、という2つの動作を覚えれば大半のことができます。",
        },
        {
          type: "code",
          language: "python",
          caption: "GETリクエストでデータを取得する",
          code: "import requests\n\n# GET: サーバーからデータを取ってくる\nresponse = requests.get(\"https://api.example.com/users/1\")\n\nprint(response.status_code)  # 例: 200(成功)\ndata = response.json()       # レスポンスのJSONを辞書に変換\nprint(data[\"name\"])",
        },
        {
          type: "heading",
          text: "ステータスコード: 成功か失敗かを表す番号",
        },
        {
          type: "paragraph",
          text: "APIは、結果を3桁の数字(ステータスコード)で教えてくれます。200番台は成功、400番台は「あなたのリクエストがおかしい」、500番台は「サーバー側の問題」です。この番号を確認せずに response.json() を呼ぶと、失敗時にエラーページ(HTML)をJSONとして読もうとして落ちることがあります。まず番号を見る、という習慣が大事です。",
        },
        {
          type: "list",
          items: [
            "200 OK: 成功。データが返っている",
            "201 Created: 成功。POSTで新しいデータが作られた",
            "400 Bad Request: リクエストの形式が不正",
            "401 Unauthorized: 認証が必要、またはAPIキーが違う",
            "404 Not Found: 指定した対象が存在しない",
            "429 Too Many Requests: 短時間に呼びすぎ(レート制限)",
            "500 Internal Server Error: サーバー側の不具合",
          ],
        },
        {
          type: "code",
          language: "python",
          caption: "POSTでデータを送る + ステータス確認",
          code: "import requests\n\n# POST: サーバーにデータを送って処理してもらう\npayload = {\"title\": \"買い物\", \"done\": False}\nresponse = requests.post(\n    \"https://api.example.com/todos\",\n    json=payload,          # 辞書を渡すと自動でJSONに変換して送る\n    timeout=10,            # 10秒で応答がなければ諦める(重要)\n)\n\nif response.status_code == 201:\n    created = response.json()\n    print(\"作成成功:\", created[\"id\"])\nelse:\n    print(\"失敗:\", response.status_code, response.text)",
        },
        {
          type: "compare",
          bad: {
            label: "危うい書き方",
            text: "ステータスを確認せず、いきなり .json() を呼ぶ。失敗時に落ちる。",
            language: "python",
            code: "res = requests.get(url)\ndata = res.json()  # 404やエラー時にここで例外",
          },
          good: {
            label: "堅い書き方",
            text: "まずステータスを確認し、成功したときだけ本文を読む。",
            language: "python",
            code: "res = requests.get(url, timeout=10)\nif res.status_code == 200:\n    data = res.json()\nelse:\n    print(\"エラー:\", res.status_code)",
          },
        },
        {
          type: "callout",
          variant: "warn",
          title: "timeout を付けないと固まる",
          text: "timeout を指定しないと、相手サーバーが応答しないとき、プログラムが永遠に待ち続けることがあります。ネットワークは必ず失敗しうる、という前提で、requests には毎回 timeout を付ける習慣をつけてください。",
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「requestsでこのAPIにGETして、status_codeが200のときだけ.json()を読み、それ以外はコードと本文をログに出すコードを書いて。timeoutは10秒」のように、成功時と失敗時の両方の振る舞いを指定すると、実務で使える形で返ってきます。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜGETとPOSTを区別するのか",
          text: "GETは「取得するだけで、相手の状態を変えない」操作、POSTは「送信して相手の状態を変える(作成・登録など)」操作、という約束事です。この区別があるおかげで、GETは何度実行しても安全、POSTは繰り返すと二重登録に注意、といった判断ができます。",
        },
      ],
      questions: [
        {
          id: "pyday5-lesson2-q1",
          type: "choice",
          question: "requests.get() の戻り値に対して .json() を呼ぶ前に、まず確認すべきものはどれですか。",
          choices: [
            "response.text の文字数",
            "response.status_code が成功(200など)か",
            "requests のバージョン",
            "URLの長さ",
          ],
          answerIndex: 1,
          explanation: "失敗時はJSONではなくエラーページなどが返ることがあり、いきなり .json() を呼ぶと例外になります。先に status_code を確認し、成功したときだけ本文を読むのが安全です。",
        },
        {
          id: "pyday5-lesson2-q2",
          type: "choice",
          question: "ステータスコード 401 が返ってきたとき、まず疑うべきことはどれですか。",
          choices: [
            "サーバーが完全にダウンしている",
            "認証情報(APIキーなど)が不足・誤っている",
            "呼び出し回数が多すぎる",
            "指定したデータが存在しない",
          ],
          answerIndex: 1,
          explanation: "401 Unauthorized は認証の問題を表します。APIキーの付け忘れや誤りが典型です。呼びすぎは429、存在しないは404、サーバー障害は500番台です。",
        },
        {
          id: "pyday5-lesson2-q3",
          type: "free",
          question: "GETとPOSTの違いを、初めての人にも分かるように説明してください。",
          modelAnswer: "GETはサーバーからデータを取ってくるための操作で、相手の状態を変えません。何度実行しても基本的に同じ結果で安全です。POSTはサーバーにデータを送って、登録や作成などの処理をしてもらう操作で、相手の状態を変えます。そのため繰り返すと二重登録などが起きうる点に注意が必要です。取得はGET、変更を伴う送信はPOST、と使い分けます。",
          interviewPhrase: "実務では「参照はGET、登録や更新などの副作用がある送信はPOSTで実装しています」と説明します。",
          keywords: ["取得", "送信", "状態を変える", "副作用"],
        },
      ],
    },
    {
      id: "pyday5-lesson3",
      slug: "api-keys-env",
      title: "APIキーの扱い(.env/環境変数、コードに直書きしない)",
      summary: "APIキーを環境変数や.envで管理し、コードやGitに漏らさない。",
      blocks: [
        {
          type: "heading",
          text: "APIキーは「あなた専用のパスワード」",
        },
        {
          type: "paragraph",
          text: "多くのAPI、特に有料のAIサービスは、利用時にAPIキーという文字列を要求します。これは「誰が使ったか」を識別し、料金を請求するための、あなた専用のパスワードのようなものです。キーが他人に漏れると、あなたのアカウントで勝手にAPIを使われ、高額な請求が来る可能性があります。だからこそ、扱いには十分な注意が必要です。",
        },
        {
          type: "heading",
          text: "やってはいけないこと: コードに直書き",
        },
        {
          type: "paragraph",
          text: "初心者が最もやりがちで、最も危険なのが、APIキーをコードに直接書いてしまうことです。動くには動きますが、そのコードをGitHubなどに公開した瞬間、世界中からキーが見えてしまいます。実際、公開リポジトリに紛れ込んだキーは、自動巡回プログラムに数分で発見・悪用されることがあります。",
        },
        {
          type: "compare",
          bad: {
            label: "絶対NG: 直書き",
            text: "キーがコードに残り、共有・公開した瞬間に漏れる。",
            language: "python",
            code: "import requests\napi_key = \"sk-abc123realkey...\"  # コードに直書き\nheaders = {\"Authorization\": \"Bearer \" + api_key}",
          },
          good: {
            label: "OK: 環境変数から読む",
            text: "キーはコードの外(環境変数)に置き、コードは名前で参照するだけ。",
            language: "python",
            code: "import os\napi_key = os.environ[\"API_KEY\"]  # 環境から取得\nheaders = {\"Authorization\": \"Bearer \" + api_key}",
          },
        },
        {
          type: "heading",
          text: "環境変数と .env ファイル",
        },
        {
          type: "paragraph",
          text: "環境変数とは、OSが持っている「名前と値のペア」の入れ物で、プログラムの外側から値を渡す仕組みです。キーを環境変数に入れておけば、コード本体にはキーそのものが登場せず、名前(例: API_KEY)で参照するだけで済みます。開発中は、キーを書いた .env というファイルを用意し、python-dotenv というライブラリで読み込む方法がよく使われます。",
        },
        {
          type: "code",
          language: "python",
          caption: ".env を使ってキーを読み込む",
          code: "# .env ファイル(コードとは別ファイル)の中身の例:\n# API_KEY=sk-abc123realkey...\n\n# pip install python-dotenv しておく\nimport os\nfrom dotenv import load_dotenv\n\nload_dotenv()  # .env の中身を環境変数として読み込む\n\napi_key = os.environ.get(\"API_KEY\")  # get なら未設定でも例外にならず None\nif not api_key:\n    raise SystemExit(\"API_KEY が設定されていません。.env を確認してください\")\n\nprint(\"キーの先頭:\", api_key[:6], \"...\")  # 全体は絶対に表示しない",
        },
        {
          type: "callout",
          variant: "warn",
          title: ".env は必ず .gitignore に入れる",
          text: ".env をうっかりGitで共有すると、直書きと同じくキーが漏れます。プロジェクトには .gitignore というファイルを置き、そこに .env と1行書いて、Gitの追跡対象から外してください。チーム共有用には、値を伏せた .env.example を代わりに置くのが定番です。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜキーをコードの外に出すのか",
          text: "キーは「秘密」で、コードは「共有するもの」です。性質が違うものを混ぜると事故が起きます。外に出しておけば、コードはそのまま公開でき、環境ごと(自分のPC、本番サーバーなど)に違うキーを差し替えるのも簡単です。秘密と設定はコードから分離する、というのは全言語共通の基本原則です。",
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "AIにコードを書いてもらうときは「APIキーは直書きせず、os.environ から読む形にして」と最初に指定しましょう。逆に、AIが生成したコードにキーらしき文字列が直書きされていたら、必ず環境変数に置き換えてから使います。生成コードのレビューでまず見るべき箇所の一つです。",
        },
        {
          type: "callout",
          variant: "warn",
          title: "漏れたら「無効化して再発行」",
          text: "もしキーを漏らしてしまったら、コードから消すだけでは不十分です。一度公開された情報は取り消せません。そのキーをサービス側の管理画面で無効化(revoke)し、新しいキーを再発行してください。これが唯一の確実な対処です。",
        },
      ],
      questions: [
        {
          id: "pyday5-lesson3-q1",
          type: "choice",
          question: "APIキーの扱いとして最も適切なものはどれですか。",
          choices: [
            "コードの先頭に定数として書いておく",
            "環境変数(.envなど)に入れ、コードからは名前で参照する",
            "README に貼っておく",
            "コメントアウトしてコード内に残す",
          ],
          answerIndex: 1,
          explanation: "キーはコードの外(環境変数)に置き、コードは名前で参照するのが基本です。直書きやREADMEへの記載、コメントとして残すのは、いずれも漏洩につながります。",
        },
        {
          id: "pyday5-lesson3-q2",
          type: "choice",
          question: ".env ファイルを使うとき、必ず一緒に行うべきことはどれですか。",
          choices: [
            ".env をリポジトリのトップに公開する",
            ".env を .gitignore に追加してGitの追跡から外す",
            ".env の中身をコード内にもコピーしておく",
            ".env をチャットで全員に共有する",
          ],
          answerIndex: 1,
          explanation: ".env にはキーが入っているため、.gitignore に入れてGitで共有されないようにします。共有用には値を伏せた .env.example を使います。",
        },
        {
          id: "pyday5-lesson3-q3",
          type: "free",
          question: "もし誤ってAPIキーを公開リポジトリに載せてしまった場合、どう対処すべきか説明してください。",
          modelAnswer: "コードから消すだけでは不十分です。一度公開された情報は取り消せないため、そのキーが悪用される前提で動きます。まずサービスの管理画面でそのキーを無効化(revoke)し、新しいキーを再発行して差し替えます。そのうえで、今後は環境変数で管理し、.env を .gitignore に入れて再発防止します。",
          interviewPhrase: "実務では「漏れたキーは即座に無効化して再発行し、環境変数管理に切り替えて再発防止します」と説明します。",
          keywords: ["無効化", "revoke", "再発行", "gitignore"],
        },
      ],
    },
    {
      id: "pyday5-lesson4",
      slug: "try-except",
      title: "例外処理 try/except(AIやネットワークは失敗する前提)",
      summary: "try/exceptで失敗を想定し、落ちない・原因が分かるコードを書く。",
      blocks: [
        {
          type: "heading",
          text: "外の世界は、必ず失敗する",
        },
        {
          type: "paragraph",
          text: "自分の中だけで完結する計算はほぼ確実に成功します。しかし、ファイルを読む・APIを叩くといった「外」とのやりとりは、必ず失敗しうると考えるべきです。ファイルが存在しない、ネットワークが切れている、APIが混んでいて応答しない、AIが想定外の返答をする。こうした失敗は「例外」として起こりえます。失敗を想定していないコードは、そこでプログラム全体が停止(クラッシュ)します。",
        },
        {
          type: "heading",
          text: "例外(exception)とは何か",
        },
        {
          type: "paragraph",
          text: "例外とは、プログラムの実行中に起きる「異常事態の通知」です。存在しないファイルを開こうとすれば FileNotFoundError、辞書にないキーを取れば KeyError、といった具合に、Pythonは種類ごとに名前の付いた例外を投げます。何も対処しないと、この例外がプログラムのてっぺんまで伝わり、赤いエラー表示とともに処理が止まります。",
        },
        {
          type: "heading",
          text: "try / except: 失敗を受け止める",
        },
        {
          type: "paragraph",
          text: "try ブロックに「失敗するかもしれない処理」を書き、except ブロックに「失敗したときにどうするか」を書きます。こうすると、例外が起きてもプログラムは止まらず、except の中の処理に切り替わります。ポイントは、握りつぶさず、何が起きたかが分かるようにすることです。",
        },
        {
          type: "code",
          language: "python",
          caption: "APIの呼び出しを try/except で守る",
          code: "import requests\n\ntry:\n    res = requests.get(\"https://api.example.com/data\", timeout=10)\n    res.raise_for_status()   # 400/500番台なら例外を投げる\n    data = res.json()\n    print(\"取得成功:\", data)\nexcept requests.exceptions.Timeout:\n    print(\"時間内に応答がありませんでした。あとで再試行します\")\nexcept requests.exceptions.RequestException as e:\n    # 通信全般の失敗をまとめて受け止める\n    print(\"通信エラーが発生しました:\", e)",
        },
        {
          type: "callout",
          variant: "warn",
          title: "except: pass で握りつぶさない",
          text: "except の中を pass だけにして、エラーを黙って無視するのは危険です。問題が起きても気づけず、原因調査もできなくなります。最低でも「何が起きたか」をログや画面に出す。むやみに全部を except Exception で受けず、想定する失敗を具体的に書くのが基本です。",
        },
        {
          type: "compare",
          bad: {
            label: "危険: 握りつぶし",
            text: "失敗しても何も分からず、静かに壊れる。",
            language: "python",
            code: "try:\n    data = res.json()\nexcept:\n    pass  # 何が起きたか誰も分からない",
          },
          good: {
            label: "良い: 種類を絞って通知",
            text: "想定する失敗を明示し、原因が分かる形で扱う。",
            language: "python",
            code: "try:\n    data = res.json()\nexcept ValueError as e:\n    print(\"JSONとして解釈できません:\", e)\n    data = None",
          },
        },
        {
          type: "heading",
          text: "else と finally、そして再試行の考え方",
        },
        {
          type: "paragraph",
          text: "try には、成功したときだけ動く else、成功・失敗にかかわらず必ず動く finally を付けられます。finally は「後始末」に向きます。また、ネットワークの一時的な失敗は、少し待ってもう一度試すと成功することがあります。これを再試行(リトライ)と呼びます。AIのAPIも混雑時に一時的に失敗することがあるので、数回だけ再試行する設計は実務でよく使います。",
        },
        {
          type: "code",
          language: "python",
          caption: "シンプルな再試行(リトライ)",
          code: "import time\nimport requests\n\ndef fetch(url, retries=3):\n    for attempt in range(1, retries + 1):\n        try:\n            res = requests.get(url, timeout=10)\n            res.raise_for_status()\n            return res.json()\n        except requests.exceptions.RequestException as e:\n            print(\"試行\", attempt, \"回目 失敗:\", e)\n            if attempt == retries:\n                raise            # 最後まで失敗したら諦めて例外を上げる\n            time.sleep(2)        # 少し待ってから再試行\n\nresult = fetch(\"https://api.example.com/data\")",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ「失敗する前提」で書くのか",
          text: "AI時代のプログラムは、外部のAPIやAIサービスに依存します。これらは自分ではコントロールできず、遅い・落ちる・想定外の応答を返す、が普通に起きます。失敗を前提に、落ちない・原因が分かる・必要なら再試行する、という作りにしておくことが、信頼できるプログラムの条件です。",
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「このAPI呼び出しに例外処理を追加して。Timeoutと通信エラーを分けて扱い、最大3回まで2秒間隔で再試行して。握りつぶさずログを残して」のように、想定する失敗と再試行の条件を具体的に伝えると、実務水準のエラーハンドリングが返ってきます。返ってきたコードは except が広すぎないか(bare except や except Exception だけになっていないか)を確認しましょう。",
        },
      ],
      questions: [
        {
          id: "pyday5-lesson4-q1",
          type: "choice",
          question: "try / except を使う主な目的として最も適切なものはどれですか。",
          choices: [
            "プログラムを速くするため",
            "失敗が起きてもプログラムを止めず、原因に応じて対処するため",
            "コードの行数を減らすため",
            "変数を自動で初期化するため",
          ],
          answerIndex: 1,
          explanation: "try/except は、例外が起きてもクラッシュさせず、失敗時の処理へ切り替えるための仕組みです。速度短縮や自動初期化のためのものではありません。",
        },
        {
          id: "pyday5-lesson4-q2",
          type: "choice",
          question: "例外処理で避けるべき書き方はどれですか。",
          choices: [
            "例外の種類を指定して受け止める",
            "except の中でエラー内容をログに出す",
            "except: pass で何もせず握りつぶす",
            "最後まで失敗したら例外を再送出する",
          ],
          answerIndex: 2,
          explanation: "except: pass は失敗を黙って無視するため、問題に気づけず調査もできなくなります。種類を絞って受け、最低でも内容を記録するのが基本です。",
        },
        {
          id: "pyday5-lesson4-q3",
          type: "free",
          question: "ネットワークやAIのAPIを扱うコードで「失敗する前提」の設計が重要な理由を説明してください。",
          modelAnswer: "外部のAPIやAIサービスは自分の管理下になく、遅延・停止・レート制限・想定外の応答などが普通に起こります。失敗を想定していないコードはそこでクラッシュし、利用者に影響が出ます。だからtry/exceptで失敗を受け止め、原因が分かるようログを残し、一時的な失敗には数回だけ再試行するなど、落ちにくく回復しやすい作りにしておくことが重要です。",
          interviewPhrase: "実務では「外部依存は失敗前提で、例外を種類ごとに扱い、必要に応じてリトライとログを入れて堅牢にしています」と説明します。",
          keywords: ["外部依存", "失敗前提", "リトライ", "ログ"],
        },
      ],
    },
  ],
};
