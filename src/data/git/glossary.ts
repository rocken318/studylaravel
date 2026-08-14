import type { GlossaryTerm } from "@/types";

// Gitコースの用語集。category は "git"。
export const gitGlossary: GlossaryTerm[] = [
  {
    slug: "version-control",
    term: "バージョン管理",
    reading: "バージョンかんり",
    category: "git",
    meaning:
      "ファイルの変更履歴を記録し、いつでも過去の状態に戻せるようにするしくみ。作業の「セーブポイント」を積み重ねるイメージ。「〜最終版_本当に最終」問題を根本から解決します。",
    interviewExample:
      "実務でこう説明する: 変更はバージョン管理で履歴を残し、問題があれば安全に前の状態へ戻せるようにしています。",
    related: ["git", "commit"],
  },
  {
    slug: "git",
    term: "Git",
    reading: "ギット",
    category: "git",
    meaning:
      "手元(ローカル)でファイルの変更履歴を管理する、最も広く使われているバージョン管理ツール。誰が・いつ・何を変えたかを記録し、過去に戻したり、枝分かれして作業したりできます。",
    interviewExample:
      "実務でこう説明する: ソースコードはGitで管理し、履歴とブランチを使って安全に開発を進めています。",
    related: ["github", "repository", "commit"],
  },
  {
    slug: "github",
    term: "GitHub",
    reading: "ギットハブ",
    category: "git",
    meaning:
      "Gitのリポジトリをインターネット上(リモート)に置いて、保存・共有・共同作業できるサービス。バックアップ、チーム開発、ポートフォリオの公開先として使われます。GitとGitHubは別物(道具と置き場)。",
    interviewExample:
      "実務でこう説明する: リモートはGitHubに置き、push/pullで同期しながらチームで開発しています。",
    related: ["git", "remote", "pull-request"],
  },
  {
    slug: "repository",
    term: "リポジトリ",
    reading: "リポジトリ",
    category: "git",
    meaning:
      "Gitが変更履歴を記録する「プロジェクトの記録箱」。git init で作られ、隠しフォルダ .git の中に履歴が保存されます。略して「リポジトリ」または「レポ」。",
    interviewExample:
      "実務でこう説明する: 機能ごと/プロジェクトごとにリポジトリを分け、履歴を追いやすい単位で管理しています。",
    related: ["git", "commit"],
  },
  {
    slug: "commit",
    term: "コミット",
    reading: "コミット",
    category: "git",
    meaning:
      "その時点の変更を1つの記録としてリポジトリに保存すること(＝セーブ)。git commit で行い、何を変えたかを表すメッセージを添えます。コミットを積み重ねたものが履歴になります。",
    interviewExample:
      "実務でこう説明する: 意味のあるまとまりごとにコミットし、メッセージで変更意図が伝わるようにしています。",
    related: ["staging", "commit-message", "history"],
  },
  {
    slug: "staging",
    term: "ステージング / git add",
    category: "git",
    meaning:
      "コミットに含める変更を選んで準備する場所(ステージ)と、その操作 git add。買い物カゴに入れる→レジで会計(コミット)、のカゴにあたります。全部ではなく必要な変更だけ選べます。",
    interviewExample:
      "実務でこう説明する: git add で関連する変更だけをステージングし、コミットを目的ごとに小さく保っています。",
    related: ["commit"],
  },
  {
    slug: "commit-message",
    term: "コミットメッセージ",
    category: "git",
    meaning:
      "そのコミットで「何を・なぜ変えたか」を表す短い説明。後から履歴を読む人(未来の自分やチーム)への手紙です。「修正」だけでなく具体的に書くと価値が上がります。",
    interviewExample:
      "実務でこう説明する: コミットメッセージは変更の意図が一目で分かる粒度で書き、レビューや原因調査を速くしています。",
    related: ["commit"],
  },
  {
    slug: "history",
    term: "履歴 / git log",
    reading: "りれき",
    category: "git",
    meaning:
      "積み重ねたコミットの記録。git log で「いつ・誰が・何を」変えたかを一覧でき、git status で今の状態(未保存の変更など)を確認できます。過去に戻れる安心の源です。",
    interviewExample:
      "実務でこう説明する: 不具合の原因調査では履歴をたどり、いつ入った変更かを特定してから対処しています。",
    related: ["commit"],
  },
  {
    slug: "remote",
    term: "リモート / push・pull",
    category: "git",
    meaning:
      "GitHubなどネット上に置いた共有リポジトリがリモート。git push で手元の記録をリモートへ送り(保存・共有)、git pull でリモートの最新を手元に取り込みます。",
    interviewExample:
      "実務でこう説明する: 作業はpushでリモートに反映し、pullで最新を取り込んでチームと状態を合わせています。",
    related: ["github", "clone"],
  },
  {
    slug: "clone",
    term: "クローン / git clone",
    category: "git",
    meaning:
      "リモートのリポジトリを、履歴ごと丸ごと手元にコピーしてくること。git clone <URL> で行い、別のPCやチームメンバーが同じものを手に入れられます。",
    interviewExample:
      "実務でこう説明する: 新しい環境では対象リポジトリをcloneして、履歴込みで開発を始めています。",
    related: ["remote", "github"],
  },
  {
    slug: "branch",
    term: "ブランチ",
    reading: "ブランチ",
    category: "git",
    meaning:
      "作業を枝分かれさせるしくみ。本流(main)を壊さずに、新機能や修正を別の「分身」で試せます。うまくいったら本流に合流(マージ)します。パラレルワールドのイメージ。",
    interviewExample:
      "実務でこう説明する: 変更は必ずブランチを切って行い、mainを常に動く状態に保っています。",
    related: ["merge", "main-branch", "pull-request"],
  },
  {
    slug: "main-branch",
    term: "main ブランチ",
    category: "git",
    meaning:
      "プロジェクトの中心となる本流のブランチ(以前は master と呼ばれた)。通常ここは「いつでも動く」状態に保ち、変更はブランチを切ってから取り込みます。",
    interviewExample:
      "実務でこう説明する: mainは常にリリース可能な状態を維持し、直接コミットせずレビューを経て取り込みます。",
    related: ["branch", "merge"],
  },
  {
    slug: "merge",
    term: "マージ",
    reading: "マージ",
    category: "git",
    meaning:
      "枝分かれしたブランチの変更を、別のブランチ(多くはmain)に合流させること。ブランチでの作業が完成したら、レビューを経てmainへマージします。",
    interviewExample:
      "実務でこう説明する: 作業ブランチはレビュー後にmainへマージし、その単位でリリース内容を管理しています。",
    related: ["branch", "pull-request", "conflict"],
  },
  {
    slug: "pull-request",
    term: "プルリクエスト (PR)",
    category: "git",
    meaning:
      "「このブランチの変更をmainに取り込んでいいか、見てください」というレビュー依頼。GitHub上で作り、他の人が中身を確認・コメントしてから承認・マージします。現場の共同開発の中心。",
    interviewExample:
      "実務でこう説明する: 変更はプルリクエストでレビューを受けてからマージし、品質と知識共有を担保しています。",
    related: ["branch", "merge", "code-review"],
  },
  {
    slug: "code-review",
    term: "コードレビュー",
    category: "git",
    meaning:
      "他の人が書いた(またはAIが書いた)コードを、マージ前に読んで確認・指摘する工程。バグや設計の問題を早く見つけ、チーム全体の理解もそろえます。PRの上で行われます。",
    interviewExample:
      "実務でこう説明する: PR上でレビューし合い、指摘は理由とセットで伝えて、コード品質とチームの学びを両立しています。",
    related: ["pull-request"],
  },
  {
    slug: "conflict",
    term: "コンフリクト",
    reading: "コンフリクト",
    category: "git",
    meaning:
      "同じ場所を別々に編集したブランチをマージしようとして、変更がぶつかること。怖くありません。どちらを残すか(または両方どう合わせるか)を選んで解決するだけです。",
    interviewExample:
      "実務でこう説明する: コンフリクトは慌てず両者の意図を確認し、正しい形に統合してから解決しています。",
    related: ["merge", "branch"],
  },
  {
    slug: "gitignore",
    term: ".gitignore",
    category: "git",
    meaning:
      "Gitで記録したくないファイルを指定する設定ファイル。パスワードなどの秘密情報や、自動生成される大きなフォルダ(node_modulesなど)を履歴に含めないために使います。",
    interviewExample:
      "実務でこう説明する: 秘密情報や生成物は.gitignoreで除外し、リポジトリに機密や不要物が入らないようにしています。",
    related: ["repository"],
  },
];
