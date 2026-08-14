import type { Day } from "@/types";
export const gitDay1: Day = {
  day: 1, slug: "day1", title: "基本の流れ — 記録する・履歴を読む",
  goal: "Gitの中心ループを読んで説明できるようになる: リポジトリを作り、変更をステージ＆コミットし、履歴を読む。",
  lessons: [
    { id: "gitday1-lesson1", slug: "repository", title: "リポジトリ＝プロジェクトの「記録箱」", summary: "リポジトリが何かをたとえで理解し、git init で作れることを説明できる。",
      blocks: [
        { type: "heading", text: "リポジトリってなに？" },
        { type: "paragraph", text: "リポジトリ（repository）は、プロジェクトの「記録箱」です。ファイルそのものだけでなく、「いつ・誰が・何を変えたか」という作業の全記録をまるごとしまっておく箱だと思ってください。ふつうのフォルダとの違いは、この『歴史をおぼえておく力』があるかどうかです。" },
        { type: "paragraph", text: "たとえるなら、ゲームのセーブデータが全部残っている箱です。ふつうのフォルダは「今のセーブ」しか持てませんが、リポジトリは過去のセーブも全部とっておけます。だから安心して壊せる、というのがGitの正体です。" },
        { type: "code", language: "bash", code: "cd my-project\ngit init", caption: "プロジェクトのフォルダに入り、git init でそこをリポジトリにする" },
        { type: "paragraph", text: "git init を実行すると、そのフォルダの中に .git という隠しフォルダが作られます。この .git の中に履歴がぜんぶ入っています。つまり「記録箱の中身」は .git フォルダそのものです。" },
        { type: "callout", variant: "why", title: "なぜ init が必要なの？", text: "Gitは、あなたが「ここを記録箱にします」と宣言するまで何も記録しません。勝手にどこでも履歴を取り始めたら邪魔だからです。git init は『この場所の記録を始めます』というスイッチを入れる操作です。" },
        { type: "callout", variant: "warn", title: ".git は消さない", text: ".git フォルダを消すと、過去の履歴がすべて消えます。中身をのぞく必要はありませんが、うっかり削除しないよう気をつけましょう。" },
        { type: "list", items: ["リポジトリ＝履歴つきの記録箱", "git init でフォルダをリポジトリにする", ".git フォルダに履歴が保存される"] },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「git init を実行したら .git フォルダができました。この中には何が入っていて、消すとどうなりますか？初心者にもわかるようにたとえで教えてください。」" }
      ],
      questions: [
        { id: "gitday1-lesson1-q1", type: "choice", question: "git init を実行すると、フォルダの中に作られるものは？", choices: [".git という履歴を保存する隠しフォルダ", "backup.zip という圧縮ファイル", "インターネット上のサーバー", "README.md というメモ帳"], answerIndex: 0, explanation: "git init はフォルダの中に .git フォルダを作り、そこに履歴を保存していきます。これがそのフォルダを「リポジトリ」にする正体です。" },
        { id: "gitday1-lesson1-q2", type: "free", question: "リポジトリとは何か、ふつうのフォルダとの違いも入れて、たとえを使って説明してください。", modelAnswer: "リポジトリはプロジェクトの記録箱で、ファイルだけでなく「いつ・誰が・何を変えたか」という履歴を全部おぼえておけます。ふつうのフォルダは今の状態しか持てませんが、リポジトリはゲームのセーブデータのように過去の状態も残せます。git init を実行すると .git フォルダができ、そこに履歴が入ります。", interviewPhrase: "実務でこう説明する: リポジトリは履歴つきの記録箱で、git init で作った .git フォルダに全部の変更履歴が保存されます。", keywords: ["リポジトリ", "git init", ".git", "履歴", "記録箱"] }
      ]
    },
    { id: "gitday1-lesson2", slug: "add-commit", title: "変更を記録する2ステップ — add と commit", summary: "git add と git commit の役割の違いを、カゴとレジのたとえで説明できる。",
      blocks: [
        { type: "heading", text: "記録は2ステップでできている" },
        { type: "paragraph", text: "Gitで変更を記録するには、2つのステップを踏みます。まず git add で「記録するものを選ぶ」、次に git commit で「選んだものをセーブする」。この2段階が最初はわかりにくいので、たとえで整理しましょう。" },
        { type: "paragraph", text: "スーパーの買い物を想像してください。git add は、棚から商品を選んで『カゴに入れる』こと。git commit は、カゴの中身をまとめて『レジで会計する』ことです。カゴに入れただけではまだ買っていません。会計して初めて、正式な記録（レシート）が残ります。" },
        { type: "code", language: "bash", code: "git add index.html\ngit commit -m \"トップページの見出しを追加\"", caption: "add で選び、commit でメッセージをつけて記録する" },
        { type: "paragraph", text: "この「カゴに入れる」段階のことをステージング（staging）と呼びます。全部いっぺんに記録するのではなく、関係のある変更だけをカゴに入れてから会計できるので、記録をきれいに分けられます。" },
        { type: "code", language: "bash", code: "git add .\ngit commit -m \"メッセージ\"", caption: "git add . は変更したファイルをまとめてカゴに入れる書き方" },
        { type: "callout", variant: "why", title: "なぜ2ステップに分けるの？", text: "「今回の記録に含めるもの」と「まだ含めないもの」を分けたいからです。たとえば3つ直したうち2つだけを1つの記録にしたいとき、add でその2つだけを選べます。commit を意味のあるかたまりに保てるのが利点です。" },
        { type: "compare", bad: { label: "git add", text: "記録するものを選ぶ／カゴに入れる段階（ステージング）／まだ履歴には残らない" }, good: { label: "git commit", text: "選んだものをセーブする／レジで会計する段階／メッセージとともに履歴に残る" } },
        { type: "callout", variant: "info", title: "コミットメッセージの良い書き方", text: "メッセージは「何をしたか」が後で読んでわかるように書きます。悪い例:「修正」。良い例:「ログイン画面のボタンの色を青に変更」。未来の自分や仲間が履歴を読んだとき、開かなくても内容がわかるのが理想です。" },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「git add と git commit の違いを、買い物のたとえで説明してください。あと、良いコミットメッセージの例と悪い例も3つずつ教えてください。」" }
      ],
      questions: [
        { id: "gitday1-lesson2-q1", type: "choice", question: "買い物のたとえで、git commit にあたるのはどれ？", choices: ["カゴの中身をレジで会計する", "商品を棚からカゴに入れる", "店に入る", "商品を棚に戻す"], answerIndex: 0, explanation: "git add がカゴに入れる（選ぶ）、git commit がレジで会計する（記録する）です。会計して初めてレシート（履歴）が残ります。" },
        { id: "gitday1-lesson2-q2", type: "choice", question: "ステージングとは何を指しますか？", choices: ["記録に含める変更を「選んでカゴに入れる」段階", "履歴を消す操作", "リポジトリを新しく作る操作", "過去のコミットに戻る操作"], answerIndex: 0, explanation: "ステージングは git add で「今回のコミットに含めるものを選ぶ」段階です。ここで選んだものだけが commit で記録されます。" },
        { id: "gitday1-lesson2-q3", type: "free", question: "git add と git commit の役割の違いを、たとえを使って説明してください。良いコミットメッセージの条件も一言添えてください。", modelAnswer: "git add は記録するものを選んでカゴに入れる段階（ステージング）で、git commit はカゴの中身をレジで会計してセーブする段階です。add しただけでは履歴に残らず、commit して初めてメッセージとともに履歴になります。良いコミットメッセージは「何をしたか」が後で読んでわかるように具体的に書くことです。", interviewPhrase: "実務でこう説明する: add でステージに変更を選び、commit でメッセージ付きの記録として履歴に残します。add は選ぶ、commit はセーブです。", keywords: ["git add", "git commit", "ステージング", "コミットメッセージ", "カゴ"] }
      ]
    },
    { id: "gitday1-lesson3", slug: "history", title: "履歴を読む — log と status", summary: "git log と git status で「いつ・誰が・何を」変えたかを読み、戻せる安心を説明できる。",
      blocks: [
        { type: "heading", text: "記録した履歴を読んでみる" },
        { type: "paragraph", text: "コミットで記録したものは、あとから読み返せます。履歴を読むための代表的なコマンドが git log です。log は「いつ・誰が・何を変えたか」を一覧で見せてくれます。つまり、これまでのセーブの一覧表です。" },
        { type: "code", language: "bash", code: "git log", caption: "コミットの履歴を新しい順に表示する" },
        { type: "paragraph", text: "log を実行すると、コミットごとに『誰が（作者）』『いつ（日時）』『何を（メッセージ）』が並びます。だからこそ、レッスン2で学んだ良いメッセージが効いてきます。メッセージが具体的だと、log を読むだけで歴史が理解できます。" },
        { type: "paragraph", text: "一方で、git status は「今の状態」を見せてくれます。どのファイルを変更したか、カゴ（ステージ）に入っているか、まだ入っていないか。log が『過去の一覧』なら、status は『今どうなっているか』の確認です。" },
        { type: "code", language: "bash", code: "git status", caption: "変更したファイルとステージの状態を確認する" },
        { type: "compare", bad: { label: "git log", text: "過去の履歴を読む／いつ・誰が・何を変えたか／コミットの一覧" }, good: { label: "git status", text: "今の状態を確認する／変更中／ステージ済みがわかる／commit 前のチェックに使う" } },
        { type: "callout", variant: "why", title: "なぜ履歴が「安心」につながるの？", text: "履歴が残っているということは、いつでも過去の状態を見られて、必要なら戻れるということです。だから「壊しても戻せる」。思い切って書き換えても、log に記録があれば元に戻せる、という安心感がGitの一番の価値です。" },
        { type: "list", items: ["git log ＝ 過去の履歴を読む", "git status ＝ 今の状態を確認する", "履歴があるから、思い切って変更しても戻せる"] },
        { type: "callout", variant: "info", title: "AIにはこう聞く", text: "「git log の出力の見方を、行ごとに何を意味するのか初心者向けに説明してください。git log と git status の使い分けも教えてください。」" }
      ],
      questions: [
        { id: "gitday1-lesson3-q1", type: "choice", question: "「これまでのコミットを新しい順に一覧で見たい」ときに使うコマンドは？", choices: ["git log", "git status", "git init", "git add"], answerIndex: 0, explanation: "git log は過去のコミット履歴を一覧表示します。git status は今の状態、git init はリポジトリ作成、git add はステージングです。" },
        { id: "gitday1-lesson3-q2", type: "choice", question: "git status がおもに教えてくれるのはどれ？", choices: ["今どのファイルを変更したか、ステージに入っているか", "何年前にリポジトリを作ったか", "インターネットの速度", "コミットの総数だけ"], answerIndex: 0, explanation: "git status は「今の状態」を見せます。変更中のファイルや、ステージ（カゴ）に入っているかどうかを確認でき、commit 前のチェックに便利です。" },
        { id: "gitday1-lesson3-q3", type: "free", question: "git log と git status の違いを説明し、「履歴があると安心」と言える理由も述べてください。", modelAnswer: "git log は過去の履歴を読むコマンドで、いつ・誰が・何を変えたかを一覧で見せます。git status は今の状態を確認するコマンドで、変更中のファイルやステージの状況がわかります。履歴が残っていれば過去の状態をいつでも見られて必要なら戻れるので、思い切って変更しても壊したままにならず安心だと言えます。", interviewPhrase: "実務でこう説明する: log で過去の記録を読み、status で現在の状態を確認します。履歴が残るから、いつでも過去に戻れる安心があります。", keywords: ["git log", "git status", "履歴", "戻せる", "安心"] }
      ]
    }
  ]
};
