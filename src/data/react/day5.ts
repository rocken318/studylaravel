import type { Day } from "@/types";

export const reactDay5: Day = {
  day: 5,
  slug: "day5",
  title: "状態の設計と再利用 — 大きくしても壊れない作り",
  goal: "共有したい状態を共通の親へ持ち上げ(lifting state up)、単一の情報源を意識できる。コンポーネントを責務で分割し、propsのバケツリレー(prop drilling)問題とContextが効く場面を理解する。use〜で始まるカスタムHookを読んで、ロジックとUIの分離を説明できる。",
  lessons: [
    {
      id: "reactday5-lesson1",
      slug: "lifting-state",
      title: "状態をどこに置くか — 共通の親へ持ち上げる",
      summary: "2つの部品で同じ値を使いたいとき、状態を共通の親へ持ち上げ、単一の情報源にまとめる考え方をつかむ。",
      blocks: [
        {
          type: "heading",
          text: "同じ値を2つの部品で使いたくなったとき",
        },
        {
          type: "paragraph",
          text: "アプリが小さいうちは、状態(state)を使う部品の中に置いておけば十分でした。ところが画面が育つと、「同じ値を複数の部品で使いたい」場面が必ず出てきます。たとえば、入力欄に打った文字を、別の場所にあるプレビューにも映したい。このとき、それぞれの部品が自分だけのuseStateを持っていると、値がズレて食い違います。",
        },
        {
          type: "paragraph",
          text: "解決の定石が「状態を持ち上げる(lifting state up)」です。共有したい値を、その値を使う部品たちの「共通の親」へ移動させ、親から子へpropsで配ります。値の置き場所を1か所に決める、という発想です。この1か所のことを「単一の情報源(source of truth、信頼できる唯一の出どころ)」と呼びます。",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ子ではなく親に置くのか",
          text: "同じ値のコピーが2つあると、片方だけ更新されて食い違う事故が起きます。値の置き場所を1つに絞れば、食い違いようがありません。親を「その値の持ち主」と決め、子は親からもらって表示し、変えたいときは親に頼む。所有権を1つにするのが、大きくしても壊れないコツです。",
        },
        {
          type: "code",
          language: "tsx",
          caption: "持ち上げる前。入力とプレビューが別々に状態を持ち、食い違う恐れがある",
          code: "// アンチパターン: 値の持ち主が2人いる\nfunction NameInput() {\n  const [name, setName] = useState(\"\");\n  return <input value={name} onChange={(e) => setName(e.target.value)} />;\n}\n\nfunction Preview() {\n  const [name] = useState(\"\"); // 別のname。入力と連動しない\n  return <p>こんにちは、{name}さん</p>;\n}",
        },
        {
          type: "code",
          language: "tsx",
          caption: "持ち上げた後。親が唯一の持ち主になり、子はpropsで受け取る",
          code: "// 親が name の唯一の持ち主(single source of truth)\nfunction Form() {\n  const [name, setName] = useState(\"\");\n  return (\n    <div>\n      <NameInput value={name} onChange={setName} />\n      <Preview name={name} />\n    </div>\n  );\n}\n\n// 子は状態を持たず、もらって使う\nfunction NameInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {\n  return <input value={value} onChange={(e) => onChange(e.target.value)} />;\n}\n\nfunction Preview({ name }: { name: string }) {\n  return <p>こんにちは、{name}さん</p>;\n}",
        },
        {
          type: "paragraph",
          text: "ポイントは、子の役割が変わることです。持ち上げる前は子が「自分の値」を持っていましたが、持ち上げた後は子は値を持ちません。親から value をもらって表示し、変えたいときは親からもらった onChange を呼んで「変えてほしい」と伝えるだけ。値を持たず、もらって使う部品を「制御された部品(controlled component)」と呼びます。",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "どの部品がその値を必要とするかを洗い出す",
            "それら全部を含む「いちばん近い共通の親」を探す",
            "状態(useState)をその親に置く",
            "値は props で子へ配り、更新関数も props で渡して「変えてほしい」を親に伝える",
          ],
        },
        {
          type: "compare",
          bad: {
            label: "持ち主が複数",
            language: "tsx",
            text: "同じ値のコピーがあちこちにあり、更新が伝わらず食い違う",
            code: "// 各所で別々の useState(\"\") を持つ\n// 入力しても他の部品には反映されない",
          },
          good: {
            label: "持ち主は1つ",
            language: "tsx",
            text: "親が唯一の持ち主。子は props でもらうので、常に同じ値を見る",
            code: "// 親: const [name, setName] = useState(\"\")\n// 子A: <Input value={name} onChange={setName} />\n// 子B: <Preview name={name} />",
          },
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「入力欄とプレビューで同じ値を共有したいのに連動しない。状態を持ち上げるべき?どこに置けばいい?」と、共有したい値と使う場所を伝えると、共通の親の場所まで含めて提案してくれます。AIが出したコードで『値の持ち主が1つになっているか(コピーが増えていないか)』だけは自分で確認しましょう。",
        },
        {
          type: "paragraph",
          text: "まとめると、共有したい値は「使う部品たちの共通の親」へ持ち上げ、置き場所を1つに絞る。これが単一の情報源です。この原則を守るだけで、状態の食い違いという定番のバグの多くを未然に防げます。",
        },
      ],
      questions: [
        {
          id: "reactday5-lesson1-q1",
          type: "choice",
          question: "2つの子コンポーネントで同じ値を共有したい。Reactでの定石はどれ?",
          choices: [
            "それぞれの子が自分でuseStateを持ち、同じ初期値にする",
            "共通の親に状態を置き、子へはpropsで配る(状態を持ち上げる)",
            "値をグローバル変数に入れて直接読み書きする",
            "子から子へ直接propsで渡す",
          ],
          answerIndex: 1,
          explanation: "共有したい値は、それを使う部品たちの共通の親へ持ち上げ(lifting state up)、propsで配ります。持ち主を1つに絞ることで、コピー同士の食い違いを防げます。",
        },
        {
          id: "reactday5-lesson1-q2",
          type: "choice",
          question: "「単一の情報源(single source of truth)」の説明として最も適切なものはどれ?",
          choices: [
            "画面に表示できる文字の種類を1つに制限すること",
            "ある値の置き場所(持ち主)を1か所に決めること",
            "サーバーを1台だけにすること",
            "コンポーネントを1つのファイルにまとめること",
          ],
          answerIndex: 1,
          explanation: "単一の情報源とは、ある値の持ち主を1か所に決めることです。同じ値のコピーが複数あると更新がズレて食い違うため、置き場所を1つに絞ります。",
        },
        {
          id: "reactday5-lesson1-q3",
          type: "free",
          question: "状態を持ち上げると、子コンポーネントの役割はどう変わりますか。",
          modelAnswer: "持ち上げる前は子が自分で状態を持っていましたが、持ち上げた後は子は状態を持ちません。親から value をpropsでもらって表示し、変えたいときは親からもらった更新関数(onChangeなど)を呼んで「変えてほしい」と伝えるだけになります。値を持たずにもらって使う部品を制御された部品(controlled component)と呼び、値の持ち主が親1人に絞られるので食い違いが起きにくくなります。",
          interviewPhrase: "実務でこう説明する: 共有したい値は使う部品の共通の親へ持ち上げて単一の情報源にし、子は値を持たずpropsでもらって表示・更新依頼だけする制御された部品にします。",
          keywords: ["持ち上げる", "単一の情報源", "props", "制御された部品", "食い違い"],
        },
      ],
    },
    {
      id: "reactday5-lesson2",
      slug: "component-split-context",
      title: "コンポーネント分割の指針とバケツリレー問題",
      summary: "責務・再利用・見通しで部品を分ける指針を学び、propsのバケツリレー(prop drilling)とContextで解決できることを軽くつかむ。",
      blocks: [
        {
          type: "heading",
          text: "どこで部品を分けるか — 3つの物差し",
        },
        {
          type: "paragraph",
          text: "1つのコンポーネントに何もかも詰め込むと、長くて読めない・直せない塊になります。だからといって、やみくもに細かく割ると今度は追いかけるのが大変です。分割の判断には、いつも同じ3つの物差しを当てるとブレません。「責務(1つの部品は1つの仕事)」「再利用(同じ見た目が2回以上出てくる)」「見通し(名前をつけると読みやすくなる)」です。",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "責務: 「このボタンは何をする部品?」に一言で答えられる大きさに割る。答えに『と』が多いなら分けどき",
            "再利用: 同じUIが2回以上登場したら、共通の部品にまとめて使い回す",
            "見通し: 中身に <UserCard /> のような名前がつくと、親のreturnが読みやすくなる",
          ],
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜ「1部品1責務」を目安にするのか",
          text: "1つの部品が複数の仕事を抱えると、片方を直したいだけなのに全体を読む羽目になり、変更が別の機能を壊しやすくなります。責務を1つに絞ると、直す範囲が狭くなり、テストも説明も楽になります。名前を一言でつけられるかが、ちょうどよい大きさの目安です。",
        },
        {
          type: "code",
          language: "tsx",
          caption: "責務で分ける前。1つの関数が一覧の取得も表示も抱えて長い",
          code: "// 何でも屋。読むのも直すのも大変\nfunction UserList() {\n  const users = [{ id: 1, name: \"田中\" }, { id: 2, name: \"佐藤\" }];\n  return (\n    <ul>\n      {users.map((u) => (\n        <li key={u.id}>\n          <span>{u.name}</span>\n          <button>フォロー</button>\n        </li>\n      ))}\n    </ul>\n  );\n}",
        },
        {
          type: "code",
          language: "tsx",
          caption: "「1行の見た目」を部品に切り出すと、親のreturnが読みやすくなる",
          code: "// 親は「並べる」責務だけ\nfunction UserList({ users }: { users: { id: number; name: string }[] }) {\n  return (\n    <ul>\n      {users.map((u) => (\n        <UserRow key={u.id} name={u.name} />\n      ))}\n    </ul>\n  );\n}\n\n// 子は「1人分の見た目」責務だけ。名前で意図が伝わる\nfunction UserRow({ name }: { name: string }) {\n  return (\n    <li>\n      <span>{name}</span>\n      <button>フォロー</button>\n    </li>\n  );\n}",
        },
        {
          type: "heading",
          text: "propsのバケツリレー(prop drilling)問題",
        },
        {
          type: "paragraph",
          text: "部品を細かく分けると、便利な反面あたらしい面倒が生まれます。深いところにある子が値を必要とするとき、その値を親から子へ、子から孫へ……と、途中の部品が使いもしないのに手渡しし続けることになります。これがpropsのバケツリレー(prop drilling)です。途中の部品が「自分は使わないのに受け取って渡すだけ」の余計な props を持つのが特徴です。",
        },
        {
          type: "code",
          language: "tsx",
          caption: "user を深い子まで手渡しし続ける。中間の部品は使わないのに受け渡す",
          code: "// user は Page → Layout → Header → Avatar と延々と手渡しされる\nfunction Page({ user }: { user: User }) {\n  return <Layout user={user} />;\n}\nfunction Layout({ user }: { user: User }) {\n  return <Header user={user} />; // Layout自身はuserを使わない\n}\nfunction Header({ user }: { user: User }) {\n  return <Avatar user={user} />; // Headerも使わない、渡すだけ\n}\nfunction Avatar({ user }: { user: User }) {\n  return <img alt={user.name} src={user.icon} />; // ここでやっと使う\n}",
        },
        {
          type: "paragraph",
          text: "浅いバケツリレーなら、むしろ素直で読みやすいので気にしなくてかまいません。問題になるのは、多くの階層を「使わない値」が延々と通り抜けるときです。そういう「アプリ全体で広く使う値(ログイン中のユーザー、テーマの色、言語設定など)」に対して、途中を飛ばして直接届ける仕組みが Context(コンテキスト)です。",
        },
        {
          type: "callout",
          variant: "info",
          title: "Contextは「広く共有する値」の近道(深入りしない)",
          text: "Contextは、途中の部品を経由せずに、離れた子へ直接値を届ける仕組みです。イメージは『館内放送』。各部屋を伝言で回さなくても、放送すれば必要な部屋が直接受け取れます。今の段階では『バケツリレーが深くつらくなったら、広く使う値にはContextという道具がある』と読めれば十分です。細かい書き方は必要になってから学べば間に合います。",
        },
        {
          type: "compare",
          bad: {
            label: "深いバケツリレー",
            language: "tsx",
            text: "中間の部品が使わないpropsを何段も受け渡す。追加・変更がつらい",
            code: "<Page user={user} />\n//  → Layout(user) → Header(user) → Avatar(user)\n// 途中は使わないのに全員 user を持つ",
          },
          good: {
            label: "広い値はContext",
            language: "tsx",
            text: "広く使う値は途中を飛ばして直接届く。中間の部品はpropsが減る",
            code: "// おおまかなイメージ\n// <UserProvider value={user}> で包み\n// Avatar 側で useUser() でもらう\n// → 中間の Layout / Header は user を持たない",
          },
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「このコンポーネント、userを4階層も手渡ししていてつらい。バケツリレーを解消したい。Contextを使うべきか、それとも設計を見直すべきか教えて」と現状を貼って相談します。判断の基準は『その値は本当にアプリ全体で広く使う値か』。狭い範囲ならpropsのままでよい、と自分で線引きできると、AIの提案を鵜呑みにせず選べます。",
        },
        {
          type: "paragraph",
          text: "分割は責務・再利用・見通しの3つで判断し、割りすぎない。propsのバケツリレーが深くつらくなったら、広く使う値にはContextという近道がある。まずはこの地図が頭に入っていれば十分です。",
        },
      ],
      questions: [
        {
          id: "reactday5-lesson2-q1",
          type: "choice",
          question: "コンポーネントを分割するかどうかの判断基準として、本文で挙げた3つの物差しはどれ?",
          choices: [
            "速度・容量・見た目",
            "責務・再利用・見通し",
            "色・大きさ・位置",
            "サーバー・クライアント・データベース",
          ],
          answerIndex: 1,
          explanation: "分割は「責務(1部品1仕事)」「再利用(同じUIが複数回)」「見通し(名前で読みやすく)」の3つで判断します。割りすぎず、詰め込みすぎない目安になります。",
        },
        {
          id: "reactday5-lesson2-q2",
          type: "choice",
          question: "propsのバケツリレー(prop drilling)とは何を指す?",
          choices: [
            "同じpropsを短時間に何度も更新すること",
            "途中の部品が使わない値を、親から深い子まで手渡しし続けること",
            "propsに型をつけ忘れること",
            "1つの部品に多くのpropsをまとめて渡すこと",
          ],
          answerIndex: 1,
          explanation: "prop drillingは、深い子が必要とする値を、途中の使わない部品が受け取っては渡す、を繰り返す状態です。階層が深いと中間の部品に余計なpropsが増えます。",
        },
        {
          id: "reactday5-lesson2-q3",
          type: "free",
          question: "バケツリレーが深くてつらいとき、Contextを使うかどうかは何を基準に判断しますか。",
          modelAnswer: "基準は「その値がアプリ全体で広く使われるものか」です。ログイン中のユーザー、テーマの色、言語設定のように、離れた多くの部品が共通で使う値は、途中の部品を飛ばして直接届けられるContextが向きます。逆に、2〜3階層の浅い受け渡しや、狭い範囲でしか使わない値なら、素直にpropsのままにしておくほうが読みやすいです。深さと共有範囲を見て線引きします。",
          interviewPhrase: "実務でこう説明する: 浅いバケツリレーはそのまま、階層が深くアプリ全体で広く使う値だけContextに寄せて中間のpropsを減らす、という基準で判断します。",
          keywords: ["prop drilling", "Context", "共有範囲", "階層", "props"],
        },
      ],
    },
    {
      id: "reactday5-lesson3",
      slug: "custom-hooks",
      title: "カスタムHook — ロジックをまとめて再利用する",
      summary: "use〜で始まる自作関数にロジックをまとめて再利用し、ロジックとUIを分ける発想を、読めて説明できる形でつかむ。",
      blocks: [
        {
          type: "heading",
          text: "同じ手順が何度も出てきたら、名前をつけてまとめる",
        },
        {
          type: "paragraph",
          text: "画面をいくつも作っていると、同じ状態管理の手順が繰り返し登場します。たとえば「数を数える(useStateして、増やす・減らす関数を用意する)」や「データを取ってくる(読み込み中フラグと結果を管理する)」。これらの手順を毎回コピペすると、直すときに全部を直す羽目になります。そこで、手順に名前をつけて1か所にまとめるのがカスタムHook(自作フック)です。",
        },
        {
          type: "paragraph",
          text: "カスタムHookの正体は、ただの関数です。ふつうの関数と違う点は2つだけ。名前が use で始まること、そして中で useState などのReactの仕組みを使えることです。use で始まる名前にするのは、Reactに「これはHookです」と伝える約束事です。難しく考えず、『useStateなどをまとめて包んだ、use始まりの関数』と読めれば十分です。",
        },
        {
          type: "code",
          language: "tsx",
          caption: "カウンターのロジックをまとめた useCounter。中身はいつものuseState",
          code: "// use で始まる関数。カウントのロジックだけを担当する\nfunction useCounter(initial: number) {\n  const [count, setCount] = useState(initial);\n  const increment = () => setCount(count + 1);\n  const decrement = () => setCount(count - 1);\n  const reset = () => setCount(initial);\n  // UIは返さない。値と操作関数だけを返す\n  return { count, increment, decrement, reset };\n}",
        },
        {
          type: "code",
          language: "tsx",
          caption: "使う側。UIだけに集中でき、同じロジックをどの画面でも呼べる",
          code: "// コンポーネントは「見た目」に集中\nfunction CounterButton() {\n  const { count, increment } = useCounter(0);\n  return <button onClick={increment}>{count} 回</button>;\n}\n\n// 別の画面でも同じロジックを再利用できる\nfunction StepCounter() {\n  const { count, increment, reset } = useCounter(10);\n  return (\n    <div>\n      <p>{count}</p>\n      <button onClick={increment}>+1</button>\n      <button onClick={reset}>リセット</button>\n    </div>\n  );\n}",
        },
        {
          type: "callout",
          variant: "why",
          title: "なぜロジックとUIを分けるのか",
          text: "コンポーネントに「状態の管理」と「見た目」が混ざっていると、片方を直したいだけなのに両方を読む必要があり、他の画面で同じ処理を使い回せません。ロジックをカスタムHookへ切り出すと、コンポーネントは見た目に集中でき、ロジックは1か所で直せて、どの画面からも呼べます。分けることで『読める・直せる・再利用できる』が同時に手に入ります。",
        },
        {
          type: "paragraph",
          text: "もう1つ代表例を見ましょう。データをAPIから取ってくる処理は、どの画面でも「読み込み中」「成功」「失敗」を扱う似た手順になります。これを useFetch のようなカスタムHookにまとめると、各画面は結果を受け取って表示するだけで済みます。ここでは中身を丸暗記する必要はありません。『こういう形のHookがある』と読めれば十分です。",
        },
        {
          type: "code",
          language: "tsx",
          caption: "データ取得のロジックを包んだ useFetch(読めればよい)",
          code: "// 読み込み中・データ・エラーの3つの状態をまとめて管理\nfunction useFetch(url: string) {\n  const [data, setData] = useState<unknown>(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetch(url)\n      .then((res) => res.json())\n      .then((json) => setData(json))\n      .finally(() => setLoading(false));\n  }, [url]);\n\n  return { data, loading };\n}\n\n// 使う側は表示に集中できる\nfunction UserName({ url }: { url: string }) {\n  const { data, loading } = useFetch(url);\n  if (loading) return <p>読み込み中...</p>;\n  return <p>取得完了</p>;\n}",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "カスタムHookはただの関数。名前を use で始めるのが約束事",
            "中で useState や useEffect などのHookを使える(ここが普通の関数と違う点)",
            "UI(JSX)は返さず、値と操作関数を返す。見た目は使う側のコンポーネントが担当",
            "同じロジックを複数の画面で使い回せ、直すときは1か所だけ",
          ],
        },
        {
          type: "compare",
          bad: {
            label: "ロジックとUIが混在",
            language: "tsx",
            text: "各コンポーネントが状態管理をそれぞれ書き、コピペで散らばる",
            code: "function A() {\n  const [count, setCount] = useState(0);\n  // 増減ロジックをここに直書き…\n}\nfunction B() {\n  const [count, setCount] = useState(0);\n  // また同じロジックを直書き(コピペ)\n}",
          },
          good: {
            label: "ロジックを分離",
            language: "tsx",
            text: "ロジックはuseCounterに集約。各コンポーネントは呼ぶだけ",
            code: "function A() {\n  const { count, increment } = useCounter(0);\n}\nfunction B() {\n  const { count, increment } = useCounter(0);\n}\n// 直すときは useCounter 1か所",
          },
        },
        {
          type: "callout",
          variant: "info",
          title: "AIにはこう聞く",
          text: "「このコンポーネントの中の状態管理ロジックを、useなんとかというカスタムHookに切り出して。UIは元のコンポーネントに残して」と頼めば、分離を手伝ってくれます。確認するのは2点だけ。名前が use で始まっているか、そしてHookが『値と操作関数を返し、JSXは返していないか』。この形になっていれば、ロジックとUIがきちんと分かれています。",
        },
        {
          type: "paragraph",
          text: "カスタムHookは『use始まりの、ロジックをまとめた関数』。UIは返さず、値と操作を返す。これで見た目とロジックが分かれ、再利用が効きます。今日の段階では、自分でゼロから書けなくても、読んで意図を説明できれば十分です。",
        },
      ],
      questions: [
        {
          id: "reactday5-lesson3-q1",
          type: "choice",
          question: "カスタムHookの説明として正しいものはどれ?",
          choices: [
            "必ずJSX(見た目)を返す特別なコンポーネントである",
            "名前が use で始まり、中で useState などのHookを使える関数である",
            "サーバー側だけで動く関数である",
            "CSSをまとめるための仕組みである",
          ],
          answerIndex: 1,
          explanation: "カスタムHookはただの関数ですが、名前を use で始め、中で useState や useEffect などのHookを使えます。UIではなく値や操作関数を返して、ロジックを再利用します。",
        },
        {
          id: "reactday5-lesson3-q2",
          type: "choice",
          question: "ロジックをカスタムHookに切り出す主な利点はどれ?",
          choices: [
            "画面のCSSが自動で整う",
            "コンポーネントは見た目に集中でき、同じロジックを複数の画面で再利用でき、直すのは1か所で済む",
            "サーバーが不要になる",
            "型注釈を書かなくてよくなる",
          ],
          answerIndex: 1,
          explanation: "ロジックをHookへ分離すると、コンポーネントは見た目に集中でき、ロジックは1か所にまとまるので複数画面で使い回せ、修正も1か所で済みます。",
        },
        {
          id: "reactday5-lesson3-q3",
          type: "free",
          question: "カスタムHookで「ロジックとUIを分離する」とはどういうことか、useCounterを例に説明してください。",
          modelAnswer: "useCounterは、数を数えるロジック(useStateと、増やす・減らす・リセットする関数)だけをまとめた、use始まりの関数です。JSX(見た目)は返さず、countという値と、incrementなどの操作関数を返します。使う側のコンポーネントは、その値と関数を受け取ってボタンなどの見た目を作ることに集中できます。こうしてロジックはHookに、UIはコンポーネントに分かれるので、同じカウンターのロジックをどの画面からでも呼べ、直すときはuseCounter1か所で済みます。",
          interviewPhrase: "実務でこう説明する: 状態管理のロジックはuse始まりのカスタムHookに切り出して値と操作関数を返し、UIはコンポーネントに残すことで、再利用しやすく直しやすい形に分けます。",
          keywords: ["カスタムHook", "use", "ロジックとUIの分離", "再利用", "useCounter"],
        },
      ],
    },
  ],
};
