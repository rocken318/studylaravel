# 初めてのTypeScript — AIプロダクトを作る（カリキュラム骨子）

## コンセプト
少しかじった／未経験に近い人でも、7日で **TypeScript の基礎を身につけ、「AIをフロントから呼ぶ小さなAIプロダクト」を完成させる**。

- **AIプロダクト志向**：Python編（AIを"動かす"）に続き、TS編は AIを"届く形＝Webアプリ"にする
- **型で守る**：「型があると、AIが生成したコードの取り違えに早く気づける」を一貫テーマに
- **AIに任せて説明できる**：実装はAI、判断と説明は人間（既存Bootcampと同じ思想）
- 登録不要・進捗はブラウザ保存

## 全体像（7日 + Day0）

| Day | テーマ | ゴール |
| --- | --- | --- |
| 0 | なぜTS／JSからの一歩 | TSがAIプロダクトで選ばれる理由、JSに型を足したものと理解 |
| 1 | 変数・基本型・関数 | 型注釈と推論、基本型と関数の型が読める |
| 2 | オブジェクト・配列・型に名前 | interface/type でデータの形に名前(APIのJSON) |
| 3 | ユニオン・絞り込み・ジェネリクス | A\|B、narrowing、Array<T>/Promise<T> が読める |
| 4 | 非同期とfetch | Promise/async-await、fetchでAPIを型付きで叩く |
| 5 | React/Next.js超入門 | コンポーネント/props/useState、App Router超基本 |
| **6** | **AIをフロントから呼ぶ(看板)** | UI→APIルート→LLM、ストリーミング、型で出力固定 |
| 7 | 小さなAIプロダクト完成 | AIチャット/要約UIを完成、Vercel公開 |

各レッスンの型：概念 → なぜ → コード例(悪い例/良い例) →「AIにはこう聞く」→ 理解度チェック。

## 差別化
1. Python編(バックエンド/スクリプト) → TS編(プロダクト)で **AI開発の両輪**が揃う
2. 「型でAI生成コードを守る」という現代的な学び方
3. Day6でAPIルートから実際にLLMを叩き、Day7で公開まで
4. 用語は英小文字slugで用語集リンク。api/json/env/prompt 等はPython編の用語集と共有(横断で解決)

## 実装メモ
- 配置：`learn.halvision.dev/typescript`（Laravel/Python と同じハブ、3コース目）
- Sidebar のコース切替を Laravel/Python/TypeScript の3コース対応に一般化
- TS用語集(typescript/aiカテゴリ)を追加、GlossaryModalの用語解決に合流
