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
        'claude-orange': '#CC785C',
        'claude-peach': '#E6D5C3',
        'claude-cream': '#F4EFE6',
        'claude-dark': '#1F1F1F',
        'claude-text': '#2C2C2C',
        'claude-text-secondary': '#5C5C5C',
        'claude-border': '#E0E0E0',
        'claude-hover': '#F7F7F7',
        'surface': '#FAFAFA',
      },
    },
  },
  plugins: [],
};

export default config;