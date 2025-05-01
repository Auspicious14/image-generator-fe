/** @type {import('tailwindcss').Config}  */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#6366f1",
          dark: "#4338ca",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
