const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        textoVerde: "#4F6B5F",
        bordes: "#DEDEDE",
      },
      fontFamily: {
        firelli: ["firelli-variable"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
