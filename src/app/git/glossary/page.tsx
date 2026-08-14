import { GitGlossary } from "@/components/GitGlossary";

export const metadata = {
  title: "Git 用語集 — 初めてのGit",
  description:
    "初めてのGitで登場するリポジトリ・commit・ブランチ・マージ・プルリクエストなどの用語を、意味と実務での使い方つきでまとめた用語集。",
};

export default function GitGlossaryPage() {
  return <GitGlossary />;
}
