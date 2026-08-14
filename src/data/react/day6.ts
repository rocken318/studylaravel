import type { Day } from "@/types";

export const reactDay6: Day = {
  day: 6,
  slug: "day6",
  title: "小さなアプリを作って公開する — 現場の地図",
  goal: "これまでの部品(props/state/effect/list/form)を組み合わせて小さなアプリを作る全体像をつかみ、ReactとNext.jsの関係、画面遷移(ルーティング)の考え方、Vercelへの公開の流れ、そしてよくある落とし穴と基本のパフォーマンス感覚を、読める・直せる・説明できるレベルで理解する。",
  lessons: [
    {
      id: "reactday6-lesson1",
      slug: "putting-together",
      title: "部品を組み合わせて小さなアプリを作る",
      summary: "props/state/effect/list/formをレゴのように組み合わせ、TODOアプリを例に「設計の順番」をつかむ。",
      blocks: [
        {
          type: "heading",
          text: "アプリは「部品の組み合わせ」でできている",
        },
        {
          type: "paragraph",
          text: "ここまでで、props(部品への入力)、state(覚えておく値)、effect(外の世界とのやりとり)、リスト表示、フォーム入力を学んできました。実はアプリは、この5つの部品をレゴのように組み合わせたものにすぎません。難しそうに見えるTODOアプリやメモ帳も、分解すれば「状態を持つ箱」と「その状態を映す部品」と「状態を変えるボタン」の組み合わせです。",
        },
        {
          type: "paragraph",
          text: "料理でたとえると、いきなり盛り付けから始める人はいません。まず「何を作るか(完成形)」を決め、次に「材料(具材)」を並べ、最後に「手順どおりにつなぐ」。Reactのアプリづくりも同じ順番です。設計には決まった順番があり、そこを外さなければ迷いにくくなります。",
        },
        {
          type: "heading",
          text: "設計の順番: 状態を決める → 部品に分ける → つなぐ",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "状態を決める: 画面が「覚えておく必要のある値」は何かを書き出す。TODOなら「タスクの一覧」と「入力中の文字」の2つ",
            "部品に分ける: 画面を意味のある単位に切る。入力フォーム、一覧、1件分の行、の3つに分けられる",
            "つなぐ: 状態をどこに置き、どの部品に渡すか(props)を決め、ボタンで状態を更新する関数を配線する",
          ],
        },
        {
          type: "paragraph",
          text: "いちばん大事なのは最初の「状態を決める」です。状態を置く場所を間違えると、あとで配線がこじれます。原則は「その状態を使う部品たちの、いちばん近い共通の親に置く」こと。TODOの一覧は入力フォームと表示の両方から触るので、両者の親にまとめて置きます。",
        },
        {
          type: "code",
          language: "tsx",
          caption: "TODOアプリの骨組み。状態を親に置き、部品に配る",
          code: "\"use client\";\nimport { useState } from \"react\";\n\ntype Task = { id: number; text: string };\n\nexport default function TodoApp() {\n  // 1) 状態を決める: タスク一覧と入力中の文字\n  const [tasks, setTasks] = useState<Task[]>([]);\n  const [input, setInput] = useState(\"\");\n\n  // 3) つなぐ: 状態を変える関数\n  function addTask() {\n    if (input === \"\") return;\n    setTasks([...tasks, { id: Date.now(), text: input }]);\n    setInput(\"\"); // 追加したら入力欄を空に戻す\n  }\n\n  return (\n    <main>\n      <input value={input} onChange={(e) => setInput(e.target.value)} />\n      <button onClick={addTask}>追加</button>\n      <TaskList tasks={tasks} />\n    </main>\n  );\n}",
        },
        {
          type: "code",
          language: "tsx",
          caption: "2) 部品に分ける: 一覧は受け取ったtasksを映すだけの部品",
          code: "type Task = { id: number; text: string };\n\n// props で tasks を受け取り、リストを描くだけ\nfunction TaskList({ tasks }: { tasks: Task[] }) {\n  return (\n    <ul>\n      {tasks.map((task) => (\n        <li key={task.id}>{task.text}</li>\n      ))}\n    </ul>\n  );\n}",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ状態を「親」にまとめるのか",
          text: "同じ状態を複数の部品が触るとき、それぞれが別々に持つと食い違いが起きます(片方だけ古い値になる、など)。状態はひとつの場所(共通の親)に置き、子には props で配り、更新は親から渡した関数で行う。この「一方向の流れ」がReactの一貫性を守る背骨です。",
        },
        {
          type: "callout",
          variant: "warn",
          title: "よくある落とし穴: 状態を置く場所を最初から決めない",
          text: "「とりあえず動かしてから考える」と、状態があちこちに散らばって配線がスパゲッティになります。最初に1分だけ「この画面が覚える値は何か」を紙に書くだけで、後の作業が驚くほど楽になります。",
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「TODOアプリを作りたい。まず状態を何個、どこに持てばいいか設計だけ提案して。コードはまだ書かなくていい」と、設計と実装を分けて聞くのがコツです。いきなり全部書かせると、自分が地図を持てません。設計を自分で理解してから実装をAIに任せると、出てきたコードの良し悪しを判断できます。",
        },
        {
          type: "paragraph",
          text: "まとめると、アプリづくりは「状態を決める → 部品に分ける → つなぐ」の順番。状態は共通の親に置き、子へは props で配り、更新は関数で行う。この地図さえ持てば、TODOでもメモ帳でも、同じ手順で組み立てられます。",
        },
      ],
      questions: [
        {
          id: "reactday6-lesson1-q1",
          type: "choice",
          question: "Reactで小さなアプリを設計するとき、推奨される順番はどれ?",
          choices: [
            "見た目を作る → 状態を後から足す → 配線する",
            "状態を決める → 部品に分ける → つなぐ",
            "つなぐ → 状態を決める → 部品に分ける",
            "部品に分ける → 見た目を完成させる → 状態は使わない",
          ],
          answerIndex: 1,
          explanation: "まず「画面が覚える値(状態)」を決め、次に画面を部品に分け、最後に状態を配って更新関数をつなぎます。状態を最初に決めると、置き場所の迷いが減ります。",
        },
        {
          id: "reactday6-lesson1-q2",
          type: "choice",
          question: "複数の部品が同じ状態を触りたいとき、状態はどこに置くのがよい?",
          choices: [
            "それぞれの部品が別々にコピーを持つ",
            "その状態を使う部品たちの、いちばん近い共通の親に置く",
            "一番深い子コンポーネントに置く",
            "状態は使わずグローバル変数にする",
          ],
          answerIndex: 1,
          explanation: "同じ状態を各部品が別々に持つと食い違いが起きます。共通の親に1つ置き、子へは props で配り、更新は親の関数で行うと一貫性が保てます。",
        },
        {
          id: "reactday6-lesson1-q3",
          type: "free",
          question: "TODOアプリを例に、「設計の順番」と「状態の置き場所」の考え方を説明してください。",
          modelAnswer: "まず状態を決めます。TODOなら「タスク一覧」と「入力中の文字」の2つです。次に画面を部品に分けます。入力フォーム、一覧、1件分の行などです。最後につなぎます。状態は、それを使う部品たちの共通の親に置き、子には props で配り、更新は親から渡した関数で行います。こうすると値の食い違いが起きず、一方向の流れで一貫性を保てます。",
          interviewPhrase: "実務でこう説明する: 「まず状態を洗い出して共通の親に置き、子には props で配って、更新は親の関数で行います。設計を先に固めてから実装するので、AIに書かせても地図を持って判断できます」",
          keywords: ["状態", "部品に分ける", "共通の親", "props", "一方向"],
        },
      ],
    },
    {
      id: "reactday6-lesson2",
      slug: "next-and-routing",
      title: "Next.jsとルーティング — 複数画面の考え方",
      summary: "ReactにNext.jsが何を足すのかを理解し、「ファイル=ページ」の発想と複数画面(ルーティング)の考え方をつかむ。",
      blocks: [
        {
          type: "heading",
          text: "ReactにNext.jsは何を足すのか",
        },
        {
          type: "paragraph",
          text: "Reactは「画面の部品を作る」道具です。とても優秀ですが、それだけでは足りないものがあります。たとえば「/about を開いたらこのページ、/blog を開いたらあのページ」という画面の切り替え(ルーティング)や、サーバー側でデータを取ってくる機能です。これらをまとめて用意してくれるのがNext.js(ネクストジェイエス)というフレームワークです。",
        },
        {
          type: "paragraph",
          text: "たとえるなら、Reactは「エンジン」、Next.jsは「エンジンを積んだ車体一式」です。エンジン単体では道を走れません。ハンドル(ルーティング)、燃料系(サーバー機能)、車体(ビルドや配信の仕組み)がそろって、はじめて公道を走れる1台になります。実務でReactを使うとき、その多くはNext.jsの上で動いています。",
        },
        {
          type: "compare",
          bad: {
            label: "Reactだけ",
            text: "部品は作れるが、画面の切り替えやサーバー機能は自分で寄せ集める必要がある",
            language: "tsx",
            code: "// 部品(コンポーネント)は作れる\nfunction About() {\n  return <h1>会社について</h1>;\n}\n// でも「/about で表示する」仕組みは別途用意が必要",
          },
          good: {
            label: "Next.js",
            text: "ファイルを置くだけでページになり、ルーティングやサーバー機能が最初から付いてくる",
            language: "tsx",
            code: "// app/about/page.tsx を置くだけで /about になる\nexport default function About() {\n  return <h1>会社について</h1>;\n}",
          },
        },
        {
          type: "heading",
          text: "ファイル = ページ という発想",
        },
        {
          type: "paragraph",
          text: "Next.jsの現在の標準(App Router)では、フォルダの構造がそのままURLになります。app というフォルダの下に page.tsx を置くと、それが1つのページになります。フォルダ名がURLの一部です。この「ファイルを置く場所がURLを決める」という発想さえつかめば、複数画面のサイトの地図が頭に描けます。",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "app/page.tsx  →  /(トップページ)",
            "app/about/page.tsx  →  /about",
            "app/blog/page.tsx  →  /blog",
            "ページの中身は、これまで学んだReactコンポーネントそのもの",
          ],
        },
        {
          type: "paragraph",
          text: "画面から画面へ移動するときは、a タグの代わりに Link という部品を使います。Link を使うと、ページ全体を読み込み直さずに必要な部分だけ差し替わるので、切り替えが速く、体感がなめらかになります。これがSPA(シングルページアプリケーション)の考え方です。",
        },
        {
          type: "code",
          language: "tsx",
          caption: "Link で画面を移動する。ページ全体を再読み込みしない",
          code: "import Link from \"next/link\";\n\nexport default function Nav() {\n  return (\n    <nav>\n      <Link href=\"/\">ホーム</Link>\n      <Link href=\"/about\">会社について</Link>\n      <Link href=\"/blog\">ブログ</Link>\n    </nav>\n  );\n}",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ a タグではなく Link なのか",
          text: "ふつうの a タグは、クリックするたびにページ全体をサーバーから読み込み直します(画面が一瞬白くなるあれ)。Link は必要な部分だけを差し替えるため、切り替えが速く、入力中の状態なども保たれます。速さと体感のなめらかさが、SPAの利点です。",
        },
        {
          type: "callout",
          variant: "warn",
          title: "よくある落とし穴: フォルダ名の綴りミス",
          text: "URLはフォルダ名で決まるので、about を abuot と打つと /abuot でしか開けません。ページが「見つからない(404)」ときは、まずフォルダ名とファイル名(page.tsx)の綴りを疑いましょう。",
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「Next.js App Routerで /about と /blog の2ページを作りたい。どのフォルダに何を置けばいい?」と聞けば、フォルダ構成を示してくれます。手順の暗記より「ファイル=ページ」という発想を自分が持っていることが大事です。発想さえあれば、AIの答えが妥当か判断できます。",
        },
        {
          type: "paragraph",
          text: "まとめると、Next.jsはReactに「ルーティング・サーバー機能・配信の仕組み」を足したフレームワーク。app の下に page.tsx を置けばページになり、移動は Link で行う。この地図を持てば、複数画面のサイト全体が見通せます。",
        },
      ],
      questions: [
        {
          id: "reactday6-lesson2-q1",
          type: "choice",
          question: "Next.jsがReactに主に足してくれるものはどれ?",
          choices: [
            "画面の部品(コンポーネント)を作る機能",
            "ルーティング(画面の切り替え)やサーバー機能などの土台",
            "CSSを書く機能",
            "JavaScriptそのものの文法",
          ],
          answerIndex: 1,
          explanation: "Reactは部品を作る道具です。Next.jsはそこにルーティング・サーバー機能・配信の仕組みなどを足し、実際のWebサイトを作れる土台にします。",
        },
        {
          id: "reactday6-lesson2-q2",
          type: "choice",
          question: "Next.js(App Router)で /blog というページを作るには、どのファイルを用意する?",
          choices: [
            "app/blog.html",
            "app/blog/page.tsx",
            "pages/blog.js",
            "blog/index.html",
          ],
          answerIndex: 1,
          explanation: "App Routerではフォルダ構造がURLになり、ページの実体は page.tsx です。app/blog/page.tsx を置くと /blog で開けます。",
        },
        {
          id: "reactday6-lesson2-q3",
          type: "free",
          question: "「ファイル=ページ」という発想と、a タグではなく Link を使う理由を説明してください。",
          modelAnswer: "Next.jsのApp Routerでは、app フォルダの下に置いた page.tsx がそのままページになり、フォルダ名がURLになります。これが「ファイル=ページ」という発想です。画面移動には Link を使います。ふつうの a タグはページ全体を読み込み直しますが、Link は必要な部分だけを差し替えるので、切り替えが速く、状態も保たれます。これがSPAのなめらかさの理由です。",
          interviewPhrase: "実務でこう説明する: 「App Routerはフォルダ構成がそのままURLになるので、page.tsx を置く場所で画面を設計します。遷移は Link を使って、全体再読み込みを避けて体感を速く保ちます」",
          keywords: ["ファイル=ページ", "page.tsx", "ルーティング", "Link", "SPA"],
        },
      ],
    },
    {
      id: "reactday6-lesson3",
      slug: "deploy-vercel",
      title: "Vercelで世界に公開する",
      summary: "GitHubにpushするとVercelが自動でビルド&デプロイし、URLで世界に公開される流れを俯瞰する。",
      blocks: [
        {
          type: "heading",
          text: "「公開する」とは、URLで誰でも開ける状態にすること",
        },
        {
          type: "paragraph",
          text: "手元のパソコンで動くアプリは、あなたしか見られません。世界中の人に見てもらうには、インターネット上のサーバーにアプリを置き、URL(https://... )で開けるようにする必要があります。この作業を「デプロイ(公開)」と呼びます。昔はこれがとても面倒でしたが、今はVercel(ヴァーセル)というサービスで、驚くほど簡単になりました。",
        },
        {
          type: "paragraph",
          text: "VercelはNext.jsを作っている会社のサービスなので、Next.jsとの相性が抜群です。基本の流れはたった3ステップ。GitHubにコードをpushする → Vercelが自動でビルド(公開用に組み立て)する → URLで世界に公開される。この一連が自動で回るのが最大の魅力です。",
        },
        {
          type: "heading",
          text: "登録から公開までの流れ(俯瞰)",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "GitHubにアカウントを作り、アプリのコードをリポジトリとして置く(push する)",
            "Vercelにアクセスし、GitHubアカウントで連携ログインする",
            "公開したいリポジトリを選んで「Import(取り込み)」する",
            "Vercelが自動でビルドし、数分で https://... のURLが発行される",
            "以降は GitHub に push するたびに、Vercelが自動でビルドし直して公開を更新する",
          ],
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ「push するだけ」で公開が更新されるのか",
          text: "Vercelはあなたのリポジトリを見張っていて、新しい push を検知すると自動でビルドとデプロイを走らせます。この「コードを保存(push)すれば公開に反映される」仕組みをCI/CD(継続的インテグレーション/デリバリー)と呼びます。人手の作業を挟まないぶん、ミスが減り、公開が速くなります。",
        },
        {
          type: "code",
          language: "javascript",
          caption: "公開を更新する操作は、基本この3コマンドだけ(手元での作業)",
          code: "// 変更を記録して GitHub に送るだけ。あとはVercelが自動で公開する\n// 1) 変更したファイルを記録対象にする\n// git add .\n// 2) 変更に名前(メッセージ)をつけて確定する\n// git commit -m \"タスクの削除ボタンを追加\"\n// 3) GitHub に送る → これをきっかけにVercelが自動デプロイ\n// git push",
        },
        {
          type: "callout",
          variant: "warn",
          title: "よくある落とし穴: 手元では動くのにデプロイで失敗する",
          text: "「自分のパソコンでは動くのにVercelでビルドが失敗する」はよくあります。原因の多くは、TypeScriptの型エラーや、大文字小文字を間違えたファイル名(手元のWindows/Macは区別が緩いが、公開先は厳密)です。ビルドが赤くなったら、まずVercelの画面に出るエラーログを読みましょう。",
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "手順を暗記する必要はありません。「Next.jsのアプリをVercelで公開したい。GitHubへのpushから公開までの流れを教えて」や「このVercelのビルドエラーの意味と直し方を教えて(エラーログを貼る)」と聞けば、詰まりどころを解いてくれます。大事なのは「push → 自動ビルド → 公開」という全体の地図を持っていることです。",
        },
        {
          type: "paragraph",
          text: "まとめると、公開は「GitHubにpush → Vercelが自動ビルド → URLで世界に公開」の3ステップ。細かい手順は暗記せず、詰まったらAIに聞けば十分です。この全体像さえ持っていれば、自分の作ったアプリを世界に出せます。",
        },
      ],
      questions: [
        {
          id: "reactday6-lesson3-q1",
          type: "choice",
          question: "Vercelでの公開の基本的な流れとして正しいものはどれ?",
          choices: [
            "手元でビルドしたファイルを毎回サーバーに手作業でアップロードする",
            "GitHubにpush → Vercelが自動でビルド&デプロイ → URLで公開",
            "Vercelにログインして毎回ボタンを押してビルドを開始する必要がある",
            "公開のたびにサーバーを自分で契約して設定する",
          ],
          answerIndex: 1,
          explanation: "VercelはGitHubのpushを検知して自動でビルドとデプロイを行います。人手の作業を挟まず、push するだけで公開が更新されます。",
        },
        {
          id: "reactday6-lesson3-q2",
          type: "choice",
          question: "「手元では動くのにVercelのビルドが失敗する」とき、まず疑うべきことは?",
          choices: [
            "インターネットの回線速度",
            "型エラーやファイル名の大文字小文字の間違い(まずエラーログを読む)",
            "パソコンの再起動が必要かどうか",
            "Reactのバージョンを最新にすること",
          ],
          answerIndex: 1,
          explanation: "公開先はファイル名の大文字小文字を厳密に区別し、型エラーがあるとビルドが止まります。まずVercelのエラーログを読んで原因を特定するのが定石です。",
        },
        {
          id: "reactday6-lesson3-q3",
          type: "free",
          question: "GitHubとVercelを使った公開の流れを、初心者に説明するつもりでまとめてください。",
          modelAnswer: "まずアプリのコードをGitHubにpush(保存して送る)します。VercelはそのリポジトリをGitHub連携で見張っていて、新しいpushを検知すると自動でビルド(公開用に組み立て)し、URLを発行して世界に公開します。以降もpushするたびに自動で公開が更新されます。この仕組みをCI/CDと呼びます。細かい手順は暗記せず、詰まったらエラーログをAIに見せて直せばよいです。",
          interviewPhrase: "実務でこう説明する: 「GitHubにpushするとVercelが自動でビルドしてデプロイまで回すCI/CD構成です。手作業のアップロードがないぶんミスが減り、ビルドが落ちたらログを見て型エラーやパス違いを直します」",
          keywords: ["push", "自動ビルド", "デプロイ", "URL", "CI/CD"],
        },
      ],
    },
    {
      id: "reactday6-lesson4",
      slug: "pitfalls-performance",
      title: "よくある落とし穴とパフォーマンスの基本感覚",
      summary: "key忘れ・stateの直接変更・useEffectの依存漏れ・無限ループの定番ミスと、再レンダリングの基本感覚を身につける。",
      blocks: [
        {
          type: "heading",
          text: "定番の落とし穴を「先に知っておく」",
        },
        {
          type: "paragraph",
          text: "初心者がハマる落とし穴は、実はほとんどが同じ数パターンです。先に知っておけば、多くは踏まずに済み、踏んでも「あ、あれか」とすぐ直せます。最終レッスンでは、4つの定番ミスと、パフォーマンスの基本感覚を地図として渡します。暗記ではなく「症状 → 原因 → 直し方」を結びつけて覚えるのがコツです。",
        },
        {
          type: "heading",
          text: "落とし穴1: リストの key 忘れ",
        },
        {
          type: "paragraph",
          text: "map でリストを描くとき、各要素に key(重複しない目印)をつけ忘れると警告が出ます。key はReactが「どの要素がどれか」を見分けるための名札です。名札がないと、要素を並べ替えたり消したりしたときに、Reactが取り違えて表示がおかしくなります。key には配列の順番(index)ではなく、データが持つ一意なID(id など)を使いましょう。",
        },
        {
          type: "compare",
          bad: {
            label: "危うい",
            language: "tsx",
            text: "key がない、または並べ替えで壊れる index を key にしている",
            code: "{tasks.map((task, i) => (\n  <li key={i}>{task.text}</li>\n))}\n// 並べ替え・削除で取り違えが起きやすい",
          },
          good: {
            label: "正しい",
            language: "tsx",
            text: "データの一意なIDを key にする",
            code: "{tasks.map((task) => (\n  <li key={task.id}>{task.text}</li>\n))}",
          },
        },
        {
          type: "heading",
          text: "落とし穴2: state の直接変更",
        },
        {
          type: "paragraph",
          text: "state を tasks.push(...) のように直接いじると、Reactは中身が変わったことに気づかず、画面が更新されません。stateは「新しい値に置き換える」のが原則です。配列なら [...古い, 新しい]、オブジェクトなら { ...古い, 変える所 } と、コピーを作って更新関数に渡します。",
        },
        {
          type: "compare",
          bad: {
            label: "反映されない",
            language: "tsx",
            text: "元の配列を直接いじっているのでReactが気づかない",
            code: "tasks.push({ id: 1, text: \"買い物\" });\nsetTasks(tasks); // 同じ配列。変化とみなされない",
          },
          good: {
            label: "正しい",
            language: "tsx",
            text: "新しい配列を作って渡す",
            code: "setTasks([...tasks, { id: 1, text: \"買い物\" }]);",
          },
        },
        {
          type: "heading",
          text: "落とし穴3と4: useEffectの依存漏れと無限ループ",
        },
        {
          type: "paragraph",
          text: "useEffectの第2引数([]で囲む依存配列)は「この値が変わったら実行し直す」というリストです。使っている値を書き忘れる(依存漏れ)と、古い値のまま動き続けます。逆に、effectの中でstateを毎回更新しているのに依存配列を空にしなかったり、更新→再実行→更新…が連鎖したりすると、無限ループになって画面が固まります。",
        },
        {
          type: "compare",
          bad: {
            label: "無限ループ",
            language: "tsx",
            text: "実行のたびにcountを増やし、それが再実行を呼び、また増える…",
            code: "useEffect(() => {\n  setCount(count + 1); // 更新→再実行→更新…\n}, [count]);",
          },
          good: {
            label: "正しい",
            language: "tsx",
            text: "最初の1回だけ実行するなら依存配列を空にし、更新は関数形式で",
            code: "useEffect(() => {\n  // 最初の1回だけ動かしたい処理\n  setCount((prev) => prev + 1);\n}, []); // 依存が空なので初回のみ",
          },
        },
        {
          type: "heading",
          text: "パフォーマンスの基本感覚: 増やさない、まず計測",
        },
        {
          type: "paragraph",
          text: "Reactはstateが変わると、その部品を描き直します(再レンダリング)。ふつうはこれで十分速く、心配は要りません。パフォーマンスの基本感覚は2つだけ。ひとつは「不要な再レンダリングをむやみに増やさない」(たとえば巨大なリストの全部を毎回作り直さない)。もうひとつは「遅いと感じたら、勘で最適化せず、まず計測する」ことです。",
        },
        {
          type: "callout",
          variant: "warn",
          title: "よくある落とし穴: 早すぎる最適化",
          text: "「速くしなきゃ」と最初から複雑な最適化(useMemoやuseCallbackの乱用)を入れると、コードが読みにくくなり、バグの温床になります。ほとんどのアプリは素直に書けば十分速い。遅いと感じてから、計測して、遅い場所だけ直す。この順番を守りましょう。",
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「このReactの警告(key忘れ・依存漏れなど)の意味と直し方を教えて」とメッセージごと貼れば、原因と修正を返してくれます。パフォーマンスなら「まずどこが遅いか計測する方法を教えて」と聞くのが賢い。症状と原因の対応を自分が知っていれば、AIの提案が的外れかどうかも判断できます。",
        },
        {
          type: "heading",
          text: "おわりに — きみはReactの土台を説明できる",
        },
        {
          type: "paragraph",
          text: "ここまで本当によく走りきりました。振り返れば、JSXという見た目の書き方から始まり、部品(コンポーネント)、外からの入力(props)、覚えておく値(state)、外の世界とのやりとり(effect)、リストとフォーム、そして複数画面と公開までたどり着きました。もう「なんとなく動く」ではありません。",
        },
        {
          type: "paragraph",
          text: "きみは今、Reactの土台を自分の言葉で説明できます。「画面は部品の組み合わせ」「状態は共通の親に置いて props で配る」「更新は新しい値に置き換える」「Next.jsがルーティングと公開の土台を足す」——これらを読めて、直せて、説明できる。ここが本当のスタート地点です。あとは小さなアプリを1つ作って公開してみるだけ。AIを相棒に、自信を持って前に進んでください。おつかれさまでした。",
        },
      ],
      questions: [
        {
          id: "reactday6-lesson4-q1",
          type: "choice",
          question: "リストを map で描くとき key に使うべき値として最も適切なのはどれ?",
          choices: [
            "配列の順番(index)",
            "データが持つ一意なID(id など)",
            "毎回ランダムに生成した値",
            "常に同じ固定文字列",
          ],
          answerIndex: 1,
          explanation: "key はReactが要素を見分ける名札です。並べ替えや削除で崩れないよう、データが持つ一意なIDを使います。indexは並べ替え・削除で取り違えの原因になり、毎回ランダムだと毎回作り直しになって非効率です。",
        },
        {
          id: "reactday6-lesson4-q2",
          type: "choice",
          question: "useEffect の依存配列に [count] を入れ、その中で setCount(count + 1) を呼ぶとどうなる?",
          choices: [
            "1回だけ実行されて止まる",
            "countが変わるたびに再実行され、無限ループになる",
            "エラーで実行されない",
            "countが減り続ける",
          ],
          answerIndex: 1,
          explanation: "effect内でcountを更新すると再レンダリングが起き、countが変わったので依存配列によりeffectが再実行され、また更新…と無限ループになります。初回だけなら依存配列を空にし、更新は関数形式(prev => prev + 1)を使います。",
        },
        {
          id: "reactday6-lesson4-q3",
          type: "free",
          question: "state を直接変更してはいけない理由と、正しい更新のしかたを説明してください。",
          modelAnswer: "Reactは「値が新しいものに置き換わったか」で変化を判断します。tasks.push(...) のように元の配列を直接いじっても、参照が同じままなので変化とみなされず、画面が更新されません。正しくは、配列なら [...古い, 新しい]、オブジェクトなら { ...古い, 変える所 } とコピーを作り、更新関数(setTasksなど)に渡します。こうすると新しい値として認識され、再レンダリングが起きます。",
          interviewPhrase: "実務でこう説明する: 「stateは不変(イミュータブル)に扱います。元をpushで壊さず、スプレッドで新しい配列やオブジェクトを作って渡すことで、Reactが変化を検知して再描画します」",
          keywords: ["直接変更しない", "新しい値", "スプレッド", "更新関数", "再レンダリング"],
        },
      ],
    },
  ],
};
