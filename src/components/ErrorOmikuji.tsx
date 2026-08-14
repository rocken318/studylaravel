"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* ────────────────────────────────────────────────────────────
   「エラー文おみくじ」— 英語のエラーを引いて、原因を3択で当てるゲーム
   ねらい: エラーは「敵」ではなく「ヒント」だと体験で刷り込む
   完全クライアント動作・AI/API不要・スマホのタップ向け
   ──────────────────────────────────────────────────────────── */

interface ErrorCard {
  lang: string; // 言語タグ
  error: string; // 生のエラー文(英語)
  choices: string[]; // 原因の3択
  answer: number; // 正解のindex
  ja: string; // やさしい和訳
  fix: string; // 直し方
}

const CARDS: ErrorCard[] = [
  {
    lang: "JavaScript",
    error: "Uncaught TypeError: Cannot read properties of undefined (reading 'name')",
    choices: [
      "まだ中身が無い(undefined)ものから .name を取り出そうとした",
      "name という名前の色が存在しない",
      "インターネットに繋がっていない",
    ],
    answer: 0,
    ja: "「undefined(＝空っぽ)の .name は読めません」。データがまだ届いていない/取得できていないのに、その中の name を使おうとしています。",
    fix: "使う前に「値があるか」を確認する。user?.name のように ?. を付けるか、if (user) で囲んでから使う。",
  },
  {
    lang: "JavaScript",
    error: "Uncaught ReferenceError: userName is not defined",
    choices: [
      "userName という変数が、宣言されていない or 綴りが違う",
      "userName が大きすぎて表示できない",
      "userName の色が指定されていない",
    ],
    answer: 0,
    ja: "「userName なんて名前は見当たりません」。存在しない変数を使っています。",
    fix: "綴りミス(userName と username など)を疑う。もしくは const/let で宣言し忘れていないか確認する。",
  },
  {
    lang: "JavaScript",
    error: "Uncaught SyntaxError: Unexpected end of input",
    choices: [
      "かっこ { や ( の「閉じ」を忘れている",
      "入力した文字数が多すぎる",
      "英語のスペルが間違っている",
    ],
    answer: 0,
    ja: "「入力が途中で終わってるよ」。波かっこ } や丸かっこ ) の閉じ忘れが定番の原因です。",
    fix: "開き { と閉じ } の数が合っているか数える。エディタで対応するかっこを光らせて確認すると早い。",
  },
  {
    lang: "JavaScript",
    error: "TypeError: greet is not a function",
    choices: [
      "greet は関数ではないのに greet() で呼び出している",
      "greet という名前は挨拶にしか使えない",
      "greet が長すぎる",
    ],
    answer: 0,
    ja: "「greet は関数じゃないよ」。関数じゃないもの(文字列や undefined など)を () を付けて呼び出しています。",
    fix: "綴りミス、または greet が本当に関数か確認。import 忘れや、変数名と関数名の取り違えが多い。",
  },
  {
    lang: "React",
    error: 'Warning: Each child in a list should have a unique "key" prop.',
    choices: [
      "map で並べたリストの各要素に key を付けていない",
      "鍵(かぎ)のアイコンが見つからない",
      "パスワードが必要",
    ],
    answer: 0,
    ja: "「リストの各要素には、一意の key を付けてね」という警告。map で作った一覧に目印(key)がありません。",
    fix: "map の中の一番外側の要素に key を付ける。例: items.map(i => <li key={i.id}>...</li>)。",
  },
  {
    lang: "React",
    error: "Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.",
    choices: [
      "描画のたびに state を更新していて、無限ループになっている",
      "画面の再読み込みボタンを押しすぎた",
      "パソコンのメモリが足りない",
    ],
    answer: 0,
    ja: "「再描画が多すぎ。無限ループを防ぐため止めました」。表示している最中に setState を呼び、また表示…を繰り返しています。",
    fix: "onClick={handleClick()} のように即実行していないか確認。onClick={handleClick}(関数を渡す)が正解。",
  },
  {
    lang: "JavaScript",
    error: "Uncaught (in promise) TypeError: Failed to fetch",
    choices: [
      "fetch でのデータ取得に失敗した(URL違い・通信・アクセス制限など)",
      "魚(fetch)が釣れなかった",
      "画像のサイズが大きい",
    ],
    answer: 0,
    ja: "「取りに行けませんでした」。fetch でのデータ取得が失敗。URLの間違い、ネット未接続、アクセス制限(CORS)などが原因。",
    fix: "まずURLの綴りを確認。ブラウザのアドレス欄にそのURLを貼って開けるかも試す。開けないならURL側の問題。",
  },
  {
    lang: "Python",
    error: "IndentationError: unexpected indent",
    choices: [
      "行頭のスペース(字下げ)の位置がずれている",
      "文字を大きくしすぎた",
      "ファイル名が長すぎる",
    ],
    answer: 0,
    ja: "「字下げが変だよ」。Pythonは行頭のスペースで意味が変わるため、そろっていないと怒られます。",
    fix: "その行の行頭スペースを、前後の行とそろえる。タブと半角スペースが混ざっているのも原因になりやすい。",
  },
  {
    lang: "Python",
    error: 'TypeError: can only concatenate str (not "int") to str',
    choices: [
      "文字列と数値をそのまま + でつなごうとした",
      "文字が小さすぎる",
      "整数が大きすぎる",
    ],
    answer: 0,
    ja: "「文字列に文字列しか + でつなげません(数値はダメ)」。\"年齢:\" + 20 のように、文字と数値を直接つなげています。",
    fix: "数値を文字に変換する。\"年齢:\" + str(20) とするか、f\"年齢:{20}\" のf文字列を使う。",
  },
  {
    lang: "Python",
    error: "IndexError: list index out of range",
    choices: [
      "配列(リスト)に無い番号を取り出そうとした",
      "リストが長すぎて表示できない",
      "インターネットが遅い",
    ],
    answer: 0,
    ja: "「その番号、リストの範囲外だよ」。要素が3つしかないのに4番目を取ろうとした、など。番号は0から数える点にも注意。",
    fix: "len(リスト) で個数を確認し、番号がその範囲内か見直す。先頭は 0 番目。",
  },
  {
    lang: "Python",
    error: "ModuleNotFoundError: No module named 'requests'",
    choices: [
      "requests という部品(ライブラリ)がインストールされていない",
      "リクエストの回数が多すぎる",
      "ファイルが見つからない",
    ],
    answer: 0,
    ja: "「requests なんて部品は入ってないよ」。使おうとしたライブラリが、まだインストールされていません。",
    fix: "ターミナルで pip install requests を実行してから、もう一度動かす。綴りミスも一応確認。",
  },
  {
    lang: "Python",
    error: "KeyError: 'email'",
    choices: [
      "辞書(dict)に 'email' というキーが無いのに取り出そうとした",
      "メールが届いていない",
      "キーボードが壊れている",
    ],
    answer: 0,
    ja: "「'email' というキーが見つからない」。辞書から user['email'] のように取り出そうとしたが、そのキーが存在しません。",
    fix: "キー名の綴りを確認。無いかもしれない時は user.get('email') を使うと、無くてもエラーにならない。",
  },
  {
    lang: "共通(HTTP)",
    error: "404 Not Found",
    choices: [
      "指定したURL(ページやデータ)が存在しない",
      "パソコンの電源が切れている",
      "パスワードが間違っている",
    ],
    answer: 0,
    ja: "「そのページ、見つかりません」。URLの打ち間違い、または本当にそのアドレスが無いときに出ます。",
    fix: "URLの綴り・スラッシュの位置を見直す。リンク切れや、ファイルの置き場所が違う可能性も。",
  },
  {
    lang: "共通(HTTP)",
    error: "500 Internal Server Error",
    choices: [
      "サーバー(向こう側)のプログラムでエラーが起きている",
      "あなたの入力ミス",
      "ネットの速度が遅い",
    ],
    answer: 0,
    ja: "「サーバーの中で何か問題が起きました」。あなたのせいではなく、向こう側(サーバー)のコードのエラーであることが多いです。",
    fix: "サーバー側のログ(記録)を確認する。自分で作ったAPIなら、その処理の中身を見直す。",
  },
  {
    lang: "Git",
    error: "fatal: not a git repository (or any of the parent directories): .git",
    choices: [
      "今いるフォルダが、まだGitで管理されていない",
      "ファイルが致命的に壊れた",
      "パソコンを再起動する必要がある",
    ],
    answer: 0,
    ja: "「ここはGitの管理下じゃないよ」。git を使おうとした場所が、まだGitで初期化されていません。",
    fix: "正しいプロジェクトのフォルダに cd で移動する。新しく始めるなら git init を実行する。",
  },
];

