import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        // Header element styles
        "h-1": [
          "clamp(1.8rem, 5.3vw, 2.75rem)",
          { lineHeight: "110%", fontWeight: 700 },
        ],
        "h-2": [
          "clamp(1.6rem, 5vw, 2.4rem)",
          { lineHeight: "110%", fontWeight: 700 },
        ],
        "h-3": [
          "clamp(1.8rem, 4.5vw, 2.25rem)",
          { lineHeight: "110%", fontWeight: 700 },
        ],
        "h-4": [
          "clamp(1.5rem, 3.5vw, 1.75rem)",
          { lineHeight: "110%", fontWeight: 700 },
        ],
        "h-5": [
          "clamp(1.2rem, 2.5vw, 1.5rem)",
          { lineHeight: "110%", fontWeight: 700 },
        ],
        "h-6": [
          "clamp(1rem, 2vw, 1.25rem)",
          { lineHeight: "110%", fontWeight: 600 },
        ],

        // Body variant styles - [Large, Medium, Regular, Small]
        "body-l": [
          "clamp(1rem, 2.5vw, 1.25rem)",
          { lineHeight: "140%", fontWeight: 400 },
        ],
        "body-m": [
          "clamp(0.95rem, 2.2vw, 1.125rem)",
          { lineHeight: "140%", fontWeight: 400 },
        ],
        "body-r": [
          "clamp(0.875rem, 2vw, 1rem)",
          { lineHeight: "140%", fontWeight: 400 },
        ],
        "body-s": [
          "clamp(0.75rem, 1.8vw, 0.875rem)",
          { lineHeight: "140%", fontWeight: 400 },
        ],
        "caption-s": [
          "clamp(0.675rem, 1.5vw, 0.75rem)",
          { lineHeight: "140%", fontWeight: 400 },
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        purple: {
          light: "rgb(147 51 234)",
          dark: "rgb(192 132 252)",
        },
        body: {
          light: "rgb(255 255 255 / 0.8)",
          dark: "rgb(31 41 55 / 0.8)"
        },
        error: '#EB5757',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
