import { ErrorOmikuji } from "@/components/ErrorOmikuji";

export const metadata = {
  title: "エラー文おみくじ — 英語のエラーを読めるようになるゲーム",
  description:
    "英語のエラーメッセージを引いて、原因を3択で当てるミニゲーム。やさしい和訳と直し方つきで、「エラーで固まる」を「エラーはヒント」に変えます。JavaScript・Python・HTTP・Gitの定番エラーを収録。AI不要・登録不要。",
};

export default function ErrorsPage() {
  return <ErrorOmikuji />;
}
