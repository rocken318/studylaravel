import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 落ち着いた配色: 温かみのあるベージュ背景 + 深い藍のアクセント
        base: {
          bg: "#faf8f5",
          surface: "#ffffff",
          border: "#e7e2d9",
        },
        ink: {
          DEFAULT: "#2b2b2b",
          soft: "#55524c",
          faint: "#8a857c",
        },
        brand: {
          DEFAULT: "#3b4a6b", // 深い藍
          soft: "#5a6b8f",
          bg: "#eef1f7",
        },
        accent: {
          DEFAULT: "#b5533b", // レンガ色 (Laravel的な温かさ)
          bg: "#fbeee9",
        },
        good: {
          DEFAULT: "#2f7d5b",
          bg: "#e8f4ee",
        },
        bad: {
          DEFAULT: "#b23b3b",
          bg: "#fbeaea",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Hiragino Sans",
          "Hiragino Kaku Gothic ProN",
          "Meiryo",
          "sans-serif",
        ],
        mono: ["var(--font-mono)", "SFMono-Regular", "Consolas", "monospace"],
      },
      maxWidth: {
        reading: "44rem",
      },
      lineHeight: {
        relaxed: "1.9",
      },
    },
  },
  plugins: [],
};

export default config;
