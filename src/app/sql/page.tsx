import { SqlHome } from "@/components/SqlHome";

export const metadata = {
  title: "初めてのSQL — データと会話する",
  description:
    "4日で、データベースの考え方から、SELECT・集計とJOIN・書きかえと設計まで。ほぼ全てのサービスの裏側にある必須教養を、たとえ多めでやさしく。AIが出したSQLを読めて危険な操作に気づける力を育てる入門コース。",
};

export default function SqlCoursePage() {
  return <SqlHome />;
}
