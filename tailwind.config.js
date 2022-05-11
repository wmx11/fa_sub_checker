module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'titano-pink': '#DC02DF',
        'titano-green': '#00FDD5',
      },
    },
  },
  plugins: [],
};
