import { SqlGlossary } from "@/components/SqlGlossary";

export const metadata = {
  title: "SQL 用語集 — 初めてのSQL",
  description:
    "初めてのSQLで登場するテーブル・SELECT・WHERE・JOIN・主キーなどの用語を、意味と実務での使い方つきでまとめた用語集。",
};

export default function SqlGlossaryPage() {
  return <SqlGlossary />;
}
