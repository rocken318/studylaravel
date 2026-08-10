# 学習効率アップ機能 設計書

- 日付: 2026-08-10
- 対象: Laravel Bootcamp(既存の7日間面接対策アプリ)
- ゴール: PHP未経験者がLaravelのコード例を読めるようにし、抽象論を具体例で腹落ちさせ、詰まったときにAIへ橋渡しし、継続を後押しする

## 背景・課題

現状のアプリは「PHPのコードを読めば理解できる」前提だが、ターゲットは「PHPもLaravelもほぼ未経験」。
土台のPHPがないため、設計解説のコード例が読めず学習が止まるリスクがある。加えて抽象的な設計論は
具体例がないと腹落ちしづらい。詰まったときの補助と、継続の仕組みも弱い。

## スコープ(今回作るもの)

1. Day 0:PHP速習(最優先)
2. 身近な具体例(「例えばこういうこと」)
3. 「AIに聞く」ボタン(無料リンク方式・APIキー不要)
4. ダッシュボード強化

明確に見送るもの: APIキーを使うアプリ内AIチャット(課金・サーバー関数・シークレット管理が必要。
将来オプション。リンク方式で学習効果はほぼ同等のため)。

## ① Day 0:PHP速習

- 先頭に `day0` を追加。既存7日は不変。サイドバー・進捗に自動で反映。
- 構成は既存踏襲(概念 → なぜ → コード例 → 面接での言い換え)。各所に「Laravelのどこで出てくるか」を明記。
- レッスン(全6):
  1. `php-basics` — 実行の仕組み、`<?php`、変数、型、`echo`、文字列連結`.`と補間
  2. `php-arrays` — 配列と連想配列(Laravelのデータの基本)、`foreach`
  3. `php-functions` — 関数、無名関数・アロー関数 `fn()=>`
  4. `php-oop` — クラス/`new`/`$this`/コンストラクタ/可視性/`static`、`->` と `::` の違い
  5. `php-namespace` — 名前空間と `use`、オートロード、1ファイル1クラス
  6. `php-modern` — 型宣言、`?`/`??`/`?->`、`try/catch`、interface・traitのさわり
- 各レッスン2〜3問の理解度チェック。トーンは「準備運動」として少し軽め。
- ファイル: `src/data/days/day0.ts`(`export const day0: Day`、`day: 0`, `slug: "day0"`)。
- 集約: `src/data/curriculum.ts` の配列先頭に `day0` を追加。

## ② 身近な具体例(「例えばこういうこと」)

- 既存30レッスンは直接編集しない。別データに切り出して疎結合にする。
- 新ファイル `src/data/examples.ts`:
  ```ts
  export interface LessonExample {
    analogy: string;    // 例えるなら(日常の例え)
    adExample?: string; // 広告枠申込サイトなら(軽く一文)
  }
  export const lessonExamples: Record<string, LessonExample>; // key = lesson.id
  ```
- レッスン上部に「🍱 例えるなら」ボックスを表示(該当IDがあるレッスンのみ)。
- 対象は効果の高い約18レッスン(mvc, request-lifecycle, directory-structure, migration,
  controller, route-model-binding, eloquent-basics, relationships, n-plus-one, eager-loading,
  validation, form-request, middleware, blade, fat-controller, service-layer, transaction, locking)。
- 日常の例えを主に、`adExample` は「広告枠申込サイトならこの部分」を軽く添える(halvisionは重くしない)。
- 型変更なし(ContentBlockはそのまま)。後から例えを足すのはデータ追記のみ。

## ③ 「AIに聞く」ボタン(無料リンク方式)

- 再利用コンポーネント `src/components/AskAIButton.tsx`。
- 動作: 文脈に応じた質問文を生成 → クリップボードにコピー → ChatGPT/Claudeを新タブで開く(`?q=`で事前入力)。
  - ChatGPT: `https://chatgpt.com/?q=<encoded>`
  - Claude: `https://claude.ai/new?q=<encoded>`
  - コピーはフォールバックとして常に実行(prefillが効かない環境向け)。
- 設置場所:
  - レッスン下部(「この単元をAIに深掘り」)
  - 記述式設問(「模範解答をAIと比べる」)
  - 面接問答カード(「この質問をAIに深掘り」)
  - 用語モーダル(「この用語をAIに聞く」)
- プロンプト生成はヘルパー `buildPrompt(kind, payload)` に集約。初心者前提・面接での言い換え例つきで依頼する定型。
- バックエンド・APIキー・課金なし。静的構成のままVercelにデプロイ可能。

## ④ ダッシュボード強化

- `ProgressProvider` に `studyDates: string[]`(YYYY-MM-DD)を追加。レッスン完了・設問回答時に当日をスタンプする
  `recordActivity()` を用意。後方互換(無ければ空配列)。
- 追加表示:
  - 学習ストリーク(連続学習日数。`studyDates`から算出)
  - 理解度サマリー: レッスン完了率 / クイズ正答率 / 面接カード「覚えた」数 / 記述回答済み数
  - Day別の進捗バー(Day0〜7)
  - 今日の一問(面接問答からランダム1枚。日替わりで安定するよう日付シードで選ぶ。AIに聞く/一覧で見る導線)
- 既存の「今日やるべきDay」「苦手な問題」は維持。

## 型・データの変更点(まとめ)

- `Day.day` は `number` のまま(0を許容、型変更不要)。
- `ProgressProvider`: `studyDates` 追加、`recordActivity()` 追加、`recordChoice/recordSelfRating/toggleLessonComplete` 実行時に当日をスタンプ。
- 新規ファイル: `src/data/days/day0.ts`、`src/data/examples.ts`、`src/components/AskAIButton.tsx`、`src/lib/aiPrompt.ts`(プロンプト生成)、ダッシュボードのstats部品。
- `curriculum.ts`: `day0` を先頭に追加。

## 進め方(フェーズ)

1. 型/データ土台: `examples.ts` の型、`ProgressProvider` の `studyDates`、`aiPrompt.ts`、`AskAIButton` の雛形
2. コンテンツ執筆(並列エージェント): Day 0(`day0.ts`)、身近な具体例(`examples.ts`)
3. `AskAIButton` を各画面へ設置、レッスンに「例えるなら」表示
4. ダッシュボード強化
5. typecheck / lint / build / 動作確認 → コミット & push

## 非目標(YAGNI)

- アプリ内AIチャット(APIキー方式)
- 全30レッスンへの一律の例え付与(高価値レッスンに絞る)
- 学習履歴の外部同期・アカウント機能(localStorageのみ維持)
