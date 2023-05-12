/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'screen-5': '5vh',
        'screen-7': '7vh',
        'screen-8': '8vh',
        'screen-10': '10vh',
        'screen-15': '15vh',
        'screen-40': '40vh',
        'screen-20': '20vh',
        'screen-35': '35vh',
        'screen-70': '70vh',
      },

    fontFamily:{
      body: ['satoshi']
    }
  },
  },
  plugins: [],
}
