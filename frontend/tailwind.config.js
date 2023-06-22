module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFDF5',
        brand: '#E6806B',
        text: '#25282A',
      },
      fontFamily: {
        heading: ['var(--karla-font)', 'sans-serif'],
        body: ['var(--raleway-font)', 'sans-serif'],
        mono: ['var(--inconsolata-font)', 'sans-serif'],
      },
    },
  },
  /* eslint-disable global-require */
  plugins: [require('@tailwindcss/forms')],
};
