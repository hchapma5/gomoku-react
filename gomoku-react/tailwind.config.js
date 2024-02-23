/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
    './public/index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        lightMode: {
          "primary": "#808080",
          "secondary": "#9394a5",
          "accent": "#a8dadc",
          "neutral": "#000000",
          "contrast": "#264463",
          "base-100": "#fafafa",
          "info": "#00e2ff",
          "success": "#00feb2",
          "warning": "#fb6b00",
          "error": "#ff0056",
        },
      },
      {
        darkMode: {
          "primary": "#5c6370",
          "secondary": "#32363e",
          "accent": "#aec3b0",
          "neutral": "#abb2bf",
          "contrast": "#c678dd",
          "base-100": "#282c34",
          "info": "#00e2ff",
          "success": "#00feb2",
          "warning": "#fb6b00",
          "error": "#ff0056",
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
}