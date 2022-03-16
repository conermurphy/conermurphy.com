module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        offWhite: '#FAFAFC',
        primary: '#111827',
        accent: '#F97316',
        primaryBorder: 'hsla(221, 39%, 11%, 0.25)',
      },
      spacing: {
        106: '6.625rem',
        72: '4.5rem',
      },
      fontSize: {
        32: '2rem',
        40: '2.5rem',
      },
    },
    fontFamily: {
      display: ['Poppins'],
      body: ['Poppins'],
    },
  },
  plugins: [],
};
