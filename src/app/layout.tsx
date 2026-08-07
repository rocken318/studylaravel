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

export const metadata: Metadata = {
  title: "Laravel Bootcamp — 7日間で面接を突破する",
  description:
    "Laravel未経験者が1週間で「Laravelを使ったチーム開発」の面接を突破するための学習アプリ。実装力より、設計思想を言語化できることを最優先に学びます。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <ProgressProvider>
          <GlossaryModalProvider>
            <AppShell>{children}</AppShell>
          </GlossaryModalProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}
