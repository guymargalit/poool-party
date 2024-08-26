import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        swell: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        webkitSwell: {
          '0%': { '-webkit-transform': 'translateX(-100vw)' },
          '100%': { '-webkit-transform': 'translateX(0%)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        floating: {
          '0%': { transform: 'translate(0, 0px) rotate(-5deg)' },
          '50%': { transform: 'translate(0, 15px) rotate(15deg)' },
          '100%': { transform: 'translate(0, 0px) rotate(-5deg)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "accordion-up": "accordion-up 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        swell: 'swell 2s linear infinite forwards',
        webkitSwell: 'webkitSwell 2s linear infinite forwards',
        slideUp: 'slideUp 1s ease-out forwards',
        floating: 'floating 4s ease-in-out infinite forwards',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config