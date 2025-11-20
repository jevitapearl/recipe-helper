// tailwind.config.js
module.exports = {
  content: [
    "./*.html", // Scans all .html files in the root
    "./src/**/*.{html,js,jsx}", // Scans files in a 'src' folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}