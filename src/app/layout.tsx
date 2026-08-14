import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/components/ProgressProvider";
import { GlossaryModalProvider } from "@/components/GlossaryModal";
import { AppShell } from "@/components/AppShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_NAME = "HaLVision 学習ハブ";
const SITE_URL = "https://learn.halvision.dev";
const SITE_DESC =
  "AI時代に「読める・直せる・説明できる」人になるための無料学習ハブ。基礎からHTML/CSS・JavaScript・React・TypeScript・Python・Laravel・Git・SQLまで、たとえ多めでやさしく。登録不要。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — AI時代の「読める・直せる・説明できる」を育てる`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    locale: "ja_JP",
    title: `${SITE_NAME} — AI時代の学習ハブ`,
    description: SITE_DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — AI時代の学習ハブ`,
    description: SITE_DESC,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// サイト全体の構造化データ(Organization + WebSite)。
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "HaLVision",
      url: "https://halvision.dev",
      sameAs: ["https://halvision.dev"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESC,
      inLanguage: "ja",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          本文へスキップ
        </a>
        <ProgressProvider>
          <GlossaryModalProvider>
            <AppShell>{children}</AppShell>
          </GlossaryModalProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}
