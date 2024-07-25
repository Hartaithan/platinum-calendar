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
        background: "hsl(var(--color-background) / <alpha-value>)",
        surface: "hsl(var(--color-surface) / <alpha-value>)",
        text: "hsl(var(--color-text) / <alpha-value>)",
        border: "hsl(var(--color-border) / <alpha-value>)",
        placeholder: "hsl(var(--color-placeholder) / <alpha-value>)",
        focus: "hsl(var(--color-focus) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

export default config;
