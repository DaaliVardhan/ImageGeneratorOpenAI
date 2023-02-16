/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens:{
        XS : '480px'
      },
      fontFamily:{
        inter:['Inter var','sans-serif'],
      },
      boxShadow:{
        card:'0 0 { 1px 0 rgba(189,192,287,0.06),8 10px 16px -1px rgba(189,192,207,0.2)',
        cardhover:'0 0 1px 0 rgba(189,192,287,8.86),8 10px 16px -1px rgba(189,192,207,0.4)'
      }

    },
  },
  plugins: [],
}

