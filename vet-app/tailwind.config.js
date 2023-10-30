module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'customGreen': "#4AA587",
        'customGrey': "#c5cdcb",
        'indigo': '#5c6ac4',
        'blue': '#3490dc',
        'red': '#e3342f',
        'purple': '#9561e2',
        'greenCheck': '#00FF00',
        'grayCheck': '#808080',
      },
      gridTemplateColumns: {
        "1/5": "1fr 5fr"
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
  'tailwindcss/nesting': {},
};
