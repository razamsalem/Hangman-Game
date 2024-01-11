/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#19A7CE",
        "darker": "#232323",
        "light": "#BFCFE7",
        "lighter": "#F8EDFF"
      }
    },
    fontFamily: {
      nunito: ["Nunito", "sans-serif"]
    }
  },
  plugins: [],
}

