/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // This safelist ensures your dynamic theme colors (like the Emerald green) aren't deleted during the build
  safelist: [
    { pattern: /(bg|text|border|shadow)-(emerald|rose|red|orange|blue|purple|cyan|yellow)-(50|100|200|300|400|500|600|700|800|900)/ },
    { pattern: /shadow-(emerald|rose|red|orange|blue|purple|cyan|yellow)-500\/20/ }
  ]
}
