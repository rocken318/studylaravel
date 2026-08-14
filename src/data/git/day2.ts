import type { Day } from "@/types";
export const gitDay2: Day = {
  day: 2, slug: "day2",
  title: "GitHubとつなぐ — 保存・共有・持ち運び",
  goal: "リポジトリをGitHubに置いて同期する流れ（push・pull・clone）と、GitHubが何をしてくれるのかを、読んで説明できるようになる。",
  lessons: [
    {
      id: "gitday2-lesson1", slug: "remote-push",
      title: "手元の記録をGitHubへ送る — git push とリモート",
      summary: "自分のPCに貯めた記録（コミット）を、ネット上の置き場に送って安心してバックアップする考え方をつかむ。",
      blocks: [
        { type: "heading", text: "「手元だけ」だと少し不安" },
        { type: "paragraph", text: "Day1で、あなたは自分のPCの中に「変更の記録（コミット）」を貯める練習をしました。でも、その記録は今のところあなたのPCの中だけにあります。PCが壊れたら？別のPCで続きをやりたくなったら？そこで登場するのが「リモート」です。" },
        { type: "paragraph", text: "リモートとは、ネット上（クラウド）にあるもう一つの置き場のことです。代表的なサービスがGitHub（ギットハブ）。あなたの手元の記録を、まるごとGitHubに送っておけば、消える心配がなく、どこからでも取り出せます。" },
        { type: "callout", variant: "why", title: "なぜクラウドに置くの？", text: "手元のノートは1冊しかないと、なくしたら終わりです。だからコピーを金庫（クラウド）に預けておく。金庫の中身と手元のノートを同じ状態に保つ操作が push です。" },
        { type: "heading", text: "送る操作が git push" },
        { type: "paragraph", text: "手元にたまった記録をリモート（GitHub）へ「送る」操作が git push（プッシュ）です。push は「押し出して送る」というイメージ。手元の新しいコミットを、ネット上の置き場に押し出します。" },
        { type: "code", language: "bash", code: "git push origin main", caption: "origin（リモートの名前）の main（ブランチ名）へ手元の記録を送る" },
        { type: "paragraph", text: "この一行の意味を読めるようにしておきましょう。origin は「リモートにつけたあだ名」で、たいていGitHubの置き場を指します。main は「送り先の系統（ブランチ）」の名前です。つまり「GitHubの置き場の main に、手元の記録を送って」という指示です。" },
        { type: "compare", bad: { label: "手元（自分のPC）", text: "実際に書いて作業する場所／コミットを作って記録をためる／壊れる・なくす可能性がある" }, good: { label: "リモート（GitHub）", text: "ネット上の共有の置き場／push で送られた記録が貯まる／バックアップ＆どこからでも取り出せる" } },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「git push origin main を実行したいのですが、この origin と main はそれぞれ何を指しているのか、初心者向けにたとえ話で説明してください。」" }
      ],
      questions: [
        { id: "gitday2-lesson1-q1", type: "choice", question: "git push は何をする操作でしょう？", choices: ["手元の記録をリモート（GitHub）へ送る", "リモートの記録を消す", "手元の作業をすべてリセットする", "新しいファイルを1つ作る"], answerIndex: 0, explanation: "push は「押し出して送る」イメージ。手元にたまったコミットをネット上の置き場（リモート）へ送り、バックアップと共有を可能にします。" },
        { id: "gitday2-lesson1-q2", type: "free", question: "「リモート」とは何か、そしてpushする利点を、たとえ話を使ってやさしく説明してください。", modelAnswer: "リモートはネット上（クラウド）にあるもう一つの置き場です。手元のノート（PC）のコピーを金庫（GitHub）に預けるようなもので、pushするとPCが壊れても記録が消えず、別のPCからでも取り出せます。", interviewPhrase: "実務でこう説明する: リモートはコードのクラウド保管庫で、pushで手元のコミットを送ってバックアップと共有を実現します。", keywords: ["リモート", "クラウド", "push", "バックアップ", "GitHub"] }
      ]
    },
    {
      id: "gitday2-lesson2", slug: "clone-pull",
      title: "丸ごと持ってくる・最新にする — git clone と git pull",
      summary: "GitHubにある置き場をまるごと自分のPCへ持ってくる clone と、最新の変更を取り込む pull の役割を読めるようにする。",
      blocks: [
        { type: "heading", text: "別のPCやチームで同じものを使いたい" },
        { type: "paragraph", text: "GitHubに記録を置くと、うれしいことが起きます。別のPCでも、チームの仲間でも、同じ置き場から中身を取り出して、まったく同じものを手元に用意できるのです。" },
        { type: "paragraph", text: "そのための最初の一歩が git clone（クローン）。cloneは「複製する」という意味で、GitHubにある置き場を、履歴もまるごと自分のPCへコピーしてきます。" },
        { type: "code", language: "bash", code: "git clone https://github.com/user/project.git", caption: "GitHub上の置き場を、履歴ごと丸ごと手元にコピーしてくる" },
        { type: "callout", variant: "why", title: "cloneはコピー機のようなもの", text: "cloneは、GitHubにある置き場を1枚まるごとコピーする操作です。ファイルだけでなく、これまでの変更履歴（コミット）もセットでついてきます。だから続きから作業できます。" },
        { type: "heading", text: "最新に更新する git pull" },
        { type: "paragraph", text: "一度cloneしたあとは、GitHub側が誰かの手で更新されることがあります。あなたの手元は古いままかもしれません。そこで、リモートの最新の変更を手元へ取り込む操作が git pull（プル）です。pullは「引っぱってくる」イメージです。" },
        { type: "code", language: "bash", code: "git pull origin main", caption: "originのmainの最新の変更を、手元へ引っぱって取り込む" },
        { type: "compare", bad: { label: "git clone", text: "最初の一回だけ／置き場をまるごとコピーして手元に用意／何もない状態から始めるときに使う" }, good: { label: "git pull", text: "二回目以降、何度でも／手元をリモートの最新に更新する／すでに手元にある置き場を新しくする" } },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「git clone と git pull のちがいを、初心者向けにたとえ話で教えてください。どちらをいつ使うのかもセットで知りたいです。」" }
      ],
      questions: [
        { id: "gitday2-lesson2-q1", type: "choice", question: "GitHubにある置き場を、履歴ごとまるごと自分のPClへ最初に持ってくる操作はどれ？", choices: ["git pull", "git push", "git clone", "git commit"], answerIndex: 2, explanation: "cloneは「複製する」の意味で、置き場を履歴ごと丸ごとコピーして手元に用意します。最初の一歩として使います。" },
        { id: "gitday2-lesson2-q2", type: "choice", question: "すでに手元にある置き場を、リモートの最新の状態に更新したいときに使うのは？", choices: ["git pull", "git clone", "git status", "git log"], answerIndex: 0, explanation: "pullは「引っぱってくる」イメージ。リモートの最新の変更を手元へ取り込んで、状態をそろえます。" },
        { id: "gitday2-lesson2-q3", type: "free", question: "同じプロジェクトを2台のPCで使うとき、cloneとpullをどう使い分けるか説明してください。", modelAnswer: "2台目のPCでは、まずgit cloneでGitHubの置き場をまるごとコピーして用意します。その後、GitHub側が更新されたら、git pullで最新の変更を取り込みます。cloneは最初の一回、pullは二回目以降の更新に使います。", interviewPhrase: "実務でこう説明する: 初回はcloneでリポジトリを取得し、以降はpullでリモートの最新を取り込んで同期します。", keywords: ["clone", "pull", "リモート", "最新", "同期"] }
      ]
    },
    {
      id: "gitday2-lesson3", slug: "github-basics",
      title: "GitHubでできること — 置き場・説明書・公開",
      summary: "GitHubがくれるもの（リポジトリの置き場、README、履歴の閲覧、他人のコードから学ぶ、公開の場）を読んで説明できるようにする。",
      blocks: [
        { type: "heading", text: "GitHubは「コードの置き場＋α」" },
        { type: "paragraph", text: "GitHubはただのバックアップ倉庫ではありません。コードを置くだけでなく、見せる・説明する・学ぶ・公開する、いろいろなことができる場所です。ここではその「できること」を整理します。" },
        { type: "list", items: ["リポジトリの置き場: プロジェクトごとに、記録と履歴をまとめて保管できる", "README（読んで、の意）: プロジェクトの説明書。開いた人が最初に読むトップページになる", "変更履歴の閲覧: いつ・誰が・何を変えたかをブラウザで見られる", "他人のコードを見る・学ぶ: 世界中の公開プロジェクトを読んで勉強できる", "公開の場: 自分の作品を世界に見せられる。ポートフォリオにもなる"] },
        { type: "heading", text: "READMEは「入口の説明書」" },
        { type: "paragraph", text: "リポジトリを開くと、README.md というファイルの中身が自動でトップに表示されます。これは「このプロジェクトは何か」「どう使うか」を書いた説明書です。初めて訪れた人が迷わないための入口の看板だと思ってください。" },
        { type: "callout", variant: "why", title: "なぜREADMEが大事？", text: "どんなに良いコードでも、説明がないと他人（未来の自分も含む）は使い方がわかりません。READMEは「はじめまして、これはこういうものです」と伝える最初の一言。だから丁寧に書くと親切です。" },
        { type: "paragraph", text: "そしてGitHubは、あなたの学びを「見せる場所」にもなります。AIと一緒に書いたコードの練習も、GitHubに置いて公開すれば、成長の記録として残り、就活や転職のときに「これを作りました」と示す材料（ポートフォリオ）になります。" },
        { type: "compare", bad: { label: "PCの中だけ", text: "自分しか見られない／PCが壊れると消える／作品として見せにくい" }, good: { label: "GitHubに置く", text: "リンクで誰にでも見せられる／クラウドに残るので安心／ポートフォリオ・公開先になる" } },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「初心者の学習用リポジトリに置くREADMEには、最低限どんな項目を書くと親切ですか？サンプルの見出し構成を教えてください。」" }
      ],
      questions: [
        { id: "gitday2-lesson3-q1", type: "choice", question: "GitHubのリポジトリを開いたとき、トップに自動で表示される「説明書」の役割を持つファイルは？", choices: ["main.ts", "README.md", "index.html", "config.json"], answerIndex: 1, explanation: "README.md はプロジェクトの説明書で、リポジトリを開くと中身がトップに表示されます。初めての訪問者への入口の看板です。" },
        { id: "gitday2-lesson3-q2", type: "free", question: "GitHubにコードを置くと、PCの中だけに置くのと比べてどんな良いことがあるか、3つ挙げて説明してください。", modelAnswer: "1つ目はバックアップになり、PCが壊れても記録が残ること。2つ目は履歴やREADMEで他人に説明でき、他人のコードから学べること。3つ目はリンクで作品を公開でき、ポートフォリオになることです。", interviewPhrase: "実務でこう説明する: GitHubはバックアップ・共有・公開を兼ね、履歴閲覧やREADMEでチームや採用担当に成果を示せます。", keywords: ["バックアップ", "README", "履歴", "公開", "ポートフォリオ"] }
      ]
    }
  ]
};
