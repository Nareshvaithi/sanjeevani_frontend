/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "themedarkblue":"#00037F",
        "themelightblue":"#3D5EE1",
        "themeskyblue":"#82CCD5",
        "themeyellow":"#E9B40B",
      },
    },
  },
  plugins: [],
}

