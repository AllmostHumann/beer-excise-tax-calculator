/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        alto: '#D9D9D9',
        silverChalice: '#B1AFAF',
        silver: '#CCCCCC',
        japaneseLaurel: '#008000',
        limeade: '#3AB701',
        sunsetOrange: '#FF4747',
        sherpaBlue: '#004C4C',
        jet: '#333333',
      },
    },
  },
  plugins: ['prettier-plugin-tailwindcss'],
};
