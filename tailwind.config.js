/** @type {import('tailwindcss').Config}  */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // fontFamily: {
      //   sans: ["Poppins", "sans-serif"],
      //   display: ["Poppins", "sans-serif"],
      // },
      // colors: {
      //   primary: {
      //     DEFAULT: "#6366f1",
      //     dark: "#4338ca",
      //   },
      // },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
        cta: ["Montserrat", "sans-serif"],
      },
      colors: {
        orange: {
          500: "#F28C38",
        },
        blue: {
          500: "#4A90E2",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
