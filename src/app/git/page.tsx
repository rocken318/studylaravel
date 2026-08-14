import { GitHome } from "@/components/GitHome";

export const metadata = {
  title: "初めてのGit — 壊しても戻せる安心",
  description:
    "4日で、バージョン管理の考え方から、記録(commit)・GitHub連携・ブランチと実務フロー(PR/レビュー)まで。AIにコードを試させて壊しても戻せる、その安心の土台をつくる入門コース。",
};

export default function GitCoursePage() {
  return <GitHome />;
}
