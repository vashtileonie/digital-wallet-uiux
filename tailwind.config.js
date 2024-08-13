/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lightblue': '#ADD8E6', // Define light blue color
        'light-grey': '#F0F0F0', // Light grey color for the card
      },
      backgroundColor: {
        'dark-mode': '#1a202c', // Dark mode background color (for the main background)
        'light-mode': '#f7fafc', // Light mode background color
        'card-dark-mode': '#2d3748', // Dark mode card color (lighter grey)
        'card-light-mode': '#F0F0F0', // Light mode card color
      },
      textColor: {
        'dark-mode': '#edf2f7', // Dark mode text color
        'light-mode': '#2d3748', // Light mode text color
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enable class-based dark mode
}
