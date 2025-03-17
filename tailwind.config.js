/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "mainFont1":["Roboto","serif"],
      },
      colors:{
        "themedarkblue":"#00037F",
        "themelightblue":"#3D5EE1",
        "themeskyblue":"#82CCD5",
        "buttonblue":"#3d5ee1",
        "themeyellow":"#E9B40B",
      },
    },
  },
  plugins: [],
};

