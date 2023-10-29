/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        plex: ["IBM Plex Sans", "sans-serif"],
        source: ["Source Sans Pro", "sans-serif"],
      },
      gridTemplateRows: {
        // Simple 16 column grid
        "3fit": "fit-content(8rem) auto fit-content(8rem)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
