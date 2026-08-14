import type { MetadataRoute } from "next";

const SITE = "https://learn.halvision.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 検索・AIクローラーを含め全許可(AI検索での引用を狙う)
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
