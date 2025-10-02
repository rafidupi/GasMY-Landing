import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        success: "var(--color-success)",
        "bg-main": "var(--bg-main)",
        "bg-card": "var(--bg-card)",
        "text-strong": "var(--text-strong)",
        "text-mid": "var(--text-mid)",
        "text-light": "var(--text-light)",
        "border-main": "var(--border-main)",
        "border-subtle": "var(--border-subtle)",
        "grad-start": "var(--grad-start)",
        "grad-end": "var(--grad-end)",
      },
      borderRadius: {
        'ios': '12px',
        'ios-lg': '24px',
      },
    },
  },
  plugins: [],
};
export default config;
