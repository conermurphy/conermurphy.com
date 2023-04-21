module.exports = {
    darkMode: 'class',
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          transparent: 'transparent',
          primaryBg: 'hsl(240, 25%, 98%)',
          primaryText: 'hsl(240, 4%, 14%)',
          secondaryBg: 'hsl(0, 0%, 90%)',
          accent: 'hsl(10, 94%, 60%)',
          primaryBorder: 'hsla(221, 39%, 11%, 0.25)',
          primaryBgDark: 'hsl(240, 4%, 14%)',
          secondaryBgDark: 'hsl(240, 4%, 24%)',
          primaryTextDark: 'hsl(240, 25%, 98%)',
          primaryBorderDark: 'hsla(221, 40%, 96%, 0.25)',
        },
        fontSize: {
          32: ['2rem', { letterSpacing: '', lineHeight: '40px' }],
          40: ['2.5rem', { letterSpacing: '', lineHeight: '48px' }],
        },
        keyframes: {
          blink: {
            '0%, 40%': { opacity: 1 },
            '60%, 100%': { opacity: 0 },
          },
        },
        animation: {
          blink: 'blink .6s linear infinite alternate',
        },
        fontFamily: {
          heading: ['Inter', 'sans-serif'],
          body: ['Nunito', 'sans-serif'],
        },
      },
    },
    plugins: [require('@tailwindcss/forms')],
  };