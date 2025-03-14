/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textoVerde: "#4F6B5F",
      },
      fontFamily: {
        firelli: ["firelli-variable"],
      },
    },
  },
  plugins: [],
};
