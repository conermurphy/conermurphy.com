module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        offWhite: 'var(--offWhite)',
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        primaryBorder: 'var(--primaryBorder)',
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
  plugins: [require('@tailwindcss/forms')],
};
