/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./node_modules/flowbite/**/*.js", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
