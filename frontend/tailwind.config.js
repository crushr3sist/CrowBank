/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  define: {
    global: {},
  },
  theme: {
    extend: {
      colors: {
        "main-theme-yellow": "#fde68a",
      },
    },
    fontFamily: {
      logo: ["Agrandir"],
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
