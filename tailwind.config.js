/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    "./entrypoints/**/*.{html,ts,tsx}",
    "./components/**/*.{html,ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
  },
};
