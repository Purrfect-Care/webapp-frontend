module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'customGreen': "#4AA587",
        'customGrey': "#c5cdcb",
        'planned': '#3490dc',
        'cancelled': '#e3342f',
        'complete': '#00FF00',
      },
      gridTemplateColumns: {
        "1/5": "1fr 5fr"
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
  'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
};
