/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");


module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [{
      mytheme: {

        "primary": "#132da0",
        "secondary": "#e3f2ff",
        "accent": "#2d68ff",
        "neutral": "#f7f7fc",
        "base-100": "#ffffff",
        "info": "#3ABFF8",
        "success": "#36D399",
        "warning": "#ffa800",
        "error": "#dc2c2b",
      },
    }, ],
  },
  plugins: [require("daisyui")],
});