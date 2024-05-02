import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      maxWidth: {
        'large': '1216px',
      },
      fontSize: {
        'banner': '240px'
      },
      colors: {
        'blog-card-purple': '#6941C6',
        'blog-card-gray': '#667085',
      },
    },
  },
  // TODO: refactor blog label color config
  safelist: ['text-[#6941C6]', 'text-[#363F72]', 'bg-[#6941C6]/[.10]', 'bg-[#363F72]/[.10]'],
  plugins: [],
};
export default config;
