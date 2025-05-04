module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          indigo: {
            600: '#4f46e5',
            700: '#4338ca',
          },
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }