import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent": "#9ECCCC",
        "light-gray": "#EFEFE6",
        "dark-gray": "#5A594E"
      },
    },
  },
  plugins: [],
};
export default config;
