import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Wonderland tier (L1–3)
        wonderland: {
          bg: "#FFF9E6",
          primary: "#FF6B35",
          secondary: "#4ECDC4",
          accent: "#FFD93D",
          text: "#2D3436",
        },
        // Lab tier (L4–7)
        lab: {
          bg: "#F0F4FF",
          primary: "#4361EE",
          secondary: "#7209B7",
          accent: "#4CC9F0",
          text: "#1A1A2E",
        },
        // Studio tier (L8–10)
        studio: {
          bg: "#0D1117",
          primary: "#58A6FF",
          secondary: "#BC8CFF",
          accent: "#3FB950",
          text: "#E6EDF3",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
        "pulse-slow": "pulse 3s infinite",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
