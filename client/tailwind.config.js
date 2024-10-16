/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
const scrollbar = require('tailwind-scrollbar');  // Add the tailwind-scrollbar plugin

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
    scrollbar,  // Add the tailwind-scrollbar plugin to the plugins array
  ],
};