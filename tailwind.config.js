/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      safelist: ["bg-dark-gray", "text-gray-400", "bg-blue-400"],
      colors: {
        "dark-gray": "#15202B",
        "dark-slight": "#192734",
        "blue-400": "#1DA1F2",
        "gray-400": "#8899A6",
        "gray-500": "#657786",
        "red-400": "#E0245E",
        "green-500": "#17BF63",
      },
      borderWidth: {
        1: "1px",
      },
      transitionProperty: {
        colors: "background-color, border-color, color", 
      },
    },
    container: {
      center: true,
      padding: "1rem",
    },
  },
  plugins: [],
};