export function ErrorOmikuji() {
  const [order, setOrder] = useState<number[]>(() => CARDS.map((_, i) => i));
  const [pos, setPos] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [finished, setFinished] = useState(false);

  // マウント後にシャッフル(SSRとの不一致を避けるためクライアントでのみ)
  useEffect(() => {
    const a = CARDS.map((_, i) => i);
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    setOrder(a);
  }, []);

  const card = CARDS[order[pos]];
  const answered = picked !== null;
  const isCorrect = answered && picked === card.answer;

  const pick = (i: number) => {
    if (answered) return;
    setPicked(i);
    setAnsweredCount((c) => c + 1);
    if (i === card.answer) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    if (pos + 1 >= order.length) {
      setFinished(true);
      return;
    }
    setPos((p) => p + 1);
    setPicked(null);
  };

  const restart = () => {
    const a = CARDS.map((_, i) => i);
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    setOrder(a);
    setPos(0);
    setPicked(null);
    setCorrectCount(0);
    setAnsweredCount(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((correctCount / CARDS.length) * 100);
    return (
      <div className="mx-auto max-w-md text-center">
        <div className="rounded-3xl border border-base-border bg-base-surface p-8 shadow-sm">
          <p className="text-5xl">{pct >= 80 ? "🎉" : pct >= 50 ? "👏" : "🌱"}</p>
          <h1 className="mt-3 text-2xl font-bold text-ink">
            {correctCount} / {CARDS.length} 問 正解！
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            {pct >= 80
              ? "お見事。エラーはもう「敵」じゃなく「ヒント」に見えてきたはず。"
              : "いい調子。エラーは全部パターン。何度か引けば、必ず読めるようになります。"}
          </p>
          <p className="mt-2 text-xs text-ink-faint">
            大事なのは丸暗記じゃなく、「エラー＝ここが困ってる、というお知らせ」と分かること。
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              onClick={restart}
              className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand/90"
            >
              もう一度ひく
            </button>
            <Link
              href="/ai-guide"
              className="rounded-full border border-base-border px-6 py-3 text-sm font-bold text-brand transition-colors hover:border-brand"
            >
              「直す」の型を読む →
            </Link>
          </div>
        </div>
        <div className="mt-4">
          <Link href="/vibe" className="text-sm font-bold text-brand underline underline-offset-2">
            ← 総論にもどる
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      {/* ヘッダー */}
      <header className="mb-4">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-sm font-bold text-accent">エラー文おみくじ 🎋</p>
          <p className="text-xs text-ink-faint">
            {pos + 1} / {CARDS.length}・正解 {correctCount}
          </p>
        </div>
        <h1 className="text-xl font-bold text-ink">このエラー、原因はどれ？</h1>
        <p className="mt-1 text-sm text-ink-soft">
          英語のエラーは「ここが困ってます」というお知らせ。落ち着いて読めば、意味が分かります。
        </p>
      </header>

      {/* エラー表示(ターミナル風) */}
      <div className="mb-4 overflow-hidden rounded-2xl border border-base-border shadow-sm">
        <div className="flex items-center gap-2 bg-ink px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-bad" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="h-2.5 w-2.5 rounded-full bg-good" />
          <span className="ml-2 text-xs font-medium text-white/60">{card.lang}</span>
        </div>
        <div className="bg-ink px-4 py-5">
          <p className="font-mono text-sm leading-relaxed text-red-300 break-words">
            {card.error}
          </p>
        </div>
      </div>

      {/* 選択肢 */}
      <div className="space-y-2">
        {card.choices.map((c, i) => {
          const isAns = i === card.answer;
          const chosen = picked === i;
          let cls =
            "w-full rounded-xl border p-4 text-left text-sm font-medium transition-colors ";
          if (!answered) {
            cls += "border-base-border bg-base-surface text-ink hover:border-brand active:scale-[0.99]";
          } else if (isAns) {
            cls += "border-good bg-good-bg text-ink";
          } else if (chosen) {
            cls += "border-bad bg-bad-bg text-ink";
          } else {
            cls += "border-base-border bg-base-surface text-ink-faint";
          }
          return (
            <button key={i} onClick={() => pick(i)} disabled={answered} className={cls}>
              <span className="flex items-start gap-2">
                {answered && (
                  <span aria-hidden className="shrink-0">
                    {isAns ? "✅" : chosen ? "❌" : "　"}
                  </span>
                )}
                <span>{c}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* 解説 */}
      {answered && (
        <div className="mt-4 animate-fade-in rounded-2xl border border-base-border bg-base-surface p-5 shadow-sm">
          <p className={`mb-2 text-sm font-bold ${isCorrect ? "text-good" : "text-accent"}`}>
            {isCorrect ? "🎯 正解！" : "🌱 惜しい！ ここがポイント"}
          </p>
          <div className="space-y-3 text-sm leading-relaxed text-ink-soft">
            <div>
              <p className="text-xs font-semibold text-brand">🗣️ やさしい和訳</p>
              <p>{card.ja}</p>
            </div>
            <div className="rounded-lg bg-base-bg p-3">
              <p className="text-xs font-semibold text-accent">🔧 直し方</p>
              <p>{card.fix}</p>
            </div>
          </div>
          <button
            onClick={next}
            className="mt-4 w-full rounded-full bg-brand py-3 text-sm font-bold text-white transition-colors hover:bg-brand/90"
          >
            {pos + 1 >= CARDS.length ? "結果を見る →" : "次のエラーをひく →"}
          </button>
        </div>
      )}

      {/* 一言 */}
      <div className="mt-6 rounded-2xl border-l-4 border-brand bg-brand-bg p-4">
        <p className="text-sm leading-relaxed text-ink-soft">
          <strong className="text-brand">エラーは敵じゃない。</strong>{" "}
          「どこで・何に・困っているか」を教えてくれるヒントです。全文をよく読み、
          分からなければ<strong>そのままAIに貼って「初心者向けに原因と直し方を教えて」</strong>と聞けばOK。
        </p>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-base-border pt-5 text-sm font-bold text-brand">
        <Link href="/ai-guide" className="underline underline-offset-2">
          AIへの頼み方・直し方を読む
        </Link>
        <Link href="/vibe" className="underline underline-offset-2">
          ↑ 総論のトップへ
        </Link>
      </div>
    </div>
  );
}
