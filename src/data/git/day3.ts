import type { Day } from "@/types";

export const gitDay3: Day = {
  day: 3,
  slug: "day3",
  title: "ブランチと実務フロー — チームで壊さず進める",
  goal: "ブランチと現場のチーム開発フロー(Issue → ブランチ → Pull Request → レビュー → merge)を読めて説明でき、コンフリクトにも落ち着いて向き合える。",
  lessons: [
    {
      id: "gitday3-lesson1",
      slug: "branch",
      title: "ブランチ＝作業の「分身/パラレルワールド」",
      summary: "main を壊さずに新しい試みができるブランチを、コピー原稿のたとえで理解し、git switch -c で作れるようになる。",
      blocks: [
        {
          type: "heading",
          text: "ブランチは「もう一つの自分の作業場」"
        },
        {
          type: "paragraph",
          text: "ブランチは、今の状態をそのまま引き継いだ「作業の分身」です。SFでいうパラレルワールドをイメージしてください。元の世界(main)はそのまま置いておいて、別の世界で「もし新機能を足したら?」を自由に試せます。うまくいけば合流(merge)させ、ダメなら世界ごと捨てればいい。だから安心して実験できます。"
        },
        {
          type: "paragraph",
          text: "もっと身近なたとえなら、清書した本番の原稿(main)を汚さずに、コピーを取ってそのコピーの上で下書きや修正を試すのと同じです。コピーにどれだけ赤ペンを入れても、本番の原稿は無傷。気に入ったらコピーの内容を本番に反映すればいいのです。"
        },
        {
          type: "code",
          language: "bash",
          code: "# 今どこにいるか(ブランチ一覧、* が現在地)\ngit branch\n\n# feature/login という新しいブランチを作って、そこへ移動する\ngit switch -c feature/login\n\n# もとの main に戻りたくなったら\ngit switch main",
          caption: "git switch -c は「新しいブランチを作って、そこへ引っ越す」を一度にやる"
        },
        {
          type: "paragraph",
          text: "-c は create(作る)の c です。git switch -c feature/login と打つと、feature/login という名前の分身を作り、その世界へ自分が移動します。ここでコミットしても main は一切変わりません。安心して壊せる場所ができた、ということです。"
        },
        {
          type: "list",
          ordered: false,
          items: [
            "main = みんなが信頼している「正」の世界。ここは丁寧に扱う。",
            "feature/〇〇 = 新機能を試す分身。名前で「何をやっているか」が伝わる。",
            "fix/〇〇 = バグ修正用の分身。目的別に名前を付けるのが現場の習慣。"
          ]
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜわざわざブランチを分けるのか",
          text: "main を直接いじると、途中の壊れた状態が「正」の世界に混ざってしまいます。ブランチを切れば、完成するまで実験を隔離できるので、他の人の作業やリリースを巻き込まずに済みます。「壊しても戻せる安心」を、チーム全体に広げる仕組みがブランチです。"
        },
        {
          type: "callout",
          variant: "warn",
          title: "作業前にブランチを切る癖を",
          text: "「ちょっとだけだから」と main で作業を始めると、あとで分けたくなったとき面倒になります。何かを変え始める前に、まず git switch -c で分身を作る。これを最初の一手にしておくと、事故がぐっと減ります。"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「今 main にいます。ログイン機能を試したいので、feature/login というブランチを作ってそこに移動するGitコマンドを教えて。今どのブランチにいるか確認する方法も教えて」"
        }
      ],
      questions: [
        {
          id: "gitday3-lesson1-q1",
          type: "choice",
          question: "git switch -c feature/login を実行すると何が起きる?",
          choices: [
            "main の中身をすべて削除する",
            "feature/login という新しいブランチを作り、そこへ移動する",
            "リモートに feature/login を送信(push)する",
            "feature/login というファイルを新規作成する"
          ],
          answerIndex: 1,
          explanation: "-c は create の意味。新しいブランチを作ってそのブランチへ移動します。この時点では main は変わらず、push もされません。"
        },
        {
          id: "gitday3-lesson1-q2",
          type: "free",
          question: "「ブランチとは何か」を、プログラミングを知らない人にもわかるようにたとえで説明してください。",
          modelAnswer: "ブランチは、今の状態をそのままコピーした「別の作業場」です。本番の原稿を汚さずにコピーの上で下書きするのと同じで、main を壊さずに新しい機能を試せます。うまくいけば本番に合流させ、ダメなら捨てればいいので安心して実験できます。",
          interviewPhrase: "実務でこう説明する: ブランチは作業を隔離するための分身で、main を安全に保ったまま並行して開発を進めるための仕組みです。",
          keywords: ["ブランチ", "main", "分身/コピー", "隔離", "switch -c"]
        }
      ]
    },
    {
      id: "gitday3-lesson2",
      slug: "pull-request-flow",
      title: "実務フロー — Issueからmergeまでの一本道",
      summary: "現場のチーム開発が Issue → ブランチ → Push → Pull Request → レビュー → merge という流れで進むことを、個人開発との違いとともに理解する。",
      blocks: [
        {
          type: "heading",
          text: "現場は「一人で決めて終わり」ではない"
        },
        {
          type: "paragraph",
          text: "個人開発なら、自分のブランチで作って main に合流させれば完了です。ですが現場(チーム)では、他の人が安心できるよう「この変更、入れてもいい?」と一度確認を挟みます。そのための一連の流れが、実務フローです。レストランで例えるなら、料理をいきなり客に出すのではなく、いったんチェック台に置いて先輩が味見してからホールに出す、という段取りに近いです。"
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Issue(やることチケット): 「ログイン機能を作る」など、やるべき作業を書き出した札。",
            "ブランチ作成: その作業用の分身を git switch -c で用意する。",
            "変更してPush: コードを直してコミットし、リモート(GitHub)へ送る。",
            "Pull Request(PR): 「この変更を main に入れてください」というレビュー依頼を出す。",
            "レビュー: 他の人が中身を読み、コメントや指摘をする。",
            "merge: OKが出たら main に合流。作業完了。"
          ]
        },
        {
          type: "paragraph",
          text: "Pull Request(プルリク、PR)は、この流れの主役です。「私のブランチの変更を、あなたたちの main に取り込んで(pull して)ほしい」というお願いの手紙だと思ってください。手紙には「何を・なぜ変えたか」を書いておくと、レビューする人が読みやすくなります。"
        },
        {
          type: "code",
          language: "bash",
          code: "# 1. 作業ブランチを作る\ngit switch -c feature/login\n\n# 2. 変更してコミット\ngit add .\ngit commit -m \"add login form\"\n\n# 3. リモートへ送る(この後 GitHub 上で PR を作る)\ngit push -u origin feature/login",
          caption: "push までは自分の手元の操作。PR作成とmergeは GitHub の画面で行うことが多い"
        },
        {
          type: "compare",
          bad: {
            label: "main に直接",
            text: "確認なしで正の世界を直接書き換える。壊れても誰も気づけず、原因も追いにくい。"
          },
          good: {
            label: "ブランチ＋PR",
            text: "分身で作り、PRで一度レビューを挟んでから合流。壊れにくく、変更理由も記録に残る。"
          }
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜPRという「ひと手間」を挟むのか",
          text: "レビューは、間違いを責めるためではなく、みんなで品質を守るための保険です。第三者が読むことでバグや読みにくさに気づけ、変更の理由も記録に残ります。AIが書いたコードでも同じで、PRにして人が一度目を通す文化があると、安心して速く進めます。"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「feature/login ブランチで作業しました。これを GitHub に push して Pull Request を出す手順を教えて。PRの説明文に何を書けばレビューしてもらいやすいかも教えて」"
        }
      ],
      questions: [
        {
          id: "gitday3-lesson2-q1",
          type: "choice",
          question: "実務のチーム開発フローとして、正しい順番はどれ?",
          choices: [
            "main へ merge → Pull Request → レビュー → ブランチ作成",
            "Issue → ブランチ作成 → Push → Pull Request → レビュー → merge",
            "Pull Request → main へ merge → ブランチ作成 → Push",
            "レビュー → Issue → merge → ブランチ作成"
          ],
          answerIndex: 1,
          explanation: "やること(Issue)を決め、作業用ブランチを作り、変更をPushして、PRでレビューを依頼し、OKなら main へ merge。この一本道が現場の基本フローです。"
        },
        {
          id: "gitday3-lesson2-q2",
          type: "choice",
          question: "Pull Request(PR)の役割として最も近いものはどれ?",
          choices: [
            "コードを自動でmainに強制的に上書きする機能",
            "「この変更をmainに取り込んでほしい」というレビュー依頼",
            "手元のファイルをバックアップする機能",
            "ブランチを削除するためのコマンド"
          ],
          answerIndex: 1,
          explanation: "PRは「私のブランチの変更を main に取り込んでほしい」というお願い兼レビュー依頼です。人が中身を確認してから合流させるための入り口になります。"
        },
        {
          id: "gitday3-lesson2-q3",
          type: "free",
          question: "個人開発と現場のチーム開発では、mainへの反映のしかたにどんな違いがありますか。",
          modelAnswer: "個人開発は自分のブランチを main に合流させれば完了ですが、現場ではその前に Pull Request を出してレビューを挟みます。他の人が中身を確認し、OKが出てから merge するので、壊れにくく、変更の理由も記録に残ります。",
          interviewPhrase: "実務でこう説明する: 現場では main へ直接入れず、PRでレビューを通してから merge することで品質と履歴を守っています。",
          keywords: ["Issue", "ブランチ", "Pull Request", "レビュー", "merge"]
        }
      ]
    },
    {
      id: "gitday3-lesson3",
      slug: "conflict",
      title: "コンフリクトは怖くない — どちらを残すか選ぶだけ",
      summary: "同じ場所を別々に編集してぶつかるのがコンフリクト。落ち着いてどちらを残すか選べばよいこと、困ったらAIに貼って相談できることを学び、安全に試せる土台の完成を確認する。",
      blocks: [
        {
          type: "heading",
          text: "コンフリクト＝「同じ場所を、別々に直した」だけ"
        },
        {
          type: "paragraph",
          text: "コンフリクト(衝突)は、二人が同じファイルの同じ行を、それぞれ違う内容に書き換えたときに起きます。Gitは「どっちを正しいとしていいか自分では決められない」ので、あなたに「どっちを残す?」と聞いてくるだけです。エラーというより、判断のお願い。落ち着いて選べば必ず解決できます。"
        },
        {
          type: "paragraph",
          text: "たとえるなら、二人が同じ1枚の紙の同じ行に、違う文章を書き込んでしまった状態です。清書する人は「AさんとBさん、どちらの文にする? それとも両方を合わせる?」と決めるだけ。Gitはその「決める材料」を、記号で目印を付けて見せてくれます。"
        },
        {
          type: "code",
          language: "bash",
          code: "# merge しようとしたら衝突が起きた例\ngit merge feature/login\n# CONFLICT (content): Merge conflict in app.js\n# Automatic merge failed; fix conflicts and commit the result.\n\n# どのファイルがぶつかっているか確認\ngit status",
          caption: "CONFLICT と出たら「どのファイルで、どちらを残すか」を確認する合図"
        },
        {
          type: "code",
          language: "bash",
          code: "<<<<<<< HEAD\nconst greeting = \"こんにちは\";\n=======\nconst greeting = \"Hello\";\n>>>>>>> feature/login",
          caption: "HEAD(今の自分)側と、相手ブランチ側が === で区切られる。目印を消して残す形に整える"
        },
        {
          type: "list",
          ordered: true,
          items: [
            "落ち着く。コンフリクトは壊れたのではなく、選択を求められているだけ。",
            "<<<<<<< と ======= と >>>>>>> に挟まれた部分を見て、どちらを残すか(または両方をどう合わせるか)決める。",
            "目印の記号を消して、残したい形にファイルを整える。",
            "git add でその解決を確定し、git commit で合流を完了する。"
          ]
        },
        {
          type: "callout",
          variant: "warn",
          title: "記号の消し忘れに注意",
          text: "<<<<<<< や ======= や >>>>>>> は、あくまで目印です。解決したら必ず消してください。消し忘れたままコミットすると、その記号ごとコードに残ってしまい、動かなくなります。"
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「git merge でコンフリクトが出ました。<<<<<<< から >>>>>>> までの部分をそのまま貼るので、それぞれが何を意味しているか説明して。両方の意図を活かすなら、どう直せばいいかも教えて」"
        },
        {
          type: "callout",
          variant: "why",
          title: "これで「安全に試せる土台」が完成",
          text: "コミットで記録し、ブランチで隔離し、PRでレビューし、コンフリクトも落ち着いて解ける。ここまで来たあなたは、もう「壊しても戻せる」状態でGitを使えます。AIに大胆にコードを書かせても、いつでも戻れる・説明できる。これがAI時代に安心して速く進むための土台です。よくここまで走りきりました。あとは実際に手を動かしながら、少しずつ慣れていくだけです。"
        }
      ],
      questions: [
        {
          id: "gitday3-lesson3-q1",
          type: "choice",
          question: "コンフリクト(衝突)が起きるのはどんなとき?",
          choices: [
            "ブランチを新しく作ったとき",
            "同じファイルの同じ場所を、別々に違う内容へ編集して合流させたとき",
            "コミットメッセージを書き忘れたとき",
            "git status を実行したとき"
          ],
          answerIndex: 1,
          explanation: "コンフリクトは、同じ場所への異なる変更がぶつかったときに起きます。Gitがどちらを残すか決められないので、あなたに選択をお願いしている状態です。"
        },
        {
          id: "gitday3-lesson3-q2",
          type: "free",
          question: "コンフリクトが出て焦っている初心者の同僚に、どう声をかけて何をすればよいか説明してください。",
          modelAnswer: "大丈夫、コンフリクトは壊れたのではなく「どちらを残すか選んで」とGitに聞かれているだけだよ、と伝えます。<<<<<<< と ======= と >>>>>>> に挟まれた両方の内容を見て、残す形に整え、目印の記号を消してから git add と git commit で確定すれば解決します。迷ったら中身をAIに貼って意味を説明してもらうのも手です。",
          interviewPhrase: "実務でこう説明する: コンフリクトはエラーではなく選択の依頼なので、両方の変更を見比べて残す形に整え、記号を消してコミットすれば解決します。",
          keywords: ["コンフリクト", "同じ場所", "どちらを残す", "記号を消す", "add / commit"]
        }
      ]
    }
  ]
};
