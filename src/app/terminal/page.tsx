import { TerminalGym } from "@/components/TerminalGym";

export const metadata = {
  title: "ターミナル練習ジム — 「黒い画面」に慣れるゲーム",
  description:
    "壊れない練習用ターミナルで、cd・ls・mkdir・git init などのコマンドをミッション形式で体験。「黒い画面が怖い」で環境構築前に脱落するのを防ぎます。AI不要・登録不要・スマホOK。",
};

export default function TerminalPage() {
  return <TerminalGym />;
}
