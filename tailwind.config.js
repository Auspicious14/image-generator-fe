/** @type {import('tailwindcss').Config}  */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Playfair Display", "serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#6366f1",
          dark: "#4338ca",
        },
      },
    },
  },
  plugins: [],
};
