import { RobotGame } from "@/components/RobotGame";

export const metadata = {
  title: "ロボットにめいれい — プログラミングたいけんゲーム",
  description:
    "「まえ・みぎ・ひだり」を順番にならべて、ロボットをゴールへ導くパズルゲーム。プログラミングの本質(段取りを順番に命令する・まちがえたら直す＝デバッグ)を、スマホのタップだけで体験できます。AI不要・登録不要。",
};

export default function VibeGamePage() {
  return <RobotGame />;
}
