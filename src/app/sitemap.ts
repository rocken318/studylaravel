import type { MetadataRoute } from "next";
import { curriculum } from "@/data/curriculum";
import { basicsCurriculum } from "@/data/basics/curriculum";
import { pythonCurriculum } from "@/data/python/curriculum";
import { tsCurriculum } from "@/data/typescript/curriculum";
import { webCurriculum } from "@/data/web/curriculum";
import { jsCurriculum } from "@/data/javascript/curriculum";
import { reactCurriculum } from "@/data/react/curriculum";
import { gitCurriculum } from "@/data/git/curriculum";
import { sqlCurriculum } from "@/data/sql/curriculum";
import type { Day } from "@/types";

const SITE = "https://learn.halvision.dev";

// 「/<base>」形式のコース(home / [day] / [day]/[lesson] / extras)
const COURSES: { base: string; days: Day[]; extra: string[] }[] = [
  { base: "/basics", days: basicsCurriculum, extra: ["/basics/glossary"] },
  { base: "/web", days: webCurriculum, extra: ["/web/glossary", "/web/cheatsheet"] },
  { base: "/javascript", days: jsCurriculum, extra: ["/javascript/glossary"] },
  { base: "/react", days: reactCurriculum, extra: ["/react/glossary"] },
  { base: "/typescript", days: tsCurriculum, extra: ["/typescript/glossary"] },
  { base: "/python", days: pythonCurriculum, extra: ["/python/glossary"] },
  { base: "/git", days: gitCurriculum, extra: ["/git/glossary"] },
  { base: "/sql", days: sqlCurriculum, extra: ["/sql/glossary"] },
];

// 読みもの・インタラクティブ・単発ページ
const STANDALONE = [
  "/vibe",
  "/vibe/game",
  "/first-website",
  "/ai-guide",
  "/errors",
  "/terminal",
  "/http",
  "/languages",
  "/portfolio",
];

// Laravelコース(ルートが "/"、レッスンは /curriculum 配下)
const LARAVEL_EXTRA = [
  "/laravel-map",
  "/request-lifecycle",
  "/glossary",
  "/interview",
  "/laravel-interview",
  "/team-development",
  "/casestudy",
  "/review",
  "/writing-questions",
  "/cheatsheet",
  "/settings",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const push = (path: string, priority: number, cf: "weekly" | "monthly") =>
    entries.push({ url: `${SITE}${path}`, lastModified: now, changeFrequency: cf, priority });

  // トップ
  push("/", 1.0, "weekly");

  // 読みもの等
  for (const p of STANDALONE) push(p, 0.8, "monthly");

  // 「/<base>」コース群
  for (const c of COURSES) {
    push(c.base, 0.9, "monthly");
    for (const e of c.extra) push(e, 0.6, "monthly");
    for (const day of c.days) {
      push(`${c.base}/${day.slug}`, 0.7, "monthly");
      for (const lesson of day.lessons) {
        push(`${c.base}/${day.slug}/${lesson.slug}`, 0.6, "monthly");
      }
    }
  }

  // Laravelコース
  for (const e of LARAVEL_EXTRA) push(e, 0.6, "monthly");
  for (const day of curriculum) {
    push(`/curriculum/${day.slug}`, 0.7, "monthly");
    for (const lesson of day.lessons) {
      push(`/curriculum/${day.slug}/${lesson.slug}`, 0.6, "monthly");
    }
  }

  return entries;
}
