/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    colors: {
      main: "#0aad0a",
    },
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      
    },
  },
  plugins: [require("flowbite/plugin")],
};

