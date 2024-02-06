import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "bg-curvy-desktop": "./src/",
      },
      colors: {
        "primary-main": "hsl(218, 28%, 13%)",
        "primary-main-trans": "hsla(218, 28%, 13%, 0.6)",
        "primary-footer": "hsl(216, 53%, 9%)",
        "primary-intro": "hsl(217, 28%, 15%)",
        "primary-testimonials": "hsl(219, 30%, 18%)",
        "accent-cyan": "hsl(176, 68%, 64%)",
        "accent-blue": "hsl(198, 60%, 50%)",
        "primary-error": "hsl(0, 100%, 63%)",
        "neutral-main": "hsl(0, 0%, 100%)",
        "error-1": "red",
      },
      boxShadow: {
        "btn-primary": "4px 4px 0px 0px rgb(0, 0, 0)",
        "navbar-primary": "0px 6px 0px 0px #000",
      },
    },
  },
  plugins: [],
};
export default config;
