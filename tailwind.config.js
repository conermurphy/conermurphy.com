module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        primaryBg: 'var(--primaryBackground)',
        secondaryBg: 'var(--secondaryBackground)',
        primaryText: 'var(--primaryText)',
        accentBg: 'var(--accentBackground)',
        accent: 'var(--accent)',
        primaryBorder: 'var(--primaryBorder)',
      },
      spacing: {
        106: '6.625rem',
        72: '4.5rem',
      },
      fontSize: {
        32: ['2rem', { letterSpacing: '', lineHeight: '40px' }],
        40: ['2.5rem', { letterSpacing: '', lineHeight: '48px' }],
      },
    },
    fontFamily: {
      display: ['Poppins'],
      body: ['Poppins'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
