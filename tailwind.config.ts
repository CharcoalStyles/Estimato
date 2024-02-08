import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      sm: "0.750rem",
      base: "1rem",
      xl: "1.333rem",
      "2xl": "1.777rem",
      "3xl": "2.369rem",
      "4xl": "3.158rem",
      "5xl": "4.210rem",
    },
    fontFamily: {
      heading: [`var(--font-adlam)`],
      body: [`var(--font-jost)`],
    },
    fontWeight: {
      normal: "400",
      bold: "700",
    },
    extend: {
      colors: {
        text: {
          DEFAULT: "var(--text)",
          highlight: "var(--text-highlight)",
        },
        background: "var(--background)",
        primary: {
          DEFAULT: "var(--primary)",
          highlight: "var(--primary-highlight)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          highlight: "var(--secondary-highlight)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          highlight: "var(--accent-highlight)",
        },
        white: "#fff",
        black: "#000",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
