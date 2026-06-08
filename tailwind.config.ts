import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-2)",
        border: "var(--color-border)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
        accent: "var(--color-accent)",
        "accent-fg": "var(--color-accent-fg)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.04), 0 8px 24px -12px rgba(16,24,40,0.12)",
        pop: "0 12px 40px -12px rgba(16,24,40,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
