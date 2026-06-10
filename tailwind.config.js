/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "katix-mobile": "390px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Hiragino Sans", "Noto Sans JP", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#389656",
          50: "#edf6ee",
        },
        neutral: {
          600: "#414758",
        },
      },
      boxShadow: {
        elevation01: "0px 1px 2px 0px rgba(61, 61, 61, 0.08)",
        elevation02: "0px 2px 4px 0px rgba(61, 61, 61, 0.12)",
      },
    },
  },
  plugins: [],
};
