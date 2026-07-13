/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-1": "#09090a",
        "dark-2": "#1c1c21",
        "dark-3": "#292932",
        "dark-4": "#3a3a4a",
        "light-1": "#ffffff",
        "light-3": "#a8a8b3",
        "light-4": "#7878a3",
        "primary-500": "#877eff",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
