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
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        flame: {
          DEFAULT: "var(--flame)",
          foreground: "var(--flame-foreground)",
          glow: "var(--flame-glow)",
        },
        royal: {
          DEFAULT: "var(--royal)",
          foreground: "var(--royal-foreground)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          foreground: "var(--ink-foreground)",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "DM Sans", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 6px)",
        "2xl": "calc(var(--radius) + 12px)",
        "3xl": "calc(var(--radius) + 20px)",
      },
      boxShadow: {
        flame: "0 18px 45px -18px var(--flame)",
        royal: "0 18px 45px -18px var(--royal)",
        soft: "0 10px 30px -10px rgba(0, 0, 0, 0.06)",
      },
      keyframes: {
        "ember-float": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.25" },
          "50%": { transform: "translate(15px, -15px) scale(1.08)", opacity: "0.4" },
        },
        "marquee-x": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height, auto)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height, auto)" },
          to: { height: "0" },
        },
      },
      animation: {
        ember: "ember-float 6s ease-in-out infinite",
        "marquee-track": "marquee-x 32s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
